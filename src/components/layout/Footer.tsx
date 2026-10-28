import Link from "next/link";
import { categories } from "@/lib/calculators/categories";
import { featuredCalculators } from "@/lib/calculators/content";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

const company = [
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
  { href: "/editorial-policy", label: "Editorial policy" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Guides & articles" },
  { href: "/sitemap", label: "Site map" },
];

const legal = [
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of use" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/cookie-policy", label: "Cookie policy" },
];

function Column({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-wide text-white">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="text-slate-300 hover:text-white">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const popular = featuredCalculators()
    .slice(0, 8)
    .map((c) => ({ href: `/calculators/${c.slug}`, label: c.name }));
  return (
    <footer className="mt-24 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <div className="inline-block rounded-xl bg-white px-3 py-2">
            <Logo />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">{site.description}</p>
        </div>
        <Column
          title="Categories"
          items={categories.map((c) => ({ href: `/category/${c.slug}`, label: c.name }))}
        />
        <Column title="Popular" items={popular} />
        <Column title="Company" items={company} />
        <Column title="Legal" items={legal} />
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.name}. All calculators are free to use.
          </p>
          <p>Results are estimates for planning. Always confirm structural, electrical and HVAC work with a licensed professional.</p>
        </div>
      </div>
    </footer>
  );
}
