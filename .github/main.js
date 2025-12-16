// ===== Canvas et contexte =====
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const SCALE = 8;
ctx.scale(SCALE, SCALE);

// ===== État du Père Noël =====
let santa = {
  hat: false,
  coat: false,
  belt: false,
  pants: false,
  boots: false,
  breathe: 0,
};

// ===== Fonction pour dessiner un pixel =====
function px(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1);
}

// ===== Dessin de base du Père Noël =====
function drawBase() {
  // Ventre
  for (let x = 10; x < 22; x++) {
    for (let y = 18; y < 28; y++) px(x, y, "#f2c9ac");
  }

  // Caleçon (disparaît si pantalon est activé)
  if (!santa.pants) {
    for (let x = 12; x < 20; x++) {
      for (let y = 26; y < 30; y++) px(x, y, "#ffffffff");
    }
  }

  // Tête
  for (let x = 12; x < 20; x++) {
    for (let y = 8; y < 14; y++) px(x, y, "#f2c9ac");
  }

  // Barbe
  for (let x = 11; x < 21; x++) {
    for (let y = 14; y < 19; y++) px(x, y, "#f0e7e7ff");
  }

  // Yeux (plus naturels)
  px(13, 11, "#000"); // œil gauche
  px(16, 11, "#000"); // œil droit
}

// ===== Dessin des habits =====
function drawHat() {
  if (!santa.hat) return;
  for (let x = 11; x < 21; x++) px(x, 6, "#d32f2f");
  for (let x = 13; x < 19; x++) px(x, 5, "#d32f2f");
}

function drawCoat() {
  if (!santa.coat) return;
  for (let x = 10; x < 22; x++) {
    for (let y = 18; y < 26; y++) px(x, y, "#d32f2f");
  }
}

function drawBelt() {
  if (!santa.belt) return;
  for (let x = 10; x < 22; x++) px(x, 24, "#000000");
}

function drawPants() {
  if (!santa.pants) return;
  for (let x = 12; x < 20; x++) {
    for (let y = 30; y < 36; y++) px(x, y, "#d32f2f");
  }
}

function drawBoots() {
  if (!santa.boots) return;
  for (let x = 11; x < 15; x++) {
    for (let y = 36; y < 40; y++) px(x, y, "#000000");
  }
  for (let x = 16; x < 20; x++) {
    for (let y = 36; y < 40; y++) px(x, y, "#000000");
  }
}

// ===== Boucle d’animation =====
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  santa.breathe += 0.05;
  ctx.save();
  ctx.translate(0, Math.sin(santa.breathe) * 0.3);

  drawBase();
  drawHat();
  drawCoat();
  drawBelt();
  drawPants();
  drawBoots();

  ctx.restore();
  requestAnimationFrame(loop);
}

loop(); // Démarre l’animation

// ===== Gestion des clics sur les boutons avec toggle =====
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("mousedown", () => {
    const type = item.dataset.item;
    // Toggle : si activé -> désactive, si désactivé -> active
    santa[type] = !santa[type];
  });
});
