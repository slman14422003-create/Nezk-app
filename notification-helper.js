// ============================================================
// Notification Helper - نيزك إنستا
// إدارة الإشعارات المحلية
// ============================================================

class NotificationHelper {
  constructor() {
    this.isSupported = 'Notification' in window;
    this.permission = Notification.permission;
    this.notificationCount = 0;
    this.soundEnabled = true;
    this.vibrationEnabled = true;
    
    this.init();
  }
  
  async init() {
    console.log('[Notifications] تهيئة مدير الإشعارات...');
    
    if (!this.isSupported) {
      console.log('[Notifications] الإشعارات غير مدعومة في هذا المتصفح');
      return;
    }
    
    // طلب الإذن تلقائياً عند التفاعل
    document.addEventListener('click', () => {
      if (this.permission === 'default') {
        this.requestPermission();
      }
    }, { once: true });
    
    // إعداد إشعارات الرسائل
    this.setupMessageNotifications();
    
    // إعداد إشعارات التطبيق
    this.setupAppNotifications();
  }
  
  // ============================================================
  // طلب الإذن
  // ============================================================
  async requestPermission() {
    if (!this.isSupported) return;
    if (this.permission === 'granted') return;
    if (this.permission === 'denied') {
      console.log('[Notifications] الإشعارات مرفوضة');
      return;
    }
    
    try {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      
      if (permission === 'granted') {
        console.log('[Notifications] تم منح إذن الإشعارات');
        this.showWelcomeNotification();
      } else {
        console.log('[Notifications] تم رفض الإشعارات');
      }
    } catch (error) {
      console.error('[Notifications] فشل طلب الإذن:', error);
    }
  }
  
  // ============================================================
  // إرسال إشعار
  // ============================================================
  sendNotification(title, options = {}) {
    if (!this.isSupported) return;
    if (this.permission !== 'granted') {
      console.log('[Notifications] لا يوجد إذن للإشعارات');
      return;
    }
    
    try {
      const defaultOptions = {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        vibrate: [200, 100, 200],
        silent: false,
        requireInteraction: true,
        tag: 'notification_' + Date.now()
      };
      
      const finalOptions = { ...defaultOptions, ...options };
      
      // تشغيل الصوت إذا كان مفعلاً
      if (this.soundEnabled && options.sound !== false) {
        this.playNotificationSound();
      }
      
      // الاهتزاز إذا كان مفعلاً
      if (this.vibrationEnabled && navigator.vibrate) {
        navigator.vibrate(finalOptions.vibrate || [200, 100, 200]);
      }
      
      // إرسال الإشعار
      const notification = new Notification(title, finalOptions);
      
      // زيادة العداد
      this.notificationCount++;
      
      // التعامل مع نقر الإشعار
      notification.onclick = () => {
        window.focus();
        notification.close();
        
        // التنقل إلى الصفحة المناسبة
        if (options.url) {
          window.location.href = options.url;
        }
      };
      
      return notification;
    } catch (error) {
      console.error('[Notifications] فشل إرسال الإشعار:', error);
      return null;
    }
  }
  
  // ============================================================
  // تشغيل صوت الإشعار
  // ============================================================
  playNotificationSound() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // إنشاء نغمة بسيطة
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
      
