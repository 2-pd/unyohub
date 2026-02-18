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
    print "<a href='announcements.php?railroad_id=".$railroad_id."' class='wide_button'><img src='data:image/webp;base64,UklGRrACAABXRUJQVlA4TKQCAAAvR8AREHVAkiRJisP/P+0HcqC7tB6bQSUi4AgAWEjK2Vzbp8p+gW3btu8q2zZLW5V9lW1j7Z2ANReSnwaLLv3gr8ulxZsv5AY+KogkeyQn7Uq8PwKseqweiKkOpho5yRg9+K2EQim6jnuiIzqFuP+TTEXnWkYMYb92qZkvI9rkLpA/vlpcvWpCUUXE9EsCw6zWYdZG7tQtqgT3+4V5tHWarsUXN5cCF0ZHLOFrqEjs0Oho08g77uid8QYGM/UR2iG5WXI63nQ3MPzyEVrmJBjMgMV4TWSKEzCg5qjvKHxNFR1azRQQrGB+TbYcMO8ZEntPgDaLHuGuJcywFwyv6caCnQlQxIHlPDbhgRjHt/cu13xSbnbNe5yGoKXA0h7UjbMY+FbgH8yPcx0YVmAcXI7zHUAqgAVf4/AC+QoUAu4wSr3/20DJ964pjoIKPmv4CpCj6AfXNdwEeqNYB8c1nARWo7gFyzX+wjNKbtBZQ1eQM0pfkF9DQdA7ymbgX0NAsDHKV2Bd4x18DUIkibRr0AqNMIZn8LiBop4CjzEqg/kqFoKKMdaDqiqqg7UhZPwHQVX+w5vMCKYkkX4VBqGZjJAe0Em/6KLSRpgM1jdQzMSAx3dQXe1+zrHoyK1aMz+nOEGWU3TOVnC+ytk8RZsw6D5QUE+4Qc7w7SikktDQfM4YSKiV0JL+E6S8BK+r9Ds81zHmHY3VMh6a2TFlSUQtkUnpMacJqRZycn6M5EP/zn2HMXpP9Qj13vuv5zwwP8IyOKtnPmg8oimYrSch4DJ89eAFcfXgCHft6UnPf+8JYOst3aHfmlhSfbN68DrqWB8QBj2c9A/1ERZbwnNEHNfHlHSduSSuj8oJ/Zh/Dhv4uGAaCF5dBqE28KFhxZtzivF/mRUHu4HZ' alt=''>お知らせの編集</a>";
}

if ($user->check_permission("railroads/".$railroad_id."/formation", "edit_data")) {
    print "<a href='formations.php?railroad_id=".$railroad_id."' class='wide_button'><img src='data:image/webp;base64,UklGRpQBAABXRUJQVlA4TIcBAAAvNUANEK/BoJEkRbUn4wWeitf6eQfMtDYYNJKkqPa0nJLX/xo+74CZlkEjSYpqz8D7F/NSyAEzLdta2158cuhypoqdWQxiOwNYwD+ANlNSpjdAVYPaDtR1rTgMw4sXPy5kmVkjL6UAKtLMNMDDhZ6ZXynle9+3zczzPM97WRZpnufnOI7q//8/M0fcAIAPPb6IAKTv+5rMpIhI5nmeMpP6vg/+/+ewYgPAIgJg//8DQ0SgbequqRUZXEmSpCoLPFfc3d25/+FWnj/gryei/4zctnEknabtassr2Be03SBkUGWbGsgWSLPKMbQWNHIEUquq+RqCnniOk1JVp67pHgPgGlrTEkilKlS8K5u0UCR+VVZkNchoSzYXyvrvqv4cvgFIVwJSihD4ANKVAKQT8YdRMCs/hvS1ZOdTBl4YrllwY7hnwYPhuRtRV1NJI9qriZX1YjisR9RX0ifaqImVdWTAmASn6gRJJMlaiSyVCRJIlDWYcWZbZYIEkmVtFxPMh+oEScTO+mICAA==' alt=''>編成情報の編集</a>";
}

if ($user->check_permission("railroads/".$railroad_id, "edit_data")) {
    print "<a href='manage_files.php?railroad_id=".$railroad_id."' class='wide_button'><img src='data:image/webp;base64,UklGRnYAAABXRUJQVlA4TGoAAAAvO8AOEBcwzMM8zAKBJOsVxg74CI4j2WqjkTchECJRKBSO1EsT87R+jxH9nwCApDLSrGlw1tYIkIMTHQ3O6gQn1upZGpzxhkvVAUg9qxNaJ0CKjgZndYITHQ3O6pyPgOu/k/VUlB9MzacA' alt=''>データファイルの管理</a>";
    print "<a href='edit_rules.php?railroad_id=".$railroad_id."' class='wide_button'><img src='data:image/webp;base64,UklGRrYAAABXRUJQVlA4TKoAAAAvO8AOEC9AkG3T+aud6RwE2Tadv9qZHoJsm85f7UwPmYDF9qkurQgCbDuKVfkv3Na2rUQXyzlIAWM5LbwO3vRfDvYeFkf0fwK03rKx0OYWoNjWAhTXIEnbJOlK9t/QL8cpU0ZeGQ4W9JuNUMc4peRgihl5SSPUQT2UDqYgh/8ITZR6AFPYNKvj1IMpYYI6Q70pxZuc7XfB7vuIfAbsvo/IZ8Du+4h8AsHnAw==' alt=''>投稿ルールの編集</a>";
}

print "</article>";


print_footer();
