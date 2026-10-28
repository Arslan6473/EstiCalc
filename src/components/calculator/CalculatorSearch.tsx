"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";

export interface SearchItem {
  slug: string;
  name: string;
  description: string;
  category: string;
  categoryName: string;
  keywords: string[];
}

function score(item: SearchItem, terms: string[]) {
  const name = item.name.toLowerCase();
  const hay = `${name} ${item.keywords.join(" ")} ${item.categoryName} ${item.description}`.toLowerCase();
  let s = 0;
  for (const t of terms) {
    if (!hay.includes(t)) return 0;
    s += name.includes(t) ? 3 : 1;
  }
  return s;
}

export function CalculatorSearch({ items, autoFocus = false }: { items: SearchItem[]; autoFocus?: boolean }) {
  const [query, setQuery] = useState("");
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const matches = useMemo(
    () =>
      terms.length
        ? items
            .map((i) => ({ i, s: score(i, terms) }))
            .filter((m) => m.s > 0)
            .sort((a, b) => b.s - a.s)
            .slice(0, 12)
            .map((m) => m.i)
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, items],
  );

  return (
    <div className="relative">
      <label htmlFor="calc-search" className="sr-only">
        Search calculators
      </label>
      <div className="flex items-center rounded-2xl border border-slate-300 bg-white px-4 shadow-lg shadow-slate-900/5 focus-within:border-brand-600 focus-within:ring-4 focus-within:ring-brand-600/15">
        <Search className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
        <input
          id="calc-search"
          type="search"
          autoComplete="off"
          autoFocus={autoFocus}
          placeholder="Search 117 calculators — e.g. paint, mulch, tile, concrete"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent px-3 py-4 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
      </div>
      {terms.length > 0 && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 max-h-[60vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 text-left shadow-2xl">
          {matches.length ? (
            <ul>
              {matches.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/calculators/${m.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 hover:bg-brand-50"
                  >
                    <span>
                      <span className="block font-semibold text-slate-900">{m.name}</span>
                      <span className="block text-xs text-slate-500">{m.categoryName}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-brand-700" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-4 text-sm text-slate-500">
              No calculator matches “{query}”. Try a material such as “gravel” or “drywall”.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
