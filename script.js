const GST_RATE = 0.18;
const CHARGING_EFFICIENCY = 0.9; // rough allowance for losses and tapering
const THEME_KEY = "voltiq-theme";
const USER_KEY = "voltiq-user";
const LOG_PREFIX = "voltiq-log:";
const MAX_LOG_ENTRIES = 500;

const capacityInput = document.getElementById("capacity");
const currentInput = document.getElementById("current");
const targetInput = document.getElementById("target");
const chargerInputs = Array.from(document.querySelectorAll('input[name="charger"]'));
const rateInput = document.getElementById("rate");
const rateValueEl = document.getElementById("rate-value");
const gstToggle = document.getElementById("gst-toggle");
const customChargerEl = document.getElementById("custom-charger");
const customKwInput = document.getElementById("custom-kw");
const heroSubEl = document.getElementById("hero-sub");
const gstRowEl = document.getElementById("gst-row");

const energyEl = document.getElementById("energy");
const timeEl = document.getElementById("time");
const totalEl = document.getElementById("total");
const totalBreakdownEl = document.getElementById("total-breakdown");
const baseEl = document.getElementById("base");
const gstEl = document.getElementById("gst");
const messageEl = document.getElementById("message");
const resultsEl = document.getElementById("results");
const batteryNowEl = document.getElementById("battery-now");
const batteryAddEl = document.getElementById("battery-add");
const themeToggle = document.getElementById("theme-toggle");
const heroEl = document.querySelector(".hero");

const userSetupEl = document.getElementById("user-setup");
const userForm = document.getElementById("user-form");
const usernameInput = document.getElementById("username");
const appEl = document.getElementById("app");
const userLabelEl = document.getElementById("user-label");
const switchUserBtn = document.getElementById("switch-user");
const tabs = Array.from(document.querySelectorAll(".tab"));
const historyCountEl = document.getElementById("history-count");
const logBtn = document.getElementById("log-btn");
const logToastEl = document.getElementById("log-toast");
const histSpentEl = document.getElementById("hist-spent");
const histEnergyEl = document.getElementById("hist-energy");
const histSessionsEl = document.getElementById("hist-sessions");
const histAvgEl = document.getElementById("hist-avg");
const historyEmptyEl = document.getElementById("history-empty");
const historyListEl = document.getElementById("history-list");
const exportBtn = document.getElementById("export-btn");
const clearBtn = document.getElementById("clear-btn");

const numberInputs = [capacityInput, currentInput, targetInput, customKwInput];
const outputEls = [energyEl, timeEl, totalEl, totalBreakdownEl, baseEl, gstEl];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Theme ---------- */

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
}

function initTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(stored || (prefersDark ? "dark" : "light"));
}

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
});

/* ---------- Formatting ---------- */

