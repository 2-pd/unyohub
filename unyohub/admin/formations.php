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

if (empty($_GET["formation_name"])) {
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
    
}

print "</article>";


print_footer();
