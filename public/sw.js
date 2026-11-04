// Order Socielle Service Worker for Offline Reliability & PWA Installation
const CACHE_NAME = 'order-socielle-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Let network handle dynamic requests, fallback gracefully
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

