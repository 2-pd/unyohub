<?php
include __DIR__."/../../libs/wakarana/main.php";
include __DIR__."/../../libs/wakarana/config.php";
include __DIR__."/../../libs/zizai_captcha/setup.php";


$wakarana_base_dir = "config";
$zizai_captcha_config_path = "../../config/zizai_captcha_config.json";


print "\n_/_/_/_/ 依存ライブラリのセットアップ _/_/_/_/\n\n";


if (!empty($argv[1])) {
    $admin_user_id = $argv[1];
} else {
    $admin_user_id = "unyohub_admin";
}

if (!wakarana::check_id_string($admin_user_id)) {
    print "【エラー】管理者ユーザーIDとして使用できない文字列が指定されました\n";
    exit;
}


chdir(dirname(__DIR__, 2));


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
    
    print "\n【管理者ユーザー】\n";
    print "ID: ".$admin_user_id."\n";
    print "パスワード: ".$password."\n\n";
}


print "ライブラリのセットアップが終了しました\n";