      // نغمة ثانية
      setTimeout(() => {
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);
        
        osc2.frequency.value = 1000;
        osc2.type = 'sine';
        
        gain2.gain.setValueAtTime(0.2, audioContext.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        osc2.start(audioContext.currentTime);
        osc2.stop(audioContext.currentTime + 0.2);
      }, 200);
      
    } catch (error) {
      console.log('[Notifications] فشل تشغيل الصوت:', error);
    }
  }
  
  // ============================================================
  // إعداد إشعارات الرسائل
  // ============================================================
  setupMessageNotifications() {
    // مراقبة الرسائل الجديدة
    if (typeof db !== 'undefined') {
      db.collection('messages')
        .orderBy('timestamp', 'desc')
        .limit(1)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              const data = change.doc.data();
              if (data.username && data.username !== currentUser) {
                this.showMessageNotification(data);
              }
            }
          });
        });
    }
  }
  
  // ============================================================
  // عرض إشعار رسالة جديدة
  // ============================================================
  showMessageNotification(data) {
    const username = data.username || 'مستخدم';
    const text = data.text || '📩 رسالة جديدة';
    const decompressedText = AICore ? AICore.decompressText(text) : text;
    
    this.sendNotification(`📩 ${username}`, {
      body: decompressedText.length > 50 ? decompressedText.substring(0, 50) + '...' : decompressedText,
      icon: data.avatar && isValidImageUrl(data.avatar) ? data.avatar : '/icons/icon-192x192.png',
      tag: 'message_' + data.id,
      data: {
        messageId: data.id,
        username: username,
        url: '/'
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
      ]
    });
  }
  
  // ============================================================
  // إعداد إشعارات التطبيق
  // ============================================================
  setupAppNotifications() {
    // إشعار عند اتصال المستخدمين
    if (typeof db !== 'undefined') {
      let previousOnlineUsers = new Set();
      
      db.collection('users').onSnapshot((snapshot) => {
        const onlineUsers = new Set();
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.online && doc.id !== currentUser) {
            onlineUsers.add(doc.id);
          }
        });
        
        // إشعار عند اتصال مستخدم جديد
        onlineUsers.forEach((username) => {
          if (!previousOnlineUsers.has(username)) {
            this.sendNotification(`🟢 ${username} متصل الآن`, {
              body: `${username} أصبح متصلاً`,
              icon: '/icons/icon-192x192.png',
              tag: 'user_online_' + username,
              silent: true,
              requireInteraction: false
            });
          }
        });
        
        previousOnlineUsers = onlineUsers;
      });
    }
  }
  
  // ============================================================
  // عرض إشعار ترحيبي
  // ============================================================
  showWelcomeNotification() {
    this.sendNotification('📱 نيزك إنستا', {
      body: 'تم تفعيل الإشعارات بنجاح! ستتلقى تنبيهات عند وصول رسائل جديدة.',
      icon: '/icons/icon-192x192.png',
      tag: 'welcome_' + Date.now(),
      requireInteraction: false
    });
  }
  
  // ============================================================
  // إشعار الأخطاء
  // ============================================================
  showErrorNotification(error) {
    this.sendNotification('⚠️ خطأ في التطبيق', {
      body: typeof error === 'string' ? error : (error.message || 'حدث خطأ غير متوقع'),
      icon: '/icons/icon-192x192.png',
      tag: 'error_' + Date.now(),
      requireInteraction: false,
      sound: false
    });
  }
  
  // ============================================================
  // إشعار التحديثات
  // ============================================================
  showUpdateNotification(version) {
    this.sendNotification('🔄 تحديث التطبيق', {
      body: `تم تحديث التطبيق إلى الإصدار ${version || 'الجديد'}`,
      icon: '/icons/icon-192x192.png',
      tag: 'update_' + Date.now(),
      requireInteraction: false,
      sound: false
    });
  }
  
  // ============================================================
  // إشعار التثبيت
  // ============================================================
  showInstallNotification() {
    this.sendNotification('📲 تثبيت التطبيق', {
      body: 'هل ترغب في تثبيت التطبيق على شاشتك الرئيسية؟',
      icon: '/icons/icon-192x192.png',
      tag: 'install_' + Date.now(),
      requireInteraction: true,
      actions: [
        {
          action: 'install',
          title: '📲 تثبيت'
        },
        {
          action: 'later',
          title: 'لاحقاً'
        }
      ]
    });
  }
  
  // ============================================================
  // إعدادات الصوت والاهتزاز
  // ============================================================
  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem('notification_sound', this.soundEnabled ? 'true' : 'false');
    return this.soundEnabled;
  }
  
  toggleVibration() {
    this.vibrationEnabled = !this.vibrationEnabled;
    localStorage.setItem('notification_vibration', this.vibrationEnabled ? 'true' : 'false');
    return this.vibrationEnabled;
  }
  
  // تحميل الإعدادات
  loadSettings() {
    const sound = localStorage.getItem('notification_sound');
    if (sound !== null) {
      this.soundEnabled = sound === 'true';
    }
    
    const vibration = localStorage.getItem('notification_vibration');
    if (vibration !== null) {
      this.vibrationEnabled = vibration === 'true';
    }
  }
}

// ============================================================
// تصدير المدير
// ============================================================
window.NotificationHelper = NotificationHelper;

// إنشاء مدير الإشعارات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  window.notificationHelper = new NotificationHelper();
  window.notificationHelper.loadSettings();
});

console.log('[Notifications] تم تحميل مدير الإشعارات');
