// ============================================================
// إعداد PWA المتقدم - نيزك إنستا
// دعم التحديثات التلقائية والتثبيت والإشعارات
// ============================================================

class PWAManager {
  constructor() {
    this.deferredPrompt = null;
    this.swRegistration = null;
    this.isInstalled = false;
    this.isOnline = navigator.onLine;
    this.updateAvailable = false;
    this.newVersionReady = false;
    this.isPWA = window.matchMedia('(display-mode: standalone)').matches;
    
    // تهيئة المدير
    this.init();
  }
  
  async init() {
    console.log('[PWA] تهيئة مدير التطبيق...');
    
    // التحقق من دعم Service Worker
    if ('serviceWorker' in navigator) {
      try {
        await this.registerServiceWorker();
        this.setupUpdateListener();
      } catch (error) {
        console.error('[PWA] فشل تسجيل Service Worker:', error);
      }
    }
    
    // التحقق من دعم التثبيت
    this.setupInstallPrompt();
    
    // التحقق من دعم الإشعارات
    if ('Notification' in window) {
      this.setupNotifications();
    }
    
    // مراقبة حالة الاتصال
    this.setupNetworkMonitoring();
    
    // التحقق من وجود تحديثات
    this.checkForUpdates();
    
    // إعداد التحديث التلقائي
    this.setupAutoUpdate();
    
    // إضافة زر التحديث
    this.createUpdateButton();
    
    // إضافة زر التثبيت
    this.createInstallButton();
    
    console.log(`[PWA] التطبيق يعمل كـ ${this.isPWA ? 'PWA' : 'تطبيق ويب'}`);
  }
  
