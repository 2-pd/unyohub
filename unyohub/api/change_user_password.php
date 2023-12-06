<?php
include "../libs/wakarana/main.php";

if (!isset($_POST["old_password"], $_POST["new_password"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$wakarana = new wakarana("../config");

$user = $wakarana->check();
if (is_object($user)) {
    if ($user->check_password($_POST["old_password"])) {
        if (wakarana::check_password_strength($_POST["new_password"])) {
            $user->set_password($_POST["new_password"]);
            
            print "SUCCEEDED";
        } else {
            print "パスワードは大文字・小文字・数字を全て含む10文字以上を設定してください";
        }
    } else {
        print "ERROR: 現在のパスワードが間違っています";
    }
} else {
    print "ERROR: ログイン情報の有効期限が切れています。アプリを再起動してください";
}
