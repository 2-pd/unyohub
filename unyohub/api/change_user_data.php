<?php
include "../libs/wakarana/main.php";

if (!isset($_POST["user_name"], $_POST["email_address"], $_POST["website_url"], $_POST["one_time_token"])) {
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

if (($_POST["email_address"] !== "" && filter_var($_POST["email_address"], FILTER_VALIDATE_EMAIL) === FALSE)) {
    print "ERROR: メールアドレスの書式に誤りがあります";
    exit;
}

if ($_POST["website_url"] !== "" && filter_var($_POST["website_url"], FILTER_VALIDATE_URL) === FALSE) {
    print "ERROR: URLの書式に誤りがあります";
    exit;
}

if ($user->get_primary_email_address() !== $_POST["email_address"]) {
    if (!empty($wakarana->search_users_with_email_address($_POST["email_address"]))) {
        print "ERROR: 他のアカウントに登録済みのメールアドレスは使用できません";
        exit;
    }
    
    $user->remove_all_email_addresses();
    $user->add_email_address($_POST["email_address"]);
}

$user->set_name($_POST["user_name"]);

$user->set_value("website_url", $_POST["website_url"]);


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
$data["email_address"] = $user->get_primary_email_address();
$data["website_url"] = $user->get_value("website_url");

print json_encode($data, JSON_UNESCAPED_UNICODE);
