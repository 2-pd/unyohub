<?php
include "admin_common.php";

print_header();

print "<article id='portal_article'>";
print "<h2>管理画面トップページ</h2>";

if ($user->check_permission("railroads", "edit_announcement")) {
    print "<a href='announcements.php?railroad_id=/' class='wide_button'><img src='data:image/webp;base64,UklGRrACAABXRUJQVlA4TKQCAAAvR8AREHVAkiRJisP/P+0HcqC7tB6bQSUi4AgAWEjK2Vzbp8p+gW3btu8q2zZLW5V9lW1j7Z2ANReSnwaLLv3gr8ulxZsv5AY+KogkeyQn7Uq8PwKseqweiKkOpho5yRg9+K2EQim6jnuiIzqFuP+TTEXnWkYMYb92qZkvI9rkLpA/vlpcvWpCUUXE9EsCw6zWYdZG7tQtqgT3+4V5tHWarsUXN5cCF0ZHLOFrqEjs0Oho08g77uid8QYGM/UR2iG5WXI63nQ3MPzyEVrmJBjMgMV4TWSKEzCg5qjvKHxNFR1azRQQrGB+TbYcMO8ZEntPgDaLHuGuJcywFwyv6caCnQlQxIHlPDbhgRjHt/cu13xSbnbNe5yGoKXA0h7UjbMY+FbgH8yPcx0YVmAcXI7zHUAqgAVf4/AC+QoUAu4wSr3/20DJ964pjoIKPmv4CpCj6AfXNdwEeqNYB8c1nARWo7gFyzX+wjNKbtBZQ1eQM0pfkF9DQdA7ymbgX0NAsDHKV2Bd4x18DUIkibRr0AqNMIZn8LiBop4CjzEqg/kqFoKKMdaDqiqqg7UhZPwHQVX+w5vMCKYkkX4VBqGZjJAe0Em/6KLSRpgM1jdQzMSAx3dQXe1+zrHoyK1aMz+nOEGWU3TOVnC+ytk8RZsw6D5QUE+4Qc7w7SikktDQfM4YSKiV0JL+E6S8BK+r9Ds81zHmHY3VMh6a2TFlSUQtkUnpMacJqRZycn6M5EP/zn2HMXpP9Qj13vuv5zwwP8IyOKtnPmg8oimYrSch4DJ89eAFcfXgCHft6UnPf+8JYOst3aHfmlhSfbN68DrqWB8QBj2c9A/1ERZbwnNEHNfHlHSduSSuj8oJ/Zh/Dhv4uGAaCF5dBqE28KFhxZtzivF/mRUHu4HZ' alt=''>お知らせの編集</a>";
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
    
    print "<a href='enable_railroads.php' class='wide_button'><img src='data:image/webp;base64,UklGRrYCAABXRUJQVlA4TKkCAAAvd8AdENXIsm07baT5T6UnwZCKziuurxpM07MiW6+ZdJuZmZmZuSOgAABAsJlts/F2tG1227Zt2360bSXbtn1IjiQpkiyuAz60WC9oBzKaTfE/cUxEtgk0JTALvMmk9Rar7HLJHb/iYFpzDp20OHQ6Cfzd5eoXa7dosyzzSZanN4EiAY8ZeWmaZ2X3orWWtPMJ2fHy7tGXGUIMpmej/GjiljBbrcPmEybu81t0AkiJKtmH1tr9fELBLhJbHS4qcuL+g9vf8wlFM8fKRnSeVG08ztHqsmhVHJF1sViTzdfFa0281KWq24OJzll2y2zEsW6Hd7NYgvmOI8mKj6K2KJ7mS8Zch/KWGRVFbVEUpaSYnMNFbfvAK/8e9zvHKgN/H7yafTDvU4/z7Un3+z7W34ratt+f6/ZX01ob/HFuv7bfi+zB1Fq75W1A5p6BCc/EhJjWQHX+yt8CjE3v/VDee2xEwIg3lh1KkvMYjoCmzj/G+r3Tcj54NEZAhmc2QzFbj/QI8PdwK/+AtQnDzcMvgmTf+XfQUIjykl0ESc0jZ6hKcr2xagSnVWUz/AiWMHU8aLt2g3lMEnFl3kli5X1Y0zIcSrKOTaAym4CXJXE6rRiUWfyUxNIcujTqJLOSeL8QEt78Svoy4vR47TmSdPHw6XCW4dRIEm9jpdZjSe6nJKWWk8FMkW1Uki6e6ddm5o8kKU2P6KEkSfa0DaF96yzMxXGc5AIxXR4kSU9P9+6zOpd3KpmEYU58axubWoa33pZgb/1xFYJjWAlJBZ0TIoMcyDjJjm+kHGgA80SG5PBk0sNUmtifzsmoaWp1xmNdDr9mPNgpos++8/T5ykyZa3nmM1xp8pUfdy+qwoEveVY5ZCvF8uM7edSzAkyK5DG+BBvSnTSozlLp/3YAkTUA' alt=''>路線系統の追加・削除</a>";
}

print "</article>";

print_footer();
