import type { CalculatorLogic, Field, NumberField, ResultItem, Values } from "../types";
import { CU_FT_PER_CU_YD, ceil, safeDiv, shapeSelect, wasteField, withWaste } from "../helpers";

const LB_PER_TON = 2000; // US short ton

/* ---------- shared area inputs: rectangle, circle or a known area ---------- */

function areaFields(d: { length: number; width: number; diameter: number; area: number }): Field[] {
  return [
    shapeSelect("shape", ["Rectangle", "Circle", "I know the area"]),
    { id: "length", label: "Length", dim: "length", default: d.length, min: 0, step: 0.5, showIf: (v) => v.shape === 0 },
    { id: "width", label: "Width", dim: "length", default: d.width, min: 0, step: 0.5, showIf: (v) => v.shape === 0 },
    { id: "diameter", label: "Diameter", dim: "length", default: d.diameter, min: 0, step: 0.5, showIf: (v) => v.shape === 1 },
    { id: "area", label: "Area", dim: "area", default: d.area, min: 0, step: 10, showIf: (v) => v.shape === 2 },
  ];
}

function areaOf(v: Values) {
  if (v.shape === 1) return Math.PI * (v.diameter / 2) ** 2;
  if (v.shape === 2) return Math.max(0, v.area);
  return v.length * v.width;
}

const depthField = (def: number, help: string): NumberField => ({
  id: "depth",
  label: "Depth",
  dim: "smallLength",
  default: def,
  min: 0,
  step: 0.5,
  help,
});

const bagField = (def: number, help: string): NumberField => ({
  id: "bagSize",
  label: "Bag size",
  dim: "volume",
  default: def,
  min: 0.1,
  step: 0.25,
  help,
});

const densityField = (def: number, help: string): NumberField => ({
  id: "density",
  label: "Material density",
  default: def,
  min: 0.1,
  max: 3,
  step: 0.05,
  suffix: "tons/cu yd",
  help,
});

/** Volume of a bulk material spread over an area at a depth in inches, plus waste. */
function bulkResults(areaSqFt: number, depthIn: number, wastePct: number, bagSize: number, density?: number): ResultItem[] {
  const cuFt = withWaste(areaSqFt * (depthIn / 12), wastePct);
  const cuYd = cuFt / CU_FT_PER_CU_YD;
  const out: ResultItem[] = [
    { key: "cubicYards", label: "Bulk amount to order", value: cuYd, dim: "cubicYards", decimals: 2, primary: true },
    { key: "cubicFeet", label: "Volume", value: cuFt, dim: "volume", decimals: 1 },
    { key: "bags", label: "Bags (if buying bagged)", value: ceil(safeDiv(cuFt, bagSize)), unit: "bags", format: "integer" },
  ];
  if (density !== undefined) {
    const tons = cuYd * density;
    out.push(
      { key: "tons", label: "Approximate weight", value: tons, unit: "US tons", decimals: 2 },
      { key: "weight", label: "Approximate weight (lb)", value: tons * LB_PER_TON, dim: "weight", decimals: 0 },
    );
  }
  out.push({ key: "areaSqFt", label: "Area covered", value: areaSqFt, dim: "area", decimals: 0 });
  return out;
}

/* ---------- gravel ---------- */

const GRAVEL_DENSITY = [1.4, 1.35, 1.5, 1.35]; // pea gravel, crushed stone, crusher run, river rock

/* ---------- grass seed: new-lawn rates in lb per 1,000 sq ft (mid-range) ---------- */

const SEED_RATES = [2, 7, 7, 4, 5, 1.5, 1.5, 0.5, 7];

/* ---------- compost application depths (inches) ---------- */

const COMPOST_DEPTH = [0.25, 1, 2];

/* ---------- sod piece sizes (sq ft) ---------- */

const SOD_PIECE = [(16 * 24) / 144, (18 * 24) / 144, 10];

