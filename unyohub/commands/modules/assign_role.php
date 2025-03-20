<?php
include __DIR__."/../../libs/wakarana/main.php";


$wakarana_base_dir = "config";


print "\n_/_/_/_/ ユーザーにロールを割り当て _/_/_/_/\n\n";

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

print "ユーザー ".$user_id." にロール ".$role_id." を割り当てています...\n";

$wakarana = new wakarana(__DIR__."/../../".$wakarana_base_dir);

$user = $wakarana->get_user($user_id);

if (is_object($user)) {
    if ($user->add_role($role_id)) {
        print "ユーザーにロールを割り当てました\n";
    } else {
        print "ユーザーへのロール割り当てに失敗しました\n";
    }
} else {
    print "指定されたユーザーは存在しません\n";
}
