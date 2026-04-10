<?php
header("Access-Control-Allow-Origin: *");

if (!isset($_POST["railroad_id"], $_POST["date"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$db_obj = new SQLite3("../data/".basename($_POST["railroad_id"])."/railroad.db");
$db_obj->busyTimeout(5000);

$assigned_formations_r = $db_obj->query("SELECT `operation_number`, `formations` FROM `unyohub_assigned_formation_caches` WHERE `operation_date` = '".$db_obj->escapeString($_POST["date"])."'".(!empty($_POST["last_modified_timestamp"]) ? " AND `updated_datetime` > '".date("Y-m-d H:i:s", intval($_POST["last_modified_timestamp"]))."'" : "")." ORDER BY `updated_datetime` DESC, `operation_number` DESC, `assign_order` DESC");
$metadata_r = $db_obj->query("SELECT `operation_number`, `posts_count`, `variant_exists`, `comment_exists`, `from_beginner`, `is_quotation`, `updated_datetime`, `confirmed_train_final_arrival_time` FROM `unyohub_metadata_caches` WHERE `operation_date` = '".$db_obj->escapeString($_POST["date"])."'".(!empty($_POST["last_modified_timestamp"]) ? " AND `updated_datetime` > '".date("Y-m-d H:i:s", intval($_POST["last_modified_timestamp"]))."'" : "")." ORDER BY `updated_datetime` DESC, `operation_number` DESC");

$operation_data = array();
$assigned_formation_data = $assigned_formations_r->fetchArray(SQLITE3_ASSOC);
while ($metadata = $metadata_r->fetchArray(SQLITE3_ASSOC)) {
    if (empty($operation_data)) {
        $updated_datetime = $metadata["updated_datetime"];
    }
    
    if (empty($assigned_formation_data) || $assigned_formation_data["operation_number"] !== $metadata["operation_number"]) {
        $operation_data[$metadata["operation_number"]] = NULL;
        continue;
    }
    
    $operation_data_item = array("formations" => is_null($assigned_formation_data["formations"]) ? "" : $assigned_formation_data["formations"], "posts_count" => $metadata["posts_count"], "confirmed_train_final_arrival_time" => $metadata["confirmed_train_final_arrival_time"]);
    
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
    
    if (!empty($_POST["require_last_posted_datetime"])) {
        $operation_data_item["last_posted_datetime"] = $metadata["updated_datetime"];
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
    
    $operation_data[$metadata["operation_number"]] = $operation_data_item;
}

if (empty($operation_data)) {
    print "NO_UPDATES_AVAILABLE";
} else {
    header("Last-Modified: ".gmdate("D, d M Y H:i:s", strtotime($updated_datetime))." GMT");
    
    if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && str_contains($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) {
        header("Content-Encoding: gzip");
        
        print gzencode(json_encode($operation_data, JSON_UNESCAPED_UNICODE));
    } else {
        print json_encode($operation_data, JSON_UNESCAPED_UNICODE);
    }
}
