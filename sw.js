/* ALBA – Przejazdy prywatne: service worker
   Po każdej zmianie plików aplikacji podnieś numer wersji w CACHE. */
const CACHE = 'alba-przejazdy-v0.1';
const ASSETS = ['./', 'index.html', 'manifest.webmanifest', 'xlsx.full.min.js',
  'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  if (e.request.mode === 'navigate') {
    e.respondWith(caches.match('index.html').then(r => r || fetch(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(r => r || fetch(e.request)));
});
