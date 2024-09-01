<?php
include "../libs/wakarana/main.php";
include "../libs/zizai_captcha/main.php";
include "__operation_data_functions.php";

if (!isset($_POST["railroad_id"], $_POST["date"], $_POST["operation_number"], $_POST["user_id"], $_POST["one_time_token"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$wakarana = new wakarana("../config");

$moderator_id = NULL;

$user = $wakarana->check();
if (is_object($user)) {
    if ($user->check_one_time_token($_POST["one_time_token"])) {
        $user_id = $user->get_id();
        
        if ($user_id !== $_POST["user_id"]) {
            if (!$user->check_permission("railroads/".$_POST["railroad_id"], "moderate")) {
                print "ERROR: モデレーター権限が確認できませんでした。他のユーザーの投稿は削除できません";
                exit;
            }
            
            $moderator_id = $user_id;
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

$data = array($_POST["operation_number"] => revoke_post($wakarana, $ts, $_POST["operation_number"], $_POST["user_id"], $moderator_id));

print json_encode($data, JSON_UNESCAPED_UNICODE);
