const CACHE = "kanji-kakijun-v4";
const ROOT = new URL("./", self.registration.scope).toString();
const assetUrl = (path) => new URL(path, ROOT).toString();
const KANJI = [
  "04e2d", "04e94", "05929", "05b66", "05c71", "06587", "065e5", "06708",
  "06728", "0672c", "06b63", "06c34", "0706b", "0738b", "07530", "076ee"
];
const ASSETS = [
  ROOT,
  assetUrl("manifest.webmanifest"),
  assetUrl("icon-512.png"),
  assetUrl("og.png"),
  ...KANJI.map((code) => assetUrl(`kanji/${code}.svg`))
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fresh = fetch(event.request)
        .then((response) => {
          if (response.ok && new URL(event.request.url).origin === self.location.origin) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached || caches.match(ROOT));
      return cached || fresh;
    }),
  );
});