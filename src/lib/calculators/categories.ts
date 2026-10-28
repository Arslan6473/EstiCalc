import type { CategorySlug } from "./types";

export interface Category {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    slug: "area-measurement",
    name: "Area & Measurement",
    short: "Square feet, cubic yards, linear feet and unit conversions.",
    description:
      "Measure rooms, walls and odd-shaped spaces, convert between square feet, square yards and metres, and work out volumes in cubic feet and cubic yards before you buy materials.",
    icon: "ruler",
  },
  {
    slug: "paint-finishes",
    name: "Paint & Finishes",
    short: "Paint, primer, stain, wallpaper and coating quantities.",
    description:
      "Work out how many gallons of paint, primer or stain you need for walls, ceilings, exteriors, decks, fences and cabinets — plus wallpaper rolls, epoxy coatings and painting costs.",
    icon: "paint",
  },
  {
    slug: "flooring",
    name: "Flooring",
    short: "Laminate, vinyl, hardwood, carpet, trim and underlayment.",
    description:
      "Estimate boxes of laminate, vinyl plank and hardwood, rolls of carpet, underlayment, baseboard and trim, plus flooring material and installation costs room by room.",
    icon: "floor",
  },
  {
    slug: "tile",
    name: "Tile",
    short: "Floor, wall, shower and backsplash tile, grout and thinset.",
    description:
      "Calculate tiles, boxes, grout and thinset for floors, walls, showers and kitchen backsplashes, and plan layouts and installation costs.",
    icon: "tile",
  },
  {
    slug: "drywall-framing-insulation",
    name: "Drywall, Framing & Insulation",
    short: "Drywall sheets, mud, screws, studs, lumber and insulation.",
    description:
      "Estimate drywall sheets, joint compound, screws, wall studs, framing lumber and batt, blown or spray foam insulation for walls and attics.",
    icon: "wall",
  },
  {
    slug: "concrete-masonry",
    name: "Concrete & Masonry",
    short: "Slabs, bags, footings, blocks, brick, pavers and mortar.",
    description:
      "Work out concrete for slabs, footings, posts, columns and steps, bags of premix, blocks, bricks, mortar, pavers, base material and retaining walls.",
    icon: "brick",
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    short: "Mulch, gravel, topsoil, sod, seed and edging.",
    description:
      "Calculate cubic yards and bags of mulch, gravel, topsoil, sand and compost, plus sod, grass seed, raised bed soil, edging and landscaping costs.",
    icon: "leaf",
  },
  {
    slug: "outdoor-roofing",
    name: "Outdoor Structures & Roofing",
    short: "Fences, decks, stairs, roofing, siding and gutters.",
    description:
      "Plan fences, decks, stairs and pergolas, and estimate roofing squares, shingles, roof pitch, rafters, siding and gutters.",
    icon: "home",
  },
  {
    slug: "comfort-room-planning",
    name: "Comfort & Room Planning",
    short: "AC BTU, heating, fans, lighting, rugs and curtains.",
    description:
      "Size air conditioners, heaters, ceiling fans and lighting for a room, and pick the right rug, curtain and window sizes.",
    icon: "sun",
  },
  {
    slug: "cost-budgeting",
    name: "Cost & Budgeting",
    short: "Remodel costs, contractor markup, budgets and ROI.",
    description:
      "Estimate the cost of fences, decks, kitchens, bathrooms, roofs and driveways, check contractor markup, build a renovation budget and compare project ROI.",
    icon: "dollar",
  },
  {
    slug: "water-volume",
    name: "Water & Volume",
    short: "Pool, tank and pond volume in gallons and litres.",
    description:
      "Find the volume of pools, water tanks and ponds in gallons and litres for chemicals, pumps, liners and fill planning.",
    icon: "water",
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