function formatMoney(value) {
  return value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatRate(value) {
  return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 1 })} / kWh`;
}

function formatEnergy(value) {
  return value.toLocaleString("en-IN", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function formatDuration(hours) {
  const totalMinutes = Math.round(hours * 60);
  if (totalMinutes < 1) return "< 1 min";
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}

/* ---------- Animation helpers ---------- */

const animations = new WeakMap();

function animateNumber(el, to, format) {
  const previous = animations.get(el);
  if (previous) cancelAnimationFrame(previous.frame);

  const from = previous ? previous.value : 0;
  if (reduceMotion || from === to) {
    el.textContent = format(to);
    animations.set(el, { value: to, frame: 0 });
    return;
  }

  const duration = 450;
  const start = performance.now();
  const state = { value: from, frame: 0 };
  animations.set(el, state);

  const step = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    state.value = from + (to - from) * eased;
    el.textContent = format(state.value);
    if (t < 1) state.frame = requestAnimationFrame(step);
  };
  state.frame = requestAnimationFrame(step);
}

function pop(el) {
  el.classList.remove("pop");
  void el.offsetWidth;
  el.classList.add("pop");
}

/* ---------- Validation ---------- */

function validate(capacity, current, target, chargerKw) {
  if (Number.isNaN(capacity) || capacity <= 0) {
    return { field: capacityInput, text: "Please enter a battery capacity greater than 0 kWh." };
  }
  if (Number.isNaN(current) || current < 0 || current > 100) {
    return { field: currentInput, text: "Battery now must be between 0 and 100%." };
  }
  if (Number.isNaN(target) || target < 0 || target > 100) {
    return { field: targetInput, text: "Charge to must be between 0 and 100%." };
  }
  if (target <= current) {
    return { field: targetInput, text: "Charge to must be higher than your current battery level." };
  }
  if (isCustomCharger() && (Number.isNaN(chargerKw) || chargerKw <= 0)) {
    return { field: customKwInput, text: "Please enter a charger power greater than 0 kW." };
  }
  return null;
}

function showError(error) {
  numberInputs.forEach((el) => el.classList.toggle("invalid", el === error.field));
  messageEl.textContent = error.text;
  messageEl.hidden = false;
  resultsEl.classList.add("dimmed");
  outputEls.forEach((el) => {
    const running = animations.get(el);
    if (running) cancelAnimationFrame(running.frame);
    animations.delete(el);
    el.textContent = "—";
  });
  batteryNowEl.style.width = "0%";
  batteryAddEl.style.width = "0%";
}

function clearError() {
  numberInputs.forEach((el) => el.classList.remove("invalid"));
  messageEl.hidden = true;
  messageEl.textContent = "";
  resultsEl.classList.remove("dimmed");
}

/* ---------- Local storage: user + charge log ---------- */

let currentUser = null;
let lastResult = null;

function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function normalizeUser(name) {
  return name.trim().toLowerCase().replace(/\s+/g, " ").slice(0, 24);
}

function logKey(user) {
  return LOG_PREFIX + user;
}

// Entries are stored compactly: t = timestamp (ms), e = kWh, c = ₹ total, r = ₹/kWh, g = GST on (1/0), k = charger kW
function loadLog(user) {
  const raw = storageGet(logKey(user));
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLog(user, entries) {
  return storageSet(logKey(user), JSON.stringify(entries.slice(-MAX_LOG_ENTRIES)));
}

function setUser(user) {
  currentUser = user;
  storageSet(USER_KEY, user);
  userLabelEl.textContent = user;
  userSetupEl.hidden = true;
  appEl.hidden = false;
  renderHistory();
}

function clearUser() {
  currentUser = null;
  try {
    localStorage.removeItem(USER_KEY);
  } catch {
    /* ignore */
  }
  appEl.hidden = true;
  userSetupEl.hidden = false;
  usernameInput.value = "";
  usernameInput.focus();
}

function initUser() {
  const stored = storageGet(USER_KEY);
  if (stored) {
    setUser(stored);
  } else {
    userSetupEl.hidden = false;
    appEl.hidden = true;
  }
}

userForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = normalizeUser(usernameInput.value);
  if (!name) {
    usernameInput.classList.add("invalid");
    usernameInput.focus();
    return;
  }
  usernameInput.classList.remove("invalid");
  setUser(name);
  showTab("tab-calc");
});

switchUserBtn.addEventListener("click", clearUser);

/* ---------- Tabs ---------- */

function showTab(tabId) {
  tabs.forEach((tab) => {
    const selected = tab.id === tabId;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    panel.hidden = !selected;
  });
  if (tabId === "tab-history") renderHistory();
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => showTab(tab.id));
  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const index = tabs.indexOf(tab);
    const next = tabs[(index + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
    showTab(next.id);
    next.focus();
  });
});

/* ---------- History ---------- */

function formatDate(ms) {
  return new Date(ms).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function renderHistory() {
  if (!currentUser) return;
  const entries = loadLog(currentUser);
  const spent = entries.reduce((sum, e) => sum + e.c, 0);
  const energy = entries.reduce((sum, e) => sum + e.e, 0);

  histSpentEl.textContent = formatMoney(spent);
  histEnergyEl.textContent = formatEnergy(energy);
  histSessionsEl.textContent = String(entries.length);
  histAvgEl.textContent = energy > 0 ? formatMoney(spent / energy) : "—";

  historyCountEl.hidden = entries.length === 0;
  historyCountEl.textContent = String(entries.length);
  historyEmptyEl.hidden = entries.length > 0;
  exportBtn.disabled = clearBtn.disabled = entries.length === 0;

  historyListEl.replaceChildren(
    ...entries
      .slice()
      .reverse()
      .map((entry, i) => {
        const li = document.createElement("li");
        li.className = "history-item";
        li.style.setProperty("--i", String(Math.min(i, 8)));

        const main = document.createElement("div");
        main.className = "history-main";
        const cost = document.createElement("strong");
        cost.textContent = `₹${formatMoney(entry.c)}`;
        const meta = document.createElement("span");
        meta.className = "history-meta";
        meta.textContent = `${formatEnergy(entry.e)} kWh · ${formatRate(entry.r)}${entry.g ? " · GST" : ""} · ${entry.k} kW`;
        main.append(cost, meta);

        const side = document.createElement("div");
        side.className = "history-side";
        const date = document.createElement("time");
        date.dateTime = new Date(entry.t).toISOString();
        date.textContent = formatDate(entry.t);
        const del = document.createElement("button");
        del.type = "button";
        del.className = "icon-btn";
        del.setAttribute("aria-label", "Delete this entry");
        del.textContent = "×";
        del.addEventListener("click", () => deleteEntry(entry.t));
        side.append(date, del);

        li.append(main, side);
        return li;
      })
  );
}

function showToast(text) {
  logToastEl.textContent = text;
  logToastEl.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    logToastEl.hidden = true;
  }, 2200);
}

function logCharge() {
  if (!currentUser || !lastResult) return;
  const entries = loadLog(currentUser);
  entries.push({
    t: Date.now(),
    e: Math.round(lastResult.energy * 100) / 100,
    c: Math.round(lastResult.total * 100) / 100,
    r: lastResult.rate,
    g: lastResult.gstOn ? 1 : 0,
    k: lastResult.chargerKw,
  });
  if (!saveLog(currentUser, entries)) {
    showToast("Couldn't save — storage is unavailable on this device.");
    return;
  }
  renderHistory();
  showToast(`Logged ₹${formatMoney(lastResult.total)} for ${formatEnergy(lastResult.energy)} kWh`);
  pop(logBtn);
}

function deleteEntry(timestamp) {
  if (!currentUser) return;
  saveLog(currentUser, loadLog(currentUser).filter((e) => e.t !== timestamp));
  renderHistory();
}

function exportCsv() {
  if (!currentUser) return;
  const rows = [["date", "energy_kwh", "cost_inr", "rate_inr_per_kwh", "gst_included", "charger_kw"]];
  loadLog(currentUser).forEach((e) => {
    rows.push([new Date(e.t).toISOString(), e.e, e.c, e.r, e.g ? "yes" : "no", e.k]);
  });
  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `voltiq-${currentUser}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function clearHistory() {
  if (!currentUser) return;
  if (!window.confirm(`Delete all charging history for ${currentUser} on this device?`)) return;
  try {
    localStorage.removeItem(logKey(currentUser));
  } catch {
    /* ignore */
  }
  renderHistory();
}

