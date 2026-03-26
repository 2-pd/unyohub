<?php
include "admin_common.php";

if (!$user->check_permission("instance_administrator")) {
    print "【!】アクセス中のユーザーアカウントにはこのページにアクセスする権限がありません";
    exit;
}


print_header();


print "<article>";

if (isset($_POST["email_domain_blacklist"])) {
    $blacklist = $_POST["email_domain_blacklist"];
    
    if (isset($_POST["one_time_token"]) && $user->check_one_time_token($_POST["one_time_token"])) {
        file_put_contents("../config/wakarana_email_domain_blacklist.conf", $blacklist);
        
        print "<script> alert('ブロック対象のメールドメインを更新しました'); </script>";
    } else {
        print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
    }
} else {
    $blacklist = file_get_contents("../config/wakarana_email_domain_blacklist.conf");
}

print "<h2>メールドメインのブロック設定</h2>";

print "<div class='informational_text'>ブロック対象のメールドメインを1行に1件ずつ入力してください。<br>ここに記載されたドメインのメールアドレスはユーザーアカウントのメールアドレスとして登録できなくなります。</div>";

print "<form action='email_domain_blacklist.php' method='post'>";
print "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";

print "<textarea name='email_domain_blacklist' class='rule_content'>".htmlspecialchars($blacklist)."</textarea>";

print "<button type='submit' class='wide_button'>上書き保存</button>";

print "</form>";

print "</article>";


print_footer();
