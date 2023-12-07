<?php
include "../libs/wakarana/main.php";

if (isset($_POST["last_modified_timestamp"])) {
    $last_modified_timestamp = intval($_POST["last_modified_timestamp"]);
    
    if ($last_modified_timestamp >= filemtime("../config/announcements.json")) {
        print "NEW_ANNOUNCEMENTS_NOT_EXIST";
        exit;
    }
} else {
    $last_modified_timestamp = null;
}

$announcements_data = json_decode(file_get_contents("../config/announcements.json"), TRUE);

if (!is_null($last_modified_timestamp)) {
    if (empty($announcements_data)) {
        print "NEW_ANNOUNCEMENTS_NOT_EXIST";
        exit;
    }
    
    for ($cnt = 0; isset($announcements_data[$cnt]); $cnt++) {
        if ($announcements_data[$cnt]["last_modified_timestamp"] <= $last_modified_timestamp) {
            break;
        } elseif ($announcements_data[$cnt]["is_important"]) {
            goto print_json;
        }
    }
    
    print "NEW_ANNOUNCEMENTS_EXIST";
    exit;
}

print_json:

$wakarana = new wakarana("../config");

for ($cnt = 0; isset($announcements_data[$cnt]); $cnt++) {
    $user = $wakarana->get_user($announcements_data[$cnt]["user_id"]);
    if (is_object($user)) {
        $announcements_data[$cnt]["user_name"] = $user->get_name();
    } else {
        $announcements_data[$cnt]["user_name"] = "不明な管理者";
    }
}

if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && strpos($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip") !== FALSE) {
    header("Content-Encoding: gzip");
    print gzencode(json_encode($announcements_data, JSON_UNESCAPED_UNICODE));
} else {
    json_encode($announcements_data, JSON_UNESCAPED_UNICODE);
}
