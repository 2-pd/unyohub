<?php
include "admin_common.php";

print_header();

print "<article id='portal_article'>";
print "<h2>管理画面トップページ</h2>";

if ($user->check_permission("admin")) {
    print "<button type='button' onclick='location.href = \"announcements.php\";' class='wide_button'>お知らせの編集</button>";
}

print "</article>";

print_footer();
