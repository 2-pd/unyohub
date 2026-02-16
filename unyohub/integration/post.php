<?php
include "integration_common.php";
include "../api/__operation_data_functions.php";

print_header("運用情報の投稿");
?>
    <h1>運用情報の投稿</h1>
    <article>
<?php
if (!isset($_GET["railroad_id"], $_GET["date"], $_GET["operation_number"])) {
    print "ERROR: 機能を利用するために必要なパラメータが送信されていません";
    goto footer;
}


$railroad_id = basename($_GET["railroad_id"]);

if (!load_railroad_data($railroad_id)) {
    goto footer;
}

$railroad_info = json_decode(file_get_contents("../data/".$railroad_id."/railroad_info.json"), TRUE);


$ts = strtotime($_GET["date"]);

if ($ts === FALSE) {
    print "ERROR: 日付が不正です";
    goto footer;
}

$ts_now = time();

if ($ts < $ts_now - 187200) {
    print "ERROR: 2日以上前の運用情報を投稿することはできません";
    goto footer;
}

if ($ts > $ts_now + (86400 * $main_config["available_days_ahead"]) - 14400) {
    print "ERROR: ".($main_config["available_days_ahead"] + 1)."日以上先の運用情報を投稿することはできません";
    goto footer;
}


update_diagram_revision($ts);

$operation_data = get_operation_info($ts, $_GET["operation_number"]);

if (empty($operation_data)) {
    goto footer;
}

if (!is_null($operation_data["starting_time"])) {
    $starting_time_ts = $ts + (intval(substr($operation_data["starting_time"], 0, 2)) * 3600) + (intval(substr($operation_data["starting_time"], 3)) * 60);
} else {
    $starting_time_ts = $ts;
}
?>
        <div id="login_status">サーバに接続しています...</div>
        <div id="form_area">
<?php
print "            <h2>".htmlspecialchars($_GET["operation_number"])."運用</h2>\n";

$alias_of_forward_direction = htmlspecialchars($railroad_info["alias_of_forward_direction"]);
?>
            
            <h3>確認方法</h3>
            <div class="radio_area"><input type="radio" name="identify_method" id="identify_method_direct" checked="checked"><label for="identify_method_direct" onclick="switch_identify_method(true);">直接確認</label><input type="radio" name="identify_method" id="identify_method_quote"><label for="identify_method_quote" onclick="switch_identify_method(false);">引用情報</label></div>
            
            <h3>編成名または車両形式</h3>
            <div class="informational_text"><b>◀ <?php print $alias_of_forward_direction; ?></b></div>
            <input type="text" id="operation_data_formation" autocomplete="off" oninput="suggest_formation(formation_data, this.value);" onblur="clear_formation_suggestion();"><div class="suggestion_area"><div id="formation_suggestion"></div></div>
            <div class="informational_text">複数の編成が連結している場合は、<?php print $alias_of_forward_direction; ?>の編成から順に「+」で区切って入力してください。<br>不明な編成には「不明」、運休情報は「運休」を入力可能です。</div>
            
            <input type="checkbox" id="operation_data_details"<?php if ($main_config["require_comments_on_speculative_posts"] && $ts_now < $starting_time_ts) { print " checked='checked'"; } ?>><label for="operation_data_details" class="drop_down">詳細情報</label><div>
                <h3>情報の種類</h3>
                <div class="radio_area"><input type="radio" name="operation_data_type" id="operation_data_type_normal" checked="checked"><label for="operation_data_type_normal">通常・訂正の情報</label><input type="radio" name="operation_data_type" id="operation_data_type_reassign"><label for="operation_data_type_reassign">新しい差し替え情報</label></div>
                
                
                
                <h3>運用補足情報</h3>
                <div class="textarea_wrapper"><div id="operation_data_comment_background"></div><textarea id="operation_data_comment" onscroll="scroll_textarea_background(this, document.getElementById('operation_data_comment_background'));" onkeyup="update_textarea_background(this, document.getElementById('operation_data_comment_background'), <?php print $main_config["comment_character_limit"]; ?>);"></textarea></div>
