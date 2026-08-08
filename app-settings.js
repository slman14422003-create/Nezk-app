// ============================================================
// App Settings - نيزك إنستا
// إدارة إعدادات التطبيق المتقدمة
// ============================================================

class AppSettings {
  constructor() {
    this.settings = {
      theme: 'light',
      language: 'ar',
      notifications: true,
      sounds: true,
      vibrations: true,
      autoUpdate: true,
      saveChats: true,
      showTyping: true,
      readReceipts: true,
      lastSeen: true,
      onlineStatus: true,
      fontSize: 'medium',
      chatBackground: 'default',
      messageAnimation: true,
      autoDownloadImages: 'wifi',
      storageLimit: 100,
      privacyMode: false,
      lockScreen: false,
      lockPassword: '',
      darkModeSchedule: false,
      darkModeStart: '22:00',
      darkModeEnd: '06:00'
    };
    
    this.loadSettings();
    this.init();
  }
  
  init() {
    console.log('[App Settings] تهيئة إعدادات التطبيق...');
    
    // تطبيق الإعدادات
    this.applySettings();
    
    // إعداد واجهة الإعدادات
    this.createSettingsUI();
    
    // إعداد اختصارات لوحة المفاتيح
    this.setupKeyboardShortcuts();
    
    // الاستماع لتغيرات الإعدادات
    this.setupSettingsListeners();
  }
  
  // ============================================================
  // تحميل الإعدادات
  // ============================================================
  loadSettings() {
    try {
      const saved = localStorage.getItem('app_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.settings = { ...this.settings, ...parsed };
        console.log('[App Settings] تم تحميل الإعدادات');
      }
    } catch (error) {
      console.error('[App Settings] فشل تحميل الإعدادات:', error);
    }
  }
  
  // ============================================================
  // حفظ الإعدادات
  // ============================================================
  saveSettings() {
    try {
      localStorage.setItem('app_settings', JSON.stringify(this.settings));
      console.log('[App Settings] تم حفظ الإعدادات');
      return true;
    } catch (error) {
      console.error('[App Settings] فشل حفظ الإعدادات:', error);
      return false;
    }
  }
  
  // ============================================================
  // الحصول على إعداد
  // ============================================================
  get(key) {
    return this.settings[key];
  }
  
  // ============================================================
  // تعيين إعداد
  // ============================================================
  set(key, value) {
    const oldValue = this.settings[key];
    this.settings[key] = value;
    this.saveSettings();
    this.applySetting(key, value);
    
    // إعلام المستخدمين
    this.dispatchSettingChange(key, value, oldValue);
    
    return true;
  }
  
  // ============================================================
  // تطبيق الإعدادات
  // ============================================================
  applySettings() {
    Object.keys(this.settings).forEach(key => {
      this.applySetting(key, this.settings[key]);
    });
  }
  
  // ============================================================
  // تطبيق إعداد محدد
  // ============================================================
  applySetting(key, value) {
    switch (key) {
      case 'theme':
        this.applyTheme(value);
        break;
      case 'language':
        this.applyLanguage(value);
        break;
      case 'fontSize':
        this.applyFontSize(value);
        break;
      case 'chatBackground':
        this.applyChatBackground(value);
        break;
      case 'messageAnimation':
        this.applyMessageAnimation(value);
        break;
      case 'notifications':
        this.applyNotifications(value);
        break;
      case 'sounds':
        this.applySounds(value);
        break;
      case 'vibrations':
        this.applyVibrations(value);
        break;
      case 'darkModeSchedule':
        this.applyDarkModeSchedule(value);
        break;
      case 'privacyMode':
        this.applyPrivacyMode(value);
        break;
      case 'showTyping':
        this.applyShowTyping(value);
        break;
      case 'readReceipts':
        this.applyReadReceipts(value);
        break;
      case 'lastSeen':
        this.applyLastSeen(value);
        break;
      case 'onlineStatus':
        this.applyOnlineStatus(value);
        break;
    }
  }
  
