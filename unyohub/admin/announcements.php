<?php
include "admin_common.php";

if (empty($_GET["railroad_id"])) {
    $railroad_id = "";
    $railroad_ids = array();
} elseif ($_GET["railroad_id"] === "/") {
    $railroad_id = "/";
    
    if (!$user->check_permission("railroads", "edit_announcement")) {
        print "【!】アクセス中のユーザーアカウントにはこのページにアクセスする権限がありません";
        exit;
    }
    
    $railroad_ids = array("/");
} else {
    $railroad_id = basename($_GET["railroad_id"]);
    
    if (!$user->check_permission("railroads/".$railroad_id, "edit_announcement")) {
        print "【!】アクセス中のユーザーアカウントにはこのページにアクセスする権限がありません";
        exit;
    }
    
    $railroad_ids = array($railroad_id);
}

print_header();

$db_obj = new SQLite3("../common_dbs/announcements.db");
$db_obj->busyTimeout(5000);

$title_escaped = "";
$content_html = "";

$ts = time();
$datetime_now = date("Y-m-d H:i:s", $ts);
$datetime_local_now = substr($datetime_now, 0, 10)."T".substr($datetime_now, 11, 5);
$publication_datetime = "";
$expiration_datetime = date("Y-m-d", $ts + 86400)."T04:00";

$important_checked = "";

$drop_down_checked = "";

