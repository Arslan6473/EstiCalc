# Writing a calculator

Every calculator is two entries, keyed by the same `slug` from `src/lib/calculators/catalog.ts`:

1. **Logic** in `src/lib/calculators/logic/<category>.ts` — `fields` + a pure `compute()` function. This file ships to the browser, so keep it free of prose (short `help` strings are fine).
2. **Content** in `src/lib/calculators/content/<category>.ts` — SEO title, description, intro, how-to, formula, worked example, tips, FAQs, sources, related calculators. Server-only.

The reference implementation is `paint-calculator` in `logic/paint-finishes.ts` and `content/paint-finishes.ts`. Types are in `src/lib/calculators/types.ts`, helpers in `helpers.ts`, units in `units.ts`.

## Units

`compute()` always receives and returns **imperial base units**: feet (`length`), inches (`smallLength`), sq ft (`area`), cu ft (`volume`), cu yd (`cubicYards`), lb (`weight`), US gallons (`liquid`), sq ft/gal (`coverage`), $/sq ft, $/ft, $/cu yd. Give a field or result a `dim` and the widget converts it when the visitor switches to metric. Counts, percentages, money and other unitless values have no `dim` (use `suffix`/`prefix` on fields and `unit`/`format` on results).

## Rules (enforced by `npm test`)

- Every `material` calculator has a `wasteField()` (id `waste`) and at least one field with a `dim`.
- Exactly one result has `primary: true`.
- `compute()` returns finite numbers for the default inputs — guard divisions with `safeDiv` or checks.
- `example.inputs` (imperial, merged over defaults) must reproduce `example.expected` (by result `key`) within 1%. Work the example by hand in `steps`.
- Calculators flagged `cost` in the catalog: `kind: "cost"` and a `cost` block with a `priceRange`, `assumptions` and `updated: "2026-10-28"`. Prices are typical US ranges and every price is an editable input with a sensible default.
- Calculators flagged `safety` in the catalog (and anything structural or electrical): `safety: true`.
- `seoTitle` ≤ 70 chars; `description` 110–165 chars; ≥ 4 keywords, ≥ 3 how-to steps, ≥ 4 FAQs (aim for 5–6), ≥ 2 sources, ≥ 3 `related` slugs from the catalog (not itself).
- `featured` must match the catalog.

## Writing guidance

- Write for a homeowner standing in a hardware store. Plain, specific, practical. US spelling, with metric equivalents where useful.
- FAQs answer real search questions ("How many bags of concrete for a 10x10 slab?") with concrete numbers.
- Sources: name reputable publishers (manufacturers, trade associations, government agencies, building codes). Only add a `url` if you are certain it exists — a missing URL is better than a wrong one.
- No made-up statistics. Price ranges must be presented as typical ranges that vary by region.
- Fields are fixed: there are no repeating rows. For multi-room or multi-section tools, offer a fixed number of slots (e.g. up to 4 rooms) where 0 means "not used".
- Use `showIf` to hide fields that do not apply to the chosen option (it receives imperial values).
