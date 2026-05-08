const CACHE_NAME = 'ragequit-guild-app-v3';
const APP_SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/maskable-icon-512.png',
];

const fromScope = (path) => new URL(path, self.location.href).toString();
const indexUrl = fromScope('index.html');

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(APP_SHELL.map(fromScope));

      const indexResponse = await fetch(indexUrl, { cache: 'no-store' });
      const indexHtml = await indexResponse.clone().text();
      await cache.put(indexUrl, indexResponse);

      const assetUrls = Array.from(indexHtml.matchAll(/"([^"]*\/assets\/[^"]+)"/g)).map(
        (match) => match[1],
      );

      await Promise.all(
        assetUrls.map((assetUrl) =>
          cache.add(new URL(assetUrl, indexUrl).toString()).catch(() => {
            return undefined;
          }),
        ),
      );

      await self.skipWaiting();
    }),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const requestUrl = new URL(request.url);

  if (request.method !== 'GET') {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(indexUrl, copy));
          return response;
        })
        .catch(() => caches.match(indexUrl).then((cached) => cached || caches.match(fromScope('./')))),
    );
    return;
  }

  if (requestUrl.origin === self.location.origin && requestUrl.pathname.endsWith('/data/progress.json')) {
    event.respondWith(
      fetch(request, { cache: 'no-store' })
        .then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }

          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request)),
    );
    return;
  }

  if (requestUrl.origin !== self.location.origin) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type === 'opaque') {
            return response;
          }

          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request)),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }

        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    }),
  );
});
