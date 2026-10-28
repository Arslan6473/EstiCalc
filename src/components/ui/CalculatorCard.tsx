import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryIcon } from "@/components/CategoryIcon";
import { getCategory } from "@/lib/calculators/categories";
import type { CalculatorContent } from "@/lib/calculators/types";

export function CalculatorCard({ calc, showCategory = false }: { calc: CalculatorContent; showCategory?: boolean }) {
  const cat = getCategory(calc.category)!;
  return (
    <Link
      href={`/calculators/${calc.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 group-hover:bg-brand-700 group-hover:text-white">
          <CategoryIcon name={cat.icon} className="h-5 w-5" />
        </span>
        <h3 className="font-display font-bold leading-snug text-slate-900">{calc.name}</h3>
      </div>
      <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">{calc.description}</p>
      <span className="mt-4 flex items-center justify-between text-sm font-semibold text-brand-700">
        {showCategory ? <span className="text-xs font-medium text-slate-500">{cat.name}</span> : <span>Open calculator</span>}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
