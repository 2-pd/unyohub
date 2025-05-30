<?php
include "admin_common.php";

if (empty($_GET["railroad_id"])) {
    $railroad_id = "";
    $json_path = "../config/announcements.json";
    
    if (!$user->check_permission("railroads", "edit_announcement")) {
        print "【!】アクセス中のユーザーアカウントにはこのページにアクセスする権限がありません";
        exit;
    }
} else {
    $railroad_id = basename($_GET["railroad_id"]);
    $json_path = "../data/".$railroad_id."/announcements.json";
    
    if (!$user->check_permission("railroads/".$railroad_id, "edit_announcement")) {
        print "【!】アクセス中のユーザーアカウントにはこのページにアクセスする権限がありません";
        exit;
    }
}

print_header();

if (file_exists($json_path)) {
    $announcements = json_decode(file_get_contents($json_path), TRUE);
} else {
    $announcements = array();
}


$title_escaped = "";
$content_html = "";

$ts = time();
$expiration_datetime = date("Y-m-d", $ts + 86400)."T03:00";

$important_checked = "";

$drop_down_checked = "";

if (isset($_POST["title"], $_POST["content"], $_POST["expiration_datetime"])) {
    $error_mes = "";
    
    if (empty($_POST["title"]) || empty($_POST["content"]) || empty($_POST["expiration_datetime"])) {
        $error_mes = "入力内容に空欄があります";
    } elseif (isset($_POST["one_time_token"]) && $user->check_one_time_token($_POST["one_time_token"])) {
        $expiration_timestamp = strtotime($_POST["expiration_datetime"]);
        
        if ($expiration_timestamp > $ts + 600) {
            $last_modified_timestamp = time();
            
            for ($cnt = 0; isset($announcements[$cnt]); $cnt++) {
                if ($announcements[$cnt]["expiration_timestamp"] < $ts) {
                    array_splice($announcements, $cnt, 1);
                }
            }
            
            array_unshift($announcements, array(
                "title" => $_POST["title"],
                "is_important" => !empty($_POST["is_important"]),
                "content" => $_POST["content"],
                "user_id" => $user->get_id(),
                "expiration_timestamp" => $expiration_timestamp,
                "last_modified_timestamp" => $last_modified_timestamp
            ));
            
            file_put_contents($json_path, json_encode($announcements, JSON_UNESCAPED_UNICODE));
            
            chmod($json_path, 0o766);
            
            print "<script> alert('お知らせを追加しました'); </script>";
        } else {
            $error_mes = "有効期限が不十分です";
        }
    } else {
        $error_mes = "ワンタイムトークンが無効です。再送信してください。";
    }
    
    if (!empty($error_mes)) {
        print "<script> alert('【!】".$error_mes."'); </script>";
        
        $title_escaped = addslashes($_POST["title"]);
        $content_html = htmlspecialchars($_POST["content"]);
        $expiration_datetime = addslashes($_POST["expiration_datetime"]);
    }
} elseif (isset($_POST["delete_index"]) || isset($_POST["edit_index"])) {
    if (isset($_POST["one_time_token"]) && $user->check_one_time_token($_POST["one_time_token"])) {
        if (isset($_POST["delete_index"])) {
            $delete_index = intval($_POST["delete_index"]);
        } else {
            $delete_index = intval($_POST["edit_index"]);
            
            $title_escaped = addslashes($announcements[$delete_index]["title"]);
            $content_html = htmlspecialchars($announcements[$delete_index]["content"]);
            
            $expiration_ts = intval($announcements[$delete_index]["expiration_timestamp"]);
            $expiration_datetime = date("Y-m-d", $expiration_ts)."T".date("H:i", $expiration_ts + 86400);
            
            if ($announcements[$delete_index]["is_important"]) {
                $important_checked = " checked='checked'";
            }
            
            $drop_down_checked = " checked='checked'";
        }
        
        array_splice($announcements, $delete_index, 1);
        
        file_put_contents($json_path, json_encode($announcements, JSON_UNESCAPED_UNICODE));
        
        print "<script> alert('お知らせを削除しました'); </script>";
    } else {
        print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
    }
}

print "<article>";

$railroads = json_decode(file_get_contents(RAILROADS_JSON_PATH), TRUE);

