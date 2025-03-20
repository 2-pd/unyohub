<?php
include __DIR__."/../../libs/wakarana/main.php";


$wakarana_base_dir = "config";


print "\n_/_/_/_/ ロールの削除 _/_/_/_/\n\n";

$role_id = $argv[1];

if (!wakarana::check_id_string($role_id)) {
    print "【エラー】ロールIDとして有効でない文字列が指定されました\n";
    exit;
}

print "ロール ".$role_id." を削除しています...\n";

$wakarana = new wakarana(__DIR__."/../../".$wakarana_base_dir);

$role = $wakarana->get_role($role_id);

if (is_object($role)) {
    if ($role->delete_role()) {
        print "ロールの削除が完了しました\n";
    } else {
        print "ロールの削除に失敗しました\n";
    }
} else {
    print "指定されたロールは存在しません\n";
}
