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
    print "<a href='announcements.php?railroad_id=".$railroad_id."' class='wide_button'><img src='data:image/webp;base64,UklGRpIDAABXRUJQVlA4TIYDAAAvR8AREHVIjCRJkaTVX2l/yO5pWAFqoXci4AgAWEhaZm125+v2bKtSZ9vGA2zfH2zbpX1XGWvbceBIbtvspTdeYIoi/YSaERR/ZQatevJByVqvt6fzVcb/fiB2CF+9dUrwUq9Sj78YOPl22c+gPl95wDqQNfkFp0SsA20NMJopwGl9NMEsQIzHs0TeJE0HMckJ9qC3q1ehUO4YwI3xLUX67NF3LXGaAKbg6eZ0RGhUJOyVq5coY0RgR654TCCB5rQ4kQw95uxIcdqxRi1+GBnMYINDETUhkY5PI2bpg6jkOIk/mTUpOYSNQQ4VY4/bq1nUmhaahfYiY+QbzbtMqmqJ1DYuv+KvAzW/Ri3u0hBvHaHvcCpQX8WBa6KS8KtLpKWhd12K/6cJCvQxlWZoBNQ6ioAqHRnvL0LO/Ia4mmH8SN6ieyXBfZpU+UCspdSlJU8wLVrSiPlaTZlOTxoaUCgy7TNfh782mL+EATlSoh0MZO4o+nLTseYM4S/Xcm2R08BvRJAHBsL3IDo9y/2PvSxQtUnOAztVhZ87kuRdSAvYcKs0ZNWF2cUnl6XaKuuB4Qdim0wElguKMhC5DzGZujf/CEAH+5/l+Z/ZynD+i6+ywN70ATzvGpeDQInBQO9ODAT6rAUKd6IkP5jbv9CdCA/c+w647IR74JMiwNwJdv4USwDsBC5geR6e58nzfMRDIGwnIgJ3Vp8l/y09z3p8gvrgMOsD/+xk73nm61VTP0XtQ2xTPysLjdF9mGzqeakPiGB2AdvZX/DZwoGUaab3u87+63QXLgLb3X5A5B7ENP1Atz9xvAVI593+pLSlRdk7UNDvlwo5axYh2nrQiQIypEppSo8W1mMpPanrTE9Nf6tmNRqv+9sSzZnThYS1SMqt4BY50K0cWgEr4UMNjqxkwFUzj/Bfh8BmHnF5VaF4NP+K5rWqz5FEmz6puF8aEt9OYOpqiTSwNC7FzcyPFtDmQbfczo9jE62K9kIodxJI+USdeXZ6vnYqeqqBdD49X1eJpwZb3VIHC+pHmouONSpxNS4ersCOSH4vuMutRKxJktORS+41I8A45+mJwYF+JcK5YwL3+Qov/b93/3yIsenTRoJdniVyL2rFZKCRfB4y9dC1REia/Myev0KtZQLk2mEb5Wf7BhbPGbhqrZBfQ36rxa0dguKrVL9l994pWd6vb1nWr4TPPWOyAA==' alt=''>お知らせの編集</a>";
}

if ($user->check_permission("railroads/".$railroad_id."/formation", "edit_data")) {
    print "<a href='formations.php?railroad_id=".$railroad_id."' class='wide_button'><img src='data:image/webp;base64,UklGRpQBAABXRUJQVlA4TIcBAAAvNUANEK/BoJEkRbUn4wWeitf6eQfMtDYYNJKkqPa0nJLX/xo+74CZlkEjSYpqz8D7F/NSyAEzLdta2158cuhypoqdWQxiOwNYwD+ANlNSpjdAVYPaDtR1rTgMw4sXPy5kmVkjL6UAKtLMNMDDhZ6ZXynle9+3zczzPM97WRZpnufnOI7q//8/M0fcAIAPPb6IAKTv+5rMpIhI5nmeMpP6vg/+/+ewYgPAIgJg//8DQ0SgbequqRUZXEmSpCoLPFfc3d25/+FWnj/gryei/4zctnEknabtassr2Be03SBkUGWbGsgWSLPKMbQWNHIEUquq+RqCnniOk1JVp67pHgPgGlrTEkilKlS8K5u0UCR+VVZkNchoSzYXyvrvqv4cvgFIVwJSihD4ANKVAKQT8YdRMCs/hvS1ZOdTBl4YrllwY7hnwYPhuRtRV1NJI9qriZX1YjisR9RX0ifaqImVdWTAmASn6gRJJMlaiSyVCRJIlDWYcWZbZYIEkmVtFxPMh+oEScTO+mICAA==' alt=''>編成情報の編集</a>";
}

if ($user->check_permission("railroads/".$railroad_id, "edit_data")) {
    print "<a href='manage_files.php?railroad_id=".$railroad_id."' class='wide_button'><img src='data:image/webp;base64,UklGRnYAAABXRUJQVlA4TGoAAAAvO8AOEBcwzMM8zAKBJOsVxg74CI4j2WqjkTchECJRKBSO1EsT87R+jxH9nwCApDLSrGlw1tYIkIMTHQ3O6gQn1upZGpzxhkvVAUg9qxNaJ0CKjgZndYITHQ3O6pyPgOu/k/VUlB9MzacA' alt=''>データファイルの管理</a>";
}

print "</article>";


print_footer();
