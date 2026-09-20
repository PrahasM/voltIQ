const RATE_PER_KWH = 25; // ₹, inclusive of GST
const GST_RATE = 0.18;
const CHARGING_EFFICIENCY = 0.9; // rough allowance for losses and tapering
const THEME_KEY = "voltiq-theme";

const capacityInput = document.getElementById("capacity");
const currentInput = document.getElementById("current");
const targetInput = document.getElementById("target");
const chargerInputs = Array.from(document.querySelectorAll('input[name="charger"]'));

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

const numberInputs = [capacityInput, currentInput, targetInput];
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

function validate(capacity, current, target) {
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
  return null;
}

function showError(error) {
  numberInputs.forEach((el) => el.classList.toggle("invalid", el === error.field));
  messageEl.textContent = error.text;
  messageEl.hidden = false;
  resultsEl.classList.add("dimmed");
  outputEls.forEach((el) => {
    el.textContent = "—";
    animations.delete(el);
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

/* ---------- Calculation ---------- */

function selectedChargerKw() {
  const checked = chargerInputs.find((el) => el.checked);
  return checked ? parseFloat(checked.value) : NaN;
}

function calculate() {
  const capacity = parseFloat(capacityInput.value);
  const current = parseFloat(currentInput.value);
  const target = parseFloat(targetInput.value);
  const chargerKw = selectedChargerKw();

  const error = validate(capacity, current, target);
  if (error) {
    showError(error);
    return;
  }
  clearError();

  const energy = (capacity * (target - current)) / 100;
  const total = energy * RATE_PER_KWH;
  const base = total / (1 + GST_RATE);
  const gst = total - base;
  const hours = energy / (chargerKw * CHARGING_EFFICIENCY);

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
}

numberInputs.forEach((el) => {
  el.addEventListener("input", calculate);
  el.addEventListener("change", calculate);
});
chargerInputs.forEach((el) => el.addEventListener("change", calculate));

initTheme();
calculate();
