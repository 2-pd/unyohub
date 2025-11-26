<?php
include "user_common.php";

if (isset($_POST["user_id"], $_POST["password"], $_POST["user_name"], $_POST["zizai_captcha_id"], $_POST["zizai_captcha_characters"], $_POST["accept_rules"]) && $_POST["accept_rules"] === "YES") {
    $wakarana = new wakarana("../config");
    $zizai_captcha = new zizai_captcha("../../config/zizai_captcha_config.json");
    
    $error_list = array();
    
    if (!$zizai_captcha->check($_POST["zizai_captcha_id"], $_POST["zizai_captcha_characters"])) {
        $error_list[] = "画像認証が正しくありません";
    }
    
    if (strlen($_POST["user_id"]) < 5) {
        $error_list[] = "ユーザーIDは5文字以上必要です";
    }
    
    if ($main_config["require_email_address"] && empty($error_list) && !$wakarana->email_address_verify($_POST["email_address"], $_POST["verification_code"])) {
        switch ($user->get_rejection_reason()) {
            case "invalid_email_address":
                $error_list[] = "正しいメールアドレスではありません";
                break;
            case "blacklisted_email_domain":
                $error_list[] = "使用できないメールアドレスです";
                break;
            case "email_address_already_exists":
                $error_list[] = "既に使用されているメールアドレスです";
                break;
            case "parameters_not_matched":
                $error_list[] = "無効なメールアドレス確認コードです";
                break;
            default:
                $error_list[] = "メースアドレス確認コードの照合に失敗しました";
        }
    }
    
    if (empty($error_list)) {
        $user = $wakarana->add_user($_POST["user_id"], $_POST["password"], $_POST["user_name"]);
        
        if (is_object($user)) {
            if ($main_config["require_email_address"]) {
                $user->add_email_address($_POST["email_address"]);
            }
            
            $user->set_login_token();
            
            print_header();
            
            $data = array();
    
            $data["user_id"] = $user->get_id();
            $data["user_name"] = $user->get_name();
            $data["created"] = $user->get_created();
            $data["is_control_panel_user"] = FALSE;
            $data["is_management_member"] = FALSE;
            $data["is_beginner"] = TRUE;
            $data["website_url"] = NULL;
            
            print "<script>\n";
            print "var user_data = ".json_encode($data, JSON_UNESCAPED_UNICODE).";\n";
            print "window.opener.update_user_data(user_data);\n";
            print "window.opener.popup_close(true);\n";
            print "window.opener.mes('ユーザー登録が完了しました');\n";
            print "window.close();\n";
            print "</script>\n";
            print "ユーザー登録が完了しました。\n";
            
            goto footer;
        } else {
            switch ($wakarana->get_rejection_reason()) {
                case "invalid_user_id":
                    $error_list[] = "ユーザーIDに使用できない文字が含まれています";
                    break;
                case "user_already_exists":
                    $error_list[] = "既に他のユーザーが使用しているユーザーIDです";
                    break;
                case "weak_password":
                    $error_list[] = "パスワードは大文字・小文字・数字を全て含む10文字以上を設定してください";
                    break;
                default:
                    $error_list[] = "ユーザーの登録に失敗しました";
            }
        }
    }
}

print_header("新規ユーザー登録", TRUE, TRUE);

