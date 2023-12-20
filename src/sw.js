self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('virtualpets').then((cache) => cache.addAll([
      '/projects/games/virtualpets/',
      '/projects/games/virtualpets/index.html',
      '/projects/games/virtualpets/main.js',
      '/projects/games/virtualpets/data/locales/en/messages.json',
      '/projects/games/virtualpets/data/locales/ru/messages.json'
    ])),
  );
});
 
self.addEventListener('fetch', (e) => {
  console.log('ServiceWorker is fetching %s', e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});