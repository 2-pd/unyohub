<?php
if (!isset($_POST["railroad_id"], $_POST["operation_table"], $_POST["last_modified_timestamp"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$path = "../data/".basename($_POST["railroad_id"])."/operations_".basename($_POST["operation_table"]).".json";

if (!file_exists($path)) {
    print "ERROR: 運用表データがありません";
    exit;
}

$last_modified = filemtime($path);

if (intval($_POST["last_modified_timestamp"]) >= $last_modified) {
    print "NO_UPDATES_AVAILABLE";
} else {
    header("Last-Modified: ".gmdate("D, d M Y H:i:s", $last_modified)." GMT");
    
    if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && strpos($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip") !== FALSE) {
        header("Content-Encoding: gzip");
        print gzencode(file_get_contents($path));
    } else {
        readfile($path);
    }
}