  // ============================================================
  // تطبيق الثيم
  // ============================================================
  applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('theme-dark');
    } else if (theme === 'light') {
      document.body.classList.remove('theme-dark');
    } else if (theme === 'auto') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) {
        document.body.classList.add('theme-dark');
      } else {
        document.body.classList.remove('theme-dark');
      }
      
      // الاستماع لتغيرات النظام
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (this.settings.theme === 'auto') {
          if (e.matches) {
            document.body.classList.add('theme-dark');
          } else {
            document.body.classList.remove('theme-dark');
          }
        }
      });
    }
  }
  
  // ============================================================
  // تطبيق اللغة
  // ============================================================
  applyLanguage(language) {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // تحديث النصوص
    if (window.translateTexts) {
      window.translateTexts(language);
    }
  }
  
  // ============================================================
  // تطبيق حجم الخط
  // ============================================================
  applyFontSize(size) {
    const sizes = {
      small: '0.85rem',
      medium: '1rem',
      large: '1.15rem',
      xlarge: '1.3rem'
    };
    
    const fontSize = sizes[size] || sizes.medium;
    document.documentElement.style.fontSize = fontSize;
  }
  
  // ============================================================
  // تطبيق خلفية الدردشة
  // ============================================================
  applyChatBackground(background) {
    const container = document.getElementById('messagesContainer');
    if (!container) return;
    
    switch (background) {
      case 'default':
        container.style.background = 'var(--bg-chat)';
        container.style.backgroundImage = 'none';
        break;
      case 'gradient':
        container.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        container.style.backgroundImage = 'none';
        break;
      case 'dark':
        container.style.background = '#1a1a2e';
        container.style.backgroundImage = 'none';
        break;
      case 'light':
        container.style.background = '#f5f0e1';
        container.style.backgroundImage = 'none';
        break;
      default:
        if (background.startsWith('#')) {
          container.style.background = background;
          container.style.backgroundImage = 'none';
        }
        break;
    }
  }
  
  // ============================================================
  // تطبيق أنيميشن الرسائل
  // ============================================================
  applyMessageAnimation(enabled) {
    const style = document.createElement('style');
    style.id = 'message-animation-style';
    
    if (enabled) {
      style.textContent = `
        .msg-wrapper {
          animation: messageIn 0.3s ease forwards !important;
        }
      `;
    } else {
      style.textContent = `
        .msg-wrapper {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      `;
    }
    
    const oldStyle = document.getElementById('message-animation-style');
    if (oldStyle) oldStyle.remove();
    document.head.appendChild(style);
  }
  
  // ============================================================
  // تطبيق الإشعارات
  // ============================================================
  applyNotifications(enabled) {
    if (enabled && 'Notification' in window && Notification.permission === 'granted') {
      console.log('[App Settings] الإشعارات مفعلة');
    } else if (enabled) {
      // طلب الإذن
      Notification.requestPermission();
    }
  }
  
  // ============================================================
  // تطبيق الأصوات
  // ============================================================
  applySounds(enabled) {
    if (window.notificationHelper) {
      window.notificationHelper.soundEnabled = enabled;
    }
  }
  
  // ============================================================
  // تطبيق الاهتزاز
  // ============================================================
  applyVibrations(enabled) {
    if (window.notificationHelper) {
      window.notificationHelper.vibrationEnabled = enabled;
    }
  }
  
  // ============================================================
  // تطبيق الجدول الليلي
  // ============================================================
  applyDarkModeSchedule(enabled) {
    if (enabled) {
      this.startDarkModeSchedule();
    } else {
      this.stopDarkModeSchedule();
    }
  }
  
  startDarkModeSchedule() {
    this._darkModeInterval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const time = `${hours}:${minutes}`;
      
      const start = this.settings.darkModeStart;
      const end = this.settings.darkModeEnd;
      
      let isDarkTime = false;
      if (start < end) {
        isDarkTime = time >= start && time <= end;
      } else {
        isDarkTime = time >= start || time <= end;
      }
      
      if (isDarkTime) {
        document.body.classList.add('theme-dark');
      } else {
        document.body.classList.remove('theme-dark');
      }
    }, 60000); // كل دقيقة
    
    // تشغيل فوري
    this._darkModeInterval();
  }
  
  stopDarkModeSchedule() {
    if (this._darkModeInterval) {
      clearInterval(this._darkModeInterval);
      this._darkModeInterval = null;
    }
    // العودة إلى الثيم المحدد
    this.applyTheme(this.settings.theme);
  }
  
  // ============================================================
  // تطبيق وضع الخصوصية
  // ============================================================
  applyPrivacyMode(enabled) {
    if (enabled) {
      // إخفاء معاينة الرسائل
      document.querySelectorAll('.msg .content .text').forEach(el => {
        el.style.filter = 'blur(4px)';
        el.style.userSelect = 'none';
      });
      
      // إخفاء الأسماء
      document.querySelectorAll('.sender-name').forEach(el => {
        el.style.filter = 'blur(4px)';
      });
    } else {
      document.querySelectorAll('.msg .content .text, .sender-name').forEach(el => {
        el.style.filter = 'none';
        el.style.userSelect = 'auto';
      });
    }
  }
  
  // ============================================================
  // تطبيق إظهار الكتابة
  // ============================================================
  applyShowTyping(enabled) {
    const indicator = document.getElementById('typingIndicator');
    if (!enabled) {
      indicator.style.display = 'none !important';
    }
  }
  
  // ============================================================
  // تطبيق تأكيد القراءة
  // ============================================================
  applyReadReceipts(enabled) {
    // تحديث علامات ✓✓
    document.querySelectorAll('.msg.sent .time .check').forEach(el => {
      if (enabled) {
        el.textContent = '✓✓';
      } else {
        el.textContent = '✓';
      }
    });
  }
  
  // ============================================================
  // تطبيق آخر ظهور
  // ============================================================
  applyLastSeen(enabled) {
    // إظهار أو إخفاء آخر ظهور
    if (!enabled) {
      document.querySelectorAll('.profile-status').forEach(el => {
        el.textContent = '⚫ غير متاح';
      });
    }
  }
  
  // ============================================================
  // تطبيق حالة الاتصال
  // ============================================================
  applyOnlineStatus(enabled) {
    if (!enabled) {
      document.querySelectorAll('.online-dot').forEach(el => {
        el.style.display = 'none';
      });
      document.querySelectorAll('.status .online').forEach(el => {
        el.style.display = 'none';
      });
    }
  }
  
  // ============================================================
  // إرسال تغيير الإعداد
  // ============================================================
  dispatchSettingChange(key, value, oldValue) {
    const event = new CustomEvent('settingChanged', {
      detail: { key, value, oldValue }
    });
    document.dispatchEvent(event);
  }
  
  // ============================================================
  // الاستماع لتغيرات الإعدادات
  // ============================================================
  setupSettingsListeners() {
    document.addEventListener('settingChanged', (e) => {
      const { key, value } = e.detail;
      console.log(`[App Settings] تغيير الإعداد ${key}: ${value}`);
      
      // تحديث واجهة الإعدادات
      this.updateSettingsUI(key, value);
    });
  }
  
  // ============================================================
  // إنشاء واجهة الإعدادات
  // ============================================================
  createSettingsUI() {
    // إضافة زر الإعدادات في لوحة المسؤول
    const settingsTab = document.querySelector('[data-tab="settings"]');
    if (settingsTab) {
      // إضافة إعدادات متقدمة
      const section = document.getElementById('tab-settings');
      if (section) {
        this.addAdvancedSettings(section);
      }
    }
  }
  
  // ============================================================
  // إضافة إعدادات متقدمة
  // ============================================================
  addAdvancedSettings(container) {
    const advancedSettings = [
      { key: 'autoUpdate', label: '🔄 التحديث التلقائي', type: 'switch' },
      { key: 'saveChats', label: '💾 حفظ المحادثات', type: 'switch' },
      { key: 'showTyping', label: '⌨️ إظهار الكتابة', type: 'switch' },
      { key: 'readReceipts', label: '✓✓ تأكيد القراءة', type: 'switch' },
      { key: 'lastSeen', label: '👁️ آخر ظهور', type: 'switch' },
      { key: 'onlineStatus', label: '🟢 حالة الاتصال', type: 'switch' },
      { key: 'messageAnimation', label: '✨ أنيميشن الرسائل', type: 'switch' },
      { key: 'privacyMode', label: '🔒 وضع الخصوصية', type: 'switch' }
    ];
    
    const html = `
      <div style="margin-top:8px;border-top:1px solid var(--border-color);padding-top:8px;">
        <h4 style="font-size:0.75rem;color:var(--text-secondary);margin-bottom:6px;">⚙️ إعدادات متقدمة</h4>
        <div class="quick-settings">
          ${advancedSettings.map(setting => `
            <div class="item">
              <span class="label">${setting.label}</span>
              <div class="switch ${this.settings[setting.key] ? 'active' : ''}" 
                   data-setting="${setting.key}" 
                   onclick="appSettings.toggleSetting('${setting.key}')">
                <span class="thumb"></span>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div style="margin-top:8px;">
          <label style="font-size:0.7rem;color:var(--text-secondary);display:block;margin-bottom:2px;">📱 حجم الخط</label>
          <select id="fontSizeSelect" style="width:100%;padding:6px 10px;border-radius:8px;border:1px solid var(--border-color);background:var(--bg-input);color:var(--text-primary);font-size:0.8rem;" onchange="appSettings.set('fontSize', this.value)">
            <option value="small">صغير</option>
            <option value="medium" ${this.settings.fontSize === 'medium' ? 'selected' : ''}>وسط</option>
            <option value="large" ${this.settings.fontSize === 'large' ? 'selected' : ''}>كبير</option>
            <option value="xlarge" ${this.settings.fontSize === 'xlarge' ? 'selected' : ''}>كبير جداً</option>
          </select>
        </div>
        
        <div style="margin-top:6px;">
          <label style="font-size:0.7rem;color:var(--text-secondary);display:block;margin-bottom:2px;">🎨 خلفية الدردشة</label>
          <select id="bgSelect" style="width:100%;padding:6px 10px;border-radius:8px;border:1px solid var(--border-color);background:var(--bg-input);color:var(--text-primary);font-size:0.8rem;" onchange="appSettings.set('chatBackground', this.value)">
            <option value="default">افتراضي</option>
            <option value="gradient">تدرج لوني</option>
            <option value="dark">داكن</option>
            <option value="light">فاتح</option>
          </select>
        </div>
      </div>
    `;
    
    container.innerHTML += html;
  }
  
  // ============================================================
  // تبديل إعداد
  // ============================================================
  toggleSetting(key) {
    const current = this.settings[key];
    this.set(key, !current);
    
    // تحديث واجهة المفتاح
    const switchEl = document.querySelector(`[data-setting="${key}"]`);
    if (switchEl) {
      switchEl.classList.toggle('active');
    }
  }
  
  // ============================================================
  // تحديث واجهة الإعدادات
  // ============================================================
  updateSettingsUI(key, value) {
    const switchEl = document.querySelector(`[data-setting="${key}"]`);
    if (switchEl) {
      if (value) {
        switchEl.classList.add('active');
      } else {
        switchEl.classList.remove('active');
      }
    }
  }
  
  // ============================================================
  // إعداد اختصارات لوحة المفاتيح
  // ============================================================
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl + Shift + D - تبديل الثيم
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        const themes = ['light', 'dark', 'auto'];
        const current = this.settings.theme;
        const index = themes.indexOf(current);
        const next = themes[(index + 1) % themes.length];
        this.set('theme', next);
        this.showToast(`🌓 الثيم: ${next}`);
      }
      
      // Ctrl + Shift + S - فتح الإعدادات
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        this.openSettingsPanel();
      }
      
      // Ctrl + Shift + N - إشعار تجريبي
      if (e.ctrlKey && e.shiftKey && e.key === 'N') {
        e.preventDefault();
        if (window.notificationHelper) {
          window.notificationHelper.sendNotification('📱 نيزك إنستا', {
            body: 'هذا إشعار تجريبي',
            icon: '/icons/icon-192x192.png'
          });
        }
      }
    });
  }
  
  // ============================================================
  // فتح لوحة الإعدادات
  // ============================================================
  openSettingsPanel() {
    const adminBtn = document.getElementById('adminShieldBtn');
    if (adminBtn) {
      adminBtn.click();
      // التبديل إلى تبويب الإعدادات
      setTimeout(() => {
        const settingsTab = document.querySelector('[data-tab="settings"]');
        if (settingsTab) {
          settingsTab.click();
        }
      }, 200);
    }
  }
  
  // ============================================================
  // عرض تنبيه
  // ============================================================
  showToast(message) {
    const existing = document.querySelector('.settings-toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'settings-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      padding: 8px 16px;
      border-radius: 12px;
      background: var(--bg-secondary, #FFFFFF);
      color: var(--text-primary, #262626);
      font-size: 0.85rem;
      z-index: 10000;
      box-shadow: 0 8px 32px rgba(0,0,0,0.12);
      animation: slideUp 0.3s ease;
      max-width: 90%;
      text-align: center;
      border: 1px solid var(--border-color, #DBDBDB);
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }
  
  // ============================================================
  // تصدير الإعدادات
  // ============================================================
  exportSettings() {
    const data = JSON.stringify(this.settings, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nezek-settings-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('✅ تم تصدير الإعدادات');
  }
  
  // ============================================================
  // استيراد الإعدادات
  // ============================================================
  importSettings(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        this.settings = { ...this.settings, ...data };
        this.saveSettings();
        this.applySettings();
        this.showToast('✅ تم استيراد الإعدادات');
      } catch (error) {
        this.showToast('❌ فشل استيراد الإعدادات: ' + error.message);
      }
    };
    reader.readAsText(file);
  }
  
  // ============================================================
  // إعادة تعيين الإعدادات
  // ============================================================
  resetSettings() {
    if (!confirm('⚠️ هل أنت متأكد من إعادة تعيين جميع الإعدادات؟')) return;
    
    const defaultSettings = {
      theme: 'light',
      language: 'ar',
      notifications: true,
      sounds: true,
      vibrations: true,
      autoUpdate: true,
      saveChats: true,
      showTyping: true,
      readReceipts: true,
      lastSeen: true,
      onlineStatus: true,
      fontSize: 'medium',
      chatBackground: 'default',
      messageAnimation: true,
      autoDownloadImages: 'wifi',
      storageLimit: 100,
      privacyMode: false,
      lockScreen: false,
      lockPassword: '',
      darkModeSchedule: false,
      darkModeStart: '22:00',
      darkModeEnd: '06:00'
    };
    
    this.settings = defaultSettings;
    this.saveSettings();
    this.applySettings();
    this.showToast('✅ تم إعادة تعيين الإعدادات');
  }
}

// ============================================================
// تصدير المدير
// ============================================================
window.AppSettings = AppSettings;

// إنشاء مدير الإعدادات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  window.appSettings = new AppSettings();
});

console.log('[App Settings] تم تحميل مدير الإعدادات');
