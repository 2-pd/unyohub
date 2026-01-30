<?php
include "admin_common.php";

if (empty($_GET["railroad_id"])) {
    print "【!】URLが誤っています";
    exit;
}

$railroad_id = basename($_GET["railroad_id"]);

if (!$user->check_permission("railroads/".$railroad_id."/formation", "edit_data")) {
    print "【!】アクセス中のユーザーアカウントにはこのページにアクセスする権限がありません";
    exit;
}

$railroad_info = json_decode(file_get_contents("../data/".$railroad_id."/railroad_info.json"), TRUE);

if (empty($railroad_info)) {
    print "【!】路線系統情報を読み込めませんでした";
    exit;
}


print_header();


print "<article>";

print "<nav><a href='railroads.php?railroad_id=".$railroad_id."'>".htmlspecialchars($railroad_info["railroad_name"])."</a> &gt;</nav>";

print "<h2 style='border-color: ".addslashes($railroad_info["main_color"])."'>参考書籍の追加・削除</h2>";

$db_obj = new SQLite3("../data/".$railroad_id."/railroad.db");
$db_obj->busyTimeout(5000);

if (isset($_POST["publisher_name"], $_POST["book_title"])) {
    $db_obj->query("REPLACE INTO `unyohub_reference_books`(`publisher_name`, `book_title`, `authors`, `publication_year`) VALUES ('".$db_obj->escapeString($_POST["publisher_name"])."', '".$db_obj->escapeString($_POST["book_title"])."', ".(!empty($_POST["authors"]) ? "'".$db_obj->escapeString($_POST["authors"])."'" : "NULL").", ".(!empty($_POST["publication_year"]) ? intval($_POST["publication_year"]) : "NULL").")");
    
    print "<script> alert('参考書籍情報を保存しました'); </script>";
} elseif (isset($_POST["delete_publisher_name"], $_POST["delete_book_title"])) {
    $db_obj->query("DELETE FROM `unyohub_reference_books` WHERE `publisher_name` = '".$db_obj->escapeString($_POST["delete_publisher_name"])."' AND `book_title` = '".$db_obj->escapeString($_POST["delete_book_title"])."'");
    $db_obj->query("DELETE FROM `unyohub_formation_reference_books` WHERE `publisher_name` = '".$db_obj->escapeString($_POST["delete_publisher_name"])."' AND `book_title` = '".$db_obj->escapeString($_POST["delete_book_title"])."'");
    
    print "<script> alert('参考書籍情報を削除しました'); </script>";
}


print <<<EOM
<form method="post" action="reference_books.php?railroad_id={$railroad_id}" id="delete_form"><input type="hidden" id="delete_publisher_name" name="delete_publisher_name"><input type="hidden" id="delete_book_title" name="delete_book_title"></form>
<script>
    function delete_reference_book (publisher_name, book_title) {
        if (confirm("この参考書籍を削除しますか？")) {
            document.getElementById("delete_publisher_name").value = publisher_name;
            document.getElementById("delete_book_title").value = book_title;
            document.getElementById("delete_form").submit();
        }
    }
</script>
EOM;

$reference_books_r = $db_obj->query("SELECT * FROM `unyohub_reference_books` ORDER BY `publisher_name` ASC, `book_title` ASC");

print "<h3>参考書籍の一覧</h3>";
while ($reference_book_info = $reference_books_r->fetchArray(SQLITE3_ASSOC)) {
    print "<form method='post' action='reference_books.php?railroad_id=".$railroad_id."'>";
    print "<h4>".htmlspecialchars($reference_book_info["publisher_name"])."『".htmlspecialchars($reference_book_info["book_title"])."』</h4>";
    print "<input type='hidden' name='publisher_name' value='".addslashes($reference_book_info["publisher_name"])."'>";
    print "<input type='hidden' name='book_title' value='".addslashes($reference_book_info["book_title"])."'>";
    print "<h5>著者</h5>";
    print "<input type='text' name='authors'".(!is_null($reference_book_info["authors"]) ? " value='".addslashes($reference_book_info["authors"])."'" : "").">";
    print "<h5>発行年</h5>";
    print "<div class='half_input_wrapper'><input type='number' name='publication_year'".(!is_null($reference_book_info["publication_year"]) ? " value='".addslashes($reference_book_info["publication_year"])."'" : "")." max='2100' min='1901'>年</div><br>";
    print "<button type='submit' class='half_button'>更新</button><button type='button' class='half_button' onclick='delete_reference_book(\"".addslashes($reference_book_info["publisher_name"])."\", \"".addslashes($reference_book_info["book_title"])."\");'>削除</button>";
    print "</form>";
}


print <<<EOM
<h3>参考書籍の追加</h3>
<form method="post" action="reference_books.php?railroad_id={$railroad_id}">
<h5>出版社</h5>
<input type="text" name="publisher_name">
<h5>書籍名</h5>
<input type="text" name="book_title">
<h5>著者 (出版社と同じ場合は空欄)</h5>
<input type="text" name="authors">
<h5>発行年 (不明な場合は空欄)</h5>
<div class="half_input_wrapper"><input type="number" name="publication_year" max='2100' min='1901'>年</div><br>
<button type="submit" class='wide_button'>追加</button>
</form>
EOM;


print "</article>";


print_footer();
