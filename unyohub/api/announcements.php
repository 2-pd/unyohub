<?php
include "../libs/wakarana/main.php";

$db_obj = new SQLite3("../common_dbs/announcements.db");
$db_obj->busyTimeout(5000);

if (empty($_POST["railroad_id"])) {
    $railroad_id = "/";
} else {
    $railroad_id = $db_obj->escapeString($_POST["railroad_id"]);
}

$datetime_now = date("Y-m-d H:i:s");

$publication_or_deletion_datetime = $db_obj->querySingle("SELECT `publication_or_deletion_datetime` FROM `unyohub_announcement_datetimes` WHERE `railroad_id` = '".$railroad_id."' AND `publication_or_deletion_datetime` <= '".$datetime_now."' ORDER BY `publication_or_deletion_datetime` DESC LIMIT 1");

if (empty($publication_or_deletion_datetime)) {
    print "NEW_ANNOUNCEMENTS_NOT_EXIST";
    exit;
}

$last_modified_ts = strtotime($publication_or_deletion_datetime);

if (isset($_POST["last_modified_timestamp"]) && intval($_POST["last_modified_timestamp"]) >= $last_modified_ts) {
    print "NEW_ANNOUNCEMENTS_NOT_EXIST";
    exit;
}

$announcements_r = $db_obj->query("SELECT `unyohub_announcements`.* FROM `unyohub_railroad_announcements`, `unyohub_announcements` WHERE `unyohub_railroad_announcements`.`railroad_id` = '".$railroad_id."' AND `unyohub_announcements`.`announcement_id` = `unyohub_railroad_announcements`.`announcement_id` AND `unyohub_announcements`.`publication_datetime` <= '".$datetime_now."' AND `unyohub_announcements`.`expiration_datetime` >= '".$datetime_now."' ORDER BY `unyohub_announcements`.`publication_datetime` DESC");

$wakarana = new wakarana("../config");

$output_data = array();
while ($announcement_data = $announcements_r->fetchArray(SQLITE3_ASSOC)) {
    $user = $wakarana->get_user($announcement_data["user_id"]);
    
    $output_data[] = array(
        "title" => $announcement_data["title"],
        "is_important" => $announcement_data["is_important"],
        "content" => $announcement_data["content"],
        "user_id" => $announcement_data["user_id"],
        "user_name" => is_object($user) ? $user->get_name() : "不明な管理者",
        "expiration_timestamp" => strtotime($announcement_data["expiration_datetime"]),
        "last_modified_timestamp" => strtotime($announcement_data["publication_datetime"]),
    );
}

header("Last-Modified: ".gmdate("D, d M Y H:i:s", $last_modified_ts)." GMT");

if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && strpos($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip") !== FALSE) {
    header("Content-Encoding: gzip");
    print gzencode(json_encode($output_data, JSON_UNESCAPED_UNICODE));
} else {
    json_encode($output_data, JSON_UNESCAPED_UNICODE);
}
