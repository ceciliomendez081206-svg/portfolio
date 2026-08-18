export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');

      :root {
        --bg: #0B0F17;
        --surface: #131A26;
        --surface-2: #1A2230;
        --border: #232D3D;
        --text: #EDF1F7;
        --text-muted: #8996A8;
        --amber: #F2A93B;
        --amber-soft: rgba(242, 169, 59, 0.12);
        --mint: #3ECF8E;
        --mint-soft: rgba(62, 207, 142, 0.12);
      }

      /* Light theme overrides */
      [data-theme="light"] {
        --bg: #f6f7fb;
        --surface: #ffffff;
        --surface-2: #f2f4f8;
        --border: #e6e9f0;
        --text: #0b1020;
        --text-muted: #55606f;
        --amber: #d87405;
        --amber-soft: rgba(216, 116, 5, 0.08);
        --mint: #0a8f5b;
        --mint-soft: rgba(10, 143, 91, 0.08);
      }

      /* Smooth theme transition */
      .portfolio-root, .portfolio-root * {
        transition: background-color 180ms ease, color 180ms ease, border-color 180ms ease;
      }

      html { scroll-behavior: smooth; }

      .portfolio-root {
        background: var(--bg);
        color: var(--text);
        font-family: 'Inter', sans-serif;
        overflow-x: hidden;
      }
      .portfolio-root * { box-sizing: border-box; }
      .portfolio-root h1,
      .portfolio-root h2,
      .portfolio-root h3,
      .portfolio-root p { margin: 0; }

      .font-display { font-family: 'Space Grotesk', sans-serif; }
      .font-mono { font-family: 'JetBrains Mono', monospace; }

      .section { scroll-margin-top: 84px; }

      .eyebrow {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--amber);
      }

      /* Nav */
      .nav-wrap {
        position: sticky;
        top: 0;
        z-index: 50;
        background: rgba(11, 15, 23, 0.85);
        backdrop-filter: blur(8px);
        border-bottom: 1px solid var(--border);
      }
      .nav-link {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.85rem;
        color: var(--text-muted);
        text-decoration: none;
        position: relative;
        padding-bottom: 2px;
        transition: color 0.2s ease;
      }
      .nav-link:hover { color: var(--text); }
      .nav-link::after {
        content: '';
        position: absolute;
        left: 0; right: 0; bottom: -4px;
        height: 1px;
        background: var(--amber);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.2s ease;
      }
      .nav-link:hover::after { transform: scaleX(1); }

      .icon-btn {
        color: var(--text-muted);
        background: transparent;
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .icon-btn:hover { color: var(--text); border-color: var(--text-muted); }
      .icon-btn:focus-visible,
      a:focus-visible,
      button:focus-visible {
        outline: 2px solid var(--amber);
        outline-offset: 2px;
      }

      .mobile-panel {
        border-top: 1px solid var(--border);
        background: var(--surface);
      }
      .mobile-link {
        font-family: 'JetBrains Mono', monospace;
        color: var(--text);
        text-decoration: none;
        display: block;
        padding: 12px 0;
        border-bottom: 1px solid var(--border);
      }

      /* Buttons */
      .btn {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.85rem;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 20px;
        border-radius: 8px;
        text-decoration: none;
        cursor: pointer;
        transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;
        border: 1px solid transparent;
      }
      .btn:hover { transform: translateY(-2px); }
      .btn-primary { background: var(--amber); color: #14100A; font-weight: 600; }
      .btn-primary:hover { background: #f7b957; }
      .btn-secondary { background: transparent; color: var(--text); border-color: var(--border); }
      .btn-secondary:hover { border-color: var(--text-muted); }

      /* Dashboard widget (hero) */
      .dash-card {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 20px 60px -20px rgba(0,0,0,0.5);
      }
      .dash-titlebar {
        display: flex; align-items: center; gap: 10px;
        padding: 12px 16px;
        border-bottom: 1px solid var(--border);
        background: var(--surface-2);
      }
      .dash-dots { display: flex; gap: 6px; }
      .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
      .dash-titletext { font-size: 0.75rem; color: var(--text-muted); }
      .dash-body { display: flex; }
      .dash-rail {
        display: flex; flex-direction: column; gap: 14px;
        padding: 16px 10px;
        border-right: 1px solid var(--border);
      }
      .rail-icon { color: var(--text-muted); display: flex; }
      .rail-active { color: var(--amber); }
      .dash-main { flex: 1; padding: 16px; min-width: 0; }
      .dash-header-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
      .dash-label { font-size: 0.7rem; letter-spacing: 0.1em; color: var(--text-muted); }
      .dash-live { display: flex; align-items: center; gap: 6px; font-size: 0.7rem; color: var(--mint); }
      .dash-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px; }
      .stat-tile { background: var(--surface-2); border: 1px solid var(--border); border-radius: 10px; padding: 10px 8px; display: flex; flex-direction: column; gap: 4px; }
      .stat-num { font-size: 1.4rem; font-weight: 700; display: block; }
      .stat-label { font-size: 0.62rem; color: var(--text-muted); }
      .dash-chart { margin-bottom: 16px; }
      .chart-bars { display: flex; align-items: flex-end; gap: 5px; height: 56px; }
      .chart-bar { flex: 1; border-radius: 3px 3px 0 0; transition: opacity 0.2s ease; }
      .chart-caption { display: block; margin-top: 6px; font-size: 0.62rem; color: var(--text-muted); }
      .dash-status { display: flex; align-items: center; gap: 8px; font-size: 0.72rem; color: var(--text-muted); }

      .pulse-dot {
        width: 7px; height: 7px; border-radius: 50%;
        background: var(--mint);
        animation: pulse 2s infinite;
        flex-shrink: 0;
      }
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(62, 207, 142, 0.5); }
        70% { box-shadow: 0 0 0 8px rgba(62, 207, 142, 0); }
        100% { box-shadow: 0 0 0 0 rgba(62, 207, 142, 0); }
      }

      /* Fact badges (about) */
      .fact-badge {
        display: inline-flex; align-items: center; gap: 8px;
        background: var(--surface); border: 1px solid var(--border);
        border-radius: 999px; padding: 8px 14px;
        font-family: 'JetBrains Mono', monospace; font-size: 0.78rem;
        color: var(--text-muted);
      }
      .fact-badge svg { color: var(--amber); }

      /* Skills */
      .skill-card {
        background: var(--surface); border: 1px solid var(--border);
        border-radius: 14px; padding: 20px;
        transition: border-color 0.2s ease, transform 0.2s ease;
      }
      .skill-card:hover { border-color: var(--amber); transform: translateY(-3px); }
      .skill-tag {
        font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;
        background: var(--surface-2); border: 1px solid var(--border);
        color: var(--text); border-radius: 6px; padding: 5px 10px;
        display: inline-block;
      }

      /* Projects */
      .project-card {
        background: var(--surface); border: 1px solid var(--border);
        border-radius: 16px; padding: 24px;
        transition: border-color 0.2s ease, transform 0.2s ease;
        display: flex; flex-direction: column; gap: 14px;
        height: 100%;
      }
      .project-card:hover { border-color: var(--amber); transform: translateY(-4px); }
      .project-path { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: var(--text-muted); }
      .tech-pill {
        font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;
        background: var(--amber-soft); color: var(--amber);
        border-radius: 6px; padding: 4px 9px;
      }
      .status-pill {
        font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;
        display: inline-flex; align-items: center; gap: 6px;
        border-radius: 999px; padding: 5px 11px; border: 1px solid var(--border);
        color: var(--text-muted);
      }
      .status-pill.in-progress { color: var(--mint); border-color: var(--mint); background: var(--mint-soft); }
      .status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--text-muted); }
      .status-pill.in-progress .status-dot { background: var(--mint); }

      /* Contact */
      .contact-prompt {
        font-family: 'JetBrains Mono', monospace;
        background: var(--surface); border: 1px solid var(--border);
        border-radius: 12px; padding: 18px 22px;
        color: var(--text); text-decoration: none;
        display: inline-flex; align-items: center; gap: 10px;
        transition: border-color 0.2s ease;
      }
      .contact-prompt:hover { border-color: var(--amber); }
      .contact-prompt .prompt-symbol { color: var(--mint); }

      .social-btn {
        color: var(--text-muted); border: 1px solid var(--border);
        border-radius: 10px; padding: 10px; display: inline-flex;
        transition: all 0.2s ease; text-decoration: none;
      }
      .social-btn:hover { color: var(--amber); border-color: var(--amber); }

      /* Motion */
      .fade-up { animation: fadeUp 0.7s ease both; }
      .fade-up-delay-1 { animation: fadeUp 0.7s ease 0.12s both; }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(14px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .fade-up, .fade-up-delay-1, .pulse-dot { animation: none; }
        .btn:hover, .skill-card:hover, .project-card:hover { transform: none; }
      }
    `}</style>
  );
}
