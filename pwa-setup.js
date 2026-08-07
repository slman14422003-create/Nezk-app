// ============================================================
// إعدادات PWA المتقدمة لنيزك إنستا
// ============================================================

(function() {
    'use strict';

    console.log('🌠 نيزك إنستا - PWA Setup');

    // ============================================================
    // تسجيل Service Worker مع إعادة محاولة
    // ============================================================
    async function registerServiceWorker() {
        if (!('serviceWorker' in navigator)) {
            console.warn('⚠️ Service Worker غير مدعوم');
            return false;
        }

        let attempts = 0;
        const maxAttempts = 3;

        while (attempts < maxAttempts) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js', {
                    scope: '/'
                });
                
                console.log('✅ Service Worker مسجل بنجاح:', registration.scope);
                
                // التحقق من التحديثات
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    console.log('🔄 تحديث Service Worker جاري...');
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                console.log('🔄 تم تحديث Service Worker، جاري إعادة التحميل...');
                                setTimeout(() => {
                                    window.location.reload();
                                }, 1500);
                            } else {
                                console.log('✅ Service Worker مثبت لأول مرة');
                            }
                        }
                    });
                });

                // استقبال رسائل من Service Worker
                navigator.serviceWorker.addEventListener('message', event => {
                    if (event.data && event.data.type === 'CACHE_CLEARED') {
                        console.log('✅ تم مسح الكاش بنجاح');
                    }
                    if (event.data && event.data.type === 'CACHE_SIZE') {
                        console.log('📊 حجم الكاش:', event.data.payload.size);
                    }
                    if (event.data && event.data.type === 'BACKGROUND_SYNC_COMPLETE') {
                        console.log('✅ مزامنة الخلفية مكتملة');
                    }
                });

                return true;
            } catch (error) {
                attempts++;
                console.error(`❌ فشل تسجيل Service Worker (محاولة ${attempts}/${maxAttempts}):`, error);
                
                if (attempts < maxAttempts) {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }
            }
        }

        console.error('❌ فشل تسجيل Service Worker بعد', maxAttempts, 'محاولات');
        return false;
    }

    // ============================================================
    // التحقق من توافق PWA
    // ============================================================
    function checkPWASupport() {
        const features = {
            serviceWorker: 'serviceWorker' in navigator,
            manifest: !!document.querySelector('link[rel="manifest"]'),
            https: window.location.protocol === 'https:' || window.location.hostname === 'localhost',
            standalone: window.matchMedia('(display-mode: standalone)').matches
        };

        console.log('🔍 فحص توافق PWA:', features);

        if (!features.https) {
            console.warn('⚠️ التطبيق يعمل على HTTP، PWA يتطلب HTTPS');
        }

        if (!features.serviceWorker) {
            console.warn('⚠️ Service Worker غير مدعوم');
        }

        if (!features.manifest) {
            console.warn('⚠️ ملف manifest غير موجود');
        }

        return features;
    }

    // ============================================================
    // تحسينات الأداء
    // ============================================================
    function optimizePerformance() {
        // تأجيل تحميل الصور
        document.addEventListener('DOMContentLoaded', () => {
            const images = document.querySelectorAll('img[data-src]');
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        });

        // منع التمرير غير الضروري
        document.addEventListener('touchmove', (e) => {
            if (e.target.closest('#messagesContainer')) return;
        }, { passive: true });

        console.log('⚡ تحسينات الأداء مفعلة');
    }

    // ============================================================
    // معالجة الأخطاء
    // ============================================================
    function setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('❌ خطأ في التطبيق:', event.message);
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('❌ وعد مرفوض:', event.reason);
        });

        console.log('🛡️ نظام معالجة الأخطاء جاهز');
    }

    // ============================================================
    // بدء التطبيق
    // ============================================================
    async function initPWA() {
        console.log('🚀 بدء تهيئة PWA...');
        
        // فحص التوافق
        const features = checkPWASupport();
        
        // تسجيل Service Worker
        if (features.serviceWorker) {
            await registerServiceWorker();
        }

        // تحسينات الأداء
        optimizePerformance();

        // معالجة الأخطاء
        setupErrorHandling();

        console.log('✅ PWA جاهز للعمل');
    }

    // بدء التهيئة بعد تحميل DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPWA);
    } else {
        initPWA();
    }
})();
