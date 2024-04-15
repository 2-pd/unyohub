<?php
include "../libs/wakarana/main.php";
include "__operation_data_functions.php";

if (!isset($_POST["ip_address"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$wakarana = new wakarana("../config");

$user = $wakarana->check();
if (is_object($user)) {
    if ($user->check_one_time_token($_POST["one_time_token"])) {
        if (!$user->check_permission("moderate")) {
            print "ERROR: モデレーター権限が確認できませんでした。モデレーター専用機能は使用できません";
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

connect_moderation_db();

$moderation_db_obj->query("REPLACE INTO `unyohub_moderation_suspicious_ip_addresses` (`ip_address`, `moderator_id`, `marked_datetime`) VALUES ('".$moderation_db_obj->escapeString($_POST["ip_address"])."', '".$user->get_id()."', '".date("Y-m-d H:i:s")."')");

print "SUCCEEDED";