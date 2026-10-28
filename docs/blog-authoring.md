# Writing a blog article

Articles are Markdown files in `content/blog/<slug>.md` with YAML front matter:

```md
---
title: "How Much Paint Do I Need? A Room-by-Room Guide"
description: "140–160 character meta description with the main keyword near the start."
date: "2026-10-28"
updated: "2026-10-28"
category: "paint-finishes"        # a category slug from src/lib/calculators/categories.ts
keywords: ["how much paint do i need", "paint coverage per gallon", "..."]
coverAlt: "Describe the cover illustration for screen readers"
calculators: ["paint-calculator", "ceiling-paint-calculator"]   # catalog slugs, 2–5
faqs:
  - q: "How many gallons of paint for a 12x12 room?"
    a: "About 2 gallons for two coats..."
---

Intro paragraph(s)...

## First section
...
![Descriptive alt text](/images/blog/<slug>/diagram-1.svg)
```

- The cover image is generated automatically at `/images/blog/<slug>/cover.svg` by `npm run covers` — do not write it by hand.
- In-article images live in `public/images/blog/<slug>/` as hand-written SVG diagrams (e.g. how to measure a wall, a slab cross-section, a tile layout). Use a `viewBox`, a white or very light background, the site palette (`#0f766e` teal, `#f59e0b` amber, `#0f172a` ink, `#e2e8f0` lines), readable 16px+ labels, and real dimensions in labels. Every image needs meaningful alt text.
- Link to calculators with `/calculators/<slug>` and to other articles with `/blog/<slug>`.
- Length: 1,200–2,000 words of genuinely useful, original content. Use `##`/`###` headings (no `#` H1 — the title is the H1), short paragraphs, lists, at least one Markdown table where it helps, and a worked example with real numbers.
- No made-up statistics, studies or quotes. Present prices as typical US ranges that vary by region and date. Add a short safety note for structural, electrical, gas or roofing work.
- Do not include a FAQ section in the body; put 3–5 FAQs in front matter (they render at the end with FAQ schema).
