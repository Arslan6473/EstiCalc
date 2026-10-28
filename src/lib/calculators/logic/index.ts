import type { CalculatorLogic } from "../types";
import { logic as area } from "./area-measurement";
import { logic as paint } from "./paint-finishes";
import { logic as flooring } from "./flooring";
import { logic as tile } from "./tile";
import { logic as drywall } from "./drywall-framing-insulation";
import { logic as concrete } from "./concrete-masonry";
import { logic as landscaping } from "./landscaping";
import { logic as outdoor } from "./outdoor-roofing";
import { logic as comfort } from "./comfort-room-planning";
import { logic as cost } from "./cost-budgeting";
import { logic as water } from "./water-volume";

export const allLogic: CalculatorLogic[] = [
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

const bySlug = new Map(allLogic.map((l) => [l.slug, l]));

export const getLogic = (slug: string) => bySlug.get(slug);
