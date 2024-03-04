<?php
include "../libs/wakarana/main.php";

if (!isset($_POST["railroad_id"], $_POST["date"], $_POST["operation_numbers"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$wakarana = new wakarana("../config");

$access_user = $wakarana->check();
if (is_object($access_user) && $access_user->check_permission("moderate")) {
    $access_user_is_moderator = TRUE;
} else {
    $access_user_is_moderator = FALSE;
}

$db_obj = new SQLite3("../data/".basename($_POST["railroad_id"])."/railroad.db");
$db_obj->busyTimeout(5000);

$operation_numbers = explode(",", $_POST["operation_numbers"]);

$operation_data = array();
for ($cnt = 0; $cnt < count($operation_numbers); $cnt++) {
    $operations_r = $db_obj->query("SELECT * FROM `unyohub_data` WHERE `operation_date` = '".$db_obj->escapeString($_POST["date"])."' AND `operation_number` = '".$db_obj->escapeString($operation_numbers[$cnt])."' ORDER BY `posted_datetime` DESC");
    
    $data = array();
    for ($cnt_2 = 0; $operation = $operations_r->fetchArray(SQLITE3_ASSOC); $cnt_2++) {
        $data[$cnt_2] = array(
            "user_id" => NULL,
            "user_name" => NULL,
            "is_moderator" => FALSE,
            "is_beginner" => TRUE,
            "website_url" => NULL,
            "formations" => $operation["formations"],
            "posted_datetime" => $operation["posted_datetime"],
            "comment" => $operation["comment"]
        );
        
        if (substr($operation["user_id"], 0, 1) !== "*") {
            $user = $wakarana->get_user($operation["user_id"]);
            
            if (is_object($user)) {
                $data[$cnt_2]["user_id"] = $user->get_id();
                $data[$cnt_2]["user_name"] = $user->get_name();
                
                if (empty($data[$cnt_2]["user_name"])) {
                    $data[$cnt_2]["user_name"] = "ハンドルネーム未設定";
                }
                
                if ($user->check_permission("moderate")) {
                    $data[$cnt_2]["is_moderator"] = TRUE;
                    $data[$cnt_2]["is_beginner"] = FALSE;
                } else {
                    $data[$cnt_2]["is_beginner"] = (intval($user->get_value("days_posted")) < 20);
                }
                
                $data[$cnt_2]["website_url"] = $user->get_value("website_url");
            }
        } elseif ($access_user_is_moderator) {
            $data[$cnt_2]["user_id"] = $operation["user_id"];
        }
    }
    
    $operation_data[$operation_numbers[$cnt]] = $data;
}


if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && strpos($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip") !== FALSE) {
    header("Content-Encoding: gzip");
    
    print gzencode(json_encode($operation_data, JSON_UNESCAPED_UNICODE));
} else {
    print json_encode($operation_data, JSON_UNESCAPED_UNICODE);
}
