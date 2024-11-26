<?php
include "admin_common.php";

if (!$user->check_permission("instance_administrator")) {
    print "【!】アクセス中のユーザーアカウントにはこのページにアクセスする権限がありません";
    exit;
}

print_header();


$rule_content = file_get_contents("../config/rules.txt");

if (isset($_POST["rule_content"])) {
    $rule_content = $_POST["rule_content"];
    
    if (isset($_POST["one_time_token"]) && $user->check_one_time_token($_POST["one_time_token"])) {
        file_put_contents("../config/rules.txt", $rule_content);
        
        print "<script> alert('ルールとポリシーを更新しました'); </script>";
    } else {
        print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
    }
}


print "<article>";

print "<h2>ルールとポリシーの編集</h2>";

print "<form action='edit_rules.php' method='post'>";
print "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";

print "<textarea name='rule_content' class='rule_content'>".htmlspecialchars($rule_content)."</textarea>";

print "<button type='submit' class='wide_button'>上書き保存</button>";
print "</form>";

print "</article>";


print_footer();
