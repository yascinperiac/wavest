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

  // Code devise -> code pays ISO2 pour flagcdn.com
  const CURRENCY_FLAG = {
    EUR: "eu",
    USD: "us",
    GBP: "gb",
    JPY: "jp",
    CHF: "ch",
    CAD: "ca",
    AUD: "au",
    NZD: "nz",
  };

  function flagUrl(currency) {
    const iso = CURRENCY_FLAG[currency];
    return iso ? `https://flagcdn.com/w80/${iso}.png` : "";
  }

  // Code devise -> symbole affiché dans le champ "Solde du compte"
  const CURRENCY_SYMBOL = {
    EUR: "€",
    USD: "$",
    GBP: "£",
    JPY: "¥",
    CHF: "Fr",
    CAD: "$",
    AUD: "$",
    NZD: "$",
  };

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
  const lotPairSelect = document.getElementById("lotPairSelect");
  const lotPairTrigger = document.getElementById("lotPairTrigger");
  const lotPairOptions = document.getElementById("lotPairOptions");
  const lotPairFlagA = document.getElementById("lotPairFlagA");
  const lotPairFlagB = document.getElementById("lotPairFlagB");
  const lotPairTriggerCode = document.getElementById("lotPairTriggerCode");
  const lotAccountCurrency = document.getElementById("lotAccountCurrency");
  const currencyButtons = Array.from(document.querySelectorAll(".currency-btn"));
  const lotBalanceCurrency = document.getElementById("lotBalanceCurrency");
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

  function setAccountCurrency(code) {
    lotAccountCurrency.value = code;
    currencyButtons.forEach((btn) => {
      const active = btn.dataset.currency === code;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    if (lotBalanceCurrency) {
      lotBalanceCurrency.textContent = CURRENCY_SYMBOL[code] || code;
    }
    updateCalculator();
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
     6. SÉLECTEUR DE PAIRE (drapeaux doubles)
  ===================================================== */

  function syncPairTrigger() {
    const pair = PAIRS[lotPair.value];
    if (!pair) return;
    lotPairFlagA.src = flagUrl(pair.base);
    lotPairFlagA.alt = pair.base;
    lotPairFlagB.src = flagUrl(pair.quote);
    lotPairFlagB.alt = pair.quote;
    lotPairTriggerCode.textContent = `${pair.base}/${pair.quote}`;

    lotPairOptions.querySelectorAll(".pair-option").forEach((opt) => {
      opt.classList.toggle("is-selected", opt.dataset.pair === lotPair.value);
    });
  }

  function buildPairOptions() {
    Object.keys(PAIRS).forEach((key) => {
      const pair = PAIRS[key];
      const opt = document.createElement("button");
      opt.type = "button";
      opt.className = "pair-option";
      opt.setAttribute("role", "option");
      opt.dataset.pair = key;
      opt.innerHTML = `
        <span class="pair-flags">
          <img class="flag-a" src="${flagUrl(pair.base)}" alt="${pair.base}">
          <img class="flag-b" src="${flagUrl(pair.quote)}" alt="${pair.quote}">
        </span>
        <span>${pair.base}/${pair.quote}</span>
      `;
      opt.addEventListener("click", () => {
        lotPair.value = key;
        syncPairTrigger();
        closePairOptions();
        updateCalculator();
      });
      lotPairOptions.appendChild(opt);
    });
  }

  function openPairOptions() {
    lotPairOptions.hidden = false;
    lotPairSelect.classList.add("is-open");
    lotPairTrigger.setAttribute("aria-expanded", "true");
  }

  function closePairOptions() {
    lotPairOptions.hidden = true;
    lotPairSelect.classList.remove("is-open");
    lotPairTrigger.setAttribute("aria-expanded", "false");
  }

  lotPairTrigger.addEventListener("click", () => {
    if (lotPairOptions.hidden) openPairOptions();
    else closePairOptions();
  });

  document.addEventListener("click", (e) => {
    if (!lotPairSelect.contains(e.target)) closePairOptions();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePairOptions();
  });

  buildPairOptions();
  syncPairTrigger();

  /* =====================================================
     7. ÉVÉNEMENTS + INIT
  ===================================================== */

  [lotPair, lotBalance, lotRisk, lotStop].forEach((el) => {
    el.addEventListener("input", updateCalculator);
    el.addEventListener("change", updateCalculator);
  });

  currencyButtons.forEach((btn) => {
    btn.addEventListener("click", () => setAccountCurrency(btn.dataset.currency));
  });

  lotResetBtn.addEventListener("click", () => {
    lotPair.selectedIndex = 0;
    syncPairTrigger();
    lotStop.value = "";
    setAccountCurrency("EUR");
  });

  updateCalculator();

  fetchLiveRates().then((result) => {
    currentRates = result.rates;
    setRatesStatus(result);
    updateCalculator();
  });
})();