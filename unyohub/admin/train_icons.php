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

$icon_dir_path = "../data/".$path_info_split[1]."/icons/";
$icon_list = @json_decode(@file_get_contents($icon_dir_path."icon_list.json"), TRUE);

if (empty($icon_list) || empty($icon_list[$path_info_split[2]]) || !file_exists($icon_dir_path.$icon_list[$path_info_split[2]]["file_name"])) {
    header("HTTP/1.1 404 Not Found");
    exit;
}

header("Content-type: ".$icon_list[$path_info_split[2]]["media_type"]);

readfile($icon_dir_path.$icon_list[$path_info_split[2]]["file_name"]);
