const CACHE = "kanji-kakijun-v12";
const ROOT = new URL("./", self.registration.scope).toString();
const assetUrl = (path) => new URL(path, ROOT).toString();
const KANJI = [
  "04e2d", "04e94", "04f11", "05148", "0516d", "05186", "051fa", "053f3",
  "0540d", "056db", "05929", "05b57", "05b66", "05c71", "05de6", "05e74",
  "0624b", "06587", "065e5", "065e9", "06708", "06728", "0672c", "06751",
  "0677e", "06821", "068ee", "06b63", "06c17", "06c34", "0706b", "072ac",
  "07389", "0738b", "0751f", "07530", "07537", "0753a", "0767d", "0767e",
  "076ee", "077f3", "07a7a", "07acb", "07af9", "07cf8", "08033", "082b1",
  "08349", "0866b", "0898b", "08c9d", "08d64", "08db3", "08eca", "091d1",
  "096e8", "09752", "097f3"
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
