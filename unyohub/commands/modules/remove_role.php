<?php
include __DIR__."/../../libs/wakarana/main.php";


$wakarana_base_dir = "config";


print "\n_/_/_/_/ ユーザーからロールを剥奪 _/_/_/_/\n\n";

$user_id = $argv[1];
$role_id = $argv[2];

if (!wakarana::check_id_string($user_id)) {
    print "【エラー】ユーザーIDとして有効でない文字列が指定されました\n";
    exit;
}
if (!wakarana::check_id_string($role_id)) {
    print "【エラー】ロールIDとして有効でない文字列が指定されました\n";
    exit;
}

print "ユーザー ".$user_id." からロール ".$role_id." を剥奪しています...\n";

$wakarana = new wakarana(__DIR__."/../../".$wakarana_base_dir);

$user = $wakarana->get_user($user_id);

if (is_object($user)) {
    if ($user->remove_role($role_id)) {
        print "ユーザーからロールを剥奪しました\n";
    } else {
        print "ユーザーからのロール剥奪に失敗しました\n";
    }
} else {
    print "指定されたユーザーは存在しません\n";
}
