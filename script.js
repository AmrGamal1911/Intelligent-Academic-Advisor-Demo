body {transition: opacity ease-in 0.2s; } 
body[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } 



      /* ============================================================
         MODERN 2025 UI DESIGN SYSTEM
         - Inter typography
         - Glassmorphism panels
         - Soft color palette
         - Micro-animations
         - Card-based layout
      ============================================================ */

      :root {
        --bg-primary: #f0f4ff;
        --bg-secondary: #ffffff;
        --accent: #2563eb;
        --accent-dark: #1d4ed8;
        --accent-light: #eff6ff;
        --success: #22c55e;
        --success-bg: #f0fdf4;
        --warning: #f97316;
        --warning-bg: #fff7ed;
        --danger: #ef4444;
        --danger-bg: #fef2f2;
        --text-primary: #0f172a;
        --text-secondary: #475569;
        --text-muted: #94a3b8;
        --border: #e2e8f0;
        --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
        --shadow-md: 0 4px 16px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04);
        --shadow-lg: 0 20px 40px rgba(0,0,0,0.10), 0 8px 16px rgba(0,0,0,0.06);
        --radius-sm: 8px;
        --radius-md: 16px;
        --radius-lg: 24px;
        --glass-bg: rgba(255,255,255,0.72);
        --glass-border: rgba(255,255,255,0.5);
        --glass-blur: blur(16px);
      }

      * { box-sizing: border-box; }

      body {
        font-family: 'Inter', 'Segoe UI', sans-serif;
        background: linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%);
        background-attachment: fixed;
        min-height: 100vh;
        margin: 0;
        padding: 20px;
        padding-top: 80px;
        padding-bottom: 80px;
        scroll-behavior: smooth;
        color: var(--text-primary);
      }

      /* ---- Navbar ---- */
      h2 {
        text-align: center;
        font-family: 'Poppins', 'Inter', sans-serif;
        font-size: 18px;
        font-weight: 600;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        margin: 0;
        padding: 0 20px;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        -webkit-backdrop-filter: var(--glass-blur);
        border-bottom: 1px solid var(--glass-border);
        box-shadow: 0 4px 24px rgba(0,0,0,0.12);
        z-index: 1000;
        color: var(--text-primary);
        letter-spacing: -0.3px;
      }

      /* ---- Course Table ---- */
      .course {
        border: 1px solid var(--border);
        text-align: center;
        padding: 8px 6px;
        transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
        cursor: pointer;
        font-size: 13px;
        border-radius: 4px;
      }

      .course:hover {
        opacity: 0.88;
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0,0,0,0.12);
      }

      .header {
        text-align: center;
        background: linear-gradient(135deg, #1e40af, #3b82f6);
        color: white;
        font-weight: 600;
        font-size: 13px;
        padding: 10px 8px;
        border-radius: 6px;
        border: none;
        text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        letter-spacing: 0.3px;
      }

      .prev { background-color: #ede9fe; color: #5b21b6; }
      .direct { background-color: #dbeafe; color: #1d4ed8; }
      .selected { background-color: #d1fae5; color: #065f46; }
      .next { background-color: #fef3c7; color: #92400e; }

      input { margin-top: 7px; }

      /* ---- Legend ---- */
      #legend {
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        -webkit-backdrop-filter: var(--glass-blur);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
        margin: 0;
        padding: 12px 16px;
        width: fit-content;
      }

      #legend tbody {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
      }

      #legend tr {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      #legend td {
        padding: 4px 6px;
        font-size: 13px;
        font-weight: 500;
        color: var(--text-secondary);
      }

      #legend td:first-child {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
        border-radius: 4px;
        padding: 0;
      }

      #legend td:last-child {
        white-space: nowrap;
      }

      #courses_table {
        margin-bottom: 0;
        border-radius: var(--radius-md);
        overflow: hidden;
      }

      /* ---- Toggle container ---- */
      .legend-toggle-container {
        display: flex;
        align-items: center;
        gap: 24px;
        flex-wrap: wrap;
        margin-top: 16px;
      }

      /* ---- Toggle Switch ---- */
      .switch {
        position: relative;
        display: inline-block;
        line-height: 26px;
        width: 48px;
        height: 26px;
        margin: 0;
        flex-shrink: 0;
      }

      .switch input { opacity: 0; width: 0; height: 0; }

      .slider {
        position: absolute;
        cursor: pointer;
        inset: 0;
        background-color: #cbd5e1;
        border-radius: 26px;
        transition: 0.3s;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 4px;
        bottom: 4px;
        background: white;
        transition: 0.3s;
        border-radius: 50%;
        box-shadow: 0 1px 4px rgba(0,0,0,0.15);
      }

      input:checked + .slider { background-color: var(--accent); }
      input:focus + .slider { box-shadow: 0 0 0 3px rgba(37,99,235,0.2); }
      input:checked + .slider:before { transform: translateX(22px); }

      /* ============================================================
         TECHBOT NOTIFICATION SYSTEM
      ============================================================ */
      
      /* Toast Notification (Bottom Right) */
      #techbot-toast {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 10000;
        display: flex;
        align-items: flex-end;
        gap: 15px;
        max-width: 400px;
        transform: translateX(500px);
        transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      #techbot-toast.show {
        transform: translateX(0);
      }

      .bot-character {
        flex-shrink: 0;
        width: 72px;
        height: 72px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 56px;
        animation: headFloat 2.5s ease-in-out infinite;
      }
      
      .robot-mouth-overlay {
        position: absolute;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        width: 20px;
        height: 5px;
        background: #1f2937;
        border-radius: 2px;
        pointer-events: none;
      }

      .toast-message {
        background: linear-gradient(135deg, #1e293b, #0f172a);
        padding: 14px 18px 14px 16px;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(99,179,237,0.15);
        border: 1px solid rgba(99,179,237,0.25);
        position: relative;
        max-width: 280px;
        backdrop-filter: blur(8px);
      }

      .toast-message::before {
        content: '';
        position: absolute;
        bottom: 22px;
        left: -8px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 7px 8px 7px 0;
        border-color: transparent #1e293b transparent transparent;
      }

      .toast-message-title {
        font-weight: 700;
        color: #60a5fa;
        margin-bottom: 5px;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        font-family: 'Poppins', sans-serif;
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .toast-message-text {
        color: #e2e8f0;
        font-size: 14px;
        line-height: 1.7;
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        letter-spacing: 0.01em;
      }
      
      .toast-message-text strong {
        color: #60a5fa;
        font-weight: 600;
      }

      /* Modal Dialog with Bot */
      #techbot-modal {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.6);
        backdrop-filter: blur(4px);
        z-index: 10001;
        display: none;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
      }

      #techbot-modal.show {
        display: flex;
      }

      .modal-content {
        background: white;
        border-radius: 24px;
        padding: 40px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        position: relative;
        animation: slideUp 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideUp {
        from { 
          transform: translateY(50px);
          opacity: 0;
        }
        to { 
          transform: translateY(0);
          opacity: 1;
        }
      }

      .modal-bot {
        text-align: center;
        margin-bottom: 24px;
      }

      .modal-bot svg {
        width: 100px;
        height: 120px;
        margin: 0 auto;
      }

      .modal-message {
        text-align: center;
        margin-bottom: 24px;
      }

      .modal-message h3 {
        color: #2563eb;
        font-size: 17px;
        font-weight: 700;
        margin-bottom: 12px;
        font-family: 'Poppins', sans-serif;
        letter-spacing: -0.3px;
      }

      .modal-message p {
        color: #374151;
        font-size: 15px;
        line-height: 1.8;
        font-family: 'Inter', sans-serif;
        white-space: pre-wrap;
        letter-spacing: 0.01em;
      }
      
      .modal-message p strong {
        color: #2563eb;
        font-weight: 600;
      }

      .modal-buttons {
        display: flex;
        gap: 12px;
        justify-content: center;
      }

      .modal-btn {
        padding: 12px 28px;
        border-radius: 12px;
        border: none;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .modal-btn-primary {
        background: linear-gradient(135deg, #2563eb, #3b82f6);
        color: white;
        box-shadow: 0 4px 12px rgba(37,99,235,0.3);
      }

      .modal-btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(37,99,235,0.4);
      }

      .modal-btn-secondary {
        background: #f3f4f6;
        color: #4b5563;
      }

      .modal-btn-secondary:hover {
        background: #e5e7eb;
      }

      /* ============================================================
         ROBOT ANIMATIONS
      ============================================================ */
      
      /* Speaking mouth — active when toast is visible */
      #techbot-toast.show .robot-mouth-overlay,
      #techbot-modal.show .robot-mouth-overlay {
        animation: mouthSpeak 0.2s ease-in-out infinite;
      }

      @keyframes headFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
      }
      
      @keyframes mouthSpeak {
        0%, 100% { height: 5px; }
        50% { height: 2px; }
      }

      #div_sel {
        color: var(--text-muted);
        margin: 10px 0;
        font-size: 13px;
      }

      /* ---- Panels / Cards ---- */
      #courses_table {
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        -webkit-backdrop-filter: var(--glass-blur);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-md);
        margin: 0 auto 0 auto;
        padding: 16px;
      }

      .select-multiple-container {
        text-align: center;
        display: flex;
        align-items: center;
        gap: 10px;
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        -webkit-backdrop-filter: var(--glass-blur);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-md);
        padding: 12px 18px;
        font-size: 14px;
        font-weight: 500;
        color: var(--text-secondary);
        box-shadow: var(--shadow-sm);
        width: fit-content;
      }

      .upload-container {
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        -webkit-backdrop-filter: var(--glass-blur);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        margin: 20px auto;
        padding: 28px;
        max-width: 1200px;
      }

      .courses-section {
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        -webkit-backdrop-filter: var(--glass-blur);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        margin: 20px auto;
        padding: 24px;
        max-width: 1400px;
      }

      /* ---- Upload Box ---- */
      .upload-box {
        background: linear-gradient(135deg, rgba(239,246,255,0.9), rgba(219,234,254,0.9));
        border-radius: var(--radius-lg);
        padding: 48px 24px;
        text-align: center;
        border: 2px dashed #93c5fd;
        transition: all 0.3s ease;
        cursor: pointer;
        max-width: 600px;
        margin: 0 auto;
      }

      .upload-box:hover {
        border-color: var(--accent);
        background: linear-gradient(135deg, rgba(219,234,254,0.95), rgba(199,220,254,0.95));
        transform: translateY(-3px);
        box-shadow: 0 12px 32px rgba(37,99,235,0.18);
      }

      .upload-box input[type="file"] { display: none; }

      .upload-label {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 40px;
        background: linear-gradient(135deg, var(--accent) 0%, #1d4ed8 100%);
        color: white;
        border-radius: var(--radius-md);
        font-weight: 600;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        pointer-events: none;
        box-shadow: 0 4px 16px rgba(37,99,235,0.35);
        letter-spacing: -0.2px;
      }

      .upload-hint {
        margin-top: 16px;
        color: var(--text-secondary);
        font-size: 15px;
        font-weight: 500;
      }

      /* ---- Stat Cards ---- */
      .stats-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin-top: 24px;
      }

      .stat-card {
        background: white;
        border-radius: var(--radius-md);
        padding: 24px 20px;
        box-shadow: var(--shadow-md);
        border: 1px solid var(--border);
        transition: transform 0.25s ease, box-shadow 0.25s ease;
        position: relative;
        overflow: hidden;
      }

      .stat-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--accent), #818cf8);
        border-radius: 3px 3px 0 0;
      }

      .stat-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }

      .stat-card h3 {
        margin: 0 0 10px 0;
        font-size: 11px;
        font-weight: 600;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.8px;
      }

      .stat-value {
        font-size: 34px;
        font-weight: 700;
        color: var(--accent);
        margin-bottom: 8px;
        font-family: 'Poppins', sans-serif;
        letter-spacing: -1px;
      }

      .stat-label {
        font-size: 13px;
        font-weight: 500;
        color: var(--text-secondary);
      }

      /* ---- Progress Bars ---- */
      .progress-bar {
        width: 100%;
        height: 6px;
        background: #e2e8f0;
        border-radius: 99px;
        overflow: hidden;
        margin-top: 10px;
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--accent) 0%, #818cf8 100%);
        border-radius: 99px;
        transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* ---- Graduation Ring ---- */
      .graduation-ring-container {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-top: 12px;
      }

      .ring-svg { flex-shrink: 0; }

      .ring-bg { fill: none; stroke: #e2e8f0; stroke-width: 8; }
      .ring-fill {
        fill: none;
        stroke: url(#ringGrad);
        stroke-width: 8;
        stroke-linecap: round;
        transition: stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1);
        transform: rotate(-90deg);
        transform-origin: center;
      }

      /* ---- Remaining Courses ---- */
      .remaining-courses {
        background: white;
        border-radius: var(--radius-md);
        padding: 24px;
        margin-top: 20px;
        box-shadow: var(--shadow-md);
        border: 1px solid var(--border);
      }

      .remaining-courses h3 {
        margin: 0 0 18px 0;
        color: var(--text-primary);
        font-size: 17px;
        font-weight: 600;
        font-family: 'Poppins', sans-serif;
      }

      .course-list { display: grid; gap: 8px; }

      .course-item {
        padding: 12px 16px;
        border-radius: var(--radius-sm);
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.2s ease;
        cursor: grab;
      }

      .course-item:hover { transform: translateX(4px); }

      .course-item.available {
        background: var(--success-bg);
        border-left: 3px solid var(--success);
      }

      .course-item.locked {
        background: #fff5f5;
        border-left: 3px solid #fc8181;
      }

      .course-item-name { font-weight: 600; color: var(--text-primary); font-size: 14px; }
      .course-item-code { font-size: 12px; color: var(--text-muted); margin-left: 8px; }

      .course-item-hours {
        background: linear-gradient(135deg, var(--accent), #818cf8);
        color: white;
        padding: 4px 12px;
        border-radius: 99px;
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
      }

      /* ---- Study Plan ---- */
      .study-plan-container {
        background: white;
        border-radius: var(--radius-md);
        padding: 24px;
        margin-top: 20px;
        box-shadow: var(--shadow-md);
        border: 1px solid var(--border);
      }

      .study-plan-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        flex-wrap: wrap;
        gap: 12px;
      }

      .study-plan-header h3 {
        margin: 0;
        color: var(--text-primary);
        font-size: 18px;
        font-weight: 700;
        font-family: 'Poppins', sans-serif;
      }

      .plan-selector { display: flex; gap: 8px; flex-wrap: wrap; }

      .plan-option {
        padding: 8px 18px;
        border: 2px solid var(--accent);
        background: white;
        color: var(--accent);
        border-radius: 99px;
        cursor: pointer;
        font-weight: 600;
        font-size: 13px;
        transition: all 0.2s ease;
      }

      .plan-option.active,
      .plan-option:hover {
        background: var(--accent);
        color: white;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(37,99,235,0.25);
      }

      .generate-plan-btn {
        background: linear-gradient(135deg, var(--accent) 0%, #1d4ed8 100%);
        color: white;
        border: none;
        padding: 12px 28px;
        border-radius: 99px;
        font-weight: 700;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 16px rgba(37,99,235,0.35);
        letter-spacing: -0.2px;
      }

      .generate-plan-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 24px rgba(37,99,235,0.45);
      }

      /* ---- Semester Cards ---- */
      .semester-card {
        background: #f8faff;
        border-radius: var(--radius-md);
        padding: 20px;
        margin-bottom: 16px;
        border: 1px solid #e2e8f0;
        border-left: 4px solid var(--accent);
        transition: all 0.25s ease;
        position: relative;
      }

      .semester-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(37,99,235,0.10);
      }

      .semester-card.invalid-drop { background-color: #fef2f2; }

      .semester-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 14px;
        flex-wrap: wrap;
        gap: 8px;
      }

      .semester-title {
        font-weight: 700;
        color: var(--text-primary);
        font-size: 15px;
        font-family: 'Poppins', sans-serif;
      }

      .semester-hours {
        background: linear-gradient(135deg, var(--accent), #818cf8);
        color: white;
        padding: 5px 14px;
        border-radius: 99px;
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
      }

      .semester-courses {
        display: grid;
        gap: 8px;
        min-height: 64px;
        padding: 10px;
        border-radius: var(--radius-sm);
        transition: all 0.2s ease;
        background: rgba(255,255,255,0.7);
        border: 1px dashed transparent;
      }

      .semester-courses.drag-over {
        background-color: var(--accent-light);
        border-color: var(--accent);
      }

      .semester-course-item {
        background: white;
        padding: 10px 14px;
        border-radius: var(--radius-sm);
        font-size: 13px;
        color: var(--text-secondary);
        border-left: 3px solid var(--accent);
        cursor: grab;
        transition: all 0.2s ease;
        user-select: none;
        box-shadow: var(--shadow-sm);
        display: flex;
        align-items: center;
      }

      .semester-course-item:hover {
        background: #f0f9ff;
        box-shadow: 0 4px 12px rgba(37,99,235,0.12);
        transform: translateY(-1px);
      }

      .semester-course-item:active { cursor: grabbing; }

      .semester-course-item.dragging {
        opacity: 0.45;
        transform: scale(0.96);
      }

      .semester-course-code {
        font-weight: 700;
        color: var(--accent);
        margin-right: 8px;
        font-size: 12px;
        background: #eff6ff;
        padding: 2px 8px;
        border-radius: 99px;
      }

      .course-drag-handle {
        color: #cbd5e1;
        margin-right: 8px;
        font-size: 16px;
        flex-shrink: 0;
      }

      .plan-summary {
        background: linear-gradient(135deg, #f0fdf4, #dcfce7);
        padding: 18px 20px;
        border-radius: var(--radius-md);
        margin-top: 20px;
        border-left: 4px solid var(--success);
        border: 1px solid #bbf7d0;
      }

      .plan-summary-title {
        font-weight: 700;
        color: #166534;
        margin-bottom: 12px;
        font-size: 15px;
        font-family: 'Poppins', sans-serif;
      }

      .plan-summary-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 12px;
        font-size: 14px;
        font-weight: 500;
        color: var(--text-secondary);
      }

      /* ---- Summer Semester ---- */
      .summer-semester {
        background: linear-gradient(135deg, #fffbeb, #fef9e7) !important;
        border-left-color: var(--warning) !important;
        border-color: #fde68a !important;
      }

      .summer-semester .semester-hours {
        background: linear-gradient(135deg, var(--warning), #ea580c) !important;
      }

      .summer-semester .semester-course-item {
        border-left-color: var(--warning);
      }

      .summer-semester .semester-course-code {
        color: var(--warning);
        background: #fff7ed;
      }

      /* ---- Action Buttons ---- */
      .semester-actions {
        display: flex;
        gap: 10px;
        align-items: flex-start;
        margin-top: 4px;
        margin-bottom: 20px;
        flex-wrap: wrap;
      }

      #validationMessage { flex: 1 1 100%; min-width: 100%; }

      .reset-plan-btn {
        background: white;
        color: var(--warning);
        border: 2px solid #fed7aa;
        padding: 8px 18px;
        border-radius: 99px;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .reset-plan-btn:hover {
        background: #fff7ed;
        border-color: var(--warning);
        transform: translateY(-1px);
      }

      .export-btn {
        background: linear-gradient(135deg, var(--success), #16a34a);
        color: white;
        border: none;
        padding: 8px 18px;
        border-radius: 99px;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.25s;
        box-shadow: 0 2px 8px rgba(34,197,94,0.25);
      }

      .export-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(34,197,94,0.35);
      }

      .export-btn.xlsx {
        background: linear-gradient(135deg, var(--accent), #1d4ed8);
        box-shadow: 0 2px 8px rgba(37,99,235,0.25);
      }

      .export-btn.xlsx:hover {
        box-shadow: 0 6px 16px rgba(37,99,235,0.35);
      }

      .export-btn.pdf-btn {
        background: linear-gradient(135deg, #dc2626, #b91c1c);
        box-shadow: 0 2px 8px rgba(220,38,38,0.25);
      }

      .export-btn.pdf-btn:hover {
        box-shadow: 0 6px 16px rgba(220,38,38,0.35);
      }

      /* ---- Program Selector ---- */
      .program {
        cursor: pointer;
        font-size: 22px;
        font-weight: 600;
        color: #94a3b8;
        transition: all 0.25s ease;
        padding: 4px 14px;
        border-radius: var(--radius-sm);
        font-family: 'Poppins', sans-serif;
      }

      .program:hover { background: rgba(37,99,235,0.08); color: var(--accent); }
      .program.active { color: var(--accent); background: rgba(37,99,235,0.1); }

      /* ---- Buttons (summer add / delete) ---- */
      .add-summer-btn {
        background: linear-gradient(135deg, #fbbf24, #f59e0b);
        color: #1c1917;
        border: none;
        padding: 10px 20px;
        border-radius: 99px;
        font-weight: 700;
        font-size: 13px;
        cursor: pointer;
        margin: 10px 0;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.2s ease;
        box-shadow: 0 2px 8px rgba(251,191,36,0.3);
      }

      .add-summer-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(251,191,36,0.4);
      }

      .add-summer-after-btn {
        background: linear-gradient(135deg, #fbbf24, #f59e0b);
        color: #1c1917;
        border: none;
        padding: 6px 16px;
        border-radius: 99px;
        font-weight: 700;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 2px 6px rgba(251,191,36,0.3);
      }

      .add-summer-after-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(251,191,36,0.4);
      }

      .delete-semester-btn {
        background: #fee2e2;
        color: var(--danger);
        border: 1px solid #fca5a5;
        padding: 5px 12px;
        border-radius: 99px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        margin-left: 10px;
        transition: all 0.2s;
      }

      .delete-semester-btn:hover {
        background: var(--danger);
        color: white;
        border-color: var(--danger);
      }

      /* ---- Validation Messages ---- */
      .validation-message {
        background: #fefce8;
        border: 1px solid #fde047;
        color: #713f12;
        padding: 12px 16px;
        border-radius: var(--radius-sm);
        margin: 10px 0;
        font-size: 13px;
        font-weight: 500;
        display: none;
        animation: slideIn 0.3s ease;
      }

      @keyframes slideIn {
        from { opacity: 0; transform: translateY(-8px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .validation-message.error { background: var(--danger-bg); border-color: #fca5a5; color: #991b1b; }
      .validation-message.success { background: var(--success-bg); border-color: #86efac; color: #166534; }
      .validation-message.info { background: #eff6ff; border-color: #93c5fd; color: #1e40af; }

      /* ---- Student Info ---- */
      .student-info {
        background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
        border-radius: var(--radius-md);
        padding: 18px 20px;
        margin-top: 16px;
        border: 1px solid #bae6fd;
      }

      .student-info h4 {
        margin: 0 0 10px 0;
        color: var(--accent);
        font-size: 14px;
        font-weight: 700;
        font-family: 'Poppins', sans-serif;
        letter-spacing: -0.2px;
      }

      .student-info p {
        margin: 5px 0;
        font-size: 14px;
        font-weight: 500;
        color: var(--text-secondary);
      }

      /* ---- Debug Log ---- */
      .debug-line { padding: 4px 0; border-bottom: 1px solid #1e293b; font-size: 12px; }
      .debug-success { color: #4ade80; }
      .debug-error { color: #f87171; }
      .debug-warning { color: #fbbf24; }

      /* ---- Floating Action Buttons ---- */
      .fab-container {
        position: fixed;
        bottom: 28px;
        right: 28px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 12px;
        z-index: 999;
      }

      .fab-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 22px;
        border-radius: 99px;
        border: none;
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        white-space: nowrap;
        letter-spacing: -0.2px;
      }

      .fab-btn:hover {
        transform: translateY(-4px) scale(1.03);
        box-shadow: 0 16px 36px rgba(0,0,0,0.28);
      }

      .fab-btn:active { transform: translateY(-1px) scale(0.99); }

      .fab-pdf {
        background: linear-gradient(135deg, #dc2626, #b91c1c);
        color: white;
      }

      .fab-generate {
        background: linear-gradient(135deg, var(--accent), #1d4ed8);
        color: white;
      }

      /* ---- Progress Ring Stat Card ---- */
      .stat-card.ring-card {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .ring-info { flex: 1; }

      /* ---- Graduation Timeline ---- */
      .graduation-timeline {
        display: flex;
        align-items: center;
        gap: 0;
        overflow-x: auto;
        padding: 16px 0 8px;
        margin-top: 4px;
        scrollbar-width: thin;
      }

      .timeline-step {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        min-width: 90px;
      }

      .timeline-step:not(:last-child)::after {
        content: '';
        position: absolute;
        top: 15px;
        left: 50%;
        width: 100%;
        height: 2px;
        background: #e2e8f0;
        z-index: 0;
      }

      .timeline-step.completed:not(:last-child)::after {
        background: linear-gradient(90deg, var(--success), var(--accent));
      }

      .timeline-dot {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid #e2e8f0;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 700;
        position: relative;
        z-index: 1;
        transition: all 0.3s ease;
        color: #94a3b8;
      }

      .timeline-step.completed .timeline-dot {
        background: linear-gradient(135deg, var(--success), var(--accent));
        border-color: transparent;
        color: white;
        box-shadow: 0 4px 12px rgba(34,197,94,0.4);
      }

      .timeline-step.current .timeline-dot {
        background: linear-gradient(135deg, var(--accent), #818cf8);
        border-color: transparent;
        color: white;
        box-shadow: 0 4px 16px rgba(37,99,235,0.5);
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
        50% { box-shadow: 0 0 0 8px rgba(37,99,235,0); }
      }

      .timeline-label {
        margin-top: 8px;
        font-size: 11px;
        font-weight: 600;
        color: var(--text-muted);
        text-align: center;
        max-width: 80px;
      }

      .timeline-step.completed .timeline-label { color: var(--success); }
      .timeline-step.current .timeline-label { color: var(--accent); }

      /* ---- Special Case Star Toggle ---- */
      .special-case-toggle {
        background: transparent;
        border: 1.5px solid #cbd5e1;
        border-radius: 99px;
        padding: 3px 10px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        color: #94a3b8;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 4px;
        white-space: nowrap;
        font-family: 'Inter', sans-serif;
      }
      .special-case-toggle:hover {
        border-color: #d4af37;
        color: #b8930a;
        background: #fef9e7;
      }
      .special-case-toggle.active {
        background: linear-gradient(135deg, #fef8e6, #fdf4d8);
        border-color: #d4af37;
        color: #8b7300;
        box-shadow: 0 2px 8px rgba(212, 175, 55, 0.3);
      }
      .special-case-toggle.active:hover {
        background: linear-gradient(135deg, #fdf4d8, #fcefc5);
        box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
      }

      /* ---- Special Case Semester Card ---- */
      .semester-card.special-case-active {
        border-left-color: #d4af37 !important;
        background: linear-gradient(135deg, #fef9e7, #fdf5dc) !important;
        box-shadow: 0 4px 12px rgba(212, 175, 55, 0.15) !important;
      }
      .summer-semester.special-case-active {
        background: linear-gradient(135deg, #fef8e6, #fdf4d8) !important;
      }
      
      /* Special case hours badge */
      .special-case-active .semester-hours {
        background: linear-gradient(135deg, #d4af37, #c19a2e) !important;
        box-shadow: 0 2px 8px rgba(212, 175, 55, 0.3);
      }
      .course-remove-btn {
        background: transparent;
        border: none;
        color: #cbd5e1;
        cursor: pointer;
        font-size: 14px;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 4px;
        line-height: 1;
        transition: all 0.15s ease;
        margin-left: auto;
        flex-shrink: 0;
      }
      .course-remove-btn:hover {
        background: #fee2e2;
        color: var(--danger);
      }

      /* ---- Semester Footer (Gained / Remaining) ---- */
      .semester-footer {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 10px;
        padding: 8px 12px;
        background: rgba(37,99,235,0.05);
        border-radius: var(--radius-sm);
        border: 1px solid rgba(37,99,235,0.12);
        font-size: 13px;
        color: var(--text-secondary);
      }
      .summer-semester .semester-footer {
        background: rgba(249,115,22,0.06);
        border-color: rgba(249,115,22,0.15);
      }
      .footer-gained strong { color: #16a34a; }
      .footer-remaining strong { color: var(--accent); }
      .footer-sep { color: var(--border); }

      /* ---- Toast Notification ---- */
      #toastContainer {
        position: fixed;
        bottom: 90px;
        right: 28px;
        z-index: 2000;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: flex-end;
        pointer-events: none;
      }
      .toast-msg {
        padding: 12px 18px;
        border-radius: var(--radius-sm);
        font-size: 13px;
        font-weight: 600;
        max-width: 380px;
        box-shadow: var(--shadow-lg);
        animation: toastIn 0.3s ease forwards;
        pointer-events: auto;
      }
      .toast-msg.error   { background: var(--danger-bg); border-left: 4px solid var(--danger); color: #991b1b; }
      .toast-msg.success { background: var(--success-bg); border-left: 4px solid var(--success); color: #166534; }
      .toast-msg.info    { background: #eff6ff; border-left: 4px solid var(--accent); color: #1e40af; }
      .toast-msg.warning { background: var(--warning-bg); border-left: 4px solid var(--warning); color: #92400e; }
      @keyframes toastIn {
        from { opacity: 0; transform: translateX(20px); }
        to   { opacity: 1; transform: translateX(0); }
      }

      /* ---- Graduate Earlier Button ---- */
      .shortcut-btn {
        padding: 10px 18px;
        border-radius: 99px;
        border: none;
        font-weight: 700;
        font-size: 13px;
        cursor: pointer;
        background: linear-gradient(135deg, #f97316, #ef4444);
        color: white;
        box-shadow: 0 4px 14px rgba(249,115,22,0.40);
        transition: all 0.25s ease;
        letter-spacing: -0.2px;
        display: none; /* hidden until shortcut is available */
        animation: shortcutPulse 2.2s ease-in-out infinite;
      }
      .shortcut-btn.visible { display: inline-flex; align-items: center; gap: 6px; }
      .shortcut-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 22px rgba(249,115,22,0.55);
        animation: none;
      }
      @keyframes shortcutPulse {
        0%,100% { box-shadow: 0 4px 14px rgba(249,115,22,0.40); }
        50%      { box-shadow: 0 4px 22px rgba(249,115,22,0.70); }
      }

      /* ---- Shortcut Options Modal ---- */
      #shortcut-modal {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.55);
        backdrop-filter: blur(5px);
        z-index: 10002;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: fadeIn 0.25s ease;
      }
      #shortcut-modal.show { display: flex; }

      .shortcut-modal-panel {
        background: white;
        border-radius: 24px;
        padding: 32px 28px 28px;
        max-width: 860px;
        width: 100%;
        max-height: 88vh;
        overflow-y: auto;
        box-shadow: 0 24px 64px rgba(0,0,0,0.32);
        animation: slideUp 0.35s cubic-bezier(0.68,-0.55,0.265,1.55);
        position: relative;
      }

      .shortcut-modal-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 8px;
        gap: 16px;
      }
      .shortcut-modal-title {
        font-family: 'Poppins', sans-serif;
        font-size: 20px;
        font-weight: 700;
        color: #0f172a;
        margin: 0;
      }
      .shortcut-modal-subtitle {
        font-size: 14px;
        color: #64748b;
        margin: 6px 0 24px;
        line-height: 1.6;
      }
      .shortcut-modal-close {
        background: #f1f5f9;
        border: none;
        border-radius: 50%;
        width: 34px;
        height: 34px;
        font-size: 16px;
        cursor: pointer;
        flex-shrink: 0;
        transition: background 0.2s;
        display: flex; align-items: center; justify-content: center;
      }
      .shortcut-modal-close:hover { background: #e2e8f0; }

      .shortcut-options-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 16px;
      }

      .shortcut-option-card {
        border: 2px solid #e2e8f0;
        border-radius: 16px;
        padding: 0;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
        background: #ffffff;
        overflow: hidden;
      }
      .shortcut-option-card:hover {
        border-color: #d97706;
        background: #fffbf5;
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(217,119,6,0.2);
      }
      .shortcut-option-card.selected-option {
        border-color: #d97706;
        background: #fffbf5;
        box-shadow: 0 0 0 3px rgba(217,119,6,0.2);
      }

      .shortcut-card-ribbon {
        background: linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%);
        color: white;
        font-size: 12px;
        font-weight: 700;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        letter-spacing: 0.2px;
        line-height: 1.4;
        box-shadow: 0 2px 8px rgba(146, 64, 14, 0.3);
        position: relative;
      }
      .shortcut-card-ribbon::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 0;
        right: 0;
        height: 6px;
        background: linear-gradient(135deg, rgba(146, 64, 14, 0.3) 0%, rgba(217, 119, 6, 0.1) 100%);
        clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%);
      }

      .shortcut-card-body {
        padding: 18px;
      }

      .shortcut-option-badge {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        background: linear-gradient(135deg, #f59e0b, #d97706);
        color: white;
        font-size: 11px;
        font-weight: 700;
        padding: 4px 12px;
        border-radius: 99px;
        margin-bottom: 12px;
        letter-spacing: 0.3px;
      }

      .shortcut-move-list {
        margin: 0 0 14px 0;
        padding: 0;
        list-style: none;
      }
      .shortcut-move-list li {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        padding: 5px 0;
        border-bottom: 1px solid #f1f5f9;
        color: #374151;
      }
      .shortcut-move-list li:last-child { border-bottom: none; }
      .shortcut-move-code {
        font-family: monospace;
        background: #f3f4f6;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 11px;
        color: #374151;
        flex-shrink: 0;
      }
      .shortcut-move-hours {
        margin-left: auto;
        font-weight: 700;
        color: #f97316;
        flex-shrink: 0;
      }

      .shortcut-result-preview {
        background: #f8faff;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 10px 12px;
        font-size: 12px;
        margin-bottom: 14px;
      }
      .shortcut-result-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 3px 0;
        gap: 8px;
      }
      .shortcut-result-label {
        color: #64748b;
        font-weight: 500;
        flex-shrink: 0;
        max-width: 130px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .shortcut-result-hours {
        font-weight: 700;
        color: #0f172a;
        white-space: nowrap;
      }
      .shortcut-result-hours .old { color: #94a3b8; text-decoration: line-through; margin-right: 4px; font-weight: 400; }
      .shortcut-result-hours .new { color: #16a34a; }
      .shortcut-result-hours .summer-new { color: #f97316; }

      .shortcut-apply-btn {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 10px;
        background: linear-gradient(135deg, #d97706, #b45309);
        color: white;
        font-weight: 700;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s ease;
        letter-spacing: -0.1px;
      }
      .shortcut-apply-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 16px rgba(217,119,6,0.4);
      }

      /* ---- Semester Reduction Badge ---- */
      .sem-reduction-tag {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 5px;
        width: 100%;
        box-sizing: border-box;
        background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
        color: #fff;
        font-size: 11.5px;
        font-weight: 700;
        letter-spacing: 0.3px;
        padding: 6px 12px;
        border-radius: 10px;
        margin-bottom: 8px;
      }
      .sem-reduction-tag .from { color: #94a3b8; text-decoration: line-through; }
      .sem-reduction-tag .arrow { color: #38bdf8; font-size: 14px; }
      .sem-reduction-tag .to   { color: #4ade80; font-size: 12px; }
      .sem-reduction-tag .grad-from { color: #fca5a5; font-size: 11px; font-weight: 500; }
      .sem-reduction-tag .grad-to   { color: #86efac; font-size: 11px; font-weight: 700; }
      .sem-reduction-tag.same  { background: linear-gradient(135deg, #1e3a5f 0%, #1e4d6b 100%); }
      .sem-reduction-tag.same .to { color: #7dd3fc; }
      .sem-reduction-tag.earlier { background: linear-gradient(135deg, #064e3b 0%, #065f46 100%); }
      .sem-reduction-tag.earlier .to { color: #6ee7b7; }

      /* ---- Summer Bridge Button ---- */
      .bridge-btn {
        padding: 10px 18px;
        border-radius: 99px;
        border: none;
        font-weight: 700;
        font-size: 13px;
        cursor: pointer;
        background: linear-gradient(135deg, #0ea5e9, #0284c7);
        color: white;
        box-shadow: 0 4px 14px rgba(14,165,233,0.40);
        transition: all 0.25s ease;
        letter-spacing: -0.2px;
        display: none;
        animation: bridgePulse 2.4s ease-in-out infinite;
      }
      .bridge-btn.visible { display: inline-flex; align-items: center; gap: 6px; }
      .bridge-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 22px rgba(14,165,233,0.55);
        animation: none;
      }
      @keyframes bridgePulse {
        0%,100% { box-shadow: 0 4px 14px rgba(14,165,233,0.40); }
        50%      { box-shadow: 0 4px 22px rgba(14,165,233,0.70); }
      }

      /* Bridge modal reuses .shortcut-modal-panel and .shortcut-options-grid CSS */
      .bridge-option-card {
        border: 2px solid #e2e8f0;
        border-radius: 16px;
        padding: 0;
        cursor: pointer;
        transition: all 0.2s ease;
        background: #ffffff;
        overflow: hidden;
      }
      .bridge-option-card:hover {
        border-color: #d97706;
        background: #fffbf5;
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(217,119,6,0.2);
      }
      
      .bridge-card-ribbon {
        background: linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%);
        color: white;
        font-size: 12px;
        font-weight: 700;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        letter-spacing: 0.2px;
        line-height: 1.4;
        box-shadow: 0 2px 8px rgba(146, 64, 14, 0.3);
        position: relative;
      }
      .bridge-card-ribbon::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 0;
        right: 0;
        height: 6px;
        background: linear-gradient(135deg, rgba(146, 64, 14, 0.3) 0%, rgba(217, 119, 6, 0.1) 100%);
        clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%);
      }
      
      .bridge-card-body {
        padding: 18px;
      }
      
      .bridge-option-badge {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        background: linear-gradient(135deg, #f59e0b, #d97706);
        color: white;
        font-size: 11px;
        font-weight: 700;
        padding: 4px 12px;
        border-radius: 99px;
        margin-bottom: 12px;
        letter-spacing: 0.3px;
      }
      .bridge-unlock-list {
        margin: 10px 0;
        padding: 10px 12px;
        background: #f0f9ff;
        border: 1px solid #bae6fd;
        border-radius: 10px;
        font-size: 12px;
        color: #0c4a6e;
      }
      .bridge-unlock-list strong { color: #0284c7; }
      .bridge-apply-btn {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 10px;
        background: linear-gradient(135deg, #d97706, #b45309);
        color: white;
        font-weight: 700;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-top: 12px;
      }
      .bridge-apply-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 16px rgba(217,119,6,0.4);
      }

      /* ---- Print / PDF Styles ---- */
      @media print {
        body {
          background: white !important;
          padding: 0 !important;
          font-family: 'Inter', sans-serif;
        }
        h2, .courses-section, .fab-container, .upload-box, 
        .semester-actions, .add-summer-after-btn, .delete-semester-btn,
        .course-drag-handle, #statsContainer, #remainingCourses,
        #planSelectorDiv, .generate-plan-btn, .study-plan-header button {
          display: none !important;
        }
        .study-plan-container {
          box-shadow: none !important;
          border: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        .upload-container {
          box-shadow: none !important;
          background: white !important;
          backdrop-filter: none !important;
          padding: 20px !important;
          margin: 0 !important;
        }
        .student-info { background: #f8fafc !important; }
        .semester-card { break-inside: avoid; margin-bottom: 12px !important; }
        .plan-summary { break-inside: avoid; }
        .semester-course-item { box-shadow: none !important; }
        #studyPlanDisplay::before {
          content: '🎓 Personalized Study Plan';
          display: block;
          font-size: 24px;
          font-weight: 700;
          font-family: 'Poppins', sans-serif;
          color: #0f172a;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 2px solid #e2e8f0;
        }
      }

      /* ============================================================
         LOAD BALANCING STYLES
      ============================================================ */
      .load-metrics {
        padding: 8px 12px;
        margin: 8px 0;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
      }

      .load-metrics.balanced {
        background: #f0fdf4;
        border: 1px solid #86efac;
        color: #166534;
      }

      .load-metrics.overloaded {
        background: #fef2f2;
        border: 1px solid #fca5a5;
        color: #991b1b;
      }

      .attempts-badge {
        display: inline-block;
        padding: 2px 6px;
        margin-left: 4px;
        background: #fef3c7;
        color: #92400e;
        border-radius: 4px;
        font-size: 10px;
        font-weight: 600;
      }
    
