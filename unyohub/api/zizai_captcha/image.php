<?php
define("ZIZAI_CAPTCHA_CONFIG_PATH", "../../config/zizai_captcha_config.json");

include "../../libs/zizai_captcha/main.php";

$zc = new zizai_captcha(ZIZAI_CAPTCHA_CONFIG_PATH);

if (!empty($_SERVER["PATH_INFO"])) {
    $zc->print_image(substr($_SERVER["PATH_INFO"], 1, 10));
} else {
    header("HTTP/1.1 404 Not Found");
}
