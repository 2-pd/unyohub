<?php
include "user_common.php";

if (isset($_POST["user_id"], $_POST["email_address"], $_POST["zizai_captcha_id"], $_POST["zizai_captcha_characters"])) {
    $wakarana = new wakarana("../config");
    $zizai_captcha = new zizai_captcha("../../config/zizai_captcha_config.json");
    
    $error_list = array();
    
    if (!$zizai_captcha->check($_POST["zizai_captcha_id"], $_POST["zizai_captcha_characters"])) {
        $error_list[] = "画像認証が正しくありません";
    } else {
        $user = $wakarana->get_user($_POST["user_id"]);
        
        if (!is_object($user)) {
            $error_list[] = "存在しないユーザーIDです";
        } elseif ($_POST["email_address"] !== $user->get_primary_email_address()) {
            $error_list[] = "ユーザーIDに紐付けられたメールアドレスではありません";
        }
    }
    
    if (empty($error_list)) {
        mb_send_mail($_POST["email_address"], "ログインパスワードのリセット - ".$main_config["instance_name"], $main_config["instance_name"]."のログインパスワードをリセットするには以下のURLにアクセスしてください。\n\n".(empty($_SERVER["HTTPS"]) ? "http://" : "https://").$_SERVER["HTTP_HOST"].dirname($_SERVER["REQUEST_URI"])."/reset_password.php?reset_token=".$user->create_password_reset_token(), "From: ".$main_config["sender_email_address"]);
        
        print_header();
        
        print <<< EOM
            パスワードリセットメールを送信しました。<br>
            メールを確認し、本文に記載のURLにアクセスしてください。
            <div class="link_block">
                <a href="javascript:void(0);" onclick="window.close();">閉じる</a>
            </div>
        
        EOM;
        
        goto footer;
    }
}

print_header("パスワードのリセット", TRUE);

?>
    <script>
        function submit_form () {
            document.getElementById("submit_button").disabled = true;
            document.getElementById("send_email_form").submit();
        }
    </script>
    <form action="send_password_reset_email.php" method="post" id="send_email_form" onsubmit="return false;">
        <input type="hidden" name="accept_rules" id="accept_rules_input" value="<?php if (!empty($_POST["accept_rules"]) && $_POST["accept_rules"] === "YES") { print "YES"; } ?>">
        
        <h2>パスワードのリセット</h2>
        
        <div class="warning_text"><?php
        for ($cnt = 0; isset($error_list[$cnt]); $cnt++) {
            print "・".htmlspecialchars($error_list[$cnt])."<br>\n";
        }
        ?></div>
        
        <div class="informational_text">登録済みのメールアドレスを使用してパスワードを再発行することができます。</div>
        
        <h3>ユーザーID</h3>
        <input type="text" name="user_id" autocomplete="username" value="<?php if (isset($_POST["user_id"])) { print addslashes($_POST["user_id"]); } ?>">
        
        <h3>メールアドレス</h3>
        <input type="text" name="email_address" autocomplete="email" value="<?php if (isset($_POST["email_address"])) { print addslashes($_POST["email_address"]); } ?>">
        
        <h3>画像認証</h3>
        <div class="informational_text">画像に表示されている文字を入力してください。</div>
        <div id="zizai_captcha_area"></div>
        
        <script> zizai_captcha_get_html(function (html) { document.getElementById("zizai_captcha_area").innerHTML = html; }); </script>
        
        <br>
        <button type="button" id="submit_button" class="wide_button" onclick="submit_form();">パスワードリセットメールの送信</button>
    </form>
<?php

footer:
print_footer();
