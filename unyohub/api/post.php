<?php
include "../libs/zizai_captcha/main.php";
include "__operation_data_functions.php";

if (!isset($_POST["railroad_id"], $_POST["date"], $_POST["operation_number"], $_POST["formations"], $_POST["comment"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$config = parse_ini_file("../config/main.ini", FALSE, INI_SCANNER_TYPED);

$user = $wakarana->check();
if (is_object($user)) {
    if (isset($_POST["one_time_token"]) && $user->check_one_time_token($_POST["one_time_token"])) {
        $user_id = $user->get_id();
    } else {
        print "ERROR: ワンタイムトークンの認証に失敗しました。再度ご送信ください";
        exit;
    }
} elseif (isset($_POST["guest_id"], $_POST["zizai_captcha_id"], $_POST["zizai_captcha_characters"])){
    if (!$config["allow_guest_user"]) {
        print "ERROR: ゲストユーザーでの投稿は停止されています";
        exit;
    }
    
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


$ts_now = time();
$posted_date = date("Y-m-d", $ts_now);
$posted_datetime = $posted_date." ".date("H:i:s", $ts_now);


connect_moderation_db();

if ($moderation_db_obj->querySingle("SELECT COUNT(`user_id`) FROM `unyohub_moderation_timed_out_users` WHERE `user_id` = '".$moderation_db_obj->escapeString($user_id)."' AND `expiration_datetime` > '".$posted_datetime."'") || $moderation_db_obj->querySingle("SELECT COUNT(`ip_address`) FROM `unyohub_moderation_timed_out_ip_addresses` WHERE `ip_address` = '".$moderation_db_obj->escapeString($_SERVER["REMOTE_ADDR"])."' AND `expiration_datetime` > '".$posted_datetime."'")) {
    print "ERROR: 投稿制限措置が実施されているため、現在は投稿機能をご利用いただくことができません";
    exit;
}


load_railroad_data($_POST["railroad_id"]);


$ts = strtotime($_POST["date"]);

if ($ts === FALSE) {
    print "ERROR: 日付が不正です";
    exit;
}

if ($ts < $ts_now - 183600) {
    print "ERROR: 2日以上前の運用情報を投稿することはできません";
    exit;
}

if ($ts > $ts_now + (86400 * $config["available_days_ahead"]) - 10800) {
    print "ERROR: ".($config["available_days_ahead"] + 1)."日以上先の運用情報を投稿することはできません";
    exit;
}

$operation_date = date("Y-m-d", $ts);

update_diagram_revision($ts);

$operation_data = get_operation_info($ts, $_POST["operation_number"]);


if (!empty($_POST["assign_order"])) {
    $assign_order = intval($_POST["assign_order"]);
    
    if ($assign_order < 1 || $assign_order > 10) {
        print "ERROR: 差し替え回数が制限値を逸脱しています";
        exit;
    }
} else {
    $assign_order = 1;
}

if (!empty($_POST["is_quotation"]) && $_POST["is_quotation"] === "YES") {
    $is_quotation = TRUE;
} else {
    $is_quotation = FALSE;
}


if (!empty($_POST["train_number"])) {
    $train_number_q = "'".$db_obj->escapeString($_POST["train_number"])."'";
} else {
    if (!$is_quotation) {
        print "ERROR: 列車番号が指定されていません";
        exit;
    }
    
    $train_number_q = "NULL";
}


if (mb_strlen($_POST["comment"]) > 140) {
    print "ERROR: コメントの最大文字数は140文字です";
    exit;
}

$comment = preg_replace("/[\r\n][\r\n]++/u", "\n", preg_replace("/\A[\x00\s]++|[\x00\s]++\Z/u", "", $_POST["comment"]));

if (strlen($comment) === 0) {
    if ($is_quotation) {
        print "ERROR: 情報の出典を補足情報にご入力ください";
        exit;
    }
    
    if ($config["require_comments_on_speculative_posts"] && (($operation_date === $posted_date && !is_null($operation_data["starting_time"]) && $operation_data["starting_time"] > date("H:i", $ts_now)) || $operation_date > $posted_date)) {
        print "ERROR: 出庫前の運用に充当される編成を特定した方法を補足情報にご入力ください";
        exit;
    }
}


$operation_number = $db_obj->escapeString($_POST["operation_number"]);

$formations = preg_replace(array("/\s+/u", "/不明/u"), array("", "?"), mb_convert_kana($_POST["formations"], "KVa"));

if (empty($formations)) {
    print "ERROR: 投稿内容が未入力です";
    exit;
}

if ($formations !== "運休" && $formations !== "ウヤ" && $formations !== "トケ") {
    $formation_info = get_formation_info($formations, TRUE);
    
    if ($formation_info["min_car_count_range"] > $operation_data["max_car_count"] || $formation_info["max_car_count_range"] < $operation_data["min_car_count"]) {
        print "ERROR: 編成の両数が異常です";
        exit;
    }
} else {
    $formations = "";
    $formation_info = get_formation_info($formations);
}


$ts_now = time();
$posted_date = date("Y-m-d", $ts_now);

if (is_object($user)) {
    $days_posted = intval($user->get_value("days_posted"));
    $post_count = intval($user->get_value("post_count")) + 1;
    
    if ($user->get_value("last_posted_date") !== $posted_date) {
        $days_posted++;
        
        $user->set_value("last_posted_date", $posted_date);
        $user->increment_value("days_posted");
    }
    
    $user->increment_value("post_count");
}


if ($config["log_ip_address"]) {
    $ip_address_q = "'".$db_obj->escapeString($_SERVER["REMOTE_ADDR"])."'";
} else {
    $ip_address_q = "NULL";
}


$db_obj->query("INSERT OR REPLACE INTO `unyohub_data` (`operation_date`, `operation_number`, `assign_order`, `user_id`, `train_number`, `formations`, `is_quotation`, `posted_datetime`, `comment`, `ip_address`) VALUES ('".$operation_date."', '".$operation_number."', ".$assign_order.", '".$db_obj->escapeString($user_id)."', ".$train_number_q.", '".$db_obj->escapeString($formations)."', ".intval($is_quotation).", '".$posted_datetime."', '".$db_obj->escapeString($comment)."', ".$ip_address_q.")");

$data_cache_values = update_data_cache($operation_date, $operation_number, $posted_datetime, array($assign_order => array("formation_pattern" => $formation_info["formation_pattern"], "formation_list" => $formation_info["formation_list"])));

if (!empty($operation_data["terminal_track"])) {
    update_next_day_data($ts, $operation_data["terminal_location"], $operation_data["terminal_track"], $data_cache_values["formations"], $posted_datetime, $data_cache_values["formation_list"], $data_cache_values["from_beginner"], $data_cache_values["is_quotation"]);
}

unset($data_cache_values["formation_list"]);

if (!$data_cache_values["variant_exists"]) {
    unset($data_cache_values["variant_exists"]);
}
if (!$data_cache_values["comment_exists"]) {
    unset($data_cache_values["comment_exists"]);
}
if (!$data_cache_values["from_beginner"]) {
    unset($data_cache_values["from_beginner"]);
}
if (!$data_cache_values["is_quotation"]) {
    unset($data_cache_values["is_quotation"]);
}

print json_encode(array($_POST["operation_number"] => $data_cache_values), JSON_UNESCAPED_UNICODE);
