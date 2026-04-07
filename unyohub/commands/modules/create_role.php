<?php
include __DIR__."/../../libs/wakarana/main.php";


$wakarana_base_dir = "config";


print "\n_/_/_/_/ ロールの新規作成 _/_/_/_/\n\n";

print "ロール ".addslashes($argv[1])." を作成しています...\n";

$wakarana = new wakarana(__DIR__."/../../".$wakarana_base_dir);

$role = $wakarana->create_role($argv[1], $argv[2]);
if (!is_object($role)) {
    switch ($wakarana->get_rejection_reason()) {
        case "invalid_role_id":
            print "【エラー】ロールIDに使用できない文字が含まれています\n";
            break;
        case "role_already_exists":
            print "【エラー】指定されたIDのロールが既に存在しています\n";
            break;
        default:
            print "【エラー】ロールの作成に失敗しました\n";
    }
    
    exit;
}

print "ロールを作成しました\n";

print "作成したロールにコントロールパネル表示権限を割り当てています...\n";

$role->add_permission("control_panel_user");

print "処理が完了しました\n";