if (!empty($railroad_id)) {
    print "<nav><a href='railroads.php?railroad_id=".addslashes($railroad_id)."'>".htmlspecialchars($railroads["railroads"][$railroad_id]["railroad_name"])."</a> &gt;</nav>";
}

print "<h2>お知らせの編集</h2>";

print "<h3>対象の路線系統</h3>";
print "<select class='wide_select' onchange='location.href = location.origin + location.pathname + \"?railroad_id=\" + this.value;'>";

if ($user->check_permission("railroads", "edit_announcement")) {
    print "<option value=''>全体のお知らせ</option>";
}

foreach (array_keys($railroads["railroads"]) as $railroad) {
    if (!$user->check_permission("railroads/".$railroad, "edit_announcement")) {
        continue;
    }
    
    print "<option value='".addslashes($railroad)."'";
    if ($railroad === $railroad_id) {
        print " selected='selected'";
    }
    print ">".htmlspecialchars($railroads["railroads"][$railroad]["railroad_name"])."</option>";
}

print "</select><br>";

$token_html = "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";

print "<input type='checkbox' id='new_announcement'".$drop_down_checked."><label for='new_announcement' class='drop_down'>【+】お知らせを追加</label>";

print "<div><form action='announcements.php?railroad_id=".$railroad_id."' method='post'>";
print $token_html;

print "<h3>件名</h3>";
print "<input type='text' name='title' value='".$title_escaped."'>";

print "<div class='chip_wrapper'><input type='checkbox' name='is_important' id='is_important' class='chip' value='YES'".$important_checked."><label for='is_important'>重要なお知らせ</label></div>";

print "<h3>本文</h3>";
print "<textarea name='content' class='announcement_content'>".$content_html."</textarea>";

print "<h3>有効期限</h3>";
print "<input type='datetime-local' name='expiration_datetime' value='".$expiration_datetime."'><br>";

print "<button type='submit' class='wide_button'>追加</button>";
print "</form></div>";

print "<form action='announcements.php?railroad_id=".$railroad_id."' method='post' id='delete_form' style='display: none;'>";
print $token_html;
print "<input type='hidden' id='delete_index'>";
print "</form>";
print <<< EOM
<script>
function delete_announcement (idx) {
    if (confirm("このお知らせを削除しますか？")) {
        document.getElementById("delete_index").setAttribute("name" ,"delete_index");
        document.getElementById("delete_index").value = idx;
        document.getElementById("delete_form").submit();
    }
}
    
function edit_announcement (idx) {
    if (confirm("このお知らせを削除して編集しますか？")) {
        document.getElementById("delete_index").setAttribute("name" ,"edit_index");
        document.getElementById("delete_index").value = idx;
        document.getElementById("delete_form").submit();
    }
}
</script>
EOM;

print "<div id='announcements_area'>";
for ($cnt = 0; isset($announcements[$cnt]); $cnt++) {
    if ($announcements[$cnt]["expiration_timestamp"] < $ts) {
        continue;
    }
    
    $user = $wakarana->get_user($announcements[$cnt]["user_id"]);
    if (is_object($user)) {
        $user_name = $user->get_name();
    } else {
        $user_name = "不明な管理者";
    }
    
    print "<input type='checkbox' id='announcement_".$cnt."'><label for='announcement_".$cnt."' class='drop_down";
    if ($announcements[$cnt]["is_important"]) {
        print " important_announcement";
    }
    print "'>".htmlspecialchars($announcements[$cnt]["title"])."</label>";
    print "<div><div class='announcement'>";
    print nl2br(htmlspecialchars($announcements[$cnt]["content"]));
    print "<small>".htmlspecialchars($user_name)."　".date("Y/n/j G:i", $announcements[$cnt]["last_modified_timestamp"])." (残り";
    if ($announcements[$cnt]["expiration_timestamp"] >= $ts + 86400) {
        print " ".floor(($announcements[$cnt]["expiration_timestamp"] - $ts) / 86400)."日";
    }
    print " ".(floor(($announcements[$cnt]["expiration_timestamp"] - $ts) / 3600) % 24)."時間 有効)</small>";
    print "</div><button type='submit' class='half_button' onclick='delete_announcement(".$cnt.");'>削除</button><button type='submit' class='half_button' onclick='edit_announcement(".$cnt.");'>削除して編集</button>";
    print "</div>";
}
print "</div>";

print "</article>";

print_footer();
