/*************************************
 * Dev Daimand Tool
 * Hardcore Hisab Logic
 *************************************/

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();
  loadTable();
});

// Save Entry Button
const saveBtn = document.querySelector("form button");
if (saveBtn) {
  saveBtn.addEventListener("click", saveFormEntry);
}

// Save Form Data
function saveFormEntry() {
  const name = document.querySelector("input[type=text]").value;
  const amount = Number(document.querySelector("input[type=number]").value);
  const type = document.querySelector("select").value.toLowerCase();

  if (!name || !amount) {
    alert("Naam aur amount zaroori hai");
    return;
  }

  const entry = {
    name,
    amount,
    type, // sale / udhar
    date: new Date().toISOString().slice(0, 10)
  };

  addEntry(entry);

  document.querySelector("form").reset();

  loadDashboard();
  loadTable();
}

// Dashboard Cards
function loadDashboard() {
  const data = getAllData();

  let todaySale = 0;
  let totalDue = 0;
  let monthSale = 0;

  const today = new Date().toISOString().slice(0, 10);
  const month = today.slice(0, 7);

  data.forEach(d => {
    if (d.type === "sale" && d.date === today) {
      todaySale += d.amount;
    }

    if (d.type === "udhar") {
      totalDue += d.amount;
    }

    if (d.type === "sale" && d.date.startsWith(month)) {
      monthSale += d.amount;
    }
  });

  setText("todaySale", todaySale);
  setText("totalDue", totalDue);
  setText("monthSale", monthSale);
  setText("totalCustomer", new Set(data.map(d => d.name)).size);
}

// Update UI helper
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerText = "₹" + value;
}

// Table Load
function loadTable() {
  const data = getAllData();
  const tbody = document.querySelector("table tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  data.slice().reverse().forEach(d => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${d.name}</td>
      <td>₹${d.amount}</td>
      <td>${d.type}</td>
      <td>${d.date}</td>
    `;

    tbody.appendChild(tr);
  });
}
