/*************************************
 * Theme Engine
 *************************************/

const THEME_KEY = "dev_daimand_theme";

// Load theme on start
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem(THEME_KEY) || "blue";
  applyTheme(saved);
  const select = document.getElementById("themeSelect");
  if (select) select.value = saved;
});

function changeTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
}

function applyTheme(theme) {
  document.body.className = "";
  document.body.classList.add("theme-" + theme);
}
