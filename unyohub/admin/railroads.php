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
    print "<a href='announcements.php?railroad_id=".$railroad_id."' class='wide_button'><img src='data:image/webp;base64,UklGRq4CAABXRUJQVlA4TKECAAAvR8ARELVIkmRbtZX5jzob+8nZ52LN/T/u+hYOEXAYACDk5N6qbdsYbdu2bXezbdu2bdu2bUzAPNHFwEGZOTe+/CeZ22el7NEfBJi+0Vzrzwi92wHI2sxS66R3g5Kb5bIgt0JmIY3mkG6E0l5OetPIggDy28zM7dvTnxruT8Quim3g20j1LhreXAlXuLcSa682AdKWah79LERtvEQzYA/OqRqgZym4ghIOW6DwXAyAzWIg1cUTsh1kJIl9BLMc0lSSSN3gj89CdRpx+E7yCkmfkCTRN63SkkRAn7VCqQeNvySW2jAmiRuwnjGYJOi6mBVF08y5MO6SVPh0ESriu7QUyl1w/ifR3GW14OgaV0msdHkp8NrMJvnShChJvE27hiRB0EOw2O6TUvD30CoG+/gW6j08i7I+hoV7j6Qipo9IkdCjqbztQ1fU91gqn/uA75OYb/njs6DtG3NJfIB24E2SL0Ab3CUJrg7mxeRs+Lo87ZBY5O1AsYjrMFje7nBf9DU891DI7PD8WxJ3gHXok8TPpx1GR5Lcr2NWzM2WggujdYqLxD1IFPnrnJSdfyzDme2xruK6H6dVWvbTuAiuj/0+v1rDKkleAM+uapPkbo3u8mu2ZVF0LkHqp5DeB77PJB+frxCYJD9u+8ybJOG3ANRxETobMyxOwa5jnCR+Me0E4ylJvl11s1zezNbSikWga1imktoLdwmzK+B+KsZnc53FyavLlKWS2I1IidLLcugnKyu1F8FzsZDydbbnVFzBvgSO68JhP1R+/CdRCzj3XG2S+Ea538gpef7z1KfnqTLngCg8lfwTgv/1awIf/6V6RH6EIe+nXO6X0hyTy8trXnKeo1LxdNnbz3NcRBJ/nPsh89scGiVHbdY9/36ulf3TedQGAA==' alt=''>お知らせの編集</a>";
}

if ($user->check_permission("railroads/".$railroad_id."/formation", "edit_data")) {
    print "<a href='formations.php?railroad_id=".$railroad_id."' class='wide_button'><img src='data:image/webp;base64,UklGRpQBAABXRUJQVlA4TIcBAAAvNUANEK/BoJEkRbUn4wWeitf6eQfMtDYYNJKkqPa0nJLX/xo+74CZlkEjSYpqz8D7F/NSyAEzLdta2158cuhypoqdWQxiOwNYwD+ANlNSpjdAVYPaDtR1rTgMw4sXPy5kmVkjL6UAKtLMNMDDhZ6ZXynle9+3zczzPM97WRZpnufnOI7q//8/M0fcAIAPPb6IAKTv+5rMpIhI5nmeMpP6vg/+/+ewYgPAIgJg//8DQ0SgbequqRUZXEmSpCoLPFfc3d25/+FWnj/gryei/4zctnEknabtassr2Be03SBkUGWbGsgWSLPKMbQWNHIEUquq+RqCnniOk1JVp67pHgPgGlrTEkilKlS8K5u0UCR+VVZkNchoSzYXyvrvqv4cvgFIVwJSihD4ANKVAKQT8YdRMCs/hvS1ZOdTBl4YrllwY7hnwYPhuRtRV1NJI9qriZX1YjisR9RX0ifaqImVdWTAmASn6gRJJMlaiSyVCRJIlDWYcWZbZYIEkmVtFxPMh+oEScTO+mICAA==' alt=''>編成情報の編集</a>";
}

if ($user->check_permission("railroads/".$railroad_id, "edit_data")) {
    print "<a href='manage_files.php?railroad_id=".$railroad_id."' class='wide_button'><img src='data:image/webp;base64,UklGRo4AAABXRUJQVlA4TIIAAAAvO8AOECcgEEjyhxxhHoFAkj/kCDMIBJL8IUeYQSBAuNagWoB/VAHhqJEkR+oxALYhNIcGsKb4kxpb6868Ivo/AdJGt8t4HxLJJ2Rpr0AiOQmJ5CQkkg90V5BI+RyLdkdpTjKSxgnSqWokjSQjaSQZSSPJSHqVcvnfWYHb6v7Exm8C' alt=''>データファイルの管理</a>";
    print "<a href='edit_rules.php?railroad_id=".$railroad_id."' class='wide_button'><img src='data:image/webp;base64,UklGRrYAAABXRUJQVlA4TKoAAAAvO8AOEC9AkG3T+aud6RwE2Tadv9qZHoJsm85f7UwPmYDF9qkurQgCbDuKVfkv3Na2rUQXyzlIAWM5LbwO3vRfDvYeFkf0fwK03rKx0OYWoNjWAhTXIEnbJOlK9t/QL8cpU0ZeGQ4W9JuNUMc4peRgihl5SSPUQT2UDqYgh/8ITZR6AFPYNKvj1IMpYYI6Q70pxZuc7XfB7vuIfAbsvo/IZ8Du+4h8AsHnAw==' alt=''>投稿ルールの編集</a>";
}

print "</article>";


print_footer();
