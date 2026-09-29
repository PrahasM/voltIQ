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
    the charging time (`kWh bought / effective power`, taper-aware).
  - **By time**: enter how long you'll charge (**Charging time**, in minutes).
    Shows the final % you'll reach, the kWh delivered to the battery
    (`effective power × hours × efficiency`, slowed by the DC taper above 80%), the energy drawn from the charger and
    the cost (`energy drawn × rate`) with GST breakdown.
  - All modes apply the charging efficiency, the 18% GST toggle and the
    effective charging power. In ₹ and time modes the final % is capped at 100%; if your budget or
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
- **Operator presets**: in **Settings → Charging operators** add, edit or
  delete the networks you use. Each preset stores the operator name, ₹/kWh,
  whether that rate already includes GST, an optional session fee (₹) and an
  optional idle fee (₹/min). Presets are saved **per user** under
  `voltiq-operators:<username>` (matching the per-user prefs), as compact JSON
  (`id, n = name, r = ₹/kWh, g = GST included 1/0, s = session fee, f = idle fee`).
  - Pick one from the **Operator** dropdown on the Calculator: its rate is applied
    to the rate slider and the GST switch is set from its "GST included" flag.
    The last-used operator is saved in the user's prefs and selected again next time.
  - Moving the rate slider away from the operator's rate switches back to
    **Manual rate**.
  - The session and idle fees are shown under the result and used for the
    effective ₹/kWh of logged charges.
- **Rate**: drag a slider to pick the charging rate, ₹5–₹40 / kWh in ₹0.50 steps
  (default ₹25; the range widens if an operator's rate is outside it). The rate
  label and the line under the total always state the GST treatment:
  "incl. GST", "+18% GST" or "no GST".
- **GST toggle** ("Include 18% GST", on by default):
  - ON – the rate is GST-inclusive ("incl. GST"): total = energy to buy × rate,
    base (excl. GST) = total / 1.18, GST = total − base.
  - OFF with **Manual rate** – no GST ("no GST"): total = energy to buy × rate,
    base = total, GST = 0 and the GST row is hidden from the breakdown.
  - OFF with an **operator** selected (the switch reads "Rate includes 18% GST")
    – GST is added on top ("+18% GST"): total = energy to buy × rate × 1.18,
    base = total / 1.18, GST = total − base.
- **Charger power**: tap one of the Indian-station presets. Every chip shows
  whether it is AC or DC:
  - **AC**: 3.3 kW (Home), 7.2 kW (Wallbox), 11 kW (3-phase), 22 kW (Fast AC)
  - **DC**: 30 kW (Fast), 60 kW (Fast, default), 120 kW (Rapid), 180 kW (Ultra)
  - **Custom**: type any charger power in kW and choose AC or DC.

  AC presets use the AC efficiency and DC presets use the DC efficiency.
- **Effective charging power**: your car limits how fast it can charge. In
  **Settings → Your car** set **Car max AC power** (default 11 kW) and **Car max
  DC power** (default 150 kW); they are saved on this device under
  `voltiq-car-ac` / `voltiq-car-dc`. The effective power is
  `min(charger power, car limit for the charger's AC/DC type)`, and every
  charging time (and the energy drawn in **By time** mode) uses it. When the car
  is the bottleneck a note under the time reads e.g. "Your car accepts max 11 kW AC".
- **Taper-aware charging time**: DC charging slows down above 80%. Below 80%
  the charge runs at the full effective power; above 80% on DC it runs at
  **DC taper power above 80%** (Settings, default 40%, saved as
  `voltiq-taper-dc`) of the effective power. AC charging never tapers.
  - When a DC charge crosses 80% the results split the time into phases, e.g.
    "42→80%: 28 min, 80→85%: 10 min", and a hint reads
    "Stopping at 80% saves 10 min" (the time spent above 80%).
  - On AC, or when the charge stays at or below 80%, a single time is shown.
  - **By time** mode uses the same phases to work out how far the battery gets.
  Estimated charging time is the sum of `phase energy to buy / phase power`.
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
