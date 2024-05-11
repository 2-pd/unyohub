<?php
include "../libs/wakarana/main.php";
include "../libs/zizai_captcha/main.php";

$main_config = parse_ini_file("../config/main.ini", FALSE, INI_SCANNER_TYPED);

function print_header ($load_captcha_js = FALSE) {
    global $main_config;
    
    print <<< EOM
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,interactive-widget=resizes-content">
        <title>{$main_config["instance_name"]}</title>
        <link rel="stylesheet" href="user_config_styles.css">
        <link rel="shortcut icon" href="../favicon.ico">
    EOM;
    
    if ($load_captcha_js) {
        print "    <script src=\"captcha.js\"></script>";
    }
    
    print <<< EOM
    </head>
    <body>
        <button type="button" class="popup_close_button" onclick="window.close();"></button>
    EOM;
}

function print_footer () {
    print <<< EOM
    </body>
    </html>
    EOM;
}