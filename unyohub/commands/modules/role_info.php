<?php
include __DIR__."/../../libs/wakarana/main.php";


$wakarana_base_dir = "config";


$wakarana = new wakarana(__DIR__."/../../".$wakarana_base_dir);

if (empty($argv[1])) {
    print "\n_/_/_/_/ ロールの一覧 _/_/_/_/\n\n";
    
    foreach ($wakarana->get_all_roles() as $role) {
        print $role->get_id()."\n";
        print "  ".addslashes($role->get_name())."\n\n";
    }
} else {
    print "\n_/_/_/_/ ロール情報 _/_/_/_/\n\n";
    
    $role = $wakarana->get_role($argv[1]);
    
    if (!is_object($role)) {
        print "【エラー】指定されたロールは存在しません\n";
        exit;
    }
    
    print "ロール識別名: ".$role->get_id()."\n\n";
    
    print "ロール表示名: ".addslashes($role->get_name())."\n\n";
    
    print "割り当て済みの権限:\n";
    $permissions = $role->get_permissions(FALSE);
    if (!empty($permissions)) {
        $resource_ids = array_keys($role->get_permissions(FALSE));
        foreach ($resource_ids as $resource_id) {
            foreach ($permissions[$resource_id] as $action) {
                print "  ".$resource_id." (".$action.")\n";
            }
        }
    } else {
        print "  (このロールには権限が割り当てられていません)\n";
    }
    print "\n";
    
    print "所持ユーザー:\n";
    $users = $role->get_users();
    if (!empty($users)) {
        foreach ($role->get_users() as $user) {
            print "  ".addslashes($user->get_name())." (".$user->get_id().")\n";
        }
    } else {
        print "  (このロールを所持するユーザーは存在しません)\n";
    }
}
