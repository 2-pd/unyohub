<?php
include "../libs/wakarana/main.php";
include "__operation_data_functions.php";

if (!isset($_POST["railroad_id"], $_POST["user_id"], $_POST["one_time_token"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$wakarana = new wakarana("../config");

$user = $wakarana->check();
if (is_object($user)) {
    if ($user->check_one_time_token($_POST["one_time_token"])) {
        if (!$user->check_permission("moderate")) {
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

$post_data_r = $db_obj->query("SELECT `operation_date`, `operation_number`, `user_id` FROM `unyohub_data` WHERE `user_id` = '".$db_obj->escapeString($_POST["user_id"])."' AND `posted_datetime` > '".date("Y-m-d H:i:s", time() - 86400)."'");

$moderator_id = $user->get_id();

while ($post_data = $post_data_r->fetchArray(SQLITE3_ASSOC)) {
    revoke_post($wakarana, strtotime($post_data["operation_date"]), $post_data["operation_number"], $_POST["user_id"], $moderator_id);
}

print "SUCCESSFULLY_REVOKED";
