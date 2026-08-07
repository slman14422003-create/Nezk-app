// ============================================================
// Service Worker لنيزك إنستا - نسخة مستقلة عن النت
// ============================================================

const CACHE_NAME = 'nazik-instagram-v2.0.0';
const OFFLINE_URL = 'offline.html';

// الملفات المطلوب تخزينها مؤقتاً
const STATIC_ASSETS = [
  '/',
  'index.html',
  'offline.html',
  'manifest.json',
  'sw.js'
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
    .then(() => self.clients.claim())
  );
});

// ============================================================
// اعتراض الطلبات - استراتيجية Cache First ثم Network
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

  // تجاهل طلبات الصور الكبيرة من الإنترنت
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
            // تخزين النسخة الجديدة في الكاش
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
            // إذا كان الطلب لصفحة HTML، عرض صفحة offline
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
// نظام الإشعارات المتقدم
// ============================================================
let notificationPermission = false;

// طلب إذن الإشعارات
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'REQUEST_NOTIFICATION_PERMISSION') {
    self.registration.showNotification('📸 نيزك إنستا', {
      body: 'تفعيل الإشعارات لتلقي تنبيهات الرسائل الجديدة',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-96x96.png',
      vibrate: [200, 100, 200],
      tag: 'permission-request',
      requireInteraction: true,
      actions: [
        { action: 'allow', title: '✅ تفعيل' },
        { action: 'deny', title: '❌ إلغاء' }
      ]
    });
  }

  // عرض إشعار جديد
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

  // تحديث الإعدادات
  if (event.data && event.data.type === 'UPDATE_SETTINGS') {
    // يمكن تخزين الإعدادات في IndexedDB هنا
    console.log('[SW] تحديث الإعدادات:', event.data.payload);
  }
});

// ============================================================
// معالجة النقر على الإشعارات
// ============================================================
self.addEventListener('notificationclick', event => {
  console.log('[SW] النقر على الإشعار:', event.notification);

  const notification = event.notification;
  const action = event.action;

  // إغلاق الإشعار
  notification.close();

  // معالجة الإجراءات
  if (action === 'allow') {
    // المستخدم وافق على الإشعارات
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'NOTIFICATION_PERMISSION_GRANTED',
          payload: { granted: true }
        });
      });
    });
    return;
  }

  if (action === 'deny') {
    // المستخدم رفض الإشعارات
    return;
  }

  if (action === 'open' || !action) {
    // فتح التطبيق
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
// استقبال إشعارات من الخادم (Push API)
// ============================================================
self.addEventListener('push', event => {
  console.log('[SW] استقبال Push:', event);

  let data = {
    title: '📸 نيزك إنستا',
    body: 'رسالة جديدة',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-96x96.png',
    tag: 'push-notification',
    url: '/'
  };

  if (event.data) {
    try {
      const pushData = event.data.json();
      data = { ...data, ...pushData };
    } catch (e) {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: data.badge,
      vibrate: [200, 100, 200],
      tag: data.tag || 'push-notification',
      requireInteraction: true,
      data: {
        url: data.url || '/'
      },
      actions: [
        { action: 'open', title: '📖 فتح' },
        { action: 'dismiss', title: '✕ إغلاق' }
      ]
    })
  );
});

// ============================================================
// مزامنة الخلفية (Background Sync)
// ============================================================
self.addEventListener('sync', event => {
  console.log('[SW] مزامنة الخلفية:', event.tag);

  if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  }
});

async function syncMessages() {
  try {
    // هنا يمكن إضافة منطق مزامنة الرسائل في الخلفية
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'BACKGROUND_SYNC_COMPLETE',
        payload: { timestamp: Date.now() }
      });
    });
    console.log('[SW] ✅ مزامنة الخلفية مكتملة');
  } catch (error) {
    console.error('[SW] ❌ فشل مزامنة الخلفية:', error);
  }
}

// ============================================================
// إدارة الكاش المتقدم
// ============================================================
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.delete(CACHE_NAME)
        .then(() => {
          console.log('[SW] ✅ تم مسح الكاش');
          return self.clients.matchAll();
        })
        .then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'CACHE_CLEARED',
              payload: { success: true }
            });
          });
        })
    );
  }

  if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          return cache.keys();
        })
        .then(keys => {
          const size = keys.length;
          self.clients.matchAll().then(clients => {
            clients.forEach(client => {
              client.postMessage({
                type: 'CACHE_SIZE',
                payload: { size: size }
              });
            });
          });
        })
    );
  }
});

// ============================================================
// تسجيل الأخطاء
// ============================================================
self.addEventListener('error', event => {
  console.error('[SW] خطأ:', event.message);
});

console.log('[SW] ✅ Service Worker جاهز للعمل');
