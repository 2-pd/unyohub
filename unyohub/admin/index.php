<?php
include "admin_common.php";

print_header();

print "<article id='portal_article'>";
print "<h2>管理画面トップページ</h2>";

if ($user->check_permission("railroads", "edit_announcement")) {
    print "<a href='announcements.php' class='wide_button'><img src='data:image/webp;base64,UklGRp4BAABXRUJQVlA4TJEBAAAvR8AREDXIbSRJkqTWX2mjbjvT6z6yOgKubW3HnG+tse2JnfTJDZiVb8Co7dJ25d4q7VTDLivd2J7vmYC7LE+fUz9cEvfz40Sv3Ieci6HDMwo/RD1fjENUs8JrFpUn4FqFUYf4OSqfMOyDKvaxwPilSuH5hEXvuCV7sGorpOpbVpPBYN1iwqjohHWtFc97HiPy0D1UdkM/BHU1nBYcN/wWfDW4ChwN8YJYAguSt0DaICnIaDAWVDSUF7Q1tBQMN27BWcNpgbnBFCCRakiT7mn6ohr2zFfuHmuFfU3Zl1W6ZaJjfMtPx/eSbLSD3h0zEDa9guGv5B9jQzOkNW24aDlfkCPVunLmbELcxhi1SE2Udsoc5M0OkfL0LumMue9AsyOUAicIUk9YgSOtDCiWOENS2TvXcKiHd/8/4dj/d3+/gjDM32ObYum5mXLVMzCltydDakaSsXcdzNi5BzIITPDTnXDVSb2T1vSQMw1Jv7kGH3KqZoGf8Wt8yLlUViV/Je2Q7iFHM+p3zSL4XVf6GB+yDQA=' alt=''>お知らせの編集</a>";
}

print "<h3>路線系統別の操作</h3>";
print "<div id='icon_area'>";

$railroads = json_decode(file_get_contents(RAILROADS_JSON_PATH), TRUE);

foreach ($railroads["categories"] as $category) {
    $buf = "";
    
    if (array_key_exists("subcategories", $category)) {
        foreach ($category["subcategories"] as $subcategory) {
            $buf_2 = "";
            
            foreach ($subcategory["railroads"] as $railroad) {
                if ($user->check_permission("railroads/".$railroad)) {
                    $buf_2 .= "<a href='railroads.php?railroad_id=".$railroad."'><img src='".addslashes($railroads["railroads"][$railroad]["railroad_icon"])."' alt='' style='background-color: ".addslashes($railroads["railroads"][$railroad]["main_color"]).";'>".htmlspecialchars($railroads["railroads"][$railroad]["railroad_name"])."</a>";
                }
            }
            
            if (!empty($buf_2)) {
                $buf .= "<h5>".$subcategory["subcategory_name"]."</h5>".$buf_2;
            }
        }
    } elseif (array_key_exists("railroads", $category)) {
        foreach ($category["railroads"] as $railroad) {
            if ($user->check_permission("railroads/".$railroad)) {
                $buf .= "<a href='railroads.php?railroad_id=".$railroad."'><img src='".addslashes($railroads["railroads"][$railroad]["railroad_icon"])."' alt='' style='background-color: ".addslashes($railroads["railroads"][$railroad]["main_color"]).";'>".htmlspecialchars($railroads["railroads"][$railroad]["railroad_name"])."</a>";
            }
        }
    }
    
    if (!empty($buf)) {
        print "<h4>".$category["category_name"]."</h4>".$buf;
    }
}

print "</div>";

