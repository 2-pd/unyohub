<?php
include "admin_common.php";

define("JSON_PATH", "../config/railroads.json");

if (!$user->check_permission("instance_administrator")) {
    print "【!】アクセス中のユーザーアカウントにはこのページにアクセスする権限がありません";
    exit;
}

print_header();


$railroads = json_decode(file_get_contents(JSON_PATH), TRUE);

if (isset($_POST["enabling_railroad"])) {
    if (isset($_POST["one_time_token"]) && $user->check_one_time_token($_POST["one_time_token"])) {
        $railroad_info_path = "../data/".$_POST["enabling_railroad"]."/railroad_info.json";
        
        $railroad_info = @json_decode(file_get_contents($railroad_info_path), TRUE);
        if (!empty($railroad_info)) {
            $railroads["railroads"][$_POST["enabling_railroad"]] = array("railroad_name" => $railroad_info["railroad_name"], "main_color" => $railroad_info["main_color"], "railroad_icon" => $railroad_info["railroad_icon"]);
            $railroads["railroads_order"][] = $_POST["enabling_railroad"];
            
            $wakarana->add_permission("railroads/".$_POST["enabling_railroad"], $railroad_info["railroad_name"]."の編集・管理");
            $wakarana->add_permission("railroads/".$_POST["enabling_railroad"]."/formation", $railroad_info["railroad_name"]."の編成情報編集");
            
            file_put_contents(JSON_PATH, json_encode($railroads, JSON_UNESCAPED_UNICODE));
            
            print "<script> alert('路線系統を有効化しました'); </script>";
        } else {
            print "<script> alert('【!】路線系統情報ファイルが読み込めません'); </script>";
        }
    } else {
        print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
    }
} elseif (isset($_POST["disabling_railroad"])) {
    if (isset($_POST["one_time_token"]) && $user->check_one_time_token($_POST["one_time_token"])) {
        unset($railroads["railroads"][$_POST["disabling_railroad"]]);
        array_splice($railroads["railroads_order"], array_search($_POST["disabling_railroad"], $railroads["railroads_order"]), 1);
        
        $permission = $wakarana->get_permission("railroads/".$_POST["disabling_railroad"]);
        $permission->delete_permission();
        
        file_put_contents(JSON_PATH, json_encode($railroads, JSON_UNESCAPED_UNICODE));
        
        print "<script> alert('路線系統を無効化しました'); </script>";
    } else {
        print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
    }
}


print "<article>";

$token_html = "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";

print "<form action='railroads.php' method='post' id='enable_form' style='display: none;'>";
print $token_html;
print "<input type='hidden' name='enabling_railroad' id='enabling_railroad'>";
print "</form>";

print "<form action='railroads.php' method='post' id='disable_form' style='display: none;'>";
print $token_html;
print "<input type='hidden' name='disabling_railroad' id='disabling_railroad'>";
print "</form>";

print <<< EOM
<script>
function enable_railroad (railroad_id, railroad_name) {
    if (confirm(railroad_name + " を有効化しますか？")) {
        document.getElementById("enabling_railroad").value = railroad_id;
        document.getElementById("enable_form").submit();
    }
}

function disable_railroad (railroad_id, railroad_name) {
    if (confirm(railroad_name + " を無効化しますか？")) {
        document.getElementById("disabling_railroad").value = railroad_id;
        document.getElementById("disable_form").submit();
    }
}
</script>
EOM;

print "<h2>路線系統の追加・削除</h2>";

print "<h3>有効な路線系統</h3>";

print "<table>";
foreach ($railroads["railroads_order"] as $railroad_id) {
    print "<tr><td>".htmlspecialchars($railroads["railroads"][$railroad_id]["railroad_name"])." (".$railroad_id.")<button onclick='disable_railroad(\"".$railroad_id."\", \"".addslashes($railroads["railroads"][$railroad_id]["railroad_name"])."\")'>無効化</button></td></tr>";
}
print "</table>";

print "<h3>未登録の路線系統</h3>";

$dir_list = glob("../data/*", GLOB_ONLYDIR);

print "<table>";
foreach ($dir_list as $dir_path) {
    $railroad_id = basename($dir_path);
    
    if (in_array($railroad_id, $railroads["railroads_order"])) {
        continue;
    }
    
    print "<tr><td>";
    
    if (wakarana::check_id_string($railroad_id)) {
        $railroad_info_path = $dir_path."/railroad_info.json";
        if (file_exists($railroad_info_path)) {
            $railroad_info = @json_decode(file_get_contents($railroad_info_path), TRUE);
            
            if (!empty($railroad_info)) {
                print htmlspecialchars($railroad_info["railroad_name"])." (".$railroad_id.")<button onclick='enable_railroad(\"".$railroad_id."\", \"".addslashes($railroad_info["railroad_name"])."\")'>有効化</button>";
            } else {
                print $railroad_id." (路線系統情報ファイル不備)";
            }
        } else {
            print $railroad_id." (路線系統情報ファイル無し)";
        }
    } else {
        print $railroad_id." (使用できないフォルダ名)";
    }
    
    print "</tr></td>";
}
print "</table>";

print "</article>";


print_footer();
