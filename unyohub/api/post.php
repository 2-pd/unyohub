<?php
include "../libs/wakarana/main.php";
include "../libs/zizai_captcha/main.php";

if (!isset($_POST["railroad_id"], $_POST["date"], $_POST["operation_number"], $_POST["formations"], $_POST["comment"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$wakarana = new wakarana("../config");

$user = $wakarana->check();
if (is_object($user)) {
    if (isset($_POST["one_time_token"]) && $user->check_one_time_token($_POST["one_time_token"])) {
        $user_id = $user->get_id();
    } else {
        print "ERROR: ワンタイムトークンの認証に失敗しました。再度ご送信ください";
        exit;
    }
} elseif (isset($_POST["guest_id"], $_POST["zizai_captcha_id"], $_POST["zizai_captcha_characters"])){
    if (substr($_POST["guest_id"], 0, 1) !== "*" || strlen($_POST["guest_id"]) !== 13) {
        print "ERROR: ゲストIDが不正です";
        exit;
    }
    
    $zizai_captcha = new zizai_captcha("../../config/zizai_captcha_config.json");
    
    if (!$zizai_captcha->check($_POST["zizai_captcha_id"], $_POST["zizai_captcha_characters"])) {
        print "ERROR: 画像認証が正しくありません";
        exit;
    }
    
    $user_id = $_POST["guest_id"];
} else {
    print "ERROR: ログイン情報の有効期限が切れています。再ログインしてください";
    exit;
}

$base_path = "../data/".basename($_POST["railroad_id"])."/";

$railroad_info = json_decode(file_get_contents($base_path."railroad_info.json"), TRUE);

$db_obj = new SQLite3($base_path."railroad.db");
$db_obj->busyTimeout(5000);


$ts = strtotime($_POST["date"]);

if ($ts === FALSE) {
    print "ERROR: 日付が不正です";
    exit;
}

$toshi = date("Y", $ts);

$holiday_list = ["1/1", "2/11", "2/23", "4/29", "5/3", "5/4", "5/5", "8/11", "11/3", "11/23"];
$happy_monday_list = ["1-second", "7-third", "9-third", "10-second"];

$holiday_list[] = "3/".floor(20.8431 + 0.242194 * ($toshi - 1980)) - floor(($toshi - 1980) / 4);
$shubun = floor(23.2488 + 0.242194 * ($toshi - 1980)) - floor(($toshi - 1980) / 4);
$holiday_list[] = "9/".$shubun;
    
for ($hm_cnt = 0; $hm_cnt < count($happy_monday_list); $hm_cnt++) {
    $bunkatsu = explode("-", $happy_monday_list[$hm_cnt]);
    
    $holiday_list[] = $bunkatsu[0]."/".date("j", strtotime($bunkatsu[1]." Monday of ".$toshi."-".$bunkatsu[0]));
}

for ($h_cnt = 0; $h_cnt < count($holiday_list); $h_cnt++) {
    if (date("D", strtotime($toshi."/".$holiday_list[$h_cnt])) === "Sun") {
        $bunkatsu = explode("/", $holiday_list[$h_cnt]);
        
        $furikae_cnt = 0;
        do {
            $furikae_cnt++;
            $hizuke = $bunkatsu[0]."/".(intval($bunkatsu[1]) + $furikae_cnt);
        } while (array_search($hizuke, $holiday_list) !== FALSE);
        
        $holiday_list[] = $hizuke;
    }
}

if (array_search("9/".($shubun - 2), $holiday_list) !== FALSE) {
    $holiday_list[] = "9/".($shubun - 1);
}

$today = date("n/j");
$today_mm_dd = date("m-d");
if (array_key_exists($today_mm_dd, $railroad_info["operations_by_date"])) {
    $operation_table = $railroad_info["operations_by_date"][$today_mm_dd];
} elseif (array_search($today, $holiday_list) !== FALSE) {
    $operation_table = $railroad_info["operations_by_day"][0];
} else {
    $operation_table = $railroad_info["operations_by_day"][intval(date("w"))];
}


$operation_data = $db_obj->querySingle("SELECT COUNT(*) FROM `unyohub_operations` WHERE `operation_table` = '".$operation_table."' AND `operation_number` = '".$db_obj->escapeString($_POST["operation_number"])."'", TRUE);

if (empty($operation_data)) {
    print "ERROR: 運用番号が不正です";
    exit;
}

$formations = mb_convert_kana($_POST["formations"], "a");
$formations_list = explode("+", $formations);

foreach ($formations_list as $formation) {
    if (empty($db_obj->querySingle("SELECT COUNT(*) FROM `unyohub_formations` WHERE `formation_name` = '".$db_obj->escapeString($formation)."'"))) {
        print "ERROR: 入力された編成名に誤りがあります";
        exit;
    }
}

$posted_datetime = date("Y-m-d H:i:s");

$db_obj->query("INSERT OR REPLACE INTO `unyohub_data` (`operation_date`, `operation_number`, `user_id`, `formations`, `posted_datetime`, `comment`) VALUES ('".date("Y-m-d", $ts)."','".$db_obj->escapeString($_POST["operation_number"])."', '".$db_obj->escapeString($user_id)."', '".$db_obj->escapeString($formations)."', '".$posted_datetime."', '".$db_obj->escapeString(mb_substr($_POST["comment"], 0, 500))."')");

$data = array("posted_datetime" => $posted_datetime);
print json_encode($data, JSON_UNESCAPED_UNICODE);
