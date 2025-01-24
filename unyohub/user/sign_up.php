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
    } elseif (!wakarana::check_id_string($_POST["user_id"])) {
        $error_list[] = "ユーザーIDに使用できない文字が含まれています";
    } elseif (is_object($wakarana->get_user($_POST["user_id"]))) {
        $error_list[] = "既に他のユーザーが使用しているユーザーIDです";
    }
    
    if (!wakarana::check_password_strength($_POST["password"])) {
        $error_list[] = "パスワードは大文字・小文字・数字を全て含む10文字以上を設定してください";
    }
    
    if ($main_config["require_email_address"] && empty($error_list) && !$wakarana->email_address_verify($_POST["email_address"], $_POST["verification_code"])) {
        $error_list[] = "正しいメールアドレス確認コードを入力してください";
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
            $error_list[] = "ユーザーの登録に失敗しました";
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
        <div class="informational_text">半角英数字とアンダーバーの組み合わせで5文字以上が利用可能です。</div>
        <input type="text" name="user_id" autocomplete="username" value="<?php if (isset($_POST["user_id"])) { print addslashes($_POST["user_id"]); } ?>">
        
        <h3>ハンドルネーム</h3>
        <input type="text" name="user_name" autocomplete="nickname" value="<?php if (isset($_POST["user_name"])) { print addslashes($_POST["user_name"]); } ?>">
        
        <h3>パスワード</h3>
        <div class="informational_text">大文字・小文字・数字を全て含む10文字以上を設定してください。</div>
        <input type="password" name="password" autocomplete="new-password">
        
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
