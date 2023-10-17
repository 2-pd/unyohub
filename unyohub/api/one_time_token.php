<?php
include "../libs/wakarana/main.php";
include "../libs/zizai_captcha/main.php";

$wakarana = new wakarana("../config");

$user = $wakarana->check();
if (!is_object($user)) {
    print "ERROR: ログイン情報の有効期限が切れています。再ログインしてください";
    exit;
}

$data = array("token" => $user->create_one_time_token());

print json_encode($data, JSON_UNESCAPED_UNICODE);
