<?php
if (!isset($_POST["railroad_id"], $_POST["last_modified_timestamp"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$path = "../data/".basename($_POST["railroad_id"])."/diagram_revisions.txt";

if (!file_exists($path)) {
    print "ERROR: ダイヤ改正一覧データがありません";
    exit;
}

$last_modified = filemtime($path);

if (intval($_POST["last_modified_timestamp"]) >= $last_modified) {
    print "NO_UPDATES_AVAILABLE";
} else {
    header("Last-Modified: ".gmdate("D, d M Y H:i:s", $last_modified)." GMT");
    
    $diagram_revisions_json = json_encode(file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES), JSON_UNESCAPED_UNICODE);
    
    if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && strpos($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip") !== FALSE) {
        header("Content-Encoding: gzip");
        print gzencode($diagram_revisions_json);
    } else {
        print $diagram_revisions_json;
    }
}
