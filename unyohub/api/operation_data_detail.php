<?php
include "../libs/wakarana/main.php";

if (!isset($_POST["railroad_id"], $_POST["date"], $_POST["operation_numbers"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$wakarana = new wakarana("../config");

$access_user = $wakarana->check();
if (is_object($access_user) && $access_user->check_permission("railroads/".$_POST["railroad_id"], "moderate")) {
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
            "formations" => $operation["formations"],
            "train_number" => $operation["train_number"],
            "posted_datetime" => $operation["posted_datetime"],
            "comment" => $operation["comment"]
        );
        
        if ($operation["is_quotation"]) {
            $data[$cnt_2]["is_quotation"] = TRUE;
        }
        
        $is_beginner = TRUE;
        
        if (substr($operation["user_id"], 0, 1) !== "*") {
            $user = $wakarana->get_user($operation["user_id"]);
            
            if (is_object($user)) {
                $data[$cnt_2]["user_id"] = $user->get_id();
                $data[$cnt_2]["user_name"] = $user->get_name();
                
                if (empty($data[$cnt_2]["user_name"])) {
                    $data[$cnt_2]["user_name"] = "ハンドルネーム未設定";
                }
                
                if ($user->check_permission("management_member")) {
                    $data[$cnt_2]["is_management_member"] = TRUE;
                    $is_beginner = FALSE;
                } else {
                    $days_posted = intval($user->get_value("days_posted"));
                    $is_beginner = ($days_posted < 20 && ($days_posted < 10 || intval($user->get_value("post_count")) < 50));
                }
                
                $website_url = $user->get_value("website_url");
                if (!empty($website_url)) {
                    $data[$cnt_2]["website_url"] = $website_url;
                }
            }
        } elseif ($access_user_is_moderator) {
            $data[$cnt_2]["user_id"] = $operation["user_id"];
        }
        
        if ($access_user_is_moderator) {
            $data[$cnt_2]["ip_address"] = $operation["ip_address"];
        }
        
        if ($is_beginner) {
            $data[$cnt_2]["is_beginner"] = TRUE;
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
