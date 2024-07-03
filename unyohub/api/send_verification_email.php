<?php
include "../libs/wakarana/main.php";

$main_config = parse_ini_file("../config/main.ini", FALSE, INI_SCANNER_TYPED);

if (empty($_POST["email_address"])) {
    print "ERROR: メールアドレスが未入力です";
    exit();
}

$wakarana = new wakarana("../config");

if (!$wakarana->check_email_address($_POST["email_address"])) {
    print "ERROR: 使用できないメールアドレスです";
    exit();
}

if (!empty($wakarana->search_users_with_email_address($_POST["email_address"]))) {
    print "ERROR: 既に使用されているメールアドレスです";
    exit();
}

$user = $wakarana->check();

if (is_object($user)) {
    if ($user->check_one_time_token($_POST["one_time_token"])) {
        $verification_code = $user->create_email_address_verification_code($_POST["email_address"]);
    } else {
        print "ERROR: ワンタイムトークンの認証に失敗しました。再度ご送信ください";
        exit();
    }
} else {
    $verification_code = $wakarana->create_email_address_verification_code($_POST["email_address"]);
}

mb_send_mail($_POST["email_address"], "メールアドレスの確認 - ".$main_config["instance_name"], $main_config["instance_name"]."にご利用のメールアドレスを登録するための確認メールです。\nメールアドレスの登録を完了するには、以下の確認コードを".$main_config["instance_name"]."の登録フォームにご入力ください\n\n確認コード: ".$verification_code, "From: ".$main_config["sender_email_address"]);

print "SUCCEEDED";
