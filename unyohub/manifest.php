<?php
header("Content-Type: application/manifest+json");

$app_manifest = json_decode(file_get_contents("config/app_manifest.json"), TRUE);
$main_config = parse_ini_file("config/main.ini");

$output_data = array(
    "id" => "http".(empty($_SERVER["HTTPS"]) ? "" : "s")."://".$_SERVER["HTTP_HOST"]."/",
    "name" => $app_manifest["name"],
    "short_name" => $app_manifest["name"],
    "display" => "standalone",
    "start_url" => "/",
    "scope" => "/",
    "background_color" => "#222222",
    "theme_color" => $app_manifest["theme_color"],
    "orientation" => "natural",
    "icons" => $app_manifest["icons"],
    "categories" => array("navigation", "travel"),
    "description" => str_replace("\n", " ", stripcslashes($main_config["instance_introduction"])),
    "screenshots" => $app_manifest["screenshots"]
);

if (!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && str_contains($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) {
    header("Content-Encoding: gzip");
    
    print gzencode(json_encode($output_data, JSON_UNESCAPED_UNICODE));
} else {
    print json_encode($output_data, JSON_UNESCAPED_UNICODE);
}
