<?php
include __DIR__."/../../libs/wakarana/main.php";


$wakarana_base_dir = "config";


print "\n_/_/_/_/ ロールの新規作成 _/_/_/_/\n\n";

$role_id = $argv[1];
$role_name = $argv[2];

if (!wakarana::check_id_string($role_id)) {
    print "【エラー】ロールIDとして使用できない文字列が指定されました\n";
    exit;
}

print "ロール ".$role_id." を作成しています...\n";

$wakarana = new wakarana(__DIR__."/../../".$wakarana_base_dir);

$role = $wakarana->add_role($role_id, $role_name);
if (!is_object($role)) {
    print "ロールの作成に失敗しました\n";
}

print "作成したロールにコントロールパネル表示権限を割り当てています...\n";

$role->add_permission("control_panel_user");

print "ロールの作成が完了しました\n";
