<?php
include __DIR__."/../../libs/wakarana/main.php";


$wakarana_base_dir = "config";


print "\n_/_/_/_/ ロールに権限を割り当て _/_/_/_/\n\n";

$role_id = $argv[1];
$resource_id = $argv[2];
if (empty($argv[3])) {
    $action = "any";
} else {
    $action = $argv[3];
}

if (!wakarana::check_id_string($role_id)) {
    print "【エラー】ロールIDとして有効でない文字列が指定されました\n";
    exit;
}
if (!wakarana::check_resource_id_string($resource_id)) {
    print "【エラー】権限対象IDとして有効でない文字列が指定されました\n";
    exit;
}
if (!wakarana::check_id_string($action)) {
    print "【エラー】動作IDとして有効でない文字列が指定されました\n";
    exit;
}

print "ロール ".$role_id." に権限対象 ".$resource_id." 動作 ".$action." の権限を割り当てています...\n";

$wakarana = new wakarana(__DIR__."/../../".$wakarana_base_dir);

$role = $wakarana->get_role($role_id);

if (is_object($role)) {
    if ($role->add_permission($resource_id, $action)) {
        print "ロールに権限を割り当てました\n";
    } else {
        print "ロールへの権限割り当てに失敗しました\n";
    }
} else {
    print "指定されたロールは存在しません\n";
}
