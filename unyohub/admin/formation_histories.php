<?php
include "admin_common.php";

if (empty($_GET["railroad_id"])) {
    print "【!】URLが誤っています";
    exit;
}

$railroad_id = basename($_GET["railroad_id"]);

if (!$user->check_permission("railroads/".$railroad_id."/formation", "edit_data")) {
    print "【!】アクセス中のユーザーアカウントにはこのページにアクセスする権限がありません";
    exit;
}

$railroad_info = json_decode(file_get_contents("../data/".$railroad_id."/railroad_info.json"), TRUE);

if (empty($railroad_info)) {
    print "【!】路線系統情報を読み込めませんでした";
    exit;
}


print_header();


print "<article>";

print "<nav><a href='railroads.php?railroad_id=".$railroad_id."'>".htmlspecialchars($railroad_info["railroad_name"])."</a> &gt;";

if (empty($_GET["formation_name"])) {
    print "【!】 編成が指定されていません";
    goto article_end;
}

print " <a href='formations.php?railroad_id=".$railroad_id."'>編成情報の編集</a> &gt;</nav>";


$event_types = array("construct", "modify", "repaint", "renewal", "transfer", "rearrange", "unregister", "other");
$event_types_ja = array("construct" => "新製", "modify" => "改修", "repaint" => "塗装等変更", "renewal" => "更新", "transfer" => "転属", "rearrange" => "組換", "unregister" => "廃車", "other" => "その他");

$db_obj = new SQLite3("../data/".$railroad_id."/railroad.db");
$db_obj->busyTimeout(5000);

$formation_name = $db_obj->escapeString($_GET["formation_name"]);

$cars_r = $db_obj->query("SELECT `car_number` FROM `unyohub_cars` WHERE `formation_name` = '".$formation_name."' AND `car_order` IS NOT NULL ORDER BY `car_order` ASC");

$car_numbers = array();
while ($car_data = $cars_r->fetchArray(SQLITE3_ASSOC)) {
    $car_numbers[] = $car_data["car_number"];
}

if (empty($car_numbers)) {
    print "【!】 編成データがデータベースにありません";
    goto article_end;
}

print "<h2>".htmlspecialchars($_GET["formation_name"])."</h2>";

print "<div class='radio_area'><label onclick='if(confirm(\"車歴情報の編集を中断して編成基本情報の編集を行いますか？\\n保存していない内容があれば破棄されます。\")){ location.href = \"formations.php?railroad_id=".$railroad_id."&formation_name=".urlencode($_GET["formation_name"])."\"; }'>基本情報</label><label class='selected_label'>車歴情報</label></div>";

$histories_r = $db_obj->query("SELECT `record_number`, `event_year_month`, `event_type`, `event_content` FROM `unyohub_formation_histories` WHERE `formation_name` = '".$formation_name."' ORDER BY `event_year_month` ASC");

$histories_data = array();
while ($history_data = $histories_r->fetchArray(SQLITE3_ASSOC)) {
    $histories_data[] = $history_data;
}

$car_histories_r = $db_obj->query("SELECT `record_number`, `car_number` FROM `unyohub_car_histories` WHERE `formation_name` = '".$formation_name."'");

$related_cars = array();
while ($car_history_data = $car_histories_r->fetchArray(SQLITE3_ASSOC)) {
    if (!isset($related_cars[$car_history_data["record_number"]])) {
        $related_cars[$car_history_data["record_number"]] = array();
    }
    $related_cars[$car_history_data["record_number"]][$car_history_data["car_number"]] = TRUE;
}

$reference_books_r = $db_obj->query("SELECT * FROM `unyohub_reference_books` ORDER BY `publisher_name` ASC, `book_title` ASC");

$reference_books = array();
while ($reference_book_info = $reference_books_r->fetchArray(SQLITE3_ASSOC)) {
    $reference_books[] = $reference_book_info;
}

$formation_reference_books_r = $db_obj->query("SELECT * FROM `unyohub_formation_reference_books` WHERE `formation_name` = '".$formation_name."'");