export const logic: CalculatorLogic[] = [
  {
    slug: "mulch-calculator",
    fields: [
      ...areaFields({ length: 20, width: 10, diameter: 8, area: 200 }),
      depthField(3, "2–3 in (5–7.5 cm) for fine mulch, 3–4 in (7.5–10 cm) for coarse bark or to smother weeds."),
      bagField(2, "Most bagged mulch is 2 cu ft; some is sold in 1.5 or 3 cu ft bags."),
      wasteField(10, "Mulch settles after spreading. 5–10% covers settling and uneven ground."),
    ],
    compute: (v) => {
      const area = areaOf(v);
      const res = bulkResults(area, v.depth, v.waste, v.bagSize);
      const cuFt = res.find((r) => r.key === "cubicFeet")!.value;
      res.splice(3, 0, { key: "bags3", label: "Or 3 cu ft bags", value: ceil(cuFt / 3), unit: "bags", format: "integer" });
      return res;
    },
  },
  {
    slug: "gravel-calculator",
    fields: [
      ...areaFields({ length: 20, width: 10, diameter: 10, area: 200 }),
      depthField(3, "2–3 in (5–7.5 cm) for paths and decorative beds, 4–6 in (10–15 cm) per layer for driveways."),
      {
        id: "type",
        label: "Gravel type",
        type: "select",
        default: 1,
        options: [
          { label: "Pea gravel (~1.4 t/cu yd)", value: 0 },
          { label: "Crushed stone, e.g. #57 (~1.35 t/cu yd)", value: 1 },
          { label: "Crusher run / road base (~1.5 t/cu yd)", value: 2 },
          { label: "River rock (~1.35 t/cu yd)", value: 3 },
          { label: "Custom density", value: 4 },
        ],
        help: "Used to estimate tons. Your supplier can confirm the weight of their stone.",
      },
      { ...densityField(1.4, "1 US ton per cu yd ≈ 1.19 tonnes per m³."), showIf: (v) => v.type === 4 },
      bagField(0.5, "Bagged gravel is usually 0.5 cu ft (about 50 lb)."),
      wasteField(10, "Covers compaction, uneven sub-grade and spillage."),
    ],
    compute: (v) => {
      const density = v.type === 4 ? v.density : (GRAVEL_DENSITY[v.type] ?? 1.4);
      return bulkResults(areaOf(v), v.depth, v.waste, v.bagSize, density);
    },
  },
  {
    slug: "topsoil-calculator",
    fields: [
      ...areaFields({ length: 30, width: 20, diameter: 10, area: 600 }),
      depthField(4, "1–2 in to level a lawn, 4–6 in under new sod or seed, 8–12 in for new garden beds."),
      densityField(1.1, "Dry, loose topsoil is roughly 1–1.2 tons per cu yd; wet soil is heavier."),
      bagField(0.75, "Bagged topsoil is commonly 0.75 cu ft (about 40 lb) or 1 cu ft."),
      wasteField(15, "Topsoil settles 10–20% after it is raked out and watered."),
    ],
    compute: (v) => bulkResults(areaOf(v), v.depth, v.waste, v.bagSize, v.density),
  },
  {
    slug: "sand-calculator",
    fields: [
      ...areaFields({ length: 6, width: 6, diameter: 6, area: 36 }),
      depthField(12, "About 1 in (2.5 cm) as a paver setting bed, 2 in under above-ground pools, 6–12 in for a sandbox."),
      densityField(1.35, "Dry sand is about 1.3–1.4 tons per cu yd; damp sand weighs more."),
      bagField(0.5, "A 50 lb bag of play or all-purpose sand holds about 0.5 cu ft."),
      wasteField(5, "Add more if the sand will be compacted or screeded."),
    ],
    compute: (v) => bulkResults(areaOf(v), v.depth, v.waste, v.bagSize, v.density),
  },
  {
    slug: "sod-calculator",
    fields: [
      { id: "length1", label: "Area 1 length", dim: "length", default: 40, min: 0, step: 1 },
      { id: "width1", label: "Area 1 width", dim: "length", default: 25, min: 0, step: 1 },
      { id: "length2", label: "Area 2 length (0 if not used)", dim: "length", default: 0, min: 0, step: 1 },
      { id: "width2", label: "Area 2 width", dim: "length", default: 0, min: 0, step: 1 },
      { id: "length3", label: "Area 3 length (0 if not used)", dim: "length", default: 0, min: 0, step: 1 },
      { id: "width3", label: "Area 3 width", dim: "length", default: 0, min: 0, step: 1 },
      {
        id: "piece",
        label: "Sod piece size",
        type: "select",
        default: 0,
        options: [
          { label: "Slab 16 × 24 in (2.67 sq ft)", value: 0 },
          { label: "Slab 18 × 24 in (3 sq ft)", value: 1 },
          { label: "Roll 2 × 5 ft (10 sq ft)", value: 2 },
        ],
      },
      {
        id: "pallet",
        label: "Coverage per pallet",
        dim: "area",
        default: 450,
        min: 50,
        step: 10,
        help: "Pallets usually hold 400–500 sq ft (37–46 m²). Ask your sod farm.",
      },
      wasteField(5, "5% for simple rectangles, 10–15% for curves, beds and trees to cut around."),
    ],
    compute: (v) => {
      const net = v.length1 * v.width1 + v.length2 * v.width2 + v.length3 * v.width3;
      const order = withWaste(net, v.waste);
      const pieceSqFt = SOD_PIECE[v.piece] ?? SOD_PIECE[0];
      return [
        { key: "orderArea", label: "Sod to order", value: order, dim: "area", decimals: 0, primary: true },
        { key: "pieces", label: "Pieces / rolls", value: ceil(order / pieceSqFt), unit: "pieces", format: "integer" },
        { key: "pallets", label: "Pallets", value: ceil(safeDiv(order, v.pallet)), unit: "pallets", format: "integer" },
        { key: "squareYards", label: "Sod in square yards", value: order / 9, unit: "sq yd", decimals: 1 },
        { key: "lawnArea", label: "Lawn area (before waste)", value: net, dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "grass-seed-calculator",
    fields: [
      ...areaFields({ length: 50, width: 40, diameter: 30, area: 2000 }),
      {
        id: "grass",
        label: "Grass type",
        type: "select",
        default: 1,
        options: [
          { label: "Kentucky bluegrass (2 lb/1,000 sq ft)", value: 0 },
          { label: "Tall fescue (7 lb/1,000 sq ft)", value: 1 },
          { label: "Perennial ryegrass (7 lb/1,000 sq ft)", value: 2 },
          { label: "Fine fescue (4 lb/1,000 sq ft)", value: 3 },
          { label: "Sun & shade mix (5 lb/1,000 sq ft)", value: 4 },
          { label: "Bermudagrass, hulled (1.5 lb/1,000 sq ft)", value: 5 },
          { label: "Zoysiagrass (1.5 lb/1,000 sq ft)", value: 6 },
          { label: "Centipedegrass (0.5 lb/1,000 sq ft)", value: 7 },
          { label: "Bahiagrass (7 lb/1,000 sq ft)", value: 8 },
          { label: "Custom rate from the seed label", value: 9 },
        ],
        help: "New-lawn rates. The seed bag label is the final word.",
      },
      {
        id: "customRate",
        label: "Seeding rate",
        default: 5,
        min: 0,
        step: 0.25,
        suffix: "lb/1,000 sq ft",
        help: "1 lb per 1,000 sq ft ≈ 4.9 g per m².",
        showIf: (v) => v.grass === 9,
      },
      {
        id: "project",
        label: "Project",
        type: "select",
        default: 0,
        options: [
          { label: "New lawn / bare soil", value: 0 },
          { label: "Overseeding an existing lawn (half rate)", value: 1 },
        ],
      },
      { id: "bagWeight", label: "Bag size", dim: "weight", default: 5, min: 0.5, step: 0.5, help: "Seed commonly comes in 3, 5, 7, 20 and 50 lb bags." },
      wasteField(5, "Extra for edges, spreader overlap and patching thin spots later."),
    ],
    compute: (v) => {
      const area = areaOf(v);
      const baseRate = v.grass === 9 ? v.customRate : (SEED_RATES[v.grass] ?? 5);
      const rate = v.project === 1 ? baseRate / 2 : baseRate;
      const lb = withWaste((area / 1000) * rate, v.waste);
      return [
        { key: "seedLb", label: "Seed needed", value: lb, dim: "weight", decimals: 1, primary: true },
        { key: "bags", label: "Bags to buy", value: ceil(safeDiv(lb, v.bagWeight)), unit: "bags", format: "integer" },
        { key: "rate", label: "Seeding rate used", value: rate, unit: "lb/1,000 sq ft", decimals: 2 },
        { key: "areaSqFt", label: "Lawn area", value: area, dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "raised-bed-soil-calculator",
    fields: [
      { id: "beds", label: "Number of beds", default: 2, min: 1, step: 1, suffix: "beds" },
      { id: "length", label: "Bed length (inside)", dim: "length", default: 8, min: 0, step: 0.5 },
      { id: "width", label: "Bed width (inside)", dim: "length", default: 4, min: 0, step: 0.5 },
      { id: "depth", label: "Soil depth", dim: "smallLength", default: 12, min: 0, step: 1, help: "Usually the bed height minus 1–2 in (2–5 cm) of freeboard." },
      {
        id: "mix",
        label: "What will you fill with?",
        type: "select",
        default: 1,
        options: [
          { label: "One bagged raised-bed mix", value: 0 },
          { label: "Blend: 60% topsoil, 30% compost, 10% aeration", value: 1 },
          { label: "Blend: 50% topsoil, 50% compost", value: 2 },
        ],
        help: "Aeration = perlite, pumice or fine bark.",
      },
      bagField(1.5, "Raised-bed and garden soil bags are commonly 1–2 cu ft."),
      wasteField(10, "New soil settles about 10–20% in the first season."),
    ],
    compute: (v) => {
      const cuFt = withWaste(v.beds * v.length * v.width * (v.depth / 12), v.waste);
      const out: ResultItem[] = [
        { key: "cubicFeet", label: "Soil needed", value: cuFt, dim: "volume", decimals: 1, primary: true },
        { key: "cubicYards", label: "Soil in cubic yards", value: cuFt / CU_FT_PER_CU_YD, dim: "cubicYards", decimals: 2 },
        { key: "bags", label: "Bags (if buying bagged)", value: ceil(safeDiv(cuFt, v.bagSize)), unit: "bags", format: "integer" },
      ];
      const split = v.mix === 1 ? [0.6, 0.3, 0.1] : v.mix === 2 ? [0.5, 0.5, 0] : null;
      if (split) {
        out.push(
          { key: "topsoil", label: "Topsoil portion", value: cuFt * split[0], dim: "volume", decimals: 1 },
          { key: "compost", label: "Compost portion", value: cuFt * split[1], dim: "volume", decimals: 1 },
        );
        if (split[2]) out.push({ key: "aeration", label: "Aeration portion", value: cuFt * split[2], dim: "volume", decimals: 1 });
      }
      return out;
    },
  },
  {
    slug: "pea-gravel-calculator",
    fields: [
      ...areaFields({ length: 12, width: 12, diameter: 10, area: 144 }),
      depthField(3, "2–3 in for walkways and patios, 3–4 in for dog runs, at least 9 in maintained depth under play equipment."),
      densityField(1.4, "Pea gravel weighs roughly 1.3–1.5 tons per cu yd."),
      bagField(0.5, "Bagged pea gravel is usually 0.5 cu ft (about 50 lb)."),
      wasteField(10, "Pea gravel shifts and settles; add more for play areas that will compress."),
    ],
    compute: (v) => bulkResults(areaOf(v), v.depth, v.waste, v.bagSize, v.density),
  },
  {
    slug: "river-rock-calculator",
    fields: [
      ...areaFields({ length: 20, width: 4, diameter: 8, area: 80 }),
      depthField(3, "About twice the stone size: 2 in for ¾–1½ in rock, 3–4 in for 1½–3 in rock, 5–6 in for 3–5 in rock."),
      densityField(1.35, "River rock is roughly 1.3–1.4 tons per cu yd."),
      bagField(0.5, "Bagged river rock is usually 0.5 cu ft."),
      wasteField(10, "Extra to fill gaps between larger stones."),
    ],
    compute: (v) => {
      const area = areaOf(v);
      const res = bulkResults(area, v.depth, v.waste, v.bagSize, v.density);
      // Coverage of one US ton at the chosen depth (no waste).
      const sqFtPerTon = v.depth > 0 && v.density > 0 ? (CU_FT_PER_CU_YD / v.density) / (v.depth / 12) : 0;
      res.push({ key: "coveragePerTon", label: "Coverage per ton at this depth", value: sqFtPerTon, dim: "area", decimals: 0 });
      return res;
    },
  },
  {
    slug: "compost-calculator",
    fields: [
      ...areaFields({ length: 20, width: 10, diameter: 10, area: 200 }),
      {
        id: "use",
        label: "How will you use it?",
        type: "select",
        default: 2,
        options: [
          { label: "Top-dress a lawn (¼ in)", value: 0 },
          { label: "Mulch / side-dress beds (1 in)", value: 1 },
          { label: "Mix into a new bed (2 in)", value: 2 },
          { label: "Custom depth", value: 3 },
        ],
      },
      { ...depthField(3, "Depth of compost spread on the surface before any tilling."), showIf: (v) => v.use === 3 },
      bagField(1, "Bagged compost is commonly 0.75–1 cu ft (about 40 lb)."),
      wasteField(5),
    ],
    compute: (v) => {
      const depth = v.use === 3 ? v.depth : (COMPOST_DEPTH[v.use] ?? 2);
      return [...bulkResults(areaOf(v), depth, v.waste, v.bagSize), { key: "depthUsed", label: "Depth used", value: depth, dim: "smallLength", decimals: 2 }];
    },
  },
  {
    slug: "decomposed-granite-calculator",
    fields: [
      ...areaFields({ length: 30, width: 4, diameter: 12, area: 120 }),
      depthField(3, "2–3 in for paths, 3–4 in for patios, 4 in or more for light vehicle use."),
      densityField(1.4, "Decomposed granite is roughly 1.3–1.5 tons per cu yd."),
      {
        id: "baseDepth",
        label: "Base layer depth (0 = none)",
        dim: "smallLength",
        default: 0,
        min: 0,
        step: 1,
        help: "Optional compacted road base or crushed stone under DG on clay or for driveways.",
      },
      { ...densityField(1.5, "Road base / crusher run is roughly 1.4–1.6 tons per cu yd."), id: "baseDensity", label: "Base density", showIf: (v) => v.baseDepth > 0 },
      bagField(0.5, "DG is mostly sold in bulk; bags are usually 0.5 cu ft."),
      wasteField(15, "DG compacts by roughly 15–25% when wetted and rolled."),
    ],
    compute: (v) => {
      const area = areaOf(v);
      const res = bulkResults(area, v.depth, v.waste, v.bagSize, v.density);
      const baseYd = withWaste(area * (v.baseDepth / 12), v.waste) / CU_FT_PER_CU_YD;
      res.push(
        { key: "baseCubicYards", label: "Base material", value: baseYd, dim: "cubicYards", decimals: 2 },
        { key: "baseTons", label: "Base material weight", value: baseYd * v.baseDensity, unit: "US tons", decimals: 2 },
      );
      return res;
    },
  },
  {
    slug: "edging-calculator",
    fields: [
      shapeSelect("shape", ["Rectangular bed", "Round bed", "Measured run / curved bed"]),
      { id: "length", label: "Bed length", dim: "length", default: 12, min: 0, step: 0.5, showIf: (v) => v.shape === 0 },
      { id: "width", label: "Bed width", dim: "length", default: 6, min: 0, step: 0.5, showIf: (v) => v.shape === 0 },
      {
        id: "exclude",
        label: "Length not edged",
        dim: "length",
        default: 0,
        min: 0,
        step: 0.5,
        help: "e.g. a side against the house, a fence or a patio.",
        showIf: (v) => v.shape === 0,
      },
      { id: "diameter", label: "Bed diameter", dim: "length", default: 8, min: 0, step: 0.5, showIf: (v) => v.shape === 1 },
      {
        id: "run",
        label: "Total edge length",
        dim: "length",
        default: 50,
        min: 0,
        step: 1,
        help: "Lay a garden hose along the curve, then measure the hose.",
        showIf: (v) => v.shape === 2,
      },
      { id: "pieceLength", label: "Length per roll or piece", dim: "length", default: 20, min: 1, step: 1, help: "Plastic coils are often 20–60 ft; steel and aluminum strips 4–16 ft." },
      { id: "stakeSpacing", label: "Stake spacing", dim: "length", default: 4, min: 0.5, step: 0.5, help: "Follow the product instructions; 3–4 ft is common for plastic edging." },
      wasteField(10, "Covers overlaps at joints and the extra length curves use."),
    ],
    compute: (v) => {
      let edge: number;
      let closed: boolean;
      if (v.shape === 1) {
        edge = Math.PI * v.diameter;
        closed = true;
      } else if (v.shape === 2) {
        edge = v.run;
        closed = false;
      } else {
        edge = Math.max(0, 2 * (v.length + v.width) - v.exclude);
        closed = v.exclude <= 0;
      }
      const total = withWaste(edge, v.waste);
      const pieces = ceil(safeDiv(total, v.pieceLength));
      const stakes = total > 0 ? ceil(safeDiv(total, v.stakeSpacing)) + (closed ? 0 : 1) : 0;
      const connectors = closed ? pieces : Math.max(0, pieces - 1);
      return [
        { key: "edgingLength", label: "Edging to buy", value: total, dim: "length", decimals: 1, primary: true },
        { key: "pieces", label: "Rolls / pieces", value: pieces, unit: "pieces", format: "integer" },
        { key: "stakes", label: "Stakes", value: stakes, unit: "stakes", format: "integer" },
        { key: "connectors", label: "Connectors", value: connectors, unit: "connectors", format: "integer" },
        { key: "edgeLength", label: "Measured edge (before waste)", value: edge, dim: "length", decimals: 1 },
      ];
    },
  },
  {
    slug: "tree-ring-calculator",
    fields: [
      { id: "trees", label: "Number of trees", default: 1, min: 1, step: 1, suffix: "trees" },
      { id: "ringDiameter", label: "Ring diameter", dim: "length", default: 6, min: 0, step: 0.5, help: "Wider is better for the tree — ideally toward the drip line." },
      { id: "trunk", label: "Trunk diameter", dim: "smallLength", default: 8, min: 0, step: 1 },
      { id: "gap", label: "Bare gap around trunk", dim: "smallLength", default: 3, min: 0, step: 1, help: "Keep mulch a few inches off the bark." },
      depthField(3, "2–4 in (5–10 cm) of mulch; never pile it against the trunk."),
      bagField(2, "2 cu ft for bagged mulch, 0.5 cu ft for bagged decorative stone."),
      wasteField(5),
    ],
    compute: (v) => {
      const inner = Math.min(v.ringDiameter, (v.trunk + 2 * v.gap) / 12);
      const ringArea = (Math.PI / 4) * (v.ringDiameter ** 2 - inner ** 2);
      const cuFt = withWaste(ringArea * (v.depth / 12) * v.trees, v.waste);
      return [
        { key: "bags", label: "Bags to buy", value: ceil(safeDiv(cuFt, v.bagSize)), unit: "bags", format: "integer", primary: true },
        { key: "cubicFeet", label: "Total volume", value: cuFt, dim: "volume", decimals: 1 },
        { key: "cubicYards", label: "Total in cubic yards", value: cuFt / CU_FT_PER_CU_YD, dim: "cubicYards", decimals: 2 },
        { key: "ringArea", label: "Ring area per tree", value: ringArea, dim: "area", decimals: 1 },
        { key: "edging", label: "Edging for all rings", value: Math.PI * v.ringDiameter * v.trees, dim: "length", decimals: 1 },
      ];
    },
  },
  {
    slug: "landscape-cost-calculator",
    fields: [
      { id: "sodArea", label: "New sod area", dim: "area", default: 1000, min: 0, step: 50 },
      { id: "sodPrice", label: "Sod installed price", dim: "pricePerArea", default: 1.5, min: 0, step: 0.05, help: "Typical $1–$2.50 per sq ft with soil prep." },
      { id: "bedArea", label: "Planting bed area", dim: "area", default: 200, min: 0, step: 10 },
      { id: "bedPrice", label: "Bed prep price", dim: "pricePerArea", default: 5, min: 0, step: 0.25, help: "Soil amendment, edging and mulch, before plants. Typical $3–$10 per sq ft." },
      { id: "shrubs", label: "Shrubs", default: 10, min: 0, step: 1, suffix: "plants" },
      { id: "shrubPrice", label: "Price per shrub, installed", default: 75, min: 0, step: 5, prefix: "$", help: "Typical $30–$150 for 1–5 gallon shrubs." },
      { id: "trees", label: "Trees", default: 2, min: 0, step: 1, suffix: "trees" },
      { id: "treePrice", label: "Price per tree, installed", default: 400, min: 0, step: 25, prefix: "$", help: "Typical $150–$1,000+ depending on size." },
      { id: "patioArea", label: "Paver patio / walkway area", dim: "area", default: 0, min: 0, step: 10 },
      { id: "patioPrice", label: "Patio installed price", dim: "pricePerArea", default: 25, min: 0, step: 1, help: "Typical $15–$40 per sq ft for pavers on a compacted base." },
      { id: "zones", label: "Irrigation zones", default: 0, min: 0, step: 1, suffix: "zones" },
      { id: "zonePrice", label: "Price per irrigation zone", default: 900, min: 0, step: 50, prefix: "$", help: "Typical $600–$1,500 per zone installed." },
      { id: "design", label: "Design, permits & other", default: 0, min: 0, step: 100, prefix: "$" },
      { id: "contingency", label: "Contingency", default: 10, min: 0, max: 50, step: 1, suffix: "%" },
    ],
    compute: (v) => {
      const sod = v.sodArea * v.sodPrice;
      const beds = v.bedArea * v.bedPrice;
      const plants = v.shrubs * v.shrubPrice + v.trees * v.treePrice;
      const patio = v.patioArea * v.patioPrice;
      const irrigation = v.zones * v.zonePrice;
      const subtotal = sod + beds + plants + patio + irrigation + v.design;
      const contingency = subtotal * (v.contingency / 100);
      const total = subtotal + contingency;
      const area = v.sodArea + v.bedArea + v.patioArea;
      return [
        { key: "total", label: "Estimated project cost", value: total, format: "currency", primary: true },
        { key: "softscape", label: "Lawn, beds and plants", value: sod + beds + plants, format: "currency" },
        { key: "hardscape", label: "Patio / walkway", value: patio, format: "currency" },
        { key: "irrigation", label: "Irrigation", value: irrigation, format: "currency" },
        { key: "contingencyAmount", label: "Contingency", value: contingency, format: "currency" },
        { key: "perSqFt", label: "Cost per sq ft of project area", value: safeDiv(total, area), dim: "pricePerArea", decimals: 2 },
      ];
    },
  },
];
