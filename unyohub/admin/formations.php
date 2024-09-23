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
    
    $db_obj = new SQLite3("../data/".$railroad_id."/railroad.db");
    $db_obj->busyTimeout(5000);
    
    $formation_name = $db_obj->escapeString($_GET["formation_name"]);
    
    $formation_data = $db_obj->querySingle("SELECT `description`, `inspection_information` FROM `unyohub_formations` WHERE `formation_name` = '".$formation_name."'", TRUE);
    
    if (!empty($formation_data)) {
        $cars_r = $db_obj->query("SELECT `car_number`, `description` FROM `unyohub_cars` WHERE `formation_name` = '".$formation_name."' ORDER BY `car_order` ASC");
        
        $cars_data = array();
        while ($car_data = $cars_r->fetchArray(SQLITE3_ASSOC)) {
            $cars_data[] = $car_data;
        }
        
        if (isset($_POST["description"], $_POST["inspection_information"])) {
            if (isset($_POST["one_time_token"]) && $user->check_one_time_token($_POST["one_time_token"])) {
                $db_obj->querySingle("UPDATE `unyohub_formations` SET `description` = '".$db_obj->escapeString($_POST["description"])."', `inspection_information` = '".$db_obj->escapeString($_POST["inspection_information"])."' WHERE `formation_name` = '".$formation_name."'");
                
                for ($cnt = 0; isset($cars_data[$cnt], $_POST["car_description_".$cnt]); $cnt++) {
                    $db_obj->querySingle("UPDATE `unyohub_cars` SET `description` = '".$db_obj->escapeString($_POST["car_description_".$cnt])."' WHERE `formation_name` = '".$formation_name."' AND `car_number` = '".$db_obj->escapeString($cars_data[$cnt]["car_number"])."'");
                }
            } else {
                print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
            }
            
            $formation_data["description"] = $_POST["description"];
            $formation_data["inspection_information"] = $_POST["inspection_information"];
            
            for ($cnt = 0; isset($cars_data[$cnt], $_POST["car_description_".$cnt]); $cnt++) {
                $cars_data[$cnt]["description"] = $_POST["car_description_".$cnt];
            }
        }
        
        print "<form action='formations.php?railroad_id=".$railroad_id."&formation_name=".urlencode($_GET["formation_name"])."' method='post'>";
        print "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";
        
        print "<h3>編成の特記事項</h3>";
        print "<textarea name='description'>".htmlspecialchars($formation_data["description"])."</textarea>";
        
        print "<h3>検査情報</h3>";
        print "<textarea name='inspection_information'>".htmlspecialchars($formation_data["inspection_information"])."</textarea>";
        
        print "<h3>各車両の特記事項</h3>";
        
        for ($cnt = 0; isset($cars_data[$cnt]); $cnt++) {
            print "<h4>".htmlspecialchars($cars_data[$cnt]["car_number"])."</h4>";
            print "<textarea name='car_description_".$cnt."'>".htmlspecialchars($cars_data[$cnt]["description"])."</textarea>";
        }
        
        print "<br><button type='submit' class='wide_button'>上書き保存</button>";
        
        print "</form>";
    } else {
        print "【!】 編成データがデータベースにありません";
    }
}

print "</article>";


print_footer();
