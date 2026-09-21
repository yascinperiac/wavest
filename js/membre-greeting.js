/* ==========================================================
   Wavest — Message de bienvenue espace membre
   Récupère l'identité Cloudflare Access (email) et affiche
   "Content de te revoir, Prénom !" si l'élève est reconnu.

   Comment ajouter un élève :
   Ajoute une ligne dans MEMBERS ci-dessous avec son email
   (en minuscules, tel qu'ajouté dans Cloudflare Access) et son
   prénom. Rien d'autre à faire.
   ========================================================== */
(function () {
  "use strict";

  var MEMBERS = {
    "yascindu76@gmail.com": "Yascin",
    "alvin.lamypro@gmail.com": "Alvin",
    "amari.amine92@icloud.com": "Amine",
    "gaetanlouison@icloud.com": "Gaétan",
    "m.maurovic@outlook.com": "Marvyn" // à confirmer
  };

  function getLang() {
    return (window.WavestI18n && window.WavestI18n.getLang) ? window.WavestI18n.getLang() : "fr";
  }

  function showGreeting(name) {
    var el = document.getElementById("memberGreeting");
    if (!el) return;
    var lang = getLang();
    var text;
    if (name) {
      text = lang === "en" ? "Welcome back, " + name + "!" : "Content de te revoir, " + name + " !";
    } else {
      text = lang === "en" ? "Welcome back!" : "Content de te revoir !";
    }
    el.textContent = "👋 " + text;
    el.hidden = false;
  }

  document.addEventListener("DOMContentLoaded", function () {
    fetch("/cdn-cgi/access/get-identity", { credentials: "include" })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (identity) {
        if (!identity || !identity.email) return;
        var email = String(identity.email).toLowerCase().trim();
        var name = MEMBERS[email] || (identity.name ? String(identity.name).split(" ")[0] : null);
        showGreeting(name);
      })
      .catch(function () {
        // Pas de session Cloudflare Access ici (ex. test en local) : on n'affiche rien.
      });
  });
})();
