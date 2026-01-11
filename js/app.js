/* ============================================================
   APP.JS — Wavest / Mindvest
   - Thème (dark/light) + mémorisation
   - Reveal (IntersectionObserver)
   - Ancrage doux
   - Accordéon persistant (par data-accordion)
   - Cookies (bandeau unique + ouverture via lien)
   - Chap 6 : Note du coach (éditeur localStorage)
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Helpers ---------- */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const ns = "mv:";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const getSaved = (k) => { try { return localStorage.getItem(ns + k); } catch { return null; } };
  const setSaved = (k, v) => { try { localStorage.setItem(ns + k, v); } catch {} };

  /* ============================================================
     🌙 THEME (global)
  ============================================================ */
  (function initTheme(){
    const root = document.body;
    const btn  = $("#themeToggle");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const savedTheme =
      localStorage.getItem("mv:theme") ||
      localStorage.getItem("theme") ||
      null;

    const initial = savedTheme ?? (prefersDark.matches ? "dark" : "light");

    function applyTheme(mode) {
      const isDark = mode === "dark";
      root.classList.toggle("dark", isDark);
      if (btn) btn.textContent = isDark ? "☀️" : "🌙";
    }

    applyTheme(initial);

    btn?.addEventListener("click", () => {
      const willBeDark = !root.classList.contains("dark");
      const mode = willBeDark ? "dark" : "light";
      applyTheme(mode);
      localStorage.setItem("mv:theme", mode);
      localStorage.setItem("theme", mode);
    });

    prefersDark.addEventListener("change", (e) => {
      // si l’utilisateur a choisi manuellement, on ne force pas
      if (localStorage.getItem("mv:theme")) return;
      applyTheme(e.matches ? "dark" : "light");
    });
  })();

  /* ============================================================
     🪄 REVEAL AU SCROLL
  ============================================================ */
  (function initReveal(){
    const els = $$(".reveal");
    if (!els.length) return;

    if ("IntersectionObserver" in window && !prefersReduced) {
      const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }
      }, { threshold: 0.18, rootMargin: "0px 0px -10% 0px" });

      els.forEach(el => io.observe(el));
    } else {
      els.forEach(el => el.classList.add("visible"));
    }
  })();

  /* ============================================================
     🔗 ANCRAGE INTERNE (scroll doux)
  ============================================================ */
  (function initAnchors(){
    const headerOffset = parseInt(document.body.dataset.headerHeight || "80", 10);

    $$('a[href^="#"]:not([href="#"])').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href").slice(1);
        const target = document.getElementById(id);
        if (!target) return;

        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
        history.replaceState(null, "", `#${id}`);
      });
    });
  })();

  /* ============================================================
     🗂️ ACCORDÉON (persistant)
  ============================================================ */
  (function initAccordion(){
    const accRoot = document.querySelector("[data-accordion]");
    const scope   = accRoot || document;
    const accButtons = $$(".acc-btn", scope);
    if (!accButtons.length) return;

    const ACC_KEY = `acc:${accRoot?.dataset.accordion || "default"}`;

    const getPanelFor = (btn) => {
      const id = btn.getAttribute("aria-controls");
      return id ? document.getElementById(id) : btn.nextElementSibling;
    };

    function closeAllExcept(targetBtn) {
      accButtons.forEach((b) => {
        if (b !== targetBtn) {
          b.setAttribute("aria-expanded", "false");
          const p = getPanelFor(b);
          if (p) p.hidden = true;
        }
      });
    }

    function persistOpenPanelId(idOrNull) { setSaved(ACC_KEY, idOrNull || ""); }

    function restoreAccordionState() {
      const saved = getSaved(ACC_KEY);
      if (!saved) return;

      const btn = accButtons.find(b => b.getAttribute("aria-controls") === saved);
      if (!btn) return;

      const p = getPanelFor(btn);
      btn.setAttribute("aria-expanded", "true");
      if (p) p.hidden = false;
    }

    accButtons.forEach((btn) => {
      const panel = getPanelFor(btn);
      if (!panel) return;

      // sécurise aria-controls si jamais
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

 (async function initCookies(){
  const KEY = "wavest_cookie_consent_v1";
  const SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 183;

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || "null"); }
    catch { return null; }
  }
  function write(choice) {
    const payload = { choice, ts: Date.now() };
    try { localStorage.setItem(KEY, JSON.stringify(payload)); } catch {}
  }
  function expired(c) {
    if (!c?.ts) return true;
    return (Date.now() - c.ts) > SIX_MONTHS_MS;
  }

  async function ensureBannerInDom(){
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
  }

  const banner = await ensureBannerInDom();
  if (!banner) return;

  const accept  = document.getElementById("cookieAccept");
  const decline = document.getElementById("cookieDecline");

  const show = () => { banner.hidden = false; };
  const hide = () => { banner.hidden = true;  };

  const current = read();
  if (current && !expired(current)) hide();
  else show();

  accept?.addEventListener("click", () => { write("granted"); hide(); });
  decline?.addEventListener("click", () => { write("denied");  hide(); });

  document.addEventListener("click", (e) => {
    const a = e.target.closest('[data-open-cookie-banner="true"]');
    if (!a) return;
    e.preventDefault();
    show();
  });
})();

  /* ============================================================
     ✍️ CHAPITRE 6 — NOTE DU COACH (localStorage)
     - dépend de tes IDs:
       #coachEditBtn #coachCancelBtn #coachSaveBtn
       #coachEditor #coachPreview #coachTextarea #coachCount
  ============================================================ */
  (function initCoachNote(){
    const wrap = $("#coachEditor");
    const editBtn   = $("#coachEditBtn");
    const cancelBtn = $("#coachCancelBtn");
    const preview   = $("#coachPreview");
    const textarea  = $("#coachTextarea");
    const count     = $("#coachCount");

    // pas sur cette page => stop
    if (!wrap || !editBtn || !cancelBtn || !preview || !textarea || !count) return;

    const KEY = "coach-note:chap6";

    function escapeHtml(str) {
      return String(str)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
    }

    function setCount() {
      count.textContent = `${textarea.value.length} / ${textarea.maxLength || 1000}`;
    }

    function setPreview(text) {
      const safe = escapeHtml(text).trim();
      preview.innerHTML = safe
        ? `<p>${safe.replaceAll("\n","<br>")}</p>`
        : `<p>Ajoute ici ton message de fin de chapitre. Clique sur “Éditer” pour modifier.</p>`;
    }

    function openEditor() {
      wrap.hidden = false;
      preview.hidden = true;
      editBtn.setAttribute("aria-pressed", "true");
      textarea.focus();
      setCount();
    }

    function closeEditor() {
      wrap.hidden = true;
      preview.hidden = false;
      editBtn.setAttribute("aria-pressed", "false");
    }

    // Restore saved
    const saved = getSaved(KEY);
    if (saved) {
      textarea.value = saved;
      setPreview(saved);
    } else {
      setPreview("");
    }
    setCount();

    editBtn.addEventListener("click", () => {
      // toggle
      const isOpen = !wrap.hidden;
      if (isOpen) closeEditor();
      else openEditor();
    });

    cancelBtn.addEventListener("click", () => {
      // revert to saved
      const s = getSaved(KEY) || "";
      textarea.value = s;
      setCount();
      closeEditor();
    });

    textarea.addEventListener("input", () => {
      setCount();
    });

    wrap.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = textarea.value.trim();
      setSaved(KEY, text);
      setPreview(text);
      closeEditor();
    });
  })();

  /* ============================================================
     🧠 LOG DEV LOCAL
  ============================================================ */
  if (location.hostname === "localhost" || /127\.0\.0\.1/.test(location.hostname)) {
    console.log("%c[Wavest]", "color:#4A90E2;font-weight:bold",
      "Theme:", document.body.classList.contains("dark") ? "dark" : "light");
  }
});
