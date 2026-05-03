const CACHE_NAME = 'ai-leetcode-pwa-v1';
const ASSETS_TO_CACHE = [
  '/ai-leetcode/',
  '/ai-leetcode/about/',
  '/ai-leetcode/categories/',
  '/ai-leetcode/tags/',
  '/ai-leetcode/assets/images/logo-512.webp'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event with Network-first falling back to cache strategy for HTML,
// and Stale-while-revalidate for other assets
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // For same-origin resources
  if (url.origin === self.location.origin) {
    if (request.mode === 'navigate') {
      // Network-first for navigation
      event.respondWith(
        fetch(request)
          .then((response) => {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            return response;
          })
          .catch(() => caches.match(request).then((cachedResponse) => cachedResponse || caches.match('/ai-leetcode/')))
      );
    } else {
      // Stale-while-revalidate for assets
      event.respondWith(
        caches.match(request).then((cachedResponse) => {
          const fetchPromise = fetch(request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              const copy = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            }
            return networkResponse;
          }).catch(() => null);

          return cachedResponse || fetchPromise;
        })
      );
    }
  } else {
    // Cross-origin requests (e.g., Google Fonts, MathJax) - cache-first or network-first
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        return cachedResponse || fetch(request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        }).catch(() => null);
      })
    );
  }
});