$formation_reference_books = array();
while ($reference_book_info = $formation_reference_books_r->fetchArray(SQLITE3_ASSOC)) {
    if (!isset($formation_reference_books[$reference_book_info["publisher_name"]])) {
        $formation_reference_books[$reference_book_info["publisher_name"]] = array();
    }
    
    $formation_reference_books[$reference_book_info["publisher_name"]][] = $reference_book_info["book_title"];
}

if (isset($_POST["one_time_token"])) {
    if (!$user->check_one_time_token($_POST["one_time_token"])) {
        print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
        
        goto on_error;
    }
    
    $db_obj->querySingle("DELETE FROM `unyohub_formation_histories` WHERE `formation_name` = '".$formation_name."'");
    $db_obj->querySingle("DELETE FROM `unyohub_car_histories` WHERE `formation_name` = '".$formation_name."'");
    
    $record_numbers = array();
    
    for ($cnt = 0; isset($_POST["event_year_".$cnt], $_POST["event_type_".$cnt], $_POST["event_content_".$cnt]); $cnt++) {
        if (empty($_POST["event_content_".$cnt])) {
            continue;
        }
        
        $event_year = intval($_POST["event_year_".$cnt]);
        if (empty($_POST["event_month_".$cnt])) {
            $event_month = "00";
            $event_year_month = $event_year;
        } else {
            $event_month = str_pad(intval($_POST["event_month_".$cnt]), 2, "0", STR_PAD_LEFT);
            $event_year_month = $event_year."-".$event_month;
        }
        
        $record_number_yyyymm = $event_year.$event_month;
        $record_numbers[$record_number_yyyymm] = isset($record_numbers[$record_number_yyyymm]) ? $record_numbers[$record_number_yyyymm] + 1 : 1;
        $record_number = $record_number_yyyymm."_".$record_numbers[$record_number_yyyymm];
        
        $db_obj->querySingle("INSERT INTO `unyohub_formation_histories`(`formation_name`, `record_number`, `event_year_month`, `event_type`, `event_content`) VALUES ('".$formation_name."', '".$record_number."', '".$event_year_month."', '".$db_obj->escapeString($_POST["event_type_".$cnt])."', '".$db_obj->escapeString($_POST["event_content_".$cnt])."')");
        
        for ($cnt_2 = 0; isset($car_numbers[$cnt_2]); $cnt_2++) {
            if (!empty($_POST["related_car_".$cnt."_".$cnt_2])) {
                $db_obj->querySingle("INSERT INTO `unyohub_car_histories`(`formation_name`, `record_number`, `car_number`) VALUES ('".$formation_name."', '".$record_number."', '".$db_obj->escapeString($car_numbers[$cnt_2])."')");
            }
        }
    }
    
    $db_obj->querySingle("DELETE FROM `unyohub_formation_reference_books` WHERE `formation_name` = '".$formation_name."'");
    for ($cnt = 0; isset($_POST["publisher_name_".$cnt], $_POST["book_title_".$cnt]); $cnt++) {
        if (!empty($_POST["reference_book_".$cnt])) {
            $db_obj->querySingle("INSERT INTO `unyohub_formation_reference_books`(`formation_name`, `publisher_name`, `book_title`) VALUES ('".$formation_name."', '".$db_obj->escapeString($_POST["publisher_name_".$cnt])."', '".$db_obj->escapeString($_POST["book_title_".$cnt])."')");
            
            if (!isset($formation_reference_books[$_POST["publisher_name_".$cnt]])) {
                $formation_reference_books[$_POST["publisher_name_".$cnt]] = array();
            }
            
            $formation_reference_books[$_POST["publisher_name_".$cnt]][] = $_POST["book_title_".$cnt];
        } elseif (isset($formation_reference_books[$_POST["publisher_name_".$cnt]]) && in_array($_POST["book_title_".$cnt], $formation_reference_books[$_POST["publisher_name_".$cnt]])) {
            array_splice($formation_reference_books[$_POST["publisher_name_".$cnt]], array_search($_POST["book_title_".$cnt], $formation_reference_books[$_POST["publisher_name_".$cnt]]), 1);
        }
    }
    
    $db_obj->querySingle("UPDATE `unyohub_formations` SET `updated_datetime` = '".date("Y-m-d H:i:s")."', `edited_user_id` = '".$user->get_id()."' WHERE `formation_name` = '".$formation_name."'");
    
    print "<script> alert('車歴情報を保存しました'); </script>";
    
    on_error:
    
    $event_dict = array();
    $related_cars = array();
    $record_numbers = array();
    for ($cnt = 0; isset($_POST["event_year_".$cnt], $_POST["event_type_".$cnt], $_POST["event_content_".$cnt]); $cnt++) {
        if (empty($_POST["event_content_".$cnt])) {
            continue;
        }
        
        $event_year_month = intval($_POST["event_year_".$cnt]);
        if (empty($_POST["event_month_".$cnt])) {
            $event_key = $event_year_month."-00_".str_pad($cnt, 3, "0", STR_PAD_LEFT);
        } else {
            $event_year_month .= "-".str_pad(intval($_POST["event_month_".$cnt]), 2, "0", STR_PAD_LEFT);
            $event_key = $event_year_month."_".str_pad($cnt, 3, "0", STR_PAD_LEFT);
        }
        
        $record_number_yyyymm = substr($event_year_month, 0, 4).substr($event_year_month, 5, 2);
        $record_numbers[$record_number_yyyymm] = isset($record_numbers[$record_number_yyyymm]) ? $record_numbers[$record_number_yyyymm] + 1 : 1;
        $record_number = $record_number_yyyymm."_".$record_numbers[$record_number_yyyymm];
        
        $event_dict[$event_key] = array("record_number" => $record_number, "event_year_month" => $event_year_month, "event_type" => $_POST["event_type_".$cnt], "event_content" => $_POST["event_content_".$cnt]);
        
        $related_cars[$record_number] = array();
        for ($cnt_2 = 0; isset($car_numbers[$cnt_2]); $cnt_2++) {
            if (!empty($_POST["related_car_".$cnt."_".$cnt_2])) {
                $related_cars[$record_number][$car_numbers[$cnt_2]] = TRUE;
            }
        }
    }
    
    $event_keys = array_keys($event_dict);
    sort($event_keys);
    
    $histories_data = array();
    foreach ($event_keys as $event_key) {
        $histories_data[] = $event_dict[$event_key];
    }
}

