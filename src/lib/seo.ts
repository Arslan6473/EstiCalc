import type { Metadata } from "next";
import { absoluteUrl, site } from "./site";

interface PageSeo {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Title already contains the brand; skip the template. */
  absoluteTitle?: boolean;
}

export function pageMetadata(p: PageSeo): Metadata {
  const url = absoluteUrl(p.path);
  const images = p.image ? [{ url: p.image, width: 1200, height: 630, alt: p.title }] : undefined;
  return {
    title: p.absoluteTitle ? { absolute: p.title } : p.title,
    description: p.description,
    keywords: p.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: p.title,
      description: p.description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: p.type ?? "website",
      ...(images ? { images } : {}),
      ...(p.type === "article"
        ? { publishedTime: p.publishedTime, modifiedTime: p.modifiedTime, authors: [site.author] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description: p.description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
  };
}

export const organizationLd = {
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: absoluteUrl("/icon-512.png"),
  email: site.email,
};

/** Trim text to a word boundary for meta descriptions. */
export function truncate(text: string, max = 158) {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,;:.\s]+$/, "")}…`;
}
