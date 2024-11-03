<?php
include "../libs/wakarana/main.php";

if (empty($_POST["railroad_id"])) {
    $path = "../config/announcements.json";
} else {
    $path = "../data/".basename($_POST["railroad_id"])."/announcements.json";
}

if (!file_exists($path)) {
    print "NEW_ANNOUNCEMENTS_NOT_EXIST";
    exit;
}

$last_modified = filemtime($path);

if (isset($_POST["last_modified_timestamp"]) && intval($_POST["last_modified_timestamp"]) >= $last_modified) {
    print "NEW_ANNOUNCEMENTS_NOT_EXIST";
    exit;
}

$announcements_data = json_decode(file_get_contents($path), TRUE);

$wakarana = new wakarana("../config");

$output_data = array();
$ts = time();

for ($cnt = 0; isset($announcements_data[$cnt]); $cnt++) {
    if ($announcements_data[$cnt]["expiration_timestamp"] < $ts) {
        continue;
    }
    
    $announcement_data = $announcements_data[$cnt];
    
    $user = $wakarana->get_user($announcement_data["user_id"]);
    if (is_object($user)) {
        $announcement_data["user_name"] = $user->get_name();
    } else {
        $announcement_data["user_name"] = "不明な管理者";
    }
    
    $output_data[] = $announcement_data;
}

header("Last-Modified: ".gmdate("D, d M Y H:i:s", $last_modified)." GMT");

if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && strpos($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip") !== FALSE) {
    header("Content-Encoding: gzip");
    print gzencode(json_encode($output_data, JSON_UNESCAPED_UNICODE));
} else {
    json_encode($output_data, JSON_UNESCAPED_UNICODE);
}
