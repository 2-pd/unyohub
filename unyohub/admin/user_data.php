<?php
include "admin_common.php";

if (!$user->check_permission("railroads", "moderate")) {
    print "【!】アクセス中のユーザーアカウントにはこのページにアクセスする権限がありません";
    exit;
}

if (empty($_GET["user_id"])) {
    print "【!】表示対象ユーザーが選択されていません";
    exit;
}

$moderator_id = $user->get_id();
$moderator_is_admin = $user->check_permission("instance_administrator");


print_header();


print "<article>";

print "<nav><a href='user_list.php'>ユーザーの一覧</a> &gt;";

print "<h2>ユーザーの詳細</h2>";


$user_obj = $wakarana->get_user($_GET["user_id"]);

if (!is_object($user_obj)) {
    print "<div class='warning_text'>存在しないユーザーが選択されました</div>";
    
    goto non_existent_user;
}

$user_id = $user_obj->get_id();


$result_text = NULL;

if (!empty($_POST["enable_user"])) {
    if (!$user->check_one_time_token($_POST["one_time_token"])) {
        $result_text = "【!】ワンタイムトークンが無効です。処理はキャンセルされました。";
        goto on_error;
    }
    
    $user_obj->set_status(WAKARANA_STATUS_NORMAL);
    $result_text = "ユーザーアカウントを有効化しました";
} elseif (!empty($_POST["disable_user"])) {
    if (!$user->check_one_time_token($_POST["one_time_token"])) {
        $result_text = "【!】ワンタイムトークンが無効です。処理はキャンセルされました。";
        goto on_error;
    }
    
    if (!$user_obj->check_permission("control_panel_user") || ($moderator_is_admin && $user_id !== $moderator_id)) {
        $user_obj->set_status(WAKARANA_STATUS_DISABLE);
        $result_text = "ユーザーアカウントを停止しました";
    } else {
        $result_text = "【!】このユーザーのアカウントを停止することはできません。";
    }
}

on_error:

if (!empty($result_text)) {
    print "<script> alert('".$result_text."'); </script>";
}


$user_is_moderator = $user_obj->check_permission("control_panel_user");


$token_html = "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";

print "<form action='user_data.php?user_id=".$user_id."' method='post' id='enable_form' style='display: none;'>";
print $token_html;
print "<input type='hidden' name='enable_user' value='yes'>";
print "</form>";

print "<form action='user_data.php?user_id=".$user_id."' method='post' id='disable_form' style='display: none;'>";
print $token_html;
print "<input type='hidden' name='disable_user' value='yes'>";
print "</form>";

print <<< EOM
<script>
function enable_user (railroad_id, railroad_name) {
    if (confirm("このユーザーのアカウントを有効化しますか？")) {
        document.getElementById("enable_form").submit();
    }
}

function disable_user (railroad_id, railroad_name) {
    if (confirm("このユーザーのアカウントを停止しますか？")) {
        document.getElementById("disable_form").submit();
    }
}
</script>
EOM;


print "<h3>基本情報</h3>";

print "<div class='key_and_value'><b>ユーザー識別名</b>".$user_id."</div>";

$user_name = $user_obj->get_name();
print "<div class='key_and_value'><b>ハンドルネーム</b>".(!empty($user_name) ? htmlspecialchars($user_name) : "(未設定)")."</div>";

$user_status = $user_obj->get_status();
print "<div class='key_and_value'><b>状態</b><span style='color: ".($user_status === WAKARANA_STATUS_NORMAL ? "#33cc99;'>有効" : "#ee3333;'>停止中")."</span>";
if (!$user_is_moderator || ($moderator_is_admin && $user_id !== $moderator_id)) {
    print "<div><button type='button' onclick='".($user_status === WAKARANA_STATUS_NORMAL ? "disable_user(\"".$user_id."\");'>アカウントの停止" : "enable_user(\"".$user_id."\");'>アカウントの有効化")."</button></div>";
}
print "</div>";

