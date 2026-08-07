// ============================================================
// نظام الإشعارات المتقدم لنيزك إنستا
// ============================================================

class NotificationManager {
    constructor() {
        this.isSupported = 'Notification' in window;
        this.permission = 'default';
        this.swRegistration = null;
        this.settings = {
            enabled: true,
            sound: true,
            vibration: true,
            preview: true,
            silentMode: false
        };
        this.loadSettings();
    }

    // تحميل الإعدادات من LocalStorage
    loadSettings() {
        try {
            const saved = localStorage.getItem('notificationSettings');
            if (saved) {
                this.settings = { ...this.settings, ...JSON.parse(saved) };
            }
        } catch (e) {}
    }

    // حفظ الإعدادات
    saveSettings() {
        try {
            localStorage.setItem('notificationSettings', JSON.stringify(this.settings));
        } catch (e) {}
    }

    // تهيئة الإشعارات
    async init() {
        if (!this.isSupported) {
            console.warn('⚠️ الإشعارات غير مدعومة في هذا المتصفح');
            return false;
        }

        // تسجيل Service Worker
        try {
            this.swRegistration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/'
            });
            console.log('✅ Service Worker مسجل بنجاح');

            // التحقق من الإذن
            if (Notification.permission === 'granted') {
                this.permission = 'granted';
                console.log('✅ إذن الإشعارات مفعل');
            } else if (Notification.permission === 'denied') {
                this.permission = 'denied';
                console.warn('⚠️ الإشعارات مرفوضة');
            } else {
                // طلب الإذن
                await this.requestPermission();
            }

            return true;
        } catch (error) {
            console.error('❌ فشل تهيئة الإشعارات:', error);
            return false;
        }
    }

    // طلب إذن الإشعارات
    async requestPermission() {
        if (!this.isSupported) return false;

        try {
            if (Notification.permission !== 'granted') {
                const permission = await Notification.requestPermission();
                this.permission = permission;
                
                if (permission === 'granted') {
                    console.log('✅ إذن الإشعارات مُنح');
                    this.sendToSW({
                        type: 'NOTIFICATION_PERMISSION_GRANTED',
                        payload: { granted: true }
                    });
                    return true;
                } else {
                    console.warn('⚠️ الإشعارات مرفوضة من قبل المستخدم');
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.error('❌ فشل طلب الإذن:', error);
            return false;
        }
    }

    // إرسال رسالة إلى Service Worker
    sendToSW(message) {
        if (this.swRegistration && this.swRegistration.active) {
            this.swRegistration.active.postMessage(message);
        }
    }

    // عرض إشعار
    showNotification(title, options = {}) {
        if (!this.settings.enabled) return;
        if (this.settings.silentMode) return;
        if (this.permission !== 'granted') {
            this.requestPermission();
            return;
        }

        // إعدادات الإشعار
        const defaultOptions = {
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-96x96.png',
            vibrate: [200, 100, 200],
            requireInteraction: true,
            data: {
                url: '/'
            },
            actions: [
                { action: 'open', title: '📖 فتح' },
                { action: 'dismiss', title: '✕ إغلاق' }
            ]
        };

        const finalOptions = { ...defaultOptions, ...options };

        // إرسال الإشعار عبر Service Worker
        this.sendToSW({
            type: 'SHOW_NOTIFICATION',
            payload: {
                title: title,
                body: finalOptions.body || '',
                icon: finalOptions.icon,
                badge: finalOptions.badge,
                tag: finalOptions.tag || 'chat-notification',
                url: finalOptions.data?.url || '/',
                requireInteraction: finalOptions.requireInteraction,
                actions: finalOptions.actions
            }
        });

        // عرض الإشعار محلياً أيضاً (كاحتياط)
        if (this.swRegistration) {
            this.swRegistration.showNotification(title, finalOptions);
        }
    }

    // إشعار رسالة جديدة
    notifyNewMessage(username, message, avatar = '📸') {
        const preview = message.length > 50 ? message.substring(0, 47) + '...' : message;
        this.showNotification(
            `💬 ${username}`,
            {
                body: this.settings.preview ? preview : 'رسالة جديدة',
                icon: avatar,
                tag: `msg-${Date.now()}`,
                data: {
                    url: '/',
                    username: username,
                    message: message
                }
            }
        );
    }

    // إشعار مستخدم جديد
    notifyNewUser(username) {
        this.showNotification(
            '👤 مستخدم جديد',
            {
                body: `${username} انضم إلى الدردشة`,
                icon: '/icons/icon-192x192.png',
                tag: `user-${username}`,
                data: {
                    url: '/'
                }
            }
        );
    }

    // إشعار تفاعل
    notifyReaction(username, emoji, message) {
        this.showNotification(
            '❤️ تفاعل جديد',
            {
                body: `${username} تفاعل بـ ${emoji} على رسالتك`,
                icon: '/icons/icon-192x192.png',
                tag: `reaction-${Date.now()}`,
                data: {
                    url: '/'
                }
            }
        );
    }

    // تحديث الإعدادات
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        this.saveSettings();
        
        // إرسال التحديث إلى Service Worker
        this.sendToSW({
            type: 'UPDATE_SETTINGS',
            payload: this.settings
        });
    }

    // الحصول على الإعدادات
    getSettings() {
        return { ...this.settings };
    }

    // تشغيل صوت الإشعار
    playNotificationSound() {
        if (!this.settings.sound) return;
        try {
            // استخدام Web Audio API لتوليد صوت بسيط
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
            
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.2);
        } catch (e) {
            console.warn('⚠️ فشل تشغيل الصوت:', e);
        }
    }
}

// ============================================================
// دمج مع التطبيق الرئيسي
// ============================================================
// تمديد الكائن window لإتاحة المدير للتطبيق
window.NotificationManager = new NotificationManager();

// تهيئة الإشعارات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', async () => {
    await window.NotificationManager.init();
});

// استقبال رسائل من Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', event => {
        console.log('[App] رسالة من SW:', event.data);
        
        if (event.data.type === 'NOTIFICATION_PERMISSION_GRANTED') {
            console.log('✅ المستخدم وافق على الإشعارات');
        }
        
        if (event.data.type === 'BACKGROUND_SYNC_COMPLETE') {
            console.log('✅ مزامنة الخلفية مكتملة');
        }
        
        if (event.data.type === 'CACHE_CLEARED') {
            console.log('✅ تم مسح الكاش');
        }
        
        if (event.data.type === 'CACHE_SIZE') {
            console.log('📊 حجم الكاش:', event.data.payload.size);
        }
    });
}

console.log('📸 نظام الإشعارات جاهز للعمل!');
