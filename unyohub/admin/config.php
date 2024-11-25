<?php
include "admin_common.php";

if (!$user->check_permission("instance_administrator")) {
    print "【!】アクセス中のユーザーアカウントにはこのページにアクセスする権限がありません";
    exit;
}

print_header();


$config_str = file_get_contents("../config/main.ini");

if (isset($_POST["instance_name"], $_POST["manual_url"], $_POST["introduction_text"], $_POST["sender_email_address"])) {
    $config_str = "instance_name = \"".addslashes($_POST["instance_name"])."\"\n";
    $config_str .= "\n";
    $config_str .= "manual_url = \"".addslashes($_POST["manual_url"])."\"\n";
    $config_str .= "introduction_text = \"".str_replace(array("\r\n", "\n", "\r"), "\\n", addslashes($_POST["introduction_text"]))."\"\n";
    $config_str .= "\n";
    $config_str .= "require_invite_code = ".(!empty($_POST["require_invite_code"]) ? "true" : "false")."\n";
    $config_str .= "require_email_address = ".(!empty($_POST["require_email_address"]) ? "true" : "false")."\n";
    $config_str .= "allow_guest_user = ".(!empty($_POST["allow_guest_user"]) ? "true" : "false")."\n";
    $config_str .= "\n";
    $config_str .= "sender_email_address = \"".addslashes($_POST["sender_email_address"])."\"\n";
    $config_str .= "\n";
    $config_str .= "log_ip_address = ".(!empty($_POST["log_ip_address"]) ? "true" : "false")."\n";
    
    if (isset($_POST["one_time_token"]) && $user->check_one_time_token($_POST["one_time_token"])) {
        file_put_contents("../config/main.ini", $config_str);
        
        print "<script> alert('インスタンスの基本設定を保存しました'); </script>";
    } else {
        print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
    }
}

$config = parse_ini_string($config_str);


print "<article>";

print "<h2>インスタンスの基本設定</h2>";

print "<form action='config.php' method='post'>";
print "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";

print "<h3>インスタンス名</h3>";
print "<input type='text' name='instance_name' value='".addslashes($config["instance_name"])."'>";

print "<h3>ユーザーマニュアルのURL</h3>";
print "<input type='text' name='manual_url' value='".addslashes($config["manual_url"])."'>";

print "<h3>インスタンスの紹介文</h3>";
print "<textarea name='introduction_text'>".htmlspecialchars(stripcslashes($config["introduction_text"]))."</textarea>";

print "<h3>ユーザー登録・投稿管理</h3>";
print "<input type='checkbox' name='require_invite_code' id='require_invite_code' class='toggle' value='YES'";
if ($config["require_invite_code"]) {
    print " checked='checked'";
}
print "><label for='require_invite_code'>ユーザー登録を招待制にする</label>";
print "<input type='checkbox' name='require_email_address' id='require_email_address' class='toggle' value='YES'";
if ($config["require_email_address"]) {
    print " checked='checked'";
}
print "><label for='require_email_address'>ユーザー登録時にメールアドレス入力を強制する</label>";
print "<input type='checkbox' name='allow_guest_user' id='allow_guest_user' class='toggle' value='YES'";
if ($config["allow_guest_user"]) {
    print " checked='checked'";
}
print "><label for='allow_guest_user'>ログインしていないユーザーの投稿を認める</label>";

print "<h3>メール送信用アドレス</h3>";
print "<div class='informational_text'>このインスタンスのサーバに割り当てられているドメインであれば、存在しないメールアドレスでも設定可能です。</div>";
print "<input type='text' name='sender_email_address' value='".addslashes($config["sender_email_address"])."'>";

print "<h3>ログ管理</h3>";
print "<input type='checkbox' name='log_ip_address' id='log_ip_address' class='toggle' value='YES'";
if ($config["log_ip_address"]) {
    print " checked='checked'";
}
print "><label for='log_ip_address'>投稿者のIPアドレスを記録する</label>";

print "<br><br><button type='submit' class='wide_button'>上書き保存</button>";
print "</form>";

print "</article>";


print_footer();
