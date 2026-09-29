const GST_RATE = 0.18;
const DEFAULT_DC_EFFICIENCY = 0.92;
const DEFAULT_AC_EFFICIENCY = 0.87;
const DC_EFFICIENCY_KEY = "voltiq-eff-dc";
const AC_EFFICIENCY_KEY = "voltiq-eff-ac";
const THEME_KEY = "voltiq-theme";
const USER_KEY = "voltiq-user";
const LOG_PREFIX = "voltiq-log:";
const PREFS_PREFIX = "voltiq-prefs:";
const MAX_LOG_ENTRIES = 500;

const capacityInput = document.getElementById("capacity");
const currentInput = document.getElementById("current");
const targetInput = document.getElementById("target");
const currentDecBtn = document.getElementById("current-dec");
const currentIncBtn = document.getElementById("current-inc");
const targetPresetInputs = Array.from(document.querySelectorAll('input[name="target-preset"]'));
const customTargetEl = document.getElementById("custom-target");
const modeInputs = Array.from(document.querySelectorAll('input[name="mode"]'));
const targetFieldEl = document.getElementById("target-field");
const budgetFieldEl = document.getElementById("budget-field");
const budgetInput = document.getElementById("budget");
const timeFieldEl = document.getElementById("time-field");
const timeInput = document.getElementById("time-input");
const chargerInputs = Array.from(document.querySelectorAll('input[name="charger"]'));
const rateInput = document.getElementById("rate");
const rateValueEl = document.getElementById("rate-value");
const gstToggle = document.getElementById("gst-toggle");
const customChargerEl = document.getElementById("custom-charger");
const customKwInput = document.getElementById("custom-kw");
const customTypeInput = document.getElementById("custom-type");
const dcEfficiencyInput = document.getElementById("eff-dc");
const acEfficiencyInput = document.getElementById("eff-ac");
const settingsMessageEl = document.getElementById("settings-message");
const heroSubEl = document.getElementById("hero-sub");
const gstRowEl = document.getElementById("gst-row");

const energyEl = document.getElementById("energy");
const energyBuyEl = document.getElementById("energy-buy");
const timeEl = document.getElementById("time");
const totalEl = document.getElementById("total");
const enterKwhEl = document.getElementById("enter-kwh");
const heroLabelEl = document.getElementById("hero-label");
const heroEnterEl = document.getElementById("hero-enter");
const heroFinalEl = document.getElementById("hero-final");
const finalPctEl = document.getElementById("final-pct");
const energyLabelEl = document.getElementById("energy-label");
const energyBuyLabelEl = document.getElementById("energy-buy-label");
const capNoteEl = document.getElementById("cap-note");
const copyKwhBtn = document.getElementById("copy-kwh");
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
const userListWrapEl = document.getElementById("user-list-wrap");
const userListEl = document.getElementById("user-list");
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

const numberInputs = [capacityInput, currentInput, targetInput, budgetInput, timeInput, customKwInput];
const outputEls = [enterKwhEl, finalPctEl, energyEl, energyBuyEl, timeEl, totalEl, totalBreakdownEl, baseEl, gstEl];
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

function kwhToEnter(energyToBuy) {
  return Math.ceil(Math.round(energyToBuy * 1000) / 1000);
}

