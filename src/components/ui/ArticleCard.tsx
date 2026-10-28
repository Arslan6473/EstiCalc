import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { getCategory } from "@/lib/calculators/categories";
import type { Post } from "@/lib/blog";

export function ArticleCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  const cat = getCategory(post.category);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[1200/630] overflow-hidden bg-slate-100">
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          unoptimized
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{cat?.name}</p>
        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-slate-900 group-hover:text-brand-800">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">{post.description}</p>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {post.readingMinutes} min read
        </p>
      </div>
    </Link>
  );
}
