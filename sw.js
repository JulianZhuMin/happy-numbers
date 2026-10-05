// Offline support for Happy Numbers 快樂數字. Bump CACHE (and APP_VERSION in index.html) on every release.
var CACHE = 'happy-numbers-v1b';
var NUMS = [1,2,3,4,5,6,7,8,9,10];
var CLIPS = NUMS.reduce(function (a, n) {
  return a.concat(['./audio/n' + n + '.mp3', './audio/n' + n + '-en.mp3', './audio/ask-n' + n + '.mp3', './audio/ask-n' + n + '-en.mp3']);
}, []).concat(['./audio/yeah.mp3', './audio/uhoh.mp3', './audio/byebye.mp3', './audio/well-done.mp3', './audio/lets-learn.mp3', './audio/lets-learn-en.mp3']);
var FILES = ['./', './index.html', './manifest.json', './icon.svg', './icon-180.png', './icon-192.png', './icon-512.png', './icon-maskable-512.png'].concat(CLIPS);
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return c.addAll(FILES.map(function (f) { return new Request(f, { cache: 'reload' }); }));
  }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  var cacheFirst = /\/audio\/[\w-]+\.mp3$|\.png$|\.svg$/.test(url.pathname);
  if (cacheFirst) {
    e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(function (m) {
      return m || fetch(e.request).then(function (r) {
        if (r && r.ok) { var copy = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); }
        return r;
      });
    }));
    return;
  }
  e.respondWith(fetch(e.request, { cache: 'no-cache' }).then(function (r) {
    if (r && r.ok) { var copy = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); }
    return r;
  }).catch(function () {
    return caches.match(e.request, { ignoreSearch: true }).then(function (m) { return m || caches.match('./index.html'); });
  }));
});
