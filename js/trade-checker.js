/* =============================================================
   TRADE CHECKER — logique isolée (chargé après app.js)
============================================================= */

(() => {
"use strict";

/* =====================================================
   WAVEST TRADE CHECKER — SCRIPT PREMIUM V2
===================================================== */


/* =====================================================
   1. BASE PATTERNS DAILY
===================================================== */

const patternsDatabase = {
  "IETE": { sens: "Haussière", couleur: "Vert" },
  "M1 small": { sens: "Haussière", couleur: "Vert" },
  "M1 big": { sens: "Haussière", couleur: "Vert" },
  "M2": { sens: "Haussière", couleur: "Vert" },
  "M3": { sens: "Haussière", couleur: "Vert" },
  "M4": { sens: "Haussière", couleur: "Vert" },
  "M5": { sens: "Haussière", couleur: "Vert" },

  "ETE": { sens: "Baissière", couleur: "Rouge" },
  "W1 small": { sens: "Baissière", couleur: "Rouge" },
  "W1 big": { sens: "Baissière", couleur: "Rouge" },
  "W2": { sens: "Baissière", couleur: "Rouge" },
  "W3": { sens: "Baissière", couleur: "Rouge" },
  "W4": { sens: "Baissière", couleur: "Rouge" },
  "W5": { sens: "Baissière", couleur: "Rouge" }
};


/* =====================================================
   2. BASE CONFIRMATIONS 4H
===================================================== */

const confirmationsDatabase = {
  "IETE": [
    "Deceleration",
    "FC-27",
    "FC-68",
    "M with bos",
    "M without bos",
    "IETE with bos",
    "IETE without bos"
  ],

  "M1 small": [
    "Deceleration",
    "FC-27",
    "FC-68",
    "M with bos",
    "M without bos",
    "IETE with bos",
    "IETE without bos"
  ],

  "M1 big": [
    "M with bos",
    "M without bos",
    "IETE with bos",
    "IETE without bos"
  ],

  "M2": [
    "FC-27",
    "FC-68"
  ],

  "M3": [
    "Deceleration",
    "FC-27",
    "FC-68",
    "M with bos",
    "M without bos",
    "IETE with bos",
    "IETE without bos"
  ],

  "M4": [
    "M with bos",
    "M without bos",
    "IETE with bos",
    "IETE without bos"
  ],

  "M5": [
    "M with bos",
    "M without bos",
    "IETE with bos",
    "IETE without bos"
  ],

  "ETE": [
    "Deceleration",
    "FC-27",
    "FC-68",
    "W with bos",
    "W without bos",
    "ETE with bos",
    "ETE without bos"
  ],

  "W1 small": [
    "Deceleration",
    "FC-27",
    "FC-68",
    "W with bos",
    "W without bos",
    "ETE with bos",
    "ETE without bos"
  ],

  "W1 big": [
    "W with bos",
    "W without bos",
    "ETE with bos",
    "ETE without bos"
  ],

  "W2": [
    "FC-27",
    "FC-68"
  ],

  "W3": [
    "Deceleration",
    "FC-27",
    "FC-68",
    "W with bos",
    "W without bos",
    "ETE with bos",
    "ETE without bos"
  ],

  "W4": [
    "W with bos",
    "W without bos",
    "ETE with bos",
    "ETE without bos"
  ],

  "W5": [
    "W with bos",
    "W without bos",
    "ETE with bos",
    "ETE without bos"
  ]
};


/* =====================================================
   3. BASE RÈGLES 4H
===================================================== */

const rulesDatabase = {
  "Deceleration": [
    { text: "Prix impulsif", required: true },
    { text: "Mèche de rejet sur la 1ère bougie", required: true },
    { text: "3 mèches dans ma zone de ralentissement", required: true },
    { text: "1 bougie dans mon sens", required: true },
    { text: "Prix d’entrée sur la 4ème bougie", required: true },
    { text: "SL sous la mèche la plus basse + arrondi à 10 pips", required: true },
    { text: "Si RR > 10 doubler le SL", required: true },
    { text: "Pas de M1/W1 big en Daily", required: true },
    { text: "Favoriser le ralentissement s’il y a un FC-27/68 valide", required: true }
  ],

  "FC-27": [
    { text: "Pas de M1/W1 big ou M5 en Daily", required: true },
    { text: "Le prix doit être correctif", required: true },
    { text: "-0.27 dans ZOI Daily", required: true },
    { text: "PE -0.27 SL -0.68 ou 100% Daily", required: true }
  ],

  "FC-68": [
    { text: "Pas de M1/W1 big ou M5 en Daily", required: true },
    { text: "Le prix doit être correctif", required: true },
    { text: "-0.68 dans ZOI Daily", required: true },
    { text: "PE -0.68 SL comme d’habitude", required: true }
  ],

  "IETE with bos": [
    { text: "SL sous la tête si sans cassure sinon sous l’épaule gauche", required: true },
    { text: "Favoriser IETE avec tête et cou qui cassent l’épaule gauche", required: false },
    { text: "Tendance haussière en 4H", required: false },
    { text: "Zone de polarité", required: false },
    { text: "Couplé avec un M (entrer sur le P1)", required: false }
  ],

  "IETE without bos": [
    { text: "SL sous la tête si sans cassure sinon sous l’épaule gauche", required: true },
    { text: "Favoriser IETE avec tête et cou qui cassent l’épaule gauche", required: false },
    { text: "Tendance haussière en 4H", required: false },
    { text: "Zone de polarité", required: false },
    { text: "Couplé avec un M (entrer sur le P1)", required: false }
  ],

  "ETE with bos": [
    { text: "SL dessus la tête si sans cassure sinon sous l’épaule gauche", required: true },
    { text: "Attendre toujours au moins 2 bougies si le prix descend avec impulsion", required: true },
    { text: "Avec tête et cou qui cassent l’épaule gauche", required: true }
  ],

  "ETE without bos": [
    { text: "SL dessus la tête si sans cassure sinon sous l’épaule gauche", required: true },
    { text: "Attendre toujours au moins 2 bougies si le prix descend avec impulsion", required: true },
    { text: "Avec tête et cou qui cassent l’épaule gauche", required: true }
  ]
};


/* =====================================================
   4. BASE STATS
===================================================== */

const statsDatabase = {
  "ETE | Deceleration": { nbTrades: 9, wins: 4, loss: 2, winrate: 44.44, rrMoyen: 0.33, gainTotal: 3.01, score: 1.34 },
  "ETE | ETE with bos": { nbTrades: 7, wins: 3, loss: 0, winrate: 42.86, rrMoyen: 0.56, gainTotal: 3.95, score: 1.69 },
  "ETE | ETE without bos": { nbTrades: 6, wins: 4, loss: 2, winrate: 66.67, rrMoyen: 0.30, gainTotal: 1.82, score: 1.21 },
  "ETE | FC-27": { nbTrades: 11, wins: 8, loss: 2, winrate: 72.73, rrMoyen: 0.76, gainTotal: 8.38, score: 6.09 },
  "ETE | FC-68": { nbTrades: 8, wins: 4, loss: 1, winrate: 50.00, rrMoyen: 0.91, gainTotal: 7.24, score: 3.62 },
  "ETE | W with bos": { nbTrades: 11, wins: 7, loss: 2, winrate: 63.64, rrMoyen: 0.54, gainTotal: 5.98, score: 3.81 },
  "ETE | W without bos": { nbTrades: 19, wins: 9, loss: 8, winrate: 47.37, rrMoyen: 0.04, gainTotal: 0.85, score: 0.40 },

  "IETE | Deceleration": { nbTrades: 10, wins: 4, loss: 3, winrate: 40.00, rrMoyen: 0.48, gainTotal: 4.84, score: 1.94 },
  "IETE | FC-27": { nbTrades: 6, wins: 4, loss: 2, winrate: 66.67, rrMoyen: 0.65, gainTotal: 3.90, score: 2.60 },
  "IETE | FC-68": { nbTrades: 5, wins: 3, loss: 1, winrate: 60.00, rrMoyen: 0.52, gainTotal: 2.61, score: 1.57 },
  "IETE | IETE with bos": { nbTrades: 10, wins: 5, loss: 5, winrate: 50.00, rrMoyen: 0.19, gainTotal: 1.87, score: 0.94 },
  "IETE | IETE without bos": { nbTrades: 6, wins: 2, loss: 2, winrate: 33.33, rrMoyen: -0.05, gainTotal: -0.31, score: -0.10 },
  "IETE | M with bos": { nbTrades: 9, wins: 4, loss: 3, winrate: 44.44, rrMoyen: 0.78, gainTotal: 7.04, score: 3.13 },
  "IETE | M without bos": { nbTrades: 20, wins: 12, loss: 3, winrate: 60.00, rrMoyen: 0.90, gainTotal: 17.93, score: 10.76 },
  "IETE | W without bos": { nbTrades: 1, wins: 0, loss: 0, winrate: 0.00, rrMoyen: 0.00, gainTotal: 0.00, score: 0.00 },

  "M1 big | Deceleration": { nbTrades: 2, wins: 1, loss: 0, winrate: 50.00, rrMoyen: 1.65, gainTotal: 3.29, score: 1.65 },
  "M1 big | FC-27": { nbTrades: 2, wins: 2, loss: 0, winrate: 100.00, rrMoyen: 2.16, gainTotal: 4.31, score: 4.31 },
  "M1 big | ETE with bos": { nbTrades: 10, wins: 1, loss: 3, winrate: 10.00, rrMoyen: -0.10, gainTotal: -0.96, score: -0.10 },
  "M1 big | IETE without bos": { nbTrades: 7, wins: 5, loss: 2, winrate: 71.43, rrMoyen: 1.57, gainTotal: 10.98, score: 7.84 },
  "M1 big | M with bos": { nbTrades: 15, wins: 5, loss: 8, winrate: 33.33, rrMoyen: -0.07, gainTotal: -1.12, score: -0.37 },
  "M1 big | M without bos": { nbTrades: 32, wins: 19, loss: 7, winrate: 59.38, rrMoyen: 0.96, gainTotal: 30.81, score: 18.29 },
  "M1 big | W without bos": { nbTrades: 1, wins: 0, loss: 1, winrate: 0.00, rrMoyen: -1.00, gainTotal: -1.00, score: 0.00 },

  "M1 small | Deceleration": { nbTrades: 13, wins: 4, loss: 5, winrate: 30.77, rrMoyen: 0.61, gainTotal: 7.95, score: 2.45 },
  "M1 small | FC-27": { nbTrades: 8, wins: 5, loss: 2, winrate: 62.50, rrMoyen: 0.39, gainTotal: 3.14, score: 1.96 },
  "M1 small | FC-68": { nbTrades: 3, wins: 2, loss: 0, winrate: 66.67, rrMoyen: 1.07, gainTotal: 3.21, score: 2.14 },
  "M1 small | IETE with bos": { nbTrades: 2, wins: 1, loss: 0, winrate: 50.00, rrMoyen: 0.54, gainTotal: 1.07, score: 0.54 },
  "M1 small | IETE without bos": { nbTrades: 5, wins: 2, loss: 0, winrate: 40.00, rrMoyen: 0.36, gainTotal: 1.82, score: 0.73 },
  "M1 small | M with bos": { nbTrades: 3, wins: 2, loss: 1, winrate: 66.67, rrMoyen: 0.76, gainTotal: 2.28, score: 1.52 },
  "M1 small | M without bos": { nbTrades: 15, wins: 12, loss: 2, winrate: 80.00, rrMoyen: 1.29, gainTotal: 19.36, score: 15.49 },
  "M1 small | W without bos": { nbTrades: 1, wins: 0, loss: 0, winrate: 0.00, rrMoyen: 0.00, gainTotal: 0.00, score: 0.00 },

  "M2 | FC-27": { nbTrades: 6, wins: 5, loss: 1, winrate: 83.33, rrMoyen: 0.79, gainTotal: 4.75, score: 3.96 },
  "M2 | FC-68": { nbTrades: 3, wins: 1, loss: 1, winrate: 33.33, rrMoyen: 0.00, gainTotal: 0.00, score: 0.00 },
  "M2 | IETE with bos": { nbTrades: 5, wins: 3, loss: 1, winrate: 60.00, rrMoyen: 0.49, gainTotal: 2.45, score: 1.47 },
  "M2 | IETE without bos": { nbTrades: 2, wins: 2, loss: 0, winrate: 100.00, rrMoyen: 3.36, gainTotal: 6.71, score: 6.71 },
  "M2 | M without bos": { nbTrades: 5, wins: 3, loss: 1, winrate: 60.00, rrMoyen: 0.42, gainTotal: 2.12, score: 1.27 },

  "M3 | Deceleration": { nbTrades: 1, wins: 0, loss: 1, winrate: 0.00, rrMoyen: -1.00, gainTotal: -1.00, score: 0.00 },
  "M3 | FC-27": { nbTrades: 2, wins: 2, loss: 0, winrate: 100.00, rrMoyen: 1.21, gainTotal: 2.41, score: 2.41 },
  "M3 | FC-68": { nbTrades: 1, wins: 0, loss: 0, winrate: 0.00, rrMoyen: 0.00, gainTotal: 0.00, score: 0.00 },
  "M3 | IETE with bos": { nbTrades: 3, wins: 0, loss: 2, winrate: 0.00, rrMoyen: -0.67, gainTotal: -2.00, score: 0.00 },
  "M3 | IETE without bos": { nbTrades: 5, wins: 3, loss: 1, winrate: 60.00, rrMoyen: 0.68, gainTotal: 3.42, score: 2.05 },
  "M3 | M with bos": { nbTrades: 3, wins: 1, loss: 1, winrate: 33.33, rrMoyen: 0.06, gainTotal: 0.19, score: 0.06 },
  "M3 | M without bos": { nbTrades: 4, wins: 3, loss: 1, winrate: 75.00, rrMoyen: 0.68, gainTotal: 2.72, score: 2.04 },

  "M4 | Deceleration": { nbTrades: 10, wins: 3, loss: 4, winrate: 30.00, rrMoyen: -0.02, gainTotal: -0.19, score: -0.06 },
  "M4 | FC-27": { nbTrades: 1, wins: 0, loss: 0, winrate: 0.00, rrMoyen: 0.00, gainTotal: 0.00, score: 0.00 },
  "M4 | IETE with bos": { nbTrades: 10, wins: 4, loss: 3, winrate: 40.00, rrMoyen: 0.86, gainTotal: 8.64, score: 3.46 },
  "M4 | IETE without bos": { nbTrades: 7, wins: 3, loss: 4, winrate: 42.86, rrMoyen: 0.32, gainTotal: 2.23, score: 0.96 },
  "M4 | M with bos": { nbTrades: 4, wins: 4, loss: 0, winrate: 100.00, rrMoyen: 1.25, gainTotal: 5.01, score: 5.01 },
  "M4 | M without bos": { nbTrades: 9, wins: 6, loss: 1, winrate: 66.67, rrMoyen: 0.94, gainTotal: 8.45, score: 5.63 },

  "M5 | Deceleration": { nbTrades: 10, wins: 4, loss: 3, winrate: 40.00, rrMoyen: 0.17, gainTotal: 1.67, score: 0.67 },
  "M5 | IETE with bos": { nbTrades: 14, wins: 6, loss: 7, winrate: 42.86, rrMoyen: 0.31, gainTotal: 4.40, score: 1.89 },
  "M5 | IETE without bos": { nbTrades: 13, wins: 6, loss: 3, winrate: 46.15, rrMoyen: 0.50, gainTotal: 6.49, score: 3.00 },
  "M5 | M with bos": { nbTrades: 11, wins: 6, loss: 3, winrate: 54.55, rrMoyen: 0.25, gainTotal: 2.79, score: 1.52 },
  "M5 | M without bos": { nbTrades: 31, wins: 19, loss: 9, winrate: 61.29, rrMoyen: 0.53, gainTotal: 16.52, score: 10.13 },

  "W1 big | Deceleration": { nbTrades: 3, wins: 0, loss: 2, winrate: 0.00, rrMoyen: -0.67, gainTotal: -2.00, score: 0.00 },
  "W1 big | ETE with bos": { nbTrades: 11, wins: 4, loss: 6, winrate: 36.36, rrMoyen: 0.27, gainTotal: 3.02, score: 1.10 },
  "W1 big | ETE without bos": { nbTrades: 13, wins: 6, loss: 6, winrate: 46.15, rrMoyen: 0.25, gainTotal: 3.19, score: 1.47 },
  "W1 big | FC-27": { nbTrades: 2, wins: 2, loss: 0, winrate: 100.00, rrMoyen: 2.38, gainTotal: 4.75, score: 4.75 },
  "W1 big | M without bos": { nbTrades: 4, wins: 2, loss: 2, winrate: 50.00, rrMoyen: 1.03, gainTotal: 4.11, score: 2.06 },
  "W1 big | W with bos": { nbTrades: 9, wins: 1, loss: 5, winrate: 11.11, rrMoyen: -0.43, gainTotal: -3.84, score: -0.43 },
  "W1 big | W without bos": { nbTrades: 21, wins: 1, loss: 15, winrate: 4.76, rrMoyen: -0.63, gainTotal: -13.18, score: -0.63 },

  "W1 small | Deceleration": { nbTrades: 3, wins: 1, loss: 1, winrate: 33.33, rrMoyen: 0.00, gainTotal: 0.00, score: 0.00 },
  "W1 small | ETE with bos": { nbTrades: 3, wins: 2, loss: 1, winrate: 66.67, rrMoyen: 1.55, gainTotal: 4.66, score: 3.11 },
  "W1 small | ETE without bos": { nbTrades: 4, wins: 3, loss: 1, winrate: 75.00, rrMoyen: 0.36, gainTotal: 1.43, score: 1.07 },
  "W1 small | FC-27": { nbTrades: 4, wins: 2, loss: 1, winrate: 50.00, rrMoyen: 0.79, gainTotal: 3.15, score: 1.58 },
  "W1 small | FC-68": { nbTrades: 3, wins: 1, loss: 1, winrate: 33.33, rrMoyen: 0.33, gainTotal: 1.00, score: 0.33 },
  "W1 small | IETE with bos": { nbTrades: 1, wins: 1, loss: 0, winrate: 100.00, rrMoyen: 1.39, gainTotal: 1.39, score: 1.39 },
  "W1 small | W with bos": { nbTrades: 7, wins: 3, loss: 4, winrate: 42.86, rrMoyen: -0.30, gainTotal: -2.12, score: -0.91 },
  "W1 small | W without bos": { nbTrades: 8, wins: 4, loss: 2, winrate: 50.00, rrMoyen: 0.72, gainTotal: 5.78, score: 2.89 },

  "W2 | Deceleration": { nbTrades: 2, wins: 0, loss: 0, winrate: 0.00, rrMoyen: 0.00, gainTotal: 0.00, score: 0.00 },
  "W2 | ETE with bos": { nbTrades: 3, wins: 1, loss: 1, winrate: 33.33, rrMoyen: 0.00, gainTotal: 0.00, score: 0.00 },
  "W2 | ETE without bos": { nbTrades: 4, wins: 1, loss: 2, winrate: 25.00, rrMoyen: -0.39, gainTotal: -1.56, score: -0.39 },
  "W2 | FC-27": { nbTrades: 3, wins: 1, loss: 1, winrate: 33.33, rrMoyen: -0.18, gainTotal: -0.55, score: -0.18 },
  "W2 | FC-68": { nbTrades: 5, wins: 4, loss: 0, winrate: 80.00, rrMoyen: 1.99, gainTotal: 9.96, score: 7.97 },
  "W2 | W with bos": { nbTrades: 2, wins: 1, loss: 0, winrate: 50.00, rrMoyen: 1.40, gainTotal: 2.79, score: 1.40 },
  "W2 | W without bos": { nbTrades: 4, wins: 2, loss: 1, winrate: 50.00, rrMoyen: -0.03, gainTotal: -0.10, score: -0.05 },

  "W3 | ETE with bos": { nbTrades: 1, wins: 1, loss: 0, winrate: 100.00, rrMoyen: 1.00, gainTotal: 1.00, score: 1.00 },
  "W3 | ETE without bos": { nbTrades: 2, wins: 1, loss: 0, winrate: 50.00, rrMoyen: 1.57, gainTotal: 3.13, score: 1.57 },
  "W3 | FC-27": { nbTrades: 3, wins: 2, loss: 0, winrate: 66.67, rrMoyen: 1.38, gainTotal: 4.15, score: 2.77 },
  "W3 | FC-68": { nbTrades: 3, wins: 1, loss: 2, winrate: 33.33, rrMoyen: -0.56, gainTotal: -1.69, score: -0.56 },
  "W3 | W without bos": { nbTrades: 5, wins: 1, loss: 3, winrate: 20.00, rrMoyen: -0.15, gainTotal: -0.74, score: -0.15 },

  "W4 | Deceleration": { nbTrades: 3, wins: 0, loss: 1, winrate: 0.00, rrMoyen: -0.33, gainTotal: -1.00, score: 0.00 },
  "W4 | ETE without bos": { nbTrades: 1, wins: 0, loss: 1, winrate: 0.00, rrMoyen: -1.00, gainTotal: -1.00, score: 0.00 },
  "W4 | FC-27": { nbTrades: 4, wins: 1, loss: 1, winrate: 25.00, rrMoyen: 0.65, gainTotal: 2.60, score: 0.65 },
  "W4 | FC-68": { nbTrades: 2, wins: 1, loss: 1, winrate: 50.00, rrMoyen: 2.74, gainTotal: 5.48, score: 2.74 },
  "W4 | W with bos": { nbTrades: 2, wins: 0, loss: 1, winrate: 0.00, rrMoyen: -0.50, gainTotal: -1.00, score: 0.00 },
  "W4 | W without bos": { nbTrades: 9, wins: 4, loss: 3, winrate: 44.44, rrMoyen: 0.65, gainTotal: 5.82, score: 2.59 },

  "W5 | Deceleration": { nbTrades: 8, wins: 4, loss: 2, winrate: 50.00, rrMoyen: 0.58, gainTotal: 4.67, score: 2.34 },
  "W5 | ETE with bos": { nbTrades: 7, wins: 3, loss: 4, winrate: 42.86, rrMoyen: 0.12, gainTotal: 0.87, score: 0.37 },
  "W5 | ETE without bos": { nbTrades: 8, wins: 2, loss: 6, winrate: 25.00, rrMoyen: -0.02, gainTotal: -0.16, score: -0.04 },
  "W5 | IETE with bos": { nbTrades: 1, wins: 0, loss: 1, winrate: 0.00, rrMoyen: -1.00, gainTotal: -1.00, score: 0.00 },
  "W5 | M without bos": { nbTrades: 1, wins: 1, loss: 0, winrate: 100.00, rrMoyen: 1.93, gainTotal: 1.93, score: 1.93 },
  "W5 | W with bos": { nbTrades: 2, wins: 0, loss: 1, winrate: 0.00, rrMoyen: -0.50, gainTotal: -1.00, score: 0.00 },
  "W5 | W without bos": { nbTrades: 22, wins: 17, loss: 3, winrate: 77.27, rrMoyen: 1.24, gainTotal: 27.28, score: 21.08 }
};


/* =====================================================
   5. RÉCUPÉRATION DES ÉLÉMENTS HTML
===================================================== */

const dailyTrend = document.getElementById("dailyTrend");
const dailyPattern = document.getElementById("dailyPattern");
const patternDirection = document.getElementById("patternDirection");
const dailyValidation = document.getElementById("dailyValidation");

const weeklyFav = document.getElementById("weeklyFav");
const weeklyValidation = document.getElementById("weeklyValidation");

const confirmation4h = document.getElementById("confirmation4h");
const validation4h = document.getElementById("validation4h");

const rulesList = document.getElementById("rulesList");
const rulesValidation = document.getElementById("rulesValidation");

const finalVerdict = document.getElementById("finalVerdict");

const comboAnalyse = document.getElementById("comboAnalyse");
const nbTrades = document.getElementById("nbTrades");
const winrate = document.getElementById("winrate");
const rrMoyen = document.getElementById("rrMoyen");
const gainTotal = document.getElementById("gainTotal");
const score = document.getElementById("score");

const readNbTrades = document.getElementById("readNbTrades");
const readWinrate = document.getElementById("readWinrate");
const readRR = document.getElementById("readRR");
const readGain = document.getElementById("readGain");
const readScore = document.getElementById("readScore");
const readGlobal = document.getElementById("readGlobal");

const resetBtn = document.getElementById("resetBtn");
const resetModalOverlay = document.getElementById("resetModalOverlay");
const resetCancelBtn = document.getElementById("resetCancelBtn");
const resetConfirmBtn = document.getElementById("resetConfirmBtn");

const radarDataPolygon = document.getElementById("radarDataPolygon");
const radarWinrateValue = document.getElementById("radarWinrateValue");
const radarRRValue = document.getElementById("radarRRValue");
const radarScoreValue = document.getElementById("radarScoreValue");
const radarGainValue = document.getElementById("radarGainValue");
const radarVolumeValue = document.getElementById("radarVolumeValue");
const radarMaitriseValue = document.getElementById("radarMaitriseValue");

const RADAR_CENTER = 100;
const RADAR_RADIUS = 85;
const RADAR_ANGLES_DEG = [-90, -30, 30, 90, 150, 210];


/* =====================================================
   6. FONCTIONS UTILITAIRES DESIGN
===================================================== */

function setStatusBox(element, text, type = "neutral") {
  element.textContent = text;
  element.className = `status-box ${type}`;
}

function setVerdict(text, type = "pending") {
  finalVerdict.textContent = text;
  finalVerdict.className = `verdict-box ${type}`;
}

function setReadingPill(element, text, type = "neutral") {
  element.textContent = text;
  element.className = `reading-pill ${type}`;
}

function formatPercent(value) {
  return `${value.toFixed(2)}%`;
}

function formatRR(value) {
  return `${value.toFixed(2)}R`;
}

function getCombo() {
  if (!dailyPattern.value || !confirmation4h.value) return "";
  return `${dailyPattern.value} | ${confirmation4h.value}`;
}

function radarPoint(angleDeg, fraction) {
  const rad = (angleDeg * Math.PI) / 180;
  const clamped = Math.max(0, Math.min(1, fraction));
  const x = RADAR_CENTER + Math.cos(rad) * RADAR_RADIUS * clamped;
  const y = RADAR_CENTER + Math.sin(rad) * RADAR_RADIUS * clamped;
  return `${x.toFixed(1)},${y.toFixed(1)}`;
}

function setRadarPolygon(fractions) {
  const points = RADAR_ANGLES_DEG.map((angle, index) => radarPoint(angle, fractions[index])).join(" ");
  radarDataPolygon.setAttribute("points", points);
}

function resetRadar() {
  setRadarPolygon([0, 0, 0, 0, 0, 0]);

  radarWinrateValue.textContent = "-";
  radarRRValue.textContent = "-";
  radarScoreValue.textContent = "-";
  radarGainValue.textContent = "-";
  radarVolumeValue.textContent = "-";
  radarMaitriseValue.textContent = "-";
}

function updateRadar(stats) {
  // Winrate : déjà sur 0-100
  const winrateFrac = Math.max(0, stats.winrate) / 100;

  // RR moyen : normalisé sur une échelle 0 → 2R
  const rrFrac = Math.max(0, stats.rrMoyen) / 2;

  // Score : normalisé sur une échelle 0 → 15
  const scoreFrac = Math.max(0, stats.score) / 15;

  // Gain total : normalisé sur une échelle 0 → 30
  const gainFrac = Math.max(0, stats.gainTotal) / 30;

  // Volume : nb de trades, normalisé sur une échelle 0 → 30 (fiabilité de la data)
  const volumeFrac = Math.max(0, stats.nbTrades) / 30;

  // Maîtrise : 100 − taux de perte (part des trades perdants sur le total)
  const lossRate = stats.nbTrades > 0 ? (stats.loss / stats.nbTrades) * 100 : 0;
  const maitriseFrac = Math.max(0, 100 - lossRate) / 100;

  setRadarPolygon([winrateFrac, rrFrac, scoreFrac, gainFrac, volumeFrac, maitriseFrac]);

  radarWinrateValue.textContent = formatPercent(stats.winrate);
  radarRRValue.textContent = formatRR(stats.rrMoyen);
  radarScoreValue.textContent = formatPercent(stats.score);
  radarGainValue.textContent = formatPercent(stats.gainTotal);
  radarVolumeValue.textContent = `${stats.nbTrades}`;
  radarMaitriseValue.textContent = formatPercent(Math.max(0, 100 - lossRate));
}


/* =====================================================
   7. INITIALISATION DES PATTERNS
===================================================== */

function loadPatterns() {
  dailyPattern.innerHTML = `<option value="">Sélectionner</option>`;

  Object.keys(patternsDatabase).forEach((pattern) => {
    const option = document.createElement("option");
    option.value = pattern;
    option.textContent = pattern;
    dailyPattern.appendChild(option);
  });
}


/* =====================================================
   8. CONFIRMATIONS DYNAMIQUES
===================================================== */

function updateConfirmationOptions() {
  const selectedPattern = dailyPattern.value;
  const confirmations = confirmationsDatabase[selectedPattern] || [];

  confirmation4h.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = selectedPattern
    ? "Sélectionner"
    : "Choisir un pattern Daily d’abord";

  confirmation4h.appendChild(defaultOption);

  confirmations.forEach((confirmation) => {
    const option = document.createElement("option");
    option.value = confirmation;
    option.textContent = confirmation;
    confirmation4h.appendChild(option);
  });

  confirmation4h.value = "";
}


/* =====================================================
   9. VALIDATION DAILY
===================================================== */

function updateDailyValidation() {
  const trend = dailyTrend.value;
  const pattern = dailyPattern.value;

  if (!pattern) {
    patternDirection.value = "";
  } else {
    const patternInfo = patternsDatabase[pattern];
    patternDirection.value = patternInfo ? patternInfo.sens : "";
  }

  if (!trend || !pattern) {
    setStatusBox(dailyValidation, "En attente", "neutral");
    return false;
  }

  const patternInfo = patternsDatabase[pattern];

  if (!patternInfo) {
    setStatusBox(dailyValidation, "❌ Pattern inconnu", "danger");
    return false;
  }

  if (trend === patternInfo.sens) {
    setStatusBox(dailyValidation, "✅ Pattern dans le sens", "success");
    return true;
  }

  setStatusBox(dailyValidation, "❌ Pattern contraire à la tendance", "danger");
  return false;
}


/* =====================================================
   10. VALIDATION WEEKLY
===================================================== */

function updateWeeklyValidation() {
  if (!weeklyFav.value) {
    setStatusBox(weeklyValidation, "En attente", "neutral");
    return false;
  }

  if (weeklyFav.value === "Oui") {
    setStatusBox(weeklyValidation, "✅ Weekly favorable", "success");
    return true;
  }

  setStatusBox(weeklyValidation, "❌ Weekly non favorable", "danger");
  return false;
}


/* =====================================================
   11. VALIDATION 4H
===================================================== */

function update4HValidation() {
  const pattern = dailyPattern.value;
  const confirmation = confirmation4h.value;

  if (!pattern || !confirmation) {
    setStatusBox(validation4h, "En attente", "neutral");
    return false;
  }

  const allowedConfirmations = confirmationsDatabase[pattern] || [];

  if (allowedConfirmations.includes(confirmation)) {
    setStatusBox(validation4h, "✅ Confirmation compatible", "success");
    return true;
  }

  setStatusBox(validation4h, "❌ Confirmation non compatible", "danger");
  return false;
}


/* =====================================================
   12. AFFICHAGE DES RÈGLES 4H
===================================================== */

function renderRules() {
  rulesList.innerHTML = "";

  const confirmation = confirmation4h.value;

  if (!confirmation) {
    rulesList.innerHTML = `
      <div class="rule-row">
        <div class="rule-name">Sélectionne une confirmation 4H pour afficher les règles.</div>
        <div></div>
      </div>
    `;

    setStatusBox(rulesValidation, "En attente des règles", "neutral");
    return;
  }

  const rules = rulesDatabase[confirmation];

  if (!rules || rules.length === 0) {
    rulesList.innerHTML = `
      <div class="rule-row">
        <div class="rule-name">Aucune règle obligatoire pour cette confirmation.</div>
        <div></div>
      </div>
    `;

    setStatusBox(rulesValidation, "✅ Aucune règle obligatoire", "success");
    return;
  }

  rules.forEach((rule, index) => {
    const row = document.createElement("div");
    row.className = "rule-row";

    const optionalTag = rule.required
      ? ""
      : `<span class="optional-tag">Optionnel</span>`;

    row.innerHTML = `
      <div class="rule-name">
        ${rule.text}
        ${optionalTag}
      </div>

      <div>
        <select class="ruleSelect" data-index="${index}" data-required="${rule.required}">
          <option value="">Sélectionner</option>
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>
        </select>
      </div>
    `;

    rulesList.appendChild(row);
  });

  document.querySelectorAll(".ruleSelect").forEach((select) => {
    select.addEventListener("change", updateChecker);
  });

  updateRulesValidation();
}


/* =====================================================
   13. VALIDATION DES RÈGLES 4H
===================================================== */

function updateRulesValidation() {
  const confirmation = confirmation4h.value;
  const rules = rulesDatabase[confirmation];

  if (!confirmation) {
    setStatusBox(rulesValidation, "En attente des règles", "neutral");
    return false;
  }

  if (!rules || rules.length === 0) {
    setStatusBox(rulesValidation, "✅ Aucune règle obligatoire", "success");
    return true;
  }

  const answers = document.querySelectorAll(".ruleSelect");

  for (const answer of answers) {
    const isRequired = answer.dataset.required === "true";

    if (isRequired && answer.value === "") {
      setStatusBox(rulesValidation, "⚠️ Règles obligatoires à compléter", "warning");
      return false;
    }

    if (isRequired && answer.value === "Non") {
      setStatusBox(rulesValidation, "❌ Règle obligatoire non respectée", "danger");
      return false;
    }
  }

  setStatusBox(rulesValidation, "✅ Règles obligatoires respectées", "success");
  return true;
}

function allRulesAnswered() {
  const confirmation = confirmation4h.value;
  const rules = rulesDatabase[confirmation];

  if (!confirmation) return false;
  if (!rules || rules.length === 0) return true;

  const answers = document.querySelectorAll(".ruleSelect");

  if (answers.length === 0) return false;

  return Array.from(answers).every((select) => select.value !== "");
}


/* =====================================================
   14. DATA DU SETUP
===================================================== */

function updateData() {
  const combo = getCombo();

  comboAnalyse.textContent = combo || "-";

  if (!combo) {
    resetData();
    return;
  }

  const stats = statsDatabase[combo];

  if (!stats) {
    nbTrades.textContent = "Pas de data";
    winrate.textContent = "Pas de data";
    rrMoyen.textContent = "Pas de data";
    gainTotal.textContent = "Pas de data";
    score.textContent = "Pas de data";

    resetReading();
    resetRadar();
    setReadingPill(readGlobal, "⚠️ Aucune data trouvée pour ce combo", "warning");
    return;
  }

  nbTrades.textContent = stats.nbTrades;
  winrate.textContent = formatPercent(stats.winrate);
  rrMoyen.textContent = formatRR(stats.rrMoyen);
  gainTotal.textContent = formatPercent(stats.gainTotal);
  score.textContent = formatPercent(stats.score);

  updateRadar(stats);
  updateDataReading(stats);
}

function resetData() {
  comboAnalyse.textContent = "-";
  nbTrades.textContent = "-";
  winrate.textContent = "-";
  rrMoyen.textContent = "-";
  gainTotal.textContent = "-";
  score.textContent = "-";

  resetRadar();
  resetReading();
}

function resetReading() {
  setReadingPill(readNbTrades, "Nb trades : -", "neutral");
  setReadingPill(readWinrate, "Winrate : -", "neutral");
  setReadingPill(readRR, "RR : -", "neutral");
  setReadingPill(readGain, "Gain : -", "neutral");
  setReadingPill(readScore, "Score : -", "neutral");
  setReadingPill(readGlobal, "Lecture globale : -", "neutral");
}

function updateDataReading(stats) {
  if (stats.nbTrades < 10) {
    setReadingPill(readNbTrades, `Nb trades : ${stats.nbTrades} ⚠️ peu de data`, "warning");
  } else if (stats.nbTrades < 20) {
    setReadingPill(readNbTrades, `Nb trades : ${stats.nbTrades} correct`, "warning");
  } else {
    setReadingPill(readNbTrades, `Nb trades : ${stats.nbTrades} fiable`, "success");
  }

  if (stats.winrate < 45) {
    setReadingPill(readWinrate, `Winrate : ${formatPercent(stats.winrate)} faible`, "danger");
  } else if (stats.winrate < 60) {
    setReadingPill(readWinrate, `Winrate : ${formatPercent(stats.winrate)} moyen`, "warning");
  } else {
    setReadingPill(readWinrate, `Winrate : ${formatPercent(stats.winrate)} bon`, "success");
  }

  if (stats.rrMoyen < 0.5) {
    setReadingPill(readRR, `RR : ${formatRR(stats.rrMoyen)} faible`, "danger");
  } else if (stats.rrMoyen < 1) {
    setReadingPill(readRR, `RR : ${formatRR(stats.rrMoyen)} correct`, "warning");
  } else {
    setReadingPill(readRR, `RR : ${formatRR(stats.rrMoyen)} bon`, "success");
  }

  if (stats.gainTotal < 0) {
    setReadingPill(readGain, `Gain : ${formatPercent(stats.gainTotal)} perdant`, "danger");
  } else if (stats.gainTotal === 0) {
    setReadingPill(readGain, `Gain : ${formatPercent(stats.gainTotal)} neutre`, "warning");
  } else {
    setReadingPill(readGain, `Gain : ${formatPercent(stats.gainTotal)} positif`, "success");
  }

  if (stats.score < 2) {
    setReadingPill(readScore, `Score : ${formatPercent(stats.score)} faible`, "danger");
  } else if (stats.score < 5) {
    setReadingPill(readScore, `Score : ${formatPercent(stats.score)} moyen`, "warning");
  } else {
    setReadingPill(readScore, `Score : ${formatPercent(stats.score)} fort`, "success");
  }

  if (stats.nbTrades < 10) {
    setReadingPill(readGlobal, "⚠️ Lecture globale : prudence, peu de data", "warning");
    return;
  }

  if (stats.gainTotal > 0 && stats.score >= 5) {
    setReadingPill(readGlobal, "✅ Lecture globale : combo intéressant", "success");
    return;
  }

  if (stats.gainTotal > 0 && stats.score >= 2) {
    setReadingPill(readGlobal, "⚠️ Lecture globale : combo moyen mais exploitable", "warning");
    return;
  }

  setReadingPill(readGlobal, "❌ Lecture globale : combo faible", "danger");
}


/* =====================================================
   15. VERDICT FINAL
===================================================== */

function updateFinalVerdict() {
  const dailyOk = updateDailyValidation();
  const weeklyOk = updateWeeklyValidation();
  const h4Ok = update4HValidation();
  const rulesOk = updateRulesValidation();

  if (
    !dailyTrend.value ||
    !dailyPattern.value ||
    !weeklyFav.value ||
    !confirmation4h.value ||
    !allRulesAnswered()
  ) {
    setVerdict("En attente", "pending");
    return;
  }

  if (!dailyOk || !weeklyOk || !h4Ok || !rulesOk) {
    setVerdict("❌ TRADE BLOQUÉ", "blocked");
    return;
  }

  setVerdict("✅ SETUP VALIDÉ", "valid");
}


/* =====================================================
   16. UPDATE GLOBAL
===================================================== */

function updateChecker() {
  updateDailyValidation();
  updateWeeklyValidation();
  update4HValidation();
  updateRulesValidation();
  updateData();
  updateFinalVerdict();
}

function handlePatternChange() {
  updateConfirmationOptions();
  renderRules();
  updateChecker();
}

function handleConfirmationChange() {
  renderRules();
  updateChecker();
}

function resetChecker() {
  dailyTrend.value = "";
  dailyPattern.value = "";
  weeklyFav.value = "";
  patternDirection.value = "";

  updateConfirmationOptions();
  confirmation4h.value = "";

  renderRules();

  setStatusBox(dailyValidation, "En attente", "neutral");
  setStatusBox(weeklyValidation, "En attente", "neutral");
  setStatusBox(validation4h, "En attente", "neutral");
  setStatusBox(rulesValidation, "En attente des règles", "neutral");
  setVerdict("En attente", "pending");

  resetData();
}

function hasSetupData() {
  if (dailyTrend.value || dailyPattern.value || weeklyFav.value || confirmation4h.value) {
    return true;
  }

  return Array.from(document.querySelectorAll(".ruleSelect")).some((select) => select.value !== "");
}

function openResetModal() {
  resetModalOverlay.hidden = false;
}

function closeResetModal() {
  resetModalOverlay.hidden = true;
}

function handleResetClick() {
  if (hasSetupData()) {
    openResetModal();
    return;
  }

  resetChecker();
}


/* =====================================================
   17. ÉVÉNEMENTS
===================================================== */

dailyTrend.addEventListener("change", updateChecker);
dailyPattern.addEventListener("change", handlePatternChange);
weeklyFav.addEventListener("change", updateChecker);
confirmation4h.addEventListener("change", handleConfirmationChange);
resetBtn.addEventListener("click", handleResetClick);

resetCancelBtn.addEventListener("click", closeResetModal);

resetConfirmBtn.addEventListener("click", () => {
  resetChecker();
  closeResetModal();
});

resetModalOverlay.addEventListener("click", (event) => {
  if (event.target === resetModalOverlay) closeResetModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !resetModalOverlay.hidden) closeResetModal();
});


/* =====================================================
   19. INIT
===================================================== */

loadPatterns();
updateConfirmationOptions();
renderRules();
resetData();
updateChecker();

})();