if (isset($_POST["title"], $_POST["content"])) {
    $error_mes = "";
    
    if ($railroad_id !== "/") {
        $railroad_ids = empty($_POST["railroad_ids"]) || !is_array($_POST["railroad_ids"]) ? array() : $_POST["railroad_ids"];
        
        if (!empty($railroad_id) && !in_array($railroad_id, $railroad_ids)) {
            $railroad_ids[] = $railroad_id;
        }
    }
    
    if (empty($railroad_ids) || empty($_POST["title"]) || empty($_POST["content"] || empty($_POST["expiration_datetime"]))) {
        $error_mes = "入力内容に空欄があります";
    } elseif (isset($_POST["one_time_token"]) && $user->check_one_time_token($_POST["one_time_token"])) {
        if (empty($_POST["publication_datetime"])) {
            $publication_timestamp = $ts;
            $publication_datetime_str = $datetime_now;
        } else {
            $publication_timestamp = strtotime($_POST["publication_datetime"]);
            
            if ($publication_timestamp < $ts) {
                $publication_timestamp = $ts;
            }
            
            $publication_datetime_str = date("Y-m-d H:i:s", $publication_timestamp);
        }
        
        $expiration_timestamp = strtotime($_POST["expiration_datetime"]);
        
        if ($expiration_timestamp > $publication_timestamp + 600) {
            $db_obj->exec("DELETE FROM `unyohub_announcements` WHERE `expiration_datetime` < '".$datetime_now."'");
            $db_obj->exec("DELETE FROM `unyohub_railroad_announcements` WHERE `announcement_id` NOT IN (SELECT `announcement_id` FROM `unyohub_announcements`)");
            
            $announcement_id = date("Ymd", $ts)."_".mt_rand();
            
            $db_obj->exec("INSERT INTO `unyohub_announcements`(`announcement_id`, `title`, `is_important`, `content`, `user_id`, `publication_datetime`, `expiration_datetime`) VALUES ('".$announcement_id."', '".$db_obj->escapeString($_POST["title"])."', ".(empty($_POST["is_important"]) ? "0" : "1").", '".$db_obj->escapeString($_POST["content"])."', '".$user->get_id()."', '".$publication_datetime_str."', '".date("Y-m-d H:i:s", $expiration_timestamp)."')");
            
            foreach ($railroad_ids as $railroad) {
                $resource_id = $railroad === "/" ? "railroads" : "railroads/".$railroad;
                if (!$user->check_permission($resource_id, "edit_announcement")) {
                    continue;
                }
                
                $railroad = $db_obj->escapeString($railroad);
                
                $db_obj->exec("INSERT INTO `unyohub_railroad_announcements`(`announcement_id`, `railroad_id`) VALUES ('".$announcement_id."', '".$railroad."')");
                
                if ($publication_datetime_str === $datetime_now) {
                    $db_obj->exec("DELETE FROM `unyohub_announcement_datetimes` WHERE `railroad_id` = '".$railroad."' AND `publication_or_deletion_datetime` < '".$datetime_now."'");
                }
                
                $db_obj->exec("INSERT INTO `unyohub_announcement_datetimes`(`railroad_id`, `publication_or_deletion_datetime`, `is_publication_datetime`) VALUES ('".$railroad."', '".$publication_datetime_str."', 1)");
            }
            
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
        $important_checked = empty($_POST["is_important"]) ? "" : " checked='checked'";
        $content_html = htmlspecialchars($_POST["content"]);
        $publication_datetime = empty($_POST["publication_datetime"]) ? "" : addslashes($_POST["publication_datetime"]);
        $expiration_datetime = empty($_POST["expiration_datetime"]) ? "" : addslashes($_POST["expiration_datetime"]);
    }
} elseif (isset($_POST["delete_id"]) || isset($_POST["edit_id"])) {
    if (isset($_POST["one_time_token"]) && $user->check_one_time_token($_POST["one_time_token"])) {
        if (isset($_POST["edit_id"])) {
            $delete_id = $db_obj->escapeString($_POST["edit_id"]);
        } else {
            $delete_id = $db_obj->escapeString($_POST["delete_id"]);
        }
        
        $announcement_data = $db_obj->querySingle("SELECT * FROM `unyohub_announcements` WHERE `announcement_id` = '".$delete_id."'", TRUE);
        
        if (!empty($announcement_data)) {
            if (isset($_POST["edit_id"])) {
                $title_escaped = addslashes($announcement_data["title"]);
                if ($announcement_data["is_important"]) {
                    $important_checked = " checked='checked'";
                }
                $content_html = htmlspecialchars($announcement_data["content"]);
                $publication_datetime = $announcement_data["publication_datetime"] >= $datetime_now ? substr($announcement_data["publication_datetime"], 0, 10)."T".substr($announcement_data["publication_datetime"], 11, 5) : "";
                $expiration_datetime = substr($announcement_data["expiration_datetime"], 0, 10)."T".substr($announcement_data["expiration_datetime"], 11, 5);
                
                $drop_down_checked = " checked='checked'";
            }
            
            $railroad_announcement_r = $db_obj->query("SELECT `railroad_id` FROM `unyohub_railroad_announcements` WHERE `announcement_id` = '".$delete_id."'");
            
            $railroad_ids = array();
            while ($railroad_row = $railroad_announcement_r->fetchArray(SQLITE3_NUM)) {
                $railroad_ids[] = $railroad_row[0];
            }
            
            $db_obj->exec("DELETE FROM `unyohub_announcements` WHERE `announcement_id` = '".$delete_id."'");
            $db_obj->exec("DELETE FROM `unyohub_railroad_announcements` WHERE `announcement_id` = '".$delete_id."'");
            
            if ($announcement_data["publication_datetime"] < $datetime_now) {
                foreach ($railroad_ids as $railroad) {
                    $db_obj->exec("DELETE FROM `unyohub_announcement_datetimes` WHERE `railroad_id` = '".$railroad."' AND `publication_or_deletion_datetime` < '".$datetime_now."'");
                    $db_obj->exec("INSERT INTO `unyohub_announcement_datetimes`(`railroad_id`, `publication_or_deletion_datetime`, `is_publication_datetime`) VALUES ('".$railroad."', '".$datetime_now."', 0)");
                }
            }
            
            print "<script> alert('お知らせを削除しました'); </script>";
        } else {
            print "<script> alert('【!】削除しようとしたお知らせは存在していません'); </script>";
        }
    } else {
        print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
    }
}

print "<article>";

$railroads = json_decode(file_get_contents(RAILROADS_JSON_PATH), TRUE);

if (!empty($railroad_id) && $railroad_id !== "/") {
    $railroad_info = json_decode(file_get_contents("../data/".$railroad_id."/railroad_info.json"), TRUE);
    
    print "<nav><a href='railroads.php?railroad_id=".addslashes($railroad_id)."'>".htmlspecialchars($railroads["railroads"][$railroad_id]["railroad_name"])."</a> &gt;</nav>";
    print "<h2 style='border-color: ".addslashes($railroad_info["main_color"])."'>";
} else {
    print "<h2>";
}

print "お知らせの編集</h2>";

if ($railroad_id === "/") {
    print "<div class='radio_area'><label class='selected_label'>全体のお知らせ</label><label onclick='location.href = \"announcements.php\";'>路線系統のお知らせ</label></div>";
} elseif ($user->check_permission("railroads", "edit_announcement")) {
    print "<div class='radio_area'><label onclick='location.href = \"announcements.php?railroad_id=/\";'>全体のお知らせ</label><label class='selected_label'>路線系統のお知らせ</label></div>";
}

$token_html = "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";

print "<input type='checkbox' id='new_announcement'".$drop_down_checked."><label for='new_announcement' class='drop_down'>【+】お知らせを追加</label>";

print "<div><form action='announcements.php?railroad_id=".$railroad_id."' method='post'>";
print $token_html;

if ($railroad_id !== "/") {
    print "<h3>対象の路線系統</h3>";
    print "<select name='railroad_ids[]' multiple='multiple' size='6'>";

    $railroad_list = array();
    foreach ($railroads["categories"] as $category) {
        print "<optgroup label='".addslashes($category["category_name"])."'>";
        
        if (array_key_exists("subcategories", $category)) {
            foreach ($category["subcategories"] as $subcategory) {
                foreach ($subcategory["railroads"] as $railroad) {
                    if (!in_array($railroad, $railroad_list) && $user->check_permission("railroads/".$railroad, "edit_announcement")) {
                        print "<option value='".addslashes($railroad)."'".(in_array($railroad, $railroad_ids) ? " selected='selected'" : "").">".htmlspecialchars($railroads["railroads"][$railroad]["railroad_name"])."</option>";
                    }
                }
            }
        } elseif (array_key_exists("railroads", $category)) {
            foreach ($category["railroads"] as $railroad) {
                if (!in_array($railroad, $railroad_list) && $user->check_permission("railroads/".$railroad, "edit_announcement")) {
                    print "<option value='".addslashes($railroad)."'".(in_array($railroad, $railroad_ids) ? " selected='selected'" : "").">".htmlspecialchars($railroads["railroads"][$railroad]["railroad_name"])."</option>";
                }
            }
        }
        
        print "</optgroup>";
    }
    
    print "</select>";
}

print "<h3>件名</h3>";
print "<input type='text' name='title' value='".$title_escaped."'>";

print "<div class='chip_wrapper'><input type='checkbox' name='is_important' id='is_important' class='chip' value='YES'".$important_checked."><label for='is_important'>重要なお知らせ</label></div>";

print "<h3>本文</h3>";
print "<textarea name='content' class='announcement_content'>".$content_html."</textarea>";

print "<h3>公開日時</h3>";
print "<div class='informational_text'>未来の日時を設定すると予約投稿となります。</div>";
print "<input type='datetime-local' name='publication_datetime' value='".$publication_datetime."' min='".$datetime_local_now."'>";

print "<h3>有効期限</h3>";
print "<input type='datetime-local' name='expiration_datetime' value='".$expiration_datetime."' min='".$datetime_local_now."'><br>";

print "<button type='submit' class='wide_button'>追加</button>";
print "</form></div>";

print "<form action='announcements.php?railroad_id=".$railroad_id."' method='post' id='delete_form' style='display: none;'>";
print $token_html;
print "<input type='hidden' id='delete_id'>";
print "</form>";
print <<< EOM
<script>
function delete_announcement (announcement_id) {
    if (confirm("このお知らせを削除しますか？")) {
        document.getElementById("delete_id").setAttribute("name" ,"delete_id");
        document.getElementById("delete_id").value = announcement_id;
        document.getElementById("delete_form").submit();
    }
}
    
function edit_announcement (announcement_id) {
    if (confirm("このお知らせを削除して編集しますか？")) {
        document.getElementById("delete_id").setAttribute("name" ,"edit_id");
        document.getElementById("delete_id").value = announcement_id;
        document.getElementById("delete_form").submit();
    }
}
</script>
EOM;

if (!empty($railroad_id)) {
    $announcements_r = $db_obj->query("SELECT `unyohub_announcements`.* FROM `unyohub_railroad_announcements`, `unyohub_announcements` WHERE `unyohub_railroad_announcements`.`railroad_id` = '".$railroad_id."' AND `unyohub_announcements`.`announcement_id` = `unyohub_railroad_announcements`.`announcement_id` AND `unyohub_announcements`.`expiration_datetime` >= '".$datetime_now."' ORDER BY `unyohub_announcements`.`publication_datetime` DESC");
} else {
    $announcements_r = $db_obj->query("SELECT * FROM `unyohub_announcements` WHERE `announcement_id` IN (SELECT DISTINCT `announcement_id` FROM `unyohub_railroad_announcements` WHERE `railroad_id` != '/') AND `expiration_datetime` >= '".$datetime_now."' ORDER BY `publication_datetime` DESC");
}

print "<div id='announcements_area'>";
while ($announcement_data = $announcements_r->fetchArray(SQLITE3_ASSOC)) {
    $user_obj = $wakarana->get_user($announcement_data["user_id"]);
    if (is_object($user_obj)) {
        $user_name = $user_obj->get_name();
    } else {
        $user_name = "不明な管理者";
    }
    
    $expiration_timestamp = strtotime($announcement_data["expiration_datetime"]);
    
    print "<input type='checkbox' id='announcement_".$announcement_data["announcement_id"]."'><label for='announcement_".$announcement_data["announcement_id"]."' class='drop_down".($announcement_data["is_important"] ? " important_announcement" : "")."'>";
    if ($announcement_data["publication_datetime"] > $datetime_now) {
        print "<small>(予)</small>";
    }
    print htmlspecialchars($announcement_data["title"]);
    print "</label>";
    print "<div><div class='announcement'>";
    print nl2br(htmlspecialchars($announcement_data["content"]));
    print "<small>";
    if ($railroad_id !== "/") {
        print "対象: ";
        $railroad_announcement_r = $db_obj->query("SELECT `railroad_id` FROM `unyohub_railroad_announcements` WHERE `announcement_id` = '".$announcement_data["announcement_id"]."' ORDER BY `railroad_id` ASC");
        
        for ($cnt = 0; $railroad_row = $railroad_announcement_r->fetchArray(SQLITE3_NUM); $cnt++) {
            if ($cnt >= 1) {
                print "、";
                
                if ($cnt >= 3) {
                    print "他";
                    break;
                }
            }
            
            print htmlspecialchars($railroads["railroads"][$railroad_row[0]]["railroad_name"]);
        }
        print "<br>";
    }
    print htmlspecialchars($user_name)."　".substr($announcement_data["publication_datetime"], 0, 16)." (残り";
    if ($expiration_timestamp >= $ts + 86400) {
        print " ".floor(($expiration_timestamp - $ts) / 86400)."日";
    }
    print " ".(floor(($expiration_timestamp - $ts) / 3600) % 24)."時間 有効)</small>";
    print "</div><button type='button' class='half_button' onclick='delete_announcement(\"".$announcement_data["announcement_id"]."\");'>削除</button><button type='button' class='half_button' onclick='edit_announcement(\"".$announcement_data["announcement_id"]."\");'>削除して編集</button>";
    print "</div>";
}
print "</div>";

print "</article>";

print_footer();
