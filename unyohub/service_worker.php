<?php
include "./version.php";

define("UNYOHUB_APP_ID", "unyohub");

header("Content-Type: text/javascript");
?>
var files_to_cache = [
        "/",
        "/main.js?v=<?php print UNYOHUB_VERSION ?>",
        "/assets.css?v=<?php print UNYOHUB_VERSION ?>",
        "/on_demand_funcs.js?v=<?php print UNYOHUB_VERSION ?>",
        "/non_critical.css?v=<?php print UNYOHUB_VERSION ?>",
        "/libs/zizai_captcha/captcha.js",
        "/libs/elem2img.js",
        "/apple-touch-icon.webp",
        "/maskable_icon.webp",
        "/monochrome_icon.webp",
        "/favicon.ico",
        "/splash_screen_image.webp"
    ];

var new_cache_name = "<?php print UNYOHUB_APP_ID."_v".UNYOHUB_VERSION ?>";

self.addEventListener("install", function (evt) {
    evt.waitUntil(
        caches.open(new_cache_name).then(function (cache) {
            return cache.addAll(files_to_cache);
        })
    );
});

self.addEventListener("fetch", function (evt) {
    evt.respondWith(
        caches.match(evt.request).then(function (response) {
            if (response) {
                return response;
            }
            
            return fetch(evt.request);
        })
    );
});

self.addEventListener("activate", function (evt) {
    evt.waitUntil(
        caches.keys().then(function (cache_names) {
            return Promise.all(cache_names.map(function (cache_name) {
                if (cache_name !== new_cache_name) {
                    return caches.delete(cache_name);
                }
            }));
        })
    );
});
