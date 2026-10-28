import type { CalculatorLogic, SelectField } from "../types";
import { CU_FT_PER_CU_YD, ceil, safeDiv, wasteField, withWaste } from "../helpers";

/** Premixed concrete yields about 0.0075 cu ft per lb (Quikrete/Sakrete: 80 lb ≈ 0.60 cu ft). */
const CU_FT_PER_LB = 0.0075;
const bagYield = (lb: number) => lb * CU_FT_PER_LB;

/** Mortar: an 80 lb bag of premixed mason mix lays up to ~37 bricks or ~13 8×8×16 blocks (Quikrete). */
const BRICKS_PER_80LB = 37;
const BLOCKS_PER_80LB = 13;
/** An 80 lb bag of Type S mortar yields roughly 0.70 cu ft (≈17 sq ft of 1/2 in scratch coat). */
const MORTAR_CU_FT_PER_80LB = 0.7;

const GRAVEL_TONS_PER_CU_YD = 1.4;
const SAND_TONS_PER_CU_YD = 1.35;

const bagSelect = (defaultLb = 80, sizes = [40, 50, 60, 80]): SelectField => ({
  id: "bag",
  label: "Bag size",
  type: "select",
  default: defaultLb,
  options: sizes.map((lb) => ({ label: `${lb} lb bag (≈ ${bagYield(lb).toFixed(3).replace(/0$/, "")} cu ft)`, value: lb })),
});

const BRICK_SIZES: { l: number; h: number }[] = [
  { l: 7.625, h: 2.25 }, // modular
  { l: 8, h: 2.25 }, // standard
  { l: 7.625, h: 2.75 }, // queen
  { l: 9.625, h: 2.625 }, // king
];

const brickSelect: SelectField = {
  id: "brick",
  label: "Brick size",
  type: "select",
  default: 0,
  options: [
    { label: "Modular — 7-5/8 × 2-1/4 in face", value: 0 },
    { label: "Standard — 8 × 2-1/4 in face", value: 1 },
    { label: "Queen — 7-5/8 × 2-3/4 in face", value: 2 },
    { label: "King — 9-5/8 × 2-5/8 in face", value: 3 },
  ],
};

const unitsPerSqft = (l: number, h: number, joint: number) => safeDiv(144, (l + joint) * (h + joint));

/** Standard results for a pour: cu yd (primary), cu ft and bag counts. */
function pourResults(cuFtWithWaste: number, primaryKey: "yards" | "bags" = "yards", bagLb = 80) {
  const yards = cuFtWithWaste / CU_FT_PER_CU_YD;
  const bags = ceil(safeDiv(cuFtWithWaste, bagYield(bagLb)));
  return [
    { key: "yards", label: "Concrete needed", value: yards, dim: "cubicYards" as const, decimals: 2, primary: primaryKey === "yards" },
    { key: "cubicFeet", label: "Volume in cubic feet", value: cuFtWithWaste, dim: "volume" as const, decimals: 1 },
    { key: "bags", label: `${bagLb} lb bags (if mixing yourself)`, value: bags, unit: "bags", format: "integer" as const, primary: primaryKey === "bags" },
  ];
}

