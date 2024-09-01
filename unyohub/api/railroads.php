<?php
define("JSON_PATH", "../config/railroads.json");

if (!isset($_POST["last_modified_timestamp"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$last_modified = @filemtime(JSON_PATH);
if ($last_modified === FALSE) {
    print "ERROR: 路線系統一覧ファイルにアクセスできません";
    exit;
}

if ($last_modified <= intval($_POST["last_modified_timestamp"])) {
    print "NO_UPDATES_AVAILABLE";
} else {
    header("Last-Modified: ".gmdate("D, d M Y H:i:s", $last_modified)." GMT");
    
    if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && strpos($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip") !== FALSE) {
        header("Content-Encoding: gzip");
        print gzencode(file_get_contents(JSON_PATH));
    } else {
        readfile(JSON_PATH);
    }
}
