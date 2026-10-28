import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { categories } from "@/lib/calculators/categories";
import { calculators } from "@/lib/calculators/content";
import { absoluteUrl, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const reviewed = new Date(site.reviewedOn);
  const posts = getAllPosts();
  const latestPost = posts.reduce((d, p) => (p.updated > d ? p.updated : d), site.reviewedOn);

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1, lastModified: reviewed },
    { url: absoluteUrl("/calculators"), changeFrequency: "weekly", priority: 0.9, lastModified: reviewed },
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.8, lastModified: new Date(latestPost) },
    ...["/about", "/editorial-policy", "/faq", "/contact", "/sitemap", "/privacy-policy", "/cookie-policy", "/terms", "/disclaimer"].map(
      (p) => ({ url: absoluteUrl(p), changeFrequency: "yearly" as const, priority: 0.3, lastModified: reviewed }),
    ),
  ];

  return [
    ...staticPages,
    ...categories.map((c) => ({
      url: absoluteUrl(`/category/${c.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: reviewed,
    })),
    ...calculators.map((c) => ({
      url: absoluteUrl(`/calculators/${c.slug}`),
      changeFrequency: "monthly" as const,
      priority: c.featured ? 0.9 : 0.8,
      lastModified: reviewed,
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: new Date(p.updated),
      images: [absoluteUrl(p.cover)],
    })),
  ];
}