function formatPercent(value) {
  return value.toLocaleString("en-IN", { maximumFractionDigits: 1 });
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

function validate(mode, { capacity, current, target, budget, minutes, chargerKw }) {
  if (Number.isNaN(capacity) || capacity <= 0) {
    return { field: capacityInput, text: "Please enter a battery capacity greater than 0 kWh." };
  }
  if (Number.isNaN(current) || current < 0 || current > 100) {
    return { field: currentInput, text: "Battery now must be between 0 and 100%." };
  }
  if (mode === "target") {
    if (Number.isNaN(target) || target < 0 || target > 100) {
      return { field: targetInput, text: "Charge to must be between 0 and 100%." };
    }
    if (target <= current) {
      return { field: targetInput, text: "Charge to must be higher than your current battery level." };
    }
  } else if (current >= 100) {
    return { field: currentInput, text: "Your battery is already full." };
  }
  if (mode === "amount" && (Number.isNaN(budget) || budget <= 0)) {
    return { field: budgetInput, text: "Please enter an amount greater than ₹0." };
  }
  if (mode === "time" && (Number.isNaN(minutes) || minutes <= 0)) {
    return { field: timeInput, text: "Please enter a charging time greater than 0 minutes." };
  }
  if (isCustomCharger() && (Number.isNaN(chargerKw) || chargerKw <= 0)) {
    return { field: customKwInput, text: "Please enter a charger power greater than 0 kW." };
  }
  return null;
}

function resetOutputs() {
  outputEls.forEach((el) => {
    const running = animations.get(el);
    if (running) cancelAnimationFrame(running.frame);
    animations.delete(el);
    el.textContent = "—";
  });
  batteryNowEl.style.width = "0%";
  batteryAddEl.style.width = "0%";
  capNoteEl.hidden = true;
}

function showError(error) {
  numberInputs.forEach((el) => el.classList.toggle("invalid", el === error.field));
  messageEl.textContent = error.text;
  messageEl.hidden = false;
  resultsEl.classList.add("dimmed");
  resetOutputs();
}

function showIdle() {
  clearError();
  resetOutputs();
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

function prefsKey(user) {
  return PREFS_PREFIX + user;
}

function savePrefs(user) {
  const checked = chargerInputs.find((el) => el.checked);
  return storageSet(
    prefsKey(user),
    JSON.stringify({
      mode: selectedMode(),
      capacity: capacityInput.value,
      target: targetInput.value,
      budget: budgetInput.value,
      time: timeInput.value,
      rate: rateInput.value,
      gstOn: gstToggle.checked,
      charger: checked ? checked.value : null,
      customKw: customKwInput.value,
      customType: customTypeInput.value,
    })
  );
}

function loadPrefs(user) {
  const raw = storageGet(prefsKey(user));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function applyPrefs(prefs) {
  if (!prefs) return;
  const mode = modeInputs.find((el) => el.value === prefs.mode);
  if (mode) mode.checked = true;
  if (prefs.capacity) capacityInput.value = prefs.capacity;
  if (prefs.target) targetInput.value = prefs.target;
  if (typeof prefs.budget === "string") budgetInput.value = prefs.budget;
  if (typeof prefs.time === "string") timeInput.value = prefs.time;
  syncTargetPreset();
  syncMode();
  if (prefs.rate) rateInput.value = prefs.rate;
  if (typeof prefs.gstOn === "boolean") gstToggle.checked = prefs.gstOn;
  const charger = chargerInputs.find((el) => el.value === prefs.charger);
  if (charger) {
    charger.checked = true;
    if (charger.value === "custom") {
      if (prefs.customKw) customKwInput.value = prefs.customKw;
      if (prefs.customType === "ac" || prefs.customType === "dc") customTypeInput.value = prefs.customType;
    }
  }
  updateRateLabel();
  syncCustomCharger();
}

function setUser(user, { quickEntry = false } = {}) {
  currentUser = user;
  storageSet(USER_KEY, user);
  userLabelEl.textContent = user;
  userSetupEl.hidden = true;
  appEl.hidden = false;
  renderHistory();
  if (quickEntry) {
    applyPrefs(loadPrefs(user));
    currentInput.value = "";
    calculate();
    currentInput.focus();
  }
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
  renderUserList();
  usernameInput.focus();
}

function listUsers() {
  const users = new Set();
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      const prefix = [PREFS_PREFIX, LOG_PREFIX].find((p) => key.startsWith(p));
      if (prefix) {
        const user = key.slice(prefix.length);
        if (user) users.add(user);
      }
    }
  } catch {
    return [];
  }
  return Array.from(users).sort((a, b) => a.localeCompare(b));
}

function renderUserList() {
  const users = listUsers();
  userListWrapEl.hidden = users.length === 0;
  userListEl.replaceChildren(
    ...users.map((user, i) => {
      const li = document.createElement("li");
      li.className = "user-item";
      li.style.setProperty("--i", String(Math.min(i, 8)));

      const select = document.createElement("button");
      select.type = "button";
      select.className = "user-select";
      select.dataset.action = "select";
      select.dataset.user = user;
      select.textContent = user;

      const del = document.createElement("button");
      del.type = "button";
      del.className = "btn btn-ghost btn-danger";
      del.dataset.action = "delete";
      del.dataset.user = user;
      del.setAttribute("aria-label", `Delete ${user}`);
      del.textContent = "Delete";

      li.append(select, del);
      return li;
    })
  );
}

function deleteUser(user) {
  if (!window.confirm(`Delete all voltIQ data for ${user} on this device? This cannot be undone.`)) return;
  try {
    localStorage.removeItem(logKey(user));
    localStorage.removeItem(prefsKey(user));
  } catch {
    /* ignore */
  }
  if (user === currentUser || user === storageGet(USER_KEY)) {
    clearUser();
  } else {
    renderUserList();
  }
}

function initUser() {
  const stored = storageGet(USER_KEY);
  if (stored) {
    setUser(stored, { quickEntry: true });
  } else {
    userSetupEl.hidden = false;
    appEl.hidden = true;
    renderUserList();
  }
}

userListEl.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button || !userListEl.contains(button)) return;
  const user = button.dataset.user;
  if (!user) return;
  if (button.dataset.action === "select") {
    setUser(user, { quickEntry: true });
    showTab("tab-calc");
  } else if (button.dataset.action === "delete") {
    deleteUser(user);
  }
});

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

