/* ==========================================================
   Wavest — Meilleures combinaisons par pattern daily
   Données lues EN DIRECT depuis l'onglet "Combos stats" du
   Sheet "Trading 2026", publié en lecture seule (CSV).
   Seul cet onglet est publié : le reste du Sheet reste privé.
   Si le Sheet est injoignable, FALLBACK_DATA est affiché.
========================================================== */

(function () {
  "use strict";

  /* ----- CONFIG -----
     Colle ici le lien CSV obtenu via :
     Fichier → Partager → Publier sur le Web → onglet "Combos stats" → CSV
     Laisse vide pour n'afficher que les données de secours ci-dessous. */
  var SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRS8f3pckyq7CYSEsTDJhmfmBEAbZuG50RnSdZ2jxdvwc4w4X_IQqy4UCOsHbjJjXgHbY0PPlFXBSsG/pub?gid=631416664&single=true&output=csv";

  /* Données de secours (snapshot statique) */
  var FALLBACK_DATA = [
    {
      pattern: "ETE",
      best: "FC-27",
      trades: 11, wins: 8, losses: 2, winrate: 72.73, rr: 0.76, gain: 8.38, score: 6.09,
      all: [
        { ctx: "Deceleration", trades: 9, winrate: 44.44, rr: 0.33, score: 1.34 },
        { ctx: "ETE with bos", trades: 7, winrate: 42.86, rr: 0.56, score: 1.69 },
        { ctx: "ETE without bos", trades: 6, winrate: 66.67, rr: 0.30, score: 1.21 },
        { ctx: "FC-27", trades: 11, winrate: 72.73, rr: 0.76, score: 6.09 },
        { ctx: "FC-68", trades: 8, winrate: 50.00, rr: 0.91, score: 3.62 },
        { ctx: "W with bos", trades: 11, winrate: 63.64, rr: 0.54, score: 3.81 },
        { ctx: "W without bos", trades: 19, winrate: 47.37, rr: 0.04, score: 0.40 }
      ]
    },
    {
      pattern: "IETE",
      best: "M without bos",
      trades: 20, wins: 12, losses: 3, winrate: 60.00, rr: 0.90, gain: 17.93, score: 10.76,
      all: [
        { ctx: "Deceleration", trades: 10, winrate: 40.00, rr: 0.48, score: 1.94 },
        { ctx: "FC-27", trades: 6, winrate: 66.67, rr: 0.65, score: 2.60 },
        { ctx: "FC-68", trades: 5, winrate: 60.00, rr: 0.52, score: 1.57 },
        { ctx: "IETE with bos", trades: 10, winrate: 50.00, rr: 0.19, score: 0.94 },
        { ctx: "IETE without bos", trades: 6, winrate: 33.33, rr: -0.05, score: -0.10 },
        { ctx: "M with bos", trades: 9, winrate: 44.44, rr: 0.78, score: 3.13 },
        { ctx: "M without bos", trades: 20, winrate: 60.00, rr: 0.90, score: 10.76 },
        { ctx: "W without bos", trades: 1, winrate: 0.00, rr: 0.00, score: 0.00 }
      ]
    },
    {
      pattern: "M1 big",
      best: "M without bos",
      trades: 32, wins: 19, losses: 7, winrate: 59.38, rr: 0.96, gain: 30.81, score: 18.29,
      all: [
        { ctx: "Deceleration", trades: 2, winrate: 50.00, rr: 1.65, score: 1.65 },
        { ctx: "FC-27", trades: 2, winrate: 100.00, rr: 2.16, score: 4.31 },
        { ctx: "IETE with bos", trades: 10, winrate: 10.00, rr: -0.10, score: -0.10 },
        { ctx: "IETE without bos", trades: 7, winrate: 71.43, rr: 1.57, score: 7.84 },
        { ctx: "M with bos", trades: 15, winrate: 33.33, rr: -0.07, score: -0.37 },
        { ctx: "M without bos", trades: 32, winrate: 59.38, rr: 0.96, score: 18.29 },
        { ctx: "W without bos", trades: 1, winrate: 0.00, rr: -1.00, score: 0.00 }
      ]
    },
    {
      pattern: "M1 small",
      best: "M without bos",
      trades: 15, wins: 12, losses: 2, winrate: 80.00, rr: 1.29, gain: 19.36, score: 15.49,
      all: [
        { ctx: "Deceleration", trades: 13, winrate: 30.77, rr: 0.61, score: 2.45 },
        { ctx: "FC-27", trades: 8, winrate: 62.50, rr: 0.39, score: 1.96 },
        { ctx: "FC-68", trades: 3, winrate: 66.67, rr: 1.07, score: 2.14 },
        { ctx: "IETE with bos", trades: 2, winrate: 50.00, rr: 0.54, score: 0.54 },
        { ctx: "IETE without bos", trades: 5, winrate: 40.00, rr: 0.36, score: 0.73 },
        { ctx: "M with bos", trades: 3, winrate: 66.67, rr: 0.76, score: 1.52 },
        { ctx: "M without bos", trades: 15, winrate: 80.00, rr: 1.29, score: 15.49 },
        { ctx: "W without bos", trades: 1, winrate: 0.00, rr: 0.00, score: 0.00 }
      ]
    },
    {
      pattern: "M2",
      best: "IETE without bos",
      trades: 2, wins: 2, losses: 0, winrate: 100.00, rr: 3.36, gain: 6.71, score: 6.71,
      lowSample: true,
      all: [
        { ctx: "FC-27", trades: 6, winrate: 83.33, rr: 0.79, score: 3.96 },
        { ctx: "FC-68", trades: 3, winrate: 33.33, rr: 0.00, score: 0.00 },
        { ctx: "IETE with bos", trades: 5, winrate: 60.00, rr: 0.49, score: 1.47 },
        { ctx: "IETE without bos", trades: 2, winrate: 100.00, rr: 3.36, score: 6.71 },
        { ctx: "M without bos", trades: 5, winrate: 60.00, rr: 0.42, score: 1.27 }
      ]
    },
    {
      pattern: "M3",
      best: "IETE without bos",
      trades: 5, wins: 3, losses: 1, winrate: 60.00, rr: 0.68, gain: 3.42, score: 2.05,
      lowSample: true,
      all: [
        { ctx: "Deceleration", trades: 1, winrate: 0.00, rr: -1.00, score: 0.00 },
        { ctx: "FC-27", trades: 2, winrate: 100.00, rr: 1.21, score: 2.41 },
        { ctx: "FC-68", trades: 1, winrate: 0.00, rr: 0.00, score: 0.00 },
        { ctx: "IETE with bos", trades: 3, winrate: 0.00, rr: -0.67, score: 0.00 },
        { ctx: "IETE without bos", trades: 5, winrate: 60.00, rr: 0.68, score: 2.05 },
        { ctx: "M with bos", trades: 3, winrate: 33.33, rr: 0.06, score: 0.06 },
        { ctx: "M without bos", trades: 4, winrate: 75.00, rr: 0.68, score: 2.04 }
      ]
    },
    {
      pattern: "M4",
      best: "IETE with bos",
      trades: 10, wins: 4, losses: 3, winrate: 40.00, rr: 0.86, gain: 8.64, score: 3.46,
      all: [
        { ctx: "Deceleration", trades: 10, winrate: 30.00, rr: -0.02, score: -0.06 },
        { ctx: "FC-27", trades: 1, winrate: 0.00, rr: 0.00, score: 0.00 },
        { ctx: "IETE with bos", trades: 10, winrate: 40.00, rr: 0.86, score: 3.46 },
        { ctx: "IETE without bos", trades: 7, winrate: 42.86, rr: 0.32, score: 0.96 },
        { ctx: "M with bos", trades: 4, winrate: 100.00, rr: 1.25, score: 5.01 },
        { ctx: "M without bos", trades: 9, winrate: 66.67, rr: 0.94, score: 5.63 }
      ]
    },
    {
      pattern: "M5",
      best: "M without bos",
      trades: 31, wins: 19, losses: 9, winrate: 61.29, rr: 0.53, gain: 16.52, score: 10.13,
      all: [
        { ctx: "Deceleration", trades: 10, winrate: 40.00, rr: 0.17, score: 0.67 },
        { ctx: "IETE with bos", trades: 14, winrate: 42.86, rr: 0.31, score: 1.89 },
        { ctx: "IETE without bos", trades: 13, winrate: 46.15, rr: 0.50, score: 3.00 },
        { ctx: "M with bos", trades: 11, winrate: 54.55, rr: 0.25, score: 1.52 },
        { ctx: "M without bos", trades: 31, winrate: 61.29, rr: 0.53, score: 10.13 }
      ]
    },
    {
      pattern: "W1 big",
      best: "FC-27",
      trades: 2, wins: 2, losses: 0, winrate: 100.00, rr: 2.38, gain: 4.75, score: 4.75,
      lowSample: true,
      all: [
        { ctx: "Deceleration", trades: 3, winrate: 0.00, rr: -0.67, score: 0.00 },
        { ctx: "ETE with bos", trades: 11, winrate: 36.36, rr: 0.27, score: 1.10 },
        { ctx: "ETE without bos", trades: 13, winrate: 46.15, rr: 0.25, score: 1.47 },
        { ctx: "FC-27", trades: 2, winrate: 100.00, rr: 2.38, score: 4.75 },
        { ctx: "M without bos", trades: 4, winrate: 50.00, rr: 1.03, score: 2.06 },
        { ctx: "W with bos", trades: 9, winrate: 11.11, rr: -0.43, score: -0.43 },
        { ctx: "W without bos", trades: 21, winrate: 4.76, rr: -0.63, score: -0.63 }
      ]
    },
    {
      pattern: "W1 small",
      best: "W without bos",
      trades: 8, wins: 4, losses: 2, winrate: 50.00, rr: 0.72, gain: 5.78, score: 2.89,
      lowSample: true,
      all: [
        { ctx: "Deceleration", trades: 3, winrate: 33.33, rr: 0.00, score: 0.00 },
        { ctx: "ETE with bos", trades: 3, winrate: 66.67, rr: 1.55, score: 3.11 },
        { ctx: "ETE without bos", trades: 4, winrate: 75.00, rr: 0.36, score: 1.07 },
        { ctx: "FC-27", trades: 4, winrate: 50.00, rr: 0.79, score: 1.58 },
        { ctx: "FC-68", trades: 3, winrate: 33.33, rr: 0.33, score: 0.33 },
        { ctx: "IETE with bos", trades: 1, winrate: 100.00, rr: 1.39, score: 1.39 },
        { ctx: "W with bos", trades: 7, winrate: 42.86, rr: -0.30, score: -0.91 },
        { ctx: "W without bos", trades: 8, winrate: 50.00, rr: 0.72, score: 2.89 }
      ]
    },
    {
      pattern: "W2",
      best: "FC-68",
      trades: 5, wins: 4, losses: 0, winrate: 80.00, rr: 1.99, gain: 9.96, score: 7.97,
      lowSample: true,
      all: [
        { ctx: "Deceleration", trades: 2, winrate: 0.00, rr: 0.00, score: 0.00 },
        { ctx: "ETE with bos", trades: 3, winrate: 33.33, rr: 0.00, score: 0.00 },
        { ctx: "ETE without bos", trades: 4, winrate: 25.00, rr: -0.39, score: -0.39 },
        { ctx: "FC-27", trades: 3, winrate: 33.33, rr: -0.18, score: -0.18 },
        { ctx: "FC-68", trades: 5, winrate: 80.00, rr: 1.99, score: 7.97 },
        { ctx: "W with bos", trades: 2, winrate: 50.00, rr: 1.40, score: 1.40 },
        { ctx: "W without bos", trades: 4, winrate: 50.00, rr: -0.03, score: -0.05 }
      ]
    },
    {
      pattern: "W3",
      best: "FC-27",
      trades: 3, wins: 2, losses: 0, winrate: 66.67, rr: 1.38, gain: 4.15, score: 2.77,
      lowSample: true,
      all: [
        { ctx: "ETE with bos", trades: 1, winrate: 100.00, rr: 1.00, score: 1.00 },
        { ctx: "ETE without bos", trades: 2, winrate: 50.00, rr: 1.57, score: 1.57 },
        { ctx: "FC-27", trades: 3, winrate: 66.67, rr: 1.38, score: 2.77 },
        { ctx: "FC-68", trades: 3, winrate: 33.33, rr: -0.56, score: -0.56 },
        { ctx: "W without bos", trades: 5, winrate: 20.00, rr: -0.15, score: -0.15 }
      ]
    },
    {
      pattern: "W4",
      best: "W without bos",
      trades: 9, wins: 4, losses: 3, winrate: 44.44, rr: 0.65, gain: 5.82, score: 2.59,
      lowSample: true,
      all: [
        { ctx: "Deceleration", trades: 3, winrate: 0.00, rr: -0.33, score: -0.06 },
        { ctx: "ETE without bos", trades: 1, winrate: 0.00, rr: -1.00, score: 0.00 },
        { ctx: "FC-27", trades: 4, winrate: 25.00, rr: 0.65, score: 0.65 },
        { ctx: "FC-68", trades: 2, winrate: 50.00, rr: 2.74, score: 2.74 },
        { ctx: "W with bos", trades: 2, winrate: 0.00, rr: -0.50, score: 0.00 },
        { ctx: "W without bos", trades: 9, winrate: 44.44, rr: 0.65, score: 2.59 }
      ]
    },
    {
      pattern: "W5",
      best: "W without bos",
      trades: 22, wins: 17, losses: 3, winrate: 77.27, rr: 1.24, gain: 27.28, score: 21.08,
      all: [
        { ctx: "Deceleration", trades: 8, winrate: 50.00, rr: 0.58, score: 2.34 },
        { ctx: "ETE with bos", trades: 7, winrate: 42.86, rr: 0.12, score: 0.37 },
        { ctx: "ETE without bos", trades: 8, winrate: 25.00, rr: -0.02, score: -0.04 },
        { ctx: "IETE with bos", trades: 1, winrate: 0.00, rr: -1.00, score: 0.00 },
        { ctx: "M without bos", trades: 1, winrate: 100.00, rr: 1.93, score: 1.93 },
        { ctx: "W with bos", trades: 2, winrate: 0.00, rr: -0.50, score: 0.00 },
        { ctx: "W without bos", trades: 22, winrate: 77.27, rr: 1.24, score: 21.08 }
      ]
    }
  ];

  var DATA = FALLBACK_DATA;
  var DATA_SOURCE = "fallback"; // "live" | "fallback"
  var DATA_UPDATED_AT = null;

  /* Historique des trades (onglet « Historique » publié) : date | combo | gain */
  var HISTORY_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRS8f3pckyq7CYSEsTDJhmfmBEAbZuG50RnSdZ2jxdvwc4w4X_IQqy4UCOsHbjJjXgHbY0PPlFXBSsG/pub?gid=422127762&single=true&output=csv";
  var HISTORY = null;          // { "M5 | M without bos": [{ d: Date, g: 1.07 }, ...] }
  var HISTORY_FAILED = false;
  var CURRENT_MODAL = null;    // { p: pattern, ctx: combo affiché }
  var AVOID_MIN_TRADES = 5; // remplacé par la cellule J1 du Sheet quand il est chargé

  var LOW_SAMPLE_THRESHOLD = 10;
  // Combo fiable = au moins 10 trades, RR moyen positif, score > 5 %
  var RELIABLE_MIN_TRADES = 10;
  var RELIABLE_MIN_RR = 0;
  var RELIABLE_MIN_SCORE = 5;

  function fmtPct(n) {
    return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%";
  }

  function cls(n) {
    return n > 0 ? "is-positive" : (n < 0 ? "is-negative" : "");
  }

  var LABELS = {
    winrate: { fr: "Winrate", en: "Winrate" },
    rr: { fr: "RR moyen", en: "Avg RR" },
    score: { fr: "Score", en: "Score" },
    trades: { fr: "trades", en: "trades" },
    lowSample: { fr: "Échantillon faible", en: "Small sample" },
    reliable: { fr: "Combo fiable", en: "Reliable combo" },
    details: { fr: "Voir les autres combos testées", en: "See other combos tested" },
    context: { fr: "Contexte", en: "Context" },
    avoid: { fr: "À éviter", en: "Avoid" },
    sample: { fr: "Échantillon", en: "Sample" },
    gain: { fr: "Gain total", en: "Total gain" },
    consistency: { fr: "Régularité", en: "Consistency" },
    sampleBar: { fr: "Échantillon", en: "Sample" },
    check: { fr: "Vérifier un setup", en: "Check a setup" },
    checkShort: { fr: "Vérifier", en: "Check" },
    evoTitle: { fr: "Évolution dans le temps", en: "Evolution over time" },
    evoHint: { fr: "Clique sur une ligne du tableau pour voir sa courbe.", en: "Click a row in the table to see its curve." },
    evoLoading: { fr: "Chargement de l'historique…", en: "Loading history…" },
    evoFew: { fr: "Pas encore assez de trades pour tracer une courbe.", en: "Not enough trades yet to draw a curve." },
    evoCum: { fr: "Gain cumulé", en: "Cumulative gain" },
    evoRecent: { fr: "6 derniers mois", en: "Last 6 months" },
    evoGlobal: { fr: "Depuis le début", en: "All time" },
    evoUp: { fr: "↗ En progression", en: "↗ Improving" },
    evoDown: { fr: "↘ En baisse", en: "↘ Declining" },
    evoFlat: { fr: "→ Stable", en: "→ Stable" },
    evoNone: { fr: "Pas assez de trades récents", en: "Not enough recent trades" },
    live: { fr: "Données en direct depuis le backtest", en: "Live data from the backtest" },
    updated: { fr: "actualisées à", en: "refreshed at" },
    offline: { fr: "Données de la dernière version enregistrée", en: "Data from the last saved version" },
    loading: { fr: "Chargement des données…", en: "Loading data…" }
  };

  function getLang() {
    try {
      if (window.WavestI18n && typeof window.WavestI18n.getLang === "function") {
        return window.WavestI18n.getLang();
      }
    } catch (e) {}
    return "fr";
  }

  function t(key) {
    var lang = getLang();
    var entry = LABELS[key];
    if (!entry) return "";
    return entry[lang] || entry.fr;
  }

  /* ---------- Visuels : anneaux, jauge, hexagone ---------- */

  function esc(v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function clamp01(n) { return Math.max(0, Math.min(1, n || 0)); }

  function toneWinrate(w) { return w > 50 ? "good" : (w >= 40 ? "mid" : "bad"); }
  function toneRR(r) { return r > 0.5 ? "good" : (r > 0 ? "mid" : "bad"); }
  function toneScore(s) { return s > 5 ? "good" : (s > 0 ? "mid" : "bad"); }

  function maxOf(key) {
    return DATA.reduce(function (m, p) { return Math.max(m, p[key] || 0); }, 0) || 1;
  }

  function ring(valueText, fill, tone, label, size) {
    var pct = Math.round(clamp01(fill) * 100);
    return '<div class="perf-ring perf-ring--' + tone + (size ? ' perf-ring--' + size : '') + '">' +
      '<div class="perf-ring-dial">' +
        '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
          '<circle class="perf-ring-track" cx="32" cy="32" r="27"></circle>' +
          '<circle class="perf-ring-bar" cx="32" cy="32" r="27" pathLength="100" style="stroke-dasharray:' + pct + ' 100"></circle>' +
        '</svg>' +
        '<span class="perf-ring-v">' + valueText + '</span>' +
      '</div>' +
      '<span class="perf-ring-l">' + label + '</span>' +
    '</div>';
  }

  function ringsFor(p, size) {
    var maxScore = maxOf("score");
    return ring(fmtPct(p.winrate), p.winrate / 100, toneWinrate(p.winrate), t("winrate"), size) +
      ring(fmtPct(p.rr), p.rr / 2, toneRR(p.rr), t("rr"), size) +
      ring(fmtPct(p.score), p.score / maxScore, toneScore(p.score), t("score"), size);
  }

  function sampleBar(trades) {
    var fill = clamp01(trades / RELIABLE_MIN_TRADES);
    var tone = trades >= RELIABLE_MIN_TRADES ? "good" : (trades >= AVOID_MIN_TRADES ? "mid" : "bad");
    return '<div class="combo-sample combo-sample--' + tone + '">' +
      '<div class="combo-sample-head"><span>' + t("sampleBar") + '</span><span>' + (trades >= RELIABLE_MIN_TRADES ? trades + ' ' + t("trades") + ' ✓' : trades + ' / ' + RELIABLE_MIN_TRADES + ' ' + t("trades")) + '</span></div>' +
      '<div class="combo-sample-track"><span style="width:' + Math.round(fill * 100) + '%"></span></div>' +
    '</div>';
  }

  // Hexagone : 6 axes, chaque valeur ramenée entre 0 et 1
  function radar(p) {
    var wl = (p.wins || 0) + (p.losses || 0);
    var axes = [
      { label: t("winrate"), value: fmtPct(p.winrate), v: p.winrate / 100 },
      { label: t("rr"), value: fmtPct(p.rr), v: p.rr / maxOf("rr") },
      { label: t("score"), value: fmtPct(p.score), v: p.score / maxOf("score") },
      { label: t("sample"), value: p.trades + " " + t("trades"), v: p.trades / maxOf("trades") },
      { label: t("gain"), value: fmtPct(p.gain || 0), v: (p.gain || 0) / maxOf("gain") },
      { label: t("consistency"), value: wl ? Math.round(p.wins / wl * 100) + "%" : "–", v: wl ? p.wins / wl : 0 }
    ];
    var cx = 150, cy = 130, R = 88, n = axes.length;

    function pt(i, r) {
      var a = -Math.PI / 2 + i * 2 * Math.PI / n;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    }
    function poly(r) {
      var out = [];
      for (var i = 0; i < n; i++) { var q = pt(i, r); out.push(q[0].toFixed(1) + "," + q[1].toFixed(1)); }
      return out.join(" ");
    }

    var grid = "";
    [0.25, 0.5, 0.75, 1].forEach(function (k) {
      grid += '<polygon class="radar-grid" points="' + poly(R * k) + '"></polygon>';
    });
    var spokes = "", labels = "", dots = "", shape = [];
    axes.forEach(function (ax, i) {
      var end = pt(i, R);
      spokes += '<line class="radar-spoke" x1="' + cx + '" y1="' + cy + '" x2="' + end[0].toFixed(1) + '" y2="' + end[1].toFixed(1) + '"></line>';
      var q = pt(i, R * Math.max(0.04, clamp01(ax.v)));
      shape.push(q[0].toFixed(1) + "," + q[1].toFixed(1));
      dots += '<circle class="radar-dot" cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="3.5"></circle>';
      var l = pt(i, R + 22);
      var anchor = Math.abs(l[0] - cx) < 4 ? "middle" : (l[0] > cx ? "start" : "end");
      var dy = l[1] < cy - 10 ? -6 : (l[1] > cy + 10 ? 8 : 0);
      labels += '<text class="radar-label" x="' + l[0].toFixed(1) + '" y="' + (l[1] + dy).toFixed(1) + '" text-anchor="' + anchor + '">' +
        '<tspan class="radar-label-name">' + esc(ax.label) + '</tspan>' +
        '<tspan class="radar-label-value" x="' + l[0].toFixed(1) + '" dy="13">' + esc(ax.value) + '</tspan>' +
      '</text>';
    });

    return '<svg class="combo-radar-svg" viewBox="-70 -6 440 282" role="img" aria-label="' + esc(p.pattern + " → " + p.best) + '">' +
      grid + spokes +
      '<polygon class="radar-shape" points="' + shape.join(" ") + '"></polygon>' +
      dots + labels +
    '</svg>';
  }

  /* Lien vers le Trade Checker pré-rempli avec le pattern et la confirmation */
  var BULLISH_CONFS = ["IETE with bos", "IETE without bos", "M with bos", "M without bos"];

  function checkerUrl(pattern, ctx) {
    var p = pattern;
    if (pattern === "EDGE") p = BULLISH_CONFS.indexOf(ctx) >= 0 ? "EDGE BULLISH" : "EDGE BEARISH";
    return "trade-checker.html?pattern=" + encodeURIComponent(p) + "&conf=" + encodeURIComponent(ctx);
  }

  function renderHighlight() {
    var best = DATA.reduce(function (acc, p) {
      return p.score > acc.score ? p : acc;
    }, DATA[0]);

    var nameEl = document.getElementById("comboHighlightName");
    var statsEl = document.getElementById("comboHighlightStats");
    if (!nameEl || !statsEl) return;

    nameEl.textContent = best.pattern + " → " + best.best;

    var statWinrate = t("winrate");
    var statRR = t("rr");
    var statScore = t("score");
    var tradesSuffix = t("trades");

    var radarEl = document.getElementById("comboRadar");
    if (radarEl) radarEl.innerHTML = radar(best);

    statsEl.innerHTML = '<div class="perf-rings perf-rings--lg">' + ringsFor(best, "lg") + '</div>';
  }

  function renderGrid() {
    var grid = document.getElementById("comboGrid");
    if (!grid) return;

    var statWinrate = t("winrate");
    var statRR = t("rr");
    var statScore = t("score");
    var tradesSuffix = t("trades");
    var lowSampleLabel = t("lowSample");
    var reliableLabel = t("reliable");
    var detailsLabel = t("details");

    var html = DATA.map(function (p, idx) {
      var isLow = p.lowSample || p.trades < LOW_SAMPLE_THRESHOLD;
      var isReliable = p.trades >= RELIABLE_MIN_TRADES && p.rr > RELIABLE_MIN_RR && p.score > RELIABLE_MIN_SCORE;

      return (
        '<div class="combo-card' + (isReliable ? ' combo-card--reliable' : '') + '">' +
          (isReliable ? '<span class="combo-card-ribbon">' + reliableLabel + '</span>' : '') +
          '<span class="combo-card-pattern">' + p.pattern + '</span>' +
          '<div class="combo-card-name"><span class="arrow">→</span>' + p.best + '</div>' +
          '<div class="perf-rings">' + ringsFor(p) + '</div>' +
          sampleBar(p.trades) +
          (isLow ? '<div class="combo-card-meta"><span class="combo-low-sample">⚠ ' + lowSampleLabel + '</span></div>' : '') +
          '<button type="button" class="combo-card-details-btn" data-combo-idx="' + idx + '">' +
            '<span>' + detailsLabel + '</span><span class="arrow">→</span>' +
          '</button>' +
          '<a class="combo-card-check" href="' + checkerUrl(p.pattern, p.best) + '">' +
            '<span>' + t("check") + '</span><span class="arrow">✓</span>' +
          '</a>' +
        '</div>'
      );
    }).join("");

    grid.innerHTML = html;

    var buttons = grid.querySelectorAll("[data-combo-idx]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function (e) {
        var idx = parseInt(e.currentTarget.getAttribute("data-combo-idx"), 10);
        openComboModal(DATA[idx]);
      });
    }
  }

  /* ---------- Évolution d'un combo ---------- */

  function trendOf(list) {
    var cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - 6);
    var recent = list.filter(function (x) { return x.d >= cutoff; });
    var wr = function (a) { return a.length ? a.filter(function (x) { return x.g > 0; }).length / a.length * 100 : 0; };
    var res = { global: wr(list), recent: wr(recent), nRecent: recent.length, nAll: list.length };
    if (recent.length < 3) res.tone = "none";
    else if (res.recent - res.global >= 10) res.tone = "up";
    else if (res.global - res.recent >= 10) res.tone = "down";
    else res.tone = "flat";
    return res;
  }

  function trendBadge(tr) {
    var key = { up: "evoUp", down: "evoDown", flat: "evoFlat", none: "evoNone" }[tr.tone];
    return '<span class="evo-badge evo-badge--' + tr.tone + '">' + t(key) + '</span>';
  }

  function monthLabel(d) {
    return d.toLocaleDateString(getLang() === "en" ? "en-GB" : "fr-FR", { month: "short", year: "numeric" });
  }

  function evoChart(list) {
    var W = 320, H = 130, PX = 8, PT = 10, PB = 22;
    var cum = [0], acc = 0;
    list.forEach(function (x) { acc += x.g; cum.push(acc); });
    var min = Math.min.apply(null, cum.concat([0])), max = Math.max.apply(null, cum.concat([0]));
    if (max - min < 1) { max += 0.5; min -= 0.5; }
    var n = cum.length - 1;
    var X = function (i) { return PX + (i / n) * (W - 2 * PX); };
    var Y = function (v) { return PT + (max - v) / (max - min) * (H - PT - PB); };
    var pts = cum.map(function (v, i) { return X(i).toFixed(1) + "," + Y(v).toFixed(1); });
    var zero = Y(0).toFixed(1);
    var tone = acc >= 0 ? "good" : "bad";
    var area = "M" + X(0).toFixed(1) + "," + zero + " L" + pts.join(" L") + " L" + X(n).toFixed(1) + "," + zero + " Z";
    var last = pts[pts.length - 1].split(",");
    return '<svg class="evo-svg evo-svg--' + tone + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + t("evoCum") + '">' +
      '<line class="evo-zero" x1="' + PX + '" x2="' + (W - PX) + '" y1="' + zero + '" y2="' + zero + '"></line>' +
      '<path class="evo-area" d="' + area + '"></path>' +
      '<polyline class="evo-line" points="' + pts.join(" ") + '"></polyline>' +
      '<circle class="evo-dot" cx="' + last[0] + '" cy="' + last[1] + '" r="3.5"></circle>' +
      '<text class="evo-axis" x="' + PX + '" y="' + (H - 6) + '">' + esc(monthLabel(list[0].d)) + '</text>' +
      '<text class="evo-axis" x="' + (W - PX) + '" y="' + (H - 6) + '" text-anchor="end">' + esc(monthLabel(list[list.length - 1].d)) + '</text>' +
    '</svg>';
  }

  function renderEvo(pattern, ctx) {
    var box = document.getElementById("comboModalEvo");
    if (!box) return;
    if (HISTORY_FAILED || !HISTORY_CSV_URL) { box.innerHTML = ""; return; }

    var head = '<div class="evo-head"><p class="mod-tag">' + t("evoTitle") + '</p><strong>' + esc(ctx) + '</strong></div>';
    if (!HISTORY) { box.innerHTML = head + '<p class="evo-note">' + t("evoLoading") + '</p>'; return; }

    var list = HISTORY[pattern + " | " + ctx] || [];
    if (list.length < 2) {
      box.innerHTML = head + '<p class="evo-note">' + t("evoFew") + '</p><p class="evo-hint">' + t("evoHint") + '</p>';
      return;
    }
    var tr = trendOf(list);
    var total = list.reduce(function (a, x) { return a + x.g; }, 0);

    box.innerHTML = head +
      '<div class="evo-chart">' + evoChart(list) +
        '<span class="evo-total ' + cls(total) + '">' + t("evoCum") + ' : ' + fmtPct(total) + '</span>' +
      '</div>' +
      '<div class="evo-stats">' +
        '<div><span class="l">' + t("evoRecent") + '</span><span class="v">' + (tr.nRecent ? fmtPct(tr.recent) : "–") + ' <em>(' + tr.nRecent + ' ' + t("trades") + ')</em></span></div>' +
        '<div><span class="l">' + t("evoGlobal") + '</span><span class="v">' + fmtPct(tr.global) + ' <em>(' + tr.nAll + ' ' + t("trades") + ')</em></span></div>' +
        trendBadge(tr) +
      '</div>' +
      '<p class="evo-hint">' + t("evoHint") + '</p>';
  }

  function parseHistDate(s) {
    s = String(s || "").trim();
    var m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
    m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (m) return new Date(+m[3], +m[2] - 1, +m[1]);
    return null;
  }

  function loadHistory() {
    if (!HISTORY_CSV_URL || !window.fetch) { HISTORY_FAILED = true; return; }
    fetch(HISTORY_CSV_URL, { cache: "no-store" })
      .then(function (res) { if (!res.ok) throw new Error("HTTP " + res.status); return res.text(); })
      .then(function (text) {
        var rows = parseCSV(text), h = {};
        for (var i = 1; i < rows.length; i++) {
          var r = rows[i], d = parseHistDate(r[0]), combo = (r[1] || "").trim();
          if (!d || combo.indexOf(" | ") < 0) continue;
          var raw = String(r[2] == null ? "" : r[2]);
          var g = raw.indexOf("%") >= 0 ? toNum(raw) : toNum(raw) * 100; // 0,0229 -> 2,29 %
          (h[combo] = h[combo] || []).push({ d: d, g: g });
        }
        Object.keys(h).forEach(function (k) { h[k].sort(function (a, b) { return a.d - b.d; }); });
        HISTORY = h;
        if (CURRENT_MODAL) openComboModal(CURRENT_MODAL.p, CURRENT_MODAL.ctx);
      })
      .catch(function (err) {
        HISTORY_FAILED = true;
        if (window.console) console.warn("[Wavest] Historique indisponible.", err);
        if (CURRENT_MODAL) renderEvo(CURRENT_MODAL.p.pattern, CURRENT_MODAL.ctx);
      });
  }

  function openComboModal(p, focusCtx) {
    var modal = document.getElementById("comboModal");
    if (!modal || !p) return;

    var statWinrate = t("winrate");
    var statRR = t("rr");
    var statScore = t("score");
    var thContext = t("context");
    var thTrades = t("trades");

    var patternBadge = document.getElementById("comboModalPatternBadge");
    var patternLabel = document.getElementById("comboModalPattern");
    var title = document.getElementById("comboModalTitle");
    var thead = modal.querySelector(".combo-modal-table thead tr");
    var tbody = document.getElementById("comboModalTbody");

    if (patternBadge) patternBadge.textContent = p.pattern.slice(0, 2);
    if (patternLabel) patternLabel.textContent = p.pattern;
    if (title) title.textContent = "→ " + p.best;

    var modalRadar = document.getElementById("comboModalRadar");
    if (modalRadar) modalRadar.innerHTML = radar(p);

    var maxAbs = p.all.reduce(function (m, r) { return Math.max(m, Math.abs(r.score)); }, 0) || 1;
    var focus = focusCtx || p.best;
    CURRENT_MODAL = { p: p, ctx: focus };

    if (thead) {
      thead.innerHTML =
        '<th>' + thContext + '</th><th>' + thTrades + '</th><th>' + statWinrate + '</th><th>' + statRR + '</th><th>' + statScore + '</th><th aria-hidden="true"></th>';
    }

    var rows = p.all
      .slice()
      .sort(function (a, b) { return b.score - a.score; })
      .map(function (row) {
        var isBest = row.ctx === p.best;
        var isAvoid = !isBest && row.score < 0 && row.trades >= AVOID_MIN_TRADES;
        var hist = HISTORY && HISTORY[p.pattern + " | " + row.ctx];
        var ico = "";
        if (hist && hist.length >= 2) {
          var tr = trendOf(hist);
          ico = tr.tone === "none" ? "" : ' <span class="evo-ico evo-ico--' + tr.tone + '" title="' + t({ up: "evoUp", down: "evoDown", flat: "evoFlat" }[tr.tone]) + '">' + ({ up: "↗", down: "↘", flat: "→" }[tr.tone]) + '</span>';
        }
        var classes = [isBest ? "is-best" : (isAvoid ? "is-avoid" : ""), row.ctx === focus ? "is-focus" : ""].join(" ").trim();
        return '<tr class="' + classes + '" data-ctx="' + esc(row.ctx) + '">' +
          '<td>' + row.ctx + ico + (isAvoid ? ' <span class="combo-avoid-tag">' + t("avoid") + '</span>' : '') + '</td>' +
          '<td>' + row.trades + '</td>' +
          '<td>' + fmtPct(row.winrate) + '</td>' +
          '<td>' + fmtPct(row.rr) + '</td>' +
          '<td class="score-cell"><span class="score-num">' + fmtPct(row.score) + '</span><span class="score-track"><span class="score-bar score-bar--' + toneScore(row.score) + '" style="width:' + Math.max(4, Math.round(Math.abs(row.score) / maxAbs * 100)) + '%"></span></span></td>' +
          '<td class="check-cell"><a class="combo-check-link" href="' + checkerUrl(p.pattern, row.ctx) + '" aria-label="' + t("check") + ' : ' + esc(p.pattern + ' | ' + row.ctx) + '">' + t("checkShort") + ' →</a></td>' +
          '</tr>';
      })
      .join("");

    if (tbody) {
      tbody.innerHTML = rows;
      tbody.onclick = function (e) {
        if (e.target.closest("a")) return;
        var trEl = e.target.closest("tr[data-ctx]");
        if (!trEl) return;
        var ctx = trEl.getAttribute("data-ctx");
        CURRENT_MODAL.ctx = ctx;
        Array.prototype.forEach.call(tbody.querySelectorAll("tr"), function (x) { x.classList.toggle("is-focus", x === trEl); });
        renderEvo(p.pattern, ctx);
      };
    }
    renderEvo(p.pattern, focus);

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("combo-modal-open");
  }

  function closeComboModal() {
    var modal = document.getElementById("comboModal");
    if (!modal) return;
    CURRENT_MODAL = null;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("combo-modal-open");
  }

  function bindModal() {
    var modal = document.getElementById("comboModal");
    if (!modal) return;
    var closers = modal.querySelectorAll("[data-combo-modal-close]");
    for (var i = 0; i < closers.length; i++) {
      closers[i].addEventListener("click", closeComboModal);
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeComboModal();
    });
  }


  /* ---------- Lecture du Sheet publié ---------- */

  function parseCSV(text) {
    var rows = [], row = [], field = "", inQuotes = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; }
          else inQuotes = false;
        } else field += c;
      } else if (c === '"') inQuotes = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
      else if (c !== "\r") field += c;
    }
    if (field !== "" || row.length) { row.push(field); rows.push(row); }
    return rows;
  }

  function toNum(v) {
    var s = String(v == null ? "" : v).replace(/[\s  %]/g, "").replace(",", ".").replace("−", "-");
    var n = parseFloat(s);
    return isNaN(n) ? 0 : n;
  }

  // Valeur en % : "44,44%" -> 44.44 ; 0.4444 (non formaté) -> 44.44
  function toPct(v) {
    var s = String(v == null ? "" : v);
    var n = toNum(s);
    return s.indexOf("%") >= 0 ? n : Math.round(n * 10000) / 100;
  }

  function buildDataFromCSV(text) {
    var rows = parseCSV(text);
    if (!rows.length) return null;

    var minTrades = toNum(rows[0] && rows[0][9]) || 5; // cellule J1 du Sheet
    AVOID_MIN_TRADES = minTrades;
    var groups = [], byPattern = {};

    for (var i = 1; i < rows.length; i++) {
      var r = rows[i];
      var combo = (r[0] || "").trim();
      var sep = combo.indexOf(" | ");
      if (sep < 0) continue;

      var pattern = combo.slice(0, sep).trim();
      var ctx = combo.slice(sep + 3).trim();
      if (!pattern || !ctx) continue;

      if (!byPattern[pattern]) {
        byPattern[pattern] = { pattern: pattern, all: [], bestLabel: "" };
        groups.push(byPattern[pattern]);
      }
      var g = byPattern[pattern];
      g.all.push({
        ctx: ctx,
        trades: toNum(r[1]),
        wins: toNum(r[2]),
        losses: toNum(r[3]),
        winrate: toPct(r[4]),
        rr: toPct(r[5]),
        gain: toPct(r[6]),
        score: toPct(r[7])
      });
      var bestCell = (r[8] || "").trim();
      if (bestCell && !g.bestLabel) g.bestLabel = bestCell;
    }

    var data = groups.map(function (g) {
      var best = null;

      // 1. Le "Best combo" calculé dans le Sheet (colonne I)
      if (g.bestLabel) {
        var lbl = g.bestLabel;
        var cut = lbl.indexOf(" | ");
        var bestCtx = cut >= 0 ? lbl.slice(cut + 3).trim() : lbl;
        for (var k = 0; k < g.all.length; k++) {
          if (g.all[k].ctx === bestCtx) { best = g.all[k]; break; }
        }
      }

      // 2. Sinon : meilleur score parmi les combos avec assez de trades
      if (!best) {
        var pool = g.all.filter(function (c) { return c.trades >= minTrades; });
        if (!pool.length) pool = g.all;
        best = pool.reduce(function (a, c) { return c.score > a.score ? c : a; }, pool[0]);
      }

      return {
        pattern: g.pattern,
        best: best.ctx,
        trades: best.trades, wins: best.wins, losses: best.losses,
        winrate: best.winrate, rr: best.rr, gain: best.gain, score: best.score,
        lowSample: best.trades < LOW_SAMPLE_THRESHOLD,
        all: g.all
      };
    });

    return data.length ? data : null;
  }

  function renderStatus() {
    var el = document.getElementById("perfLiveStatus");
    if (!el) return;
    if (DATA_SOURCE === "loading") {
      el.className = "perf-live-status is-loading";
      el.textContent = t("loading");
    } else if (DATA_SOURCE === "live") {
      var time = DATA_UPDATED_AT
        ? DATA_UPDATED_AT.toLocaleTimeString(getLang() === "en" ? "en-GB" : "fr-FR", { hour: "2-digit", minute: "2-digit" })
        : "";
      el.className = "perf-live-status is-live";
      el.innerHTML = '<span class="dot" aria-hidden="true"></span>' + t("live") + (time ? " · " + t("updated") + " " + time : "");
    } else {
      el.className = "perf-live-status is-offline";
      el.textContent = t("offline");
    }
  }

  function renderAll() {
    renderHighlight();
    renderGrid();
    renderStatus();
  }

  function loadLiveData() {
    if (!SHEET_CSV_URL || !window.fetch) {
      DATA_SOURCE = "fallback";
      renderStatus();
      return;
    }
    DATA_SOURCE = "loading";
    renderStatus();

    fetch(SHEET_CSV_URL, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then(function (text) {
        var live = buildDataFromCSV(text);
        if (!live) throw new Error("CSV vide ou illisible");
        DATA = live;
        DATA_SOURCE = "live";
        DATA_UPDATED_AT = new Date();
        renderAll();
      })
      .catch(function (err) {
        if (window.console) console.warn("[Wavest] Combos stats indisponibles, données de secours affichées.", err);
        DATA = FALLBACK_DATA;
        DATA_SOURCE = "fallback";
        renderAll();
      });
  }

  // Re-dessine après le changement de langue (i18n.js met à jour <html lang>)
  function bindLangToggle() {
    if (window.MutationObserver) {
      new MutationObserver(renderAll).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["lang"]
      });
    } else {
      var toggle = document.getElementById("langToggle");
      if (toggle) toggle.addEventListener("click", function () { setTimeout(renderAll, 0); });
    }
  }

  function init() {
    renderAll();
    bindLangToggle();
    bindModal();
    loadLiveData();
    loadHistory();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
