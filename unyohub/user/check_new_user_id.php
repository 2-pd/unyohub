<?php
include "user_common.php";

$wakarana = new wakarana("../config");

if (empty($_POST["user_id"]) || strlen($_POST["user_id"]) < 5) {
    print "ユーザーIDは5文字以上必要です";
    return;
}

if (!$wakarana->check_id_string($_POST["user_id"])) {
    print "ユーザーIDに使用できない文字が含まれています";
    return;
}

if (!empty($wakarana->get_user($_POST["user_id"]))) {
    print "既に他のユーザーが使用しているユーザーIDです";
    return;
}

print "OK";
