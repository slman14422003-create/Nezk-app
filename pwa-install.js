// ============================================================
// PWA Install - نيزك إنستا
// إدارة تثبيت التطبيق
// ============================================================

class PWAInstallManager {
  constructor() {
    this.isInstalled = false;
    this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    this.isAndroid = /Android/.test(navigator.userAgent);
    this.isPWA = window.matchMedia('(display-mode: standalone)').matches;
    this.deferredPrompt = null;
    this.installPromptShown = false;
    
    this.init();
  }
  
  async init() {
    console.log('[PWA Install] تهيئة مدير التثبيت...');
    
    // التحقق من التثبيت
    this.checkInstallation();
    
    // إعداد زر التثبيت
    this.setupInstallButton();
    
    // إعداد التثبيت التلقائي
    this.setupAutoInstall();
    
    // إعداد دليل التثبيت
    this.setupInstallGuide();
    
    // إعداد التحديثات
    this.setupUpdates();
  }
  
  // ============================================================
  // التحقق من التثبيت
  // ============================================================
  checkInstallation() {
    // التحقق من وضع العرض
    if (this.isPWA) {
      this.isInstalled = true;
      console.log('[PWA Install] التطبيق يعمل كـ PWA مثبت');
      document.documentElement.classList.add('pwa-installed');
      return;
    }
    
    // التحقق من التثبيت عبر localStorage
    const installed = localStorage.getItem('pwa_installed');
    if (installed === 'true') {
      this.isInstalled = true;
      console.log('[PWA Install] تم تثبيت التطبيق سابقاً');
    }
  }
  
  // ============================================================
  // إعداد زر التثبيت
  // ============================================================
  setupInstallButton() {
    const installBtn = document.getElementById('installAppBtn');
    if (!installBtn) return;
    
    // إظهار الزر إذا لم يكن مثبتاً
    if (!this.isInstalled && !this.isPWA) {
      installBtn.style.display = 'flex';
    }
    
    // حدث التثبيت
    installBtn.addEventListener('click', async () => {
      await this.installApp();
    });
    
    // إضافة تأثيرات
    installBtn.addEventListener('mouseenter', () => {
      installBtn.style.transform = 'scale(1.05)';
    });
    
    installBtn.addEventListener('mouseleave', () => {
      installBtn.style.transform = 'scale(1)';
    });
  }
  
  // ============================================================
  // تثبيت التطبيق
  // ============================================================
  async installApp() {
    // للأندرويد - استخدام قبل تثبيت
    if (this.deferredPrompt) {
      try {
        const result = await this.deferredPrompt.prompt();
        console.log('[PWA Install] نتيجة التثبيت:', result.outcome);
        
        if (result.outcome === 'accepted') {
          this.isInstalled = true;
          localStorage.setItem('pwa_installed', 'true');
          this.hideInstallButtons();
          this.showToast('✅ تم تثبيت التطبيق بنجاح', 'success');
        } else {
          this.showToast('❌ تم إلغاء التثبيت', 'error');
        }
        
        this.deferredPrompt = null;
        return;
      } catch (error) {
        console.error('[PWA Install] فشل التثبيت:', error);
        this.showToast('❌ فشل تثبيت التطبيق', 'error');
        return;
      }
    }
    
    // للأيفون - دليل التثبيت
    if (this.isIOS) {
      this.showIOSInstallGuide();
      return;
    }
    
    // للأندرويد - دليل التثبيت
    if (this.isAndroid) {
      this.showAndroidInstallGuide();
      return;
    }
    
    // للمتصفحات الأخرى
    this.showInstallGuide();
  }
  
