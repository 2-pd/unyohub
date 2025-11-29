<?php
include "../libs/wakarana/main.php";

$wakarana = new wakarana("../config");

function load_railroad_data ($id) {
    global $railroad_id;
    global $db_obj;
    
    $railroad_id = basename($id);
    
    $db_obj = new SQLite3("../data/".$railroad_id."/railroad.db");
    $db_obj->busyTimeout(5000);
}

$moderation_db_obj = NULL;

function connect_moderation_db () {
    global $moderation_db_obj;
    
    if (empty($moderation_db_obj)) {
        $moderation_db_obj = new SQLite3("../config/moderation.db");
        $moderation_db_obj->busyTimeout(5000);
    }
}

$diagram_revisions = NULL;
$diagram_revision = NULL;
$diagram_info = NULL;

function update_diagram_revision ($ts) {
    global $railroad_id;
    global $diagram_revisions;
    global $diagram_revision;
    global $diagram_info;
    
    if (is_null($diagram_revisions)) {
        $diagram_revisions = file("../data/".$railroad_id."/diagram_revisions.txt", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    }
    
    $date_str = date("Y-m-d", $ts);
    for ($cnt = 0; isset($diagram_revisions[$cnt]); $cnt++) {
        if ($diagram_revisions[$cnt] <= $date_str) {
            if ($diagram_revision !== $diagram_revisions[$cnt]) {
                $diagram_revision = $diagram_revisions[$cnt];
                $diagram_info = json_decode(file_get_contents("../data/".$railroad_id."/".$diagram_revision."/diagram_info.json"), TRUE);
            }
            
            return TRUE;
        }
    }
    
    return FALSE;
}

function get_diagram_id ($ts) {
    global $diagram_info;
    
    $year = date("Y", $ts);
    $mm_dd = date("m-d", $ts);
    $today = $year."-".$mm_dd;
    
    if (isset($diagram_info["exceptional_dates"][$today])) {
        return $diagram_info["exceptional_dates"][$today];
    }
    
    $holiday_list = ["01-01", "02-11", "02-23", "04-29", "05-03", "05-04", "05-05", "08-11", "11-03", "11-23"];
    $happy_monday_list = [["01", "second"], ["07", "third"], ["09", "third"], ["10", "second"]];
    
    $holiday_list[] = "03-".floor(20.8431 + 0.242194 * ($year - 1980)) - floor(($year - 1980) / 4);
    $shubun = floor(23.2488 + 0.242194 * ($year - 1980)) - floor(($year - 1980) / 4);
    $holiday_list[] = "09-".$shubun;
    
    for ($hm_cnt = 0; $hm_cnt < count($happy_monday_list); $hm_cnt++) {
        $holiday_list[] = $happy_monday_list[$hm_cnt][0]."-".date("d", strtotime($happy_monday_list[$hm_cnt][1]." Monday of ".$year."-".$happy_monday_list[$hm_cnt][0]));
    }
    
    for ($h_cnt = 0; $h_cnt < count($holiday_list); $h_cnt++) {
        if (date("D", strtotime($year."-".$holiday_list[$h_cnt])) === "Sun") {
            $furikae_cnt = 0;
            do {
                $furikae_cnt++;
                $furikae_date = substr($holiday_list[$h_cnt], 0, 2)."-".str_pad(intval(substr($holiday_list[$h_cnt], 3)) + $furikae_cnt, 2, "0", STR_PAD_LEFT);
            } while (array_search($furikae_date, $holiday_list) !== FALSE);
            
            $holiday_list[] = $furikae_date;
        }
    }
    
    if (array_search("09-".($shubun - 2), $holiday_list) !== FALSE) {
        $holiday_list[] = "09-".($shubun - 1);
    }
    
    if (array_search($mm_dd, $holiday_list) !== FALSE) {
        $day_index = 0;
    } else {
        $day_index = intval(date("w", $ts));
    }
    
    foreach ($diagram_info["diagram_schedules"] as $diagram_schedule) {
        foreach ($diagram_schedule["periods"] as $period) {
            if ($period["start_date"] <= $today && (is_null($period["end_date"]) || $period["end_date"] >= $today)) {
                return $diagram_schedule["diagrams_by_day"][$day_index];
            }
        }
    }
}

function get_operation_info ($ts, $operation_number) {
    global $db_obj;
    global $diagram_revision;
    
    $diagram_id = get_diagram_id($ts);
    
    $operation_data = $db_obj->querySingle("SELECT * FROM `unyohub_operations` WHERE `diagram_revision` = '".$diagram_revision."' AND `diagram_id` = '".$diagram_id."' AND `operation_number` = '".$db_obj->escapeString($operation_number)."'", TRUE);
    
    if (empty($operation_data)) {
        print "ERROR: 運用番号が不正です";
        exit;
    }
    
    return $operation_data;
}

function get_formation_info ($formations_str, $validate_level = 0) {
    global $db_obj;
    
    $formation_pattern = array("");
    $formation_list = array();
    
    if ($formations_str === "") {
        return array("formation_pattern" => $formation_pattern, "formation_list" => $formation_list);
    }
    
    $formations = explode("+", $formations_str);
    
    if (count($formations) > 5) {
        print "ERROR: 組成に含まれる編成数が多すぎます";
        exit;
    }
    
    $formation_pattern_last = array(NULL);
    
    if ($validate_level >= 2) {
        $coupling_group_intersection = NULL;
        $min_car_count_range = 0;
        $max_car_count_range = 0;
    }
    
    foreach ($formations as $formation) {
        if ($formation !== "?") {
            $formation_escaped = $db_obj->escapeString($formation);
            
            $formation_data = $db_obj->querySingle("SELECT `series_name`, `subseries_name`".($validate_level >= 2 ? ", `car_count`" : "")." FROM `unyohub_formations` WHERE `formation_name` = '".$formation_escaped."' AND `currently_registered` = 1", TRUE);
            
            if (empty($formation_data)) {
                $formation_data = $db_obj->querySingle("SELECT `series_title`, `series_name`".($validate_level >= 2 ? ", `max_car_count`, `min_car_count`" : "")." FROM `unyohub_series_caches` WHERE `series_title` = '".$formation_escaped."'", TRUE);
                
                if (!empty($formation_data)) {
                    if ($formation_data["series_name"] !== $formation_data["series_title"]) {
                        $formation_data["subseries_name"] = $formation_data["series_title"];
                    } else {
                        $formation_data["subseries_name"] = NULL;
                    }
                } else {
                    if ($validate_level >= 1) {
                        print "ERROR: 入力された編成名・車両形式に誤りがあります";
                        exit;
                    }
                    
                    $formation_data = array("series_name" => "?", "subseries_name" => NULL);
                }
            } else {
                if ($validate_level >= 2) {
                    $formation_data["max_car_count"] = $formation_data["car_count"];
                    $formation_data["min_car_count"] = $formation_data["car_count"];
                }
                
                $formation_list[] = $formation;
            }
            
            if ($validate_level >= 2) {
                $coupling_groups_r = $db_obj->query("SELECT `coupling_group` FROM `unyohub_coupling_groups` WHERE `series_or_formation` = '".$formation_escaped."'");
                
                $coupling_groups = [];
                while ($coupling_group_data = $coupling_groups_r->fetchArray(SQLITE3_NUM)) {
                    $coupling_groups[] = $coupling_group_data[0];
                }
                
                if ($min_car_count_range === 0) {
                    $coupling_group_intersection = $coupling_groups;
                } else {
                    if (is_null($coupling_group_intersection)) {
                        $coupling_group_intersection = $coupling_groups;
                    } else {
                        $coupling_group_intersection = array_intersect($coupling_group_intersection, $coupling_groups);
                    }
                    
                    if (empty($coupling_group_intersection)) {
                        print "ERROR: 併結できない編成の組み合わせです";
                        exit;
                    }
                }
                
                $min_car_count_range += $formation_data["min_car_count"];
                if (($formation !== $formation_data["series_name"] && $formation !== $formation_data["subseries_name"]) || empty($coupling_groups)) {
                    $max_car_count_range += $formation_data["max_car_count"];
                } else {
                    $max_car_count_range += 20;
                }
            }
        } else {
            $formation_data = array("series_name" => "?", "subseries_name" => NULL);
            
            if ($validate_level >= 2) {
                if (is_array($coupling_group_intersection) && empty($coupling_group_intersection)) {
                    print "ERROR: 併結できない編成の組み合わせです";
                    exit;
                }
                
                $min_car_count_range += 1;
                $max_car_count_range += 20;
            }
        }
        
        $formation_pattern_2 = array();
        $formation_pattern_last_2 = array();
        for ($cnt = 0; isset($formation_pattern[$cnt]); $cnt++) {
            if (empty($formation_pattern[$cnt])) {
                $forward_pattern = "";
            } else {
                $forward_pattern = $formation_pattern[$cnt]."+";
            }
            
            $formation_pattern_2[] = $forward_pattern.$formation;
            $formation_pattern_last_2[] = $formation;
            
            if ($formation_data["series_name"] !== $formation) {
                $formation_pattern_2[] = $forward_pattern.$formation_data["series_name"];
                $formation_pattern_last_2[] = $formation_data["series_name"];
            }
            
            if (!empty($formation_data["subseries_name"])) {
                $formation_pattern_2[] = $forward_pattern.$formation_data["subseries_name"];
                $formation_pattern_last_2[] = $formation_data["subseries_name"];
            }
            
            if ($formation !== "?") {
                $formation_pattern_2[] = $forward_pattern."?";
                $formation_pattern_last_2[] = "?";
            }
            
            if ($formation_pattern_last[$cnt] === $formation_data["series_name"] || $formation_pattern_last[$cnt] === $formation_data["subseries_name"] ||$formation_pattern_last[$cnt] === "?" ) {
                $formation_pattern_2[] = $formation_pattern[$cnt];
                $formation_pattern_last_2[] = $formation_pattern_last[$cnt];
            }
        }
        
        $formation_pattern = $formation_pattern_2;
        $formation_pattern_last = $formation_pattern_last_2;
    }
    
    if ($validate_level >= 1 && !empty($formation_list) && max(array_count_values($formation_list)) >= 2) {
        print "ERROR: 投稿しようとしている情報には同一の編成が複数含まれています";
        exit;
    }
    
    if ($validate_level >= 2) {
        return array("formation_pattern" => array_merge(array_unique($formation_pattern)), "formation_list" => $formation_list, "min_car_count_range" => $min_car_count_range, "max_car_count_range" => $max_car_count_range);
    } else {
        return array("formation_pattern" => array_merge(array_unique($formation_pattern)), "formation_list" => $formation_list);
    }
}

function update_data_cache ($operation_date, $operation_number, $updated_datetime, $corrected_formation_info = array()) {
    global $wakarana;
    global $db_obj;
    
    $operation_number = $db_obj->escapeString($operation_number);
    
    $db_obj->query("DELETE FROM `unyohub_data_caches` WHERE `operation_date` = '".$operation_date."' AND `operation_number` = '".$operation_number."'");
    $db_obj->query("DELETE FROM `unyohub_data_each_formation` WHERE `operation_date` = '".$operation_date."' AND `operation_number` = '".$operation_number."'");
    
    $post_data_r = $db_obj->query("SELECT `assign_order`, `user_id`, `formations`, `is_quotation`, `posted_datetime`, `comment` FROM `unyohub_data` WHERE `operation_date` = '".$operation_date."' AND `operation_number` = '".$operation_number."' ORDER BY `assign_order` DESC,`posted_datetime` DESC");
    
    $data_cache_values = NULL;
    
    $formation_list = array();
    $latest_formation_list = array();
    
    $assign_order = NULL;
    $corrected_formations = NULL;
    $posts_count = 0;
    
    do {
        $post_data = $post_data_r->fetchArray(SQLITE3_ASSOC);
        
        if ($posts_count === 0 && empty($post_data)) {
            $db_obj->query("INSERT INTO `unyohub_data_caches` (`operation_date`, `operation_number`, `assign_order`, `formations`, `posts_count`, `variant_exists`, `comment_exists`, `from_beginner`, `is_quotation`, `updated_datetime`) VALUES ('".$operation_date."', '".$operation_number."', 0, NULL, NULL, NULL, NULL, NULL, NULL, '".$updated_datetime."')");
            
            return NULL;
        }
        
        if (empty($post_data) || ($assign_order !== $post_data["assign_order"])) {
            if (!empty($assign_order)) {
                $from_beginner = TRUE;
                if (substr($user_id, 0, 1) !== "*") {
                    $post_user = $wakarana->get_user($user_id);
                    
                    if (is_object($post_user)){
                        $days_posted = intval($post_user->get_value("days_posted"));
                        
                        if ($days_posted >= 20 || ($days_posted >= 10 && intval($post_user->get_value("post_count")) >= 50) || $post_user->check_permission("management_member")) {
                            $from_beginner = FALSE;
                        }
                    }
                }
                
                if (empty($post_data) || ($corrected_formations !== $post_data["formations"])) {
                    $db_obj->query("INSERT INTO `unyohub_data_caches` (`operation_date`, `operation_number`, `assign_order`, `formations`, `posts_count`, `variant_exists`, `comment_exists`, `from_beginner`, `is_quotation`, `updated_datetime`) VALUES ('".$operation_date."', '".$operation_number."', ".$assign_order_max.", '".$db_obj->escapeString($corrected_formations)."', ".$posts_count.", ".intval($variant_exists).", ".intval($comment_exists).", ".intval($from_beginner).", ".intval($is_quotation).", '".$updated_datetime."')");
                    
                    if (empty($data_cache_values)) {
                        $data_cache_values = array("formations" => $corrected_formations, "variant_exists" => $variant_exists, "comment_exists" => $comment_exists, "from_beginner" => $from_beginner, "is_quotation" => $is_quotation);
                    } else {
                        if (!isset($data_cache_values["relieved_formations"])) {
                            $data_cache_values["relieved_formations"] = array($corrected_formations);
                        } else {
                            array_unshift($data_cache_values["relieved_formations"], $corrected_formations);
                        }
                    }
                }
            }
            
            if (!empty($post_data)) {
                $assign_order = $post_data["assign_order"];
                if ($corrected_formations !== $post_data["formations"]) {
                    $assign_order_max = $post_data["assign_order"];
                    $corrected_formations = $post_data["formations"];
                    $user_id = $post_data["user_id"];
                    $is_quotation = $post_data["is_quotation"];
                    $comment_exists = boolval(strlen($post_data["comment"]));
                    $variant_exists = FALSE;
                }
                
                if (isset($corrected_formation_info[$assign_order])) {
                    $formation_info = $corrected_formation_info[$assign_order];
                } else {
                    $formation_info = get_formation_info($corrected_formations);
                }
                
                if ($posts_count === 0) {
                    $formation_list = $formation_info["formation_list"];
                    $latest_formation_list = $formation_info["formation_list"];
                } else {
                    $formation_list = array_merge($formation_list, $formation_info["formation_list"]);
                }
            }
        } elseif ($corrected_formations !== $post_data["formations"] && !$post_data["is_quotation"] && !$variant_exists && !in_array($post_data["formations"], $formation_info["formation_pattern"])) {
            $variant_exists = TRUE;
        }
        
        $posts_count++;
    } while (!empty($post_data));
    
    $formation_list = array_merge(array_unique($formation_list));
    
    foreach ($formation_list as $formation_name) {
        $db_obj->query("INSERT INTO `unyohub_data_each_formation` (`formation_name`, `operation_date`, `operation_number`) VALUES ('".$db_obj->escapeString($formation_name)."', '".$operation_date."', '".$operation_number."')");
    }
    
    $data_cache_values["posts_count"] = $posts_count;
    $data_cache_values["formation_list"] = $latest_formation_list;
    
    return $data_cache_values;
}

function update_next_day_data ($today_ts, $starting_location, $starting_track, $formations, $updated_datetime, $formation_list = NULL, $from_beginner = NULL, $is_quotation = NULL) {
    global $db_obj;
    global $diagram_revision;
    
    $next_day_ts = $today_ts + 86400;
    
    update_diagram_revision($next_day_ts);
    $diagram_id = get_diagram_id($next_day_ts);
    
    $operation_number = $db_obj->querySingle("SELECT `operation_number` FROM `unyohub_operations` WHERE `diagram_revision` = '".$diagram_revision."' AND `diagram_id` = '".$diagram_id."' AND `starting_location` = '".$db_obj->escapeString($starting_location)."' AND `starting_track` = '".$db_obj->escapeString($starting_track)."'");
    
    if (!empty($operation_number)) {
        if (!is_null($formations)) {
            $formations_q = "'".$db_obj->escapeString($formations)."'";
        } else {
            $formations_q = "NULL";
        }
        
        $operation_date = date("Y-m-d", $next_day_ts);
        
        if (empty($db_obj->querySingle("SELECT `posts_count` FROM `unyohub_data_caches` WHERE `operation_date` = '".$operation_date."' AND `operation_number` = '".$operation_number."' AND `assign_order` >= 1 LIMIT 1"))) {
            $db_obj->query("INSERT OR REPLACE INTO `unyohub_data_caches` (`operation_date`, `operation_number`, `assign_order`, `formations`, `posts_count`, `variant_exists`, `comment_exists`, `from_beginner`, `is_quotation`, `updated_datetime`) VALUES ('".$operation_date."', '".$db_obj->escapeString($operation_number)."', 0, ".$formations_q.", 0, NULL, NULL, ".intval($from_beginner).", ".intval($is_quotation).", '".$updated_datetime."')");
            
            $db_obj->query("DELETE FROM `unyohub_data_each_formation` WHERE `operation_date` = '".$operation_date."' AND `operation_number` = '".$operation_number."'");
            
            if (!empty($formation_list)) {
                foreach ($formation_list as $formation_name) {
                    $db_obj->query("INSERT INTO `unyohub_data_each_formation` (`formation_name`, `operation_date`, `operation_number`) VALUES ('".$db_obj->escapeString($formation_name)."', '".$operation_date."', '".$operation_number."')");
                }
            }
        }
    }
}

function revoke_post ($operation_date_ts, $operation_number, $assign_order, $post_user_id, $moderator_id) {
    global $wakarana;
    global $railroad_id;
    global $db_obj;
    global $moderation_db_obj;
    
    update_diagram_revision($operation_date_ts);
    
    $operation_data = get_operation_info($operation_date_ts, $operation_number);
    
    $posted_datetime = date("Y-m-d H:i:s");
    
    $operation_date = date("Y-m-d", $operation_date_ts);
    
    $deleted_data = $db_obj->querySingle("DELETE FROM `unyohub_data` WHERE `operation_date` = '".$operation_date."' AND `operation_number` = '".$db_obj->escapeString($operation_number)."' AND `assign_order` = '".intval($assign_order)."' AND `user_id` = '".$db_obj->escapeString($post_user_id)."' RETURNING *", TRUE);
    
    if (substr($post_user_id, 0, 1) !== "*") {
        $user = $wakarana->get_user($post_user_id);
        
        if (is_object($user)){
            $user->increment_value("post_count", -1);
        }
    }
    
    if (!empty($moderator_id) && !empty($deleted_data)) {
        connect_moderation_db();
        
        $moderation_db_obj->query("INSERT INTO `unyohub_moderation_deleted_data` (`moderator_id`, `deleted_datetime`, `railroad_id`, `operation_date`, `operation_number`, `user_id`, `formations`, `posted_datetime`, `comment`, `ip_address`) VALUES ('".$moderator_id."', '".$posted_datetime."', '".$moderation_db_obj->escapeString($railroad_id)."', '".$moderation_db_obj->escapeString($deleted_data["operation_date"])."', '".$moderation_db_obj->escapeString($deleted_data["operation_number"])."', '".$moderation_db_obj->escapeString($deleted_data["user_id"])."', '".$moderation_db_obj->escapeString($deleted_data["formations"])."', '".$moderation_db_obj->escapeString($deleted_data["posted_datetime"])."', '".$moderation_db_obj->escapeString($deleted_data["comment"])."', '".$moderation_db_obj->escapeString($deleted_data["ip_address"])."')");
    }
    
    $data_cache_values = update_data_cache($operation_date, $operation_number, $posted_datetime);
    
    if (!empty($operation_data["terminal_track"])) {
        if (!empty($data_cache_values)) {
            update_next_day_data($operation_date_ts, $operation_data["terminal_location"], $operation_data["terminal_track"], $data_cache_values["formations"], $posted_datetime, $data_cache_values["formation_list"]
            , $data_cache_values["from_beginner"], $data_cache_values["is_quotation"]);
        } else {
            update_next_day_data($operation_date_ts, $operation_data["terminal_location"], $operation_data["terminal_track"], NULL, $posted_datetime);
        }
    }
    
    if (!empty($data_cache_values)) {
        unset($data_cache_values["formation_list"]);
    }
    
    return $data_cache_values;
}
