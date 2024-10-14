<?php
include "user_common.php";

print_header("パスワードの変更");

print "    <h2>パスワードの変更</h2>\n";

$wakarana = new wakarana("../config");

$user = $wakarana->check();
if (is_object($user)) {
    if (isset($_POST["old_password"], $_POST["new_password"])) {
        if ($user->check_password($_POST["old_password"])) {
            if (wakarana::check_password_strength($_POST["new_password"])) {
                $user->set_password($_POST["new_password"]);
                
                print "    <script> alert('パスワードを変更しました'); window.close(); </script>\n";
            } else {
                print "    <div class=\"warning_text\">パスワードは大文字・小文字・数字を全て含む10文字以上を設定してください</div>\n";
            }
        } else {
            print "    <div class=\"warning_text\">現在のパスワードが間違っています</div>\n";
        }
    }
    
    print "    <form action=\"change_password.php\" method=\"post\" id=\"change_password_form\">\n";
    print "        <h4>現在のパスワード</h4>\n";
    print "        <input type=\"password\" name=\"old_password\" autocomplete=\"current-password\">\n";
    print "        <h4>新しいパスワード</h4>\n";
    print "        <input type=\"password\" name=\"new_password\" autocomplete=\"new-password\">\n";
    print "        <br>\n";
    print "        <button type=\"button\" class=\"wide_button\" onclick=\"this.disabled = true; document.getElementById('change_password_form').submit();\">保存</button>\n";
    print "    </form>\n";
} else {
    print "    <div class=\"warning_text\">ログイン情報の有効期限が切れています。再ログインしてください</div>\n";
}

print_footer();