let dcEfficiency = DEFAULT_DC_EFFICIENCY;
let acEfficiency = DEFAULT_AC_EFFICIENCY;

function loadEfficiency(key, fallback) {
  const stored = storageGet(key);
  const percent = Number(stored);
  return stored !== null && Number.isFinite(percent) && percent >= 50 && percent <= 100
    ? percent / 100
    : fallback;
}

function initEfficiency() {
  dcEfficiency = loadEfficiency(DC_EFFICIENCY_KEY, DEFAULT_DC_EFFICIENCY);
  acEfficiency = loadEfficiency(AC_EFFICIENCY_KEY, DEFAULT_AC_EFFICIENCY);
  dcEfficiencyInput.value = String(Number((dcEfficiency * 100).toFixed(10)));
  acEfficiencyInput.value = String(Number((acEfficiency * 100).toFixed(10)));
}

function updateEfficiency(input, key) {
  const percent = Number(input.value);
  if (!input.value || !input.validity.valid || !Number.isFinite(percent) || percent < 50 || percent > 100) {
    input.classList.add("invalid");
    settingsMessageEl.textContent = "Efficiency must be between 50% and 100%.";
    settingsMessageEl.hidden = false;
    return;
  }

  input.classList.remove("invalid");
  settingsMessageEl.hidden = [dcEfficiencyInput, acEfficiencyInput].every((el) => !el.classList.contains("invalid"));
  if (key === DC_EFFICIENCY_KEY) dcEfficiency = percent / 100;
  else acEfficiency = percent / 100;
  storageSet(key, String(percent));
  calculate();
}

function isCustomCharger() {
  const checked = chargerInputs.find((el) => el.checked);
  return Boolean(checked) && checked.value === "custom";
}

function selectedChargerKw() {
  if (isCustomCharger()) return parseFloat(customKwInput.value);
  const checked = chargerInputs.find((el) => el.checked);
  return checked ? parseFloat(checked.value) : NaN;
}

function selectedChargerType() {
  const checked = chargerInputs.find((el) => el.checked);
  const type = checked?.value === "custom" ? customTypeInput.value : checked?.dataset.type;
  return type === "ac" ? "ac" : "dc";
}

function selectedEfficiency() {
  return selectedChargerType() === "ac" ? acEfficiency : dcEfficiency;
}

function syncCustomCharger() {
  const custom = isCustomCharger();
  customChargerEl.hidden = !custom;
  if (custom) customKwInput.focus();
}

