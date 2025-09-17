<?php
include "../libs/wakarana/main.php";


function shape_operation_data ($sql_r) {
    $operations = array();
    $operation_number = NULL;
    $cnt = 0;
    
    while ($operation_data = $sql_r->fetchArray(SQLITE3_ASSOC)) {
        if ($operation_data["operation_number"] !== $operation_number) {
            if (!$operation_data["variant_exists"]) {
                unset($operation_data["variant_exists"]);
            }
            if (!$operation_data["comment_exists"]) {
                unset($operation_data["comment_exists"]);
            }
            if (!$operation_data["from_beginner"]) {
                unset($operation_data["from_beginner"]);
            }
            if (!$operation_data["is_quotation"]) {
                unset($operation_data["is_quotation"]);
            }
            
            $operations[] = $operation_data;
            
            $operation_number = $operation_data["operation_number"];
            $cnt++;
        } else {
            if (!isset($operations[$cnt - 1]["relieved_formations"])) {
                $operations[$cnt - 1]["relieved_formations"] = array();
            }
            
            $operations[$cnt - 1]["relieved_formations"][] = $operation_data["formations"];
        }
    }
    
    if ($cnt >= 1) {
        return $operations;
    } else {
        return NULL;
    }
}


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

$histories_r = $db_obj->query("SELECT `event_year_month`, `event_type`, `event_content` FROM `unyohub_formation_histories` WHERE `formation_name` = '".$formation_name."' ORDER BY `event_year_month` ASC");

$formation_data["histories"] = array();
while ($history_data = $histories_r->fetchArray(SQLITE3_ASSOC)) {
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

$posted_date = date("Y-m-d", $ts_now - 10800);
$operations_r = $db_obj->query("SELECT `unyohub_data_caches`.`operation_number`, `unyohub_data_caches`.`formations`, `unyohub_data_caches`.`posts_count`, `unyohub_data_caches`.`variant_exists`, `unyohub_data_caches`.`comment_exists`, `unyohub_data_caches`.`from_beginner`, `unyohub_data_caches`.`is_quotation` FROM `unyohub_data_each_formation`, `unyohub_data_caches` WHERE `unyohub_data_each_formation`.`formation_name` = '".$formation_name."' AND `unyohub_data_each_formation`.`operation_date` = '".$posted_date."' AND `unyohub_data_each_formation`.`operation_date` = `unyohub_data_caches`.`operation_date` AND `unyohub_data_each_formation`.`operation_number` = `unyohub_data_caches`.`operation_number` ORDER BY `unyohub_data_each_formation`.`operation_number` ASC, `unyohub_data_caches`.`assign_order` DESC");

$formation_data["operations_today"] = shape_operation_data($operations_r);

$posted_date = date("Y-m-d", $ts_now + 75600);
$operations_r = $db_obj->query("SELECT `unyohub_data_caches`.`operation_number`, `unyohub_data_caches`.`formations`, `unyohub_data_caches`.`posts_count`, `unyohub_data_caches`.`variant_exists`, `unyohub_data_caches`.`comment_exists`, `unyohub_data_caches`.`from_beginner`, `unyohub_data_caches`.`is_quotation` FROM `unyohub_data_each_formation`, `unyohub_data_caches` WHERE `unyohub_data_each_formation`.`formation_name` = '".$formation_name."' AND `unyohub_data_each_formation`.`operation_date` = '".$posted_date."' AND `unyohub_data_each_formation`.`operation_date` = `unyohub_data_caches`.`operation_date` AND `unyohub_data_each_formation`.`operation_number` = `unyohub_data_caches`.`operation_number` ORDER BY `unyohub_data_each_formation`.`operation_number` ASC, `unyohub_data_caches`.`assign_order` DESC");

$formation_data["operations_tomorrow"] = shape_operation_data($operations_r);

if (is_null($formation_data["operations_today"]) && is_null($formation_data["operations_tomorrow"])) {
    $last_seen_date = $db_obj->querySingle("SELECT `operation_date` FROM `unyohub_data_each_formation` WHERE `formation_name` = '".$formation_name."' ORDER BY `operation_date` DESC LIMIT 1");
    
    if (!empty($last_seen_date)) {
        $formation_data["last_seen_date"] = $last_seen_date;
        
        $operations_r = $db_obj->query("SELECT `unyohub_data_caches`.`operation_number`, `unyohub_data_caches`.`formations`, `unyohub_data_caches`.`posts_count`, `unyohub_data_caches`.`variant_exists`, `unyohub_data_caches`.`comment_exists`, `unyohub_data_caches`.`from_beginner`, `unyohub_data_caches`.`is_quotation` FROM `unyohub_data_each_formation`, `unyohub_data_caches` WHERE `unyohub_data_each_formation`.`formation_name` = '".$formation_name."' AND `unyohub_data_each_formation`.`operation_date` = '".$last_seen_date."' AND `unyohub_data_each_formation`.`operation_date` = `unyohub_data_caches`.`operation_date` AND `unyohub_data_each_formation`.`operation_number` = `unyohub_data_caches`.`operation_number` ORDER BY `unyohub_data_each_formation`.`operation_number` ASC, `unyohub_data_caches`.`assign_order` DESC");
        
        $formation_data["operations_last_day"] = shape_operation_data($operations_r);
    } else {
        $formation_data["last_seen_date"] = NULL;
        $formation_data["operations_last_day"] = NULL;
    }
}


if (!$formation_data["currently_registered"]) {
    unset($formation_data["unavailable"]);
}

unset($formation_data["currently_registered"]);


$user = $wakarana->check();
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


if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && strpos($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip") !== FALSE) {
    header("Content-Encoding: gzip");
    
    print gzencode(json_encode($formation_data, JSON_UNESCAPED_UNICODE));
} else {
    print json_encode($formation_data, JSON_UNESCAPED_UNICODE);
}
