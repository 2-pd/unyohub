<?php
include "user_common.php";

print_header("パスワードの変更");
?>
    <h2>パスワードの変更</h2>
    <script>
        var uppercase_regexp = /[A-Z]/;
        var lowercase_regexp = /[a-z]/;
        var number_regexp = /[0-9]/;
        
        function check_password (password_string) {
            var result_elm = document.getElementById("password_check_result");
            
            if (password_string.length < 10) {
                result_elm.innerText = "パスワードは10文字以上必要です";
                result_elm.className = "warning_text";
                return;
            }
            
            if (!(uppercase_regexp.test(password_string) && lowercase_regexp.test(password_string) && number_regexp.test(password_string))) {
                result_elm.innerText = "パスワードには大文字・小文字・数字を全て使用してください";
                result_elm.className = "warning_text";
                return;
            }
            
            result_elm.innerText = "使用可能なパスワードです";
            result_elm.className = "informational_text";
        }
    </script>
<?php
$wakarana = new wakarana("../config");

$user = $wakarana->check();
if (is_object($user)) {
    if (isset($_POST["old_password"], $_POST["new_password"])) {
        if ($user->check_password($_POST["old_password"])) {
            if ($user->set_password($_POST["new_password"])) {
                print "    <script> alert('パスワードを変更しました'); window.close(); </script>\n";
            } else {
                if ($user->get_rejection_reason() === "weak_password") {
                    print "    <div class=\"warning_text\">パスワードは大文字・小文字・数字を全て含む10文字以上を設定してください</div>\n";
                } else {
                    print "    <div class=\"warning_text\">パスワードの変更に失敗しました</div>\n";
                }
            }
        } else {
            print "    <div class=\"warning_text\">現在のパスワードが間違っています</div>\n";
        }
    }
    
    print "    <form action=\"change_password.php\" method=\"post\" id=\"change_password_form\">\n";
    print "        <h4>現在のパスワード</h4>\n";
    print "        <input type=\"password\" name=\"old_password\" autocomplete=\"current-password\">\n";
    print "        <h4>新しいパスワード</h4>\n";
    print "        <div class=\"informational_text\">大文字・小文字・数字を全て使用してください。</div>\n";
    print "        <input type=\"password\" name=\"new_password\" autocomplete=\"new-password\" onkeyup=\"check_password(this.value);\">\n";
    print "        <div id=\"password_check_result\" class=\"informational_text\">パスワードは10文字以上必要です</div>\n";
    print "        <br>\n";
    print "        <button type=\"button\" class=\"wide_button\" onclick=\"this.disabled = true; document.getElementById('change_password_form').submit();\">保存</button>\n";
    print "    </form>\n";
} else {
    print "    <div class=\"warning_text\">ログイン情報の有効期限が切れています。再ログインしてください</div>\n";
}

print_footer();
