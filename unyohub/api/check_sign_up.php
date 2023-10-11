<?php
include "../libs/wakarana/main.php";

if (!isset($_POST["user_id"], $_POST["password"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

if (strlen($_POST["user_id"]) < 5) {
    print "ユーザーIDは5文字以上必要です";
    exit;
}

if (!wakarana::check_id_string($_POST["user_id"])) {
    print "ユーザーIDに使用できない文字が含まれています";
    exit;
}

if (!wakarana::check_password_strength($_POST["password"])) {
    print "パスワードは大文字・小文字・数字を全て含む10文字以上を設定してください";
    exit;
}

$wakarana = new wakarana("../config");

if (is_object($wakarana->get_user($_POST["user_id"]))) {
    print "既に他のユーザーが使用しているユーザーIDです";
    exit;
}

print "OK";
