<?php
header("Access-Control-Allow-Origin: *");

if (!isset($_POST["railroad_id"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$railroad_id = basename($_POST["railroad_id"]);

if (!empty($_POST["diagram_revision"]) && !empty($_POST["timetable_id"])) {
    $diagram_revision = basename($_POST["diagram_revision"]);
    $timetable_id = basename($_POST["timetable_id"]);
} else {
    include "__operation_data_functions.php";
    
    load_railroad_data($railroad_id);
    
    $ts = time() - 14400;
    
    if (empty($_POST["diagram_revision"])) {
        $operation_date = date("Y-m-d", $ts);
        update_diagram_revision($operation_date);
    } else {
        update_diagram_revision(basename($_POST["diagram_revision"]));
    }
    
    if (empty($_POST["timetable_id"])) {
        $diagram_id = get_diagram_id($ts);
        
        if (!empty($diagram_id)) {
            $timetable_id = $diagram_info["diagrams"][$diagram_id]["timetable_id"];
        } else {
            $timetable_id = "";
        }
    } else {
        $timetable_id = basename($_POST["timetable_id"]);
    }
}

$path = "../data/".$railroad_id."/".$diagram_revision."/timetable_".$timetable_id.".json";

if (!file_exists($path)) {
    print "ERROR: 時刻表データがありません";
    exit;
}

$last_modified = filemtime($path);

if (!empty($_POST["last_modified_timestamp"]) && intval($_POST["last_modified_timestamp"]) >= $last_modified) {
    print "NO_UPDATES_AVAILABLE";
} else {
    header("Last-Modified: ".gmdate("D, d M Y H:i:s", $last_modified)." GMT");
    
    if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && str_contains($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) {
        header("Content-Encoding: gzip");
        print gzencode(file_get_contents($path));
    } else {
        readfile($path);
    }
}
