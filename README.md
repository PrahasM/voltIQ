# voltIQ

A single-page web app for customers at an EV charging station: enter your battery
capacity, current charge and target charge, and instantly see how much energy you
need and what it will cost.

## What it does

- **Inputs**: battery capacity in kWh (default 79), current battery % and target
  battery % (default 85, the level most EVs recommend for daily charging). All fields are independent and results update live as
  you type.
- **Three calculation modes** — pick one with the **Calculate by** chips at the
  top of the calculator (the choice is saved per user):
  - **By target %** (default): enter the level you want to charge to and get the
    "Enter X kWh" headline, energy to add, energy to buy, cost with GST breakdown
    and charging time.
  - **By ₹ amount**: enter how much you want to spend (**Amount to spend ₹**).
    Shows the final % you'll reach, the kWh bought (`amount / rate`), the energy
    delivered to the battery (`kWh bought × efficiency`), the GST breakdown and
    the charging time (`kWh bought / charger power`).
  - **By time**: enter how long you'll charge (**Charging time**, in minutes).
    Shows the final % you'll reach, the kWh delivered to the battery
    (`charger power × hours × efficiency`), the energy drawn from the charger and
    the cost (`energy drawn × rate`) with GST breakdown.
  - All modes apply the charging efficiency, the 18% GST toggle and the charger
    power. In ₹ and time modes the final % is capped at 100%; if your budget or
    time would overfill the battery, the energy, cost and time are trimmed to
    what's needed to reach 100% and a note tells you so.
- **Easy % inputs**: current battery % has large − / + steppers (step 1, clamped
  to 0–100). Target % is a chip group — 80, 85, 90, 100 — plus **Custom**, which
  reveals a numeric field for any other value. The chosen target is saved per user.
  All tap targets are at least 48 px.
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
- **Charger power**: tap one of the Indian-station presets. Every chip shows
  whether it is AC or DC:
  - **AC**: 3.3 kW (Home), 7.2 kW (Wallbox), 11 kW (3-phase), 22 kW (Fast AC)
  - **DC**: 30 kW (Fast), 60 kW (Fast, default), 120 kW (Rapid), 180 kW (Ultra)
  - **Custom**: type any charger power in kW and choose AC or DC.

  AC presets use the AC efficiency and DC presets use the DC efficiency.
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
  0–100, the target is not higher than the current charge (target mode), the
  amount or time is not greater than 0 (₹ / time modes), or the battery is
  already full (₹ / time modes).

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
