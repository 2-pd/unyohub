<?php
include "integration_common.php";

print_header("運用情報の投稿");

?>
    <h1>運用情報の投稿</h1>
    <article>
        <div id="login_status">サーバに接続しています...</div>
        
    </article>
    <script>
        function update_user_data (user_data) {
            document.getElementById("login_status").innerHTML = "<b>" + escape_html(user_data["user_name"]) + "</b>さんとしてログイン中<br><a href='javascript:void(0);' onclick='user_logout(on_guest_mode);'>ログアウト</a>";
        }
        
        function on_guest_mode () {
            document.getElementById("login_status").innerHTML = "<b>ゲストユーザー</b>としてアクセス中<br><a href='javascript:void(0);' onclick='show_login_form(update_user_data);'>ログイン</a>　<a href='javascript:void(0);' onclick='open_child_page(\"/user/sign_up.php?is_child_page=yes\");'>新規登録</a>";
        }
        
        window.addEventListener("load", function () { check_logged_in(update_user_data, on_guest_mode, function () {  document.getElementById("login_status").innerHTML = "ログイン状態の確認に失敗しました"; }); });
    </script>
<?php
print_footer();
