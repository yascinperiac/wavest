/* ==========================================================
   Wavest — i18n (FR / EN)
   Systeme simple de traduction cote client, sans rechargement.
   Convention :
     - data-i18n="cle"        -> remplace le textContent
     - data-i18n-html="cle"   -> remplace l'innerHTML (garde des balises comme <strong>, <br>, <a>)
     - data-i18n-aria-label="cle" -> remplace l'attribut aria-label
     - <body data-i18n-title="cle"> -> remplace document.title
   Chaque cle du dictionnaire = { fr: "...", en: "..." }
   ========================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "wavest-lang";

  var translations = {
  "skipLink": {
    "fr": "Aller au contenu",
    "en": "Skip to content"
  },
  "themeToggleAria": {
    "fr": "Changer le thème",
    "en": "Toggle theme"
  },
  "langToggleLabel": {
    "fr": "EN",
    "en": "FR"
  },
  "langToggleAria": {
    "fr": "Changer la langue du site",
    "en": "Change site language"
  },
  "footerText": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "linkMentions": {
    "fr": "Mentions légales",
    "en": "Legal notice"
  },
  "linkPrivacy": {
    "fr": "Confidentialité",
    "en": "Privacy policy"
  },
  "linkCgv": {
    "fr": "CGV",
    "en": "Terms of sale"
  },
  "manageCookies": {
    "fr": "Gérer les cookies",
    "en": "Manage cookies"
  },
  "disclaimer": {
    "fr": "⚠️ Ce site a une vocation uniquement éducative.<br>Il ne constitue en aucun cas un conseil en investissement.<br>Le trading comporte des risques de perte en capital.",
    "en": "⚠️ This site is for educational purposes only.<br>It does not constitute investment advice of any kind.<br>Trading involves a risk of capital loss."
  },
  "cookieMessage": {
    "fr": "Nous utilisons des traceurs strictement nécessaires (ex. préférence de thème). Si des traceurs non essentiels sont ajoutés (mesure d’audience / marketing), vous pourrez les accepter ou les refuser ici. <a href=\"/Legal/cookies.html\">En savoir plus</a>",
    "en": "We use strictly necessary trackers (e.g. theme preference). If non-essential trackers are added later (audience measurement / marketing), you'll be able to accept or decline them here. <a href=\"/Legal/cookies.html\">Learn more</a>"
  },
  "cookieMessageShort": {
    "fr": "On utilise des cookies essentiels. Tu peux accepter/refuser.",
    "en": "We use essential cookies. You can accept or decline."
  },
  "cookieDecline": {
    "fr": "Refuser",
    "en": "Decline"
  },
  "cookieAccept": {
    "fr": "Accepter",
    "en": "Accept"
  },
  "pageTitleIndex": {
    "fr": "Accueil — Wavest",
    "en": "Home — Wavest"
  },
  "heroTitle": {
    "fr": "800+ trades backtestés. Zéro promesse de gains. Une méthode.",
    "en": "800+ backtested trades. Zero profit promises. One method."
  },
  "heroText": {
    "fr": "Analyse technique pure, gestion du risque, discipline — celle que j'utilise moi-même depuis 3 ans.",
    "en": "Pure technical analysis, risk management, discipline — the same one I've used myself for 3 years."
  },
  "ctaOffer": {
    "fr": "Découvrir l'offre →",
    "en": "See the offer →"
  },
  "ctaStart": {
    "fr": "Commencer",
    "en": "Get started"
  },
  "testimonial1": {
    "fr": "« Le coaching fut hyper enrichissant. Toutes mes questions ont été levées. Merci beaucoup Yascin, je recommande à 1000%. »",
    "en": "“The coaching was incredibly valuable. All my questions were answered. Thank you so much Yascin, I recommend it 1000%.”"
  },
  "testimonial2": {
    "fr": "« Franchement, juste avec la configuration TradingView, ça m'a montré que c'est vraiment sérieux ce que tu proposes. »",
    "en": "“Honestly, just with the TradingView setup alone, I could tell this was the real deal.”"
  },
  "testimonial3": {
    "fr": "« Excellent professeur de trading, pédagogue, disponible et surtout très à l'écoute. Je recommande fortement ! »",
    "en": "“Excellent trading teacher, great at explaining things, available and above all a great listener. Highly recommend!”"
  },
  "testimonialLink": {
    "fr": "Voir la communauté →",
    "en": "See the community →"
  },
  "keypoint1Title": {
    "fr": "Analyse technique",
    "en": "Technical Analysis"
  },
  "keypoint1Text": {
    "fr": "Comprends les bases des marchés et les patterns utilisés par les traders pros.",
    "en": "Understand market fundamentals and the patterns used by professional traders."
  },
  "keypoint2Title": {
    "fr": "Psychologie & Discipline",
    "en": "Psychology & Discipline"
  },
  "keypoint2Text": {
    "fr": "Maîtrise tes émotions, gère ton risque et respecte ton plan de trading.",
    "en": "Master your emotions, manage your risk and stick to your trading plan."
  },
  "keypoint3Title": {
    "fr": "Études de cas",
    "en": "Case Studies"
  },
  "keypoint3Text": {
    "fr": "Exemples concrets et backtests pour progresser avec méthode.",
    "en": "Concrete examples and backtests to progress methodically."
  },
  "keypoint4Title": {
    "fr": "Outils gratuits",
    "en": "Free Tools"
  },
  "keypoint4Text": {
    "fr": "Trade Checker, calculateur de lot, dashboard de progression et plus, prêts à l'emploi.",
    "en": "Trade Checker, lot size calculator, progress dashboard and more, ready to use."
  },
  "aboutEyebrow": {
    "fr": "Notre philosophie",
    "en": "Our philosophy"
  },
  "aboutTitle": {
    "fr": "À propos",
    "en": "About"
  },
  "aboutParagraph": {
    "fr": "Je ne vends pas de rêve. Mon approche du trading repose sur la rigueur, l'analyse et la discipline. Chaque élément de ma méthode a été testé et validé avant d'être appliqué. Mon objectif : partager un chemin <strong>réaliste et durable</strong> pour progresser pas à pas.",
    "en": "I don't sell dreams. My approach to trading is built on rigor, analysis and discipline. Every part of my method has been tested and validated before being applied. My goal: to share a <strong>realistic and sustainable</strong> path to progress step by step."
  },
  "aboutBullet1": {
    "fr": "Méthode claire, structurée et sans promesses irréalistes",
    "en": "A clear, structured method with no unrealistic promises"
  },
  "aboutBullet2": {
    "fr": "Analyses basées sur l'étude de centaines de trades",
    "en": "Analysis based on the study of hundreds of trades"
  },
  "aboutBullet3": {
    "fr": "Discipline et psychologie au cœur du processus",
    "en": "Discipline and psychology at the heart of the process"
  },
  "metric1Label": {
    "fr": "années de recherche et de backtests",
    "en": "years of research and backtesting"
  },
  "metric2Label": {
    "fr": "trades analysés en détail",
    "en": "trades analyzed in detail"
  },
  "metric3Label": {
    "fr": "méthode cohérente et transparente",
    "en": "consistent, transparent method"
  },
  "joinTitle": {
    "fr": "Pas encore membre ?",
    "en": "Not a member yet?"
  },
  "joinText": {
    "fr": "Découvre l'offre complète — méthode, suivi personnalisé et communauté.",
    "en": "Discover the full offer — method, personal follow-up and community."
  },
  "chapTitle": {
    "fr": "Chapitres",
    "en": "Chapters"
  },
  "chap1": {
    "fr": "Fondation",
    "en": "Foundations"
  },
  "chap2": {
    "fr": "Configuration TradingView",
    "en": "TradingView Setup"
  },
  "chap3": {
    "fr": "Analyse technique",
    "en": "Technical Analysis"
  },
  "chap4": {
    "fr": "Money management",
    "en": "Money Management"
  },
  "chap5": {
    "fr": "Setup",
    "en": "Setup"
  },
  "chap6": {
    "fr": "Psychologie & Discipline",
    "en": "Psychology & Discipline"
  },
  "toolsTitle": {
    "fr": "Outils Wavest",
    "en": "Wavest Tools"
  },
  "tool1": {
    "fr": "Trade Checker",
    "en": "Trade Checker"
  },
  "tool2": {
    "fr": "Calculateur de lot",
    "en": "Lot Size Calculator"
  },
  "tool3": {
    "fr": "Horloge des sessions",
    "en": "Sessions Clock"
  },
  "tool5": {
    "fr": "Simulateur de croissance de capital",
    "en": "Capital Growth Simulator"
  },
  "tool4": {
    "fr": "Dashboard de progression",
    "en": "Progress Dashboard"
  },
  "tool6": {
    "fr": "Performance des patterns",
    "en": "Pattern Performance"
  },
  "tool7": {
    "fr": "Calendrier économique",
    "en": "Economic Calendar"
  },
  "toolsNote": {
    "fr": "💡 Le Trade Checker, le Simulateur de croissance de capital, le Dashboard de progression et la Performance des patterns s'utilisent avec la méthode enseignée dans la formation — c'est pour ça qu'ils sont réservés aux membres.",
    "en": "💡 The Trade Checker, Capital Growth Simulator, Progress Dashboard and Pattern Performance tools are meant to be used with the method taught in the program — that's why they're reserved for members."
  },
  "blogTitle": {
    "fr": "Blog",
    "en": "Blog"
  },
  "blog1": {
    "fr": "Apprendre le trading Forex en débutant : le guide complet",
    "en": "Learning Forex trading as a beginner: the complete guide"
  },
  "blog2": {
    "fr": "Analyse technique Forex : les bases pour lire un graphique",
    "en": "Forex technical analysis: the basics of reading a chart"
  },
  "blog3": {
    "fr": "Money management : combien risquer par trade ?",
    "en": "Money management: how much to risk per trade?"
  },
  "blog4": {
    "fr": "Psychologie du trading : discipline avant stratégie",
    "en": "Trading psychology: discipline before strategy"
  },
  "blog5": {
    "fr": "Backtest : tester une méthode avant de trader en réel",
    "en": "Backtesting: testing a method before trading live"
  },
  "blog6": {
    "fr": "Signaux de trading : pourquoi ils ne suffisent pas",
    "en": "Trading signals: why they're not enough"
  },
  "blog7": {
    "fr": "Combien de temps pour devenir rentable ?",
    "en": "How long does it take to become profitable?"
  },
  "blog8": {
    "fr": "Calculateur de lot : bien dimensionner ses positions",
    "en": "Lot size calculator: sizing your positions correctly"
  },
  "blog9": {
    "fr": "Checklist : ce qu'il faut valider avant un trade",
    "en": "Checklist: what to confirm before a trade"
  },
  "blog10": {
    "fr": "Formation trading Forex : comment bien choisir",
    "en": "Forex trading course: how to choose the right one"
  },
  "callCtaTitle": {
    "fr": "Réserver un coaching individuel",
    "en": "Book a one-on-one coaching session"
  },
  "callCtaBtn": {
    "fr": "Voir mes disponibilités →",
    "en": "See my availability →"
  },
  "cgv_1": {
    "fr": "Conditions Générales de Vente (CGV)",
    "en": "Terms of Sale (CGV)"
  },
  "cgv_2": {
    "fr": "← Retour",
    "en": "← Back"
  },
  "cgv_3": {
    "fr": "1) Identité du vendeur",
    "en": "1) Seller's Identity"
  },
  "cgv_4": {
    "fr": "Vendeur / Éditeur :",
    "en": "Seller / Publisher:"
  },
  "cgv_12": {
    "fr": " Yascin PERIAC (EI – micro-entreprise)",
    "en": "Yascin PERIAC (EI – micro-enterprise)"
  },
  "cgv_5": {
    "fr": "Nom commercial :",
    "en": "Trade name:"
  },
  "cgv_13": {
    "fr": " Wavest",
    "en": "Wavest"
  },
  "cgv_6": {
    "fr": "Site :",
    "en": "Site:"
  },
  "cgv_14": {
    "fr": " wavest.fr",
    "en": "wavest.fr"
  },
  "cgv_7": {
    "fr": "SIREN :",
    "en": "SIREN:"
  },
  "cgv_8": {
    "fr": "SIRET :",
    "en": "SIRET:"
  },
  "cgv_9": {
    "fr": "Adresse :",
    "en": "Address:"
  },
  "cgv_15": {
    "fr": " 78 Avenue des Champs-Élysées, Bureau 326, 75008 Paris, France",
    "en": "78 Avenue des Champs-Élysées, Bureau 326, 75008 Paris, France"
  },
  "cgv_10": {
    "fr": "Email :",
    "en": "Email:"
  },
  "cgv_11": {
    "fr": "TVA :",
    "en": "VAT:"
  },
  "cgv_16": {
    "fr": " TVA non applicable, art. 293 B du CGI (franchise en base)\n      ",
    "en": "VAT not applicable, art. 293 B of the French Tax Code (VAT exemption)"
  },
  "cgv_17": {
    "fr": "2) Objet",
    "en": "2) Purpose"
  },
  "cgv_18": {
    "fr": "\n        Les présentes Conditions Générales de Vente régissent la vente d’offres numériques proposées sur Wavest,\n        notamment des formations en ligne (vidéos, supports PDF, contenus pédagogiques) et l’accès à une plateforme/espace membre.\n      ",
    "en": "These Terms of Sale govern the sale of digital offers available on Wavest,\n        including online courses (videos, PDF materials, educational content) and access to a platform/member area."
  },
  "cgv_19": {
    "fr": "3) Champ d’application",
    "en": "3) Scope of Application"
  },
  "cgv_20": {
    "fr": "\n        Les CGV s’appliquent à toute commande passée sur Wavest. Le Client déclare avoir pris connaissance des CGV et les accepter\n        sans réserve avant la validation de la commande.\n      ",
    "en": "The Terms of Sale apply to any order placed on Wavest. The Customer acknowledges having read the Terms of Sale and accepting\n        them without reservation before confirming the order."
  },
  "cgv_21": {
    "fr": "4) Description des offres",
    "en": "4) Description of Offers"
  },
  "cgv_22": {
    "fr": "\n        Chaque offre précise son contenu, ses modalités d’accès (immédiat ou différé) et ses conditions particulières, le cas échéant.\n        Les informations affichées sur la page de vente au moment de l’achat font partie intégrante du contrat.\n      ",
    "en": "Each offer specifies its content, its access terms (immediate or delayed) and its specific conditions, where applicable.\n        The information displayed on the sales page at the time of purchase forms an integral part of the contract."
  },
  "cgv_24": {
    "fr": "\n        Les contenus sont à vocation ",
    "en": "The content is intended for"
  },
  "cgv_23": {
    "fr": "éducative",
    "en": "educational"
  },
  "cgv_25": {
    "fr": ". Ils ne constituent pas un conseil en investissement ni une recommandation personnalisée.\n        Le trading comporte des risques de perte en capital.\n      ",
    "en": " purposes. It does not constitute investment advice or a personalized recommendation.\n        Trading involves a risk of capital loss."
  },
  "cgv_26": {
    "fr": "5) Accès & prérequis",
    "en": "5) Access & Requirements"
  },
  "cgv_27": {
    "fr": "Le Client doit disposer d’une connexion internet et d’un équipement compatible.",
    "en": "The Customer must have an internet connection and compatible equipment."
  },
  "cgv_28": {
    "fr": "Les identifiants d’accès sont personnels. Le partage d’accès est interdit.",
    "en": "Access credentials are personal. Sharing access is prohibited."
  },
  "cgv_29": {
    "fr": "6) Commande",
    "en": "6) Order"
  },
  "cgv_30": {
    "fr": "\n        La commande est réalisée en ligne via le système de vente et de paiement. Le Client reçoit une confirmation et,\n        le cas échéant, les informations d’accès à l’espace membre par email après validation du paiement.\n      ",
    "en": "The order is placed online via the sales and payment system. The Customer receives confirmation and,\n        where applicable, information for accessing the member area by email after payment is confirmed."
  },
  "cgv_32": {
    "fr": "\n        Outil de vente / espace membre : ",
    "en": "Sales / member area tool:"
  },
  "cgv_31": {
    "fr": "Système.io",
    "en": "Système.io"
  },
  "cgv_33": {
    "fr": " (selon configuration).\n      ",
    "en": "(depending on configuration)."
  },
  "cgv_34": {
    "fr": "7) Prix",
    "en": "7) Price"
  },
  "cgv_36": {
    "fr": "8) Paiement",
    "en": "8) Payment"
  },
  "cgv_37": {
    "fr": "\n        Le paiement est exigible immédiatement lors de la commande. Les moyens de paiement proposés peuvent inclure :\n      ",
    "en": "Payment is due immediately upon ordering. The payment methods offered may include:"
  },
  "cgv_38": {
    "fr": "Carte bancaire",
    "en": "Credit card"
  },
  "cgv_40": {
    "fr": " via ",
    "en": "via"
  },
  "cgv_39": {
    "fr": "Stripe",
    "en": "Stripe"
  },
  "cgv_41": {
    "fr": "PayPal",
    "en": "PayPal"
  },
  "cgv_42": {
    "fr": "\n        Le vendeur ne stocke pas les données bancaires. Le traitement est effectué par les prestataires de paiement.\n      ",
    "en": "The seller does not store banking data. Processing is carried out by the payment providers."
  },
  "cgv_43": {
    "fr": "9) Mise à disposition (livraison)",
    "en": "9) Delivery"
  },
  "cgv_45": {
    "fr": "\n        Les offres étant des ",
    "en": "As the offers are"
  },
  "cgv_44": {
    "fr": "contenus numériques",
    "en": "digital content"
  },
  "cgv_46": {
    "fr": ", la livraison correspond à la mise à disposition :\n      ",
    "en": ", delivery corresponds to the provision of access:"
  },
  "cgv_47": {
    "fr": "par accès à l’espace membre (consultation en ligne),",
    "en": "via access to the member area (online viewing),"
  },
  "cgv_48": {
    "fr": "et/ou par téléchargement (PDF/ressources),",
    "en": "and/or by download (PDF/resources),"
  },
  "cgv_49": {
    "fr": "et/ou via un lien envoyé par email.",
    "en": "and/or via a link sent by email."
  },
  "cgv_51": {
    "fr": "\n        Sauf mention contraire sur la page de vente, l’accès est fourni ",
    "en": "Unless otherwise stated on the sales page, access is provided"
  },
  "cgv_50": {
    "fr": "après confirmation du paiement",
    "en": "after payment confirmation"
  },
  "cgv_52": {
    "fr": "10) Accès à vie",
    "en": "10) Lifetime Access"
  },
  "cgv_54": {
    "fr": "\n        L’offre est proposée avec un ",
    "en": "The offer is provided with"
  },
  "cgv_53": {
    "fr": "accès à vie",
    "en": "lifetime access"
  },
  "cgv_55": {
    "fr": " : cela signifie un accès sans limite de durée à l’offre achetée,\n        tant que l’offre existe et que la plateforme technique permettant l’accès est maintenue.\n      ",
    "en": ": this means unrestricted-duration access to the purchased offer,\n        for as long as the offer exists and the technical platform enabling access is maintained."
  },
  "cgv_56": {
    "fr": "\n        Un “accès à vie” ne garantit pas l’existence éternelle d’un outil tiers (hébergeur, plateforme, technologie).\n        En cas d’évolution technique majeure ou de fin d’un service tiers, le vendeur pourra proposer une solution équivalente\n        raisonnable (ex. migration, nouvelle plateforme, accès alternatif) dans la mesure du possible.\n      ",
    "en": "\"Lifetime access\" does not guarantee the eternal existence of a third-party tool (host, platform, technology).\n        In the event of a major technical change or the end of a third-party service, the seller may offer a reasonable\n        equivalent solution (e.g. migration, new platform, alternative access) to the extent possible."
  },
  "cgv_57": {
    "fr": "11) Droit de rétractation (contenus numériques)",
    "en": "11) Right of Withdrawal (digital content)"
  },
  "cgv_58": {
    "fr": "\n        Lorsque l’accès au contenu numérique est fourni immédiatement après paiement, le droit de rétractation peut ne pas s’appliquer\n        si le Client a demandé l’exécution immédiate et a reconnu renoncer à son droit de rétractation.\n      ",
    "en": "Where access to the digital content is provided immediately after payment, the right of withdrawal may not apply\n        if the Customer requested immediate performance and acknowledged waiving their right of withdrawal."
  },
  "cgv_59": {
    "fr": "\n        Si ton checkout affiche une case du type “Accès immédiat + renonciation à la rétractation”, c’est ce qu’il faut.\n        Si elle n’existe pas, il faut l’ajouter côté paiement.\n      ",
    "en": "If your checkout displays a checkbox like \"Immediate access + waiver of withdrawal right,\" that's what's needed.\n        If it doesn't exist, it needs to be added on the payment side."
  },
  "cgv_60": {
    "fr": "12) Garanties légales & conformité (contenus numériques)",
    "en": "12) Legal Guarantees & Compliance (digital content)"
  },
  "cgv_61": {
    "fr": "\n        Le Client bénéficie des garanties légales applicables, notamment la garantie de conformité des contenus et services numériques.\n        En cas de contenu non conforme, le Client peut demander la mise en conformité ou, à défaut, une réduction du prix ou la résolution\n        du contrat, selon les conditions légales.\n      ",
    "en": "The Customer benefits from the applicable legal guarantees, including the guarantee of conformity for digital content and services.\n        In the event of non-conforming content, the Customer may request that it be brought into conformity or, failing that, a price reduction or termination\n        of the contract, subject to the legal conditions."
  },
  "cgv_62": {
    "fr": "13) Support",
    "en": "13) Support"
  },
  "cgv_64": {
    "fr": "14) Propriété intellectuelle & usage",
    "en": "14) Intellectual Property & Use"
  },
  "cgv_65": {
    "fr": "\n        Tous les contenus (vidéos, textes, PDF, visuels, logos, éléments de cours) sont protégés.\n        L’achat confère un droit d’accès personnel, non exclusif et non transférable.\n      ",
    "en": "All content (videos, text, PDFs, visuals, logos, course materials) is protected.\n        Purchase grants a personal, non-exclusive and non-transferable right of access."
  },
  "cgv_66": {
    "fr": "Interdiction de partager, revendre, publier ou diffuser tout ou partie des contenus.",
    "en": "Sharing, reselling, publishing or distributing all or part of the content is prohibited."
  },
  "cgv_67": {
    "fr": "Interdiction de partager ses identifiants d’accès.",
    "en": "Sharing access credentials is prohibited."
  },
  "cgv_68": {
    "fr": "\n        Toute violation peut entraîner la suspension/fermeture de l’accès, sans remboursement.\n      ",
    "en": "Any violation may result in the suspension/closure of access, without refund."
  },
  "cgv_69": {
    "fr": "15) Responsabilité",
    "en": "15) Liability/Disclaimer"
  },
  "cgv_70": {
    "fr": "\n        Le vendeur ne garantit pas de résultats financiers. Le trading comporte des risques.\n        Le Client demeure seul responsable de ses décisions, de son capital et de l’usage des informations fournies.\n      ",
    "en": "The seller does not guarantee financial results. Trading involves risks.\n        The Customer remains solely responsible for their decisions, their capital and the use of the information provided."
  },
  "cgv_71": {
    "fr": "\n        La responsabilité du vendeur ne pourra être engagée en cas d’interruption due à un tiers (hébergeur, plateforme, réseau)\n        ou en cas de force majeure.\n      ",
    "en": "The seller cannot be held liable in the event of an interruption caused by a third party (host, platform, network)\n        or in the event of force majeure."
  },
  "cgv_72": {
    "fr": "16) Données personnelles",
    "en": "16) Personal Data"
  },
  "cgv_75": {
    "fr": "\n        Les traitements de données personnelles sont décrits dans la page\n        ",
    "en": "The processing of personal data is described on the"
  },
  "cgv_73": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "cgv_76": {
    "fr": ".\n        Les cookies sont décrits dans la page ",
    "en": " page.\n        Cookies are described on the"
  },
  "cgv_74": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "cgv_77": {
    "fr": "17) Litiges & médiation de la consommation",
    "en": "17) Disputes & Consumer Mediation"
  },
  "cgv_78": {
    "fr": "\n        En cas de litige, le Client est invité à contacter d’abord le vendeur afin de rechercher une solution amiable.\n      ",
    "en": "In the event of a dispute, the Customer is invited to first contact the seller in order to seek an amicable solution."
  },
  "cgv_79": {
    "fr": "\n        Conformément aux règles applicables, le Client consommateur peut recourir gratuitement à un médiateur de la consommation.\n      ",
    "en": "In accordance with applicable rules, the consumer Customer may use a consumer mediator free of charge."
  },
  "cgv_80": {
    "fr": "Médiateur :",
    "en": "Mediator:"
  },
  "cgv_84": {
    "fr": " CM2C — Centre de la Médiation de la Consommation de Conciliateurs de Justice",
    "en": "CM2C — Centre de la Médiation de la Consommation de Conciliateurs de Justice"
  },
  "cgv_81": {
    "fr": "Adresse :",
    "en": "Address:"
  },
  "cgv_85": {
    "fr": " 49 Rue de Ponthieu, 75008 Paris, France",
    "en": "49 Rue de Ponthieu, 75008 Paris, France"
  },
  "cgv_82": {
    "fr": "Email :",
    "en": "Email:"
  },
  "cgv_83": {
    "fr": "Site :",
    "en": "Site:"
  },
  "cgv_86": {
    "fr": "18) Droit applicable",
    "en": "18) Applicable Law"
  },
  "cgv_87": {
    "fr": "\n        Les présentes CGV sont soumises au droit français. En cas de litige non résolu amiablement,\n        les juridictions compétentes seront déterminées par les règles applicables.\n      ",
    "en": "These Terms of Sale are governed by French law. In the event of a dispute not resolved amicably,\n        the competent courts will be determined according to the applicable rules."
  },
  "cgv_88": {
    "fr": "Dernière mise à jour : 06/01/2026",
    "en": "Last updated: 06/01/2026"
  },
  "cgv_89": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "cgv_90": {
    "fr": "Mentions légales",
    "en": "Legal Notice"
  },
  "cgv_91": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "cgv_92": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "cgv_93": {
    "fr": "CGV",
    "en": "Terms of Sale"
  },
  "cgv_35": {
    "fr": "\n        Les prix sont indiqués en euros (€). TVA non applicable (art. 293 B du CGI).<br/>\n        Les prix applicables sont ceux affichés au moment de la commande sur la page de vente.\n      ",
    "en": "Prices are stated in euros (€). VAT not applicable (art. 293 B of the French Tax Code).<br/>\n        The applicable prices are those displayed at the time of the order on the sales page."
  },
  "cgv_63": {
    "fr": "\n        Pour toute question ou assistance : <a href=\"mailto:contact@wavest.fr\">contact@wavest.fr</a>\n",
    "en": "For any questions or assistance: <a href=\"mailto:contact@wavest.fr\">contact@wavest.fr</a>"
  },
  "confidentialite_1": {
    "fr": "Politique de confidentialité",
    "en": "Privacy Policy"
  },
  "confidentialite_2": {
    "fr": "← Retour",
    "en": "← Back"
  },
  "confidentialite_3": {
    "fr": "1) Responsable du traitement",
    "en": "1) Data Controller"
  },
  "confidentialite_4": {
    "fr": "Responsable du traitement :",
    "en": "Data Controller:"
  },
  "confidentialite_12": {
    "fr": " Yascin PERIAC",
    "en": "Yascin PERIAC"
  },
  "confidentialite_5": {
    "fr": "Statut :",
    "en": "Status:"
  },
  "confidentialite_13": {
    "fr": " Entrepreneur individuel (micro-entreprise)",
    "en": "Sole proprietorship (micro-enterprise)"
  },
  "confidentialite_6": {
    "fr": "Site :",
    "en": "Site:"
  },
  "confidentialite_14": {
    "fr": " wavest.fr",
    "en": "wavest.fr"
  },
  "confidentialite_7": {
    "fr": "SIREN :",
    "en": "SIREN:"
  },
  "confidentialite_8": {
    "fr": "SIRET :",
    "en": "SIRET:"
  },
  "confidentialite_9": {
    "fr": "TVA :",
    "en": "VAT:"
  },
  "confidentialite_15": {
    "fr": " TVA non applicable, art. 293 B du CGI (franchise en base)",
    "en": "VAT not applicable, art. 293 B of the French Tax Code (VAT exemption)"
  },
  "confidentialite_10": {
    "fr": "Adresse de contact :",
    "en": "Contact address:"
  },
  "confidentialite_16": {
    "fr": " 78 Avenue des Champs-Élysées, Bureau 326, 75008 Paris, France",
    "en": "78 Avenue des Champs-Élysées, Bureau 326, 75008 Paris, France"
  },
  "confidentialite_11": {
    "fr": "Contact :",
    "en": "Contact:"
  },
  "confidentialite_17": {
    "fr": "\n        Délégué à la protection des données (DPO) : aucun DPO n’a été désigné.\n      ",
    "en": "Data Protection Officer (DPO): no DPO has been appointed."
  },
  "confidentialite_18": {
    "fr": "2) Données collectées",
    "en": "2) Data Collected"
  },
  "confidentialite_19": {
    "fr": "Je collecte uniquement les données nécessaires au fonctionnement du site et à la vente/gestion des accès :",
    "en": "I only collect the data necessary for the site to function and for the sale/management of access:"
  },
  "confidentialite_20": {
    "fr": "Commande / accès",
    "en": "Order / access"
  },
  "confidentialite_21": {
    "fr": " : nom, prénom, adresse e-mail, informations liées à la commande,\n          historique d’achat, identifiants et accès à l’espace membre (via Système.io).\n        ",
    "en": ": last name, first name, email address, order-related information,\n          purchase history, credentials and access to the member area (via Système.io)."
  },
  "confidentialite_22": {
    "fr": "Paiement",
    "en": "Payment"
  },
  "confidentialite_23": {
    "fr": "Carte bancaire",
    "en": "Credit card"
  },
  "confidentialite_25": {
    "fr": " : paiement traité par ",
    "en": ": payment processed by"
  },
  "confidentialite_24": {
    "fr": "Stripe",
    "en": "Stripe"
  },
  "confidentialite_26": {
    "fr": ". Je ne stocke jamais les numéros de carte.",
    "en": ". I never store card numbers."
  },
  "confidentialite_27": {
    "fr": "PayPal",
    "en": "PayPal"
  },
  "confidentialite_29": {
    "fr": " : paiement traité par ",
    "en": ": payment processed by"
  },
  "confidentialite_28": {
    "fr": "PayPal",
    "en": "PayPal"
  },
  "confidentialite_30": {
    "fr": ". Je ne stocke pas d’identifiants sensibles de paiement.",
    "en": ". I do not store sensitive payment credentials."
  },
  "confidentialite_31": {
    "fr": "Support / contact",
    "en": "Support / contact"
  },
  "confidentialite_32": {
    "fr": " : nom (si fourni), e-mail, contenu du message (si vous m’écrivez).",
    "en": ": name (if provided), email, message content (if you write to me)."
  },
  "confidentialite_33": {
    "fr": "Données techniques & sécurité",
    "en": "Technical & security data"
  },
  "confidentialite_34": {
    "fr": " : logs (adresse IP, user-agent, dates/horaires, pages consultées)\n          et éléments nécessaires à la prévention des abus/fraudes, selon l’hébergeur et les mesures de sécurité.\n        ",
    "en": ": logs (IP address, user-agent, dates/times, pages visited)\n          and information necessary to prevent abuse/fraud, depending on the host and security measures."
  },
  "confidentialite_35": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "confidentialite_36": {
    "fr": "Cookies essentiels",
    "en": "Essential cookies"
  },
  "confidentialite_37": {
    "fr": " (fonctionnement du site, sécurité, accès).",
    "en": "(site operation, security, access)."
  },
  "confidentialite_38": {
    "fr": "Cookies non essentiels",
    "en": "Non-essential cookies"
  },
  "confidentialite_39": {
    "fr": " (mesure d’audience/marketing) : déposés uniquement après votre consentement,\n              via le bandeau cookies et la page dédiée.\n            ",
    "en": "(audience measurement/marketing): placed only after your consent,\n              via the cookie banner and the dedicated page."
  },
  "confidentialite_40": {
    "fr": "\n        Certaines données sont nécessaires pour acheter et accéder au contenu (ex : e-mail). Sans elles, la commande et/ou l’accès au service peut être impossible.\n      ",
    "en": "Some data is required to purchase and access the content (e.g., email). Without it, the order and/or access to the service may be impossible."
  },
  "confidentialite_41": {
    "fr": "3) Finalités & bases légales",
    "en": "3) Purposes & Legal Bases"
  },
  "confidentialite_42": {
    "fr": "Vente, paiement et fourniture de l’accès",
    "en": "Sale, payment and provision of access"
  },
  "confidentialite_45": {
    "fr": " (envoi du lien, accès espace membre Système.io) :\n          ",
    "en": "(sending the link, member area access via Système.io):"
  },
  "confidentialite_43": {
    "fr": "exécution du contrat",
    "en": "performance of the contract"
  },
  "confidentialite_46": {
    "fr": " et/ou ",
    "en": "and/or"
  },
  "confidentialite_44": {
    "fr": "mesures précontractuelles",
    "en": "pre-contractual measures"
  },
  "confidentialite_47": {
    "fr": "Gestion de la facturation et obligations comptables",
    "en": "Billing management and accounting obligations"
  },
  "confidentialite_48": {
    "fr": "obligation légale",
    "en": "legal obligation"
  },
  "confidentialite_49": {
    "fr": "Support client",
    "en": "Customer support"
  },
  "confidentialite_51": {
    "fr": " (après achat) :\n          ",
    "en": "(after purchase):"
  },
  "confidentialite_50": {
    "fr": "exécution du contrat",
    "en": "performance of the contract"
  },
  "confidentialite_52": {
    "fr": "Demandes avant achat",
    "en": "Pre-purchase inquiries"
  },
  "confidentialite_54": {
    "fr": " (questions, informations) :\n          ",
    "en": "(questions, information):"
  },
  "confidentialite_53": {
    "fr": "mesures précontractuelles",
    "en": "pre-contractual measures"
  },
  "confidentialite_55": {
    "fr": "Sécurité du site",
    "en": "Site security"
  },
  "confidentialite_57": {
    "fr": " (anti-abus, prévention fraude, journalisation) :\n          ",
    "en": "(anti-abuse, fraud prevention, logging):"
  },
  "confidentialite_56": {
    "fr": "intérêt légitime",
    "en": "legitimate interest"
  },
  "confidentialite_58": {
    "fr": "Mesure d’audience / marketing",
    "en": "Audience measurement / marketing"
  },
  "confidentialite_60": {
    "fr": " (si activé plus tard) :\n          ",
    "en": "(if enabled later):"
  },
  "confidentialite_59": {
    "fr": "consentement",
    "en": "consent"
  },
  "confidentialite_61": {
    "fr": " via bandeau cookies avant dépôt.\n        ",
    "en": "via cookie banner before any deposit."
  },
  "confidentialite_62": {
    "fr": "E-mails d’information liés à la commande",
    "en": "Order-related information emails"
  },
  "confidentialite_64": {
    "fr": " (accès, reçus, informations de service) :\n          ",
    "en": "(access, receipts, service information):"
  },
  "confidentialite_63": {
    "fr": "exécution du contrat",
    "en": "performance of the contract"
  },
  "confidentialite_65": {
    "fr": "E-mails marketing / newsletter",
    "en": "Marketing emails / newsletter"
  },
  "confidentialite_67": {
    "fr": " (si activé) :\n          ",
    "en": "(if enabled):"
  },
  "confidentialite_66": {
    "fr": "consentement",
    "en": "consent"
  },
  "confidentialite_68": {
    "fr": " (désinscription possible à tout moment via le lien en bas des e-mails).\n        ",
    "en": "(you may unsubscribe at any time via the link at the bottom of the emails)."
  },
  "confidentialite_69": {
    "fr": "4) Destinataires",
    "en": "4) Recipients"
  },
  "confidentialite_70": {
    "fr": "Les données ne sont pas revendues. Elles peuvent être accessibles uniquement à :",
    "en": "Data is not resold. It may be accessible only to:"
  },
  "confidentialite_71": {
    "fr": "Netlify",
    "en": "Netlify"
  },
  "confidentialite_72": {
    "fr": " : hébergement / diffusion du site et logs techniques.",
    "en": ": site hosting / delivery and technical logs."
  },
  "confidentialite_73": {
    "fr": "Hostinger",
    "en": "Hostinger"
  },
  "confidentialite_74": {
    "fr": " : gestion du nom de domaine et/ou DNS (selon configuration).",
    "en": ": domain name and/or DNS management (depending on configuration)."
  },
  "confidentialite_75": {
    "fr": "Système.io",
    "en": "Système.io"
  },
  "confidentialite_76": {
    "fr": " : gestion de la vente, des e-mails et de l’espace membre (accès à la formation).",
    "en": ": management of sales, emails and the member area (access to the course)."
  },
  "confidentialite_77": {
    "fr": "Stripe",
    "en": "Stripe"
  },
  "confidentialite_78": {
    "fr": " : traitement des paiements carte bancaire et prévention de la fraude.",
    "en": ": processing of credit card payments and fraud prevention."
  },
  "confidentialite_79": {
    "fr": "PayPal",
    "en": "PayPal"
  },
  "confidentialite_80": {
    "fr": " : traitement des paiements PayPal et prévention de la fraude.",
    "en": ": processing of PayPal payments and fraud prevention."
  },
  "confidentialite_81": {
    "fr": "Messagerie",
    "en": "Email provider"
  },
  "confidentialite_82": {
    "fr": " : si vous me contactez par e-mail (selon le service utilisé).",
    "en": ": if you contact me by email (depending on the service used)."
  },
  "confidentialite_83": {
    "fr": "\n        Ces prestataires agissent, selon les cas, en tant que sous-traitants (au sens du RGPD) et appliquent leurs propres politiques\n        de confidentialité. Des accords de traitement des données peuvent s’appliquer selon le service utilisé.\n      ",
    "en": "These providers act, depending on the case, as processors (within the meaning of the GDPR) and apply their own privacy\n        policies. Data processing agreements may apply depending on the service used."
  },
  "confidentialite_84": {
    "fr": "5) Transferts hors UE",
    "en": "5) Transfers outside the EU"
  },
  "confidentialite_85": {
    "fr": "\n        Certains prestataires peuvent traiter des données en dehors de l’Union européenne selon leurs infrastructures\n        (hébergement, support, prévention de la fraude). Lorsque c’est le cas, ces transferts sont encadrés par des garanties\n        appropriées (ex. clauses contractuelles types / SCC ou mécanismes reconnus).\n      ",
    "en": "Some providers may process data outside the European Union depending on their infrastructure\n        (hosting, support, fraud prevention). Where this is the case, such transfers are governed by appropriate\n        safeguards (e.g. standard contractual clauses / SCC or recognized mechanisms)."
  },
  "confidentialite_86": {
    "fr": "6) Durées de conservation",
    "en": "6) Retention Periods"
  },
  "confidentialite_87": {
    "fr": "Données de commande / facturation",
    "en": "Order / billing data"
  },
  "confidentialite_88": {
    "fr": "10 ans",
    "en": "10 years"
  },
  "confidentialite_89": {
    "fr": " (obligation légale de conservation comptable).",
    "en": "(legal accounting retention obligation)."
  },
  "confidentialite_90": {
    "fr": "Données d’accès / compte (espace membre)",
    "en": "Access / account data (member area)"
  },
  "confidentialite_91": {
    "fr": " : tant que l’accès est actif.\n          En cas de demande de suppression, l’accès peut être désactivé si les identifiants sont nécessaires à la fourniture du service.\n        ",
    "en": ": for as long as access remains active.\n          If deletion is requested, access may be deactivated if the credentials are necessary to provide the service."
  },
  "confidentialite_92": {
    "fr": "Messages reçus (support)",
    "en": "Messages received (support)"
  },
  "confidentialite_94": {
    "fr": " : jusqu’à ",
    "en": ": up to"
  },
  "confidentialite_93": {
    "fr": "24 mois",
    "en": "24 months"
  },
  "confidentialite_95": {
    "fr": " maximum.",
    "en": "maximum."
  },
  "confidentialite_96": {
    "fr": "Logs techniques (journalisation)",
    "en": "Technical logs (logging)"
  },
  "confidentialite_97": {
    "fr": "6 à 12 mois",
    "en": "6 to 12 months"
  },
  "confidentialite_98": {
    "fr": " maximum, selon le besoin de sécurité.",
    "en": "maximum, depending on security needs."
  },
  "confidentialite_99": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "confidentialite_100": {
    "fr": " : durée de session ou durée définie sur la page Cookies (selon le type de cookie).",
    "en": ": session duration or duration set on the Cookies page (depending on the type of cookie)."
  },
  "confidentialite_101": {
    "fr": "7) Vos droits (RGPD)",
    "en": "7) Your Rights (GDPR)"
  },
  "confidentialite_103": {
    "fr": "Vous pouvez également déposer une réclamation auprès de la CNIL.",
    "en": "You may also lodge a complaint with the CNIL."
  },
  "confidentialite_104": {
    "fr": "8) Sécurité",
    "en": "8) Security"
  },
  "confidentialite_105": {
    "fr": "\n        Je mets en place des mesures raisonnables : contrôle d’accès, mises à jour, chiffrement en transit (HTTPS),\n        et limitation des accès aux données.\n      ",
    "en": "I implement reasonable measures: access control, updates, encryption in transit (HTTPS),\n        and restricted access to data."
  },
  "confidentialite_106": {
    "fr": "9) Mise à jour",
    "en": "9) Update"
  },
  "confidentialite_107": {
    "fr": "Cette politique peut évoluer. La date ci-dessous indique la dernière mise à jour.",
    "en": "This policy may change. The date below indicates the last update."
  },
  "confidentialite_108": {
    "fr": "Dernière mise à jour : 06/01/2026",
    "en": "Last updated: 06/01/2026"
  },
  "confidentialite_109": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "confidentialite_110": {
    "fr": "Mentions légales",
    "en": "Legal Notice"
  },
  "confidentialite_111": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "confidentialite_112": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "confidentialite_113": {
    "fr": "CGV",
    "en": "Terms of Sale"
  },
  "confidentialite_102": {
    "fr": "\n        Vous disposez des droits d’accès, rectification, effacement, limitation, opposition et portabilité.\n        Pour exercer vos droits : <a href=\"mailto:yascindu76@gmail.com\">yascindu76@gmail.com</a>.\n        Réponse sous 30 jours. Une preuve d’identité peut être demandée en cas de doute.\n      ",
    "en": "You have the right to access, rectify, erase, restrict, object to and port your data.\n        To exercise your rights: <a href=\"mailto:yascindu76@gmail.com\">yascindu76@gmail.com</a>.\n        Response within 30 days. Proof of identity may be requested in case of doubt."
  },
  "cookies_1": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "cookies_2": {
    "fr": "← Retour",
    "en": "← Back"
  },
  "cookies_3": {
    "fr": "1) Qu’est-ce qu’un cookie ?",
    "en": "1) What is a cookie?"
  },
  "cookies_4": {
    "fr": "\n        Un cookie est un petit fichier enregistré sur votre appareil (ordinateur/téléphone) lors de la consultation d’un site.\n        Il peut servir au fonctionnement du site, à la sécurité, ou (si vous l’acceptez) à la mesure d’audience/marketing.\n      ",
    "en": "A cookie is a small file saved on your device (computer/phone) when you visit a website.\n        It may be used for the site to function, for security, or (if you accept) for audience measurement/marketing."
  },
  "cookies_5": {
    "fr": "2) Cookies utilisés sur Wavest",
    "en": "2) Cookies Used on Wavest"
  },
  "cookies_6": {
    "fr": "Cookies essentiels (toujours actifs)",
    "en": "Essential cookies (always active)"
  },
  "cookies_7": {
    "fr": "\n        Indispensables au fonctionnement du site et/ou à la fourniture du service (accès à l’espace membre, sécurité, panier/commande).\n        Sans eux, le site ou l’accès à la formation peut ne pas fonctionner.\n      ",
    "en": "Necessary for the site to function and/or to provide the service (access to the member area, security, cart/order).\n        Without them, the site or access to the course may not work."
  },
  "cookies_8": {
    "fr": "Cookies de mesure d’audience (optionnels)",
    "en": "Audience measurement cookies (optional)"
  },
  "cookies_10": {
    "fr": "\n        Utilisés uniquement si vous donnez votre consentement, pour comprendre la fréquentation et améliorer le site.\n        Conformément aux recommandations de la CNIL, la durée de vie des traceurs d’audience est limitée (ex. 13 mois) et\n        les données collectées ne sont pas conservées indéfiniment.\n        (",
    "en": "Used only if you give your consent, to understand site traffic and improve the site.\n        In accordance with CNIL recommendations, the lifespan of audience-measurement trackers is limited (e.g. 13 months) and\n        the data collected is not kept indefinitely.\n        ("
  },
  "cookies_9": {
    "fr": "CNIL",
    "en": "CNIL"
  },
  "cookies_11": {
    "fr": "Cookies marketing (optionnels)",
    "en": "Marketing cookies (optional)"
  },
  "cookies_12": {
    "fr": "\n        Utilisés uniquement si vous donnez votre consentement, afin de mesurer des campagnes ou proposer des contenus plus pertinents\n        (ex. pixels publicitaires). Si non activés, aucun cookie marketing n’est déposé.\n      ",
    "en": "Used only if you give your consent, to measure campaigns or offer more relevant content\n        (e.g. advertising pixels). If not enabled, no marketing cookie is placed."
  },
  "cookies_13": {
    "fr": "3) Gérer vos préférences",
    "en": "3) Managing Your Preferences"
  },
  "cookies_15": {
    "fr": "\n        Lors de votre première visite, un bandeau vous permet d’accepter, refuser ou personnaliser les cookies.\n        Le refus doit être aussi simple que l’acceptation.\n        (",
    "en": "On your first visit, a banner lets you accept, reject or customize cookies.\n        Refusal must be as simple as acceptance.\n        ("
  },
  "cookies_14": {
    "fr": "CNIL",
    "en": "CNIL"
  },
  "cookies_16": {
    "fr": "\n        Gérer mes cookies\n      ",
    "en": "Manage my cookies"
  },
  "cookies_17": {
    "fr": "4) Durées",
    "en": "4) Durations"
  },
  "cookies_18": {
    "fr": "Essentiels :",
    "en": "Essential:"
  },
  "cookies_19": {
    "fr": " durée de session ou durée strictement nécessaire au fonctionnement.",
    "en": "session duration or the duration strictly necessary for operation."
  },
  "cookies_20": {
    "fr": "Audience (si activés) :",
    "en": "Audience (if enabled):"
  },
  "cookies_21": {
    "fr": " durée de vie limitée (ex. 13 mois), sans prorogation automatique.",
    "en": "limited lifespan (e.g. 13 months), with no automatic renewal."
  },
  "cookies_22": {
    "fr": "5) Contact",
    "en": "5) Contact"
  },
  "cookies_24": {
    "fr": "Dernière mise à jour : 06/01/2026",
    "en": "Last updated: 06/01/2026"
  },
  "cookies_25": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "cookies_26": {
    "fr": "Mentions légales",
    "en": "Legal Notice"
  },
  "cookies_27": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "cookies_28": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "cookies_29": {
    "fr": "CGV",
    "en": "Terms of Sale"
  },
  "cookies_23": {
    "fr": "\n        Pour toute question : <a href=\"mailto:contact@wavest.fr\">contact@wavest.fr</a>\n",
    "en": "For any questions: <a href=\"mailto:contact@wavest.fr\">contact@wavest.fr</a>"
  },
  "mentionsLegales_1": {
    "fr": "Mentions légales",
    "en": "Legal Notice"
  },
  "mentionsLegales_2": {
    "fr": "← Retour",
    "en": "← Back"
  },
  "mentionsLegales_3": {
    "fr": "1) Éditeur du site",
    "en": "1) Site Publisher"
  },
  "mentionsLegales_4": {
    "fr": "Éditeur :",
    "en": "Publisher:"
  },
  "mentionsLegales_14": {
    "fr": " Yascin PERIAC",
    "en": " Yascin PERIAC"
  },
  "mentionsLegales_5": {
    "fr": "Statut :",
    "en": "Status:"
  },
  "mentionsLegales_15": {
    "fr": " Entrepreneur individuel (micro-entreprise / EI)",
    "en": " Sole proprietorship (micro-enterprise / EI)"
  },
  "mentionsLegales_6": {
    "fr": "Site :",
    "en": "Site:"
  },
  "mentionsLegales_16": {
    "fr": " wavest.fr",
    "en": " wavest.fr"
  },
  "mentionsLegales_7": {
    "fr": "Adresse :",
    "en": "Address:"
  },
  "mentionsLegales_17": {
    "fr": " 78 Avenue des Champs-Élysées, Bureau 326, 75008 Paris, France",
    "en": " 78 Avenue des Champs-Élysées, Bureau 326, 75008 Paris, France"
  },
  "mentionsLegales_8": {
    "fr": "E-mail :",
    "en": "Email:"
  },
  "mentionsLegales_9": {
    "fr": "Téléphone :",
    "en": "Phone:"
  },
  "mentionsLegales_10": {
    "fr": "SIREN :",
    "en": "SIREN:"
  },
  "mentionsLegales_11": {
    "fr": "SIRET :",
    "en": "SIRET:"
  },
  "mentionsLegales_12": {
    "fr": "TVA :",
    "en": "VAT:"
  },
  "mentionsLegales_18": {
    "fr": " TVA non applicable, art. 293 B du CGI (franchise en base)",
    "en": " VAT not applicable, art. 293 B of the French Tax Code (VAT exemption)"
  },
  "mentionsLegales_13": {
    "fr": "Directeur de la publication :",
    "en": "Publication Director:"
  },
  "mentionsLegales_19": {
    "fr": " Yascin PERIAC\n      ",
    "en": " Yascin PERIAC\n      "
  },
  "mentionsLegales_20": {
    "fr": "2) Hébergement",
    "en": "2) Hosting"
  },
  "mentionsLegales_21": {
    "fr": "Hébergeur :",
    "en": "Host:"
  },
  "mentionsLegales_27": {
    "fr": " Netlify, Inc.",
    "en": " Netlify, Inc."
  },
  "mentionsLegales_22": {
    "fr": "Adresse :",
    "en": "Address:"
  },
  "mentionsLegales_28": {
    "fr": " 101 2nd Street, San Francisco, CA 94105, USA",
    "en": " 101 2nd Street, San Francisco, CA 94105, USA"
  },
  "mentionsLegales_23": {
    "fr": "E-mail :",
    "en": "Email:"
  },
  "mentionsLegales_24": {
    "fr": "Contact :",
    "en": "Contact:"
  },
  "mentionsLegales_25": {
    "fr": "Support :",
    "en": "Support:"
  },
  "mentionsLegales_26": {
    "fr": "Téléphone :",
    "en": "Phone:"
  },
  "mentionsLegales_29": {
    "fr": " non communiqué publiquement par l’hébergeur\n  ",
    "en": " not publicly disclosed by the host\n  "
  },
  "mentionsLegales_30": {
    "fr": "Nom de domaine / Registrar :",
    "en": "Domain name / Registrar:"
  },
  "mentionsLegales_31": {
    "fr": " Hostinger operations, UAB — Švitrigailos str. 34,\n    Vilnius 03230, Lituanie — Tél. +370 645 03378\n  ",
    "en": " Hostinger operations, UAB — Švitrigailos str. 34,\n    Vilnius 03230, Lithuania — Tel. +370 645 03378\n  "
  },
  "mentionsLegales_32": {
    "fr": "3) Propriété intellectuelle",
    "en": "3) Intellectual Property"
  },
  "mentionsLegales_33": {
    "fr": "\n        L’ensemble des contenus (textes, images, logos, éléments graphiques) présents sur le site\n        est protégé par le droit d’auteur. Toute reproduction, représentation, modification,\n        publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen\n        ou le procédé utilisé, est interdite sans autorisation écrite préalable.\n      ",
    "en": "\n        All content (text, images, logos, graphic elements) on the site\n        is protected by copyright. Any reproduction, representation, modification,\n        publication or adaptation of all or part of the site's elements, by any means\n        or process used, is prohibited without prior written authorization.\n      "
  },
  "mentionsLegales_34": {
    "fr": "4) Responsabilité",
    "en": "4) Liability/Disclaimer"
  },
  "mentionsLegales_37": {
    "fr": "\n        Les informations fournies sur Wavest ont une finalité exclusivement ",
    "en": "\n        The information provided on Wavest is intended solely for "
  },
  "mentionsLegales_35": {
    "fr": "éducative",
    "en": "educational"
  },
  "mentionsLegales_38": {
    "fr": " et\n        ",
    "en": " purposes and\n        "
  },
  "mentionsLegales_36": {
    "fr": "ne constituent pas",
    "en": "does not constitute"
  },
  "mentionsLegales_39": {
    "fr": " un conseil en investissement ni une recommandation personnalisée.\n        Le trading comporte des risques de perte en capital.\n      ",
    "en": " investment advice or a personalized recommendation.\n        Trading involves a risk of capital loss.\n      "
  },
  "mentionsLegales_40": {
    "fr": "5) Contact",
    "en": "5) Contact"
  },
  "mentionsLegales_42": {
    "fr": "Dernière mise à jour : 06/01/2026",
    "en": "Last updated: 06/01/2026"
  },
  "mentionsLegales_43": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "mentionsLegales_44": {
    "fr": "Mentions légales",
    "en": "Legal Notice"
  },
  "mentionsLegales_45": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "mentionsLegales_46": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "mentionsLegales_47": {
    "fr": "CGV",
    "en": "Terms of Sale"
  },
  "mentionsLegales_41": {
    "fr": "\n        Pour toute question : <a href=\"mailto:contact@wavest.fr\">contact@wavest.fr</a>\n",
    "en": "\n        For any questions: <a href=\"mailto:contact@wavest.fr\">contact@wavest.fr</a>\n"
  },
  "analyseTechnique_1": {
    "fr": "Chapitre 3 — Analyse technique",
    "en": "Chapter 3 — Technical Analysis"
  },
  "analyseTechnique_2": {
    "fr": "← Sommaire",
    "en": "← Table of Contents"
  },
  "analyseTechnique_3": {
    "fr": "\n          Sous Chapitres\n          ",
    "en": "\n          Sub-chapters\n          "
  },
  "analyseTechnique_4": {
    "fr": " Tendance",
    "en": " Trend"
  },
  "analyseTechnique_5": {
    "fr": " Patterns",
    "en": " Patterns"
  },
  "analyseTechnique_6": {
    "fr": " Weekly",
    "en": " Weekly"
  },
  "analyseTechnique_7": {
    "fr": " Entrée 4H",
    "en": " 4H Entry"
  },
  "analyseTechnique_8": {
    "fr": " Pattern technique",
    "en": " Technical Pattern"
  },
  "analyseTechnique_9": {
    "fr": " Backtesting",
    "en": " Backtesting"
  },
  "analyseTechnique_10": {
    "fr": " Bonus — Exercices Google Sheets\n                ",
    "en": " Bonus — Google Sheets Exercises\n                "
  },
  "analyseTechnique_11": {
    "fr": "Tendance",
    "en": "Trend"
  },
  "analyseTechnique_13": {
    "fr": "Règles importantes",
    "en": "Important Rules"
  },
  "analyseTechnique_14": {
    "fr": "Validation HH/LL",
    "en": "HH/LL Validation"
  },
  "analyseTechnique_17": {
    "fr": "Pour faire un nouveau plus haut/bas, le ",
    "en": "To make a new high/low, the "
  },
  "analyseTechnique_15": {
    "fr": "corps",
    "en": "body"
  },
  "analyseTechnique_18": {
    "fr": " doit casser la ",
    "en": " must break the "
  },
  "analyseTechnique_16": {
    "fr": "mèche",
    "en": "wick"
  },
  "analyseTechnique_19": {
    "fr": " de l’ancien plus haut/bas.",
    "en": " of the previous high/low."
  },
  "analyseTechnique_20": {
    "fr": "Alternance des points",
    "en": "Point Alternation"
  },
  "analyseTechnique_22": {
    "fr": "Jamais 2 points haut/bas ",
    "en": "Never 2 "
  },
  "analyseTechnique_21": {
    "fr": "successifs",
    "en": "consecutive"
  },
  "analyseTechnique_23": {
    "fr": " : toujours un sur deux.",
    "en": " high/low points: always one after the other."
  },
  "analyseTechnique_24": {
    "fr": "Choix du pivot",
    "en": "Pivot Selection"
  },
  "analyseTechnique_26": {
    "fr": "Toujours prendre le point ",
    "en": "Always take the "
  },
  "analyseTechnique_25": {
    "fr": "le plus haut/bas",
    "en": "highest/lowest"
  },
  "analyseTechnique_27": {
    "fr": " entre deux points haut/bas.",
    "en": " point between two highs/lows."
  },
  "analyseTechnique_28": {
    "fr": "Patterns",
    "en": "Patterns"
  },
  "analyseTechnique_29": {
    "fr": "Figures chartistes — définitions rapides + visuels",
    "en": "Chart patterns — quick definitions + visuals"
  },
  "analyseTechnique_31": {
    "fr": "IETE",
    "en": "IETE"
  },
  "analyseTechnique_34": {
    "fr": "L’",
    "en": "The "
  },
  "analyseTechnique_32": {
    "fr": "IETE",
    "en": "IETE"
  },
  "analyseTechnique_35": {
    "fr": " est un pattern haussier. Il sera détaillé dans le chapitre ",
    "en": " is a bullish pattern. It will be detailed in the "
  },
  "analyseTechnique_33": {
    "fr": "Pattern technique",
    "en": "Technical Pattern"
  },
  "analyseTechnique_36": {
    "fr": "M",
    "en": "M"
  },
  "analyseTechnique_39": {
    "fr": "Le ",
    "en": "The "
  },
  "analyseTechnique_37": {
    "fr": "M",
    "en": "M"
  },
  "analyseTechnique_40": {
    "fr": " est un pattern haussier. D’autres variantes sont présentées dans ",
    "en": " is a bullish pattern. Other variants are presented in "
  },
  "analyseTechnique_38": {
    "fr": "Pattern technique",
    "en": "Technical Pattern"
  },
  "analyseTechnique_41": {
    "fr": "W",
    "en": "W"
  },
  "analyseTechnique_44": {
    "fr": "Le ",
    "en": "The "
  },
  "analyseTechnique_42": {
    "fr": "W",
    "en": "W"
  },
  "analyseTechnique_45": {
    "fr": " est un pattern baissier. D’autres variantes sont présentées dans ",
    "en": " is a bearish pattern. Other variants are presented in "
  },
  "analyseTechnique_43": {
    "fr": "Pattern technique",
    "en": "Technical Pattern"
  },
  "analyseTechnique_46": {
    "fr": "ETE",
    "en": "ETE"
  },
  "analyseTechnique_49": {
    "fr": "L’",
    "en": "The "
  },
  "analyseTechnique_47": {
    "fr": "ETE",
    "en": "ETE"
  },
  "analyseTechnique_50": {
    "fr": " (Épaule–Tête–Épaule) est un pattern de retournement majeur. Variations et implications dans ",
    "en": " (Head and Shoulders) is a major reversal pattern. Variations and implications in "
  },
  "analyseTechnique_48": {
    "fr": "Pattern technique",
    "en": "Technical Pattern"
  },
  "analyseTechnique_51": {
    "fr": "Weekly",
    "en": "Weekly"
  },
  "analyseTechnique_52": {
    "fr": "Routine hebdo — analyse weekly",
    "en": "Weekly routine — weekly analysis"
  },
  "analyseTechnique_54": {
    "fr": "Tendance",
    "en": "Trend"
  },
  "analyseTechnique_55": {
    "fr": "Identifier la tendance dominante.",
    "en": "Identify the dominant trend."
  },
  "analyseTechnique_56": {
    "fr": "Candle Close",
    "en": "Candle Close"
  },
  "analyseTechnique_57": {
    "fr": "Analyser la clôture de la dernière bougie.",
    "en": "Analyze the close of the last candle."
  },
  "analyseTechnique_58": {
    "fr": "S&D Zone",
    "en": "S&D Zone"
  },
  "analyseTechnique_59": {
    "fr": "Zone clé testée et réactive.",
    "en": "Key zone tested and reactive."
  },
  "analyseTechnique_60": {
    "fr": "Pattern",
    "en": "Pattern"
  },
  "analyseTechnique_61": {
    "fr": "Valider IETE/M/W/ETE sur clôture weekly.",
    "en": "Validate IETE/M/W/ETE on weekly close."
  },
  "analyseTechnique_62": {
    "fr": "🚫 Bougie neutre",
    "en": "🚫 Neutral Candle"
  },
  "analyseTechnique_63": {
    "fr": "Indécision → mettre neutre « / ».",
    "en": "Indecision → mark neutral \"/\"."
  },
  "analyseTechnique_64": {
    "fr": "🔄 Double Pattern",
    "en": "🔄 Double Pattern"
  },
  "analyseTechnique_65": {
    "fr": "Si 2 patterns valides → neutre « / ».",
    "en": "If 2 valid patterns → neutral \"/\"."
  },
  "analyseTechnique_66": {
    "fr": "📊 Zone S/R",
    "en": "📊 S/R Zone"
  },
  "analyseTechnique_67": {
    "fr": "Zone testée ≥ 3 fois.",
    "en": "Zone tested ≥ 3 times."
  },
  "analyseTechnique_68": {
    "fr": "📈 TENDANCE",
    "en": "📈 TREND"
  },
  "analyseTechnique_69": {
    "fr": "Noter haussier / baissier / range.",
    "en": "Note bullish / bearish / range."
  },
  "analyseTechnique_70": {
    "fr": "🕯️ CANDLE CLOSE",
    "en": "🕯️ CANDLE CLOSE"
  },
  "analyseTechnique_71": {
    "fr": "Corps fin et centré → neutre « / ».",
    "en": "Thin, centered body → neutral \"/\"."
  },
  "analyseTechnique_72": {
    "fr": "🟩/🟥 S&D ZONE",
    "en": "🟩/🟥 S&D ZONE"
  },
  "analyseTechnique_73": {
    "fr": "Zone validée si ≥ 3 tests.",
    "en": "Zone validated if ≥ 3 tests."
  },
  "analyseTechnique_74": {
    "fr": "🔺 PATTERN",
    "en": "🔺 PATTERN"
  },
  "analyseTechnique_75": {
    "fr": "2 patterns valides → neutre « / ».",
    "en": "2 valid patterns → neutral \"/\"."
  },
  "analyseTechnique_76": {
    "fr": "Entrée 4H",
    "en": "4H Entry"
  },
  "analyseTechnique_77": {
    "fr": "Affiner ses entrées avec Décélération et FC-27",
    "en": "Refine your entries with Deceleration and FC-27"
  },
  "analyseTechnique_79": {
    "fr": "Ralentissement (Décélération)",
    "en": "Deceleration"
  },
  "analyseTechnique_80": {
    "fr": "Prix impulsif",
    "en": "Impulsive price"
  },
  "analyseTechnique_81": {
    "fr": " avant la zone.",
    "en": " before the zone."
  },
  "analyseTechnique_82": {
    "fr": "Mèche de rejet",
    "en": "Rejection wick"
  },
  "analyseTechnique_84": {
    "fr": " sur la 1",
    "en": " on the 1"
  },
  "analyseTechnique_83": {
    "fr": "ère",
    "en": "st"
  },
  "analyseTechnique_85": {
    "fr": " bougie.",
    "en": " candle."
  },
  "analyseTechnique_86": {
    "fr": "3 mèches",
    "en": "3 wicks"
  },
  "analyseTechnique_87": {
    "fr": " dans la zone de ralentissement.",
    "en": " within the deceleration zone."
  },
  "analyseTechnique_88": {
    "fr": "1 bougie",
    "en": "1 candle"
  },
  "analyseTechnique_89": {
    "fr": " dans le sens du trade.",
    "en": " in the direction of the trade."
  },
  "analyseTechnique_90": {
    "fr": "Entrée",
    "en": "Entry"
  },
  "analyseTechnique_91": {
    "fr": " sur la 4",
    "en": " on the 4"
  },
  "analyseTechnique_92": {
    "fr": " bougie (validation).",
    "en": " candle (validation)."
  },
  "analyseTechnique_93": {
    "fr": "Stop Loss",
    "en": "Stop Loss"
  },
  "analyseTechnique_94": {
    "fr": " sous la mèche la plus basse + arrondi à 10 pips.",
    "en": " below the lowest wick + rounded to 10 pips."
  },
  "analyseTechnique_96": {
    "fr": "📈 Si ",
    "en": "📈 If "
  },
  "analyseTechnique_95": {
    "fr": "RR > 10",
    "en": "RR > 10"
  },
  "analyseTechnique_97": {
    "fr": " → doubler la distance du SL.",
    "en": " → double the SL distance."
  },
  "analyseTechnique_98": {
    "fr": "Pas de M1/W1 Big",
    "en": "No M1/W1 Big"
  },
  "analyseTechnique_99": {
    "fr": "Exemples visuels",
    "en": "Visual examples"
  },
  "analyseTechnique_100": {
    "fr": "FC-27",
    "en": "FC-27"
  },
  "analyseTechnique_102": {
    "fr": "Uniquement en ",
    "en": "Only on "
  },
  "analyseTechnique_101": {
    "fr": "4H",
    "en": "4H"
  },
  "analyseTechnique_105": {
    "fr": "Pas de ",
    "en": "No "
  },
  "analyseTechnique_103": {
    "fr": "M1/W1 Big",
    "en": "M1/W1 Big"
  },
  "analyseTechnique_106": {
    "fr": " ni ",
    "en": " nor "
  },
  "analyseTechnique_104": {
    "fr": "M5/W5",
    "en": "M5/W5"
  },
  "analyseTechnique_109": {
    "fr": "Le ",
    "en": "The "
  },
  "analyseTechnique_107": {
    "fr": "P3",
    "en": "P3"
  },
  "analyseTechnique_110": {
    "fr": " ne doit pas toucher la ZOI avant le ",
    "en": " must not touch the ZOI before "
  },
  "analyseTechnique_108": {
    "fr": "P5",
    "en": "P5"
  },
  "analyseTechnique_112": {
    "fr": "Le prix doit être ",
    "en": "The price must be "
  },
  "analyseTechnique_111": {
    "fr": "correctif",
    "en": "corrective"
  },
  "analyseTechnique_114": {
    "fr": "PE",
    "en": "Entry"
  },
  "analyseTechnique_116": {
    "fr": " sur ",
    "en": " on "
  },
  "analyseTechnique_117": {
    "fr": " et ",
    "en": " and "
  },
  "analyseTechnique_115": {
    "fr": "SL",
    "en": "SL"
  },
  "analyseTechnique_118": {
    "fr": " sous ",
    "en": " below "
  },
  "analyseTechnique_119": {
    "fr": "PE",
    "en": "Entry"
  },
  "analyseTechnique_121": {
    "fr": " sur ",
    "en": " on "
  },
  "analyseTechnique_122": {
    "fr": " et ",
    "en": " and "
  },
  "analyseTechnique_120": {
    "fr": "SL",
    "en": "SL"
  },
  "analyseTechnique_123": {
    "fr": " sous ",
    "en": " below "
  },
  "analyseTechnique_124": {
    "fr": " daily.",
    "en": " daily."
  },
  "analyseTechnique_125": {
    "fr": "TP1 4H",
    "en": "TP1 4H"
  },
  "analyseTechnique_126": {
    "fr": " au ",
    "en": " at "
  },
  "analyseTechnique_127": {
    "fr": "Exemples visuels",
    "en": "Visual examples"
  },
  "analyseTechnique_128": {
    "fr": "Patterns M/W — avec et sans cassure",
    "en": "M/W Patterns — with and without break"
  },
  "analyseTechnique_129": {
    "fr": "Exemples concrets et check-list de validation",
    "en": "Concrete examples and validation checklist"
  },
  "analyseTechnique_132": {
    "fr": "\n          Différence entre ",
    "en": "\n          Difference between "
  },
  "analyseTechnique_130": {
    "fr": "M/W avec cassure (BOS)",
    "en": "M/W with break (BOS)"
  },
  "analyseTechnique_133": {
    "fr": " et ",
    "en": " and "
  },
  "analyseTechnique_131": {
    "fr": "sans cassure",
    "en": "without break"
  },
  "analyseTechnique_134": {
    "fr": " :\n          critères, erreurs fréquentes, et exemples 4H.\n        ",
    "en": ":\n          criteria, common mistakes, and 4H examples.\n        "
  },
  "analyseTechnique_135": {
    "fr": "M avec cassure",
    "en": "M with break"
  },
  "analyseTechnique_136": {
    "fr": "Règles importantes",
    "en": "Important Rules"
  },
  "analyseTechnique_137": {
    "fr": "📏 Fibonacci mèches P3 et corps P2.",
    "en": "📏 Fibonacci from P3 wicks and P2 body."
  },
  "analyseTechnique_138": {
    "fr": "💥 Nécessite une cassure du dernier plus haut.",
    "en": "💥 Requires a break of the last high."
  },
  "analyseTechnique_139": {
    "fr": "🔒 Stop Loss sous la mèche la plus basse.",
    "en": "🔒 Stop Loss below the lowest wick."
  },
  "analyseTechnique_140": {
    "fr": "M sans cassure",
    "en": "M without break"
  },
  "analyseTechnique_141": {
    "fr": "Règles importantes",
    "en": "Important Rules"
  },
  "analyseTechnique_142": {
    "fr": "📏 Fibonacci mèches P3 et corps P0.",
    "en": "📏 Fibonacci from P3 wicks and P0 body."
  },
  "analyseTechnique_143": {
    "fr": "🚫 Ne casse pas le dernier plus haut.",
    "en": "🚫 Does not break the last high."
  },
  "analyseTechnique_144": {
    "fr": "🔒 Stop Loss sous la mèche la plus basse.",
    "en": "🔒 Stop Loss below the lowest wick."
  },
  "analyseTechnique_145": {
    "fr": "📌 À retenir — Entrée 4H",
    "en": "📌 To Remember — 4H Entry"
  },
  "analyseTechnique_147": {
    "fr": "⚡ Toujours un ",
    "en": "⚡ Always a "
  },
  "analyseTechnique_146": {
    "fr": "mouvement impulsif clair",
    "en": "clear impulsive move"
  },
  "analyseTechnique_148": {
    "fr": " avant toute décélération.",
    "en": " before any deceleration."
  },
  "analyseTechnique_150": {
    "fr": "💥 Privilégier les ",
    "en": "💥 Prefer "
  },
  "analyseTechnique_149": {
    "fr": "M/W avec cassure (BOS)",
    "en": "M/W with break (BOS)"
  },
  "analyseTechnique_151": {
    "fr": " pour plus de fiabilité.",
    "en": " for greater reliability."
  },
  "analyseTechnique_153": {
    "fr": "🎯 Entrer uniquement quand tous les ",
    "en": "🎯 Only enter when all "
  },
  "analyseTechnique_152": {
    "fr": "critères 4H",
    "en": "4H criteria"
  },
  "analyseTechnique_154": {
    "fr": " sont réunis.",
    "en": " are met."
  },
  "analyseTechnique_155": {
    "fr": "📊 Backtest Analytics — 2022–2025",
    "en": "📊 Backtest Analytics — 2022–2025"
  },
  "analyseTechnique_156": {
    "fr": "Voici mes Datas de backtesting",
    "en": "Here is my backtesting data"
  },
  "analyseTechnique_157": {
    "fr": "Ouvrir la feuille Google Sheets",
    "en": "Open the Google Sheet"
  },
  "analyseTechnique_158": {
    "fr": "Pattern technique",
    "en": "Technical Pattern"
  },
  "analyseTechnique_159": {
    "fr": "Variantes avancées, critères de validation et erreurs fréquentes",
    "en": "Advanced variants, validation criteria, and common mistakes"
  },
  "analyseTechnique_161": {
    "fr": "M1 Small/Big",
    "en": "M1 Small/Big"
  },
  "analyseTechnique_163": {
    "fr": "Pour le M1 big, ",
    "en": "For M1 big, "
  },
  "analyseTechnique_162": {
    "fr": "les ralentissements et Fibonacci inversés",
    "en": "reversed decelerations and Fibonacci"
  },
  "analyseTechnique_164": {
    "fr": " sont déconseillés en 4h.",
    "en": " are not recommended on 4H."
  },
  "analyseTechnique_165": {
    "fr": "W1 Small/Big",
    "en": "W1 Small/Big"
  },
  "analyseTechnique_166": {
    "fr": "Le W1 big ne fait plus partie de mon plan, trop de perte sur ce pattern. Je t’invite à le backtester.",
    "en": "W1 big is no longer part of my plan — too many losses on this pattern. I invite you to backtest it yourself."
  },
  "analyseTechnique_167": {
    "fr": "M2",
    "en": "M2"
  },
  "analyseTechnique_170": {
    "fr": "Il faut au ",
    "en": "You need at "
  },
  "analyseTechnique_168": {
    "fr": "minimum 2 bougies inverses",
    "en": "least 2 opposite candles"
  },
  "analyseTechnique_171": {
    "fr": " dans la ",
    "en": " in the "
  },
  "analyseTechnique_169": {
    "fr": "correction du P3 au P4",
    "en": "correction from P3 to P4"
  },
  "analyseTechnique_172": {
    "fr": "W2",
    "en": "W2"
  },
  "analyseTechnique_175": {
    "fr": "Il faut au ",
    "en": "You need at "
  },
  "analyseTechnique_173": {
    "fr": "minimum 2 bougies inverses",
    "en": "least 2 opposite candles"
  },
  "analyseTechnique_176": {
    "fr": " dans la ",
    "en": " in the "
  },
  "analyseTechnique_174": {
    "fr": "correction du P3 au P4",
    "en": "correction from P3 to P4"
  },
  "analyseTechnique_177": {
    "fr": "M3",
    "en": "M3"
  },
  "analyseTechnique_181": {
    "fr": "\n            Une fois le corps de la bougie aimant touché, ",
    "en": "\n            Once the magnet candle's body is touched, "
  },
  "analyseTechnique_178": {
    "fr": "mettre son SL au PE",
    "en": "move your SL to the entry"
  },
  "analyseTechnique_179": {
    "fr": "Ne pas rentrer",
    "en": "Do not enter"
  },
  "analyseTechnique_182": {
    "fr": " sur une bougie aimant.",
    "en": " on a magnet candle."
  },
  "analyseTechnique_180": {
    "fr": "Si mon pattern 4h a dépassé le corps de ma bougie aimant",
    "en": "If my 4H pattern has passed the body of my magnet candle"
  },
  "analyseTechnique_183": {
    "fr": ", j’annule le trade.\n          ",
    "en": ", I cancel the trade.\n          "
  },
  "analyseTechnique_184": {
    "fr": "W3",
    "en": "W3"
  },
  "analyseTechnique_188": {
    "fr": "\n            Une fois le corps de la bougie aimant touché, ",
    "en": "\n            Once the magnet candle's body is touched, "
  },
  "analyseTechnique_185": {
    "fr": "mettre son SL au PE",
    "en": "move your SL to the entry"
  },
  "analyseTechnique_186": {
    "fr": "Ne pas rentrer",
    "en": "Do not enter"
  },
  "analyseTechnique_189": {
    "fr": " sur une bougie aimant.",
    "en": " on a magnet candle."
  },
  "analyseTechnique_187": {
    "fr": "Si mon pattern 4h a dépassé le corps de ma bougie aimant",
    "en": "If my 4H pattern has passed the body of my magnet candle"
  },
  "analyseTechnique_190": {
    "fr": ", j’annule le trade.\n          ",
    "en": ", I cancel the trade.\n          "
  },
  "analyseTechnique_191": {
    "fr": "M4",
    "en": "M4"
  },
  "analyseTechnique_195": {
    "fr": "Si le ",
    "en": "If "
  },
  "analyseTechnique_192": {
    "fr": "P1 et P3 sont au même niveau",
    "en": "P1 and P3 are at the same level"
  },
  "analyseTechnique_196": {
    "fr": ", automatiquement cela devient un M4. La ",
    "en": ", it automatically becomes an M4. The "
  },
  "analyseTechnique_193": {
    "fr": "zone d'intérêt",
    "en": "zone of interest"
  },
  "analyseTechnique_197": {
    "fr": " est au ",
    "en": " is at the "
  },
  "analyseTechnique_194": {
    "fr": "même niveau que le P2",
    "en": "same level as P2"
  },
  "analyseTechnique_198": {
    "fr": "W4",
    "en": "W4"
  },
  "analyseTechnique_202": {
    "fr": "Si le ",
    "en": "If "
  },
  "analyseTechnique_199": {
    "fr": "P1 et P3 sont au même niveau",
    "en": "P1 and P3 are at the same level"
  },
  "analyseTechnique_203": {
    "fr": ", automatiquement cela devient un W4. La ",
    "en": ", it automatically becomes a W4. The "
  },
  "analyseTechnique_200": {
    "fr": "zone d'intérêt",
    "en": "zone of interest"
  },
  "analyseTechnique_204": {
    "fr": " est au ",
    "en": " is at the "
  },
  "analyseTechnique_201": {
    "fr": "même niveau que le P2",
    "en": "same level as P2"
  },
  "analyseTechnique_205": {
    "fr": "M5",
    "en": "M5"
  },
  "analyseTechnique_207": {
    "fr": "Le P4 doit clôturer ",
    "en": "P4 must close "
  },
  "analyseTechnique_206": {
    "fr": "entre le corps du P2 et la mèche du P2",
    "en": "between the P2 body and the P2 wick"
  },
  "analyseTechnique_208": {
    "fr": "W5",
    "en": "W5"
  },
  "analyseTechnique_210": {
    "fr": "Le P4 doit clôturer ",
    "en": "P4 must close "
  },
  "analyseTechnique_209": {
    "fr": "en dehors de la zone d’intérêt",
    "en": "outside the zone of interest"
  },
  "analyseTechnique_211": {
    "fr": "Backtesting",
    "en": "Backtesting"
  },
  "analyseTechnique_213": {
    "fr": "\n            Votre navigateur ne supporte pas la vidéo HTML5.\n            ",
    "en": "\n            Your browser does not support HTML5 video.\n            "
  },
  "analyseTechnique_212": {
    "fr": "Télécharger la vidéo",
    "en": "Download the video"
  },
  "analyseTechnique_215": {
    "fr": "Workspace Trading — Google Sheets",
    "en": "Trading Workspace — Google Sheets"
  },
  "analyseTechnique_216": {
    "fr": "Backteste aujourd’hui, performe demain.",
    "en": "Backtest today, perform tomorrow."
  },
  "analyseTechnique_217": {
    "fr": "Accéder au Workspace Trading",
    "en": "Access the Trading Workspace"
  },
  "analyseTechnique_232": {
    "fr": "Le classeur complet que j’utilise au quotidien, dupliqué en un clic dans ton propre Google Drive.",
    "en": "The full workbook I use every day, duplicated in one click into your own Google Drive."
  },
  "analyseTechnique_233": {
    "fr": "Mon backtest complet 2022-2025 (800+ trades documentés)",
    "en": "My full 2022-2025 backtest (800+ documented trades)"
  },
  "analyseTechnique_234": {
    "fr": "Une feuille d’exercices sur tout le programme",
    "en": "An exercise sheet covering the whole program"
  },
  "analyseTechnique_235": {
    "fr": "Un tableau de backtesting automatisé pour t’entraîner",
    "en": "An automated backtesting table to practice with"
  },
  "analyseTechnique_236": {
    "fr": "Un Trading Journal pour tes prises de trade en réel, connecté à ton Dashboard de progression",
    "en": "A Trading Journal for your live trades, connected to your Progress Dashboard"
  },
  "analyseTechnique_218": {
    "fr": "Note du coach",
    "en": "Coach's note"
  },
  "analyseTechnique_219": {
    "fr": "\n            ✏️ Éditer\n          ",
    "en": "\n            ✏️ Edit\n          "
  },
  "analyseTechnique_220": {
    "fr": "Écrire le commentaire",
    "en": "Write your comment"
  },
  "analyseTechnique_221": {
    "fr": "Annuler",
    "en": "Cancel"
  },
  "analyseTechnique_222": {
    "fr": "Enregistrer",
    "en": "Save"
  },
  "analyseTechnique_223": {
    "fr": "Revenir au Chapitre 2 — Configuration TradingView",
    "en": "Back to Chapter 2 — TradingView Setup"
  },
  "analyseTechnique_224": {
    "fr": "Passer au Chapitre 4 — Money management",
    "en": "Go to Chapter 4 — Money Management"
  },
  "analyseTechnique_225": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "analyseTechnique_226": {
    "fr": "Mentions légales",
    "en": "Legal Notice"
  },
  "analyseTechnique_227": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "analyseTechnique_228": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "analyseTechnique_229": {
    "fr": "CGV",
    "en": "Terms of Sale"
  },
  "analyseTechnique_230": {
    "fr": "Gérer les cookies",
    "en": "Manage Cookies"
  },
  "analyseTechnique_231": {
    "fr": "Contact",
    "en": "Contact"
  },
  "analyseTechnique_12": {
    "fr": "<span aria-hidden=\"true\">🎥</span> Vidéo d’introduction — règles pour valider HH/LL.",
    "en": "<span aria-hidden=\"true\">🎥</span> Introductory video — rules for validating HH/LL."
  },
  "analyseTechnique_30": {
    "fr": "<span aria-hidden=\"true\">🎥</span> Vidéo — Patterns (figures chartistes).",
    "en": "<span aria-hidden=\"true\">🎥</span> Video — Patterns (chart patterns)."
  },
  "analyseTechnique_53": {
    "fr": "<span aria-hidden=\"true\">🎥</span> Vidéo — L'analyse Weekly",
    "en": "<span aria-hidden=\"true\">🎥</span> Video — Weekly Analysis"
  },
  "analyseTechnique_78": {
    "fr": "<span aria-hidden=\"true\">🎥</span> Vidéo — Entrée 4H (Décélération + FC-27)",
    "en": "<span aria-hidden=\"true\">🎥</span> Video — 4H Entry (Deceleration + FC-27)"
  },
  "analyseTechnique_113": {
    "fr": "Avoir les niveaux <strong>-0.27</strong> / <strong>-0.68</strong> dans la zone daily.",
    "en": "Have the levels <strong>-0.27</strong> / <strong>-0.68</strong> in the daily zone."
  },
  "analyseTechnique_160": {
    "fr": "\n<span aria-hidden=\"true\">🎥</span> Patterns avancés — lecture, validation, gestion du risque.\n        ",
    "en": "\n<span aria-hidden=\"true\">🎥</span> Advanced patterns — reading, validation, risk management.\n        "
  },
  "analyseTechnique_214": {
    "fr": "\n<span aria-hidden=\"true\">🎥</span>\n          Backtesting — méthode pas à pas (jeu de données, règles de validation, journal de trades).\n        ",
    "en": "\n<span aria-hidden=\"true\">🎥</span>\n          Backtesting — step-by-step method (dataset, validation rules, trade journal).\n        "
  },
  "analyseTechniqueForexDebutant_1": {
    "fr": "Analyse technique Forex : les bases pour lire un graphique",
    "en": "Forex technical analysis: the basics for reading a chart"
  },
  "analyseTechniqueForexDebutant_2": {
    "fr": "← Accueil",
    "en": "← Home"
  },
  "analyseTechniqueForexDebutant_3": {
    "fr": "Pourquoi l'analyse technique avant les indicateurs",
    "en": "Why technical analysis comes before indicators"
  },
  "analyseTechniqueForexDebutant_5": {
    "fr": "\n        Beaucoup de débutants ouvrent TradingView, ajoutent 6 indicateurs différents, et se\n        retrouvent avec un graphique illisible. L'",
    "en": "\n        Many beginners open TradingView, add 6 different indicators, and end up\n        with an unreadable chart. "
  },
  "analyseTechniqueForexDebutant_4": {
    "fr": "analyse technique",
    "en": "Technical analysis"
  },
  "analyseTechniqueForexDebutant_6": {
    "fr": " ne commence\n        pas par les indicateurs — elle commence par savoir lire un graphique à l'œil nu :\n        où est la tendance, où sont les zones de réaction, et comment le prix s'y comporte.\n      ",
    "en": " doesn't start\n        with indicators — it starts with knowing how to read a chart with the naked eye:\n        where the trend is, where the reaction zones are, and how price behaves there.\n      "
  },
  "analyseTechniqueForexDebutant_7": {
    "fr": "\n        Les indicateurs viennent en complément d'une lecture déjà solide, pas à la place.\n      ",
    "en": "\n        Indicators come as a complement to an already solid reading, not a replacement for it.\n      "
  },
  "analyseTechniqueForexDebutant_8": {
    "fr": "1. Identifier la tendance",
    "en": "1. Identify the trend"
  },
  "analyseTechniqueForexDebutant_9": {
    "fr": "\n        Une tendance se lit à travers la structure des plus hauts et des plus bas :\n      ",
    "en": "\n        A trend is read through the structure of highs and lows:\n      "
  },
  "analyseTechniqueForexDebutant_10": {
    "fr": "Tendance haussière",
    "en": "Uptrend"
  },
  "analyseTechniqueForexDebutant_11": {
    "fr": " — une succession de plus hauts et de plus bas\n          croissants.\n        ",
    "en": " — a succession of rising highs and\n          rising lows.\n        "
  },
  "analyseTechniqueForexDebutant_12": {
    "fr": "Tendance baissière",
    "en": "Downtrend"
  },
  "analyseTechniqueForexDebutant_13": {
    "fr": " — une succession de plus hauts et de plus bas\n          décroissants.\n        ",
    "en": " — a succession of falling highs and\n          falling lows.\n        "
  },
  "analyseTechniqueForexDebutant_14": {
    "fr": "Range (marché sans tendance)",
    "en": "Range (trendless market)"
  },
  "analyseTechniqueForexDebutant_15": {
    "fr": " — le prix oscille entre une zone haute\n          et une zone basse, sans direction claire.\n        ",
    "en": " — price oscillates between an upper zone\n          and a lower zone, with no clear direction.\n        "
  },
  "analyseTechniqueForexDebutant_16": {
    "fr": "\n        🔔 Beaucoup d'erreurs de débutant viennent du fait de chercher une tendance là où le\n        marché est en range.\n      ",
    "en": "\n        🔔 Many beginner mistakes come from looking for a trend where the\n        market is actually ranging.\n      "
  },
  "analyseTechniqueForexDebutant_17": {
    "fr": "2. Repérer les zones de support et résistance",
    "en": "2. Spot support and resistance zones"
  },
  "analyseTechniqueForexDebutant_20": {
    "fr": "\n        Un ",
    "en": "\n        A "
  },
  "analyseTechniqueForexDebutant_18": {
    "fr": "support",
    "en": "support"
  },
  "analyseTechniqueForexDebutant_21": {
    "fr": " est une zone où le prix a tendance à rebondir à la hausse ;\n        une ",
    "en": " is a zone where price tends to bounce upward;\n        a "
  },
  "analyseTechniqueForexDebutant_19": {
    "fr": "résistance",
    "en": "resistance"
  },
  "analyseTechniqueForexDebutant_22": {
    "fr": ", une zone où il a tendance à rebondir à la baisse. Ce sont\n        des zones, pas des lignes parfaites — le prix les teste rarement au pixel près.\n      ",
    "en": ", a zone where it tends to bounce downward. These are\n        zones, not perfect lines — price rarely tests them to the exact pixel.\n      "
  },
  "analyseTechniqueForexDebutant_23": {
    "fr": "\n        Ces zones se construisent à partir des plus hauts et plus bas significatifs déjà formés\n        sur le graphique, en particulier sur les unités de temps supérieures (Weekly, Daily)\n        avant de descendre sur des unités plus fines.\n      ",
    "en": "\n        These zones are built from the significant highs and lows already formed\n        on the chart, particularly on higher timeframes (Weekly, Daily)\n        before moving down to finer timeframes.\n      "
  },
  "analyseTechniqueForexDebutant_24": {
    "fr": "3. Lire plusieurs unités de temps",
    "en": "3. Read multiple timeframes"
  },
  "analyseTechniqueForexDebutant_25": {
    "fr": "\n        Une erreur fréquente est d'analyser uniquement en 15 minutes ou en 1 heure. Une lecture\n        solide part toujours du plus large vers le plus fin :\n      ",
    "en": "\n        A common mistake is analyzing only on the 15-minute or 1-hour chart. A\n        solid reading always moves from the broadest to the finest:\n      "
  },
  "analyseTechniqueForexDebutant_26": {
    "fr": "Rôle de chaque unité de temps dans l'analyse technique",
    "en": "Role of each timeframe in technical analysis"
  },
  "analyseTechniqueForexDebutant_27": {
    "fr": "Unité de temps",
    "en": "Timeframe"
  },
  "analyseTechniqueForexDebutant_28": {
    "fr": "Rôle",
    "en": "Role"
  },
  "analyseTechniqueForexDebutant_29": {
    "fr": "Weekly / Daily",
    "en": "Weekly / Daily"
  },
  "analyseTechniqueForexDebutant_30": {
    "fr": "Contexte général : tendance de fond, zones majeures",
    "en": "Overall context: underlying trend, major zones"
  },
  "analyseTechniqueForexDebutant_31": {
    "fr": "4H",
    "en": "4H"
  },
  "analyseTechniqueForexDebutant_32": {
    "fr": "Structure intermédiaire, confirmation du scénario",
    "en": "Intermediate structure, scenario confirmation"
  },
  "analyseTechniqueForexDebutant_33": {
    "fr": "1H et moins",
    "en": "1H and below"
  },
  "analyseTechniqueForexDebutant_34": {
    "fr": "Affinage de l'entrée, une fois le contexte déjà validé",
    "en": "Refining the entry, once the context is already validated"
  },
  "analyseTechniqueForexDebutant_35": {
    "fr": "Les erreurs classiques en analyse technique",
    "en": "Common mistakes in technical analysis"
  },
  "analyseTechniqueForexDebutant_36": {
    "fr": "Analyser uniquement en unité de temps courte, sans contexte plus large.",
    "en": "Analyzing only on a short timeframe, without broader context."
  },
  "analyseTechniqueForexDebutant_37": {
    "fr": "Empiler des indicateurs qui racontent tous la même information autrement.",
    "en": "Stacking indicators that all convey the same information in a different way."
  },
  "analyseTechniqueForexDebutant_38": {
    "fr": "Voir des figures (\"patterns\") partout, même quand la structure ne les confirme pas.",
    "en": "Seeing patterns everywhere, even when the structure doesn't confirm them."
  },
  "analyseTechniqueForexDebutant_39": {
    "fr": "Ignorer que support/résistance sont des zones, pas des niveaux exacts.",
    "en": "Ignoring that support/resistance are zones, not exact levels."
  },
  "analyseTechniqueForexDebutant_40": {
    "fr": "À retenir",
    "en": "Key takeaways"
  },
  "analyseTechniqueForexDebutant_41": {
    "fr": "Commence par la tendance et la structure, avant les indicateurs.",
    "en": "Start with trend and structure, before indicators."
  },
  "analyseTechniqueForexDebutant_42": {
    "fr": "Support/résistance = zones de réaction, pas des lignes exactes.",
    "en": "Support/resistance = reaction zones, not exact lines."
  },
  "analyseTechniqueForexDebutant_43": {
    "fr": "Analyse toujours du plus large (Weekly/Daily) vers le plus fin.",
    "en": "Always analyze from the broadest (Weekly/Daily) to the finest."
  },
  "analyseTechniqueForexDebutant_44": {
    "fr": "Moins d'indicateurs, mieux compris, valent mieux que beaucoup mal maîtrisés.",
    "en": "Fewer, better-understood indicators are worth more than many poorly mastered ones."
  },
  "analyseTechniqueForexDebutant_45": {
    "fr": "\n        ← Guide débutant : apprendre le trading Forex\n      ",
    "en": "\n        ← Beginner's guide: learning Forex trading\n      "
  },
  "analyseTechniqueForexDebutant_46": {
    "fr": "\n        Article suivant — Money management →\n      ",
    "en": "\n        Next article — Money management →\n      "
  },
  "analyseTechniqueForexDebutant_47": {
    "fr": "\n        Découvrir la méthode Wavest →\n      ",
    "en": "\n        Discover the Wavest method →\n      "
  },
  "analyseTechniqueForexDebutant_48": {
    "fr": "\n      ⚠️ Ce contenu a une vocation uniquement éducative. Il ne constitue en aucun cas un conseil en\n      investissement. Le trading comporte des risques de perte en capital.\n    ",
    "en": "\n      ⚠️ This content is for educational purposes only. It does not constitute investment\n      advice in any way. Trading involves a risk of capital loss.\n    "
  },
  "analyseTechniqueForexDebutant_49": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "analyseTechniqueForexDebutant_50": {
    "fr": "Mentions légales",
    "en": "Legal notice"
  },
  "analyseTechniqueForexDebutant_51": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "analyseTechniqueForexDebutant_52": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "analyseTechniqueForexDebutant_53": {
    "fr": "CGV",
    "en": "Terms & Conditions"
  },
  "analyseTechniqueForexDebutant_54": {
    "fr": "Gérer les cookies",
    "en": "Manage cookies"
  },
  "analyseTechniqueForexDebutant_55": {
    "fr": "Contact",
    "en": "Contact"
  },
  "backtestTradingMethode_1": {
    "fr": "Backtest en trading : comment tester une méthode avant de trader en réel",
    "en": "Backtesting in trading: how to test a method before trading live"
  },
  "backtestTradingMethode_2": {
    "fr": "← Accueil",
    "en": "← Home"
  },
  "backtestTradingMethode_3": {
    "fr": "Pourquoi backtester avant de risquer de l'argent réel",
    "en": "Why backtest before risking real money"
  },
  "backtestTradingMethode_5": {
    "fr": "\n        Un ",
    "en": "\n        A "
  },
  "backtestTradingMethode_4": {
    "fr": "backtest",
    "en": "backtest"
  },
  "backtestTradingMethode_6": {
    "fr": " consiste à appliquer une méthode de trading sur des données\n        historiques pour voir comment elle se serait comportée. C'est l'étape qui sépare \"je pense\n        que ça marche\" de \"j'ai des chiffres qui montrent que ça marche\" — sur des dizaines ou\n        centaines de trades, pas sur une impression.\n      ",
    "en": " means applying a trading method to historical\n        data to see how it would have performed. It's the step that separates \"I think\n        this works\" from \"I have numbers showing this works\" — across dozens or\n        hundreds of trades, not a single impression.\n      "
  },
  "backtestTradingMethode_7": {
    "fr": "Comment backtester une méthode",
    "en": "How to backtest a method"
  },
  "backtestTradingMethode_8": {
    "fr": "1. Définir des règles précises",
    "en": "1. Define precise rules"
  },
  "backtestTradingMethode_9": {
    "fr": " — critères d'entrée, de sortie, de stop\n          et de risque, sans zone d'interprétation.\n        ",
    "en": " — entry, exit, stop\n          and risk criteria, with no room for interpretation.\n        "
  },
  "backtestTradingMethode_10": {
    "fr": "2. Parcourir l'historique chronologiquement",
    "en": "2. Go through the history chronologically"
  },
  "backtestTradingMethode_11": {
    "fr": " — trade par trade, sans\n          regarder ce qui se passe après (pour éviter de \"tricher\" avec le recul).\n        ",
    "en": " — trade by trade, without\n          looking at what happens afterward (to avoid \"cheating\" with hindsight).\n        "
  },
  "backtestTradingMethode_12": {
    "fr": "3. Noter chaque trade",
    "en": "3. Log every trade"
  },
  "backtestTradingMethode_13": {
    "fr": " — résultat, taille de position, contexte —\n          dans un tableau structuré.\n        ",
    "en": " — result, position size, context —\n          in a structured table.\n        "
  },
  "backtestTradingMethode_14": {
    "fr": "4. Calculer les statistiques",
    "en": "4. Calculate the statistics"
  },
  "backtestTradingMethode_15": {
    "fr": " — taux de réussite, ratio gain/perte\n          moyen, espérance mathématique, drawdown maximum.\n        ",
    "en": " — win rate, average\n          win/loss ratio, expectancy, maximum drawdown.\n        "
  },
  "backtestTradingMethode_17": {
    "fr": "\n        Une fois ton taux de réussite et ton ratio risque/rendement moyen obtenus sur un\n        échantillon suffisant, tu peux les injecter dans le\n        ",
    "en": "\n        Once you have your win rate and average risk/reward ratio from a\n        sufficient sample, you can plug them into the\n        "
  },
  "backtestTradingMethode_16": {
    "fr": "simulateur de croissance de capital",
    "en": "capital growth simulator"
  },
  "backtestTradingMethode_18": {
    "fr": "\n        pour visualiser comment ta méthode se comporterait réellement sur la durée, selon le\n        risque que tu prends par trade.\n      ",
    "en": "\n        to see how your method would actually perform over time, depending\n        on the risk you take per trade.\n      "
  },
  "backtestTradingMethode_19": {
    "fr": "Les erreurs qui faussent un backtest",
    "en": "Mistakes that skew a backtest"
  },
  "backtestTradingMethode_20": {
    "fr": "Le biais rétrospectif",
    "en": "Hindsight bias"
  },
  "backtestTradingMethode_21": {
    "fr": " — repérer un setup parce qu'on sait déjà ce qui\n          s'est passé après.\n        ",
    "en": " — spotting a setup because you already know what\n          happened afterward.\n        "
  },
  "backtestTradingMethode_22": {
    "fr": "Un échantillon trop petit",
    "en": "Too small a sample"
  },
  "backtestTradingMethode_23": {
    "fr": " — juger une méthode sur 10-15 trades ne dit\n          presque rien statistiquement.\n        ",
    "en": " — judging a method on 10-15 trades tells you\n          almost nothing statistically.\n        "
  },
  "backtestTradingMethode_24": {
    "fr": "Ignorer les coûts réels",
    "en": "Ignoring real costs"
  },
  "backtestTradingMethode_25": {
    "fr": " — spread, slippage, commissions changent parfois\n          complètement les résultats.\n        ",
    "en": " — spread, slippage, and commissions can sometimes\n          completely change the results.\n        "
  },
  "backtestTradingMethode_26": {
    "fr": "\n        🔔 Une méthode qui n'a pas été backtestée sur au moins 100-200 trades reste, au mieux, une\n        hypothèse.\n      ",
    "en": "\n        🔔 A method that hasn't been backtested on at least 100-200 trades remains, at best, a\n        hypothesis.\n      "
  },
  "backtestTradingMethode_27": {
    "fr": "À retenir",
    "en": "Key takeaways"
  },
  "backtestTradingMethode_28": {
    "fr": "Le backtest transforme une intuition en données vérifiables.",
    "en": "Backtesting turns a hunch into verifiable data."
  },
  "backtestTradingMethode_29": {
    "fr": "Des règles précises et un large échantillon sont indispensables.",
    "en": "Precise rules and a large sample are essential."
  },
  "backtestTradingMethode_30": {
    "fr": "Attention au biais rétrospectif et aux coûts de trading non pris en compte.",
    "en": "Watch out for hindsight bias and trading costs left unaccounted for."
  },
  "backtestTradingMethode_31": {
    "fr": "← Psychologie du trading",
    "en": "← Trading psychology"
  },
  "backtestTradingMethode_32": {
    "fr": "Article suivant — Signaux de trading →",
    "en": "Next article — Trading signals →"
  },
  "backtestTradingMethode_33": {
    "fr": "Découvrir la méthode Wavest →",
    "en": "Discover the Wavest method →"
  },
  "backtestTradingMethode_34": {
    "fr": "\n      ⚠️ Ce contenu a une vocation uniquement éducative. Il ne constitue en aucun cas un conseil en\n      investissement. Le trading comporte des risques de perte en capital.\n    ",
    "en": "\n      ⚠️ This content is for educational purposes only. It does not constitute investment\n      advice in any way. Trading involves a risk of capital loss.\n    "
  },
  "backtestTradingMethode_35": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "backtestTradingMethode_36": {
    "fr": "Mentions légales",
    "en": "Legal notice"
  },
  "backtestTradingMethode_37": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "backtestTradingMethode_38": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "backtestTradingMethode_39": {
    "fr": "CGV",
    "en": "Terms & Conditions"
  },
  "backtestTradingMethode_40": {
    "fr": "Gérer les cookies",
    "en": "Manage cookies"
  },
  "backtestTradingMethode_41": {
    "fr": "Contact",
    "en": "Contact"
  },
  "calculateurLotForex_1": {
    "fr": "Calculateur de lot Forex : comment bien dimensionner ses positions",
    "en": "Forex lot size calculator: how to size your positions correctly"
  },
  "calculateurLotForex_2": {
    "fr": "← Accueil",
    "en": "← Home"
  },
  "calculateurLotForex_3": {
    "fr": "Pourquoi la taille de position ne se devine pas",
    "en": "Why position size isn't something to guess"
  },
  "calculateurLotForex_4": {
    "fr": "\n        Deux trades identiques en apparence peuvent avoir des risques totalement différents si la\n        taille de position n'est pas calculée précisément. Un lot mal dimensionné peut faire\n        risquer 5 fois plus que prévu sur un seul trade — sans que le trader s'en rende compte\n        avant qu'il soit trop tard.\n      ",
    "en": "\n        Two trades that look identical can carry completely different levels of risk if\n        position size isn't calculated precisely. A poorly sized lot can mean risking\n        5 times more than intended on a single trade — without the trader even\n        realizing it until it's too late.\n      "
  },
  "calculateurLotForex_5": {
    "fr": "Les trois données nécessaires",
    "en": "The three inputs you need"
  },
  "calculateurLotForex_6": {
    "fr": "Le capital du compte",
    "en": "Account capital"
  },
  "calculateurLotForex_7": {
    "fr": " — pour définir le montant en euros que représente le risque.",
    "en": " — to define the amount in euros that the risk represents."
  },
  "calculateurLotForex_8": {
    "fr": "Le pourcentage de risque accepté",
    "en": "The accepted risk percentage"
  },
  "calculateurLotForex_9": {
    "fr": " — généralement 0,5 à 2 % par trade.",
    "en": " — generally 0.5 to 2% per trade."
  },
  "calculateurLotForex_10": {
    "fr": "La distance entre l'entrée et le stop loss",
    "en": "The distance between the entry and the stop loss"
  },
  "calculateurLotForex_11": {
    "fr": " — en pips, elle détermine directement la taille de position possible pour un risque donné.",
    "en": " — in pips, it directly determines the possible position size for a given risk."
  },
  "calculateurLotForex_13": {
    "fr": "\n        Ces trois données combinées donnent la taille de position exacte — c'est ce que calcule\n        automatiquement notre\n        ",
    "en": "\n        These three inputs combined give you the exact position size — that's what our\n        "
  },
  "calculateurLotForex_12": {
    "fr": "calculateur de lot gratuit",
    "en": "free lot calculator"
  },
  "calculateurLotForex_14": {
    "fr": ", sans avoir à faire\n        le calcul à la main à chaque trade.\n      ",
    "en": " calculates automatically,\n        without having to do the math by hand for every trade.\n      "
  },
  "calculateurLotForex_15": {
    "fr": "Les erreurs fréquentes",
    "en": "Common mistakes"
  },
  "calculateurLotForex_16": {
    "fr": "Utiliser toujours la même taille de lot, peu importe la distance de stop.",
    "en": "Always using the same lot size, regardless of the stop distance."
  },
  "calculateurLotForex_17": {
    "fr": "Oublier de recalculer après une variation importante du capital.",
    "en": "Forgetting to recalculate after a significant change in capital."
  },
  "calculateurLotForex_18": {
    "fr": "Confondre taille de position et niveau de confiance dans le trade.",
    "en": "Confusing position size with confidence level in the trade."
  },
  "calculateurLotForex_19": {
    "fr": "\n        🔔 La taille de position doit varier d'un trade à l'autre — c'est normal et attendu, tant\n        que le risque en euros, lui, reste constant.\n      ",
    "en": "\n        🔔 Position size should vary from one trade to another — that's normal and expected, as\n        long as the risk in euros stays constant.\n      "
  },
  "calculateurLotForex_20": {
    "fr": "À retenir",
    "en": "Key takeaways"
  },
  "calculateurLotForex_21": {
    "fr": "La taille de position se calcule à partir du capital, du risque et du stop.",
    "en": "Position size is calculated from capital, risk, and the stop."
  },
  "calculateurLotForex_22": {
    "fr": "Un calcul systématique évite les écarts de risque involontaires.",
    "en": "A systematic calculation avoids unintended swings in risk."
  },
  "calculateurLotForex_23": {
    "fr": "Utilise un outil dédié plutôt qu'un calcul approximatif à chaque trade.",
    "en": "Use a dedicated tool rather than an approximate calculation for every trade."
  },
  "calculateurLotForex_24": {
    "fr": "← Devenir rentable",
    "en": "← Becoming profitable"
  },
  "calculateurLotForex_25": {
    "fr": "Article suivant — Checklist avant un trade →",
    "en": "Next article — Checklist before a trade →"
  },
  "calculateurLotForex_26": {
    "fr": "Découvrir la méthode Wavest →",
    "en": "Discover the Wavest method →"
  },
  "calculateurLotForex_27": {
    "fr": "\n      ⚠️ Ce contenu a une vocation uniquement éducative. Il ne constitue en aucun cas un conseil en\n      investissement. Le trading comporte des risques de perte en capital.\n    ",
    "en": "\n      ⚠️ This content is for educational purposes only. It does not constitute investment\n      advice in any way. Trading involves a risk of capital loss.\n    "
  },
  "calculateurLotForex_28": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "calculateurLotForex_29": {
    "fr": "Mentions légales",
    "en": "Legal notice"
  },
  "calculateurLotForex_30": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "calculateurLotForex_31": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "calculateurLotForex_32": {
    "fr": "CGV",
    "en": "Terms & Conditions"
  },
  "calculateurLotForex_33": {
    "fr": "Gérer les cookies",
    "en": "Manage cookies"
  },
  "calculateurLotForex_34": {
    "fr": "Contact",
    "en": "Contact"
  },
  "checklistTradingAvantTrade_1": {
    "fr": "Checklist trading : ce qu'il faut valider avant chaque trade",
    "en": "Trading checklist: what to check before every trade"
  },
  "checklistTradingAvantTrade_2": {
    "fr": "← Accueil",
    "en": "← Home"
  },
  "checklistTradingAvantTrade_3": {
    "fr": "Pourquoi une checklist avant chaque trade",
    "en": "Why a checklist before every trade"
  },
  "checklistTradingAvantTrade_4": {
    "fr": "\n        La majorité des trades impulsifs viennent d'un manque de vérification systématique. Une\n        checklist force à confirmer, à chaque fois, que le trade respecte bien la méthode —\n        au lieu de se fier à une impression du moment.\n      ",
    "en": "\n        Most impulsive trades come from a lack of systematic checking. A\n        checklist forces you to confirm, every time, that the trade actually follows the method —\n        instead of relying on a gut feeling in the moment.\n      "
  },
  "checklistTradingAvantTrade_5": {
    "fr": "Les points à vérifier avant d'entrer",
    "en": "Points to check before entering"
  },
  "checklistTradingAvantTrade_6": {
    "fr": "Contexte général",
    "en": "Overall context"
  },
  "checklistTradingAvantTrade_7": {
    "fr": " — la tendance sur les unités de temps supérieures confirme-t-elle le sens du trade ?",
    "en": " — does the trend on higher timeframes confirm the direction of the trade?"
  },
  "checklistTradingAvantTrade_8": {
    "fr": "Setup complet",
    "en": "Complete setup"
  },
  "checklistTradingAvantTrade_9": {
    "fr": " — tous les critères d'entrée définis dans la méthode sont-ils réunis, sans exception ?",
    "en": " — are all the entry criteria defined in the method met, with no exceptions?"
  },
  "checklistTradingAvantTrade_10": {
    "fr": "Risque calculé",
    "en": "Calculated risk"
  },
  "checklistTradingAvantTrade_11": {
    "fr": " — la taille de position correspond-elle bien au pourcentage de risque prévu ?",
    "en": " — does the position size actually match the intended risk percentage?"
  },
  "checklistTradingAvantTrade_12": {
    "fr": "Niveau de stop et d'objectif",
    "en": "Stop and target level"
  },
  "checklistTradingAvantTrade_13": {
    "fr": " — sont-ils fixés avant l'entrée, pas après ?",
    "en": " — are they set before entry, not after?"
  },
  "checklistTradingAvantTrade_14": {
    "fr": "État émotionnel",
    "en": "Emotional state"
  },
  "checklistTradingAvantTrade_15": {
    "fr": " — ce trade est-il pris pour de bonnes raisons, ou pour compenser une perte récente ?",
    "en": " — is this trade being taken for good reasons, or to make up for a recent loss?"
  },
  "checklistTradingAvantTrade_16": {
    "fr": "\n        🔔 Si une seule case n'est pas cochée, la règle est simple : pas de trade. C'est justement\n        ce qui protège la constance de la méthode dans la durée.\n      ",
    "en": "\n        🔔 If even one box isn't checked, the rule is simple: no trade. That's exactly\n        what protects the consistency of the method over time.\n      "
  },
  "checklistTradingAvantTrade_17": {
    "fr": "Automatiser la vérification",
    "en": "Automating the check"
  },
  "checklistTradingAvantTrade_19": {
    "fr": "\n        Tenir cette checklist mentalement fonctionne un temps, mais elle s'oublie facilement sous\n        pression. C'est pour ça que la méthode Wavest inclut un ",
    "en": "\n        Keeping this checklist in your head works for a while, but it's easy to forget under\n        pressure. That's why the Wavest method includes a "
  },
  "checklistTradingAvantTrade_18": {
    "fr": "Trade Checker",
    "en": "Trade Checker"
  },
  "checklistTradingAvantTrade_20": {
    "fr": " —\n        un outil qui structure cette validation à chaque trade, réservé aux membres de la\n        formation.\n      ",
    "en": " —\n        a tool that structures this check for every trade, available to\n        program members.\n      "
  },
  "checklistTradingAvantTrade_21": {
    "fr": "À retenir",
    "en": "Key takeaways"
  },
  "checklistTradingAvantTrade_22": {
    "fr": "Une checklist retire l'impulsivité de la prise de décision.",
    "en": "A checklist takes impulsiveness out of decision-making."
  },
  "checklistTradingAvantTrade_23": {
    "fr": "Contexte, setup, risque, stop/objectif et état émotionnel sont à vérifier systématiquement.",
    "en": "Context, setup, risk, stop/target, and emotional state should all be checked systematically."
  },
  "checklistTradingAvantTrade_24": {
    "fr": "Si un critère manque, la règle est de ne pas prendre le trade.",
    "en": "If a criterion is missing, the rule is not to take the trade."
  },
  "checklistTradingAvantTrade_25": {
    "fr": "← Calculateur de lot",
    "en": "← Lot size calculator"
  },
  "checklistTradingAvantTrade_26": {
    "fr": "Article suivant — Choisir une formation →",
    "en": "Next article — Choosing a program →"
  },
  "checklistTradingAvantTrade_27": {
    "fr": "Découvrir la méthode Wavest →",
    "en": "Discover the Wavest method →"
  },
  "checklistTradingAvantTrade_28": {
    "fr": "\n      ⚠️ Ce contenu a une vocation uniquement éducative. Il ne constitue en aucun cas un conseil en\n      investissement. Le trading comporte des risques de perte en capital.\n    ",
    "en": "\n      ⚠️ This content is for educational purposes only. It does not constitute investment\n      advice in any way. Trading involves a risk of capital loss.\n    "
  },
  "checklistTradingAvantTrade_29": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "checklistTradingAvantTrade_30": {
    "fr": "Mentions légales",
    "en": "Legal notice"
  },
  "checklistTradingAvantTrade_31": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "checklistTradingAvantTrade_32": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "checklistTradingAvantTrade_33": {
    "fr": "CGV",
    "en": "Terms & Conditions"
  },
  "checklistTradingAvantTrade_34": {
    "fr": "Gérer les cookies",
    "en": "Manage cookies"
  },
  "checklistTradingAvantTrade_35": {
    "fr": "Contact",
    "en": "Contact"
  },
  "choisirFormationTradingForex_1": {
    "fr": "Formation trading Forex : comment bien choisir",
    "en": "Forex trading program: how to choose well"
  },
  "choisirFormationTradingForex_2": {
    "fr": "← Accueil",
    "en": "← Home"
  },
  "choisirFormationTradingForex_3": {
    "fr": "Le marché des formations de trading est saturé",
    "en": "The trading program market is saturated"
  },
  "choisirFormationTradingForex_4": {
    "fr": "\n        Entre les promesses de gains rapides et les formations sérieuses, il peut être difficile\n        de faire le tri. Voici les questions concrètes à se poser avant de payer pour une\n        formation de trading Forex.\n      ",
    "en": "\n        Between promises of quick gains and serious programs, it can be hard\n        to tell them apart. Here are the concrete questions to ask before paying for a\n        Forex trading program.\n      "
  },
  "choisirFormationTradingForex_5": {
    "fr": "Les questions à se poser",
    "en": "Questions to ask yourself"
  },
  "choisirFormationTradingForex_6": {
    "fr": "La méthode est-elle expliquée, ou juste vendue ?",
    "en": "Is the method explained, or just sold?"
  },
  "choisirFormationTradingForex_7": {
    "fr": " Une formation sérieuse\n          détaille sa logique, pas seulement ses résultats.\n        ",
    "en": " A serious program\n          details its logic, not just its results.\n        "
  },
  "choisirFormationTradingForex_8": {
    "fr": "Y a-t-il des preuves vérifiables ?",
    "en": "Is there verifiable proof?"
  },
  "choisirFormationTradingForex_9": {
    "fr": " Backtests, statistiques réelles,\n          suivi transparent — plutôt que des captures d'écran isolées.\n        ",
    "en": " Backtests, real statistics,\n          transparent tracking — rather than isolated screenshots.\n        "
  },
  "choisirFormationTradingForex_10": {
    "fr": "La gestion du risque est-elle abordée en détail ?",
    "en": "Is risk management covered in detail?"
  },
  "choisirFormationTradingForex_11": {
    "fr": " Si le programme parle\n          surtout de stratégie d'entrée et très peu de money management, c'est un signal d'alerte.\n        ",
    "en": " If the program mostly talks about\n          entry strategy and very little about money management, that's a warning sign.\n        "
  },
  "choisirFormationTradingForex_12": {
    "fr": "Le discours est-il réaliste ?",
    "en": "Is the messaging realistic?"
  },
  "choisirFormationTradingForex_13": {
    "fr": " Aucune formation sérieuse ne garantit un\n          délai ou un rendement fixe.\n        ",
    "en": " No serious program guarantees a fixed\n          timeframe or return.\n        "
  },
  "choisirFormationTradingForex_14": {
    "fr": "Signaux d'alerte fréquents",
    "en": "Common warning signs"
  },
  "choisirFormationTradingForex_15": {
    "fr": "Promesses de gains garantis ou de délai fixe pour devenir rentable.",
    "en": "Promises of guaranteed gains or a fixed timeframe to become profitable."
  },
  "choisirFormationTradingForex_16": {
    "fr": "Communication centrée sur le train de vie plutôt que sur la méthode.",
    "en": "Communication focused on lifestyle rather than the method."
  },
  "choisirFormationTradingForex_17": {
    "fr": "Aucune mention des risques de perte en capital.",
    "en": "No mention of the risk of capital loss."
  },
  "choisirFormationTradingForex_18": {
    "fr": "Aucun moyen de vérifier les résultats affichés.",
    "en": "No way to verify the results being shown."
  },
  "choisirFormationTradingForex_19": {
    "fr": "\n        🔔 Une formation honnête parle autant de ses limites et des risques que de ses résultats.\n      ",
    "en": "\n        🔔 An honest program talks as much about its limits and risks as it does about its results.\n      "
  },
  "choisirFormationTradingForex_20": {
    "fr": "À retenir",
    "en": "Key takeaways"
  },
  "choisirFormationTradingForex_21": {
    "fr": "Vérifie que la méthode est expliquée, pas seulement vendue.",
    "en": "Check that the method is explained, not just sold."
  },
  "choisirFormationTradingForex_22": {
    "fr": "Cherche des preuves vérifiables et une vraie place pour le risque.",
    "en": "Look for verifiable proof and a genuine place given to risk."
  },
  "choisirFormationTradingForex_23": {
    "fr": "Méfie-toi des promesses de gains ou de délais garantis.",
    "en": "Be wary of promises of guaranteed gains or timeframes."
  },
  "choisirFormationTradingForex_24": {
    "fr": "← Checklist avant un trade",
    "en": "← Checklist before a trade"
  },
  "choisirFormationTradingForex_25": {
    "fr": "← Retour à l'accueil",
    "en": "← Back to home"
  },
  "choisirFormationTradingForex_26": {
    "fr": "Découvrir la méthode Wavest →",
    "en": "Discover the Wavest method →"
  },
  "choisirFormationTradingForex_27": {
    "fr": "\n      ⚠️ Ce contenu a une vocation uniquement éducative. Il ne constitue en aucun cas un conseil en\n      investissement. Le trading comporte des risques de perte en capital.\n    ",
    "en": "\n      ⚠️ This content is for educational purposes only. It does not constitute investment\n      advice in any way. Trading involves a risk of capital loss.\n    "
  },
  "choisirFormationTradingForex_28": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "choisirFormationTradingForex_29": {
    "fr": "Mentions légales",
    "en": "Legal notice"
  },
  "choisirFormationTradingForex_30": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "choisirFormationTradingForex_31": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "choisirFormationTradingForex_32": {
    "fr": "CGV",
    "en": "Terms & Conditions"
  },
  "choisirFormationTradingForex_33": {
    "fr": "Gérer les cookies",
    "en": "Manage cookies"
  },
  "choisirFormationTradingForex_34": {
    "fr": "Contact",
    "en": "Contact"
  },
  "devenirRentableTradingForex_1": {
    "fr": "Combien de temps pour devenir rentable en trading Forex ?",
    "en": "How long does it take to become profitable in Forex trading?"
  },
  "devenirRentableTradingForex_2": {
    "fr": "← Accueil",
    "en": "← Home"
  },
  "devenirRentableTradingForex_3": {
    "fr": "Il n'y a pas de délai universel",
    "en": "There is no universal timeframe"
  },
  "devenirRentableTradingForex_4": {
    "fr": "\n        Aucun chiffre honnête ne peut te dire \"3 mois\" ou \"1 an\" pour devenir rentable en trading.\n        Ce qui est vérifiable, en revanche, c'est que le temps nécessaire dépend directement de\n        facteurs mesurables — pas de la chance.\n      ",
    "en": "\n        No honest figure can tell you \"3 months\" or \"1 year\" to become profitable in trading.\n        What is verifiable, however, is that the time needed depends directly on\n        measurable factors — not on luck.\n      "
  },
  "devenirRentableTradingForex_5": {
    "fr": "Ce qui fait vraiment la différence",
    "en": "What actually makes the difference"
  },
  "devenirRentableTradingForex_6": {
    "fr": "Le temps réellement investi",
    "en": "Time actually invested"
  },
  "devenirRentableTradingForex_7": {
    "fr": " — apprendre en 2h par semaine prend\n          logiquement plus longtemps qu'en 2h par jour.\n        ",
    "en": " — learning 2 hours a week logically\n          takes longer than 2 hours a day.\n        "
  },
  "devenirRentableTradingForex_8": {
    "fr": "La qualité de la méthode",
    "en": "The quality of the method"
  },
  "devenirRentableTradingForex_9": {
    "fr": " — une méthode testée et cohérente accélère\n          énormément la progression comparée à un apprentissage désordonné.\n        ",
    "en": " — a tested, consistent method massively\n          speeds up progress compared to disorganized learning.\n        "
  },
  "devenirRentableTradingForex_10": {
    "fr": "La rigueur d'application",
    "en": "Discipline in applying it"
  },
  "devenirRentableTradingForex_11": {
    "fr": " — comprendre une méthode et l'appliquer avec\n          discipline sont deux choses différentes.\n        ",
    "en": " — understanding a method and applying it with\n          discipline are two different things.\n        "
  },
  "devenirRentableTradingForex_12": {
    "fr": "Le nombre de trades passés",
    "en": "The number of trades taken"
  },
  "devenirRentableTradingForex_13": {
    "fr": " — la progression vient de l'expérience\n          répétée, pas du temps qui passe seul.\n        ",
    "en": " — progress comes from repeated\n          experience, not from time passing on its own.\n        "
  },
  "devenirRentableTradingForex_14": {
    "fr": "Se méfier des promesses de délai",
    "en": "Be wary of timeframe promises"
  },
  "devenirRentableTradingForex_15": {
    "fr": "\n        Toute offre qui annonce un délai fixe et garanti pour devenir rentable (\"rentable en 30\n        jours\") ignore ces facteurs individuels. La progression réelle se mesure en statistiques\n        sur ses propres trades — taux de réussite, ratio gain/perte, respect du plan — pas en\n        semaines écoulées.\n      ",
    "en": "\n        Any offer that announces a fixed, guaranteed timeframe for becoming profitable (\"profitable in 30\n        days\") ignores these individual factors. Real progress is measured through statistics\n        on your own trades — win rate, win/loss ratio, adherence to the plan — not by the\n        number of weeks that have passed.\n      "
  },
  "devenirRentableTradingForex_16": {
    "fr": "\n        🔔 Un bon indicateur de progression : es-tu capable d'expliquer pourquoi chaque trade a\n        été pris, avant de savoir s'il est gagnant ou perdant ?\n      ",
    "en": "\n        🔔 A good sign of progress: can you explain why each trade was\n        taken, before knowing whether it wins or loses?\n      "
  },
  "devenirRentableTradingForex_17": {
    "fr": "À retenir",
    "en": "Key takeaways"
  },
  "devenirRentableTradingForex_18": {
    "fr": "Aucun délai universel n'existe pour devenir rentable en trading.",
    "en": "There is no universal timeframe for becoming profitable in trading."
  },
  "devenirRentableTradingForex_19": {
    "fr": "Temps investi, qualité de la méthode et rigueur d'application font la différence.",
    "en": "Time invested, quality of the method, and discipline in applying it make the difference."
  },
  "devenirRentableTradingForex_20": {
    "fr": "Méfie-toi de toute promesse de délai fixe et garanti.",
    "en": "Be wary of any promise of a fixed, guaranteed timeframe."
  },
  "devenirRentableTradingForex_21": {
    "fr": "← Signaux de trading",
    "en": "← Trading signals"
  },
  "devenirRentableTradingForex_22": {
    "fr": "Article suivant — Calculateur de lot →",
    "en": "Next article — Lot size calculator →"
  },
  "devenirRentableTradingForex_23": {
    "fr": "Découvrir la méthode Wavest →",
    "en": "Discover the Wavest method →"
  },
  "devenirRentableTradingForex_24": {
    "fr": "\n      ⚠️ Ce contenu a une vocation uniquement éducative. Il ne constitue en aucun cas un conseil en\n      investissement. Le trading comporte des risques de perte en capital.\n    ",
    "en": "\n      ⚠️ This content is for educational purposes only. It does not constitute investment\n      advice in any way. Trading involves a risk of capital loss.\n    "
  },
  "devenirRentableTradingForex_25": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "devenirRentableTradingForex_26": {
    "fr": "Mentions légales",
    "en": "Legal notice"
  },
  "devenirRentableTradingForex_27": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "devenirRentableTradingForex_28": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "devenirRentableTradingForex_29": {
    "fr": "CGV",
    "en": "Terms & Conditions"
  },
  "devenirRentableTradingForex_30": {
    "fr": "Gérer les cookies",
    "en": "Manage cookies"
  },
  "devenirRentableTradingForex_31": {
    "fr": "Contact",
    "en": "Contact"
  },
  "guideDebutantTradingForex_1": {
    "fr": "Apprendre le trading Forex en débutant",
    "en": "Learning Forex trading as a beginner"
  },
  "guideDebutantTradingForex_2": {
    "fr": "← Accueil",
    "en": "← Home"
  },
  "guideDebutantTradingForex_3": {
    "fr": "Par où commencer quand on débute en trading Forex ?",
    "en": "Where to start when you're new to Forex trading?"
  },
  "guideDebutantTradingForex_4": {
    "fr": "\n        Le Forex attire beaucoup de débutants, souvent après avoir vu des captures d'écran de gains\n        impressionnants sur les réseaux sociaux. Le problème, ce n'est pas d'avoir envie d'apprendre —\n        c'est de partir dans la mauvaise direction : suivre des signaux sans les comprendre, changer\n        de stratégie toutes les semaines, ou se lancer en réel avant d'avoir une méthode stable.\n      ",
    "en": "\n        Forex attracts many beginners, often after seeing screenshots of impressive gains\n        on social media. The problem isn't wanting to learn — it's\n        heading in the wrong direction: following signals without understanding them, changing\n        strategy every week, or going live before having a stable method.\n      "
  },
  "guideDebutantTradingForex_6": {
    "fr": "\n        Ce guide pose les bases pour ",
    "en": "\n        This guide lays out the basics for "
  },
  "guideDebutantTradingForex_5": {
    "fr": "apprendre le trading Forex",
    "en": "learning Forex trading"
  },
  "guideDebutantTradingForex_7": {
    "fr": " dans le bon ordre,\n        sans raccourci et sans promesse de gain rapide.\n      ",
    "en": " in the right order,\n        with no shortcuts and no promise of quick gains.\n      "
  },
  "guideDebutantTradingForex_8": {
    "fr": "Les étapes pour apprendre le trading Forex",
    "en": "Steps for learning Forex trading"
  },
  "guideDebutantTradingForex_9": {
    "fr": "1. Comprendre le marché",
    "en": "1. Understand the market"
  },
  "guideDebutantTradingForex_10": {
    "fr": " — comment fonctionnent les paires de devises,\n          les sessions (Asiatique, Européenne, Américaine) et pourquoi les horaires changent tout.\n        ",
    "en": " — how currency pairs work,\n          the sessions (Asian, European, American), and why timing changes everything.\n        "
  },
  "guideDebutantTradingForex_11": {
    "fr": "2. Apprendre à lire un graphique",
    "en": "2. Learn to read a chart"
  },
  "guideDebutantTradingForex_12": {
    "fr": " — tendance, structure de marché,\n          supports/résistances, avant même de parler de \"stratégie\".\n        ",
    "en": " — trend, market structure,\n          support/resistance, even before talking about \"strategy\".\n        "
  },
  "guideDebutantTradingForex_13": {
    "fr": "3. Poser des règles de gestion du risque",
    "en": "3. Set risk management rules"
  },
  "guideDebutantTradingForex_14": {
    "fr": " — combien risquer par trade,\n          avant de te soucier de ta stratégie d'entrée.\n        ",
    "en": " — how much to risk per trade,\n          before worrying about your entry strategy.\n        "
  },
  "guideDebutantTradingForex_15": {
    "fr": "4. Backtester avant de trader en réel",
    "en": "4. Backtest before trading live"
  },
  "guideDebutantTradingForex_16": {
    "fr": " — vérifier qu'une méthode tient\n          la route sur des centaines de trades passés, pas sur 5 trades gagnants d'affilée.\n        ",
    "en": " — check that a method holds up\n          over hundreds of past trades, not just 5 winning trades in a row.\n        "
  },
  "guideDebutantTradingForex_17": {
    "fr": "5. Travailler la discipline",
    "en": "5. Work on discipline"
  },
  "guideDebutantTradingForex_18": {
    "fr": " — la partie la plus sous-estimée, et souvent\n          celle qui fait la différence entre progresser et perdre son capital.\n        ",
    "en": " — the most underestimated part, and often\n          the one that makes the difference between progressing and losing your capital.\n        "
  },
  "guideDebutantTradingForex_19": {
    "fr": "Les erreurs les plus fréquentes des débutants",
    "en": "The most common beginner mistakes"
  },
  "guideDebutantTradingForex_20": {
    "fr": "\n        La majorité des débutants ne perdent pas de l'argent parce qu'ils manquent d'une bonne\n        stratégie — ils en perdent parce qu'ils sautent des étapes.\n      ",
    "en": "\n        Most beginners don't lose money because they lack a good\n        strategy — they lose it because they skip steps.\n      "
  },
  "guideDebutantTradingForex_21": {
    "fr": "Suivre des signaux de trading sans comprendre pourquoi le trade est pris.",
    "en": "Following trading signals without understanding why the trade is taken."
  },
  "guideDebutantTradingForex_22": {
    "fr": "Trader sans règle de risque fixe (parfois 1 % du capital, parfois 20 %).",
    "en": "Trading without a fixed risk rule (sometimes 1% of capital, sometimes 20%)."
  },
  "guideDebutantTradingForex_23": {
    "fr": "Changer de méthode après 2 ou 3 trades perdants au lieu de laisser une méthode s'exprimer sur la durée.",
    "en": "Switching methods after 2 or 3 losing trades instead of letting a method play out over time."
  },
  "guideDebutantTradingForex_24": {
    "fr": "Passer directement en compte réel sans avoir backtesté ni pratiqué sur démo.",
    "en": "Jumping straight to a live account without having backtested or practiced on a demo."
  },
  "guideDebutantTradingForex_25": {
    "fr": "\n        🔔 Une méthode rentable n'élimine pas les trades perdants — elle donne un avantage statistique\n        répété sur un grand nombre de trades, pas une martingale sans risque.\n      ",
    "en": "\n        🔔 A profitable method doesn't eliminate losing trades — it gives a statistical edge\n        repeated over a large number of trades, not a risk-free martingale.\n      "
  },
  "guideDebutantTradingForex_26": {
    "fr": "Combien de temps pour devenir rentable ?",
    "en": "How long does it take to become profitable?"
  },
  "guideDebutantTradingForex_27": {
    "fr": "\n        Il n'y a pas de chiffre universel : ça dépend du temps investi, de la rigueur avec laquelle\n        la méthode est appliquée, et de la gestion émotionnelle. Ce qui est vérifiable, en revanche :\n        les traders qui progressent le plus vite sont ceux qui appliquent une méthode structurée de\n        façon constante, plutôt que ceux qui cherchent le setup miracle.\n      ",
    "en": "\n        There's no universal figure: it depends on the time invested, how consistently\n        the method is applied, and emotional management. What is verifiable, however:\n        the traders who progress fastest are those who apply a structured method\n        consistently, rather than those searching for a miracle setup.\n      "
  },
  "guideDebutantTradingForex_28": {
    "fr": "Trois outils gratuits pour démarrer",
    "en": "Three free tools to get started"
  },
  "guideDebutantTradingForex_29": {
    "fr": "\n        Avant de trader ton premier trade, ces outils gratuits peuvent déjà t'aider à structurer\n        ta pratique :\n      ",
    "en": "\n        Before you take your first trade, these free tools can already help you structure\n        your practice:\n      "
  },
  "guideDebutantTradingForex_30": {
    "fr": "Calculateur de lot",
    "en": "Lot size calculator"
  },
  "guideDebutantTradingForex_31": {
    "fr": " — pour dimensionner\n          correctement chaque position selon ton capital et ton risque.\n        ",
    "en": " — to correctly\n          size each position based on your capital and risk.\n        "
  },
  "guideDebutantTradingForex_32": {
    "fr": "Horloge des sessions",
    "en": "Session clock"
  },
  "guideDebutantTradingForex_33": {
    "fr": " — pour visualiser\n          en direct les sessions ouvertes et les chevauchements les plus actifs.\n        ",
    "en": " — to see\n          in real time which sessions are open and the most active overlaps.\n        "
  },
  "guideDebutantTradingForex_34": {
    "fr": "Simulateur de croissance de capital",
    "en": "Capital growth simulator"
  },
  "guideDebutantTradingForex_35": {
    "fr": " —\n          pour visualiser l'impact de ton risque par trade sur l'évolution de ton capital.\n        ",
    "en": " —\n          to visualize the impact of your risk per trade on how your capital evolves.\n        "
  },
  "guideDebutantTradingForex_36": {
    "fr": "À retenir",
    "en": "Key takeaways"
  },
  "guideDebutantTradingForex_37": {
    "fr": "Apprends le marché avant la stratégie : paires, sessions, structure.",
    "en": "Learn the market before the strategy: pairs, sessions, structure."
  },
  "guideDebutantTradingForex_38": {
    "fr": "Fixe tes règles de risque avant de choisir une méthode d'entrée.",
    "en": "Set your risk rules before choosing an entry method."
  },
  "guideDebutantTradingForex_39": {
    "fr": "Backteste avant de trader en réel.",
    "en": "Backtest before trading live."
  },
  "guideDebutantTradingForex_40": {
    "fr": "La discipline compte souvent plus que la stratégie elle-même.",
    "en": "Discipline often matters more than the strategy itself."
  },
  "guideDebutantTradingForex_41": {
    "fr": "← Retour à l'accueil",
    "en": "← Back to home"
  },
  "guideDebutantTradingForex_42": {
    "fr": "\n        Article suivant — Analyse technique forex →\n      ",
    "en": "\n        Next article — Forex technical analysis →\n      "
  },
  "guideDebutantTradingForex_43": {
    "fr": "\n        Découvrir la méthode Wavest →\n      ",
    "en": "\n        Discover the Wavest method →\n      "
  },
  "guideDebutantTradingForex_44": {
    "fr": "\n      ⚠️ Ce contenu a une vocation uniquement éducative. Il ne constitue en aucun cas un conseil en\n      investissement. Le trading comporte des risques de perte en capital.\n    ",
    "en": "\n      ⚠️ This content is for educational purposes only. It does not constitute investment\n      advice in any way. Trading involves a risk of capital loss.\n    "
  },
  "guideDebutantTradingForex_45": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "guideDebutantTradingForex_46": {
    "fr": "Mentions légales",
    "en": "Legal notice"
  },
  "guideDebutantTradingForex_47": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "guideDebutantTradingForex_48": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "guideDebutantTradingForex_49": {
    "fr": "CGV",
    "en": "Terms & Conditions"
  },
  "guideDebutantTradingForex_50": {
    "fr": "Gérer les cookies",
    "en": "Manage cookies"
  },
  "guideDebutantTradingForex_51": {
    "fr": "Contact",
    "en": "Contact"
  },
  "moneyManagementForex_1": {
    "fr": "Money management Forex : combien risquer par trade ?",
    "en": "Forex money management: how much to risk per trade?"
  },
  "moneyManagementForex_2": {
    "fr": "← Accueil",
    "en": "← Home"
  },
  "moneyManagementForex_3": {
    "fr": "Pourquoi le money management compte plus que la stratégie",
    "en": "Why money management matters more than strategy"
  },
  "moneyManagementForex_5": {
    "fr": "\n        Une bonne stratégie avec une mauvaise gestion du risque finit toujours par exploser un\n        compte. Une stratégie moyenne avec un ",
    "en": "\n        A good strategy with poor risk management will always eventually blow up an\n        account. An average strategy with solid "
  },
  "moneyManagementForex_4": {
    "fr": "money management",
    "en": "money management"
  },
  "moneyManagementForex_6": {
    "fr": " solide peut\n        survivre à une mauvaise série et rester profitable sur la durée. C'est la règle qui\n        détermine si tu es encore en jeu dans 6 mois.\n      ",
    "en": " can\n        survive a losing streak and stay profitable over time. It's the rule that\n        determines whether you're still in the game in 6 months.\n      "
  },
  "moneyManagementForex_7": {
    "fr": "La règle du risque fixe par trade",
    "en": "The fixed-risk-per-trade rule"
  },
  "moneyManagementForex_9": {
    "fr": "\n        La base : ne jamais risquer plus d'un pourcentage fixe et faible de ton capital sur un\n        seul trade — généralement entre ",
    "en": "\n        The basics: never risk more than a fixed, small percentage of your capital on\n        a single trade — generally between "
  },
  "moneyManagementForex_8": {
    "fr": "0,5 % et 2 %",
    "en": "0.5% and 2%"
  },
  "moneyManagementForex_10": {
    "fr": ". Ce pourcentage se calcule\n        sur le capital réel, pas sur un montant fixe qui ne bouge jamais.\n      ",
    "en": ". This percentage is calculated\n        on your actual capital, not a fixed amount that never changes.\n      "
  },
  "moneyManagementForex_11": {
    "fr": "Exemple de risque en euros selon le pourcentage et le capital",
    "en": "Example of risk in euros by percentage and capital"
  },
  "moneyManagementForex_12": {
    "fr": "Capital",
    "en": "Capital"
  },
  "moneyManagementForex_13": {
    "fr": "Risque à 1 %",
    "en": "Risk at 1%"
  },
  "moneyManagementForex_14": {
    "fr": "Risque à 2 %",
    "en": "Risk at 2%"
  },
  "moneyManagementForex_15": {
    "fr": "\n        🔔 À 2 % de risque par trade, il faut 35 pertes consécutives pour diviser le capital par\n        deux. À 10 % de risque, il en faut seulement 7.\n      ",
    "en": "\n        🔔 At 2% risk per trade, it takes 35 consecutive losses to cut your capital in\n        half. At 10% risk, it only takes 7.\n      "
  },
  "moneyManagementForex_16": {
    "fr": "Dimensionner sa position, pas deviner",
    "en": "Sizing your position, not guessing it"
  },
  "moneyManagementForex_18": {
    "fr": "\n        Une fois le risque en euros fixé, la taille de position (le nombre de lots) se calcule à\n        partir de la distance entre le prix d'entrée et le stop loss — pas au hasard. C'est\n        exactement ce que fait notre\n        ",
    "en": "\n        Once the risk in euros is set, the position size (the number of lots) is calculated\n        from the distance between the entry price and the stop loss — not at random. That's\n        exactly what our\n        "
  },
  "moneyManagementForex_17": {
    "fr": "calculateur de lot gratuit",
    "en": "free lot calculator"
  },
  "moneyManagementForex_19": {
    "fr": " : tu rentres ton\n        capital, ton risque et ta distance de stop, il te donne la taille exacte.\n      ",
    "en": " does: you enter your\n        capital, your risk, and your stop distance, and it gives you the exact size.\n      "
  },
  "moneyManagementForex_20": {
    "fr": "Les erreurs qui cassent un compte",
    "en": "Mistakes that blow up an account"
  },
  "moneyManagementForex_21": {
    "fr": "Augmenter la taille de position après une perte pour \"se refaire\".",
    "en": "Increasing position size after a loss to \"win it back\"."
  },
  "moneyManagementForex_22": {
    "fr": "Risquer un pourcentage variable selon la \"confiance\" dans le trade.",
    "en": "Risking a variable percentage based on \"confidence\" in the trade."
  },
  "moneyManagementForex_23": {
    "fr": "Ne pas recalculer le risque quand le capital évolue.",
    "en": "Not recalculating risk as capital changes."
  },
  "moneyManagementForex_24": {
    "fr": "Cumuler plusieurs positions corrélées sans réduire le risque global.",
    "en": "Stacking several correlated positions without reducing overall risk."
  },
  "moneyManagementForex_25": {
    "fr": "Visualiser l'impact du risque sur le long terme",
    "en": "Visualizing the long-term impact of risk"
  },
  "moneyManagementForex_27": {
    "fr": "\n        Un risque de 1 % par trade et un risque de 5 % par trade peuvent partir du même taux de\n        réussite et donner des trajectoires totalement différentes sur la durée. Le\n        ",
    "en": "\n        A 1% risk per trade and a 5% risk per trade can start from the same win\n        rate and produce completely different trajectories over time. The\n        "
  },
  "moneyManagementForex_26": {
    "fr": "simulateur de croissance de capital",
    "en": "capital growth simulator"
  },
  "moneyManagementForex_28": {
    "fr": "\n        permet de visualiser concrètement cet effet avant de risquer de l'argent réel.\n      ",
    "en": "\n        lets you visualize this effect concretely before risking real money.\n      "
  },
  "moneyManagementForex_29": {
    "fr": "À retenir",
    "en": "Key takeaways"
  },
  "moneyManagementForex_30": {
    "fr": "Fixe un pourcentage de risque par trade, constant et faible (0,5-2 %).",
    "en": "Set a constant, low risk percentage per trade (0.5-2%)."
  },
  "moneyManagementForex_31": {
    "fr": "La taille de position se calcule, elle ne se devine pas.",
    "en": "Position size is calculated, not guessed."
  },
  "moneyManagementForex_32": {
    "fr": "Le money management protège le capital plus qu'il ne garantit des gains.",
    "en": "Money management protects capital more than it guarantees gains."
  },
  "moneyManagementForex_33": {
    "fr": "← Analyse technique forex",
    "en": "← Forex technical analysis"
  },
  "moneyManagementForex_34": {
    "fr": "Article suivant — Psychologie du trading →",
    "en": "Next article — Trading psychology →"
  },
  "moneyManagementForex_35": {
    "fr": "Découvrir la méthode Wavest →",
    "en": "Discover the Wavest method →"
  },
  "moneyManagementForex_36": {
    "fr": "\n      ⚠️ Ce contenu a une vocation uniquement éducative. Il ne constitue en aucun cas un conseil en\n      investissement. Le trading comporte des risques de perte en capital.\n    ",
    "en": "\n      ⚠️ This content is for educational purposes only. It does not constitute investment\n      advice in any way. Trading involves a risk of capital loss.\n    "
  },
  "moneyManagementForex_37": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "moneyManagementForex_38": {
    "fr": "Mentions légales",
    "en": "Legal notice"
  },
  "moneyManagementForex_39": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "moneyManagementForex_40": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "moneyManagementForex_41": {
    "fr": "CGV",
    "en": "Terms & Conditions"
  },
  "moneyManagementForex_42": {
    "fr": "Gérer les cookies",
    "en": "Manage cookies"
  },
  "moneyManagementForex_43": {
    "fr": "Contact",
    "en": "Contact"
  },
  "psychologieDisciplineTrading_1": {
    "fr": "Psychologie du trading : pourquoi la discipline compte plus que la stratégie",
    "en": "Trading psychology: why discipline matters more than strategy"
  },
  "psychologieDisciplineTrading_2": {
    "fr": "← Accueil",
    "en": "← Home"
  },
  "psychologieDisciplineTrading_3": {
    "fr": "La meilleure stratégie ne sert à rien sans discipline",
    "en": "The best strategy is useless without discipline"
  },
  "psychologieDisciplineTrading_4": {
    "fr": "\n        Deux traders avec exactement la même méthode obtiennent des résultats très différents.\n        La différence n'est presque jamais la stratégie — c'est la capacité à l'appliquer\n        exactement de la même façon, trade après trade, y compris après une perte.\n      ",
    "en": "\n        Two traders with exactly the same method get very different results.\n        The difference is almost never the strategy — it's the ability to apply it\n        exactly the same way, trade after trade, including after a loss.\n      "
  },
  "psychologieDisciplineTrading_5": {
    "fr": "Les biais psychologiques les plus destructeurs",
    "en": "The most destructive psychological biases"
  },
  "psychologieDisciplineTrading_6": {
    "fr": "La revanche (revenge trading)",
    "en": "Revenge trading"
  },
  "psychologieDisciplineTrading_7": {
    "fr": " — reprendre une position immédiatement\n          après une perte pour \"se refaire\", en dehors de tout plan.\n        ",
    "en": " — re-entering a position immediately\n          after a loss to \"win it back\", outside of any plan.\n        "
  },
  "psychologieDisciplineTrading_8": {
    "fr": "La peur de rater (FOMO)",
    "en": "Fear of missing out (FOMO)"
  },
  "psychologieDisciplineTrading_9": {
    "fr": " — entrer sur un mouvement déjà bien avancé, par\n          peur de manquer le trade.\n        ",
    "en": " — entering a move that's already well underway, out of\n          fear of missing the trade.\n        "
  },
  "psychologieDisciplineTrading_10": {
    "fr": "L'excès de confiance après une série gagnante",
    "en": "Overconfidence after a winning streak"
  },
  "psychologieDisciplineTrading_11": {
    "fr": " — augmenter le risque\n          parce que \"ça marche en ce moment\".\n        ",
    "en": " — increasing risk\n          because \"it's working right now\".\n        "
  },
  "psychologieDisciplineTrading_12": {
    "fr": "Le refus de couper une perte",
    "en": "Refusing to cut a loss"
  },
  "psychologieDisciplineTrading_13": {
    "fr": " — déplacer son stop loss en espérant que\n          le marché revienne.\n        ",
    "en": " — moving your stop loss and hoping\n          the market comes back.\n        "
  },
  "psychologieDisciplineTrading_14": {
    "fr": "Un plan de trading écrit change tout",
    "en": "A written trading plan changes everything"
  },
  "psychologieDisciplineTrading_15": {
    "fr": "\n        Un plan de trading écrit — conditions d'entrée, gestion du risque, conditions de sortie —\n        retire la décision émotionnelle du moment présent. La décision a été prise à froid, avant\n        d'être en position. Le trade en direct devient une simple exécution, pas un choix.\n      ",
    "en": "\n        A written trading plan — entry conditions, risk management, exit conditions —\n        removes emotional decision-making from the present moment. The decision was made calmly, before\n        being in the position. The live trade becomes simple execution, not a choice.\n      "
  },
  "psychologieDisciplineTrading_16": {
    "fr": "\n        🔔 Si une règle de ton plan te semble difficile à respecter \"à chaud\", c'est souvent le\n        signe qu'elle n'est pas assez claire ou pas assez testée en amont.\n      ",
    "en": "\n        🔔 If a rule in your plan feels hard to follow \"in the heat of the moment\", it's often a\n        sign that it isn't clear enough or hasn't been tested enough beforehand.\n      "
  },
  "psychologieDisciplineTrading_17": {
    "fr": "À retenir",
    "en": "Key takeaways"
  },
  "psychologieDisciplineTrading_18": {
    "fr": "La discipline détermine les résultats plus que la stratégie elle-même.",
    "en": "Discipline determines results more than the strategy itself."
  },
  "psychologieDisciplineTrading_19": {
    "fr": "Identifie tes biais : revanche, FOMO, excès de confiance, refus de couper.",
    "en": "Identify your biases: revenge, FOMO, overconfidence, refusing to cut losses."
  },
  "psychologieDisciplineTrading_20": {
    "fr": "Un plan écrit à froid retire la décision émotionnelle du moment du trade.",
    "en": "A plan written calmly removes emotional decision-making at the moment of the trade."
  },
  "psychologieDisciplineTrading_21": {
    "fr": "← Money management",
    "en": "← Money management"
  },
  "psychologieDisciplineTrading_22": {
    "fr": "Article suivant — Backtest en trading →",
    "en": "Next article — Backtesting in trading →"
  },
  "psychologieDisciplineTrading_23": {
    "fr": "Découvrir la méthode Wavest →",
    "en": "Discover the Wavest method →"
  },
  "psychologieDisciplineTrading_24": {
    "fr": "\n      ⚠️ Ce contenu a une vocation uniquement éducative. Il ne constitue en aucun cas un conseil en\n      investissement. Le trading comporte des risques de perte en capital.\n    ",
    "en": "\n      ⚠️ This content is for educational purposes only. It does not constitute investment\n      advice in any way. Trading involves a risk of capital loss.\n    "
  },
  "psychologieDisciplineTrading_25": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "psychologieDisciplineTrading_26": {
    "fr": "Mentions légales",
    "en": "Legal notice"
  },
  "psychologieDisciplineTrading_27": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "psychologieDisciplineTrading_28": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "psychologieDisciplineTrading_29": {
    "fr": "CGV",
    "en": "Terms & Conditions"
  },
  "psychologieDisciplineTrading_30": {
    "fr": "Gérer les cookies",
    "en": "Manage cookies"
  },
  "psychologieDisciplineTrading_31": {
    "fr": "Contact",
    "en": "Contact"
  },
  "signauxTradingForex_1": {
    "fr": "Signaux de trading Forex : pourquoi ils ne suffisent pas",
    "en": "Forex trading signals: why they're not enough"
  },
  "signauxTradingForex_2": {
    "fr": "← Accueil",
    "en": "← Home"
  },
  "signauxTradingForex_3": {
    "fr": "Le problème des signaux de trading",
    "en": "The problem with trading signals"
  },
  "signauxTradingForex_4": {
    "fr": "\n        Recevoir un signal \"achète EUR/USD maintenant\" sur Telegram ou Discord peut faire gagner\n        un trade ponctuel. Mais ça ne t'apprend rien : tu ne sais pas pourquoi le trade a été pris,\n        ni comment gérer le risque, ni quoi faire quand le signal ne vient pas. Tu restes\n        dépendant de quelqu'un d'autre.\n      ",
    "en": "\n        Getting a signal that says \"buy EUR/USD now\" on Telegram or Discord might win you\n        one trade. But it teaches you nothing: you don't know why the trade was taken,\n        how to manage the risk, or what to do when the signal doesn't come. You stay\n        dependent on someone else.\n      "
  },
  "signauxTradingForex_5": {
    "fr": "Les risques concrets",
    "en": "The real risks"
  },
  "signauxTradingForex_6": {
    "fr": "Aucune garantie sur la fiabilité ou l'expérience de la source du signal.",
    "en": "No guarantee regarding the reliability or experience of the signal source."
  },
  "signauxTradingForex_7": {
    "fr": "Impossible de savoir si le risque du signal correspond à ton propre capital.",
    "en": "No way to know if the signal's risk matches your own capital."
  },
  "signauxTradingForex_8": {
    "fr": "Aucune compétence transférable : tu ne progresses pas d'un signal à l'autre.",
    "en": "No transferable skill: you don't improve from one signal to the next."
  },
  "signauxTradingForex_9": {
    "fr": "Dépendance totale — si la source s'arrête, tu repars de zéro.",
    "en": "Total dependency — if the source stops, you're back to square one."
  },
  "signauxTradingForex_10": {
    "fr": "\n        🔔 Un signal peut parfois servir d'idée de départ, mais jamais remplacer ta propre analyse\n        et ta propre gestion du risque.\n      ",
    "en": "\n        🔔 A signal can sometimes serve as a starting idea, but it should never replace your own analysis\n        and your own risk management.\n      "
  },
  "signauxTradingForex_11": {
    "fr": "Ce qui fonctionne à la place",
    "en": "What works instead"
  },
  "signauxTradingForex_12": {
    "fr": "\n        Une méthode que tu comprends et sais appliquer toi-même : lecture du contexte de marché,\n        règles d'entrée claires, gestion du risque fixe, et un plan écrit à l'avance. C'est plus\n        lent à acquérir qu'un signal, mais ça reste avec toi, trade après trade, indépendamment\n        de qui que ce soit.\n      ",
    "en": "\n        A method you understand and can apply yourself: reading market context,\n        clear entry rules, fixed risk management, and a plan written in advance. It's\n        slower to acquire than a signal, but it stays with you, trade after trade, regardless\n        of anyone else.\n      "
  },
  "signauxTradingForex_13": {
    "fr": "À retenir",
    "en": "Key takeaways"
  },
  "signauxTradingForex_14": {
    "fr": "Un signal fait gagner un trade ; une méthode fait progresser durablement.",
    "en": "A signal wins you a trade; a method gives you lasting progress."
  },
  "signauxTradingForex_15": {
    "fr": "Les signaux ne transmettent ni compréhension ni gestion du risque.",
    "en": "Signals convey neither understanding nor risk management."
  },
  "signauxTradingForex_16": {
    "fr": "Apprendre à analyser soi-même retire la dépendance à une source externe.",
    "en": "Learning to analyze for yourself removes dependency on an external source."
  },
  "signauxTradingForex_17": {
    "fr": "← Backtest en trading",
    "en": "← Backtesting in trading"
  },
  "signauxTradingForex_18": {
    "fr": "Article suivant — Devenir rentable →",
    "en": "Next article — Becoming profitable →"
  },
  "signauxTradingForex_19": {
    "fr": "Découvrir la méthode Wavest →",
    "en": "Discover the Wavest method →"
  },
  "signauxTradingForex_20": {
    "fr": "\n      ⚠️ Ce contenu a une vocation uniquement éducative. Il ne constitue en aucun cas un conseil en\n      investissement. Le trading comporte des risques de perte en capital.\n    ",
    "en": "\n      ⚠️ This content is for educational purposes only. It does not constitute investment\n      advice in any way. Trading involves a risk of capital loss.\n    "
  },
  "signauxTradingForex_21": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "signauxTradingForex_22": {
    "fr": "Mentions légales",
    "en": "Legal notice"
  },
  "signauxTradingForex_23": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "signauxTradingForex_24": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "signauxTradingForex_25": {
    "fr": "CGV",
    "en": "Terms & Conditions"
  },
  "signauxTradingForex_26": {
    "fr": "Gérer les cookies",
    "en": "Manage cookies"
  },
  "signauxTradingForex_27": {
    "fr": "Contact",
    "en": "Contact"
  },
  "calculateurLot_1": {
    "fr": "Calculateur de lot",
    "en": "Lot calculator"
  },
  "calculateurLot_2": {
    "fr": "← Sommaire",
    "en": "← Table of contents"
  },
  "calculateurLot_3": {
    "fr": "Détermine la taille de position adaptée à ton risque, avant chaque trade.",
    "en": "Determine the position size suited to your risk, before each trade."
  },
  "calculateurLot_4": {
    "fr": "🎥 Tutoriel vidéo",
    "en": "🎥 Video tutorial"
  },
  "calculateurLot_5": {
    "fr": "\n            ↻ Réinitialiser (paire + stop)\n          ",
    "en": "\n            ↻ Reset (pair + stop)\n          "
  },
  "calculateurLot_7": {
    "fr": "Paramètres ",
    "en": "Settings "
  },
  "calculateurLot_6": {
    "fr": "· ton trade",
    "en": "· your trade"
  },
  "calculateurLot_8": {
    "fr": "Ton setup",
    "en": "Your setup"
  },
  "calculateurLot_9": {
    "fr": "Renseigne ta paire, ton solde, ton risque et ton stop.",
    "en": "Enter your pair, balance, risk, and stop."
  },
  "calculateurLot_10": {
    "fr": "Paire",
    "en": "Pair"
  },
  "calculateurLot_11": {
    "fr": "EUR/USD",
    "en": "EUR/USD"
  },
  "calculateurLot_12": {
    "fr": "EUR/USD",
    "en": "EUR/USD"
  },
  "calculateurLot_13": {
    "fr": "EUR/GBP",
    "en": "EUR/GBP"
  },
  "calculateurLot_14": {
    "fr": "EUR/AUD",
    "en": "EUR/AUD"
  },
  "calculateurLot_15": {
    "fr": "EUR/NZD",
    "en": "EUR/NZD"
  },
  "calculateurLot_16": {
    "fr": "EUR/CAD",
    "en": "EUR/CAD"
  },
  "calculateurLot_17": {
    "fr": "EUR/CHF",
    "en": "EUR/CHF"
  },
  "calculateurLot_18": {
    "fr": "EUR/JPY",
    "en": "EUR/JPY"
  },
  "calculateurLot_19": {
    "fr": "GBP/USD",
    "en": "GBP/USD"
  },
  "calculateurLot_20": {
    "fr": "GBP/AUD",
    "en": "GBP/AUD"
  },
  "calculateurLot_21": {
    "fr": "GBP/NZD",
    "en": "GBP/NZD"
  },
  "calculateurLot_22": {
    "fr": "GBP/CAD",
    "en": "GBP/CAD"
  },
  "calculateurLot_23": {
    "fr": "GBP/CHF",
    "en": "GBP/CHF"
  },
  "calculateurLot_24": {
    "fr": "GBP/JPY",
    "en": "GBP/JPY"
  },
  "calculateurLot_25": {
    "fr": "AUD/USD",
    "en": "AUD/USD"
  },
  "calculateurLot_26": {
    "fr": "AUD/NZD",
    "en": "AUD/NZD"
  },
  "calculateurLot_27": {
    "fr": "AUD/CAD",
    "en": "AUD/CAD"
  },
  "calculateurLot_28": {
    "fr": "AUD/CHF",
    "en": "AUD/CHF"
  },
  "calculateurLot_29": {
    "fr": "AUD/JPY",
    "en": "AUD/JPY"
  },
  "calculateurLot_30": {
    "fr": "NZD/USD",
    "en": "NZD/USD"
  },
  "calculateurLot_31": {
    "fr": "NZD/CAD",
    "en": "NZD/CAD"
  },
  "calculateurLot_32": {
    "fr": "NZD/CHF",
    "en": "NZD/CHF"
  },
  "calculateurLot_33": {
    "fr": "NZD/JPY",
    "en": "NZD/JPY"
  },
  "calculateurLot_34": {
    "fr": "USD/CAD",
    "en": "USD/CAD"
  },
  "calculateurLot_35": {
    "fr": "USD/CHF",
    "en": "USD/CHF"
  },
  "calculateurLot_36": {
    "fr": "USD/JPY",
    "en": "USD/JPY"
  },
  "calculateurLot_37": {
    "fr": "CAD/CHF",
    "en": "CAD/CHF"
  },
  "calculateurLot_38": {
    "fr": "CAD/JPY",
    "en": "CAD/JPY"
  },
  "calculateurLot_39": {
    "fr": "CHF/JPY",
    "en": "CHF/JPY"
  },
  "calculateurLot_40": {
    "fr": "Devise du compte",
    "en": "Account currency"
  },
  "calculateurLot_41": {
    "fr": "EUR",
    "en": "EUR"
  },
  "calculateurLot_42": {
    "fr": "USD",
    "en": "USD"
  },
  "calculateurLot_43": {
    "fr": "GBP",
    "en": "GBP"
  },
  "calculateurLot_44": {
    "fr": "CHF",
    "en": "CHF"
  },
  "calculateurLot_45": {
    "fr": "AUD",
    "en": "AUD"
  },
  "calculateurLot_46": {
    "fr": "CAD",
    "en": "CAD"
  },
  "calculateurLot_47": {
    "fr": "NZD",
    "en": "NZD"
  },
  "calculateurLot_48": {
    "fr": "JPY",
    "en": "JPY"
  },
  "calculateurLot_49": {
    "fr": "Solde du compte",
    "en": "Account balance"
  },
  "calculateurLot_50": {
    "fr": "Risque (%)",
    "en": "Risk (%)"
  },
  "calculateurLot_51": {
    "fr": "Stop de protection (en pips)",
    "en": "Protective stop (in pips)"
  },
  "calculateurLot_53": {
    "fr": "\n              ⚠️ Valeurs de pip calculées à partir de taux de change ",
    "en": "\n              ⚠️ Pip values calculated from "
  },
  "calculateurLot_52": {
    "fr": "indicatifs",
    "en": "indicative"
  },
  "calculateurLot_54": {
    "fr": ".\n              Vérifie toujours la valeur exacte du pip et la taille de lot chez ton broker avant d’exécuter un trade réel.\n            ",
    "en": " exchange rates.\n              Always check the exact pip value and lot size with your broker before executing a real trade.\n            "
  },
  "calculateurLot_55": {
    "fr": "Chargement des taux de change…",
    "en": "Loading exchange rates…"
  },
  "calculateurLot_57": {
    "fr": "Résultat ",
    "en": "Result "
  },
  "calculateurLot_56": {
    "fr": "· en direct",
    "en": "· live"
  },
  "calculateurLot_58": {
    "fr": "Taille de position",
    "en": "Position size"
  },
  "calculateurLot_59": {
    "fr": "Calcul automatique selon tes paramètres.",
    "en": "Automatically calculated from your settings."
  },
  "calculateurLot_60": {
    "fr": "\n              Renseigne tes paramètres\n            ",
    "en": "\n              Enter your settings\n            "
  },
  "calculateurLot_61": {
    "fr": "Montant risqué",
    "en": "Amount at risk"
  },
  "calculateurLot_62": {
    "fr": "Valeur du pip (1.00 lot)",
    "en": "Pip value (1.00 lot)"
  },
  "calculateurLot_63": {
    "fr": "Lot standard",
    "en": "Standard lot"
  },
  "calculateurLot_64": {
    "fr": "Équivalent mini-lots",
    "en": "Mini-lot equivalent"
  },
  "calculateurLot_65": {
    "fr": "Équivalent micro-lots",
    "en": "Micro-lot equivalent"
  },
  "calculateurLot_66": {
    "fr": "← Retour au Trade Checker",
    "en": "← Back to Trade Checker"
  },
  "calculateurLot_67": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "calculateurLot_68": {
    "fr": "Mentions légales",
    "en": "Legal notice"
  },
  "calculateurLot_69": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "calculateurLot_70": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "calculateurLot_71": {
    "fr": "CGV",
    "en": "T&Cs"
  },
  "calculateurLot_72": {
    "fr": "Gérer les cookies",
    "en": "Manage cookies"
  },
  "calculateurLot_73": {
    "fr": "Contact",
    "en": "Contact"
  },
  "dashboard_1": {
    "fr": "Dashboard de progression",
    "en": "Progress dashboard"
  },
  "dashboard_2": {
    "fr": "← Sommaire",
    "en": "← Table of contents"
  },
  "dashboard_3": {
    "fr": "Connecte ton Google Sheet et visualise tes résultats en calendrier, courbe d'équité et statistiques.",
    "en": "Connect your Google Sheet and visualize your results in a calendar, equity curve, and statistics."
  },
  "dashboard_4": {
    "fr": "🎥 Tutoriel vidéo",
    "en": "🎥 Video tutorial"
  },
  "dashboard_6": {
    "fr": "Connexion ",
    "en": "Connection "
  },
  "dashboard_5": {
    "fr": "· ton Sheet",
    "en": "· your Sheet"
  },
  "dashboard_7": {
    "fr": "Connecte ton Google Sheet",
    "en": "Connect your Google Sheet"
  },
  "dashboard_8": {
    "fr": "Publie ton onglet de suivi en CSV (Fichier → Partager → Publier sur le web), puis colle le lien ici.",
    "en": "Publish your tracking sheet as CSV (File → Share → Publish to web), then paste the link here."
  },
  "dashboard_9": {
    "fr": "Connecter",
    "en": "Connect"
  },
  "dashboard_13": {
    "fr": "\n            Ton onglet doit contenir au minimum des colonnes ",
    "en": "\n            Your sheet must contain at least the columns "
  },
  "dashboard_10": {
    "fr": "Pair",
    "en": "Pair"
  },
  "dashboard_11": {
    "fr": "Date",
    "en": "Date"
  },
  "dashboard_14": {
    "fr": " et ",
    "en": " and "
  },
  "dashboard_12": {
    "fr": "P&L",
    "en": "P&L"
  },
  "dashboard_15": {
    "fr": " (en %).\n            Le lien reste enregistré uniquement dans ton navigateur — il n'est jamais envoyé ailleurs.\n          ",
    "en": " (in %).\n            The link is stored only in your browser — it is never sent anywhere else.\n          "
  },
  "dashboard_16": {
    "fr": "Changer de Sheet",
    "en": "Change Sheet"
  },
  "dashboard_17": {
    "fr": "Trades",
    "en": "Trades"
  },
  "dashboard_18": {
    "fr": "Winrate",
    "en": "Winrate"
  },
  "dashboard_19": {
    "fr": "P&L total",
    "en": "Total P&L"
  },
  "dashboard_20": {
    "fr": "Meilleur jour",
    "en": "Best day"
  },
  "dashboard_21": {
    "fr": "Pire jour",
    "en": "Worst day"
  },
  "dashboard_22": {
    "fr": "Gain moyen",
    "en": "Average gain"
  },
  "dashboard_23": {
    "fr": "Perte moyenne",
    "en": "Average loss"
  },
  "dashboard_24": {
    "fr": "Profit factor",
    "en": "Profit factor"
  },
  "dashboard_25": {
    "fr": "← Préc.",
    "en": "← Prev."
  },
  "dashboard_26": {
    "fr": "Aujourd'hui",
    "en": "Today"
  },
  "dashboard_27": {
    "fr": "Suiv. →",
    "en": "Next →"
  },
  "dashboard_28": {
    "fr": "Lun",
    "en": "Mon"
  },
  "dashboard_29": {
    "fr": "Mar",
    "en": "Tue"
  },
  "dashboard_30": {
    "fr": "Mer",
    "en": "Wed"
  },
  "dashboard_31": {
    "fr": "Jeu",
    "en": "Thu"
  },
  "dashboard_32": {
    "fr": "Ven",
    "en": "Fri"
  },
  "dashboard_33": {
    "fr": "Sam",
    "en": "Sat"
  },
  "dashboard_34": {
    "fr": "Dim",
    "en": "Sun"
  },
  "dashboard_36": {
    "fr": "Progression ",
    "en": "Progress "
  },
  "dashboard_35": {
    "fr": "· cumulée",
    "en": "· cumulative"
  },
  "dashboard_37": {
    "fr": "Courbe d'équité",
    "en": "Equity curve"
  },
  "dashboard_38": {
    "fr": "Somme cumulée de ton P&L (%) trade après trade.",
    "en": "Cumulative sum of your P&L (%) trade after trade."
  },
  "dashboard_39": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "dashboard_40": {
    "fr": "Mentions légales",
    "en": "Legal notice"
  },
  "dashboard_41": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "dashboard_42": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "dashboard_43": {
    "fr": "CGV",
    "en": "T&Cs"
  },
  "dashboard_44": {
    "fr": "Gérer les cookies",
    "en": "Manage cookies"
  },
  "dashboard_45": {
    "fr": "Contact",
    "en": "Contact"
  },
  "fondation_1": {
    "fr": "Chapitre 1 — Fondation",
    "en": "Chapter 1 — Foundation"
  },
  "fondation_2": {
    "fr": "← Sommaire",
    "en": "← Table of Contents"
  },
  "fondation_3": {
    "fr": "Qu’est-ce que le Forex ?",
    "en": "What is Forex?"
  },
  "fondation_6": {
    "fr": "\n        Le ",
    "en": "\n        The "
  },
  "fondation_4": {
    "fr": "Forex",
    "en": "Forex"
  },
  "fondation_7": {
    "fr": " (Foreign Exchange, ou marché des changes) est le plus grand marché\n        financier au monde. Chaque jour, plus de ",
    "en": " (Foreign Exchange market) is the largest\n        financial market in the world. Every day, more than "
  },
  "fondation_5": {
    "fr": "6 000 milliards $",
    "en": "$6 trillion"
  },
  "fondation_8": {
    "fr": " sont échangés\n        entre banques, entreprises, investisseurs et particuliers.\n      ",
    "en": " is traded\n        between banks, companies, investors, and individuals.\n      "
  },
  "fondation_10": {
    "fr": "Les paires de devises",
    "en": "Currency Pairs"
  },
  "fondation_14": {
    "fr": "\n        Les devises s’échangent toujours par ",
    "en": "\n        Currencies always trade in "
  },
  "fondation_11": {
    "fr": "paires",
    "en": "pairs"
  },
  "fondation_15": {
    "fr": ". La première est la\n        ",
    "en": ". The first is the\n        "
  },
  "fondation_12": {
    "fr": "devise de base",
    "en": "base currency"
  },
  "fondation_16": {
    "fr": ", la seconde la ",
    "en": ", the second the "
  },
  "fondation_13": {
    "fr": "devise de cotation",
    "en": "quote currency"
  },
  "fondation_17": {
    "fr": "Paires majeures",
    "en": "Major pairs"
  },
  "fondation_19": {
    "fr": " — incluent l’USD (~80 % des échanges).",
    "en": " — include the USD (~80% of trades)."
  },
  "fondation_18": {
    "fr": "Exemples : EUR/USD, GBP/USD, USD/JPY, USD/CHF.",
    "en": "Examples: EUR/USD, GBP/USD, USD/JPY, USD/CHF."
  },
  "fondation_20": {
    "fr": "Paires mineures",
    "en": "Minor pairs"
  },
  "fondation_22": {
    "fr": " — sans USD mais liquides.",
    "en": " — without USD but liquid."
  },
  "fondation_21": {
    "fr": "Exemples : EUR/GBP, EUR/JPY, GBP/JPY.",
    "en": "Examples: EUR/GBP, EUR/JPY, GBP/JPY."
  },
  "fondation_23": {
    "fr": "Paires exotiques",
    "en": "Exotic pairs"
  },
  "fondation_25": {
    "fr": " — une devise majeure + une devise émergente.",
    "en": " — a major currency + an emerging market currency."
  },
  "fondation_24": {
    "fr": "Exemples : USD/TRY, EUR/ZAR.",
    "en": "Examples: USD/TRY, EUR/ZAR."
  },
  "fondation_26": {
    "fr": "Horaires du marché",
    "en": "Market Hours"
  },
  "fondation_28": {
    "fr": "\n        Le Forex est ouvert ",
    "en": "\n        Forex is open "
  },
  "fondation_27": {
    "fr": "24h/24, 5 j/7",
    "en": "24 hours a day, 5 days a week"
  },
  "fondation_29": {
    "fr": " : du dimanche soir (≈ 23h, heure de Paris)\n        au vendredi soir (≈ 23h).\n      ",
    "en": ": from Sunday evening (≈ 11pm, Paris time)\n        to Friday evening (≈ 11pm).\n      "
  },
  "fondation_30": {
    "fr": "Horaires des sessions du marché Forex en heure de Paris",
    "en": "Forex market session hours in Paris time"
  },
  "fondation_31": {
    "fr": "Session",
    "en": "Session"
  },
  "fondation_32": {
    "fr": "Heures (Paris)",
    "en": "Hours (Paris)"
  },
  "fondation_33": {
    "fr": "Centres",
    "en": "Centers"
  },
  "fondation_34": {
    "fr": "Asiatique",
    "en": "Asian"
  },
  "fondation_35": {
    "fr": "23h – 8h",
    "en": "11pm – 8am"
  },
  "fondation_36": {
    "fr": "Tokyo, Sydney",
    "en": "Tokyo, Sydney"
  },
  "fondation_37": {
    "fr": "Européenne",
    "en": "European"
  },
  "fondation_38": {
    "fr": "8h – 17h",
    "en": "8am – 5pm"
  },
  "fondation_39": {
    "fr": "Londres, Francfort",
    "en": "London, Frankfurt"
  },
  "fondation_40": {
    "fr": "Américaine",
    "en": "American"
  },
  "fondation_41": {
    "fr": "14h – 23h",
    "en": "2pm – 11pm"
  },
  "fondation_42": {
    "fr": "New York, Chicago",
    "en": "New York, Chicago"
  },
  "fondation_45": {
    "fr": "\n        🔔 Moments souvent les plus actifs : ",
    "en": "\n        🔔 Often the most active moments: "
  },
  "fondation_43": {
    "fr": "8h–11h",
    "en": "8am–11am"
  },
  "fondation_46": {
    "fr": " (Asie→Europe) et surtout\n        ",
    "en": " (Asia→Europe) and especially\n        "
  },
  "fondation_44": {
    "fr": "14h–17h",
    "en": "2pm–5pm"
  },
  "fondation_47": {
    "fr": " (Europe→US).\n      ",
    "en": " (Europe→US).\n      "
  },
  "fondation_48": {
    "fr": "À retenir",
    "en": "To Remember"
  },
  "fondation_49": {
    "fr": "Un marché géant et liquide, né après 1971.",
    "en": "A huge, liquid market, born after 1971."
  },
  "fondation_51": {
    "fr": "Les paires = ",
    "en": "Pairs = "
  },
  "fondation_50": {
    "fr": "base/cotation",
    "en": "base/quote"
  },
  "fondation_52": {
    "fr": " (ex. EUR/USD).",
    "en": " (e.g. EUR/USD)."
  },
  "fondation_53": {
    "fr": "Catégories : majeures, mineures, exotiques.",
    "en": "Categories: majors, minors, exotics."
  },
  "fondation_54": {
    "fr": "Trois sessions (Asie, Europe, US) & chevauchements clés.",
    "en": "Three sessions (Asia, Europe, US) & key overlaps."
  },
  "fondation_55": {
    "fr": "← Retour aux chapitres",
    "en": "← Back to chapters"
  },
  "fondation_56": {
    "fr": "Chapitre suivant — Configuration TradingView →",
    "en": "Next chapter — TradingView Setup →"
  },
  "fondation_57": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "fondation_58": {
    "fr": "Mentions légales",
    "en": "Legal Notice"
  },
  "fondation_59": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "fondation_60": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "fondation_61": {
    "fr": "CGV",
    "en": "Terms of Sale"
  },
  "fondation_62": {
    "fr": "Gérer les cookies",
    "en": "Manage Cookies"
  },
  "fondation_63": {
    "fr": "Contact",
    "en": "Contact"
  },
  "fondation_9": {
    "fr": "\n        Le marché moderne est né après <strong>1971</strong> (fin de Bretton Woods) : les devises\n        flottent librement et leur valeur est déterminée par l’offre et la demande.\n      ",
    "en": "\n        The modern market was born after <strong>1971</strong> (end of Bretton Woods): currencies\n        float freely and their value is determined by supply and demand.\n      "
  },
  "horlogeSessions_1": {
    "fr": "Horloge des sessions",
    "en": "Session clock"
  },
  "horlogeSessions_2": {
    "fr": "← Sommaire",
    "en": "← Table of contents"
  },
  "horlogeSessions_3": {
    "fr": "Visualise en direct quelle session est ouverte, et repère les chevauchements les plus actifs.",
    "en": "See live which session is open, and spot the most active overlaps."
  },
  "horlogeSessions_4": {
    "fr": "🎥 Tutoriel vidéo",
    "en": "🎥 Video tutorial"
  },
  "horlogeSessions_5": {
    "fr": "Chargement…",
    "en": "Loading…"
  },
  "horlogeSessions_6": {
    "fr": "Heure de Paris",
    "en": "Paris time"
  },
  "horlogeSessions_7": {
    "fr": "Ton heure locale",
    "en": "Your local time"
  },
  "horlogeSessions_8": {
    "fr": "0h",
    "en": "0h"
  },
  "horlogeSessions_9": {
    "fr": "6h",
    "en": "6h"
  },
  "horlogeSessions_10": {
    "fr": "12h",
    "en": "12h"
  },
  "horlogeSessions_11": {
    "fr": "18h",
    "en": "18h"
  },
  "horlogeSessions_12": {
    "fr": "24h",
    "en": "24h"
  },
  "horlogeSessions_13": {
    "fr": "Asiatique",
    "en": "Asian"
  },
  "horlogeSessions_14": {
    "fr": "Européenne",
    "en": "European"
  },
  "horlogeSessions_15": {
    "fr": "Américaine",
    "en": "American"
  },
  "horlogeSessions_16": {
    "fr": " Asiatique — Tokyo, Sydney (23h–8h)",
    "en": " Asian — Tokyo, Sydney (11pm–8am)"
  },
  "horlogeSessions_17": {
    "fr": " Européenne — Londres, Francfort (8h–17h)",
    "en": " European — London, Frankfurt (8am–5pm)"
  },
  "horlogeSessions_18": {
    "fr": " Américaine — New York, Chicago (14h–23h)",
    "en": " American — New York, Chicago (2pm–11pm)"
  },
  "horlogeSessions_19": {
    "fr": "\n          🔔 Moments les plus actifs : 8h–11h (Asie→Europe) et surtout 14h–17h (chevauchement Europe/US).\n          Toutes les heures sont données en heure de Paris.\n        ",
    "en": "\n          🔔 Most active moments: 8am–11am (Asia→Europe) and especially 2pm–5pm (Europe/US overlap).\n          All times are given in Paris time.\n        "
  },
  "horlogeSessions_20": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "horlogeSessions_21": {
    "fr": "Mentions légales",
    "en": "Legal notice"
  },
  "horlogeSessions_22": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "horlogeSessions_23": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "horlogeSessions_24": {
    "fr": "CGV",
    "en": "T&Cs"
  },
  "horlogeSessions_25": {
    "fr": "Gérer les cookies",
    "en": "Manage cookies"
  },
  "horlogeSessions_26": {
    "fr": "Contact",
    "en": "Contact"
  },
  "moneyManagement_1": {
    "fr": "Chapitre 4 — Money Management",
    "en": "Chapter 4 — Money Management"
  },
  "moneyManagement_2": {
    "fr": "← Sommaire",
    "en": "← Table of Contents"
  },
  "moneyManagement_3": {
    "fr": "Vidéo — Money Management",
    "en": "Video — Money Management"
  },
  "moneyManagement_4": {
    "fr": "Explication du cadre, des TP et de la protection par paliers",
    "en": "Explanation of the framework, take-profits, and step-wise protection"
  },
  "moneyManagement_5": {
    "fr": "\n            Votre navigateur ne supporte pas la vidéo HTML5.\n          ",
    "en": "\n            Your browser does not support HTML5 video.\n          "
  },
  "moneyManagement_7": {
    "fr": "\n          Synthèse : logique des TP (",
    "en": "\n          Summary: TP logic ("
  },
  "moneyManagement_8": {
    "fr": " 4H & Daily), et gestion ",
    "en": " 4H & Daily), and "
  },
  "moneyManagement_6": {
    "fr": "avec paliers de 1%",
    "en": "1% step management"
  },
  "moneyManagement_9": {
    "fr": " pour sécuriser le trade.\n        ",
    "en": " to secure the trade.\n        "
  },
  "moneyManagement_10": {
    "fr": "Règles de Money Management",
    "en": "Money Management Rules"
  },
  "moneyManagement_11": {
    "fr": "Cadre clair, reproductible, sans exception",
    "en": "A clear, repeatable framework, no exceptions"
  },
  "moneyManagement_12": {
    "fr": "\n        Avec palier\n      ",
    "en": "\n        With Steps\n      "
  },
  "moneyManagement_13": {
    "fr": "\n        Sans palier\n      ",
    "en": "\n        Without Steps\n      "
  },
  "moneyManagement_14": {
    "fr": "Pattern 4H",
    "en": "4H Pattern"
  },
  "moneyManagement_15": {
    "fr": "TP1 4H — 1/3",
    "en": "TP1 4H — 1/3"
  },
  "moneyManagement_17": {
    "fr": "Clôture au ",
    "en": "Close at "
  },
  "moneyManagement_16": {
    "fr": "−0.27 Fibo 4H",
    "en": "−0.27 4H Fibo"
  },
  "moneyManagement_18": {
    "fr": "TP2 Daily — 2/3",
    "en": "TP2 Daily — 2/3"
  },
  "moneyManagement_20": {
    "fr": "Clôture au ",
    "en": "Close at "
  },
  "moneyManagement_19": {
    "fr": "−0.27 Fibo Daily",
    "en": "−0.27 Daily Fibo"
  },
  "moneyManagement_21": {
    "fr": "Palier 1%",
    "en": "1% Step"
  },
  "moneyManagement_23": {
    "fr": "À chaque ",
    "en": "At each "
  },
  "moneyManagement_24": {
    "fr": ", remonter le ",
    "en": ", move the "
  },
  "moneyManagement_22": {
    "fr": "SL d’un palier",
    "en": "SL up one step"
  },
  "moneyManagement_25": {
    "fr": " pour verrouiller le gain.",
    "en": " to lock in gains."
  },
  "moneyManagement_26": {
    "fr": "Fibonacci inversé",
    "en": "Reversed Fibonacci"
  },
  "moneyManagement_27": {
    "fr": "TP1 4H — 1/3",
    "en": "TP1 4H — 1/3"
  },
  "moneyManagement_29": {
    "fr": "Clôture au ",
    "en": "Close at "
  },
  "moneyManagement_28": {
    "fr": "0.618 Fibo 4H",
    "en": "0.618 4H Fibo"
  },
  "moneyManagement_30": {
    "fr": "TP2 Daily — 2/3",
    "en": "TP2 Daily — 2/3"
  },
  "moneyManagement_32": {
    "fr": "Clôture au ",
    "en": "Close at "
  },
  "moneyManagement_31": {
    "fr": "−0.27 Fibo Daily",
    "en": "−0.27 Daily Fibo"
  },
  "moneyManagement_33": {
    "fr": "Palier 1%",
    "en": "1% Step"
  },
  "moneyManagement_35": {
    "fr": "À chaque ",
    "en": "At each "
  },
  "moneyManagement_36": {
    "fr": ", remonter le ",
    "en": ", move the "
  },
  "moneyManagement_34": {
    "fr": "SL d’un palier",
    "en": "SL up one step"
  },
  "moneyManagement_37": {
    "fr": " pour verrouiller le gain.",
    "en": " to lock in gains."
  },
  "moneyManagement_38": {
    "fr": "Ralentissement",
    "en": "Deceleration"
  },
  "moneyManagement_39": {
    "fr": "TP1 4H — 1/3",
    "en": "TP1 4H — 1/3"
  },
  "moneyManagement_41": {
    "fr": "Clôture au ",
    "en": "Close at "
  },
  "moneyManagement_40": {
    "fr": "0 Fibo Daily",
    "en": "0 Daily Fibo"
  },
  "moneyManagement_42": {
    "fr": "TP2 Daily — 2/3",
    "en": "TP2 Daily — 2/3"
  },
  "moneyManagement_44": {
    "fr": "Clôture au ",
    "en": "Close at "
  },
  "moneyManagement_43": {
    "fr": "−0.27 Fibo Daily",
    "en": "−0.27 Daily Fibo"
  },
  "moneyManagement_45": {
    "fr": "Palier 1%",
    "en": "1% Step"
  },
  "moneyManagement_47": {
    "fr": "À chaque ",
    "en": "At each "
  },
  "moneyManagement_48": {
    "fr": ", remonter le ",
    "en": ", move the "
  },
  "moneyManagement_46": {
    "fr": "SL d’un palier",
    "en": "SL up one step"
  },
  "moneyManagement_49": {
    "fr": " pour verrouiller le gain.",
    "en": " to lock in gains."
  },
  "moneyManagement_50": {
    "fr": "Pattern 4H",
    "en": "4H Pattern"
  },
  "moneyManagement_51": {
    "fr": "TP1 4H — 1/3",
    "en": "TP1 4H — 1/3"
  },
  "moneyManagement_53": {
    "fr": "Clôture au ",
    "en": "Close at "
  },
  "moneyManagement_52": {
    "fr": "−0.27 Fibo 4H",
    "en": "−0.27 4H Fibo"
  },
  "moneyManagement_54": {
    "fr": "TP2 Daily — 2/3",
    "en": "TP2 Daily — 2/3"
  },
  "moneyManagement_56": {
    "fr": "Clôture au ",
    "en": "Close at "
  },
  "moneyManagement_55": {
    "fr": "−0.27 Fibo Daily",
    "en": "−0.27 Daily Fibo"
  },
  "moneyManagement_57": {
    "fr": "Fibonacci inversé",
    "en": "Reversed Fibonacci"
  },
  "moneyManagement_58": {
    "fr": "TP1 4H — 1/3",
    "en": "TP1 4H — 1/3"
  },
  "moneyManagement_60": {
    "fr": "Clôture au ",
    "en": "Close at "
  },
  "moneyManagement_59": {
    "fr": "0.618 Fibo 4H",
    "en": "0.618 4H Fibo"
  },
  "moneyManagement_61": {
    "fr": "TP2 Daily — 2/3",
    "en": "TP2 Daily — 2/3"
  },
  "moneyManagement_63": {
    "fr": "Clôture au ",
    "en": "Close at "
  },
  "moneyManagement_62": {
    "fr": "−0.27 Fibo Daily",
    "en": "−0.27 Daily Fibo"
  },
  "moneyManagement_64": {
    "fr": "Ralentissement",
    "en": "Deceleration"
  },
  "moneyManagement_65": {
    "fr": "TP1 4H — 1/3",
    "en": "TP1 4H — 1/3"
  },
  "moneyManagement_67": {
    "fr": "Clôture au ",
    "en": "Close at "
  },
  "moneyManagement_66": {
    "fr": "0 Fibo Daily",
    "en": "0 Daily Fibo"
  },
  "moneyManagement_68": {
    "fr": "TP2 Daily — 2/3",
    "en": "TP2 Daily — 2/3"
  },
  "moneyManagement_70": {
    "fr": "Clôture au ",
    "en": "Close at "
  },
  "moneyManagement_69": {
    "fr": "−0.27 Fibo Daily",
    "en": "−0.27 Daily Fibo"
  },
  "moneyManagement_73": {
    "fr": "Toujours ",
    "en": "Always "
  },
  "moneyManagement_72": {
    "fr": "SL = 1%",
    "en": "SL = 1%"
  },
  "moneyManagement_74": {
    "fr": " du capital.",
    "en": " of capital."
  },
  "moneyManagement_75": {
    "fr": "Mettre le SL au PE",
    "en": "Move the SL to entry"
  },
  "moneyManagement_76": {
    "fr": " dès que la position est ",
    "en": " as soon as the position is "
  },
  "moneyManagement_77": {
    "fr": "Avantages & Inconvénients — Avec palier",
    "en": "Pros & Cons — With Steps"
  },
  "moneyManagement_78": {
    "fr": "Synthèse rapide du cadre à paliers",
    "en": "Quick summary of the step-based framework"
  },
  "moneyManagement_79": {
    "fr": "Avantages",
    "en": "Pros"
  },
  "moneyManagement_80": {
    "fr": "Inconvénients",
    "en": "Cons"
  },
  "moneyManagement_81": {
    "fr": "Sécurise vite les gains, réduit le stress.",
    "en": "Secures gains quickly, reduces stress."
  },
  "moneyManagement_82": {
    "fr": "Peut sortir trop tôt sur forte tendance.",
    "en": "May exit too early during a strong trend."
  },
  "moneyManagement_83": {
    "fr": "Limite l’impact d’un retournement brutal.",
    "en": "Limits the impact of a sharp reversal."
  },
  "moneyManagement_84": {
    "fr": "Demande des ajustements plus fréquents.",
    "en": "Requires more frequent adjustments."
  },
  "moneyManagement_85": {
    "fr": "Discipline mécanique, reproductible.",
    "en": "Mechanical, repeatable discipline."
  },
  "moneyManagement_86": {
    "fr": "Peut rogner la perf si le prix « bruite ».",
    "en": "May cut into performance if price is noisy."
  },
  "moneyManagement_87": {
    "fr": "← Chapitre précédent — Analyse technique",
    "en": "← Previous chapter — Technical Analysis"
  },
  "moneyManagement_88": {
    "fr": "Chapitre suivant — Setup →",
    "en": "Next chapter — Setup →"
  },
  "moneyManagement_89": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "moneyManagement_90": {
    "fr": "Mentions légales",
    "en": "Legal Notice"
  },
  "moneyManagement_91": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "moneyManagement_92": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "moneyManagement_93": {
    "fr": "CGV",
    "en": "Terms of Sale"
  },
  "moneyManagement_94": {
    "fr": "Gérer les cookies",
    "en": "Manage Cookies"
  },
  "moneyManagement_95": {
    "fr": "Contact",
    "en": "Contact"
  },
  "moneyManagement_71": {
    "fr": "📌 À retenir — Règles globales <span aria-hidden=\"true\" class=\"dot\"></span>",
    "en": "📌 To Remember — General Rules <span aria-hidden=\"true\" class=\"dot\"></span>"
  },
  "performancePatterns_1": {
    "fr": "Performance des patterns",
    "en": "Pattern performance"
  },
  "performancePatterns_2": {
    "fr": "← Sommaire",
    "en": "← Table of contents"
  },
  "performancePatterns_3": {
    "fr": "Pour chaque pattern daily que tu identifies sur ton graphique, voici la combinaison de contexte qui a historiquement le mieux fonctionné sur mon backtest — pas besoin de chercher, la meilleure combo s'affiche directement.",
    "en": "For each daily pattern you spot on your chart, here's the context combo that has historically worked best in my backtest — no digging required, the best combo shows up right away."
  },
  "performancePatterns_5": {
    "fr": "Meilleur pattern ",
    "en": "Best pattern "
  },
  "performancePatterns_4": {
    "fr": "· global",
    "en": "· overall"
  },
  "performancePatterns_7": {
    "fr": "Meilleure paire ",
    "en": "Best pair "
  },
  "performancePatterns_6": {
    "fr": "· global",
    "en": "· overall"
  },
  "performancePatterns_9": {
    "fr": "Classement ",
    "en": "Ranking "
  },
  "performancePatterns_8": {
    "fr": "· par paire",
    "en": "· by pair"
  },
  "performancePatterns_10": {
    "fr": "Meilleur pattern par paire",
    "en": "Best pattern by pair"
  },
  "performancePatterns_11": {
    "fr": "Le pattern le plus performant pour chaque paire, sur l'échantillon backtesté.",
    "en": "The best-performing pattern for each pair, on the backtested sample."
  },
  "performancePatterns_12": {
    "fr": "Trier par",
    "en": "Sort by"
  },
  "performancePatterns_13": {
    "fr": "Meilleur score",
    "en": "Best score"
  },
  "performancePatterns_14": {
    "fr": "Total paire",
    "en": "Pair total"
  },
  "performancePatterns_15": {
    "fr": "Paire (A-Z)",
    "en": "Pair (A-Z)"
  },
  "performancePatterns_16": {
    "fr": "Paire",
    "en": "Pair"
  },
  "performancePatterns_17": {
    "fr": "Meilleur pattern",
    "en": "Best pattern"
  },
  "performancePatterns_18": {
    "fr": "Score",
    "en": "Score"
  },
  "performancePatterns_19": {
    "fr": "Total paire",
    "en": "Pair total"
  },
  "performancePatterns_21": {
    "fr": "Détail ",
    "en": "Detail "
  },
  "performancePatterns_20": {
    "fr": "· heatmap complète",
    "en": "· full heatmap"
  },
  "performancePatterns_22": {
    "fr": "Toutes les paires × tous les patterns",
    "en": "All pairs × all patterns"
  },
  "performancePatterns_23": {
    "fr": "La cellule encadrée indique le meilleur pattern de chaque ligne.",
    "en": "The highlighted cell shows the best pattern in each row."
  },
  "performancePatterns_24": {
    "fr": "⚠️ Données issues d'un backtest interne à but pédagogique, mises à jour manuellement. Les performances passées ne préjugent pas des performances futures. Le trading comporte des risques de perte en capital.",
    "en": "⚠️ Data from an internal, manually updated backtest for educational purposes. Past performance does not guarantee future results. Trading involves risk of capital loss."
  },
  "performancePatterns_25": {
    "fr": "← Trade Checker",
    "en": "← Trade Checker"
  },
  "performancePatterns_26": {
    "fr": "Dashboard de progression →",
    "en": "Progress dashboard →"
  },
  "performancePatterns_27": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "performancePatterns_28": {
    "fr": "Mentions légales",
    "en": "Legal notice"
  },
  "performancePatterns_29": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "performancePatterns_30": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "performancePatterns_31": {
    "fr": "CGV",
    "en": "T&Cs"
  },
  "performancePatterns_32": {
    "fr": "Gérer les cookies",
    "en": "Manage cookies"
  },
  "performancePatterns_33": {
    "fr": "Contact",
    "en": "Contact"
  },
  "psychologieDiscipline_1": {
    "fr": "Chapitre 6 — Psychologie & Discipline",
    "en": "Chapter 6 — Psychology & Discipline"
  },
  "psychologieDiscipline_2": {
    "fr": "← Sommaire",
    "en": "← Table of Contents"
  },
  "psychologieDiscipline_3": {
    "fr": "\n          Sous Chapitres\n          ",
    "en": "\n          Sub-chapters\n          "
  },
  "psychologieDiscipline_4": {
    "fr": "« La psychologie, c’est ce qui sépare ceux qui survivent de ceux qui performent. »",
    "en": "\"Psychology is what separates those who survive from those who perform.\""
  },
  "psychologieDiscipline_5": {
    "fr": "🧠 Émotions",
    "en": "🧠 Emotions"
  },
  "psychologieDiscipline_6": {
    "fr": "🎯 Discipline",
    "en": "🎯 Discipline"
  },
  "psychologieDiscipline_7": {
    "fr": "⏰ Routine mentale",
    "en": "⏰ Mental Routine"
  },
  "psychologieDiscipline_8": {
    "fr": "💪 Résilience",
    "en": "💪 Resilience"
  },
  "psychologieDiscipline_9": {
    "fr": "⚠️ Erreurs fréquentes",
    "en": "⚠️ Common Mistakes"
  },
  "psychologieDiscipline_10": {
    "fr": "👑 Mental de pro",
    "en": "👑 Pro Mindset"
  },
  "psychologieDiscipline_11": {
    "fr": "Routine",
    "en": "Routine"
  },
  "psychologieDiscipline_13": {
    "fr": "🧠 Émotions",
    "en": "🧠 Emotions"
  },
  "psychologieDiscipline_14": {
    "fr": "Tu ne contrôles pas le marché. Mais tu peux te contrôler, toi.",
    "en": "You don't control the market. But you can control yourself."
  },
  "psychologieDiscipline_15": {
    "fr": "Chaque trade est une épreuve émotionnelle. La peur te fait sortir trop tôt. La cupidité te fait entrer trop tard. Ton objectif, c’est d’observer tes émotions sans agir sous leur influence.",
    "en": "Every trade is an emotional test. Fear makes you exit too early. Greed makes you enter too late. Your goal is to observe your emotions without acting under their influence."
  },
  "psychologieDiscipline_16": {
    "fr": "Observe tes réactions, pas seulement le marché.",
    "en": "Observe your reactions, not just the market."
  },
  "psychologieDiscipline_17": {
    "fr": "Accepte la perte avant même d’entrer en position.",
    "en": "Accept the loss before you even enter the position."
  },
  "psychologieDiscipline_18": {
    "fr": "Ne cherche pas à avoir raison, cherche à être discipliné.",
    "en": "Don't seek to be right, seek to be disciplined."
  },
  "psychologieDiscipline_19": {
    "fr": "🎯 Discipline",
    "en": "🎯 Discipline"
  },
  "psychologieDiscipline_20": {
    "fr": "La discipline, c’est faire ce que tu dois faire, même quand tu n’en as pas envie.",
    "en": "Discipline is doing what you have to do, even when you don't feel like it."
  },
  "psychologieDiscipline_21": {
    "fr": "La discipline, c’est la clé qui transforme un bon plan en résultats réels. Tes émotions veulent de l’adrénaline, ton succès demande de la rigueur.",
    "en": "Discipline is the key that turns a good plan into real results. Your emotions want adrenaline; your success requires rigor."
  },
  "psychologieDiscipline_22": {
    "fr": "Suis ton plan, pas ton humeur.",
    "en": "Follow your plan, not your mood."
  },
  "psychologieDiscipline_23": {
    "fr": "Rappelle-toi : un setup 5★ ne garantit rien, il maximise tes chances.",
    "en": "Remember: a 5★ setup guarantees nothing, it maximizes your odds."
  },
  "psychologieDiscipline_24": {
    "fr": "Tiens ton journal. Les chiffres ne mentent pas, toi si.",
    "en": "Keep your journal. Numbers don't lie, you might."
  },
  "psychologieDiscipline_25": {
    "fr": "⏰ Routine mentale",
    "en": "⏰ Mental Routine"
  },
  "psychologieDiscipline_26": {
    "fr": "Ton esprit doit être aussi préparé que ton graphique.",
    "en": "Your mind must be as prepared as your chart."
  },
  "psychologieDiscipline_27": {
    "fr": "Les meilleurs traders ne réagissent pas, ils exécutent. Chaque matin, aligne ton mental avec ta méthode. Ta routine, c’est ton ancrage dans la tempête.",
    "en": "The best traders don't react, they execute. Every morning, align your mindset with your method. Your routine is your anchor in the storm."
  },
  "psychologieDiscipline_28": {
    "fr": "Commence ta session avec calme et clarté.",
    "en": "Start your session calm and clear-headed."
  },
  "psychologieDiscipline_29": {
    "fr": "Ferme ton graphique après ta décision.",
    "en": "Close your chart after your decision."
  },
  "psychologieDiscipline_30": {
    "fr": "Coupe les notifications. Le marché mérite ton attention entière.",
    "en": "Turn off notifications. The market deserves your full attention."
  },
  "psychologieDiscipline_31": {
    "fr": "💪 Résilience",
    "en": "💪 Resilience"
  },
  "psychologieDiscipline_32": {
    "fr": "Ce n’est pas le marché qui te teste, c’est la vie qui te forge.",
    "en": "It's not the market that tests you, it's life that forges you."
  },
  "psychologieDiscipline_33": {
    "fr": "Tu vas perdre. Souvent. Mais chaque perte te rapproche de la version de toi qui gagne. Le but n’est pas d’éviter la douleur, mais de la transformer en expérience.",
    "en": "You will lose. Often. But every loss brings you closer to the winning version of yourself. The goal isn't to avoid the pain, but to turn it into experience."
  },
  "psychologieDiscipline_34": {
    "fr": "Analyse sans te juger. Apprends, ajuste, avance.",
    "en": "Analyze without judging yourself. Learn, adjust, move forward."
  },
  "psychologieDiscipline_35": {
    "fr": "La constance bat le talent, chaque fois.",
    "en": "Consistency beats talent, every time."
  },
  "psychologieDiscipline_36": {
    "fr": "Ne cherche pas la revanche, cherche la progression.",
    "en": "Don't seek revenge, seek progress."
  },
  "psychologieDiscipline_37": {
    "fr": "⚠️ Erreurs fréquentes",
    "en": "⚠️ Common Mistakes"
  },
  "psychologieDiscipline_38": {
    "fr": "La plupart échouent, non pas à cause du marché, mais à cause d’eux-mêmes.",
    "en": "Most people fail, not because of the market, but because of themselves."
  },
  "psychologieDiscipline_39": {
    "fr": "Chercher à “se refaire” après une perte.",
    "en": "Trying to \"win it back\" after a loss."
  },
  "psychologieDiscipline_40": {
    "fr": "Doubler le risque pour “rattraper” un trade.",
    "en": "Doubling the risk to \"make up for\" a trade."
  },
  "psychologieDiscipline_41": {
    "fr": "Oublier que ne pas trader, c’est aussi trader.",
    "en": "Forgetting that not trading is also trading."
  },
  "psychologieDiscipline_42": {
    "fr": "👑 Mental de pro",
    "en": "👑 Pro Mindset"
  },
  "psychologieDiscipline_43": {
    "fr": "Tu n’es plus un joueur. Tu es un opérateur rationnel dans un environnement incertain.",
    "en": "You're no longer a gambler. You're a rational operator in an uncertain environment."
  },
  "psychologieDiscipline_44": {
    "fr": "Le mental du trader pro ne dépend ni de ses gains, ni de ses pertes. Il dépend de sa capacité à rester lucide. Être constant, c’est ton vrai edge.",
    "en": "The pro trader's mindset depends neither on their gains nor their losses. It depends on their ability to stay lucid. Being consistent is your true edge."
  },
  "psychologieDiscipline_45": {
    "fr": "Maîtrise-toi, et le marché ne t’affectera plus.",
    "en": "Master yourself, and the market will no longer affect you."
  },
  "psychologieDiscipline_46": {
    "fr": "Traite chaque trade comme une ligne de code : précis, neutre, logique.",
    "en": "Treat every trade like a line of code: precise, neutral, logical."
  },
  "psychologieDiscipline_47": {
    "fr": "Garde ton ego hors du graphique.",
    "en": "Keep your ego off the chart."
  },
  "psychologieDiscipline_48": {
    "fr": "« Le marché n’a pas d’émotions. C’est toi qui en as. Et c’est la seule variable que tu peux maîtriser. »",
    "en": "\"The market has no emotions. You do. And that's the only variable you can control.\""
  },
  "psychologieDiscipline_49": {
    "fr": "📌 À retenir",
    "en": "📌 To Remember"
  },
  "psychologieDiscipline_50": {
    "fr": "🎯 La discipline bat toujours le talent.",
    "en": "🎯 Discipline always beats talent."
  },
  "psychologieDiscipline_51": {
    "fr": "🧘 Tes émotions ne sont pas tes ennemies, elles sont ton miroir.",
    "en": "🧘 Your emotions aren't your enemies, they're your mirror."
  },
  "psychologieDiscipline_52": {
    "fr": "🔥 Le vrai succès, c’est la constance mentale.",
    "en": "🔥 True success is mental consistency."
  },
  "psychologieDiscipline_53": {
    "fr": "Note du coach",
    "en": "Coach's note"
  },
  "psychologieDiscipline_54": {
    "fr": "\n            ✏️ Éditer\n          ",
    "en": "\n            ✏️ Edit\n          "
  },
  "psychologieDiscipline_55": {
    "fr": "Annuler",
    "en": "Cancel"
  },
  "psychologieDiscipline_56": {
    "fr": "Enregistrer",
    "en": "Save"
  },
  "psychologieDiscipline_57": {
    "fr": "← Revenir au Chapitre 5 — Setup",
    "en": "← Back to Chapter 5 — Setup"
  },
  "psychologieDiscipline_58": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "psychologieDiscipline_59": {
    "fr": "Mentions légales",
    "en": "Legal Notice"
  },
  "psychologieDiscipline_60": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "psychologieDiscipline_61": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "psychologieDiscipline_62": {
    "fr": "CGV",
    "en": "Terms of Sale"
  },
  "psychologieDiscipline_63": {
    "fr": "Gérer les cookies",
    "en": "Manage Cookies"
  },
  "psychologieDiscipline_64": {
    "fr": "Contact",
    "en": "Contact"
  },
  "psychologieDiscipline_65": {
    "fr": "Programme terminé",
    "en": "Program complete"
  },
  "psychologieDiscipline_66": {
    "fr": "Tu as parcouru les 6 chapitres. Tu as la méthode, les outils, et maintenant le mental. Il ne reste plus qu'à passer à l'action.",
    "en": "You've made it through all 6 chapters. You have the method, the tools, and now the mindset. All that's left is to take action."
  },
  "psychologieDiscipline_12": {
    "fr": "<span aria-hidden=\"true\">🎥</span> Vidéo — Les clés mentales d’un trader rentable.",
    "en": "<span aria-hidden=\"true\">🎥</span> Video — The mental keys of a profitable trader."
  },
  "setup_1": {
    "fr": "Chapitre 5 — Setup",
    "en": "Chapter 5 — Setup"
  },
  "setup_2": {
    "fr": "← Sommaire",
    "en": "← Table of Contents"
  },
  "setup_3": {
    "fr": "Vidéo — Setup (Fibonacci inversé)",
    "en": "Video — Setup (Reversed Fibonacci)"
  },
  "setup_4": {
    "fr": "Introduction : logique d’entrée, confirmations multi-UT, gestion du risque.",
    "en": "Introduction: entry logic, multi-timeframe confirmations, risk management."
  },
  "setup_5": {
    "fr": "\n            Votre navigateur ne supporte pas la vidéo HTML5.\n          ",
    "en": "\n            Your browser does not support HTML5 video.\n          "
  },
  "setup_6": {
    "fr": "Synthèse : critères d’entrée, confirmations multi-UT et alignement avec le money management.",
    "en": "Summary: entry criteria, multi-timeframe confirmations, and alignment with money management."
  },
  "setup_7": {
    "fr": "Les 7 parties du Setup — Fibonacci inversé",
    "en": "The 7 Parts of the Setup — Reversed Fibonacci"
  },
  "setup_8": {
    "fr": "Cas pour une entrée Fibonacci inversé.",
    "en": "Case for a reversed Fibonacci entry."
  },
  "setup_9": {
    "fr": "Partie 1 — Déterminer la tendance Daily",
    "en": "Part 1 — Determine the Daily Trend"
  },
  "setup_10": {
    "fr": "Analyser la tendance sur ~5 derniers mois.",
    "en": "Analyze the trend over the last ~5 months."
  },
  "setup_11": {
    "fr": "Le dernier plus bas est plus récent que le dernier plus haut.",
    "en": "The last low is more recent than the last high."
  },
  "setup_12": {
    "fr": "Le dernier plus haut n’est pas cassé par le corps (mèches ignorées).",
    "en": "The last high is not broken by the body (wicks ignored)."
  },
  "setup_13": {
    "fr": "Conclusion : tendance baissière.",
    "en": "Conclusion: downtrend."
  },
  "setup_14": {
    "fr": "Partie 2 — Pattern baissier en Daily",
    "en": "Part 2 — Bearish Pattern on Daily"
  },
  "setup_15": {
    "fr": "Identifier un pattern dans le sens de la tendance.",
    "en": "Identify a pattern in the direction of the trend."
  },
  "setup_16": {
    "fr": "Tracer le Fibonacci.",
    "en": "Draw the Fibonacci."
  },
  "setup_17": {
    "fr": "ZOI : première zone touchée entre 0.618 et 1 du Fibo.",
    "en": "ZOI: first zone touched between 0.618 and 1 of the Fibo."
  },
  "setup_18": {
    "fr": "Attendre un W2 : retour correctif du prix dans la ZOI Daily.",
    "en": "Wait for a W2: corrective return of price into the Daily ZOI."
  },
  "setup_19": {
    "fr": "Vérifier que le pattern respecte les DATAs.",
    "en": "Check that the pattern complies with the DATAs."
  },
  "setup_20": {
    "fr": "Partie 3 — Analyse Weekly",
    "en": "Part 3 — Weekly Analysis"
  },
  "setup_21": {
    "fr": "S&D Zone :",
    "en": "S&D Zone:"
  },
  "setup_22": {
    "fr": " mèche sur un support ⇒ (−).",
    "en": " wick on a support ⇒ (−)."
  },
  "setup_23": {
    "fr": "Tendance :",
    "en": "Trend:"
  },
  "setup_24": {
    "fr": " baissière ⇒ (−).",
    "en": " bearish ⇒ (−)."
  },
  "setup_25": {
    "fr": "CC :",
    "en": "CC:"
  },
  "setup_26": {
    "fr": " corps bleu ⇒ (+).",
    "en": " blue body ⇒ (+)."
  },
  "setup_27": {
    "fr": "Pattern :",
    "en": "Pattern:"
  },
  "setup_28": {
    "fr": " proche des 0.618 Weekly, potentiel −0.27 Weekly ⇒ (−).",
    "en": " close to 0.618 Weekly, potential −0.27 Weekly ⇒ (−)."
  },
  "setup_29": {
    "fr": "Résultat : 3/4 à la vente. Setup validé.",
    "en": "Result: 3/4 for selling. Setup validated."
  },
  "setup_30": {
    "fr": "Partie 4 — Entrée 4H",
    "en": "Part 4 — 4H Entry"
  },
  "setup_31": {
    "fr": "Basculer 4H une fois le prix dans la ZOI Daily.",
    "en": "Switch to 4H once price is in the Daily ZOI."
  },
  "setup_32": {
    "fr": "Anticiper via Fibonacci inversé : W2 corrige dans la ZOI.",
    "en": "Anticipate via reversed Fibonacci: W2 corrects into the ZOI."
  },
  "setup_33": {
    "fr": "0.68 du Fibo inversé dans la ZOI : FC-68 validé.",
    "en": "0.68 of the reversed Fibo in the ZOI: FC-68 validated."
  },
  "setup_34": {
    "fr": "Partie 5 — Placer la limite",
    "en": "Part 5 — Placing the Limit Order"
  },
  "setup_35": {
    "fr": "Paramétrer PE, SL, Target (arrondir les pips en défaveur).",
    "en": "Set entry, SL, target (round pips unfavorably)."
  },
  "setup_36": {
    "fr": "Calculer la taille de position et placer l’ordre limite (MT4, cTrader).",
    "en": "Calculate position size and place the limit order (MT4, cTrader)."
  },
  "setup_37": {
    "fr": "Alerte sur le PE (éviter de surveiller H24).",
    "en": "Set an alert on the entry (avoid watching 24/7)."
  },
  "setup_38": {
    "fr": "Partie 6 — Déclenché",
    "en": "Part 6 — Triggered"
  },
  "setup_39": {
    "fr": "Alerte sur 1 % et passage au BreakEven à ce seuil.",
    "en": "Alert at 1% and move to BreakEven at that threshold."
  },
  "setup_40": {
    "fr": "Alerte sur 0.618 : clôturer 1/3.",
    "en": "Alert at 0.618: close 1/3."
  },
  "setup_41": {
    "fr": "Patienter…",
    "en": "Wait…"
  },
  "setup_42": {
    "fr": "Partie 7 — Encaisser",
    "en": "Part 7 — Cashing In"
  },
  "setup_43": {
    "fr": "1 % touché :",
    "en": "1% hit:"
  },
  "setup_44": {
    "fr": " descendre le SL au PE.",
    "en": " move SL to entry."
  },
  "setup_45": {
    "fr": "0.618 touché :",
    "en": "0.618 hit:"
  },
  "setup_46": {
    "fr": " clôturer 1/3 et laisser courir.",
    "en": " close 1/3 and let it run."
  },
  "setup_47": {
    "fr": "−0.27 touché :",
    "en": "−0.27 hit:"
  },
  "setup_48": {
    "fr": " TP auto.",
    "en": " auto TP."
  },
  "setup_49": {
    "fr": "Remplir le journal et faire le rapport mensuel.",
    "en": "Fill in the journal and do the monthly report."
  },
  "setup_50": {
    "fr": "📌 À retenir — Fibonacci inversé",
    "en": "📌 To Remember — Reversed Fibonacci"
  },
  "setup_51": {
    "fr": "Rappels rapides pour ce setup.",
    "en": "Quick reminders for this setup."
  },
  "setup_52": {
    "fr": "Pas de M1/W1 big ou M5 en Daily.",
    "en": "No big M1/W1 or M5 on Daily."
  },
  "setup_53": {
    "fr": "Le P3 ne doit pas toucher la ZOI Daily avant le P5.",
    "en": "P3 must not touch the Daily ZOI before P5."
  },
  "setup_54": {
    "fr": "Le prix doit être correctif.",
    "en": "Price must be corrective."
  },
  "setup_55": {
    "fr": "Avoir −0.27 ou −0.68 dans la ZOI Daily.",
    "en": "Have −0.27 or −0.68 in the Daily ZOI."
  },
  "setup_56": {
    "fr": "PE −0.27 ⇒ SL sous/dessus −0.68 ou 1 % Daily.",
    "en": "Entry at −0.27 ⇒ SL below/above −0.68 or 1% Daily."
  },
  "setup_57": {
    "fr": "TP1 4H au 0.618 : clôturer 1/3.",
    "en": "TP1 4H at 0.618: close 1/3."
  },
  "setup_58": {
    "fr": "Vidéo — Setup (Pattern 4H)",
    "en": "Video — Setup (4H Pattern)"
  },
  "setup_59": {
    "fr": "Logique d’entrée, confirmations multi-UT, gestion du risque.",
    "en": "Entry logic, multi-timeframe confirmations, risk management."
  },
  "setup_60": {
    "fr": "\n            Votre navigateur ne supporte pas la vidéo HTML5.\n          ",
    "en": "\n            Your browser does not support HTML5 video.\n          "
  },
  "setup_61": {
    "fr": "Synthèse : critères d’entrée, confirmations multi-UT et alignement avec le money management.",
    "en": "Summary: entry criteria, multi-timeframe confirmations, and alignment with money management."
  },
  "setup_62": {
    "fr": "Les 7 parties du Setup — Pattern 4H (avec / sans cassure)",
    "en": "The 7 Parts of the Setup — 4H Pattern (with / without break)"
  },
  "setup_63": {
    "fr": "Cas pour une entrée avec pattern avec et sans cassure.",
    "en": "Case for an entry with pattern with and without break."
  },
  "setup_64": {
    "fr": "Partie 1 — Déterminer la tendance Daily",
    "en": "Part 1 — Determine the Daily Trend"
  },
  "setup_65": {
    "fr": "Analyser la tendance sur ~5 derniers mois.",
    "en": "Analyze the trend over the last ~5 months."
  },
  "setup_66": {
    "fr": "Le dernier plus haut est plus récent que le dernier plus bas.",
    "en": "The last high is more recent than the last low."
  },
  "setup_67": {
    "fr": "Le dernier plus bas n’est pas cassé par le corps (mèches ignorées).",
    "en": "The last low is not broken by the body (wicks ignored)."
  },
  "setup_68": {
    "fr": "Conclusion : tendance haussière.",
    "en": "Conclusion: uptrend."
  },
  "setup_69": {
    "fr": "Partie 2 — Pattern haussier en Daily",
    "en": "Part 2 — Bullish Pattern on Daily"
  },
  "setup_70": {
    "fr": "Identifier un pattern dans le sens de la tendance.",
    "en": "Identify a pattern in the direction of the trend."
  },
  "setup_71": {
    "fr": "Tracer le Fibonacci.",
    "en": "Draw the Fibonacci."
  },
  "setup_72": {
    "fr": "ZOI : première zone touchée entre 0.618 et 1.",
    "en": "ZOI: first zone touched between 0.618 and 1."
  },
  "setup_73": {
    "fr": "Ici, M1 small : M inférieur à 9/10 bougies.",
    "en": "Here, small M1: M smaller than 9/10 candles."
  },
  "setup_74": {
    "fr": "Vérifier les DATAs du tableau.",
    "en": "Check the DATAs table."
  },
  "setup_75": {
    "fr": "Partie 3 — Analyse Weekly",
    "en": "Part 3 — Weekly Analysis"
  },
  "setup_76": {
    "fr": "S&D Zone :",
    "en": "S&D Zone:"
  },
  "setup_77": {
    "fr": " neutre (ancienne zone trop loin) ⇒ (/).",
    "en": " neutral (old zone too far) ⇒ (/)."
  },
  "setup_78": {
    "fr": "Tendance :",
    "en": "Trend:"
  },
  "setup_79": {
    "fr": " haussière ⇒ (+).",
    "en": " bullish ⇒ (+)."
  },
  "setup_80": {
    "fr": "CC :",
    "en": "CC:"
  },
  "setup_81": {
    "fr": " corps bleu ⇒ (+).",
    "en": " blue body ⇒ (+)."
  },
  "setup_82": {
    "fr": "Pattern :",
    "en": "Pattern:"
  },
  "setup_83": {
    "fr": " pas de pattern actif ⇒ (/).",
    "en": " no active pattern ⇒ (/)."
  },
  "setup_84": {
    "fr": "Résultat : 2/4 à l’achat. Setup validé.",
    "en": "Result: 2/4 for buying. Setup validated."
  },
  "setup_85": {
    "fr": "Partie 4 — Entrée 4H (sans cassure)",
    "en": "Part 4 — 4H Entry (without break)"
  },
  "setup_86": {
    "fr": "Attendre d’être dans la ZOI Daily avant 4H.",
    "en": "Wait until you're in the Daily ZOI before switching to 4H."
  },
  "setup_87": {
    "fr": "Tracer Fibo : mèche P3 ↔ corps P0.",
    "en": "Draw Fibo: P3 wick ↔ P0 body."
  },
  "setup_88": {
    "fr": "Chercher le PE dans la zone 4H.",
    "en": "Look for the entry in the 4H zone."
  },
  "setup_89": {
    "fr": "Partie 5 — Placer la limite",
    "en": "Part 5 — Placing the Limit Order"
  },
  "setup_90": {
    "fr": "PE, SL, Target (arrondir défavorablement).",
    "en": "Entry, SL, target (round unfavorably)."
  },
  "setup_91": {
    "fr": "Calcul du lot, ordre limite (MT4, cTrader).",
    "en": "Lot calculation, limit order (MT4, cTrader)."
  },
  "setup_92": {
    "fr": "Alerte sur le PE.",
    "en": "Alert on the entry."
  },
  "setup_93": {
    "fr": "Partie 6 — Déclenché",
    "en": "Part 6 — Triggered"
  },
  "setup_94": {
    "fr": "Alerte 1 % → BreakEven.",
    "en": "1% alert → BreakEven."
  },
  "setup_95": {
    "fr": "Alerte −0.27 : clôturer 1/3.",
    "en": "−0.27 alert: close 1/3."
  },
  "setup_96": {
    "fr": "BE 3 % touché :",
    "en": "BE 3% hit:"
  },
  "setup_97": {
    "fr": " protection par palier (atteint 4 %, revient 3 %).",
    "en": " step protection (reaches 4%, returns to 3%)."
  },
  "setup_98": {
    "fr": "Patienter…",
    "en": "Wait…"
  },
  "setup_99": {
    "fr": "Partie 7 — Encaisser",
    "en": "Part 7 — Cashing In"
  },
  "setup_100": {
    "fr": "1 % touché :",
    "en": "1% hit:"
  },
  "setup_101": {
    "fr": " SL au PE.",
    "en": " SL at entry."
  },
  "setup_102": {
    "fr": "−0.27 touché :",
    "en": "−0.27 hit:"
  },
  "setup_103": {
    "fr": " clôturer 1/3, laisser tourner.",
    "en": " close 1/3, let it run."
  },
  "setup_104": {
    "fr": "BE 3 % :",
    "en": "BE 3%:"
  },
  "setup_105": {
    "fr": " protection par palier (4 % → 3 %).",
    "en": " step protection (4% → 3%)."
  },
  "setup_106": {
    "fr": "Journal + rapport mensuel.",
    "en": "Journal + monthly report."
  },
  "setup_107": {
    "fr": "📌 À retenir — Pattern 4H",
    "en": "📌 To Remember — 4H Pattern"
  },
  "setup_108": {
    "fr": "Rappels rapides.",
    "en": "Quick reminders."
  },
  "setup_109": {
    "fr": "Pas de contre-tendance. Tendance claire.",
    "en": "No counter-trend. Clear trend."
  },
  "setup_110": {
    "fr": "ZOI Daily : 1ʳᵉ zone entre 0.618–1.",
    "en": "Daily ZOI: 1st zone between 0.618–1."
  },
  "setup_111": {
    "fr": "Risque 1 % • RR ≥ 3,8 • BE à 1 %.",
    "en": "Risk 1% • RR ≥ 3.8 • BE at 1%."
  },
  "setup_112": {
    "fr": "Vidéo — Setup (Ralentissement)",
    "en": "Video — Setup (Deceleration)"
  },
  "setup_113": {
    "fr": "Logique d’entrée, confirmations multi-UT, gestion du risque.",
    "en": "Entry logic, multi-timeframe confirmations, risk management."
  },
  "setup_114": {
    "fr": "\n            Votre navigateur ne supporte pas la vidéo HTML5.\n          ",
    "en": "\n            Your browser does not support HTML5 video.\n          "
  },
  "setup_115": {
    "fr": "Synthèse : critères d’entrée, confirmations multi-UT et alignement avec le money management.",
    "en": "Summary: entry criteria, multi-timeframe confirmations, and alignment with money management."
  },
  "setup_116": {
    "fr": "Les 7 parties du Setup — Ralentissement",
    "en": "The 7 Parts of the Setup — Deceleration"
  },
  "setup_117": {
    "fr": "Cas pour une entrée avec ralentissement.",
    "en": "Case for an entry with deceleration."
  },
  "setup_118": {
    "fr": "Partie 1 — Déterminer la tendance Daily",
    "en": "Part 1 — Determine the Daily Trend"
  },
  "setup_119": {
    "fr": "Analyser ~5 derniers mois.",
    "en": "Analyze the last ~5 months."
  },
  "setup_120": {
    "fr": "Le dernier plus haut est plus récent que le dernier plus bas.",
    "en": "The last high is more recent than the last low."
  },
  "setup_121": {
    "fr": "Le dernier plus bas n’est pas cassé par le corps.",
    "en": "The last low is not broken by the body."
  },
  "setup_122": {
    "fr": "Conclusion : tendance haussière, chercher M ou IETE.",
    "en": "Conclusion: uptrend, look for M or IETE."
  },
  "setup_123": {
    "fr": "Partie 2 — Pattern haussier en Daily",
    "en": "Part 2 — Bullish Pattern on Daily"
  },
  "setup_124": {
    "fr": "Identifier un pattern dans le sens de la tendance.",
    "en": "Identify a pattern in the direction of the trend."
  },
  "setup_125": {
    "fr": "Tracer le Fibonacci.",
    "en": "Draw the Fibonacci."
  },
  "setup_126": {
    "fr": "ZOI au niveau du P2 (M4).",
    "en": "ZOI at the P2 level (M4)."
  },
  "setup_127": {
    "fr": "M4 : si P1 = P3 alors P2 = P4.",
    "en": "M4: if P1 = P3 then P2 = P4."
  },
  "setup_128": {
    "fr": "Respect des DATAs du tableau.",
    "en": "Compliance with the DATAs table."
  },
  "setup_129": {
    "fr": "Partie 3 — Analyse Weekly",
    "en": "Part 3 — Weekly Analysis"
  },
  "setup_130": {
    "fr": "S&D Zone :",
    "en": "S&D Zone:"
  },
  "setup_131": {
    "fr": " sur support ⇒ (+).",
    "en": " on support ⇒ (+)."
  },
  "setup_132": {
    "fr": "Tendance :",
    "en": "Trend:"
  },
  "setup_133": {
    "fr": " haussière ⇒ (+).",
    "en": " bullish ⇒ (+)."
  },
  "setup_134": {
    "fr": "CC :",
    "en": "CC:"
  },
  "setup_135": {
    "fr": " corps rouge ⇒ (−).",
    "en": " red body ⇒ (−)."
  },
  "setup_136": {
    "fr": "Pattern :",
    "en": "Pattern:"
  },
  "setup_137": {
    "fr": " pattern actif prêt à aller au P5 ⇒ (+).",
    "en": " active pattern ready to move to P5 ⇒ (+)."
  },
  "setup_138": {
    "fr": "Résultat : 3/4 à l’achat. Setup validé.",
    "en": "Result: 3/4 for buying. Setup validated."
  },
  "setup_139": {
    "fr": "Partie 4 — Entrée 4H",
    "en": "Part 4 — 4H Entry"
  },
  "setup_140": {
    "fr": "Déjà dans la ZOI Daily → passer en 4H.",
    "en": "Already in the Daily ZOI → switch to 4H."
  },
  "setup_141": {
    "fr": "Tracer la zone de ralentissement : du corps le plus bas à la mèche la plus basse.",
    "en": "Draw the deceleration zone: from the lowest body to the lowest wick."
  },
  "setup_142": {
    "fr": "Déclenchement sur la 4ᵉ bougie : préparer la limite.",
    "en": "Trigger on the 4th candle: prepare the limit order."
  },
  "setup_143": {
    "fr": "Partie 5 — Placer la limite",
    "en": "Part 5 — Placing the Limit Order"
  },
  "setup_144": {
    "fr": "PE, SL, Target (arrondir en défaveur).",
    "en": "Entry, SL, target (round unfavorably)."
  },
  "setup_145": {
    "fr": "Calcul du lot et ordre limite (MT4, cTrader).",
    "en": "Lot calculation and limit order (MT4, cTrader)."
  },
  "setup_146": {
    "fr": "Alerte sur le PE (pas besoin de surveiller H24).",
    "en": "Alert on the entry (no need to watch 24/7)."
  },
  "setup_147": {
    "fr": "Appliquer les règles du ralentissement (chapitre Analyse technique → Entrée 4H).",
    "en": "Apply the deceleration rules (Technical Analysis chapter → 4H Entry)."
  },
  "setup_148": {
    "fr": "Partie 6 — Déclenché",
    "en": "Part 6 — Triggered"
  },
  "setup_149": {
    "fr": "Alerte 1 % → BreakEven.",
    "en": "1% alert → BreakEven."
  },
  "setup_150": {
    "fr": "Alerte 0 Daily : clôturer 1/3.",
    "en": "Daily 0 alert: close 1/3."
  },
  "setup_151": {
    "fr": "À peine déclenché : déjà sécurisé.",
    "en": "Barely triggered: already secured."
  },
  "setup_152": {
    "fr": "Patienter…",
    "en": "Wait…"
  },
  "setup_153": {
    "fr": "Partie 7 — Encaisser",
    "en": "Part 7 — Cashing In"
  },
  "setup_154": {
    "fr": "1 % touché :",
    "en": "1% hit:"
  },
  "setup_155": {
    "fr": " SL au PE.",
    "en": " SL at entry."
  },
  "setup_156": {
    "fr": "BE 1 % :",
    "en": "BE 1%:"
  },
  "setup_157": {
    "fr": " protection par palier (atteint 2 %, revenu 1 %).",
    "en": " step protection (reaches 2%, returns to 1%)."
  },
  "setup_158": {
    "fr": "Journal + rapport fin de mois.",
    "en": "Journal + end-of-month report."
  },
  "setup_159": {
    "fr": "PS : 1 % sur 200 000 $ = 2 000 $. Objectif réaliste : 0,5 %/semaine (~2 %/mois).",
    "en": "PS: 1% on $200,000 = $2,000. Realistic target: 0.5%/week (~2%/month)."
  },
  "setup_160": {
    "fr": "← Chapitre précédent — Money Management",
    "en": "← Previous chapter — Money Management"
  },
  "setup_161": {
    "fr": "Chapitre suivant — Psychologie & Discipline →",
    "en": "Next chapter — Psychology & Discipline →"
  },
  "setup_162": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "setup_163": {
    "fr": "Mentions légales",
    "en": "Legal Notice"
  },
  "setup_164": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "setup_165": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "setup_166": {
    "fr": "CGV",
    "en": "Terms of Sale"
  },
  "setup_167": {
    "fr": "Gérer les cookies",
    "en": "Manage Cookies"
  },
  "setup_168": {
    "fr": "Contact",
    "en": "Contact"
  },
  "setup_169": {
    "fr": "Setup Fibonacci inversé maîtrisé",
    "en": "Reverse Fibonacci setup mastered"
  },
  "setup_170": {
    "fr": "Tu maîtrises la structure complète : tendance, ZOI, entrée et gestion du risque. Place à la pratique.",
    "en": "You've got the full structure down: trend, ZOI, entry and risk management. Time to practice."
  },
  "setup_171": {
    "fr": "Setup Pattern 4H maîtrisé",
    "en": "4H Pattern setup mastered"
  },
  "setup_172": {
    "fr": "Tendance, pattern, confirmations multi-UT : tu as toutes les clés du setup Pattern 4H. À toi de le repérer sur le marché.",
    "en": "Trend, pattern, multi-timeframe confirmations: you have every key to the 4H Pattern setup. Now go spot it on the market."
  },
  "setup_173": {
    "fr": "Setup Ralentissement maîtrisé",
    "en": "Slowdown setup mastered"
  },
  "setup_174": {
    "fr": "Tu as vu les 7 parties du setup Ralentissement. Tu as maintenant les 3 setups complets de la méthode Wavest.",
    "en": "You've seen all 7 parts of the Slowdown setup. You now have all 3 complete setups of the Wavest method."
  },
  "simulateurCroissance_1": {
    "fr": "Simulateur de croissance de capital",
    "en": "Capital growth simulator"
  },
  "simulateurCroissance_2": {
    "fr": "← Sommaire",
    "en": "← Table of contents"
  },
  "simulateurCroissance_3": {
    "fr": "Visualise comment ton capital évolue selon ton risque, ton ratio risque/rendement et ton taux de réussite — avant de risquer un euro en réel.",
    "en": "Visualize how your capital evolves based on your risk, your risk/reward ratio, and your win rate — before risking a single euro live."
  },
  "simulateurCroissance_4": {
    "fr": "\n            ↻ Réinitialiser\n          ",
    "en": "\n            ↻ Reset\n          "
  },
  "simulateurCroissance_6": {
    "fr": "Paramètres ",
    "en": "Settings "
  },
  "simulateurCroissance_5": {
    "fr": "· ta méthode",
    "en": "· your method"
  },
  "simulateurCroissance_7": {
    "fr": "Ton scénario",
    "en": "Your scenario"
  },
  "simulateurCroissance_8": {
    "fr": "Renseigne ton capital de départ et les stats de ta méthode.",
    "en": "Enter your starting capital and your method's stats."
  },
  "simulateurCroissance_9": {
    "fr": "Capital de départ (€)",
    "en": "Starting capital (€)"
  },
  "simulateurCroissance_10": {
    "fr": "Risque par trade (%)",
    "en": "Risk per trade (%)"
  },
  "simulateurCroissance_11": {
    "fr": "Ratio risque/rendement moyen (R:R)",
    "en": "Average risk/reward ratio (R:R)"
  },
  "simulateurCroissance_12": {
    "fr": "\n                  Utilise ta moyenne réelle sur au moins 30-50 trades (backtestés ou en réel),\n                  pas un chiffre théorique — le R:R n'est jamais identique à chaque trade.\n                ",
    "en": "\n                  Use your actual average over at least 30-50 trades (backtested or live),\n                  not a theoretical figure — R:R is never identical on every trade.\n                "
  },
  "simulateurCroissance_13": {
    "fr": "Taux de réussite estimé (%)",
    "en": "Estimated win rate (%)"
  },
  "simulateurCroissance_14": {
    "fr": "Nombre de trades à simuler",
    "en": "Number of trades to simulate"
  },
  "simulateurCroissance_15": {
    "fr": "\n              ⚠️ Simulation statistique à but pédagogique. Les résultats passés ou simulés ne préjugent\n              pas des résultats futurs. Le trading comporte des risques de perte en capital.\n            ",
    "en": "\n              ⚠️ Statistical simulation for educational purposes. Past or simulated results do not\n              guarantee future results. Trading involves a risk of capital loss.\n            "
  },
  "simulateurCroissance_17": {
    "fr": "Résultat ",
    "en": "Result "
  },
  "simulateurCroissance_16": {
    "fr": "· en direct",
    "en": "· live"
  },
  "simulateurCroissance_18": {
    "fr": "Projection",
    "en": "Projection"
  },
  "simulateurCroissance_19": {
    "fr": "Trois scénarios simulés selon les mêmes paramètres.",
    "en": "Three simulated scenarios using the same parameters."
  },
  "simulateurCroissance_20": {
    "fr": " Scénario favorable",
    "en": " Favorable scenario"
  },
  "simulateurCroissance_21": {
    "fr": " Scénario médian",
    "en": " Median scenario"
  },
  "simulateurCroissance_22": {
    "fr": " Scénario défavorable",
    "en": " Unfavorable scenario"
  },
  "simulateurCroissance_23": {
    "fr": "Capital final (médian)",
    "en": "Final capital (median)"
  },
  "simulateurCroissance_24": {
    "fr": "Rendement total",
    "en": "Total return"
  },
  "simulateurCroissance_25": {
    "fr": "Drawdown max (médian)",
    "en": "Max drawdown (median)"
  },
  "simulateurCroissance_26": {
    "fr": "Trades gagnants attendus",
    "en": "Expected winning trades"
  },
  "simulateurCroissance_28": {
    "fr": "Pourquoi ",
    "en": "Why "
  },
  "simulateurCroissance_27": {
    "fr": "· ça compte",
    "en": "· it matters"
  },
  "simulateurCroissance_29": {
    "fr": "Ce que montre la simulation",
    "en": "What the simulation shows"
  },
  "simulateurCroissance_30": {
    "fr": "Le même taux de réussite ne donne pas la même trajectoire selon le risque pris par trade.",
    "en": "The same win rate doesn't produce the same trajectory depending on the risk taken per trade."
  },
  "simulateurCroissance_31": {
    "fr": "\n            Le scénario défavorable simule une série de pertes plus longue que la moyenne — le genre de\n            séquence qui arrive à tout le monde, même avec une méthode statistiquement rentable. Un risque\n            par trade trop élevé peut transformer une méthode rentable sur le papier en compte explosé\n            dans la réalité. C'est le money management qui détermine si tu survis à cette séquence, pas\n            la stratégie d'entrée.\n          ",
    "en": "\n            The unfavorable scenario simulates a losing streak longer than average — the kind of\n            sequence that happens to everyone, even with a statistically profitable method. Too high a\n            risk per trade can turn a method that's profitable on paper into a blown account in\n            reality. It's money management that determines whether you survive that sequence, not\n            the entry strategy.\n          "
  },
  "simulateurCroissance_32": {
    "fr": "← Lire l'article Money Management",
    "en": "← Read the Money Management article"
  },
  "simulateurCroissance_33": {
    "fr": "Calculateur de lot →",
    "en": "Lot calculator →"
  },
  "simulateurCroissance_34": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "simulateurCroissance_35": {
    "fr": "Mentions légales",
    "en": "Legal notice"
  },
  "simulateurCroissance_36": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "simulateurCroissance_37": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "simulateurCroissance_38": {
    "fr": "CGV",
    "en": "T&Cs"
  },
  "simulateurCroissance_39": {
    "fr": "Gérer les cookies",
    "en": "Manage cookies"
  },
  "simulateurCroissance_40": {
    "fr": "Contact",
    "en": "Contact"
  },
  "tradeChecker_1": {
    "fr": "Trade Checker",
    "en": "Trade Checker"
  },
  "tradeChecker_2": {
    "fr": "← Sommaire",
    "en": "← Table of contents"
  },
  "tradeChecker_3": {
    "fr": "Valide rapidement un setup selon ton contexte Daily, ta confirmation 4H et tes statistiques backtestées.",
    "en": "Quickly validate a setup based on your Daily context, your 4H confirmation, and your backtested statistics."
  },
  "tradeChecker_4": {
    "fr": "🎥 Tutoriel vidéo",
    "en": "🎥 Video tutorial"
  },
  "tradeChecker_5": {
    "fr": "\n            ↻ Nouveau setup\n          ",
    "en": "\n            ↻ New setup\n          "
  },
  "tradeChecker_7": {
    "fr": "Étape 1 ",
    "en": "Step 1 "
  },
  "tradeChecker_6": {
    "fr": "· Daily",
    "en": "· Daily"
  },
  "tradeChecker_8": {
    "fr": "Contexte Daily",
    "en": "Daily context"
  },
  "tradeChecker_9": {
    "fr": "Définis la tendance et le pattern principal.",
    "en": "Define the trend and the main pattern."
  },
  "tradeChecker_10": {
    "fr": "Tendance Daily",
    "en": "Daily trend"
  },
  "tradeChecker_11": {
    "fr": "Sélectionner",
    "en": "Select"
  },
  "tradeChecker_12": {
    "fr": "Haussière",
    "en": "Bullish"
  },
  "tradeChecker_13": {
    "fr": "Baissière",
    "en": "Bearish"
  },
  "tradeChecker_14": {
    "fr": "Pattern Daily",
    "en": "Daily pattern"
  },
  "tradeChecker_15": {
    "fr": "Sens du pattern",
    "en": "Pattern direction"
  },
  "tradeChecker_16": {
    "fr": "Validation Daily",
    "en": "Daily validation"
  },
  "tradeChecker_17": {
    "fr": "\n                      En attente\n                    ",
    "en": "\n                      Pending\n                    "
  },
  "tradeChecker_19": {
    "fr": "Étape 2 ",
    "en": "Step 2 "
  },
  "tradeChecker_18": {
    "fr": "· Weekly",
    "en": "· Weekly"
  },
  "tradeChecker_20": {
    "fr": "Validation Weekly",
    "en": "Weekly validation"
  },
  "tradeChecker_21": {
    "fr": "Confirme que le contexte Weekly soutient le setup.",
    "en": "Confirm that the Weekly context supports the setup."
  },
  "tradeChecker_22": {
    "fr": "Weekly favorable ?",
    "en": "Weekly favorable?"
  },
  "tradeChecker_23": {
    "fr": "Sélectionner",
    "en": "Select"
  },
  "tradeChecker_24": {
    "fr": "Oui",
    "en": "Yes"
  },
  "tradeChecker_25": {
    "fr": "Non",
    "en": "No"
  },
  "tradeChecker_26": {
    "fr": "Validation Weekly",
    "en": "Weekly validation"
  },
  "tradeChecker_27": {
    "fr": "\n                      En attente\n                    ",
    "en": "\n                      Pending\n                    "
  },
  "tradeChecker_29": {
    "fr": "Étape 3 ",
    "en": "Step 3 "
  },
  "tradeChecker_28": {
    "fr": "· Confirmation 4H",
    "en": "· 4H Confirmation"
  },
  "tradeChecker_30": {
    "fr": "Confirmation 4H",
    "en": "4H confirmation"
  },
  "tradeChecker_31": {
    "fr": "Choisis la confirmation compatible avec le pattern Daily.",
    "en": "Choose the confirmation compatible with the Daily pattern."
  },
  "tradeChecker_32": {
    "fr": "Confirmation 4H",
    "en": "4H confirmation"
  },
  "tradeChecker_33": {
    "fr": "Validation 4H",
    "en": "4H validation"
  },
  "tradeChecker_34": {
    "fr": "\n                      En attente\n                    ",
    "en": "\n                      Pending\n                    "
  },
  "tradeChecker_36": {
    "fr": "Étape 4 ",
    "en": "Step 4 "
  },
  "tradeChecker_35": {
    "fr": "· Règles 4H",
    "en": "· 4H Rules"
  },
  "tradeChecker_37": {
    "fr": "Règles 4H",
    "en": "4H rules"
  },
  "tradeChecker_38": {
    "fr": "Valide uniquement les règles affichées pour cette confirmation.",
    "en": "Only validate the rules shown for this confirmation."
  },
  "tradeChecker_39": {
    "fr": "Liste des règles",
    "en": "Rules list"
  },
  "tradeChecker_40": {
    "fr": "Respectées ?",
    "en": "Met?"
  },
  "tradeChecker_41": {
    "fr": "\n                    En attente des règles\n                  ",
    "en": "\n                    Waiting for rules\n                  "
  },
  "tradeChecker_43": {
    "fr": "Résultat ",
    "en": "Result "
  },
  "tradeChecker_42": {
    "fr": "· en direct",
    "en": "· live"
  },
  "tradeChecker_44": {
    "fr": "Verdict final",
    "en": "Final verdict"
  },
  "tradeChecker_45": {
    "fr": "Décision automatique selon tes validations.",
    "en": "Automatic decision based on your validations."
  },
  "tradeChecker_46": {
    "fr": "\n                  En attente\n                ",
    "en": "\n                  Pending\n                "
  },
  "tradeChecker_48": {
    "fr": "Statistiques ",
    "en": "Statistics "
  },
  "tradeChecker_47": {
    "fr": "· backtest",
    "en": "· backtest"
  },
  "tradeChecker_49": {
    "fr": "Data du setup",
    "en": "Setup data"
  },
  "tradeChecker_50": {
    "fr": "Lecture instantanée du combo sélectionné.",
    "en": "Instant read of the selected combo."
  },
  "tradeChecker_51": {
    "fr": "Winrate",
    "en": "Winrate"
  },
  "tradeChecker_52": {
    "fr": "Maîtrise",
    "en": "Mastery"
  },
  "tradeChecker_53": {
    "fr": "RR moyen",
    "en": "Average RR"
  },
  "tradeChecker_54": {
    "fr": "Volume",
    "en": "Volume"
  },
  "tradeChecker_55": {
    "fr": "Score",
    "en": "Score"
  },
  "tradeChecker_56": {
    "fr": "Gain total",
    "en": "Total gain"
  },
  "tradeChecker_57": {
    "fr": "Combo analysé",
    "en": "Combo analyzed"
  },
  "tradeChecker_58": {
    "fr": "Nb trades",
    "en": "Nb trades"
  },
  "tradeChecker_59": {
    "fr": "Winrate",
    "en": "Winrate"
  },
  "tradeChecker_60": {
    "fr": "RR moyen",
    "en": "Average RR"
  },
  "tradeChecker_61": {
    "fr": "Gain total",
    "en": "Total gain"
  },
  "tradeChecker_62": {
    "fr": "Score",
    "en": "Score"
  },
  "tradeChecker_63": {
    "fr": "Lecture data",
    "en": "Data read"
  },
  "tradeChecker_64": {
    "fr": "\n                      Nb trades : -\n                    ",
    "en": "\n                      Nb trades: -\n                    "
  },
  "tradeChecker_65": {
    "fr": "\n                      Winrate : -\n                    ",
    "en": "\n                      Winrate: -\n                    "
  },
  "tradeChecker_66": {
    "fr": "\n                      RR : -\n                    ",
    "en": "\n                      RR: -\n                    "
  },
  "tradeChecker_67": {
    "fr": "\n                      Gain : -\n                    ",
    "en": "\n                      Gain: -\n                    "
  },
  "tradeChecker_68": {
    "fr": "\n                      Score : -\n                    ",
    "en": "\n                      Score: -\n                    "
  },
  "tradeChecker_69": {
    "fr": "\n                      Lecture globale : -\n                    ",
    "en": "\n                      Overall read: -\n                    "
  },
  "tradeChecker_70": {
    "fr": "Nouveau setup ?",
    "en": "New setup?"
  },
  "tradeChecker_71": {
    "fr": "Ton analyse en cours sera effacée. Tu ne pourras pas la récupérer.",
    "en": "Your ongoing analysis will be cleared. You won't be able to recover it."
  },
  "tradeChecker_72": {
    "fr": "Annuler",
    "en": "Cancel"
  },
  "tradeChecker_73": {
    "fr": "Réinitialiser",
    "en": "Reset"
  },
  "tradeChecker_74": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "tradeChecker_75": {
    "fr": "Mentions légales",
    "en": "Legal notice"
  },
  "tradeChecker_76": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "tradeChecker_77": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "tradeChecker_78": {
    "fr": "CGV",
    "en": "T&Cs"
  },
  "tradeChecker_79": {
    "fr": "Gérer les cookies",
    "en": "Manage cookies"
  },
  "tradeChecker_80": {
    "fr": "Contact",
    "en": "Contact"
  },
  "tradingview_1": {
    "fr": "Chapitre 2 — Configuration TradingView",
    "en": "Chapter 2 — TradingView Setup"
  },
  "tradingview_2": {
    "fr": "← Sommaire",
    "en": "← Table of Contents"
  },
  "tradingview_3": {
    "fr": "\n          Votre navigateur ne prend pas en charge la vidéo HTML5.\n        ",
    "en": "\n          Your browser does not support HTML5 video.\n        "
  },
  "tradingview_4": {
    "fr": "\n        🎥 Suis ce guide pour dupliquer exactement ma configuration TradingView.\n      ",
    "en": "\n        🎥 Follow this guide to duplicate my TradingView setup exactly.\n      "
  },
  "tradingview_5": {
    "fr": "Code couleur des zones",
    "en": "Zone Color Code"
  },
  "tradingview_6": {
    "fr": "Monthly — orange",
    "en": "Monthly — orange"
  },
  "tradingview_7": {
    "fr": "Weekly — bleu",
    "en": "Weekly — blue"
  },
  "tradingview_8": {
    "fr": "Daily — blanc",
    "en": "Daily — white"
  },
  "tradingview_9": {
    "fr": "4H — noir",
    "en": "4H — black"
  },
  "tradingview_10": {
    "fr": "Outils utilisés",
    "en": "Tools Used"
  },
  "tradingview_11": {
    "fr": "Retracement de Fibonacci",
    "en": "Fibonacci Retracement"
  },
  "tradingview_12": {
    "fr": "Niveaux clés (100 / 78.6 / 61.8…) pour repérer les retracements et les zones d’intérêt.",
    "en": "Key levels (100 / 78.6 / 61.8…) to spot retracements and zones of interest."
  },
  "tradingview_13": {
    "fr": "Rectangles",
    "en": "Rectangles"
  },
  "tradingview_14": {
    "fr": "Délimiter visuellement les zones de liquidité, ranges et supply & demand.",
    "en": "Visually mark liquidity zones, ranges, and supply & demand."
  },
  "tradingview_15": {
    "fr": "Lignes horizontales",
    "en": "Horizontal Lines"
  },
  "tradingview_16": {
    "fr": "Tracer les niveaux par unité de temps (Monthly / Weekly / Daily / 4H) en respectant le code couleur.",
    "en": "Draw levels by timeframe (Monthly / Weekly / Daily / 4H) following the color code."
  },
  "tradingview_17": {
    "fr": "Texte ancré",
    "en": "Anchored Text"
  },
  "tradingview_18": {
    "fr": "Annoter proprement les zones et niveaux pour garder une lecture claire et disciplinée.",
    "en": "Neatly annotate zones and levels to keep a clear, disciplined reading."
  },
  "tradingview_19": {
    "fr": "Étape suivante",
    "en": "Next Step"
  },
  "tradingview_20": {
    "fr": "Passe au chapitre 3 pour structurer ton analyse technique avec des règles simples et reproductibles.",
    "en": "Move on to chapter 3 to structure your technical analysis with simple, repeatable rules."
  },
  "tradingview_21": {
    "fr": "Revenir au Chapitre précédent — Fondation",
    "en": "Back to Previous Chapter — Foundation"
  },
  "tradingview_22": {
    "fr": "Passer au Chapitre 3 — Analyse technique",
    "en": "Go to Chapter 3 — Technical Analysis"
  },
  "tradingview_23": {
    "fr": "© 2026 — Wavest | Tous droits réservés",
    "en": "© 2026 — Wavest | All rights reserved"
  },
  "tradingview_24": {
    "fr": "Mentions légales",
    "en": "Legal Notice"
  },
  "tradingview_25": {
    "fr": "Confidentialité",
    "en": "Privacy"
  },
  "tradingview_26": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "tradingview_27": {
    "fr": "CGV",
    "en": "Terms of Sale"
  },
  "tradingview_28": {
    "fr": "Gérer les cookies",
    "en": "Manage Cookies"
  },
  "tradingview_29": {
    "fr": "Contact",
    "en": "Contact"
  },
  "pageTitle_cgv": {
    "fr": "CGV — Wavest",
    "en": "Terms & Conditions — Wavest"
  },
  "pageTitle_confidentialite": {
    "fr": "Confidentialité — Wavest",
    "en": "Privacy Policy — Wavest"
  },
  "pageTitle_cookies": {
    "fr": "Cookies — Wavest",
    "en": "Cookies — Wavest"
  },
  "pageTitle_mentionsLegales": {
    "fr": "Mentions légales — Wavest",
    "en": "Legal Notice — Wavest"
  },
  "pageTitle_analyseTechnique": {
    "fr": "Chapitre 3 — Analyse technique",
    "en": "Chapter 3 — Technical Analysis"
  },
  "pageTitle_analyseTechniqueForexDebutant": {
    "fr": "Analyse technique Forex : les bases pour lire un graphique — Wavest",
    "en": "Forex Technical Analysis: The Basics of Reading a Chart — Wavest"
  },
  "pageTitle_backtestTradingMethode": {
    "fr": "Backtest en trading : comment tester une méthode avant de trader en réel — Wavest",
    "en": "Trading Backtesting: How to Test a Method Before Trading Live — Wavest"
  },
  "pageTitle_calculateurLotForex": {
    "fr": "Calculateur de lot Forex : comment bien dimensionner ses positions — Wavest",
    "en": "Forex Lot Size Calculator: How to Size Your Positions Correctly — Wavest"
  },
  "pageTitle_checklistTradingAvantTrade": {
    "fr": "Checklist trading : ce qu'il faut valider avant chaque trade — Wavest",
    "en": "Trading Checklist: What to Check Before Every Trade — Wavest"
  },
  "pageTitle_choisirFormationTradingForex": {
    "fr": "Formation trading Forex : comment bien choisir — Wavest",
    "en": "Forex Trading Course: How to Choose the Right One — Wavest"
  },
  "pageTitle_devenirRentableTradingForex": {
    "fr": "Combien de temps pour devenir rentable en trading Forex ? — Wavest",
    "en": "How Long Does It Take to Become Profitable in Forex Trading? — Wavest"
  },
  "pageTitle_guideDebutantTradingForex": {
    "fr": "Apprendre le trading Forex en débutant : le guide complet — Wavest",
    "en": "Learning Forex Trading as a Beginner: The Complete Guide — Wavest"
  },
  "pageTitle_moneyManagementForex": {
    "fr": "Money management Forex : combien risquer par trade ? — Wavest",
    "en": "Forex Money Management: How Much to Risk Per Trade? — Wavest"
  },
  "pageTitle_psychologieDisciplineTrading": {
    "fr": "Psychologie du trading : pourquoi la discipline compte plus que la stratégie — Wavest",
    "en": "Trading Psychology: Why Discipline Matters More Than Strategy — Wavest"
  },
  "pageTitle_signauxTradingForex": {
    "fr": "Signaux de trading Forex : pourquoi ils ne suffisent pas — Wavest",
    "en": "Forex Trading Signals: Why They're Not Enough — Wavest"
  },
  "pageTitle_calculateurLot": {
    "fr": "Calculateur de lot — Wavest",
    "en": "Lot Size Calculator — Wavest"
  },
  "pageTitle_dashboard": {
    "fr": "Dashboard de progression — Wavest",
    "en": "Progress Dashboard — Wavest"
  },
  "pageTitle_fondation": {
    "fr": "Chapitre 1 — Fondation",
    "en": "Chapter 1 — Foundation"
  },
  "pageTitle_horlogeSessions": {
    "fr": "Horloge des sessions — Wavest",
    "en": "Session Clock — Wavest"
  },
  "pageTitle_moneyManagement": {
    "fr": "Chapitre 4 — Money Management",
    "en": "Chapter 4 — Money Management"
  },
  "pageTitle_performancePatterns": {
    "fr": "Performance des patterns — Wavest",
    "en": "Pattern Performance — Wavest"
  },
  "pageTitle_psychologieDiscipline": {
    "fr": "Chapitre 6 — Psychologie & Discipline",
    "en": "Chapter 6 — Psychology & Discipline"
  },
  "pageTitle_setup": {
    "fr": "Chapitre 5 — Setup | Wavest",
    "en": "Chapter 5 — Setup | Wavest"
  },
  "pageTitle_simulateurCroissance": {
    "fr": "Simulateur de croissance de capital — Wavest",
    "en": "Capital Growth Simulator — Wavest"
  },
  "pageTitle_tradeChecker": {
    "fr": "Trade Checker — Wavest",
    "en": "Trade Checker — Wavest"
  },
  "pageTitle_tradingview": {
    "fr": "Chapitre 2 — Configuration TradingView",
    "en": "Chapter 2 — TradingView Setup"
  },
  "memberBadge": {
    "fr": "Membres",
    "en": "Members"
  },
  "testimonialEyebrow": {
    "fr": "Peu d'élèves, mais un suivi individuel pour chacun",
    "en": "Few students, but individual follow-up for each one"
  },
  "proofCtaBtn": {
    "fr": "Recevoir le backtest",
    "en": "Get the backtest"
  },
  "proofCardTitle": {
    "fr": "La preuve, sans filtre",
    "en": "The proof, unfiltered"
  },
  "proofCardText": {
    "fr": "800+ trades documentés (2022-2025), capture TradingView à l'appui pour chacun. Laisse ton email, tu reçois l'accès direct.",
    "en": "800+ documented trades (2022-2025), with a TradingView screenshot for each. Leave your email, get direct access."
  },
  "performancePatterns_34": {
    "fr": "Combos · par pattern daily",
    "en": "Combos · by daily pattern"
  },
  "performancePatterns_35": {
    "fr": "Meilleure combo · toutes patterns confondues",
    "en": "Best combo · across all patterns"
  },
  "performancePatterns_36": {
    "fr": "Trouve directement ta combinaison",
    "en": "Find your combo instantly"
  },
  "performancePatterns_37": {
    "fr": "Repère le pattern que tu identifies sur ton graphique : la combinaison de contexte la plus performante associée s'affiche juste en dessous, avec ses statistiques.",
    "en": "Spot the pattern on your chart: the best-performing context combo for it shows up right below, with its stats."
  },
  "performancePatterns_38": { "fr": "Contexte", "en": "Context" },
  "performancePatterns_39": { "fr": "Trades", "en": "Trades" },
  "performancePatterns_40": { "fr": "Winrate", "en": "Winrate" },
  "performancePatterns_41": { "fr": "RR moyen", "en": "Avg RR" },
  "performancePatterns_42": { "fr": "Score", "en": "Score" },
  "performancePatterns_43": { "fr": "% de trades gagnants sur le total pris.", "en": "% of winning trades out of all trades taken." },
  "performancePatterns_44": { "fr": "RR moyen", "en": "Avg RR" },
  "performancePatterns_45": { "fr": "Gain moyen encaissé par trade, en multiple du risque pris (1€ risqué → x€ gagné en moyenne).", "en": "Average gain per trade, as a multiple of the risk taken (1€ risked → x€ won on average)." },
  "performancePatterns_46": { "fr": "Score", "en": "Score" },
  "performancePatterns_47": { "fr": "Note globale qui combine winrate, RR et nombre de trades : plus il est haut, plus la combo est fiable.", "en": "Overall rating combining winrate, RR and sample size: the higher it is, the more reliable the combo." },
  "pageTitle_calendrierEconomique": {
    "fr": "Calendrier économique — Wavest",
    "en": "Economic Calendar — Wavest"
  },
  "calendrierEco_1": {
    "fr": "Calendrier économique",
    "en": "Economic calendar"
  },
  "calendrierEco_2": {
    "fr": "← Sommaire",
    "en": "← Table of contents"
  },
  "calendrierEco_3": {
    "fr": "Taux d'intérêt, NFP, discours des banquiers centraux : ça peut faire bouger le marché en quelques secondes. Un œil dessus avant chaque trade — toujours.",
    "en": "Rate decisions, NFP, central bank speeches — they can move the market in seconds. Check before every trade, always."
  },
  "calendrierEco_4": {
    "fr": "⚠️ Le calendrier ne constitue pas un conseil en investissement et le trading comporte des risques de perte en capital.",
    "en": "⚠️ This calendar is not investment advice and trading involves a risk of capital loss."
  },
  "calendrierEco_5": {
    "fr": "Contact",
    "en": "Contact"
  },
  "calendrierEco_6": {
    "fr": "Cookies",
    "en": "Cookies"
  },
  "calendrierEco_7": {
    "fr": "Vérifier sur ForexFactory",
    "en": "Check on ForexFactory"
  },
  "calendrierEco_8": {
    "fr": "Discours de banquiers centraux, annonces surprises : la référence à garder sous la main.",
    "en": "Central bank speeches, surprise announcements: the reference to keep handy."
  }
};

  function getLang() {
    var stored = localStorage.getItem(STORAGE_KEY);
    return stored === "en" ? "en" : "fr";
  }

  function setLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    applyLang(lang);
  }

  function applyLang(lang) {
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var entry = translations[key];
      if (entry) el.textContent = entry[lang] || entry.fr;
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      var entry = translations[key];
      if (entry) el.innerHTML = entry[lang] || entry.fr;
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria-label");
      var entry = translations[key];
      if (entry) el.setAttribute("aria-label", entry[lang] || entry.fr);
    });

    var titleKey = document.body.getAttribute("data-i18n-title");
    if (titleKey && translations[titleKey]) {
      document.title = translations[titleKey][lang] || translations[titleKey].fr;
    }

    var toggle = document.getElementById("langToggle");
    if (toggle) {
      toggle.setAttribute("aria-pressed", lang === "en" ? "true" : "false");
      toggle.setAttribute("aria-checked", lang === "en" ? "true" : "false");
      toggle.classList.toggle("is-en", lang === "en");
    }
  }

  window.WavestI18n = {
    getLang: getLang,
    setLang: setLang,
    applyLang: function (lang) { applyLang(lang || getLang()); }
  };

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(getLang());
    var toggle = document.getElementById("langToggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        setLang(getLang() === "fr" ? "en" : "fr");
      });
    }
  });
})();
