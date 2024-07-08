<?php
include "../libs/wakarana/main.php";

if (!isset($_POST["user_name"], $_POST["website_url"], $_POST["one_time_token"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$wakarana = new wakarana("../config");

$user = $wakarana->check();
if (!is_object($user)) {
    print "ERROR: ログイン情報の有効期限が切れています。アプリを再起動してください";
    exit;
}

if (!$user->check_one_time_token($_POST["one_time_token"])) {
    print "ERROR: ワンタイムトークンの認証に失敗しました。再度ご送信ください";
    exit;
}

if ($_POST["website_url"] !== "" && filter_var($_POST["website_url"], FILTER_VALIDATE_URL) === FALSE) {
    print "ERROR: URLの書式に誤りがあります";
    exit;
}

$user->set_name($_POST["user_name"]);

if (!empty($_POST["website_url"])) {
    $user->set_value("website_url", $_POST["website_url"]);
} else {
    $user->delete_value("website_url");
}


$data = array();

$data["user_id"] = $user->get_id();
$data["user_name"] = $user->get_name();
$data["created"] = $user->get_created();
if ($user->check_permission("moderate")) {
    if ($user->check_permission("administrate")) {
        $data["role"] = "ADMIN";
    } else {
        $data["role"] = "MODERATOR";
    }
} else {
    $data["role"] = "BASE";
}
$days_posted = intval($user->get_value("days_posted"));
$data["is_beginner"] = ($days_posted < 20 && ($days_posted < 10 || intval($user->get_value("post_count")) < 50));
$data["email_address"] = $user->get_primary_email_address();
$data["website_url"] = $user->get_value("website_url");

print json_encode($data, JSON_UNESCAPED_UNICODE);
