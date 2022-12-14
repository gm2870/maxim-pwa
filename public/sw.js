var STATIC_CACHE_NAME = "static-v4";
var DYNAMIC_CACHE_NAME ="dynamic-v2"
self.addEventListener('install', event => {
    event.waitUntil((caches.open(STATIC_CACHE_NAME)).then(function (cache) {
        cache.addAll([
            '/',
            '/index.html',
            '/offline.html',
            '/src/js/app.js',
            '/src/js/feed.js',
            '/src/js/fetch.js',
            '/src/js/material.min.js',
            '/src/js/promise.js',
            '/src/css/app.css',
            '/src/css/feed.css',
            '/src/images/main-image.jpg',
            'https://fonts.googleapis.com/css?family=Roboto:400,700',
            'https://fonts.googleapis.com/icon?family=Material+Icons',
            'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
        ]);
    }));
});

self.addEventListener('activate',event => {
    event.waitUntil(caches.keys().then(function(keyList){
        return Promise.all(keyList.map(function(key) {
            if(key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME) {
                return caches.delete(key);
            }
        }));
    }));
    return self.clients.claim();
});

self.addEventListener('fetch',event => {
    event.respondWith(
        caches.match(event.request).then(function(response){
            if(response) {
                return response;
            }else {
                return fetch(event.request).then(function(res){
                    return caches.open(DYNAMIC_CACHE_NAME).then(function(cache){
                        cache.put(event.request.url,res.clone());
                        return res;
                    });
                }).catch(function (err) {
                   return caches.open(STATIC_CACHE_NAME).then((cache) => cache.match('/offline.html'))
                });
            }
        })
    );
});