$buf = "";
foreach ($event_types as $event_type) {
    $buf .= "<option value='".$event_type."'>".$event_types_ja[$event_type]."</option>";
}

$buf_2 = "";
for ($cnt_2 = 0; isset($car_numbers[$cnt_2]); $cnt_2++) {
    $buf_2 .= "<input type='checkbox' name='related_car_\" + cnt + \"_".$cnt_2."' id='related_car_\" + cnt + \"_".$cnt_2."' class='chip' value='YES'><label for='related_car_\" + cnt + \"_".$cnt_2."'>".addslashes(htmlspecialchars($car_numbers[$cnt_2]))."</label>";
}

print <<< EOM
<script>
function add_history () {
    var cnt = document.getElementsByClassName("history_item").length;
    var dt = new Date();
    
    var history_item_elm = document.createElement("div");
    history_item_elm.id = "related_cars_" + cnt;
    history_item_elm.className = "history_item";
    history_item_elm.innerHTML = "<h5>変更年月 / 変更の種類</h5><div class='half_input_wrapper'><input type='number' name='event_year_" + cnt + "' value='" + dt.getFullYear() + "' max='2100' min='1901'>年<input type='number' name='event_month_" + cnt + "' max='12' min='0'>月 / <select name='event_type_" + cnt + "'>{$buf}</select></div><h5>該当車両</h5><div class='chip_wrapper'>{$buf_2}<button type='button' onclick='select_all_cars(" + cnt + ");'>全選択</button></div><h5>変更内容</h5><textarea name='event_content_" + cnt + "'></textarea>";
    
    document.getElementById("histories_area").appendChild(history_item_elm);
}

