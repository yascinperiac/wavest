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
          questions: [{ q: { fr: "Quelle est la tendance Daily\u00a0?", en: "What is the Daily trend?" }, choices: ["Haussière", "Baissière"], answer: "Baissière" }],
          explain: { fr: "Tendance baissière en Daily.", en: "Bearish trend on the Daily." }
        },
        {
          tf: "Daily", label: { fr: "Pattern", en: "Pattern" },
          before: "https://www.tradingview.com/x/1AAyM6N2/",
          after: "https://www.tradingview.com/x/JzQuLfWP/",
          questions: [{ q: { fr: "Quel pattern Daily repères-tu\u00a0?", en: "Which Daily pattern do you spot?" }, choices: PATTERNS, answer: "ETE" }],
          explain: { fr: "Une ETE se forme : pattern baissier, dans le sens de la tendance.", en: "A head and shoulders (ETE) is forming: a bearish pattern, in line with the trend." }
        },
        {
          tf: "Weekly", label: { fr: "Validation", en: "Validation" },
          before: "https://www.tradingview.com/x/B5JCbIGS/",
          after: "https://www.tradingview.com/x/H2LVnnp4/",
          questions: [{ q: { fr: "Le Weekly est-il favorable à la vente\u00a0?", en: "Does the Weekly support a sell?" }, choices: ["Oui", "Non"], answer: "Oui" }],
          explain: { fr: "Weekly favorable : 2 critères sur 3 valident la vente.", en: "Weekly supportive: 2 out of 3 criteria validate the sell." }
        },
        {
          tf: "4H", label: { fr: "Confirmation", en: "Confirmation" },
          before: "https://www.tradingview.com/x/ZMBrjGGy/",
          after: "https://www.tradingview.com/x/OommHK0H/",
          questions: [
            { q: { fr: "Quelle confirmation 4H\u00a0?", en: "Which 4H confirmation?" }, choices: CONFIRMATIONS, answer: "FC-68" },
            { q: { fr: "Tu prends le trade\u00a0?", en: "Do you take the trade?" }, choices: ["Oui", "Non"], answer: "Oui" }
          ],
          explain: {
            fr: "Fibonacci inversé tracé sur l'IETE en 4H : la zone de profit -0,68 tombe pile dans la zone d'intérêt Daily. Setup validé.",
            en: "Inverted Fibonacci drawn on the 4H inverse head and shoulders: the -0.68 profit zone lands right in the Daily zone of interest. Setup validated."
          }
        }
      ]
    },
    {
      /* Exercice 2 — Setup Pattern 4H (AUD/CAD, sept. 2026)
         Astuce : ajouter draft: true à un exercice le cache du site
         (visible pour test avec ?draft=1 dans l'URL). */
      title: { fr: "Exercice 2", en: "Drill 2" },
      result: {
        label: { fr: "Setup : TP ✅ · En réel : BE", en: "Setup: TP ✅ · Live: BE" }, tone: "good",
        text: {
          fr: "Le setup a atteint le TP au -0,27 du Fibo Daily. En réel, ma règle de money management m'a sorti à break-even : le prix a touché +1 %, j'ai remonté mon SL au point d'entrée, puis le prix est revenu dessus avant de repartir vers le TP. Résultat : 0 %. Un setup juste ne garantit pas un gain, mais la règle protège le capital.",
          en: "The setup reached the TP at the -0.27 of the Daily Fibonacci. Live, my money management rule took me out at break-even: price hit +1%, I moved my SL to the entry, then price came back to it before heading to the TP. Result: 0%. A correct setup doesn't guarantee a win, but the rule protects the capital."
        },
        image: "https://www.tradingview.com/x/RAmCm07Y/"
      },
      steps: [
        {
          tf: "Daily", label: { fr: "Tendance", en: "Trend" },
          before: "https://www.tradingview.com/x/5yOAMnVP/",
          after: "https://www.tradingview.com/x/xBf442kq/",
          questions: [{ q: { fr: "Quelle est la tendance Daily\u00a0?", en: "What is the Daily trend?" }, choices: ["Haussière", "Baissière"], answer: "Haussière" }],
          explain: {
            fr: "Le dernier plus haut est plus récent que le dernier plus bas, et le dernier plus bas n'est pas cassé en clôture (on ignore les mèches). Tendance haussière.",
            en: "The last high is more recent than the last low, and the last low is not broken on a closing basis (wicks are ignored). Bullish trend."
          }
        },
        {
          tf: "Daily", label: { fr: "Pattern", en: "Pattern" },
          before: "https://www.tradingview.com/x/OJ8BgVzy/",
          after: "https://www.tradingview.com/x/Xgf5UJe9/",
          questions: [{ q: { fr: "Quel pattern Daily repères-tu\u00a0?", en: "Which Daily pattern do you spot?" }, choices: ["M1 small", "M4", "M5", "IETE"], answer: "M4" }],
          explain: {
            fr: "C'est un M4 : le P3 ne casse pas le P1, donc on attendra que le P4 revienne au niveau du P2. Si P1 et P3 sont au même niveau, P2 et P4 le sont aussi.",
            en: "It's an M4: P3 doesn't break P1, so we wait for P4 to come back to the level of P2. If P1 and P3 are at the same level, so are P2 and P4."
          }
        },
        {
          tf: "Weekly", label: { fr: "Validation", en: "Validation" },
          before: "https://www.tradingview.com/x/GtRwNcl7/",
          after: "https://www.tradingview.com/x/shuZa2Yz/",
          questions: [{ q: { fr: "Le Weekly valide-t-il l'achat\u00a0?", en: "Does the Weekly validate the buy?" }, choices: ["Oui", "Non"], answer: "Oui" }],
          explain: {
            fr: "Pas de zone S&D, clôture de bougie neutre, pas de pattern en cours. Seule la tendance compte, et elle est haussière : 1/1 à l'achat, le Weekly valide.",
            en: "No S&D zone, neutral candle close, no pattern in progress. Only the trend counts, and it's bullish: 1/1 for the buy, the Weekly validates."
          }
        },
        {
          tf: "Daily", label: { fr: "Attente du P4", en: "Waiting for P4" },
          before: "https://www.tradingview.com/x/dm9pgoB1/",
          after: "https://www.tradingview.com/x/JAZdWuRl/",
          questions: [{ q: { fr: "Le P4 est-il revenu au niveau du P2 : peut-on passer en 4H\u00a0?", en: "Is P4 back at the level of P2: can we move to the 4H?" }, choices: ["Oui", "Non"], answer: "Oui" }],
          explain: {
            fr: "Sur un M4, le P3 ne casse pas le P1 : le P4 doit revenir au niveau du P2 avant de chercher une entrée. C'est le cas ici, on passe en 4H.",
            en: "On an M4, P3 doesn't break P1: P4 must come back to the level of P2 before looking for an entry. That's the case here, so we move to the 4H."
          }
        },
        {
          tf: "4H", label: { fr: "Entrée", en: "Entry" },
          before: "https://www.tradingview.com/x/43jNgWD9/",
          after: "https://www.tradingview.com/x/RAmCm07Y/",
          questions: [
            { q: { fr: "Quel pattern 4H valide l'entrée\u00a0?", en: "Which 4H pattern validates the entry?" }, choices: ["M with bos", "M without bos", "IETE with bos", "IETE without bos"], answer: "M without bos" },
            { q: { fr: "Bonus : où places-tu ton prix d'entrée (PE)\u00a0?", en: "Bonus: where do you place your entry price?" }, choices: ["0,618 Fibo 4H", "0,786 Fibo 4H", "1 Fibo 4H", "-0,27 Fibo 4H"], answer: "0,786 Fibo 4H" },
            { q: { fr: "Bonus : où places-tu ton stop loss (SL)\u00a0?", en: "Bonus: where do you place your stop loss?" }, choices: ["Sous le 0,786 Fibo 4H", "Sous le 1 Fibo 4H", "Sous le dernier plus bas Daily", "Sous le -0,27 Fibo 4H"], answer: "Sous le 1 Fibo 4H" },
            { q: { fr: "Bonus : où places-tu ton take profit (TP)\u00a0?", en: "Bonus: where do you place your take profit?" }, choices: ["-0,27 Fibo 4H", "-0,68 Fibo 4H", "-0,27 Fibo Daily", "0 Fibo Daily"], answer: "-0,27 Fibo Daily" }
          ],
          explain: {
            fr: "M without bos en 4H, dans la zone d'intérêt Daily. Entrée limite au 0,786 du Fibo 4H (0,9914), SL sous le 1 du Fibo 4H (0,9891), TP final au -0,27 du Fibo Daily (1,0011), avec 1/3 de la position prévu au -0,27 du Fibo 4H.",
            en: "M without bos on the 4H, inside the Daily zone of interest. Limit entry at the 0.786 of the 4H Fibonacci (0.9914), SL below the 1 of the 4H Fibonacci (0.9891), final TP at the -0.27 of the Daily Fibonacci (1.0011), with 1/3 of the position planned at the -0.27 of the 4H Fibonacci."
          }
        }
      ]
    }
  ];
  // Exercices en brouillon : cachés, sauf avec ?draft=1 dans l'URL (pour tester)
  EXERCISES = EXERCISES.filter(function (e) { return !e.draft || /[?&]draft=1\b/.test(location.search); });

  /* ---------- Langue ---------- */
  var UI = {
    score: { fr: "Score", en: "Score" },
    before: { fr: "Avant", en: "Before" },
    correction: { fr: "Correction", en: "Correction" },
    openTv: { fr: "Agrandir le graphique", en: "Enlarge the chart" },
    onTv: { fr: "Ouvrir sur TradingView", en: "Open on TradingView" },
    close: { fr: "Fermer", en: "Close" },
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
    resultCaption: { fr: "La suite du trade.", en: "The trade follow-through." },
    restart: { fr: "Recommencer", en: "Start again" },
    shareTitle: { fr: "Défie un pote", en: "Challenge a friend" },
    shareText: { fr: "J'ai eu {s}/{t} à l'exercice Wavest : lire un vrai setup Forex étape par étape. Tu fais mieux ?", en: "I scored {s}/{t} on the Wavest drill: reading a real Forex setup step by step. Can you beat it?" },
    shareTextPerfect: { fr: "J'ai eu {s}/{t} à l'exercice Wavest : lire un vrai setup Forex étape par étape. Sans faute. À toi de jouer !", en: "I scored {s}/{t} on the Wavest drill: reading a real Forex setup step by step. Flawless. Your turn!" },
    shareNative: { fr: "Partager", en: "Share" },
    shareCopy: { fr: "Copier le lien", en: "Copy link" },
    shareCopied: { fr: "Lien copié ✓", en: "Link copied ✓" },
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
  var CHOICE_EN = { "Haussière": "Bullish", "Baissière": "Bearish", "Oui": "Yes", "Non": "No",
    "0,618 Fibo 4H": "0.618 4H Fibo", "0,786 Fibo 4H": "0.786 4H Fibo", "1 Fibo 4H": "1 4H Fibo", "-0,27 Fibo 4H": "-0.27 4H Fibo",
    "-0,68 Fibo 4H": "-0.68 4H Fibo", "-0,27 Fibo Daily": "-0.27 Daily Fibo", "0 Fibo Daily": "0 Daily Fibo",
    "Sous le 0,786 Fibo 4H": "Below the 0.786 4H Fibo", "Sous le 1 Fibo 4H": "Below the 1 4H Fibo",
    "Sous le dernier plus bas Daily": "Below the last Daily low", "Sous le -0,27 Fibo 4H": "Below the -0.27 4H Fibo" };
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
      '<a class="ex-img-link" data-lb="step" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer" title="' + esc(u("openTv")) + '">' +
        '<img class="ex-img" src="' + esc(tvImage(url)) + '" alt="' + esc(step.tf + " " + (view === "after" ? u("altAfter") : u("altBefore"))) + '" loading="lazy">' +
        '<span class="ex-img-fallback">' + u("fallback") + '</span><span class="ex-zoomhint" aria-hidden="true">⤢</span>' +
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
        renderShare(score, t) +
        '<div class="ex-result ex-result--' + e.result.tone + '"><span>' + u("tradeResult") + '</span><strong>' + esc(tr(e.result.label)) + "</strong><p>" + esc(tr(e.result.text)) + "</p></div>" +
        (e.result.image
          ? '<figure class="ex-figure ex-result-fig"><a class="ex-img-link" data-lb="result" href="' + esc(e.result.image) + '" target="_blank" rel="noopener noreferrer" title="' + esc(u("openTv")) + '">' +
              '<img class="ex-img" src="' + esc(tvImage(e.result.image)) + '" alt="' + esc(u("resultAlt")) + '" loading="lazy">' +
              '<span class="ex-img-fallback">' + u("resultFallback") + '</span><span class="ex-zoomhint" aria-hidden="true">⤢</span></a>' +
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

  /* ---------- Partage du score ---------- */
  var SHARE_URL = "https://wavest.fr/pages/exercices.html";
  function shareLink(medium) {
    return SHARE_URL + "?utm_source=" + medium + "&utm_medium=share&utm_campaign=exercice_score";
  }
  function shareMsg(s, t) { return u(s === t ? "shareTextPerfect" : "shareText").replace("{s}", s).replace("{t}", t); }
  var ICO = {
    share: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z"/></svg>',
    link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
  };
  function renderShare(s, t) {
    var msg = shareMsg(s, t);
    var wa = "https://wa.me/?text=" + encodeURIComponent(msg + " " + shareLink("whatsapp"));
    var x = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(msg) + "&url=" + encodeURIComponent(shareLink("x"));
    return '<div class="ex-share">' +
      '<p class="ex-share-title">' + esc(u("shareTitle")) + '</p>' +
      '<div class="ex-share-btns">' +
        (navigator.share ? '<button type="button" class="ex-share-btn ex-share-btn--main" data-share="native">' + ICO.share + '<span>' + esc(u("shareNative")) + '</span></button>' : "") +
        '<a class="ex-share-btn ex-share-btn--wa" href="' + esc(wa) + '" target="_blank" rel="noopener noreferrer" data-share="whatsapp">' + ICO.wa + '<span>WhatsApp</span></a>' +
        '<a class="ex-share-btn" href="' + esc(x) + '" target="_blank" rel="noopener noreferrer" data-share="x">' + ICO.x + '<span>X</span></a>' +
        '<button type="button" class="ex-share-btn" data-share="copy">' + ICO.link + '<span>' + esc(u("shareCopy")) + '</span></button>' +
      '</div>' +
    '</div>';
  }
  function copyText(txt) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(txt);
    return new Promise(function (ok, ko) {
      var ta = document.createElement("textarea");
      ta.value = txt; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy") ? ok() : ko(); } catch (e) { ko(e); }
      document.body.removeChild(ta);
    });
  }
  function onShare(el) {
    var method = el.getAttribute("data-share"), t = totalQuestions(ex());
    track("exercise_share", { exercise: tr(ex().title), method: method, score: score, total: t });
    if (method === "native") {
      navigator.share({ title: "Wavest", text: shareMsg(score, t), url: shareLink("native") }).catch(function () {});
    } else if (method === "copy") {
      var label = el.querySelector("span");
      copyText(shareMsg(score, t) + " " + shareLink("copy")).then(function () {
        label.textContent = u("shareCopied"); el.classList.add("is-done");
        setTimeout(function () { label.textContent = u("shareCopy"); el.classList.remove("is-done"); }, 2200);
      }, function () {});
    }
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

  /* ---------- Pop-up (lightbox) pour agrandir les graphiques ---------- */
  var LB = null, LBK = null, lbLast = null;
  function lbItems() {
    var e = ex();
    if (LBK === "result") return [{ label: u("tradeResult"), url: e.result.image }];
    var st = e.steps[stepIdx];
    var items = [{ key: "before", label: u("before"), url: st.before }];
    if (checked) items.push({ key: "after", label: u("correction"), url: st.after });
    return items;
  }
  function lbRender() {
    var items = lbItems();
    var cur = LBK === "result" ? items[0] : (items.filter(function (x) { return x.key === view; })[0] || items[0]);
    var head = (LBK === "result" ? "" : esc(ex().steps[stepIdx].tf) + " · ") + esc(cur.label);
    LB.innerHTML =
      '<div class="tw-lb-dialog" role="dialog" aria-modal="true" aria-label="' + head + '">' +
        '<div class="tw-lb-bar"><strong>' + head + '</strong>' +
          '<button type="button" class="tw-lb-close" data-lbclose aria-label="' + esc(u("close")) + '">✕</button></div>' +
        '<div class="tw-lb-img"><img src="' + esc(tvImage(cur.url)) + '" alt="' + head + '" onerror="this.parentNode.classList.add(\'is-noimg\')">' +
          '<a class="tw-noimg" href="' + esc(cur.url) + '" target="_blank" rel="noopener noreferrer">' + u("fallback") + '</a></div>' +
        '<div class="tw-lb-foot">' +
          (items.length > 1 ? '<div class="tw-tabs tw-lb-tabs" role="tablist">' + items.map(function (x) {
            return '<button type="button" role="tab" aria-selected="' + (x === cur) + '" data-lbview="' + x.key + '">' + esc(x.label) + '</button>';
          }).join("") + '</div>' : "") +
          '<a class="tw-lb-tv" href="' + esc(cur.url) + '" target="_blank" rel="noopener noreferrer">' + esc(u("onTv")) + ' ↗</a></div>' +
      '</div>';
  }
  function openLB(kind) {
    LBK = kind; lbLast = document.activeElement;
    if (!LB) {
      LB = document.createElement("div"); LB.className = "tw-lb"; document.body.appendChild(LB);
      LB.addEventListener("click", function (ev) {
        var b = ev.target.closest("[data-lbview]");
        if (b) { view = b.getAttribute("data-lbview"); render(); lbRender(); return; }
        if (ev.target === LB || ev.target.closest("[data-lbclose]")) closeLB();
      });
    }
    lbRender();
    document.documentElement.classList.add("tw-lb-open");
    requestAnimationFrame(function () { LB.classList.add("is-open"); });
    var c = LB.querySelector(".tw-lb-close"); if (c) c.focus();
  }
  function closeLB() {
    if (!LB || !LB.classList.contains("is-open")) return;
    LB.classList.remove("is-open");
    document.documentElement.classList.remove("tw-lb-open");
    var z = root.querySelector('[data-lb="' + LBK + '"]');
    if (z) z.focus(); else if (lbLast && lbLast.focus) lbLast.focus();
  }
  document.addEventListener("keydown", function (ev) {
    if (!LB || !LB.classList.contains("is-open")) return;
    if (ev.key === "Escape") closeLB();
    else if ((ev.key === "ArrowLeft" || ev.key === "ArrowRight") && LBK === "step" && checked) {
      view = ev.key === "ArrowRight" ? "after" : "before"; render(); lbRender();
    }
  });

  /* ---------- Événements ---------- */
  root.addEventListener("click", function (ev) {
    var zl = ev.target.closest("a[data-lb]");
    if (zl) {
      if (zl.classList.contains("is-broken")) return; // image indisponible : on laisse ouvrir TradingView
      ev.preventDefault(); openLB(zl.getAttribute("data-lb")); return;
    }
    var sh = ev.target.closest("[data-share]");
    if (sh) { onShare(sh); return; }
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
