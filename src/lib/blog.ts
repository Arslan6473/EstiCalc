import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";
import type { CategorySlug, Faq } from "./calculators/types";

const DIR = path.join(process.cwd(), "content", "blog");

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  category: CategorySlug;
  keywords: string[];
  cover: string;
  coverAlt: string;
  calculators: string[];
  faqs: Faq[];
  readingMinutes: number;
  html: string;
  toc: { id: string; text: string; level: 2 | 3 }[];
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type RendererThis = { parser: { parseInline: (tokens: Tokens.Generic[]) => string } };

function render(markdown: string) {
  const toc: Post["toc"] = [];
  const seen = new Map<string, number>();
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading(this: RendererThis, { tokens, depth, text }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        let id = slugify(text);
        const n = seen.get(id) ?? 0;
        seen.set(id, n + 1);
        if (n) id = `${id}-${n}`;
        if (depth === 2 || depth === 3) toc.push({ id, text: text.replace(/[*_`]/g, ""), level: depth });
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
      image({ href, title, text }: Tokens.Image) {
        const t = title ? ` title="${title}"` : "";
        return `<img src="${href}" alt="${text.replace(/"/g, "&quot;")}"${t} loading="lazy" decoding="async" width="1200" height="675">`;
      },
      link(this: RendererThis, { href, title, tokens }: Tokens.Link) {
        const inner = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href);
        const t = title ? ` title="${title}"` : "";
        return external
          ? `<a href="${href}"${t} target="_blank" rel="noopener noreferrer">${inner}</a>`
          : `<a href="${href}"${t}>${inner}</a>`;
      },
    },
  });
  const html = marked.parse(markdown, { async: false });
  return { html, toc };
}

function load(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
  const { html, toc } = render(content);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: data.title,
    description: data.description,
    date: String(data.date),
    updated: String(data.updated ?? data.date),
    category: data.category,
    keywords: data.keywords ?? [],
    cover: `/images/blog/${slug}/cover.svg`,
    coverAlt: data.coverAlt ?? data.title,
    calculators: data.calculators ?? [],
    faqs: data.faqs ?? [],
    readingMinutes: Math.max(1, Math.round(words / 230)),
    html,
    toc,
  };
}

let cache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".md")) : [];
  cache = files.map(load).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
  return cache;
}

export const getPost = (slug: string) => getAllPosts().find((p) => p.slug === slug);

export const postsForCalculator = (slug: string) => getAllPosts().filter((p) => p.calculators.includes(slug));

export const postsInCategory = (category: string) => getAllPosts().filter((p) => p.category === category);

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
