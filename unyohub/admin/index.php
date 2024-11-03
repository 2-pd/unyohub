<?php
include "admin_common.php";

print_header();

print "<article id='portal_article'>";
print "<h2>管理画面トップページ</h2>";

if ($user->check_permission("railroads", "edit_announcement")) {
    print "<a href='javascript:void(0);' onclick='location.href = \"announcements.php\";' class='wide_button'><img src='data:image/webp;base64,UklGRpQBAABXRUJQVlA4TIcBAAAvR8AREHVAkiTJkfL1/cmioQItrzxN01hV5Yqj3oyAKgCgwWi2je4tLdlJcR3R1Yhb8pL+AN1ortvZtn2Pjdu2gejZh5ta9wurpTcf0OuMiHcENYCGOzpda0DBviV8QAnxZQkImdgK3tCR4AOgYH3tZNdWEBZWtgKUDG0BE1g46NoCzkiEOLT7AQ9LNHi1+91IrzOc2+52gg9r5NgB2M0eiaEmxogvgN0HLHzk6K+dkabJLv8A23XOqdduWmx4/e+f/DeVwEaUB9vud8ljakuAz4k1bJhbBDErsH1O5UFFeKyClgx2ZPAyd7Alg7aMa7cMaDyqWEVUxhSzs5XOq7lyfq5WUwzhg4jV6pyKizZrXlKk7jup+3fW9gDXHgVm6z5hNIS+dS9FZeja27rfwjd0XW7dk9eGIYat+xbmENe1eztZLN3/yWLpeyRbLMiVgPEfyWLpey1ZLH0/ZotFgUYH4FW2WPa+juqXimLNJyK7ShcLky1WyhYrpYuFSRcLpYuFFndxvmcFAA==' alt=''>お知らせの編集</a>";
}

print "<h3>路線系統別の操作</h3>";

$railroads = json_decode(file_get_contents(RAILROADS_JSON_PATH), TRUE);

foreach ($railroads["railroads_order"] as $railroad) {
    if ($user->check_permission("railroads/".$railroad)) {
        print "<a href='javascript:void(0);' onclick='location.href = \"railroads.php?railroad_id=".$railroad."\";' class='wide_button'><img src='".addslashes($railroads["railroads"][$railroad]["railroad_icon"])."' alt='' style='background-color: ".addslashes($railroads["railroads"][$railroad]["main_color"]).";'>".htmlspecialchars($railroads["railroads"][$railroad]["railroad_name"])."</a>";
    }
}

if ($user->check_permission("instance_administrator")) {
    print "<h3>インスタンスの管理</h3>";
    
    print "<a href='javascript:void(0);' onclick='location.href = \"enable_railroads.php\";' class='wide_button'><img src='data:image/webp;base64,UklGRnACAABXRUJQVlA4TGMCAAAvd8AdELVAsG03bTT73xRj9DQ860HZcSwNMzMzR8C5bdvU89m2nfwAu7LN0pV6Jx1Lq7RtJ5WdyrbN7ciNJEVyam8DOUz7goO9jEIh36Al/FAS3AIRs3hqvOZJNW0yzjK/HE54TLM/OLJMBf6Or2l7eH/6eD6NZ1Kg0ZQzzzNI87LcRLzyFdLcMidlRMEPpJehKUwdgXzmOcuGuPkK+Vwxqcl/MTyQzRVojXiurNx8hdZwqZm/ATT27IGCnNw/4P2dr1AQdrFxhxuvwCm8NC7e+zFXwC1cfPnSPOAYcnyx5okVXz+eePEFXLN1if4pdbbImEYHDT40fJ5mexxJJJ+gqFwMTy1NGq1Bba4IdaCoXAxlm1zycw7LNubOZ3Gvg785Wh/3Onj1lF8SGTK+JTK97hP1DYrKrd77ul1qas4lrbl6rd5BtkAcHHCeQJlfB9k1kRRJM6FKcNZDcA99CQ2sRYMS0uvvMKF5HZXU9HeUrrha6E8Q4K9RpN9HOu7jhbthmAG7KRoy0oBVIsEBhvTaQynIDRlhQJcQEEGjqCwz5MYtEmc3nJSVo8L20phwRpgcGtwjKTci4tbgZJqdF2h+pHVpRoZtRm4wT7wa7EDtopfCpsH7hD4WbQKG+nbrJp62Gw2hNC78G9pT50x+oe6BLJB0Aazga9y6q+dv+6H7Nw5JBIYWde9Hqe2n8WEMcTk3uIJfoeCl/dvIVxRSDAxJqNFQk21DCqsJtLv8ymKyA8bwBwx1r3rA0R3ChIf90VirJS22pfoE8M9G5dNfo+XNYPvOH+nVb5gosD0ltYew10gOAAA=' alt=''>路線系統の追加・削除</a>";
}

print "</article>";

print_footer();
