import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronDown, Clock, ShieldCheck } from "lucide-react";
import { AdSlot } from "@/components/ads/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CalculatorCard } from "@/components/ui/CalculatorCard";
import { getCalculator } from "@/lib/calculators/content";
import { getCategory } from "@/lib/calculators/categories";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated,
  });
}

/** Split article HTML roughly in half at an <h2> so an in-article ad can sit between sections. */
function splitForAd(html: string): [string, string] {
  const idx: number[] = [];
  const re = /<h2[\s>]/g;
  let m;
  while ((m = re.exec(html))) idx.push(m.index);
  if (idx.length < 4) return [html, ""];
  const at = idx[Math.floor(idx.length / 2)];
  return [html.slice(0, at), html.slice(at)];
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const cat = getCategory(post.category);
  const calcs = post.calculators.map(getCalculator).filter((c) => c !== undefined);
  const more = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);
  const [first, second] = splitForAd(post.html);
  const url = absoluteUrl(`/blog/${post.slug}`);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <Breadcrumbs
          items={[
            { name: "Guides", href: "/blog" },
            { name: post.title, href: `/blog/${post.slug}` },
          ]}
        />
      </div>

      <article className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="mx-auto mt-6 max-w-3xl text-center">
          {cat && (
            <Link href={`/category/${cat.slug}`} className="text-sm font-semibold uppercase tracking-wide text-brand-700 hover:underline">
              {cat.name}
            </Link>
          )}
          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{post.description}</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-brand-700" aria-hidden="true" />
              By{" "}
              <Link href="/about" className="font-medium text-slate-700 hover:underline">
                {site.author}
              </Link>
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-brand-700" aria-hidden="true" />
              <time dateTime={post.updated}>Updated {formatDate(post.updated)}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brand-700" aria-hidden="true" /> {post.readingMinutes} min read
            </span>
          </div>
        </header>

        <div className="relative mx-auto mt-8 aspect-[1200/630] max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
          <Image src={post.cover} alt={post.coverAlt} fill priority unoptimized sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0">
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: first }} />
            {second && (
              <>
                <AdSlot placement="inArticle" className="my-10" />
                <div className="prose-content" dangerouslySetInnerHTML={{ __html: second }} />
              </>
            )}

            {post.faqs.length > 0 && (
              <section aria-labelledby="faq-h" className="mt-14">
                <h2 id="faq-h" className="font-display text-2xl font-bold text-slate-900">
                  Frequently asked questions
                </h2>
                <div className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
                  {post.faqs.map((f, i) => (
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
            )}

            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-600">
              <strong className="text-slate-800">About this guide.</strong> Written and reviewed by the {site.author} following our{" "}
              <Link href="/editorial-policy" className="text-brand-700 underline">
                editorial policy
              </Link>
              . Figures are typical values for planning — always check product labels, local codes and current local prices.
            </div>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            {post.toc.length > 2 && (
              <nav aria-label="On this page" className="rounded-2xl border border-slate-200 bg-white p-5">
                <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">On this page</h2>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {post.toc
                    .filter((t) => t.level === 2)
                    .map((t) => (
                      <li key={t.id}>
                        <a href={`#${t.id}`} className="text-slate-600 hover:text-brand-700">
                          {t.text}
                        </a>
                      </li>
                    ))}
                </ul>
              </nav>
            )}
            <AdSlot placement="sidebar" />
          </aside>
        </div>
      </article>

      {calcs.length > 0 && (
        <section aria-labelledby="calcs-h" className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
          <h2 id="calcs-h" className="font-display text-2xl font-bold text-slate-900">
            Calculators used in this guide
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {calcs.map((c) => (
              <CalculatorCard key={c.slug} calc={c} />
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="more-h" className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
        <h2 id="more-h" className="font-display text-2xl font-bold text-slate-900">
          Keep reading
        </h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((p) => (
            <ArticleCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      <JsonLd
        data={[
          {
            "@type": "BlogPosting",
            "@id": `${url}#article`,
            headline: post.title,
            description: post.description,
            url,
            mainEntityOfPage: url,
            image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
            datePublished: post.date,
            dateModified: post.updated,
            keywords: post.keywords.join(", "),
            articleSection: cat?.name,
            author: { "@type": "Organization", name: site.author, url: absoluteUrl("/about") },
            publisher: { "@id": `${site.url}/#organization` },
          },
          ...(post.faqs.length
            ? [
                {
                  "@type": "FAQPage",
                  mainEntity: post.faqs.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                },
              ]
            : []),
        ]}
      />
    </>
  );
}
