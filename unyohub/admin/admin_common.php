<?php
include "../libs/wakarana/main.php";

$wakarana = new wakarana("../config");

$user = $wakarana->check();
if (!is_object($user) || !$user->check_permission("access_control_panel")) {
    print "【!】管理画面アクセス権限のあるユーザーとしてログインしていません";
    exit;
}

function print_header () {
    print <<< EOM
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,interactive-widget=resizes-content">
        <title>鉄道運用Hub 管理画面</title>
        <link rel="stylesheet" href="admin_styles.css">
        <link rel="shortcut icon" href="../favicon.ico">
    </head>
    <body>
        <header onclick="location.href = 'index.php';">鉄道運用Hub 管理画面</header>
    EOM;
}

function print_footer () {
    print <<< EOM
    </body>
    </html>
    EOM;
}