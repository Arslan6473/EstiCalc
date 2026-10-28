import type { CalculatorLogic, Field, Values } from "../types";
import { ceil, safeDiv, wasteField, withWaste } from "../helpers";

const SQ_FT_PER_SQ_YD = 9;

const roomFields = (length = 12, width = 15): Field[] => [
  { id: "length", label: "Room length", dim: "length", default: length, min: 0, step: 0.5 },
  { id: "width", label: "Room width", dim: "length", default: width, min: 0, step: 0.5 },
];

const boxField = (def: number, help: string): Field => ({
  id: "boxCoverage",
  label: "Coverage per box",
  dim: "area",
  default: def,
  min: 1,
  step: 0.1,
  help,
});

/**
 * Carpet strips cut from a roll. Strips run either along the room length
 * (laid side by side across the width) or along the room width.
 */
function carpetLayout(v: Values) {
  const roll = v.rollWidth;
  const trimFt = (v.trim || 0) / 12;
  const stripsAlongLength = roll > 0 ? ceil(v.width / roll) : 0;
  const stripsAlongWidth = roll > 0 ? ceil(v.length / roll) : 0;
  const optA = { strips: stripsAlongLength, linear: v.length > 0 ? stripsAlongLength * (v.length + trimFt) : 0 };
  const optB = { strips: stripsAlongWidth, linear: v.width > 0 ? stripsAlongWidth * (v.width + trimFt) : 0 };
  if (v.direction === 1) return optA;
  if (v.direction === 2) return optB;
  if (optA.linear !== optB.linear) return optA.linear < optB.linear ? optA : optB;
  return optA.strips <= optB.strips ? optA : optB;
}

function trimRun(v: Values) {
  const perimeter = 2 * (v.length + v.width);
  const net = Math.max(0, perimeter - v.doors * v.doorWidth - (v.exclude || 0));
  const needed = withWaste(net, v.waste);
  const pieces = v.pieceLength > 0 ? ceil(needed / v.pieceLength) : 0;
  return { perimeter, net, needed, pieces };
}

const trimFields = (): Field[] => [
  { id: "doors", label: "Doorways", default: 1, min: 0, step: 1, help: "Trim stops at each door casing." },
  { id: "doorWidth", label: "Average doorway width", dim: "length", default: 3, min: 0, step: 0.25, help: "A standard interior door opening is about 3 ft (0.9 m) including casing." },
];

