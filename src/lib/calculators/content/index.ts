import "server-only";
import type { CalculatorContent, CategorySlug } from "../types";
import { catalog } from "../catalog";
import { content as area } from "./area-measurement";
import { content as paint } from "./paint-finishes";
import { content as flooring } from "./flooring";
import { content as tile } from "./tile";
import { content as drywall } from "./drywall-framing-insulation";
import { content as concrete } from "./concrete-masonry";
import { content as landscaping } from "./landscaping";
import { content as outdoor } from "./outdoor-roofing";
import { content as comfort } from "./comfort-room-planning";
import { content as cost } from "./cost-budgeting";
import { content as water } from "./water-volume";

const all = [
  ...area,
  ...paint,
  ...flooring,
  ...tile,
  ...drywall,
  ...concrete,
  ...landscaping,
  ...outdoor,
  ...comfort,
  ...cost,
  ...water,
];

const order = new Map(catalog.map((c) => [c.slug, c.n]));

/** All calculators with content, in plan order. */
export const calculators: CalculatorContent[] = [...all].sort(
  (a, b) => (order.get(a.slug) ?? 999) - (order.get(b.slug) ?? 999),
);

const bySlug = new Map(calculators.map((c) => [c.slug, c]));

export const getCalculator = (slug: string) => bySlug.get(slug);

export const calculatorsInCategory = (category: CategorySlug) =>
  calculators.filter((c) => c.category === category);

export const featuredCalculators = () => calculators.filter((c) => c.featured);
