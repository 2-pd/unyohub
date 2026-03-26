<?php
include "admin_common.php";

if (isset($_GET["user_id"])) {
    if ($user->get_id() === $_GET["user_id"]) {
        print "【!】自分自身のタイムアウトを設定することはできません";
        exit;
    }
} elseif (!isset($_GET["ip_address"])) {
    print "【!】URLが誤っています";
    exit;
}

if (!$user->check_permission(empty($_GET["railroad_id"]) ? "railroads" : "railroads/".$_GET["railroad_id"], "moderate")) {
    print "【!】アクセス中のユーザーアカウントにはこのページにアクセスする権限がありません";
    exit;
}

$moderation_db_obj = new SQLite3("../common_dbs/moderation.db");
$moderation_db_obj->busyTimeout(5000);

$now_ts = time();
$now_datetime = date("Y-m-d H:i:s", $now_ts);

$result_text = NULL;

if (isset($_POST["timed_out_days"])) {
    if (!$user->check_one_time_token($_POST["one_time_token"])) {
        $result_text = "【!】ワンタイムトークンが無効です。処理はキャンセルされました。";
        goto on_error;
    }
    
    if (isset($_GET["user_id"])) {
        $user_id = $moderation_db_obj->escapeString($_GET["user_id"]);
        
        if ($_POST["timed_out_days"] === "0") {
            $moderation_db_obj->query("DELETE FROM `unyohub_moderation_timed_out_users` WHERE `user_id` = '".$user_id."'");
            $result_text = "ユーザーのタイムアウトを解除しました";
        } else {
            $moderation_db_obj->query("DELETE FROM `unyohub_moderation_timed_out_users` WHERE `expiration_datetime` < '".$now_datetime."'");
            
            if ($moderation_db_obj->querySingle("SELECT COUNT(`user_id`) FROM `unyohub_moderation_timed_out_users` WHERE `user_id` = '".$user_id."' AND `expiration_datetime` >= '".$now_datetime."'")) {
                $result_text = "【!】指定されたユーザーは既にタイムアウトが設定されています";
                goto on_error;
            }
            
            $timed_out_days = intval($_POST["timed_out_days"]);
            if ($timed_out_days < 1 || $timed_out_days > 90) {
                $result_text = "【!】タイムアウト日数が不正です";
                goto on_error;
            }
            
            $moderation_db_obj->query("INSERT INTO `unyohub_moderation_timed_out_users` (`user_id`, `expiration_datetime`) VALUES ('".$user_id."', '".date("Y-m-d H:i:s", $timed_out_days * 86400 + $now_ts)."')");
            $moderation_db_obj->query("INSERT INTO `unyohub_moderation_user_timed_out_logs` (`user_id`, `timed_out_datetime`, `moderator_id`, `timed_out_days`) VALUES ('".$user_id."', '".$now_datetime."', '".$user->get_id()."', ".$timed_out_days.")");
            
            $result_text = "ユーザーをタイムアウトしました";
        }
    } else {
        $ip_address = $moderation_db_obj->escapeString($_GET["ip_address"]);
        
        if ($_POST["timed_out_days"] === "0") {
            $moderation_db_obj->query("DELETE FROM `unyohub_moderation_timed_out_ip_addresses` WHERE `ip_address` = '".$ip_address."'");
            $result_text = "IPアドレスのタイムアウトを解除しました";
        } else {
            $moderation_db_obj->query("DELETE FROM `unyohub_moderation_timed_out_ip_addresses` WHERE `expiration_datetime` < '".$now_datetime."'");
            
            if ($moderation_db_obj->querySingle("SELECT COUNT(`ip_address`) FROM `unyohub_moderation_timed_out_ip_addresses` WHERE `ip_address` = '".$ip_address."' AND `expiration_datetime` >= '".$now_datetime."'")) {
                $result_text = "【!】指定されたIPアドレスは既にタイムアウトが設定されています";
                goto on_error;
            }
            
            $timed_out_days = intval($_POST["timed_out_days"]);
            if ($timed_out_days < 1 || $timed_out_days > 90) {
                $result_text = "【!】タイムアウト日数が不正です";
                goto on_error;
            }
            
            $moderation_db_obj->query("INSERT INTO `unyohub_moderation_timed_out_ip_addresses` (`ip_address`, `expiration_datetime`) VALUES ('".$ip_address."', '".date("Y-m-d H:i:s", $timed_out_days * 86400 + $now_ts)."')");
            $moderation_db_obj->query("INSERT INTO `unyohub_moderation_ip_address_timed_out_logs` (`ip_address`, `timed_out_datetime`, `moderator_id`, `timed_out_days`) VALUES ('".$ip_address."', '".$now_datetime."', '".$user->get_id()."', ".$timed_out_days.")");
            
            $result_text = "IPアドレスをタイムアウトしました";
        }
    }
}

on_error:


print_header();


if (!empty($result_text)) {
    print "<script> alert('".$result_text."'); </script>";
}


print "<article>";

print "<h2>ユーザーのタイムアウト</h2>";

print "<form action='time_out_user.php?".(isset($_GET["user_id"]) ? "user_id=".addslashes($_GET["user_id"]) : "ip_address=".addslashes($_GET["ip_address"])).(empty($_GET["railroad_id"]) ? "" : "&"."railroad_id=".addslashes($_GET["railroad_id"]))."' method='post'>";
print "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";

if (isset($_GET["user_id"])) {
    print "<div class='key_and_value'><b>対象ユーザーID</b>".(!str_starts_with($_GET["user_id"], "*") && $user->check_permission("railroads", "moderate") ? "<a href='user_data.php?user_id=".addslashes($_GET["user_id"])."''>".htmlspecialchars($_GET["user_id"])."</a>" : htmlspecialchars($_GET["user_id"]))."</div>";
    
    $expiration_datetime = $moderation_db_obj->querySingle("SELECT `expiration_datetime` FROM `unyohub_moderation_timed_out_users` WHERE `user_id` = '".$moderation_db_obj->escapeString($_GET["user_id"])."' AND `expiration_datetime` > '".$now_datetime."'");
} else {
    print "<div class='key_and_value'><b>対象IPアドレス</b>".htmlspecialchars($_GET["ip_address"])."</div>";
    
    $expiration_datetime = $moderation_db_obj->querySingle("SELECT `expiration_datetime` FROM `unyohub_moderation_timed_out_ip_addresses` WHERE `ip_address` = '".$moderation_db_obj->escapeString($_GET["ip_address"])."' AND `expiration_datetime` > '".$now_datetime."'");
}

if (empty($expiration_datetime)) {
    print "<div class='key_and_value'><b>現在の状態</b>タイムアウトなし</div>";
    
    print "<h3>タイムアウトを設定</h3>";
    
    print "<input type='number' name='timed_out_days' min='1' max='90' value='7'>日間タイムアウト<br><br>";
    
    print "<button type='submit' class='wide_button'>タイムアウト実行</button>";
} else {
    print "<div class='key_and_value'><b>現在の状態</b><span class='warning_sentence'>タイムアウト中(残".(ceil((strtotime($expiration_datetime) - time()) / 86400))."日)</span></div>";
    
    print "<input type='hidden' name='timed_out_days' value='0'><br>";
    
    print "<button type='submit' class='wide_button'>タイムアウト解除</button>";
}

print "</form>";


print_footer();
