<?php
function load_railroad_data ($id) {
    global $railroad_id;
    global $railroad_info;
    global $db_obj;
    
    $railroad_id = basename($id);
    
    $base_path = "../data/".$railroad_id."/";
    
    $railroad_info = json_decode(file_get_contents($base_path."railroad_info.json"), TRUE);
    
    $db_obj = new SQLite3($base_path."railroad.db");
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

function get_operation_table ($ts) {
    global $railroad_info;
    
    $toshi = date("Y", $ts);
    
    $holiday_list = ["1/1", "2/11", "2/23", "4/29", "5/3", "5/4", "5/5", "8/11", "11/3", "11/23"];
    $happy_monday_list = ["1-second", "7-third", "9-third", "10-second"];
    
    $holiday_list[] = "3/".floor(20.8431 + 0.242194 * ($toshi - 1980)) - floor(($toshi - 1980) / 4);
    $shubun = floor(23.2488 + 0.242194 * ($toshi - 1980)) - floor(($toshi - 1980) / 4);
    $holiday_list[] = "9/".$shubun;
    
    for ($hm_cnt = 0; $hm_cnt < count($happy_monday_list); $hm_cnt++) {
        $bunkatsu = explode("-", $happy_monday_list[$hm_cnt]);
        
        $holiday_list[] = $bunkatsu[0]."/".date("j", strtotime($bunkatsu[1]." Monday of ".$toshi."-".$bunkatsu[0]));
    }
    
    for ($h_cnt = 0; $h_cnt < count($holiday_list); $h_cnt++) {
        if (date("D", strtotime($toshi."/".$holiday_list[$h_cnt])) === "Sun") {
            $bunkatsu = explode("/", $holiday_list[$h_cnt]);
            
            $furikae_cnt = 0;
            do {
                $furikae_cnt++;
                $hizuke = $bunkatsu[0]."/".(intval($bunkatsu[1]) + $furikae_cnt);
            } while (array_search($hizuke, $holiday_list) !== FALSE);
            
            $holiday_list[] = $hizuke;
        }
    }
    
    if (array_search("9/".($shubun - 2), $holiday_list) !== FALSE) {
        $holiday_list[] = "9/".($shubun - 1);
    }
    
    $today = date("n/j", $ts);
    $today_mm_dd = date("m-d", $ts);
    if (array_key_exists($today_mm_dd, $railroad_info["operations_by_date"])) {
        return $railroad_info["operations_by_date"][$today_mm_dd];
    } elseif (array_search($today, $holiday_list) !== FALSE) {
        return $railroad_info["operations_by_day"][0];
    } else {
        return $railroad_info["operations_by_day"][intval(date("w", $ts))];
    }
}

function get_operation_info ($ts, $operation_number) {
    global $db_obj;
    
    $operation_table = get_operation_table($ts);
    
    $operation_data = $db_obj->querySingle("SELECT * FROM `unyohub_operations` WHERE `operation_table` = '".$operation_table."' AND `operation_number` = '".$db_obj->escapeString($operation_number)."'", TRUE);
    
    if (empty($operation_data)) {
        print "ERROR: 運用番号が不正です";
        exit;
    }
    
    return $operation_data;
}

function check_formation ($formations_str) {
    global $db_obj;
    
    $formations = explode("+", $formations_str);
    
    if (count($formations) > 5) {
        print "ERROR: 組成に含まれる編成数が多すぎます";
        exit;
    }
    
    $coupling_group_intersection = NULL;
    $formation_pattern = array("");
    $formation_list = array();
    $formation_pattern_last = array(NULL);
    $min_car_count_range = 0;
    $max_car_count_range = 0;
    foreach ($formations as $formation) {
        if ($formation !== "?") {
            $formation_escaped = $db_obj->escapeString($formation);
            
            $formation_data = $db_obj->querySingle("SELECT `series_name`, `car_count` FROM `unyohub_formations` WHERE `formation_name` = '".$formation_escaped."' OR `series_name` = '".$formation_escaped."' LIMIT 1", TRUE);
            
            if (empty($formation_data)) {
                print "ERROR: 入力された編成名・車両形式に誤りがあります";
                exit;
            }
            
            $series_name = $formation_data["series_name"];
            
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
            
            if ($series_name !== $formation) {
                $formation_list[] = $formation;
                
                $min_car_count_range += $formation_data["car_count"];
                $max_car_count_range += $formation_data["car_count"];
            } else {
                $series_data = $db_obj->querySingle("SELECT `min_car_count`, `max_car_count` FROM `unyohub_series` WHERE `series_name` = '".$formation_escaped."'", TRUE);
                
                $min_car_count_range += $series_data["min_car_count"];
                if (empty($coupling_groups)){
                    $max_car_count_range += $series_data["max_car_count"];
                } else {
                    $max_car_count_range += 20;
                }
            }
        } else {
            $series_name = "?";
            
            if (is_array($coupling_group_intersection) && empty($coupling_group_intersection)) {
                print "ERROR: 併結できない編成の組み合わせです";
                exit;
            }
            
            $min_car_count_range += 1;
            $max_car_count_range += 20;
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
            
            if ($series_name !== $formation) {
                $formation_pattern_2[] = $forward_pattern.$series_name;
                $formation_pattern_last_2[] = $series_name;
            }
            
            if ($formation !== "?") {
                $formation_pattern_2[] = $forward_pattern."?";
                $formation_pattern_last_2[] = "?";
            }
            
            if ($formation_pattern_last[$cnt] === $series_name) {
                $formation_pattern_2[] = $formation_pattern[$cnt];
                $formation_pattern_last_2[] = $series_name;
            } elseif ($formation_pattern_last[$cnt] === "?") {
                $formation_pattern_2[] = $formation_pattern[$cnt];
                $formation_pattern_last_2[] = "?";
            }
        }
        
        $formation_pattern = $formation_pattern_2;
        $formation_pattern_last = $formation_pattern_last_2;
    }
    
    if (!empty($formation_list) && max(array_count_values($formation_list)) >= 2) {
        print "ERROR: 投稿しようとしている情報には同一の編成が複数含まれています";
        exit;
    }
    
    return array("formation_pattern" => array_merge(array_unique($formation_pattern)), "formation_list" => $formation_list, "min_car_count_range" => $min_car_count_range, "max_car_count_range" => $max_car_count_range);
}

function get_data_cache_values ($operation_date, $operation_number, $formation_pattern) {
    global $db_obj;
    
    $post_data_r = $db_obj->query("SELECT `formations` FROM `unyohub_data` WHERE `operation_date` = '".$operation_date."' AND `operation_number` = '".$operation_number."' ORDER BY `posted_datetime` DESC");
    
    $variant_exists = FALSE;
    for ($posts_count = 0; $post_data = $post_data_r->fetchArray(SQLITE3_NUM); $posts_count++) {
        if ($posts_count !== 0 && !in_array($post_data[0], $formation_pattern)) {
            $variant_exists = TRUE;
        }
    }
    
    return array("posts_count" => $posts_count, "variant_exists" => $variant_exists);
}

function update_data_cache ($operation_date, $operation_number, $formations, $updated_datetime, $formation_list = NULL, $posts_count = "NULL", $variant_exists = "NULL", $comment_exists = "NULL", $from_beginner = "NULL") {
    global $db_obj;
    
    $operation_number = $db_obj->escapeString($operation_number);
    
    if ($formations !== NULL) {
        $formations_str = "'".$db_obj->escapeString($formations)."'";
    } else {
        $formations_str = "NULL";
    }
    
    $db_obj->query("INSERT OR REPLACE INTO `unyohub_data_caches` (`operation_date`, `operation_number`, `formations`, `posts_count`, `variant_exists`, `comment_exists`, `from_beginner`, `updated_datetime`) VALUES ('".$operation_date."', '".$operation_number."', ".$formations_str.", ".intval($posts_count).", ".intval($variant_exists).", ".intval($comment_exists).", ".intval($from_beginner).", '".$updated_datetime."')");
    
    $db_obj->query("DELETE FROM `unyohub_data_each_formation` WHERE `operation_date` = '".$operation_date."' AND `operation_number` = '".$operation_number."'");
    
    if ($formations !== NULL) {
        foreach ($formation_list as $formation_name) {
            $db_obj->query("INSERT INTO `unyohub_data_each_formation` (`formation_name`, `operation_date`, `operation_number`) VALUES ('".$db_obj->escapeString($formation_name)."', '".$operation_date."', '".$operation_number."')");
        }
    }
}

function update_next_day_data ($today_ts, $starting_location, $starting_track, $formations, $posted_datetime, $formation_list = NULL, $from_beginner = "NULL") {
    global $db_obj;
    
    $next_day_ts = $today_ts + 86400;
    
    $operation_table = get_operation_table($next_day_ts);
    
    $operation_number = $db_obj->querySingle("SELECT `operation_number` FROM `unyohub_operations` WHERE `operation_table` = '".$operation_table."' AND `starting_location` = '".$db_obj->escapeString($starting_location)."' AND `starting_track` = '".$db_obj->escapeString($starting_track)."'");
    
    if (!empty($operation_number)) {
        $operation_date = date("Y-m-d", $next_day_ts);
        
        if (empty($db_obj->querySingle("SELECT `posts_count` FROM `unyohub_data_caches` WHERE `operation_date` = '".$operation_date."' AND `operation_number` = '".$operation_number."'"))) {
            update_data_cache($operation_date, $operation_number, $formations, $posted_datetime, $formation_list, 0, FALSE, FALSE, $from_beginner);
        }
    }
}

function revoke_post ($wakarana, $operation_date_ts, $operation_number, $post_user_id, $moderator_id) {
    global $railroad_id;
    global $db_obj;
    global $moderation_db_obj;
    
    $operation_data = get_operation_info($operation_date_ts, $operation_number);
    
    $posted_datetime = date("Y-m-d H:i:s");
    
    $operation_date = date("Y-m-d", $operation_date_ts);
    
    $deleted_data = $db_obj->querySingle("DELETE FROM `unyohub_data` WHERE `operation_date` = '".$operation_date."' AND `operation_number` = '".$db_obj->escapeString($operation_number)."' AND `user_id` = '".$db_obj->escapeString($post_user_id)."' RETURNING *", TRUE);
    
    if (substr($post_user_id, 0, 1) !== "*") {
        $user = $wakarana->get_user($post_user_id);
        
        if (is_object($user)){
            $user->set_value("post_count", intval($user->get_value("post_count")) - 1);
        }
    }
    
    if (!empty($moderator_id) && !empty($deleted_data)) {
        connect_moderation_db();
        
        $moderation_db_obj->query("INSERT INTO `unyohub_moderation_deleted_data` (`moderator_id`, `deleted_datetime`, `railroad_id`, `operation_date`, `operation_number`, `user_id`, `formations`, `posted_datetime`, `comment`, `ip_address`) VALUES ('".$moderator_id."', '".$posted_datetime."', '".$moderation_db_obj->escapeString($railroad_id)."', '".$moderation_db_obj->escapeString($deleted_data["operation_date"])."', '".$moderation_db_obj->escapeString($deleted_data["operation_number"])."', '".$moderation_db_obj->escapeString($deleted_data["user_id"])."', '".$moderation_db_obj->escapeString($deleted_data["formations"])."', '".$moderation_db_obj->escapeString($deleted_data["posted_datetime"])."', '".$moderation_db_obj->escapeString($deleted_data["comment"])."', '".$moderation_db_obj->escapeString($deleted_data["ip_address"])."')");
    }
    
    $latest_data = $db_obj->querySingle("SELECT `formations`, `user_id`, `comment` FROM `unyohub_data` WHERE `operation_date` = '".$operation_date."' AND `operation_number` = '".$operation_number."' ORDER BY `posted_datetime` DESC LIMIT 1", TRUE);
    
    if (!empty($latest_data)) {
        $formations = $latest_data["formations"];
        
        if ($formations !== "") {
            $formation_data = check_formation($formations);
            
            $formation_pattern = $formation_data["formation_pattern"];
            $formation_list = $formation_data["formation_list"];
        } else {
            $formation_pattern = array("");
            $formation_list = array();
        }
        
        $from_beginner = TRUE;
        if (substr($latest_data["user_id"], 0, 1) !== "*") {
            $post_user = $wakarana->get_user($latest_data["user_id"]);
            
            if (is_object($post_user)){
                $days_posted = intval($post_user->get_value("days_posted"));
                
                if ($days_posted >= 20 || ($days_posted >= 10 && intval($post_user->get_value("post_count")) >= 50) || $post_user->check_permission("moderate")) {
                    $from_beginner = FALSE;
                }
            }
        }
        
        $data_cache_values = get_data_cache_values($operation_date, $operation_number, $formation_pattern);
        
        $comment_exists = boolval(strlen($latest_data["comment"]));
        
        update_data_cache($operation_date, $operation_number, $formations, $posted_datetime, $formation_list, $data_cache_values["posts_count"], $data_cache_values["variant_exists"], $comment_exists, $from_beginner);
        
        if (!empty($operation_data["terminal_track"])) {
            update_next_day_data($operation_date_ts, $operation_data["terminal_location"], $operation_data["terminal_track"], $formations, $posted_datetime, $formation_list, $from_beginner);
        }
        
        return array("formations" => $formations, "posts_count" => $data_cache_values["posts_count"], "variant_exists" => $data_cache_values["variant_exists"], "comment_exists" => $comment_exists, "from_beginner" => $from_beginner);
    } else {
        if (!empty($operation_data["terminal_track"])) {
            update_next_day_data($operation_date_ts, $operation_data["terminal_location"], $operation_data["terminal_track"], NULL, $posted_datetime);
        }
        
        if (!empty($operation_data["starting_track"])) {
            $previous_day_data = $db_obj->querySingle("SELECT `unyohub_data_caches`.`formations`, `unyohub_data_caches`.`from_beginner` FROM `unyohub_operations`, `unyohub_data_caches` WHERE `unyohub_operations`.`operation_table` = '".$db_obj->escapeString(get_operation_table($operation_date_ts - 86400))."' AND `unyohub_operations`.`terminal_location` = '".$db_obj->escapeString($operation_data["starting_location"])."' AND `unyohub_operations`.`terminal_track` = '".$db_obj->escapeString($operation_data["starting_track"])."' AND `unyohub_data_caches`.`operation_date` = '".date("Y-m-d", $operation_date_ts - 86400)."' AND `unyohub_data_caches`.`operation_number` = `unyohub_operations`.`operation_number`", TRUE);
            
            if (!empty($previous_day_data)) {
                update_data_cache($operation_date, $operation_number, $previous_day_data["formations"], $posted_datetime, explode("+", $previous_day_data["formations"]), 0, FALSE, FALSE, $previous_day_data["from_beginner"]);
                
                return array("formations" => $previous_day_data["formations"], "posts_count" => 0, "variant_exists" => FALSE, "comment_exists" => FALSE, "from_beginner" => $previous_day_data["from_beginner"]);
            }
        }
        
        update_data_cache($operation_date, $operation_number, NULL, $posted_datetime);
        
        return NULL;
    }
}
