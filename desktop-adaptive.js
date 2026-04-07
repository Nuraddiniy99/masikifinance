/**
 * ============================================================
 * MASIKI FINANCE — DESKTOP ADAPTIVE ENHANCEMENT
 * ============================================================
 * Paste ENTIRE block as a new <script> tag right before </body>
 * Injects CSS + DOM enhancements. Zero existing code modified.
 * Works alongside the existing app.* API and lucide icons.
 * ============================================================
 */
(function MASIKIDesktopEnhancer() {
  'use strict';

  /* ─────────────────────────────────────────────────────────
     1. INJECT ADAPTIVE CSS
  ───────────────────────────────────────────────────────── */
  const style = document.createElement('style');
  style.id = 'masiki-desktop-css';
  style.textContent = `

  /* ─── CSS Custom Properties ─── */
  :root {
    --sidebar-w: 256px;
    --sidebar-col: 64px;
    --topbar-h: 58px;
    --panel-w: 300px;
    --col-gap: 20px;
    --ease: 0.28s cubic-bezier(.4,0,.2,1);
    --r-md: 10px;
    --r-lg: 16px;
  }

  /* ───────────────────────────────────────────────────────
     DESKTOP >= 1024px
  ─────────────────────────────────────────────────────── */
  @media (min-width: 1024px) {

    body { overflow: hidden !important; }

    /* Hide mobile-only UI */
    .dynamic-island,
    .floating-menu-container,
    .menu-backdrop,
    #installPrompt {
      display: none !important;
    }

    /* ── Shell (full-viewport fixed grid) ── */
    #dt-shell {
      position: fixed;
      inset: 0;
      display: flex;
      z-index: 5;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
    }

    /* ── Sidebar ── */
    #dt-sidebar {
      width: var(--sidebar-w);
      min-width: var(--sidebar-w);
      height: 100vh;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      background: rgba(15,15,22,0.94);
      backdrop-filter: blur(32px) saturate(180%);
      border-right: 1px solid rgba(255,255,255,0.055);
      transition: width var(--ease);
      overflow: hidden;
      z-index: 10;
    }

    body.light-mode #dt-sidebar {
      background: rgba(245,247,250,0.96);
      border-right: 1px solid rgba(0,0,0,0.07);
    }

    #dt-sidebar.col { width: var(--sidebar-col); }

    /* Logo row */
    #dt-logo {
      display: flex;
      align-items: center;
      gap: 11px;
      padding: 18px 14px 14px;
      border-bottom: 1px solid rgba(255,255,255,0.055);
      flex-shrink: 0;
      overflow: hidden;
    }

    body.light-mode #dt-logo { border-bottom: 1px solid rgba(0,0,0,0.07); }

    #dt-logo .l-icon {
      width: 36px; height: 36px;
      border-radius: 10px;
      background: linear-gradient(135deg,#6366f1,#8b5cf6);
      box-shadow: 0 4px 12px rgba(99,102,241,.3);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; overflow: hidden; font-size: 18px;
    }

    #dt-logo .l-text {
      overflow: hidden;
      transition: max-width var(--ease), opacity var(--ease);
      max-width: 180px;
    }

    #dt-sidebar.col .l-text { max-width: 0; opacity: 0; }

    #dt-logo .l-name {
      font-size: 12.5px; font-weight: 700; white-space: nowrap;
      background: linear-gradient(90deg,#fff,#94a3b8);
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    body.light-mode #dt-logo .l-name {
      background: linear-gradient(90deg,#0f172a,#475569);
      -webkit-background-clip: text; background-clip: text;
    }

    #dt-logo .l-desc {
      font-size: 9.5px; color: #64748b;
      font-family: 'JetBrains Mono',monospace;
      letter-spacing:.04em; white-space: nowrap;
    }

    /* Nav list */
    #dt-nav {
      flex: 1; overflow-y: auto; overflow-x: hidden;
      padding: 10px 9px 0; display: flex;
      flex-direction: column; gap: 2px;
      scrollbar-width: none;
    }
    #dt-nav::-webkit-scrollbar { display: none; }

    .dt-nav-item {
      display: flex; align-items: center; gap: 10px;
      padding: 9px 10px; border-radius: var(--r-md);
      cursor: pointer; color: #94a3b8;
      font-size: 12.5px; font-weight: 500;
      white-space: nowrap; overflow: hidden;
      border: 1px solid transparent;
      transition: background var(--ease), color var(--ease), transform .15s;
      user-select: none;
    }

    .dt-nav-item:hover {
      background: rgba(255,255,255,.05);
      color: #e2e8f0; transform: translateX(2px);
    }

    body.light-mode .dt-nav-item:hover {
      background: rgba(0,0,0,.04); color: #0f172a;
    }

    .dt-nav-item.active {
      background: rgba(99,102,241,.16);
      color: #818cf8;
      border-color: rgba(99,102,241,.22);
    }

    body.light-mode .dt-nav-item.active {
      background: rgba(99,102,241,.1);
      color: #4338ca;
      border-color: rgba(99,102,241,.18);
    }

    .dt-nav-item .ni-icon {
      width: 30px; height: 30px; border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }

    .dt-nav-item.active .ni-icon { background: rgba(99,102,241,.18); }

    .dt-nav-item .ni-label {
      transition: max-width var(--ease), opacity var(--ease);
      max-width: 160px; overflow: hidden;
    }

    #dt-sidebar.col .ni-label { max-width: 0; opacity: 0; }

    /* Collapsed tooltip */
    #dt-sidebar.col .dt-nav-item { position: relative; }
    #dt-sidebar.col .dt-nav-item::after {
      content: attr(data-lbl);
      position: absolute;
      left: calc(var(--sidebar-col) + 2px); top: 50%;
      transform: translateY(-50%);
      background: rgba(20,20,30,.98);
      color: #e2e8f0; font-size: 11.5px; font-weight: 500;
      padding: 5px 11px; border-radius: 8px;
      white-space: nowrap; pointer-events: none;
      opacity: 0; transition: opacity .15s, left .15s;
      border: 1px solid rgba(255,255,255,.07); z-index: 100;
    }
    #dt-sidebar.col .dt-nav-item:hover::after {
      opacity: 1; left: calc(var(--sidebar-col) + 10px);
    }
    body.light-mode #dt-sidebar.col .dt-nav-item::after {
      background: rgba(248,250,252,.98); color: #0f172a;
      border: 1px solid rgba(0,0,0,.1);
    }

    /* Divider */
    .dt-div {
      height: 1px; margin: 8px 9px;
      background: rgba(255,255,255,.048); flex-shrink: 0;
    }
    body.light-mode .dt-div { background: rgba(0,0,0,.06); }

    /* Quick action buttons */
    #dt-quick { padding: 9px; display: flex; flex-direction: column; gap: 5px; flex-shrink: 0; }

    .dt-qbtn {
      display: flex; align-items: center; gap: 9px;
      padding: 8px 10px; border-radius: var(--r-md);
      font-size: 11.5px; font-weight: 600;
      cursor: pointer; overflow: hidden; white-space: nowrap;
      border: 1px solid; transition: all var(--ease);
    }
    .dt-qbtn .qb-lbl {
      transition: max-width var(--ease), opacity var(--ease);
      max-width: 120px;
    }
    #dt-sidebar.col .dt-qbtn .qb-lbl { max-width: 0; opacity: 0; }
    .dt-qbtn .kbd {
      margin-left: auto; font-size: 9px;
      font-family: 'JetBrains Mono',monospace;
      padding: 1px 5px; border-radius: 4px;
      background: rgba(255,255,255,.07);
      color: #64748b; border: 1px solid rgba(255,255,255,.09);
      transition: opacity var(--ease);
    }
    #dt-sidebar.col .dt-qbtn .kbd { opacity: 0; }

    .dt-qbtn.inc {
      background: rgba(16,185,129,.11); color: #10b981;
      border-color: rgba(16,185,129,.2);
    }
    .dt-qbtn.inc:hover {
      background: rgba(16,185,129,.2);
      box-shadow: 0 4px 12px rgba(16,185,129,.18);
      transform: translateY(-1px);
    }
    .dt-qbtn.exp {
      background: rgba(239,68,68,.11); color: #ef4444;
      border-color: rgba(239,68,68,.2);
    }
    .dt-qbtn.exp:hover {
      background: rgba(239,68,68,.2);
      box-shadow: 0 4px 12px rgba(239,68,68,.18);
      transform: translateY(-1px);
    }

    /* Toggle collapse button */
    #dt-toggle {
      display: flex; align-items: center; justify-content: center;
      padding: 11px 0; cursor: pointer; color: #64748b;
      border-top: 1px solid rgba(255,255,255,.048); flex-shrink: 0;
      transition: background var(--ease), color var(--ease);
    }
    body.light-mode #dt-toggle { border-top: 1px solid rgba(0,0,0,.06); }
    #dt-toggle:hover { background: rgba(255,255,255,.035); color: #e2e8f0; }
    body.light-mode #dt-toggle:hover { color: #0f172a; background: rgba(0,0,0,.03); }
    #dt-toggle-icon { transition: transform var(--ease); }
    #dt-sidebar.col #dt-toggle-icon { transform: rotate(180deg); }

    /* ── Main column ── */
    #dt-main {
      flex: 1; display: flex; flex-direction: column;
      min-width: 0; height: 100vh; overflow: hidden;
    }

    /* ── Top bar ── */
    #dt-topbar {
      height: var(--topbar-h); min-height: var(--topbar-h);
      display: flex; align-items: center; padding: 0 22px; gap: 14px;
      background: rgba(15,15,22,.82);
      backdrop-filter: blur(22px) saturate(160%);
      border-bottom: 1px solid rgba(255,255,255,.048);
      flex-shrink: 0; z-index: 9;
    }
    body.light-mode #dt-topbar {
      background: rgba(245,247,250,.92);
      border-bottom: 1px solid rgba(0,0,0,.06);
    }

    #dt-topbar-title {
      font-size: 15px; font-weight: 700; color: #fff; letter-spacing: -.01em;
    }
    body.light-mode #dt-topbar-title { color: #0f172a; }

    #dt-breadcrumb {
      font-size: 11px; color: #64748b;
      display: flex; align-items: center; gap: 5px;
    }
    #dt-breadcrumb span { color: #818cf8; font-weight: 500; }
    body.light-mode #dt-breadcrumb span { color: #4338ca; }

    #dt-topbar-spacer { flex: 1; }

    /* Search bar */
    #dt-search {
      display: flex; align-items: center; gap: 7px;
      padding: 0 11px;
      background: rgba(255,255,255,.048);
      border: 1px solid rgba(255,255,255,.07);
      border-radius: var(--r-md); height: 32px; width: 190px;
      transition: width var(--ease), border-color var(--ease);
    }
    #dt-search:focus-within { width: 260px; border-color: rgba(99,102,241,.4); }
    body.light-mode #dt-search {
      background: rgba(0,0,0,.04); border: 1px solid rgba(0,0,0,.08);
    }
    #dt-search-inp {
      background: none; border: none; outline: none;
      color: #e2e8f0; font-size: 11.5px; width: 100%;
      font-family: 'Inter',sans-serif;
    }
    body.light-mode #dt-search-inp { color: #0f172a; }
    #dt-search-inp::placeholder { color: #475569; }

    /* Status pill */
    #dt-status {
      display: flex; align-items: center; gap: 6px;
      padding: 4px 11px;
      background: rgba(16,185,129,.09);
      border: 1px solid rgba(16,185,129,.18);
      border-radius: 20px; font-size: 10.5px; font-weight: 500; color: #10b981;
    }
    #dt-status .dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: #10b981; animation: pulse 2s ease infinite;
    }

    /* Topbar icon buttons */
    .dt-tbtn {
      width: 34px; height: 34px; border-radius: 9px;
      background: rgba(255,255,255,.048);
      border: 1px solid rgba(255,255,255,.07);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; color: #94a3b8;
      transition: all var(--ease);
    }
    .dt-tbtn:hover { background: rgba(255,255,255,.1); color: #e2e8f0; }
    body.light-mode .dt-tbtn {
      background: rgba(0,0,0,.04); border: 1px solid rgba(0,0,0,.07); color: #64748b;
    }
    body.light-mode .dt-tbtn:hover { background: rgba(0,0,0,.07); color: #0f172a; }

    /* ── Content row ── */
    #dt-content-row { flex: 1; display: flex; min-height: 0; overflow: hidden; }

    /* ── Scroll area ── */
    #dt-scroll {
      flex: 1; overflow-y: auto; overflow-x: hidden; min-width: 0;
    }
    #dt-scroll::-webkit-scrollbar { width: 5px; }
    #dt-scroll::-webkit-scrollbar-track { background: transparent; }
    #dt-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,.09); border-radius: 3px; }

    /* Hide original sticky header (replaced by dt-topbar) */
    #dt-scroll header { display: none !important; }

    /* Extra bottom padding */
    #dt-scroll > #app { min-height: 100%; padding-bottom: 36px !important; }

    /* ── Dashboard 2-col grid ── */
    #menu-dashboard.active {
      display: grid !important;
      grid-template-columns: 1fr 1fr;
      gap: var(--col-gap);
      padding: 22px;
      align-items: start;
    }
    #menu-dashboard.active > section:nth-child(1),
    #menu-dashboard.active > section:nth-child(2) { grid-column: span 1; }
    #menu-dashboard.active > section:nth-child(3) { grid-column: span 2; }
    #menu-dashboard.active > section:nth-child(4) {
      grid-column: span 2;
      display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
    }

    /* ── Analisis 2-col ── */
    #menu-analisis.active {
      display: grid !important;
      grid-template-columns: 1fr 1fr;
      gap: var(--col-gap); padding: 22px;
      align-items: start;
    }
    #menu-analisis.active > section:nth-child(1),
    #menu-analisis.active > section:nth-child(2),
    #menu-analisis.active > section:last-child { grid-column: span 2; }
    #menu-analisis.active > div.grid { grid-column: span 2; }

    /* ── Anggaran 2-col ── */
    #menu-anggaran.active {
      display: grid !important;
      grid-template-columns: 2fr 1fr;
      gap: var(--col-gap); padding: 22px;
      align-items: start;
    }

    /* ── Dompet 2-col ── */
    #menu-dompet.active {
      display: grid !important;
      grid-template-columns: 1fr 1fr;
      gap: var(--col-gap); padding: 22px;
      align-items: start;
    }

    /* ── Kategori 2-col ── */
    #menu-kategori.active > section > .space-y-4 {
      display: grid; grid-template-columns: 1fr 1fr; gap: 18px;
    }
    #menu-kategori.active > section > .space-y-4 > div { margin: 0 !important; }
    #menu-kategori.active { padding: 22px; }

    /* ── Transaksi padding ── */
    #menu-transaksi.active { padding: 22px; }

    /* ── Category grid wider on desktop ── */
    #categoryGrid { grid-template-columns: repeat(5,1fr) !important; }

    /* ── Modals — centered on desktop ── */
    #transactionModal  div[id="transactionModalContent"],
    #budgetModal       div[id="budgetModalContent"],
    #categoryModal     div[id="categoryModalContent"],
    #walletModal       div[id="walletModalContent"],
    #currencyModal     div[id="currencyModalContent"],
    #newCurrencyModal  div[id="newCurrencyModalContent"] {
      border-radius: 24px !important;
      bottom: auto !important; left: 50% !important;
      right: auto !important; top: 50% !important;
      transform: translateX(-50%) translateY(-50%) !important;
      max-width: 520px !important; width: 100% !important;
    }

    /* Settings modal full reposition */
    #settingsModal .absolute.inset-x-4 {
      left: 50% !important; right: auto !important;
      transform: translateX(-50%) !important;
      max-width: 680px !important; width: 100% !important;
    }

    /* ── Right panel ── */
    #dt-rpanel {
      width: var(--panel-w); min-width: var(--panel-w); height: 100%;
      overflow-y: auto; overflow-x: hidden; flex-shrink: 0;
      background: rgba(15,15,22,.64);
      backdrop-filter: blur(24px) saturate(160%);
      border-left: 1px solid rgba(255,255,255,.048);
      display: flex; flex-direction: column;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,.09) transparent;
      transition: width var(--ease), opacity var(--ease);
    }
    body.light-mode #dt-rpanel {
      background: rgba(240,244,248,.84);
      border-left: 1px solid rgba(0,0,0,.06);
    }
    #dt-rpanel.hidden-p { width: 0 !important; min-width: 0 !important; opacity: 0; border: none; }
    #dt-rpanel::-webkit-scrollbar { width: 4px; }
    #dt-rpanel::-webkit-scrollbar-thumb { background: rgba(255,255,255,.09); border-radius: 2px; }

    .rp-sec { padding: 14px; border-bottom: 1px solid rgba(255,255,255,.048); }
    body.light-mode .rp-sec { border-bottom: 1px solid rgba(0,0,0,.05); }

    .rp-sec-title {
      font-size: 9.5px; font-weight: 600; text-transform: uppercase;
      letter-spacing: .08em; color: #64748b; margin-bottom: 10px;
    }

    .rp-card {
      background: rgba(255,255,255,.04);
      border: 1px solid rgba(255,255,255,.055);
      border-radius: var(--r-md); padding: 9px 11px; margin-bottom: 7px;
    }
    body.light-mode .rp-card {
      background: rgba(255,255,255,.85); border: 1px solid rgba(0,0,0,.07);
    }
    .rp-card:last-child { margin-bottom: 0; }
    .rp-card-lbl { font-size: 9.5px; color: #64748b; margin-bottom: 2px; }
    .rp-card-val { font-size: 14.5px; font-weight: 700; color: #e2e8f0; }
    body.light-mode .rp-card-val { color: #0f172a; }
    .rp-card-sec { font-size: 9.5px; color: #475569; font-family: 'JetBrains Mono',monospace; margin-top: 1px; }

    .rp-tx {
      display: flex; align-items: center; gap: 9px;
      padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,.04);
    }
    body.light-mode .rp-tx { border-bottom: 1px solid rgba(0,0,0,.04); }
    .rp-tx:last-child { border-bottom: none; }
    .rp-tx-ico { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0; }
    .rp-tx-nm { font-size: 11.5px; font-weight: 500; color: #e2e8f0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    body.light-mode .rp-tx-nm { color: #1e293b; }
    .rp-tx-dt { font-size: 9.5px; color: #64748b; }
    .rp-tx-amt { font-size: 11.5px; font-weight: 700; flex-shrink: 0; }

    .rp-wallet {
      display: flex; align-items: center; gap: 9px;
      background: rgba(255,255,255,.04);
      border: 1px solid rgba(255,255,255,.055);
      border-radius: var(--r-md); padding: 9px 11px; margin-bottom: 6px;
    }
    body.light-mode .rp-wallet {
      background: rgba(255,255,255,.85); border: 1px solid rgba(0,0,0,.07);
    }
    .rp-wallet:last-child { margin-bottom: 0; }
    .rp-w-ico { font-size: 17px; }
    .rp-w-name { font-size: 10.5px; color: #94a3b8; }
    body.light-mode .rp-w-name { color: #64748b; }
    .rp-w-bal { font-size: 12.5px; font-weight: 700; color: #e2e8f0; }
    body.light-mode .rp-w-bal { color: #0f172a; }

    /* Rate list in right panel */
    .rp-rate { display: flex; justify-content: space-between; align-items: center; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,.04); }
    body.light-mode .rp-rate { border-bottom: 1px solid rgba(0,0,0,.04); }
    .rp-rate:last-child { border-bottom: none; }
    .rp-rate-cc { font-size: 11.5px; color: #94a3b8; }
    .rp-rate-val { font-size: 11.5px; font-weight: 600; color: #e2e8f0; font-family: 'JetBrains Mono',monospace; }
    body.light-mode .rp-rate-val { color: #0f172a; }

    /* ── Glass card hover lift on desktop ── */
    .glass-card {
      transition: transform .2s ease, box-shadow .2s ease !important;
    }
    .glass-card:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 8px 28px rgba(0,0,0,.28) !important;
    }

    /* ── Focus rings ── */
    button:focus-visible, input:focus-visible, select:focus-visible {
      outline: 2px solid #6366f1 !important; outline-offset: 2px !important;
    }
  }

  /* ───────────────────────────────────────────────────────
     TABLET 768–1023px
  ─────────────────────────────────────────────────────── */
  @media (min-width: 768px) and (max-width: 1023px) {

    body { overflow: hidden !important; }

    .dynamic-island, .floating-menu-container, .menu-backdrop { display: none !important; }

    #dt-shell { position: fixed; inset: 0; display: flex; z-index: 5; height: 100vh; overflow: hidden; }

    #dt-sidebar {
      width: var(--sidebar-col); min-width: var(--sidebar-col);
      height: 100vh; display: flex; flex-direction: column;
      background: rgba(15,15,22,.94); backdrop-filter: blur(24px);
      border-right: 1px solid rgba(255,255,255,.055);
      overflow: hidden; flex-shrink: 0;
    }
    body.light-mode #dt-sidebar {
      background: rgba(245,247,250,.96); border-right: 1px solid rgba(0,0,0,.07);
    }

    #dt-logo .l-text { display: none; }
    .dt-nav-item .ni-label { display: none; }
    .dt-qbtn .qb-lbl, .dt-qbtn .kbd { display: none; }

    #dt-main { flex: 1; display: flex; flex-direction: column; min-width: 0; height: 100vh; overflow: hidden; }

    #dt-topbar {
      height: var(--topbar-h); min-height: var(--topbar-h);
      display: flex; align-items: center; padding: 0 16px; gap: 12px;
      background: rgba(15,15,22,.82); backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,.048); flex-shrink: 0;
    }
    body.light-mode #dt-topbar {
      background: rgba(245,247,250,.92); border-bottom: 1px solid rgba(0,0,0,.06);
    }

    #dt-topbar-title { font-size: 14px; font-weight: 700; color: #fff; }
    body.light-mode #dt-topbar-title { color: #0f172a; }
    #dt-search, #dt-status { display: none; }

    #dt-content-row { flex: 1; display: flex; min-height: 0; overflow: hidden; }

    #dt-scroll { flex: 1; overflow-y: auto; overflow-x: hidden; }
    #dt-scroll header { display: none !important; }

    #dt-rpanel { display: none !important; }

    #menu-dashboard.active {
      display: grid !important;
      grid-template-columns: 1fr 1fr;
      gap: 16px; padding: 16px;
    }
    #menu-dashboard.active > section:nth-child(3),
    #menu-dashboard.active > section:nth-child(4) { grid-column: span 2; }

    #menu-transaksi.active, #menu-anggaran.active,
    #menu-kategori.active, #menu-dompet.active, #menu-analisis.active { padding: 16px; }
  }

  /* ── Mobile: passthrough ── */
  @media (max-width: 767px) {
    #dt-shell { display: contents !important; }
    #dt-sidebar { display: none !important; }
    #dt-topbar { display: none !important; }
    #dt-rpanel { display: none !important; }
    #dt-main { display: contents !important; }
    #dt-content-row { display: contents !important; }
    #dt-scroll { display: contents !important; }
  }

  /* ── Reduce motion ── */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
  }
  `;
  document.head.appendChild(style);

  /* ─────────────────────────────────────────────────────────
     2. NAV CONFIG
  ───────────────────────────────────────────────────────── */
  const NAV = [
    { id:'dashboard', lbl:'Beranda',   icon:'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',         color:'#6366f1' },
    { id:'transaksi', lbl:'Transaksi', icon:'M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3', color:'#10b981' },
    { id:'anggaran',  lbl:'Anggaran',  icon:'M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0H5m-2 0h2M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4', color:'#f59e0b' },
    { id:'analisis',  lbl:'Analisis',  icon:'M18 20V10M12 20V4M6 20v-6',                                color:'#8b5cf6' },
    { id:'kategori',  lbl:'Kategori',  icon:'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z', color:'#ec4899' },
    { id:'dompet',    lbl:'Dompet',    icon:'M21 12V7H5a2 2 0 0 1 0-4h14v4M21 12a2 2 0 0 1 0 4H5a2 2 0 0 0 0 4h16v-4',     color:'#06b6d4' },
  ];

  const MENU_TITLES = {
    dashboard:'Beranda', transaksi:'Transaksi', anggaran:'Anggaran',
    analisis:'Analisis', kategori:'Kategori',  dompet:'Dompet'
  };

  /* ─────────────────────────────────────────────────────────
     3. BUILD SHELL
  ───────────────────────────────────────────────────────── */
  function buildShell() {
    if (document.getElementById('dt-shell')) return;
    const appEl = document.getElementById('app');
    if (!appEl) return;

    /* ── Shell ── */
    const shell = document.createElement('div');
    shell.id = 'dt-shell';

    /* ── Sidebar ── */
    const sb = document.createElement('div');
    sb.id = 'dt-sidebar';

    // Logo
    const logoDiv = document.createElement('div');
    logoDiv.id = 'dt-logo';
    logoDiv.innerHTML = `
      <div class="l-icon" id="dt-l-icon">
        <img src="assets/logo-512.png" style="width:100%;height:100%;object-fit:cover;border-radius:10px;" onerror="this.style.display='none'">
      </div>
      <div class="l-text">
        <div class="l-name" id="dt-l-name">MASIKI Fin</div>
        <div class="l-desc" id="dt-l-desc">Sistem Keuangan Pintar</div>
      </div>
    `;
    sb.appendChild(logoDiv);

    // Nav
    const nav = document.createElement('div');
    nav.id = 'dt-nav';
    NAV.forEach(item => {
      const btn = document.createElement('div');
      btn.className = 'dt-nav-item' + (item.id === 'dashboard' ? ' active' : '');
      btn.dataset.menu = item.id;
      btn.dataset.lbl  = item.lbl;
      btn.setAttribute('tabindex','0');
      btn.setAttribute('role','button');
      btn.setAttribute('aria-label', item.lbl);
      btn.innerHTML = `
        <span class="ni-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${item.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${item.icon}"/></svg>
        </span>
        <span class="ni-label">${item.lbl}</span>
      `;
      btn.addEventListener('click',  () => selectMenu(item.id));
      btn.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') selectMenu(item.id); });
      nav.appendChild(btn);
    });
    sb.appendChild(nav);

    // Divider
    const div1 = document.createElement('div'); div1.className = 'dt-div'; sb.appendChild(div1);

    // Quick action buttons
    const quick = document.createElement('div');
    quick.id = 'dt-quick';
    quick.innerHTML = `
      <button class="dt-qbtn inc" onclick="window.app&&app.openTransactionModal('income')" title="Pemasukan (Ctrl+I)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
        <span class="qb-lbl">Pemasukan</span>
        <span class="kbd">Ctrl+I</span>
      </button>
      <button class="dt-qbtn exp" onclick="window.app&&app.openTransactionModal('expense')" title="Pengeluaran (Ctrl+E)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
        <span class="qb-lbl">Pengeluaran</span>
        <span class="kbd">Ctrl+E</span>
      </button>
    `;
    sb.appendChild(quick);

    // Toggle collapse
    const toggle = document.createElement('div');
    toggle.id = 'dt-toggle';
    toggle.title = 'Toggle Sidebar';
    toggle.innerHTML = `<svg id="dt-toggle-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;
    toggle.addEventListener('click', toggleSidebar);
    sb.appendChild(toggle);

    /* ── Main ── */
    const main = document.createElement('div');
    main.id = 'dt-main';

    /* ── Topbar ── */
    const topbar = document.createElement('div');
    topbar.id = 'dt-topbar';
    topbar.innerHTML = `
      <div>
        <div id="dt-topbar-title">Beranda</div>
        <div id="dt-breadcrumb">Aplikasi / <span id="dt-bc-page">Dashboard</span></div>
      </div>
      <div id="dt-search">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input id="dt-search-inp" type="text" placeholder="Cari transaksi…" aria-label="Cari transaksi" />
      </div>
      <div id="dt-topbar-spacer"></div>
      <div id="dt-status"><div class="dot"></div><span id="dt-status-txt">Saldo: E£ 0</span></div>
      <button class="dt-tbtn" onclick="window.app&&app.toggleMode()" title="Mode Terang/Gelap" aria-label="Ganti mode">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
      <button class="dt-tbtn" onclick="window.app&&app.toggleGhostMode()" title="Mode Rahasia" aria-label="Mode rahasia">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
      </button>
      <button class="dt-tbtn" onclick="window.app&&app.openSettings()" title="Pengaturan" aria-label="Pengaturan">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      </button>
    `;

    /* ── Content row ── */
    const crow = document.createElement('div');
    crow.id = 'dt-content-row';

    /* ── Scroll area (move #app here) ── */
    const scroll = document.createElement('div');
    scroll.id = 'dt-scroll';
    scroll.appendChild(appEl);

    /* ── Right panel ── */
    const rp = document.createElement('div');
    rp.id = 'dt-rpanel';
    rp.innerHTML = `
      <div class="rp-sec">
        <div class="rp-sec-title">Ikhtisar Keuangan</div>
        <div class="rp-card">
          <div class="rp-card-lbl">Total Kekayaan</div>
          <div class="rp-card-val" id="rp-bal">E£ 0</div>
          <div class="rp-card-sec" id="rp-bal-sec">Rp 0</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
          <div class="rp-card">
            <div class="rp-card-lbl">Pemasukan</div>
            <div class="rp-card-val" id="rp-inc" style="color:#10b981;font-size:13px;">E£ 0</div>
          </div>
          <div class="rp-card">
            <div class="rp-card-lbl">Pengeluaran</div>
            <div class="rp-card-val" id="rp-exp" style="color:#ef4444;font-size:13px;">E£ 0</div>
          </div>
        </div>
      </div>
      <div class="rp-sec">
        <div class="rp-sec-title">Dompet</div>
        <div id="rp-wallets"><div style="color:#64748b;font-size:11px;text-align:center;padding:10px 0;">Memuat…</div></div>
      </div>
      <div class="rp-sec">
        <div class="rp-sec-title">Transaksi Terkini</div>
        <div id="rp-txlist"><div style="color:#64748b;font-size:11px;text-align:center;padding:12px 0;">Belum ada transaksi</div></div>
      </div>
      <div class="rp-sec" style="border:none;">
        <div class="rp-sec-title">Kurs (per 1 jt IDR)</div>
        <div id="rp-rates"></div>
      </div>
    `;

    crow.appendChild(scroll);
    crow.appendChild(rp);
    main.appendChild(topbar);
    main.appendChild(crow);
    shell.appendChild(sb);
    shell.appendChild(main);

    document.body.insertBefore(shell, document.body.firstChild);

    /* ── Search live filter ── */
    document.getElementById('dt-search-inp').addEventListener('input', function() {
      const q = this.value.toLowerCase();
      document.querySelectorAll('.transaction-item').forEach(el => {
        el.style.display = el.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });

    /* ── Kick off right panel polling ── */
    refreshRightPanel();
    setInterval(refreshRightPanel, 2000);
  }

  /* ─────────────────────────────────────────────────────────
     4. SIDEBAR COLLAPSE
  ───────────────────────────────────────────────────────── */
  let sidebarCollapsed = false;
  function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
    const sb = document.getElementById('dt-sidebar');
    if (sb) sb.classList.toggle('col', sidebarCollapsed);
  }

  /* ─────────────────────────────────────────────────────────
     5. MENU SELECTION
  ───────────────────────────────────────────────────────── */
  function selectMenu(id) {
    if (window.app && app.showMenu) app.showMenu(id);
    document.querySelectorAll('.dt-nav-item').forEach(b => b.classList.toggle('active', b.dataset.menu === id));
    const t = MENU_TITLES[id] || id;
    const titleEl = document.getElementById('dt-topbar-title');
    const bcEl    = document.getElementById('dt-bc-page');
    if (titleEl) titleEl.textContent = t;
    if (bcEl)    bcEl.textContent = t;
    refreshRightPanel();
  }

  /* ─────────────────────────────────────────────────────────
     6. RIGHT PANEL REFRESH
  ───────────────────────────────────────────────────────── */
  function refreshRightPanel() {
    if (!window.app || !window.NeuralEngine) return;
    try {
      const a = window.app, s = a.settings, NE = window.NeuralEngine, data = a.data || [];

      const inc = data.filter(t=>t.type==='income').reduce((sum,t)=>sum+t.amountInBase,0);
      const exp = data.filter(t=>t.type==='expense').reduce((sum,t)=>sum+t.amountInBase,0);
      const bal = inc - exp;

      const dBal = NE.getDualDisplay(bal, s);
      const dInc = NE.getDualDisplay(inc, s);
      const dExp = NE.getDualDisplay(exp, s);

      setText('rp-bal',     dBal.primary.formatted);
      setText('rp-bal-sec', dBal.secondary.formatted);
      setText('rp-inc',     dInc.primary.formatted);
      setText('rp-exp',     dExp.primary.formatted);
      setText('dt-status-txt', 'Saldo: ' + dBal.primary.formatted);

      // Wallets
      const wEl = document.getElementById('rp-wallets');
      if (wEl && s.wallets) {
        wEl.innerHTML = s.wallets.map(w => {
          const d = NE.getDualDisplay(w.balance, s);
          return `<div class="rp-wallet">
            <span class="rp-w-ico">${w.icon}</span>
            <div style="flex:1;min-width:0;">
              <div class="rp-w-name">${w.name}</div>
              <div class="rp-w-bal">${d.primary.formatted}</div>
            </div>
          </div>`;
        }).join('');
      }

      // Recent tx
      const txEl = document.getElementById('rp-txlist');
      if (txEl) {
        const recent = data.slice(0,8);
        if (!recent.length) {
          txEl.innerHTML = '<div style="color:#64748b;font-size:11px;text-align:center;padding:12px 0;">Belum ada transaksi</div>';
        } else {
          txEl.innerHTML = recent.map(t => {
            const cats = a.categories || {};
            const cat = (t.type==='income'?cats.income:cats.expense)?.find(c=>c.id===t.category)||{icon:'💵',color:'#6b7280'};
            const amt = NE.getDualDisplay(t.amountInBase,s).primary.formatted;
            return `<div class="rp-tx">
              <div class="rp-tx-ico" style="background:${cat.color}20">${cat.icon}</div>
              <div style="flex:1;min-width:0;">
                <div class="rp-tx-nm">${t.description||'-'}</div>
                <div class="rp-tx-dt">${t.date||''}</div>
              </div>
              <div class="rp-tx-amt" style="color:${t.type==='income'?'#10b981':'#ef4444'}">${t.type==='income'?'+':'-'}${amt}</div>
            </div>`;
          }).join('');
        }
      }

      // Rates
      const rEl = document.getElementById('rp-rates');
      if (rEl && s.currencies) {
        rEl.innerHTML = Object.values(s.currencies).map(c => {
          const r = parseFloat(c.ratePerMillion).toLocaleString('id-ID',{minimumFractionDigits:0,maximumFractionDigits:c.code==='BTC'?8:3});
          return `<div class="rp-rate"><span class="rp-rate-cc">${c.flag} ${c.code}</span><span class="rp-rate-val">${r}</span></div>`;
        }).join('');
      }

      // Sync sidebar identity
      const nm = document.getElementById('dt-l-name');
      const ds = document.getElementById('dt-l-desc');
      if (nm && s.appName) nm.textContent = s.appName;
      if (ds && s.appDescription) ds.textContent = s.appDescription;

    } catch(e) { /* silent — app may still be initializing */ }
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  /* ─────────────────────────────────────────────────────────
     7. DEVICE CLASS
  ───────────────────────────────────────────────────────── */
  function applyDeviceClass() {
    const w = window.innerWidth;
    document.body.classList.remove('is-desktop','is-tablet','is-mobile');
    document.body.classList.add(w>=1024?'is-desktop':w>=768?'is-tablet':'is-mobile');
  }
  applyDeviceClass();
  window.addEventListener('resize', applyDeviceClass);

  /* ─────────────────────────────────────────────────────────
     8. PATCH app.showMenu (intercept for sidebar sync)
  ───────────────────────────────────────────────────────── */
  function patchApp() {
    if (!window.app || !app.showMenu) return;
    if (app._dtPatched) return;
    app._dtPatched = true;
    const orig = app.showMenu.bind(app);
    app.showMenu = function(id) {
      orig(id);
      document.querySelectorAll('.dt-nav-item').forEach(b => b.classList.toggle('active', b.dataset.menu===id));
      const t = MENU_TITLES[id]||id;
      setText('dt-topbar-title', t);
      setText('dt-bc-page', t);
      refreshRightPanel();
    };
  }

  /* ─────────────────────────────────────────────────────────
     9. INIT
  ───────────────────────────────────────────────────────── */
  function init() {
    buildShell();
    patchApp();
    if (window.lucide) setTimeout(() => lucide.createIcons(), 120);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 80);
  }

})();
