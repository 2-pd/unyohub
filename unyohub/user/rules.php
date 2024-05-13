<?php
include "user_common.php";

print_header("ルールとポリシー");

if (!empty($_GET["show_accept_button"])) {
    print <<< EOM
        <div id="rules_info" class="warning_text">
            本アプリケーションでは新規のユーザー様にご利用ルールの確認をお願いしています。<br>
            <br>
            次の操作に移るボタンはルール本文の下部にあります。
        </div>
    
    EOM;
}

print "    <h2>ルールとポリシー</h2>\n";

$rules_split = explode("\n", preg_replace("/(https?:\/\/[^\s\\\\`\|\[\]\{\}\^]+)/u", "<a href='$1' target='_blank' class='external_link'>$1</a>", htmlspecialchars(file_get_contents("../rules.txt"))));

foreach ($rules_split as $rules_line) {
    if (substr($rules_line, 0, 2) === "# ") {
        print "    <h4>".substr($rules_line, 2)."</h4>\n";
    } else {
        print "    ".$rules_line."<br>\n";
    }
}

if (!empty($_GET["show_accept_button"])) {
    print "    <button type=\"button\" class=\"wide_button\" onclick=\"window.opener.accept_rules(); window.close();\">ルールに同意して続行</button>\n";
}

print_footer();