logBtn.addEventListener("click", logCharge);
exportBtn.addEventListener("click", exportCsv);
clearBtn.addEventListener("click", clearHistory);

/* ---------- Calculation ---------- */

function isCustomCharger() {
  const checked = chargerInputs.find((el) => el.checked);
  return Boolean(checked) && checked.value === "custom";
}

function selectedChargerKw() {
  if (isCustomCharger()) return parseFloat(customKwInput.value);
  const checked = chargerInputs.find((el) => el.checked);
  return checked ? parseFloat(checked.value) : NaN;
}

function syncCustomCharger() {
  const custom = isCustomCharger();
  customChargerEl.hidden = !custom;
  if (custom) customKwInput.focus();
}

function updateRateLabel() {
  rateValueEl.textContent = formatRate(parseFloat(rateInput.value));
}

function updateHeroSub(rate, gstOn) {
  heroSubEl.textContent = `at ${formatRate(rate)} · ${gstOn ? "includes 18% GST" : "no GST"}`;
}

function calculate() {
  const capacity = parseFloat(capacityInput.value);
  const current = parseFloat(currentInput.value);
  const target = parseFloat(targetInput.value);
  const chargerKw = selectedChargerKw();
  const rate = parseFloat(rateInput.value);
  const gstOn = gstToggle.checked;

  updateHeroSub(rate, gstOn);
  gstRowEl.hidden = !gstOn;

  const error = validate(capacity, current, target, chargerKw);
  if (error) {
    lastResult = null;
    logBtn.disabled = true;
    showError(error);
    return;
  }
  clearError();
  logBtn.disabled = false;

  const energy = (capacity * (target - current)) / 100;
  const total = energy * rate;
  const base = gstOn ? total / (1 + GST_RATE) : total;
  const gst = total - base;
  const hours = energy / (chargerKw * CHARGING_EFFICIENCY);
  lastResult = { energy, total, rate, gstOn, chargerKw };

  animateNumber(energyEl, energy, formatEnergy);
  animateNumber(totalEl, total, formatMoney);
  animateNumber(totalBreakdownEl, total, formatMoney);
  animateNumber(baseEl, base, formatMoney);
  animateNumber(gstEl, gst, formatMoney);
  timeEl.textContent = `~${formatDuration(hours)}`;

  batteryNowEl.style.width = `${current}%`;
  batteryAddEl.style.width = `${target - current}%`;

  pop(totalEl.parentElement);
  pop(timeEl);
  heroEl.classList.remove("glow");
  void heroEl.offsetWidth;
  heroEl.classList.add("glow");
}

numberInputs.forEach((el) => {
  el.addEventListener("input", calculate);
  el.addEventListener("change", calculate);
});
chargerInputs.forEach((el) =>
  el.addEventListener("change", () => {
    syncCustomCharger();
    calculate();
  })
);
rateInput.addEventListener("input", () => {
  updateRateLabel();
  calculate();
});
gstToggle.addEventListener("change", calculate);

initTheme();
initUser();
updateRateLabel();
syncCustomCharger();
calculate();
