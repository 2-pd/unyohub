<?php
if (!isset($_POST["railroad_id"], $_POST["last_modified_timestamp"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$path = "../data/".basename($_POST["railroad_id"])."/formations.json";

if (!file_exists($path)) {
    print "ERROR: 路線系統データがありません";
    exit;
}

$last_modified = filemtime($path);

if (intval($_POST["last_modified_timestamp"]) >= $last_modified) {
    print "NO_UPDATES_AVAILABLE";
} else {
    header("Last-Modified: ".gmdate("D, d M Y H:i:s", $last_modified)." GMT");
    readfile($path);
}