function stepCurrent(delta) {
  const min = parseFloat(currentInput.min);
  const max = parseFloat(currentInput.max);
  const value = parseFloat(currentInput.value);
  const base = Number.isNaN(value) ? 0 : value;
  currentInput.value = String(Math.min(max, Math.max(min, base + delta)));
  calculate();
}

function isCustomTarget() {
  const checked = targetPresetInputs.find((el) => el.checked);
  return Boolean(checked) && checked.value === "custom";
}

function syncTargetPreset() {
  const target = parseFloat(targetInput.value);
  const preset = targetPresetInputs.find((el) => el.value !== "custom" && parseFloat(el.value) === target);
  const selected = preset || targetPresetInputs.find((el) => el.value === "custom");
  selected.checked = true;
  customTargetEl.hidden = !isCustomTarget();
}

function onTargetPresetChange() {
  const custom = isCustomTarget();
  customTargetEl.hidden = !custom;
  if (custom) {
    targetInput.focus();
    targetInput.select();
  } else {
    const checked = targetPresetInputs.find((el) => el.checked);
    if (checked) targetInput.value = checked.value;
  }
  calculate();
}

const MODE_LABELS = {
  target: { hero: "On the charger app", energy: "Energy to add", energyBuy: "Energy to buy" },
  amount: { hero: "Your budget gets you to", energy: "Energy to battery", energyBuy: "Energy bought" },
  time: { hero: "In that time you'll reach", energy: "Energy delivered", energyBuy: "Energy drawn" },
};

function selectedMode() {
  const checked = modeInputs.find((el) => el.checked);
  return checked && MODE_LABELS[checked.value] ? checked.value : "target";
}

function syncMode() {
  const mode = selectedMode();
  const labels = MODE_LABELS[mode];
  targetFieldEl.hidden = mode !== "target";
  budgetFieldEl.hidden = mode !== "amount";
  timeFieldEl.hidden = mode !== "time";
  heroEnterEl.hidden = mode !== "target";
  heroFinalEl.hidden = mode === "target";
  heroLabelEl.textContent = labels.hero;
  energyLabelEl.textContent = labels.energy;
  energyBuyLabelEl.textContent = labels.energyBuy;
}

function onModeChange() {
  syncMode();
  const mode = selectedMode();
  const input = mode === "amount" ? budgetInput : mode === "time" ? timeInput : null;
  if (input && input.value.trim() === "") input.focus();
  calculate();
  if (currentUser) savePrefs(currentUser);
}

function updateRateLabel() {
  rateValueEl.textContent = formatRate(parseFloat(rateInput.value));
}

function updateHeroSub(rate, gstOn) {
  heroSubEl.textContent = `at ${formatRate(rate)} · ${gstOn ? "includes 18% GST" : "no GST"}`;
}

