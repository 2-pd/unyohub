<?php
include "admin_common.php";


function replace_file ($railroad_id, $file_name, $new_file) {
    $file_path = "../data/".$railroad_id."/".$file_name;
    
    if (file_exists($file_path)) {
        $trash_path = "../data/".$railroad_id."/trash";
        
        if (!is_dir($trash_path)) {
            mkdir($trash_path);
            chmod($trash_path, 0o777);
        }
        
        $trash_file_path = $trash_path."/".$file_name."__".date("YmdHis", filemtime($file_path)).".bak";
        
        rename($file_path, $trash_file_path);
    }
    
    rename($new_file, $file_path);
    touch($file_path);
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

print "<nav><a href='railroads.php?railroad_id=".$railroad_id."'>".htmlspecialchars($railroad_info["railroad_name"])."</a> &gt;";

if (empty($_GET["file_name"])) {
    print "</nav>";
    
    print "<h2>データファイルの管理</h2>";
    
    print "<h3>ダイヤ改正別データ</h3>";
    
    $dir_list = array_reverse(glob("../data/".$railroad_id."/[0-9][0-9][0-9][0-9]-[01][0-9]-[0-3][0-9]"));
    
    $buf = "";
    foreach ($dir_list as $dir_path) {
        if (!is_dir($dir_path)) {
            continue;
        }
        
        $diagram_revision = basename($dir_path);
        $buf .= "<li><a href='manage_diagram_files.php?railroad_id=".$railroad_id."&diagram_revision=".$diagram_revision."'>".$diagram_revision."<small> 改正</small></a></li>";
    }
    
    if (!empty($buf)) {
        print "<ul class='file_list'>".$buf."</ul>";
    } else {
        print "<div class='informational_text'>ダイヤ改正別フォルダなし</div>";
    }
    
    print "<a href='manage_diagram_files.php?railroad_id=".$railroad_id."&new_dir=yes' class='execute_button'>ダイヤ改正日別フォルダの追加</a>";
    
    print "<h3>路線系統情報ファイル</h3>";
    print "<h5>railroad_info.json</h5><div class='informational_text'>更新日時 ".date("Y-m-d H:i:s", filemtime($railroad_info_path))."</div>";
    print "<a href='manage_files.php?railroad_id=".$railroad_id."&file_name=railroad_info.json' class='execute_button'>アップロード・復元</a>";
    
    print "<h3>車両アイコンファイル</h3>";
    $icon_list_path = "../data/".$railroad_id."/icons/icon_list.json";
    $icon_list = @json_decode(@file_get_contents($icon_list_path), TRUE);
    print "<div class='informational_text'>".(!empty($icon_list) ? "登録済みアイコン ".count($icon_list)."個<br>更新日時 ".date("Y-m-d H:i:s", filemtime($icon_list_path)) : "登録済みアイコンなし")."</div>";
    print "<a href='manage_train_icons.php?railroad_id=".$railroad_id."' class='execute_button'>追加・削除</a>";
    
    print "<h3>編成表元ファイル</h3>";
    $formations_path = "../data/".$railroad_id."/formations.csv";
    print "<h5>formations.csv</h5><div class='informational_text'>".(file_exists($formations_path) ? "更新日時 ".date("Y-m-d H:i:s", filemtime($formations_path)) : "ファイルなし")."</div>";
    print "<a href='manage_files.php?railroad_id=".$railroad_id."&file_name=formations.csv' class='execute_button'>アップロード・復元</a>";
    
    print "<h3>ダイヤ改正日一覧ファイル</h3>";
    $diagram_revisions_path = "../data/".$railroad_id."/diagram_revisions.txt";
    print "<h5>diagram_revisions.txt</h5><div class='informational_text'>".(file_exists($diagram_revisions_path) ? "更新日時 ".date("Y-m-d H:i:s", filemtime($diagram_revisions_path)) : "ファイルなし")."</div>";
    print "<a href='manage_files.php?railroad_id=".$railroad_id."&file_name=diagram_revisions.txt' class='execute_button'>アップロード・復元</a>";
    
    print "<h3>車両識別名対応表ファイル</h3>";
    $formation_name_mappings_path = "../data/".$railroad_id."/formation_name_mappings.json";
    print "<h5>formation_name_mappings.json</h5><div class='informational_text'>".(file_exists($formation_name_mappings_path) ? "更新日時 ".date("Y-m-d H:i:s", filemtime($formation_name_mappings_path)) : "ファイルなし")."</div>";
    print "<a href='manage_files.php?railroad_id=".$railroad_id."&file_name=formation_name_mappings.json' class='execute_button'>アップロード・復元</a>";
} else {
    print " <a href='manage_files.php?railroad_id=".$railroad_id."'>データファイルの管理</a> &gt;</nav>";
    
    switch ($_GET["file_name"]) {
        case "railroad_info.json":
            print "<h2>路線系統情報ファイルの管理</h2>";
            break;
        case "formations.csv":
            print "<h2>編成表元ファイルの管理</h2>";
            break;
        case "diagram_revisions.txt":
            print "<h2>ダイヤ改正日一覧ファイルの管理</h2>";
            break;
        case "formation_name_mappings.json":
            print "<h2>車両識別名対応表ファイルの管理</h2>";
            break;
        default:
            print "【!】指定されたパスは編集可能なファイル名ではありません";
            goto invalid_file_name;
    }
    
    $file_path = "../data/".$railroad_id."/".$_GET["file_name"];
    $trash_path = "../data/".$railroad_id."/trash";
    
    $token_html = "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";
    
    print "<form action='manage_files.php?railroad_id=".$railroad_id."&file_name=".$_GET["file_name"]."' method='post' enctype='multipart/form-data' id='upload_form' style='display: none;'>";
    print $token_html;
    print "<input type='file' accept='.".pathinfo($_GET["file_name"], PATHINFO_EXTENSION)."' name='new_file' id='new_file' onchange='upload_file();'>";
    print "</form>";
    
    print "<form action='manage_files.php?railroad_id=".$railroad_id."&file_name=".$_GET["file_name"]."' method='post' id='restore_form' style='display: none;'>";
    print $token_html;
    print "<input type='hidden' name='trash_file_name' id='trash_file_name'>";
    print "</form>";
    
    print <<< EOM
    <script>
    function upload_file () {
        if (confirm("選択したファイルで現在のファイルを置き換えますか？")) {
            document.getElementById("upload_form").submit();
        } else {
            document.getElementById("new_file").value = "";
        }
    }
    
    function restore_trash_file (trash_file_name) {
        if (confirm("過去のバージョンを復元して現在のファイルを置き換えますか？")) {
            document.getElementById("trash_file_name").value = trash_file_name;
            document.getElementById("restore_form").submit();
        }
    }
    </script>
    EOM;
    
    if (isset($_FILES["new_file"]["tmp_name"]) && is_uploaded_file($_FILES["new_file"]["tmp_name"])) {
        $new_file = $_FILES["new_file"]["tmp_name"];
        chmod($new_file, 0o766);
    } elseif (isset($_POST["trash_file_name"])) {
        $new_file = $trash_path."/".basename($_POST["trash_file_name"]);
    } else {
        $new_file = NULL;
    }
    
    if (!empty($new_file)) {
        if (!isset($_POST["one_time_token"]) || !$user->check_one_time_token($_POST["one_time_token"])) {
            print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
            goto on_error;
        }
        
        switch ($_GET["file_name"]) {
            case "railroad_info.json":
                $railroad_info_new = json_decode(file_get_contents($new_file), TRUE);
                
                if (!isset($railroad_info_new["railroad_name"], $railroad_info_new["main_color"], $railroad_info_new["railroad_icon"])) {
                    print "<script> alert('【!】ファイル内容に不備があります。処理はキャンセルされました。'); </script>";
                    goto on_error;
                }
                
                if ($railroad_info_new["railroad_name"] !== $railroad_info["railroad_name"] || $railroad_info_new["main_color"] !== $railroad_info["main_color"] || $railroad_info_new["railroad_icon"] !== $railroad_info["railroad_icon"]) {
                    $railroads = json_decode(file_get_contents(RAILROADS_JSON_PATH), TRUE);
                    
                    $railroads["railroads"][$railroad_id]["railroad_name"] = $railroad_info_new["railroad_name"];
                    $railroads["railroads"][$railroad_id]["main_color"] = $railroad_info_new["main_color"];
                    $railroads["railroads"][$railroad_id]["railroad_icon"] = $railroad_info_new["railroad_icon"];
                    
                    file_put_contents(RAILROADS_JSON_PATH, json_encode($railroads, JSON_UNESCAPED_UNICODE));
                }
                
                replace_file($railroad_id, $_GET["file_name"], $new_file);
                
                $result = NULL;
                
                break;
            case "formations.csv":
                replace_file($railroad_id, $_GET["file_name"], $new_file);
                
                $result = exec_python_command("conv-formations", $railroad_id);
                
                break;
            default:
                if (pathinfo($_GET["file_name"], PATHINFO_EXTENSION) === "json" && !json_validate(file_get_contents($new_file))) {
                    print "<script> alert('【!】JSONファイルの構文に不備があります。処理はキャンセルされました。'); </script>";
                    goto on_error;
                }
                
                replace_file($railroad_id, $_GET["file_name"], $new_file);
                
                $result = NULL;
        }
        
        print "<script> alert('ファイルを更新しました'); </script>";
    }
    
    if (!empty($result)) {
        print "<input type='checkbox' id='result_drop_down'><label for='result_drop_down' class='drop_down'>更新処理実行ログ</label>";
        print "<div><div class='announcement'>".$result."</div></div>";
    }
    
    on_error:
    
    print "<h3>現在のファイル</h3>";
    print "<h5>".$_GET["file_name"]."</h5><div class='informational_text'>".(file_exists($file_path) ? "更新日時 ".date("Y-m-d H:i:s", filemtime($file_path)) : "ファイルなし")."</div>";
    print "<button type='button' class='wide_button' onclick='document.getElementById(\"new_file\").click();'>新しいファイルのアップロード</button>";
    
    print "<h3>過去のバージョン</h3>";
    if (is_dir($trash_path)) {
        $trash_files = glob($trash_path."/".$_GET["file_name"]."__*");
        
        if (!empty($trash_files)) {
            print "<table>";
            foreach (array_reverse($trash_files) as $trash_file_path) {
                print "<tr><td>更新日時 ".date("Y-m-d H:i:s", filemtime($trash_file_path))."<button type='button' onclick='restore_trash_file(\"".basename($trash_file_path)."\");'>復元</button></td></tr>";
            }
            print "</table>";
        } else {
            print "<div class='informational_text'>過去のバージョンは存在しません</div>";
        }
    } else {
        print "<div class='informational_text'>過去のバージョンは存在しません</div>";
    }
    
    invalid_file_name:
}

print "</article>";


print_footer();
