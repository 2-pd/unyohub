<?php
define("RAILROADS_JSON_PATH", "../config/railroads.json");

include "../libs/wakarana/main.php";

$wakarana = new wakarana("../config");

$user = $wakarana->check();
if (!is_object($user) || !$user->check_permission("control_panel_user")) {
    print "【!】管理画面アクセス権限のあるユーザーとしてログインしていません<br>\n";
    print "<a href=\"/\">鉄道運用Hub トップページ</a>";
    exit;
}

function print_header () {
    print <<< EOM
    <html>
    <head lang="ja">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,interactive-widget=resizes-content">
        <title>鉄道運用Hub 管理画面</title>
        <link rel="stylesheet" href="admin_styles.css">
        <link rel="shortcut icon" href="/favicon.ico">
    </head>
    <body>
        <header onclick="location.href = 'index.php';"><div id="railroad_icon"></div>鉄道運用Hub 管理画面<button type="button" id="control_panel_close_button" onclick="event.stopPropagation(); window.close();"></button></header>
    EOM;
}

function print_footer () {
    print <<< EOM
    </body>
    </html>
    EOM;
}

function exec_python_command ($subcommand, $args) {
    $args_str = is_array($args) ? implode(" ", $args) : $args;
    
    exec("python3 ../commands/unyohub ".$subcommand." ".$args_str, $output);
    
    $result = "";
    foreach ($output as $row) {
        $result .= htmlspecialchars(preg_replace("/[\\x1b]\\[[0-9]{1,2}m/", "", $row))."<br>";
    }
    
    return $result;
}
