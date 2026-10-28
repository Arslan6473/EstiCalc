import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCategory } from "@/lib/calculators/categories";
import { formatDate, getAllPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Home Improvement Guides & DIY Estimating Articles",
  description:
    "Practical home improvement guides: how to measure, estimate materials, compare products and budget projects for paint, flooring, tile, concrete and more.",
  path: "/blog",
  keywords: ["home improvement guides", "diy estimating", "how to measure for flooring", "how much paint do i need"],
});

export default function BlogIndex() {
  const [lead, ...posts] = getAllPosts();
  return (
    <>
      <PageHeader
        title="Guides & articles"
        intro="Step-by-step guides that explain the numbers behind our calculators — how to measure, how much to buy, and what it should cost."
        crumbs={[{ name: "Guides", href: "/blog" }]}
      />
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        {lead && (
          <Link
            href={`/blog/${lead.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:shadow-xl lg:grid-cols-2"
          >
            <div className="relative aspect-[1200/630] bg-slate-100">
              <Image src={lead.cover} alt={lead.coverAlt} fill priority unoptimized sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{getCategory(lead.category)?.name}</p>
              <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight text-slate-900 group-hover:text-brand-800 sm:text-3xl">
                {lead.title}
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">{lead.description}</p>
              <p className="mt-5 text-sm text-slate-500">
                {formatDate(lead.date)} · {lead.readingMinutes} min read
              </p>
            </div>
          </Link>
        )}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <ArticleCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </>
  );
}