function select_all_cars (cnt) {
    for (var input_elm of document.getElementById("related_cars_" + cnt).getElementsByTagName("input")) {
        input_elm.checked = true;
    }
}
</script>
EOM;

print "<form action='formation_histories.php?railroad_id=".$railroad_id."&formation_name=".urlencode($_GET["formation_name"])."' method='post'>";
print "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";

print "<h3>車歴</h3>";
print "<div class='informational_text'>データは年月の順に並び替えられ、内容が空欄の項目は除去されて保存されます。</div>";
print "<div id='histories_area'>";
for ($cnt = 0; isset($histories_data[$cnt]); $cnt++) {
    print "<div class='history_item'>";
    print "<h5>変更年月 / 変更の種類</h5>";
    $event_month = intval(substr($histories_data[$cnt]["event_year_month"], 5));
    print "<div class='half_input_wrapper'><input type='number' name='event_year_".$cnt."' value='".intval(substr($histories_data[$cnt]["event_year_month"], 0, 4))."' max='2100' min='1901'>年<input type='number' name='event_month_".$cnt."' value='".($event_month >= 1 ? $event_month : "")."' max='12' min='0'>月 / <select name='event_type_".$cnt."'>";
    foreach ($event_types as $event_type) {
        print "<option value='".$event_type."'".($histories_data[$cnt]["event_type"] === $event_type ? " selected='selected'" : "").">".$event_types_ja[$event_type]."</option>";
    }
    print "</select></div>";
    print "<h5>該当車両</h5>";
    print "<div id='related_cars_".$cnt."' class='chip_wrapper'>";
    for ($cnt_2 = 0; isset($car_numbers[$cnt_2]); $cnt_2++) {
        print "<input type='checkbox' name='related_car_".$cnt."_".$cnt_2."' id='related_car_".$cnt."_".$cnt_2."' class='chip' value='YES'".(isset($related_cars[$histories_data[$cnt]["record_number"]][$car_numbers[$cnt_2]]) ? " checked='checked'" : "")."><label for='related_car_".$cnt."_".$cnt_2."'>".htmlspecialchars($car_numbers[$cnt_2])."</label>";
    }
    print "<button type='button' onclick='select_all_cars(".$cnt.");'>全選択</button>";
    print "</div>";
    print "<h5>変更内容</h5>";
    print "<textarea name='event_content_".$cnt."'>".htmlspecialchars($histories_data[$cnt]["event_content"])."</textarea>";
    print "</div>";
}
print "</div>";
print "<br><div class='informational_text'><a href='javascript:void(0);' onclick='add_history();'>+ 車歴の追加</a></div>";

print "<h3>参考書籍</h3>";
for ($cnt = 0; isset($reference_books[$cnt]); $cnt++) {
    print "<input type='hidden' name='publisher_name_".$cnt."' value='".addslashes($reference_books[$cnt]["publisher_name"])."'>";
    print "<input type='hidden' name='book_title_".$cnt."' value='".addslashes($reference_books[$cnt]["book_title"])."'>";
    print "<input type='checkbox' name='reference_book_".$cnt."' id='reference_book_".$cnt."' class='toggle' value='YES'";
    if (isset($formation_reference_books[$reference_books[$cnt]["publisher_name"]]) && in_array($reference_books[$cnt]["book_title"], $formation_reference_books[$reference_books[$cnt]["publisher_name"]])) {
        print " checked='checked'";
    }
    print "><label for='reference_book_".$cnt."'>".htmlspecialchars($reference_books[$cnt]["publisher_name"])."『".htmlspecialchars($reference_books[$cnt]["book_title"])."』</label>";
}

print "<br><a class='execute_button' href='reference_books.php?railroad_id=".$railroad_id."' onclick='if(!confirm(\"車歴情報の編集を中断して参考書籍の追加・削除を行いますか？\\n保存していない内容があれば破棄されます。\")){ event.preventDefault(); }'>参考書籍の追加・削除</a>";

print "<button type='submit' class='save_button'>上書き保存</button>";

print "</form>";

article_end:

print "</article>";


print_footer();
