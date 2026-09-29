const GST_RATE = 0.18;
const DEFAULT_DC_EFFICIENCY = 0.92;
const DEFAULT_AC_EFFICIENCY = 0.87;
const DC_EFFICIENCY_KEY = "voltiq-eff-dc";
const AC_EFFICIENCY_KEY = "voltiq-eff-ac";
const DEFAULT_CAR_AC_KW = 11;
const DEFAULT_CAR_DC_KW = 150;
const CAR_AC_KEY = "voltiq-car-ac";
const CAR_DC_KEY = "voltiq-car-dc";
const DEFAULT_DC_TAPER = 0.4;
const DC_TAPER_KEY = "voltiq-taper-dc";
const TAPER_SOC = 80;
const THEME_KEY = "voltiq-theme";
const USER_KEY = "voltiq-user";
const LOG_PREFIX = "voltiq-log:";
const PREFS_PREFIX = "voltiq-prefs:";
const OPERATORS_PREFIX = "voltiq-operators:";
const PHOTO_PREFIX = "voltiq-photo:";
const MAX_PHOTO_CHARS = 250000;
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
const gstLabelEl = document.getElementById("gst-label");
const operatorSelect = document.getElementById("operator");
const rateMinEl = document.getElementById("rate-min");
const rateMaxEl = document.getElementById("rate-max");
const operatorListEl = document.getElementById("operator-list");
const operatorEmptyEl = document.getElementById("operator-empty");
const operatorForm = document.getElementById("operator-form");
const opIdInput = document.getElementById("op-id");
const opNameInput = document.getElementById("op-name");
const opRateInput = document.getElementById("op-rate");
const opGstInput = document.getElementById("op-gst");
const opSessionInput = document.getElementById("op-session");
const opIdleInput = document.getElementById("op-idle");
const opSaveBtn = document.getElementById("op-save");
const opCancelBtn = document.getElementById("op-cancel");
const operatorMessageEl = document.getElementById("operator-message");
const customChargerEl = document.getElementById("custom-charger");
const customKwInput = document.getElementById("custom-kw");
const customTypeInput = document.getElementById("custom-type");
const dcEfficiencyInput = document.getElementById("eff-dc");
const acEfficiencyInput = document.getElementById("eff-ac");
const carAcInput = document.getElementById("car-ac");
const carDcInput = document.getElementById("car-dc");
const powerNoteEl = document.getElementById("power-note");
const dcTaperInput = document.getElementById("taper-dc");
const phasesEl = document.getElementById("phases");
const taperHintEl = document.getElementById("taper-hint");
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
const addChargeBtn = document.getElementById("add-charge-btn");
const logDialog = document.getElementById("log-dialog");
const logForm = document.getElementById("log-form");
const logDateInput = document.getElementById("log-date");
const logOperatorSelect = document.getElementById("log-operator");
const logTypeInput = document.getElementById("log-type");
const logKwInput = document.getElementById("log-kw");
const logStartInput = document.getElementById("log-start");
const logEndInput = document.getElementById("log-end");
const logKwhInput = document.getElementById("log-kwh");
const logAmountInput = document.getElementById("log-amount");
const logRateInput = document.getElementById("log-rate");
const logIdleInput = document.getElementById("log-idle");
const logOdoInput = document.getElementById("log-odo");
const logPreviewEl = document.getElementById("log-preview");
const logMessageEl = document.getElementById("log-message");
const logCancelBtn = document.getElementById("log-cancel");
const useLearnedDcInput = document.getElementById("use-learned-dc");
const useLearnedAcInput = document.getElementById("use-learned-ac");
const learnDcEl = document.getElementById("learn-dc");
const learnAcEl = document.getElementById("learn-ac");
const learnDcTextEl = document.getElementById("learn-dc-text");
const learnAcTextEl = document.getElementById("learn-ac-text");
const learnHintEl = document.getElementById("learn-hint");
const logPhotoInput = document.getElementById("log-photo");
const logPhotoPreviewEl = document.getElementById("log-photo-preview");
const logPhotoImg = document.getElementById("log-photo-img");
const logPhotoRemoveBtn = document.getElementById("log-photo-remove");
const photoDialog = document.getElementById("photo-dialog");
const photoFullImg = document.getElementById("photo-full");
const photoCloseBtn = document.getElementById("photo-close");

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
  return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })} / kWh`;
}

function formatEnergy(value) {
  return value.toLocaleString("en-IN", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function kwhToEnter(energyToBuy) {
  return Math.ceil(Math.round(energyToBuy * 1000) / 1000);
}

function formatKw(value) {
  return value.toLocaleString("en-IN", { maximumFractionDigits: 1 });
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
  powerNoteEl.hidden = true;
  phasesEl.hidden = true;
  taperHintEl.hidden = true;
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

function photoKey(user, timestamp) {
  return `${PHOTO_PREFIX}${user}:${timestamp}`;
}

function removePhotos(user) {
  try {
    const prefix = `${PHOTO_PREFIX}${user}:`;
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) keys.push(key);
    }
    keys.forEach((key) => localStorage.removeItem(key));
  } catch {
    /* ignore */
  }
}

// Entries are stored compactly (fields after k were added with the log form; older entries may lack them):
// t = timestamp (ms), e = battery kWh added, c = ₹ amount paid, r = ₹/kWh,
// g = GST (1 = incl., 2 = added on top, 0 = none), k = charger kW, b = kWh billed,
// s = start %, f = end %, y = charger type ("ac"/"dc"), o = operator name, oi = operator id,
// d = odometer km, m = idle minutes, fe = ₹ session + idle fees, x = real efficiency (0–1),
// q = effective ₹/kWh incl. fees, p = 1 when a receipt photo is stored under photoKey(user, t)
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
      operator: operatorSelect.value,
      learnDc: useLearnedDcInput.checked,
      learnAc: useLearnedAcInput.checked,
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
  useLearnedDcInput.checked = prefs.learnDc === true;
  useLearnedAcInput.checked = prefs.learnAc === true;
  renderOperatorSelect();
  const operator = findOperator(prefs.operator);
  if (operator) {
    operatorSelect.value = operator.id;
    applyOperator(operator);
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
  operators = loadOperators(user);
  useLearnedDcInput.checked = useLearnedAcInput.checked = false;
  renderOperatorSelect();
  renderOperatorList();
  resetOperatorForm();
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
      const prefix = [PREFS_PREFIX, LOG_PREFIX, OPERATORS_PREFIX].find((p) => key.startsWith(p));
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
    localStorage.removeItem(operatorsKey(user));
    removePhotos(user);
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

/* ---------- Operators ---------- */

let operators = [];

function operatorsKey(user) {
  return OPERATORS_PREFIX + user;
}

// Operators are stored per user: id, n = name, r = ₹/kWh, g = rate includes GST (1/0), s = session fee ₹, f = idle fee ₹/min
function loadOperators(user) {
  const raw = storageGet(operatorsKey(user));
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((o) => o && o.id && o.n && o.r > 0) : [];
  } catch {
    return [];
  }
}

function saveOperators(user, list) {
  return storageSet(operatorsKey(user), JSON.stringify(list));
}

function findOperator(id) {
  return operators.find((o) => o.id === id) || null;
}

function selectedOperator() {
  return findOperator(operatorSelect.value);
}

function formatOperatorFees(op) {
  const fees = [];
  if (op.s > 0) fees.push(`₹${formatMoney(op.s)} session`);
  if (op.f > 0) fees.push(`₹${formatMoney(op.f)}/min idle`);
  return fees;
}

function renderOperatorSelect() {
  const selected = operatorSelect.value;
  const manual = document.createElement("option");
  manual.value = "";
  manual.textContent = "Manual rate";
  operatorSelect.replaceChildren(
    manual,
    ...operators.map((op) => {
      const option = document.createElement("option");
      option.value = op.id;
      option.textContent = `${op.n} · ${formatRate(op.r)} ${op.g ? "incl. GST" : "+18% GST"}`;
      return option;
    })
  );
  operatorSelect.value = findOperator(selected) ? selected : "";
}

function renderOperatorList() {
  operatorEmptyEl.hidden = operators.length > 0;
  operatorListEl.replaceChildren(
    ...operators.map((op, i) => {
      const li = document.createElement("li");
      li.className = "history-item";
      li.style.setProperty("--i", String(Math.min(i, 8)));

      const main = document.createElement("div");
      main.className = "history-main";
      const name = document.createElement("strong");
      name.textContent = op.n;
      const meta = document.createElement("span");
      meta.className = "history-meta";
      meta.textContent = [`${formatRate(op.r)} ${op.g ? "incl. GST" : "+18% GST"}`, ...formatOperatorFees(op)].join(" · ");
      main.append(name, meta);

      const side = document.createElement("div");
      side.className = "history-side";
      const edit = document.createElement("button");
      edit.type = "button";
      edit.className = "btn btn-ghost";
      edit.textContent = "Edit";
      edit.addEventListener("click", () => editOperator(op.id));
      const del = document.createElement("button");
      del.type = "button";
      del.className = "icon-btn";
      del.setAttribute("aria-label", `Delete ${op.n}`);
      del.textContent = "×";
      del.addEventListener("click", () => deleteOperator(op.id));
      side.append(edit, del);

      li.append(main, side);
      return li;
    })
  );
}

function resetOperatorForm() {
  operatorForm.reset();
  opIdInput.value = "";
  opGstInput.checked = true;
  opSaveBtn.textContent = "Add operator";
  opCancelBtn.hidden = true;
  operatorMessageEl.hidden = true;
  [opNameInput, opRateInput, opSessionInput, opIdleInput].forEach((el) => el.classList.remove("invalid"));
}

function editOperator(id) {
  const op = findOperator(id);
  if (!op) return;
  resetOperatorForm();
  opIdInput.value = op.id;
  opNameInput.value = op.n;
  opRateInput.value = String(op.r);
  opGstInput.checked = Boolean(op.g);
  opSessionInput.value = op.s ? String(op.s) : "";
  opIdleInput.value = op.f ? String(op.f) : "";
  opSaveBtn.textContent = "Save changes";
  opCancelBtn.hidden = false;
  opNameInput.focus();
}

function operatorFormError() {
  const name = opNameInput.value.trim();
  const rate = Number(opRateInput.value);
  const session = opSessionInput.value.trim() === "" ? 0 : Number(opSessionInput.value);
  const idle = opIdleInput.value.trim() === "" ? 0 : Number(opIdleInput.value);
  if (!name) return { field: opNameInput, text: "Please enter an operator name." };
  if (!opRateInput.value || !Number.isFinite(rate) || rate <= 0 || rate > 200) {
    return { field: opRateInput, text: "Rate must be between ₹0.01 and ₹200 / kWh." };
  }
  if (!Number.isFinite(session) || session < 0) return { field: opSessionInput, text: "Session fee can't be negative." };
  if (!Number.isFinite(idle) || idle < 0) return { field: opIdleInput, text: "Idle fee can't be negative." };
  return null;
}

function submitOperator(event) {
  event.preventDefault();
  if (!currentUser) return;
  const fields = [opNameInput, opRateInput, opSessionInput, opIdleInput];
  const error = operatorFormError();
  fields.forEach((el) => el.classList.toggle("invalid", Boolean(error) && el === error.field));
  if (error) {
    operatorMessageEl.textContent = error.text;
    operatorMessageEl.hidden = false;
    error.field.focus();
    return;
  }

  const op = {
    id: opIdInput.value || Date.now().toString(36),
    n: opNameInput.value.trim().slice(0, 32),
    r: Number(opRateInput.value),
    g: opGstInput.checked ? 1 : 0,
    s: Number(opSessionInput.value) || 0,
    f: Number(opIdleInput.value) || 0,
  };
  const index = operators.findIndex((o) => o.id === op.id);
  const next = index >= 0 ? operators.map((o) => (o.id === op.id ? op : o)) : [...operators, op];
  if (!saveOperators(currentUser, next)) {
    operatorMessageEl.textContent = "Couldn't save — storage is unavailable on this device.";
    operatorMessageEl.hidden = false;
    return;
  }
  operators = next;
  renderOperatorSelect();
  renderOperatorList();
  resetOperatorForm();
  if (operatorSelect.value === op.id) onOperatorChange();
}

function deleteOperator(id) {
  const op = findOperator(id);
  if (!op || !currentUser) return;
  if (!window.confirm(`Delete operator ${op.n}?`)) return;
  operators = operators.filter((o) => o.id !== id);
  saveOperators(currentUser, operators);
  if (opIdInput.value === id) resetOperatorForm();
  renderOperatorSelect();
  renderOperatorList();
  calculate();
  savePrefs(currentUser);
}

function syncRateBounds(rate) {
  rateInput.min = String(Math.min(5, Math.floor(rate)));
  rateInput.max = String(Math.max(40, Math.ceil(rate)));
  rateInput.step = Number.isInteger(rate * 2) ? "0.5" : "0.01";
  rateMinEl.textContent = `₹${rateInput.min}`;
  rateMaxEl.textContent = `₹${rateInput.max}`;
}

function applyOperator(op) {
  syncRateBounds(op.r);
  rateInput.value = String(op.r);
  gstToggle.checked = Boolean(op.g);
}

function onOperatorChange() {
  const op = selectedOperator();
  if (op) applyOperator(op);
  updateRateLabel();
  calculate();
  if (currentUser) savePrefs(currentUser);
}

function onRateInput() {
  const op = selectedOperator();
  if (op && parseFloat(rateInput.value) !== op.r) {
    operatorSelect.value = "";
    rateInput.step = "0.5";
  }
  updateRateLabel();
  calculate();
}

operatorSelect.addEventListener("change", onOperatorChange);
operatorForm.addEventListener("submit", submitOperator);
opCancelBtn.addEventListener("click", resetOperatorForm);

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

const LEARN_MIN_LOGS = 3;
let learned = { ac: null, dc: null };

function formatDate(ms) {
  return new Date(ms).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function entrySpent(entry) {
  return (Number(entry.c) || 0) + (Number(entry.fe) || 0);
}

function computeLearned(entries) {
  const result = { ac: null, dc: null };
  ["ac", "dc"].forEach((type) => {
    const values = entries.filter((e) => e.y === type && e.x >= 0.5 && e.x <= 1).map((e) => e.x);
    if (values.length >= LEARN_MIN_LOGS) {
      result[type] = { avg: values.reduce((sum, x) => sum + x, 0) / values.length, n: values.length };
    }
  });
  return result;
}

function learnedEfficiency(type) {
  const toggle = type === "ac" ? useLearnedAcInput : useLearnedDcInput;
  return toggle.checked && learned[type] ? learned[type].avg : null;
}

function renderLearned() {
  [
    ["dc", learnDcEl, learnDcTextEl],
    ["ac", learnAcEl, learnAcTextEl],
  ].forEach(([type, wrap, text]) => {
    const value = learned[type];
    wrap.hidden = !value;
    if (value) {
      text.textContent = `Use learned ${type.toUpperCase()} efficiency: ${formatPercent(value.avg * 100)}% (from ${value.n} charges)`;
    }
  });
  learnHintEl.hidden = Boolean(learned.ac && learned.dc);
}

function renderHistory() {
  if (!currentUser) return;
  const entries = loadLog(currentUser);
  learned = computeLearned(entries);
  renderLearned();
  const spent = entries.reduce((sum, e) => sum + entrySpent(e), 0);
  const energy = entries.reduce((sum, e) => sum + (Number(e.e) || 0), 0);

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
        cost.textContent = `₹${formatMoney(entrySpent(entry))}`;
        const meta = document.createElement("span");
        meta.className = "history-meta";
        const gst = entry.g === 2 ? " · +GST" : entry.g ? " · GST" : "";
        const charger = [entry.y ? entry.y.toUpperCase() : "", entry.k ? `${entry.k} kW` : ""].filter(Boolean).join(" ");
        meta.textContent =
          typeof entry.b === "number"
            ? [
                `${formatEnergy(entry.b)} kWh billed`,
                typeof entry.s === "number" && typeof entry.f === "number"
                  ? `${formatPercent(entry.s)}→${formatPercent(entry.f)}%`
                  : "",
                charger,
                entry.o || "",
              ]
                .filter(Boolean)
                .join(" · ")
            : `${formatEnergy(entry.e)} kWh · ${formatRate(entry.r)}${gst} · ${entry.k} kW`;
        main.append(cost, meta);

        const extra = [
          typeof entry.x === "number" ? `${formatPercent(entry.x * 100)}% efficient` : "",
          typeof entry.q === "number" ? `${formatRate(entry.q)} effective` : "",
          typeof entry.d === "number" ? `${entry.d.toLocaleString("en-IN")} km` : "",
        ].filter(Boolean);
        if (extra.length) {
          const meta2 = document.createElement("span");
          meta2.className = "history-meta";
          meta2.textContent = extra.join(" · ");
          main.append(meta2);
        }

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
        const photo = entry.p ? storageGet(photoKey(currentUser, entry.t)) : null;
        if (photo) {
          const thumb = document.createElement("button");
          thumb.type = "button";
          thumb.className = "photo-thumb";
          thumb.setAttribute("aria-label", "View receipt photo");
          const img = document.createElement("img");
          img.src = photo;
          img.alt = "";
          thumb.append(img);
          thumb.addEventListener("click", () => openPhoto(photo));
          side.append(thumb);
        }
        side.append(date, del);

        li.append(main, side);
        return li;
      })
  );
}

function openPhoto(src) {
  photoFullImg.src = src;
  if (typeof photoDialog.showModal === "function") photoDialog.showModal();
  else photoDialog.setAttribute("open", "");
}

function closePhoto() {
  if (typeof photoDialog.close === "function") photoDialog.close();
  else photoDialog.removeAttribute("open");
  photoFullImg.removeAttribute("src");
}

function showToast(text) {
  logToastEl.textContent = text;
  logToastEl.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    logToastEl.hidden = true;
  }, 2200);
}

/* ---------- Log form ---------- */

const logFormNumbers = () => [logKwInput, logStartInput, logEndInput, logKwhInput, logAmountInput, logRateInput, logIdleInput, logOdoInput];

function toLocalInput(ms) {
  const date = new Date(ms);
  return new Date(ms - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

function renderLogOperators(selectedId) {
  const none = document.createElement("option");
  none.value = "";
  none.textContent = "None / manual";
  logOperatorSelect.replaceChildren(
    none,
    ...operators.map((op) => {
      const option = document.createElement("option");
      option.value = op.id;
      option.textContent = op.n;
      return option;
    })
  );
  logOperatorSelect.value = findOperator(selectedId) ? selectedId : "";
}

let pendingPhoto = null;

function setPendingPhoto(dataUrl) {
  pendingPhoto = dataUrl;
  logPhotoPreviewEl.hidden = !dataUrl;
  if (dataUrl) logPhotoImg.src = dataUrl;
  else {
    logPhotoImg.removeAttribute("src");
    logPhotoInput.value = "";
  }
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image load failed"));
    img.src = src;
  });
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// Downscales and re-encodes as JPEG until the data URL fits MAX_PHOTO_CHARS.
async function compressPhoto(file) {
  const img = await loadImage(await readFileAsDataUrl(file));
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  let maxSide = 1024;
  let quality = 0.7;
  while (maxSide >= 320) {
    const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
    canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", quality);
    if (dataUrl.length <= MAX_PHOTO_CHARS) return dataUrl;
    if (quality > 0.45) quality -= 0.15;
    else maxSide = Math.round(maxSide * 0.75);
  }
  return null;
}

async function onPhotoChange() {
  const file = logPhotoInput.files && logPhotoInput.files[0];
  logMessageEl.hidden = true;
  if (!file) {
    setPendingPhoto(null);
    return;
  }
  try {
    const dataUrl = await compressPhoto(file);
    if (!dataUrl) throw new Error("too large");
    setPendingPhoto(dataUrl);
  } catch {
    setPendingPhoto(null);
    logMessageEl.textContent = "Couldn't read that photo — try a smaller image.";
    logMessageEl.hidden = false;
  }
}

function openLogForm(values = {}) {
  if (!currentUser) return;
  logForm.reset();
  setPendingPhoto(null);
  logFormNumbers().forEach((el) => el.classList.remove("invalid"));
  logMessageEl.hidden = true;
  logDateInput.value = toLocalInput(Date.now());
  renderLogOperators(values.operatorId ?? operatorSelect.value);
  logTypeInput.value = values.type || selectedChargerType();
  const set = (input, value) => {
    input.value = typeof value === "number" && Number.isFinite(value) ? String(value) : "";
  };
  set(logKwInput, values.kw);
  set(logStartInput, values.start);
  set(logEndInput, values.end);
  set(logKwhInput, values.kwh);
  set(logAmountInput, values.amount);
  set(logRateInput, values.rate);
  updateLogPreview();
  if (typeof logDialog.showModal === "function") logDialog.showModal();
  else logDialog.setAttribute("open", "");
}

function closeLogForm() {
  if (typeof logDialog.close === "function") logDialog.close();
  else logDialog.removeAttribute("open");
}

function readOptional(input) {
  return input.value.trim() === "" ? null : Number(input.value);
}

function readLogForm() {
  const op = findOperator(logOperatorSelect.value);
  const capacity = parseFloat(capacityInput.value);
  const start = readOptional(logStartInput);
  const end = readOptional(logEndInput);
  const kwh = readOptional(logKwhInput);
  const amount = readOptional(logAmountInput);
  const idle = readOptional(logIdleInput) ?? 0;
  const fees = op ? (op.s || 0) + (op.f || 0) * idle : 0;
  const energy = start !== null && end !== null && capacity > 0 ? ((end - start) * capacity) / 100 : null;
  return {
    op,
    t: new Date(logDateInput.value).getTime(),
    type: logTypeInput.value === "ac" ? "ac" : "dc",
    kw: readOptional(logKwInput),
    start,
    end,
    kwh,
    amount,
    rate: readOptional(logRateInput),
    idle,
    odo: readOptional(logOdoInput),
    capacity,
    fees,
    energy,
    efficiency: energy !== null && kwh > 0 ? energy / kwh : null,
    effectiveRate: amount !== null && kwh > 0 ? (amount + fees) / kwh : null,
  };
}

function logFormError(v) {
  if (!Number.isFinite(v.t)) return { field: logDateInput, text: "Please enter the date and time of the charge." };
  if (v.kw !== null && !(v.kw > 0)) return { field: logKwInput, text: "Charger power must be greater than 0 kW." };
  if (v.start === null || !(v.start >= 0 && v.start <= 100)) return { field: logStartInput, text: "Start % must be between 0 and 100." };
  if (v.end === null || !(v.end >= 0 && v.end <= 100)) return { field: logEndInput, text: "End % must be between 0 and 100." };
  if (v.end <= v.start) return { field: logEndInput, text: "End % must be higher than start %." };
  if (v.kwh === null || !(v.kwh > 0)) return { field: logKwhInput, text: "kWh billed must be greater than 0." };
  if (v.amount === null || !(v.amount >= 0)) return { field: logAmountInput, text: "Please enter the amount you paid." };
  if (v.rate !== null && !(v.rate >= 0)) return { field: logRateInput, text: "Rate can't be negative." };
  if (!(v.idle >= 0)) return { field: logIdleInput, text: "Idle time can't be negative." };
  if (v.odo !== null && !(v.odo >= 0)) return { field: logOdoInput, text: "Odometer can't be negative." };
  if (!(v.capacity > 0)) return { field: logStartInput, text: "Set your battery capacity on the Calculator first." };
  return null;
}

function updateLogPreview() {
  const v = readLogForm();
  const parts = [];
  if (v.efficiency !== null && v.efficiency > 0) parts.push(`Real efficiency ${formatPercent(v.efficiency * 100)}%`);
  if (v.effectiveRate !== null) {
    parts.push(`Effective ${formatRate(v.effectiveRate)}${v.fees > 0 ? ` incl. ₹${formatMoney(v.fees)} fees` : ""}`);
  }
  logPreviewEl.textContent = parts.length ? parts.join(" · ") : "Fill in start %, end %, kWh billed and amount paid.";
}

function uniqueTimestamp(entries, t) {
  let ms = t;
  while (entries.some((e) => e.t === ms)) ms += 1;
  return ms;
}

function round2(value) {
  return Math.round(value * 100) / 100;
}

function saveLogForm(event) {
  event.preventDefault();
  if (!currentUser) return;
  const v = readLogForm();
  const error = logFormError(v);
  [logDateInput, ...logFormNumbers()].forEach((el) => el.classList.toggle("invalid", Boolean(error) && el === error.field));
  if (error) {
    logMessageEl.textContent = error.text;
    logMessageEl.hidden = false;
    error.field.focus();
    return;
  }

  const entries = loadLog(currentUser);
  const learnedBefore = computeLearned(entries);
  const gstIncluded = v.op ? v.op.g : gstToggle.checked;
  const entry = {
    t: uniqueTimestamp(entries, v.t),
    e: round2(v.energy),
    c: round2(v.amount),
    r: round2(v.rate ?? v.amount / v.kwh),
    g: v.op && !v.op.g ? 2 : gstIncluded ? 1 : 0,
    k: v.kw ?? "",
    b: round2(v.kwh),
    s: v.start,
    f: v.end,
    y: v.type,
    x: Math.round(v.efficiency * 10000) / 10000,
    q: round2(v.effectiveRate),
  };
  if (v.op) {
    entry.o = v.op.n;
    entry.oi = v.op.id;
  }
  if (v.fees > 0) entry.fe = round2(v.fees);
  if (v.idle > 0) entry.m = v.idle;
  if (v.odo !== null) entry.d = v.odo;
  const photoSkipped = Boolean(pendingPhoto) && !storageSet(photoKey(currentUser, entry.t), pendingPhoto);
  if (pendingPhoto && !photoSkipped) entry.p = 1;
  entries.push(entry);
  entries.sort((a, b) => a.t - b.t);

  if (!saveLog(currentUser, entries)) {
    if (entry.p) {
      try {
        localStorage.removeItem(photoKey(currentUser, entry.t));
      } catch {
        /* ignore */
      }
    }
    logMessageEl.textContent = "Couldn't save — storage is unavailable or full on this device.";
    logMessageEl.hidden = false;
    return;
  }
  closeLogForm();
  setPendingPhoto(null);
  renderHistory();
  showToast(
    photoSkipped
      ? "Charge logged, but the receipt photo wasn't saved — this device's storage is full."
      : `Logged ₹${formatMoney(entrySpent(entry))} for ${formatEnergy(entry.b)} kWh · ${formatPercent(entry.x * 100)}% efficient`
  );
  pop(logBtn);
  offerLearned(learnedBefore, entry.y);
  calculate();
}

function offerLearned(before, type) {
  const now = learned[type];
  const toggle = type === "ac" ? useLearnedAcInput : useLearnedDcInput;
  if (!now || before[type] || toggle.checked) return;
  const manual = (type === "ac" ? acEfficiency : dcEfficiency) * 100;
  const ok = window.confirm(
    `voltIQ learned your real ${type.toUpperCase()} efficiency from ${now.n} charges: ${formatPercent(now.avg * 100)}% ` +
      `(your setting is ${formatPercent(manual)}%). Use the learned value for calculations?`
  );
  if (ok) {
    toggle.checked = true;
    onLearnedToggle();
  }
}

function onLearnedToggle() {
  if (currentUser) savePrefs(currentUser);
  calculate();
}

function logCharge() {
  if (!currentUser || !lastResult) return;
  openLogForm({
    start: lastResult.current,
    end: Math.round(lastResult.finalPct * 10) / 10,
    kwh: round2(lastResult.energyToBuy),
    amount: round2(lastResult.total),
    rate: lastResult.rate,
    operatorId: lastResult.operatorId,
    type: lastResult.chargerType,
    kw: lastResult.chargerKw,
  });
}

function deleteEntry(timestamp) {
  if (!currentUser) return;
  try {
    localStorage.removeItem(photoKey(currentUser, timestamp));
  } catch {
    /* ignore */
  }
  saveLog(currentUser, loadLog(currentUser).filter((e) => e.t !== timestamp));
  renderHistory();
  calculate();
}

function csvCell(value) {
  if (value === undefined || value === null) return "";
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function exportCsv() {
  if (!currentUser) return;
  const rows = [[
    "date", "energy_kwh", "cost_inr", "rate_inr_per_kwh", "gst_included", "charger_kw",
    "kwh_billed", "start_pct", "end_pct", "charger_type", "operator", "odometer_km",
    "real_efficiency_pct", "idle_minutes", "fees_inr", "effective_inr_per_kwh",
  ]];
  loadLog(currentUser).forEach((e) => {
    rows.push([
      new Date(e.t).toISOString(), e.e, e.c, e.r, e.g === 2 ? "added" : e.g ? "yes" : "no", e.k,
      e.b, e.s, e.f, e.y, e.o, e.d,
      typeof e.x === "number" ? round2(e.x * 100) : "", e.m, e.fe, e.q,
    ]);
  });
  const csv = rows.map((r) => r.map(csvCell).join(",")).join("\n");
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
  removePhotos(currentUser);
  renderHistory();
  calculate();
}

logBtn.addEventListener("click", logCharge);
addChargeBtn.addEventListener("click", () => openLogForm());
exportBtn.addEventListener("click", exportCsv);
clearBtn.addEventListener("click", clearHistory);
logForm.addEventListener("submit", saveLogForm);
logForm.addEventListener("input", updateLogPreview);
logForm.addEventListener("change", updateLogPreview);
logCancelBtn.addEventListener("click", closeLogForm);
logPhotoInput.addEventListener("change", onPhotoChange);
logPhotoRemoveBtn.addEventListener("click", () => setPendingPhoto(null));
photoCloseBtn.addEventListener("click", closePhoto);
photoDialog.addEventListener("click", (event) => {
  if (event.target === photoDialog) closePhoto();
});
useLearnedDcInput.addEventListener("change", onLearnedToggle);
useLearnedAcInput.addEventListener("change", onLearnedToggle);

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
  syncSettingsMessage();
  if (key === DC_EFFICIENCY_KEY) dcEfficiency = percent / 100;
  else acEfficiency = percent / 100;
  storageSet(key, String(percent));
  calculate();
}

function syncSettingsMessage() {
  settingsMessageEl.hidden = settingsInputs().every((el) => !el.classList.contains("invalid"));
}

function settingsInputs() {
  return [dcEfficiencyInput, acEfficiencyInput, carAcInput, carDcInput, dcTaperInput];
}

let dcTaper = DEFAULT_DC_TAPER;

function loadTaper() {
  const stored = storageGet(DC_TAPER_KEY);
  const percent = Number(stored);
  return stored !== null && Number.isFinite(percent) && percent >= 10 && percent <= 100
    ? percent / 100
    : DEFAULT_DC_TAPER;
}

function initTaper() {
  dcTaper = loadTaper();
  dcTaperInput.value = String(Number((dcTaper * 100).toFixed(10)));
}

function updateTaper() {
  const percent = Number(dcTaperInput.value);
  if (!dcTaperInput.value || !dcTaperInput.validity.valid || !Number.isFinite(percent) || percent < 10 || percent > 100) {
    dcTaperInput.classList.add("invalid");
    settingsMessageEl.textContent = "DC taper power must be between 10% and 100%.";
    settingsMessageEl.hidden = false;
    return;
  }

  dcTaperInput.classList.remove("invalid");
  syncSettingsMessage();
  dcTaper = percent / 100;
  storageSet(DC_TAPER_KEY, String(percent));
  calculate();
}

// Splits a charge into a full-power phase up to 80% and, on DC only, a tapered phase above 80%.
function chargingPhases(current, target, capacity, powerBelow80, isDC, efficiency = 1) {
  const split = isDC ? Math.min(Math.max(current, TAPER_SOC), target) : target;
  const phases = [];
  if (split > current) phases.push({ from: current, to: split, power: powerBelow80, tapered: false });
  if (target > split) phases.push({ from: split, to: target, power: powerBelow80 * dcTaper, tapered: true });
  return phases.map((phase) => {
    const energyToBuy = (capacity * (phase.to - phase.from)) / 100 / efficiency;
    const hours = energyToBuy / phase.power;
    return { ...phase, energyToBuy, hours, minutes: hours * 60 };
  });
}

// Battery-side kWh added in a given time, following the same phases as chargingPhases().
function energyForHours(current, capacity, powerBelow80, isDC, efficiency, hours) {
  if (!isDC) return powerBelow80 * hours * efficiency;
  const taperPower = powerBelow80 * dcTaper;
  if (current >= TAPER_SOC) return taperPower * hours * efficiency;
  const energyTo80 = (capacity * (TAPER_SOC - current)) / 100;
  const hoursTo80 = energyTo80 / efficiency / powerBelow80;
  if (hours <= hoursTo80) return powerBelow80 * hours * efficiency;
  return energyTo80 + taperPower * (hours - hoursTo80) * efficiency;
}

function renderPhases(phases) {
  const split = phases.length === 2;
  phasesEl.hidden = !split;
  taperHintEl.hidden = !split;
  if (!split) return;
  phasesEl.textContent = phases
    .map((p) => `${formatPercent(p.from)}→${formatPercent(p.to)}%: ${formatDuration(p.hours)}`)
    .join(", ");
  taperHintEl.textContent = `Stopping at ${TAPER_SOC}% saves ${formatDuration(phases[1].hours)}`;
}

let carAcKw = DEFAULT_CAR_AC_KW;
let carDcKw = DEFAULT_CAR_DC_KW;

function loadCarLimit(key, fallback) {
  const stored = storageGet(key);
  const kw = Number(stored);
  return stored !== null && Number.isFinite(kw) && kw > 0 && kw <= 1000 ? kw : fallback;
}

function initCarProfile() {
  carAcKw = loadCarLimit(CAR_AC_KEY, DEFAULT_CAR_AC_KW);
  carDcKw = loadCarLimit(CAR_DC_KEY, DEFAULT_CAR_DC_KW);
  carAcInput.value = String(carAcKw);
  carDcInput.value = String(carDcKw);
}

function updateCarLimit(input, key) {
  const kw = Number(input.value);
  if (!input.value || !input.validity.valid || !Number.isFinite(kw) || kw <= 0 || kw > 1000) {
    input.classList.add("invalid");
    settingsMessageEl.textContent = "Car max power must be between 1 and 1000 kW.";
    settingsMessageEl.hidden = false;
    return;
  }

  input.classList.remove("invalid");
  syncSettingsMessage();
  if (key === CAR_AC_KEY) carAcKw = kw;
  else carDcKw = kw;
  storageSet(key, String(kw));
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

function carLimitKw(type) {
  return type === "ac" ? carAcKw : carDcKw;
}

function effectivePower() {
  return Math.min(selectedChargerKw(), carLimitKw(selectedChargerType()));
}

function updatePowerNote(chargerKw) {
  const type = selectedChargerType();
  const limit = carLimitKw(type);
  const limited = limit < chargerKw;
  powerNoteEl.hidden = !limited;
  if (limited) {
    powerNoteEl.textContent = `Your car accepts max ${formatKw(limit)} kW ${type.toUpperCase()}`;
  }
}

function selectedEfficiency() {
  const type = selectedChargerType();
  return learnedEfficiency(type) ?? (type === "ac" ? acEfficiency : dcEfficiency);
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

// "incl" = rate already includes GST, "added" = operator adds 18% on top, "none" = no GST
function gstMode() {
  if (gstToggle.checked) return "incl";
  return selectedOperator() ? "added" : "none";
}

const GST_LABELS = { incl: "incl. GST", added: "+18% GST", none: "no GST" };

function updateRateLabel() {
  const op = selectedOperator();
  rateValueEl.textContent = `${formatRate(parseFloat(rateInput.value))} · ${GST_LABELS[gstMode()]}`;
  gstLabelEl.textContent = op ? "Rate includes 18% GST" : "Include 18% GST";
}

function updateHeroSub(rate, mode) {
  const op = selectedOperator();
  const parts = [`at ${formatRate(rate)} ${GST_LABELS[mode]}`];
  if (op) parts.push(op.n, ...formatOperatorFees(op).map((fee) => `+ ${fee}`));
  heroSubEl.textContent = parts.join(" · ");
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
  const gstOn = gstMode();
  const grossRate = gstOn === "added" ? rate * (1 + GST_RATE) : rate;

  updateRateLabel();
  updateHeroSub(rate, gstOn);
  gstRowEl.hidden = gstOn === "none";

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
  const power = effectivePower();
  const isDC = selectedChargerType() === "dc";
  updatePowerNote(chargerKw);
  let energy;
  let energyToBuy;
  let hours;
  if (mode === "amount") {
    energyToBuy = budget / grossRate;
    energy = energyToBuy * efficiency;
  } else if (mode === "time") {
    hours = minutes / 60;
    energy = energyForHours(current, capacity, power, isDC, efficiency, hours);
    energyToBuy = energy / efficiency;
  } else {
    energy = (capacity * (target - current)) / 100;
    energyToBuy = energy / efficiency;
  }

  const room = (capacity * (100 - current)) / 100;
  const capped = mode !== "target" && energy > room;
  if (capped) {
    energy = room;
    energyToBuy = energy / efficiency;
  }

  const finalPct = mode === "target" ? target : Math.min(100, current + (energy / capacity) * 100);
  const phases = chargingPhases(current, finalPct, capacity, power, isDC, efficiency);
  if (mode !== "time" || capped) hours = phases.reduce((sum, p) => sum + p.hours, 0);
  const total = mode === "amount" && !capped ? budget : energyToBuy * grossRate;
  const base = gstOn === "none" ? total : total / (1 + GST_RATE);
  const gst = total - base;
  const enterKwh = kwhToEnter(energyToBuy);
  lastResult = {
    mode,
    energy,
    energyToBuy,
    total,
    rate,
    gstOn,
    chargerKw,
    chargerType: selectedChargerType(),
    operatorId: operatorSelect.value,
    current,
    enterKwh,
    finalPct,
  };

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
  renderPhases(phases);

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
rateInput.addEventListener("input", onRateInput);
gstToggle.addEventListener("change", () => {
  updateRateLabel();
  calculate();
});
customTypeInput.addEventListener("change", calculate);
dcEfficiencyInput.addEventListener("change", () => updateEfficiency(dcEfficiencyInput, DC_EFFICIENCY_KEY));
acEfficiencyInput.addEventListener("change", () => updateEfficiency(acEfficiencyInput, AC_EFFICIENCY_KEY));
carAcInput.addEventListener("change", () => updateCarLimit(carAcInput, CAR_AC_KEY));
carDcInput.addEventListener("change", () => updateCarLimit(carDcInput, CAR_DC_KEY));
dcTaperInput.addEventListener("change", updateTaper);

initTheme();
initUser();
initEfficiency();
initCarProfile();
initTaper();
updateRateLabel();
syncCustomCharger();
syncTargetPreset();
syncMode();
calculate();
