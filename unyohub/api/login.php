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
} else {
    print "ERROR: ユーザーID・メールアドレスまたはパスワードが違います";
}
