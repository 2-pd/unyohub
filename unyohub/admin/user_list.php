<?php
include "admin_common.php";

if (!$user->check_permission("railroads", "moderate")) {
    print "【!】アクセス中のユーザーアカウントにはこのページにアクセスする権限がありません";
    exit;
}

$moderator_id = $user->get_id();


print_header();


print <<<EOM
<script>
function change_parameter (key, val) {
    var url = new URL(location.href);
    url.searchParams.delete("page");
    url.searchParams.set(key, val);
    location.href = url.toString();
}
</script>
EOM;


print "<article>";

print "<h2>ユーザーの一覧</h2>";


if (empty($_GET["sorting_criteria"])) {
    $order_by = "user_created";
} else {
    $available_criteria = array("user_created", "user_id", "user_name", "time_out_expiration");
    if (array_search($_GET["sorting_criteria"], $available_criteria) !== FALSE) {
        $order_by = $_GET["sorting_criteria"];
    } else {
        $order_by = "user_created";
    }
}

if (isset($_GET["order"]) && $_GET["order"] === "desc") {
    $asc = FALSE;
} else {
    $asc = TRUE;
}

if (isset($_GET["page"])) {
    $page_number = intval($_GET["page"]);
    
    if ($page_number <= 0) {
        $page_number = 1;
    }
} else {
    $page_number = 1;
}


print "<div class='half_input_wrapper'>";

print "<select onchange='change_parameter(\"sorting_criteria\", this.value);'>";
print "<option value='user_created'".($order_by === "user_created" ? " selected='selected'" : "").">登録日</option>";
print "<option value='user_id'".($order_by === "user_id" ? " selected='selected'" : "").">ユーザーID</option>";
print "<option value='user_name'".($order_by === "user_name" ? " selected='selected'" : "").">ハンドルネーム</option>";
print "<option value='time_out_expiration'".($order_by === "time_out_expiration" ? " selected='selected'" : "").">タイムアウト期限</option>";
print "</select>";

print "<div class='radio_area'><label value='asc' ".($asc ? "class='selected_label'" : "onclick='change_parameter(\"order\", \"asc\");'").">昇順</label><label value='desc' ".($asc ? "onclick='change_parameter(\"order\", \"desc\");'" : "class='selected_label'").">降順</label></div>";

print "</div>";


$now_ts = time();
$now_datetime = date("Y-m-d H:i:s", $now_ts);

$moderation_db_obj = new SQLite3("../common_dbs/moderation.db");
$moderation_db_obj->busyTimeout(5000);

$timed_out_users_r = $moderation_db_obj->query("SELECT * FROM `unyohub_moderation_timed_out_users` WHERE `expiration_datetime` >= '".$now_datetime."' ORDER BY `expiration_datetime` ".($asc ? "ASC" : "DESC"));

$time_out_expirations = array();
while ($timed_out_user_data = $timed_out_users_r->fetchArray(SQLITE3_ASSOC)) {
    $time_out_expirations[$timed_out_user_data["user_id"]] = $timed_out_user_data["expiration_datetime"];
}


$max = $page_number * 100;
$start = $max - 100;

if ($order_by !== "time_out_expiration") {
    $users = $wakarana->get_all_users($start, 100, $order_by, $asc);
    $user_count = $wakarana->count_user();
} else {
    $users = array();
    foreach (array_keys($time_out_expirations) as $user_id) {
        $user_obj = $wakarana->get_user($user_id);
        if (is_object($user_obj)) {
            $users[] = $user_obj;
        }
    }
    $user_count = count($users);
}


print "<div class='descriptive_text'><b>".$user_count."</b>人中 <b>".($start + 1)."</b>人目から<b>".($max <= $user_count ? $max : $user_count)."</b>人目まで表示中</div>";

print "<table class='user_list'>";
print "<tr><th>ユーザーID<br>ハンドルネーム</th><th>登録日<br>最終アクセス</th><th>状態</th></tr>";
foreach ($users as $user_obj) {
    $user_id = $user_obj->get_id();
    print "<tr onclick='location.href=\"user_data.php?user_id=".$user_id."\";'><td><b>".$user_id.($user_id === $moderator_id ? "<small>(自分)</small>" : "")."</b><br>".htmlspecialchars($user_obj->get_name())."</td><td>".substr($user_obj->get_created(), 0, 10)."<br>".substr($user_obj->get_last_access(), 0, 10)."</td><td><span style='color: ";
    if ($user_obj->get_status() === WAKARANA_STATUS_NORMAL) {
        print !array_key_exists($user_id, $time_out_expirations) ? "#33cc99;'>有効" : "#ee7700;'>TO中<br><small>残</small>".(ceil((strtotime($time_out_expirations[$user_id]) - $now_ts) / 86400))."日";
    } else {
        print "#ee3333;'>停止中";
    }
    print "</td></tr>";
}
print "</table>";


if ($order_by !== "time_out_expiration") {
    $max_page_number = ceil($user_count / 100);

    print "<div class='page_link_area'>";

    if ($page_number >= 4) {
        print "<a href='javascript:void(0);' onclick='change_parameter(\"page\", 1);'>&lt;&lt;</a>";
    }

    $page_link_limit = min($max_page_number, $page_number + 2);
    for ($cnt = max(1, $page_number - 2); $cnt <= $page_link_limit; $cnt++) {
        if ($cnt === $page_number) {
            print "<b>".$page_number."</b>";
        } else {
            print "<a href='javascript:void(0);' onclick='change_parameter(\"page\", ".$cnt.");'>".$cnt."</a>";
        }
    }

    if ($page_number <= $max_page_number - 3) {
        print "<a href='javascript:void(0);' onclick='change_parameter(\"page\", ".$max_page_number.");'>&gt;&gt;</a>";
    }

    print "</div>";
}


print "</article>";


print_footer();
