<?php
include __DIR__."/../../libs/wakarana/main.php";


$wakarana_base_dir = "config";


$wakarana = new wakarana(__DIR__."/../../".$wakarana_base_dir);

print "\n_/_/_/_/ ユーザー情報の変更 _/_/_/_/\n\n";

if (empty($argv[1])) {
    print "【エラー】ユーザーが指定されていません\n";
    exit;
}

$user = $wakarana->get_user($argv[1]);

if (!is_object($user)) {
    print "【エラー】指定されたユーザーは存在しません\n";
    exit;
}

print "対象ユーザー: ".addslashes($user->get_name())." (".$user->get_id().")\n\n";

$options = array_slice($argv, 2);

if (in_array("--enable", $options) && in_array("--disable", $options)) {
    print "【エラー】有効化と無効化を同時に指定することはできません\n";
    exit;
}

for ($cnt = 0; isset($options[$cnt]); $cnt++) {
    switch ($options[$cnt]) {
        case "--user-name":
            if (isset($options[$cnt + 1])) {
                $user->set_name($options[$cnt + 1]);
                
                print "ユーザー表示名を ".addslashes($options[$cnt + 1])." に変更しました\n";
                
                $cnt++;
            }
            
            break;
            
        case "--email-address":
            if (isset($options[$cnt + 1])) {
                if ($wakarana->check_email_address($options[$cnt + 1])) {
                    $user->remove_all_email_addresses();
                    $user->add_email_address($options[$cnt + 1]);
                    
                    print "メールアドレスを ".addslashes($options[$cnt + 1])." に変更しました\n";
                } else {
                    print "《注意》メールアドレス ".addslashes($options[$cnt + 1])." は使用できません\n";
                    
                    break;
                }
                
                $cnt++;
            }
            
            break;
            
        case "--website-url":
            if (isset($options[$cnt + 1])) {
                $user->set_value("website_url", $options[$cnt + 1]);
                
                print "webサイトのURLを ".addslashes($options[$cnt + 1])." に変更しました\n";
                
                $cnt++;
            }
            
            break;
            
        case "--reset-password":
            $new_password = wakarana::create_random_password();
            
            $user->set_password($new_password);
            
            print "パスワードを ".$new_password." に変更しました\n";
            
            break;
            
        case "--time-out":
            if (isset($options[$cnt + 1])) {
                if (!ctype_digit($options[$cnt + 1])) {
                    print "タイムアウト日数の指定が不正です\n";
                    
                    $cnt++;
                    
                    break;
                }
                
                $moderation_db_obj = new SQLite3("../common_dbs/moderation.db");
                $moderation_db_obj->busyTimeout(5000);
                
                $timed_out_days = intval($options[$cnt + 1]);
                
                if ($timed_out_days >= 1 && $timed_out_days <= 90) {
                    $now_ts = time();
                    
                    $moderation_db_obj->query("REPLACE INTO `unyohub_moderation_timed_out_users` (`user_id`, `expiration_datetime`) VALUES ('".$user->get_id()."', '".date("Y-m-d H:i:s", $timed_out_days * 86400 + $now_ts)."')");
                    $moderation_db_obj->query("INSERT INTO `unyohub_moderation_user_timed_out_logs` (`user_id`, `timed_out_datetime`, `moderator_id`, `timed_out_days`) VALUES ('".$user->get_id()."', '".date("Y-m-d H:i:s", $now_ts)."', '#', ".$timed_out_days.")");
                    
                    print $options[$cnt + 1]."日間のタイムアウトを設定しました\n";
                } elseif ($timed_out_days === 0) {
                    $moderation_db_obj->query("DELETE FROM `unyohub_moderation_timed_out_users` WHERE `user_id` = '".$user->get_id()."'");
                    
                    print "ユーザーのタイムアウトを解除しました\n";
                } else {
                    print "無効なタイムアウト日数です\n";
                }
                
                $cnt++;
            }
            
            break;
            
        case "--enable":
            if ($user->get_status() === WAKARANA_STATUS_NORMAL) {
                print "ユーザーアカウントは既に有効化されています\n";
                
                break;
            }
            
            $user->set_status(WAKARANA_STATUS_NORMAL);
            
            print "ユーザーアカウントを有効化しました\n";
            
            break;
            
        case "--disable":
            if ($user->get_status() === WAKARANA_STATUS_DISABLE) {
                print "ユーザーアカウントは既に無効化されています\n";
                
                break;
            }
            
            $user->set_status(WAKARANA_STATUS_DISABLE);
            
            print "ユーザーアカウントを無効化しました\n";
            
            break;
    }
}
