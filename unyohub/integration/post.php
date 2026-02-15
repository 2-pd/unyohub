<?php
include "integration_common.php";
include "../api/__operation_data_functions.php";

print_header("運用情報の投稿");
?>
    <h1>運用情報の投稿</h1>
    <article>
<?php
if (!isset($_GET["railroad_id"], $_GET["date"], $_GET["operation_number"])) {
    print "ERROR: 機能を利用するために必要なパラメータが送信されていません";
    goto footer;
}


if (!load_railroad_data($_GET["railroad_id"])) {
    goto footer;
}


$ts = strtotime($_GET["date"]);

if ($ts === FALSE) {
    print "ERROR: 日付が不正です";
    goto footer;
}

$ts_now = time();

if ($ts < $ts_now - 187200) {
    print "ERROR: 2日以上前の運用情報を投稿することはできません";
    goto footer;
}

if ($ts > $ts_now + (86400 * $main_config["available_days_ahead"]) - 14400) {
    print "ERROR: ".($main_config["available_days_ahead"] + 1)."日以上先の運用情報を投稿することはできません";
    goto footer;
}


update_diagram_revision($ts);

$operation_data = get_operation_info($ts, $_GET["operation_number"]);

if (empty($operation_data)) {
    goto footer;
}
?>
        <div id="login_status">サーバに接続しています...</div>
        <div id="form_area">
<?php
print "            <h2>".htmlspecialchars($_GET["operation_number"])."運用</h2>\n";
?>
        </div>
        <div id="require_login_text" class="warning_text" style="display: none;">情報投稿にはログインが必要です。<br>ユーザーアカウントをまだ作成されていない場合は新規登録してください。</div>
    </article>
    <script>
        function update_user_data (user_data) {
            document.getElementById("login_status").innerHTML = "<b>" + escape_html(user_data["user_name"]) + "</b>さんとしてログイン中<br><a href='javascript:void(0);' onclick='user_logout(on_guest_mode);'>ログアウト</a>";
<?php
if (!$main_config["allow_guest_user"]) {
    print "            document.getElementById(\"form_area\").style.display = \"block\";\n";
    print "            document.getElementById(\"require_login_text\").style.display = \"none\";\n";
}
?>
        }
        
        function on_guest_mode () {
            document.getElementById("login_status").innerHTML = "<b>ゲストユーザー</b>としてアクセス中<br><a href='javascript:void(0);' onclick='show_login_form(update_user_data);'>ログイン</a>　<a href='javascript:void(0);' onclick='open_child_page(\"/user/sign_up.php?is_child_page=yes\");'>新規登録</a>";
<?php
if (!$main_config["allow_guest_user"]) {
    print "            document.getElementById(\"form_area\").style.display = \"none\";\n";
    print "            document.getElementById(\"require_login_text\").style.display = \"block\";\n";
}
?>
        }
        
        window.addEventListener("load", function () { check_logged_in(update_user_data, on_guest_mode, function () {  document.getElementById("login_status").innerHTML = "ログイン状態の確認に失敗しました"; }); });
    </script>
<?php
footer:
print_footer();
