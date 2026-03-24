<?php
include __DIR__."/../../libs/wakarana/main.php";


$wakarana_base_dir = "config";


$wakarana = new wakarana(__DIR__."/../../".$wakarana_base_dir);

print "\n_/_/_/_/ ユーザー情報 _/_/_/_/\n\n";

if (empty($argv[1])) {
    print "ユーザー総数 : ".$wakarana->count_user()."\n";;
} else {
    $user = $wakarana->get_user($argv[1]);
    
    if (!is_object($user)) {
        print "【エラー】指定されたユーザーは存在しません\n";
        exit;
    }
    
    $user_id = $user->get_id();
    
    print "ユーザー識別名 :        ".$user_id."\n";
    
    $user_name = $user->get_name();
    print "ハンドルネーム :        ".(!empty($user_name) ? addslashes($user_name) : "(未設定)")."\n";
    
    print "状態 :                  ".($user->get_status() === WAKARANA_STATUS_NORMAL ? "有効" : "停止中")."\n";
    
    print "ユーザー登録日時 :      ".$user->get_created()."\n";
    
    print "ユーザー情報更新日時 :  ".$user->get_last_access()."\n";
    
    print "最終アクセス日時 :      ".$user->get_last_access()."\n";
    
    $email_address = $user->get_primary_email_address();
    print "メールアドレス :        ".(!empty($email_address) ? addslashes($email_address) : "(未設定)")."\n";
    
    $website_url = $user->get_value("website_url");
    print "webサイトのURL :        ".(!empty($website_url) ? addslashes($website_url) : "(未設定)")."\n";
    
    print "通算投稿日数 :          ".intval($user->get_value("days_posted"))."\n";
    
    print "累計投稿数 :            ".intval($user->get_value("post_count"))."\n";
    
    $last_posted_date = $user->get_value("last_posted_date");
    print "最終投稿日 :            ".(!empty($last_posted_date) ? $last_posted_date : "N/A")."\n\n";
    
    print "割り当て済みのロール :\n";
    $roles = $user->get_roles();
    foreach ($roles as $role) {
        print "  ".addslashes($role->get_name())." (".$role->get_id().")\n";
    }
    print "\n";
    
    $moderation_db_obj = new SQLite3("../common_dbs/moderation.db");
    $moderation_db_obj->busyTimeout(5000);
    
    $now_ts = time();
    $now_datetime = date("Y-m-d H:i:s", $now_ts);
    
    $time_out_expiration = $moderation_db_obj->querySingle("SELECT `expiration_datetime` FROM `unyohub_moderation_timed_out_users` WHERE `user_id` = '".$user_id."' AND `expiration_datetime` > '".$now_datetime."'");
    
    print "タイムアウト :          ".(empty($time_out_expiration) ? "なし" : "タイムアウト中 (残 ".(ceil((strtotime($time_out_expiration) - $now_ts) / 86400))."日)")."\n\n";
    
    $logs_r = $moderation_db_obj->query("SELECT `timed_out_datetime`, `moderator_id`, `timed_out_days` FROM `unyohub_moderation_user_timed_out_logs` WHERE `user_id` = '".$user_id."' ORDER BY `timed_out_datetime` DESC LIMIT 5");
    
    print "タイムアウト履歴 :\n";
    $time_out_log_exists = FALSE;
    while ($log_data = $logs_r->fetchArray(SQLITE3_ASSOC)) {
        if ($log_data["moderator_id"] !== "#") {
            $moderator = $wakarana->get_user($log_data["moderator_id"]);
            
            $moderator_info = "モデレーター : ".(is_object($moderator) ? $moderator->get_name() : "存在しないユーザー");
        } else {
            $moderator_info = "コマンドライン";
        }
        
        print "  ".$log_data["timed_out_datetime"]." から ".$log_data["timed_out_days"]."日間 (".addslashes($moderator_info).")\n";
        
        $time_out_log_exists = TRUE;
    }
    if (!$time_out_log_exists) {
        print "  (なし)\n";
    }
}
