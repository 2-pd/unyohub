<?php
include "../libs/wakarana/main.php";


function get_operation_data ($db_obj, $formation_name, $posted_date) {
    $assigned_formations_r = $db_obj->query("SELECT `unyohub_assigned_formation_caches`.`operation_number`, `unyohub_assigned_formation_caches`.`formations` FROM `unyohub_data_each_formation`, `unyohub_assigned_formation_caches` WHERE `unyohub_data_each_formation`.`formation_name` = '".$formation_name."' AND `unyohub_data_each_formation`.`operation_date` = '".$posted_date."' AND `unyohub_data_each_formation`.`operation_date` = `unyohub_assigned_formation_caches`.`operation_date` AND `unyohub_data_each_formation`.`operation_number` = `unyohub_assigned_formation_caches`.`operation_number` ORDER BY `unyohub_data_each_formation`.`operation_number` ASC, `unyohub_assigned_formation_caches`.`assign_order` DESC");
    $metadata_r = $db_obj->query("SELECT `unyohub_metadata_caches`.`operation_number`, `unyohub_metadata_caches`.`posts_count`, `unyohub_metadata_caches`.`variant_exists`, `unyohub_metadata_caches`.`comment_exists`, `unyohub_metadata_caches`.`from_beginner`, `unyohub_metadata_caches`.`is_quotation` FROM `unyohub_data_each_formation`, `unyohub_metadata_caches` WHERE `unyohub_data_each_formation`.`formation_name` = '".$formation_name."' AND `unyohub_data_each_formation`.`operation_date` = '".$posted_date."' AND `unyohub_data_each_formation`.`operation_date` = `unyohub_metadata_caches`.`operation_date` AND `unyohub_data_each_formation`.`operation_number` = `unyohub_metadata_caches`.`operation_number` ORDER BY `unyohub_data_each_formation`.`operation_number` ASC");
    
    $operation_data = array();
    $assigned_formation_data = $assigned_formations_r->fetchArray(SQLITE3_ASSOC);
    while ($metadata = $metadata_r->fetchArray(SQLITE3_ASSOC)) {
        $operation_data_item = array("operation_number" => $assigned_formation_data["operation_number"], "formations" => is_null($assigned_formation_data["formations"]) ? "" : $assigned_formation_data["formations"], "posts_count" => $metadata["posts_count"]);
        
        if ($metadata["variant_exists"]) {
            $operation_data_item["variant_exists"] = TRUE;
        }
        if ($metadata["comment_exists"]) {
            $operation_data_item["comment_exists"] = TRUE;
        }
        if ($metadata["from_beginner"]) {
            $operation_data_item["from_beginner"] = TRUE;
        }
        if ($metadata["is_quotation"]) {
            $operation_data_item["is_quotation"] = TRUE;
        }
        
        while ($assigned_formation_data = $assigned_formations_r->fetchArray(SQLITE3_ASSOC)) {
            if ($assigned_formation_data["operation_number"] !== $metadata["operation_number"]) {
                break;
            }
            
            if (!isset($operation_data_item["relieved_formations"])) {
                $operation_data_item["relieved_formations"] = array(is_null($assigned_formation_data["formations"]) ? "" : $assigned_formation_data["formations"]);
            } else {
                array_unshift($operation_data_item["relieved_formations"], is_null($assigned_formation_data["formations"]) ? "" : $assigned_formation_data["formations"]);
            }
        }
        
        $operation_data[] = $operation_data_item;
    }
    
    if (!empty($operation_data)) {
        return $operation_data;
    } else {
        return NULL;
    }
}


header("Access-Control-Allow-Origin: *");


if (!isset($_POST["railroad_id"], $_POST["formation_name"])) {
    print "ERROR: 送信値が不正です";
    exit;
}


$wakarana = new wakarana("../config");


$db_obj = new SQLite3("../data/".basename($_POST["railroad_id"])."/railroad.db");
$db_obj->busyTimeout(5000);


$formation_name = $db_obj->escapeString($_POST["formation_name"]);

$formation_data = $db_obj->querySingle("SELECT `formation_name`, `currently_registered`, `series_name`, `subseries_name`, `affiliation`, `caption`, `description`, `semifixed_formation`, `unavailable`, `inspection_information`, `updated_datetime`, `edited_user_id` FROM `unyohub_formations` WHERE `formation_name` = '".$formation_name."'", TRUE);

if (empty($formation_data)) {
    print "ERROR: 編成詳細データがありません";
    exit;
}

$cars_r = $db_obj->query("SELECT `car_number`, `manufacturer`, `constructed`, `description` FROM `unyohub_cars` WHERE `formation_name` = '".$formation_name."' AND `car_order` IS NOT NULL ORDER BY `car_order` ASC");

