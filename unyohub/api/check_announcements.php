<?php
if (isset($_POST["last_modified_timestamp"])) {
    $last_modified_timestamp = intval($_POST["last_modified_timestamp"]);
    
    if ($last_modified_timestamp >= filemtime("../config/announcements.json")) {
        print "NEW_ANNOUNCEMENTS_NOT_EXIST";
        exit;
    }
} else {
    print "ERROR: 送信値が不正です";
    exit;
}

$announcements_data = json_decode(file_get_contents("../config/announcements.json"), TRUE);

if (empty($announcements_data)) {
    print "NEW_ANNOUNCEMENTS_NOT_EXIST";
    exit;
}

for ($cnt = 0; isset($announcements_data[$cnt]); $cnt++) {
    if ($announcements_data[$cnt]["last_modified_timestamp"] <= $last_modified_timestamp) {
        break;
    } elseif ($announcements_data[$cnt]["is_important"]) {
        print "NEW_IMPORTANT_ANNOUNCEMENTS_EXIST";
        exit;
    }
}

print "NEW_ANNOUNCEMENTS_EXIST";
