# EstiCalc — free home improvement calculators

117 free calculators (paint, flooring, tile, drywall, concrete, landscaping, roofing, costs and more) plus in-depth guides, built with Next.js (App Router), TypeScript and Tailwind CSS. No accounts, no database: every page is pre-rendered at build time.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in your values
npm run dev                  # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm test` | Checks every calculator: worked examples, SEO fields, cost/safety rules |
| `npm run covers` | Regenerates blog cover illustrations (runs automatically before `build`) |
| `npm run build` / `npm start` | Production build / server |
| `npm run lint` | ESLint |

## Deploying

The easiest host is **Vercel**: import the repository, add the environment variables from `.env.example`, and deploy. Any host that runs `next start` (or Netlify, Cloudflare, a VPS) also works. Point your domain at it and set `NEXT_PUBLIC_SITE_URL` to that domain.

After the first deploy:

1. Add the site to **Google Search Console**, verify it (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`), and submit `https://your-domain/sitemap.xml`.
2. Check `https://your-domain/robots.txt` and `https://your-domain/ads.txt`.

## Google AdSense setup

1. Sign up at <https://adsense.google.com> with your domain.
2. Set `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX` and redeploy. This adds:
   - the AdSense script and the `google-adsense-account` meta tag, which AdSense uses to verify the site;
   - `/ads.txt`, generated from your publisher id.
3. Request review in AdSense. While you wait, you can turn on **Auto ads**.
4. Once you're approved, create three display ad units and set the `NEXT_PUBLIC_ADSENSE_SLOT_*` variables. Ad slots sit:
   - below each calculator;
   - in the middle of articles;
   - in the sidebar.
5. **EEA / UK / Swiss visitors:** Google requires a certified consent management platform (CMP). The simplest option is the built-in one: AdSense → Privacy & messaging → **European regulations** message. Also turn on the **US state regulations** message.

### Approval checklist (already covered by this site)

- Substantial original content: 117 calculators, each with:
  - a how-to section and the formula;
  - a worked example, tips, FAQs and sources.
- Long-form guides with diagrams.
- About, Contact, Privacy Policy (AdSense/DART cookie disclosures), Cookie Policy, Terms, Disclaimer, Editorial Policy, FAQ and HTML sitemap pages.
- Clear navigation, breadcrumbs, mobile-friendly layout, fast static pages, sitemap.xml and robots.txt.
- Ads are clearly separated from content and never placed inside the calculator controls.

### Before you apply — do these yourself

- **Use a real domain** you own (not a `vercel.app` subdomain) and a working contact email.
- **Replace "EstiCalc Editorial Team"** in `src/lib/site.ts` and the About page with real names and short bios if you can. Real authorship helps E-E-A-T and approval.
- **Publish new guides regularly.** Add Markdown files to `content/blog/`; see `docs/blog-authoring.md`.
- **Wait for indexing.** Give Google a week or two to index the site after you submit the sitemap.
- **Never click your own ads.**

## Adding content

- Calculators: `docs/calculator-authoring.md` (logic in `src/lib/calculators/logic/`, content in `src/lib/calculators/content/`).
- Articles: `docs/blog-authoring.md` (Markdown in `content/blog/`, diagrams in `public/images/blog/<slug>/`).

Cover images are generated SVG illustrations. To use photos instead, put a `cover.jpg` in `public/images/blog/<slug>/` and change the `cover` path in `src/lib/blog.ts`.

## Accuracy and safety

Every calculator's worked example is checked by `npm test`. Cost calculators show a dated price range and their assumptions. Structural, roofing, HVAC and electrical calculators carry a "planning estimate — confirm with a licensed professional" notice. Prices are typical U.S. ranges as of the review date in `src/lib/site.ts`. Review them yearly.
