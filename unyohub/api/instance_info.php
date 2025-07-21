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
    
    $instance_info = array(
        "instance_name" => $main_config["instance_name"],
        "available_days_ahead" => $main_config["available_days_ahead"],
        "allow_guest_user" => $main_config["allow_guest_user"],
        "require_comments_on_speculative_posts" => $main_config["require_comments_on_speculative_posts"]
    );
    
    if (!empty($main_config["introduction_text"])) {
        $instance_info["introduction_text"] = stripcslashes($main_config["introduction_text"]);
    }
    
    if (!empty($main_config["manual_url"])) {
        $instance_info["manual_url"] = $main_config["manual_url"];
    }
    
    if (!empty($main_config["administrator_name"])) {
        $instance_info["administrator_name"] = $main_config["administrator_name"];
        
        if (!empty($main_config["administrator_url"])) {
            $instance_info["administrator_url"] = $main_config["administrator_url"];
        }
    }
    
    if (!empty($main_config["administrator_introduction"])) {
        $instance_info["administrator_introduction"] = stripcslashes($main_config["administrator_introduction"]);
    }
    
    if (!empty($main_config["quotation_guidelines"])) {
        $instance_info["quotation_guidelines"] = stripcslashes($main_config["quotation_guidelines"]);
    }
    
    print json_encode($instance_info, JSON_UNESCAPED_UNICODE);
}
