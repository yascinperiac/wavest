/* ============================================================
   HORLOGE DES SESSIONS — logique isolée (chargé après app.js)
============================================================ */

(() => {
  "use strict";

  const PARIS_TZ = "Europe/Paris";

  const fxStatusText = document.getElementById("fxStatusText");
  const fxStatusDot = document.getElementById("fxStatusDot");
  const fxParisTime = document.getElementById("fxParisTime");
  const fxLocalTime = document.getElementById("fxLocalTime");
  const fxNowLine = document.getElementById("fxNowLine");
  const fxHoverLine = document.getElementById("fxHoverLine");
  const fxHoverTooltip = document.getElementById("fxHoverTooltip");
  const fxTimeline = document.querySelector(".fx-timeline");
  const fxTimelineWrap = document.querySelector(".fx-timeline-wrap");
  const fxRows = document.querySelectorAll(".fx-row");

  /* =====================================================
     1. HEURE DE PARIS (fiable quel que soit le fuseau du visiteur)
  ===================================================== */

  function getParisParts() {
    const formatter = new Intl.DateTimeFormat("fr-FR", {
      timeZone: PARIS_TZ,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "short",
      hour12: false,
    });

    const parts = formatter.formatToParts(new Date());
    const get = (type) => parts.find((p) => p.type === type)?.value;

    return {
      hour: parseInt(get("hour"), 10),
      minute: parseInt(get("minute"), 10),
      second: parseInt(get("second"), 10),
      weekday: get("weekday"), // "lun.", "mar.", ... "sam.", "dim."
    };
  }

  function formatLocalTime() {
    return new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  }

  /* =====================================================
     2. SESSIONS (heures de Paris)
  ===================================================== */

  function isAsiaOpen(hourFraction) {
    return hourFraction >= 23 || hourFraction < 8;
  }

  function isEuropeOpen(hourFraction) {
    return hourFraction >= 8 && hourFraction < 17;
  }

  function isUsOpen(hourFraction) {
    return hourFraction >= 14 && hourFraction < 23;
  }

  function isWeekendClosed(weekday, hourFraction) {
    // Marché fermé du vendredi 23h au dimanche 23h (heure de Paris)
    if (weekday === "sam.") return true;
    if (weekday === "ven." && hourFraction >= 23) return true;
    if (weekday === "dim." && hourFraction < 23) return true;
    return false;
  }

  /* =====================================================
     3. MISE À JOUR
  ===================================================== */

  function updateClock() {
    const { hour, minute, second, weekday } = getParisParts();
    const hourFraction = hour + minute / 60 + second / 3600;

    // Affichage des heures
    const pad = (n) => String(n).padStart(2, "0");
    fxParisTime.textContent = `${pad(hour)}:${pad(minute)}`;
    fxLocalTime.textContent = formatLocalTime();

    // Ligne "maintenant" sur la frise (0-24h -> 0-100%), via une variable CSS
    // pour rester correcte même quand la largeur de la colonne change en mobile.
    fxNowLine.style.setProperty("--fx-now", hourFraction / 24);

    // Marché fermé le week-end
    if (isWeekendClosed(weekday, hourFraction)) {
      fxStatusText.textContent = "🔒 Marché fermé (week-end)";
      fxStatusDot.classList.add("fx-closed");
      fxRows.forEach((row) => row.classList.remove("is-active"));
      return;
    }

    fxStatusDot.classList.remove("fx-closed");

    // Détection des sessions actives
    const active = [];
    if (isAsiaOpen(hourFraction)) active.push({ key: "asia", label: "Asiatique" });
    if (isEuropeOpen(hourFraction)) active.push({ key: "europe", label: "Européenne" });
    if (isUsOpen(hourFraction)) active.push({ key: "us", label: "Américaine" });

    fxRows.forEach((row) => {
      const key = row.dataset.session;
      row.classList.toggle("is-active", active.some((s) => s.key === key));
    });

    if (active.length === 0) {
      fxStatusText.textContent = "Aucune session majeure active";
    } else if (active.length === 1) {
      fxStatusText.textContent = `Session actuelle : ${active[0].label}`;
    } else {
      const labels = active.map((s) => s.label).join(" + ");
      fxStatusText.textContent = `Session actuelle : ${labels} (chevauchement)`;
    }
  }

  /* =====================================================
     4. INIT
  ===================================================== */

  updateClock();
  setInterval(updateClock, 15000);

  /* =====================================================
     5. CURSEUR AU SURVOL (heure + sessions actives à ce point)
  ===================================================== */

  const fxTrack = document.querySelector(".fx-track");

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function showHoverAt(clientX) {
    if (!fxTrack) return;
    const rect = fxTrack.getBoundingClientRect();
    if (rect.width === 0) return;

    let fraction = (clientX - rect.left) / rect.width;
    fraction = Math.max(0, Math.min(1, fraction));

    const totalMinutes = fraction * 24 * 60;
    const hour = Math.floor(totalMinutes / 60);
    const minute = Math.floor(totalMinutes % 60);
    const hourFraction = hour + minute / 60;

    fxHoverLine.style.setProperty("--fx-hover", fraction);
    fxHoverLine.classList.add("is-visible");

    const active = [];
    if (isAsiaOpen(hourFraction)) active.push("Asiatique");
    if (isEuropeOpen(hourFraction)) active.push("Européenne");
    if (isUsOpen(hourFraction)) active.push("Américaine");

    const sessionLabel = active.length ? active.join(" + ") : "Aucune session active";

    fxHoverTooltip.innerHTML = `<strong>${pad2(hour)}:${pad2(minute)}</strong><span>${sessionLabel}</span>`;

    const wrapRect = fxTimelineWrap.getBoundingClientRect();
    const clientPxX = rect.left + fraction * rect.width;
    fxHoverTooltip.style.left = `${clientPxX - wrapRect.left}px`;
    fxHoverTooltip.hidden = false;
  }

  function hideHover() {
    fxHoverLine.classList.remove("is-visible");
    fxHoverTooltip.hidden = true;
  }

  if (fxTimeline && fxTrack) {
    fxTimeline.addEventListener("mousemove", (e) => showHoverAt(e.clientX));
    fxTimeline.addEventListener("mouseleave", hideHover);
    fxTimeline.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches[0]) showHoverAt(e.touches[0].clientX);
      },
      { passive: true }
    );
    fxTimeline.addEventListener("touchend", hideHover);
  }
})();