const CACHE_NAME = 'anwar-ispat-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/Logo.png',
  '/logo-dark.png',
  '/product_image.png',
  '/founder.webp',
  '/md.webp',
  '/anwar_favicon.png',
];

const RUNTIME_CACHE = 'anwar-ispat-runtime-v1';
const MAX_RUNTIME_ENTRIES = 50;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin !== location.origin) return;

  if (request.method !== 'GET') return;

  if (request.destination === 'document') {
    event.respondWith(
      caches.match(request).then((cached) => {
        const networked = fetch(request)
          .then((response) => {
            const cacheCopy = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, cacheCopy);
            });
            return response;
          })
          .catch(() => cached);
        return cached || networked;
      })
    );
    return;
  }

  if (
    request.destination === 'image' ||
    request.destination === 'video' ||
    request.destination === 'audio'
  ) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then((cache) => {
        return cache.match(request).then((cached) => {
          const networked = fetch(request)
            .then((response) => {
              const cacheCopy = response.clone();
              cache.put(request, cacheCopy);
              return response;
            })
            .catch(() => cached);
          return cached || networked;
        });
      })
    );
    return;
  }

  if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cached) => {
          const networked = fetch(request)
            .then((response) => {
              const cacheCopy = response.clone();
              cache.put(request, cacheCopy);
              return response;
            })
            .catch(() => cached);
          return cached || networked;
        });
      })
    );
    return;
  }
});

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});