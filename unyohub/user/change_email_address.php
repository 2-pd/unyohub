<?php
include "user_common.php";

print_header("メールアドレスの変更");

?>
    <script>
        function send_verification_email () {
            var send_email_button = document.getElementById("send_email_button");
            send_email_button.disabled = true;
            
            setTimeout(function () {
                send_email_button.disabled = false;
            }, 5000);
            
            var ajax_request = new XMLHttpRequest();
            
            ajax_request.onloadend = function () {
                if (ajax_request.responseText === "SUCCEEDED") {
                    alert("入力されたメールアドレスに確認メールを送信しました。メールをご確認のうえ、本文に記載の確認コードをフォームにご入力ください");
                } else {
                    alert(ajax_request.responseText);
                }
            };
            
            ajax_request.open("POST", "send_verification_email.php", true);
            ajax_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            ajax_request.timeout = 5000;
            ajax_request.send("email_address=" + encodeURIComponent(document.getElementById("email_address").value).replace(/%20/g, "+"));
        }
    </script>
<?php

$wakarana = new wakarana("../config");

$user = $wakarana->check();
if (is_object($user)) {
    $email_address = "";
    
    if (isset($_POST["email_address"], $_POST["verification_code"], $_POST["one_time_token"])) {
        $email_address = addslashes($_POST["email_address"]);
        
        if (!$user->check_one_time_token($_POST["one_time_token"])) {
            print "    <div class=\"warning_text\">ワンタイムトークンの認証に失敗しました。再度ご送信ください</div>\n";
        } elseif (!$wakarana->check_email_address($_POST["email_address"])) {
            print "    <div class=\"warning_text\">使用できないメールアドレスです</div>\n";
        } elseif (!empty($wakarana->search_users_with_email_address($_POST["email_address"]))) {
            print "    <div class=\"warning_text\">既に使用されているメールアドレスです</div>\n";
        } elseif (!$user->email_address_verify($_POST["email_address"], $_POST["verification_code"], TRUE)) {
            print "    <div class=\"warning_text\">正しいメールアドレス確認コードを入力してください</div>\n";
        } else {
            $user->remove_all_email_addresses();
            $user->add_email_address($_POST["email_address"]);
            
            print "    <script>\n";
            print "        window.opener.update_email_address(\"".$email_address."\");\n";
            print "        alert('メールアドレスを変更しました');\n";
            print "        window.close();\n";
            print "    </script>\n";
        }
    }
    
    print "    <form action=\"change_email_address.php\" method=\"post\" id=\"change_email_address_form\">\n";
    print "        <input type=\"hidden\" name=\"one_time_token\" value=\"".$user->create_one_time_token()."\">\n";
    print "        <h4>新しいメールアドレス</h4>\n";
    print "        <div class=\"informational_text\">メールアドレスの変更には確認メールの送信が必要です。新しいメールアドレスを入力後、確認メール送信ボタンを押して確認コードを発行してください。</div>\n";
    print "        <input type=\"text\" name=\"email_address\" id=\"email_address\" value=\"".$email_address."\" autocomplete=\"email\">\n";
    print "        <button type=\"button\" id=\"send_email_button\" class=\"execute_button\" onclick=\"send_verification_email();\">確認メール送信</button>\n";
    print "        <h4>確認コード</h4>\n";
    print "        <div class=\"informational_text\">確認メールに記載された8桁の確認コード(大文字小文字区別なし)を入力してください。</div>\n";
    print "        <input type=\"text\" name=\"verification_code\" autocomplete=\"off\">\n";
    print "        <br>\n";
    print "        <button type=\"button\" class=\"wide_button\" onclick=\"this.disabled = true; document.getElementById('change_email_address_form').submit();\">メールアドレスを変更</button>\n";
    print "    </form>\n";
} else {
    print "    <div class=\"warning_text\">ログイン情報の有効期限が切れています。アプリを再起動してください</div>\n";
}

print_footer();
