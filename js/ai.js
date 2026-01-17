/*************************************
 * Dev Daimand Tool
 * AI Analysis + Voice Engine
 *************************************/

function runAI() {
  const data = getAllData();

  if (data.length === 0) {
    speak("Abhi tak koi business data nahi hai.");
    showText("Koi data available nahi hai.");
    return;
  }

  let totalSale = 0;
  let totalUdhar = 0;
  let customerMap = {};
  let today = new Date().toISOString().slice(0,10);

  data.forEach(d => {
    if (d.type === "sale") totalSale += d.amount;
    if (d.type === "udhar") totalUdhar += d.amount;

    if (!customerMap[d.name]) customerMap[d.name] = 0;
    customerMap[d.name] += d.amount;
  });

  // Top customer
  let topCustomer = Object.keys(customerMap)
    .sort((a,b)=>customerMap[b]-customerMap[a])[0];

  let msg = `
    Ab tak ki kul sale ₹${totalSale} hai.
    Kul udhar ₹${totalUdhar} hai.
  `;

  if (totalUdhar > totalSale * 0.5) {
    msg += "Udhar zyada ho raha hai, paisa vasool karna zaroori hai. ";
  } else {
    msg += "Business achha chal raha hai. ";
  }

  msg += `Sabse zyada transaction ${topCustomer} ke saath hui hai.`;

  showText(msg);
  speak(msg);

  showAdvice(totalSale, totalUdhar, topCustomer);
}

/* ===== Helpers ===== */

function showText(text) {
  document.getElementById("aiText").innerText = text;
}

function speak(text) {
  const voice = new SpeechSynthesisUtterance(text);
  voice.lang = "hi-IN";
  voice.rate = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(voice);
}

function showAdvice(sale, udhar, customer) {
  const list = document.getElementById("aiAdvice");
  list.innerHTML = "";

  const tips = [];

  if (udhar > sale * 0.5)
    tips.push("⚠️ Udhar kam karo, payment reminder bhejo");

  tips.push(`⭐ ${customer} loyal customer hai, offer do`);
  tips.push("📈 Zyada bikne wale item ka stock badhao");
  tips.push("📅 Roz data entry karo taaki report accurate rahe");

  tips.forEach(t => {
    const li = document.createElement("li");
    li.innerText = t;
    list.appendChild(li);
  });
}
