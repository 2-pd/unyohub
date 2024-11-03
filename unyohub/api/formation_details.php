<?php
if (!isset($_POST["railroad_id"], $_POST["formation_name"])) {
    print "ERROR: 送信値が不正です";
    exit;
}


$db_obj = new SQLite3("../data/".basename($_POST["railroad_id"])."/railroad.db");
$db_obj->busyTimeout(5000);


$formation_name = $db_obj->escapeString($_POST["formation_name"]);

$formation_data = $db_obj->querySingle("SELECT `formation_name`, `series_name`, `description`, `inspection_information` FROM `unyohub_formations` WHERE `formation_name` = '".$formation_name."'", TRUE);

if (empty($formation_data)) {
    print "ERROR: 編成詳細データがありません";
    exit;
}

$cars_r = $db_obj->query("SELECT `car_number`, `manufacturer`, `constructed`, `description` FROM `unyohub_cars` WHERE `formation_name` = '".$formation_name."' ORDER BY `car_order` ASC");

$formation_data["cars"] = array();
while ($car_data = $cars_r->fetchArray(SQLITE3_ASSOC)) {
    $formation_data["cars"][] = $car_data;
}


$ts_now = time();

$posted_date = date("Y-m-d", $ts_now - 10800);
$operations_r = $db_obj->query("SELECT `unyohub_data_caches`.* FROM `unyohub_data_each_formation`, `unyohub_data_caches` WHERE `unyohub_data_each_formation`.`formation_name` = '".$formation_name."' AND `unyohub_data_each_formation`.`operation_date` = '".$posted_date."' AND `unyohub_data_each_formation`.`operation_date` = `unyohub_data_caches`.`operation_date` AND `unyohub_data_each_formation`.`operation_number` = `unyohub_data_caches`.`operation_number` ORDER BY `unyohub_data_each_formation`.`operation_number` ASC");

$formation_data["operations_today"] = array();
while ($operation_data = $operations_r->fetchArray(SQLITE3_ASSOC)) {
    $formation_data["operations_today"][] = $operation_data;
}
if (empty($formation_data["operations_today"])) {
    $formation_data["operations_today"] = NULL;
}

$posted_date = date("Y-m-d", $ts_now + 75600);
$operations_r = $db_obj->query("SELECT `unyohub_data_caches`.* FROM `unyohub_data_each_formation`, `unyohub_data_caches` WHERE `unyohub_data_each_formation`.`formation_name` = '".$formation_name."' AND `unyohub_data_each_formation`.`operation_date` = '".$posted_date."' AND `unyohub_data_each_formation`.`operation_date` = `unyohub_data_caches`.`operation_date` AND `unyohub_data_each_formation`.`operation_number` = `unyohub_data_caches`.`operation_number` ORDER BY `unyohub_data_each_formation`.`operation_number` ASC");

$formation_data["operations_tomorrow"] = array();
while ($operation_data = $operations_r->fetchArray(SQLITE3_ASSOC)) {
    $formation_data["operations_tomorrow"][] = $operation_data;
}
if (empty($formation_data["operations_tomorrow"])) {
    $formation_data["operations_tomorrow"] = NULL;
}

if (is_null($formation_data["operations_today"]) && is_null($formation_data["operations_tomorrow"])) {
    $last_seen_date = $db_obj->querySingle("SELECT `operation_date` FROM `unyohub_data_each_formation` WHERE `formation_name` = '".$formation_name."' ORDER BY `operation_date` DESC LIMIT 1");
    
    if (!empty($last_seen_date)) {
        $formation_data["last_seen_date"] = $last_seen_date;
        
        $operations_r = $db_obj->query("SELECT `unyohub_data_caches`.* FROM `unyohub_data_each_formation`, `unyohub_data_caches` WHERE `unyohub_data_each_formation`.`formation_name` = '".$formation_name."' AND `unyohub_data_each_formation`.`operation_date` = '".$last_seen_date."' AND `unyohub_data_each_formation`.`operation_date` = `unyohub_data_caches`.`operation_date` AND `unyohub_data_each_formation`.`operation_number` = `unyohub_data_caches`.`operation_number` ORDER BY `unyohub_data_each_formation`.`operation_number` ASC");
        
        $formation_data["operations_last_day"] = array();
        while ($operation_data = $operations_r->fetchArray(SQLITE3_ASSOC)) {
            $formation_data["operations_last_day"][] = $operation_data;
        }
    } else {
        $formation_data["last_seen_date"] = NULL;
        $formation_data["operations_last_day"] = NULL;
    }
}


if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && strpos($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip") !== FALSE) {
    header("Content-Encoding: gzip");
    
    print gzencode(json_encode($formation_data, JSON_UNESCAPED_UNICODE));
} else {
    print json_encode($formation_data, JSON_UNESCAPED_UNICODE);
}
