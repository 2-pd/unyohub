<?php
include "admin_common.php";

if (empty($_GET["railroad_id"])) {
    print "【!】URLが誤っています";
    exit;
}

$railroad_id = basename($_GET["railroad_id"]);

if (empty($railroad_id)) {
    print "【!】URLが誤っています";
    exit;
}

if (!$user->check_permission("railroads/".$railroad_id)) {
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
print "<h2 style='background-color: ".addslashes($railroad_info["main_color"])."'><img src='".addslashes($railroad_info["railroad_icon"])."' alt=''>".htmlspecialchars($railroad_info["railroad_name"])."</h2>";

if ($user->check_permission("railroads/".$railroad_id, "edit_announcement")) {
    print "<a href='announcements.php?railroad_id=".$railroad_id."' class='wide_button'><img src='data:image/webp;base64,UklGRpQBAABXRUJQVlA4TIcBAAAvR8AREHVAkiTJkfL1/cmioQItrzxN01hV5Yqj3oyAKgCgwWi2je4tLdlJcR3R1Yhb8pL+AN1ortvZtn2Pjdu2gejZh5ta9wurpTcf0OuMiHcENYCGOzpda0DBviV8QAnxZQkImdgK3tCR4AOgYH3tZNdWEBZWtgKUDG0BE1g46NoCzkiEOLT7AQ9LNHi1+91IrzOc2+52gg9r5NgB2M0eiaEmxogvgN0HLHzk6K+dkabJLv8A23XOqdduWmx4/e+f/DeVwEaUB9vud8ljakuAz4k1bJhbBDErsH1O5UFFeKyClgx2ZPAyd7Alg7aMa7cMaDyqWEVUxhSzs5XOq7lyfq5WUwzhg4jV6pyKizZrXlKk7jup+3fW9gDXHgVm6z5hNIS+dS9FZeja27rfwjd0XW7dk9eGIYat+xbmENe1eztZLN3/yWLpeyRbLMiVgPEfyWLpey1ZLH0/ZotFgUYH4FW2WPa+juqXimLNJyK7ShcLky1WyhYrpYuFSRcLpYuFFndxvmcFAA==' alt=''>お知らせの編集</a>";
}

if ($user->check_permission("railroads/".$railroad_id."/formation", "edit_data")) {
    print "<a href='formations.php?railroad_id=".$railroad_id."' class='wide_button'><img src='data:image/webp;base64,UklGRpQBAABXRUJQVlA4TIcBAAAvNUANEK/BoJEkRbUn4wWeitf6eQfMtDYYNJKkqPa0nJLX/xo+74CZlkEjSYpqz8D7F/NSyAEzLdta2158cuhypoqdWQxiOwNYwD+ANlNSpjdAVYPaDtR1rTgMw4sXPy5kmVkjL6UAKtLMNMDDhZ6ZXynle9+3zczzPM97WRZpnufnOI7q//8/M0fcAIAPPb6IAKTv+5rMpIhI5nmeMpP6vg/+/+ewYgPAIgJg//8DQ0SgbequqRUZXEmSpCoLPFfc3d25/+FWnj/gryei/4zctnEknabtassr2Be03SBkUGWbGsgWSLPKMbQWNHIEUquq+RqCnniOk1JVp67pHgPgGlrTEkilKlS8K5u0UCR+VVZkNchoSzYXyvrvqv4cvgFIVwJSihD4ANKVAKQT8YdRMCs/hvS1ZOdTBl4YrllwY7hnwYPhuRtRV1NJI9qriZX1YjisR9RX0ifaqImVdWTAmASn6gRJJMlaiSyVCRJIlDWYcWZbZYIEkmVtFxPMh+oEScTO+mICAA==' alt=''>編成情報の編集</a>";
}

if ($user->check_permission("railroads/".$railroad_id, "edit_data")) {
    print "<a href='manage_files.php?railroad_id=".$railroad_id."' class='wide_button'><img src='data:image/webp;base64,UklGRnYAAABXRUJQVlA4TGoAAAAvO8AOEBcwzMM8zAKBJOsVxg74CI4j2WqjkTchECJRKBSO1EsT87R+jxH9nwCApDLSrGlw1tYIkIMTHQ3O6gQn1upZGpzxhkvVAUg9qxNaJ0CKjgZndYITHQ3O6pyPgOu/k/VUlB9MzacA' alt=''>データファイルの管理</a>";
}

print "</article>";


print_footer();
