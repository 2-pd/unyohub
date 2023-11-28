<?php
if (!isset($_POST["railroad_id"], $_POST["date"], $_POST["last_modified_timestamp"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$db_obj = new SQLite3("../data/".basename($_POST["railroad_id"])."/railroad.db");
$db_obj->busyTimeout(5000);

$operations_r = $db_obj->query("SELECT `operation_number`, `formations`, `variants_count`, `updated_datetime` FROM `unyohub_data_caches` WHERE `operation_date` = '".$db_obj->escapeString($_POST["date"])."' AND `updated_datetime` > '".date("Y-m-d H:i:s", intval($_POST["last_modified_timestamp"]))."' ORDER BY `updated_datetime` DESC");

$operation_data = array();
while ($operation = $operations_r->fetchArray(SQLITE3_ASSOC)) {
    if (empty($operation_data)) {
        $updated_datetime = $operation["updated_datetime"];
    }
    
    if (!is_null($operation["formations"])) {
        $operation_data[$operation["operation_number"]] = array("formations" => $operation["formations"], "variants_count" => $operation["variants_count"]);
    } else {
        $operation_data[$operation["operation_number"]] = NULL;
    }
}

if (empty($operation_data)) {
    print "NO_UPDATES_AVAILABLE";
} else {
    header("Last-Modified: ".gmdate("D, d M Y H:i:s", strtotime($updated_datetime))." GMT");
    
    if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && strpos($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip") !== FALSE) {
        header("Content-Encoding: gzip");
        
        print gzencode(json_encode($operation_data, JSON_UNESCAPED_UNICODE));
    } else {
        print json_encode($operation_data, JSON_UNESCAPED_UNICODE);
    }
}
