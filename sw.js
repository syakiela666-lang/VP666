const CACHE_NAME = 'vidplayer-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './icon-192.png',
  './icon-512.png',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).then(response => {
      // Update cache
      if(response && response.status === 200 && response.type === 'basic') {
        let responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
      }
      return response;
    }).catch(() => {
      return caches.match(event.request);
    })
  );
});
