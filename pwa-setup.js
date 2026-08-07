// ============================================================
// إعدادات PWA الأساسية لنيزك إنستا
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // تسجيل Service Worker
    // ============================================================
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        })
        .then(registration => {
            console.log('✅ Service Worker مسجل بنجاح:', registration.scope);
            
            // التحقق من التحديثات
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                console.log('🔄 تحديث Service Worker جاري...');
                
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            console.log('🔄 تم تحديث Service Worker، جاري إعادة التحميل...');
                            // إعادة تحميل الصفحة لتطبيق التحديثات
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);
                        } else {
                            console.log('✅ Service Worker مثبت لأول مرة');
                        }
                    }
                });
            });
        })
        .catch(error => {
            console.error('❌ فشل تسجيل Service Worker:', error);
        });

        // استقبال رسائل من Service Worker
        navigator.serviceWorker.addEventListener('message', event => {
            if (event.data && event.data.type === 'CACHE_CLEARED') {
                console.log('✅ تم مسح الكاش بنجاح');
            }
            if (event.data && event.data.type === 'CACHE_SIZE') {
                console.log('📊 حجم الكاش:', event.data.payload.size);
            }
        });
    } else {
        console.warn('⚠️ Service Worker غير مدعوم في هذا المتصفح');
    }

    // ============================================================
    // تحسينات الأداء
    // ============================================================
    
    // تأجيل تحميل الصور غير المهمة
    document.addEventListener('DOMContentLoaded', () => {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    });

    // معالجة الأخطاء
    window.addEventListener('error', event => {
        console.error('❌ خطأ في التطبيق:', event.message);
    });

    // معالجة الرفض غير المحتمل
    window.addEventListener('unhandledrejection', event => {
        console.error('❌ وعد مرفوض:', event.reason);
    });

    console.log('📸 نيزك إنستا - PWA جاهز للعمل');
})();
