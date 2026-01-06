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

print "<nav><a href='railroads.php?railroad_id=".$railroad_id."'>".htmlspecialchars($railroad_info["railroad_name"])."</a> &gt; <a href='manage_files.php?railroad_id=".$railroad_id."'>データファイルの管理</a> &gt;</nav>";

print "<h2>車両アイコン画像の管理</h2>";


$icon_dir_path = "../data/".$railroad_id."/icons/";
$icon_list_path = $icon_dir_path."icon_list.json";

if (file_exists($icon_list_path)) {
    $icon_list = json_decode(file_get_contents($icon_list_path), TRUE);
} else {
    $icon_list = array();
}


if (isset($_FILES["new_icon_file"])) {
    if (!isset($_POST["one_time_token"]) || !$user->check_one_time_token($_POST["one_time_token"])) {
        print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
        goto not_processed;
    }
    
    $processed_file_count = 0;
    for ($cnt = 0; isset($_FILES["new_icon_file"]["tmp_name"][$cnt]); $cnt++) {
        if (!is_uploaded_file($_FILES["new_icon_file"]["tmp_name"][$cnt])) {
            print "<script> alert('【!】".($cnt + 1)."件目のデータが異常です'); </script>";
            continue;
        }
        
        $new_icon_path_info = pathinfo($_FILES["new_icon_file"]["name"][$cnt]);
        
        if (empty($new_icon_path_info["filename"]) || empty($new_icon_path_info["extension"])) {
            print "<script> alert('【!】".($cnt + 1)."件目のファイルの名前が不正です'); </script>";
            continue;
        }
        
        if (!in_array($new_icon_path_info["extension"], ["webp", "png", "gif", "jpeg", "jpg"])) {
            print "<script> alert('【!】".($cnt + 1)."件目のファイルは非対応のファイル形式です'); </script>";
            continue;
        }
        
        $new_file_path = "../data/".$railroad_id."/icons/".basename($_FILES["new_icon_file"]["name"][$cnt]);
        
        if (isset($icon_list[$new_icon_path_info["filename"]])) {
            unlink("../data/".$railroad_id."/icons/".$icon_list[$new_icon_path_info["filename"]]["file_name"]);
        }
        
        rename($_FILES["new_icon_file"]["tmp_name"][$cnt], $new_file_path);
        
        chmod($new_file_path, 0o766);
        
        $processed_file_count++;
    }
    
    if ($processed_file_count === 0) {
        goto not_processed;
    }
    
    $result = exec_python_command("embed-icons", $railroad_id);
    
    print "<script> alert('".$processed_file_count."件のアイコン画像を追加しました'); </script>";
} elseif (isset($_POST["remove_icon_id"])) {
    if (!isset($_POST["one_time_token"]) || !$user->check_one_time_token($_POST["one_time_token"])) {
        print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
        goto not_processed;
    }
    
    if (!array_key_exists($_POST["remove_icon_id"], $icon_list)) {
        print "<script> alert('【!】指定されたアイコン識別名は存在しません'); </script>";
        goto not_processed;
    }
    
    unlink("../data/".$railroad_id."/icons/".$icon_list[$_POST["remove_icon_id"]]["file_name"]);
    
    $result = exec_python_command("embed-icons", $railroad_id);
    
    print "<script> alert('アイコン画像を削除しました'); </script>";
} else {
    goto not_processed;
}

$icon_list = json_decode(file_get_contents($icon_list_path), TRUE);

print "<input type='checkbox' id='result_drop_down'><label for='result_drop_down' class='drop_down'>実行ログ</label>";
print "<div><div class='announcement'>".$result."</div></div>";

not_processed:


$token_html = "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";

print "<form action='manage_train_icons.php?railroad_id=".$railroad_id."' method='post' enctype='multipart/form-data' id='upload_form' style='display: none;'>";
print $token_html;
print "<input type='file' accept='image/*' name='new_icon_file[]' id='new_icon_file' multiple='multiple' onchange='upload_icon_file();'>";
print "</form>";

print "<form action='manage_train_icons.php?railroad_id=".$railroad_id."' method='post' id='remove_form' style='display: none;'>";
print $token_html;
print "<input type='hidden' name='remove_icon_id' id='remove_icon_id'>";
print "</form>";

print <<< EOM
<script>
function upload_icon_file () {
    if (confirm("選択したファイルを車両アイコンとしてアップロードしますか？")) {
        document.getElementById("upload_form").submit();
    } else {
        document.getElementById("new_icon_file").value = "";
    }
}

function remove_icon (icon_id) {
    if (confirm("登録済みのアイコン " + icon_id + " を削除しますか？")) {
        document.getElementById("remove_icon_id").value = icon_id;
        document.getElementById("remove_form").submit();
    }
}
</script>
EOM;

print "<h3>登録済みのアイコン</h3>";
if (!empty($icon_list)) {
    print "<table>";
    
    foreach (array_keys($icon_list) as $icon_id) {
        print "<tr><td><b><img src='train_icons.php/".$railroad_id."/".addslashes($icon_id)."' alt='' class='train_icon'>".htmlspecialchars($icon_id)."</b><button type='button' onclick='remove_icon(\"".addslashes($icon_id)."\");'>削除</button></td></tr>";
    }
    
    print "</table>";
} else {
    print "<div class='informational_text'>登録済みのアイコンはありません</div>";
}

print "<br><button type='button' class='wide_button' onclick='document.getElementById(\"new_icon_file\").click();'>新しいアイコンのアップロード</button>";

print "<div class='informational_text'>複数のファイルを同時にアップロードすることができ、アップロードされた画像のファイル名はそのままアイコン識別名として使用されます。<br><br>既に登録されているアイコンの識別名と同じ名前のファイルをアップロードすると既存のアイコンが上書きされます。</div>";

print "</article>";


print_footer();
