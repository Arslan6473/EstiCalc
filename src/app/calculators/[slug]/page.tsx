import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Lightbulb,
  ListChecks,
  ShieldCheck,
  Sigma,
  TriangleAlert,
} from "lucide-react";
import { CalculatorWidget } from "@/components/calculator/CalculatorWidget";
import { AdSlot } from "@/components/ads/AdSlot";
import { CategoryIcon } from "@/components/CategoryIcon";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { calculators, calculatorsInCategory, getCalculator } from "@/lib/calculators/content";
import { categories, getCategory } from "@/lib/calculators/categories";
import { formatDate, postsForCalculator, postsInCategory } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/calculators/[slug]">) {
  const { slug } = await params;
  const calc = getCalculator(slug);
  if (!calc) return {};
  return pageMetadata({
    title: calc.seoTitle,
    description: calc.description,
    path: `/calculators/${calc.slug}`,
    keywords: calc.keywords,
  });
}

function Section({
  id,
  title,
  icon,
  children,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24">
      <h2 id={`${id}-h`} className="flex items-center gap-2.5 font-display text-2xl font-bold text-slate-900">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700">{icon}</span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function CalculatorPage({ params }: PageProps<"/calculators/[slug]">) {
  const { slug } = await params;
  const calc = getCalculator(slug);
  if (!calc) notFound();
  const cat = getCategory(calc.category)!;
  const related = calc.related.map(getCalculator).filter((c) => c !== undefined);
  const siblings = calculatorsInCategory(calc.category).filter((c) => c.slug !== calc.slug && !calc.related.includes(c.slug));
  const guides = [...postsForCalculator(calc.slug), ...postsInCategory(calc.category)]
    .filter((p, i, arr) => arr.findIndex((q) => q.slug === p.slug) === i)
    .slice(0, 3);
  const url = absoluteUrl(`/calculators/${calc.slug}`);
  const reviewed = calc.cost?.updated ?? site.reviewedOn;

  return (
    <>
      <div className="border-b border-slate-200 bg-gradient-to-b from-brand-50/70 to-white">
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Calculators", href: "/calculators" },
              { name: cat.name, href: `/category/${cat.slug}` },
              { name: calc.name, href: `/calculators/${calc.slug}` },
            ]}
          />
          <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {calc.name}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">{calc.intro}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-brand-700" aria-hidden="true" />
              Reviewed by the{" "}
              <Link href="/editorial-policy" className="font-medium text-slate-700 underline-offset-2 hover:underline">
                {site.author}
              </Link>
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-brand-700" aria-hidden="true" />
              Updated <time dateTime={reviewed}>{formatDate(reviewed)}</time>
            </span>
            <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-brand-800 ring-1 ring-brand-200">
              Free · No sign-up
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        {calc.safety && (
          <div role="note" className="mb-6 flex gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
            <p>
              <strong>Planning estimate only.</strong> Results from this calculator are for planning and budgeting. Structural,
              electrical, roofing and HVAC work must follow your local building code — have the design confirmed by a licensed
              professional before you buy materials or start work.
            </p>
          </div>
        )}
        {calc.cost && (
          <div role="note" className="mb-6 flex gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
            <CircleDollarSign className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" aria-hidden="true" />
            <p>
              <strong>Typical range: {calc.cost.priceRange}.</strong> Prices vary by region, supplier and season. Default prices
              were last checked on {formatDate(calc.cost.updated)} — replace them with your local quotes for the most accurate
              estimate.
            </p>
          </div>
        )}

        <CalculatorWidget slug={calc.slug} name={calc.name} />

        <AdSlot placement="calculator" className="mt-8" />

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="min-w-0 space-y-12">
            <Section id="how-to-use" title={`How to use the ${calc.name.toLowerCase()}`} icon={<ListChecks className="h-5 w-5" />}>
              <ol className="space-y-3">
                {calc.howToUse.map((step, i) => (
                  <li key={i} className="flex gap-3 text-slate-700">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="formula" title="The formula" icon={<Sigma className="h-5 w-5" />}>
              <div className="rounded-2xl bg-slate-900 p-5 font-mono text-sm leading-relaxed text-brand-100 sm:text-base">
                {calc.formula.lines.map((line, i) => (
                  <p key={i} className={i ? "mt-2" : ""}>
                    {line}
                  </p>
                ))}
              </div>
              {calc.formula.notes && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700 marker:text-brand-600">
                  {calc.formula.notes.map((n, i) => (
                    <li key={i} className="leading-relaxed">
                      {n}
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            <Section id="example" title="Worked example" icon={<BookOpen className="h-5 w-5" />}>
              <p className="leading-relaxed text-slate-700">{calc.example.scenario}</p>
              <ol className="mt-4 space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-700">
                {calc.example.steps.map((s, i) => (
                  <li key={i} className="flex gap-3 leading-relaxed">
                    <span className="font-semibold text-brand-700">{i + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </Section>

            <AdSlot placement="inArticle" />

            {calc.cost && (
              <Section id="assumptions" title="Pricing assumptions" icon={<CircleDollarSign className="h-5 w-5" />}>
                <p className="text-slate-700">
                  Typical range: <strong>{calc.cost.priceRange}</strong> (checked {formatDate(calc.cost.updated)}).
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700 marker:text-brand-600">
                  {calc.cost.assumptions.map((a, i) => (
                    <li key={i} className="leading-relaxed">
                      {a}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {calc.tips.length > 0 && (
              <Section id="tips" title="Tips from the pros" icon={<Lightbulb className="h-5 w-5" />}>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {calc.tips.map((t, i) => (
                    <li key={i} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700">
                      {t}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <section id="faq" aria-labelledby="faq-h" className="scroll-mt-24">
              <h2 id="faq-h" className="font-display text-2xl font-bold text-slate-900">
                Frequently asked questions
              </h2>
              <div className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
                {calc.faqs.map((f, i) => (
                  <details key={i} className="group p-5" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                      <h3>{f.q}</h3>
                      <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <p className="mt-3 leading-relaxed text-slate-700">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <section aria-labelledby="sources-h">
              <h2 id="sources-h" className="font-display text-lg font-bold text-slate-900">
                Sources and references
              </h2>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                {calc.sources.map((s, i) => (
                  <li key={i}>
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-brand-700 underline underline-offset-2">
                        {s.title}
                      </a>
                    ) : (
                      <span className="text-slate-800">{s.title}</span>
                    )}{" "}
                    — {s.publisher}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                Formulas are checked against manufacturer coverage charts and worked examples. See our{" "}
                <Link href="/editorial-policy" className="underline">
                  editorial policy
                </Link>{" "}
                and{" "}
                <Link href="/disclaimer" className="underline">
                  disclaimer
                </Link>
                .
              </p>
            </section>

            {guides.length > 0 && (
              <section aria-labelledby="guides-h">
                <h2 id="guides-h" className="font-display text-2xl font-bold text-slate-900">
                  Related guides
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                  {guides.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="block h-full rounded-2xl border border-slate-200 bg-white p-4 font-semibold leading-snug text-slate-900 hover:border-brand-300 hover:text-brand-800"
                      >
                        {p.title}
                        <span className="mt-2 block text-xs font-normal text-slate-500">{p.readingMinutes} min read</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            {related.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h2 className="font-display font-bold text-slate-900">Related calculators</h2>
                <ul className="mt-3 space-y-1">
                  {[...related, ...siblings].slice(0, 8).map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/calculators/${r.slug}`}
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-800"
                      >
                        <CategoryIcon name={getCategory(r.category)!.icon} className="h-4 w-4 text-brand-600" />
                        {r.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <AdSlot placement="sidebar" />
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="font-display font-bold text-slate-900">Browse by category</h2>
              <ul className="mt-3 space-y-1">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/category/${c.slug}`}
                      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-white hover:text-brand-800 ${
                        c.slug === cat.slug ? "bg-white font-semibold text-brand-800" : "text-slate-700"
                      }`}
                    >
                      <CategoryIcon name={c.icon} className="h-4 w-4 text-brand-600" />
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <JsonLd
        data={[
          {
            "@type": "WebApplication",
            "@id": `${url}#app`,
            name: calc.name,
            url,
            description: calc.description,
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            browserRequirements: "Requires JavaScript",
            isAccessibleForFree: true,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            dateModified: reviewed,
            publisher: { "@id": `${site.url}/#organization` },
          },
          {
            "@type": "FAQPage",
            mainEntity: calc.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />
    </>
  );
}
