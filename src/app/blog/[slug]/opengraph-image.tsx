import { getPost } from "@/lib/blog";
import { getCategory } from "@/lib/calculators/categories";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Article preview";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return ogImage({
    eyebrow: `${getCategory(post?.category ?? "")?.name ?? "Guide"} guide`,
    title: post?.title ?? "Home improvement guide",
  });
}
