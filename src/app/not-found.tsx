import Link from "next/link";
import { CalculatorSearch } from "@/components/calculator/CalculatorSearch";
import { CalculatorCard } from "@/components/ui/CalculatorCard";
import { featuredCalculators } from "@/lib/calculators/content";
import { searchItems } from "@/lib/calculators/search";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
      <p className="font-semibold text-brand-700">404</p>
      <h1 className="mt-2 font-display text-4xl font-extrabold text-slate-900">We couldn’t find that page</h1>
      <p className="mt-4 text-lg text-slate-600">It may have moved. Search for a calculator or pick a popular one below.</p>
      <div className="mx-auto mt-8 max-w-xl text-left">
        <CalculatorSearch items={searchItems()} />
      </div>
      <div className="mt-12 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
        {featuredCalculators()
          .slice(0, 6)
          .map((c) => (
            <CalculatorCard key={c.slug} calc={c} />
          ))}
      </div>
      <Link href="/" className="mt-10 inline-block font-semibold text-brand-700 underline">
        Back to the home page
      </Link>
    </div>
  );
}
