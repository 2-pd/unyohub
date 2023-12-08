<?php
include "../libs/wakarana/main.php";

$wakarana = new wakarana("../config");

$announcements_data = json_decode(file_get_contents("../config/announcements.json"), TRUE);

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
