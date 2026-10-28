import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CalculatorSearch } from "@/components/calculator/CalculatorSearch";
import { CategoryIcon } from "@/components/CategoryIcon";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { calculators, calculatorsInCategory } from "@/lib/calculators/content";
import { categories } from "@/lib/calculators/categories";
import { searchItems } from "@/lib/calculators/search";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "All Home Improvement Calculators (Free)",
  description:
    "Browse every free EstiCalc calculator: area, paint, flooring, tile, drywall, concrete, landscaping, roofing, comfort, costs and water volume.",
  path: "/calculators",
  keywords: ["home improvement calculators", "construction calculators", "diy calculators", "material estimator"],
});

export default function CalculatorsPage() {
  return (
    <>
      <PageHeader
        title="All home improvement calculators"
        intro={`${calculators.length} free calculators for every stage of a project — measure the space, estimate materials, and budget the cost. Every tool works in feet or metres.`}
        crumbs={[{ name: "Calculators", href: "/calculators" }]}
      >
        <div id="search" className="mt-8 max-w-2xl scroll-mt-24">
          <CalculatorSearch items={searchItems()} />
        </div>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav aria-label="Categories" className="sticky top-16 z-20 -mx-4 overflow-x-auto border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0">
          <ul className="flex gap-2 whitespace-nowrap">
            {categories.map((c) => (
              <li key={c.slug}>
                <a
                  href={`#${c.slug}`}
                  className="inline-flex rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-800"
                >
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 space-y-14">
          {categories.map((c) => {
            const list = calculatorsInCategory(c.slug);
            if (!list.length) return null;
            return (
              <section key={c.slug} id={c.slug} aria-labelledby={`${c.slug}-h`} className="scroll-mt-32">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <h2 id={`${c.slug}-h`} className="flex items-center gap-3 font-display text-2xl font-bold text-slate-900">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-white">
                      <CategoryIcon name={c.icon} className="h-5 w-5" />
                    </span>
                    {c.name}
                  </h2>
                  <Link href={`/category/${c.slug}`} className="flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
                    Category guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((calc) => (
                    <li key={calc.slug}>
                      <Link
                        href={`/calculators/${calc.slug}`}
                        className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-800 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-900"
                      >
                        {calc.name}
                        {calc.featured && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">Popular</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>

      <JsonLd
        data={{
          "@type": "ItemList",
          name: "Home improvement calculators",
          numberOfItems: calculators.length,
          itemListElement: calculators.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(`/calculators/${c.slug}`),
            name: c.name,
          })),
        }}
      />
    </>
  );
}
