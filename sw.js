// MAS Tracker Service Worker
// by Rizki Nur Amaludin

const CACHE_NAME = 'mas-tracker-v1.0.0';
const STATIC_ASSETS = [
  '/mas-tracker/',
  '/mas-tracker/index.html',
  '/mas-tracker/splash.html',
  '/mas-tracker/manifest.json',
  '/mas-tracker/assets/logo-192.png',
  '/mas-tracker/assets/logo-512.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[MAS Tracker] Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch((err) => console.log('[MAS Tracker] Cache failed:', err))
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[MAS Tracker] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip chrome-extension requests
  if (event.request.url.startsWith('chrome-extension://')) return;
  
  event.respondWith(
    caches.match(event.request).then((cached) => {
      // Return cached version or fetch from network
      if (cached) {
        // Update cache in background
        fetch(event.request)
          .then((response) => {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, response.clone());
            });
          })
          .catch(() => {});
        return cached;
      }
      
      return fetch(event.request)
        .then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Return offline fallback if available
          if (event.request.mode === 'navigate') {
            return caches.match('/mas-tracker/index.html');
          }
        });
    })
  );
});

// Background sync for offline transactions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-transactions') {
    event.waitUntil(syncTransactions());
  }
});

// Push notifications support
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'Pengingat dari MAS Tracker',
    icon: '/mas-tracker/assets/logo-192.png',
    badge: '/mas-tracker/assets/logo-192.png',
    tag: 'mas-tracker-notification',
    requireInteraction: true,
    actions: [
      { action: 'open', title: 'Buka Aplikasi' },
      { action: 'dismiss', title: 'Tutup' }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('MAS Tracker', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('/mas-tracker/')
    );
  }
});

async function syncTransactions() {
  console.log('[MAS Tracker] Syncing offline transactions...');
  // Implement sync logic here
}