?>
    <script>
        function accept_rules () {
            document.getElementById("accept_rules_input").value = "YES";
            submit_form();
        }
        
        function submit_form () {
            document.getElementById("submit_button").disabled = true;
            
            setTimeout(function () {
                document.getElementById("sign_up_form").submit();
            }, 10);
        }
        
        var id_regexp = /^[0-9A-Za-z_]+$/;
        var latest_request_id = null;
        
        function check_user_id (id_string) {
            let request_id = Date.now();
            latest_request_id = request_id;
            
            var result_elm = document.getElementById("user_id_check_result");
            
            if (id_string.length < 5) {
                result_elm.innerText = "ユーザーIDは5文字以上必要です";
                result_elm.className = "warning_text";
                return;
            }
            
            if (!id_regexp.test(id_string)) {
                result_elm.innerText = "ユーザーIDに使用できない文字が含まれています";
                result_elm.className = "warning_text";
                return;
            }
            
            result_elm.innerText = "IDが使用可能か確認しています...";
            result_elm.className = "informational_text";
            
            setTimeout(function () {
                if (request_id !== latest_request_id) {
                    return;
                }
                
                var ajax_request = new XMLHttpRequest();
                ajax_request.onloadend = function () {
                    if (ajax_request.responseText === "OK") {
                        result_elm.innerText = "使用可能なユーザーIDです";
                        result_elm.className = "informational_text";
                    } else {
                        if (ajax_request.status === 200) {
                            result_elm.innerText = ajax_request.responseText;
                        } else {
                            result_elm.innerText = "検証に失敗しました";
                        }
                        
                        result_elm.className = "warning_text";
                    }
                };
                
                ajax_request.open("POST", "/user/check_new_user_id.php", true);
                ajax_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                ajax_request.timeout = 10000;
                ajax_request.send("user_id=" + encodeURIComponent(id_string).replace(/%20/g, "+"));
            }, 1000);
        }
        
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
    <form action="sign_up.php" method="post" id="sign_up_form" onsubmit="return false;">
        <input type="hidden" name="accept_rules" id="accept_rules_input" value="<?php if (!empty($_POST["accept_rules"]) && $_POST["accept_rules"] === "YES") { print "YES"; } ?>">
        
        <h2>新規ユーザー登録</h2>
        
<?php
if (!empty($error_list)) {
    print "        <div class=\"warning_text\">\n";
    
    for ($cnt = 0; isset($error_list[$cnt]); $cnt++) {
        print "            ・".htmlspecialchars($error_list[$cnt])."<br>\n";
    }
    
    print "        </div>\n";
}
?>
        
        <h3>ユーザーID</h3>
        <div class="informational_text">半角英数字とアンダーバーが利用可能です。</div>
        <input type="text" name="user_id" autocomplete="username" value="<?php if (isset($_POST["user_id"])) { print addslashes($_POST["user_id"]); } ?>" onkeyup="check_user_id(this.value);">
        <div id="user_id_check_result" class="informational_text">ユーザーIDは5文字以上必要です</div>
        
        <h3>ハンドルネーム</h3>
        <div class="informational_text">ハンドルネームは運用情報を投稿した際の投稿者名として表示されます。</div>
        <input type="text" name="user_name" autocomplete="nickname" value="<?php if (isset($_POST["user_name"])) { print addslashes($_POST["user_name"]); } ?>">
        
        <h3>パスワード</h3>
        <div class="informational_text">大文字・小文字・数字を全て使用してください。</div>
        <input type="password" name="password" autocomplete="new-password" onkeyup="check_password(this.value);">
        <div id="password_check_result" class="informational_text">パスワードは10文字以上必要です</div>
        
<?php
if ($main_config["require_email_address"]) {
    print <<< EOM
            <h3>メールアドレス</h3>
            <div class="informational_text">メールアドレスを入力後、確認メール送信ボタンを押して確認コードを発行してください。</div>
            
    EOM;
    print "        <input type=\"text\" id=\"email_address\" name=\"email_address\" autocomplete=\"email\" value=\"";
    if (isset($_POST["email_address"])) {
        print addslashes($_POST["email_address"]);
    }
    print "\">\n";
    
    print <<< EOM
            <button type="button" id="send_email_button" class="execute_button" onclick="send_verification_email();">確認メール送信</button>
            
            <h4>確認コード</h4>
            <div class="informational_text">確認メールに記載された8桁の確認コード(大文字小文字区別なし)を入力してください。</div>
            
            <input type="text" name="verification_code" autocomplete="off">
            
    EOM;
}
?>
        
        <h3>画像認証</h3>
        <div class="informational_text">画像に表示されている文字を入力してください。</div>
        <div id="zizai_captcha_area"></div>
        
        <script> zizai_captcha_get_html(function (html) { document.getElementById("zizai_captcha_area").innerHTML = html; }); </script>
        
        <br>
        <button type="button" id="submit_button" class="wide_button" onclick="<?php print empty($_POST["accept_rules"]) ? "window.open('rules.php?show_accept_button=yes')" : "submit_form()" ?>;">ユーザー登録</button>
    </form>
<?php

footer:
print_footer();