function calculate() {
  const mode = selectedMode();
  const capacity = parseFloat(capacityInput.value);
  const current = parseFloat(currentInput.value);
  const target = parseFloat(targetInput.value);
  const budget = parseFloat(budgetInput.value);
  const minutes = parseFloat(timeInput.value);
  const chargerKw = selectedChargerKw();
  const rate = parseFloat(rateInput.value);
  const gstOn = gstToggle.checked;

  updateHeroSub(rate, gstOn);
  gstRowEl.hidden = !gstOn;

  const modeInput = mode === "amount" ? budgetInput : mode === "time" ? timeInput : null;
  if (currentInput.value.trim() === "" || (modeInput && modeInput.value.trim() === "")) {
    lastResult = null;
    logBtn.disabled = copyKwhBtn.disabled = true;
    showIdle();
    return;
  }

  const error = validate(mode, { capacity, current, target, budget, minutes, chargerKw });
  if (error) {
    lastResult = null;
    logBtn.disabled = copyKwhBtn.disabled = true;
    showError(error);
    return;
  }
  clearError();
  logBtn.disabled = copyKwhBtn.disabled = false;
  if (currentUser) savePrefs(currentUser);

  const efficiency = selectedEfficiency();
  let energy;
  let energyToBuy;
  let hours;
  if (mode === "amount") {
    energyToBuy = budget / rate;
    energy = energyToBuy * efficiency;
    hours = energyToBuy / chargerKw;
  } else if (mode === "time") {
    hours = minutes / 60;
    energyToBuy = chargerKw * hours;
    energy = energyToBuy * efficiency;
  } else {
    energy = (capacity * (target - current)) / 100;
    energyToBuy = energy / efficiency;
    hours = energyToBuy / chargerKw;
  }

  const room = (capacity * (100 - current)) / 100;
  const capped = mode !== "target" && energy > room;
  if (capped) {
    energy = room;
    energyToBuy = energy / efficiency;
    hours = energyToBuy / chargerKw;
  }

  const finalPct = mode === "target" ? target : Math.min(100, current + (energy / capacity) * 100);
  const total = mode === "amount" && !capped ? budget : energyToBuy * rate;
  const base = gstOn ? total / (1 + GST_RATE) : total;
  const gst = total - base;
  const enterKwh = kwhToEnter(energyToBuy);
  lastResult = { mode, energy, total, rate, gstOn, chargerKw, enterKwh, finalPct };

  if (mode === "target") {
    animateNumber(enterKwhEl, enterKwh, (v) => Math.round(v).toLocaleString("en-IN"));
  } else {
    animateNumber(finalPctEl, finalPct, formatPercent);
  }

  animateNumber(energyEl, energy, formatEnergy);
  animateNumber(energyBuyEl, energyToBuy, formatEnergy);
  animateNumber(totalEl, total, formatMoney);
  animateNumber(totalBreakdownEl, total, formatMoney);
  animateNumber(baseEl, base, formatMoney);
  animateNumber(gstEl, gst, formatMoney);
  timeEl.textContent = `~${formatDuration(hours)}`;

  capNoteEl.hidden = !capped;
  if (capped) {
    capNoteEl.textContent =
      mode === "amount"
        ? `Battery fills to 100% — only ₹${formatMoney(total)} of your ₹${formatMoney(budget)} is needed.`
        : `Battery fills to 100% after ~${formatDuration(hours)} of charging.`;
  }

  batteryNowEl.style.width = `${current}%`;
  batteryAddEl.style.width = `${finalPct - current}%`;

  pop((mode === "target" ? enterKwhEl : finalPctEl).parentElement);
  pop(timeEl.parentElement);
  heroEl.classList.remove("glow");
  void heroEl.offsetWidth;
  heroEl.classList.add("glow");
}

/* ---------- Copy kWh ---------- */

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    if (ok) resolve();
    else reject(new Error("copy failed"));
  });
}

function flashCopyLabel(text) {
  copyKwhBtn.textContent = text;
  clearTimeout(flashCopyLabel.timer);
  flashCopyLabel.timer = setTimeout(() => {
    copyKwhBtn.textContent = "Copy";
  }, 1600);
}

copyKwhBtn.addEventListener("click", () => {
  if (!lastResult) return;
  copyText(String(lastResult.enterKwh))
    .then(() => flashCopyLabel("Copied"))
    .catch(() => flashCopyLabel("Copy failed"));
});

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
currentDecBtn.addEventListener("click", () => stepCurrent(-1));
currentIncBtn.addEventListener("click", () => stepCurrent(1));
targetPresetInputs.forEach((el) => el.addEventListener("change", onTargetPresetChange));
modeInputs.forEach((el) => el.addEventListener("change", onModeChange));
rateInput.addEventListener("input", () => {
  updateRateLabel();
  calculate();
});
gstToggle.addEventListener("change", calculate);
customTypeInput.addEventListener("change", calculate);
dcEfficiencyInput.addEventListener("change", () => updateEfficiency(dcEfficiencyInput, DC_EFFICIENCY_KEY));
acEfficiencyInput.addEventListener("change", () => updateEfficiency(acEfficiencyInput, AC_EFFICIENCY_KEY));

initTheme();
initUser();
initEfficiency();
updateRateLabel();
syncCustomCharger();
syncTargetPreset();
syncMode();
calculate();