export const logic: CalculatorLogic[] = [
  {
    slug: "concrete-slab-calculator",
    fields: [
      { id: "length", label: "Slab length", dim: "length", default: 10, min: 0, step: 0.5 },
      { id: "width", label: "Slab width", dim: "length", default: 10, min: 0, step: 0.5 },
      { id: "thickness", label: "Thickness", dim: "smallLength", default: 4, min: 1, step: 0.5, help: "4 in for patios and walks, 5–6 in for driveways and garage floors." },
      wasteField(10, "Covers spillage, uneven subgrade and form bulge. Use 5% only on a perfectly level, compacted base."),
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const cuFt = withWaste(area * (v.thickness / 12), v.waste);
      const yards = cuFt / CU_FT_PER_CU_YD;
      return [
        { key: "yards", label: "Concrete needed", value: yards, dim: "cubicYards", decimals: 2, primary: true },
        { key: "cubicFeet", label: "Volume in cubic feet", value: cuFt, dim: "volume", decimals: 1 },
        { key: "bags80", label: "80 lb bags", value: ceil(cuFt / bagYield(80)), unit: "bags", format: "integer" },
        { key: "bags60", label: "60 lb bags", value: ceil(cuFt / bagYield(60)), unit: "bags", format: "integer" },
        { key: "area", label: "Slab area", value: area, dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "concrete-bags-calculator",
    fields: [
      {
        id: "shape",
        label: "Shape",
        type: "select",
        default: 0,
        options: [
          { label: "Slab, pad or rectangle", value: 0 },
          { label: "Round hole or column", value: 1 },
        ],
      },
      { id: "length", label: "Length", dim: "length", default: 8, min: 0, step: 0.5, showIf: (v) => v.shape === 0 },
      { id: "width", label: "Width", dim: "length", default: 6, min: 0, step: 0.5, showIf: (v) => v.shape === 0 },
      { id: "depth", label: "Thickness", dim: "smallLength", default: 4, min: 0, step: 0.5, showIf: (v) => v.shape === 0 },
      { id: "diameter", label: "Diameter", dim: "smallLength", default: 10, min: 0, step: 1, showIf: (v) => v.shape === 1 },
      { id: "height", label: "Depth or height", dim: "length", default: 3, min: 0, step: 0.5, showIf: (v) => v.shape === 1 },
      { id: "count", label: "How many of these?", default: 1, min: 1, step: 1 },
      bagSelect(60),
      wasteField(10),
    ],
    compute: (v) => {
      const each =
        v.shape === 1 ? Math.PI * (v.diameter / 24) ** 2 * v.height : v.length * v.width * (v.depth / 12);
      const cuFt = withWaste(each * v.count, v.waste);
      const bags = ceil(safeDiv(cuFt, bagYield(v.bag)));
      return [
        { key: "bags", label: `${v.bag} lb bags to buy`, value: bags, unit: "bags", format: "integer", primary: true },
        { key: "cubicFeet", label: "Volume incl. waste", value: cuFt, dim: "volume", decimals: 2 },
        { key: "yards", label: "Volume in cubic yards", value: cuFt / CU_FT_PER_CU_YD, dim: "cubicYards", decimals: 2 },
        { key: "weight", label: "Total weight of bags", value: bags * v.bag, dim: "weight", decimals: 0 },
      ];
    },
  },
  {
    slug: "footing-calculator",
    fields: [
      { id: "length", label: "Continuous footing length", dim: "length", default: 60, min: 0, step: 1, help: "Total run, e.g. the perimeter of the foundation. Enter 0 for pad footings only." },
      { id: "width", label: "Footing width", dim: "smallLength", default: 16, min: 0, step: 1, help: "IRC minimum is 12 in; width depends on soil and load (IRC Table R403.1)." },
      { id: "depth", label: "Footing thickness", dim: "smallLength", default: 8, min: 0, step: 1, help: "IRC minimum is 6 in; 8–12 in is common." },
      { id: "pads", label: "Pad (spread) footings", default: 4, min: 0, step: 1 },
      { id: "padSize", label: "Pad width (square)", dim: "smallLength", default: 24, min: 0, step: 1, showIf: (v) => v.pads > 0 },
      { id: "padDepth", label: "Pad thickness", dim: "smallLength", default: 12, min: 0, step: 1, showIf: (v) => v.pads > 0 },
      wasteField(10, "Trenches are rarely perfectly square — 10% is the minimum for earth-formed footings."),
    ],
    compute: (v) => {
      const continuous = v.length * (v.width / 12) * (v.depth / 12);
      const padVol = v.pads * (v.padSize / 12) ** 2 * (v.padDepth / 12);
      const cuFt = withWaste(continuous + padVol, v.waste);
      return [
        ...pourResults(cuFt),
        { key: "continuousCuFt", label: "Continuous footing (no waste)", value: continuous, dim: "volume", decimals: 1 },
        { key: "padCuFt", label: "Pad footings (no waste)", value: padVol, dim: "volume", decimals: 1 },
      ];
    },
  },
  {
    slug: "post-hole-calculator",
    fields: [
      { id: "posts", label: "Number of posts", default: 10, min: 1, step: 1 },
      { id: "diameter", label: "Hole diameter", dim: "smallLength", default: 10, min: 1, step: 1, help: "Rule of thumb: 3× the post width — 10–12 in for a 4×4." },
      { id: "depth", label: "Hole depth", dim: "length", default: 3, min: 0, step: 0.25, help: "Typically 1/3 of the post's above-ground height, and below the frost line." },
      {
        id: "post",
        label: "Post size",
        type: "select",
        default: 3.5,
        options: [
          { label: "4×4 (3-1/2 in)", value: 3.5 },
          { label: "6×6 (5-1/2 in)", value: 5.5 },
          { label: "Round 2-3/8 in steel post", value: -2.375 },
          { label: "No post (solid fill)", value: 0 },
        ],
      },
      { id: "gravel", label: "Gravel at the bottom", dim: "smallLength", default: 6, min: 0, step: 1, help: "4–6 in of gravel helps drainage; it is not filled with concrete." },
      bagSelect(50, [40, 50, 60, 80]),
      wasteField(10),
    ],
    compute: (v) => {
      const fillDepth = Math.max(0, v.depth - v.gravel / 12);
      const hole = Math.PI * (v.diameter / 24) ** 2 * fillDepth;
      const postArea = v.post < 0 ? Math.PI * (-v.post / 24) ** 2 : (v.post / 12) ** 2;
      const perHole = Math.max(0, hole - postArea * fillDepth);
      const cuFt = withWaste(perHole * v.posts, v.waste);
      const bags = ceil(safeDiv(cuFt, bagYield(v.bag)));
      return [
        { key: "bags", label: `${v.bag} lb bags to buy`, value: bags, unit: "bags", format: "integer", primary: true },
        { key: "bagsPerHole", label: "Bags per hole (approx.)", value: safeDiv(cuFt, bagYield(v.bag) * v.posts), unit: "bags", format: "number", decimals: 1 },
        { key: "perHole", label: "Concrete per hole", value: perHole, dim: "volume", decimals: 2 },
        { key: "cubicFeet", label: "Total concrete incl. waste", value: cuFt, dim: "volume", decimals: 1 },
      ];
    },
  },
  {
    slug: "concrete-column-calculator",
    fields: [
      {
        id: "shape",
        label: "Column shape",
        type: "select",
        default: 0,
        options: [
          { label: "Round (tube form)", value: 0 },
          { label: "Square or rectangular", value: 1 },
        ],
      },
      { id: "diameter", label: "Diameter", dim: "smallLength", default: 12, min: 0, step: 1, showIf: (v) => v.shape === 0 },
      { id: "sideA", label: "Width", dim: "smallLength", default: 12, min: 0, step: 1, showIf: (v) => v.shape === 1 },
      { id: "sideB", label: "Depth", dim: "smallLength", default: 12, min: 0, step: 1, showIf: (v) => v.shape === 1 },
      { id: "height", label: "Height", dim: "length", default: 4, min: 0, step: 0.5 },
      { id: "count", label: "Number of columns", default: 4, min: 1, step: 1 },
      wasteField(10),
    ],
    compute: (v) => {
      const each = v.shape === 0 ? Math.PI * (v.diameter / 24) ** 2 * v.height : (v.sideA / 12) * (v.sideB / 12) * v.height;
      const cuFt = withWaste(each * v.count, v.waste);
      return [
        ...pourResults(cuFt),
        { key: "each", label: "Volume per column (no waste)", value: each, dim: "volume", decimals: 2 },
        { key: "bags60", label: "60 lb bags", value: ceil(cuFt / bagYield(60)), unit: "bags", format: "integer" },
      ];
    },
  },
  {
    slug: "concrete-stairs-calculator",
    fields: [
      { id: "steps", label: "Number of steps (risers)", default: 3, min: 1, max: 30, step: 1 },
      { id: "rise", label: "Riser height", dim: "smallLength", default: 7, min: 1, max: 12, step: 0.25, help: "IRC maximum is 7-3/4 in." },
      { id: "run", label: "Tread depth", dim: "smallLength", default: 11, min: 1, step: 0.5, help: "IRC minimum is 10 in; 11–12 in feels better outdoors." },
      { id: "width", label: "Stair width", dim: "length", default: 4, min: 0, step: 0.5 },
      { id: "landing", label: "Top landing depth (optional)", dim: "length", default: 3, min: 0, step: 0.5, help: "Extra platform behind the top step, at full height. Enter 0 if none." },
      wasteField(10),
    ],
    compute: (v) => {
      const n = Math.max(0, Math.round(v.steps));
      const profileSqIn = v.rise * v.run * ((n * (n + 1)) / 2) + n * v.rise * v.landing * 12;
      const solid = (profileSqIn / 144) * v.width;
      const cuFt = withWaste(solid, v.waste);
      return [
        ...pourResults(cuFt),
        { key: "totalRise", label: "Total rise", value: n * v.rise, dim: "smallLength", decimals: 1 },
        { key: "totalRun", label: "Total run incl. landing", value: (n * v.run) / 12 + v.landing, dim: "length", decimals: 2 },
      ];
    },
  },
  {
    slug: "cinder-block-calculator",
    fields: [
      { id: "length", label: "Wall length", dim: "length", default: 20, min: 0, step: 0.5 },
      { id: "height", label: "Wall height", dim: "length", default: 4, min: 0, step: 0.5 },
      { id: "openings", label: "Openings to subtract", dim: "area", default: 0, min: 0, step: 1 },
      {
        id: "face",
        label: "Block face size",
        type: "select",
        default: 8,
        options: [
          { label: "16 × 8 in face (standard 8×8×16, 6×8×16, 12×8×16)", value: 8 },
          { label: "16 × 4 in face (half-high block)", value: 4 },
        ],
      },
      wasteField(5, "Extra for broken blocks and cuts. Bond-beam and corner units are counted as regular blocks."),
    ],
    compute: (v) => {
      const area = Math.max(0, v.length * v.height - v.openings);
      const perSqft = safeDiv(144, 16 * v.face); // nominal size includes the 3/8 in mortar joint
      const blocks = ceil(withWaste(area * perSqft, v.waste));
      const mortarBags = ceil(safeDiv(blocks, BLOCKS_PER_80LB * (v.face === 4 ? 2 : 1)));
      return [
        { key: "blocks", label: "Blocks to buy", value: blocks, unit: "blocks", format: "integer", primary: true },
        { key: "mortarBags", label: "80 lb bags of mortar mix", value: mortarBags, unit: "bags", format: "integer" },
        { key: "courses", label: "Courses (rows)", value: ceil(safeDiv(v.height * 12, v.face)), unit: "courses", format: "integer" },
        { key: "area", label: "Net wall area", value: area, dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "brick-calculator",
    fields: [
      { id: "length", label: "Wall length", dim: "length", default: 20, min: 0, step: 0.5 },
      { id: "height", label: "Wall height", dim: "length", default: 8, min: 0, step: 0.5 },
      { id: "openings", label: "Openings to subtract", dim: "area", default: 12, min: 0, step: 1, help: "Total area of windows and doors in the wall." },
      brickSelect,
      { id: "joint", label: "Mortar joint", dim: "smallLength", default: 0.375, min: 0, max: 1, step: 0.125, help: "3/8 in is standard." },
      wasteField(5, "BIA suggests 5% for breakage and cutting."),
    ],
    compute: (v) => {
      const area = Math.max(0, v.length * v.height - v.openings);
      const b = BRICK_SIZES[v.brick] ?? BRICK_SIZES[0];
      const perSqft = unitsPerSqft(b.l, b.h, v.joint);
      const bricks = ceil(withWaste(area * perSqft, v.waste));
      return [
        { key: "bricks", label: "Bricks to buy", value: bricks, unit: "bricks", format: "integer", primary: true },
        { key: "perSqft", label: "Bricks per sq ft", value: perSqft, unit: "per sq ft", format: "number", decimals: 2 },
        { key: "mortarBags", label: "80 lb bags of mortar mix", value: ceil(bricks / BRICKS_PER_80LB), unit: "bags", format: "integer" },
        { key: "area", label: "Net wall area", value: area, dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "mortar-calculator",
    fields: [
      {
        id: "unit",
        label: "What are you laying?",
        type: "select",
        default: 0,
        options: [
          { label: "Modular brick", value: 0 },
          { label: "Standard brick", value: 1 },
          { label: "8×8×16 concrete block", value: 2 },
        ],
      },
      { id: "area", label: "Wall area", dim: "area", default: 100, min: 0, step: 1 },
      { id: "units", label: "Or number of bricks/blocks", default: 0, min: 0, step: 1, help: "Leave 0 to work it out from the wall area." },
      { id: "bricksPerBag", label: "Bricks per 80 lb bag", default: BRICKS_PER_80LB, min: 1, step: 1, help: "Quikrete Mason Mix: up to 37 bricks per 80 lb bag.", showIf: (v) => v.unit !== 2 },
      { id: "blocksPerBag", label: "Blocks per 80 lb bag", default: BLOCKS_PER_80LB, min: 1, step: 1, help: "Quikrete Mason Mix: up to 13 blocks per 80 lb bag.", showIf: (v) => v.unit === 2 },
      wasteField(10, "Mortar dropped, stiffened in the tub or scraped off joints."),
    ],
    compute: (v) => {
      const perSqft = v.unit === 2 ? 1.125 : unitsPerSqft(BRICK_SIZES[v.unit]?.l ?? 7.625, 2.25, 0.375);
      const units = v.units > 0 ? v.units : v.area * perSqft;
      const perBag = v.unit === 2 ? v.blocksPerBag : v.bricksPerBag;
      const bags = withWaste(safeDiv(units, perBag), v.waste);
      return [
        { key: "bags", label: "80 lb bags of mortar mix", value: ceil(bags), unit: "bags", format: "integer", primary: true },
        { key: "exactBags", label: "Bags (unrounded)", value: bags, unit: "bags", format: "number", decimals: 1 },
        { key: "units", label: v.unit === 2 ? "Blocks" : "Bricks", value: units, unit: "units", format: "integer" },
        { key: "mortarCuFt", label: "Mixed mortar (approx.)", value: bags * MORTAR_CU_FT_PER_80LB, dim: "volume", decimals: 1 },
      ];
    },
  },
  {
    slug: "paver-calculator",
    fields: [
      { id: "length", label: "Area length", dim: "length", default: 16, min: 0, step: 0.5 },
      { id: "width", label: "Area width", dim: "length", default: 12, min: 0, step: 0.5 },
      { id: "paverL", label: "Paver length", dim: "smallLength", default: 8, min: 1, step: 0.25 },
      { id: "paverW", label: "Paver width", dim: "smallLength", default: 4, min: 1, step: 0.25 },
      { id: "joint", label: "Joint width", dim: "smallLength", default: 0, min: 0, max: 1, step: 0.0625, help: "Most concrete pavers have built-in spacer nibs, so their nominal size already includes the joint — leave 0. Add 1/8–3/8 in for clay pavers or mortared joints." },
      wasteField(10, "5% for straight running bond, 10% for basketweave, 15% for herringbone or curved edges."),
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const perSqft = unitsPerSqft(v.paverL, v.paverW, v.joint);
      return [
        { key: "pavers", label: "Pavers to buy", value: ceil(withWaste(area * perSqft, v.waste)), unit: "pavers", format: "integer", primary: true },
        { key: "perSqft", label: "Pavers per sq ft", value: perSqft, unit: "per sq ft", format: "number", decimals: 2 },
        { key: "area", label: "Area", value: area, dim: "area", decimals: 0 },
        { key: "edging", label: "Edge restraint (perimeter)", value: 2 * (v.length + v.width), dim: "length", decimals: 0 },
      ];
    },
  },
  {
    slug: "paver-base-calculator",
    fields: [
      { id: "length", label: "Area length", dim: "length", default: 16, min: 0, step: 0.5 },
      { id: "width", label: "Area width", dim: "length", default: 12, min: 0, step: 0.5 },
      { id: "baseDepth", label: "Gravel base depth (compacted)", dim: "smallLength", default: 4, min: 0, step: 1, help: "4–6 in for patios and walks, 8–12 in for driveways." },
      { id: "sandDepth", label: "Bedding sand depth", dim: "smallLength", default: 1, min: 0, step: 0.25, help: "1 in of coarse concrete sand, screeded flat." },
      wasteField(20, "Loose gravel compacts by roughly 15–25%; this allowance also covers an uneven subgrade."),
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const baseYd = withWaste((area * v.baseDepth) / 12, v.waste) / CU_FT_PER_CU_YD;
      const sandYd = withWaste((area * v.sandDepth) / 12, v.waste) / CU_FT_PER_CU_YD;
      return [
        { key: "baseYards", label: "Gravel base", value: baseYd, dim: "cubicYards", decimals: 2, primary: true },
        { key: "baseTons", label: "Gravel base by weight", value: baseYd * GRAVEL_TONS_PER_CU_YD, unit: "tons", format: "number", decimals: 2 },
        { key: "sandYards", label: "Bedding sand", value: sandYd, dim: "cubicYards", decimals: 2 },
        { key: "sandTons", label: "Bedding sand by weight", value: sandYd * SAND_TONS_PER_CU_YD, unit: "tons", format: "number", decimals: 2 },
        { key: "excavation", label: "Excavation depth (incl. 2-3/8 in paver)", value: v.baseDepth + v.sandDepth + 2.375, dim: "smallLength", decimals: 1 },
      ];
    },
  },
  {
    slug: "retaining-wall-calculator",
    fields: [
      { id: "length", label: "Wall length", dim: "length", default: 20, min: 0, step: 0.5 },
      { id: "height", label: "Exposed wall height", dim: "length", default: 3, min: 0, step: 0.25, help: "Walls over 4 ft (or with a slope or load above) usually need an engineered design and permit." },
      { id: "blockL", label: "Block face length", dim: "smallLength", default: 12, min: 1, step: 0.25 },
      { id: "blockH", label: "Block height", dim: "smallLength", default: 4, min: 1, step: 0.25 },
      { id: "bury", label: "Buried depth of first course", dim: "smallLength", default: 6, min: 0, step: 1, help: "Most manufacturers: 1 in per 8 in of wall height, at least 6 in." },
      { id: "capL", label: "Cap length", dim: "smallLength", default: 12, min: 1, step: 0.5 },
      wasteField(5),
    ],
    compute: (v) => {
      const courses = ceil(safeDiv(v.height * 12 + v.bury, v.blockH));
      const perCourse = ceil(safeDiv(v.length * 12, v.blockL));
      const totalHeightFt = (v.height * 12 + v.bury) / 12;
      return [
        { key: "blocks", label: "Wall blocks to buy", value: ceil(withWaste(courses * perCourse, v.waste)), unit: "blocks", format: "integer", primary: true },
        { key: "courses", label: "Courses (incl. buried course)", value: courses, unit: "courses", format: "integer" },
        { key: "caps", label: "Cap units", value: ceil(withWaste(safeDiv(v.length * 12, v.capL), v.waste)), unit: "caps", format: "integer" },
        { key: "baseYards", label: "Leveling pad gravel (24 in wide × 6 in deep)", value: (v.length * 2 * 0.5) / CU_FT_PER_CU_YD, dim: "cubicYards", decimals: 2 },
        { key: "drainYards", label: "Drainage stone (12 in behind wall)", value: (v.length * 1 * totalHeightFt) / CU_FT_PER_CU_YD, dim: "cubicYards", decimals: 2 },
      ];
    },
  },
  {
    slug: "stone-veneer-calculator",
    fields: [
      { id: "length", label: "Wall length", dim: "length", default: 20, min: 0, step: 0.5 },
      { id: "height", label: "Wall height", dim: "length", default: 4, min: 0, step: 0.5 },
      { id: "openings", label: "Openings to subtract", dim: "area", default: 0, min: 0, step: 1 },
      { id: "corners", label: "Outside corners (linear ft)", dim: "length", default: 8, min: 0, step: 1, help: "Total height of every outside corner. Corner pieces are sold by the linear foot." },
      { id: "cornerCoverage", label: "Flat area covered per ft of corner", dim: "area", default: 0.75, min: 0, max: 2, step: 0.05, help: "Many manufacturers use about 0.75 sq ft; check your product's spec sheet." },
      {
        id: "scratch",
        label: "Scratch coat needed?",
        type: "select",
        default: 1,
        options: [
          { label: "Yes — sheathed wall with lath", value: 1 },
          { label: "No — clean concrete or block", value: 0 },
        ],
      },
      { id: "bed", label: "Setting bed thickness", dim: "smallLength", default: 0.5, min: 0, max: 1.5, step: 0.125 },
      wasteField(10, "10–15% for cutting and fitting natural shapes."),
    ],
    compute: (v) => {
      const area = Math.max(0, v.length * v.height - v.openings);
      const flats = withWaste(Math.max(0, area - v.corners * v.cornerCoverage), v.waste);
      const mortarIn = v.bed + (v.scratch ? 0.5 : 0);
      const mortarCuFt = withWaste((area * mortarIn) / 12, v.waste);
      return [
        { key: "flats", label: "Flat stone to order", value: flats, dim: "area", decimals: 1, primary: true },
        { key: "cornerFeet", label: "Corner pieces to order", value: withWaste(v.corners, v.waste), dim: "length", decimals: 1 },
        { key: "mortarBags", label: "80 lb bags of Type S mortar", value: ceil(mortarCuFt / MORTAR_CU_FT_PER_80LB), unit: "bags", format: "integer" },
        { key: "lath", label: "Metal lath sheets (27 in × 8 ft)", value: v.scratch ? ceil(withWaste(area / 16, v.waste)) : 0, unit: "sheets", format: "integer" },
        { key: "area", label: "Net wall area", value: area, dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "concrete-cost-calculator",
    fields: [
      { id: "length", label: "Slab length", dim: "length", default: 20, min: 0, step: 0.5 },
      { id: "width", label: "Slab width", dim: "length", default: 12, min: 0, step: 0.5 },
      { id: "thickness", label: "Thickness", dim: "smallLength", default: 4, min: 1, step: 0.5 },
      wasteField(10),
      { id: "yardPrice", label: "Ready-mix price", dim: "pricePerVolume", default: 175, min: 0, step: 5, help: "Typically $150–$220 per cu yd delivered, depending on region and strength." },
      { id: "delivery", label: "Delivery / short-load fees", default: 100, min: 0, step: 10, prefix: "$", help: "Many plants charge a short-load fee on orders under 4–6 cu yd." },
      { id: "rebar", label: "Reinforcement (mesh or rebar)", dim: "pricePerArea", default: 0.5, min: 0, step: 0.05 },
      { id: "labor", label: "Labor, forms and finishing", dim: "pricePerArea", default: 4, min: 0, step: 0.25, help: "Typically $3–$6 per sq ft; set 0 for DIY." },
      { id: "bagPrice", label: "80 lb bag price (for comparison)", default: 6.5, min: 0, step: 0.25, prefix: "$" },
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const cuFt = withWaste(area * (v.thickness / 12), v.waste);
      const ordered = Math.ceil((cuFt / CU_FT_PER_CU_YD) * 4 - 1e-9) / 4; // ready-mix is ordered in 1/4 yd steps
      const concrete = ordered * v.yardPrice;
      const total = concrete + v.delivery + area * v.rebar + area * v.labor;
      const bags = ceil(cuFt / bagYield(80));
      return [
        { key: "total", label: "Estimated total cost", value: total, format: "currency", primary: true },
        { key: "perSqft", label: "Cost per sq ft", value: safeDiv(total, area), dim: "pricePerArea", decimals: 2 },
        { key: "orderedYards", label: "Ready-mix to order", value: ordered, dim: "cubicYards", decimals: 2 },
        { key: "concreteCost", label: "Concrete (ready-mix)", value: concrete, format: "currency" },
        { key: "bagCost", label: `Bagged alternative: ${bags} × 80 lb bags`, value: bags * v.bagPrice, format: "currency" },
      ];
    },
  },
];
