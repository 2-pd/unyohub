<?php
if (!isset($_POST["last_modified_timestamp"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$data = @json_decode(@file_get_contents("../config/unyohub.json"), TRUE);

if (empty($data)) {
    print "ERROR: 基本設定ファイルが読み込めません";
    exit;
}

$last_modified_max = filemtime("../config/unyohub.json");

foreach ($data["railroads"] as $railroad) {
    $last_modified = @filemtime("../data/".$railroad."/railroad_info.json");
    if ($last_modified === FALSE) {
        print "ERROR: 路線系統設定ファイルが読み込めません";
        exit;
    }
    
    if ($last_modified > $last_modified_max) {
        $last_modified_max = $last_modified;
    }
}

if (intval($_POST["last_modified_timestamp"]) >= $last_modified_max) {
    print "NO_UPDATES_AVAILABLE";
} else {
    $railroads = array();
    foreach ($data["railroads"] as $railroad) {
        $railroad_info = @json_decode(@file_get_contents("../data/".$railroad."/railroad_info.json"), TRUE);
        if (empty($railroad_info)) {
            print "ERROR: 路線系統設定ファイルが破損しています";
            exit;
        }
        $railroads[$railroad] = array("railroad_name" => $railroad_info["railroad_name"], "railroad_icon" => $railroad_info["railroad_icon"]);
    }
    
    header("Last-Modified: ".gmdate("D, d M Y H:i:s", $last_modified_max)." GMT");
    
    if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && strpos($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip") !== FALSE) {
        header("Content-Encoding: gzip");
        print gzencode(json_encode($railroads, JSON_UNESCAPED_UNICODE));
    } else {
        print json_encode($railroads, JSON_UNESCAPED_UNICODE);
    }
}
