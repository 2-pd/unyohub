<?php
include "admin_common.php";

if (!$user->check_permission("admin")) {
    print "【!】アクセス中のユーザーアカウントにはこのページにアクセスする権限がありません";
    exit;
}


function save_announcements ($json_path, $announcements) {
    $json_timestamp = 0;
    
    for ($cnt = 0; isset($announcements[$cnt]); $cnt++) {
        if ($announcements[$cnt]["last_modified_timestamp"] > $json_timestamp) {
            $json_timestamp = $announcements[$cnt]["last_modified_timestamp"];
        }
    }
    
    if ($json_timestamp === 0) {
        $json_timestamp = time();
    }
    
    if (fileowner($json_path) !== posix_geteuid()) {
        unlink($json_path);
    }
    
    file_put_contents($json_path, json_encode($announcements, JSON_UNESCAPED_UNICODE));
    touch($json_path, $json_timestamp);
}


print_header();

$json_path = "../config/announcements.json";
$announcements = json_decode(file_get_contents($json_path), TRUE);

$title_escaped = "";
$content_html = "";

if (isset($_POST["title"], $_POST["content"])) {
    if (empty($_POST["title"]) || empty($_POST["content"])) {
        print "<script> alert('【!】入力内容に空欄があります'); </script>";
        
        $title_escaped = addslashes($_POST["title"]);
        $content_html = htmlspecialchars($_POST["content"]);
    } elseif (isset($_POST["one_time_token"]) && $user->check_one_time_token($_POST["one_time_token"])) {
        $last_modified_timestamp = time();
        
        array_unshift($announcements, array(
            "title" => $_POST["title"],
            "is_important" => !empty($_POST["is_important"]),
            "content" => $_POST["content"],
            "user_id" => $user->get_id(),
            "last_modified_timestamp" => $last_modified_timestamp
        ));
        
        save_announcements($json_path, $announcements);
        
        print "<script> alert('お知らせを追加しました'); </script>";
    } else {
        print "<script> alert('【!】ワンタイムトークンが無効です。再送信してください。'); </script>";
        
        $title_escaped = addslashes($_POST["title"]);
        $content_html = htmlspecialchars($_POST["content"]);
    }
} elseif (isset($_POST["delete_index"])) {
    if (isset($_POST["one_time_token"]) && $user->check_one_time_token($_POST["one_time_token"])) {
        array_splice($announcements, intval($_POST["delete_index"]), 1);
        
        save_announcements($json_path, $announcements);
        
        print "<script> alert('お知らせを削除しました'); </script>";
    } else {
        print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
    }
}

print "<article>";
print "<h2>お知らせの編集</h2>";

$token_html = "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";

print "<input type='checkbox' id='new_announcement'><label for='new_announcement' class='drop_down'>【+】新しいお知らせを追加</label>";

print "<div><form action='announcements.php' method='post'>";
print $token_html;

print "<h3>件名</h3>";
print "<input type='text' name='title' value='".$title_escaped."'>";

print "<h3>本文</h3>";
print "<textarea name='content'>".$content_html."</textarea>";

print "<input type='checkbox' name='is_important' id='is_important' value='YES'><label for='is_important'>重要なお知らせ</label>";

print "<button type='submit' class='wide_button'>追加</button>";
print "</form></div>";

print "<form action='announcements.php' method='post' id='delete_form'>";
print $token_html;
print "<input type='hidden' name='delete_index' id='delete_index'>";
print "</form>";
print <<< EOM
<script>
function delete_announcement (idx) {
    if (confirm("このお知らせを削除しますか？")) {
        document.getElementById("delete_index").value = idx;
        document.getElementById("delete_form").submit();
    }
}
</script>
EOM;

print "<div id='announcements_area'>";
for ($cnt = 0; isset($announcements[$cnt]); $cnt++) {
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
    print "<small>".htmlspecialchars($user_name)."　".date("Y/n/j G:i", $announcements[$cnt]["last_modified_timestamp"])."</small>";
    print "</div><button type='submit' class='wide_button' onclick='delete_announcement(\"".$cnt."\");'>このお知らせを削除</button>";
    print "</div>";
}
print "</div>";

print "</article>";

print_footer();
