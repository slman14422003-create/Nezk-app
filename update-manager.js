// ============================================================
// Update Manager - نيزك إنستا
// إدارة التحديثات التلقائية
// ============================================================

class UpdateManager {
  constructor() {
    this.version = '2.0.0';
    this.updateAvailable = false;
    this.updateInProgress = false;
    this.lastCheckTime = null;
    this.updateInterval = null;
    this.isChecking = false;
    
    // عناصر واجهة التحديث
    this.updateBanner = null;
    this.updateProgress = 0;
    
    this.init();
  }
  
  async init() {
    console.log('[Update Manager] تهيئة مدير التحديثات...');
    
    // التحقق من التحديثات عند بدء التشغيل
    await this.checkForUpdates();
    
    // إعداد الفحص الدوري
    this.setupPeriodicCheck();
    
    // إعداد التحديث التلقائي
    this.setupAutoUpdate();
    
    // إضافة واجهة التحديث
    this.createUpdateUI();
    
    // الاستماع لتحديثات Service Worker
    this.setupServiceWorkerUpdates();
    
    console.log(`[Update Manager] الإصدار الحالي: ${this.version}`);
  }
  
  // ============================================================
  // إعداد الفحص الدوري
  // ============================================================
  setupPeriodicCheck() {
    // فحص كل 5 دقائق
    this.updateInterval = setInterval(() => {
      this.checkForUpdates();
    }, 5 * 60 * 1000);
    
    // فحص عند العودة إلى التطبيق
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        setTimeout(() => {
          this.checkForUpdates();
        }, 1000);
      }
    });
    
    // فحص عند استعادة الاتصال
    window.addEventListener('online', () => {
      setTimeout(() => {
        this.checkForUpdates();
      }, 2000);
    });
  }
  
  // ============================================================
  // إعداد التحديث التلقائي
  // ============================================================
  setupAutoUpdate() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[Update Manager] تم تغيير Service Worker');
        this.updateAvailable = true;
        this.showUpdateNotification();
      });
    }
  }
  
  // ============================================================
  // إعداد تحديثات Service Worker
  // ============================================================
  setupServiceWorkerUpdates() {
    if (!('serviceWorker' in navigator)) return;
    
    navigator.serviceWorker.ready.then((registration) => {
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('[Update Manager] تم العثور على تحديث');
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            this.updateAvailable = true;
            this.showUpdateNotification();
          }
        });
      });
    });
  }
  
  // ============================================================
  // التحقق من التحديثات
  // ============================================================
  async checkForUpdates() {
    if (this.isChecking) return;
    this.isChecking = true;
    
    try {
      console.log('[Update Manager] جاري التحقق من التحديثات...');
      
      // التحقق من Service Worker
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          await registration.update();
          console.log('[Update Manager] تم فحص Service Worker');
        }
      }
      
      // التحقق من المانيفست
      const manifestResponse = await fetch('/manifest.json', { 
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });
      
      if (manifestResponse.ok) {
        const manifest = await manifestResponse.json();
        const manifestVersion = manifest.version || manifest.manifest_version || '1.0.0';
        
        // مقارنة الإصدارات
        if (this.compareVersions(manifestVersion, this.version) > 0) {
          console.log(`[Update Manager] تحديث جديد متوفر: ${manifestVersion}`);
          this.updateAvailable = true;
          this.showUpdateNotification(manifestVersion);
        }
      }
      
      this.lastCheckTime = new Date();
      
    } catch (error) {
      console.error('[Update Manager] فشل التحقق من التحديثات:', error);
    } finally {
      this.isChecking = false;
    }
  }
  
  // ============================================================
  // مقارنة الإصدارات
  // ============================================================
  compareVersions(v1, v2) {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);
    
    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const num1 = parts1[i] || 0;
      const num2 = parts2[i] || 0;
      
      if (num1 > num2) return 1;
      if (num1 < num2) return -1;
    }
    
    return 0;
  }
  
  // ============================================================
  // تثبيت التحديث
  // ============================================================
  async installUpdate() {
    if (this.updateInProgress) return;
    this.updateInProgress = true;
    
    try {
      console.log('[Update Manager] بدء تثبيت التحديث...');
      
      // إظهار شريط التقدم
      this.showUpdateProgress();
      
      // تحديث Service Worker
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration && registration.waiting) {
          // إرسال إشارة لتثبيت التحديث
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          
          // انتظار التثبيت
          await new Promise((resolve) => {
            const checkState = () => {
              if (registration.active) {
                resolve();
              } else {
                setTimeout(checkState, 100);
              }
            };
            checkState();
          });
        }
      }
      
      // تحديث الصفحة
      this.showUpdateComplete();
      
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error('[Update Manager] فشل تثبيت التحديث:', error);
      this.showUpdateError(error.message);
    } finally {
      this.updateInProgress = false;
    }
  }
  
  // ============================================================
  // إنشاء واجهة التحديث
  // ============================================================
  createUpdateUI() {
    // زر التحديث
    const updateBtn = document.createElement('button');
    updateBtn.id = 'updateAppBtn';
    updateBtn.innerHTML = '🔄 تحقق من التحديثات';
    updateBtn.style.cssText = `
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
    updateBtn.onmouseover = () => updateBtn.style.transform = 'scale(1.05)';
    updateBtn.onmouseout = () => updateBtn.style.transform = 'scale(1)';
    updateBtn.onmousedown = () => updateBtn.style.transform = 'scale(0.95)';
    updateBtn.onclick = () => this.checkForUpdates();
    
    document.body.appendChild(updateBtn);
    
    // إظهار الزر بعد 3 ثواني
    setTimeout(() => {
      updateBtn.style.display = 'block';
    }, 3000);
  }
  
  // ============================================================
  // إظهار إشعار التحديث
  // ============================================================
  showUpdateNotification(version) {
    const existing = document.querySelector('.update-notification');
    if (existing) existing.remove();
    
    const div = document.createElement('div');
    div.className = 'update-notification';
    div.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--bg-secondary, #FFFFFF);
      color: var(--text-primary, #262626);
      padding: 14px 18px;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.12);
      z-index: 1000;
      border: 1px solid var(--border-color, #DBDBDB);
      min-width: 280px;
      max-width: 90%;
      animation: slideUp 0.3s ease;
    `;
    
    div.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="font-size:1.6rem;">🔄</span>
        <div style="flex:1;">
          <div style="font-weight:600;font-size:0.9rem;">تحديث جديد متوفر</div>
          <div style="font-size:0.7rem;color:var(--text-secondary, #8E8E8E);">
            الإصدار ${version || 'الجديد'} متاح للتثبيت
          </div>
        </div>
        <button id="updateInstallBtn" style="
          padding: 6px 16px;
          border: none;
          border-radius: 20px;
          background: var(--color-accent, #405DE6);
          color: #fff;
          font-weight: 600;
          font-size: 0.8rem;
          cursor: pointer;
          transition: 0.3s;
        ">تحديث</button>
        <button id="updateCloseBtn" style="
          background: none;
          border: none;
          color: var(--text-secondary, #8E8E8E);
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0 4px;
        ">✕</button>
      </div>
    `;
    
    document.body.appendChild(div);
    
    // زر التحديث
    document.getElementById('updateInstallBtn').addEventListener('click', () => {
      this.installUpdate();
      div.remove();
    });
    
    // زر الإغلاق
    document.getElementById('updateCloseBtn').addEventListener('click', () => {
      div.style.opacity = '0';
      div.style.transition = 'opacity 0.3s';
      setTimeout(() => div.remove(), 300);
    });
    
    // إغلاق تلقائي بعد 30 ثانية
    setTimeout(() => {
      if (div.parentElement) {
        div.style.opacity = '0';
        div.style.transition = 'opacity 0.3s';
        setTimeout(() => div.remove(), 300);
      }
    }, 30000);
  }
  
  // ============================================================
  // إظهار شريط تقدم التحديث
  // ============================================================
  showUpdateProgress() {
    const existing = document.querySelector('.update-progress');
    if (existing) existing.remove();
    
    const div = document.createElement('div');
    div.className = 'update-progress';
    div.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--bg-secondary, #FFFFFF);
      padding: 16px 20px;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.12);
      z-index: 1000;
      border: 1px solid var(--border-color, #DBDBDB);
      min-width: 260px;
      max-width: 90%;
      animation: slideUp 0.3s ease;
    `;
    
    div.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="font-size:1.6rem;">⏳</span>
        <div style="flex:1;">
          <div style="font-weight:600;font-size:0.9rem;">جاري التحديث...</div>
          <div style="margin-top:6px;height:4px;background:var(--bg-input, #F0F0F0);border-radius:4px;overflow:hidden;">
            <div id="updateProgressFill" style="height:100%;width:0%;background:linear-gradient(135deg,#405DE6,#5851DB,#833AB4);border-radius:4px;transition:width 0.5s ease;"></div>
          </div>
          <div style="font-size:0.6rem;color:var(--text-secondary, #8E8E8E);margin-top:3px;" id="updateProgressText">0%</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(div);
    
    // محاكاة التقدم
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10 + 5;
      if (progress > 95) {
        progress = 95;
        clearInterval(interval);
      }
      this.updateProgress(progress);
    }, 200);
  }
  
  // ============================================================
  // تحديث شريط التقدم
  // ============================================================
  updateProgress(percent) {
    const fill = document.getElementById('updateProgressFill');
    const text = document.getElementById('updateProgressText');
    
    if (fill) {
      fill.style.width = Math.min(percent, 100) + '%';
    }
    if (text) {
      text.textContent = Math.round(percent) + '%';
    }
  }
  
  // ============================================================
  // إظهار اكتمال التحديث
  // ============================================================
  showUpdateComplete() {
    const existing = document.querySelector('.update-progress');
    if (existing) {
      existing.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:1.6rem;">✅</span>
          <div style="flex:1;">
            <div style="font-weight:600;font-size:0.9rem;">تم التحديث بنجاح!</div>
            <div style="font-size:0.7rem;color:var(--text-secondary, #8E8E8E);">سيتم إعادة تحميل التطبيق...</div>
          </div>
        </div>
      `;
    }
  }
  
  // ============================================================
  // إظهار خطأ التحديث
  // ============================================================
  showUpdateError(message) {
    const existing = document.querySelector('.update-progress');
    if (existing) {
      existing.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:1.6rem;">❌</span>
          <div style="flex:1;">
            <div style="font-weight:600;font-size:0.9rem;">فشل التحديث</div>
            <div style="font-size:0.7rem;color:#E1306C;">${message || 'حدث خطأ غير متوقع'}</div>
          </div>
          <button onclick="this.parentElement.parentElement.remove()" style="
            padding: 4px 12px;
            border: none;
            border-radius: 12px;
            background: #E1306C;
            color: #fff;
            font-size: 0.7rem;
            cursor: pointer;
          ">إغلاق</button>
        </div>
      `;
    }
  }
  
  // ============================================================
  // الحصول على معلومات الإصدار
  // ============================================================
  getVersionInfo() {
    return {
      version: this.version,
      lastCheck: this.lastCheckTime,
      updateAvailable: this.updateAvailable,
      updateInProgress: this.updateInProgress
    };
  }
  
  // ============================================================
  // تنظيف الموارد
  // ============================================================
  cleanup() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    
    // إزالة عناصر الواجهة
    const elements = [
      '#updateAppBtn',
      '.update-notification',
      '.update-progress'
    ];
    
    elements.forEach(selector => {
      const el = document.querySelector(selector);
      if (el) el.remove();
    });
  }
}

// ============================================================
// تصدير المدير
// ============================================================
window.UpdateManager = UpdateManager;

// إنشاء مدير التحديثات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  window.updateManager = new UpdateManager();
});

console.log('[Update Manager] تم تحميل مدير التحديثات');
