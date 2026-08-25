/* ============================================================
   DASHBOARD DE PROGRESSION — logique isolée (chargé après app.js)
============================================================ */

(() => {
  "use strict";

  const STORAGE_KEY = "wavest-dashboard-csv-url";

  const MONTHS_FR = {
    janv: 0, févr: 1, mars: 2, avr: 3, mai: 4, juin: 5,
    juil: 6, août: 7, sept: 8, oct: 9, nov: 10, déc: 11,
  };

  const MONTH_LABELS = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
  ];

  /* =====================================================
     1. ÉLÉMENTS DOM
  ===================================================== */

  const dashCsvUrl = document.getElementById("dashCsvUrl");
  const dashConnectBtn = document.getElementById("dashConnectBtn");
  const dashStatus = document.getElementById("dashStatus");
  const dashContent = document.getElementById("dashContent");
  const dashConnectedAs = document.getElementById("dashConnectedAs");
  const dashChangeSheetBtn = document.getElementById("dashChangeSheetBtn");

  const statTotal = document.getElementById("statTotal");
  const statWinrate = document.getElementById("statWinrate");
  const statTotalPnl = document.getElementById("statTotalPnl");
  const statBestDay = document.getElementById("statBestDay");
  const statWorstDay = document.getElementById("statWorstDay");
  const statAvgWin = document.getElementById("statAvgWin");
  const statAvgLoss = document.getElementById("statAvgLoss");
  const statProfitFactor = document.getElementById("statProfitFactor");

  const dashPieStage = document.getElementById("dashPieStage");
  const dashPieSvg = document.getElementById("dashPieSvg");
  const dashPieCallouts = document.getElementById("dashPieCallouts");
  const dashPieLegend = document.getElementById("dashPieLegend");
  const dashPieTotal = document.getElementById("dashPieTotal");
  const dashMonthLabel = document.getElementById("dashMonthLabel");
  const dashCalendarGrid = document.getElementById("dashCalendarGrid");
  const dashPrevBtn = document.getElementById("dashPrevBtn");
  const dashTodayBtn = document.getElementById("dashTodayBtn");
  const dashNextBtn = document.getElementById("dashNextBtn");

  let dashEquitySvg = document.getElementById("dashEquitySvg");
  const dashEquitySummary = document.getElementById("dashEquitySummary");
  const dashEquityTooltip = document.getElementById("dashEquityTooltip");

  let trades = [];
  let byDate = {};
  let viewDate = new Date();
  viewDate.setDate(1);

  /* =====================================================
     2. PARSEUR CSV (gère les champs entre guillemets,
        les virgules et retours à la ligne à l'intérieur)
  ===================================================== */

  function parseCSV(text) {
    const rows = [];
    let row = [];
    let field = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const next = text[i + 1];

      if (inQuotes) {
        if (char === '"' && next === '"') {
          field += '"';
          i++;
        } else if (char === '"') {
          inQuotes = false;
        } else {
          field += char;
        }
      } else if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        row.push(field);
        field = "";
      } else if (char === "\n" || char === "\r") {
        if (char === "\r" && next === "\n") i++;
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else {
        field += char;
      }
    }

    if (field.length > 0 || row.length > 0) {
      row.push(field);
      rows.push(row);
    }

    return rows;
  }

  /* =====================================================
     3. PARSING DATE FR / POURCENTAGE
  ===================================================== */

  function parseFrenchDate(str) {
    if (!str) return null;
    const parts = str.trim().split("-");
    if (parts.length < 3) return null;

    const day = parseInt(parts[0], 10);
    const monthKey = parts[1].replace(".", "").trim().toLowerCase();
    const year = parseInt(parts[2], 10);
    const month = MONTHS_FR[monthKey];

    if (isNaN(day) || month === undefined || isNaN(year)) return null;

    const date = new Date(year, month, day);
    return isNaN(date.getTime()) ? null : date;
  }

  function parsePercent(str) {
    if (!str) return null;
    const cleaned = str.replace(/"/g, "").replace("%", "").replace(",", ".").trim();
    if (cleaned === "") return null;
    const val = parseFloat(cleaned);
    return isNaN(val) ? null : val;
  }

  function isoDate(d) {
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  /* =====================================================
     4. RÉCUPÉRATION + EXTRACTION DES TRADES
  ===================================================== */

  function findColumnIndex(headerRow, keywords) {
    for (let i = 0; i < headerRow.length; i++) {
      const cell = (headerRow[i] || "").toLowerCase();
      if (keywords.some((k) => cell.includes(k))) return i;
    }
    return -1;
  }

  function extractTrades(rows) {
    let headerIdx = -1;

    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].map((c) => (c || "").toLowerCase());
      if (cells.some((c) => c.includes("pair")) && cells.some((c) => c.includes("date"))) {
        headerIdx = i;
        break;
      }
    }

    if (headerIdx === -1) {
      throw new Error("Colonnes Pair / Date introuvables dans ce fichier.");
    }

    const headerRow = rows[headerIdx];
    const pairIdx = findColumnIndex(headerRow, ["pair"]);
    const dateIdx = findColumnIndex(headerRow, ["date"]);
    const pnlIdx = findColumnIndex(headerRow, ["p&l", "p&amp;l", "pnl"]);
    const afterUrlIdx = findColumnIndex(headerRow, ["after url", "after_url"]);

    if (pairIdx === -1 || dateIdx === -1 || pnlIdx === -1) {
      throw new Error("Colonnes Pair, Date ou P&L introuvables dans ce fichier.");
    }

    const results = [];

    for (let i = headerIdx + 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length <= Math.max(pairIdx, dateIdx, pnlIdx)) continue;

      const dateStr = row[dateIdx];
      const pnlStr = row[pnlIdx];
      if (!dateStr || !pnlStr) continue; // lignes de sous-total mensuel ou trades en cours

      const date = parseFrenchDate(dateStr);
      const pnl = parsePercent(pnlStr);
      if (!date || pnl === null) continue;

      const pair = (row[pairIdx] || "").trim();
      const afterUrl = afterUrlIdx !== -1 ? (row[afterUrlIdx] || "").trim() : "";

      results.push({ date, pnl, pair, afterUrl });
    }

    if (results.length === 0) {
      throw new Error("Aucun trade valide trouvé — vérifie le format de tes colonnes Date et P&L.");
    }

    results.sort((a, b) => a.date - b.date);
    return results;
  }

  /* =====================================================
     5. AGRÉGATION PAR JOUR
  ===================================================== */

  function buildByDate(list) {
    const map = {};
    list.forEach((t) => {
      const key = isoDate(t.date);
      if (!map[key]) map[key] = { total: 0, pairs: new Set(), trades: [] };
      map[key].total += t.pnl;
      map[key].pairs.add(t.pair);
      map[key].trades.push(t);
    });
    return map;
  }

  /* =====================================================
     6. STATS
  ===================================================== */

  function formatPct(value) {
    const sign = value > 0 ? "+" : "";
    return `${sign}${value.toFixed(2)}%`;
  }

  function renderStats(list, dailyMap) {
    const wins = list.filter((t) => t.pnl > 0);
    const losses = list.filter((t) => t.pnl < 0);

    const total = list.length;
    const winrate = total > 0 ? (wins.length / total) * 100 : 0;
    const totalPnl = list.reduce((sum, t) => sum + t.pnl, 0);

    const dayTotals = Object.values(dailyMap).map((d) => d.total);
    const bestDay = dayTotals.length ? Math.max(...dayTotals) : 0;
    const worstDay = dayTotals.length ? Math.min(...dayTotals) : 0;

    const avgWin = wins.length ? wins.reduce((s, t) => s + t.pnl, 0) / wins.length : 0;
    const avgLoss = losses.length ? losses.reduce((s, t) => s + t.pnl, 0) / losses.length : 0;

    const grossWin = wins.reduce((s, t) => s + t.pnl, 0);
    const grossLoss = Math.abs(losses.reduce((s, t) => s + t.pnl, 0));
    const profitFactor = grossLoss > 0 ? grossWin / grossLoss : grossWin > 0 ? Infinity : 0;

    statTotal.textContent = total;
    statWinrate.textContent = `${winrate.toFixed(1)}%`;

    statTotalPnl.textContent = formatPct(totalPnl);
    statTotalPnl.className = totalPnl >= 0 ? "is-positive" : "is-negative";

    statBestDay.textContent = formatPct(bestDay);
    statBestDay.className = "is-positive";

    statWorstDay.textContent = formatPct(worstDay);
    statWorstDay.className = "is-negative";

    statAvgWin.textContent = formatPct(avgWin);
    statAvgWin.className = "is-positive";

    statAvgLoss.textContent = formatPct(avgLoss);
    statAvgLoss.className = "is-negative";

    statProfitFactor.textContent = isFinite(profitFactor) ? profitFactor.toFixed(2) : "∞";
  }

  /* =====================================================
     6bis. RÉPARTITION TP / SL / BE (anneau 3D premium)
     TP = trade clôturé positif, SL = clôturé négatif,
     BE = clôturé pile à 0 (même logique que le calendrier).
  ===================================================== */

  let lastPieSegments = null;
  let lastPieTotal = 0;
  let pieAnimFrame = null;
  let lastCalloutBoxes = [];

  // Géométrie de l'anneau (coordonnées du viewBox SVG). Les parts tapissent
  // l'anneau bord à bord (pas d'écartement) : pas de trous ni de recouvrement
  // entre elles, donc pas besoin de fond de secours.
  const PIE_VIEW_W = 640;
  const PIE_VIEW_H = 460;
  const PIE_CENTER_X = 300;
  const PIE_CENTER_Y = 185;
  const PIE_RX = 150;
  const PIE_RY = PIE_RX * 0.55;
  const PIE_INNER_RX = PIE_RX * 0.56;
  const PIE_INNER_RY = PIE_RY * 0.56;
  const PIE_DEPTH = 44;

  // Emplacements possibles des étiquettes autour de l'anneau (fractions du
  // viewBox) — plus nombreux que de parts : on choisit ensuite, pour chaque
  // rendu, la combinaison qui colle le mieux à l'angle réel de chaque part,
  // pour que les lignes ne se croisent jamais par-dessus l'anneau.
  const PIE_CALLOUT_SLOTS = [
    { x: 0.06, y: 0.08 },
    { x: 0.94, y: 0.08 },
    { x: 0.97, y: 0.5 },
    { x: 0.03, y: 0.5 },
    { x: 0.82, y: 0.95 },
    { x: 0.18, y: 0.95 },
  ];

  function renderPieChart(list) {
    const tp = list.filter((t) => t.pnl > 0).length;
    const sl = list.filter((t) => t.pnl < 0).length;
    const be = list.filter((t) => t.pnl === 0).length;
    const total = tp + sl + be;

    if (pieAnimFrame) {
      cancelAnimationFrame(pieAnimFrame);
      pieAnimFrame = null;
    }

    if (dashPieTotal) dashPieTotal.textContent = total || "-";

    if (total === 0) {
      if (dashPieSvg) dashPieSvg.innerHTML = "";
      if (dashPieCallouts) dashPieCallouts.innerHTML = "";
      dashPieLegend.innerHTML = '<li class="pie3d-empty">Pas encore de trades.</li>';
      lastPieSegments = null;
      lastCalloutBoxes = [];
      return;
    }

    const segments = [
      { key: "tp", label: "Take Profit", count: tp, color: "var(--pie-tp)", deep: "var(--pie-tp-deep)" },
      { key: "sl", label: "Stop Loss", count: sl, color: "var(--pie-sl)", deep: "var(--pie-sl-deep)" },
      { key: "be", label: "Break Even", count: be, color: "var(--pie-be)", deep: "var(--pie-be-deep)" },
    ].filter((s) => s.count > 0);

    let acc = 0;
    segments.forEach((s) => {
      const from = (acc / total) * 360;
      acc += s.count;
      const to = (acc / total) * 360;
      s.fromAngle = from;
      s.toAngle = to;
      s.midDeg = (from + to) / 2;
      s.pct = (s.count / total) * 100;
    });

    dashPieLegend.innerHTML = segments
      .map((s) => {
        return `
          <li class="is-${s.key}">
            <span class="pie3d-dot"></span>
            <div class="pie3d-info">
              <div class="pie3d-info-top">
                <span class="pie3d-label">${s.label}</span>
                <span class="pie3d-value">${s.count} · ${s.pct.toFixed(1)}%</span>
              </div>
              <div class="pie3d-bar"><span style="width:${s.pct.toFixed(1)}%"></span></div>
            </div>
          </li>`;
      })
      .join("");

    lastPieSegments = segments;
    lastPieTotal = total;
    renderPieSvg(segments);
  }

  /* =====================================================
     6ter. ANNEAU 3D
     Chaque part est un secteur annulaire (arc extérieur + arc intérieur,
     tracés en SVG). L'extrusion reprend le principe "pièce de monnaie" :
     une copie assombrie, décalée vers le bas, est recouverte par sa propre
     face du dessus — seul le bord avant (en bas) reste visible, ce qui
     donne l'épaisseur 3D sans jamais déborder sur les parts voisines
     puisqu'elles se touchent pile bord à bord (aucun écart entre elles).
  ===================================================== */

  function ellipsePt(cx, cy, rx, ry, deg) {
    const rad = (deg * Math.PI) / 180;
    return [cx + rx * Math.sin(rad), cy - ry * Math.cos(rad)];
  }

  function annularSectorPath(cx, cy, rx, ry, irx, iry, a0, a1) {
    if (a1 <= a0) return "";
    const outerStart = ellipsePt(cx, cy, rx, ry, a0);
    const outerEnd = ellipsePt(cx, cy, rx, ry, a1);
    const innerEnd = ellipsePt(cx, cy, irx, iry, a1);
    const innerStart = ellipsePt(cx, cy, irx, iry, a0);
    const largeArc = a1 - a0 > 180 ? 1 : 0;
    const f = (n) => n.toFixed(2);
    return (
      `M ${f(outerStart[0])},${f(outerStart[1])} ` +
      `A ${f(rx)} ${f(ry)} 0 ${largeArc} 1 ${f(outerEnd[0])},${f(outerEnd[1])} ` +
      `L ${f(innerEnd[0])},${f(innerEnd[1])} ` +
      `A ${f(irx)} ${f(iry)} 0 ${largeArc} 0 ${f(innerStart[0])},${f(innerStart[1])} Z`
    );
  }

  function renderPieSvg(segments) {
    if (!dashPieSvg) return;
    dashPieSvg.innerHTML = "";
    if (dashPieCallouts) dashPieCallouts.innerHTML = "";
    lastCalloutBoxes = [];

    const svgNS = "http://www.w3.org/2000/svg";
    const addEl = (parent, tag, attrs) => {
      const el = document.createElementNS(svgNS, tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      parent.appendChild(el);
      return el;
    };

    // Dégradés glacés (léger reflet en haut) pour un rendu premium plutôt
    // que des aplats mats.
    const defs = addEl(dashPieSvg, "defs", {});
    segments.forEach((s) => {
      const grad = addEl(defs, "linearGradient", {
        id: `pieGrad-${s.key}`,
        x1: "0", y1: "0", x2: "0", y2: "1",
      });
      addEl(grad, "stop", { offset: "0%", "stop-color": `color-mix(in oklab, ${s.color} 62%, white)` });
      addEl(grad, "stop", { offset: "100%", "stop-color": s.color });
    });

    const depthLayer = addEl(dashPieSvg, "g", { class: "pie3d-ring-depth" });
    const topLayer = addEl(dashPieSvg, "g", { class: "pie3d-ring-top" });
    const linesGroup = addEl(dashPieSvg, "g", { class: "pie3d-lines-group" });

    const duration = 900;
    const t0 = performance.now();
    function step(now) {
      const raw = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - raw, 3);
      const sweepEnd = 360 * eased;

      depthLayer.innerHTML = "";
      topLayer.innerHTML = "";
      segments.forEach((s) => {
        const a0 = Math.min(s.fromAngle, sweepEnd);
        const a1 = Math.min(s.toAngle, sweepEnd);
        if (a1 <= a0) return;
        addEl(depthLayer, "path", {
          d: annularSectorPath(PIE_CENTER_X, PIE_CENTER_Y + PIE_DEPTH, PIE_RX, PIE_RY, PIE_INNER_RX, PIE_INNER_RY, a0, a1),
          fill: s.deep,
        });
        addEl(topLayer, "path", {
          d: annularSectorPath(PIE_CENTER_X, PIE_CENTER_Y, PIE_RX, PIE_RY, PIE_INNER_RX, PIE_INNER_RY, a0, a1),
          fill: `url(#pieGrad-${s.key})`,
          stroke: "var(--card)",
          "stroke-width": "1.5",
          "stroke-linejoin": "round",
        });
      });

      if (raw < 1) {
        pieAnimFrame = requestAnimationFrame(step);
      } else {
        pieAnimFrame = null;
        renderPieCallouts(segments, linesGroup);
      }
    }
    pieAnimFrame = requestAnimationFrame(step);
  }

  function renderPieCallouts(segments, linesGroup) {
    if (!dashPieCallouts || !linesGroup || !dashPieStage) return;
    linesGroup.innerHTML = "";
    dashPieCallouts.innerHTML = "";
    lastCalloutBoxes = [];
    if (!segments.length) return;

    const svgNS = "http://www.w3.org/2000/svg";
    const addEl = (parent, tag, attrs) => {
      const el = document.createElementNS(svgNS, tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      parent.appendChild(el);
      return el;
    };

    // Assigne chaque part au slot dont l'angle colle le mieux au sien (recherche
    // globale, pas gloutonne), pour que la ligne de rappel reste courte et ne
    // traverse jamais l'anneau.
    const angleDiff = (a, b) => {
      const d = Math.abs(a - b) % 360;
      return d > 180 ? 360 - d : d;
    };
    const slotAngle = (slot) =>
      (Math.atan2(slot.x * PIE_VIEW_W - PIE_CENTER_X, -(slot.y * PIE_VIEW_H - PIE_CENTER_Y)) * 180) / Math.PI;
    const slotAngles = PIE_CALLOUT_SLOTS.map(slotAngle);

    let bestCost = Infinity;
    let bestCombo = null;
    (function search(remaining, chosen) {
      if (chosen.length === segments.length) {
        let cost = 0;
        for (let i = 0; i < segments.length; i++) cost += angleDiff(segments[i].midDeg, slotAngles[chosen[i]]);
        if (cost < bestCost) {
          bestCost = cost;
          bestCombo = chosen.slice();
        }
        return;
      }
      for (let i = 0; i < remaining.length; i++) {
        const idx = remaining[i];
        chosen.push(idx);
        search(remaining.slice(0, i).concat(remaining.slice(i + 1)), chosen);
        chosen.pop();
      }
    })(PIE_CALLOUT_SLOTS.map((_, i) => i), []);

    const stageRect = dashPieStage.getBoundingClientRect();
    const scaleX = stageRect.width / PIE_VIEW_W || 1;
    const scaleY = stageRect.height / PIE_VIEW_H || 1;

    segments.forEach((s, i) => {
      const slot = PIE_CALLOUT_SLOTS[bestCombo[i]];
      const midRad = (s.midDeg * Math.PI) / 180;
      const nx = Math.sin(midRad);
      const nyScreen = -Math.cos(midRad);
      const rimX = PIE_CENTER_X + PIE_RX * nx;
      const rimY = PIE_CENTER_Y + PIE_RY * nyScreen;
      const bendX = rimX + nx * 26;
      const bendY = rimY + nyScreen * 26;
      const boxXsvg = slot.x * PIE_VIEW_W;
      const boxYsvg = slot.y * PIE_VIEW_H;

      addEl(linesGroup, "polyline", {
        points: `${rimX.toFixed(1)},${rimY.toFixed(1)} ${bendX.toFixed(1)},${bendY.toFixed(1)} ${boxXsvg.toFixed(1)},${boxYsvg.toFixed(1)}`,
        fill: "none",
        stroke: s.deep,
        "stroke-width": "2",
        "stroke-linejoin": "round",
        opacity: "0.85",
      });
      addEl(linesGroup, "circle", { cx: rimX.toFixed(1), cy: rimY.toFixed(1), r: "4.5", fill: s.deep });

      const box = document.createElement("div");
      box.className = "pie3d-callout";
      box.style.left = `${boxXsvg * scaleX}px`;
      box.style.top = `${boxYsvg * scaleY}px`;
      box.style.borderColor = s.deep;
      box.innerHTML = `<span class="pie3d-callout-label">${s.label}</span><strong class="pie3d-callout-value">${s.pct.toFixed(0)}%</strong>`;
      dashPieCallouts.appendChild(box);
      lastCalloutBoxes.push({ el: box, xSvg: boxXsvg, ySvg: boxYsvg });
    });
  }

  let pieResizeTimer = null;
  window.addEventListener("resize", () => {
    if (!lastCalloutBoxes.length || !dashPieStage) return;
    clearTimeout(pieResizeTimer);
    pieResizeTimer = setTimeout(() => {
      const stageRect = dashPieStage.getBoundingClientRect();
      const scaleX = stageRect.width / PIE_VIEW_W || 1;
      const scaleY = stageRect.height / PIE_VIEW_H || 1;
      lastCalloutBoxes.forEach((b) => {
        b.el.style.left = `${b.xSvg * scaleX}px`;
        b.el.style.top = `${b.ySvg * scaleY}px`;
      });
    }, 120);
  });

  /* =====================================================
     7. CALENDRIER
  ===================================================== */

  function renderCalendar() {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    dashMonthLabel.textContent = `${MONTH_LABELS[month]} ${year}`;

    const firstOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const leadingEmpty = (firstOfMonth.getDay() + 6) % 7; // lundi = 0

    const todayIso = isoDate(new Date());

    dashCalendarGrid.innerHTML = "";

    for (let i = 0; i < leadingEmpty; i++) {
      const empty = document.createElement("div");
      empty.className = "dash-day is-empty";
      dashCalendarGrid.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(year, month, d);
      const key = isoDate(dateObj);
      const dayData = byDate[key];

      const cell = document.createElement("div");
      cell.className = "dash-day";
      if (key === todayIso) cell.classList.add("is-today");

      if (dayData) {
        if (dayData.total > 0) cell.classList.add("is-win");
        else if (dayData.total < 0) cell.classList.add("is-loss");
        else cell.classList.add("is-be");
      }

      const num = document.createElement("span");
      num.className = "dash-day-num";
      num.textContent = d;
      cell.appendChild(num);

      if (dayData) {
        const pnl = document.createElement("span");
        pnl.className = "dash-day-pnl";
        pnl.textContent = formatPct(dayData.total);
        cell.appendChild(pnl);

        const pairsWrap = document.createElement("div");
        pairsWrap.className = "dash-day-pairs";
        Array.from(dayData.pairs).slice(0, 3).forEach((pair) => {
          const tag = document.createElement("span");
          tag.className = "dash-day-pair";
          tag.textContent = pair;
          pairsWrap.appendChild(tag);
        });
        cell.appendChild(pairsWrap);

        cell.dataset.hasTrades = "true";
        cell.addEventListener("click", () => openDayModal(dateObj, dayData));
      }

      dashCalendarGrid.appendChild(cell);
    }
  }

  /* =====================================================
     7bis. MODALE DÉTAIL D'UN JOUR
  ===================================================== */

  const dashDayModalOverlay = document.getElementById("dashDayModalOverlay");
  const dashDayModalTitle = document.getElementById("dashDayModalTitle");
  const dashDayModalBody = document.getElementById("dashDayModalBody");
  const dashDayModalClose = document.getElementById("dashDayModalClose");

  function formatDateLong(d) {
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long", day: "2-digit", month: "long", year: "numeric",
    }).format(d);
  }

  function openDayModal(dateObj, dayData) {
    dashDayModalTitle.textContent = formatDateLong(dateObj);
    dashDayModalBody.innerHTML = "";

    dayData.trades.forEach((trade) => {
      const item = document.createElement("div");
      item.className = "dash-trade-item";

      const head = document.createElement("div");
      head.className = "dash-trade-head";

      const pairEl = document.createElement("span");
      pairEl.className = "dash-trade-pair";
      pairEl.textContent = trade.pair;
      head.appendChild(pairEl);

      const pnlEl = document.createElement("span");
      pnlEl.className = `dash-trade-pnl ${trade.pnl > 0 ? "is-positive" : trade.pnl < 0 ? "is-negative" : "is-neutral"}`;
      pnlEl.textContent = formatPct(trade.pnl);
      head.appendChild(pnlEl);

      item.appendChild(head);

      if (trade.afterUrl) {
        const img = document.createElement("img");
        img.className = "dash-trade-image";
        img.src = trade.afterUrl;
        img.alt = `Image après trade — ${trade.pair}`;
        img.loading = "lazy";
        img.addEventListener("error", () => {
          img.remove();
          const link = document.createElement("a");
          link.className = "dash-trade-image-link";
          link.href = trade.afterUrl;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = "🔗 Ouvrir l'image";
          item.appendChild(link);
        });
        item.appendChild(img);
      } else {
        const noImg = document.createElement("p");
        noImg.className = "dash-trade-no-image";
        noImg.textContent = "Pas d'image enregistrée pour ce trade.";
        item.appendChild(noImg);
      }

      dashDayModalBody.appendChild(item);
    });

    dashDayModalOverlay.hidden = false;
  }

  function closeDayModal() {
    dashDayModalOverlay.hidden = true;
  }

  dashDayModalClose.addEventListener("click", closeDayModal);
  dashDayModalOverlay.addEventListener("click", (e) => {
    if (e.target === dashDayModalOverlay) closeDayModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !dashDayModalOverlay.hidden) closeDayModal();
  });

  /* =====================================================
     8. COURBE D'ÉQUITÉ (SVG)
  ===================================================== */

  function formatDateShort(d) {
    return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" }).format(d);
  }

  function renderEquitySummary(points) {
    const start = 0;
    const current = points[points.length - 1].value;
    const values = points.map((p) => p.value);
    const high = Math.max(0, ...values);
    const low = Math.min(0, ...values);

    const stat = (label, value) => {
      const cls = value > 0 ? "is-positive" : value < 0 ? "is-negative" : "";
      return `<div class="dash-equity-stat"><span>${label}</span><strong class="${cls}">${formatPct(value)}</strong></div>`;
    };

    dashEquitySummary.innerHTML =
      stat("Point de départ", start) +
      stat("Actuel", current) +
      stat("Plus haut", high) +
      stat("Plus bas", low);
  }

  function renderEquityCurve(list) {
    const width = 600;
    const height = 260;
    const padX = 46;
    const padTop = 16;
    const padBottom = 28;

    // Repart d'un élément neuf à chaque rendu, pour ne jamais accumuler
    // d'anciens écouteurs mousemove/touchmove (ex: reconnexion à un autre Sheet).
    const freshSvg = dashEquitySvg.cloneNode(false);
    dashEquitySvg.replaceWith(freshSvg);
    dashEquitySvg = freshSvg;

    if (list.length === 0) return;

    let cumulative = 0;
    const points = list.map((t) => {
      cumulative += t.pnl;
      return { time: t.date.getTime(), value: cumulative, date: t.date };
    });

    renderEquitySummary(points);

    const times = points.map((p) => p.time);
    const values = points.map((p) => p.value);

    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);
    const minVal = Math.min(0, ...values);
    const maxVal = Math.max(0, ...values);

    const xScale = (t) =>
      maxTime > minTime
        ? padX + ((t - minTime) / (maxTime - minTime)) * (width - padX * 2)
        : width / 2;
    const yScale = (v) =>
      maxVal > minVal
        ? height - padBottom - ((v - minVal) / (maxVal - minVal)) * (height - padTop - padBottom)
        : (height - padTop - padBottom) / 2 + padTop;

    const svgNS = "http://www.w3.org/2000/svg";
    const addEl = (tag, attrs) => {
      const el = document.createElementNS(svgNS, tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      dashEquitySvg.appendChild(el);
      return el;
    };

    // ---------- Défs : dégradé rouge/vert (selon le résultat) + halo sur la ligne ----------
    const defs = addEl("defs", {});

    // Fraction verticale (0 = haut du graphique, 1 = bas) à laquelle se trouve
    // la ligne zéro : au-dessus -> vert (gain), en dessous -> rouge (perte).
    const zeroFrac = Math.min(0.98, Math.max(0.02, yScale(0) / height));
    const bandAbove = Math.max(0, zeroFrac - 0.05);
    const bandBelow = Math.min(1, zeroFrac + 0.05);

    const gradientId = "dashEquityGradient";
    const gradient = document.createElementNS(svgNS, "linearGradient");
    gradient.setAttribute("id", gradientId);
    gradient.setAttribute("gradientUnits", "userSpaceOnUse");
    gradient.setAttribute("x1", "0");
    gradient.setAttribute("y1", "0");
    gradient.setAttribute("x2", "0");
    gradient.setAttribute("y2", height);
    gradient.innerHTML = `
      <stop offset="0%" stop-color="var(--dash-win)" stop-opacity="0.30"></stop>
      <stop offset="${(bandAbove * 100).toFixed(1)}%" stop-color="var(--dash-win)" stop-opacity="0.05"></stop>
      <stop offset="${(zeroFrac * 100).toFixed(1)}%" stop-color="var(--dash-win)" stop-opacity="0"></stop>
      <stop offset="${(zeroFrac * 100).toFixed(1)}%" stop-color="var(--dash-loss)" stop-opacity="0"></stop>
      <stop offset="${(bandBelow * 100).toFixed(1)}%" stop-color="var(--dash-loss)" stop-opacity="0.05"></stop>
      <stop offset="100%" stop-color="var(--dash-loss)" stop-opacity="0.30"></stop>
    `;
    defs.appendChild(gradient);

    // Même logique pour le trait de la courbe : plein vert au-dessus de zéro,
    // plein rouge en dessous, avec une petite zone de fondu autour de zéro.
    const lineGradientId = "dashEquityLineGradient";
    const lineGradient = document.createElementNS(svgNS, "linearGradient");
    lineGradient.setAttribute("id", lineGradientId);
    lineGradient.setAttribute("gradientUnits", "userSpaceOnUse");
    lineGradient.setAttribute("x1", "0");
    lineGradient.setAttribute("y1", "0");
    lineGradient.setAttribute("x2", "0");
    lineGradient.setAttribute("y2", height);
    lineGradient.innerHTML = `
      <stop offset="0%" stop-color="var(--dash-win)"></stop>
      <stop offset="${(bandAbove * 100).toFixed(1)}%" stop-color="var(--dash-win)"></stop>
      <stop offset="${(bandBelow * 100).toFixed(1)}%" stop-color="var(--dash-loss)"></stop>
      <stop offset="100%" stop-color="var(--dash-loss)"></stop>
    `;
    defs.appendChild(lineGradient);

    const glowId = "dashEquityGlow";
    const filter = document.createElementNS(svgNS, "filter");
    filter.setAttribute("id", glowId);
    filter.setAttribute("x", "-20%");
    filter.setAttribute("y", "-20%");
    filter.setAttribute("width", "140%");
    filter.setAttribute("height", "140%");
    filter.innerHTML = `<feGaussianBlur stdDeviation="3" result="blur"></feGaussianBlur>
      <feMerge>
        <feMergeNode in="blur"></feMergeNode>
        <feMergeNode in="SourceGraphic"></feMergeNode>
      </feMerge>`;
    defs.appendChild(filter);

    // Grille : uniquement la ligne zéro, discrète
    const zeroY = yScale(0);
    addEl("line", {
      x1: padX, x2: width - 8, y1: zeroY, y2: zeroY,
      stroke: "currentColor", "stroke-opacity": "0.15", "stroke-dasharray": "4 4",
    });
    [maxVal, minVal].forEach((v) => {
      if (v === 0) return;
      const y = yScale(v);
      addEl("text", {
        x: 4, y: y + 4, "font-size": "11", "font-weight": "700", opacity: "0.6",
      }).textContent = formatPct(v);
    });
    addEl("text", {
      x: 4, y: zeroY + 4, "font-size": "11", "font-weight": "700", opacity: "0.6",
    }).textContent = formatPct(0);

    // ---------- Courbe lissée (spline Catmull-Rom -> Bézier) ----------
    const coordPairs = points.map((p) => [xScale(p.time), yScale(p.value)]);

    function buildSmoothPath(pts) {
      if (pts.length < 2) return `M ${pts[0][0]},${pts[0][1]}`;
      let d = `M ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i === 0 ? i : i - 1];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];
        const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
        const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
        const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
        const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
      }
      return d;
    }

    const lineD = buildSmoothPath(coordPairs);
    const firstCIdx = lineD.indexOf(" C");
    const curveCommands = firstCIdx >= 0 ? lineD.slice(firstCIdx) : "";
    const firstX = coordPairs[0][0].toFixed(1);
    const firstY = coordPairs[0][1].toFixed(1);
    const lastX = coordPairs[coordPairs.length - 1][0].toFixed(1);
    const areaD = `M ${firstX},${zeroY} L ${firstX},${firstY} ${curveCommands} L ${lastX},${zeroY} Z`;

    // Zone sous la courbe (dégradé)
    addEl("path", { d: areaD, fill: `url(#${gradientId})`, stroke: "none" });

    // Ligne (avec léger halo), colorée en dégradé rouge/vert selon le résultat
    const linePath = addEl("path", {
      d: lineD, fill: "none", stroke: `url(#${lineGradientId})`,
      "stroke-width": "2.5", "stroke-linejoin": "round", "stroke-linecap": "round",
      filter: `url(#${glowId})`,
    });

    // Animation de tracé à l'ouverture
    try {
      const length = linePath.getTotalLength();
      linePath.style.strokeDasharray = `${length}`;
      linePath.style.strokeDashoffset = `${length}`;
      linePath.getBoundingClientRect(); // force reflow
      linePath.style.transition = "stroke-dashoffset 1.1s cubic-bezier(0.22, 1, 0.36, 1)";
      requestAnimationFrame(() => {
        linePath.style.strokeDashoffset = "0";
      });
    } catch {}

    // Point le plus haut / le plus bas
    const highIdx = values.indexOf(Math.max(...values));
    const lowIdx = values.indexOf(Math.min(...values));
    if (Math.max(...values) > 0) {
      addEl("circle", {
        cx: xScale(points[highIdx].time), cy: yScale(points[highIdx].value),
        r: "3.5", fill: "var(--dash-win)",
      });
    }
    if (Math.min(...values) < 0) {
      addEl("circle", {
        cx: xScale(points[lowIdx].time), cy: yScale(points[lowIdx].value),
        r: "3.5", fill: "var(--dash-loss)",
      });
    }

    // Point final — halo qui pulse doucement (position "live"), teinté selon le résultat
    const lastPoint = points[points.length - 1];
    const lastCx = xScale(lastPoint.time);
    const lastCy = yScale(lastPoint.value);
    const lastColor = lastPoint.value >= 0 ? "var(--dash-win)" : "var(--dash-loss)";

    addEl("circle", {
      cx: lastCx, cy: lastCy, r: "9", fill: lastColor, opacity: "0.25",
      class: "dash-equity-pulse",
    });
    addEl("circle", {
      cx: lastCx, cy: lastCy, r: "4.5", fill: lastColor, stroke: "var(--card)", "stroke-width": "2",
    });

    // Dates de début / fin
    addEl("text", {
      x: padX, y: height - 8, "font-size": "10.5", "font-weight": "700", "text-anchor": "start", opacity: "0.6",
    }).textContent = formatDateShort(points[0].date);

    addEl("text", {
      x: width - 8, y: height - 8, "font-size": "10.5", "font-weight": "700", "text-anchor": "end", opacity: "0.6",
    }).textContent = formatDateShort(points[points.length - 1].date);

    // ---------- Curseur interactif ----------
    const crosshair = addEl("line", {
      x1: padX, x2: padX, y1: padTop, y2: height - padBottom,
      stroke: "currentColor", "stroke-opacity": "0.25", "stroke-width": "1",
      visibility: "hidden",
    });

    const hoverDot = addEl("circle", {
      r: "5", fill: "var(--link)", stroke: "var(--card)", "stroke-width": "2",
      visibility: "hidden",
    });

    function findNearestPoint(svgX) {
      let nearest = points[0];
      let nearestDist = Infinity;
      points.forEach((p) => {
        const dist = Math.abs(xScale(p.time) - svgX);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = p;
        }
      });
      return nearest;
    }

    function showCursorAt(clientX) {
      const rect = dashEquitySvg.getBoundingClientRect();
      if (rect.width === 0) return;

      const svgX = (clientX - rect.left) * (width / rect.width);
      const point = findNearestPoint(svgX);

      const px = xScale(point.time);
      const py = yScale(point.value);

      crosshair.setAttribute("x1", px);
      crosshair.setAttribute("x2", px);
      crosshair.setAttribute("visibility", "visible");

      hoverDot.setAttribute("cx", px);
      hoverDot.setAttribute("cy", py);
      hoverDot.setAttribute("visibility", "visible");

      // Position de la bulle : convertir le point SVG en pixels écran,
      // puis en coordonnées relatives à .dash-equity-wrap (l'ancêtre
      // "position:relative" qui sert de repère à la bulle absolue).
      const wrapRect = dashEquitySvg.parentElement.getBoundingClientRect();
      const clientPxX = rect.left + (px / width) * rect.width;
      const clientPxY = rect.top + (py / height) * rect.height;

      dashEquityTooltip.innerHTML = `<strong>${formatPct(point.value)}</strong><span>${formatDateShort(point.date)}</span>`;
      dashEquityTooltip.style.left = `${clientPxX - wrapRect.left}px`;
      dashEquityTooltip.style.top = `${clientPxY - wrapRect.top}px`;
      dashEquityTooltip.hidden = false;
    }

    function hideCursor() {
      crosshair.setAttribute("visibility", "hidden");
      hoverDot.setAttribute("visibility", "hidden");
      dashEquityTooltip.hidden = true;
    }

    dashEquitySvg.addEventListener("mousemove", (e) => showCursorAt(e.clientX));
    dashEquitySvg.addEventListener("mouseleave", hideCursor);
    dashEquitySvg.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches[0]) showCursorAt(e.touches[0].clientX);
      },
      { passive: true }
    );
    dashEquitySvg.addEventListener("touchend", hideCursor);
  }

  /* =====================================================
     9. STATUT / ERREURS
  ===================================================== */

  function setStatus(text, type) {
    dashStatus.hidden = false;
    dashStatus.textContent = text;
    dashStatus.className = `dash-status ${type}`;
  }

  function clearStatus() {
    dashStatus.hidden = true;
    dashStatus.textContent = "";
  }

  /* =====================================================
     10. CHARGEMENT DEPUIS UNE URL
  ===================================================== */

  async function loadFromUrl(url) {
    setStatus("⏳ Chargement de ton Sheet…", "is-loading");
    dashContent.hidden = true;

    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("Impossible de récupérer ce fichier (vérifie qu'il est bien publié).");

      const text = await res.text();
      const rows = parseCSV(text);
      trades = extractTrades(rows);
      byDate = buildByDate(trades);

      viewDate = new Date(trades[trades.length - 1].date);
      viewDate.setDate(1);

      renderStats(trades, byDate);
      renderCalendar();
      renderEquityCurve(trades);

      dashConnectedAs.textContent = `${trades.length} trades chargés · dernière mise à jour à l'instant`;
      dashContent.hidden = false;
      setStatus(`✅ Sheet connecté — ${trades.length} trades chargés.`, "is-ok");
    } catch (err) {
      setStatus(`❌ ${err.message || "Erreur lors du chargement du Sheet."}`, "is-error");
      dashContent.hidden = true;
    }
  }

  /* =====================================================
     11. ÉVÉNEMENTS + INIT
  ===================================================== */

  function safeGetLS(k) {
    try { return localStorage.getItem(k); } catch { return null; }
  }
  function safeSetLS(k, v) {
    try { localStorage.setItem(k, v); } catch {}
  }
  function safeRemoveLS(k) {
    try { localStorage.removeItem(k); } catch {}
  }

  dashConnectBtn.addEventListener("click", () => {
    const url = dashCsvUrl.value.trim();
    if (!url) {
      setStatus("Colle d'abord le lien de ton Sheet publié en CSV.", "is-error");
      return;
    }
    safeSetLS(STORAGE_KEY, url);

    try {
      const newUrl = `${location.pathname}?sheet=${encodeURIComponent(url)}`;
      history.replaceState(null, "", newUrl);
    } catch {}

    loadFromUrl(url);
  });

  dashChangeSheetBtn.addEventListener("click", () => {
    safeRemoveLS(STORAGE_KEY);
    dashContent.hidden = true;
    clearStatus();
    dashCsvUrl.value = "";
    dashCsvUrl.focus();

    try {
      history.replaceState(null, "", location.pathname);
    } catch {}
  });

  dashPrevBtn.addEventListener("click", () => {
    viewDate.setMonth(viewDate.getMonth() - 1);
    renderCalendar();
  });

  dashNextBtn.addEventListener("click", () => {
    viewDate.setMonth(viewDate.getMonth() + 1);
    renderCalendar();
  });

  dashTodayBtn.addEventListener("click", () => {
    viewDate = new Date();
    viewDate.setDate(1);
    renderCalendar();
  });

  const savedUrl = safeGetLS(STORAGE_KEY);
  const urlParams = new URLSearchParams(location.search);
  const sheetParam = urlParams.get("sheet");

  if (sheetParam) {
    dashCsvUrl.value = sheetParam;
    safeSetLS(STORAGE_KEY, sheetParam);
    loadFromUrl(sheetParam);
  } else if (savedUrl) {
    dashCsvUrl.value = savedUrl;
    loadFromUrl(savedUrl);
  }
})();
