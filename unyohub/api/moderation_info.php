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

if (!empty($_POST["user_id"])) {
    if ($moderation_db_obj->querySingle("SELECT COUNT(`user_id`) FROM `unyohub_moderation_suspicious_users` WHERE `user_id` = '".$moderation_db_obj->escapeString($_POST["user_id"])."'")) {
        $is_suspicious_user = TRUE;
    } else {
        $is_suspicious_user = FALSE;
    }
} else {
    $is_suspicious_user = NULL;
}

if (!empty($_POST["ip_address"])) {
    if ($moderation_db_obj->querySingle("SELECT COUNT(`ip_address`) FROM `unyohub_moderation_suspicious_ip_addresses` WHERE `ip_address` = '".$moderation_db_obj->escapeString($_POST["ip_address"])."' AND `marked_datetime` > '".date("Y-m-d H:i:s", time() - 2592000)."'")) {
        $is_suspicious_ip_address = TRUE;
    } else {
        $is_suspicious_ip_address = FALSE;
    }
    
    $host_name = gethostbyaddr($_POST["ip_address"]);
} else {
    $is_suspicious_ip_address = NULL;
    $host_name = NULL;
}

print json_encode(array("is_suspicious_user" => $is_suspicious_user, "host_name" => $host_name, "is_suspicious_ip_address" => $is_suspicious_ip_address), JSON_UNESCAPED_UNICODE);
