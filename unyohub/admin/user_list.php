<?php
include "admin_common.php";

if (!$user->check_permission("railroads", "moderate")) {
    print "【!】アクセス中のユーザーアカウントにはこのページにアクセスする権限がありません";
    exit;
}


print_header();


print "<article>";

print "<h2>ユーザーの一覧</h2>";

print "</article>";


print_footer();
