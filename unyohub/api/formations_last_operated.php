<?php
header("Access-Control-Allow-Origin: *");

if (!isset($_POST["railroad_id"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$db_obj = new SQLite3("../data/".basename($_POST["railroad_id"])."/railroad.db");
$db_obj->busyTimeout(5000);

$sql_r = $db_obj->query("
    SELECT
        `unyohub_data_each_formation`.`formation_name`,
        `unyohub_data_each_formation`.`operation_date`,
        `unyohub_data_each_formation`.`operation_number`,
        `unyohub_assigned_formation_caches`.`formations`
    FROM `unyohub_data_each_formation`
    JOIN `unyohub_formations` ON `unyohub_data_each_formation`.`formation_name` = `unyohub_formations`.`formation_name`
    JOIN `unyohub_assigned_formation_caches` ON `unyohub_data_each_formation`.`operation_date` = `unyohub_assigned_formation_caches`.`operation_date` AND `unyohub_data_each_formation`.`operation_number` = `unyohub_assigned_formation_caches`.`operation_number`
    JOIN (
        SELECT `formation_name`, MAX(`operation_date`) AS `max_date`
        FROM `unyohub_data_each_formation`
        WHERE `operation_date` <= '".date("Y-m-d", time() - 14400)."'
        GROUP BY `formation_name`
    ) AS `latest` ON `unyohub_data_each_formation`.`formation_name` = `latest`.`formation_name` AND `unyohub_data_each_formation`.`operation_date` = `latest`.`max_date`
    WHERE `unyohub_formations`.`currently_registered` = 1
    ORDER BY `unyohub_data_each_formation`.`formation_name` ASC, `unyohub_data_each_formation`.`operation_number` ASC, `unyohub_assigned_formation_caches`.`assign_order` DESC
");

$operation_data = array();
while ($row = $sql_r->fetchArray(SQLITE3_ASSOC)) {
    $formation_name = $row["formation_name"];
    
    if (!isset($operation_data[$formation_name])) {
        $operation_data[$formation_name] = array("last_operated_date" => $row["operation_date"], "operations" => array(array("operation_number" => $row["operation_number"], "formations" => is_null($row["formations"]) ? "" : $row["formations"])));
    } elseif ($row["operation_number"] !== $last_operation_number) {
        $operation_data[$formation_name]["operations"][] = array("operation_number" => $row["operation_number"], "formations" => is_null($row["formations"]) ? "" : $row["formations"]);
    } else {
        $operation_index = count($operation_data[$formation_name]["operations"]) - 1;
        
        if (!isset($operation_data[$formation_name]["operations"][$operation_index]["relieved_formations"])) {
            $operation_data[$formation_name]["operations"][$operation_index]["relieved_formations"] = array();
        }
        
        array_unshift($operation_data[$formation_name]["operations"][$operation_index]["relieved_formations"], is_null($row["formations"]) ? "" : $row["formations"]);
    }
    
    $last_operation_number = $row["operation_number"];
}

if (empty($operation_data)) {
    print "NO_UPDATES_AVAILABLE";
} else {
    if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && str_contains($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) {
        header("Content-Encoding: gzip");
        
        print gzencode(json_encode($operation_data, JSON_UNESCAPED_UNICODE));
    } else {
        print json_encode($operation_data, JSON_UNESCAPED_UNICODE);
    }
}
