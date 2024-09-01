<?php
include "../libs/wakarana/main.php";

if (!isset($_POST["email_address"], $_POST["verification_code"], $_POST["one_time_token"])) {
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

if (!$wakarana->check_email_address($_POST["email_address"])) {
    print "ERROR: 使用できないメールアドレスです";
    exit;
}

if (!empty($wakarana->search_users_with_email_address($_POST["email_address"]))) {
    print "ERROR: 既に使用されているメールアドレスです";
    exit;
}

if (!$user->email_address_verify($_POST["email_address"], $_POST["verification_code"], TRUE)) {
    print "ERROR: 正しいメールアドレス確認コードを入力してください";
    exit;
}

$user->remove_all_email_addresses();
$user->add_email_address($_POST["email_address"]);


$data = array();

$data["user_id"] = $user->get_id();
$data["user_name"] = $user->get_name();
$data["created"] = $user->get_created();
if ($user->check_permission("control_panel_user")) {
    $data["is_control_panel_user"] = TRUE;
    
    if ($user->check_permission("management_member")) {
        $data["is_management_member"] = TRUE;
    } else {
        $data["is_management_member"] = FALSE;
    }
} else {
    $data["is_control_panel_user"] = FALSE;
    $data["is_management_member"] = FALSE;
}
$days_posted = intval($user->get_value("days_posted"));
$data["is_beginner"] = ($days_posted < 20 && ($days_posted < 10 || intval($user->get_value("post_count")) < 50));
$data["email_address"] = $user->get_primary_email_address();
$data["website_url"] = $user->get_value("website_url");

print json_encode($data, JSON_UNESCAPED_UNICODE);