print "<div class='key_and_value'><b>ユーザー登録日時</b>".$user_obj->get_created()."</div>";

print "<div class='key_and_value'><b>ユーザー情報更新日時</b>".$user_obj->get_last_updated()."</div>";

print "<div class='key_and_value'><b>最終アクセス日時</b>".$user_obj->get_last_access()."</div>";

$email_address = $user_obj->get_primary_email_address();
print "<div class='key_and_value'><b>メールアドレス</b>".(!empty($email_address) ? htmlspecialchars($email_address) : "(未設定)")."</div>";

$website_url = $user_obj->get_value("website_url");
print "<div class='key_and_value'><b>webサイトのURL</b>".(!empty($website_url) ? "<a href='".addslashes($website_url)."' target='_blank'>".htmlspecialchars($website_url)."</a>" : "(未設定)")."</div>";

print "<div class='key_and_value'><b>通算投稿日数</b>".intval($user_obj->get_value("days_posted"))."</div>";

print "<div class='key_and_value'><b>累計投稿数</b>".intval($user_obj->get_value("post_count"))."</div>";

$last_posted_date = $user_obj->get_value("last_posted_date");
print "<div class='key_and_value'><b>最終投稿日</b>".(!empty($last_posted_date) ? $last_posted_date : "N/A")."</div>";


print "<h3>割り当て済みのロール</h3>";

print "<table>";
foreach ($user_obj->get_roles() as $role) {
    print "<tr><td>".htmlspecialchars($role->get_name())." (".$role->get_id().")</td></tr>";
}
print "</table>";


print "<h3>タイムアウト</h3>";

$moderation_db_obj = new SQLite3("../common_dbs/moderation.db");
$moderation_db_obj->busyTimeout(5000);

$now_ts = time();
$now_datetime = date("Y-m-d H:i:s", $now_ts);

$time_out_expiration = $moderation_db_obj->querySingle("SELECT `expiration_datetime` FROM `unyohub_moderation_timed_out_users` WHERE `user_id` = '".$user_id."' AND `expiration_datetime` > '".$now_datetime."'");

print "<div class='key_and_value'><b>現在の状態</b>".(empty($time_out_expiration) ? "タイムアウトなし" : "<span style='color: #ee7700;'>タイムアウト中 (残 ".(ceil((strtotime($time_out_expiration) - $now_ts) / 86400))."日)</span>").(!$user_is_moderator ? "<div><button type='button' onclick='location.href = \"/admin/time_out_user.php?user_id=".$user_id."\";'>タイムアウトの設定</button></div>" : "")."</div>";

$logs_r = $moderation_db_obj->query("SELECT `timed_out_datetime`, `moderator_id`, `timed_out_days` FROM `unyohub_moderation_user_timed_out_logs` WHERE `user_id` = '".$user_id."' ORDER BY `timed_out_datetime` DESC LIMIT 5");

print "<h4>タイムアウト履歴</h4>";

$time_out_log_exists = FALSE;
print "<div class='informational_text'>";
while ($log_data = $logs_r->fetchArray(SQLITE3_ASSOC)) {
    if ($time_out_log_exists) {
        print "<br>";
    }
    
    if ($log_data["moderator_id"] !== "#") {
        $moderator = $wakarana->get_user($log_data["moderator_id"]);
        
        $moderator_info = "モデレーター : ".(is_object($moderator) ? $moderator->get_name() : "存在しないユーザー");
    } else {
        $moderator_info = "コマンドライン";
    }
    
    print $log_data["timed_out_datetime"]." から ".$log_data["timed_out_days"]."日間 (".addslashes($moderator_info).")";
    
    $time_out_log_exists = TRUE;
}
if (!$time_out_log_exists) {
    print "(なし)";
}
print "</div>";

non_existent_user:


print "</article>";


print_footer();
