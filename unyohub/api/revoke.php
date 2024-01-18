<?php
include "../libs/wakarana/main.php";
include "../libs/zizai_captcha/main.php";
include "__operation_data_functions.php";

if (!isset($_POST["railroad_id"], $_POST["date"], $_POST["operation_number"], $_POST["user_id"], $_POST["one_time_token"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$wakarana = new wakarana("../config");

$user = $wakarana->check();
if (is_object($user)) {
    if ($user->check_one_time_token($_POST["one_time_token"])) {
        $user_id = $user->get_id();
        
        if ($user_id !== $_POST["user_id"] && !$user->check_permission("moderate")) {
            print "ERROR: モデレーター権限が確認できませんでした。他のユーザーの投稿は削除できません";
            exit;
        }
    } else {
        print "ERROR: ワンタイムトークンの認証に失敗しました。再度ご送信ください";
        exit;
    }
} else {
    print "ERROR: ログイン情報の有効期限が切れています。再ログインしてください";
    exit;
}

load_railroad_data($_POST["railroad_id"]);

$ts = strtotime($_POST["date"]);

if ($ts === FALSE) {
    print "ERROR: 日付が不正です";
    exit;
}

$operation_data = get_operation_info($ts, $_POST["operation_number"]);

$operation_number = $db_obj->escapeString($_POST["operation_number"]);

$posted_datetime = date("Y-m-d H:i:s");

$operation_date = date("Y-m-d", $ts);

$db_obj->query("DELETE FROM `unyohub_data` WHERE `operation_date` = '".$operation_date."' AND `operation_number` = '".$operation_number."' AND `user_id` = '".$db_obj->escapeString($_POST["user_id"])."'");

$latest_data = $db_obj->querySingle("SELECT `formations`, `user_id`, `comment` FROM `unyohub_data` WHERE `operation_date` = '".$operation_date."' AND `operation_number` = '".$operation_number."' ORDER BY `posted_datetime` DESC LIMIT 1", TRUE);

if (count($latest_data) >= 1) {
    $formations = $latest_data["formations"];
    
    if ($formations !== "") {
        $formation_data = check_formation($formations);
        
        $formation_pattern = $formation_data["formation_pattern"];
        $formation_list = $formation_data["formation_list"];
    } else {
        $formation_pattern = array("");
        $formation_list = array();
    }
    
    $from_beginner = TRUE;
    if (substr($latest_data["user_id"], 0, 1) !== "*") {
        $post_user = $wakarana->get_user($latest_data["user_id"]);
        
        if (is_object($post_user) && (intval($post_user->get_value("days_posted")) > 20 || $post_user->check_permission("moderate"))) {
            $from_beginner = FALSE;
        }
    }
    
    $data_cache_values = get_data_cache_values($operation_date, $operation_number, $formation_pattern);
    
    $comment_exists = boolval(strlen($latest_data["comment"]));
    
    update_data_cache($operation_date, $operation_number, $formations, $posted_datetime, $formation_list, $data_cache_values["posts_count"], $data_cache_values["variant_exists"], $comment_exists, $from_beginner);
    
    if (!empty($operation_data["terminal_track"])) {
        update_next_day_data($ts, $operation_data["terminal_location"], $operation_data["terminal_track"], $formations, $posted_datetime, $formation_list, $from_beginner);
    }
    
    $data = array($_POST["operation_number"] => array("formations" => $formations, "posts_count" => $data_cache_values["posts_count"], "variant_exists" => $data_cache_values["variant_exists"], "comment_exists" => $comment_exists, "from_beginner" => $from_beginner));
} else {
    update_data_cache($operation_date, $operation_number, NULL, $posted_datetime);
    
    if (!empty($operation_data["terminal_track"])) {
        update_next_day_data($ts, $operation_data["terminal_location"], $operation_data["terminal_track"], NULL, $posted_datetime);
    }
    
    $data = array($_POST["operation_number"] => NULL);
}

print json_encode($data, JSON_UNESCAPED_UNICODE);
