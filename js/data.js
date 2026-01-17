/*************************************
 * Dev Daimand Tool
 * Data Storage Engine
 *************************************/

const STORAGE_KEY = "dev_daimand_hisab";

// First time empty array
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}

// Get all entries
function getAllData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Save all entries
function saveAllData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Add new entry
function addEntry(entry) {
  const data = getAllData();
  data.push(entry);
  saveAllData(data);
}

// Clear all data (future use)
function clearData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}
