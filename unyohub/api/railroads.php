<?php
define("CACHE_JSON_PATH", "../config/railroads_cache.json");

if (!isset($_POST["last_modified_timestamp"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

if (file_exists(CACHE_JSON_PATH)) {
    $last_modified = @filemtime(CACHE_JSON_PATH);
    if ($last_modified === FALSE) {
        print "ERROR: キャッシュファイルにアクセスできません";
        exit;
    }

    if ($last_modified <= intval($_POST["last_modified_timestamp"])) {
        print "NO_UPDATES_AVAILABLE";
    } else {
        header("Last-Modified: ".gmdate("D, d M Y H:i:s", $last_modified)." GMT");
        
        if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && strpos($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip") !== FALSE) {
            header("Content-Encoding: gzip");
            print gzencode(file_get_contents(CACHE_JSON_PATH));
        } else {
            readfile(CACHE_JSON_PATH);
        }
    }
    
    exit;
}

$last_modified_max = @filemtime("../config/railroads.txt");
if ($last_modified_max === FALSE) {
    print "ERROR: 路線系統一覧ファイルが読み込めません";
    exit;
}

$railroad_list = explode("\n", file_get_contents("../config/railroads.txt"));

$railroads = array("railroads" => array(), "railroads_order" => array());
foreach ($railroad_list as $railroad) {
    $railroad = trim($railroad);
    if (empty($railroad)) {
        continue;
    }
    
    $railroad_info = @json_decode(@file_get_contents("../data/".$railroad."/railroad_info.json"), TRUE);
    if (empty($railroad_info)) {
        print "ERROR: 路線系統設定ファイルが読み込めません";
        exit;
    }
    
    $railroads["railroads"][$railroad] = array("railroad_name" => $railroad_info["railroad_name"], "main_color" => $railroad_info["main_color"], "railroad_icon" => $railroad_info["railroad_icon"]);
    $railroads["railroads_order"][] = $railroad;
    
    $last_modified = filemtime("../data/".$railroad."/railroad_info.json");
    
    if ($last_modified > $last_modified_max) {
        $last_modified_max = $last_modified;
    }
}

$railroads_json = json_encode($railroads, JSON_UNESCAPED_UNICODE);
file_put_contents(CACHE_JSON_PATH, $railroads_json);
touch(CACHE_JSON_PATH, $last_modified_max);

header("Last-Modified: ".gmdate("D, d M Y H:i:s", $last_modified_max)." GMT");

if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && strpos($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip") !== FALSE) {
    header("Content-Encoding: gzip");
    print gzencode($railroads_json);
} else {
    print $railroads_json;
}
