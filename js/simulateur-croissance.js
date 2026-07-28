/* ============================================================
   SIMULATEUR DE CROISSANCE DE CAPITAL — logique isolée
   (chargé après app.js)
============================================================ */

(() => {
  "use strict";

  /* =====================================================
     1. RÉFÉRENCES DOM
  ===================================================== */

  const capitalInput = document.getElementById("simCapital");
  const riskInput = document.getElementById("simRisk");
  const rrInput = document.getElementById("simRR");
  const winrateInput = document.getElementById("simWinrate");
  const tradesInput = document.getElementById("simTrades");
  const resetBtn = document.getElementById("simResetBtn");

  const finalCapitalEl = document.getElementById("simFinalCapital");
  const totalReturnEl = document.getElementById("simTotalReturn");
  const maxDrawdownEl = document.getElementById("simMaxDrawdown");
  const winsExpectedEl = document.getElementById("simWinsExpected");

  const canvas = document.getElementById("simChart");

  if (!canvas) return; // page pas encore prête / élément absent

  const ctx = canvas.getContext("2d");

  const DEFAULTS = { capital: 1000, risk: 1, rr: 2, winrate: 45, trades: 100 };
  const MONTE_CARLO_RUNS = 400;

  /* =====================================================
     2. UTILITAIRES
  ===================================================== */

  function formatCurrency(value) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);
  }

  function formatPercent(value) {
    const sign = value > 0 ? "+" : "";
    return `${sign}${value.toFixed(1)} %`;
  }

  function clampNumber(value, min, max) {
    if (Number.isNaN(value)) return min;
    return Math.min(Math.max(value, min), max);
  }

  function readInputs() {
    const capital = clampNumber(parseFloat(capitalInput.value), 1, 10_000_000) || DEFAULTS.capital;
    const risk = clampNumber(parseFloat(riskInput.value), 0.01, 100) || DEFAULTS.risk;
    const rr = clampNumber(parseFloat(rrInput.value), 0.1, 50) || DEFAULTS.rr;
    const winrate = clampNumber(parseFloat(winrateInput.value), 0, 100) || DEFAULTS.winrate;
    const trades = Math.round(clampNumber(parseFloat(tradesInput.value), 1, 1000)) || DEFAULTS.trades;
    return { capital, risk, rr, winrate, trades };
  }

  /* =====================================================
     3. SIMULATION MONTE CARLO
  ===================================================== */

  // Simule un chemin de capital trade par trade (risque en % du capital courant).
  function simulateOnePath({ capital, risk, rr, winrate, trades }) {
    const path = [capital];
    let current = capital;
    let ruined = false;

    for (let i = 0; i < trades; i++) {
      if (ruined) {
        path.push(0);
        continue;
      }
      const riskAmount = current * (risk / 100);
      const isWin = Math.random() * 100 < winrate;
      current += isWin ? riskAmount * rr : -riskAmount;

      if (current <= 0) {
        current = 0;
        ruined = true;
      }
      path.push(current);
    }
    return path;
  }

  function maxDrawdownOf(path) {
    let peak = path[0];
    let worstDrawdown = 0;
    for (const value of path) {
      if (value > peak) peak = value;
      if (peak > 0) {
        const drawdown = ((peak - value) / peak) * 100;
        if (drawdown > worstDrawdown) worstDrawdown = drawdown;
      }
    }
    return worstDrawdown;
  }

  // Lance N simulations, retourne les chemins correspondant aux percentiles
  // favorable / médian / défavorable (classés sur le capital final).
  function runMonteCarlo(params) {
    const runs = [];
    for (let i = 0; i < MONTE_CARLO_RUNS; i++) {
      runs.push(simulateOnePath(params));
    }
    runs.sort((a, b) => a[a.length - 1] - b[b.length - 1]);

    const goodIndex = Math.floor(runs.length * 0.9);
    const midIndex = Math.floor(runs.length * 0.5);
    const badIndex = Math.floor(runs.length * 0.1);

    return {
      good: runs[goodIndex],
      mid: runs[midIndex],
      bad: runs[badIndex],
    };
  }

  /* =====================================================
     4. GRAPHIQUE (CANVAS)
  ===================================================== */

  function setupCanvasResolution() {
    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.clientWidth || 600;
    const cssHeight = canvas.clientHeight || 280;
    canvas.width = cssWidth * dpr;
    canvas.height = cssHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { width: cssWidth, height: cssHeight };
  }

  function getCssVar(name, fallback) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name);
    return value ? value.trim() : fallback;
  }

  function drawChart(paths) {
    const { width, height } = setupCanvasResolution();
    ctx.clearRect(0, 0, width, height);

    const padding = { top: 16, right: 16, bottom: 26, left: 56 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;

    const allValues = [...paths.good, ...paths.mid, ...paths.bad];
    let minVal = Math.min(...allValues);
    let maxVal = Math.max(...allValues);
    if (minVal === maxVal) {
      minVal *= 0.9;
      maxVal *= 1.1;
    }
    // petite marge visuelle
    const range = maxVal - minVal || 1;
    minVal = Math.max(0, minVal - range * 0.05);
    maxVal = maxVal + range * 0.05;

    const textColor = getCssVar("--muted", "#8a8a8f");
    const lineColor = getCssVar("--line", "#e4e4e7");

    // --- grille horizontale + labels Y ---
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = textColor;
    ctx.font = "11px Inter, sans-serif";
    ctx.textBaseline = "middle";

    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
      const ratio = i / gridLines;
      const y = padding.top + plotHeight * (1 - ratio);
      const value = minVal + (maxVal - minVal) * ratio;

      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.textAlign = "right";
      ctx.fillText(formatCurrency(value), padding.left - 8, y);
    }

    // --- fonction de projection ---
    const n = paths.mid.length;
    const xFor = (i) => padding.left + (plotWidth * i) / (n - 1);
    const yFor = (v) => padding.top + plotHeight * (1 - (v - minVal) / (maxVal - minVal));

    function drawLine(path, color, lineWidth) {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      path.forEach((value, i) => {
        const x = xFor(i);
        const y = yFor(value);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }

    drawLine(paths.bad, getCssVar("--sim-bad", "#e4949a"), 1.6);
    drawLine(paths.good, getCssVar("--sim-good", "#7cc39a"), 1.6);
    drawLine(paths.mid, getCssVar("--sim-mid", getCssVar("--link", "#4a7dff")), 2.4);

    // --- axe X (numéro de trade) ---
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    const xTicks = 5;
    for (let i = 0; i <= xTicks; i++) {
      const tradeIndex = Math.round(((n - 1) * i) / xTicks);
      const x = xFor(tradeIndex);
      ctx.fillText(String(tradeIndex), x, height - padding.bottom + 8);
    }
  }

  /* =====================================================
     5. MISE À JOUR DE L'INTERFACE
  ===================================================== */

  function update() {
    const params = readInputs();
    const paths = runMonteCarlo(params);

    drawChart(paths);

    const finalMid = paths.mid[paths.mid.length - 1];
    const totalReturn = ((finalMid - params.capital) / params.capital) * 100;
    const drawdown = maxDrawdownOf(paths.mid);
    const winsExpected = Math.round(params.trades * (params.winrate / 100));

    finalCapitalEl.textContent = formatCurrency(finalMid);

    totalReturnEl.textContent = formatPercent(totalReturn);
    totalReturnEl.className = totalReturn >= 0 ? "is-positive" : "is-negative";

    maxDrawdownEl.textContent = `-${drawdown.toFixed(1)} %`;
    maxDrawdownEl.className = drawdown > 40 ? "is-negative" : "";

    winsExpectedEl.textContent = `${winsExpected} / ${params.trades}`;
  }

  /* =====================================================
     6. ÉVÉNEMENTS
  ===================================================== */

  const inputs = [capitalInput, riskInput, rrInput, winrateInput, tradesInput];
  inputs.forEach((input) => {
    input.addEventListener("input", () => update());
  });

  resetBtn.addEventListener("click", () => {
    capitalInput.value = DEFAULTS.capital;
    riskInput.value = DEFAULTS.risk;
    rrInput.value = DEFAULTS.rr;
    winrateInput.value = DEFAULTS.winrate;
    tradesInput.value = DEFAULTS.trades;
    update();
  });

  window.addEventListener("resize", () => update());

  // Premier rendu
  update();
})();
