<?php
header("Access-Control-Allow-Origin: *");

define("JSON_PATH", "../config/railroads.json");

$last_modified = @filemtime(JSON_PATH);
if ($last_modified === FALSE) {
    print "ERROR: 路線系統一覧ファイルにアクセスできません";
    exit;
}

if (!empty($_POST["last_modified_timestamp"]) && $last_modified <= intval($_POST["last_modified_timestamp"])) {
    print "NO_UPDATES_AVAILABLE";
} else {
    header("Last-Modified: ".gmdate("D, d M Y H:i:s", $last_modified)." GMT");
    
    if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && str_contains($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) {
        header("Content-Encoding: gzip");
        print gzencode(file_get_contents(JSON_PATH));
    } else {
        readfile(JSON_PATH);
    }
}
