// ==========================
// ðŸŽ® COUNTDOWN TIMER
// ==========================
const nextGame = new Date("March 8, 2026 20:00:00").getTime();
const countdownEl = document.getElementById("countdown");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = nextGame - now;

  if (distance < 0) {
    countdownEl.innerHTML = "THE GAME IS LIVE.";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownEl.innerHTML = `Next Game In: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();


// ==========================
// ðŸ”Š SHUFFLE SOUND
// ==========================
const shuffleSound = document.getElementById("shuffle");

document.querySelectorAll(".btn, .pay-card").forEach(el => {
  el.addEventListener("click", () => {
    shuffleSound.currentTime = 0;
    shuffleSound.play().catch(() => {});
  });
});


// ==========================
// ðŸŽ¬ CINEMATIC INTRO SOUND
// ==========================
window.addEventListener("load", () => {
  setTimeout(() => {
    shuffleSound.play().catch(() => {});
  }, 800);
});


// ==========================
// âœ¨ PARTICLE BACKGROUND
// ==========================
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 120; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    d: Math.random() * 1 + 0.3
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FFD700";

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.y += p.d;

    if (p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawParticles);
}

drawParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


// ==========================
// ðŸ† GOOGLE SHEETS LEADERBOARD
// ==========================
const sheetID = "1092wfRkVk9o6WiDxQ7jvrfvgzHUKg7Hosxle1NQfVOM";
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json`;

fetch(sheetURL)
  .then(res => res.text())
  .then(data => {
    const json = JSON.parse(data.substr(47).slice(0, -2));
    const rows = json.table.rows;
    const table = document.getElementById("leaderboardTable");

    if (!rows || rows.length === 0) {
      const row = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 3;
      td.textContent = "Leaderboard Coming Soon.";
      row.appendChild(td);
      table.appendChild(row);
      return;
    }

    rows.forEach(r => {
      const row = document.createElement("tr");

      r.c.forEach(cell => {
        const td = document.createElement("td");
        td.textContent = cell ? cell.v : "";
        row.appendChild(td);
      });

      table.appendChild(row);
    });
  })
  .catch(error => {
    console.error("Leaderboard failed to load:", error);
  });
