/* Wavest — Vidéo du hero (accueil)
   Image + bouton ▶ : rien de YouTube n'est chargé tant qu'on ne clique pas.
   Au clic : pop-up avec la vidéo (youtube-nocookie = pas de cookie YouTube avant lecture). */
(function () {
  "use strict";
  // Tous les boutons vidéo de la page (hero + "Ce que tu reçois")
  var btns = document.querySelectorAll("[data-yt]");
  if (!btns.length) return;
  var btn = null;

  var LB = null, last = null;
  function lang() {
    try { if (window.WavestI18n && window.WavestI18n.getLang) return window.WavestI18n.getLang(); } catch (e) {}
    return (document.documentElement.lang || "fr").slice(0, 2);
  }
  function closeLabel() { return lang() === "en" ? "Close the video" : "Fermer la vidéo"; }

  function open(e) {
    btn = e.currentTarget;
    var id = btn.getAttribute("data-yt");
    last = document.activeElement;
    if (!LB) {
      LB = document.createElement("div");
      LB.className = "tw-lb hero-video-lb";
      document.body.appendChild(LB);
      LB.addEventListener("click", function (e) {
        if (e.target === LB || (e.target.closest && e.target.closest("[data-lbclose]"))) close();
      });
    }
    var src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) +
      "?autoplay=1&rel=0&modestbranding=1&playsinline=1&hl=" + lang();
    LB.innerHTML =
      '<div class="tw-lb-dialog hero-video-dialog" role="dialog" aria-modal="true" aria-label="Wavest">' +
        '<button type="button" class="tw-lb-close hero-video-close" data-lbclose aria-label="' + closeLabel() + '">✕</button>' +
        '<div class="hero-video-frame"><iframe src="' + src + '" title="Wavest" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>' +
      '</div>';
    document.documentElement.classList.add("tw-lb-open");
    requestAnimationFrame(function () { LB.classList.add("is-open"); });
    var c = LB.querySelector("[data-lbclose]"); if (c) c.focus();
    var ev = btn.getAttribute("data-yt-event") || "hero_video_play";
    try { if (typeof window.gtag === "function") window.gtag("event", ev, { video_id: id }); } catch (e) {}
    try { if (typeof window.clarity === "function") window.clarity("event", ev); } catch (e) {}
  }
  function close() {
    if (!LB || !LB.classList.contains("is-open")) return;
    LB.classList.remove("is-open");
    document.documentElement.classList.remove("tw-lb-open");
    // on retire l'iframe pour couper le son
    setTimeout(function () { if (LB && !LB.classList.contains("is-open")) LB.innerHTML = ""; }, 260);
    if (last && last.focus) last.focus();
  }

  Array.prototype.forEach.call(btns, function (b) { b.addEventListener("click", open); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
})();
