import Link from "next/link";
import { ArrowRight, BadgeCheck, Calculator, ChevronDown, Ruler, ShoppingCart } from "lucide-react";
import { CalculatorSearch } from "@/components/calculator/CalculatorSearch";
import { CategoryIcon } from "@/components/CategoryIcon";
import { JsonLd } from "@/components/JsonLd";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { CalculatorCard } from "@/components/ui/CalculatorCard";
import { calculators, calculatorsInCategory, featuredCalculators, getCalculator } from "@/lib/calculators/content";
import { categories } from "@/lib/calculators/categories";
import { searchItems } from "@/lib/calculators/search";
import { getAllPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `${site.name} – Free Home Improvement Calculators & Estimators`,
  absoluteTitle: true,
  description: site.description,
  path: "/",
  keywords: [
    "home improvement calculator",
    "construction calculator",
    "material calculator",
    "paint calculator",
    "flooring calculator",
    "concrete calculator",
    "mulch calculator",
  ],
});

const quick = ["paint-calculator", "flooring-calculator", "concrete-slab-calculator", "mulch-calculator", "tile-calculator", "drywall-sheets-calculator"];

const homeFaqs = [
  {
    q: "Are EstiCalc calculators really free?",
    a: "Yes. Every calculator is free to use with no account, no sign-up and no limits. The site is supported by advertising.",
  },
  {
    q: "Can I use metres instead of feet?",
    a: "Yes. Every calculator that uses measurements has a Feet / Metres toggle. Your entries are converted automatically when you switch, and results are shown in the matching units.",
  },
  {
    q: "How accurate are the results?",
    a: "Each formula is checked against manufacturer coverage charts or a worked example before it is published. Results are planning estimates: real-world quantities depend on the product, surface and installer, so we include a waste allowance and recommend confirming quantities with your supplier.",
  },
  {
    q: "Should I rely on these calculators for structural or electrical work?",
    a: "No. Calculators for framing, roof pitch, rafters, stairs, HVAC sizing and other structural or safety-related work give planning estimates only. Always have the design checked by a licensed professional and follow your local building code.",
  },
];

export default function Home() {
  const featured = featuredCalculators().slice(0, 12);
  const posts = getAllPosts().slice(0, 6);
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-brand-50 via-white to-amber-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0f766e0d_1px,transparent_1px),linear-gradient(to_bottom,#0f766e0d_1px,transparent_1px)] bg-[size:40px_40px]"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-brand-800 shadow-sm ring-1 ring-brand-100">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" /> {calculators.length} free calculators · No sign-up
            </p>
            <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Know exactly how much to buy <span className="text-brand-700">before you start.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Free home improvement calculators for paint, flooring, tile, drywall, concrete, landscaping, roofing and project
              costs — with the formula, a worked example and expert tips on every page.
            </p>
            <div className="mx-auto mt-8 max-w-2xl text-left">
              <CalculatorSearch items={searchItems()} />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {quick.map(getCalculator).map(
                (c) =>
                  c && (
                    <Link
                      key={c.slug}
                      href={`/calculators/${c.slug}`}
                      className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-300 hover:text-brand-800"
                    >
                      {c.name.replace(/ Calculator$/, "")}
                    </Link>
                  ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="cats-h" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="cats-h" className="font-display text-3xl font-extrabold tracking-tight text-slate-900">
              Browse by project
            </h2>
            <p className="mt-2 text-slate-600">Pick a category to see every calculator for that kind of job.</p>
          </div>
          <Link href="/calculators" className="flex items-center gap-1 font-semibold text-brand-700 hover:underline">
            All calculators <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-sm group-hover:bg-accent-500 group-hover:text-slate-900">
                <CategoryIcon name={c.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{c.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{c.short}</p>
              <p className="mt-3 text-xs font-semibold text-brand-700">{calculatorsInCategory(c.slug).length} calculators</p>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="pop-h" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <h2 id="pop-h" className="font-display text-3xl font-extrabold tracking-tight text-slate-900">
          Most popular calculators
        </h2>
        <p className="mt-2 text-slate-600">The tools homeowners and contractors reach for most.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <CalculatorCard key={c.slug} calc={c} showCategory />
          ))}
        </div>
      </section>

      <section aria-labelledby="how-h" className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl bg-slate-900 px-6 py-12 text-white sm:px-12">
          <h2 id="how-h" className="font-display text-3xl font-extrabold tracking-tight">
            Three steps to a confident shopping list
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { icon: Ruler, title: "Measure", text: "Measure the space in feet or metres. Each calculator shows exactly which measurements it needs." },
              { icon: Calculator, title: "Calculate", text: "Get instant quantities with a built-in waste allowance, plus the formula and a worked example." },
              { icon: ShoppingCart, title: "Buy with confidence", text: "Copy, print or share your results and take them to the store — no more extra trips." },
            ].map(({ icon: Icon, title, text }, i) => (
              <div key={title}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-500 text-slate-900">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold">
                  {i + 1}. {title}
                </h3>
                <p className="mt-2 leading-relaxed text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section aria-labelledby="guides-h" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="guides-h" className="font-display text-3xl font-extrabold tracking-tight text-slate-900">
                Latest guides
              </h2>
              <p className="mt-2 text-slate-600">Learn the method behind the numbers.</p>
            </div>
            <Link href="/blog" className="flex items-center gap-1 font-semibold text-brand-700 hover:underline">
              All guides <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <ArticleCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="faq-h" className="mx-auto max-w-3xl px-4 pt-20 sm:px-6">
        <h2 id="faq-h" className="text-center font-display text-3xl font-extrabold tracking-tight text-slate-900">
          Frequently asked questions
        </h2>
        <div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {homeFaqs.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                <h3>{f.q}</h3>
                <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-3 leading-relaxed text-slate-700">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-slate-600">
          More answers on our{" "}
          <Link href="/faq" className="font-semibold text-brand-700 underline">
            FAQ page
          </Link>
          .
        </p>
      </section>

      <JsonLd
        data={{
          "@type": "FAQPage",
          mainEntity: homeFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </>
  );
}
