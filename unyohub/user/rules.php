<?php
include "user_common.php";

if (empty($_GET["railroad_id"])) {
    $railroad_info = NULL;
    $rule_path = "../config/rules.txt";
    
    print_header("ルールとポリシー", FALSE);
} else {
    $railroad_id = basename($_GET["railroad_id"]);
    $railroad_info = @json_decode(file_get_contents("../data/".$railroad_id."/railroad_info.json"), TRUE);
    
    if (empty($railroad_info)) {
        print_header("投稿ルール");
        print "【!】利用できない路線系統です";
        
        goto footer;
    }
    
    print_header($railroad_info["railroad_name"]."の投稿ルール", FALSE);
    
    $rule_path = "../data/".$railroad_id."/rules.txt";
    
    $railroad_name = htmlspecialchars($railroad_info["railroad_name"]);
}

if (!empty($_GET["show_accept_button"])) {
    if (empty($railroad_info)) {
        print <<< EOM
            <div id="rules_info" class="warning_text">
                本サービスでは新規のユーザー様にご利用ルールの確認をお願いしています。<br>
                <br>
                次の操作に移るボタンはルール本文の下部にあります。
            </div>
        
        EOM;
    } else {
        print <<< EOM
            <div id="rules_info" class="warning_text">
                ご利用の端末から {$railroad_name} に投稿いただくのは初めてのようです。<br>
                <br>
                お手数ですが、投稿前にこの路線系統の投稿ルールをご確認願います。
            </div>
        
        EOM;
    }
}

print "    <h2>".(empty($railroad_info) ? "ルールとポリシー" : $railroad_name."の投稿ルール")."</h2>\n";

if (file_exists($rule_path)) {
    $rule_content = file_get_contents($rule_path);
} else {
    $rule_content = "";
}

$heading_list = array();
$heading_cnt = 0;
if (!empty($rule_content)) {
    if (!empty($railroad_info)) {
        print "    <div class=\"informational_text\">この路線系統では<a href=\"rules.php?show_back_button=yes\">".htmlspecialchars($main_config["instance_name"])."全体の投稿ルール</a>に加え、以下のルールが適用されます。</div>\n";
    }
    
    $buf = "";
    
    $rules_split = explode("\n", preg_replace("/(https?:\/\/[^\s\\\\`\|\[\]\{\}\^]+)/u", "<a href=\"$1\" target=\"_blank\" class=\"external_link\">$1</a>", htmlspecialchars($rule_content)));
    foreach ($rules_split as $rules_line) {
        if (substr($rules_line, 0, 2) === "# ") {
            $heading_list[] = rtrim(substr($rules_line, 2));
            $buf .= "    <h4 id=\"heading_".$heading_cnt."\">".$heading_list[$heading_cnt]."</h4>\n";
            $heading_cnt++;
        } else {
            $buf .= "    ".rtrim($rules_line)."<br>\n";
        }
    }
} else {
    $buf = "    <div class=\"informational_text\">".(empty($railroad_info) ? "ルールとポリシーは設定されていません。" : "この路線系統の投稿ルールは<a href=\"rules.php?show_back_button=yes\">".htmlspecialchars($main_config["instance_name"]))."全体の投稿ルール</a>に準じます。</div>\n";
}

if ($heading_cnt >= 1) {
    print "    <h4>目次</h4>\n";
    print "    <ul>\n";
    
    for ($cnt = 0; $cnt < $heading_cnt; $cnt++) {
        print "        <li><a href=\"#heading_".$cnt."\">".$heading_list[$cnt]."</a></li>\n";
    }
    
    print "    </ul>\n";
}

print $buf;

if (!empty($_GET["show_accept_button"])) {
    print "    <button type=\"button\" class=\"wide_button\" onclick=\"window.opener.accept_rules(); window.close();\">ルールに同意して続行</button>\n";
} elseif (!empty($_GET["show_back_button"])) {
    print "    <button type=\"button\" class=\"back_button\" onclick=\"history.back();\">戻る</button>\n";
}

footer:
print_footer();