if ($user->check_permission("instance_administrator")) {
    print "<h3>インスタンスの管理</h3>";
    
    print "<a href='config.php' class='wide_button'><img src='data:image/webp;base64,UklGRo4CAABXRUJQVlA4TIICAAAvWUAWEJVI0La3bZve/6hR+SPjAJMCAYrdC/7lVSGPFQFn27bjTbglo5Pa7k+wbdu27W79Cd9e29bU4/hUt+/ROcbHeAKiXQrCVKqfuWErvvBUM7qcgssVbYgXRNpIXW3vQnJhohXBlCaTAtWiB0ySdiSWLfBfu3YgM/QhltrEl7PpVkrpxb1pn9u9phAQfqBKREuB5sIL5/Qjbluuc1cnZLEHSo4uqUwf3PSBG53UaXaXh0C4+zgfVAXShEvpZx+UXtVVc3WRrV5kQwVYky74UtyJLCaxAp8q6dN8uECvkDiL+wQFdKonCexzl7PLRYEDCxwpLqrA7twhXKFVEBNtMkVl0egkb07yfPChIQ4l/qa53Sd8UAtc9yyEtrY9C33KjspVNnRR1mtr+Ep3L2hrkNja1WkK7gTu+4CGqIV3ueoDp7EIZPVRUpcRctEDzmIh4gvSD9S9/1ICVXB7nVERiwmZ9sJ4LChkCm6P8xqLCpSDtgNVSmNhce8vF1a4n0I+cRYXz9z/wCyAouyZGwOIeOYive3jmRvmvUW0hePPZJKLO5BUB26RPQys0RDLgzjTdB/DZoObMYCwgXUMNB7DpMQobG2JkcsYIjDaltFlH3fytkkxjs+qtss4MNaG0VFMyoStLTF6GQONf9DALCgwMZOEVuBtPMDkNW8kBcl7ZDyZmSQz808fYgMAnPIHZki3LTNTYLGNCCCrMSLANYG/rq41AW7AMvFBckvBO1oFfreJzU3MwPAOGh4S2nsEpk5AkKTYAAS+CRAbScJqAWJOD0sPuH2nLdcWN5u1B2S3INMibY49BJZ1ZTFMDxbn6BNZuAFRO67IDOMdNyB0xxWZ0Qw=' alt=''>インスタンスの基本設定</a>";
    
    print "<a href='edit_rules.php' class='wide_button'><img src='data:image/webp;base64,UklGRrYAAABXRUJQVlA4TKoAAAAvO8AOEC9AkG3T+aud6RwE2Tadv9qZHoJsm85f7UwPmYDF9qkurQgCbDuKVfkv3Na2rUQXyzlIAWM5LbwO3vRfDvYeFkf0fwK03rKx0OYWoNjWAhTXIEnbJOlK9t/QL8cpU0ZeGQ4W9JuNUMc4peRgihl5SSPUQT2UDqYgh/8ITZR6AFPYNKvj1IMpYYI6Q70pxZuc7XfB7vuIfAbsvo/IZ8Du+4h8AsHnAw==' alt=''>ルールとポリシーの編集</a>";
    
    print "<a href='categorize_railroads.php' class='wide_button'><img src='data:image/webp;base64,UklGRpgAAABXRUJQVlA4TIwAAAAvO8AOECcgICHk/zSf3BCQEPJ/mk8EJIT8n+YTgQDhv8KaEgFQDfinBseJJMlRj5ABncgBMRYI2gEd479T0/TOsdczov8TIF+rAqRXFCCNZME2BD+N2QZWtxFREH+caKTtL3eWUsraTgHScFZ3cD+S1R3E77XnnPPSru3/QgHScFZ3cD/PYX6r6FyfHw==' alt=''>路線系統グループの編集</a>";
    
    print "<a href='enable_railroads.php' class='wide_button'><img src='data:image/webp;base64,UklGRnACAABXRUJQVlA4TGMCAAAvd8AdELVAsG03bTT73xRj9DQ860HZcSwNMzMzR8C5bdvU89m2nfwAu7LN0pV6Jx1Lq7RtJ5WdyrbN7ciNJEVyam8DOUz7goO9jEIh36Al/FAS3AIRs3hqvOZJNW0yzjK/HE54TLM/OLJMBf6Or2l7eH/6eD6NZ1Kg0ZQzzzNI87LcRLzyFdLcMidlRMEPpJehKUwdgXzmOcuGuPkK+Vwxqcl/MTyQzRVojXiurNx8hdZwqZm/ATT27IGCnNw/4P2dr1AQdrFxhxuvwCm8NC7e+zFXwC1cfPnSPOAYcnyx5okVXz+eePEFXLN1if4pdbbImEYHDT40fJ5mexxJJJ+gqFwMTy1NGq1Bba4IdaCoXAxlm1zycw7LNubOZ3Gvg785Wh/3Onj1lF8SGTK+JTK97hP1DYrKrd77ul1qas4lrbl6rd5BtkAcHHCeQJlfB9k1kRRJM6FKcNZDcA99CQ2sRYMS0uvvMKF5HZXU9HeUrrha6E8Q4K9RpN9HOu7jhbthmAG7KRoy0oBVIsEBhvTaQynIDRlhQJcQEEGjqCwz5MYtEmc3nJSVo8L20phwRpgcGtwjKTci4tbgZJqdF2h+pHVpRoZtRm4wT7wa7EDtopfCpsH7hD4WbQKG+nbrJp62Gw2hNC78G9pT50x+oe6BLJB0Aazga9y6q+dv+6H7Nw5JBIYWde9Hqe2n8WEMcTk3uIJfoeCl/dvIVxRSDAxJqNFQk21DCqsJtLv8ymKyA8bwBwx1r3rA0R3ChIf90VirJS22pfoE8M9G5dNfo+XNYPvOH+nVb5gosD0ltYew10gOAAA=' alt=''>路線系統の追加・削除</a>";
}

print "</article>";

print_footer();
