<?php
include "user_config_common.php";

if (isset($_POST["user_id"], $_POST["password"], $_POST["user_name"], $_POST["zizai_captcha_id"], $_POST["zizai_captcha_characters"])) {
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
    
    if (empty($error_list)) {
        $user = $wakarana->add_user($_POST["user_id"], $_POST["password"], $_POST["user_name"]);
        
        if (is_object($user)) {
            $user->set_login_token();
            
            print_header();
            
            $data = array();
    
            $data["user_id"] = $user->get_id();
            $data["user_name"] = $user->get_name();
            $data["created"] = $user->get_created();
            $data["role"] = "BASE";
            $data["is_beginner"] = TRUE;
            $data["email_address"] = NULL;
            $data["website_url"] = NULL;
            
            print "<script>\n";
            print "var user_data = ".json_encode($data, JSON_UNESCAPED_UNICODE).";\n";
            print "window.opener.update_user_data(user_data);\n";
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

print_header(TRUE);

?>
        <form action="sign_up.php" method="post">
            <h2>新規ユーザー登録</h2>
            
            <div class="warning_text"><?php
            for ($cnt = 0; isset($error_list[$cnt]); $cnt++) {
                print "・".htmlspecialchars($error_list[$cnt])."<br>\n";
            }
            ?></div>
            
            <h3>ユーザーID</h3>
            <div class="informational_text">半角英数字とアンダーバーの組み合わせで5文字以上が利用可能です。</div>
            <input type="text" name="user_id" autocomplete="username" value="<?php if (isset($_POST["user_id"])) { print addslashes($_POST["user_id"]); } ?>">
            
            <h3>ハンドルネーム</h3>
            <input type="text" name="user_name" autocomplete="nickname" value="<?php if (isset($_POST["user_name"])) { print addslashes($_POST["user_name"]); } ?>">
            
            <h3>パスワード</h3>
            <div class="informational_text">大文字・小文字・数字を全て含む10文字以上を設定してください。</div>
            <input type="password" name="password" autocomplete="new-password">
            
            <h3>画像認証</h3>
            <div class="informational_text">画像に表示されている文字を入力してください。</div>
            <div id="zizai_captcha_area"></div>
            
            <script> zizai_captcha_get_html(function (html) { document.getElementById("zizai_captcha_area").innerHTML = html; }); </script>
            
            <br>
            <button type="submit" class="wide_button">ユーザー登録</button>
        </form>
<?php

footer:
print_footer();
