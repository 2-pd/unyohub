<?php
include "admin_common.php";
include "../libs/wakarana/config.php";

if (!$user->check_permission("instance_administrator")) {
    print "【!】アクセス中のユーザーアカウントにはこのページにアクセスする権限がありません";
    exit;
}


print_header();


print "<article>";


$wakarana_config = new wakarana_config("../config");


if (isset($_POST["additional_email_domain"])) {
    if (isset($_POST["one_time_token"]) && $user->check_one_time_token($_POST["one_time_token"])) {
        if ($wakarana_config->add_email_domain_to_blacklist($_POST["additional_email_domain"])) {
            print "<script> alert('ブロック対象のメールドメインを追加しました'); </script>";
        } else {
            print "<script> alert('【!】ブロック対象メールドメインの追加に失敗しました'); </script>";
        }
    } else {
        print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
    }
}

if (isset($_POST["email_domain_blacklist"])) {
    $blacklist = $_POST["email_domain_blacklist"];
    
    if (isset($_POST["one_time_token"]) && $user->check_one_time_token($_POST["one_time_token"])) {
        if ($wakarana_config->replace_email_domain_blacklist($blacklist) !== FALSE) {
            print "<script> alert('ブロック対象のメールドメインを更新しました'); </script>";
            
            $blacklist = implode("\n", $wakarana_config->get_email_domain_blacklist());
        } else {
            print "<script> alert('【!】ブロック対象メールドメインの更新に失敗しました'); </script>";
        }
    } else {
        print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
    }
} else {
    $blacklist = implode("\n", $wakarana_config->get_email_domain_blacklist());
}


print "<h2>メールドメインのブロック設定</h2>";

print "<div class='informational_text'>ブロック対象のメールドメインを1行に1件ずつ入力してください。<br>ここに記載されたドメインのメールアドレスはユーザーアカウントのメールアドレスとして登録できなくなります。<br><br>なお、重複するドメインやメールドメインとして使用できないものは保存時に除外されます。</div>";

print "<form action='email_domain_blacklist.php' method='post'>";
print "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";

print "<textarea name='email_domain_blacklist' class='rule_content'>".htmlspecialchars($blacklist)."</textarea>";

print "<button type='submit' class='save_button'>上書き保存</button>";

print "</form>";

print "</article>";


print_footer();
