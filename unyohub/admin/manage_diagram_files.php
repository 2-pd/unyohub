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

if (isset($_GET["diagram_revision"])) {
    $dir_path = "../data/".$railroad_id."/".$_GET["diagram_revision"]."/";
    
    if (!preg_match($diagram_revision_reg_exp, $_GET["diagram_revision"]) || !is_dir($dir_path)) {
        print "【!】指定されたダイヤ改正日が正しくありません";
        goto end_of_article;
    }
    
    print "<h2>".intval(substr($_GET["diagram_revision"], 0, 4))."年".intval(substr($_GET["diagram_revision"], 5, 2))."月".intval(substr($_GET["diagram_revision"], 8))."日ダイヤのファイル</h2>";
    
    $file_list = glob($dir_path."*");
    
    $diagram_info_exists = FALSE;
    $operation_table_files = array();
    $timetable_files = array();
    $train_number_mappings_files = array();
    $other_files = array();
    
    foreach ($file_list as $file_path) {
        $file_name = basename($file_path);
        $extension = pathinfo($file_name, PATHINFO_EXTENSION);
        
        if ($extension === "json") {
            if ($file_name === "diagram_info.json") {
                $diagram_info_exists = TRUE;
            } elseif (str_starts_with($file_name, "operation_table_")) {
                $operation_table_files[] = $file_name;
            } elseif (str_starts_with($file_name, "timetable_")) {
                $timetable_files[] = $file_name;
            } else {
                $other_files[] = $file_name;
            }
        } elseif ($extension === "csv" && str_starts_with($file_name, "train_number_mappings_")) {
            $train_number_mappings_files[] = $file_name;
        } else {
            $other_files[] = $file_name;
        }
    }
    
    print "<h3>ダイヤ識別設定ファイル</h3>";
    print "<h5>diagram_info.json</h5><div class='informational_text'>".($diagram_info_exists ? "更新日時 ".date("Y-m-d H:i:s", filemtime($dir_path."diagram_info.json")) : "ファイルなし")."</div>";
    
    print "<h3>運用表ファイル</h3>";
    if (!empty($operation_table_files)) {
        print "<ul class='file_list'>";
        foreach ($operation_table_files as $file_name) {
            print "<li>".$file_name."<div class='informational_text'>更新日時 ".date("Y-m-d H:i:s", filemtime($dir_path.$file_name))."</div></li>";
        }
        print "</ul>";
    } else {
        print "<div class='informational_text'>ファイルなし</div>";
    }
    
    print "<h3>時刻表ファイル</h3>";
    if (!empty($timetable_files)) {
        print "<ul class='file_list'>";
        foreach ($timetable_files as $file_name) {
            print "<li>".$file_name."<div class='informational_text'>更新日時 ".date("Y-m-d H:i:s", filemtime($dir_path.$file_name))."</div></li>";
        }
        print "</ul>";
    } else {
        print "<div class='informational_text'>ファイルなし</div>";
    }
    
    print "<h3>便識別名対応表ファイル</h3>";
    if (!empty($train_number_mappings_files)) {
        print "<ul class='file_list'>";
        foreach ($train_number_mappings_files as $file_name) {
            print "<li>".$file_name."<div class='informational_text'>更新日時 ".date("Y-m-d H:i:s", filemtime($dir_path.$file_name))."</div></li>";
        }
        print "</ul>";
    } else {
        print "<div class='informational_text'>ファイルなし</div>";
    }
    
    print "<h3>その他のファイル</h3>";
    if (!empty($other_files)) {
        print "<ul class='file_list'>";
        foreach ($other_files as $file_name) {
            print "<li>".$file_name."<div class='informational_text'>更新日時 ".date("Y-m-d H:i:s", filemtime($dir_path.$file_name))."</div></li>";
        }
        print "</ul>";
    } else {
        print "<div class='informational_text'>ファイルなし</div>";
    }
} elseif (!empty($_GET["new_dir"])) {
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
        
        print "<script> alert('フォルダを作成しました。\\n新しいダイヤの有効化にはダイヤ改正日一覧ファイルへの改正日情報追加が必要です。'); location.href = 'manage_diagram_files.php?railroad_id=".$railroad_id."&diagram_revision=".$_POST["diagram_revision"]."'; </script>";
        
        goto end_of_article;
        
        new_dir_on_error:
    }
    
    print "<h2>新しいダイヤ改正日別フォルダ</h2>";
    
    print "<form action='manage_diagram_files.php?railroad_id=".$railroad_id."&new_dir=yes' method='post'>";
    print "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";
    
    print "<h3>ダイヤ改正日</h3>";
    print "<input type='date' name='diagram_revision'><br><br>";
    
    print "<button type='submit' class='wide_button'>ダイヤ改正日別フォルダの追加</button>";
    
    print "</form>";
} else {
    print "【!】ダイヤ改正日別フォルダが指定されていません";
}

end_of_article:

print "</article>";


print_footer();
