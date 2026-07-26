/* ============================================================
   CALCULATEUR DE LOT — logique isolée (chargé après app.js)
============================================================ */

(() => {
  "use strict";

  /* =====================================================
     1. DONNÉES DE RÉFÉRENCE
  ===================================================== */

  // Repli hors-ligne uniquement (si l'API de taux ne répond pas).
  // "1 unité de devise = X USD" — approximatif, à but de secours.
  const FALLBACK_RATES_TO_USD = {
    USD: 1,
    EUR: 1.08,
    GBP: 1.27,
    JPY: 1 / 155,
    CHF: 1 / 0.91,
    CAD: 1 / 1.37,
    AUD: 0.66,
    NZD: 0.61,
  };

  const CURRENCIES = Object.keys(FALLBACK_RATES_TO_USD);

  const PAIRS = {
    EURUSD: { base: "EUR", quote: "USD" },
    EURGBP: { base: "EUR", quote: "GBP" },
    EURAUD: { base: "EUR", quote: "AUD" },
    EURNZD: { base: "EUR", quote: "NZD" },
    EURCAD: { base: "EUR", quote: "CAD" },
    EURCHF: { base: "EUR", quote: "CHF" },
    EURJPY: { base: "EUR", quote: "JPY" },
    GBPUSD: { base: "GBP", quote: "USD" },
    GBPAUD: { base: "GBP", quote: "AUD" },
    GBPNZD: { base: "GBP", quote: "NZD" },
    GBPCAD: { base: "GBP", quote: "CAD" },
    GBPCHF: { base: "GBP", quote: "CHF" },
    GBPJPY: { base: "GBP", quote: "JPY" },
    AUDUSD: { base: "AUD", quote: "USD" },
    AUDNZD: { base: "AUD", quote: "NZD" },
    AUDCAD: { base: "AUD", quote: "CAD" },
    AUDCHF: { base: "AUD", quote: "CHF" },
    AUDJPY: { base: "AUD", quote: "JPY" },
    NZDUSD: { base: "NZD", quote: "USD" },
    NZDCAD: { base: "NZD", quote: "CAD" },
    NZDCHF: { base: "NZD", quote: "CHF" },
    NZDJPY: { base: "NZD", quote: "JPY" },
    USDCAD: { base: "USD", quote: "CAD" },
    USDCHF: { base: "USD", quote: "CHF" },
    USDJPY: { base: "USD", quote: "JPY" },
    CADCHF: { base: "CAD", quote: "CHF" },
    CADJPY: { base: "CAD", quote: "JPY" },
    CHFJPY: { base: "CHF", quote: "JPY" },
  };

  const STANDARD_LOT_UNITS = 100000;

  // État courant des taux (rempli au chargement, avant ça = repli statique)
  let currentRates = FALLBACK_RATES_TO_USD;

  /* =====================================================
     2. ÉLÉMENTS DOM
  ===================================================== */

  const lotPair = document.getElementById("lotPair");
  const lotAccountCurrency = document.getElementById("lotAccountCurrency");
  const lotBalance = document.getElementById("lotBalance");
  const lotRisk = document.getElementById("lotRisk");
  const lotStop = document.getElementById("lotStop");

  const lotVerdict = document.getElementById("lotVerdict");
  const lotRiskAmount = document.getElementById("lotRiskAmount");
  const lotPipValue = document.getElementById("lotPipValue");
  const lotStandard = document.getElementById("lotStandard");
  const lotMini = document.getElementById("lotMini");
  const lotMicro = document.getElementById("lotMicro");
  const lotRatesStatus = document.getElementById("lotRatesStatus");
  const lotResetBtn = document.getElementById("lotResetBtn");

  /* =====================================================
     3. TAUX QUASI-LIVE (Frankfurter — API BCE, gratuite, sans clé)
  ===================================================== */

  async function fetchFromFrankfurter() {
    const targets = CURRENCIES.filter((c) => c !== "USD").join(",");
    const res = await fetch(`https://api.frankfurter.app/latest?base=USD&to=${targets}`);
    if (!res.ok) throw new Error("Frankfurter indisponible");

    const data = await res.json();
    if (!data.rates) throw new Error("Format Frankfurter inattendu");

    const rates = { USD: 1 };
    CURRENCIES.forEach((code) => {
      if (code === "USD") return;
      const usdToCode = data.rates[code];
      if (usdToCode) rates[code] = 1 / usdToCode;
    });

    return { rates, date: data.date };
  }

  async function fetchFromOpenErApi() {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!res.ok) throw new Error("open.er-api indisponible");

    const data = await res.json();
    if (data.result !== "success" || !data.rates) throw new Error("Format open.er-api inattendu");

    const rates = { USD: 1 };
    CURRENCIES.forEach((code) => {
      if (code === "USD") return;
      const usdToCode = data.rates[code];
      if (usdToCode) rates[code] = 1 / usdToCode;
    });

    return { rates, date: data.time_last_update_utc?.slice(0, 16) || "" };
  }

  async function fetchLiveRates() {
    try {
      const { rates, date } = await fetchFromFrankfurter();
      return { rates, date, live: true, source: "BCE / Frankfurter" };
    } catch (err1) {
      try {
        const { rates, date } = await fetchFromOpenErApi();
        return { rates, date, live: true, source: "open.er-api" };
      } catch (err2) {
        return { rates: FALLBACK_RATES_TO_USD, date: null, live: false };
      }
    }
  }

  function setRatesStatus(result) {
    if (result.live) {
      lotRatesStatus.textContent = `✅ Taux à jour du ${result.date} (source : ${result.source}).`;
      lotRatesStatus.className = "lot-rates-status is-live";
    } else {
      lotRatesStatus.textContent = "⚠️ Taux en direct indisponibles — valeurs de secours approximatives utilisées.";
      lotRatesStatus.className = "lot-rates-status is-offline";
    }
  }

  /* =====================================================
     4. UTILITAIRES
  ===================================================== */

  function pipSizeFor(pairKey) {
    return pairKey.includes("JPY") ? 0.01 : 0.0001;
  }

  function formatCurrency(value, currency) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  }

  function setVerdict(text, type) {
    lotVerdict.textContent = text;
    lotVerdict.className = `lot-verdict ${type}`;
  }

  function resetOutputs() {
    lotRiskAmount.textContent = "-";
    lotPipValue.textContent = "-";
    lotStandard.textContent = "-";
    lotMini.textContent = "-";
    lotMicro.textContent = "-";
  }

  /* =====================================================
     5. CALCUL PRINCIPAL
  ===================================================== */

  function computePipValuePerStandardLot(pairKey, accountCurrency) {
    const pair = PAIRS[pairKey];
    if (!pair) return null;

    const pipSize = pipSizeFor(pairKey);
    const pipValueInQuote = pipSize * STANDARD_LOT_UNITS;

    const quoteToUsd = currentRates[pair.quote];
    const accountToUsd = currentRates[accountCurrency];

    if (!quoteToUsd || !accountToUsd) return null;

    const pipValueInUsd = pipValueInQuote * quoteToUsd;
    const pipValueInAccount = pipValueInUsd / accountToUsd;

    return pipValueInAccount;
  }

  function updateCalculator() {
    const pairKey = lotPair.value;
    const accountCurrency = lotAccountCurrency.value;
    const balance = parseFloat(lotBalance.value);
    const riskPct = parseFloat(lotRisk.value);
    const stopPips = parseFloat(lotStop.value);

    if (!balance || balance <= 0 || !riskPct || riskPct <= 0 || !stopPips || stopPips <= 0) {
      setVerdict("Renseigne tes paramètres", "pending");
      resetOutputs();
      return;
    }

    const pipValuePerLot = computePipValuePerStandardLot(pairKey, accountCurrency);

    if (!pipValuePerLot) {
      setVerdict("Paire non reconnue", "invalid");
      resetOutputs();
      return;
    }

    const riskAmount = balance * (riskPct / 100);
    const lots = riskAmount / (stopPips * pipValuePerLot);

    if (!isFinite(lots) || lots <= 0) {
      setVerdict("Paramètres invalides", "invalid");
      resetOutputs();
      return;
    }

    lotRiskAmount.textContent = formatCurrency(riskAmount, accountCurrency);
    lotPipValue.textContent = `${formatCurrency(pipValuePerLot, accountCurrency)} / pip`;
    lotStandard.textContent = `${lots.toFixed(2)} lot${lots >= 2 ? "s" : ""}`;
    lotMini.textContent = `${(lots * 10).toFixed(2)} mini-lots`;
    lotMicro.textContent = `${(lots * 100).toFixed(2)} micro-lots`;

    if (lots < 0.01) {
      setVerdict(`⚠️ Taille très faible : ${lots.toFixed(3)} lot`, "invalid");
    } else {
      setVerdict(`✅ ${lots.toFixed(2)} lot${lots >= 2 ? "s" : ""} recommandé${lots >= 2 ? "s" : ""}`, "ready");
    }
  }

  /* =====================================================
     6. ÉVÉNEMENTS + INIT
  ===================================================== */

  [lotPair, lotAccountCurrency, lotBalance, lotRisk, lotStop].forEach((el) => {
    el.addEventListener("input", updateCalculator);
    el.addEventListener("change", updateCalculator);
  });

  lotResetBtn.addEventListener("click", () => {
    lotPair.selectedIndex = 0;
    lotStop.value = "";
    updateCalculator();
  });

  updateCalculator();

  fetchLiveRates().then((result) => {
    currentRates = result.rates;
    setRatesStatus(result);
    updateCalculator();
  });
})();