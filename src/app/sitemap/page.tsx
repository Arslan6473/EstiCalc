import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllPosts } from "@/lib/blog";
import { categories } from "@/lib/calculators/categories";
import { calculatorsInCategory } from "@/lib/calculators/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sitemap",
  description:
    "A complete list of every page on EstiCalc: all home improvement calculators grouped by category, every guide and article, and our site information pages.",
  path: "/sitemap",
});

const pages = [
  { href: "/", name: "Home" },
  { href: "/calculators", name: "All calculators" },
  { href: "/blog", name: "Guides & articles" },
  { href: "/about", name: "About us" },
  { href: "/editorial-policy", name: "Editorial policy" },
  { href: "/faq", name: "FAQ" },
  { href: "/contact", name: "Contact" },
  { href: "/privacy-policy", name: "Privacy policy" },
  { href: "/cookie-policy", name: "Cookie policy" },
  { href: "/terms", name: "Terms of use" },
  { href: "/disclaimer", name: "Disclaimer" },
];

const linkClass = "text-brand-700 hover:underline";

export default function SitemapPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHeader title="Sitemap" intro="Every page on the site in one place." crumbs={[{ name: "Sitemap", href: "/sitemap" }]} />
      <div className="mx-auto max-w-6xl space-y-12 px-4 pt-10 sm:px-6">
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900">Calculators</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <div key={c.slug}>
                <h3 className="font-semibold text-slate-900">
                  <Link href={`/category/${c.slug}`} className={linkClass}>
                    {c.name}
                  </Link>
                </h3>
                <ul className="mt-2 space-y-1 text-sm">
                  {calculatorsInCategory(c.slug).map((calc) => (
                    <li key={calc.slug}>
                      <Link href={`/calculators/${calc.slug}`} className={linkClass}>
                        {calc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900">Guides</h2>
          <ul className="mt-4 grid gap-1 text-sm sm:grid-cols-2">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className={linkClass}>
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900">Site information</h2>
          <ul className="mt-4 grid gap-1 text-sm sm:grid-cols-3">
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className={linkClass}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
