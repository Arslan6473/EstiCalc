import "server-only";
import type { SearchItem } from "@/components/calculator/CalculatorSearch";
import { calculators } from "./content";
import { getCategory } from "./categories";

export function searchItems(): SearchItem[] {
  return calculators.map((c) => ({
    slug: c.slug,
    name: c.name,
    description: c.description,
    category: c.category,
    categoryName: getCategory(c.category)?.name ?? "",
    keywords: c.keywords,
  }));
}
