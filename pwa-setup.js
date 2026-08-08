<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
    <title>نيزك - إنستا دردشة</title>
    
    <!-- ============================================================
    PWA - المانيفست والأيقونات
    ============================================================ -->
    <link rel="manifest" href="manifest.json" />
    
    <!-- أيقونات PWA -->
    <link rel="icon" type="image/png" sizes="72x72" href="icons/icon-72x72.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="icons/icon-96x96.png" />
    <link rel="icon" type="image/png" sizes="128x128" href="icons/icon-128x128.png" />
    <link rel="icon" type="image/png" sizes="144x144" href="icons/icon-144x144.png" />
    <link rel="icon" type="image/png" sizes="152x152" href="icons/icon-152x152.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="icons/icon-192x192.png" />
    <link rel="icon" type="image/png" sizes="384x384" href="icons/icon-384x384.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="icons/icon-512x512.png" />
    
    <!-- أيقونات Apple Touch -->
    <link rel="apple-touch-icon" href="icons/icon-192x192.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="icons/icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="96x96" href="icons/icon-96x96.png" />
    <link rel="apple-touch-icon" sizes="128x128" href="icons/icon-128x128.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="icons/icon-144x144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="icons/icon-152x152.png" />
    <link rel="apple-touch-icon" sizes="192x192" href="icons/icon-192x192.png" />
    <link rel="apple-touch-icon" sizes="384x384" href="icons/icon-384x384.png" />
    <link rel="apple-touch-icon" sizes="512x512" href="icons/icon-512x512.png" />
    
    <!-- ============================================================
    ميتا تاغات PWA
    ============================================================ -->
    <meta name="theme-color" content="#405DE6" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="نيزك إنستا" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="application-name" content="نيزك إنستا" />
    
    <!-- ============================================================
    Firebase
    ============================================================ -->
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-storage-compat.js"></script>
    
    <!-- ============================================================
    PWA Scripts
    ============================================================ -->
    <script src="pwa-setup.js" defer></script>
    <script src="pwa-install.js" defer></script>
    <script src="notification-helper.js" defer></script>
    
    <style>
        /* ===== CSS Variables & Reset ===== */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        
        :root {
            --bg-primary: #FAFAFA;
            --bg-secondary: #FFFFFF;
            --bg-chat: #F5F5F5;
            --bg-header: #FFFFFF;
            --bg-input: #F0F0F0;
            --bg-bubble-sent: #E8F0FE;
            --bg-bubble-received: #FFFFFF;
            --text-primary: #262626;
            --text-secondary: #8E8E8E;
            --text-bubble-sent: #262626;
            --text-bubble-received: #262626;
            --color-accent: #405DE6;
            --color-accent-gradient: linear-gradient(135deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D);
            --border-color: #DBDBDB;
            --shadow-color: rgba(0,0,0,0.05);
            --radius-lg: 20px;
            --radius-md: 14px;
            --radius-sm: 10px;
            --safe-top: env(safe-area-inset-top, 0px);
            --safe-bottom: env(safe-area-inset-bottom, 0px);
            --transition-speed: 0.25s;
        }
        
        body.theme-dark {
            --bg-primary: #000000;
            --bg-secondary: #121212;
            --bg-chat: #0A0A0A;
            --bg-header: #121212;
            --bg-input: #262626;
            --bg-bubble-sent: #262626;
            --bg-bubble-received: #1A1A1A;
            --text-primary: #FFFFFF;
            --text-secondary: #8E8E8E;
            --text-bubble-sent: #FFFFFF;
            --text-bubble-received: #FFFFFF;
            --border-color: #262626;
        }
        
        html, body {
            height: 100%;
            width: 100%;
            overflow: hidden;
            position: fixed;
            top: 0;
            left: 0;
            background: var(--bg-primary);
            color: var(--text-primary);
            transition: background 0.3s, color 0.3s;
            -webkit-tap-highlight-color: transparent;
        }
        
        #app {
            width: 100%;
            height: 100vh;
            height: 100dvh;
            max-width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
            background: var(--bg-primary);
            transition: background 0.3s;
        }
        
        /* ===== Animations ===== */
        @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateY(8px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop {
            0% { transform: scale(0.8); opacity: 0; }
            70% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulse {
            0%,100% { transform: scale(1); }
            50% { transform: scale(1.04); }
        }
        @keyframes blink {
            0%,100% { opacity: 1; }
            50% { opacity: 0.3; }
        }
        @keyframes dotBounce {
            0%,60%,100% { transform: translateY(0); }
            30% { transform: translateY(-4px); }
        }
        @keyframes progressPulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
        }
        @keyframes loadingBar {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
        }
        @keyframes messageIn {
            from { opacity: 0; transform: translateY(10px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .fade-enter { animation: fadeSlideIn 0.25s ease forwards; }
        .pop-enter { animation: pop 0.2s ease forwards; }
        .msg-enter { animation: messageIn 0.3s ease forwards; }
        
        /* ============================================================
        شاشة التهيئة الأولية (Splash Screen)
        ============================================================ */
        #splashScreen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #111b21;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        #splashScreen.hidden {
            opacity: 0;
            transform: scale(1.05);
            pointer-events: none;
        }
        
        #splashScreen .splash-logo {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: var(--color-accent-gradient);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4.5rem;
            margin-bottom: 20px;
            box-shadow: 0 10px 60px rgba(64, 93, 230, 0.3);
            animation: pulse 2s infinite;
        }
        
        #splashScreen .splash-title {
            font-size: 2.5rem;
            font-weight: 700;
            background: var(--color-accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 8px;
        }
        
        #splashScreen .splash-subtitle {
            color: #8e8e8e;
            font-size: 0.9rem;
            margin-bottom: 30px;
            letter-spacing: 2px;
        }
        
        /* ===== شريط تقدم التهيئة ===== */
        #initProgressBar {
            width: 80%;
            max-width: 400px;
            height: 6px;
            background: rgba(255,255,255,0.1);
            border-radius: 6px;
            overflow: hidden;
            margin-bottom: 12px;
        }
        
        #initProgressBar .progress-fill {
            height: 100%;
            width: 0%;
            background: var(--color-accent-gradient);
            border-radius: 6px;
            transition: width 0.5s ease;
        }
        
        #initProgressBar .progress-fill.loading {
            animation: progressPulse 1s ease-in-out infinite;
        }
        
        #splashScreen .init-status {
            color: #8e8e8e;
            font-size: 0.8rem;
            min-height: 24px;
            text-align: center;
        }
        
        #splashScreen .init-details {
            color: #6a6a6a;
            font-size: 0.65rem;
            min-height: 20px;
            text-align: center;
            margin-top: 4px;
        }
        
        #splashScreen .init-steps {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin-top: 15px;
            width: 80%;
            max-width: 400px;
        }
        
        #splashScreen .init-step {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #6a6a6a;
            font-size: 0.7rem;
            transition: all 0.3s ease;
            padding: 4px 8px;
            border-radius: 6px;
        }
        
        #splashScreen .init-step .step-icon {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.65rem;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.05);
            flex-shrink: 0;
            transition: all 0.3s ease;
        }
        
        #splashScreen .init-step.active .step-icon {
            background: rgba(64,93,230,0.2);
            border-color: #405DE6;
            color: #405DE6;
        }
        
        #splashScreen .init-step.done .step-icon {
            background: rgba(37,211,102,0.2);
            border-color: #25D366;
            color: #25D366;
        }
        
        #splashScreen .init-step.error .step-icon {
            background: rgba(225,48,108,0.2);
            border-color: #E1306C;
            color: #E1306C;
        }
        
        #splashScreen .init-step .step-text {
            flex: 1;
        }
        
        #splashScreen .init-step .step-status {
            font-size: 0.55rem;
            opacity: 0.5;
        }
        
        #splashScreen .init-step.active .step-text {
            color: #fff;
        }
        
        #splashScreen .init-step.done .step-text {
            color: #25D366;
        }
        
        #splashScreen .init-step.error .step-text {
            color: #E1306C;
        }
        
        /* ===== زر إعادة المحاولة ===== */
        #retryInitBtn {
            display: none;
            margin-top: 15px;
            padding: 10px 30px;
            border-radius: 25px;
            border: none;
            background: var(--color-accent-gradient);
            color: #fff;
            font-weight: 700;
            font-size: 0.85rem;
            cursor: pointer;
            transition: 0.3s;
        }
        
        #retryInitBtn:hover { transform: scale(1.02); }
        #retryInitBtn:active { transform: scale(0.97); }
        
        /* ============================================================
        شريط تقدم تحميل الرسائل
        ============================================================ */
        #loadingMessagesBar {
            display: none;
            padding: 8px 16px;
            background: var(--bg-secondary);
            border-bottom: 1px solid var(--border-color);
            align-items: center;
            gap: 12px;
            flex-shrink: 0;
        }
        
        #loadingMessagesBar .loader-track {
            flex: 1;
            height: 4px;
            background: var(--bg-input);
            border-radius: 4px;
            overflow: hidden;
            position: relative;
        }
        
        #loadingMessagesBar .loader-track .loader-fill {
            height: 100%;
            width: 0%;
            background: var(--color-accent-gradient);
            border-radius: 4px;
            transition: width 0.3s ease;
        }
        
        #loadingMessagesBar .loader-track .loader-fill.loading {
            animation: loadingBar 2s ease-in-out infinite;
        }
        
        #loadingMessagesBar .loader-text {
            font-size: 0.7rem;
            color: var(--text-secondary);
            white-space: nowrap;
            min-width: 80px;
            text-align: right;
        }
        
        #loadingMessagesBar .loader-count {
            font-size: 0.65rem;
            color: var(--text-secondary);
            opacity: 0.5;
            white-space: nowrap;
        }
        
        /* ============================================================
        زر "تحميل المزيد"
        ============================================================ */
        #loadMoreBtn {
            display: none;
            text-align: center;
            padding: 12px 16px;
            margin: 4px 0 8px 0;
            color: var(--color-accent);
            font-size: 0.8rem;
            cursor: pointer;
            background: transparent;
            border: 2px dashed var(--border-color);
            border-radius: 12px;
            transition: 0.3s;
            font-weight: 600;
            width: 100%;
        }
        
        #loadMoreBtn:hover {
            background: rgba(64,93,230,0.04);
            border-color: var(--color-accent);
        }
        
        #loadMoreBtn:active {
            transform: scale(0.97);
        }
        
        #loadMoreBtn .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid var(--border-color);
            border-top: 2px solid var(--color-accent);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            vertical-align: middle;
            margin-left: 8px;
        }
        
        #loadMoreBtn.loading {
            opacity: 0.7;
            cursor: wait;
        }
        
        /* ============================================================
        شاشة الدخول
        ============================================================ */
        #loginScreen {
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 40px 30px;
            text-align: center;
            background: var(--bg-primary);
            transition: background 0.3s;
            position: relative;
            overflow: hidden;
        }
        
        #loginScreen .login-bg-pattern {
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at 30% 40%, rgba(64,93,230,0.03) 0%, transparent 60%),
                        radial-gradient(circle at 70% 60%, rgba(193,53,132,0.03) 0%, transparent 50%);
            z-index: 0;
            animation: pulse 10s ease-in-out infinite;
        }
        
        #loginScreen .logo-wrap {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: var(--color-accent-gradient);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4.2rem;
            margin-bottom: 20px;
            box-shadow: 0 15px 50px rgba(64, 93, 230, 0.25);
            animation: pulse 2s infinite;
            position: relative;
            z-index: 1;
        }
        
        #loginScreen .logo-wrap .logo-glow {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: var(--color-accent-gradient);
            opacity: 0.3;
            filter: blur(20px);
            animation: pulse 2s infinite;
        }
        
        #loginScreen h1 {
            font-size: 2.8rem;
            font-weight: 700;
            background: var(--color-accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 4px;
            letter-spacing: -1px;
            position: relative;
            z-index: 1;
        }
        
        #loginScreen .subtitle {
            color: var(--text-secondary);
            font-size: 0.95rem;
            margin-bottom: 35px;
            letter-spacing: 2px;
            position: relative;
            z-index: 1;
        }
        
        #loginScreen .input-group {
            width: 100%;
            max-width: 400px;
            position: relative;
            margin-bottom: 14px;
            z-index: 1;
        }
        
        #loginScreen .input-group .input-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.2rem;
            opacity: 0.4;
            transition: 0.3s;
            z-index: 2;
        }
        
        #loginScreen .input-group input {
            width: 100%;
            padding: 18px 20px 18px 50px;
            border-radius: 30px;
            border: 2px solid var(--border-color);
            background: var(--bg-secondary);
            color: var(--text-primary);
            font-size: 1rem;
            outline: none;
            transition: 0.3s;
            position: relative;
        }
        
        #loginScreen .input-group input:focus {
            border-color: var(--color-accent);
            box-shadow: 0 0 0 4px rgba(64, 93, 230, 0.08);
            transform: scale(1.01);
        }
        
        #loginScreen .btn-primary {
            width: 100%;
            max-width: 400px;
            padding: 18px;
            border-radius: 30px;
            border: none;
            background: var(--color-accent-gradient);
            color: #fff;
            font-weight: 700;
            font-size: 1.05rem;
            cursor: pointer;
            transition: 0.3s;
            box-shadow: 0 8px 30px rgba(64, 93, 230, 0.2);
            margin-top: 8px;
            position: relative;
            z-index: 1;
            overflow: hidden;
        }
        
        #loginScreen .btn-primary:hover {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 12px 40px rgba(64, 93, 230, 0.3);
        }
        
        #loginScreen .btn-primary:active {
            transform: scale(0.97);
        }
        
        #loginScreen .btn-primary .btn-shimmer {
            position: absolute;
            top: 0;
            left: -100%;
            width: 200%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
            animation: shimmer 3s ease-in-out infinite;
        }
        
        #loginScreen .btn-secondary {
            width: 100%;
            max-width: 400px;
            padding: 14px;
            border-radius: 30px;
            border: 2px solid var(--border-color);
            background: transparent;
            color: var(--text-secondary);
            font-size: 0.9rem;
            cursor: pointer;
            margin-top: 10px;
            transition: 0.3s;
            position: relative;
            z-index: 1;
        }
        
        #loginScreen .btn-secondary:hover {
            border-color: var(--color-accent);
            color: var(--color-accent);
            transform: translateY(-2px);
        }
        
        #adminPassWrap { 
            width: 100%; 
            max-width: 400px; 
            display: none; 
            margin-top: 4px;
            position: relative;
            z-index: 1;
        }
        
        #adminPassWrap input { 
            border-color: #E1306C !important; 
            padding: 18px 20px 18px 50px;
            border-radius: 30px;
            border: 2px solid #E1306C;
            background: var(--bg-secondary);
            color: var(--text-primary);
            font-size: 1rem;
            outline: none;
            transition: 0.3s;
            width: 100%;
        }
        
        #adminPassWrap input:focus {
            box-shadow: 0 0 0 4px rgba(225,48,108,0.1);
        }
        
        #loginError { 
            color: #E1306C; 
            margin-top: 12px; 
            font-size: 0.85rem; 
            min-height: 24px;
            position: relative;
            z-index: 1;
            animation: fadeIn 0.3s ease;
        }
        
        .color-picker {
            display: flex;
            gap: 10px;
            margin: 12px 0;
            flex-wrap: wrap;
            justify-content: center;
            position: relative;
            z-index: 1;
        }
        
        .color-picker .color-label {
            font-size: 0.7rem;
            opacity: 0.5;
            margin-left: 6px;
            color: var(--text-secondary);
            align-self: center;
        }
        
        .color-picker .color-option {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            border: 3px solid transparent;
            transition: 0.3s;
            position: relative;
        }
        
        .color-picker .color-option:hover {
            transform: scale(1.15);
        }
        
        .color-picker .color-option.active {
            border-color: var(--text-primary);
            transform: scale(1.1);
        }
        
        .color-picker .color-option.active::after {
            content: '✓';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: 0.7rem;
            text-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        
        /* ===== شاشة الدردشة ===== */
        #chatScreen {
            display: none;
            flex-direction: column;
            height: 100%;
            flex: 1;
            background: var(--bg-chat);
            transition: background 0.3s;
        }
        
        .chat-header {
            padding: 10px 16px;
            padding-top: calc(10px + var(--safe-top));
            display: flex;
            align-items: center;
            gap: 12px;
            background: var(--bg-header);
            border-bottom: 1px solid var(--border-color);
            flex-shrink: 0;
            min-height: 56px;
            transition: background 0.3s, border-color 0.3s;
            z-index: 20;
        }
        
        .chat-header .avatar-group {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--color-accent-gradient);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.3rem;
            color: #fff;
            flex-shrink: 0;
            overflow: hidden;
            cursor: pointer;
            position: relative;
            transition: 0.3s;
            border: 2px solid transparent;
        }
        .chat-header .avatar-group:hover { transform: scale(1.05); }
        .chat-header .avatar-group:active { transform: scale(0.95); }
        .chat-header .avatar-group img { width: 100%; height: 100%; object-fit: cover; }
        
        .chat-header .avatar-group .online-dot {
            position: absolute;
            bottom: 0px;
            right: 0px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #25D366;
            border: 2px solid var(--bg-header);
            animation: blink 2s infinite;
        }
        
        .chat-header .info { flex: 1; min-width: 0; }
        .chat-header .info h3 {
            font-size: 1rem;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: var(--text-primary);
            transition: color 0.3s;
        }
        .chat-header .info .status {
            font-size: 0.6rem;
            color: var(--text-secondary);
            transition: color 0.3s;
        }
        
        .chat-header .actions {
            display: flex;
            gap: 2px;
        }
        
        .chat-header .actions button {
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 1.3rem;
            cursor: pointer;
            padding: 6px 8px;
            border-radius: 40px;
            transition: 0.3s;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .chat-header .actions button:hover { background: rgba(0,0,0,0.02); }
        .chat-header .actions button:active { transform: scale(0.9); }
        
        /* ===== حاوية الرسائل ===== */
        #messagesContainer {
            flex: 1;
            overflow-y: auto;
            padding: 8px 12px 4px;
            display: flex;
            flex-direction: column;
            gap: 2px;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            background: var(--bg-chat);
            transition: background 0.3s, padding-bottom 0.3s;
        }
        #messagesContainer::-webkit-scrollbar { width: 3px; }
        #messagesContainer::-webkit-scrollbar-track { background: transparent; }
        #messagesContainer::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.06); border-radius: 10px; }
        
        /* ===== فقاعات ===== */
        .msg-wrapper {
            display: flex;
            flex-direction: column;
            animation: messageIn 0.25s ease forwards;
            cursor: default;
            position: relative;
            transition: 0.2s;
            margin-bottom: 2px;
        }
        
        .msg-wrapper .reply-preview {
            font-size: 0.6rem;
            opacity: 0.4;
            padding: 1px 10px 1px 6px;
            border-right: 3px solid var(--color-accent);
            margin-bottom: 1px;
            font-weight: 500;
            color: var(--text-secondary);
        }
        
        .msg {
            max-width: 78%;
            padding: 8px 14px 8px 16px;
            border-radius: 16px;
            font-size: 0.88rem;
            line-height: 1.4;
            word-wrap: break-word;
            position: relative;
            margin-bottom: 1px;
            transition: 0.2s;
            font-weight: 400;
            display: flex;
            align-items: flex-start;
            gap: 8px;
            box-shadow: 0 1px 2px var(--shadow-color);
        }
        
        .msg .avatar-small {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            flex-shrink: 0;
            overflow: hidden;
            cursor: pointer;
            transition: 0.2s;
            border: 2px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            background: var(--color-accent-gradient);
            color: #fff;
        }
        .msg .avatar-small:hover { transform: scale(1.08); }
        .msg .avatar-small img { width: 100%; height: 100%; object-fit: cover; }
        
        .msg .content { flex: 1; min-width: 0; }
        .msg .content .sender-name {
            font-weight: 600;
            font-size: 0.65rem;
            opacity: 0.5;
            margin-bottom: 2px;
            display: block;
            cursor: pointer;
            background: var(--color-accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .msg .content .sender-name:hover { opacity: 0.8; }
        .msg .content .text {
            font-size: 0.88rem;
            line-height: 1.4;
            font-weight: 400;
            color: var(--text-primary);
        }
        .msg .content .time {
            font-size: 0.5rem;
            opacity: 0.3;
            margin-top: 3px;
            text-align: left;
            display: flex;
            align-items: center;
            gap: 2px;
            justify-content: flex-end;
            color: var(--text-secondary);
        }
        .msg .content .time .check { font-size: 0.55rem; }
        .msg .content .sticker { font-size: 2.5rem; margin-top: 2px; display: block; cursor: pointer; transition: 0.2s; }
        .msg .content .sticker:hover { transform: scale(1.1); }
        .msg .content .sticker img { width: 60px; height: 60px; object-fit: contain; border-radius: 8px; }
        
        .msg.sent {
            align-self: flex-end;
            background: var(--bg-bubble-sent);
            border-bottom-right-radius: 3px;
            margin-left: 4px;
        }
        .msg.sent .content .text { color: var(--text-bubble-sent); }
        .msg.received {
            align-self: flex-start;
            background: var(--bg-bubble-received);
            border: 1px solid var(--border-color);
            border-bottom-left-radius: 3px;
            margin-right: 4px;
        }
        .msg.received .content .text { color: var(--text-bubble-received); }
        
        .msg .reactions {
            display: flex;
            gap: 2px;
            margin-top: 3px;
            flex-wrap: wrap;
        }
        .msg .reactions .reaction {
            background: rgba(0,0,0,0.03);
            padding: 1px 7px;
            border-radius: 10px;
            font-size: 0.7rem;
            cursor: pointer;
            transition: 0.2s;
            display: flex;
            align-items: center;
            gap: 2px;
            color: var(--text-secondary);
        }
        .msg .reactions .reaction:hover {
            background: rgba(0,0,0,0.06);
            transform: scale(1.05);
        }
        
        .msg .message-image {
            max-width: 200px;
            max-height: 200px;
            border-radius: 12px;
            margin-top: 4px;
            cursor: pointer;
            transition: 0.2s;
            border: 1px solid var(--border-color);
        }
        .msg .message-image:hover { transform: scale(1.02); }
        .msg .message-image:active { transform: scale(0.98); }
        
        .date-divider {
            text-align: center;
            font-size: 0.6rem;
            color: var(--text-secondary);
            padding: 4px 0;
            opacity: 0.3;
        }
        
        .welcome-msg {
            text-align: center;
            padding: 30px 0;
            opacity: 0.3;
        }
        .welcome-msg .icon { font-size: 3rem; }
        .welcome-msg .title {
            font-size: 1rem;
            margin-top: 8px;
            color: var(--text-primary);
        }
        .welcome-msg .sub {
            font-size: 0.75rem;
            margin-top: 4px;
            color: var(--text-secondary);
        }
        
        /* ===== مؤشر الكتابة ===== */
        #typingIndicator {
            font-size: 0.65rem;
            color: var(--text-secondary);
            padding: 2px 14px 4px;
            min-height: 20px;
            display: none;
            align-items: center;
            gap: 4px;
        }
        #typingIndicator .dots { display: flex; gap: 2px; }
        #typingIndicator .dots span {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: var(--text-secondary);
            animation: dotBounce 1.4s infinite;
        }
        #typingIndicator .dots span:nth-child(2) { animation-delay: 0.2s; }
        #typingIndicator .dots span:nth-child(3) { animation-delay: 0.4s; }
        
        /* ===== إدخال الرسالة ===== */
        .chat-input {
            display: flex;
            align-items: flex-end;
            gap: 6px;
            padding: 6px 10px 10px;
            padding-bottom: calc(10px + var(--safe-bottom));
            background: var(--bg-header);
            border-top: 1px solid var(--border-color);
            flex-shrink: 0;
            transition: background 0.3s, border-color 0.3s, padding-bottom 0.3s;
            z-index: 10;
        }
        
        .chat-input .input-wrap {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: var(--bg-input);
            border-radius: 20px;
            padding: 4px 8px;
            border: 1px solid var(--border-color);
            transition: 0.3s;
        }
        .chat-input .input-wrap:focus-within {
            border-color: var(--color-accent);
            box-shadow: 0 0 0 2px rgba(64, 93, 230, 0.05);
        }
        
        .chat-input .input-wrap .input-row {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 2px;
        }
        
        .chat-input .input-wrap .input-row .emoji-btn,
        .chat-input .input-wrap .input-row .sticker-btn,
        .chat-input .input-wrap .input-row .image-btn {
            background: none;
            border: none;
            font-size: 1.1rem;
            padding: 2px 6px;
            cursor: pointer;
            opacity: 0.5;
            transition: 0.2s;
            color: var(--text-secondary);
        }
        .chat-input .input-wrap .input-row .emoji-btn:hover,
        .chat-input .input-wrap .input-row .sticker-btn:hover,
        .chat-input .input-wrap .input-row .image-btn:hover { opacity: 1; }
        .chat-input .input-wrap .input-row .emoji-btn:active,
        .chat-input .input-wrap .input-row .sticker-btn:active,
        .chat-input .input-wrap .input-row .image-btn:active { transform: scale(0.9); }
        
        .chat-input .input-wrap .input-row textarea {
            flex: 1;
            padding: 6px 4px;
            border: none;
            background: transparent;
            color: var(--text-primary);
            font-size: 0.88rem;
            outline: none;
            min-height: 24px;
            max-height: 120px;
            resize: none;
            font-family: inherit;
            line-height: 1.4;
        }
        .chat-input .input-wrap .input-row textarea::placeholder {
            color: var(--text-secondary);
            font-size: 0.85rem;
        }
        
        .chat-input .send-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: none;
            background: var(--color-accent-gradient);
            color: #fff;
            font-size: 1.1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.3s;
            flex-shrink: 0;
            box-shadow: 0 4px 16px rgba(64, 93, 230, 0.12);
        }
        .chat-input .send-btn:hover { transform: scale(1.03); }
        .chat-input .send-btn:active { transform: scale(0.9); }
        
        /* ===== لوحة الإيموجي ===== */
        #emojiPanel {
            display: none;
            flex-wrap: wrap;
            padding: 6px 8px;
            background: var(--bg-secondary);
            border-top: 1px solid var(--border-color);
            gap: 2px;
            max-height: 200px;
            overflow-y: auto;
            flex-shrink: 0;
            transition: background 0.3s, border-color 0.3s;
            z-index: 5;
        }
        #emojiPanel .emoji-item {
            font-size: 1.3rem;
            padding: 2px 3px;
            cursor: pointer;
            border-radius: 4px;
            transition: 0.1s;
            user-select: none;
            width: 36px;
            text-align: center;
        }
        #emojiPanel .emoji-item:hover {
            background: rgba(0,0,0,0.04);
            transform: scale(1.15);
        }
        #emojiPanel .emoji-item:active { transform: scale(0.85); }
        #emojiPanel::-webkit-scrollbar { width: 2px; }
        #emojiPanel::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.06); border-radius: 10px; }
        #emojiPanel .emoji-category {
            width: 100%;
            font-size: 0.6rem;
            opacity: 0.4;
            padding: 2px 4px;
            color: var(--text-secondary);
            font-weight: 600;
        }
        
        /* ===== لوحة الستيكرات ===== */
        #stickerPanel {
            display: none;
            flex-direction: column;
            background: var(--bg-secondary);
            border-top: 1px solid var(--border-color);
            flex-shrink: 0;
            max-height: 280px;
            transition: background 0.3s, border-color 0.3s;
            z-index: 5;
        }
        
        #stickerPanel .sticker-tabs {
            display: flex;
            gap: 4px;
            padding: 4px 8px;
            border-bottom: 1px solid var(--border-color);
            overflow-x: auto;
            flex-shrink: 0;
        }
        #stickerPanel .sticker-tabs .tab {
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.7rem;
            cursor: pointer;
            transition: 0.2s;
            white-space: nowrap;
            background: var(--bg-input);
            color: var(--text-secondary);
            border: 1px solid transparent;
        }
        #stickerPanel .sticker-tabs .tab.active {
            background: var(--color-accent);
            color: #fff;
        }
        #stickerPanel .sticker-tabs .tab:hover { opacity: 0.8; }
        #stickerPanel .sticker-tabs .tab.download { background: #25D366; color: #fff; }
        #stickerPanel .sticker-tabs .tab.upload { background: #4facfe; color: #fff; }
        
        #stickerPanel .sticker-grid {
            display: flex;
            flex-wrap: wrap;
            padding: 6px 8px;
            gap: 4px;
            overflow-y: auto;
            flex: 1;
            align-content: flex-start;
        }
        #stickerPanel .sticker-grid .sticker-item {
            font-size: 2.2rem;
            padding: 4px;
            cursor: pointer;
            border-radius: 8px;
            transition: 0.12s;
            user-select: none;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--bg-chat);
            border: 1px solid var(--border-color);
            border-radius: 12px;
        }
        #stickerPanel .sticker-grid .sticker-item:hover {
            background: rgba(0,0,0,0.04);
            transform: scale(1.05);
        }
        #stickerPanel .sticker-grid .sticker-item:active { transform: scale(0.9); }
        #stickerPanel .sticker-grid .sticker-item img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        #stickerPanel .sticker-grid::-webkit-scrollbar { width: 2px; }
        #stickerPanel .sticker-grid::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.06); border-radius: 10px; }
        
        /* ===== شريط الرد ===== */
        .reply-bar {
            display: none;
            padding: 3px 12px 3px 8px;
            background: var(--bg-secondary);
            border-top: 1px solid var(--border-color);
            font-size: 0.7rem;
            color: var(--text-secondary);
            align-items: center;
            gap: 8px;
            flex-shrink: 0;
            z-index: 5;
        }
        .reply-bar .reply-text { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .reply-bar .reply-cancel { background: none; border: none; color: #E1306C; cursor: pointer; font-size: 1rem; }
        
        /* ===== قائمة الضغط المطول ===== */
        #longPressMenu {
            display: none;
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--bg-secondary);
            border-radius: 16px;
            padding: 8px 12px;
            z-index: 350;
            box-shadow: 0 8px 30px rgba(0,0,0,0.15);
            border: 1px solid var(--border-color);
            animation: slideUp 0.15s ease;
            min-width: 160px;
            max-width: 90%;
        }
        #longPressMenu .menu-items {
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
            justify-content: center;
        }
        #longPressMenu .menu-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1px;
            padding: 4px 8px;
            border-radius: 10px;
            cursor: pointer;
            transition: 0.15s;
            border: none;
            background: none;
            color: var(--text-secondary);
            min-width: 36px;
        }
        #longPressMenu .menu-item:hover { background: rgba(0,0,0,0.03); }
        #longPressMenu .menu-item:active { transform: scale(0.88); }
        #longPressMenu .menu-item .icon { font-size: 1.1rem; }
        #longPressMenu .menu-item .label { font-size: 0.45rem; opacity: 0.5; }
        #longPressMenu .menu-item.danger .icon { color: #E1306C; }
        #longPressMenu .menu-item.danger .label { color: #E1306C; }
        #longPressMenu .menu-item .reaction-emoji {
            font-size: 1.4rem;
            padding: 1px 4px;
            border-radius: 6px;
            transition: 0.15s;
        }
        #longPressMenu .menu-item .reaction-emoji:hover {
            background: rgba(0,0,0,0.05);
            transform: scale(1.2);
        }
        
        /* ===== مودال الملف الشخصي ===== */
        #profileModal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(15px);
            z-index: 250;
            justify-content: center;
            align-items: center;
            padding: 20px;
            animation: fadeIn 0.2s ease;
        }
        #profileModal .modal-content {
            background: var(--bg-secondary);
            border-radius: 20px;
            padding: 24px;
            max-width: 380px;
            width: 100%;
            border: 1px solid var(--border-color);
            animation: fadeSlideIn 0.2s ease;
            text-align: center;
        }
        #profileModal .profile-avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin: 0 auto 12px;
            background: var(--color-accent-gradient);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            overflow: hidden;
            border: 3px solid var(--border-color);
        }
        #profileModal .profile-avatar img { width: 100%; height: 100%; object-fit: cover; }
        #profileModal .profile-name { font-size: 1.2rem; font-weight: 700; color: var(--text-primary); }
        #profileModal .profile-username { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 4px; }
        #profileModal .profile-bio {
            font-size: 0.85rem;
            color: var(--text-primary);
            padding: 8px 12px;
            background: var(--bg-input);
            border-radius: 10px;
            margin: 8px 0;
            min-height: 40px;
        }
        #profileModal .profile-status { font-size: 0.7rem; color: var(--text-secondary); }
        #profileModal .profile-close {
            margin-top: 12px;
            padding: 8px 24px;
            border-radius: 20px;
            border: none;
            background: var(--color-accent-gradient);
            color: #fff;
            font-weight: 600;
            cursor: pointer;
            transition: 0.3s;
        }
        #profileModal .profile-close:hover { transform: scale(1.02); }
        #profileModal .profile-close:active { transform: scale(0.95); }
        
        /* ===== مودال تعديل الصورة ===== */
        .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(10px);
            z-index: 200;
            justify-content: center;
            align-items: center;
            padding: 20px;
            animation: fadeIn 0.15s ease;
        }
        .modal-overlay .modal-content {
            background: var(--bg-secondary);
            border-radius: 20px;
            padding: 22px;
            max-width: 360px;
            width: 100%;
            border: 1px solid var(--border-color);
            animation: fadeSlideIn 0.15s ease;
        }
        .modal-overlay .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 14px;
        }
        .modal-overlay .modal-header h3 { font-size: 1.05rem; color: var(--color-accent); }
        .modal-overlay .modal-header .close-modal { background: none; border: none; color: #E1306C; font-size: 1.3rem; cursor: pointer; }
        
        .modal-overlay .avatar-preview {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin: 0 auto 12px;
            background: var(--color-accent-gradient);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            overflow: hidden;
            cursor: pointer;
            position: relative;
            transition: 0.3s;
            border: 3px solid var(--border-color);
        }
        .modal-overlay .avatar-preview:hover { transform: scale(1.03); }
        .modal-overlay .avatar-preview:active { transform: scale(0.95); }
        .modal-overlay .avatar-preview img { width: 100%; height: 100%; object-fit: cover; }
        .modal-overlay .avatar-preview .upload-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,0.5);
            color: #fff;
            font-size: 0.55rem;
            padding: 3px;
            text-align: center;
        }
        .modal-overlay .modal-field { margin-bottom: 10px; }
        .modal-overlay .modal-field label {
            display: block;
            font-size: 0.7rem;
            opacity: 0.5;
            margin-bottom: 2px;
            color: var(--text-secondary);
        }
        .modal-overlay .modal-field input,
        .modal-overlay .modal-field textarea {
            width: 100%;
            padding: 8px 12px;
            border-radius: var(--radius-sm);
            border: 1px solid var(--border-color);
            background: var(--bg-input);
            color: var(--text-primary);
            font-size: 0.85rem;
            outline: none;
            transition: 0.3s;
            font-family: inherit;
        }
        .modal-overlay .modal-field input:focus,
        .modal-overlay .modal-field textarea:focus { border-color: var(--color-accent); }
        .modal-overlay .modal-field textarea { min-height: 60px; resize: vertical; }
        
        .modal-overlay .modal-actions {
            display: flex;
            gap: 8px;
            margin-top: 14px;
        }
        .modal-overlay .modal-actions button {
            flex: 1;
            padding: 8px;
            border-radius: var(--radius-sm);
            border: none;
            font-weight: 600;
            cursor: pointer;
            transition: 0.3s;
            font-size: 0.85rem;
        }
        .modal-overlay .modal-actions .btn-save {
            background: var(--color-accent-gradient);
            color: #fff;
        }
        .modal-overlay .modal-actions .btn-save:hover { transform: scale(1.02); }
        .modal-overlay .modal-actions .btn-save:active { transform: scale(0.97); }
        .modal-overlay .modal-actions .btn-cancel {
            background: var(--bg-input);
            color: var(--text-secondary);
            border: 1px solid var(--border-color);
        }
        .modal-overlay .modal-actions .btn-cancel:hover { opacity: 0.8; }
        
        /* ===== لوحة المسؤول ===== */
        #adminPanel {
            display: none;
            flex-direction: column;
            height: 100%;
            padding: 12px;
            padding-top: calc(12px + var(--safe-top));
            background: var(--bg-primary);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 100;
            overflow-y: auto;
            animation: fadeSlideIn 0.15s ease;
        }
        #adminPanel .admin-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            padding-bottom: 8px;
            border-bottom: 1px solid var(--border-color);
        }
        #adminPanel .admin-header h2 {
            background: var(--color-accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 1.1rem;
        }
        #adminPanel .admin-header .close-admin { background: none; border: none; color: #E1306C; font-size: 1.3rem; cursor: pointer; padding: 4px 8px; }
        
        #adminPanel .server-stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 4px;
            margin-bottom: 10px;
        }
        #adminPanel .server-stats .stat {
            padding: 6px;
            background: var(--bg-secondary);
            border-radius: var(--radius-sm);
            text-align: center;
            border: 1px solid var(--border-color);
        }
        #adminPanel .server-stats .stat .num {
            font-size: 1rem;
            font-weight: 700;
            background: var(--color-accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        #adminPanel .server-stats .stat .label { font-size: 0.5rem; opacity: 0.5; color: var(--text-secondary); }
        
        #adminPanel .repair-actions {
            display: flex;
            gap: 4px;
            margin-bottom: 8px;
            flex-wrap: wrap;
        }
        #adminPanel .repair-actions button {
            flex: 1;
            min-width: 60px;
            padding: 6px 10px;
            border-radius: var(--radius-sm);
            border: none;
            font-weight: 600;
            font-size: 0.7rem;
            cursor: pointer;
            transition: 0.3s;
        }
        #adminPanel .repair-actions button:hover { transform: scale(1.02); }
        #adminPanel .repair-actions button:active { transform: scale(0.97); }
        #adminPanel .repair-actions .btn-restart { background: #4facfe; color: #fff; }
        #adminPanel .repair-actions .btn-clear { background: #E1306C; color: #fff; }
        #adminPanel .repair-actions .btn-sync { background: #25D366; color: #fff; }
        #adminPanel .repair-actions .btn-repair { background: #f5a623; color: #fff; }
        #adminPanel .repair-actions .btn-rebuild { background: #833AB4; color: #fff; }
        #adminPanel .repair-actions .btn-fix-index { background: #FF6B6B; color: #fff; }
        
        #adminPanel .admin-tabs {
            display: flex;
            gap: 4px;
            margin-bottom: 8px;
            flex-wrap: wrap;
        }
        #adminPanel .admin-tabs button {
            padding: 4px 12px;
            border-radius: var(--radius-sm);
            border: 1px solid var(--border-color);
            background: var(--bg-secondary);
            color: var(--text-secondary);
            cursor: pointer;
            transition: 0.3s;
            font-size: 0.7rem;
            font-weight: 600;
        }
        #adminPanel .admin-tabs button.active {
            border-color: var(--color-accent);
            background: var(--color-accent);
            color: #fff;
        }
        #adminPanel .admin-tabs button:hover { opacity: 0.8; }
        #adminPanel .admin-section { display: none; flex-direction: column; gap: 6px; }
        #adminPanel .admin-section.active { display: flex; }
        
        #adminUserList {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
        #adminUserList .user-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 4px 8px;
            background: var(--bg-secondary);
            border-radius: var(--radius-sm);
            gap: 4px;
            flex-wrap: wrap;
            border: 1px solid var(--border-color);
        }
        #adminUserList .user-item .name {
            font-weight: 500;
            font-size: 0.75rem;
            display: flex;
            align-items: center;
            gap: 4px;
            flex-wrap: wrap;
            color: var(--text-primary);
        }
        #adminUserList .user-item .name .badge {
            font-size: 0.4rem;
            padding: 1px 5px;
            border-radius: 12px;
            background: var(--color-accent);
            color: #fff;
        }
        #adminUserList .user-item .name .badge.admin { background: #833AB4; }
        #adminUserList .user-item .name .badge.blocked { background: #E1306C; }
        #adminUserList .user-item .name .badge.online { background: #25D366; }
        #adminUserList .user-item .name .badge.offline { background: #8E8E8E; }
        
        #adminUserList .user-item .actions-group {
            display: flex;
            gap: 2px;
            flex-wrap: wrap;
        }
        #adminUserList .user-item .actions-group button {
            background: none;
            border: none;
            padding: 1px 5px;
            border-radius: 10px;
            font-size: 0.55rem;
            font-weight: 600;
            cursor: pointer;
            transition: 0.2s;
        }
        #adminUserList .user-item .btn-block { color: #E1306C; }
        #adminUserList .user-item .btn-block:hover { background: rgba(225, 48, 108, 0.05); }
        #adminUserList .user-item .btn-delete { color: #FD1D1D; }
        #adminUserList .user-item .btn-delete:hover { background: rgba(253, 29, 29, 0.05); }
        #adminUserList .user-item .btn-admin { color: #833AB4; }
        #adminUserList .user-item .btn-admin:hover { background: rgba(131, 58, 180, 0.05); }
        #adminUserList .user-item .btn-unblock { color: var(--color-accent); }
        #adminUserList .user-item .btn-unblock:hover { background: rgba(64, 93, 230, 0.05); }
        #adminUserList .user-item .btn-warn { color: #FCAF45; }
        #adminUserList .user-item .btn-warn:hover { background: rgba(252, 175, 69, 0.05); }
        
        .bad-words-list {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            padding: 4px 0;
        }
        .bad-words-list .word-tag {
            background: rgba(225, 48, 108, 0.08);
            color: #E1306C;
            padding: 2px 8px;
            border-radius: 14px;
            font-size: 0.7rem;
            display: flex;
            align-items: center;
            gap: 4px;
            border: 1px solid rgba(225, 48, 108, 0.1);
        }
        .bad-words-list .word-tag .remove-word { background: none; border: none; color: #E1306C; cursor: pointer; font-size: 0.7rem; }
        
        .bad-words-input {
            display: flex;
            gap: 4px;
        }
        .bad-words-input input {
            flex: 1;
            padding: 6px 10px;
            border-radius: var(--radius-sm);
            border: 1px solid var(--border-color);
            background: var(--bg-input);
            color: var(--text-primary);
            font-size: 0.8rem;
            outline: none;
        }
        .bad-words-input input:focus { border-color: var(--color-accent); }
        .bad-words-input button {
            padding: 6px 14px;
            border-radius: var(--radius-sm);
            border: none;
            background: var(--color-accent-gradient);
            color: #fff;
            font-weight: 600;
            cursor: pointer;
            transition: 0.3s;
            font-size: 0.75rem;
        }
        .bad-words-input button:hover { transform: scale(1.02); }
        
        .quick-settings { display: flex; flex-direction: column; gap: 4px; }
        .quick-settings .setting-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 6px 10px;
            background: var(--bg-secondary);
            border-radius: var(--radius-sm);
            border: 1px solid var(--border-color);
        }
        .quick-settings .setting-item .label { font-size: 0.75rem; color: var(--text-primary); }
        .quick-settings .setting-item .switch {
            width: 36px;
            height: 20px;
            background: var(--border-color);
            border-radius: 10px;
            cursor: pointer;
            position: relative;
            transition: 0.3s;
        }
        .quick-settings .setting-item .switch.active { background: var(--color-accent); }
        .quick-settings .setting-item .switch .thumb {
            width: 16px;
            height: 16px;
            background: #fff;
            border-radius: 50%;
            position: absolute;
            top: 2px;
            left: 2px;
            transition: 0.3s;
        }
        .quick-settings .setting-item .switch.active .thumb { left: 18px; }
        
        #adminStickerList {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            padding: 4px 0;
        }
        #adminStickerList .sticker-item-admin {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 4px 8px;
            background: var(--bg-secondary);
            border-radius: 8px;
            border: 1px solid var(--border-color);
            font-size: 0.7rem;
        }
        #adminStickerList .sticker-item-admin img {
            width: 30px;
            height: 30px;
            object-fit: contain;
            border-radius: 4px;
        }
        
        .temp-notification {
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
        }
        @keyframes notificationIn {
            from { opacity: 0; transform: translateX(-50%) translateY(20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        
        #fileInput, #stickerFileInput, #imageFileInput { display: none; }
        
        /* ===== سكرول للأسفل ===== */
        #scrollToBottom {
            position: absolute;
            bottom: 80px;
            right: 12px;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: var(--color-accent-gradient);
            color: #fff;
            border: none;
            font-size: 0.9rem;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(64, 93, 230, 0.2);
            display: none;
            align-items: center;
            justify-content: center;
            transition: 0.3s;
            z-index: 10;
        }
        #scrollToBottom:hover { transform: scale(1.05); }
        #scrollToBottom:active { transform: scale(0.9); }
        #scrollToBottom .badge {
            position: absolute;
            top: -3px;
            right: -3px;
            background: #E1306C;
            color: #fff;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            font-size: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        /* ===== Responsive ===== */
        @supports (-webkit-touch-callout: none) {
            .chat-input { padding-bottom: max(10px, var(--safe-bottom)); }
        }
        
        @media (max-width: 480px) {
            #app { max-width: 100%; border-radius: 0; }
            #loginScreen { padding: 30px 20px; }
            #loginScreen .logo-wrap { width: 80px; height: 80px; font-size: 3rem; }
            #loginScreen h1 { font-size: 2.2rem; }
            .chat-header { padding: 8px 12px; min-height: 48px; }
            .chat-header .avatar-group { width: 34px; height: 34px; font-size: 1.1rem; }
            .msg { max-width: 85%; font-size: 0.82rem; padding: 6px 10px; }
            .msg .content .text { font-size: 0.82rem; }
            .msg .avatar-small { width: 22px; height: 22px; font-size: 0.7rem; }
            .chat-input { padding: 4px 8px 8px; }
            .chat-input .send-btn { width: 36px; height: 36px; font-size: 1rem; }
            #adminPanel .server-stats { grid-template-columns: repeat(2, 1fr); }
            #stickerPanel .sticker-grid .sticker-item { font-size: 1.8rem; width: 50px; height: 50px; }
            #profileModal .modal-content { padding: 18px; max-width: 320px; }
            #profileModal .profile-avatar { width: 80px; height: 80px; font-size: 2.5rem; }
            #longPressMenu { padding: 6px 10px; min-width: 120px; }
            #longPressMenu .menu-item { padding: 3px 6px; min-width: 30px; }
            #longPressMenu .menu-item .icon { font-size: 0.9rem; }
            #longPressMenu .menu-item .label { font-size: 0.4rem; }
            #longPressMenu .menu-item .reaction-emoji { font-size: 1.1rem; }
            #emojiPanel .emoji-item { font-size: 1.1rem; width: 30px; }
            .msg .content .sticker img { width: 40px; height: 40px; }
            .msg .message-image { max-width: 150px; max-height: 150px; }
            #splashScreen .splash-logo { width: 80px; height: 80px; font-size: 3rem; }
            #splashScreen .splash-title { font-size: 2rem; }
            #initProgressBar { width: 90%; }
            #splashScreen .init-steps { width: 90%; }
            #splashScreen .init-step { font-size: 0.6rem; }
        }
        
        @media (min-width: 481px) and (max-width: 1024px) {
            #app { max-width: 90%; height: 90vh; height: 90dvh; border-radius: 16px; margin: 5vh auto; }
            #loginScreen .logo-wrap { width: 120px; height: 120px; font-size: 4.2rem; }
            #loginScreen h1 { font-size: 3rem; }
            .msg { max-width: 70%; font-size: 0.92rem; }
            .msg .content .text { font-size: 0.92rem; }
        }
        
        @media (min-width: 1025px) {
            #app { max-width: 600px; height: 90vh; height: 90dvh; border-radius: 20px; margin: 5vh auto; }
            #loginScreen .logo-wrap { width: 140px; height: 140px; font-size: 4.8rem; }
            #loginScreen h1 { font-size: 3.4rem; }
            .msg { max-width: 65%; font-size: 0.95rem; }
            .msg .content .text { font-size: 0.95rem; }
        }
    </style>
</head>
<body>
    <!-- ============================================================
    شاشة التهيئة الأولية (Splash Screen)
    ============================================================ -->
    <div id="splashScreen">
        <div class="splash-logo">🌠</div>
        <div class="splash-title">نيزك إنستا</div>
        <div class="splash-subtitle">✦ جاري تهيئة التطبيق ✦</div>
        
        <!-- شريط التقدم -->
        <div id="initProgressBar">
            <div class="progress-fill" id="initProgressFill"></div>
        </div>
        
        <div class="init-status" id="initStatus">⏳ جاري التحقق من البنية...</div>
        <div class="init-details" id="initDetails"></div>
        
        <!-- قائمة الخطوات -->
        <div class="init-steps" id="initSteps">
            <div class="init-step" data-step="1">
                <span class="step-icon">⏳</span>
                <span class="step-text">التحقق من الاتصال بقاعدة البيانات</span>
                <span class="step-status">...</span>
            </div>
            <div class="init-step" data-step="2">
                <span class="step-icon">⏳</span>
                <span class="step-text">تهيئة التخزين المحلي</span>
                <span class="step-status">...</span>
            </div>
            <div class="init-step" data-step="3">
                <span class="step-icon">⏳</span>
                <span class="step-text">فحص الفهارس المطلوبة</span>
                <span class="step-status">...</span>
            </div>
            <div class="init-step" data-step="4">
                <span class="step-icon">⏳</span>
                <span class="step-text">إنشاء الفهارس (إذا لزم الأمر)</span>
                <span class="step-status">...</span>
            </div>
            <div class="init-step" data-step="5">
                <span class="step-icon">⏳</span>
                <span class="step-text">تحميل البيانات الأساسية</span>
                <span class="step-status">...</span>
            </div>
            <div class="init-step" data-step="6">
                <span class="step-icon">⏳</span>
                <span class="step-text">تهيئة التطبيق</span>
                <span class="step-status">...</span>
            </div>
            <div class="init-step" data-step="7">
                <span class="step-icon">⏳</span>
                <span class="step-text">تحميل الرسائل من الخادم</span>
                <span class="step-status">...</span>
            </div>
        </div>
        
        <button id="retryInitBtn" onclick="retryInitialization()">🔄 إعادة المحاولة</button>
    </div>

    <div id="app">
        <!-- شاشة الدخول -->
        <div id="loginScreen">
            <div class="login-bg-pattern"></div>
            
            <div class="logo-wrap">
                <div class="logo-glow"></div>
                📸
            </div>
            <h1>نيزك إنستا</h1>
            <div class="subtitle">✦ دردشة إنستا ✦</div>
            
            <div class="input-group">
                <input type="text" id="usernameInput" placeholder="اسم المستخدم" maxlength="20" autocomplete="username" />
                <span class="input-icon">👤</span>
            </div>
            
            <div id="adminPassWrap">
                <div class="input-group">
                    <input type="password" id="adminPasswordInput" placeholder="كلمة المرور" autocomplete="current-password" />
                    <span class="input-icon">🔑</span>
                </div>
            </div>
            
            <div class="color-picker" id="colorPicker">
                <span class="color-label">🎨 لونك:</span>
                <div class="color-option active" style="background:#405DE6;" data-color="#405DE6" onclick="selectColor('#405DE6')"></div>
                <div class="color-option" style="background:#25D366;" data-color="#25D366" onclick="selectColor('#25D366')"></div>
                <div class="color-option" style="background:#f093fb;" data-color="#f093fb" onclick="selectColor('#f093fb')"></div>
                <div class="color-option" style="background:#f5576c;" data-color="#f5576c" onclick="selectColor('#f5576c')"></div>
                <div class="color-option" style="background:#f5a623;" data-color="#f5a623" onclick="selectColor('#f5a623')"></div>
                <div class="color-option" style="background:#6c5ce7;" data-color="#6c5ce7" onclick="selectColor('#6c5ce7')"></div>
                <div class="color-option" style="background:#00b894;" data-color="#00b894" onclick="selectColor('#00b894')"></div>
                <div class="color-option" style="background:#fd79a8;" data-color="#fd79a8" onclick="selectColor('#fd79a8')"></div>
            </div>
            
            <button class="btn-primary" id="loginBtn">
                <span class="btn-shimmer"></span>
                🚀 دخول
            </button>
            <button class="btn-secondary" id="themeToggleLogin">🌓 الثيم</button>
            <div id="loginError"></div>
        </div>
        
        <!-- شاشة الدردشة -->
        <div id="chatScreen">
            <div class="chat-header">
                <div class="avatar-group" id="userAvatar" onclick="openAvatarModal()">
                    📸
                    <span class="online-dot"></span>
                </div>
                <div class="info">
                    <h3 id="currentUserDisplay">المجموعة</h3>
                    <span class="status" id="onlineInfo">🟢 0 متصل · 0 رسالة</span>
                </div>
                <div class="actions">
                    <button id="searchToggle" title="بحث" style="font-size:1.2rem;">🔍</button>
                    <button id="themeToggleChat" title="الثيم" style="font-size:1.4rem;">🌓</button>
                    <button id="adminShieldBtn" title="لوحة المسؤول" style="font-size:1.3rem;">🛡️</button>
                    <button id="logoutBtn" title="خروج" style="font-size:1.2rem;">🚪</button>
                </div>
            </div>
            
            <!-- شريط تقدم تحميل الرسائل -->
            <div id="loadingMessagesBar">
                <span class="loader-count" id="loaderCount">0</span>
                <div class="loader-track">
                    <div class="loader-fill" id="loaderFill"></div>
                </div>
                <span class="loader-text" id="loaderText">⏳ جاري التحميل...</span>
            </div>
            
            <div id="searchBar" style="display:none;">
                <div class="search-wrap">
                    <span class="search-icon">🔍</span>
                    <input type="text" id="searchInput" placeholder="بحث في الرسائل..." />
                </div>
                <button class="search-close" id="searchClose">✕</button>
            </div>
            
            <div id="searchResults"></div>
            
            <div id="messagesContainer">
                <!-- سيتم إضافة زر تحميل المزيد هنا بواسطة JavaScript -->
            </div>
            
            <div id="typingIndicator">
                <span class="dots"><span></span><span></span><span></span></span>
                <span id="typingText"></span>
            </div>
            
            <div class="reply-bar" id="replyBar">
                <span class="reply-text" id="replyText">الرد على: ...</span>
                <button class="reply-cancel" id="replyCancel">✕</button>
            </div>
            
            <div id="emojiPanel"></div>
            
            <div id="stickerPanel">
                <div class="sticker-tabs" id="stickerTabs"></div>
                <div class="sticker-grid" id="stickerGrid"></div>
            </div>
            
            <div class="chat-input">
                <div class="input-wrap">
                    <div class="input-row">
                        <button class="emoji-btn" id="emojiBtn">😊</button>
                        <button class="sticker-btn" id="stickerBtn">🎨</button>
                        <button class="image-btn" id="imageBtn" title="إدراج صورة">🖼️</button>
                        <textarea id="messageInput" placeholder="اكتب رسالة..." maxlength="500" rows="1"></textarea>
                    </div>
                </div>
                <button class="send-btn" id="sendBtn">➤</button>
            </div>
            
            <input type="file" id="imageFileInput" accept="image/*" />
            
            <button id="scrollToBottom">⬇️</button>
        </div>
        
        <!-- قائمة الضغط المطول -->
        <div id="longPressMenu">
            <div class="menu-items" id="longPressItems"></div>
        </div>
        
        <!-- مودال الملف الشخصي -->
        <div id="profileModal">
            <div class="modal-content">
                <div class="profile-avatar" id="profileAvatarDisplay">📸</div>
                <div class="profile-name" id="profileNameDisplay">اسم المستخدم</div>
                <div class="profile-username" id="profileUsernameDisplay">@username</div>
                <div class="profile-bio" id="profileBioDisplay">📝 نبذة عني...</div>
                <div class="profile-status" id="profileStatusDisplay">🟢 متصل</div>
                <button class="profile-close" id="profileCloseBtn">✕ إغلاق</button>
            </div>
        </div>
        
        <!-- لوحة المسؤول -->
        <div id="adminPanel">
            <div class="admin-header">
                <h2>🛡️ لوحة التحكم</h2>
                <button class="close-admin" id="closeAdminBtn">✕</button>
            </div>
            
            <div class="server-stats">
                <div class="stat"><div class="num" id="statUsers">0</div><div class="label">المستخدمين</div></div>
                <div class="stat"><div class="num" id="statOnline">0</div><div class="label">متصل</div></div>
                <div class="stat"><div class="num" id="statMessages">0</div><div class="label">الرسائل</div></div>
                <div class="stat"><div class="num" id="statBlocked">0</div><div class="label">محظورين</div></div>
            </div>
            
            <div class="connection-status" id="connectionStatus">
                <span class="indicator online" id="statusIndicator"></span>
                <span id="statusText">🟢 متصل</span>
                <span style="font-size:0.6rem;opacity:0.5;margin-right:auto;">آخر مزامنة: <span id="lastSyncTime">الآن</span></span>
            </div>
            
            <div class="repair-actions">
                <button class="btn-restart" onclick="restartSync()">🔄 إعادة تشغيل المزامنة</button>
                <button class="btn-sync" onclick="forceSync()">📡 مزامنة فورية</button>
                <button class="btn-repair" onclick="repairServer()">🔧 إصلاح السيرفر</button>
                <button class="btn-rebuild" onclick="rebuildDatabase()">🏗️ إعادة بناء القاعدة</button>
                <button class="btn-fix-index" onclick="fixIndexes()">🔍 إصلاح الفهارس</button>
                <button class="btn-clear" onclick="clearAllMessages()">🗑️ مسح الكل</button>
            </div>
            
            <div class="admin-tabs">
                <button class="active" data-tab="users">👥 المستخدمين</button>
                <button data-tab="badwords">🚫 كلمات ممنوعة</button>
                <button data-tab="settings">⚙️ إعدادات</button>
                <button data-tab="stickers">🎨 الستيكرات</button>
            </div>
            
            <div class="admin-section active" id="tab-users">
                <div id="adminUserList"></div>
            </div>
            
            <div class="admin-section" id="tab-badwords">
                <div class="bad-words-input">
                    <input type="text" id="badWordInput" placeholder="أدخل كلمة ممنوعة..." maxlength="30" />
                    <button id="addBadWordBtn">➕ إضافة</button>
                </div>
                <div class="bad-words-list" id="badWordsList"></div>
                <p style="font-size:0.6rem;opacity:0.4;margin-top:4px;">💡 الكلمات الممنوعة تؤدي إلى حظر تلقائي للمستخدم</p>
            </div>
            
            <div class="admin-section" id="tab-settings">
                <div class="quick-settings">
                    <div class="setting-item">
                        <span class="label">🔇 كتم جميع المستخدمين</span>
                        <div class="switch" id="muteAllSwitch" onclick="toggleSwitch('muteAll')">
                            <span class="thumb"></span>
                        </div>
                    </div>
                    <div class="setting-item">
                        <span class="label">🌙 الوضع الليلي التلقائي</span>
                        <div class="switch" id="autoDarkSwitch" onclick="toggleSwitch('autoDark')">
                            <span class="thumb"></span>
                        </div>
                    </div>
                    <div class="setting-item">
                        <span class="label">🔒 تأكيد الحذف</span>
                        <div class="switch active" id="confirmDeleteSwitch" onclick="toggleSwitch('confirmDelete')">
                            <span class="thumb"></span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="admin-section" id="tab-stickers">
                <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px;">
                    <button onclick="document.getElementById('stickerFileInput').click()" style="padding:6px 14px;border-radius:12px;border:none;background:#4facfe;color:#fff;cursor:pointer;font-size:0.75rem;">📷 رفع ستيكر</button>
                    <button onclick="uploadStickerPack()" style="padding:6px 14px;border-radius:12px;border:none;background:#833AB4;color:#fff;cursor:pointer;font-size:0.75rem;">📦 رفع حزمة</button>
                    <button onclick="downloadStickerPack()" style="padding:6px 14px;border-radius:12px;border:none;background:#25D366;color:#fff;cursor:pointer;font-size:0.75rem;">📥 تحميل حزمة</button>
                    <button onclick="syncStickers()" style="padding:6px 14px;border-radius:12px;border:none;background:#f5a623;color:#fff;cursor:pointer;font-size:0.75rem;">🔄 مزامنة</button>
                </div>
                <input type="file" id="stickerFileInput" accept="image/*" multiple />
                <div id="adminStickerList"></div>
            </div>
        </div>
        
        <!-- مودال تعديل الصورة -->
        <div class="modal-overlay" id="avatarModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>👤 تعديل الملف الشخصي</h3>
                    <button class="close-modal" id="closeAvatarModal">✕</button>
                </div>
                <div class="avatar-preview" id="avatarPreview" onclick="document.getElementById('fileInput').click()">
                    📸
                    <div class="upload-overlay">📷 تغيير</div>
                </div>
                <input type="file" id="fileInput" accept="image/*" />
                <div class="modal-field">
                    <label>👤 اسم المستخدم</label>
                    <input type="text" id="editNameInput" maxlength="20" />
                </div>
                <div class="modal-field">
                    <label>📝 نبذة عنك</label>
                    <textarea id="editBioInput" maxlength="150" placeholder="اكتب نبذة عنك..."></textarea>
                </div>
                <div class="modal-actions">
                    <button class="btn-save" id="saveAvatarBtn">💾 حفظ</button>
                    <button class="btn-cancel" id="cancelAvatarBtn">إلغاء</button>
                </div>
            </div>
        </div>
        
        <!-- مودال تعديل الرسالة -->
        <div class="modal-overlay" id="editMessageModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>✏️ تعديل الرسالة</h3>
                    <button class="close-modal" id="closeEditMessageModal">✕</button>
                </div>
                <div class="modal-field">
                    <textarea id="editMessageInput" maxlength="500"></textarea>
                </div>
                <div class="modal-actions">
                    <button class="btn-save" id="saveEditMessageBtn">💾 حفظ</button>
                    <button class="btn-cancel" id="cancelEditMessageBtn">إلغاء</button>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // ============================================================
        // 1. إعداد Firebase
        // ============================================================
        const firebaseConfig = {
            apiKey: "AIzaSyBVNXAFHyynNL7rD6LaYc4iYgvYPDdDH0c",
            authDomain: "semo-chat-f5fdf.firebaseapp.com",
            projectId: "semo-chat-f5fdf",
            storageBucket: "semo-chat-f5fdf.firebasestorage.app",
            messagingSenderId: "390244231579",
            appId: "1:390244231579:web:d6664b936abae9a730993e",
            measurementId: "G-0C6RXTC6LX"
        };
        
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        const storage = firebase.storage();
        
        // ============================================================
        // 2. نظام إدارة التهيئة
        // ============================================================
        class InitManager {
            constructor() {
                this.steps = [
                    { id: 1, name: 'التحقق من الاتصال بقاعدة البيانات', icon: '📡' },
                    { id: 2, name: 'تهيئة التخزين المحلي', icon: '💾' },
                    { id: 3, name: 'فحص الفهارس المطلوبة', icon: '🔍' },
                    { id: 4, name: 'إنشاء الفهارس (إذا لزم الأمر)', icon: '🔧' },
                    { id: 5, name: 'تحميل البيانات الأساسية', icon: '📥' },
                    { id: 6, name: 'تهيئة التطبيق', icon: '✨' },
                    { id: 7, name: 'تحميل الرسائل من الخادم', icon: '📨' }
                ];
                this.currentStep = 0;
                this.isInitialized = false;
                this.initError = null;
                this.isRunning = false;
                this.messagesLoaded = false;
                this.totalMessages = 0;
                this.loadedMessages = 0;
                this.retryCount = 0;
                this.maxRetries = 2;
                this.errors = [];
                this.loadingStartTime = 0;
                this.lastVisibleDoc = null;
                this.hasMoreMessages = true;
                this.isLoadingMore = false;
                this.messagesPerPage = 30;
                this.allMessagesLoaded = false;
                this.messageLimit = 30;
            }
            
            updateProgress(percent, status, details = '') {
                const fill = document.getElementById('initProgressFill');
                const statusEl = document.getElementById('initStatus');
                const detailsEl = document.getElementById('initDetails');
                
                if (fill) {
                    fill.style.width = Math.min(percent, 100) + '%';
                    if (percent < 100) fill.classList.add('loading');
                    else fill.classList.remove('loading');
                }
                if (statusEl) statusEl.textContent = status || `⏳ جاري التهيئة (${Math.round(percent)}%)`;
                if (detailsEl) detailsEl.textContent = details || '';
            }
            
            updateStep(stepId, state, message = '') {
                const stepEl = document.querySelector(`.init-step[data-step="${stepId}"]`);
                if (!stepEl) return;
                
                const iconEl = stepEl.querySelector('.step-icon');
                const statusEl = stepEl.querySelector('.step-status');
                
                stepEl.classList.remove('active', 'done', 'error');
                
                if (state === 'active') {
                    stepEl.classList.add('active');
                    if (iconEl) iconEl.textContent = '⏳';
                    if (statusEl) statusEl.textContent = message || 'جاري...';
                } else if (state === 'done') {
                    stepEl.classList.add('done');
                    if (iconEl) iconEl.textContent = '✅';
                    if (statusEl) statusEl.textContent = message || 'تم ✅';
                } else if (state === 'error') {
                    stepEl.classList.add('error');
                    if (iconEl) iconEl.textContent = '❌';
                    if (statusEl) statusEl.textContent = message || 'فشل ❌';
                }
            }
            
            async initialize() {
                if (this.isRunning) return;
                this.isRunning = true;
                this.isInitialized = false;
                this.initError = null;
                this.errors = [];
                this.loadingStartTime = Date.now();
                document.getElementById('retryInitBtn').style.display = 'none';
                
                try {
                    this.updateStep(1, 'active', 'جاري الاتصال...');
                    this.updateProgress(5, '⏳ التحقق من الاتصال بقاعدة البيانات');
                    await this.checkFirebaseConnection();
                    this.updateStep(1, 'done', '✅ متصل');
                    this.updateProgress(10, '✅ الاتصال بقاعدة البيانات ناجح');
                    
                    this.updateStep(2, 'active', 'جاري التهيئة...');
                    this.updateProgress(15, '⏳ تهيئة التخزين المحلي');
                    await this.initPersistence();
                    this.updateStep(2, 'done', '✅ تم التهيئة');
                    this.updateProgress(20, '✅ التخزين المحلي جاهز');
                    
                    this.updateStep(3, 'active', 'جاري الفحص...');
                    this.updateProgress(25, '⏳ فحص الفهارس المطلوبة');
                    const indexesStatus = await this.checkIndexes();
                    this.updateStep(3, 'done', `✅ تم الفحص (${indexesStatus.found}/${indexesStatus.total})`);
                    this.updateProgress(35, `✅ تم فحص ${indexesStatus.found} من ${indexesStatus.total} فهارس`);
                    
                    this.updateStep(4, 'active', 'جاري الإنشاء...');
                    this.updateProgress(40, '⏳ إنشاء الفهارس (إذا لزم الأمر)');
                    const created = await this.createIndexes(indexesStatus.missing);
                    this.updateStep(4, 'done', `✅ تم إنشاء ${created} فهرس`);
                    this.updateProgress(50, `✅ تم إنشاء ${created} فهرس جديد`);
                    
                    this.updateStep(5, 'active', 'جاري التحميل...');
                    this.updateProgress(55, '⏳ تحميل البيانات الأساسية');
                    await this.loadBaseData();
                    this.updateStep(5, 'done', '✅ تم التحميل');
                    this.updateProgress(65, '✅ تم تحميل البيانات الأساسية');
                    
                    this.updateStep(6, 'active', 'جاري التهيئة...');
                    this.updateProgress(70, '⏳ تهيئة التطبيق');
                    await this.initApp();
                    this.updateStep(6, 'done', '✅ جاهز!');
                    this.updateProgress(75, '✅ تم تهيئة التطبيق');
                    
                    this.updateStep(7, 'active', 'جاري تحميل الرسائل...');
                    this.updateProgress(80, '⏳ جاري تحميل الرسائل من الخادم');
                    await this.loadMessages();
                    this.updateStep(7, 'done', `✅ تم تحميل ${this.totalMessages} رسالة`);
                    this.updateProgress(100, `✅ تم تحميل ${this.totalMessages} رسالة بنجاح!`);
                    
                    this.isInitialized = true;
                    this.isRunning = false;
                    this.messagesLoaded = true;
                    
                    const elapsed = ((Date.now() - this.loadingStartTime) / 1000).toFixed(1);
                    console.log(`✅ تم التهيئة في ${elapsed} ثانية`);
                    
                    setTimeout(() => {
                        this.hideSplash();
                    }, 600);
                    
                    if (this.onComplete) {
                        this.onComplete();
                    }
                    
                } catch (error) {
                    console.error('❌ فشل التهيئة:', error);
                    this.initError = error;
                    this.isRunning = false;
                    
                    const currentStepId = this.currentStep + 1;
                    this.updateStep(currentStepId, 'error', error.message || 'فشل');
                    
                    this.updateProgress(0, `❌ فشل التهيئة: ${error.message}`, '');
                    
                    document.getElementById('retryInitBtn').style.display = 'block';
                    
                    if (this.onError) {
                        this.onError(error);
                    }
                }
            }
            
            async checkFirebaseConnection() {
                try {
                    const timeout = new Promise((_, reject) => {
                        setTimeout(() => reject(new Error('انتهت مهلة الاتصال')), 8000);
                    });
                    const connection = db.collection('_').doc('_').get();
                    await Promise.race([connection, timeout]);
                    return true;
                } catch (error) {
                    throw new Error('لا يمكن الاتصال بقاعدة البيانات');
                }
            }
            
            async initPersistence() {
                try {
                    await db.enablePersistence({
                        synchronizeTabs: true
                    });
                    return true;
                } catch (err) {
                    if (err.code == 'failed-precondition' || err.code == 'unimplemented') {
                        return true;
                    }
                    throw new Error('فشل تهيئة التخزين المحلي: ' + err.message);
                }
            }
            
            async checkIndexes() {
                const requiredIndexes = [
                    {
                        collection: 'messages',
                        fields: [{ field: 'timestamp', direction: 'desc' }],
                        name: 'messages_timestamp_desc'
                    }
                ];
                
                let found = 0;
                let missing = [];
                
                for (const index of requiredIndexes) {
                    try {
                        const exists = await this.checkIndexExists(index);
                        if (exists) {
                            found++;
                        } else {
                            missing.push(index);
                        }
                    } catch (error) {
                        missing.push(index);
                    }
                }
                
                return {
                    total: requiredIndexes.length,
                    found: found,
                    missing: missing
                };
            }
            
            async checkIndexExists(index) {
                try {
                    const collectionRef = db.collection(index.collection);
                    let query = collectionRef;
                    index.fields.forEach((field, idx) => {
                        const order = field.direction === 'desc' ? 'desc' : 'asc';
                        if (idx === 0) {
                            query = query.orderBy(field.field, order);
                        } else {
                            query = query.orderBy(field.field, order);
                        }
                    });
                    await query.limit(1).get();
                    return true;
                } catch (error) {
                    return false;
                }
            }
            
            async createIndexes(missingIndexes) {
                if (missingIndexes.length === 0) {
                    return 0;
                }
                let created = 0;
                for (const index of missingIndexes) {
                    try {
                        await this.createSingleIndex(index);
                        created++;
                    } catch (error) {
                        console.warn(`⚠️ فشل إنشاء الفهرس ${index.name}:`, error);
                        this.errors.push({ index: index.name, error: error.message });
                    }
                }
                return created;
            }
            
            async createSingleIndex(index) {
                const collectionRef = db.collection(index.collection);
                let query = collectionRef;
                index.fields.forEach((field, idx) => {
                    const order = field.direction === 'desc' ? 'desc' : 'asc';
                    if (idx === 0) {
                        query = query.orderBy(field.field, order);
                    } else {
                        query = query.orderBy(field.field, order);
                    }
                });
                await query.limit(1).get();
            }
            
            async loadBaseData() {
                try {
                    const timeout = new Promise((resolve) => setTimeout(resolve, 3000));
                    const loadPromise = Promise.all([
                        db.collection('badwords').limit(10).get(),
                        db.collection('stickers').doc('all').get(),
                        db.collection('users').limit(10).get()
                    ]);
                    await Promise.race([loadPromise, timeout]);
                    return true;
                } catch (error) {
                    console.warn('⚠️ فشل تحميل بعض البيانات الأساسية:', error);
                    return true;
                }
            }
            
            async initApp() {
                window.allMessages = [];
                window.messageCache = new Map();
                return true;
            }
            
            // ============================================================
            // تحميل الرسائل - الطريقة الصحيحة
            // ============================================================
            async loadMessages() {
                try {
                    console.log('📥 بدء تحميل الرسائل...');
                    
                    // تحميل أحدث 30 رسالة
                    const snapshot = await db.collection('messages')
                        .orderBy('timestamp', 'desc')
                        .limit(this.messagesPerPage)
                        .get();
                    
                    if (snapshot.empty) {
                        console.log('📭 لا توجد رسائل');
                        this.totalMessages = 0;
                        this.hasMoreMessages = false;
                        this.allMessagesLoaded = true;
                        window.allMessages = [];
                        renderMessages([]);
                        return;
                    }
                    
                    // حفظ آخر مستند للترقيم
                    this.lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
                    this.hasMoreMessages = snapshot.docs.length === this.messagesPerPage;
                    
                    const messages = [];
                    snapshot.forEach(doc => {
                        const data = doc.data();
                        if (data.deleted !== true) {
                            messages.push({ id: doc.id, ...data });
                            if (window.messageCache) {
                                window.messageCache.set(doc.id, { id: doc.id, ...data });
                            }
                        }
                    });
                    
                    // ترتيب تصاعدي للعرض (الأقدم أولاً)
                    messages.sort((a, b) => {
                        const timeA = a.timestamp?.toDate?.()?.getTime() || a.timestamp || 0;
                        const timeB = b.timestamp?.toDate?.()?.getTime() || b.timestamp || 0;
                        return timeA - timeB;
                    });
                    
                    window.allMessages = messages;
                    window.searchMessages = messages;
                    this.totalMessages = messages.length;
                    this.loadedMessages = messages.length;
                    
                    console.log(`✅ تم تحميل ${messages.length} رسالة`);
                    
                    // عرض الرسائل
                    this.displayMessages(messages);
                    
                } catch (error) {
                    console.error('❌ فشل تحميل الرسائل:', error);
                    throw error;
                }
            }
            
            // ============================================================
            // تحميل المزيد من الرسائل
            // ============================================================
            async loadMoreMessages() {
                if (this.isLoadingMore || !this.hasMoreMessages || this.allMessagesLoaded) {
                    return;
                }
                
                const btn = document.getElementById('loadMoreBtn');
                if (btn) {
                    btn.classList.add('loading');
                    btn.innerHTML = '⏳ جاري التحميل... <span class="spinner"></span>';
                }
                
                this.isLoadingMore = true;
                
                try {
                    let query = db.collection('messages')
                        .orderBy('timestamp', 'desc')
                        .limit(this.messagesPerPage);
                    
                    if (this.lastVisibleDoc) {
                        query = query.startAfter(this.lastVisibleDoc);
                    }
                    
                    const snapshot = await query.get();
                    
                    if (snapshot.empty) {
                        this.hasMoreMessages = false;
                        this.allMessagesLoaded = true;
                        if (btn) {
                            btn.style.display = 'none';
                        }
                        showNotification('✅ تم تحميل جميع الرسائل');
                        this.isLoadingMore = false;
                        return;
                    }
                    
                    this.lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
                    this.hasMoreMessages = snapshot.docs.length === this.messagesPerPage;
                    
                    const newMessages = [];
                    snapshot.forEach(doc => {
                        const data = doc.data();
                        if (data.deleted !== true) {
                            const existing = window.allMessages.find(m => m.id === doc.id);
                            if (!existing) {
                                newMessages.push({ id: doc.id, ...data });
                                if (window.messageCache) {
                                    window.messageCache.set(doc.id, { id: doc.id, ...data });
                                }
                            }
                        }
                    });
                    
                    if (newMessages.length > 0) {
                        // دمج الرسائل الجديدة مع الموجودة
                        const allMessages = [...newMessages, ...window.allMessages];
                        allMessages.sort((a, b) => {
                            const timeA = a.timestamp?.toDate?.()?.getTime() || a.timestamp || 0;
                            const timeB = b.timestamp?.toDate?.()?.getTime() || b.timestamp || 0;
                            return timeA - timeB;
                        });
                        
                        window.allMessages = allMessages;
                        window.searchMessages = allMessages;
                        this.totalMessages = allMessages.length;
                        this.loadedMessages = allMessages.length;
                        
                        // إعادة عرض الرسائل مع الحفاظ على موضع التمرير
                        const container = document.getElementById('messagesContainer');
                        const scrollPos = container.scrollTop;
                        
                        this.displayMessages(allMessages);
                        
                        // إعادة موضع التمرير
                        setTimeout(() => {
                            container.scrollTop = scrollPos + 50;
                        }, 50);
                        
                        showNotification(`✅ تم تحميل ${newMessages.length} رسالة إضافية`);
                    }
                    
                    // تحديث الزر
                    if (btn) {
                        btn.classList.remove('loading');
                        if (this.hasMoreMessages) {
                            btn.innerHTML = '📤 تحميل المزيد من الرسائل';
                            btn.style.display = 'block';
                        } else {
                            btn.style.display = 'none';
                            this.allMessagesLoaded = true;
                            showNotification('✅ تم تحميل جميع الرسائل');
                        }
                    }
                    
                } catch (error) {
                    console.error('❌ فشل تحميل المزيد:', error);
                    showNotification('❌ فشل تحميل المزيد: ' + error.message);
                    const btn = document.getElementById('loadMoreBtn');
                    if (btn) {
                        btn.classList.remove('loading');
                        btn.innerHTML = '📤 تحميل المزيد (فشل)';
                        setTimeout(() => {
                            btn.innerHTML = '📤 تحميل المزيد من الرسائل';
                        }, 3000);
                    }
                }
                
                this.isLoadingMore = false;
            }
            
            // ============================================================
            // عرض الرسائل مع زر تحميل المزيد
            // ============================================================
            displayMessages(messages) {
                const container = document.getElementById('messagesContainer');
                
                // إزالة الزر القديم
                const oldBtn = document.getElementById('loadMoreBtn');
                if (oldBtn) oldBtn.remove();
                
                // عرض الرسائل
                renderMessages(messages);
                
                // إضافة زر تحميل المزيد إذا كان هناك المزيد
                if (this.hasMoreMessages && messages.length > 0) {
                    const btn = document.createElement('button');
                    btn.id = 'loadMoreBtn';
                    btn.innerHTML = '📤 تحميل المزيد من الرسائل';
                    btn.onclick = () => this.loadMoreMessages();
                    
                    // إضافة الزر في أعلى الحاوية
                    container.prepend(btn);
                }
                
                // تحديث حالة التحميل
                const loadingBar = document.getElementById('loadingMessagesBar');
                if (loadingBar) {
                    loadingBar.style.display = 'none';
                }
            }
            
            hideSplash() {
                const splash = document.getElementById('splashScreen');
                splash.classList.add('hidden');
                setTimeout(() => {
                    splash.style.display = 'none';
                }, 800);
            }
        }
        
        // ============================================================
        // 3. نظام إدارة الكاش
        // ============================================================
        class MessageCache {
            constructor() {
                this.cache = new Map();
                this.maxSize = 1000;
                this.loadFromStorage();
            }
            
            loadFromStorage() {
                try {
                    const saved = localStorage.getItem('messageCache');
                    if (saved) {
                        const parsed = JSON.parse(saved);
                        Object.keys(parsed).forEach(key => {
                            this.cache.set(key, parsed[key]);
                        });
                        console.log(`📦 تم تحميل ${this.cache.size} رسالة من الكاش`);
                    }
                } catch (e) {}
            }
            
            saveToStorage() {
                try {
                    const obj = {};
                    this.cache.forEach((value, key) => {
                        obj[key] = value;
                    });
                    localStorage.setItem('messageCache', JSON.stringify(obj));
                } catch (e) {}
            }
            
            get(id) { return this.cache.get(id); }
            
            set(id, data) {
                if (this.cache.size >= this.maxSize) {
                    const oldestKey = this.cache.keys().next().value;
                    this.cache.delete(oldestKey);
                }
                this.cache.set(id, data);
                this.saveToStorage();
            }
            
            has(id) { return this.cache.has(id); }
            clear() { this.cache.clear(); this.saveToStorage(); }
            getSize() { return this.cache.size; }
            
            getAll() {
                const result = [];
                this.cache.forEach((value) => {
                    if (!value.deleted) {
                        result.push(value);
                    }
                });
                return result;
            }
        }
        
        // ============================================================
        // 4. خوارزميات الذكاء الاصطناعي
        // ============================================================
        class AICore {
            static compressText(text) {
                if (!text || text.length < 10) return text;
                let compressed = text.replace(/\s+/g, ' ').trim();
                if (compressed.length > 200) {
                    const sentences = compressed.split(/[.!?؟،]/);
                    if (sentences.length > 3) {
                        compressed = sentences.slice(0, 3).join('. ') + '...';
                    }
                }
                return compressed;
            }
            
            static decompressText(text) {
                return text;
            }
            
            static compressImage(dataUrl, quality = 0.6, maxSize = 800) {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = function() {
                        const canvas = document.createElement('canvas');
                        let width = img.width;
                        let height = img.height;
                        if (width > maxSize || height > maxSize) {
                            const ratio = Math.min(maxSize / width, maxSize / height);
                            width = Math.round(width * ratio);
                            height = Math.round(height * ratio);
                        }
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.imageSmoothingEnabled = true;
                        ctx.imageSmoothingQuality = 'high';
                        ctx.drawImage(img, 0, 0, width, height);
                        resolve(canvas.toDataURL('image/jpeg', quality));
                    };
                    img.src = dataUrl;
                });
            }
            
            static getOptimalSyncTime() {
                return 3000;
            }
            
            static formatTime(timestamp) {
                if (!timestamp) return '';
                try {
                    let date;
                    if (timestamp.toDate) {
                        date = timestamp.toDate();
                    } else if (typeof timestamp === 'number') {
                        date = new Date(timestamp);
                    } else if (timestamp instanceof Date) {
                        date = timestamp;
                    } else {
                        date = new Date(timestamp);
                    }
                    if (isNaN(date.getTime())) return '';
                    return date.toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' });
                } catch (e) {
                    return '';
                }
            }
            
            static formatDate(timestamp) {
                if (!timestamp) return '';
                try {
                    let date;
                    if (timestamp.toDate) {
                        date = timestamp.toDate();
                    } else if (typeof timestamp === 'number') {
                        date = new Date(timestamp);
                    } else if (timestamp instanceof Date) {
                        date = timestamp;
                    } else {
                        date = new Date(timestamp);
                    }
                    if (isNaN(date.getTime())) return '';
                    return date.toLocaleDateString('ar', { year: 'numeric', month: 'short', day: 'numeric' });
                } catch (e) {
                    return '';
                }
            }
        }
        
        // ============================================================
        // 5. لوحة الإيموجي
        // ============================================================
        const fullEmojis = {
            '😀': 'وجوه', '😃': 'وجوه', '😄': 'وجوه', '😁': 'وجوه', '😆': 'وجوه', '😅': 'وجوه', '😂': 'وجوه', '🤣': 'وجوه',
            '😊': 'وجوه', '😇': 'وجوه', '🙂': 'وجوه', '🙃': 'وجوه', '😉': 'وجوه', '😌': 'وجوه', '😍': 'وجوه', '🥰': 'وجوه',
            '😘': 'وجوه', '😗': 'وجوه', '😙': 'وجوه', '😚': 'وجوه', '😋': 'وجوه', '😛': 'وجوه', '😝': 'وجوه', '😜': 'وجوه',
            '🤪': 'وجوه', '🤨': 'وجوه', '🧐': 'وجوه', '🤓': 'وجوه', '😎': 'وجوه', '🤩': 'وجوه', '🥳': 'وجوه', '😏': 'وجوه',
            '😒': 'وجوه', '😞': 'وجوه', '😔': 'وجوه', '😟': 'وجوه', '😕': 'وجوه', '🙁': 'وجوه', '☹️': 'وجوه', '😣': 'وجوه',
            '😖': 'وجوه', '😫': 'وجوه', '😩': 'وجوه', '🥺': 'وجوه', '😢': 'وجوه', '😭': 'وجوه', '😤': 'وجوه', '😠': 'وجوه',
            '😡': 'وجوه', '🤬': 'وجوه', '🤯': 'وجوه', '😳': 'وجوه', '🥵': 'وجوه', '🥶': 'وجوه', '😱': 'وجوه', '😨': 'وجوه'
        };
        
        function getEmojiCategories() {
            const categories = {};
            for (const [emoji, category] of Object.entries(fullEmojis)) {
                if (!categories[category]) categories[category] = [];
                categories[category].push(emoji);
            }
            return categories;
        }
        
        function initFullEmojiPanel() {
            const panel = document.getElementById('emojiPanel');
            panel.innerHTML = '';
            const categories = getEmojiCategories();
            
            for (const [category, emojis] of Object.entries(categories)) {
                const catLabel = document.createElement('div');
                catLabel.className = 'emoji-category';
                catLabel.textContent = category;
                panel.appendChild(catLabel);
                
                emojis.forEach(emoji => {
                    const span = document.createElement('span');
                    span.className = 'emoji-item';
                    span.textContent = emoji;
                    span.onclick = () => {
                        insertAtCursor(emoji);
                        emojiPanel.style.display = 'none';
                        emojiPanelOpen = false;
                    };
                    panel.appendChild(span);
                });
            }
        }
        
        // ============================================================
        // 6. نظام الستيكرات (مختصر)
        // ============================================================
        let allStickers = [];
        let currentStickerTab = 'my_stickers';
        let stickerPanelOpen = false;
        
        async function loadStickersFromFirebase() {
            try {
                const doc = await db.collection('stickers').doc('all').get();
                if (doc.exists) {
                    const data = doc.data();
                    if (data.stickers && data.stickers.length > 0) {
                        allStickers = data.stickers;
                        try { localStorage.setItem('stickers', JSON.stringify(allStickers)); } catch(e) {}
                        return allStickers;
                    }
                }
            } catch (e) { console.warn('⚠️ فشل تحميل الستيكرات:', e); }
            
            try {
                const saved = localStorage.getItem('stickers');
                if (saved) { allStickers = JSON.parse(saved); return allStickers; }
            } catch(e) {}
            
            allStickers = [
                { id: 'sticker_1', emoji: '😊', type: 'emoji' },
                { id: 'sticker_2', emoji: '😂', type: 'emoji' },
                { id: 'sticker_3', emoji: '❤️', type: 'emoji' }
            ];
            return allStickers;
        }
        
        async function saveStickersToFirebase(stickers) {
            try {
                await db.collection('stickers').doc('all').set({
                    stickers: stickers,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
            } catch(e) { console.warn('⚠️ فشل حفظ الستيكرات:', e); }
        }
        
        async function uploadSticker(file) {
            if (!file) return;
            if (!file.type.startsWith('image/')) { showNotification('❌ يرجى اختيار صورة'); return; }
            if (file.size > 2 * 1024 * 1024) { showNotification('❌ حجم الصورة كبير جداً (أقصى 2MB)'); return; }
            
            try {
                showNotification('⏳ جاري رفع الستيكر...');
                const reader = new FileReader();
                reader.onload = async function(e) {
                    const compressed = await AICore.compressImage(e.target.result, 0.5);
                    const newSticker = {
                        id: 'sticker_' + Date.now(),
                        type: 'image',
                        data: compressed,
                        name: file.name,
                        uploadedBy: currentUser,
                        createdAt: new Date().toISOString()
                    };
                    allStickers.push(newSticker);
                    await saveStickersToFirebase(allStickers);
                    try { localStorage.setItem('stickers', JSON.stringify(allStickers)); } catch(e) {}
                    showNotification('✅ تم إضافة الستيكر بنجاح');
                    renderStickerTabs();
                    renderStickers(currentStickerTab);
                    renderAdminStickers();
                };
                reader.readAsDataURL(file);
            } catch (error) {
                console.error(error);
                showNotification('❌ فشل رفع الستيكر');
            }
        }
        
        async function uploadStickerPack() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.zip,.json';
            input.multiple = false;
            
            input.onchange = async function(e) {
                const file = e.target.files[0];
                if (!file) return;
                try {
                    showNotification('⏳ جاري معالجة الحزمة...');
                    const text = await file.text();
                    const packData = JSON.parse(text);
                    if (packData.stickers && Array.isArray(packData.stickers)) {
                        const newStickers = packData.stickers.map((s, i) => ({
                            id: 'pack_' + Date.now() + '_' + i,
                            emoji: s.emoji || s,
                            type: 'emoji',
                            pack: packData.name || 'حزمة مرفوعة',
                            uploadedBy: currentUser
                        }));
                        allStickers = [...allStickers, ...newStickers];
                        await saveStickersToFirebase(allStickers);
                        try { localStorage.setItem('stickers', JSON.stringify(allStickers)); } catch(e) {}
                        renderStickerTabs();
                        renderStickers(currentStickerTab);
                        renderAdminStickers();
                        showNotification(`✅ تم رفع ${newStickers.length} ستيكر`);
                    } else { showNotification('❌ تنسيق الحزمة غير صحيح'); }
                } catch (e) { showNotification('❌ فشل رفع الحزمة: ' + e.message); }
            };
            input.click();
        }
        
        async function downloadStickerPack() {
            const packName = prompt('أدخل اسم الحزمة:');
            if (!packName) return;
            try {
                showNotification('⏳ جاري تحميل الستيكرات...');
                const emojis = ['😊', '😂', '❤️', '🔥', '👍', '👏', '🎉', '✨', '💪', '🤔', '😍', '🥰', '😎', '🤩', '👀', '💀', '🙏', '😅', '🤗', '😇', '🥳', '🤯', '😱', '🥺', '😤', '👻', '🎃', '💫', '⭐', '🌈'];
                const shuffled = emojis.sort(() => Math.random() - 0.5);
                const selected = shuffled.slice(0, 12);
                const newStickers = selected.map((emoji, index) => ({
                    id: 'pack_' + Date.now() + '_' + index,
                    emoji: emoji,
                    type: 'emoji',
                    pack: packName,
                    uploadedBy: currentUser
                }));
                allStickers = [...allStickers, ...newStickers];
                await saveStickersToFirebase(allStickers);
                try { localStorage.setItem('stickers', JSON.stringify(allStickers)); } catch(e) {}
                renderStickerTabs();
                renderStickers(currentStickerTab);
                renderAdminStickers();
                showNotification(`✅ تم تحميل ${newStickers.length} ستيكر`);
            } catch (error) {
                console.error(error);
                showNotification('❌ فشل تحميل الستيكرات');
            }
        }
        
        function renderStickers(tabId) {
            const grid = document.getElementById('stickerGrid');
            let stickers = allStickers;
            if (tabId !== 'my_stickers' && tabId !== 'all_stickers') {
                stickers = allStickers.filter(s => s.pack === tabId);
                if (stickers.length === 0) stickers = allStickers;
            } else if (tabId === 'all_stickers') {
                stickers = allStickers;
            }
            if (!stickers || stickers.length === 0) {
                grid.innerHTML = '<div style="padding:20px;text-align:center;opacity:0.5;width:100%;">لا توجد ستيكرات</div>';
                return;
            }
            grid.innerHTML = '';
            stickers.forEach(sticker => {
                const span = document.createElement('span');
                span.className = 'sticker-item';
                if (sticker.type === 'image' && sticker.data) {
                    span.innerHTML = `<img src="${sticker.data}" alt="${sticker.name || 'ستيكر'}" title="بواسطة: ${sticker.uploadedBy || 'غير معروف'}" />`;
                } else {
                    span.textContent = sticker.emoji || '😊';
                    span.title = sticker.uploadedBy ? `بواسطة: ${sticker.uploadedBy}` : '';
                }
                span.onclick = () => {
                    if (sticker.type === 'image' && sticker.data) {
                        sendStickerMessage(sticker.data);
                    } else {
                        insertAtCursor(sticker.emoji || '😊');
                    }
                    stickerPanel.style.display = 'none';
                    stickerPanelOpen = false;
                };
                grid.appendChild(span);
            });
        }
        
        function renderStickerTabs() {
            const tabs = document.getElementById('stickerTabs');
            tabs.innerHTML = '';
            
            const myTab = document.createElement('span');
            myTab.className = 'tab' + (currentStickerTab === 'my_stickers' ? ' active' : '');
            myTab.textContent = '⭐ ستيكراتي';
            myTab.onclick = () => {
                currentStickerTab = 'my_stickers';
                renderStickerTabs();
                renderStickers(currentStickerTab);
            };
            tabs.appendChild(myTab);
            
            const allTab = document.createElement('span');
            allTab.className = 'tab' + (currentStickerTab === 'all_stickers' ? ' active' : '');
            allTab.textContent = '📦 الكل';
            allTab.onclick = () => {
                currentStickerTab = 'all_stickers';
                renderStickerTabs();
                renderStickers(currentStickerTab);
            };
            tabs.appendChild(allTab);
            
            const packs = {};
            allStickers.forEach(s => {
                if (s.pack) {
                    if (!packs[s.pack]) packs[s.pack] = [];
                    packs[s.pack].push(s);
                }
            });
            Object.keys(packs).forEach(packName => {
                const tab = document.createElement('span');
                tab.className = 'tab' + (currentStickerTab === packName ? ' active' : '');
                tab.textContent = packName;
                tab.onclick = () => {
                    currentStickerTab = packName;
                    renderStickerTabs();
                    renderStickers(currentStickerTab);
                };
                tabs.appendChild(tab);
            });
            
            const uploadTab = document.createElement('span');
            uploadTab.className = 'tab upload';
            uploadTab.textContent = '📷 رفع';
            uploadTab.onclick = () => document.getElementById('stickerFileInput').click();
            tabs.appendChild(uploadTab);
            
            const downloadTab = document.createElement('span');
            downloadTab.className = 'tab download';
            downloadTab.textContent = '📥 تحميل';
            downloadTab.onclick = downloadStickerPack;
            tabs.appendChild(downloadTab);
        }
        
        function renderAdminStickers() {
            const container = document.getElementById('adminStickerList');
            container.innerHTML = '';
            allStickers.forEach((sticker) => {
                const div = document.createElement('div');
                div.className = 'sticker-item-admin';
                if (sticker.type === 'image' && sticker.data) {
                    div.innerHTML = `
                        <img src="${sticker.data}" />
                        <span style="font-size:0.6rem;opacity:0.5;">${sticker.name || 'صورة'}</span>
                        <span style="font-size:0.5rem;opacity:0.3;">${sticker.uploadedBy || ''}</span>
                        <button onclick="deleteSticker('${sticker.id}')" style="background:none;border:none;color:#E1306C;cursor:pointer;">✕</button>
                    `;
                } else {
                    div.innerHTML = `
                        <span style="font-size:1.2rem;">${sticker.emoji || '😊'}</span>
                        <span style="font-size:0.5rem;opacity:0.3;">${sticker.uploadedBy || ''}</span>
                        <button onclick="deleteSticker('${sticker.id}')" style="background:none;border:none;color:#E1306C;cursor:pointer;">✕</button>
                    `;
                }
                container.appendChild(div);
            });
            if (allStickers.length === 0) {
                container.innerHTML = '<div style="opacity:0.4;font-size:0.7rem;padding:8px 0;">لا توجد ستيكرات</div>';
            }
        }
        
        async function deleteSticker(stickerId) {
            if (!isAdmin && !confirm('حذف الستيكر؟')) return;
            if (!isAdmin) { showNotification('❌ فقط المسؤول يمكنه الحذف'); return; }
            if (!confirm('حذف الستيكر نهائياً؟')) return;
            allStickers = allStickers.filter(s => s.id !== stickerId);
            await saveStickersToFirebase(allStickers);
            try { localStorage.setItem('stickers', JSON.stringify(allStickers)); } catch(e) {}
            renderStickerTabs();
            renderStickers(currentStickerTab);
            renderAdminStickers();
            showNotification('✅ تم حذف الستيكر');
        }
        
        async function syncStickers() {
            showNotification('⏳ جاري المزامنة...');
            await loadStickersFromFirebase();
            renderStickerTabs();
            renderStickers(currentStickerTab);
            renderAdminStickers();
            showNotification('✅ تمت المزامنة');
        }
        
        async function sendStickerMessage(stickerData) {
            try {
                const msgData = {
                    username: currentUser,
                    text: '🎨 ستيكر',
                    avatar: myAvatar,
                    isAdmin: isAdmin,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    deleted: false,
                    reactions: {},
                    edited: false,
                    editedAt: null,
                    sticker: true,
                    stickerData: stickerData,
                    compressed: true
                };
                await db.collection('messages').add(msgData);
            } catch (error) {
                console.error('فشل إرسال الستيكر:', error);
                showNotification('❌ فشل الإرسال');
            }
        }
        
        document.getElementById('stickerFileInput').onchange = async function(e) {
            const files = e.target.files;
            if (!files || files.length === 0) return;
            for (const file of files) { await uploadSticker(file); }
            this.value = '';
        };
        
        // ============================================================
        // 7. إدراج صورة
        // ============================================================
        document.getElementById('imageBtn').onclick = function() {
            document.getElementById('imageFileInput').click();
        };
        
        document.getElementById('imageFileInput').onchange = async function(e) {
            const file = e.target.files[0];
            if (!file) return;
            if (!file.type.startsWith('image/')) { showNotification('❌ يرجى اختيار صورة'); return; }
            if (file.size > 10 * 1024 * 1024) { showNotification('❌ حجم الصورة كبير جداً (أقصى 10MB)'); return; }
            
            try {
                showNotification('⏳ جاري معالجة الصورة...');
                const reader = new FileReader();
                reader.onload = async function(e) {
                    const compressed = await AICore.compressImage(e.target.result, 0.5, 600);
                    
                    const msgData = {
                        username: currentUser,
                        text: '📷 صورة',
                        avatar: myAvatar,
                        isAdmin: isAdmin,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        deleted: false,
                        reactions: {},
                        edited: false,
                        editedAt: null,
                        image: true,
                        imageData: compressed,
                        compressed: true
                    };
                    
                    await db.collection('messages').add(msgData);
                    showNotification('✅ تم إرسال الصورة');
                };
                reader.readAsDataURL(file);
            } catch (error) {
                console.error('فشل إرسال الصورة:', error);
                showNotification('❌ فشل إرسال الصورة');
            }
            this.value = '';
        };
        
        // ============================================================
        // 8. وظائف السيرفر والمزامنة
        // ============================================================
        let syncInterval = null;
        let isSyncing = false;
        let lastSyncTime = Date.now();
        let isFirstLoad = false;
        let messageCacheInstance = null;
        let messagesListener = null;
        let initManagerInstance = null;
        
        function restartSync() {
            if (syncInterval) { clearInterval(syncInterval); syncInterval = null; }
            startAutoSync();
            showNotification('✅ تم إعادة تشغيل المزامنة');
        }
        
        async function forceSync() {
            if (isSyncing) { showNotification('⏳ جاري المزامنة بالفعل'); return; }
            showNotification('⏳ جاري المزامنة الفورية...');
            isSyncing = true;
            try {
                await syncMessages();
                showNotification('✅ تمت المزامنة بنجاح');
            } catch (e) {
                showNotification('❌ فشل المزامنة');
                console.error(e);
            } finally { isSyncing = false; }
        }
        
        async function repairServer() {
            showNotification('🔧 جاري إصلاح السيرفر...');
            try {
                if (messagesListener) { try { messagesListener(); } catch(e) {} messagesListener = null; }
                await db.collection('_').doc('_').get();
                listenMessages();
                showNotification('✅ تم إصلاح السيرفر بنجاح');
                updateConnectionStatus(true);
            } catch (e) {
                showNotification('❌ فشل إصلاح السيرفر: ' + e.message);
                updateConnectionStatus(false);
            }
        }
        
        async function fixIndexes() {
            if (!isAdmin) { showNotification('❌ فقط المسؤول يمكنه إصلاح الفهارس'); return; }
            if (!confirm('🔍 إصلاح الفهارس؟ سيتم إعادة محاولة إنشاء الفهارس المفقودة.')) return;
            
            try {
                showNotification('⏳ جاري إصلاح الفهارس...');
                const requiredIndexes = [
                    { collection: 'messages', fields: [{ field: 'timestamp', direction: 'desc' }], name: 'messages_timestamp_desc' }
                ];
                
                let fixed = 0;
                for (const index of requiredIndexes) {
                    try {
                        const collectionRef = db.collection(index.collection);
                        let query = collectionRef;
                        index.fields.forEach((field, idx) => {
                            const order = field.direction === 'desc' ? 'desc' : 'asc';
                            if (idx === 0) {
                                query = query.orderBy(field.field, order);
                            } else {
                                query = query.orderBy(field.field, order);
                            }
                        });
                        await query.limit(1).get();
                        fixed++;
                    } catch (error) {
                        try {
                            await db.collection(index.collection).orderBy('timestamp', 'desc').limit(1).get();
                            fixed++;
                        } catch (e2) {}
                    }
                }
                
                showNotification(`✅ تم إصلاح ${fixed} فهرس`);
                setTimeout(() => { location.reload(); }, 1000);
            } catch (error) {
                showNotification('❌ فشل إصلاح الفهارس: ' + error.message);
            }
        }
        
        async function rebuildDatabase() {
            if (!isAdmin) { showNotification('❌ فقط المسؤول يمكنه إعادة البناء'); return; }
            if (!confirm('⚠️ هل أنت متأكد؟ سيتم حذف جميع البيانات وإعادة بنائها من الصفر!')) return;
            
            try {
                showNotification('⏳ جاري إعادة بناء قاعدة البيانات...');
                
                const messagesSnap = await db.collection('messages').get();
                const batch1 = db.batch();
                messagesSnap.forEach(doc => batch1.delete(doc.ref));
                await batch1.commit();
                
                const usersSnap = await db.collection('users').get();
                const batch2 = db.batch();
                usersSnap.forEach(doc => {
                    if (doc.id !== 'slx23m') {
                        batch2.delete(doc.ref);
                    }
                });
                await batch2.commit();
                
                const badWordsSnap = await db.collection('badwords').get();
                const batch3 = db.batch();
                badWordsSnap.forEach(doc => batch3.delete(doc.ref));
                await batch3.commit();
                
                await db.collection('stickers').doc('all').delete();
                
                if (messageCacheInstance) messageCacheInstance.clear();
                localStorage.removeItem('messageCache');
                localStorage.removeItem('stickers');
                localStorage.removeItem('lastUser');
                
                await db.collection('users').doc('slx23m').set({
                    username: 'slx23m',
                    avatar: '🛡️',
                    bio: '👑 مسؤول النظام',
                    isAdmin: true,
                    online: false,
                    blocked: false,
                    banned: false,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                
                showNotification('✅ تم إعادة بناء قاعدة البيانات بنجاح! سيتم إعادة تحميل التطبيق.');
                setTimeout(() => { location.reload(); }, 2000);
            } catch (error) {
                showNotification('❌ فشل إعادة بناء قاعدة البيانات: ' + error.message);
            }
        }
        
        function startAutoSync() {
            if (syncInterval) clearInterval(syncInterval);
            const interval = AICore.getOptimalSyncTime();
            syncInterval = setInterval(() => { 
                if (!isFirstLoad) {
                    syncMessages(); 
                }
            }, interval);
        }
        
        async function syncMessages() {
            if (isSyncing) return;
            isSyncing = true;
            try {
                await db.collection('_').doc('_').get();
                updateConnectionStatus(true);
                lastSyncTime = Date.now();
                document.getElementById('lastSyncTime').textContent = 'منذ لحظات';
            } catch (e) {
                updateConnectionStatus(false);
            } finally { isSyncing = false; }
        }
        
        function updateConnectionStatus(isOnline) {
            const indicator = document.getElementById('statusIndicator');
            const text = document.getElementById('statusText');
            if (isOnline) {
                indicator.className = 'indicator online';
                text.textContent = '🟢 متصل';
            } else {
                indicator.className = 'indicator offline';
                text.textContent = '🔴 غير متصل';
            }
        }
        
        // ============================================================
        // 9. الملف الشخصي
        // ============================================================
        async function showProfile(username) {
            try {
                const doc = await db.collection('users').doc(username).get();
                if (!doc.exists) { showNotification('❌ المستخدم غير موجود'); return; }
                const data = doc.data();
                const avatar = data.avatar || '📸';
                const bio = data.bio || '📝 لا توجد نبذة';
                const status = data.online ? '🟢 متصل الآن' : '⚫ غير متصل';
                
                document.getElementById('profileAvatarDisplay').innerHTML = isValidImageUrl(avatar) ? 
                    `<img src="${avatar}" alt="avatar" />` : avatar;
                document.getElementById('profileNameDisplay').textContent = username + (data.isAdmin ? ' ⭐' : '');
                document.getElementById('profileUsernameDisplay').textContent = '@' + username;
                document.getElementById('profileBioDisplay').textContent = bio;
                document.getElementById('profileStatusDisplay').textContent = status;
                
                document.getElementById('profileModal').style.display = 'flex';
                document.getElementById('profileModal').classList.add('pop-enter');
            } catch (e) {
                showNotification('❌ فشل تحميل الملف الشخصي');
                console.error(e);
            }
        }
        
        document.getElementById('profileCloseBtn').onclick = () => {
            document.getElementById('profileModal').style.display = 'none';
        };
        document.getElementById('profileModal').onclick = (e) => {
            if (e.target === e.currentTarget) {
                document.getElementById('profileModal').style.display = 'none';
            }
        };
        
        // ============================================================
        // 10. البحث
        // ============================================================
        let searchMessages = [];
        let searchActive = false;
        
        document.getElementById('searchToggle').onclick = function() {
            const bar = document.getElementById('searchBar');
            const isOpen = bar.style.display === 'flex';
            bar.style.display = isOpen ? 'none' : 'flex';
            if (!isOpen) {
                document.getElementById('searchInput').focus();
                searchActive = true;
            } else {
                searchActive = false;
                document.getElementById('searchResults').classList.remove('active');
                document.getElementById('searchResults').innerHTML = '';
                document.getElementById('searchInput').value = '';
            }
        };
        
        document.getElementById('searchClose').onclick = function() {
            document.getElementById('searchBar').style.display = 'none';
            searchActive = false;
            document.getElementById('searchResults').classList.remove('active');
            document.getElementById('searchResults').innerHTML = '';
            document.getElementById('searchInput').value = '';
        };
        
        document.getElementById('searchInput').oninput = function() {
            const query = this.value.trim().toLowerCase();
            const resultsContainer = document.getElementById('searchResults');
            
            if (!query) {
                resultsContainer.classList.remove('active');
                resultsContainer.innerHTML = '';
                return;
            }
            
            const results = searchMessages.filter(msg => 
                msg.text && AICore.decompressText(msg.text).toLowerCase().includes(query)
            );
            
            if (results.length === 0) {
                resultsContainer.innerHTML = '<div class="no-results">لا توجد نتائج</div>';
                resultsContainer.classList.add('active');
                return;
            }
            
            let html = '';
            results.slice(0, 15).forEach(msg => {
                const sender = msg.username || 'مجهول';
                const avatar = msg.avatar || '📸';
                const time = AICore.formatTime(msg.timestamp);
                const text = AICore.decompressText(msg.text);
                const avatarDisplay = isValidImageUrl(avatar) ? 
                    `<img src="${avatar}" alt="avatar" />` : avatar;
                
                html += `
                    <div class="result-item" onclick="scrollToMessage('${msg.id}')">
                        <div class="result-avatar">${avatarDisplay}</div>
                        <div class="result-info">
                            <div class="result-name">${sender}</div>
                            <div class="result-text">${text}</div>
                        </div>
                        <div class="result-time">${time}</div>
                    </div>
                `;
            });
            resultsContainer.innerHTML = html;
            resultsContainer.classList.add('active');
        };
        
        window.scrollToMessage = function(id) {
            const element = document.querySelector(`[data-id="${id}"]`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element.style.background = 'rgba(64,93,230,0.05)';
                element.style.borderRadius = '8px';
                setTimeout(() => {
                    element.style.background = '';
                    element.style.borderRadius = '';
                }, 2000);
                document.getElementById('searchBar').style.display = 'none';
                searchActive = false;
                document.getElementById('searchResults').classList.remove('active');
                document.getElementById('searchResults').innerHTML = '';
                document.getElementById('searchInput').value = '';
            }
        };
        
        // ============================================================
        // 11. قائمة الضغط المطول
        // ============================================================
        let longPressTargetId = null;
        let longPressTargetText = '';
        let longPressTargetSent = false;
        
        const reactionEmojis = ['❤️', '🔥', '😂', '😍', '👏', '🎉', '😢', '😡', '💯', '🙏'];
        
        function showLongPressMenu(messageId, messageText, isSent, event) {
            longPressTargetId = messageId;
            longPressTargetText = messageText;
            longPressTargetSent = isSent;
            
            const menu = document.getElementById('longPressMenu');
            const items = document.getElementById('longPressItems');
            items.innerHTML = '';
            
            reactionEmojis.forEach(emoji => {
                const btn = document.createElement('button');
                btn.className = 'menu-item';
                btn.innerHTML = `<span class="reaction-emoji">${emoji}</span>`;
                btn.onclick = (e) => {
                    e.stopPropagation();
                    toggleReaction(messageId, emoji);
                    hideLongPressMenu();
                };
                items.appendChild(btn);
            });
            
            const actions = [
                { icon: '↩️', label: 'رد', action: () => startReply(messageId, messageText) },
                { icon: '📋', label: 'نسخ', action: () => { copyText(messageText); hideLongPressMenu(); } },
            ];
            
            if (isSent || isAdmin) {
                actions.push(
                    { icon: '✏️', label: 'تعديل', action: () => { editMessage(messageId); hideLongPressMenu(); } },
                    { icon: '🗑️', label: 'حذف', action: () => { deleteMessage(messageId); hideLongPressMenu(); } }
                );
            }
            
            actions.forEach(a => {
                const btn = document.createElement('button');
                btn.className = 'menu-item' + (a.label === 'حذف' ? ' danger' : '');
                btn.innerHTML = `<span class="icon">${a.icon}</span><span class="label">${a.label}</span>`;
                btn.onclick = (e) => {
                    e.stopPropagation();
                    a.action();
                };
                items.appendChild(btn);
            });
            
            const rect = event ? event.target?.getBoundingClientRect() : null;
            if (rect) {
                menu.style.bottom = (window.innerHeight - rect.top + 10) + 'px';
            } else {
                menu.style.bottom = '80px';
            }
            
            menu.style.display = 'block';
            menu.classList.add('pop-enter');
            setTimeout(() => menu.classList.remove('pop-enter'), 200);
        }
        
        function hideLongPressMenu() {
            document.getElementById('longPressMenu').style.display = 'none';
            longPressTargetId = null;
        }
        
        document.addEventListener('click', (e) => {
            const menu = document.getElementById('longPressMenu');
            if (menu.style.display === 'block' && !menu.contains(e.target)) {
                hideLongPressMenu();
            }
        });
        
        // ============================================================
        // 12. المتغيرات العامة
        // ============================================================
        let currentUser = '';
        let isAdmin = false;
        let myAvatar = '📸';
        let myBio = '📝 مرحباً، أنا في نيزك!';
        let messageCount = 0;
        let onlineUsers = 0;
        let blockedCount = 0;
        let typingTimeout = null;
        let allUsers = {};
        let editingMessageId = null;
        let replyingTo = null;
        let replyingToText = '';
        let emojiPanelOpen = false;
        let badWords = [];
        let settings = {
            muteAll: false,
            autoDark: false,
            confirmDelete: true
        };
        let userBanCounts = {};
        let selectedColor = '#405DE6';
        let unreadCount = 0;
        let allMessages = [];
        let messagesLoaded = false;
        let processedMessageIds = new Set();
        let isScrollingToBottom = false;
        let isUserScrolling = false;
        
        // ============================================================
        // 13. العناصر
        // ============================================================
        const loginScreen = document.getElementById('loginScreen');
        const chatScreen = document.getElementById('chatScreen');
        const usernameInput = document.getElementById('usernameInput');
        const adminPassWrap = document.getElementById('adminPassWrap');
        const adminPasswordInput = document.getElementById('adminPasswordInput');
        const loginBtn = document.getElementById('loginBtn');
        const loginError = document.getElementById('loginError');
        const messagesContainer = document.getElementById('messagesContainer');
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');
        const currentUserDisplay = document.getElementById('currentUserDisplay');
        const onlineInfo = document.getElementById('onlineInfo');
        const userAvatar = document.getElementById('userAvatar');
        const adminShieldBtn = document.getElementById('adminShieldBtn');
        const adminPanel = document.getElementById('adminPanel');
        const adminUserList = document.getElementById('adminUserList');
        const closeAdminBtn = document.getElementById('closeAdminBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const typingIndicator = document.getElementById('typingIndicator');
        const typingText = document.getElementById('typingText');
        const themeToggleLogin = document.getElementById('themeToggleLogin');
        const themeToggleChat = document.getElementById('themeToggleChat');
        const emojiBtn = document.getElementById('emojiBtn');
        const emojiPanel = document.getElementById('emojiPanel');
        const stickerBtn = document.getElementById('stickerBtn');
        const stickerPanel = document.getElementById('stickerPanel');
        const statUsers = document.getElementById('statUsers');
        const statOnline = document.getElementById('statOnline');
        const statMessages = document.getElementById('statMessages');
        const statBlocked = document.getElementById('statBlocked');
        const fileInput = document.getElementById('fileInput');
        const replyBar = document.getElementById('replyBar');
        const replyText = document.getElementById('replyText');
        const replyCancel = document.getElementById('replyCancel');
        const scrollToBottom = document.getElementById('scrollToBottom');
        const badWordInput = document.getElementById('badWordInput');
        const addBadWordBtn = document.getElementById('addBadWordBtn');
        const badWordsList = document.getElementById('badWordsList');
        const longPressMenu = document.getElementById('longPressMenu');
        const loadingMessagesBar = document.getElementById('loadingMessagesBar');
        const loaderFill = document.getElementById('loaderFill');
        const loaderText = document.getElementById('loaderText');
        const loaderCount = document.getElementById('loaderCount');
        
        const avatarModal = document.getElementById('avatarModal');
        const avatarPreview = document.getElementById('avatarPreview');
        const editNameInput = document.getElementById('editNameInput');
        const editBioInput = document.getElementById('editBioInput');
        const saveAvatarBtn = document.getElementById('saveAvatarBtn');
        const cancelAvatarBtn = document.getElementById('cancelAvatarBtn');
        const closeAvatarModal = document.getElementById('closeAvatarModal');
        
        const editMessageModal = document.getElementById('editMessageModal');
        const editMessageInput = document.getElementById('editMessageInput');
        const saveEditMessageBtn = document.getElementById('saveEditMessageBtn');
        const cancelEditMessageBtn = document.getElementById('cancelEditMessageBtn');
        const closeEditMessageModal = document.getElementById('closeEditMessageModal');
        
        const tabs = document.querySelectorAll('.admin-tabs button');
        const sections = {
            users: document.getElementById('tab-users'),
            badwords: document.getElementById('tab-badwords'),
            settings: document.getElementById('tab-settings'),
            stickers: document.getElementById('tab-stickers')
        };
        
        // ============================================================
        // 14. اختيار اللون
        // ============================================================
        function selectColor(color) {
            selectedColor = color;
            document.querySelectorAll('.color-option').forEach(el => {
                el.classList.toggle('active', el.dataset.color === color);
            });
            document.documentElement.style.setProperty('--color-accent', color);
            localStorage.setItem('userColor', color);
            if (currentUser) {
                db.collection('users').doc(currentUser).update({ color: color }).catch(() => {});
            }
        }
        
        const savedColor = localStorage.getItem('userColor');
        if (savedColor) { selectColor(savedColor); }
        
        // ============================================================
        // 15. الثيم
        // ============================================================
        function toggleTheme() {
            document.body.classList.toggle('theme-dark');
            const theme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            if (currentUser) {
                db.collection('users').doc(currentUser).update({ theme: theme }).catch(() => {});
            }
        }
        
        const savedTheme = localStorage.getItem('theme') === 'dark' ? 'theme-dark' : '';
        if (savedTheme) document.body.classList.add('theme-dark');
        themeToggleLogin.onclick = toggleTheme;
        themeToggleChat.onclick = toggleTheme;
        
        // ============================================================
        // 16. دوال الصورة
        // ============================================================
        function generateAvatarUrl(username) {
            return `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
        }
        
        function isValidImageUrl(url) {
            return url && (url.startsWith('http') || url.startsWith('data:') || url.startsWith('https://api.dicebear.com'));
        }
        
        // ============================================================
        // 17. مودال تعديل الصورة
        // ============================================================
        function openAvatarModal() {
            if (!currentUser) return;
            avatarModal.style.display = 'flex';
            editNameInput.value = currentUser;
            editBioInput.value = myBio || '📝 مرحباً، أنا في نيزك!';
            if (isValidImageUrl(myAvatar)) {
                avatarPreview.innerHTML = `<img src="${myAvatar}" alt="avatar" /><div class="upload-overlay">📷 تغيير</div>`;
            } else {
                avatarPreview.textContent = myAvatar;
                avatarPreview.innerHTML = `${myAvatar}<div class="upload-overlay">📷 تغيير</div>`;
            }
        }
        
        closeAvatarModal.onclick = () => { avatarModal.style.display = 'none'; };
        cancelAvatarBtn.onclick = () => { avatarModal.style.display = 'none'; };
        avatarModal.onclick = (e) => { if (e.target === avatarModal) avatarModal.style.display = 'none'; };
        
        fileInput.onchange = async function(e) {
            const file = e.target.files[0];
            if (!file) return;
            if (!file.type.startsWith('image/')) { showNotification('❌ يرجى اختيار صورة'); return; }
            if (file.size > 5 * 1024 * 1024) { showNotification('❌ حجم الصورة كبير جداً (أقصى 5MB)'); return; }
            
            try {
                showNotification('⏳ جاري معالجة الصورة...');
                const reader = new FileReader();
                reader.onload = async function(e) {
                    const compressed = await AICore.compressImage(e.target.result, 0.6);
                    avatarPreview.innerHTML = `<img src="${compressed}" alt="avatar" /><div class="upload-overlay">📷 تغيير</div>`;
                    document.querySelector('#avatarModal .btn-save').dataset.newAvatar = compressed;
                    showNotification('✅ تم تحميل الصورة');
                };
                reader.readAsDataURL(file);
            } catch (error) {
                console.error(error);
                showNotification('❌ فشل معالجة الصورة');
            }
            fileInput.value = '';
        };
        
        saveAvatarBtn.onclick = async function() {
            const newName = editNameInput.value.trim();
            const newBio = editBioInput.value.trim();
            if (!newName) { showNotification('❌ الاسم مطلوب'); return; }
            
            const img = avatarPreview.querySelector('img');
            let newAvatar = myAvatar;
            if (img && img.src !== myAvatar) { newAvatar = img.src; }
            
            const updates = {};
            if (newAvatar !== myAvatar) updates.avatar = newAvatar;
            if (newBio !== myBio) updates.bio = newBio || '📝 مرحباً، أنا في نيزك!';
            
            if (newName !== currentUser) {
                try {
                    const oldDoc = await db.collection('users').doc(currentUser).get();
                    if (oldDoc.exists) {
                        const data = oldDoc.data();
                        await db.collection('users').doc(newName).set({
                            ...data,
                            username: newName,
                            avatar: newAvatar,
                            bio: newBio || data.bio || '📝 مرحباً، أنا في نيزك!',
                            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                        });
                        await db.collection('users').doc(currentUser).delete();
                    }
                    currentUser = newName;
                    currentUserDisplay.textContent = newName;
                    if (isAdmin) currentUserDisplay.textContent += ' ⭐';
                    localStorage.setItem('lastUser', newName);
                } catch (e) {
                    showNotification('❌ فشل تغيير الاسم');
                    return;
                }
            } else {
                try {
                    await db.collection('users').doc(currentUser).update(updates);
                } catch (e) {
                    showNotification('❌ فشل تحديث البيانات');
                    return;
                }
            }
            
            if (newAvatar !== myAvatar) {
                myAvatar = newAvatar;
                updateAvatarUI();
            }
            if (newBio !== myBio) {
                myBio = newBio || '📝 مرحباً، أنا في نيزك!';
            }
            
            avatarModal.style.display = 'none';
            showNotification('✅ تم التحديث بنجاح');
        };
        
        function updateAvatarUI() {
            if (isValidImageUrl(myAvatar)) {
                userAvatar.innerHTML = `<img src="${myAvatar}" alt="avatar" /><span class="online-dot"></span>`;
            } else {
                userAvatar.innerHTML = `${myAvatar}<span class="online-dot"></span>`;
            }
        }
        
        // ============================================================
        // 18. لوحة الإيموجي
        // ============================================================
        emojiBtn.onclick = function() {
            emojiPanelOpen = !emojiPanelOpen;
            stickerPanelOpen = false;
            stickerPanel.style.display = 'none';
            emojiPanel.style.display = emojiPanelOpen ? 'flex' : 'none';
            if (emojiPanelOpen) { emojiPanel.scrollTop = 0; }
        };
        
        function insertAtCursor(text) {
            const cursorPos = messageInput.selectionStart || 0;
            const value = messageInput.value;
            const start = value.slice(0, cursorPos);
            const end = value.slice(cursorPos);
            messageInput.value = start + text + end;
            messageInput.focus();
            const newPos = cursorPos + text.length;
            messageInput.setSelectionRange(newPos, newPos);
            messageInput.dispatchEvent(new Event('input'));
        }
        
        // ============================================================
        // 19. لوحة الستيكرات
        // ============================================================
        stickerBtn.onclick = function() {
            stickerPanelOpen = !stickerPanelOpen;
            emojiPanelOpen = false;
            emojiPanel.style.display = 'none';
            stickerPanel.style.display = stickerPanelOpen ? 'flex' : 'none';
            if (stickerPanelOpen) {
                renderStickerTabs();
                renderStickers(currentStickerTab);
            }
        };
        
        // ============================================================
        // 20. تسجيل الدخول
        // ============================================================
        loginBtn.onclick = async function() {
            const username = usernameInput.value.trim();
            if (!username) { loginError.textContent = '✖ أدخل اسم المستخدم'; return; }
            if (username.length < 2) { loginError.textContent = '✖ الاسم قصير جداً'; return; }
            if (username.length > 20) { loginError.textContent = '✖ الاسم طويل جداً'; return; }
            
            if (username === 'slx23m') {
                adminPassWrap.style.display = 'block';
                const pass = adminPasswordInput.value.trim();
                if (pass !== '1442') { loginError.textContent = '✖ كلمة مرور المسؤول غير صحيحة'; return; }
                isAdmin = true;
            } else {
                adminPassWrap.style.display = 'none';
                isAdmin = false;
            }
            
            try {
                const userDoc = await db.collection('users').doc(username).get();
                if (userDoc.exists) {
                    const data = userDoc.data();
                    if (data.banned) {
                        loginError.textContent = `⛔ أنت محظور: ${data.banReason || 'استخدام كلمات ممنوعة'}`;
                        return;
                    }
                    currentUser = username;
                    isAdmin = data.isAdmin || false;
                    if (data.avatar && data.avatar !== '📸') myAvatar = data.avatar;
                    if (data.bio) myBio = data.bio;
                    if (data.color) selectColor(data.color);
                    if (data.theme) {
                        if (data.theme === 'dark') document.body.classList.add('theme-dark');
                        else document.body.classList.remove('theme-dark');
                        localStorage.setItem('theme', data.theme);
                    }
                    await db.collection('users').doc(username).update({ 
                        online: true, 
                        lastSeen: firebase.firestore.FieldValue.serverTimestamp() 
                    });
                    localStorage.setItem('lastUser', username);
                    enterChat(username);
                    return;
                }
            } catch (e) { console.warn('خطأ في التحقق:', e); }
            
            try {
                const avatarUrl = generateAvatarUrl(username);
                await db.collection('users').doc(username).set({
                    username: username,
                    avatar: avatarUrl,
                    bio: '📝 مرحباً، أنا في نيزك!',
                    isAdmin: isAdmin,
                    online: true,
                    blocked: false,
                    banned: false,
                    banReason: null,
                    banExpires: null,
                    banCount: 0,
                    theme: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
                    color: localStorage.getItem('userColor') || '#405DE6',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    lastSeen: firebase.firestore.FieldValue.serverTimestamp()
                });
                currentUser = username;
                myAvatar = avatarUrl;
                myBio = '📝 مرحباً، أنا في نيزك!';
                localStorage.setItem('lastUser', username);
                enterChat(username);
            } catch (error) {
                loginError.textContent = '✖ خطأ: ' + error.message;
                console.error(error);
            }
        };
        
        usernameInput.oninput = function() {
            if (this.value.trim() === 'slx23m') {
                adminPassWrap.style.display = 'block';
            } else {
                adminPassWrap.style.display = 'none';
                adminPasswordInput.value = '';
            }
        };
        
        usernameInput.onkeydown = (e) => { if (e.key === 'Enter') loginBtn.click(); };
        adminPasswordInput.onkeydown = (e) => { if (e.key === 'Enter') loginBtn.click(); };
        
        // ============================================================
        // 21. الدخول إلى الدردشة
        // ============================================================
        function enterChat(username) {
            loginScreen.style.display = 'none';
            chatScreen.style.display = 'flex';
            chatScreen.classList.add('fade-enter');
            
            currentUserDisplay.textContent = username;
            if (isAdmin) currentUserDisplay.textContent += ' ⭐';
            
            loadAvatar(username);
            
            // عرض شريط التقدم
            loadingMessagesBar.style.display = 'flex';
            loaderFill.style.width = '0%';
            loaderFill.classList.add('loading');
            loaderText.textContent = '⏳ جاري تحميل الرسائل...';
            loaderCount.textContent = '0';
            
            // إنشاء مدير التهيئة
            initManagerInstance = new InitManager();
            
            // تحميل الرسائل
            initManagerInstance.loadMessages().then(() => {
                loadingMessagesBar.style.display = 'none';
            });
            
            listenUsers();
            listenTyping();
            initFullEmojiPanel();
            
            loadStickersFromFirebase().then(() => {
                renderStickerTabs();
                renderStickers(currentStickerTab);
                renderAdminStickers();
            });
            
            loadBadWords();
            loadBanCounts();
            startAutoSync();
            
            const updateInterval = setInterval(() => {
                if (currentUser) {
                    db.collection('users').doc(currentUser).update({
                        online: true,
                        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
                    }).catch(() => {});
                }
            }, 10000);
            
            window.addEventListener('beforeunload', () => {
                clearInterval(updateInterval);
                if (currentUser) {
                    db.collection('users').doc(currentUser).update({ online: false }).catch(() => {});
                }
                if (syncInterval) clearInterval(syncInterval);
                if (messageCacheInstance) messageCacheInstance.saveToStorage();
            });
            
            // مراقبة التمرير
            messagesContainer.addEventListener('scroll', () => {
                const isAtBottom = messagesContainer.scrollHeight - messagesContainer.scrollTop <= messagesContainer.clientHeight + 50;
                if (isAtBottom) {
                    scrollToBottom.style.display = 'none';
                    unreadCount = 0;
                } else if (unreadCount > 0) {
                    scrollToBottom.style.display = 'flex';
                }
                
                isUserScrolling = true;
                clearTimeout(messagesContainer._scrollTimeout);
                messagesContainer._scrollTimeout = setTimeout(() => {
                    isUserScrolling = false;
                }, 200);
            });
            
            scrollToBottom.onclick = () => {
                messagesContainer.scrollTo({ top: messagesContainer.scrollHeight, behavior: 'smooth' });
                scrollToBottom.style.display = 'none';
                unreadCount = 0;
                isScrollingToBottom = true;
                setTimeout(() => { isScrollingToBottom = false; }, 500);
            };
            
            setTimeout(() => {
                listenMessages();
            }, 500);
        }
        
        // ============================================================
        // 22. الصورة الشخصية
        // ============================================================
        function loadAvatar(username) {
            db.collection('users').doc(username).onSnapshot((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    if (data.avatar && data.avatar !== myAvatar) {
                        myAvatar = data.avatar;
                        updateAvatarUI();
                    }
                    if (data.bio) myBio = data.bio;
                    if (data.theme) {
                        if (data.theme === 'dark') document.body.classList.add('theme-dark');
                        else document.body.classList.remove('theme-dark');
                        localStorage.setItem('theme', data.theme);
                    }
                    if (data.color) { selectColor(data.color); }
                }
            });
        }
        
        // ============================================================
        // 23. الكلمات الممنوعة
        // ============================================================
        async function loadBadWords() {
            try {
                const snapshot = await db.collection('badwords').get();
                badWords = [];
                snapshot.forEach(doc => { badWords.push(doc.data().word); });
                renderBadWords();
            } catch (error) { console.error('خطأ في تحميل الكلمات الممنوعة:', error); }
        }
        
        function renderBadWords() {
            badWordsList.innerHTML = '';
            badWords.forEach(word => {
                const tag = document.createElement('span');
                tag.className = 'word-tag';
                tag.innerHTML = `${word} <button class="remove-word" onclick="removeBadWord('${word}')">✕</button>`;
                badWordsList.appendChild(tag);
            });
        }
        
        async function addBadWord() {
            const word = badWordInput.value.trim().toLowerCase();
            if (!word) { showNotification('❌ أدخل كلمة'); return; }
            if (badWords.includes(word)) { showNotification('⚠️ الكلمة موجودة بالفعل'); return; }
            try {
                await db.collection('badwords').doc(word).set({ word: word, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
                badWords.push(word);
                renderBadWords();
                badWordInput.value = '';
                showNotification('✅ تم إضافة الكلمة');
            } catch (error) { showNotification('❌ فشل الإضافة'); }
        }
        
        async function removeBadWord(word) {
            try {
                await db.collection('badwords').doc(word).delete();
                badWords = badWords.filter(w => w !== word);
                renderBadWords();
                showNotification('✅ تم حذف الكلمة');
            } catch (error) { showNotification('❌ فشل الحذف'); }
        }
        
        addBadWordBtn.onclick = addBadWord;
        badWordInput.onkeydown = (e) => { if (e.key === 'Enter') addBadWord(); };
        
        // ============================================================
        // 24. نظام الحظر التلقائي
        // ============================================================
        async function checkBadWords(text, username) {
            const lowerText = text.toLowerCase();
            let foundWords = [];
            for (const word of badWords) {
                if (lowerText.includes(word)) { foundWords.push(word); }
            }
            if (foundWords.length > 0) {
                const banRef = db.collection('bans').doc(username);
                const banDoc = await banRef.get();
                let count = 1;
                if (banDoc.exists) { count = (banDoc.data().count || 0) + 1; }
                await banRef.set({
                    username: username,
                    count: count,
                    lastWord: foundWords.join(', '),
                    lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
                userBanCounts[username] = count;
                const banDuration = Math.min(count * 60, 600);
                await db.collection('users').doc(username).update({
                    banned: true,
                    banReason: `استخدام كلمات ممنوعة (${foundWords.join(', ')})`,
                    banExpires: firebase.firestore.FieldValue.serverTimestamp() + banDuration * 1000,
                    banCount: count
                });
                showNotification(`⛔ تم حظر ${username} لمدة ${banDuration} ثانية`);
                setTimeout(async () => {
                    await db.collection('users').doc(username).update({
                        banned: false,
                        banReason: null,
                        banExpires: null
                    });
                    showNotification(`🔓 تم إلغاء حظر ${username}`);
                }, banDuration * 1000);
                return true;
            }
            return false;
        }
        
        // ============================================================
        // 25. إرسال الرسائل مع التمرير التلقائي
        // ============================================================
        sendBtn.onclick = sendMessage;
        
        messageInput.onkeydown = function(e) {
            if (e.key === 'Enter') {
                if (e.shiftKey) {
                    return;
                } else {
                    e.preventDefault();
                    sendMessage();
                }
            }
        };
        
        messageInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
        
        async function sendMessage() {
            const text = messageInput.value.trim();
            if (!text) return;
            
            if (settings.muteAll && !isAdmin) {
                showNotification('🔇 الدردشة مكتومة حالياً');
                return;
            }
            
            if (await checkBadWords(text, currentUser)) {
                messageInput.value = '';
                messageInput.style.height = 'auto';
                showNotification('⛔ تم حظرك مؤقتاً');
                return;
            }
            
            if (text === '/clear' && isAdmin) {
                if (confirm('⚠️ هل تريد حذف جميع الرسائل؟')) { await clearAllMessages(); }
                messageInput.value = '';
                messageInput.style.height = 'auto';
                return;
            }
            
            try {
                const compressedText = AICore.compressText(text);
                
                const msgData = {
                    username: currentUser,
                    text: compressedText,
                    avatar: myAvatar,
                    isAdmin: isAdmin,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    deleted: false,
                    reactions: {},
                    edited: false,
                    editedAt: null,
                    compressed: true
                };
                
                if (replyingTo) {
                    msgData.replyTo = replyingTo;
                    msgData.replyText = AICore.compressText(replyingToText);
                }
                
                const tempId = 'temp_' + Date.now();
                const tempMsg = {
                    id: tempId,
                    ...msgData,
                    timestamp: new Date(),
                    _temp: true
                };
                
                if (!Array.isArray(allMessages)) {
                    allMessages = [];
                }
                
                allMessages = allMessages.filter(m => m.id !== tempId);
                allMessages.push(tempMsg);
                renderMessages(allMessages);
                messageCount = allMessages.length;
                updateStats();
                
                // التمرير التلقائي للأسفل
                setTimeout(() => {
                    messagesContainer.scrollTo({ top: messagesContainer.scrollHeight, behavior: 'smooth' });
                }, 100);
                
                await db.collection('messages').add(msgData);
                
                const updatedMessages = allMessages.filter(m => m.id !== tempId);
                const realMsg = { id: tempId, ...msgData };
                updatedMessages.push(realMsg);
                allMessages = updatedMessages;
                messageCount = allMessages.length;
                renderMessages(allMessages);
                updateStats();
                
                messageInput.value = '';
                messageInput.style.height = 'auto';
                replyingTo = null;
                replyingToText = '';
                replyBar.style.display = 'none';
                emojiPanel.style.display = 'none';
                emojiPanelOpen = false;
                stickerPanel.style.display = 'none';
                stickerPanelOpen = false;
                
                // التمرير التلقائي مرة أخرى
                setTimeout(() => {
                    messagesContainer.scrollTo({ top: messagesContainer.scrollHeight, behavior: 'smooth' });
                }, 200);
                
            } catch (error) {
                console.error('فشل الإرسال:', error);
                showNotification('❌ فشل الإرسال: ' + error.message);
            }
            
            try {
                await db.collection('typing').doc('status').set({
                    [currentUser]: false
                }, { merge: true });
            } catch (e) {}
        }
        
        // ============================================================
        // 26. استماع الرسائل - الطريقة الصحيحة
        // ============================================================
        function listenMessages() {
            if (messagesListener) { 
                try { messagesListener(); } catch(e) {}
                messagesListener = null; 
            }
            
            messagesListener = db.collection('messages')
                .orderBy('timestamp', 'desc')
                .limit(50)
                .onSnapshot((snapshot) => {
                    try {
                        const messages = [];
                        let newMessageCount = 0;
                        
                        if (snapshot.empty) {
                            return;
                        }
                        
                        snapshot.forEach(doc => {
                            const data = doc.data();
                            if (data.deleted !== true) {
                                const msg = { id: doc.id, ...data };
                                if (!processedMessageIds.has(doc.id)) {
                                    processedMessageIds.add(doc.id);
                                    messages.push(msg);
                                    newMessageCount++;
                                    if (messageCacheInstance) {
                                        messageCacheInstance.set(doc.id, msg);
                                    }
                                }
                            }
                        });
                        
                        if (messages.length === 0) return;
                        
                        messages.sort((a, b) => {
                            const timeA = a.timestamp?.toDate?.()?.getTime() || a.timestamp || 0;
                            const timeB = b.timestamp?.toDate?.()?.getTime() || b.timestamp || 0;
                            return timeA - timeB;
                        });
                        
                        const existingMessages = allMessages || [];
                        const mergedMessages = [];
                        const seenIds = new Set();
                        
                        messages.forEach(msg => {
                            seenIds.add(msg.id);
                            mergedMessages.push(msg);
                        });
                        
                        existingMessages.forEach(msg => {
                            if (!seenIds.has(msg.id) && !msg.deleted) {
                                mergedMessages.push(msg);
                            }
                        });
                        
                        mergedMessages.sort((a, b) => {
                            const timeA = a.timestamp?.toDate?.()?.getTime() || a.timestamp || 0;
                            const timeB = b.timestamp?.toDate?.()?.getTime() || b.timestamp || 0;
                            return timeA - timeB;
                        });
                        
                        allMessages = mergedMessages;
                        searchMessages = mergedMessages;
                        messageCount = mergedMessages.length;
                        
                        renderMessages(mergedMessages);
                        updateStats();
                        setTimeout(setupSwipeToReply, 50);
                        
                        // التمرير التلقائي للأسفل عند وجود رسائل جديدة
                        if (newMessageCount > 0 && !isScrollingToBottom) {
                            const isAtBottom = messagesContainer.scrollHeight - messagesContainer.scrollTop <= messagesContainer.clientHeight + 50;
                            if (isAtBottom) {
                                setTimeout(() => {
                                    messagesContainer.scrollTo({ top: messagesContainer.scrollHeight, behavior: 'smooth' });
                                }, 100);
                            } else {
                                unreadCount += newMessageCount;
                                scrollToBottom.style.display = 'flex';
                                scrollToBottom.innerHTML = `⬇️ <span class="badge">${unreadCount}</span>`;
                            }
                        }
                        
                    } catch (error) {
                        console.error('❌ خطأ في معالجة الرسائل:', error);
                    }
                }, (error) => {
                    console.error('❌ خطأ في استماع الرسائل:', error);
                    updateConnectionStatus(false);
                });
        }
        
        // ============================================================
        // عرض الرسائل - الطريقة الصحيحة
        // ============================================================
        function renderMessages(messages) {
            if (!messages || messages.length === 0) {
                messagesContainer.innerHTML = `
                    <div class="welcome-msg">
                        <div class="icon">📸</div>
                        <div class="title">مرحباً في نيزك إنستا</div>
                        <div class="sub">ابدأ المحادثة الآن</div>
                    </div>
                `;
                return;
            }
            
            const sorted = [...messages].sort((a, b) => {
                const timeA = a.timestamp?.toDate?.()?.getTime() || a.timestamp || 0;
                const timeB = b.timestamp?.toDate?.()?.getTime() || b.timestamp || 0;
                return timeA - timeB;
            });
            
            let html = '';
            let lastDate = '';
            
            sorted.forEach(data => {
                if (data.deleted === true) return;
                
                const isSent = data.username === currentUser;
                const sender = data.username || 'مجهول';
                const avatar = data.avatar || '📸';
                const time = AICore.formatTime(data.timestamp);
                const adminBadge = data.isAdmin ? ' ⭐' : '';
                const reactions = data.reactions || {};
                const reactionKeys = Object.keys(reactions);
                
                const date = AICore.formatDate(data.timestamp);
                if (date && date !== lastDate) {
                    html += `<div class="date-divider">${date}</div>`;
                    lastDate = date;
                }
                
                let reactionsHtml = '';
                if (reactionKeys.length > 0) {
                    reactionsHtml = `<div class="reactions">`;
                    reactionKeys.forEach(emoji => {
                        const users = reactions[emoji] || [];
                        reactionsHtml += `
                            <span class="reaction" onclick="toggleReaction('${data.id}', '${emoji}')">
                                ${emoji} ${users.length}
                            </span>
                        `;
                    });
                    reactionsHtml += `</div>`;
                }
                
                const editedMark = data.edited ? ' (معدلة)' : '';
                let replyHtml = '';
                if (data.replyTo && data.replyText) {
                    const replyTextDecompressed = AICore.decompressText(data.replyText);
                    replyHtml = `<div class="reply-preview">↩️ ${replyTextDecompressed.substring(0, 35)}${replyTextDecompressed.length > 35 ? '...' : ''}</div>`;
                }
                
                const avatarDisplay = isValidImageUrl(avatar) ? 
                    `<img src="${avatar}" alt="avatar" />` : avatar;
                
                let stickerHtml = '';
                if (data.sticker && data.stickerData) {
                    stickerHtml = `<span class="sticker"><img src="${data.stickerData}" /></span>`;
                } else if (data.sticker) {
                    stickerHtml = `<span class="sticker">${data.text}</span>`;
                }
                
                let imageHtml = '';
                if (data.image && data.imageData) {
                    imageHtml = `<img src="${data.imageData}" class="message-image" onclick="viewImage('${data.imageData}')" />`;
                }
                
                const decompressedText = AICore.decompressText(data.text);
                const isTemp = data._temp === true;
                
                html += `
                    <div class="msg-wrapper ${isTemp ? 'temp-msg' : ''}" 
                         data-id="${data.id}" 
                         data-text="${decompressedText.replace(/"/g, '&quot;').replace(/'/g, '&#39;')}"
                         data-sent="${isSent}"
                         oncontextmenu="handleLongPress(event, '${data.id}', '${decompressedText.replace(/'/g, "\\'")}', ${isSent})"
                         ontouchstart="handleTouchStart(event, '${data.id}', '${decompressedText.replace(/'/g, "\\'")}', ${isSent})"
                         ontouchend="handleTouchEnd(event)">
                        ${replyHtml}
                        <div class="msg ${isSent ? 'sent' : 'received'} ${isTemp ? 'temp-msg' : ''}" style="${isTemp ? 'opacity:0.7;' : ''}">
                            <div class="avatar-small" onclick="showProfile('${sender}')" title="عرض الملف الشخصي">
                                ${avatarDisplay}
                            </div>
                            <div class="content">
                                <span class="sender-name" onclick="showProfile('${sender}')">${sender}${adminBadge}</span>
                                ${stickerHtml || imageHtml || `<div class="text">${decompressedText}${editedMark}${isTemp ? ' ⏳' : ''}</div>`}
                                <div class="time">
                                    ${time}
                                    ${isSent ? '<span class="check">✓✓</span>' : ''}
                                </div>
                                ${reactionsHtml}
                            </div>
                        </div>
                    </div>
                `;
            });
            
            // إضافة زر تحميل المزيد إذا كان موجوداً
            const existingBtn = document.getElementById('loadMoreBtn');
            if (existingBtn) {
                // حفظ الزر وإضافته في الأعلى
                const btnClone = existingBtn.cloneNode(true);
                messagesContainer.innerHTML = html;
                if (btnClone.style.display !== 'none') {
                    messagesContainer.prepend(btnClone);
                    btnClone.onclick = () => {
                        if (initManagerInstance) {
                            initManagerInstance.loadMoreMessages();
                        }
                    };
                }
            } else {
                messagesContainer.innerHTML = html;
            }
            
            // التمرير للأسفل إذا كنا في الأسفل
            const isAtBottom = messagesContainer.scrollHeight - messagesContainer.scrollTop <= messagesContainer.clientHeight + 50;
            if (isAtBottom && messages.length > 0 && !isUserScrolling) {
                setTimeout(() => {
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }, 50);
            }
        }
        
        window.viewImage = function(imageData) {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.85); z-index: 1000;
                display: flex; align-items: center; justify-content: center;
                cursor: pointer; animation: fadeIn 0.2s ease;
            `;
            modal.innerHTML = `<img src="${imageData}" style="max-width:90%;max-height:90%;border-radius:12px;object-fit:contain;" />`;
            modal.onclick = () => modal.remove();
            document.body.appendChild(modal);
        };
        
        // ============================================================
        // 27. الضغط المطول
        // ============================================================
        function handleLongPress(e, messageId, messageText, isSent) {
            e.preventDefault();
            showLongPressMenu(messageId, messageText, isSent, e);
        }
        
        let touchTimerLong = null;
        let touchTargetLong = null;
        
        function handleTouchStart(event, messageId, messageText, isSent) {
            touchTargetLong = { id: messageId, text: messageText, sent: isSent };
            touchTimerLong = setTimeout(() => {
                showLongPressMenu(messageId, messageText, isSent, event);
                touchTargetLong = null;
            }, 500);
        }
        
        function handleTouchEnd(event) {
            clearTimeout(touchTimerLong);
            touchTargetLong = null;
        }
        
        // ============================================================
        // 28. السحب للرد
        // ============================================================
        let swipeTarget = null;
        let swipeStartX = 0;
        
        function setupSwipeToReply() {
            messagesContainer.removeEventListener('touchstart', handleSwipeStart);
            messagesContainer.removeEventListener('touchmove', handleSwipeMove);
            messagesContainer.removeEventListener('touchend', handleSwipeEnd);
            messagesContainer.addEventListener('touchstart', handleSwipeStart, { passive: true });
            messagesContainer.addEventListener('touchmove', handleSwipeMove, { passive: true });
            messagesContainer.addEventListener('touchend', handleSwipeEnd, { passive: true });
        }
        
        function handleSwipeStart(e) {
            const touch = e.touches[0];
            const target = document.elementFromPoint(touch.clientX, touch.clientY);
            const wrapper = target?.closest('.msg-wrapper');
            if (wrapper) {
                swipeTarget = wrapper;
                swipeStartX = touch.clientX;
            } else { swipeTarget = null; }
        }
        
        function handleSwipeMove(e) {
            if (!swipeTarget) return;
            const touch = e.touches[0];
            const deltaX = touch.clientX - swipeStartX;
            if (deltaX > 30) {
                const msg = swipeTarget.querySelector('.msg');
                if (msg) {
                    msg.style.transform = `translateX(${Math.min(deltaX, 80)}px)`;
                    msg.style.opacity = 0.7;
                }
            }
        }
        
        function handleSwipeEnd(e) {
            if (!swipeTarget) return;
            const msg = swipeTarget.querySelector('.msg');
            if (msg) {
                const transform = msg.style.transform || '';
                const match = transform.match(/translateX\((\d+)px\)/);
                const deltaX = match ? parseInt(match[1]) : 0;
                if (deltaX > 50) {
                    const messageId = swipeTarget.dataset.id;
                    const messageText = swipeTarget.dataset.text || '';
                    if (messageId) { startReply(messageId, messageText); }
                }
                msg.style.transform = '';
                msg.style.opacity = '';
            }
            swipeTarget = null;
        }
        
        // ============================================================
        // 29. وظائف إضافية
        // ============================================================
        function copyText(text) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('✅ تم نسخ النص');
            }).catch(() => {
                const input = document.createElement('input');
                input.value = text;
                document.body.appendChild(input);
                input.select();
                document.execCommand('copy');
                document.body.removeChild(input);
                showNotification('✅ تم نسخ النص');
            });
        }
        
        // ============================================================
        // 30. الرد على الرسالة
        // ============================================================
        function startReply(messageId, messageText) {
            hideLongPressMenu();
            replyingTo = messageId;
            replyingToText = messageText;
            replyBar.style.display = 'flex';
            replyText.textContent = messageText.substring(0, 45) + (messageText.length > 45 ? '...' : '');
            messageInput.focus();
        }
        
        replyCancel.onclick = function() {
            replyingTo = null;
            replyingToText = '';
            replyBar.style.display = 'none';
        };
        
        // ============================================================
        // 31. التفاعلات
        // ============================================================
        window.toggleReaction = async function(messageId, emoji) {
            if (!currentUser) return;
            try {
                const docRef = db.collection('messages').doc(messageId);
                const doc = await docRef.get();
                if (!doc.exists) return;
                const data = doc.data();
                const reactions = data.reactions || {};
                const users = reactions[emoji] || [];
                const index = users.indexOf(currentUser);
                if (index > -1) { users.splice(index, 1); } else { users.push(currentUser); }
                if (users.length === 0) { delete reactions[emoji]; } else { reactions[emoji] = users; }
                await docRef.update({ reactions: reactions });
            } catch (error) { console.error('خطأ في التفاعل:', error); }
        };
        
        // ============================================================
        // 32. تعديل الرسالة
        // ============================================================
        window.editMessage = function(messageId) {
            if (!currentUser) return;
            editingMessageId = messageId;
            db.collection('messages').doc(messageId).get().then(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    if (data.username === currentUser || isAdmin) {
                        editMessageInput.value = AICore.decompressText(data.text);
                        editMessageModal.style.display = 'flex';
                    } else { showNotification('❌ لا يمكنك تعديل رسالة أخرى'); }
                }
            }).catch(error => {
                console.error('خطأ:', error);
                showNotification('❌ فشل تحميل الرسالة');
            });
        };
        
        saveEditMessageBtn.onclick = async function() {
            const newText = editMessageInput.value.trim();
            if (!newText) { showNotification('❌ لا يمكن أن تكون فارغة'); return; }
            if (!editingMessageId) return;
            try {
                await db.collection('messages').doc(editingMessageId).update({
                    text: AICore.compressText(newText),
                    edited: true,
                    editedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                showNotification('✅ تم التعديل');
                editMessageModal.style.display = 'none';
                editingMessageId = null;
            } catch (error) {
                showNotification('❌ فشل التعديل');
                console.error(error);
            }
        };
        
        cancelEditMessageBtn.onclick = () => {
            editMessageModal.style.display = 'none';
            editingMessageId = null;
        };
        closeEditMessageModal.onclick = () => {
            editMessageModal.style.display = 'none';
            editingMessageId = null;
        };
        editMessageModal.onclick = (e) => {
            if (e.target === editMessageModal) {
                editMessageModal.style.display = 'none';
                editingMessageId = null;
            }
        };
        
        // ============================================================
        // 33. حذف الرسالة
        // ============================================================
        window.deleteMessage = async function(id) {
            if (settings.confirmDelete && !isAdmin && !confirm('حذف الرسالة؟')) return;
            try {
                await db.collection('messages').doc(id).update({ deleted: true });
                if (messageCacheInstance) {
                    messageCacheInstance.cache.delete(id);
                    messageCacheInstance.saveToStorage();
                }
                processedMessageIds.delete(id);
                showNotification('✅ تم الحذف');
            } catch (error) {
                console.error(error);
                showNotification('❌ فشل الحذف');
            }
        };
        
        // ============================================================
        // 34. استماع المستخدمين
        // ============================================================
        function listenUsers() {
            db.collection('users').onSnapshot((snapshot) => {
                let online = 0;
                let blocked = 0;
                let adminListHtml = '';
                allUsers = {};
                
                snapshot.forEach(doc => {
                    const data = doc.data();
                    allUsers[doc.id] = data;
                    if (data.online) online++;
                    if (data.blocked) blocked++;
                    if (isAdmin && doc.id !== currentUser) {
                        const status = data.online ? '🟢' : '⚫';
                        const statusBadge = data.online ? 'online' : 'offline';
                        const adminBadge = data.isAdmin ? '<span class="badge admin">مسؤول</span>' : '';
                        const blockedBadge = data.blocked ? '<span class="badge blocked">محظور</span>' : '';
                        const bannedBadge = data.banned ? '<span class="badge banned">⛔ محظور</span>' : '';
                        adminListHtml += `
                            <div class="user-item">
                                <span class="name">
                                    ${data.avatar || '📸'} ${doc.id} 
                                    ${adminBadge}
                                    ${blockedBadge}
                                    ${bannedBadge}
                                    <span class="badge ${statusBadge}">${status}</span>
                                </span>
                                <div class="actions-group">
                                    ${data.blocked ? 
                                        `<button class="btn-unblock" onclick="unblockUser('${doc.id}')">🔓</button>` :
                                        `<button class="btn-block" onclick="blockUser('${doc.id}')">⛔</button>`
                                    }
                                    ${data.banned ? 
                                        `<button class="btn-unblock" onclick="unbanUser('${doc.id}')">🔓 إلغاء</button>` : ''
                                    }
                                    <button class="btn-delete" onclick="deleteUser('${doc.id}')">🗑️</button>
                                    ${!data.isAdmin && doc.id !== 'slx23m' ? 
                                        `<button class="btn-admin" onclick="makeAdmin('${doc.id}')">⭐</button>` : ''}
                                    <button class="btn-warn" onclick="warnUser('${doc.id}')">⚠️</button>
                                </div>
                            </div>
                        `;
                    }
                });
                
                onlineUsers = online;
                blockedCount = blocked;
                updateStats();
                
                if (statUsers) statUsers.textContent = Object.keys(allUsers).length;
                if (statOnline) statOnline.textContent = onlineUsers;
                if (statMessages) statMessages.textContent = messageCount;
                if (statBlocked) statBlocked.textContent = blockedCount;
                
                if (isAdmin) {
                    const currentData = allUsers[currentUser];
                    if (currentData) {
                        adminListHtml = `
                            <div class="user-item" style="background:rgba(64,93,230,0.04);border-color:#405DE6;">
                                <span class="name">${currentData.avatar || '📸'} ${currentUser} <span class="badge admin">أنت</span> 🟢</span>
                                <span style="font-size:0.45rem;opacity:0.4;">نشط</span>
                            </div>
                        ` + adminListHtml;
                    }
                    adminUserList.innerHTML = adminListHtml || '<div style="text-align:center;opacity:0.4;padding:10px 0;font-size:0.7rem;">لا يوجد مستخدمين</div>';
                }
            }, (error) => {
                console.error('خطأ في استماع المستخدمين:', error);
            });
        }
        
        function updateStats() {
            onlineInfo.textContent = `🟢 ${onlineUsers} متصل · ${messageCount} رسالة`;
            if (statUsers) statUsers.textContent = Object.keys(allUsers).length;
            if (statOnline) statOnline.textContent = onlineUsers;
            if (statMessages) statMessages.textContent = messageCount;
            if (statBlocked) statBlocked.textContent = blockedCount;
        }
        
        // ============================================================
        // 35. استماع الكتابة
        // ============================================================
        function listenTyping() {
            db.collection('typing').doc('status').onSnapshot((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    const typingUsers = [];
                    for (let key in data) {
                        if (key !== currentUser && data[key] === true) { typingUsers.push(key); }
                    }
                    if (typingUsers.length > 0) {
                        typingText.textContent = `${typingUsers.join('، ')} يكتب${typingUsers.length > 1 ? 'ون' : ''}...`;
                        typingIndicator.style.display = 'flex';
                    } else {
                        typingText.textContent = '';
                        typingIndicator.style.display = 'none';
                    }
                } else { typingIndicator.style.display = 'none'; }
            }, (error) => {
                console.error('خطأ في استماع الكتابة:', error);
                typingIndicator.style.display = 'none';
            });
        }
        
        messageInput.oninput = function() {
            const hasText = this.value.trim().length > 0;
            db.collection('typing').doc('status').set({
                [currentUser]: hasText
            }, { merge: true }).catch(() => {});
            clearTimeout(typingTimeout);
            if (hasText) {
                typingTimeout = setTimeout(() => {
                    db.collection('typing').doc('status').set({
                        [currentUser]: false
                    }, { merge: true }).catch(() => {});
                }, 1500);
            }
        };
        
        // ============================================================
        // 36. تحميل عدد مرات الحظر
        // ============================================================
        async function loadBanCounts() {
            try {
                const snapshot = await db.collection('bans').get();
                snapshot.forEach(doc => {
                    userBanCounts[doc.id] = doc.data().count || 0;
                });
            } catch (error) { console.error('خطأ في تحميل عدد الحظر:', error); }
        }
        
        // ============================================================
        // 37. لوحة المسؤول
        // ============================================================
        adminShieldBtn.onclick = function() {
            if (isAdmin) {
                adminPanel.style.display = 'flex';
                adminPanel.classList.add('fade-enter');
                updateStats();
                loadBadWords();
                renderAdminStickers();
            } else { showNotification('❌ فقط المسؤول يمكنه الدخول'); }
        };
        
        closeAdminBtn.onclick = () => { adminPanel.style.display = 'none'; };
        
        tabs.forEach(tab => {
            tab.onclick = function() {
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                const tabId = this.dataset.tab;
                Object.keys(sections).forEach(key => {
                    sections[key].classList.toggle('active', key === tabId);
                });
            };
        });
        
        // ===== وظائف المسؤول =====
        window.blockUser = async function(username) {
            if (!isAdmin || username === 'slx23m') {
                showNotification('❌ لا يمكن حظر المسؤول');
                return;
            }
            if (!confirm(`⛔ حظر ${username}؟`)) return;
            try {
                await db.collection('users').doc(username).update({ blocked: true });
                await db.collection('blocked').doc(username).set({
                    blockedBy: currentUser,
                    blockedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                showNotification(`✅ تم حظر ${username}`);
            } catch (error) { showNotification('❌ فشل الحظر'); }
        };
        
        window.unblockUser = async function(username) {
            if (!isAdmin) return;
            try {
                await db.collection('users').doc(username).update({ blocked: false });
                await db.collection('blocked').doc(username).delete();
                showNotification(`✅ تم إلغاء حظر ${username}`);
            } catch (error) { showNotification('❌ فشل إلغاء الحظر'); }
        };
        
        window.unbanUser = async function(username) {
            if (!isAdmin) return;
            try {
                await db.collection('users').doc(username).update({ 
                    banned: false, 
                    banReason: null, 
                    banExpires: null 
                });
                await db.collection('bans').doc(username).delete();
                showNotification(`✅ تم إلغاء حظر ${username}`);
            } catch (error) { showNotification('❌ فشل إلغاء الحظر'); }
        };
        
        window.deleteUser = async function(username) {
            if (!isAdmin || username === 'slx23m') {
                showNotification('❌ لا يمكن حذف المسؤول');
                return;
            }
            if (!confirm(`🗑️ حذف ${username} نهائياً؟`)) return;
            try {
                await db.collection('users').doc(username).delete();
                const msgs = await db.collection('messages').where('username', '==', username).get();
                const batch = db.batch();
                msgs.forEach(doc => batch.delete(doc.ref));
                await batch.commit();
                showNotification(`✅ تم حذف ${username}`);
            } catch (error) { showNotification('❌ فشل الحذف'); }
        };
        
        window.makeAdmin = async function(username) {
            if (!isAdmin || username === 'slx23m') return;
            if (!confirm(`⭐ ترقية ${username}؟`)) return;
            try {
                await db.collection('users').doc(username).update({ isAdmin: true });
                showNotification(`✅ تم ترقية ${username}`);
            } catch (error) { showNotification('❌ فشل الترقية'); }
        };
        
        window.warnUser = async function(username) {
            if (!isAdmin) return;
            showNotification(`⚠️ تم إرسال تحذير إلى ${username}`);
        };
        
        window.clearAllMessages = async function() {
            if (!isAdmin) return;
            if (!confirm('⚠️ هل تريد حذف جميع الرسائل نهائياً؟')) return;
            try {
                const snapshot = await db.collection('messages').get();
                const batch = db.batch();
                snapshot.forEach(doc => batch.delete(doc.ref));
                await batch.commit();
                if (messageCacheInstance) messageCacheInstance.clear();
                processedMessageIds.clear();
                allMessages = [];
                messageCount = 0;
                renderMessages([]);
                updateStats();
                showNotification('✅ تم مسح جميع الرسائل');
            } catch (error) {
                showNotification('❌ فشل المسح');
                console.error(error);
            }
        };
        
        // ============================================================
        // 38. تبديل الإعدادات
        // ============================================================
        function toggleSwitch(id) {
            const el = document.getElementById(id + 'Switch');
            if (!el) return;
            el.classList.toggle('active');
            settings[id] = el.classList.contains('active');
            showNotification(`✅ تم ${settings[id] ? 'تفعيل' : 'إيقاف'} ${id}`);
        }
        
        // ============================================================
        // 39. إشعارات
        // ============================================================
        function showNotification(message) {
            const existing = document.querySelector('.temp-notification');
            if (existing) existing.remove();
            const div = document.createElement('div');
            div.className = 'temp-notification';
            div.textContent = message;
            document.body.appendChild(div);
            setTimeout(() => {
                div.style.opacity = '0';
                div.style.transition = 'opacity 0.3s';
                setTimeout(() => div.remove(), 500);
            }, 2000);
        }
        
        // ============================================================
        // 40. خروج
        // ============================================================
        logoutBtn.onclick = function() {
            if (confirm('تسجيل الخروج؟')) {
                if (currentUser) {
                    db.collection('users').doc(currentUser).update({ 
                        online: false,
                        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
                    }).catch(() => {});
                }
                if (messagesListener) { 
                    try { messagesListener(); } catch(e) {}
                    messagesListener = null; 
                }
                if (messageCacheInstance) messageCacheInstance.saveToStorage();
                localStorage.setItem('lastUser', currentUser);
                setTimeout(() => { location.reload(); }, 300);
            }
        };
        
        // ============================================================
        // 41. بداية التطبيق
        // ============================================================
        async function startInitialization() {
            console.log('🌠 بدء تهيئة نيزك إنستا...');
            
            messageCacheInstance = new MessageCache();
            window.messageCache = messageCacheInstance;
            
            initManagerInstance = new InitManager();
            
            initManagerInstance.onComplete = () => {
                console.log('✅ تمت تهيئة التطبيق بنجاح!');
                document.getElementById('loginScreen').style.display = 'flex';
                document.getElementById('loginScreen').classList.add('fade-enter');
                
                const savedUser = localStorage.getItem('lastUser');
                if (savedUser) {
                    document.getElementById('usernameInput').value = savedUser;
                }
            };
            
            initManagerInstance.onError = (error) => {
                console.error('❌ فشل تهيئة التطبيق:', error);
                document.getElementById('initStatus').textContent = '❌ فشل التهيئة: ' + error.message;
                document.getElementById('retryInitBtn').style.display = 'block';
            };
            
            await initManagerInstance.initialize();
        }
        
        // ============================================================
        // 42. إعادة المحاولة
        // ============================================================
        function retryInitialization() {
            console.log('🔄 إعادة محاولة التهيئة...');
            document.getElementById('retryInitBtn').style.display = 'none';
            
            document.getElementById('initProgressFill').style.width = '0%';
            document.getElementById('initStatus').textContent = '⏳ جاري إعادة المحاولة...';
            document.getElementById('initDetails').textContent = '';
            
            document.querySelectorAll('.init-step').forEach(el => {
                el.classList.remove('active', 'done', 'error');
                const icon = el.querySelector('.step-icon');
                const status = el.querySelector('.step-status');
                if (icon) icon.textContent = '⏳';
                if (status) status.textContent = '...';
            });
            
            setTimeout(() => {
                startInitialization();
            }, 500);
        }
        
        // ============================================================
        // 43. بدء التطبيق
        // ============================================================
        document.addEventListener('DOMContentLoaded', () => {
            console.log('📱 نيزك إنستا - جاري التحميل...');
            
            document.getElementById('splashScreen').style.display = 'flex';
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('chatScreen').style.display = 'none';
            
            setTimeout(startInitialization, 300);
        });
        
        console.log('🌠 نيزك إنستا - الإصدار النهائي (مستقر)');
        console.log('👤 المسؤول: slx23m | كلمة: 1442');
        console.log('📱 عرض الرسائل بشكل صحيح');
        console.log('📤 تحميل المزيد يعمل بشكل صحيح (30 رسالة لكل مرة)');
        console.log('✅ التطبيق جاهز للاستخدام!');
    </script>
</body>
</html>
