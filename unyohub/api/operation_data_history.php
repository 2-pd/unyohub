<?php
if (!isset($_POST["railroad_id"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$db_obj = new SQLite3("../data/".basename($_POST["railroad_id"])."/railroad.db");
$db_obj->busyTimeout(5000);

$ts = time();
$one_month_ago_date = date("Y-m-d", $ts - 2592000);
$today_date = date("Y-m-d", $ts);

if (isset($_POST["formation_name"])) {
    $sql_r = $db_obj->query("SELECT `unyohub_data_each_formation`.`operation_date`, `unyohub_data_each_formation`.`operation_number`, `unyohub_data_caches`.`formations` FROM `unyohub_data_each_formation`, `unyohub_data_caches` WHERE `unyohub_data_each_formation`.`formation_name` = '".$db_obj->escapeString($_POST["formation_name"])."' AND `unyohub_data_each_formation`.`operation_date` < '".$today_date."' AND `unyohub_data_each_formation`.`operation_date` > '".$one_month_ago_date."' AND `unyohub_data_each_formation`.`operation_date` = `unyohub_data_caches`.`operation_date` AND `unyohub_data_each_formation`.`operation_number` = `unyohub_data_caches`.`operation_number` ORDER BY `unyohub_data_each_formation`.`operation_date` ASC, `unyohub_data_each_formation`.`operation_number` ASC, `unyohub_data_caches`.`assign_order` DESC");
} elseif (isset($_POST["operation_number"])) {
    $sql_r = $db_obj->query("SELECT `operation_date`, `operation_number`, `formations` FROM `unyohub_data_caches` WHERE `operation_number` = '".$db_obj->escapeString($_POST["operation_number"])."' AND `operation_date` < '".$today_date."' AND `operation_date` > '".$one_month_ago_date."' ORDER BY `operation_date` ASC, `assign_order` DESC");
} else {
    print "ERROR: 送信値が不正です";
    exit;
}

$data_history = array();
while ($data = $sql_r->fetchArray(SQLITE3_ASSOC)) {
    if (!isset($data_history[$data["operation_date"]])) {
        $data_history[$data["operation_date"]] = array();
        $day_data_length = 0;
    } else {
        $day_data_length = count($data_history[$data["operation_date"]]);
    }
    
    if ($day_data_length === 0 || $data["operation_number"] !== $data_history[$data["operation_date"]][$day_data_length - 1]["operation_number"]) {
        $data_history[$data["operation_date"]][] = array("operation_number" => $data["operation_number"], "formations" => $data["formations"]);
    } else {
        if (!isset($data_history[$data["operation_date"]][$day_data_length - 1]["relieved_formations"])) {
            $data_history[$data["operation_date"]][$day_data_length - 1]["relieved_formations"] = array();
        }
        
        array_unshift($data_history[$data["operation_date"]][$day_data_length - 1]["relieved_formations"], $data["formations"]);
    }
}

if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && strpos($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip") !== FALSE) {
    header("Content-Encoding: gzip");
    
    print gzencode(json_encode($data_history, JSON_UNESCAPED_UNICODE));
} else {
    print json_encode($data_history, JSON_UNESCAPED_UNICODE);
}
