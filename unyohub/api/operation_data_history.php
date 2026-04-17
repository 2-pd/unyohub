<?php
if (!isset($_POST["railroad_id"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$db_obj = new SQLite3("../data/".basename($_POST["railroad_id"])."/railroad.db");
$db_obj->busyTimeout(5000);

if (empty($_POST["year_month"])) {
    $ts = time();
    $start_date = date("Y-m-d", $ts - 2505600);
    $end_date = date("Y-m-d", $ts);
    
    if (isset($_POST["operation_number"])) {
        $day_after_start_date = date("Y-m-d", $ts - 2419200);
        $day_after_end_date = date("Y-m-d", $ts + 86400);
    }
} elseif (preg_match("/\A2[0-9]{3}-(0[1-9]|1[0-2])\z/", $_POST["year_month"])) {
    $start_date = $_POST["year_month"]."-01";
    $end_date = $_POST["year_month"]."-".date("t", strtotime($_POST["year_month"]));
    
    if (isset($_POST["operation_number"])) {
        $day_after_start_date = $_POST["year_month"]."-02";
        $year = substr($_POST["year_month"], 0, 4);
        $month = substr($_POST["year_month"], 5);
        $day_after_end_date = $month === "12" ? (intval($year) + 1)."-01-01" : $year."-".str_pad(intval($month) + 1, 2, "0", STR_PAD_LEFT)."-01";
    }
} else {
    print "ERROR: 送信値が不正です";
    exit;
}

if (isset($_POST["formation_name"])) {
    if (isset($_POST["operation_number"])) {
        print "ERROR: 送信値が不正です";
        exit;
    }
    
    $sql_r = $db_obj->query("SELECT `unyohub_data_each_formation`.`operation_date`, `unyohub_data_each_formation`.`operation_number`, `unyohub_assigned_formation_caches`.`formations` FROM `unyohub_data_each_formation`, `unyohub_assigned_formation_caches` WHERE `unyohub_data_each_formation`.`formation_name` = '".$db_obj->escapeString($_POST["formation_name"])."' AND `unyohub_data_each_formation`.`operation_date` <= '".$end_date."' AND `unyohub_data_each_formation`.`operation_date` >= '".$start_date."' AND `unyohub_data_each_formation`.`operation_date` = `unyohub_assigned_formation_caches`.`operation_date` AND `unyohub_data_each_formation`.`operation_number` = `unyohub_assigned_formation_caches`.`operation_number` ORDER BY `unyohub_data_each_formation`.`operation_date` ASC, `unyohub_data_each_formation`.`operation_number` ASC, `unyohub_assigned_formation_caches`.`assign_order` DESC");
} elseif (isset($_POST["operation_number"])) {
    $operation_number = $db_obj->escapeString($_POST["operation_number"]);
    
    $sql_r = $db_obj->query("SELECT `operation_date`, `operation_number`, `formations` FROM `unyohub_assigned_formation_caches` WHERE `operation_number` = '".$operation_number."' AND `operation_date` <= '".$end_date."' AND `operation_date` >= '".$start_date."' AND `formations` IS NOT NULL ORDER BY `operation_date` ASC, `assign_order` DESC");
    
    $previous_day_operation_data_r = $db_obj->query("SELECT `operation_date`, `previous_day_operation_number`, `previous_day_formations` FROM `unyohub_transition_data_caches_from_previous_day` WHERE `operation_number` = '".$operation_number."' AND `operation_date` <= '".$end_date."' AND `operation_date` >= '".$start_date."' ORDER BY `operation_date` ASC, `previous_day_operation_number` ASC");
    
    $previous_day_operation_data = array();
    while ($data = $previous_day_operation_data_r->fetchArray(SQLITE3_ASSOC)) {
        if (!isset($previous_day_operation_data[$data["operation_date"]])) {
            $previous_day_operation_data[$data["operation_date"]] = array();
        }
        
        $previous_day_operation_data[$data["operation_date"]][] = array("operation_number" => $data["previous_day_operation_number"], "formations" => $data["previous_day_formations"]);
    }
    
    $former_operation_data_r = $db_obj->query("SELECT `operation_date`, `former_operation_number`, `former_formations` FROM `unyohub_transition_data_caches_same_day` WHERE `operation_number` = '".$operation_number."' AND `operation_date` <= '".$end_date."' AND `operation_date` >= '".$start_date."' ORDER BY `operation_date` ASC, `former_operation_number` ASC");
    
    $former_operation_data = array();
    while ($data = $former_operation_data_r->fetchArray(SQLITE3_ASSOC)) {
        if (!isset($former_operation_data[$data["operation_date"]])) {
            $former_operation_data[$data["operation_date"]] = array();
        }
        
        $former_operation_data[$data["operation_date"]][] = array("operation_number" => $data["former_operation_number"], "formations" => $data["former_formations"]);
    }
    
    $latter_operation_data_r = $db_obj->query("SELECT `operation_date`, `operation_number`, `formations` FROM `unyohub_transition_data_caches_same_day` WHERE `former_operation_number` = '".$operation_number."' AND `operation_date` <= '".$end_date."' AND `operation_date` >= '".$start_date."' ORDER BY `operation_date` ASC, `operation_number` ASC");
    
    $latter_operation_data = array();
    while ($data = $latter_operation_data_r->fetchArray(SQLITE3_ASSOC)) {
        if (!isset($latter_operation_data[$data["operation_date"]])) {
            $latter_operation_data[$data["operation_date"]] = array();
        }
        
        $latter_operation_data[$data["operation_date"]][] = array("operation_number" => $data["operation_number"], "formations" => $data["formations"]);
    }
    
    $next_day_operation_data_r = $db_obj->query("SELECT DATE(`operation_date`, '-1 day') AS `day_before_operation_date`, `operation_number`, `formations` FROM `unyohub_transition_data_caches_from_previous_day` WHERE `previous_day_operation_number` = '".$operation_number."' AND `operation_date` <= '".$day_after_end_date."' AND `operation_date` >= '".$day_after_start_date."' ORDER BY `operation_date` ASC, `operation_number` ASC");
    
    $next_day_operation_data = array();
    while ($data = $next_day_operation_data_r->fetchArray(SQLITE3_ASSOC)) {
        if (!isset($next_day_operation_data[$data["day_before_operation_date"]])) {
            $next_day_operation_data[$data["day_before_operation_date"]] = array();
        }
        
        $next_day_operation_data[$data["day_before_operation_date"]][] = array("operation_number" => $data["operation_number"], "formations" => $data["formations"]);
    }
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
        
        if (isset($_POST["operation_number"])) {
            $data_history[$data["operation_date"]][0]["previous_day_operation_data"] = isset($previous_day_operation_data[$data["operation_date"]]) ? $previous_day_operation_data[$data["operation_date"]] : array();
            $data_history[$data["operation_date"]][0]["former_operation_data"] = isset($former_operation_data[$data["operation_date"]]) ? $former_operation_data[$data["operation_date"]] : array();
            $data_history[$data["operation_date"]][0]["latter_operation_data"] = isset($latter_operation_data[$data["operation_date"]]) ? $latter_operation_data[$data["operation_date"]] : array();
            $data_history[$data["operation_date"]][0]["next_day_operation_data"] = isset($next_day_operation_data[$data["operation_date"]]) ? $next_day_operation_data[$data["operation_date"]] : array();
        }
    } else {
        if (!isset($data_history[$data["operation_date"]][$day_data_length - 1]["relieved_formations"])) {
            $data_history[$data["operation_date"]][$day_data_length - 1]["relieved_formations"] = array($data["formations"]);
        } else {
            array_unshift($data_history[$data["operation_date"]][$day_data_length - 1]["relieved_formations"], $data["formations"]);
        }
    }
}

if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && str_contains($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) {
    header("Content-Encoding: gzip");
    
    print gzencode(json_encode($data_history, JSON_UNESCAPED_UNICODE));
} else {
    print json_encode($data_history, JSON_UNESCAPED_UNICODE);
}
