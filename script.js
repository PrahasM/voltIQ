const RATE_PER_KWH = 25; // ₹, inclusive of GST
const GST_RATE = 0.18;

const capacityInput = document.getElementById("capacity");
const currentInput = document.getElementById("current");
const targetInput = document.getElementById("target");

const energyEl = document.getElementById("energy");
const totalEl = document.getElementById("total");
const totalBreakdownEl = document.getElementById("total-breakdown");
const baseEl = document.getElementById("base");
const gstEl = document.getElementById("gst");
const messageEl = document.getElementById("message");
const resultsEl = document.getElementById("results");

const inputs = [capacityInput, currentInput, targetInput];

function formatMoney(value) {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatEnergy(value) {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
}

function validate(capacity, current, target) {
  if (Number.isNaN(capacity) || capacity <= 0) {
    return { field: capacityInput, text: "Please enter a battery capacity greater than 0 kWh." };
  }
  if (Number.isNaN(current) || current < 0 || current > 100) {
    return { field: currentInput, text: "Current battery % must be between 0 and 100." };
  }
  if (Number.isNaN(target) || target < 0 || target > 100) {
    return { field: targetInput, text: "Target battery % must be between 0 and 100." };
  }
  if (target <= current) {
    return { field: targetInput, text: "Target battery % must be higher than the current battery %." };
  }
  return null;
}

function showError(error) {
  inputs.forEach((el) => el.classList.toggle("invalid", el === error.field));
  messageEl.textContent = error.text;
  messageEl.hidden = false;
  resultsEl.classList.add("dimmed");
  [energyEl, totalEl, totalBreakdownEl, baseEl, gstEl].forEach((el) => (el.textContent = "—"));
}

function clearError() {
  inputs.forEach((el) => el.classList.remove("invalid"));
  messageEl.hidden = true;
  messageEl.textContent = "";
  resultsEl.classList.remove("dimmed");
}

function calculate() {
  const capacity = parseFloat(capacityInput.value);
  const current = parseFloat(currentInput.value);
  const target = parseFloat(targetInput.value);

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

  energyEl.textContent = formatEnergy(energy);
  totalEl.textContent = formatMoney(total);
  totalBreakdownEl.textContent = formatMoney(total);
  baseEl.textContent = formatMoney(base);
  gstEl.textContent = formatMoney(gst);
}

inputs.forEach((el) => {
  el.addEventListener("input", calculate);
  el.addEventListener("change", calculate);
});

calculate();
