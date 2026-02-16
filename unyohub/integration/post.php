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


$ts = convert_date_to_timestamp($_GET["date"]);

if ($ts === FALSE) {
    print "ERROR: 日付が不正です";
    goto footer;
}

$ts_now = time();

$now_str = date("H:i", $ts_now);
if (intval(substr($now_str, 0, 2)) < 4) {
    $now_str = (intval(substr($now_str, 0, 2)) + 24).substr($now_str, 2);
}

if ($ts <= $ts_now - 14400) {
    if ($ts < $ts_now - 187200) {
        print "ERROR: 2日以上前の運用情報を投稿することはできません";
        goto footer;
    }
    
    if ($ts_now >= $ts + 100800) {
        $now_str = "99:99";
    }
} else {
    $now_str = "00:00";
}

if ($ts > $ts_now + (86400 * $main_config["available_days_ahead"]) - 14400) {
    print "ERROR: ".($main_config["available_days_ahead"] + 1)."日以上先の運用情報を投稿することはできません";
    goto footer;
}


update_diagram_revision($ts);

$operation_data = get_operation_info($ts, $_GET["operation_number"], TRUE);

if (empty($operation_data)) {
    goto footer;
}

if (!is_null($operation_data["starting_time"])) {
    $starting_time_ts = $ts + (intval(substr($operation_data["starting_time"], 0, 2)) * 3600) + (intval(substr($operation_data["starting_time"], 3)) * 60);
} else {
    $starting_time_ts = $ts;
}