  // ============================================================
  // إعداد التثبيت التلقائي
  // ============================================================
  setupAutoInstall() {
    // مراقبة حدث beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.deferredPrompt = event;
      
      // إظهار زر التثبيت
      const installBtn = document.getElementById('installAppBtn');
      if (installBtn && !this.isInstalled && !this.isPWA) {
        installBtn.style.display = 'flex';
        installBtn.classList.add('pulse-animation');
      }
      
      console.log('[PWA Install] التطبيق جاهز للتثبيت');
      
      // إظهار تنبيه للتثبيت بعد 3 ثواني
      if (!this.installPromptShown) {
        this.installPromptShown = true;
        setTimeout(() => {
          if (!this.isInstalled && !this.isPWA) {
            this.showInstallPrompt();
          }
        }, 5000);
      }
    });
    
    // مراقبة التثبيت
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      localStorage.setItem('pwa_installed', 'true');
      this.deferredPrompt = null;
      this.hideInstallButtons();
      
      console.log('[PWA Install] تم تثبيت التطبيق');
      this.showToast('✅ تم تثبيت التطبيق بنجاح', 'success');
    });
  }
  
  // ============================================================
  // إظهار تنبيه التثبيت
  // ============================================================
  showInstallPrompt() {
    if (document.querySelector('.install-banner')) return;
    
    const banner = document.createElement('div');
    banner.className = 'install-banner';
    banner.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--bg-secondary, #FFFFFF);
      border: 1px solid var(--border-color, #DBDBDB);
      border-radius: 16px;
      padding: 16px 20px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.12);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 280px;
      max-width: 90%;
      animation: slideUp 0.3s ease;
    `;
    
    banner.innerHTML = `
      <span style="font-size: 2rem;">📲</span>
      <div style="flex:1;">
        <div style="font-weight:600;font-size:0.9rem;color:var(--text-primary, #262626);">تثبيت التطبيق</div>
        <div style="font-size:0.7rem;color:var(--text-secondary, #8E8E8E);">أضف التطبيق إلى شاشتك الرئيسية</div>
      </div>
      <button id="installBannerBtn" style="
        padding: 6px 16px;
        border: none;
        border-radius: 20px;
        background: var(--color-accent, #405DE6);
        color: #fff;
        font-weight: 600;
        font-size: 0.8rem;
        cursor: pointer;
        transition: 0.3s;
      ">تثبيت</button>
      <button id="installBannerClose" style="
        background: none;
        border: none;
        color: var(--text-secondary, #8E8E8E);
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0 4px;
      ">✕</button>
    `;
    
    document.body.appendChild(banner);
    
    // زر التثبيت
    document.getElementById('installBannerBtn').addEventListener('click', async () => {
      await this.installApp();
      banner.remove();
    });
    
    // زر الإغلاق
    document.getElementById('installBannerClose').addEventListener('click', () => {
      banner.style.opacity = '0';
      banner.style.transition = 'opacity 0.3s';
      setTimeout(() => banner.remove(), 300);
    });
    
    // إغلاق تلقائي بعد 15 ثانية
    setTimeout(() => {
      if (banner.parentElement) {
        banner.style.opacity = '0';
        banner.style.transition = 'opacity 0.3s';
        setTimeout(() => banner.remove(), 300);
      }
    }, 15000);
  }
  
  // ============================================================
  // دليل التثبيت للأيفون
  // ============================================================
  showIOSInstallGuide() {
    this.showGuideModal(`
      <div style="text-align:center;padding:8px 0;">
        <div style="font-size:3rem;margin-bottom:8px;">📱</div>
        <h3 style="color:var(--text-primary, #262626);margin-bottom:12px;">تثبيت التطبيق على iOS</h3>
        <div style="text-align:right;font-size:0.85rem;color:var(--text-secondary, #8E8E8E);line-height:1.6;">
          <div style="display:flex;align-items:center;gap:8px;margin:6px 0;">
            <span style="background:var(--color-accent, #405DE6);color:#fff;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;flex-shrink:0;">1</span>
            <span>اضغط على زر المشاركة <span style="font-size:1.2rem;">⎔</span></span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;margin:6px 0;">
            <span style="background:var(--color-accent, #405DE6);color:#fff;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;flex-shrink:0;">2</span>
            <span>اختر "إضافة إلى الشاشة الرئيسية"</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;margin:6px 0;">
            <span style="background:var(--color-accent, #405DE6);color:#fff;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;flex-shrink:0;">3</span>
            <span>اضغط على "إضافة" في الأعلى</span>
          </div>
        </div>
        <button onclick="document.getElementById('installGuideModal').remove()" style="
          margin-top:16px;
          padding:8px 24px;
          border:none;
          border-radius:20px;
          background:var(--color-accent, #405DE6);
          color:#fff;
          font-weight:600;
          font-size:0.85rem;
          cursor:pointer;
          transition:0.3s;
        ">فهمت ✅</button>
      </div>
    `);
  }
  
  // ============================================================
  // دليل التثبيت للأندرويد
  // ============================================================
  showAndroidInstallGuide() {
    this.showGuideModal(`
      <div style="text-align:center;padding:8px 0;">
        <div style="font-size:3rem;margin-bottom:8px;">📱</div>
        <h3 style="color:var(--text-primary, #262626);margin-bottom:12px;">تثبيت التطبيق على Android</h3>
        <div style="text-align:right;font-size:0.85rem;color:var(--text-secondary, #8E8E8E);line-height:1.6;">
          <div style="display:flex;align-items:center;gap:8px;margin:6px 0;">
            <span style="background:var(--color-accent, #405DE6);color:#fff;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;flex-shrink:0;">1</span>
            <span>افتح القائمة <span style="font-size:1.2rem;">⋮</span> في المتصفح</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;margin:6px 0;">
            <span style="background:var(--color-accent, #405DE6);color:#fff;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;flex-shrink:0;">2</span>
            <span>اختر "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية"</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;margin:6px 0;">
            <span style="background:var(--color-accent, #405DE6);color:#fff;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;flex-shrink:0;">3</span>
            <span>اضغط على "تثبيت" للتأكيد</span>
          </div>
        </div>
        <button onclick="document.getElementById('installGuideModal').remove()" style="
          margin-top:16px;
          padding:8px 24px;
          border:none;
          border-radius:20px;
          background:var(--color-accent, #405DE6);
          color:#fff;
          font-weight:600;
          font-size:0.85rem;
          cursor:pointer;
          transition:0.3s;
        ">فهمت ✅</button>
      </div>
    `);
  }
  
  // ============================================================
  // دليل التثبيت العام
  // ============================================================
  showInstallGuide() {
    this.showGuideModal(`
      <div style="text-align:center;padding:8px 0;">
        <div style="font-size:3rem;margin-bottom:8px;">📲</div>
        <h3 style="color:var(--text-primary, #262626);margin-bottom:12px;">تثبيت التطبيق</h3>
        <div style="text-align:right;font-size:0.85rem;color:var(--text-secondary, #8E8E8E);line-height:1.6;">
          <div style="display:flex;align-items:center;gap:8px;margin:6px 0;">
            <span style="background:var(--color-accent, #405DE6);color:#fff;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;flex-shrink:0;">1</span>
            <span>ابحث عن زر التثبيت في شريط العنوان</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;margin:6px 0;">
            <span style="background:var(--color-accent, #405DE6);color:#fff;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;flex-shrink:0;">2</span>
            <span>اضغط على "تثبيت" أو "إضافة إلى الشاشة الرئيسية"</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;margin:6px 0;">
            <span style="background:var(--color-accent, #405DE6);color:#fff;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;flex-shrink:0;">3</span>
            <span>اتبع التعليمات لإكمال التثبيت</span>
          </div>
        </div>
        <button onclick="document.getElementById('installGuideModal').remove()" style="
          margin-top:16px;
          padding:8px 24px;
          border:none;
          border-radius:20px;
          background:var(--color-accent, #405DE6);
          color:#fff;
          font-weight:600;
          font-size:0.85rem;
          cursor:pointer;
          transition:0.3s;
        ">فهمت ✅</button>
      </div>
    `);
  }
  
  // ============================================================
  // عرض مودال الدليل
  // ============================================================
  showGuideModal(content) {
    const existing = document.getElementById('installGuideModal');
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    modal.id = 'installGuideModal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(10px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      animation: fadeIn 0.25s ease;
    `;
    
    const box = document.createElement('div');
    box.style.cssText = `
      background: var(--bg-secondary, #FFFFFF);
      border-radius: 20px;
      padding: 24px;
      max-width: 400px;
      width: 100%;
      max-height: 80vh;
      overflow-y: auto;
      animation: fadeSlideIn 0.25s ease;
      border: 1px solid var(--border-color, #DBDBDB);
    `;
    box.innerHTML = content;
    
    modal.appendChild(box);
    document.body.appendChild(modal);
    
    // إغلاق عند النقر خارج المحتوى
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }
  
  // ============================================================
  // إعداد دليل التثبيت
  // ============================================================
  setupInstallGuide() {
    // إضافة زر دليل التثبيت
    const guideBtn = document.createElement('button');
    guideBtn.id = 'installGuideBtn';
    guideBtn.innerHTML = '📲 تثبيت التطبيق';
    guideBtn.style.cssText = `
      position: fixed;
      bottom: 140px;
      left: 16px;
      padding: 6px 12px;
      border: none;
      border-radius: 10px;
      background: var(--bg-secondary, #FFFFFF);
      color: var(--text-primary, #262626);
      font-size: 0.65rem;
      font-weight: 500;
      cursor: pointer;
      z-index: 998;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      transition: 0.3s;
      font-family: inherit;
      border: 1px solid var(--border-color, #DBDBDB);
      display: none;
    `;
    guideBtn.onmouseover = () => guideBtn.style.transform = 'scale(1.04)';
    guideBtn.onmouseout = () => guideBtn.style.transform = 'scale(1)';
    guideBtn.onmousedown = () => guideBtn.style.transform = 'scale(0.95)';
    guideBtn.onclick = () => this.showInstallGuide();
    
    document.body.appendChild(guideBtn);
    
    // إظهار الزر إذا لم يكن مثبتاً
    if (!this.isInstalled && !this.isPWA) {
      setTimeout(() => {
        guideBtn.style.display = 'block';
      }, 3000);
    }
  }
  
  // ============================================================
  // إعداد التحديثات
  // ============================================================
  setupUpdates() {
    // التحقق من التحديثات كل 10 دقائق
    setInterval(() => {
      this.checkForUpdates();
    }, 10 * 60 * 1000);
    
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
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.update();
        console.log('[PWA Install] تم التحقق من التحديثات');
      }
    } catch (error) {
      console.error('[PWA Install] فشل التحقق من التحديثات:', error);
    }
  }
  
  // ============================================================
  // إخفاء أزرار التثبيت
  // ============================================================
  hideInstallButtons() {
    const btns = ['installAppBtn', 'installGuideBtn'];
    btns.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.style.display = 'none';
      }
    });
    
    // إخفاء البانر
    const banner = document.querySelector('.install-banner');
    if (banner) {
      banner.style.opacity = '0';
      banner.style.transition = 'opacity 0.3s';
      setTimeout(() => banner.remove(), 300);
    }
  }
  
  // ============================================================
  // عرض تنبيه
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
      background: ${type === 'success' ? '#25D366' : type === 'error' ? '#E1306C' : 'var(--bg-secondary, #FFFFFF)'};
      color: ${type === 'success' || type === 'error' ? '#fff' : 'var(--text-primary, #262626)'};
      font-size: 0.85rem;
      font-weight: 500;
      z-index: 10000;
      box-shadow: 0 8px 32px rgba(0,0,0,0.12);
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
window.PWAInstallManager = PWAInstallManager;

// إنشاء مدير التثبيت عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  window.pwaInstall = new PWAInstallManager();
});

console.log('[PWA Install] تم تحميل مدير التثبيت');
