// ============================================================
// نظام تثبيت PWA متطور لنيزك إنستا
// ============================================================

class PWAInstaller {
    constructor() {
        this.deferredPrompt = null;
        this.isInstalled = false;
        this.installButton = null;
        this.installBanner = null;
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        this.installAttempts = 0;
        this.maxAttempts = 3;
        this.init();
    }

    init() {
        this.checkInstallation();
        
        // الاستماع لأحداث التثبيت
        window.addEventListener('beforeinstallprompt', this.handleInstallPrompt.bind(this));
        window.addEventListener('appinstalled', this.handleInstalled.bind(this));

        // التحقق من Service Worker
        this.checkServiceWorker();

        if (this.isIOS) {
            this.handleIOSInstall();
        }

        this.addInstallButton();
        this.checkManifest();

        console.log('📲 نظام تثبيت PWA جاهز');
    }

    // التحقق من Service Worker
    async checkServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.ready;
                console.log('✅ Service Worker جاهز:', registration);
                return true;
            } catch (error) {
                console.warn('⚠️ Service Worker غير جاهز:', error);
                return false;
            }
        }
        return false;
    }

    // التحقق من المانيفست
    checkManifest() {
        const link = document.querySelector('link[rel="manifest"]');
        if (link) {
            console.log('✅ ملف manifest موجود:', link.href);
        } else {
            console.warn('⚠️ ملف manifest غير موجود');
        }
    }

    // التحقق من التثبيت
    checkInstallation() {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            this.isInstalled = true;
            console.log('✅ التطبيق مثبت ومفتوح كـ PWA');
            this.hideInstallBanner();
        }
    }

    // معالجة حدث التثبيت
    handleInstallPrompt(event) {
        event.preventDefault();
        this.deferredPrompt = event;
        this.showInstallBanner();
        console.log('📲 عرض زر التثبيت');
    }

    // عرض بنر التثبيت
    showInstallBanner() {
        if (this.installBanner) {
            this.installBanner.style.display = 'flex';
        } else {
            this.createInstallBanner();
        }
    }

    // إخفاء بنر التثبيت
    hideInstallBanner() {
        if (this.installBanner) {
            this.installBanner.style.display = 'none';
        }
    }

    // إنشاء بنر التثبيت
    createInstallBanner() {
        this.installBanner = document.createElement('div');
        this.installBanner.id = 'installBanner';
        this.installBanner.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--bg-secondary, #fff);
            color: var(--text-primary, #262626);
            padding: 14px 20px;
            border-radius: 16px;
            z-index: 500;
            box-shadow: 0 8px 40px rgba(0,0,0,0.2);
            border: 1px solid var(--border-color, #ddd);
            display: none;
            align-items: center;
            gap: 14px;
            max-width: 92%;
            animation: slideUp 0.3s ease;
            backdrop-filter: blur(10px);
            direction: rtl;
        `;

        this.installBanner.innerHTML = `
            <div style="display:flex;align-items:center;gap:12px;flex:1;">
                <div style="font-size:2rem;flex-shrink:0;">📲</div>
                <div style="flex:1;min-width:0;">
                    <div style="font-weight:700;font-size:0.9rem;">تثبيت نيزك إنستا</div>
                    <div style="font-size:0.7rem;opacity:0.6;">احصل على تجربة تطبيق كاملة</div>
                </div>
            </div>
            <div style="display:flex;gap:8px;flex-shrink:0;">
                <button id="installAppBtn" style="
                    padding: 8px 22px;
                    border-radius: 20px;
                    border: none;
                    background: linear-gradient(135deg, #405DE6, #833AB4, #E1306C);
                    color: #fff;
                    font-weight: 700;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: 0.3s;
                    white-space:nowrap;
                ">تثبيت</button>
                <button id="dismissInstallBtn" style="
                    background: none;
                    border: none;
                    color: var(--text-secondary, #8e8e8e);
                    font-size: 1.2rem;
                    cursor: pointer;
                    padding: 0 6px;
                ">✕</button>
            </div>
        `;

        document.body.appendChild(this.installBanner);

        // زر التثبيت
        document.getElementById('installAppBtn').onclick = () => {
            this.installApp();
        };

        // زر الإغلاق
        document.getElementById('dismissInstallBtn').onclick = () => {
            this.hideInstallBanner();
            // تذكر أن المستخدم ألغى التثبيت
            try {
                localStorage.setItem('pwa-dismissed', 'true');
            } catch(e) {}
        };

        this.installBanner.style.display = 'flex';
    }

    // تثبيت التطبيق
    async installApp() {
        if (this.deferredPrompt) {
            try {
                this.deferredPrompt.prompt();
                const result = await this.deferredPrompt.userChoice;
                
                if (result.outcome === 'accepted') {
                    console.log('✅ تم تثبيت التطبيق بنجاح');
                    this.isInstalled = true;
                    this.hideInstallBanner();
                    this.showNotification('✅ تم تثبيت نيزك إنستا بنجاح!');
                } else {
                    console.log('❌ المستخدم رفض التثبيت');
                    this.installAttempts++;
                    if (this.installAttempts >= this.maxAttempts) {
                        this.hideInstallBanner();
                    }
                }
                this.deferredPrompt = null;
            } catch (error) {
                console.error('❌ خطأ في التثبيت:', error);
                // محاولة التثبيت عبر الطريقة البديلة
                this.installAlternative();
            }
        } else {
            // محاولة التثبيت عبر الطريقة البديلة
            this.installAlternative();
        }
    }

    // طريقة تثبيت بديلة
    installAlternative() {
        // محاولة فتح صفحة التثبيت
        const manifestUrl = '/manifest.json';
        const installUrl = window.location.href;
        
        // عرض تعليمات التثبيت
        this.showInstallInstructions();
    }

    // عرض تعليمات التثبيت
    showInstallInstructions() {
        const instructions = document.createElement('div');
        instructions.id = 'installInstructions';
        instructions.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-secondary, #fff);
            color: var(--text-primary, #262626);
            padding: 30px;
            border-radius: 20px;
            z-index: 600;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            border: 1px solid var(--border-color, #ddd);
            max-width: 400px;
            width: 90%;
            text-align: center;
            animation: pop 0.3s ease;
            direction: rtl;
        `;

        instructions.innerHTML = `
            <div style="font-size:3rem;margin-bottom:10px;">📲</div>
            <h3 style="font-size:1.2rem;margin-bottom:8px;">تثبيت نيزك إنستا</h3>
            <p style="color:#8e8e8e;font-size:0.85rem;margin-bottom:15px;line-height:1.6;">
                لتثبيت التطبيق على جهازك:
            </p>
            <div style="text-align:right;font-size:0.8rem;color:#555;margin-bottom:20px;line-height:2;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                    <span style="background:#405DE6;color:#fff;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0;">1</span>
                    <span>اضغط على زر <strong>⋮</strong> في المتصفح</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                    <span style="background:#833AB4;color:#fff;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0;">2</span>
                    <span>اختر <strong>تثبيت التطبيق</strong> أو <strong>إضافة إلى الشاشة الرئيسية</strong></span>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                    <span style="background:#E1306C;color:#fff;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0;">3</span>
                    <span>اضغط <strong>تثبيت</strong> لإكمال العملية</span>
                </div>
            </div>
            <button style="
                padding: 10px 30px;
                border-radius: 20px;
                border: none;
                background: linear-gradient(135deg, #405DE6, #833AB4, #E1306C);
                color: #fff;
                font-weight: 700;
                font-size: 0.9rem;
                cursor: pointer;
                transition: 0.3s;
                width: 100%;
            " onclick="this.parentElement.remove()">✅ فهمت</button>
        `;

        document.body.appendChild(instructions);
        this.hideInstallBanner();
    }

    // معالجة التثبيت الناجح
    handleInstalled(event) {
        console.log('✅ تم تثبيت التطبيق:', event);
        this.isInstalled = true;
        this.hideInstallBanner();
        this.showNotification('🎉 شكراً لتثبيت نيزك إنستا!');
    }

    // التثبيت على iOS
    handleIOSInstall() {
        if (!navigator.standalone) {
            setTimeout(() => {
                this.showIOSInstructions();
            }, 3000);
        }
    }

    // عرض تعليمات iOS
    showIOSInstructions() {
        if (document.getElementById('iosInstructions')) return;
        
        const instructions = document.createElement('div');
        instructions.id = 'iosInstructions';
        instructions.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--bg-secondary, #fff);
            color: var(--text-primary, #262626);
            padding: 14px 20px;
            border-radius: 16px;
            z-index: 500;
            box-shadow: 0 8px 30px rgba(0,0,0,0.15);
            border: 1px solid var(--border-color, #ddd);
            max-width: 90%;
            animation: slideUp 0.3s ease;
            text-align: center;
            direction: rtl;
        `;

        instructions.innerHTML = `
            <div style="font-size:2rem;margin-bottom:4px;">📱</div>
            <div style="font-weight:700;font-size:0.9rem;">تثبيت التطبيق على iPhone</div>
            <div style="font-size:0.7rem;opacity:0.6;margin:6px 0;line-height:1.6;">
                اضغط على <span style="font-weight:700;background:#f0f0f0;padding:2px 8px;border-radius:4px;">⎙</span> 
                ثم <span style="font-weight:700;color:#405DE6;">إضافة إلى الشاشة الرئيسية</span>
            </div>
            <button style="
                margin-top:8px;
                padding: 6px 20px;
                border-radius: 16px;
                border: none;
                background: #405DE6;
                color: #fff;
                font-size: 0.75rem;
                cursor: pointer;
                font-weight:600;
            " onclick="this.parentElement.remove()">فهمت</button>
        `;

        document.body.appendChild(instructions);
    }

    // إضافة زر التثبيت في واجهة المستخدم
    addInstallButton() {
        const actions = document.querySelector('.chat-header .actions');
        if (actions && !this.isInstalled) {
            const installBtn = document.createElement('button');
            installBtn.id = 'installPwaBtn';
            installBtn.title = 'تثبيت التطبيق';
            installBtn.style.cssText = 'font-size:1.2rem;';
            installBtn.textContent = '📲';
            installBtn.onclick = () => {
                if (this.deferredPrompt) {
                    this.installApp();
                } else if (this.isIOS) {
                    this.showIOSInstructions();
                } else {
                    this.showInstallInstructions();
                }
            };
            actions.appendChild(installBtn);
            this.installButton = installBtn;
        }
    }

    // عرض إشعار
    showNotification(message) {
        const existing = document.querySelector('.temp-notification');
        if (existing) existing.remove();
        
        const div = document.createElement('div');
        div.className = 'temp-notification';
        div.textContent = message;
        div.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            background: var(--bg-secondary, #fff);
            color: var(--text-primary, #262626);
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 0.8rem;
            z-index: 999;
            max-width: 90%;
            text-align: center;
            border: 1px solid var(--border-color, #ddd);
            animation: notificationIn 0.2s ease forwards;
            opacity: 0;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            direction: rtl;
        `;
        document.body.appendChild(div);
        
        setTimeout(() => {
            div.style.opacity = '1';
            div.style.transform = 'translateX(-50%) translateY(0)';
        }, 50);
        
        setTimeout(() => {
            div.style.opacity = '0';
            div.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => div.remove(), 300);
        }, 3000);
    }
}

// ============================================================
// تهيئة التثبيت
// ============================================================
let pwaInstaller = null;

document.addEventListener('DOMContentLoaded', () => {
    // التحقق من عدم التثبيت سابقاً
    const dismissed = localStorage.getItem('pwa-dismissed');
    if (!dismissed || dismissed !== 'true') {
        pwaInstaller = new PWAInstaller();
    } else {
        console.log('📲 المستخدم ألغى التثبيت سابقاً');
    }
});

// إعادة المحاولة عند تغيير الشبكة
window.addEventListener('online', () => {
    if (pwaInstaller && !pwaInstaller.isInstalled) {
        setTimeout(() => {
            pwaInstaller.checkServiceWorker();
        }, 1000);
    }
});

console.log('📲 نظام تثبيت PWA متطور جاهز');
