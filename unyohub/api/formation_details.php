<?php
if (!isset($_POST["railroad_id"], $_POST["formation_name"])) {
    print "ERROR: 送信値が不正です";
    exit;
}


$db_obj = new SQLite3("../data/".basename($_POST["railroad_id"])."/railroad.db");
$db_obj->busyTimeout(5000);


$formation_data = $db_obj->querySingle("SELECT `formation_name`, `series_name`, `description`, `inspection_information` FROM `unyohub_formations` WHERE `formation_name` = '".$db_obj->escapeString($_POST["formation_name"])."'", TRUE);

if (empty($formation_data)) {
    print "ERROR: 編成詳細データがありません";
    exit;
}

$cars_r = $db_obj->query("SELECT `car_number`, `manufacturer`, `constructed`, `description` FROM `unyohub_cars` WHERE `formation_name` = '".$db_obj->escapeString($_POST["formation_name"])."' ORDER BY `car_order` ASC");

$formation_data["cars"] = array();
while ($car_data = $cars_r->fetchArray(SQLITE3_ASSOC)) {
    $formation_data["cars"][] = $car_data;
}


$formation_data["operations_today"] = NULL;//仮
$formation_data["operations_tomorrow"] = NULL;//仮


if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && strpos($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip") !== FALSE) {
    header("Content-Encoding: gzip");
    
    print gzencode(json_encode($formation_data, JSON_UNESCAPED_UNICODE));
} else {
    print json_encode($formation_data, JSON_UNESCAPED_UNICODE);
}
