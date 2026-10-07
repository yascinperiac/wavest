/* ==========================================================
   Wavest — Exercices « Avant / Après »
   L'élève analyse comme Yascin : Daily → Weekly → 4H.
   Chaque étape : image avant, question(s), puis image de correction.
   Images : liens TradingView (bouton appareil photo → Copier le lien).
========================================================== */
(function () {
  "use strict";

  var PATTERNS = ["IETE", "M1 small", "M1 big", "M2", "M3", "M4", "M5",
                  "ETE", "W1 small", "W1 big", "W2", "W3", "W4", "W5", "EDGE"];
  var CONFIRMATIONS = ["Deceleration", "FC-27", "FC-68",
                       "IETE with bos", "IETE without bos", "M with bos", "M without bos",
                       "ETE with bos", "ETE without bos", "W with bos", "W without bos"];

  /* ---------- LES EXERCICES ----------
     Pour en ajouter un : copier un bloc { ... } et changer les liens / réponses. */
  var EXERCISES = [
    {
      title: { fr: "Exercice 1", en: "Drill 1" },
      result: {
        label: "TP ✅", tone: "good",
        text: {
          fr: "1/3 de la position sécurisé au 0,618 du Fibonacci inversé, puis les 2/3 restants laissés courir jusqu'au TP Daily.",
          en: "1/3 of the position secured at the 0.618 of the inverted Fibonacci, then the remaining 2/3 left to run to the Daily TP."
        },
        image: "https://www.tradingview.com/x/Md0cKM67/"
      },
      steps: [
        {
          tf: "Daily", label: { fr: "Tendance", en: "Trend" },
          before: "https://www.tradingview.com/x/1AAyM6N2/",
          after: "https://www.tradingview.com/x/ZKcdaCmY/",
          questions: [{ q: { fr: "Quelle est la tendance Daily ?", en: "What is the Daily trend?" }, choices: ["Haussière", "Baissière"], answer: "Baissière" }],
          explain: { fr: "Tendance baissière en Daily.", en: "Bearish trend on the Daily." }
        },
        {
          tf: "Daily", label: { fr: "Pattern", en: "Pattern" },
          before: "https://www.tradingview.com/x/1AAyM6N2/",
          after: "https://www.tradingview.com/x/JzQuLfWP/",
          questions: [{ q: { fr: "Quel pattern Daily repères-tu ?", en: "Which Daily pattern do you spot?" }, choices: PATTERNS, answer: "ETE" }],
          explain: { fr: "Une ETE se forme : pattern baissier, dans le sens de la tendance.", en: "A head and shoulders (ETE) is forming: a bearish pattern, in line with the trend." }
        },
        {
          tf: "Weekly", label: { fr: "Validation", en: "Validation" },
          before: "https://www.tradingview.com/x/B5JCbIGS/",
          after: "https://www.tradingview.com/x/H2LVnnp4/",
          questions: [{ q: { fr: "Le Weekly est-il favorable à la vente ?", en: "Does the Weekly support a sell?" }, choices: ["Oui", "Non"], answer: "Oui" }],
          explain: { fr: "Weekly favorable : 2 critères sur 3 valident la vente.", en: "Weekly supportive: 2 out of 3 criteria validate the sell." }
        },
        {
          tf: "4H", label: { fr: "Confirmation", en: "Confirmation" },
          before: "https://www.tradingview.com/x/ZMBrjGGy/",
          after: "https://www.tradingview.com/x/OommHK0H/",
          questions: [
            { q: { fr: "Quelle confirmation 4H ?", en: "Which 4H confirmation?" }, choices: CONFIRMATIONS, answer: "FC-68" },
            { q: { fr: "Tu prends le trade ?", en: "Do you take the trade?" }, choices: ["Oui", "Non"], answer: "Oui" }
          ],
          explain: {
            fr: "Fibonacci inversé tracé sur l'IETE en 4H : la zone de profit -0,68 tombe pile dans la zone d'intérêt Daily. Setup validé.",
            en: "Inverted Fibonacci drawn on the 4H inverse head and shoulders: the -0.68 profit zone lands right in the Daily zone of interest. Setup validated."
          }
        }
      ]
    }
  ];

  /* ---------- Langue ---------- */
  var UI = {
    score: { fr: "Score", en: "Score" },
    before: { fr: "Avant", en: "Before" },
    correction: { fr: "Correction", en: "Correction" },
    openTv: { fr: "Ouvrir en grand sur TradingView", en: "Open full size on TradingView" },
    fallback: { fr: "📈 Ouvrir le graphique sur TradingView ↗", en: "📈 Open the chart on TradingView ↗" },
    caption: { fr: "Clique sur le graphique pour l'ouvrir en grand.", en: "Click the chart to open it full size." },
    altBefore: { fr: "à analyser", en: "to analyse" },
    altAfter: { fr: "corrigé", en: "with correction" },
    good: { fr: "✅ Bien vu !", en: "✅ Well spotted!" },
    bad: { fr: "❌ Pas tout à fait.", en: "❌ Not quite." },
    check: { fr: "Valider ma réponse", en: "Check my answer" },
    next: { fr: "Étape suivante →", en: "Next step →" },
    result: { fr: "Voir le résultat →", en: "See the result →" },
    perfect: { fr: "Analyse parfaite : tu as lu le setup exactement comme il fallait.", en: "Perfect analysis: you read the setup exactly right." },
    okish: { fr: "Bonne lecture. Revois les étapes manquées avant de passer au suivant.", en: "Good read. Review the steps you missed before moving on." },
    low: { fr: "Reprends l'exercice étape par étape, et relis le chapitre Setup si besoin.", en: "Go through the drill again step by step, and re-read the Setup chapter if needed." },
    tradeResult: { fr: "Résultat du trade", en: "Trade result" },
    resultAlt: { fr: "Suite du trade avec les prises de profit", en: "Trade follow-through with profit taking" },
    resultFallback: { fr: "📈 Voir la suite du trade sur TradingView ↗", en: "📈 See the trade follow-through on TradingView ↗" },
    resultCaption: { fr: "La suite du trade, avec les deux prises de profit.", en: "The trade follow-through, with both profit takes." },
    restart: { fr: "Recommencer", en: "Start again" },
    nextEx: { fr: "Exercice suivant →", en: "Next drill →" },
    ctaTag: { fr: "Aller plus loin", en: "Go further" },
    ctaTitle: { fr: "Tu veux lire ces setups tout seul ?", en: "Want to read these setups on your own?" },
    ctaText: {
      fr: "Dans le programme Wavest, je t'apprends la méthode complète, étape par étape : zones, patterns, confirmations 4H, gestion du risque. Avec mes outils et les stats de plus de 800 trades backtestés.",
      en: "In the Wavest programme, I teach you the full method step by step: zones, patterns, 4H confirmations, risk management. With my tools and the stats from 800+ backtested trades."
    },
    ctaBtn: { fr: "Découvrir le programme →", en: "Discover the programme →" },
    disclaimer: {
      fr: "⚠️ Exercice pédagogique sur un trade passé. Les performances passées ne préjugent pas des performances futures. Le trading comporte des risques de perte en capital.",
      en: "⚠️ Educational drill based on a past trade. Past performance does not guarantee future results. Trading involves a risk of capital loss."
    }
  };
  var CHOICE_EN = { "Haussière": "Bullish", "Baissière": "Bearish", "Oui": "Yes", "Non": "No" };
  function lang() {
    try { if (window.WavestI18n && window.WavestI18n.getLang) return window.WavestI18n.getLang(); } catch (e) {}
    return "fr";
  }
  function tr(v) { return (v && typeof v === "object") ? (v[lang()] || v.fr) : v; }
  function u(key) { return tr(UI[key]); }
  function choiceLabel(c) { return lang() === "en" && CHOICE_EN[c] ? CHOICE_EN[c] : c; }

  /* ---------- Suivi GA4 ---------- */
  var CTA_URL = "https://go.wavest.fr/?utm_source=wavest.fr&utm_medium=exercice&utm_campaign=exercice_avant_apres";
  function track(name, params) {
    try { if (typeof window.gtag === "function") window.gtag("event", name, params || {}); } catch (e) {}
    // Clarity : permet de filtrer les enregistrements de session par événement
    try { if (typeof window.clarity === "function") window.clarity("event", name); } catch (e) {}
  }
  var startedFor = {};

  /* ---------- Outils ---------- */
  function tvId(url) {
    var m = String(url || "").match(/tradingview\.com\/x\/([A-Za-z0-9]+)/);
    return m ? m[1] : null;
  }
  function tvImage(url) {
    var id = tvId(url);
    return id ? "https://s3.tradingview.com/snapshots/" + id.charAt(0).toLowerCase() + "/" + id + ".png" : url;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var STORE = "wavest-exercices-v1";
  function loadBest() { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { return {}; } }
  function saveBest(i, score) {
    try { var b = loadBest(); if (!(i in b) || score > b[i]) { b[i] = score; localStorage.setItem(STORE, JSON.stringify(b)); } } catch (e) {}
  }

  /* ---------- État ---------- */
  var root = document.getElementById("exApp");
  if (!root) return;
  var completedRun = false;
  var exIdx = 0, stepIdx = 0, picks = {}, checked = false, score = 0, total = 0, view = "before";

  function ex() { return EXERCISES[exIdx]; }
  function totalQuestions(e) { return e.steps.reduce(function (n, s) { return n + s.questions.length; }, 0); }

  /* ---------- Rendu ---------- */
  function renderPicker() {
    var best = loadBest();
    if (EXERCISES.length < 2) return "";
    return '<div class="ex-picker">' + EXERCISES.map(function (e, i) {
      var t = totalQuestions(e);
      return '<button type="button" class="ex-pick' + (i === exIdx ? " is-active" : "") + '" data-ex="' + i + '">' +
        esc(tr(e.title)) + (i in best ? ' <span class="ex-pick-score">' + best[i] + "/" + t + "</span>" : "") + "</button>";
    }).join("") + "</div>";
  }

  function renderStepper() {
    return '<ol class="ex-stepper">' + ex().steps.map(function (s, i) {
      var cls = i < stepIdx ? "is-done" : (i === stepIdx ? "is-current" : "");
      return '<li class="' + cls + '"><span class="ex-dot">' + (i < stepIdx ? "✓" : i + 1) + '</span><span class="ex-st-txt"><b>' +
        esc(s.tf) + "</b> · " + esc(tr(s.label)) + "</span></li>";
    }).join("") + "</ol>";
  }

  function renderImage(step) {
    var url = view === "after" ? step.after : step.before;
    var toggle = checked
      ? '<div class="ex-view" role="tablist">' +
          '<button type="button" data-view="before" class="' + (view === "before" ? "is-on" : "") + '">' + u("before") + '</button>' +
          '<button type="button" data-view="after" class="' + (view === "after" ? "is-on" : "") + '">' + u("correction") + '</button>' +
        "</div>"
      : "";
    return '<figure class="ex-figure">' +
      '<div class="ex-fig-head"><span class="ex-tf">' + esc(step.tf) + "</span>" + toggle + "</div>" +
      '<a class="ex-img-link" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer" title="' + esc(u("openTv")) + '">' +
        '<img class="ex-img" src="' + esc(tvImage(url)) + '" alt="' + esc(step.tf + " " + (view === "after" ? u("altAfter") : u("altBefore"))) + '" loading="lazy">' +
        '<span class="ex-img-fallback">' + u("fallback") + '</span>' +
      "</a>" +
      '<figcaption>' + esc(u("caption")) + '</figcaption>' +
    "</figure>";
  }

  function renderQuestions(step) {
    return step.questions.map(function (qq, qi) {
      var key = stepIdx + "-" + qi;
      var chips = qq.choices.map(function (c) {
        var cls = "ex-chip";
        if (picks[key] === c) cls += " is-picked";
        if (checked) {
          if (c === qq.answer) cls += " is-right";
          else if (picks[key] === c) cls += " is-wrong";
        }
        return '<button type="button" class="' + cls + '" data-key="' + key + '" data-val="' + esc(c) + '"' + (checked ? " disabled" : "") + ">" + esc(choiceLabel(c)) + "</button>";
      }).join("");
      return '<div class="ex-q"><p class="ex-q-title">' + esc(tr(qq.q)) + '</p><div class="ex-chips' + (qq.choices.length > 4 ? " is-many" : "") + '">' + chips + "</div></div>";
    }).join("");
  }

  function render() {
    var e = ex();
    if (stepIdx >= e.steps.length) return renderEnd();
    var step = e.steps[stepIdx];
    var allPicked = step.questions.every(function (_, qi) { return picks[stepIdx + "-" + qi]; });

    var feedback = "";
    if (checked) {
      var good = step.questions.every(function (qq, qi) { return picks[stepIdx + "-" + qi] === qq.answer; });
      feedback = '<div class="ex-feedback ' + (good ? "is-good" : "is-bad") + '">' +
        "<strong>" + (good ? u("good") : u("bad")) + "</strong>" +
        "<p>" + esc(tr(step.explain)) + "</p></div>";
    }

    var btn = !checked
      ? '<button type="button" class="ex-btn" data-act="check"' + (allPicked ? "" : " disabled") + ">" + u("check") + "</button>"
      : '<button type="button" class="ex-btn" data-act="next">' + (stepIdx === e.steps.length - 1 ? u("result") : u("next")) + "</button>";

    root.innerHTML = renderPicker() +
      '<div class="ex-card">' +
        '<div class="ex-head"><h2>' + esc(tr(e.title)) + '</h2><span class="ex-score">' + u("score") + ' : ' + score + " / " + total + "</span></div>" +
        renderStepper() +
        '<div class="ex-body">' + renderImage(step) +
          '<div class="ex-side">' + renderQuestions(step) + feedback + btn + "</div>" +
        "</div>" +
      "</div>";
    bindImgFallback();
  }

  function renderEnd() {
    var e = ex(), t = totalQuestions(e);
    saveBest(exIdx, score);
    if (!completedRun) {
      completedRun = true;
      track("exercise_complete", { exercise: tr(e.title), score: score, total: t });
    }
    var pct = t ? score / t : 0;
    var msg = pct === 1 ? u("perfect") : pct >= 0.6 ? u("okish") : u("low");
    var hasNext = exIdx < EXERCISES.length - 1;
    setTimeout(bindImgFallback, 0);
    root.innerHTML = renderPicker() +
      '<div class="ex-card ex-end">' +
        renderStepper() +
        '<div class="ex-end-score"><span class="ex-big">' + score + " / " + t + "</span><p>" + esc(msg) + "</p></div>" +
        '<div class="ex-result ex-result--' + e.result.tone + '"><span>' + u("tradeResult") + '</span><strong>' + esc(tr(e.result.label)) + "</strong><p>" + esc(tr(e.result.text)) + "</p></div>" +
        (e.result.image
          ? '<figure class="ex-figure ex-result-fig"><a class="ex-img-link" href="' + esc(e.result.image) + '" target="_blank" rel="noopener noreferrer" title="' + esc(u("openTv")) + '">' +
              '<img class="ex-img" src="' + esc(tvImage(e.result.image)) + '" alt="' + esc(u("resultAlt")) + '" loading="lazy">' +
              '<span class="ex-img-fallback">' + u("resultFallback") + '</span></a>' +
              '<figcaption>' + esc(u("resultCaption")) + '</figcaption></figure>'
          : "") +
        '<div class="ex-cta">' +
          '<p class="ex-cta-tag">' + u("ctaTag") + '</p>' +
          '<h3>' + esc(u("ctaTitle")) + '</h3>' +
          '<p>' + esc(u("ctaText")) + '</p>' +
          '<a class="ex-cta-btn" href="' + CTA_URL + '" target="_blank" rel="noopener" data-cta="1">' + u("ctaBtn") + '</a>' +
        '</div>' +
        '<div class="ex-end-actions">' +
          '<button type="button" class="ex-btn ex-btn--ghost" data-act="restart">' + u("restart") + '</button>' +
          (hasNext ? '<button type="button" class="ex-btn" data-act="nextEx">' + u("nextEx") + '</button>' : "") +
        "</div>" +
        '<p class="ex-disclaimer">' + esc(u("disclaimer")) + '</p>' +
      "</div>";
  }

  function bindImgFallback() {
    var img = root.querySelector(".ex-img");
    if (!img) return;
    img.addEventListener("error", function () { img.closest(".ex-img-link").classList.add("is-broken"); });
  }

  function start(i) {
    completedRun = false;
    exIdx = i; stepIdx = 0; picks = {}; checked = false; score = 0; total = 0; view = "before";
    render();
  }

  /* ---------- Événements ---------- */
  root.addEventListener("click", function (ev) {
    var link = ev.target.closest("a[data-cta]");
    if (link) { track("exercise_cta_click", { exercise: tr(ex().title), score: score }); return; }
    var t = ev.target.closest("button");
    if (!t) return;
    if (t.dataset.key && !checked) { picks[t.dataset.key] = t.dataset.val; render(); return; }
    if (t.dataset.view) { view = t.dataset.view; render(); return; }
    if (t.dataset.ex) { start(+t.dataset.ex); return; }
    var act = t.dataset.act;
    if (act === "check") {
      if (!startedFor[exIdx]) { startedFor[exIdx] = true; track("exercise_start", { exercise: tr(ex().title) }); }
      var step = ex().steps[stepIdx];
      step.questions.forEach(function (qq, qi) { total++; if (picks[stepIdx + "-" + qi] === qq.answer) score++; });
      checked = true; view = "after"; render();
    } else if (act === "next") {
      stepIdx++; checked = false; view = "before"; render();
      root.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (act === "restart") start(exIdx);
    else if (act === "nextEx") start(exIdx + 1);
  });

  // Changement FR/EN : i18n.js met à jour <html lang>, on redessine
  if (window.MutationObserver) {
    new MutationObserver(function () { render(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  start(0);
})();
