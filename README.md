# voltIQ

A single-page web app for customers at an EV charging station: enter your battery
capacity, current charge and target charge, and instantly see how much energy you
need and what it will cost.

## What it does

- **Inputs**: battery capacity in kWh (default 79), current battery % (default 20)
  and target battery % (default 100). All fields are independent and results update live as
  you type.
- **Energy to add**: `capacity × (target% − current%) / 100` kWh.
- **Rate**: drag a slider to pick the charging rate, ₹5–₹40 / kWh in ₹0.50 steps
  (default ₹25). The chosen rate is shown live and echoed under the total.
- **GST toggle** ("Include 18% GST", on by default):
  - ON – the rate is treated as GST-inclusive: total = energy × rate,
    base (excl. GST) = total / 1.18, GST = total − base.
  - OFF – total = energy × rate with no GST; base = total, GST = 0 and the GST
    row is hidden from the breakdown.
- **Charger power**: tap one of the chips — 3 kW (Home), 7 kW (Home AC),
  22 kW (Fast DC), 60 kW (Fast DC, default), 120 kW (Rapid DC) — or choose
  **Custom** to type any charger power in kW. The app shows an estimated
  charging time (`energy / (power × 0.9)`, allowing for losses and tapering).
- **Your name, your history** (no account, no server): on first open you pick a
  short username. It is saved in the browser's `localStorage` on that device
  (phone, tablet or laptop), so the app remembers you next time. Tap
  **Switch user** to hand the device to someone else.
- **Log this charge**: after a calculation, one tap records the session
  (date, kWh, cost, rate, GST on/off, charger kW).
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
  0–100, the target is not higher than the current charge, or a Custom charger
  power is missing or ≤ 0 kW.

## How to run

No build step, dependencies or server required — just open `index.html` in a
browser (all data stays in the browser's `localStorage`).

```
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

## Files

- `index.html` – page structure (inputs, rate slider, GST toggle, charger chips,
  results, History tab)
- `styles.css` – styling, light/dark themes, responsive layout and animations
- `script.js` – calculation pipeline (`calculate()`, `validate()`,
  `selectedChargerKw()`), theme, user/history storage and live updates
- `favicon.svg` – app icon
- `README.md` – this documentation
