<?php
include "__operation_data_functions.php";

if (!isset($_POST["railroad_id"], $_POST["user_id"], $_POST["timed_out_days"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$user = $wakarana->check();
if (is_object($user)) {
    if ($user->check_one_time_token($_POST["one_time_token"])) {
        if (!$user->check_permission("railroads/".$_POST["railroad_id"], "moderate")) {
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

$now_ts = time();
$now_datetime = date("Y-m-d h:i:s", $now_ts);

$moderation_db_obj->query("DELETE FROM `unyohub_moderation_timed_out_users` WHERE `expiration_datetime` < '".$now_datetime."'");

$user_id = $moderation_db_obj->escapeString($_POST["user_id"]);

if ($moderation_db_obj->querySingle("SELECT COUNT(`user_id`) FROM `unyohub_moderation_timed_out_users` WHERE `user_id` = '".$user_id."' AND `expiration_datetime` >= '".$now_datetime."'")) {
    print "ERROR: 指定されたユーザーは既にタイムアウトが設定されています";
    exit;
}

$timed_out_days = intval($_POST["timed_out_days"]);
if ($timed_out_days < 1 || $timed_out_days > 90) {
    print "ERROR: タイムアウト日数が不正です";
    exit;
}

$moderation_db_obj->query("INSERT INTO `unyohub_moderation_timed_out_users` (`user_id`, `expiration_datetime`) VALUES ('".$user_id."', '".date("Y-m-d h:i:s", $timed_out_days * 86400 + $now_ts)."')");
$moderation_db_obj->query("INSERT INTO `unyohub_moderation_user_timed_out_logs` (`user_id`, `timed_out_datetime`, `moderator_id`, `timed_out_days`) VALUES ('".$user_id."', '".$now_datetime."', '".$user->get_id()."', ".$timed_out_days.")");

print "SUCCEEDED";
