<?php
include "../libs/wakarana/main.php";
include "../libs/zizai_captcha/main.php";

if (!isset($_POST["user_id"], $_POST["password"], $_POST["user_name"], $_POST["zizai_captcha_id"], $_POST["zizai_captcha_characters"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

if (strlen($_POST["user_id"]) < 5) {
    print "ERROR: ユーザーIDは5文字以上必要です";
    exit;
}

$zizai_captcha = new zizai_captcha("../../config/zizai_captcha_config.json");

if (!$zizai_captcha->check($_POST["zizai_captcha_id"], $_POST["zizai_captcha_characters"])) {
    print "ERROR: 画像認証が正しくありません";
    exit;
}

$wakarana = new wakarana("../config");

$user = $wakarana->add_user($_POST["user_id"], $_POST["password"], $_POST["user_name"]);

if (is_object($user)) {
    $user->set_login_token();
    
    $data = array();
    
    $data["user_id"] = $user->get_id();
    $data["user_name"] = $user->get_name();
    $data["created"] = $user->get_created();
    $data["role"] = "BASE";
    $data["email_address"] = null;
    $data["website_url"] = null;
    
    print json_encode($data, JSON_UNESCAPED_UNICODE);
} else {
    print "ERROR: ユーザーの登録に失敗しました";
}
