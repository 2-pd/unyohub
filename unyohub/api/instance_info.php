<?php
define("MAIN_CONFIG_PATH", "../config/main.ini");

$last_modified = @filemtime(MAIN_CONFIG_PATH);
if ($last_modified === FALSE) {
    print "ERROR: main.iniにアクセスできません";
    exit;
}

if (isset($_POST["last_modified_timestamp"]) && $last_modified <= intval($_POST["last_modified_timestamp"])) {
    print "NO_UPDATES_AVAILABLE";
} else {
    header("Last-Modified: ".gmdate("D, d M Y H:i:s", $last_modified)." GMT");
    
    $main_config = parse_ini_file(MAIN_CONFIG_PATH, FALSE, INI_SCANNER_TYPED);
    
    print json_encode(array(
        "instance_name" => $main_config["instance_name"],
        "allow_sign_up" => $main_config["allow_sign_up"],
        "require_email_address" => $main_config["require_email_address"],
        "allow_guest_user" => $main_config["allow_guest_user"]
    ), JSON_UNESCAPED_UNICODE);
}
