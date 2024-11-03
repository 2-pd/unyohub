<?php
if (empty($_SERVER["PATH_INFO"])) {
    header("HTTP/1.1 403 Forbidden");
    exit;
}

$path_info_split = explode("/", $_SERVER["PATH_INFO"]);

if (count($path_info_split) <= 2 || $path_info_split[1] === "..") {
    header("HTTP/1.1 403 Forbidden");
    exit;
}

$train_icons = @json_decode(@file_get_contents("../data/".$path_info_split[1]."/train_icons.json"), TRUE);

if (empty($train_icons) || empty($train_icons[$path_info_split[2]])) {
    header("HTTP/1.1 404 Not Found");
    exit;
}

$icon_data = explode(";", $train_icons[$path_info_split[2]]);

header("Content-type: ".substr($icon_data[0], 5));

print base64_decode(substr($icon_data[1], 7));
