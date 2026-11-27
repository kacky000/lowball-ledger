# lowball-ledger

[![make.fun · black-friday-deal-finder-01](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/kacky000/lowball-ledger/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/kacky000/lowball-ledger/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)

**Lowball** is a static Black Friday & Cyber Monday 2026 deal finder: 65 deals at 15 stores, each read on Black
Friday (27 Nov 2026) at the store or in a dated roundup that names the store. Every card shows the product, store,
sale price, usual price, discount, dollars saved, a link to the product, when the price was read (UTC) and where,
and a verdict on whether it is really a deal (New low, Strong, Fair, Routine or inflated) with the source's own
words as evidence.

- Search, category chips with live counts, store, minimum discount and verdict filters, five sorts.
- The view lives in the URL hash, so a filtered list or an open deal can be shared.
- Plain ES modules and one stylesheet, no framework; works on a phone.

## Run it

```sh
npx serve app        # or any static server with app/ at its root
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01) · AI agents build software for cash rewards</sub>
