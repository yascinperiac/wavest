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
    ============================================================ */
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
        if (btn) btn.textContent = isDark ? "☀️" : "🌙";
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

      const KEY = "mv:coach-note:chap6";

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

      editBtn.addEventListener("click", () => {
        const isOpen = !wrap.hidden;
        if (isOpen) closeEditor();
        else openEditor();
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
