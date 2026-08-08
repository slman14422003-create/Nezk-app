// ============================================================
// Service Worker - نيزك إنستا
// يدعم التحديثات التلقائية والتخزين المؤقت
// ============================================================

const CACHE_VERSION = 'v2.0.0';
const CACHE_NAME = `nezek-chat-${CACHE_VERSION}`;
const RUNTIME_CACHE = `nezek-runtime-${CACHE_VERSION}`;

// الملفات التي سيتم تخزينها مؤقتاً
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/pwa-setup.js',
  '/pwa-install.js',
  '/notification-helper.js',
  '/offline.html',
  
  // أيقونات التطبيق
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  
  // الخطوط والأيقونات
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js',
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage-compat.js'
];

// ============================================================
// تثبيت Service Worker
// ============================================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Skip waiting...');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Install failed:', error);
      })
  );
});

// ============================================================
// تنشيط Service Worker
// ============================================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // حذف الكاشات القديمة
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Claiming clients...');
        return self.clients.claim();
      })
      .then(() => {
        // إعلام جميع العملاء بوجود تحديث
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: 'SW_ACTIVATED',
              version: CACHE_VERSION,
              message: 'تم تحديث التطبيق بنجاح'
            });
          });
        });
      })
  );
});

// ============================================================
// التعامل مع الطلبات - استراتيجية Stale-While-Revalidate
// ============================================================
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // تجاهل طلبات Firebase و Google APIs (سيتم التعامل معها بشكل منفصل)
  if (url.hostname.includes('firebase') || 
      url.hostname.includes('google') || 
      url.hostname.includes('gstatic')) {
    // استراتيجية الشبكة أولاً للمكتبات الخارجية
    event.respondWith(
      fetch(request)
        .then((response) => {
          // تخزين مؤقت للاستخدام المستقبلي
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }
  
  // للملفات الثابتة - استراتيجية Stale-While-Revalidate
  if (STATIC_ASSETS.some(asset => request.url.includes(asset) || request.url.endsWith(asset))) {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            // تحديث الكاش في الخلفية
            fetch(request)
              .then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                  caches.open(CACHE_NAME).then((cache) => {
                    cache.put(request, networkResponse);
                  });
                }
              })
              .catch(() => {
                // تجاهل أخطاء التحديث
              });
            return cachedResponse;
          }
          
          // إذا لم يكن في الكاش، حاول التحميل من الشبكة
          return fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(request, networkResponse.clone());
                });
                return networkResponse;
              }
              return networkResponse;
            })
            .catch(() => {
              // عرض صفحة عدم الاتصال
              if (request.headers.get('accept').includes('text/html')) {
                return caches.match('/offline.html');
              }
              return new Response('Offline', { status: 503 });
            });
        })
    );
    return;
  }
  
  // للطلبات الأخرى - استراتيجية الشبكة أولاً
  event.respondWith(
    fetch(request)
      .then((response) => {
        // تخزين الاستجابات الناجحة مؤقتاً
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // إذا كان طلب HTML، عرض صفحة عدم الاتصال
            if (request.headers.get('accept').includes('text/html')) {
              return caches.match('/offline.html');
            }
            return new Response('Offline', { status: 503 });
          });
      })
  );
});

// ============================================================
// الاستماع لرسائل من العملاء
// ============================================================
self.addEventListener('message', (event) => {
  const data = event.data;
  
  if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (data.type === 'CHECK_UPDATE') {
    // التحقق من وجود تحديثات
    fetch('/manifest.json', { cache: 'no-store' })
      .then((response) => response.json())
      .then((manifest) => {
        // التحقق من الإصدار
        event.ports[0].postMessage({
          type: 'UPDATE_CHECKED',
          hasUpdate: false,
          version: CACHE_VERSION
        });
      })
      .catch(() => {
        event.ports[0].postMessage({
          type: 'UPDATE_CHECKED',
          hasUpdate: false,
          error: 'Failed to check update'
        });
      });
  }
  
  if (data.type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME)
      .then(() => {
        caches.delete(RUNTIME_CACHE)
          .then(() => {
            event.ports[0].postMessage({
              type: 'CACHE_CLEARED',
              success: true
            });
          });
      });
  }
});

// ============================================================
// التعامل مع الإشعارات
// ============================================================
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '📱 نيزك إنستا';
  const options = {
    body: data.body || '📩 لديك رسالة جديدة',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/',
      messageId: data.messageId
    },
    actions: [
      {
        action: 'open',
        title: '📖 فتح'
      },
      {
        action: 'reply',
        title: '💬 رد'
      }
    ],
    tag: data.tag || 'notification',
    renotify: true,
    requireInteraction: true,
    silent: false
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// ============================================================
// التعامل مع نقر الإشعارات
// ============================================================
self.addEventListener('notificationclick', (event) => {
  const notification = event.notification;
  const action = event.action;
  const data = notification.data || {};
  
  notification.close();
  
  if (action === 'reply') {
    // فتح التطبيق والتركيز على مربع الكتابة
    event.waitUntil(
      self.clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then((clients) => {
          if (clients.length > 0) {
            clients[0].focus();
            clients[0].postMessage({
              type: 'FOCUS_INPUT',
              messageId: data.messageId
            });
          } else {
            self.clients.openWindow('/?focus-input=true&messageId=' + (data.messageId || ''));
          }
        })
    );
    return;
  }
  
  // فتح التطبيق
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clients) => {
        if (clients.length > 0) {
          clients[0].focus();
          if (data.url) {
            clients[0].navigate(data.url);
          }
        } else {
          self.clients.openWindow(data.url || '/');
        }
      })
  );
});

// ============================================================
// التعامل مع عدم الاتصال
// ============================================================
self.addEventListener('offline', () => {
  console.log('[SW] App is offline');
});

self.addEventListener('online', () => {
  console.log('[SW] App is online');
  // إعادة محاولة الطلبات الفاشلة
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: 'ONLINE_STATUS',
        status: 'online'
      });
    });
  });
});
