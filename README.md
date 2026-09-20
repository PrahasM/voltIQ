# voltIQ

A single-page web app for customers at an EV charging station: enter your battery
capacity, current charge and target charge, and instantly see how much energy you
need and what it will cost.

## What it does

- **Inputs**: battery capacity in kWh (default 79), current battery % and target
  battery % (default 100). All fields are independent and results update live as
  you type.
- **Energy to add**: `capacity × (target% − current%) / 100` kWh.
- **Cost**: charging rate of **₹25 / kWh**, which already includes 18% GST.
  - Total = energy × 25
  - Base price (excl. GST) = total / 1.18
  - GST = total − base
- **Charger power**: pick one of four chips (7 kW home AC, 30 / 60 / 120 kW DC)
  to see an estimated charging time (`energy / (power × 0.9)`, allowing for losses
  and tapering).
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
