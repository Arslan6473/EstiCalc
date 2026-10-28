import Link from "next/link";
import { ChevronDown, Menu, Search } from "lucide-react";
import { categories } from "@/lib/calculators/categories";
import { CategoryIcon } from "@/components/CategoryIcon";
import { Logo } from "./Logo";

const links = [
  { href: "/blog", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          <div className="group relative">
            <Link
              href="/calculators"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            >
              Calculators <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </Link>
            <div className="invisible absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-1 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-brand-50"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-800">
                      <CategoryIcon name={c.icon} className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-slate-900">{c.name}</span>
                      <span className="block text-xs text-slate-500">{c.short}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/calculators#search"
            className="ml-2 flex items-center gap-2 rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-800"
          >
            <Search className="h-4 w-4" aria-hidden="true" /> Find a calculator
          </Link>
        </nav>

        <details className="group relative md:hidden">
          <summary className="flex cursor-pointer list-none items-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 [&::-webkit-details-marker]:hidden">
            <Menu className="h-6 w-6" aria-hidden="true" />
            <span className="sr-only">Open menu</span>
          </summary>
          <nav
            aria-label="Mobile"
            className="absolute right-0 top-12 max-h-[80vh] w-[min(88vw,22rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-xl"
          >
            <Link href="/calculators" className="block rounded-lg px-3 py-2 font-semibold text-slate-900 hover:bg-slate-100">
              All calculators
            </Link>
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="block rounded-lg px-3 py-2 font-semibold text-slate-900 hover:bg-slate-100">
                {l.label}
              </Link>
            ))}
            <p className="mt-2 px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Categories</p>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                <CategoryIcon name={c.icon} className="h-4 w-4 text-brand-700" /> {c.name}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
