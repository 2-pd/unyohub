<?php
include "__operation_data_functions.php";

$user = $wakarana->check();
if (is_object($user)) {
    if (!isset($_POST["railroad_id"]) || !$user->check_permission("railroads/".$_POST["railroad_id"], "moderate")) {
        print "ERROR: モデレーター権限が確認できませんでした。モデレーション情報は閲覧できません";
        exit;
    }
} else {
    print "ERROR: ログイン情報の有効期限が切れています。再ログインしてください";
    exit;
}

connect_moderation_db();

$datetime_now = date("Y-m-d H:i:s");

if (!empty($_POST["user_id"])) {
    if (substr($_POST["user_id"], 0, 1) !== "*") {
        $user_obj = $wakarana->get_user($_POST["user_id"]);
        $user_name = $user_obj->get_name();
        $user_created = $user_obj->get_created();
    } else {
        $user_name = NULL;
        $user_created = NULL;
    }
    
    $user_id = $moderation_db_obj->escapeString($_POST["user_id"]);
    
    $is_timed_out_user = boolval($moderation_db_obj->querySingle("SELECT COUNT(`user_id`) FROM `unyohub_moderation_timed_out_users` WHERE `user_id` = '".$user_id."' AND `expiration_datetime` > '".$datetime_now."'"));
    
    $logs_r = $moderation_db_obj->query("SELECT `timed_out_datetime`, `moderator_id`, `timed_out_days` FROM `unyohub_moderation_user_timed_out_logs` WHERE `user_id` = '".$user_id."' ORDER BY `timed_out_datetime` DESC LIMIT 5");
    
    $user_timed_out_logs = array();
    while ($log_data = $logs_r->fetchArray(SQLITE3_ASSOC)) {
        $user_obj = $wakarana->get_user($log_data["moderator_id"]);
        $log_data["moderator_name"] = $user_obj->get_name();
        
        $user_timed_out_logs[] = $log_data;
    }
} else {
    $user_name = NULL;
    $user_created = NULL;
    $is_timed_out_user = NULL;
    $user_timed_out_logs = NULL;
}

if (!empty($_POST["ip_address"])) {
    $host_name = gethostbyaddr($_POST["ip_address"]);
    
    $ip_address = $moderation_db_obj->escapeString($_POST["ip_address"]);
    
    $is_timed_out_ip_address = boolval($moderation_db_obj->querySingle("SELECT COUNT(`ip_address`) FROM `unyohub_moderation_timed_out_ip_addresses` WHERE `ip_address` = '".$ip_address."' AND `expiration_datetime` > '".$datetime_now."'"));
    
    $logs_r = $moderation_db_obj->query("SELECT `timed_out_datetime`, `moderator_id`, `timed_out_days` FROM `unyohub_moderation_ip_address_timed_out_logs` WHERE `ip_address` = '".$ip_address."' ORDER BY `timed_out_datetime` DESC LIMIT 5");
    
    $ip_address_timed_out_logs = array();
    while ($log_data = $logs_r->fetchArray(SQLITE3_ASSOC)) {
        $user_obj = $wakarana->get_user($log_data["moderator_id"]);
        $log_data["moderator_name"] = $user_obj->get_name();
        
        $ip_address_timed_out_logs[] = $log_data;
    }
} else {
    $host_name = NULL;
    $is_timed_out_ip_address = NULL;
    $ip_address_timed_out_logs = NULL;
}

print json_encode(array("user_name" => $user_name, "user_created" => $user_created, "is_timed_out_user" => $is_timed_out_user, "user_timed_out_logs" => $user_timed_out_logs, "host_name" => $host_name, "is_timed_out_ip_address" => $is_timed_out_ip_address, "ip_address_timed_out_logs" => $ip_address_timed_out_logs), JSON_UNESCAPED_UNICODE);
