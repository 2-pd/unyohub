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


$formations = json_decode(file_get_contents("../data/".$railroad_id."/formations.json"), TRUE);

if (empty($formations)) {
    print "【!】編成データを読み込めませんでした";
    exit;
}

print "<article>";

print "<nav><a href='railroads.php?railroad_id=".$railroad_id."'>".htmlspecialchars($railroad_info["railroad_name"])."</a> &gt;";

if (empty($_GET["formation_name"])) {
    print "</nav>";
    
    print "<h2>編成情報の編集</h2>";
    
    for ($cnt = 0; isset($formations["series_names"][$cnt]); $cnt++) {
        $checkbox_id = "series_".$cnt;
        
        print "<input type='checkbox' id='".$checkbox_id."'><label for='".$checkbox_id."' class='drop_down'>".htmlspecialchars($formations["series_names"][$cnt])."</label><div><table>";
        
        if (empty($formations["series"][$formations["series_names"][$cnt]]["subseries_names"])) {
            $printed_cnt = 0;
            foreach ($formations["series"][$formations["series_names"][$cnt]]["formation_names"] as $formation_name) {
                if (!empty($formations["formations"][$formation_name]["new_formation_name"])) {
                    continue;
                }
                
                print "<tr><td><a href='formations.php?railroad_id=".$railroad_id."&formation_name=".urlencode($formation_name)."'><img src='".(!empty($formations["formations"][$formation_name]["icon_id"]) ? "train_icons.php/".$railroad_id."/".addslashes($formations["formations"][$formation_name]["icon_id"]) : "generic_train_icon.webp")."' alt='' class='train_icon'>".htmlspecialchars($formation_name)."</a></td></tr>";
                $printed_cnt++;
            }
            
            if ($printed_cnt === 0) {
                print "<tr><td class='descriptive_text'>編集可能な編成はありません</td></tr>";
            }
        } else {
            foreach ($formations["series"][$formations["series_names"][$cnt]]["subseries_names"] as $subseries_name) {
                print "<tr><th>".htmlspecialchars($subseries_name)."</th></tr>";
                
                $printed_cnt = 0;
                foreach ($formations["series"][$formations["series_names"][$cnt]]["subseries"][$subseries_name]["formation_names"] as $formation_name) {
                    if (!empty($formations["formations"][$formation_name]["new_formation_name"])) {
                        continue;
                    }
                    
                    print "<tr><td><a href='formations.php?railroad_id=".$railroad_id."&formation_name=".urlencode($formation_name)."'><img src='".(!empty($formations["formations"][$formation_name]["icon_id"]) ? "train_icons.php/".$railroad_id."/".addslashes($formations["formations"][$formation_name]["icon_id"]) : "generic_train_icon.webp")."' alt='' class='train_icon'>".htmlspecialchars($formation_name)."</a></td></tr>";
                    $printed_cnt++;
                }
                
                if ($printed_cnt === 0) {
                    print "<tr><td class='descriptive_text'>編集可能な編成はありません</td></tr>";
                }
            }
        }
        
        print "</table></div>";
    }
    
    print "<br><a class='execute_button' href='reference_books.php?railroad_id=".$railroad_id."'>参考書籍の追加・削除</a>";
} else {
    print " <a href='formations.php?railroad_id=".$railroad_id."'>編成情報の編集</a> &gt;</nav>";
    
    print "<h2>".htmlspecialchars($_GET["formation_name"])."</h2>";
    
    $db_obj = new SQLite3("../data/".$railroad_id."/railroad.db");
    $db_obj->busyTimeout(5000);
    
    $formation_name = $db_obj->escapeString($_GET["formation_name"]);
    
    $formation_data = $db_obj->querySingle("SELECT `currently_registered`, `affiliation`, `caption`, `description`, `semifixed_formation`, `unavailable`, `inspection_information` FROM `unyohub_formations` WHERE `formation_name` = '".$formation_name."'", TRUE);
    
    if (!empty($formation_data)) {
        $cars_r = $db_obj->query("SELECT `car_number`, `manufacturer`, `constructed`, `description` FROM `unyohub_cars` WHERE `formation_name` = '".$formation_name."' AND `car_order` IS NOT NULL ORDER BY `car_order` ASC");
        
        $cars_data = array();
        while ($car_data = $cars_r->fetchArray(SQLITE3_ASSOC)) {
            $cars_data[] = $car_data;
        }
        
        if ($formation_data["currently_registered"]) {
            $formation_data["semifixed_formation"] = !is_null($formation_data["semifixed_formation"]) ? $formation_data["semifixed_formation"] : $_GET["formation_name"];
        }
        
        if (isset($_POST["affiliation"], $_POST["caption"], $_POST["description"], $_POST["inspection_information"])) {
            $is_unavailable = !empty($_POST["unavailable"]);
            $semifixed_formation = empty($_POST["semifixed_formation"]) ? $_GET["formation_name"] : $_POST["semifixed_formation"];
            $updated_datetime = date("Y-m-d H:i:s");
            
            if (!isset($_POST["one_time_token"]) || !$user->check_one_time_token($_POST["one_time_token"])) {
                print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
                
                goto on_error;
            }
            
            if ($formation_data["currently_registered"] && $semifixed_formation !== $formation_data["semifixed_formation"]) {
                $semifixed_formation_names = explode("+", $semifixed_formation);
                
                if (!in_array($_GET["formation_name"], $semifixed_formation_names)) {
                    print "<script> alert('【!】半固定編成に編集中の編成自身が含まれていません。処理はキャンセルされました。'); </script>";
                    
                    goto on_error;
                }
                
                foreach ($semifixed_formation_names as $semifixed_formation_name) {
                    if (!array_key_exists($semifixed_formation_name, $formations["formations"]) || empty($formations["formations"][$semifixed_formation_name]["cars"])) {
                        print "<script> alert('【!】在籍していない編成が半固定編成に指定されています。処理はキャンセルされました。'); </script>";
                        
                        goto on_error;
                    }
                }
                
                $semifixed_formation_names_old = array_diff(explode("+", $formation_data["semifixed_formation"]), $semifixed_formation_names);
                $update_target_formations = array_merge($semifixed_formation_names, $semifixed_formation_names_old);
                $semifixed_formation_names = array_diff($semifixed_formation_names, array($_GET["formation_name"]));
                
                foreach ($semifixed_formation_names_old as $semifixed_formation_name) {
                    $db_obj->querySingle("UPDATE `unyohub_formations` SET `semifixed_formation` = NULL, `overview_updated` = '".$updated_datetime."' WHERE `formation_name` = '".$db_obj->escapeString($semifixed_formation_name)."'");
                }
                
                foreach ($semifixed_formation_names as $semifixed_formation_name) {
                    $semifixed_formation_name = $db_obj->escapeString($semifixed_formation_name);
                    
                    $old_semifixed_formations = $db_obj->querySingle("SELECT `semifixed_formation` FROM `unyohub_formations` WHERE `formation_name` = '".$semifixed_formation_name."'");
                    
                    foreach (explode("+", $old_semifixed_formations) as $old_semifixed_formation_name) {
                        if (!in_array($old_semifixed_formation_name, $update_target_formations)) {
                            $db_obj->querySingle("UPDATE `unyohub_formations` SET `semifixed_formation` = NULL, `overview_updated` = '".$updated_datetime."' WHERE `formation_name` = '".$old_semifixed_formation_name."'");
                        }
                    }
                    
                    $db_obj->querySingle("UPDATE `unyohub_formations` SET `semifixed_formation` = '".$db_obj->escapeString($semifixed_formation)."', `overview_updated` = '".$updated_datetime."' WHERE `formation_name` = '".$semifixed_formation_name."'");
                }
                
                $overview_changed = TRUE;
            } else {
                $overview_changed = ($_POST["caption"] !== $formation_data["caption"] || $is_unavailable != $formation_data["unavailable"]);
            }
            
            $db_obj->querySingle("UPDATE `unyohub_formations` SET `affiliation` = '".$db_obj->escapeString($_POST["affiliation"])."', `caption` = '".$db_obj->escapeString($_POST["caption"])."', `description` = '".$db_obj->escapeString($_POST["description"])."', `semifixed_formation` = ".($semifixed_formation === $_GET["formation_name"] ? "NULL" : "'".$db_obj->escapeString($semifixed_formation)."'").", `unavailable` = ".(empty($_POST["unavailable"]) ? "FALSE" : "TRUE").", `inspection_information` = '".$db_obj->escapeString($_POST["inspection_information"])."',".($overview_changed ? " `overview_updated` = '".$updated_datetime."'," : "")." `updated_datetime` = '".$updated_datetime."', `edited_user_id` = '".$user->get_id()."' WHERE `formation_name` = '".$formation_name."'");
            
            for ($cnt = 0; isset($cars_data[$cnt], $_POST["car_manufacturer_".$cnt], $_POST["car_constructed_".$cnt], $_POST["car_description_".$cnt]); $cnt++) {
                $db_obj->querySingle("UPDATE `unyohub_cars` SET `manufacturer` = '".$db_obj->escapeString($_POST["car_manufacturer_".$cnt])."', `constructed` = '".$db_obj->escapeString($_POST["car_constructed_".$cnt])."', `description` = '".$db_obj->escapeString($_POST["car_description_".$cnt])."' WHERE `formation_name` = '".$formation_name."' AND `car_number` = '".$db_obj->escapeString($cars_data[$cnt]["car_number"])."'");
            }
            
            print "<script> alert('編成情報を保存しました'); </script>";
            
            on_error:
            
            $formation_data["affiliation"] = $_POST["affiliation"];
            $formation_data["caption"] = $_POST["caption"];
            $formation_data["description"] = $_POST["description"];
            $formation_data["semifixed_formation"] = $semifixed_formation;
            $formation_data["unavailable"] = $is_unavailable;
            $formation_data["inspection_information"] = $_POST["inspection_information"];
            
            for ($cnt = 0; isset($cars_data[$cnt], $_POST["car_manufacturer_".$cnt], $_POST["car_constructed_".$cnt], $_POST["car_description_".$cnt]); $cnt++) {
                $cars_data[$cnt]["manufacturer"] = $_POST["car_manufacturer_".$cnt];
                $cars_data[$cnt]["constructed"] = $_POST["car_constructed_".$cnt];
                $cars_data[$cnt]["description"] = $_POST["car_description_".$cnt];
            }
        }
        
        print "<script> var data_edited = false; </script>";
        print "<div class='radio_area'><label class='selected_label'>基本情報</label><label onclick='if(!data_edited || confirm(\"編成基本情報の編集を中断して車歴の編集を行いますか？\\n保存していない内容は破棄されます。\")){ location.href = \"formation_histories.php?railroad_id=".$railroad_id."&formation_name=".urlencode($_GET["formation_name"])."\"; }'>車歴情報</label></div>";
        
        print "<form action='formations.php?railroad_id=".$railroad_id."&formation_name=".urlencode($_GET["formation_name"])."' method='post'>";
        print "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";
        
        print "<h3>編成の一行見出し</h3>";
        print "<input type='text' name='caption' value='".addslashes($formation_data["caption"])."' onkeyup='data_edited = true;'>";
        
        print "<h3>所属車両基地等</h3>";
        print "<input type='text' name='affiliation' value='".addslashes($formation_data["affiliation"])."' onkeyup='data_edited = true;'>";
        
        print "<h3>編成の特記事項</h3>";
        print "<textarea name='description' onkeyup='data_edited = true;'>".htmlspecialchars($formation_data["description"])."</textarea>";
        
        if ($formation_data["currently_registered"]) {
            print "<h3>半固定編成</h3>";
            print "<div class='informational_text'>".htmlspecialchars($railroad_info["alias_of_forward_direction"])."から順に「+」で区切って入力</div>";
            print "<input type='text' name='semifixed_formation' placeholder='".addslashes($_GET["formation_name"])."' value='".addslashes($formation_data["semifixed_formation"])."' onkeyup='data_edited = true;'>";
        }
        
        print "<h3>検査情報</h3>";
        print "<div class='chip_wrapper'><input type='checkbox' name='unavailable' id='unavailable' class='chip' value='YES'".($formation_data["unavailable"] ? " checked='checked'" : "")." onchange='data_edited = true;'><label for='unavailable'>運用離脱中</label></div>";
        print "<textarea name='inspection_information' onkeyup='data_edited = true;'>".htmlspecialchars($formation_data["inspection_information"])."</textarea>";
        
        print "<h3>各車両の情報</h3>";
        
        for ($cnt = 0; isset($cars_data[$cnt]); $cnt++) {
            print "<h4>".htmlspecialchars($cars_data[$cnt]["car_number"])."</h4>";
            print "<h5>製造メーカー / 製造年月日</h5>";
            print "<div class='half_input_wrapper'><input type='text' name='car_manufacturer_".$cnt."' value='".addslashes($cars_data[$cnt]["manufacturer"])."' onkeyup='data_edited = true;'> / <input type='text' name='car_constructed_".$cnt."' value='".addslashes($cars_data[$cnt]["constructed"])."' onkeyup='data_edited = true;'></div>";
            print "<h5>特記事項</h5>";
            print "<textarea name='car_description_".$cnt."' onkeyup='data_edited = true;'>".htmlspecialchars($cars_data[$cnt]["description"])."</textarea>";
        }
        
        print "<button type='submit' class='save_button'>上書き保存</button>";
        
        print "</form>";
    } else {
        print "【!】 編成データがデータベースにありません";
    }
}

print "</article>";


print_footer();