$assign_order_maxima = $db_obj->querySingle("SELECT `assign_order` FROM `unyohub_data_caches` WHERE `operation_date` = '".$db_obj->escapeString($_GET["date"])."' AND `operation_number` = '".$db_obj->escapeString($_GET["operation_number"])."' ORDER BY `assign_order` DESC LIMIT 1");
if (empty($assign_order_maxima)) {
    $assign_order_maxima = 0;
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
            
            <input type="checkbox" id="operation_data_details"<?php if ($assign_order_maxima >= 1 || ($main_config["require_comments_on_speculative_posts"] && $ts_now < $starting_time_ts)) { print " checked='checked'"; } ?>><label for="operation_data_details" class="drop_down">詳細情報</label><div>
                <h3>情報の種類</h3>
                <div class="radio_area"><input type="radio" name="operation_data_type" id="operation_data_type_normal" checked="checked"><label for="operation_data_type_normal">通常・訂正の情報</label><input type="radio" name="operation_data_type" id="operation_data_type_reassign"><label for="operation_data_type_reassign">新しい差し替え情報</label></div>
<?php
if ($assign_order_maxima >= 1) {
    print "                <div class=\"warning_text\">既にこの運用に対して投稿されている情報と同じ編成を投稿する場合や、既に投稿されている運用情報が見間違いであると思われる場合に正しい編成の情報で上書きをする場合は「通常・訂正の情報」を、<br>既に投稿されている編成がダイヤ乱れや車両トラブルにより別の編成に取り替えられたことを最初に報告する場合は「新しい差し替え情報」を選択してください。</div>\n";
}
?>
                
                <div id="train_number_data">
                <h3>目撃時の列車</h3>
<?php
$train_number = empty($_GET["train_number"]) ? NULL : $_GET["train_number"];

print "                <select id=\"train_number_select\">";

print "<option value=\"○\"".("○" === $train_number || (is_null($train_number) && $now_str < $operation_data["starting_time"]) ? " selected=\"selected\"" : "").">○ 出庫時</option>";
$previous_final_arrival_time = $operation_data["starting_time"];

foreach ($operation_data["trains"] as $train_info) {
    $train_title = str_contains($train_info["train_number"], "__") ? substr($train_info["train_number"], 0, strpos($train_info["train_number"], "__")) : $train_info["train_number"];
    if (str_starts_with($train_title, ".")) {
        $train_title = substr($train_title, 1)."待機";
    }
    
    print "<option value=\"".addslashes($train_info["train_number"])."\"".($train_info["train_number"] === $train_number || (is_null($train_number) && $now_str > $previous_final_arrival_time && $now_str <= $train_info["final_arrival_time"]) ? " selected=\"selected\"" : "").">".htmlspecialchars($train_title)." (".$train_info["first_departure_time"]."〜".$train_info["final_arrival_time"].")</option>";
    
    $previous_final_arrival_time = $train_info["final_arrival_time"];
}

print "<option value=\"△\"".("△" === $train_number || (is_null($train_number) && $now_str > $previous_final_arrival_time) ? " selected=\"selected\"" : "").">△ 入庫時</option>";

print "</select>\n";
?>
                </div>
                
                <h3>運用補足情報</h3>
                <div class="textarea_wrapper"><div id="operation_data_comment_background"></div><textarea id="operation_data_comment" onscroll="scroll_textarea_background(this, document.getElementById('operation_data_comment_background'));" onkeyup="update_textarea_background(this, document.getElementById('operation_data_comment_background'), comment_character_limit);"></textarea></div>
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
            
            <button type="button" class="wide_button" onclick="submit_operation_data();">投稿する</button>
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
            
            get_one_time_token();
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
        
<?php
$formation_data = array();

$series_info_r = $db_obj->query("SELECT `series_title` FROM `unyohub_series_caches` ORDER BY `series_title` ASC");
while ($series_info = $series_info_r->fetchArray(SQLITE3_ASSOC)) {
    $formation_data[$series_info["series_title"]] = array("caption" => "", "semifixed_formation" => NULL, "unavailable" => NULL);
}

$formation_info_r = $db_obj->query("SELECT `formation_name`, `caption`, `semifixed_formation`, `unavailable` FROM `unyohub_formations` WHERE `currently_registered` = 1 ORDER BY `formation_name` ASC");
while ($formation_info = $formation_info_r->fetchArray(SQLITE3_ASSOC)) {
    $formation_data[$formation_info["formation_name"]] = array("caption" => $formation_info["caption"], "semifixed_formation" => $formation_info["semifixed_formation"], "unavailable" => $formation_info["unavailable"]);
}

print "        var formation_data = ".json_encode($formation_data, JSON_UNESCAPED_UNICODE).";\n";
print "        var assign_order_maxima = ".$assign_order_maxima.";\n";
print "        var comment_character_limit = ".$main_config["comment_character_limit"].";\n";
?>
        
        function submit_operation_data () {
            if (assign_order_maxima === 0) {
                if (document.getElementById("operation_data_type_reassign").checked) {
                    mes("他の情報が投稿されていない運用に差し替え情報を投稿することはできません", true);
                    
                    return;
                }
                
                var assign_order = 1;
            } else {
                var assign_order = document.getElementById("operation_data_type_reassign").checked ? assign_order_maxima + 1 : assign_order_maxima;
            }
            
            var comment_text = document.getElementById("operation_data_comment").value;
            if (comment_text.length > comment_character_limit) {
                mes("運用補足情報が" + comment_character_limit + "文字を超過しているため投稿できません", true);
                
                return;
            }
            
            if (document.getElementById("identify_method_quote").checked) {
                var train_number = null;
                var is_quotation = true;
            } else {
                var train_number = document.getElementById("train_number_select").value;
                var is_quotation = false;
            }
            
            var url_obj = new URL(location.href);
            
            check_post_operation_data (url_obj.searchParams.get("railroad_id"), url_obj.searchParams.get("date"), url_obj.searchParams.get("operation_number"), assign_order, document.getElementById("operation_data_formation").value, train_number, is_quotation, comment_text);
        }
        
        window.addEventListener("load", function () { check_logged_in(update_user_data, on_guest_mode, function () {  document.getElementById("login_status").innerHTML = "ログイン状態の確認に失敗しました"; }); });
    </script>
<?php
footer:
print_footer();
