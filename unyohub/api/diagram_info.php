<?php
header("Access-Control-Allow-Origin: *");

if (!isset($_POST["railroad_id"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$railroad_id = basename($_POST["railroad_id"]);

if (!empty($_POST["diagram_revision"])) {
    $diagram_revision = basename($_POST["diagram_revision"]);
} else {
    include "__operation_data_functions.php";
    
    if (!load_railroad_data($railroad_id)) {
        exit;
    }
    
    $ts = time() - 14400;
    $operation_date = date("Y-m-d", $ts);
    update_diagram_revision($operation_date);
}

$path = "../data/".$railroad_id."/".$diagram_revision."/diagram_info.json";

if (!file_exists($path)) {
    print "ERROR: ダイヤ情報データがありません";
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
