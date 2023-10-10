<?php
include "../libs/wakarana/main.php";

$wakarana = new wakarana("../config");

if (!is_null($wakarana->logout())) {
    print "LOGGED_OUT";
} else {
    print "ERROR: 既にログインしていません";
}
