import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { CalculatorCard } from "@/components/ui/CalculatorCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { calculatorsInCategory } from "@/lib/calculators/content";
import { categories, getCategory } from "@/lib/calculators/categories";
import { postsInCategory } from "@/lib/blog";
import { pageMetadata, truncate } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return pageMetadata({
    title: `${cat.name} Calculators – Free Estimators`,
    description: truncate(cat.description),
    path: `/category/${cat.slug}`,
    keywords: [`${cat.name.toLowerCase()} calculator`, ...calculatorsInCategory(cat.slug).slice(0, 6).map((c) => c.name.toLowerCase())],
  });
}

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();
  const list = calculatorsInCategory(cat.slug);
  const featured = list.filter((c) => c.featured);
  const rest = list.filter((c) => !c.featured);
  const posts = postsInCategory(cat.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        title={`${cat.name} calculators`}
        intro={cat.description}
        crumbs={[
          { name: "Calculators", href: "/calculators" },
          { name: cat.name, href: `/category/${cat.slug}` },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        {featured.length > 0 && (
          <section aria-labelledby="popular-h">
            <h2 id="popular-h" className="font-display text-2xl font-bold text-slate-900">
              Most popular
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((c) => (
                <CalculatorCard key={c.slug} calc={c} />
              ))}
            </div>
          </section>
        )}
        {rest.length > 0 && (
          <section aria-labelledby="more-h" className="mt-12">
            <h2 id="more-h" className="font-display text-2xl font-bold text-slate-900">
              {featured.length ? "More calculators" : "Calculators"}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((c) => (
                <CalculatorCard key={c.slug} calc={c} />
              ))}
            </div>
          </section>
        )}
        <AdSlot placement="inArticle" className="mt-12" />
        {posts.length > 0 && (
          <section aria-labelledby="guides-h" className="mt-14">
            <h2 id="guides-h" className="font-display text-2xl font-bold text-slate-900">
              {cat.name} guides
            </h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <ArticleCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </div>
      <JsonLd
        data={{
          "@type": "CollectionPage",
          name: `${cat.name} calculators`,
          description: cat.description,
          url: absoluteUrl(`/category/${cat.slug}`),
          mainEntity: {
            "@type": "ItemList",
            itemListElement: list.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: absoluteUrl(`/calculators/${c.slug}`),
              name: c.name,
            })),
          },
        }}
      />
    </>
  );
}
