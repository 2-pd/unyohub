<?php
include "libs/wakarana/main.php";
include "libs/wakarana/config.php";
include "libs/zizai_captcha/setup.php";


$admin_user_id = "unyohub_admin";

$wakarana_base_dir = "config";
$zizai_captcha_config_path = "../../config/zizai_captcha_config.json";


print "ライブラリデータフォルダを作成しています...\n";

if (!file_exists("libs_data")) {
    mkdir("libs_data");
}

print "Wakaranaをセットアップしています...\n";

$wakarana_config = new wakarana_config($wakarana_base_dir);
$wakarana_config->setup_db();

print "ユーザーロールと管理者ユーザーを作成しています...\n";

$wakarana = new wakarana($wakarana_base_dir);

$wakarana->set_permission_value(WAKARANA_ADMIN_ROLE, "administrate");
$wakarana->set_permission_value("moderator", "access_control_panel");
$wakarana->set_permission_value("moderator", "moderate");

$password = wakarana::create_random_password();
$admin_user = $wakarana->add_user($admin_user_id, $password, "管理人");
$admin_user->add_role(WAKARANA_ADMIN_ROLE);

print "Zizai CAPTCHAをセットアップしています...\n";

zizai_captcha_setup_db($zizai_captcha_config_path);

print "ライブラリのセットアップが終了しました\n\n";

print "【デフォルトの管理者ユーザー】\n";
print "ID: ".$admin_user_id."\n";
print "パスワード: ".$password."\n";
