/* ============================================================
   APP.JS — Wavest / Mindvest (SAFE iPhone)
   - Thème (dark/light) + mémorisation
   - Reveal SAFE (jamais page blanche si JS plante)
   - Scroll anchors iOS safe (+ fermeture accordéon parent)
   - Accordéon persistant (data-accordion)
   - Cookies (bandeau unique + ouverture via lien)
   - Chap 6 : Note du coach (localStorage)
============================================================ */

(() => {
  "use strict";

  const onReady = (fn) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else fn();
  };

  onReady(() => {
    /* ============================================================
       SAFE GLOBAL : pas de page blanche
       -> On force TOUT reveal visible avant d'activer les animations
    ============================================================ */
    try {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    } catch {}

    // Active le mode JS (permet animations si tout fonctionne)
    try {
      document.documentElement.classList.add("js");
    } catch {}

    /* ---------- Helpers ---------- */
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    const ns = "mv:";
    const prefersReduced = (() => {
      try {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      } catch {
        return false;
      }
    })();

    const safeGetLS = (k) => {
      try { return localStorage.getItem(k); } catch { return null; }
    };
    const safeSetLS = (k, v) => {
      try { localStorage.setItem(k, v); } catch {}
    };

    /* ============================================================
       🌙 THEME (global)
       - Support iOS: addListener fallback
       - Icônes SVG (soleil/lune) gérées en CSS via body.dark,
         ce script ne fait que basculer la classe + mémoriser + a11y
    ============================================================ */
    /* ============================================================
       🧭 SOMMAIRE (bouton W en haut à gauche, toutes les pages)
    ============================================================ */
    (function initToc() {
      var btn = document.getElementById("tocBtn");
      var panel = document.getElementById("tocPanel");
      if (!btn || !panel || btn.dataset.tocBound) return;
      btn.dataset.tocBound = "1";

      // Sous-menus « Outils » et « Programme » : accès direct depuis n'importe quelle page
      var TOOLS = [
        ["/pages/trade-checker.html", "toolCardTC", "Trade Checker", '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>'],
        ["/pages/performance-patterns.html", "tool6", "Performance Patterns", '<line x1="6" y1="20" x2="6" y2="12"/><line x1="12" y1="20" x2="12" y2="6"/><line x1="18" y1="20" x2="18" y2="9"/>'],
        ["/pages/dashboard.html", "toolCardDash", "Dashboard de progression", '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>'],
        ["/pages/calculateur-lot.html", "toolCardLot", "Calculateur de lot", '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01"/>'],
        ["/pages/simulateur-croissance.html", "tool5", "Simulateur de croissance de capital", '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>'],
        ["/pages/horloge-sessions.html", "toolCardClock", "Horloge des sessions", '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/>'],
        ["/pages/calendrier-economique.html", "tool7", "Calendrier économique", '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>']
      ];
      var ICON_OPEN = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
      var CHAPTERS = [
        ["/pages/fondation.html", "chap1", "Fondation", '<path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 17l9 5 9-5"/>'],
        ["/pages/tradingview.html", "chap2", "Configuration TradingView", '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M6 13l3-3 3 2 5-5"/>'],
        ["/pages/analyse-technique.html", "chap3", "Analyse technique", '<path d="M8 4v16"/><rect x="5.5" y="8" width="5" height="7" rx="1"/><path d="M16 3v16"/><rect x="13.5" y="6" width="5" height="9" rx="1"/>'],
        ["/pages/money-management.html", "chap4", "Money management", '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>'],
        ["/pages/setup.html", "chap5", "Setup", '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'],
        ["/pages/psychologie-discipline.html", "chap6", "Psychologie & Discipline", '<path d="M9.5 2A3.5 3.5 0 0 0 6 5.5 3.5 3.5 0 0 0 3 9a3.5 3.5 0 0 0 1 2.5A3.5 3.5 0 0 0 6 18a3 3 0 0 0 6 0V2.5"/><path d="M14.5 2A3.5 3.5 0 0 1 18 5.5 3.5 3.5 0 0 1 21 9a3.5 3.5 0 0 1-1 2.5A3.5 3.5 0 0 1 18 18a3 3 0 0 1-6 0"/>']
      ];
      var here = location.pathname.replace(/\/+$/, "");

      function addSubMenu(hash, items, ariaLabel) {
        var anchor = panel.querySelector('.toc-list a[href$="' + hash + '"]');
        if (!anchor || anchor.parentNode.classList.contains("toc-has-sub")) return;
        var li = anchor.parentNode;
        li.classList.add("toc-has-sub");
        var toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "toc-sub-toggle";
        toggle.setAttribute("aria-label", ariaLabel);
        toggle.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        var wrap = document.createElement("div");
        wrap.className = "toc-sub-wrap";
        var sub = document.createElement("ul");
        sub.className = "toc-sub";
        wrap.appendChild(sub);
        items.forEach(function (it, i) {
          var item = document.createElement("li");
          item.style.setProperty("--i", i);
          var link = document.createElement("a");
          link.href = it[0];
          var ico = document.createElement("span");
          ico.className = "toc-sub-ico";
          ico.innerHTML = ICON_OPEN + it[3] + "</svg>";
          var label = document.createElement("span");
          label.setAttribute("data-i18n", it[1]);
          label.textContent = it[2];
          link.appendChild(ico);
          link.appendChild(label);
          if (here.slice(-it[0].length) === it[0]) link.setAttribute("aria-current", "page");
          item.appendChild(link);
          sub.appendChild(item);
        });
        li.appendChild(toggle);
        li.appendChild(wrap);
        var isOpen = function () { return li.classList.contains("is-open"); };
        var openSub = function (open) {
          toggle.setAttribute("aria-expanded", open);
          anchor.setAttribute("aria-expanded", open);
          li.classList.toggle("is-open", open);
          sub.inert = !open;
        };
        openSub(false);
        // Le titre ouvre son sous-menu au lieu de renvoyer vers l'accueil
        anchor.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); openSub(!isOpen()); });
        toggle.addEventListener("click", function (e) { e.stopPropagation(); openSub(!isOpen()); });
        // Sur une page de ce groupe, le sous-menu est déjà ouvert
        if (sub.querySelector("[aria-current]")) openSub(true);
      }

      addSubMenu("#tools", TOOLS, "Afficher les outils");
      addSubMenu("#chapters", CHAPTERS, "Afficher les chapitres");
      function set(open) {
        // Sur mobile, le panneau s'ouvre juste sous le bouton (headers de hauteurs différentes)
        if (open && window.matchMedia("(max-width:560px)").matches) {
          panel.style.top = Math.round(btn.getBoundingClientRect().bottom + 10) + "px";
        } else {
          panel.style.top = "";
        }
        panel.hidden = !open;
        btn.setAttribute("aria-expanded", open);
      }
      btn.addEventListener("click", function (e) { e.stopPropagation(); set(panel.hidden); });
      panel.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); e.stopPropagation(); });
      document.addEventListener("click", function () { if (!panel.hidden) set(false); });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !panel.hidden) { set(false); btn.focus(); }
      });
    })();

    (function initTheme() {
      const root = document.body;
      if (!root) return;

      const btn = $("#themeToggle");
      let prefersDark;
      try {
        prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
      } catch {
        prefersDark = null;
      }

      const savedTheme =
        safeGetLS("mv:theme") ||
        safeGetLS("theme") ||
        null;

      const initial =
        savedTheme ??
        (prefersDark && prefersDark.matches ? "dark" : "light");

      function applyTheme(mode) {
        const isDark = mode === "dark";
        root.classList.toggle("dark", isDark);
        if (btn) {
          btn.setAttribute(
            "aria-label",
            isDark ? "Passer en thème clair" : "Passer en thème sombre"
          );
        }
      }

      applyTheme(initial);

      if (btn) {
        btn.addEventListener("click", () => {
          const willBeDark = !root.classList.contains("dark");
          const mode = willBeDark ? "dark" : "light";
          applyTheme(mode);
          safeSetLS("mv:theme", mode);
          safeSetLS("theme", mode);
        });
      }

      if (!prefersDark) return;

      const onChange = (e) => {
        // si l’utilisateur a choisi manuellement, on ne force pas
        if (safeGetLS("mv:theme")) return;
        applyTheme(e.matches ? "dark" : "light");
      };

      // iOS: addListener fallback
      if (typeof prefersDark.addEventListener === "function") {
        prefersDark.addEventListener("change", onChange);
      } else if (typeof prefersDark.addListener === "function") {
        prefersDark.addListener(onChange);
      }
    })();

    /* ============================================================
       🪄 REVEAL AU SCROLL (safe)
       - si IO non dispo -> visible
       - si ça plante -> visible
    ============================================================ */
    (function initReveal() {
      const els = $$(".reveal");
      if (!els.length) return;

      // On garde visible par défaut
      if (prefersReduced) return;

      try {
        if (!("IntersectionObserver" in window)) return;

        const io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (e.isIntersecting) {
                e.target.classList.add("visible");
                io.unobserve(e.target);
              }
            }
          },
          { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
        );

        els.forEach((el) => io.observe(el));
      } catch {
        // en cas de crash -> visible
        els.forEach((el) => el.classList.add("visible"));
      }
    })();

    /* ============================================================
       🔗 ANCRAGE INTERNE (scroll doux)
       - Fix Safari/iOS: scroll au tick suivant si accordéon change
       - Ne ferme que l'accordéon parent du lien
    ============================================================ */
    (function initAnchors() {
      const header = document.querySelector(".site-header");

      const getHeaderOffset = () => {
        const data = parseInt(document.body?.dataset?.headerHeight || "0", 10);
        const h = header ? header.offsetHeight : 0;
        return (data || h || 0) + 20;
      };

      const scrollToTarget = (target, behavior = "smooth") => {
        const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
        window.scrollTo({ top, behavior: prefersReduced ? "auto" : behavior });
      };

      const closeParentAccordionIfAny = (linkEl) => {
        const panel = linkEl.closest(".acc-panel");
        if (!panel || !panel.id) return false;

        const btn = document.querySelector(`.acc-btn[aria-controls="${panel.id}"]`);
        if (!btn) return false;

        btn.setAttribute("aria-expanded", "false");
        panel.hidden = true;
        return true;
      };

      document.addEventListener(
        "click",
        (e) => {
          const a = e.target.closest('a[href^="#"]:not([href="#"])');
          if (!a) return;
          // « Outils » du sommaire ouvre son sous-menu, il ne fait pas défiler la page
          if (a.parentNode && a.parentNode.classList && a.parentNode.classList.contains("toc-has-sub")) return;
          if (a.target === "_blank") return;

          const raw = a.getAttribute("href");
          if (!raw) return;

          const id = decodeURIComponent(raw.slice(1));
          if (!id) return;

          const target = document.getElementById(id);
          if (!target) return;

          e.preventDefault();

          const closed = closeParentAccordionIfAny(a);

          if (closed) setTimeout(() => scrollToTarget(target, "smooth"), 0);
          else scrollToTarget(target, "smooth");

          history.replaceState(null, "", `#${encodeURIComponent(id)}`);
        },
        true
      );

      // Arrivée directe avec #hash
      try {
        if (location.hash && location.hash.length > 1) {
          const id = decodeURIComponent(location.hash.slice(1));
          const target = document.getElementById(id);
          if (target) setTimeout(() => scrollToTarget(target, "auto"), 60);
        }
      } catch {}
    })();

    /* ============================================================
       🗂️ ACCORDÉON (persistant)
       - scope = [data-accordion] si présent
    ============================================================ */
    (function initAccordion() {
      const accRoot = document.querySelector("[data-accordion]");
      const scope = accRoot || document;
      const accButtons = $$(".acc-btn", scope);
      if (!accButtons.length) return;

      const ACC_KEY = `mv:acc:${accRoot?.dataset?.accordion || "default"}`;

      const getPanelFor = (btn) => {
        const id = btn.getAttribute("aria-controls");
        if (id) return document.getElementById(id);
        // fallback
        return btn.nextElementSibling;
      };

      const closeAllExcept = (targetBtn) => {
        accButtons.forEach((b) => {
          if (b !== targetBtn) {
            b.setAttribute("aria-expanded", "false");
            const p = getPanelFor(b);
            if (p) p.hidden = true;
          }
        });
      };

      const persistOpenPanelId = (idOrNull) => {
        safeSetLS(ACC_KEY, idOrNull || "");
      };

      const restoreAccordionState = () => {
        const saved = safeGetLS(ACC_KEY);
        if (!saved) return;

        const btn = accButtons.find((b) => b.getAttribute("aria-controls") === saved);
        if (!btn) return;

        const p = getPanelFor(btn);
        btn.setAttribute("aria-expanded", "true");
        if (p) p.hidden = false;
      };

      accButtons.forEach((btn) => {
        const panel = getPanelFor(btn);
        if (!panel) return;

        if (!panel.id) panel.id = `accPanel-${Math.random().toString(16).slice(2)}`;

        btn.setAttribute("aria-controls", panel.id);
        btn.setAttribute("aria-expanded", panel.hidden ? "false" : "true");

        btn.addEventListener("click", () => {
          const expanded = btn.getAttribute("aria-expanded") === "true";
          closeAllExcept(btn);

          btn.setAttribute("aria-expanded", String(!expanded));
          panel.hidden = expanded;

          persistOpenPanelId(!expanded ? panel.id : null);
        });
      });

      restoreAccordionState();

      // Ouverture automatique si on arrive avec un lien du type
      // "index.html#tools" ou "index.html#chapters" — un ancrage HTML
      // scrolle jusqu'à la section mais n'ouvre pas l'accordéon tout seul.
      try {
        if (location.hash && location.hash.length > 1) {
          const targetId = decodeURIComponent(location.hash.slice(1));
          const targetSection = document.getElementById(targetId);
          const btn = targetSection ? targetSection.querySelector(".acc-btn") : null;

          if (btn && accButtons.includes(btn) && btn.getAttribute("aria-expanded") !== "true") {
            closeAllExcept(btn);
            const panel = getPanelFor(btn);
            btn.setAttribute("aria-expanded", "true");
            if (panel) panel.hidden = false;
            persistOpenPanelId(panel ? panel.id : null);
          }
        }
      } catch {}
    })();

    /* ============================================================
       🍪 COOKIES (bandeau)
       - charge /partials/cookie-banner.html si absent
    ============================================================ */
    (function initCookies() {
      const KEY = "wavest_cookie_consent_v1";
      const SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 183;

      const read = () => {
        try { return JSON.parse(safeGetLS(KEY) || "null"); } catch { return null; }
      };
      const write = (choice) => {
        const payload = { choice, ts: Date.now() };
        safeSetLS(KEY, JSON.stringify(payload));
      };
      const expired = (c) => !c?.ts || (Date.now() - c.ts) > SIX_MONTHS_MS;

      const show = (banner) => { banner.hidden = false; };
      const hide = (banner) => { banner.hidden = true; };

      const ensureBannerInDom = async () => {
        let banner = document.getElementById("cookieBanner");
        if (banner) return banner;

        try {
          const res = await fetch("/partials/cookie-banner.html", { cache: "no-store" });
          if (!res.ok) return null;
          const html = await res.text();
          document.body.insertAdjacentHTML("beforeend", html);
          return document.getElementById("cookieBanner");
        } catch {
          return null;
        }
      };

      (async () => {
        const banner = await ensureBannerInDom();
        if (!banner) return;

        if (window.WavestI18n) window.WavestI18n.applyLang(window.WavestI18n.getLang());

        const accept  = document.getElementById("cookieAccept");
        const decline = document.getElementById("cookieDecline");

        const current = read();
        if (current && !expired(current)) hide(banner);
        else show(banner);

        accept?.addEventListener("click", () => { write("granted"); hide(banner); });
        decline?.addEventListener("click", () => { write("denied");  hide(banner); });

        document.addEventListener("click", (e) => {
          const a = e.target.closest('[data-open-cookie-banner="true"]');
          if (!a) return;
          e.preventDefault();
          show(banner);
        });
      })();
    })();

    /* ============================================================
       ✍️ CHAPITRE 6 — NOTE DU COACH (localStorage)
       IDs attendus :
       #coachEditBtn #coachCancelBtn #coachSaveBtn (submit)
       #coachEditor(form) #coachPreview #coachTextarea #coachCount
    ============================================================ */
    (function initCoachNote() {
      const wrap = $("#coachEditor");
      const editBtn   = $("#coachEditBtn");
      const cancelBtn = $("#coachCancelBtn");
      const preview   = $("#coachPreview");
      const textarea  = $("#coachTextarea");
      const count     = $("#coachCount");

      if (!wrap || !editBtn || !cancelBtn || !preview || !textarea || !count) return;

      const chapterSlug = wrap.closest("[data-chapter]")?.getAttribute("data-chapter")
        || (document.querySelector("#coach-note[data-chapter]")?.getAttribute("data-chapter"))
        || location.pathname.replace(/^.*\//, "").replace(/\.html$/, "")
        || "chap6";
      const KEY = "mv:coach-note:" + chapterSlug;
      const AUTH_KEY = "mv:coach-auth";
      const PASS_HASH = "d629ca133b6af70e4085ef4fb8651271e44725b6cf9e57091cb3e097a926b531";

      const sha256Hex = async (text) => {
        try {
          const enc = new TextEncoder().encode(text);
          const buf = await crypto.subtle.digest("SHA-256", enc);
          return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
        } catch {
          return null;
        }
      };

      const isCoachAuthed = () => {
        try { return localStorage.getItem(AUTH_KEY) === "1"; } catch { return false; }
      };

      const requestCoachAuth = async () => {
        if (isCoachAuthed()) return true;
        const entered = window.prompt("Mot de passe coach :");
        if (entered === null) return false;
        const hash = await sha256Hex(entered.trim());
        if (hash && hash === PASS_HASH) {
          try { localStorage.setItem(AUTH_KEY, "1"); } catch {}
          return true;
        }
        window.alert("Mot de passe incorrect.");
        return false;
      };

      const escapeHtml = (str) =>
        String(str)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");

      const setCount = () => {
        const max = textarea.maxLength || 1000;
        count.textContent = `${textarea.value.length} / ${max}`;
      };

      const setPreview = (text) => {
        const safe = escapeHtml(text).trim();
        preview.innerHTML = safe
          ? `<p>${safe.replace(/\n/g, "<br>")}</p>`
          : `<p>Ajoute ici ton message de fin de chapitre. Clique sur “Éditer” pour modifier.</p>`;
      };

      const openEditor = () => {
        wrap.hidden = false;
        preview.hidden = true;
        editBtn.setAttribute("aria-pressed", "true");
        textarea.focus();
        setCount();
      };

      const closeEditor = () => {
        wrap.hidden = true;
        preview.hidden = false;
        editBtn.setAttribute("aria-pressed", "false");
      };

      const saved = safeGetLS(KEY);
      if (saved) {
        textarea.value = saved;
        setPreview(saved);
      } else {
        setPreview("");
      }
      setCount();

      editBtn.addEventListener("click", async () => {
        const isOpen = !wrap.hidden;
        if (isOpen) {
          closeEditor();
          return;
        }
        const ok = await requestCoachAuth();
        if (!ok) return;
        openEditor();
      });

      cancelBtn.addEventListener("click", () => {
        const s = safeGetLS(KEY) || "";
        textarea.value = s;
        setCount();
        closeEditor();
      });

      textarea.addEventListener("input", setCount);

      wrap.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = textarea.value.trim();
        safeSetLS(KEY, text);
        setPreview(text);
        closeEditor();
      });
    })();

    /* ============================================================
       🧠 LOG DEV LOCAL
    ============================================================ */
    try {
      if (location.hostname === "localhost" || /127\.0\.0\.1/.test(location.hostname)) {
        console.log("[Wavest] Theme:", document.body.classList.contains("dark") ? "dark" : "light");
      }
    } catch {}
  });
})();
