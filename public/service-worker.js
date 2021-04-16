const cacheName='cache-v1';
const resourcesToPrecache=[

    '/',
    'index.html',
    'styles.css',
    'index.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    'manifest.webmanifest'
]


self.addEventListener('fetch', 
function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(cachedResponse=>{
        return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener('install', 
event=>{
    console.log("installed");
    event.waitUntil(
        caches.open(cacheName)
        .then(cache=>{
            return cache.addAll(resourcesToPrecache);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', 
event=>{
    console.log("activated");
});

self.addEventListener('sync', function(event) {
    if (event.tag === 'store') {
      //event.waitUntil(doSomething());
    }
  });
  