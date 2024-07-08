<?php
include "../libs/wakarana/main.php";

$wakarana = new wakarana("../config");

$user = $wakarana->check();
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
    $days_posted = intval($user->get_value("days_posted"));
    $data["is_beginner"] = ($days_posted < 20 && ($days_posted < 10 || intval($user->get_value("post_count")) < 50));
    $data["email_address"] = $user->get_primary_email_address();
    $data["website_url"] = $user->get_value("website_url");
    
    print json_encode($data, JSON_UNESCAPED_UNICODE);
} else {
    print "NOT_LOGGED_IN";
}
