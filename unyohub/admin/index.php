<?php
include "admin_common.php";

print_header();

print "<article id='portal_article'>";
print "<h2>管理画面トップページ</h2>";

if ($user->check_permission("admin")) {
    print "<a href='javascript:void(0);' onclick='location.href = \"announcements.php\";' class='wide_button'><div class='wide_button_icon_area'><img src='data:image/webp;base64,UklGRpQBAABXRUJQVlA4TIcBAAAvR8AREHVAkiTJkfL1/cmioQItrzxN01hV5Yqj3oyAKgCgwWi2je4tLdlJcR3R1Yhb8pL+AN1ortvZtn2Pjdu2gejZh5ta9wurpTcf0OuMiHcENYCGOzpda0DBviV8QAnxZQkImdgK3tCR4AOgYH3tZNdWEBZWtgKUDG0BE1g46NoCzkiEOLT7AQ9LNHi1+91IrzOc2+52gg9r5NgB2M0eiaEmxogvgN0HLHzk6K+dkabJLv8A23XOqdduWmx4/e+f/DeVwEaUB9vud8ljakuAz4k1bJhbBDErsH1O5UFFeKyClgx2ZPAyd7Alg7aMa7cMaDyqWEVUxhSzs5XOq7lyfq5WUwzhg4jV6pyKizZrXlKk7jup+3fW9gDXHgVm6z5hNIS+dS9FZeja27rfwjd0XW7dk9eGIYat+xbmENe1eztZLN3/yWLpeyRbLMiVgPEfyWLpey1ZLH0/ZotFgUYH4FW2WPa+juqXimLNJyK7ShcLky1WyhYrpYuFSRcLpYuFFndxvmcFAA==' alt=''></div>お知らせの編集</button>";
}

print "</article>";

print_footer();
