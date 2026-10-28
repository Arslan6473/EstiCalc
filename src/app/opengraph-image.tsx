import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "EstiCalc – free home improvement calculators";

export default function Image() {
  return ogImage({
    eyebrow: "117 free calculators",
    title: "Home improvement calculators",
    subtitle: "Paint, flooring, tile, drywall, concrete, landscaping, roofing and costs.",
  });
}
