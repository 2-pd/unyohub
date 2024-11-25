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

$formations = json_decode(file_get_contents("../data/".$railroad_id."/formations.json"), TRUE);

if (empty($formations)) {
    print "【!】編成データを読み込めませんでした";
    exit;
}

print "<nav><a href='railroads.php?railroad_id=".$railroad_id."'>".htmlspecialchars($railroad_info["railroad_name"])."</a> &gt;";

if (empty($_GET["formation_name"])) {
    print "</nav>";
    
    print "<h2>編成情報の編集</h2>";
    
    for ($cnt = 0; isset($formations["series_names"][$cnt]); $cnt++) {
        $checkbox_id = "series_".$cnt;
        
        print "<input type='checkbox' id='".$checkbox_id."'><label for='".$checkbox_id."' class='drop_down'>".htmlspecialchars($formations["series_names"][$cnt])."</label><div><table>";
        
        foreach ($formations["series"][$formations["series_names"][$cnt]]["formation_names"] as $formation_name) {
            print "<tr><td><a href='formations.php?railroad_id=".$railroad_id."&formation_name=".urlencode($formation_name)."'><img src='train_icons.php/".$railroad_id."/".addslashes($formations["formations"][$formation_name]["icon_id"])."' alt='' class='train_icon'>".htmlspecialchars($formation_name)."</a></td></tr>";
        }
        
        print "</table></div>";
    }
} else {
    print " <a href='formations.php?railroad_id=".$railroad_id."'>編成情報の編集</a> &gt;</nav>";
    
    print "<h2>".htmlspecialchars($_GET["formation_name"])."</h2>";
    
    $event_types = array("新製", "改修", "更新", "転属", "組換");
    
    $db_obj = new SQLite3("../data/".$railroad_id."/railroad.db");
    $db_obj->busyTimeout(5000);
    
    $formation_name = $db_obj->escapeString($_GET["formation_name"]);
    
    $formation_data = $db_obj->querySingle("SELECT `description`, `inspection_information` FROM `unyohub_formations` WHERE `formation_name` = '".$formation_name."'", TRUE);
    
    if (!empty($formation_data)) {
        $cars_r = $db_obj->query("SELECT `car_number`, `manufacturer`, `constructed`, `description` FROM `unyohub_cars` WHERE `formation_name` = '".$formation_name."' ORDER BY `car_order` ASC");
        
        $cars_data = array();
        while ($car_data = $cars_r->fetchArray(SQLITE3_ASSOC)) {
            $cars_data[] = $car_data;
        }
        
        $histories_r = $db_obj->query("SELECT `event_year_month`, `event_type`, `event_content` FROM `unyohub_formation_histories` WHERE `formation_name` = '".$formation_name."' ORDER BY `event_year_month` ASC");
        
        $histories_data = array();
        while ($history_data = $histories_r->fetchArray(SQLITE3_ASSOC)) {
            $histories_data[] = $history_data;
        }
        
        if (isset($_POST["description"], $_POST["inspection_information"])) {
            if (isset($_POST["one_time_token"]) && $user->check_one_time_token($_POST["one_time_token"])) {
                $db_obj->querySingle("UPDATE `unyohub_formations` SET `description` = '".$db_obj->escapeString($_POST["description"])."', `inspection_information` = '".$db_obj->escapeString($_POST["inspection_information"])."' WHERE `formation_name` = '".$formation_name."'");
                
                for ($cnt = 0; isset($cars_data[$cnt], $_POST["car_manufacturer_".$cnt], $_POST["car_constructed_".$cnt], $_POST["car_description_".$cnt]); $cnt++) {
                    $db_obj->querySingle("UPDATE `unyohub_cars` SET `manufacturer` = '".$db_obj->escapeString($_POST["car_manufacturer_".$cnt])."', `constructed` = '".$db_obj->escapeString($_POST["car_constructed_".$cnt])."', `description` = '".$db_obj->escapeString($_POST["car_description_".$cnt])."' WHERE `formation_name` = '".$formation_name."' AND `car_number` = '".$db_obj->escapeString($cars_data[$cnt]["car_number"])."'");
                }
                
                $db_obj->querySingle("DELETE FROM `unyohub_formation_histories` WHERE `formation_name` = '".$formation_name."'");
                for ($cnt = 0; isset($_POST["event_year_".$cnt], $_POST["event_type_".$cnt], $_POST["event_content_".$cnt]); $cnt++) {
                    if (empty($_POST["event_content_".$cnt])) {
                        continue;
                    }
                    
                    $event_year_month = intval($_POST["event_year_".$cnt]);
                    if (!empty($_POST["event_month_".$cnt])) {
                        $event_year_month .= "-".str_pad(intval($_POST["event_month_".$cnt]), 2, "0", STR_PAD_LEFT);
                    }
                    
                    $db_obj->querySingle("INSERT INTO `unyohub_formation_histories`(`formation_name`, `event_year_month`, `event_type`, `event_content`) VALUES ('".$formation_name."', '".$event_year_month."', '".$db_obj->escapeString($_POST["event_type_".$cnt])."', '".$db_obj->escapeString($_POST["event_content_".$cnt])."')");
                }
                
                print "<script> alert('編成情報を保存しました'); </script>";
            } else {
                print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
            }
            
            $formation_data["description"] = $_POST["description"];
            $formation_data["inspection_information"] = $_POST["inspection_information"];
            
            for ($cnt = 0; isset($cars_data[$cnt], $_POST["car_manufacturer_".$cnt], $_POST["car_constructed_".$cnt], $_POST["car_description_".$cnt]); $cnt++) {
                $cars_data[$cnt]["manufacturer"] = $_POST["car_manufacturer_".$cnt];
                $cars_data[$cnt]["constructed"] = $_POST["car_constructed_".$cnt];
                $cars_data[$cnt]["description"] = $_POST["car_description_".$cnt];
            }
            
            $event_dict = array();
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
                
                $event_dict[$event_key] = array("event_year_month" => $event_year_month, "event_type" => $_POST["event_type_".$cnt], "event_content" => $_POST["event_content_".$cnt]);
            }
            
            $event_keys = array_keys($event_dict);
            sort($event_keys);
            
            $histories_data = array();
            foreach ($event_keys as $event_key) {
                $histories_data[] = $event_dict[$event_key];
            }
        }
        
        print <<< EOM
        <script>
        function add_history () {
            var cnt = document.getElementsByClassName("history_item").length;
            var dt = new Date();
            
            var history_item_elm = document.createElement("div");
            history_item_elm.className = "history_item";
            history_item_elm.innerHTML = "<h5>変更年月 / 変更の種類</h5><div class='half_input_wrapper'><input type='number' name='event_year_" + cnt + "' value='" + dt.getFullYear() + "' max='2100' min='1901'>年<input type='number' name='event_month_" + cnt + "' max='12' min='0'>月 / <select name='event_type_" + cnt + "'><option value='新製'>新製</option><option value='改修'>改修</option><option value='更新'>更新</option><option value='転属'>転属</option><option value='組換'>組換</option></select></div><h5>変更内容</h5><textarea name='event_content_" + cnt + "'></textarea>";
            
            document.getElementById("histories_area").appendChild(history_item_elm);
        }
        </script>
        EOM;
        
        print "<form action='formations.php?railroad_id=".$railroad_id."&formation_name=".urlencode($_GET["formation_name"])."' method='post'>";
        print "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";
        
        print "<h3>編成の特記事項</h3>";
        print "<textarea name='description'>".htmlspecialchars($formation_data["description"])."</textarea>";
        
        print "<h3>検査情報</h3>";
        print "<textarea name='inspection_information'>".htmlspecialchars($formation_data["inspection_information"])."</textarea>";
        
        print "<h3>各車両の情報</h3>";
        
        for ($cnt = 0; isset($cars_data[$cnt]); $cnt++) {
            print "<h4>".htmlspecialchars($cars_data[$cnt]["car_number"])."</h4>";
            print "<h5>製造メーカー / 製造年月日</h5>";
            print "<div class='half_input_wrapper'><input type='text' name='car_manufacturer_".$cnt."' value='".addslashes($cars_data[$cnt]["manufacturer"])."'> / <input type='text' name='car_constructed_".$cnt."' value='".addslashes($cars_data[$cnt]["constructed"])."'></div>";
            print "<h5>特記事項</h5>";
            print "<textarea name='car_description_".$cnt."'>".htmlspecialchars($cars_data[$cnt]["description"])."</textarea>";
        }
        
        print "<h3>車歴</h3>";
        print "<div class='informational_text'>データは年月の順に並び替えられ、内容が空欄の項目は除去されて保存されます。</div>";
        print "<div id='histories_area'>";
        for ($cnt = 0; isset($histories_data[$cnt]); $cnt++) {
            print "<div class='history_item'>";
            print "<h5>変更年月 / 変更の種類</h5>";
            $event_month = intval(substr($histories_data[$cnt]["event_year_month"], 5));
            print "<div class='half_input_wrapper'><input type='number' name='event_year_".$cnt."' value='".intval(substr($histories_data[$cnt]["event_year_month"], 0, 4))."' max='2100' min='1901'>年<input type='number' name='event_month_".$cnt."' value='".($event_month >= 1 ? $event_month : "")."' max='12' min='0'>月 / <select name='event_type_".$cnt."'>";
            foreach ($event_types as $event_type) {
                print "<option value='".$event_type."'".($histories_data[$cnt]["event_type"] === $event_type ? " selected='selected'" : "").">".$event_type."</option>";
            }
            print "</select></div>";
            print "<h5>変更内容</h5>";
            print "<textarea name='event_content_".$cnt."'>".htmlspecialchars($histories_data[$cnt]["event_content"])."</textarea>";
            print "</div>";
        }
        print "</div>";
        print "<br><div class='informational_text'><a href='javascript:void(0);' onclick='add_history();'>+ 車歴の追加</a></div>";
        
        print "<br><button type='submit' class='wide_button'>上書き保存</button>";
        
        print "</form>";
    } else {
        print "【!】 編成データがデータベースにありません";
    }
}

print "</article>";


print_footer();
