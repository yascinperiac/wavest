/* Wavest — Trade de la semaine (accueil)
   Source : onglet "Trades" du Sheet publié (trades réels uniquement).
   Colonnes repérées par leur en-tête : PAIR, DATE, PATTERN, GOOD TRADE, P&L,
   4h PATTERN, COMMENTS, weekly url / daily url / 4h url / after url.
   Mis à jour automatiquement à chaque nouveau trade saisi. */
(function () {
  "use strict";
  var URL_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRS8f3pckyq7CYSEsTDJhmfmBEAbZuG50RnSdZ2jxdvwc4w4X_IQqy4UCOsHbjJjXgHbY0PPlFXBSsG/pub?gid=138516929&single=true&output=csv";
  var box = document.getElementById("tradeWeek");
  if (!box || !window.fetch) return;

  var TXT = {
    fr: {
      eyebrow: "Trade de la semaine", eyebrowLast: "Dernier trade",
      title: "Un vrai trade, mis à jour automatiquement depuis mon journal.",
      pair: "Paire", combo: "Combo", result: "Résultat", date: "Date", note: "Mon commentaire",
      week: "Cette semaine", trades: "trades", trade: "trade", won: "gagnant", wonP: "gagnants", total: "total",
      none: "Pas de trade cette semaine : je ne force jamais un setup. Voici le dernier trade pris.",
      stats: "Voir les stats de ce combo", open: "Ouvrir sur TradingView", zoom: "Agrandir le graph", close: "Fermer",
      noimg: "Graph disponible sur TradingView",
      q: { GGood: "Bon trade", GBad: "Erreur", GBe: "Break-even" },
      disc: "Résultat passé, il ne préjuge pas des résultats futurs. Le trading comporte un risque de perte en capital."
    },
    en: {
      eyebrow: "Trade of the week", eyebrowLast: "Latest trade",
      title: "A real trade, updated automatically from my journal.",
      pair: "Pair", combo: "Combo", result: "Result", date: "Date", note: "My comment",
      week: "This week", trades: "trades", trade: "trade", won: "winner", wonP: "winners", total: "total",
      none: "No trade this week: I never force a setup. Here is the latest trade taken.",
      stats: "See this combo's stats", open: "Open on TradingView", zoom: "Enlarge chart", close: "Close",
      noimg: "Chart available on TradingView",
      q: { GGood: "Good trade", GBad: "Mistake", GBe: "Break-even" },
      disc: "Past result, not indicative of future results. Trading involves a risk of capital loss."
    }
  };
  function lang() {
    var l = (window.WavestI18n && window.WavestI18n.getLang && window.WavestI18n.getLang()) || document.documentElement.lang || "fr";
    return String(l).slice(0, 2) === "en" ? "en" : "fr";
  }
  function t(k) { return TXT[lang()][k]; }

  function parseCSV(text) {
    var rows = [], row = [], f = "", q = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
      else if (c === '"') q = true;
      else if (c === ",") { row.push(f); f = ""; }
      else if (c === "\n") { row.push(f); rows.push(row); row = []; f = ""; }
      else if (c !== "\r") f += c;
    }
    if (f !== "" || row.length) { row.push(f); rows.push(row); }
    return rows;
  }
  function toNum(v) {
    var n = parseFloat(String(v == null ? "" : v).replace(/[\s  %]/g, "").replace(",", ".").replace("−", "-"));
    return isNaN(n) ? null : n;
  }
  var MONTHS = { janv: 0, jan: 0, fevr: 1, fev: 1, feb: 1, mars: 2, mar: 2, avr: 3, apr: 3, mai: 4, may: 4, juin: 5, jun: 5,
    juil: 6, jul: 6, aout: 7, aug: 7, sept: 8, sep: 8, oct: 9, nov: 10, dec: 11 };
  function parseDate(s) {
    s = String(s || "").trim();
    var m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
    m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (m) return new Date(+m[3], +m[2] - 1, +m[1]);
    // "17-août-2026", "1-sept.-2026", "1 oct. 2026"
    m = s.match(/^(\d{1,2})[\s\-.]+([^\s\-\d.]+)\.?[\s\-.]+(\d{4})/);
    if (m) {
      var k = m[2].toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\./g, "");
      var mo = MONTHS[k]; if (mo == null) mo = MONTHS[k.slice(0, 4)]; if (mo == null) mo = MONTHS[k.slice(0, 3)];
      if (mo != null) return new Date(+m[3], mo, +m[1]);
    }
    return null;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function pct(n) {
    return (n > 0 ? "+" : "") + n.toLocaleString(lang() === "en" ? "en-US" : "fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " %";
  }
  function fmtDate(d) {
    var s = d.toLocaleDateString(lang() === "en" ? "en-GB" : "fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  function fmtPair(p) { p = String(p || "").trim().toUpperCase(); return /^[A-Z]{6}$/.test(p) ? p.slice(0, 3) + "/" + p.slice(3) : p; }
  function tvId(url) { var m = String(url || "").match(/tradingview\.com\/x\/([A-Za-z0-9]+)/); return m ? m[1] : null; }
  function tvImg(id) { return "https://s3.tradingview.com/snapshots/" + id.charAt(0).toLowerCase() + "/" + id + ".png"; }

  /* ---- lecture de l'onglet Trades ---- */
  function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9&]+/g, " ").trim(); }
  function build(rows) {
    var hi = -1;
    for (var i = 0; i < Math.min(rows.length, 15); i++) {
      if (rows[i].some(function (c) { return /^pair\b/.test(norm(c)); })) { hi = i; break; }
    }
    if (hi < 0) throw new Error("En-tête PAIR introuvable");
    var H = rows[hi].map(norm), col = {};
    H.forEach(function (h, i) {
      if (/^pair\b/.test(h)) col.pair = i;
      else if (/^date\b/.test(h)) col.date = i;
      else if (/^4h pattern/.test(h)) col.ctx = i;
      else if (/^pattern\b/.test(h) && col.pattern == null) col.pattern = i;
      else if (/^good trade/.test(h)) col.q = i;
      else if (/^p&l|^p l\b|^pnl/.test(h)) col.pnl = i;
      else if (/^comment/.test(h)) col.note = i;
      else if (/url/.test(h)) {
        if (/weekly/.test(h)) col.uW = i; else if (/daily/.test(h)) col.uD = i;
        else if (/4h|4 h|h4/.test(h)) col.u4 = i; else if (/after|apres/.test(h)) col.uA = i;
      }
    });
    var out = [];
    for (var r = hi + 1; r < rows.length; r++) {
      var x = rows[r], d = parseDate(x[col.date]), pair = (x[col.pair] || "").trim(), pat = (x[col.pattern] || "").trim();
      var g = toNum(x[col.pnl]);
      if (!d || !pair || !pat || g == null) continue; // trade en cours ou ligne de mois
      var raw = String(x[col.pnl]);
      if (raw.indexOf("%") < 0) g = g * 100;
      var shots = [];
      [["Weekly", col.uW], ["Daily", col.uD], ["4H", col.u4], ["After", col.uA]].forEach(function (s) {
        var url = s[1] != null ? (x[s[1]] || "").trim() : "", id = tvId(url);
        if (id) shots.push({ label: s[0], url: url, id: id });
      });
      out.push({ d: d, pair: pair, pattern: pat, ctx: (x[col.ctx] || "").trim(), q: (x[col.q] || "").trim(), g: g,
        note: col.note != null ? (x[col.note] || "").trim() : "", shots: shots });
    }
    out.sort(function (a, b) { return a.d - b.d; });
    return out;
  }

  var DATA = null, PICK = null, SHOT = -1; // -1 = dernière vue dispo (After, sinon 4H…)

  function render() {
    if (!DATA || !DATA.length) return;
    var now = new Date(); now.setHours(23, 59, 59, 999);
    var from = new Date(now); from.setDate(from.getDate() - 7);
    var week = DATA.filter(function (x) { return x.d > from && x.d <= now; });
    var inWeek = week.length > 0;
    var pick = inWeek ? week.slice().sort(function (a, b) { return b.g - a.g || b.d - a.d; })[0] : DATA[DATA.length - 1];
    var href = "/pages/performance-patterns.html?pattern=" + encodeURIComponent(pick.pattern) + (pick.ctx ? "&ctx=" + encodeURIComponent(pick.ctx) : "");
    var cls = pick.g > 0 ? "is-pos" : (pick.g < 0 ? "is-neg" : "");
    var qTxt = t("q")[pick.q] || "";
    PICK = pick;
    if (SHOT < 0 || SHOT >= pick.shots.length) SHOT = pick.shots.length - 1;
    var shot = pick.shots[SHOT];

    var media = "";
    if (shot) {
      media = '<div class="tw-media">' +
        '<button type="button" class="tw-shot" data-zoom aria-label="' + t("zoom") + '">' +
          '<img src="' + tvImg(shot.id) + '" alt="' + esc(fmtPair(pick.pair) + " — " + shot.label) + '" loading="lazy" onerror="this.parentNode.classList.add(\'is-noimg\')">' +
          '<span class="tw-zoomhint" aria-hidden="true">⤢</span>' +
          '<span class="tw-noimg">📈 ' + t("noimg") + ' →</span>' +
        '</button>' +
        (pick.shots.length > 1 ? '<div class="tw-tabs" role="tablist">' + pick.shots.map(function (s, i) {
          return '<button type="button" role="tab" aria-selected="' + (i === SHOT) + '" data-shot="' + i + '">' + s.label + '</button>';
        }).join("") + '</div>' : "") +
      '</div>';
    }

    var recap;
    if (inWeek) {
      var w = week.filter(function (x) { return x.g > 0; }).length;
      var tot = week.reduce(function (a, x) { return a + x.g; }, 0);
      recap = '<p class="tw-recap"><strong>' + t("week") + '</strong> · ' + week.length + ' ' + (week.length > 1 ? t("trades") : t("trade")) +
        ' · ' + w + ' ' + (w > 1 ? t("wonP") : t("won")) +
        ' · <span class="' + (tot > 0 ? "is-pos" : (tot < 0 ? "is-neg" : "")) + '">' + pct(tot) + ' ' + t("total") + '</span></p>';
    } else {
      recap = '<p class="tw-recap">' + t("none") + '</p>';
    }

    box.innerHTML =
      '<div class="tw-head">' +
        '<span class="about-eyebrow"><span class="tw-live" aria-hidden="true"></span>' + (inWeek ? t("eyebrow") : t("eyebrowLast")) + '</span>' +
        '<h3 class="toolbox-title">' + t("title") + '</h3>' +
      '</div>' +
      '<div class="tw-card' + (shot ? " has-media" : "") + '">' +
        media +
        '<div class="tw-info">' +
          '<div class="tw-top"><strong class="tw-pair">' + esc(fmtPair(pick.pair)) + '</strong>' +
            (qTxt ? '<span class="tw-q tw-q--' + esc(pick.q.toLowerCase()) + '">' + qTxt + '</span>' : "") + '</div>' +
          '<div class="tw-grid">' +
            '<div><span class="tw-l">' + t("combo") + '</span><strong>' + esc(pick.pattern) + '</strong>' + (pick.ctx ? '<span class="tw-ctx">→ ' + esc(pick.ctx) + '</span>' : "") + '</div>' +
            '<div><span class="tw-l">' + t("result") + '</span><strong class="tw-res ' + cls + '">' + pct(pick.g) + '</strong></div>' +
            '<div class="tw-span"><span class="tw-l">' + t("date") + '</span><strong>' + fmtDate(pick.d) + '</strong></div>' +
          '</div>' +
          (pick.note ? '<blockquote class="tw-note"><span class="tw-l">' + t("note") + '</span>' + esc(pick.note) + '</blockquote>' : "") +
          '<a class="tw-link" href="' + href + '">' + t("stats") + ' →</a>' +
        '</div>' +
        recap +
        '<p class="tw-disc">' + t("disc") + '</p>' +
      '</div>';
    box.hidden = false;
  }

  /* ---- pop-up (lightbox) ---- */
  var LB = null, lastFocus = null;
  function lbTabs() {
    return PICK.shots.length > 1 ? '<div class="tw-tabs tw-lb-tabs" role="tablist">' + PICK.shots.map(function (s, i) {
      return '<button type="button" role="tab" aria-selected="' + (i === SHOT) + '" data-lbshot="' + i + '">' + s.label + '</button>';
    }).join("") + '</div>' : "";
  }
  function lbRender() {
    var sh = PICK.shots[SHOT];
    LB.innerHTML =
      '<div class="tw-lb-dialog" role="dialog" aria-modal="true" aria-label="' + esc(fmtPair(PICK.pair) + " — " + sh.label) + '">' +
        '<div class="tw-lb-bar"><strong>' + esc(fmtPair(PICK.pair)) + ' · ' + sh.label + '</strong>' +
          '<button type="button" class="tw-lb-close" data-lbclose aria-label="' + t("close") + '">✕</button></div>' +
        '<div class="tw-lb-img"><img src="' + tvImg(sh.id) + '" alt="' + esc(fmtPair(PICK.pair) + " — " + sh.label) + '" onerror="this.parentNode.classList.add(\'is-noimg\')">' +
          '<a class="tw-noimg" href="' + esc(sh.url) + '" target="_blank" rel="noopener noreferrer">📈 ' + t("noimg") + ' →</a></div>' +
        '<div class="tw-lb-foot">' + lbTabs() +
          '<a class="tw-lb-tv" href="' + esc(sh.url) + '" target="_blank" rel="noopener noreferrer">' + t("open") + ' ↗</a></div>' +
      '</div>';
  }
  function openLB() {
    if (!PICK || !PICK.shots.length) return;
    lastFocus = document.activeElement;
    if (!LB) { LB = document.createElement("div"); LB.className = "tw-lb"; document.body.appendChild(LB); }
    lbRender();
    document.documentElement.classList.add("tw-lb-open");
    requestAnimationFrame(function () { LB.classList.add("is-open"); });
    var c = LB.querySelector(".tw-lb-close"); if (c) c.focus();
  }
  function closeLB() {
    if (!LB || !LB.classList.contains("is-open")) return;
    LB.classList.remove("is-open");
    document.documentElement.classList.remove("tw-lb-open");
    render();
    if (lastFocus && lastFocus.focus) { var z = box.querySelector("[data-zoom]"); (z || lastFocus).focus(); }
  }
  document.addEventListener("click", function (e) {
    if (!LB || !LB.classList.contains("is-open")) return;
    var b = e.target.closest && e.target.closest("[data-lbshot]");
    if (b) { SHOT = +b.getAttribute("data-lbshot"); lbRender(); return; }
    if (e.target === LB || (e.target.closest && e.target.closest("[data-lbclose]"))) closeLB();
  });
  document.addEventListener("keydown", function (e) {
    if (!LB || !LB.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLB();
    else if ((e.key === "ArrowRight" || e.key === "ArrowLeft") && PICK.shots.length > 1) {
      SHOT = (SHOT + (e.key === "ArrowRight" ? 1 : -1) + PICK.shots.length) % PICK.shots.length; lbRender();
    }
  });

  box.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("[data-zoom]")) {
      var z = e.target.closest("[data-zoom]");
      if (z.classList.contains("is-noimg")) { window.open(PICK.shots[SHOT].url, "_blank", "noopener"); return; }
      openLB(); return;
    }
    var b = e.target.closest && e.target.closest("[data-shot]");
    if (!b) return;
    SHOT = +b.getAttribute("data-shot");
    render();
  });

  fetch(URL_CSV, { cache: "no-store" })
    .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
    .then(function (text) { DATA = build(parseCSV(text)); render(); })
    .catch(function (e) { if (window.console) console.warn("[Wavest] Trade de la semaine indisponible.", e); });

  new MutationObserver(function () { render(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();
