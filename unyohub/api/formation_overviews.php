<?php
if (!isset($_POST["railroad_id"], $_POST["last_modified_timestamp"])) {
    print "ERROR: 送信値が不正です";
    exit;
}


$db_obj = new SQLite3("../data/".basename($_POST["railroad_id"])."/railroad.db");
$db_obj->busyTimeout(5000);


$updated_datetime = $db_obj->querySingle("SELECT `overview_updated` FROM `unyohub_formations` WHERE `currently_registered` = 1 AND `overview_updated` > '".date("Y-m-d H:i:s", intval($_POST["last_modified_timestamp"]))."' ORDER BY `overview_updated` DESC LIMIT 1");

if (empty($updated_datetime)) {
    print "NO_UPDATES_AVAILABLE";
    exit;
}


$overviews_r = $db_obj->query("SELECT `formation_name`, `caption`, `semifixed_formation`, `unavailable` FROM `unyohub_formations` WHERE `currently_registered` = 1");

$formation_overviews = array();
while ($formation_overview = $overviews_r->fetchArray(SQLITE3_ASSOC)) {
    $formation_overviews[$formation_overview["formation_name"]] = array("caption" => $formation_overview["caption"], "unavailable" => $formation_overview["unavailable"]);
    
    if (!empty($formation_overview["semifixed_formation"])) {
        $formation_overviews[$formation_overview["formation_name"]]["semifixed_formation"] = $formation_overview["semifixed_formation"];
    }
}


header("Last-Modified: ".gmdate("D, d M Y H:i:s", strtotime($updated_datetime))." GMT");

if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && strpos($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip") !== FALSE) {
    header("Content-Encoding: gzip");
    
    print gzencode(json_encode($formation_overviews, JSON_UNESCAPED_UNICODE));
} else {
    print json_encode($formation_overviews, JSON_UNESCAPED_UNICODE);
}
