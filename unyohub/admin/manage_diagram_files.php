<?php
include "admin_common.php";


function replace_file ($railroad_id, $diagram_revision, $file_name, $new_file = NULL) {
    $file_path = "../data/".$railroad_id."/".$diagram_revision."/".$file_name;
    
    if (file_exists($file_path)) {
        $trash_path = "../data/".$railroad_id."/trash";
        $diagram_files_trash_path = $trash_path."/".$diagram_revision;
        
        if (!is_dir($trash_path)) {
            mkdir($trash_path);
            chmod($trash_path, 0o777);
        }
        
        if (!is_dir($diagram_files_trash_path)) {
            mkdir($diagram_files_trash_path);
            chmod($diagram_files_trash_path, 0o777);
        }
        
        $trash_file_path = $diagram_files_trash_path."/".$file_name."__".date("YmdHis", filemtime($file_path)).".bak";
        
        rename($file_path, $trash_file_path);
    }
    
    if (!empty($new_file)) {
        rename($new_file, $file_path);
        touch($file_path);
    }
}


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
        print "<div class='informational_text'>指定されたダイヤ改正日が正しくありません</div>";
        goto end_of_article;
    }
    
    print "<h2>".intval(substr($_GET["diagram_revision"], 0, 4))."年".intval(substr($_GET["diagram_revision"], 5, 2))."月".intval(substr($_GET["diagram_revision"], 8))."日改正ダイヤのデータ</h2>";
    
    $token_html = "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";
    
    print "<form action='manage_diagram_files.php?railroad_id=".$railroad_id."&diagram_revision=".$_GET["diagram_revision"]."' method='post' enctype='multipart/form-data' id='upload_form' style='display: none;'>";
    print $token_html;
    print "<input type='file' name='new_file' id='new_file' onchange='document.getElementById(\"upload_form\").submit();'>";
    print "</form>";
    
    print "<form action='manage_diagram_files.php?railroad_id=".$railroad_id."&diagram_revision=".$_GET["diagram_revision"]."' method='post' id='delete_form' style='display: none;'>";
    print $token_html;
    print "<input type='hidden' name='delete_file_name' id='delete_file_name'>";
    print "</form>";
    
    print <<< EOM
    <script>
    function upload_file (extension = null) {
        var new_file_elm = document.getElementById("new_file");
        new_file_elm.accept = extension === null ? "" : "." + extension;
        new_file_elm.click();
    }
    
    function delete_file (file_name) {
        if (confirm(file_name + " を削除しますか？")) {
            document.getElementById("delete_file_name").value = file_name;
            document.getElementById("delete_form").submit();
        }
    }
    </script>
    EOM;
    
    if (isset($_FILES["new_file"]["tmp_name"]) && is_uploaded_file($_FILES["new_file"]["tmp_name"])) {
        if (!isset($_POST["one_time_token"]) || !$user->check_one_time_token($_POST["one_time_token"])) {
            print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
            goto on_error;
        }
        
        $new_file = $_FILES["new_file"]["tmp_name"];
        $file_name = $_FILES["new_file"]["name"];
        chmod($new_file, 0o766);
        
        $extension = pathinfo($file_name, PATHINFO_EXTENSION);
        
        if ($extension === "json") {
            if (!json_validate(file_get_contents($new_file))) {
                print "<script> alert('【!】JSONファイルの構文に不備があります。処理はキャンセルされました。'); </script>";
                goto on_error;
            }
            
            replace_file($railroad_id, $_GET["diagram_revision"], $file_name, $new_file);
            
            if (str_starts_with($file_name, "operation_table_")) {
                $result = exec_python_command("update-operations", array($railroad_id, $_GET["diagram_revision"], substr(pathinfo($file_name, PATHINFO_FILENAME), 16)));
            } else {
                $result = NULL;
            }
        } else {
            replace_file($railroad_id, $_GET["diagram_revision"], $file_name, $new_file);
            
            if ($extension === "csv" && str_starts_with($file_name, "train_number_mappings_")) {
                $result = exec_python_command("update-trip-ids", array($railroad_id, $_GET["diagram_revision"], substr(pathinfo($file_name, PATHINFO_FILENAME), 22)));
            } else {
                $result = NULL;
            }
        }
        
        print "<script> alert('".addslashes($file_name)." を保存しました'); </script>";
    } elseif (!empty($_POST["delete_file_name"])) {
        if (!isset($_POST["one_time_token"]) || !$user->check_one_time_token($_POST["one_time_token"])) {
            print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
            goto on_error;
        }
        
        $delete_file_name = basename($_POST["delete_file_name"]);
        
        if (!file_exists($dir_path.$delete_file_name)) {
            print "<script> alert('【!】削除対象として指定されたファイルが存在しません。'); </script>";
            goto on_error;
        }
        
        replace_file($railroad_id, $_GET["diagram_revision"], $delete_file_name, NULL);
        
        $extension = pathinfo($delete_file_name, PATHINFO_EXTENSION);
        
        if ($extension === "json" && str_starts_with($delete_file_name, "operation_table_")) {
            $result = exec_python_command("update-operations", array($railroad_id, $_GET["diagram_revision"], substr(pathinfo($delete_file_name, PATHINFO_FILENAME), 16)), "-D");
        } elseif ($extension === "csv" && str_starts_with($delete_file_name, "train_number_mappings_")) {
            $result = exec_python_command("update-trip-ids", array($railroad_id, $_GET["diagram_revision"], substr(pathinfo($delete_file_name, PATHINFO_FILENAME), 22)), "-D");
        } else {
            $result = NULL;
        }
        
        print "<script> alert('".addslashes($delete_file_name)." を削除しました'); </script>";
    } else {
        $result = NULL;
    }
    
    if (!empty($result)) {
        print "<input type='checkbox' id='result_drop_down'><label for='result_drop_down' class='drop_down'>更新処理実行ログ</label>";
        print "<div><div class='announcement'>".$result."</div></div>";
    }
    
    on_error:
    
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
            print "<li>".$file_name."<button onclick='delete_file(\"".$file_name."\");'>削除</button><div class='informational_text'>更新日時 ".date("Y-m-d H:i:s", filemtime($dir_path.$file_name))."</div></li>";
        }
        print "</ul>";
    } else {
        print "<div class='informational_text'>ファイルなし</div>";
    }
    
    print "<h3>時刻表ファイル</h3>";
    if (!empty($timetable_files)) {
        print "<ul class='file_list'>";
        foreach ($timetable_files as $file_name) {
            print "<li>".$file_name."<button onclick='delete_file(\"".$file_name."\");'>削除</button><div class='informational_text'>更新日時 ".date("Y-m-d H:i:s", filemtime($dir_path.$file_name))."</div></li>";
        }
        print "</ul>";
    } else {
        print "<div class='informational_text'>ファイルなし</div>";
    }
    
    print "<h3>便識別名対応表ファイル</h3>";
    if (!empty($train_number_mappings_files)) {
        print "<ul class='file_list'>";
        foreach ($train_number_mappings_files as $file_name) {
            print "<li>".$file_name."<button onclick='delete_file(\"".$file_name."\");'>削除</button><div class='informational_text'>更新日時 ".date("Y-m-d H:i:s", filemtime($dir_path.$file_name))."</div></li>";
        }
        print "</ul>";
    } else {
        print "<div class='informational_text'>ファイルなし</div>";
    }
    
    print "<h3>その他のファイル</h3>";
    if (!empty($other_files)) {
        print "<ul class='file_list'>";
        foreach ($other_files as $file_name) {
            print "<li>".$file_name."<button onclick='delete_file(\"".$file_name."\");'>削除</button><div class='informational_text'>更新日時 ".date("Y-m-d H:i:s", filemtime($dir_path.$file_name))."</div></li>";
        }
        print "</ul>";
    } else {
        print "<div class='informational_text'>ファイルなし</div>";
    }
    
    print "<br><button type='button' class='wide_button' onclick='upload_file(\"json\");'>JSONファイルのアップロード</button><button type='button' class='wide_button' onclick='upload_file(\"csv\");'>CSVファイルのアップロード</button>";
    print "<div class='informational_text'>アップロードされたファイルと同じ名前のファイルが既にサーバ上で存在している場合、そのファイルはアップロードされたファイルで上書きされます。</div>";
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
        chmod($new_dir_path, 0o777);
        
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
