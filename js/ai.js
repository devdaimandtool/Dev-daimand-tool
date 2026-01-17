/*************************************
 * Dev Daimand Tool
 * AI + Chart Intelligence Engine
 *************************************/

function runAI() {
  const data = getAllData();

  if (data.length === 0) {
    speak("Abhi koi data nahi hai");
    showText("Data available nahi hai");
    return;
  }

  let sale = 0;
  let udhar = 0;
  let days = {};

  data.forEach(d => {
    if (d.type === "sale") sale += d.amount;
    if (d.type === "udhar") udhar += d.amount;

    if (!days[d.date]) days[d.date] = 0;
    days[d.date] += d.amount;
  });

  const msg = `
    Kul sale ₹${sale}.
    Kul udhar ₹${udhar}.
    ${udhar > sale * 0.5 ? "Udhar zyada hai." : "Business stable hai."}
  `;

  showText(msg);
  speak(msg);

  drawChart(days);
}

/* ===== TEXT ===== */
function showText(text) {
  document.getElementById("aiText").innerText = text;
}

/* ===== VOICE ===== */
function speak(text) {
  const s = new SpeechSynthesisUtterance(text);
  s.lang = "hi-IN";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(s);
}

/* ===== HARDCORE CHART AI ===== */
function drawChart(dayData) {
  const canvas = document.getElementById("aiChart");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const keys = Object.keys(dayData);
  const values = Object.values(dayData);

  const max = Math.max(...values);
  const barWidth = canvas.width / keys.length;

  values.forEach((val, i) => {
    const height = (val / max) * (canvas.height - 30);
    const x = i * barWidth + 10;
    const y = canvas.height - height - 20;

    ctx.fillStyle = "#2563eb";
    ctx.fillRect(x, y, barWidth - 20, height);

    ctx.fillStyle = "#000";
    ctx.font = "10px Arial";
    ctx.fillText(keys[i].slice(5), x, canvas.height - 5);
  });

  ctx.fillStyle = "#000";
  ctx.fillText("AI Sale Trend", 10, 15);
}