<?php
if ($main_config["require_comments_on_speculative_posts"] && $ts_now < $starting_time_ts) {
    print "                <div class=\"warning_text\" id=\"comment_guide\">お手数ですが、この運用に充当される編成を確認した方法を補足情報にご入力ください。</div>\n";
} else {
    print "                <div class=\"informational_text\" id=\"comment_guide\">差し替え等の特記事項がない場合は省略可能です。</div>\n";
}
?>
                <div class="warning_text" id="quote_guide" style="display: none;">情報の出典を補足情報にご入力ください。<?php if (!empty($main_config["quotation_guidelines"])) { print "<br><br>".str_replace(array("\r", "\n"), "", nl2br(htmlspecialchars(stripcslashes($main_config["quotation_guidelines"])), FALSE)); } ?></div>
            </div>
            
            <a href="javascript:void(0);" onclick="open_child_page('/user/rules.php?railroad_id=<?php print addslashes($railroad_id); ?>&is_child_page=yes');" class="bottom_link"><?php print htmlspecialchars($railroad_info["railroad_name"]); ?>の投稿ルール</a>
            
            <button type="button" class="wide_button" onclick="check_post_operation_data();">投稿する</button>
        </div>
        <div id="require_login_text" class="warning_text" style="display: none;">情報投稿にはログインが必要です。<br>ユーザーアカウントをまだ作成されていない場合は新規登録してください。</div>
    </article>
    <script>
        function update_user_data (user_data) {
            document.getElementById("login_status").innerHTML = "<b>" + escape_html(user_data["user_name"]) + "</b>さんとしてログイン中<br><a href='javascript:void(0);' onclick='user_logout(on_guest_mode);'>ログアウト</a>";
<?php
if (!$main_config["allow_guest_user"]) {
    print "            document.getElementById(\"form_area\").style.display = \"block\";\n";
    print "            document.getElementById(\"require_login_text\").style.display = \"none\";\n";
}
?>
        }
        
        function on_guest_mode () {
            document.getElementById("login_status").innerHTML = "<b>ゲストユーザー</b>としてアクセス中<br><a href='javascript:void(0);' onclick='show_login_form(update_user_data);'>ログイン</a>　<a href='javascript:void(0);' onclick='open_child_page(\"/user/sign_up.php?is_child_page=yes\");'>新規登録</a>";
<?php
if (!$main_config["allow_guest_user"]) {
    print "            document.getElementById(\"form_area\").style.display = \"none\";\n";
    print "            document.getElementById(\"require_login_text\").style.display = \"block\";\n";
}
?>
        }
        
        function switch_identify_method (direct) {
            //var train_number_data_elm = document.getElementById("train_number_data");
            var comment_guide_elm = document.getElementById("comment_guide");
            var quote_guide_elm = document.getElementById("quote_guide");
            
            if (direct) {
                //train_number_data_elm.style.display = "block";
                comment_guide_elm.style.display = "block";
                quote_guide_elm.style.display = "none";
            } else {
                //train_number_data_elm.style.display = "none";
                comment_guide_elm.style.display = "none";
                quote_guide_elm.style.display = "block";
                
                document.getElementById("operation_data_details").checked = true;
            }
        }
        
<?php
$formation_data = array();

$series_info_r = $db_obj->query("SELECT `series_title` FROM `unyohub_series_caches` ORDER BY `series_title` ASC");
while ($series_info = $series_info_r->fetchArray(SQLITE3_ASSOC)) {
    $formation_data[$series_info["series_title"]] = array("caption" => "", "semifixed_formation" => NULL);
}

$formation_info_r = $db_obj->query("SELECT `formation_name`, `caption`, `semifixed_formation` FROM `unyohub_formations` WHERE `currently_registered` = 1 ORDER BY `formation_name` ASC");
while ($formation_info = $formation_info_r->fetchArray(SQLITE3_ASSOC)) {
    $formation_data[$formation_info["formation_name"]] = array("caption" => $formation_info["caption"], "semifixed_formation" => $formation_info["semifixed_formation"]);
}

print "        var formation_data = ".json_encode($formation_data, JSON_UNESCAPED_UNICODE).";\n";
?>
        
        window.addEventListener("load", function () { check_logged_in(update_user_data, on_guest_mode, function () {  document.getElementById("login_status").innerHTML = "ログイン状態の確認に失敗しました"; }); });
    </script>
<?php
footer:
print_footer();
