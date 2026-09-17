// Minimal offline cache for My Istanbul.
// Only caches HTML page navigations (so the itinerary, a place page, or the
// Turkish phrasebook keep opening offline after a first visit) and the core
// app shell assets. It deliberately leaves /_next/static/* build assets
// alone — Next.js already serves those with long-lived immutable cache
// headers, and letting the service worker intercept them risks breaking
// Next's own chunk-loading if a deploy rotates file hashes mid-session.
const CACHE = "my-istanbul-v2";
const APP_SHELL = ["/", "/manifest.json", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/_next/")) return; // let Next.js's own asset caching handle these

  const isNavigation = request.mode === "navigate";
  if (!isNavigation && !APP_SHELL.includes(url.pathname)) return;

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      try {
        const response = await fetch(request);
        if (response && response.status === 200) cache.put(request, response.clone());
        return response;
      } catch {
        const cached = await cache.match(request);
        return cached || Response.error();
      }
    })
  );
});
