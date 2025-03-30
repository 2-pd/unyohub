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
if ($resource_id === "instance_administrator") {
    print "【エラー】ロールへの割り当てが制限されている権限です\n";
    exit;
}
if (!wakarana::check_id_string($action)) {
    print "【エラー】動作IDとして有効でない文字列が指定されました\n";
    exit;
}

print "ロール ".$role_id." に権限対象 ".$resource_id." 動作 ".$action." の権限を割り当てています...\n";

$wakarana = new wakarana(__DIR__."/../../".$wakarana_base_dir);

$role = $wakarana->get_role($role_id);

if (!is_object($role)) {
    print "指定されたロールは存在しません\n";
    exit;
}

if (!$role->add_permission($resource_id, $action)) {
    print "ロールへの権限割り当てに失敗しました\n";
    exit;
}

$resource_id_exploded = explode("/", $resource_id);
if ($resource_id_exploded[0] === "railroads") {
    $railroad_resource_id = count($resource_id_exploded) == 1 ? $resource_id_exploded[0] : $resource_id_exploded[0]."/".$resource_id_exploded[1];
    
    if (!$role->check_permission($railroad_resource_id)) {
        if (!$role->add_permission($railroad_resource_id)) {
            print "ロールへの権限割り当てに失敗しました\n";
            exit;
        }
    }
}

print "ロールに権限を割り当てました\n";
