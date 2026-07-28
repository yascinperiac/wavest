/* ============================================================
   PERFORMANCE DES PATTERNS — logique isolée (chargé après app.js)
============================================================ */

(() => {
  "use strict";

  const PATTERNS = [
    "ETE", "IETE", "M1 big", "M1 small", "M2", "M3", "M4", "M5",
    "W1 big", "W1 small", "W2", "W3", "W4", "W5",
  ];

  // Données issues du backtest (SUM de R:R par paire / pattern).
  // null = pas de trade enregistré sur ce couple paire/pattern.
  const DATA = [
    { pair: "AUDCAD", values: [null, -1.00, 1.00, null, null, -1.00, 1.58, 2.07, 9.02, -1.00, 0.46, 0.00, 3.60, 6.88] },
    { pair: "AUDCHF", values: [2.00, 2.56, 1.22, 0.00, null, -1.00, 6.54, 2.00, 0.24, 4.32, 0.00, null, 0.00, null] },
    { pair: "AUDJPY", values: [3.15, 0.76, 1.18, 0.07, 1.00, 1.19, 2.67, -0.87, -2.00, 1.59, null, -1.00, null, -1.00] },
    { pair: "AUDNZD", values: [-1.00, 0.00, -1.00, null, 0.00, null, 6.90, 0.17, -1.00, 1.02, 1.00, null, null, 2.58] },
    { pair: "AUDUSD", values: [-1.00, 0.00, 1.22, 3.54, null, null, null, -1.00, -1.00, 0.00, 0.00, null, null, 5.95] },
    { pair: "CADCHF", values: [0.00, -2.00, 0.21, 0.00, null, 1.30, 1.00, 1.97, 0.00, 3.05, 0.45, null, -1.00, null] },
    { pair: "CADJPY", values: [1.00, 1.52, -0.73, -1.00, null, null, 0.00, -0.35, null, -2.00, -1.00, null, 3.02, null] },
    { pair: "CHFJPY", values: [-1.33, null, 1.00, 0.67, 1.81, 1.00, 2.41, 0.34, 1.12, 0.00, 0.44, 0.31, null, 3.71] },
    { pair: "EURAUD", values: [0.99, 3.07, -1.00, 0.00, 1.00, null, -2.00, 1.11, 0.00, null, null, null, null, 4.17] },
    { pair: "EURCAD", values: [1.62, -1.59, 4.32, 1.56, -0.50, 0.95, null, 2.92, 1.76, null, null, 0.00, null, 1.57] },
    { pair: "EURCHF", values: [1.00, null, 2.24, -1.00, -1.00, null, null, 2.89, 0.02, null, 5.62, null, null, 4.20] },
    { pair: "EURGBP", values: [2.47, -1.00, -2.00, null, 0.00, 2.77, -1.00, -0.61, -3.84, 0.41, 2.34, 1.00, 2.10, null] },
    { pair: "EURJPY", values: [2.48, 3.28, null, 0.99, null, 0.00, null, 1.63, null, null, 1.60, -1.00, 0.04, null] },
    { pair: "EURNZD", values: [2.12, 4.51, -1.00, 0.48, null, 0.20, 4.70, -1.00, -1.00, 2.00, null, 0.00, 3.08, 3.70] },
    { pair: "EURUSD", values: [2.13, 3.97, -1.00, 2.25, null, -1.00, -1.00, 0.00, -1.00, -2.00, 2.79, null, -2.00, 2.00] },
    { pair: "GBPAUD", values: [0.74, 5.44, 2.78, 3.60, 0.33, -1.00, null, 0.53, -1.67, null, null, 0.00, null, -1.00] },
    { pair: "GBPCAD", values: [3.27, 0.50, 2.01, 4.00, 2.25, null, -1.00, 5.58, -1.00, 0.44, null, -2.00, -2.00, null] },
    { pair: "GBPCHF", values: [1.22, 3.03, 0.36, 2.21, 1.77, null, 0.00, -2.62, -1.00, 1.10, 0.00, null, null, null] },
    { pair: "GBPJPY", values: [null, -1.00, 2.01, 3.35, 5.85, 3.33, 1.81, 9.97, -4.00, 0.63, null, 1.26, 0.00, 1.87] },
    { pair: "GBPNZD", values: [-0.33, 0.00, 3.51, 6.34, -1.00, null, 2.83, -0.70, 1.00, null, 1.72, null, -0.62, null] },
    { pair: "GBPUSD", values: [2.33, 0.00, -1.00, 2.18, 3.07, null, 1.57, 0.72, null, -1.00, null, null, 0.00, null] },
    { pair: "NZDCAD", values: [0.45, 1.12, 4.29, 1.19, null, -1.00, -1.00, -1.00, -1.00, 7.14, -1.00, 2.55, 0.00, 0.00] },
    { pair: "NZDCHF", values: [0.65, 4.61, 1.00, 1.81, null, null, null, 1.07, 1.94, null, 1.00, null, 0.00, 0.00] },
    { pair: "NZDJPY", values: [null, 1.00, 0.68, 1.48, 0.45, null, 0.24, 3.45, -2.00, 0.00, null, null, -1.00, 1.30] },
    { pair: "NZDUSD", values: [2.98, 0.08, 9.29, 1.00, null, null, null, 0.10, -1.00, -1.00, -1.00, null, null, -1.00] },
    { pair: "USDCAD", values: [-0.27, 4.33, 15.79, 4.11, 1.00, null, null, -1.00, -2.00, 2.73, -1.00, null, -2.00, -2.00] },
    { pair: "USDCHF", values: [4.46, 0.64, -2.00, -1.00, null, null, -2.00, 0.69, 3.63, -1.00, -1.00, null, null, 5.24] },
    { pair: "USDJPY", values: [0.10, 3.05, 3.93, 0.00, null, null, 2.72, 3.11, null, -1.00, null, 2.13, 6.48, -2.00] },
  ];

  /* =====================================================
     1. RÉFÉRENCES DOM
  ===================================================== */

  const bestPatternEl = document.getElementById("perfBestPattern");
  const bestPatternScoreEl = document.getElementById("perfBestPatternScore");
  const bestPairEl = document.getElementById("perfBestPair");
  const bestPairScoreEl = document.getElementById("perfBestPairScore");

  const rankingBody = document.getElementById("perfRankingBody");
  const sortSelect = document.getElementById("perfSort");

  const heatmapHead = document.getElementById("perfHeatmapHead");
  const heatmapBody = document.getElementById("perfHeatmapBody");

  if (!rankingBody || !heatmapBody) return;

  /* =====================================================
     2. UTILITAIRES
  ===================================================== */

  function formatPct(value) {
    if (value === null || value === undefined) return "–";
    const sign = value > 0 ? "+" : "";
    return `${sign}${value.toFixed(2).replace(".", ",")} %`;
  }

  function rowTotal(values) {
    return values.reduce((sum, v) => sum + (v ?? 0), 0);
  }

  function bestOfRow(values) {
    let bestIndex = -1;
    let bestValue = -Infinity;
    values.forEach((v, i) => {
      if (v !== null && v > bestValue) {
        bestValue = v;
        bestIndex = i;
      }
    });
    return bestIndex === -1 ? null : { index: bestIndex, value: bestValue };
  }

  function colorFor(value, min, max) {
    if (value === null) return "transparent";
    if (value >= 0) {
      const ratio = max > 0 ? Math.min(value / max, 1) : 0;
      return `color-mix(in oklab, var(--perf-good) ${(ratio * 65).toFixed(0)}%, var(--card))`;
    }
    const ratio = min < 0 ? Math.min(value / min, 1) : 0;
    return `color-mix(in oklab, var(--perf-bad) ${(ratio * 65).toFixed(0)}%, var(--card))`;
  }

  /* =====================================================
     3. CALCULS GLOBAUX
  ===================================================== */

  function computePatternTotals() {
    return PATTERNS.map((name, i) => {
      const total = DATA.reduce((sum, row) => sum + (row.values[i] ?? 0), 0);
      return { name, total };
    });
  }

  function computeSummary() {
    const patternTotals = computePatternTotals();
    const bestPattern = patternTotals.reduce((a, b) => (b.total > a.total ? b : a));

    const bestPairRow = DATA.reduce((a, b) => (rowTotal(b.values) > rowTotal(a.values) ? b : a));

    return {
      bestPattern,
      bestPair: { pair: bestPairRow.pair, total: rowTotal(bestPairRow.values) },
    };
  }

  /* =====================================================
     4. RENDU — RÉSUMÉ
  ===================================================== */

  function renderSummary() {
    const { bestPattern, bestPair } = computeSummary();
    bestPatternEl.textContent = bestPattern.name;
    bestPatternScoreEl.textContent = formatPct(bestPattern.total);
    bestPairEl.textContent = bestPair.pair;
    bestPairScoreEl.textContent = formatPct(bestPair.total);
  }

  /* =====================================================
     5. RENDU — CLASSEMENT MEILLEUR PATTERN PAR PAIRE
  ===================================================== */

  function renderRanking() {
    const sortMode = sortSelect ? sortSelect.value : "score-desc";

    const rows = DATA.map((row) => {
      const best = bestOfRow(row.values);
      return {
        pair: row.pair,
        bestPatternName: best ? PATTERNS[best.index] : "–",
        bestScore: best ? best.value : -Infinity,
        total: rowTotal(row.values),
      };
    });

    if (sortMode === "score-desc") {
      rows.sort((a, b) => b.bestScore - a.bestScore);
    } else if (sortMode === "total-desc") {
      rows.sort((a, b) => b.total - a.total);
    } else {
      rows.sort((a, b) => a.pair.localeCompare(b.pair));
    }

    rankingBody.innerHTML = rows
      .map(
        (r, i) => `
        <tr>
          <td class="perf-rank">${i + 1}</td>
          <td class="perf-pair-cell">${r.pair}</td>
          <td><span class="perf-pattern-tag">${r.bestPatternName}</span></td>
          <td class="perf-score ${r.bestScore >= 0 ? "is-positive" : "is-negative"}">${formatPct(r.bestScore)}</td>
          <td class="perf-total">${formatPct(r.total)}</td>
        </tr>`
      )
      .join("");
  }

  /* =====================================================
     6. RENDU — HEATMAP COMPLÈTE
  ===================================================== */

  function renderHeatmap() {
    heatmapHead.innerHTML =
      `<th class="perf-pair-col">Paire</th>` +
      PATTERNS.map((p) => `<th>${p}</th>`).join("") +
      `<th class="perf-total-col">Total</th>`;

    const allValues = DATA.flatMap((r) => r.values).filter((v) => v !== null);
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);

    heatmapBody.innerHTML = DATA.map((row) => {
      const best = bestOfRow(row.values);
      const cells = row.values
        .map((v, i) => {
          const bg = colorFor(v, min, max);
          const isBest = best && best.index === i;
          return `<td style="background:${bg}" class="${isBest ? "is-best" : ""}">${formatPct(v)}</td>`;
        })
        .join("");
      return `
        <tr>
          <td class="perf-pair-col">${row.pair}</td>
          ${cells}
          <td class="perf-total-col">${formatPct(rowTotal(row.values))}</td>
        </tr>`;
    }).join("");
  }

  /* =====================================================
     7. ÉVÉNEMENTS + INIT
  ===================================================== */

  if (sortSelect) {
    sortSelect.addEventListener("change", renderRanking);
  }

  renderSummary();
  renderRanking();
  renderHeatmap();
})();
