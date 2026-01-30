<?php
include "admin_common.php";


if (empty($_GET["railroad_id"])) {
    $railroad_id = "";
    
    if (!$user->check_permission("instance_administrator")) {
        print "【!】アクセス中のユーザーアカウントにはこのページにアクセスする権限がありません";
        exit;
    }
    
    $rule_path = "../config/rules.txt";
} else {
    $railroad_id = basename($_GET["railroad_id"]);
    
    if (!$user->check_permission("railroads/".$railroad_id, "edit_data")) {
        print "【!】アクセス中のユーザーアカウントにはこのページにアクセスする権限がありません";
        exit;
    }
    
    $rule_path = "../data/".$railroad_id."/rules.txt";
}


print_header();


if (file_exists($rule_path)) {
    $rule_file_exists = TRUE;
    $rule_content = file_get_contents($rule_path);
} else {
    $rule_file_exists = FALSE;
    $rule_content = "";
}

if (isset($_POST["rule_content"])) {
    $rule_content = $_POST["rule_content"];
    
    if (isset($_POST["one_time_token"]) && $user->check_one_time_token($_POST["one_time_token"])) {
        file_put_contents($rule_path, $rule_content);
        
        if (!$rule_file_exists) {
            chmod($rule_path, 0o766);
        }
        
        print "<script> alert('ルールとポリシーを更新しました'); </script>";
    } else {
        print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
    }
}


print "<article>";

if (empty($railroad_id)) {
    print "<h2>ルールとポリシーの編集</h2>";
} else {
    $railroad_info = json_decode(file_get_contents("../data/".$railroad_id."/railroad_info.json"), TRUE);
    
    print "<nav><a href='railroads.php?railroad_id=".addslashes($railroad_id)."'>".htmlspecialchars($railroad_info["railroad_name"])."</a> &gt;</nav>";
    print "<h2 style='border-color: ".addslashes($railroad_info["main_color"])."'>投稿ルールの編集</h2>";
}

print "<form action='edit_rules.php?railroad_id=".$railroad_id."' method='post'>";
print "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";

print "<textarea name='rule_content' class='rule_content' placeholder='ここに利用者向けの".(empty($railroad_id) ? "ルールとポリシー" : "投稿ルール")."を入力'>".htmlspecialchars($rule_content)."</textarea>";

print "<button type='submit' class='wide_button'>上書き保存</button>";
print "</form>";

print "</article>";


print_footer();
