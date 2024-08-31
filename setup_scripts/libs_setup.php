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


print "Zizai CAPTCHAをセットアップしています...\n";

zizai_captcha_setup_db($zizai_captcha_config_path);


print "ユーザーロールと管理者ユーザーを作成しています...\n";

$wakarana = new wakarana($wakarana_base_dir);

if (empty($wakarana->get_permission("instance_administrator"))) {
    $wakarana->add_permission("instance_administrator", "インスタンス管理者");
}

if (empty($wakarana->get_permission("control_panel_user"))) {
    $wakarana->add_permission("control_panel_user", "コントロールパネル使用者");
}

if (empty($wakarana->get_permission("management_member"))) {
    $wakarana->add_permission("management_member", "運営メンバー");
}

if (empty($wakarana->get_permission("railroads"))) {
    $permission_railroads = $wakarana->add_permission("railroads", "路線系統データの編集・管理");
    
    $permission_railroads->add_action("edit_data");
    $permission_railroads->add_action("edit_announcement");
    $permission_railroads->add_action("moderate");
}

if (empty($wakarana->get_user($admin_user_id))) {
    $password = wakarana::create_random_password();
    $admin_user = $wakarana->add_user($admin_user_id, $password, "管理人");
    $admin_user->add_role(WAKARANA_ADMIN_ROLE);
    
    print "\n【デフォルトの管理者ユーザー】\n";
    print "ID: ".$admin_user_id."\n";
    print "パスワード: ".$password."\n\n";
}


print "ライブラリのセットアップが終了しました\n";
