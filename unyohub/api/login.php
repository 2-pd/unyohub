<?php
include "../libs/wakarana/main.php";

if (!isset($_POST["user_id"], $_POST["password"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$wakarana = new wakarana("../config");

if (strpos($_POST["user_id"], "@") === FALSE) {
    $user = $wakarana->login($_POST["user_id"], $_POST["password"]);
} else {
    $user = $wakarana->login_with_email_address($_POST["user_id"], $_POST["password"]);
}

if (is_object($user)) {
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
} else {
    print "ERROR: ユーザーID・メールアドレスまたはパスワードが違います";
}