  // ============================================================
  // تسجيل Service Worker
  // ============================================================
  async registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });
      
      this.swRegistration = registration;
      console.log('[PWA] Service Worker مسجل بنجاح');
      
      // التحقق من وجود تحديث
      if (registration.waiting) {
        this.updateAvailable = true;
        this.showUpdateNotification();
      }
      
      // مراقبة تحديثات Service Worker
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('[PWA] تم العثور على تحديث جديد');
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            this.updateAvailable = true;
            this.showUpdateNotification();
          }
        });
      });
      
      // استقبال رسائل من Service Worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        this.handleServiceWorkerMessage(event.data);
      });
      
      return registration;
    } catch (error) {
      console.error('[PWA] فشل تسجيل Service Worker:', error);
      throw error;
    }
  }
  
  // ============================================================
  // معالجة رسائل Service Worker
  // ============================================================
  handleServiceWorkerMessage(data) {
    switch (data.type) {
      case 'SW_ACTIVATED':
        console.log('[PWA] تم تنشيط Service Worker:', data.message);
        this.showNotification('🔄 تم تحديث التطبيق بنجاح', data.message);
        break;
        
      case 'UPDATE_CHECKED':
        if (data.hasUpdate) {
          this.updateAvailable = true;
          this.showUpdateNotification();
        }
        break;
        
      case 'CACHE_CLEARED':
        console.log('[PWA] تم مسح الكاش');
        break;
        
      case 'FOCUS_INPUT':
        // التركيز على مربع الكتابة
        const input = document.getElementById('messageInput');
        if (input) {
          input.focus();
        }
        break;
        
      case 'ONLINE_STATUS':
        this.isOnline = data.status === 'online';
        this.updateOnlineStatus();
        break;
    }
  }
  
  // ============================================================
  // إعداد التثبيت
  // ============================================================
  setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.deferredPrompt = event;
      
      // إظهار زر التثبيت
      const installBtn = document.getElementById('installAppBtn');
      if (installBtn) {
        installBtn.style.display = 'flex';
        installBtn.classList.add('visible');
        installBtn.onclick = () => this.installApp();
      }
      
      console.log('[PWA] التطبيق جاهز للتثبيت');
    });
    
    // تتبع التثبيت
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      this.deferredPrompt = null;
      
      // إخفاء زر التثبيت
      const installBtn = document.getElementById('installAppBtn');
      if (installBtn) {
        installBtn.style.display = 'none';
      }
      
      console.log('[PWA] تم تثبيت التطبيق بنجاح');
      this.showNotification('✅ تم تثبيت التطبيق بنجاح', 'يمكنك الآن استخدامه كتطبيق مستقل');
      
      // تسجيل الحدث
      if (window.gtag) {
        gtag('event', 'app_installed', { app_name: 'nezek-chat' });
      }
    });
  }
  
  // ============================================================
  // تثبيت التطبيق
  // ============================================================
  async installApp() {
    if (!this.deferredPrompt) {
      this.showNotification('⚠️ التطبيق مثبت بالفعل', 'يمكنك العثور عليه في قائمة التطبيقات');
      return;
    }
    
    try {
      const result = await this.deferredPrompt.prompt();
      console.log(`[PWA] نتيجة التثبيت: ${result.outcome}`);
      
      if (result.outcome === 'accepted') {
        this.isInstalled = true;
        this.showNotification('✅ تم تثبيت التطبيق', 'تمت إضافة التطبيق إلى شاشتك الرئيسية');
      } else {
        this.showNotification('❌ تم إلغاء التثبيت', 'يمكنك المحاولة لاحقاً');
      }
      
      this.deferredPrompt = null;
      
      // إخفاء زر التثبيت
      const installBtn = document.getElementById('installAppBtn');
      if (installBtn) {
        installBtn.style.display = 'none';
      }
      
    } catch (error) {
      console.error('[PWA] فشل التثبيت:', error);
      this.showNotification('❌ فشل تثبيت التطبيق', error.message);
    }
  }
  
  // ============================================================
  // إعداد التحديثات
  // ============================================================
  setupUpdateListener() {
    // التحقق من التحديثات كل 5 دقائق
    setInterval(() => {
      this.checkForUpdates();
    }, 5 * 60 * 1000);
    
    // عند العودة إلى التطبيق
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.checkForUpdates();
      }
    });
  }
  
  // ============================================================
  // التحقق من التحديثات
  // ============================================================
  async checkForUpdates() {
    if (!this.swRegistration) return;
    
    try {
      await this.swRegistration.update();
      console.log('[PWA] تم التحقق من التحديثات');
    } catch (error) {
      console.error('[PWA] فشل التحقق من التحديثات:', error);
    }
  }
  
  // ============================================================
  // إعداد التحديث التلقائي
  // ============================================================
  setupAutoUpdate() {
    // عند وجود تحديث، يتم تثبيته تلقائياً عند إعادة التحميل
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[PWA] تم تحديث Service Worker');
      this.newVersionReady = true;
      
      // إظهار إشعار بالتحديث
      this.showNotification('🔄 تم تحديث التطبيق', 'تم تثبيت إصدار جديد من التطبيق');
      
      // إعادة تحميل التطبيق بعد 3 ثواني
      setTimeout(() => {
        if (confirm('تم تحديث التطبيق. هل تريد إعادة التحميل الآن؟')) {
          window.location.reload();
        }
      }, 3000);
    });
  }
  
  // ============================================================
  // إظهار إشعار بالتحديث
  // ============================================================
  showUpdateNotification() {
    const existing = document.querySelector('.update-notification');
    if (existing) return;
    
    const div = document.createElement('div');
    div.className = 'update-notification';
    div.innerHTML = `
      <div class="update-content">
        <span class="update-icon">🔄</span>
        <span class="update-text">تحديث جديد للتطبيق متوفر</span>
        <button class="update-btn" onclick="window.location.reload()">
          تحديث الآن
        </button>
        <button class="update-close" onclick="this.parentElement.parentElement.remove()">✕</button>
      </div>
    `;
    
    // إضافة الأنماط
    div.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--bg-secondary, #FFFFFF);
      color: var(--text-primary, #262626);
      padding: 12px 16px;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.15);
      z-index: 1000;
      border: 1px solid var(--border-color, #DBDBDB);
      min-width: 280px;
      max-width: 90%;
      animation: slideUp 0.3s ease;
      font-family: -apple-system, sans-serif;
    `;
    
    const content = div.querySelector('.update-content');
    content.style.cssText = `
      display: flex;
      align-items: center;
      gap: 12px;
    `;
    
    const icon = div.querySelector('.update-icon');
    icon.style.fontSize = '1.4rem';
    
    const text = div.querySelector('.update-text');
    text.style.cssText = `
      flex: 1;
      font-size: 0.85rem;
      font-weight: 500;
    `;
    
    const btn = div.querySelector('.update-btn');
    btn.style.cssText = `
      padding: 6px 16px;
      border: none;
      border-radius: 20px;
      background: var(--color-accent, #405DE6);
      color: #fff;
      font-weight: 600;
      font-size: 0.8rem;
      cursor: pointer;
      transition: 0.3s;
      white-space: nowrap;
    `;
    btn.onmouseover = () => btn.style.transform = 'scale(1.04)';
    btn.onmouseout = () => btn.style.transform = 'scale(1)';
    btn.onmousedown = () => btn.style.transform = 'scale(0.95)';
    
    const close = div.querySelector('.update-close');
    close.style.cssText = `
      background: none;
      border: none;
      color: var(--text-secondary, #8E8E8E);
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0 4px;
    `;
    
    document.body.appendChild(div);
    
    // إخفاء تلقائي بعد 30 ثانية
    setTimeout(() => {
      if (div.parentElement) {
        div.style.opacity = '0';
        div.style.transition = 'opacity 0.3s';
        setTimeout(() => div.remove(), 300);
      }
    }, 30000);
  }
  
  // ============================================================
  // إعداد الإشعارات
  // ============================================================
  async setupNotifications() {
    // طلب إذن الإشعارات
    if (Notification.permission === 'default') {
      // الانتظار حتى يقوم المستخدم بالتفاعل
      document.addEventListener('click', () => {
        this.requestNotificationPermission();
      }, { once: true });
    }
    
    // زر طلب الإشعارات
    const notifBtn = document.getElementById('notificationBtn');
    if (notifBtn) {
      notifBtn.onclick = () => this.requestNotificationPermission();
    }
  }
  
  // ============================================================
  // طلب إذن الإشعارات
  // ============================================================
  async requestNotificationPermission() {
    if (!('Notification' in window)) {
      this.showNotification('❌ المتصفح لا يدعم الإشعارات');
      return;
    }
    
    if (Notification.permission === 'granted') {
      this.showNotification('✅ الإشعارات مفعلة', 'ستتلقى إشعارات عند وصول رسائل جديدة');
      return;
    }
    
    if (Notification.permission === 'denied') {
      this.showNotification('⚠️ تم رفض الإشعارات', 'يمكنك تفعيلها من إعدادات المتصفح');
      return;
    }
    
    try {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        this.showNotification('✅ تم تفعيل الإشعارات', 'ستتلقى إشعارات التطبيق');
        
        // تسجيل الإشعارات
        this.subscribeToPush();
        
      } else {
        this.showNotification('❌ تم رفض الإشعارات', 'يمكنك تفعيلها لاحقاً');
      }
    } catch (error) {
      console.error('[PWA] فشل طلب الإشعارات:', error);
    }
  }
  
  // ============================================================
  // الاشتراك في Push Notifications
  // ============================================================
  async subscribeToPush() {
    if (!this.swRegistration) {
      console.log('[PWA] Service Worker غير متاح');
      return;
    }
    
    try {
      const subscription = await this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          'YOUR_VAPID_PUBLIC_KEY' // استبدل بمفتاح VAPID الخاص بك
        )
      });
      
      console.log('[PWA] تم الاشتراك في الإشعارات');
      
      // إرسال الاشتراك إلى الخادم
      this.sendSubscriptionToServer(subscription);
      
    } catch (error) {
      console.error('[PWA] فشل الاشتراك في الإشعارات:', error);
    }
  }
  
  // ============================================================
  // إرسال الاشتراك إلى الخادم
  // ============================================================
  async sendSubscriptionToServer(subscription) {
    try {
      // حفظ الاشتراك في Firebase
      const docRef = await db.collection('pushSubscriptions').add({
        subscription: subscription.toJSON(),
        userId: currentUser || 'anonymous',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userAgent: navigator.userAgent,
        platform: navigator.platform
      });
      
      console.log('[PWA] تم حفظ الاشتراك في الخادم');
      
      // تحديث الاشتراك عند تغيير المستخدم
      this.subscriptionDocId = docRef.id;
      
    } catch (error) {
      console.error('[PWA] فشل إرسال الاشتراك:', error);
    }
  }
  
  // ============================================================
  // تحويل مفتاح VAPID
  // ============================================================
  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    
    return outputArray;
  }
  
  // ============================================================
  // إعداد مراقبة الشبكة
  // ============================================================
  setupNetworkMonitoring() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.updateOnlineStatus();
      console.log('[PWA] التطبيق متصل بالإنترنت');
      
      // إعادة محاولة الطلبات الفاشلة
      this.retryFailedRequests();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.updateOnlineStatus();
      console.log('[PWA] التطبيق غير متصل بالإنترنت');
    });
    
    // تحديث الحالة الأولية
    this.updateOnlineStatus();
  }
  
  // ============================================================
  // تحديث حالة الاتصال
  // ============================================================
  updateOnlineStatus() {
    const statusEl = document.getElementById('connectionStatus');
    if (!statusEl) return;
    
    if (this.isOnline) {
      statusEl.innerHTML = '🟢 متصل';
      statusEl.style.color = '#25D366';
    } else {
      statusEl.innerHTML = '🔴 غير متصل';
      statusEl.style.color = '#E1306C';
    }
    
    // إظهار/إخفاء شريط عدم الاتصال
    let offlineBar = document.getElementById('offlineBar');
    if (!this.isOnline) {
      if (!offlineBar) {
        offlineBar = document.createElement('div');
        offlineBar.id = 'offlineBar';
        offlineBar.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #E1306C;
          color: #fff;
          text-align: center;
          padding: 4px 12px;
          font-size: 0.7rem;
          font-weight: 600;
          z-index: 1000;
          animation: slideDown 0.3s ease;
        `;
        offlineBar.textContent = '🔴 غير متصل بالإنترنت - بعض الميزات غير متوفرة';
        document.body.prepend(offlineBar);
      }
    } else {
      if (offlineBar) {
        offlineBar.style.opacity = '0';
        offlineBar.style.transition = 'opacity 0.3s';
        setTimeout(() => offlineBar.remove(), 300);
      }
    }
  }
  
  // ============================================================
  // إعادة محاولة الطلبات الفاشلة
  // ============================================================
  async retryFailedRequests() {
    // إعادة تحميل الرسائل إذا كانت متوفرة
    if (window.loadMessagesDirectly) {
      try {
        await window.loadMessagesDirectly();
        console.log('[PWA] تم إعادة تحميل الرسائل بعد الاتصال');
      } catch (error) {
        console.error('[PWA] فشل إعادة تحميل الرسائل:', error);
      }
    }
  }
  
  // ============================================================
  // إنشاء زر التحديث
  // ============================================================
  createUpdateButton() {
    const existing = document.getElementById('updateAppBtn');
    if (existing) return;
    
    const btn = document.createElement('button');
    btn.id = 'updateAppBtn';
    btn.innerHTML = '🔄 تحقق من التحديثات';
    btn.style.cssText = `
      display: none;
      position: fixed;
      bottom: 140px;
      right: 16px;
      padding: 8px 14px;
      border: none;
      border-radius: 12px;
      background: var(--color-accent, #405DE6);
      color: #fff;
      font-size: 0.7rem;
      font-weight: 600;
      cursor: pointer;
      z-index: 999;
      box-shadow: 0 4px 16px rgba(64,93,230,0.2);
      transition: 0.3s;
      font-family: inherit;
    `;
    btn.onmouseover = () => btn.style.transform = 'scale(1.04)';
    btn.onmouseout = () => btn.style.transform = 'scale(1)';
    btn.onmousedown = () => btn.style.transform = 'scale(0.95)';
    btn.onclick = () => {
      this.checkForUpdates();
      btn.innerHTML = '⏳ جاري التحقق...';
      setTimeout(() => {
        btn.innerHTML = '🔄 تحقق من التحديثات';
        this.showNotification('✅ تم التحقق من التحديثات', 'التطبيق محدث بأحدث إصدار');
      }, 2000);
    };
    
    document.body.appendChild(btn);
    
    // إظهار الزر بعد 5 ثواني
    setTimeout(() => {
      btn.style.display = 'block';
    }, 5000);
  }
  
  // ============================================================
  // إنشاء زر التثبيت
  // ============================================================
  createInstallButton() {
    const existing = document.getElementById('installAppBtn');
    if (existing) return;
    
    const btn = document.createElement('button');
    btn.id = 'installAppBtn';
    btn.innerHTML = '📲 تثبيت التطبيق';
    btn.style.cssText = `
      display: none;
      position: fixed;
      bottom: 140px;
      left: 16px;
      padding: 8px 14px;
      border: none;
      border-radius: 12px;
      background: var(--color-accent-gradient, linear-gradient(135deg, #405DE6, #5851DB));
      color: #fff;
      font-size: 0.7rem;
      font-weight: 600;
      cursor: pointer;
      z-index: 999;
      box-shadow: 0 4px 16px rgba(64,93,230,0.2);
      transition: 0.3s;
      font-family: inherit;
    `;
    btn.onmouseover = () => btn.style.transform = 'scale(1.04)';
    btn.onmouseout = () => btn.style.transform = 'scale(1)';
    btn.onmousedown = () => btn.style.transform = 'scale(0.95)';
    btn.onclick = () => this.installApp();
    
    document.body.appendChild(btn);
  }
  
  // ============================================================
  // إظهار إشعارات النظام
  // ============================================================
  showNotification(title, body) {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      console.log(`[PWA] إشعار: ${title} - ${body || ''}`);
      return;
    }
    
    try {
      new Notification(title, {
        body: body || '',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        silent: false,
        vibrate: [100, 50, 100]
      });
    } catch (error) {
      console.error('[PWA] فشل عرض الإشعار:', error);
    }
  }
  
  // ============================================================
  // عرض تنبيه للتطبيق
  // ============================================================
  showToast(message, type = 'info') {
    const existing = document.querySelector('.pwa-toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'pwa-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 140px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 20px;
      border-radius: 12px;
      background: ${type === 'success' ? '#25D366' : type === 'error' ? '#E1306C' : type === 'warning' ? '#f5a623' : 'var(--bg-secondary, #FFFFFF)'};
      color: ${type === 'success' || type === 'error' || type === 'warning' ? '#fff' : 'var(--text-primary, #262626)'};
      font-size: 0.85rem;
      font-weight: 500;
      z-index: 10000;
      box-shadow: 0 8px 32px rgba(0,0,0,0.15);
      animation: slideUp 0.3s ease;
      max-width: 90%;
      text-align: center;
      border: ${type === 'info' ? '1px solid var(--border-color, #DBDBDB)' : 'none'};
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// ============================================================
// تصدير المدير
// ============================================================
window.PWAManager = PWAManager;

// إنشاء مدير PWA عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  window.pwaManager = new PWAManager();
});

console.log('[PWA] تم تحميل مدير التطبيق');
