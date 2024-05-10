<?php
include "../libs/wakarana/main.php";
include "../libs/zizai_captcha/main.php";
include "__operation_data_functions.php";

if (!isset($_POST["railroad_id"], $_POST["date"], $_POST["operation_number"], $_POST["formations"], $_POST["comment"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$config = parse_ini_file("../config/main.ini", FALSE, INI_SCANNER_TYPED);

connect_moderation_db();

if ($moderation_db_obj->querySingle("SELECT COUNT(`ip_address`) FROM `unyohub_moderation_suspicious_ip_addresses` WHERE `ip_address` = '".$moderation_db_obj->escapeString($_SERVER["REMOTE_ADDR"])."' AND `marked_datetime` > '".date("Y-m-d H:i:s", time() - 2592000)."'")) {
    print "ERROR: ご利用のIPアドレスは投稿制限に達しました";
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


load_railroad_data($_POST["railroad_id"]);


$ts_now = time();
$posted_date = date("Y-m-d", $ts_now);


$ts = strtotime($_POST["date"]);

if ($ts === FALSE) {
    print "ERROR: 日付が不正です";
    exit;
}

if ($ts < $ts_now - 183600) {
    print "ERROR: 2日以上前の運用情報を投稿することはできません";
    exit;
}

$operation_date = date("Y-m-d", $ts);


$operation_data = get_operation_info($ts, $_POST["operation_number"]);

if (mb_strlen($_POST["comment"]) > 140) {
    print "ERROR: コメントの最大文字数は140文字です";
    exit;
}

$comment = preg_replace("/[\r\n][\r\n]++/u", "\n", preg_replace("/\A[\x00\s]++|[\x00\s]++\Z/u", "", $_POST["comment"]));

if (strlen($comment) === 0 && (($operation_date === $posted_date && $operation_data["starting_time"] > date("H:i", $ts_now)) || $operation_date > $posted_date)) {
    print "ERROR: 出庫前の運用に充当される編成を特定した方法をコメントにご入力ください";
    exit;
}


$operation_number = $db_obj->escapeString($_POST["operation_number"]);

$formations = preg_replace("/不明/u", "?", mb_convert_kana($_POST["formations"], "KVa"));

if ($formations !== "運休" && $formations !== "ウヤ" && $formations !== "トケ") {
    $formation_data = check_formation($formations);
    
    if ($formation_data["min_car_count_range"] > $operation_data["max_car_count"] || $formation_data["max_car_count_range"] < $operation_data["min_car_count"]) {
        print "ERROR: 編成の両数が異常です";
        exit;
    }
    
    $formation_pattern = $formation_data["formation_pattern"];
    $formation_list = $formation_data["formation_list"];
} else {
    $formations = "";
    $formation_pattern = array("");
    $formation_list = array();
}


$ts_now = time();
$posted_date = date("Y-m-d", $ts_now);

$from_beginner = TRUE;
if (is_object($user)) {
    $days_posted = intval($user->get_value("days_posted"));
    
    if ($user->get_value("last_posted_date") !== $posted_date) {
        $days_posted++;
        
        $user->set_value("last_posted_date", $posted_date);
        $user->set_value("days_posted", $days_posted);
    }
    
    if ($days_posted > 20 || $user->check_permission("moderate")) {
        $from_beginner = FALSE;
    }
}


if ($config["log_ip_address"]) {
    $ip_address_q = "'".$db_obj->escapeString($_SERVER["REMOTE_ADDR"])."'";
} else {
    $ip_address_q = "NULL";
}


$posted_datetime = $posted_date." ".date("H:i:s", $ts_now);

$db_obj->query("INSERT OR REPLACE INTO `unyohub_data` (`operation_date`, `operation_number`, `user_id`, `formations`, `posted_datetime`, `comment`, `ip_address`) VALUES ('".$operation_date."', '".$operation_number."', '".$db_obj->escapeString($user_id)."', '".$db_obj->escapeString($formations)."', '".$posted_datetime."', '".$db_obj->escapeString($comment)."', ".$ip_address_q.")");

$data_cache_values = get_data_cache_values($operation_date, $operation_number, $formation_pattern);

$comment_exists = boolval(strlen($comment));

update_data_cache($operation_date, $operation_number, $formations, $posted_datetime, $formation_list, $data_cache_values["posts_count"], $data_cache_values["variant_exists"], $comment_exists, $from_beginner);

if (!empty($operation_data["terminal_track"])) {
    update_next_day_data($ts, $operation_data["terminal_location"], $operation_data["terminal_track"], $formations, $posted_datetime, $formation_list, $from_beginner);
}


$data = array($_POST["operation_number"] => array("formations" => $formations, "posts_count" => $data_cache_values["posts_count"], "variant_exists" => $data_cache_values["variant_exists"], "comment_exists" => $comment_exists, "from_beginner" => $from_beginner));
print json_encode($data, JSON_UNESCAPED_UNICODE);


if ($config["anti_troll_garbage_size"] >= 1 && $moderation_db_obj->querySingle("SELECT COUNT(`user_id`) FROM `unyohub_moderation_suspicious_users` WHERE `user_id` = '".$moderation_db_obj->escapeString($user_id)."'")) {
    $garbage = str_repeat(" ", 1024);
    
    $loop_max = $config["anti_troll_garbage_size"] * 1024;
    for ($cnt = 0; $cnt < $loop_max; $cnt++) {
        print $garbage;
    }
}
