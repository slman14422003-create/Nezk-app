// ============================================================
// تثبيت PWA - نيزك إنستا
// ============================================================

class PWAInstaller {
    constructor() {
        this.deferredPrompt = null;
        this.isInstalled = false;
        this.installButton = null;
        this.installBanner = null;
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        this.init();
    }

    init() {
        // التحقق من تثبيت التطبيق
        this.checkInstallation();
        
        // الاستماع لأحداث التثبيت
        window.addEventListener('beforeinstallprompt', this.handleInstallPrompt.bind(this));
        window.addEventListener('appinstalled', this.handleInstalled.bind(this));

        if (this.isIOS) {
            this.handleIOSInstall();
        }

        // إضافة زر التثبيت في واجهة المستخدم
        this.addInstallButton();

        console.log('📲 نظام تثبيت PWA جاهز');
    }

    // التحقق من تثبيت التطبيق
    checkInstallation() {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            this.isInstalled = true;
            console.log('✅ التطبيق مثبت ومفتوح كـ PWA');
        }
    }

    // معالجة حدث التثبيت
    handleInstallPrompt(event) {
        event.preventDefault();
        this.deferredPrompt = event;
        this.showInstallBanner();
        console.log('📲 عرض زر التثبيت');
    }

    // عرض زر التثبيت
    showInstallBanner() {
        if (this.installBanner) {
            this.installBanner.style.display = 'flex';
        } else {
            this.createInstallBanner();
        }
    }

    // إنشاء بنر التثبيت
    createInstallBanner() {
        this.installBanner = document.createElement('div');
        this.installBanner.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--bg-secondary);
            color: var(--text-primary);
            padding: 12px 20px;
            border-radius: 16px;
            z-index: 500;
            box-shadow: 0 8px 30px rgba(0,0,0,0.15);
            border: 1px solid var(--border-color);
            display: none;
            align-items: center;
            gap: 12px;
            max-width: 90%;
            animation: slideUp 0.3s ease;
            backdrop-filter: blur(10px);
        `;

        this.installBanner.innerHTML = `
            <span style="font-size:1.5rem;">📲</span>
            <div style="flex:1;">
                <div style="font-weight:600;font-size:0.85rem;">تثبيت نيزك إنستا</div>
                <div style="font-size:0.65rem;opacity:0.5;">احصل على تجربة أفضل</div>
            </div>
            <button id="installAppBtn" style="
                padding: 8px 20px;
                border-radius: 20px;
                border: none;
                background: linear-gradient(135deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D);
                color: #fff;
                font-weight: 600;
                font-size: 0.8rem;
                cursor: pointer;
                transition: 0.3s;
            ">تثبيت</button>
            <button id="dismissInstallBtn" style="
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0 4px;
            ">✕</button>
        `;

        document.body.appendChild(this.installBanner);

        // زر التثبيت
        this.installBanner.querySelector('#installAppBtn').onclick = () => {
            this.installApp();
        };

        // زر الإغلاق
        this.installBanner.querySelector('#dismissInstallBtn').onclick = () => {
            this.installBanner.style.display = 'none';
        };

        this.installBanner.style.display = 'flex';
    }

    // تثبيت التطبيق
    async installApp() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const result = await this.deferredPrompt.userChoice;
            
            if (result.outcome === 'accepted') {
                console.log('✅ تم تثبيت التطبيق بنجاح');
                this.isInstalled = true;
                if (this.installBanner) {
                    this.installBanner.style.display = 'none';
                }
                this.showNotification('✅ تم تثبيت نيزك إنستا بنجاح!');
            } else {
                console.log('❌ المستخدم رفض التثبيت');
            }
            this.deferredPrompt = null;
        }
    }

    // معالجة التثبيت الناجح
    handleInstalled(event) {
        console.log('✅ تم تثبيت التطبيق:', event);
        this.isInstalled = true;
        if (this.installBanner) {
            this.installBanner.style.display = 'none';
        }
    }

    // التثبيت على iOS
    handleIOSInstall() {
        // إضافة تعليمات التثبيت لـ iOS
        if (!navigator.standalone) {
            setTimeout(() => {
                this.showIOSInstructions();
            }, 3000);
        }
    }

    // عرض تعليمات iOS
    showIOSInstructions() {
        const instructions = document.createElement('div');
        instructions.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--bg-secondary);
            color: var(--text-primary);
            padding: 12px 20px;
            border-radius: 16px;
            z-index: 500;
            box-shadow: 0 8px 30px rgba(0,0,0,0.15);
            border: 1px solid var(--border-color);
            max-width: 90%;
            animation: slideUp 0.3s ease;
            text-align: center;
        `;

        instructions.innerHTML = `
            <div style="font-size:2rem;margin-bottom:4px;">📱</div>
            <div style="font-weight:600;font-size:0.85rem;">تثبيت التطبيق على iPhone</div>
            <div style="font-size:0.65rem;opacity:0.5;margin:4px 0;">
                اضغط على <span style="font-weight:bold;">⎙</span> ثم <span style="font-weight:bold;">إضافة إلى الشاشة الرئيسية</span>
            </div>
            <button style="
                margin-top:8px;
                padding: 6px 16px;
                border-radius: 16px;
                border: none;
                background: var(--color-accent);
                color: #fff;
                font-size: 0.7rem;
                cursor: pointer;
            ">فهمت</button>
        `;

        instructions.querySelector('button').onclick = () => {
            instructions.style.display = 'none';
        };

        document.body.appendChild(instructions);
    }

    // إضافة زر التثبيت في واجهة المستخدم
    addInstallButton() {
        // البحث عن شريط الأدوات وإضافة زر التثبيت
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
                    this.showNotification('⚠️ التثبيت غير متاح الآن');
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
            background: var(--bg-secondary);
            color: var(--text-primary);
            padding: 6px 18px;
            border-radius: 20px;
            font-size: 0.75rem;
            z-index: 999;
            max-width: 90%;
            text-align: center;
            border: 1px solid var(--border-color);
            animation: notificationIn 0.2s ease forwards;
            opacity: 0;
            box-shadow: 0 4px 20px var(--shadow-color);
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
// تهيئة التثبيت عند تحميل الصفحة
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    window.PWAInstaller = new PWAInstaller();
});

console.log('📲 نظام تثبيت PWA جاهز!');
