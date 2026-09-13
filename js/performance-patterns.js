/* ==========================================================
   Wavest — Meilleures combinaisons par pattern daily
   Données reprises manuellement du Sheet "Trading 2026"
   (onglet Combos stats), colonne "Best combo" — choix de
   Yascin, pas un simple max automatique.
========================================================== */

(function () {
  "use strict";

  var DATA = [
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

  var LOW_SAMPLE_THRESHOLD = 10;
  var RELIABLE_MIN_TRADES = 10;
  var RELIABLE_MIN_WINRATE = 50;
  var RELIABLE_MIN_RR = 1;

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
    context: { fr: "Contexte", en: "Context" }
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

    statsEl.innerHTML =
      '<div class="combo-stat-chip"><span class="v ' + cls(best.winrate - 50) + '">' + fmtPct(best.winrate) + '</span><span class="l">' + statWinrate + '</span></div>' +
      '<div class="combo-stat-chip"><span class="v ' + cls(best.rr) + '">' + fmtPct(best.rr) + '</span><span class="l">' + statRR + '</span></div>' +
      '<div class="combo-stat-chip"><span class="v ' + cls(best.score) + '">' + fmtPct(best.score) + '</span><span class="l">' + statScore + '</span></div>' +
      '<div class="combo-stat-chip"><span class="v">' + best.trades + '</span><span class="l">' + tradesSuffix + '</span></div>';
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
      var isReliable = p.trades > RELIABLE_MIN_TRADES && p.winrate > RELIABLE_MIN_WINRATE && p.rr > RELIABLE_MIN_RR;

      return (
        '<div class="combo-card' + (isReliable ? ' combo-card--reliable' : '') + '">' +
          (isReliable ? '<span class="combo-card-ribbon">' + reliableLabel + '</span>' : '') +
          '<span class="combo-card-pattern">' + p.pattern + '</span>' +
          '<div class="combo-card-name"><span class="arrow">→</span>' + p.best + '</div>' +
          '<div class="combo-card-stats">' +
            '<div class="combo-card-stat"><span class="v ' + cls(p.winrate - 50) + '">' + fmtPct(p.winrate) + '</span><span class="l">' + statWinrate + '</span></div>' +
            '<div class="combo-card-stat"><span class="v ' + cls(p.rr) + '">' + fmtPct(p.rr) + '</span><span class="l">' + statRR + '</span></div>' +
            '<div class="combo-card-stat"><span class="v ' + cls(p.score) + '">' + fmtPct(p.score) + '</span><span class="l">' + statScore + '</span></div>' +
          '</div>' +
          '<div class="combo-card-meta">' +
            '<span>' + p.trades + ' ' + tradesSuffix + '</span>' +
            (isLow ? '<span class="combo-low-sample">⚠ ' + lowSampleLabel + '</span>' : '') +
          '</div>' +
          '<button type="button" class="combo-card-details-btn" data-combo-idx="' + idx + '">' +
            '<span>' + detailsLabel + '</span><span class="arrow">→</span>' +
          '</button>' +
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

  function openComboModal(p) {
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

    if (thead) {
      thead.innerHTML =
        '<th>' + thContext + '</th><th>' + thTrades + '</th><th>' + statWinrate + '</th><th>' + statRR + '</th><th>' + statScore + '</th>';
    }

    var rows = p.all
      .slice()
      .sort(function (a, b) { return b.score - a.score; })
      .map(function (row) {
        var isBest = row.ctx === p.best;
        return '<tr class="' + (isBest ? "is-best" : "") + '">' +
          '<td>' + row.ctx + '</td>' +
          '<td>' + row.trades + '</td>' +
          '<td>' + fmtPct(row.winrate) + '</td>' +
          '<td>' + fmtPct(row.rr) + '</td>' +
          '<td>' + fmtPct(row.score) + '</td>' +
          '</tr>';
      })
      .join("");

    if (tbody) tbody.innerHTML = rows;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("combo-modal-open");
  }

  function closeComboModal() {
    var modal = document.getElementById("comboModal");
    if (!modal) return;
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

  function bindLangToggle() {
    var toggle = document.getElementById("langToggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        renderHighlight();
        renderGrid();
      });
    }
  }

  function init() {
    renderHighlight();
    renderGrid();
    bindLangToggle();
    bindModal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
