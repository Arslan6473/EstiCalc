import { getCalculator } from "@/lib/calculators/content";
import { getCategory } from "@/lib/calculators/categories";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Calculator preview";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const calc = getCalculator(slug);
  return ogImage({
    eyebrow: getCategory(calc?.category ?? "")?.name ?? "Calculator",
    title: calc?.name ?? "Calculator",
    subtitle: "Free, instant results in feet or metres.",
  });
}
