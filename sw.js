// ============================================================
// Service Worker لنيزك إنستا - نسخة مستقرة
// ============================================================

const CACHE_NAME = 'nazik-instagram-v2.0.0';
const OFFLINE_URL = 'offline.html';

// الملفات المطلوب تخزينها مؤقتاً
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/sw.js',
  '/pwa-setup.js',
  '/pwa-install.js',
  '/notification-helper.js'
];

// ============================================================
// تثبيت Service Worker
// ============================================================
self.addEventListener('install', event => {
  console.log('[SW] تثبيت Service Worker');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] تخزين الملفات الأساسية');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch(error => {
        console.error('[SW] فشل تخزين الملفات:', error);
      })
      .then(() => self.skipWaiting())
  );
});

// ============================================================
// تنشيط Service Worker
// ============================================================
self.addEventListener('activate', event => {
  console.log('[SW] تنشيط Service Worker');

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] حذف الكاش القديم:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('[SW] ✅ Service Worker جاهز');
      return self.clients.claim();
    })
  );
});

// ============================================================
// اعتراض الطلبات
// ============================================================
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // تجاهل طلبات Firebase
  if (url.hostname.includes('firebase') || 
      url.hostname.includes('googleapis') ||
      url.hostname.includes('gstatic')) {
    event.respondWith(fetch(request));
    return;
  }

  // تجاهل طلبات الصور من الإنترنت
  if (url.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i) && 
      !url.pathname.startsWith('/icons/')) {
    event.respondWith(fetch(request));
    return;
  }

  // استراتيجية: كاش أولاً، ثم الشبكة
  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(request)
          .then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(request, responseClone);
                });
            }
            return networkResponse;
          })
          .catch(() => {
            if (request.headers.get('accept').includes('text/html')) {
              return caches.match(OFFLINE_URL);
            }
            return new Response('غير متصل بالإنترنت', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// ============================================================
// نظام الإشعارات
// ============================================================
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, body, icon, tag } = event.data.payload;
    self.registration.showNotification(title, {
      body: body,
      icon: icon || '/icons/icon-192x192.png',
      badge: '/icons/icon-96x96.png',
      vibrate: [200, 100, 200],
      tag: tag || 'chat-notification',
      requireInteraction: true,
      data: {
        url: event.data.payload.url || '/'
      },
      actions: [
        { action: 'open', title: '📖 فتح' },
        { action: 'dismiss', title: '✕ إغلاق' }
      ]
    });
  }
});

// ============================================================
// معالجة النقر على الإشعارات
// ============================================================
self.addEventListener('notificationclick', event => {
  const notification = event.notification;
  const action = event.action;

  notification.close();

  if (action === 'open' || !action) {
    event.waitUntil(
      self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true
      }).then(clients => {
        if (clients.length > 0) {
          return clients[0].focus();
        } else {
          return self.clients.openWindow(notification.data.url || '/');
        }
      })
    );
  }
});

// ============================================================
// مزامنة الخلفية
// ============================================================
self.addEventListener('sync', event => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'BACKGROUND_SYNC_COMPLETE',
            payload: { timestamp: Date.now() }
          });
        });
      })
    );
  }
});

console.log('[SW] ✅ Service Worker جاهز للعمل');
