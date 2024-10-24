<?php
include "../libs/wakarana/main.php";
include "../libs/zizai_captcha/main.php";

$main_config = parse_ini_file("../config/main.ini", FALSE, INI_SCANNER_TYPED);

function print_header ($title = "", $load_captcha_js = FALSE, $show_close_button = TRUE) {
    global $main_config;
    
    if (empty($title)) {
        $title = htmlspecialchars($main_config["instance_name"]);
    } else {
        $title = htmlspecialchars($title." | ".$main_config["instance_name"]);
    }
    
    print <<< EOM
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,interactive-widget=resizes-content">
        <title>{$title}</title>
        <link rel="stylesheet" href="user_styles.css">
        <link rel="shortcut icon" href="../favicon.ico">
    
    EOM;
    
    if ($load_captcha_js) {
        print "    <script src=\"captcha.js\"></script>\n";
    }
    
    print <<< EOM
    </head>
    <body>
    
    EOM;
    
    if ($show_close_button) {
        print "    <button type=\"button\" class=\"popup_close_button\" onclick=\"window.close();\"></button>\n";
    }
}

function print_footer () {
    print <<< EOM
    </body>
    </html>
    EOM;
}