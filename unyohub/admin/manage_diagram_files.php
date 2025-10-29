<?php
include "admin_common.php";


if (empty($_GET["railroad_id"])) {
    print "【!】URLが誤っています";
    exit;
}

$railroad_id = basename($_GET["railroad_id"]);

if (!$user->check_permission("railroads/".$railroad_id, "edit_data")) {
    print "【!】アクセス中のユーザーアカウントにはこのページにアクセスする権限がありません";
    exit;
}

$railroad_info_path = "../data/".$railroad_id."/railroad_info.json";
$railroad_info = json_decode(file_get_contents($railroad_info_path), TRUE);

if (empty($railroad_info)) {
    print "【!】路線系統情報を読み込めませんでした";
    exit;
}


print_header();


print "<article>";

print "<nav><a href='railroads.php?railroad_id=".$railroad_id."'>".htmlspecialchars($railroad_info["railroad_name"])."</a> &gt; <a href='manage_files.php?railroad_id=".$railroad_id."'>データファイルの管理</a> &gt;";

$diagram_revision_reg_exp = "/\A[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])\z/";

if (empty($_GET["new_dir"])) {
    
} else {
    if (isset($_POST["diagram_revision"])) {
        if (!preg_match($diagram_revision_reg_exp, $_POST["diagram_revision"])) {
            print "<script> alert('【!】ダイヤ改正日が正しく指定されていません。処理はキャンセルされました。'); </script>";
            goto new_dir_on_error;
        }
        
        if (!isset($_POST["one_time_token"]) || !$user->check_one_time_token($_POST["one_time_token"])) {
            print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
            goto new_dir_on_error;
        }
        
        $new_dir_path = "../data/".$railroad_id."/".$_POST["diagram_revision"];
        
        if (file_exists($new_dir_path)) {
            print "<script> alert('【!】指定されたダイヤ改正日のフォルダは既に存在しています。'); </script>";
            goto new_dir_on_error;
        }
        
        mkdir($new_dir_path);
        
        print "<script> alert('フォルダを作成しました'); location.href = 'manage_diagram_files.php?railroad_id=".$railroad_id."&diagram_revision=".$_POST["diagram_revision"]."'; </script>";
        
        goto new_dir_succeeded;
        
        new_dir_on_error:
    }
    
    print "<h2>新しいダイヤ改正日別フォルダ</h2>";
    
    print "<form action='manage_diagram_files.php?railroad_id=".$railroad_id."&new_dir=yes' method='post'>";
    print "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";
    
    print "<h3>ダイヤ改正日</h3>";
    print "<input type='date' name='diagram_revision'><br><br>";
    
    print "<button type='submit' class='wide_button'>ダイヤ改正日別フォルダの追加</button>";
    
    print "</form>";
    
    new_dir_succeeded:
}

print "</article>";


print_footer();
