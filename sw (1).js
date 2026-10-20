/* Medha service worker: lets the app install and open without internet.
   The app page is fetched fresh when online (so updates appear) and served from the cache when offline.
   AI, translation and sign-in requests are never cached. */
const CACHE = "medha-v2";
const SHELL = ["./", "./index.html", "./config.js", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET") return;                                   // AI calls are POST: never touched
  const sameSite = url.origin === self.location.origin;
  const fonts = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameSite && !fonts) return;                                     // everything else goes straight to the network
  if (sameSite) {
    // network first and revalidated with GitHub, so a new version shows up at once; cache as fallback when offline
    e.respondWith(fetch(req, {cache: "no-cache"}).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })
      .catch(() => caches.match(req).then(r => r || caches.match("./index.html"))));
  } else {
    // fonts rarely change: cache first
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })));
  }
});
