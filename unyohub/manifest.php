<?php
header("Content-Type: application/manifest+json");

$config = parse_ini_file("config/main.ini");

$root_url = "http".(empty($_SERVER["HTTPS"]) ? "" : "s")."://".$_SERVER["HTTP_HOST"];
$instance_name = addslashes($config["instance_name"]);
$instance_introduction = addslashes(str_replace("\n", " ", stripcslashes($config["instance_introduction"])));
print <<< EOM
{
    "id" : "{$root_url}/",
    "name" : "{$instance_name}",
    "short_name" : "{$instance_name}",
    "display" : "standalone",
    "start_url" : "/",
    "scope" : "/",
    "background_color" : "#222222",
    "theme_color" : "#333333",
    "orientation" : "natural",
    "icons": [
        {
            "src": "apple-touch-icon.webp",
            "type": "image/webp",
            "sizes": "192x192",
            "purpose": "any"
        },
        {
            "src": "maskable_icon.webp",
            "type": "image/webp",
            "sizes": "192x192",
            "purpose": "maskable"
        },
        {
            "src": "monochrome_icon.webp",
            "type": "image/webp",
            "sizes": "192x192",
            "purpose": "monochrome"
        }
    ],
    "categories" : ["navigation", "travel"],
    "description" : "{$instance_introduction}",
    "screenshots" : [
        {
            "src": "large_image.webp",
            "type": "image/webp",
            "sizes": "1600x838"
        }
    ]
}
EOM;
