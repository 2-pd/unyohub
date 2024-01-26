var unyo_version = "24.01-2"; /*鉄道運用Hub本体のバージョン番号*/

var cache_name = "unyohub_" + unyo_version;
var files_to_cache = [
        "./",
        "apple-touch-icon.webp",
        "maskable_icon.webp",
        "monochrome_icon.webp",
        "favicon.ico",
        "splash_screen_image.webp",
        "README.html"
    ];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(cache_name).then(function(cache) {
            return cache.addAll(files_to_cache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }
            
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(cacheName) {
                    if (cacheName != cache_name){
                        return caches.delete(cacheName);
                    }
            }));
        })
    );
});