export const logic: CalculatorLogic[] = [
  {
    slug: "flooring-calculator",
    fields: [
      ...roomFields(12, 15),
      { id: "extra", label: "Extra area (closets, nooks)", dim: "area", default: 0, min: 0, step: 1, help: "Add any small areas outside the main rectangle." },
      boxField(20, "Printed on the carton. Most flooring boxes cover 15–30 sq ft (1.4–2.8 m²)."),
      wasteField(10, "10% for straight layouts, 15% for diagonal or herringbone, more for very irregular rooms."),
    ],
    compute: (v) => {
      const area = v.length * v.width + (v.extra || 0);
      const toBuy = withWaste(area, v.waste);
      const boxes = v.boxCoverage > 0 ? ceil(toBuy / v.boxCoverage) : 0;
      return [
        { key: "boxes", label: "Boxes to buy", value: boxes, unit: "boxes", format: "integer", primary: true },
        { key: "areaWithWaste", label: "Flooring needed (with waste)", value: toBuy, dim: "area", decimals: 1 },
        { key: "area", label: "Floor area", value: area, dim: "area", decimals: 1 },
        { key: "purchased", label: "Area covered by boxes bought", value: boxes * v.boxCoverage, dim: "area", decimals: 1 },
        { key: "sqYd", label: "Flooring needed in square yards", value: toBuy / SQ_FT_PER_SQ_YD, unit: "sq yd", decimals: 1 },
      ];
    },
  },
  {
    slug: "laminate-flooring-calculator",
    fields: [
      ...roomFields(14, 16),
      boxField(22, "Laminate cartons typically hold 15–25 sq ft (1.4–2.3 m²). Check the label."),
      {
        id: "underlayment",
        label: "Underlayment",
        type: "select",
        default: 1,
        options: [
          { label: "Pad already attached to planks", value: 0 },
          { label: "Separate underlayment rolls", value: 1 },
        ],
      },
      {
        id: "rollCoverage",
        label: "Underlayment roll coverage",
        dim: "area",
        default: 100,
        min: 1,
        step: 1,
        help: "Foam underlayment is commonly sold in 100 sq ft (9.3 m²) rolls.",
        showIf: (v) => v.underlayment === 1,
      },
      wasteField(10, "10% for a straight lay; 15% for diagonal layouts or rooms with many corners."),
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const toBuy = withWaste(area, v.waste);
      const boxes = v.boxCoverage > 0 ? ceil(toBuy / v.boxCoverage) : 0;
      const rolls = v.underlayment === 1 && v.rollCoverage > 0 ? ceil(area / v.rollCoverage) : 0;
      return [
        { key: "boxes", label: "Boxes of laminate", value: boxes, unit: "boxes", format: "integer", primary: true },
        { key: "areaWithWaste", label: "Laminate needed (with waste)", value: toBuy, dim: "area", decimals: 1 },
        { key: "area", label: "Floor area", value: area, dim: "area", decimals: 1 },
        { key: "underlaymentRolls", label: "Underlayment rolls", value: rolls, unit: "rolls", format: "integer" },
        { key: "perimeter", label: "Room perimeter (expansion gap / trim)", value: 2 * (v.length + v.width), dim: "length", decimals: 1 },
      ];
    },
  },
  {
    slug: "vinyl-plank-flooring-calculator",
    fields: [
      ...roomFields(12, 18),
      boxField(24, "Luxury vinyl plank cartons usually cover 18–30 sq ft (1.7–2.8 m²)."),
      { id: "plankLength", label: "Plank length", dim: "smallLength", default: 48, min: 1, step: 0.5, help: "Common sizes: 36, 48 or 60 in (91–152 cm)." },
      { id: "plankWidth", label: "Plank width", dim: "smallLength", default: 7, min: 1, step: 0.25, help: "Common widths: 6–9 in (15–23 cm)." },
      wasteField(10, "10% for straight runs; 15% for diagonal layouts or many doorways and closets."),
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const toBuy = withWaste(area, v.waste);
      const boxes = v.boxCoverage > 0 ? ceil(toBuy / v.boxCoverage) : 0;
      const plankArea = (v.plankLength * v.plankWidth) / 144;
      const planks = plankArea > 0 ? ceil(toBuy / plankArea) : 0;
      return [
        { key: "boxes", label: "Boxes of vinyl plank", value: boxes, unit: "boxes", format: "integer", primary: true },
        { key: "areaWithWaste", label: "Vinyl plank needed (with waste)", value: toBuy, dim: "area", decimals: 1 },
        { key: "area", label: "Floor area", value: area, dim: "area", decimals: 1 },
        { key: "planks", label: "Approximate number of planks", value: planks, unit: "planks", format: "integer" },
        { key: "plankArea", label: "Area of one plank", value: plankArea, dim: "area", decimals: 2 },
      ];
    },
  },
  {
    slug: "carpet-calculator",
    fields: [
      ...roomFields(20, 14),
      {
        id: "rollWidth",
        label: "Carpet roll width",
        dim: "length",
        default: 12,
        min: 1,
        step: 0.5,
        help: "Most US broadloom carpet comes in 12 ft (3.66 m) widths; some in 13 ft 6 in or 15 ft.",
      },
      {
        id: "direction",
        label: "Strip direction",
        type: "select",
        default: 0,
        options: [
          { label: "Auto — least carpet", value: 0 },
          { label: "Strips run along room length", value: 1 },
          { label: "Strips run along room width", value: 2 },
        ],
        help: "Pile should run the same way in every strip. Choose a direction if you want seams kept out of traffic paths.",
      },
      { id: "trim", label: "Trim allowance per strip", dim: "smallLength", default: 6, min: 0, step: 1, help: "Extra length for trimming at both walls — typically 3 in (8 cm) per end." },
      wasteField(0, "Roll-width offcuts are already included. Add 5–15% only for patterned carpet that must be matched."),
    ],
    compute: (v) => {
      const { strips, linear } = carpetLayout(v);
      const roomArea = v.length * v.width;
      const purchase = withWaste(linear * v.rollWidth, v.waste);
      return [
        { key: "carpetSqYd", label: "Carpet to buy", value: purchase / SQ_FT_PER_SQ_YD, unit: "sq yd", decimals: 2, primary: true },
        { key: "carpetSqFt", label: "Carpet to buy (area)", value: purchase, dim: "area", decimals: 1 },
        { key: "linearFeet", label: "Length to cut from the roll", value: linear, dim: "length", decimals: 2 },
        { key: "strips", label: "Strips (drops)", value: strips, unit: "strips", format: "integer" },
        { key: "seams", label: "Seams", value: Math.max(0, strips - 1), unit: "seams", format: "integer" },
        { key: "roomArea", label: "Room area (carpet pad needed)", value: roomArea, dim: "area", decimals: 1 },
        { key: "offcut", label: "Offcut / waste", value: purchase > 0 ? ((purchase - roomArea) / purchase) * 100 : 0, unit: "%", decimals: 1 },
      ];
    },
  },
  {
    slug: "baseboard-trim-calculator",
    fields: [
      ...roomFields(14, 12),
      ...trimFields(),
      { id: "pieceLength", label: "Length of each piece", dim: "length", default: 16, min: 1, step: 1, help: "Baseboard is commonly sold in 8, 12 and 16 ft (2.4–4.9 m) lengths." },
      { id: "price", label: "Price per linear foot", dim: "pricePerLength", default: 1.5, min: 0, step: 0.05, prefix: "$", help: "Primed MDF often runs $1–$2/ft; solid wood more." },
      wasteField(10, "Covers miter cuts at corners and short offcuts. Use 15% for rooms with many corners."),
    ],
    compute: (v) => {
      const { perimeter, net, needed, pieces } = trimRun(v);
      return [
        { key: "pieces", label: "Pieces to buy", value: pieces, unit: "pieces", format: "integer", primary: true },
        { key: "linearFeet", label: "Baseboard needed (with waste)", value: needed, dim: "length", decimals: 1 },
        { key: "netLength", label: "Wall length to trim", value: net, dim: "length", decimals: 1 },
        { key: "perimeter", label: "Room perimeter", value: perimeter, dim: "length", decimals: 1 },
        { key: "cost", label: "Estimated material cost", value: pieces * v.pieceLength * v.price, format: "currency", decimals: 2 },
      ];
    },
  },
  {
    slug: "hardwood-flooring-calculator",
    fields: [
      ...roomFields(18, 15),
      boxField(20, "Solid hardwood cartons commonly hold 18–25 sq ft (1.7–2.3 m²); engineered boxes vary."),
      { id: "price", label: "Price per sq ft", dim: "pricePerArea", default: 6, min: 0, step: 0.1, prefix: "$", help: "Material only. Typical hardwood runs about $4–$12 per sq ft." },
      wasteField(10, "7–10% for straight installs, 15% or more for diagonal, herringbone or lower-grade boards."),
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const toBuy = withWaste(area, v.waste);
      const boxes = v.boxCoverage > 0 ? ceil(toBuy / v.boxCoverage) : 0;
      const bought = boxes * v.boxCoverage;
      return [
        { key: "boxes", label: "Boxes of hardwood", value: boxes, unit: "boxes", format: "integer", primary: true },
        { key: "areaWithWaste", label: "Hardwood needed (with waste)", value: toBuy, dim: "area", decimals: 1 },
        { key: "area", label: "Floor area", value: area, dim: "area", decimals: 1 },
        { key: "purchased", label: "Area covered by boxes bought", value: bought, dim: "area", decimals: 1 },
        { key: "cost", label: "Estimated material cost", value: bought * v.price, format: "currency", decimals: 2 },
      ];
    },
  },
  {
    slug: "stair-carpet-calculator",
    fields: [
      { id: "steps", label: "Number of steps", default: 13, min: 1, step: 1, help: "Count the treads (the parts you step on), not including the top floor." },
      { id: "tread", label: "Tread depth", dim: "smallLength", default: 10, min: 1, step: 0.25 },
      { id: "riser", label: "Riser height", dim: "smallLength", default: 7.5, min: 0, step: 0.25 },
      { id: "stairWidth", label: "Stair width (carpeted)", dim: "smallLength", default: 36, min: 1, step: 0.5, help: "Width of carpet on each step, including any wrap on open sides." },
      { id: "wrap", label: "Nosing wrap per step", dim: "smallLength", default: 2, min: 0, step: 0.5, help: "Extra to wrap around the nose and tuck at the riser — usually 1–2 in (3–5 cm)." },
      { id: "rollWidth", label: "Carpet roll width", dim: "length", default: 12, min: 1, step: 0.5, help: "Broadloom carpet is usually 12 ft (3.66 m) wide." },
      wasteField(10, "Extra for squaring the cut and mistakes."),
    ],
    compute: (v) => {
      const pieceLengthIn = v.tread + v.riser + v.wrap;
      const perRow = v.stairWidth > 0 ? Math.floor((v.rollWidth * 12 + 1e-9) / v.stairWidth) : 0;
      const rows = perRow > 0 ? ceil(v.steps / perRow) : 0;
      const rollLength = (rows * pieceLengthIn) / 12;
      const purchase = withWaste(rollLength * v.rollWidth, v.waste);
      const net = (v.steps * v.stairWidth * pieceLengthIn) / 144;
      return [
        { key: "carpetSqYd", label: "Carpet to buy", value: purchase / SQ_FT_PER_SQ_YD, unit: "sq yd", decimals: 2, primary: true },
        { key: "carpetSqFt", label: "Carpet to buy (area)", value: purchase, dim: "area", decimals: 1 },
        { key: "rollLength", label: "Length to cut from the roll", value: rollLength, dim: "length", decimals: 2 },
        { key: "piecesPerRow", label: "Step pieces across the roll width", value: perRow, unit: "pieces", format: "integer" },
        { key: "pieceLength", label: "Carpet per step (tread + riser + wrap)", value: pieceLengthIn, dim: "smallLength", decimals: 1 },
        { key: "netArea", label: "Carpet actually on the stairs", value: net, dim: "area", decimals: 1 },
        { key: "padArea", label: "Pad for treads", value: (v.steps * v.stairWidth * v.tread) / 144, dim: "area", decimals: 1 },
      ];
    },
  },
  {
    slug: "underlayment-calculator",
    fields: [
      ...roomFields(16, 12),
      { id: "rollCoverage", label: "Coverage per roll", dim: "area", default: 100, min: 1, step: 1, help: "Foam and combo underlayments are commonly sold in 100 sq ft (9.3 m²) rolls; some in 200 or 360 sq ft." },
      { id: "rollWidth", label: "Roll width", dim: "length", default: 3.33, min: 0.5, step: 0.01, help: "Many 100 sq ft rolls are about 3 ft 4 in (1 m) wide. Used to estimate seam tape." },
      wasteField(5, "Underlayment is butted, not overlapped, so 5% usually covers trimming at walls."),
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const toBuy = withWaste(area, v.waste);
      const rolls = v.rollCoverage > 0 ? ceil(toBuy / v.rollCoverage) : 0;
      const runs = v.rollWidth > 0 ? ceil(v.width / v.rollWidth) : 0;
      const seams = Math.max(0, runs - 1);
      return [
        { key: "rolls", label: "Rolls of underlayment", value: rolls, unit: "rolls", format: "integer", primary: true },
        { key: "areaWithWaste", label: "Underlayment needed (with waste)", value: toBuy, dim: "area", decimals: 1 },
        { key: "area", label: "Floor area", value: area, dim: "area", decimals: 1 },
        { key: "runs", label: "Runs across the room", value: runs, unit: "runs", format: "integer" },
        { key: "tape", label: "Seam tape", value: seams * v.length, dim: "length", decimals: 1 },
      ];
    },
  },
  {
    slug: "quarter-round-calculator",
    fields: [
      ...roomFields(12, 10),
      ...trimFields(),
      { id: "exclude", label: "Other runs to skip", dim: "length", default: 0, min: 0, step: 0.5, help: "Lengths along cabinets, tubs or built-ins that will not get quarter round." },
      { id: "pieceLength", label: "Length of each piece", dim: "length", default: 8, min: 1, step: 1, help: "Quarter round is usually sold in 8 ft (2.4 m) lengths; some stores stock 12 or 16 ft." },
      { id: "nailSpacing", label: "Nail spacing", dim: "smallLength", default: 12, min: 4, step: 1, help: "Brad nails are typically placed every 12–16 in (30–40 cm)." },
      wasteField(10, "Covers coped or mitered corners and short offcuts."),
    ],
    compute: (v) => {
      const { perimeter, net, needed, pieces } = trimRun(v);
      const nails = v.nailSpacing > 0 ? ceil((net * 12) / v.nailSpacing) : 0;
      return [
        { key: "pieces", label: "Pieces to buy", value: pieces, unit: "pieces", format: "integer", primary: true },
        { key: "linearFeet", label: "Quarter round needed (with waste)", value: needed, dim: "length", decimals: 1 },
        { key: "netLength", label: "Length to cover", value: net, dim: "length", decimals: 1 },
        { key: "perimeter", label: "Room perimeter", value: perimeter, dim: "length", decimals: 1 },
        { key: "nails", label: "Brad nails (approx.)", value: nails, unit: "nails", format: "integer" },
      ];
    },
  },
  {
    slug: "floor-leveling-compound-calculator",
    fields: [
      { id: "length", label: "Length of area to level", dim: "length", default: 12, min: 0, step: 0.5 },
      { id: "width", label: "Width of area to level", dim: "length", default: 10, min: 0, step: 0.5 },
      { id: "depth", label: "Average pour depth", dim: "smallLength", default: 0.25, min: 0, step: 0.0625, help: "Average thickness across the area — e.g. 1/8 in = 0.125, 1/4 in = 0.25 (6 mm)." },
      { id: "bagYield", label: "Yield per bag", dim: "volume", default: 0.5, min: 0.05, step: 0.01, help: "Most 50 lb bags of self-leveler yield about 0.45–0.5 cu ft — roughly 50 sq ft at 1/8 in. Check the bag." },
      { id: "bagWeight", label: "Bag weight", dim: "weight", default: 50, min: 1, step: 1 },
      wasteField(10, "Extra for low spots deeper than expected and material left in the bucket."),
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const volume = (area * v.depth) / 12;
      const withExtra = withWaste(volume, v.waste);
      const bags = v.bagYield > 0 ? ceil(withExtra / v.bagYield) : 0;
      return [
        { key: "bags", label: "Bags to buy", value: bags, unit: "bags", format: "integer", primary: true },
        { key: "volume", label: "Compound volume (with waste)", value: withExtra, dim: "volume", decimals: 2 },
        { key: "netVolume", label: "Volume to fill", value: volume, dim: "volume", decimals: 2 },
        { key: "area", label: "Area to level", value: area, dim: "area", decimals: 1 },
        { key: "weight", label: "Total weight of bags", value: bags * v.bagWeight, dim: "weight", decimals: 0 },
      ];
    },
  },
  {
    slug: "flooring-cost-calculator",
    fields: [
      ...roomFields(12, 15),
      { id: "materialPrice", label: "Flooring material price", dim: "pricePerArea", default: 4, min: 0, step: 0.1, prefix: "$", help: "Typical: laminate $1–$5, vinyl plank $2–$7, carpet $1–$6, hardwood $4–$12 per sq ft." },
      { id: "underlaymentPrice", label: "Underlayment price", dim: "pricePerArea", default: 0.5, min: 0, step: 0.05, prefix: "$", help: "Set to 0 if the flooring has a pad attached." },
      { id: "laborPrice", label: "Installation labor", dim: "pricePerArea", default: 3, min: 0, step: 0.1, prefix: "$", help: "Set to 0 for DIY." },
      { id: "removalPrice", label: "Old floor removal", dim: "pricePerArea", default: 1, min: 0, step: 0.1, prefix: "$", help: "Tear-out and disposal. Set to 0 if nothing needs removing." },
      { id: "extras", label: "Trim, transitions and supplies", default: 150, min: 0, step: 10, prefix: "$", help: "Lump sum for thresholds, baseboard, adhesive, fasteners." },
      wasteField(10, "Applied to material and underlayment only — you pay labor on the actual floor area."),
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const matArea = withWaste(area, v.waste);
      const material = matArea * v.materialPrice;
      const underlayment = matArea * v.underlaymentPrice;
      const labor = area * v.laborPrice;
      const removal = area * v.removalPrice;
      const total = material + underlayment + labor + removal + v.extras;
      return [
        { key: "total", label: "Estimated total cost", value: total, format: "currency", decimals: 0, primary: true },
        { key: "perSqFt", label: "All-in cost per sq ft of floor", value: safeDiv(total, area), dim: "pricePerArea", decimals: 2 },
        { key: "material", label: "Flooring material", value: material, format: "currency", decimals: 0 },
        { key: "underlayment", label: "Underlayment", value: underlayment, format: "currency", decimals: 0 },
        { key: "labor", label: "Installation labor", value: labor, format: "currency", decimals: 0 },
        { key: "removal", label: "Old floor removal", value: removal, format: "currency", decimals: 0 },
        { key: "area", label: "Floor area", value: area, dim: "area", decimals: 1 },
      ];
    },
  },
  {
    slug: "flooring-installation-cost-calculator",
    fields: [
      ...roomFields(20, 15),
      { id: "laborRate", label: "Installation labor rate", dim: "pricePerArea", default: 3, min: 0, step: 0.1, prefix: "$", help: "Typical: carpet $1–$2, laminate and vinyl plank $2–$5, hardwood $4–$8 per sq ft." },
      { id: "removalRate", label: "Remove and haul away old floor", dim: "pricePerArea", default: 1, min: 0, step: 0.1, prefix: "$", help: "Usually $1–$3 per sq ft; glued-down or tile floors cost more. 0 if not needed." },
      { id: "prepRate", label: "Subfloor prep", dim: "pricePerArea", default: 0.5, min: 0, step: 0.1, prefix: "$", help: "Patching, sanding high spots, installing underlayment. 0 if the floor is ready." },
      { id: "trimRate", label: "Baseboard / quarter round work", dim: "pricePerLength", default: 1.5, min: 0, step: 0.1, prefix: "$", help: "Removing and reinstalling or replacing trim around the room perimeter." },
      { id: "stairs", label: "Stairs to cover", default: 0, min: 0, step: 1, suffix: "steps" },
      { id: "stairRate", label: "Price per stair", default: 75, min: 0, step: 5, prefix: "$", help: "Stairs are priced per step and vary widely by material.", showIf: (v) => v.stairs > 0 },
      { id: "otherFees", label: "Other fees", default: 100, min: 0, step: 10, prefix: "$", help: "Furniture moving, trip charge or minimum job fee." },
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const perimeter = 2 * (v.length + v.width);
      const labor = area * v.laborRate;
      const removal = area * v.removalRate;
      const prep = area * v.prepRate;
      const trim = perimeter * v.trimRate;
      const stairs = v.stairs * v.stairRate;
      const total = labor + removal + prep + trim + stairs + v.otherFees;
      return [
        { key: "total", label: "Estimated installation cost", value: total, format: "currency", decimals: 0, primary: true },
        { key: "perSqFt", label: "Installation cost per sq ft", value: safeDiv(total, area), dim: "pricePerArea", decimals: 2 },
        { key: "labor", label: "Installation labor", value: labor, format: "currency", decimals: 0 },
        { key: "removal", label: "Removal and disposal", value: removal, format: "currency", decimals: 0 },
        { key: "prep", label: "Subfloor prep", value: prep, format: "currency", decimals: 0 },
        { key: "trim", label: "Trim work", value: trim, format: "currency", decimals: 0 },
        { key: "stairsCost", label: "Stairs", value: stairs, format: "currency", decimals: 0 },
        { key: "area", label: "Floor area", value: area, dim: "area", decimals: 1 },
      ];
    },
  },
  {
    slug: "room-by-room-flooring-estimator",
    fields: [
      ...[1, 2, 3, 4].flatMap((n): Field[] => [
        { id: `room${n}Length`, label: `Room ${n} length`, dim: "length", default: n === 1 ? 14 : n === 2 ? 12 : 0, min: 0, step: 0.5, help: n > 2 ? "Leave at 0 if not used." : undefined },
        { id: `room${n}Width`, label: `Room ${n} width`, dim: "length", default: n === 1 ? 12 : n === 2 ? 10 : 0, min: 0, step: 0.5 },
      ]),
      boxField(20, "Square footage per carton, printed on the box."),
      { id: "price", label: "Price per sq ft (optional)", dim: "pricePerArea", default: 3.5, min: 0, step: 0.1, prefix: "$", help: "Material price, used to estimate the cost of the boxes." },
      wasteField(10, "10% for straight layouts, 15% for diagonal patterns or many small rooms."),
    ],
    compute: (v) => {
      const rooms = [1, 2, 3, 4].map((n) => ({ n, area: Math.max(0, v[`room${n}Length`]) * Math.max(0, v[`room${n}Width`]) }));
      const area = rooms.reduce((s, r) => s + r.area, 0);
      const toBuy = withWaste(area, v.waste);
      const boxes = v.boxCoverage > 0 ? ceil(toBuy / v.boxCoverage) : 0;
      return [
        { key: "boxes", label: "Boxes to buy (all rooms)", value: boxes, unit: "boxes", format: "integer", primary: true },
        { key: "totalArea", label: "Total floor area", value: area, dim: "area", decimals: 1 },
        { key: "areaWithWaste", label: "Flooring needed (with waste)", value: toBuy, dim: "area", decimals: 1 },
        { key: "cost", label: "Estimated material cost", value: boxes * v.boxCoverage * v.price, format: "currency", decimals: 0 },
        ...rooms
          .filter((r) => r.area > 0)
          .map((r) => ({ key: `room${r.n}Area`, label: `Room ${r.n} area`, value: r.area, dim: "area" as const, decimals: 1 })),
      ];
    },
  },
];