$cars = array();
while ($car_data = $cars_r->fetchArray(SQLITE3_ASSOC)) {
    $cars[] = $car_data;
}

if (!empty($cars)) {
    $formation_data["cars"] = $cars;
}

$car_histories_r = $db_obj->query("SELECT `record_number`, `car_number` FROM `unyohub_car_histories` WHERE `formation_name` = '".$formation_name."'");

$related_cars = array();
while ($car_history_data = $car_histories_r->fetchArray(SQLITE3_ASSOC)) {
    if (!isset($related_cars[$car_history_data["record_number"]])) {
        $related_cars[$car_history_data["record_number"]] = array();
    }
    $related_cars[$car_history_data["record_number"]][] = $car_history_data["car_number"];
}

$histories_r = $db_obj->query("SELECT `record_number`, `event_year_month`, `event_type`, `event_content` FROM `unyohub_formation_histories` WHERE `formation_name` = '".$formation_name."' ORDER BY `event_year_month` ASC");

$formation_data["histories"] = array();
while ($history_data = $histories_r->fetchArray(SQLITE3_ASSOC)) {
    $history_data["related_cars"] = isset($related_cars[$history_data["record_number"]]) ? $related_cars[$history_data["record_number"]] : array();
    unset($history_data["record_number"]);
    $formation_data["histories"][] = $history_data;
}

if (is_null($formation_data["subseries_name"])) {
    unset($formation_data["subseries_name"]);
}

if (empty($formation_data["semifixed_formation"])) {
    unset($formation_data["semifixed_formation"]);
}

$reference_books_r = $db_obj->query("SELECT `unyohub_reference_books`.* FROM `unyohub_formation_reference_books`, `unyohub_reference_books` WHERE `unyohub_formation_reference_books`.`formation_name` = '".$formation_name."' AND `unyohub_formation_reference_books`.`publisher_name` = `unyohub_reference_books`.`publisher_name` AND `unyohub_formation_reference_books`.`book_title` = `unyohub_reference_books`.`book_title`");

$reference_books = array();
while ($reference_book_info = $reference_books_r->fetchArray(SQLITE3_ASSOC)) {
    $reference_books[] = $reference_book_info;
}

if (!empty($reference_books)) {
    $formation_data["reference_books"] = $reference_books;
}


$ts_now = time();

$formation_data["operations_today"] = get_operation_data($db_obj, $formation_name, date("Y-m-d", $ts_now - 14400));
$formation_data["operations_tomorrow"] = get_operation_data($db_obj, $formation_name, date("Y-m-d", $ts_now + 72000));

if (is_null($formation_data["operations_today"]) && is_null($formation_data["operations_tomorrow"])) {
    $last_seen_date = $db_obj->querySingle("SELECT `operation_date` FROM `unyohub_data_each_formation` WHERE `formation_name` = '".$formation_name."' ORDER BY `operation_date` DESC LIMIT 1");
    
    if (!empty($last_seen_date)) {
        $formation_data["last_seen_date"] = $last_seen_date;
        $formation_data["operations_last_day"] = get_operation_data($db_obj, $formation_name, $last_seen_date);
    } else {
        $formation_data["last_seen_date"] = NULL;
        $formation_data["operations_last_day"] = NULL;
    }
}


if (!$formation_data["currently_registered"]) {
    unset($formation_data["unavailable"]);
}

unset($formation_data["currently_registered"]);


if (isset($_SERVER["HTTP_ORIGIN"]) && str_ends_with($_SERVER["HTTP_ORIGIN"], "://".$_SERVER["HTTP_HOST"])) {
    $user = $wakarana->check();
} else {
    $user = FALSE;
}

if (is_object($user)) {
    if (!empty($formation_data["edited_user_id"]) && $user->check_permission("control_panel_user")) {
        $edited_user = $wakarana->get_user($formation_data["edited_user_id"]);
        
        if (is_object($edited_user)) {
            $formation_data["edited_user_name"] = $edited_user->get_name();
        }
    }
    
    if ($user->check_permission("railroads/".basename($_POST["railroad_id"])."/formation", "edit_data")) {
        $formation_data["editable"] = TRUE;
    }
}

unset($formation_data["edited_user_id"]);


$formation_data["updated_timestamp"] = strtotime($formation_data["updated_datetime"]);

unset($formation_data["updated_datetime"]);


if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && str_contains($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) {
    header("Content-Encoding: gzip");
    
    print gzencode(json_encode($formation_data, JSON_UNESCAPED_UNICODE));
} else {
    print json_encode($formation_data, JSON_UNESCAPED_UNICODE);
}
