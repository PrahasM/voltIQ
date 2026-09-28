# voltIQ

A single-page web app for customers at an EV charging station: enter your battery
capacity, current charge and target charge, and instantly see how much energy you
need and what it will cost.

## What it does

- **Inputs**: battery capacity in kWh (default 79), current battery % and target
  battery % (default 85, the level most EVs recommend for daily charging). All fields are independent and results update live as
  you type.
- **Energy to add**: `capacity × (target% − current%) / 100` kWh reaches the battery.
- **Headline result**: the biggest thing on screen reads "Enter 37 kWh" — the
  energy to buy rounded up to the nearest whole kWh, ready to type into the
  charger app. Cost and charging time sit below it in smaller text, and a
  **Copy** button copies the number to the clipboard.
- **Energy to buy**: `energy to add / charging efficiency` kWh is delivered by the
  charger, accounting for charging losses. This is the energy used to price the charge.
- **Settings**: DC efficiency defaults to 92% and AC efficiency to 87%. Edit either
  value from 50–100% in the Settings tab; changes recalculate results and are saved
  on this device in `localStorage`.
- **Rate**: drag a slider to pick the charging rate, ₹5–₹40 / kWh in ₹0.50 steps
  (default ₹25). The chosen rate is shown live and echoed under the total.
- **GST toggle** ("Include 18% GST", on by default):
  - ON – the rate is treated as GST-inclusive: total = energy to buy × rate,
    base (excl. GST) = total / 1.18, GST = total − base.
  - OFF – total = energy to buy × rate with no GST; base = total, GST = 0 and the GST
    row is hidden from the breakdown.
- **Charger power**: tap one of the chips — 3 kW (Home), 7 kW (Home AC),
  22 kW (Fast DC), 60 kW (Fast DC, default), 120 kW (Rapid DC) — or choose
  **Custom** to type any charger power in kW and choose AC or DC. The 3 and 7 kW
  presets use AC efficiency; the 22, 60 and 120 kW presets use DC efficiency.
  Estimated charging time is `energy to buy / charger power`.
- **Your name, your history** (no account, no server): on first open you pick a
  short username. It is saved in the browser's `localStorage` on that device
  (phone, tablet or laptop), so the app remembers you next time. Tap
  **Switch user** to hand the device to someone else.
- **Registered users list**: the "Who's charging?" screen lists every username
  that already has history or saved settings on this device. Tap a name to
  continue as that user, or tap **Delete** (after a confirmation prompt) to remove
  that user's history and saved settings from the device.
- **Log this charge**: after a calculation, one tap records the session
  (date, battery-side kWh added, cost, rate, GST on/off, charger kW).
- **History tab**: totals for money spent, energy charged, number of sessions
  and average ₹/kWh, plus a list of every logged charge with per-entry delete,
  **Export CSV** and **Clear history**.
  - Data lives only on the device under `voltiq-user` and
    `voltiq-log:<username>`; each entry is ~60 bytes of JSON and the log is
    capped at 500 entries, so the footprint stays well under 50 KB.
  - Different usernames on the same device keep separate histories.
- **Dark mode**: follows your system preference, with a toggle that remembers
  your choice.
- **Validation**: friendly messages when capacity ≤ 0, percentages fall outside
  0–100, or the target is not higher than the current charge.

## How to run

No build step or server required — just open `index.html` in a browser.

```
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

## Files

- `index.html` – page structure
- `styles.css` – styling
- `script.js` – calculation and live-update logic
