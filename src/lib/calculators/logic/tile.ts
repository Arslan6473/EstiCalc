import type { CalculatorLogic, Field, NumberField, ResultItem, Values } from "../types";
import { ceil, safeDiv, wasteField, withWaste } from "../helpers";

/**
 * Pounds of cement grout powder per cubic inch of filled joint. Back-calculated
 * from Custom Building Products' published Polyblend Plus coverage chart, which
 * it reproduces to within 1% for every tile size and joint width listed.
 */
const GROUT_LB_PER_CU_IN = 0.0653;
/** Extra wall area added by the inside sides of one 12 × 24 in niche, 3.5 in deep. */
const NICHE_EXTRA_SQFT = (2 * (12 + 24) * 3.5) / 144;

const jointField = (def: number): NumberField => ({
  id: "joint",
  label: "Grout joint width",
  dim: "smallLength",
  default: def,
  min: 0,
  max: 1,
  step: 0.0625,
  help: "1/16 in = 0.0625, 1/8 in = 0.125, 3/16 in = 0.1875, 1/4 in = 0.25.",
});

const tileSizeFields = (length: number, width: number, joint: number): NumberField[] => [
  { id: "tileLength", label: "Tile length", dim: "smallLength", default: length, min: 0.25, step: 0.25 },
  { id: "tileWidth", label: "Tile width", dim: "smallLength", default: width, min: 0.25, step: 0.25 },
  jointField(joint),
];

const boxField = (id = "boxCoverage", label = "Coverage per box", def = 10): Field => ({
  id,
  label,
  dim: "area",
  default: def,
  min: 0.5,
  step: 0.1,
  help: "Printed on the box (sq ft or m² per box).",
});

/** Tiles to cover an area, counting each tile plus one grout joint on two sides. */
const tilesFor = (areaSqFt: number, length: number, width: number, joint: number) =>
  safeDiv(areaSqFt * 144, (length + joint) * (width + joint));

/** Cubic inches of grout joint per sq ft of tiled surface. */
const groutVolumePerSqFt = (length: number, width: number, joint: number, depth: number) =>
  safeDiv(144 * (length + width) * joint * depth, (length + joint) * (width + joint));

/** Size of the edge cut piece when the remaining distance x is filled with (tile + joint) modules. */
function edgePiece(x: number, module: number, tile: number) {
  if (x < 0 || module <= 0) return { full: 0, piece: Math.max(0, x) };
  const full = Math.floor(x / module + 1e-9);
  const rest = x - full * module;
  return rest < 0.01 || rest > tile - 0.01 ? { full: full + (rest > tile - 0.01 ? 1 : 0), piece: 0 } : { full, piece: rest };
}

/** Best centred layout along one dimension: a tile on the centre line or a grout line on it. */
function centredLayout(dimIn: number, tile: number, joint: number) {
  const half = dimIn / 2;
  const m = tile + joint;
  const options = [
    { centre: 1, ...edgePiece(half - tile / 2 - joint, m, tile) }, // tile centred
    { centre: 0, ...edgePiece(half - joint / 2, m, tile) }, // grout line centred
  ].map((o) => ({
    ...o,
    count: (o.centre ? 1 : 0) + 2 * o.full + (o.piece > 0 ? 2 : 0),
    score: o.piece > 0 ? o.piece : tile,
  }));
  const best = options[0].score >= options[1].score ? options[0] : options[1];
  return { ...best, tileCentred: options[0].score, groutCentred: options[1].score };
}

function wallStartLayout(dimIn: number, tile: number, joint: number) {
  const r = edgePiece(dimIn, tile + joint, tile);
  return { ...r, count: r.full + (r.piece > 0 ? 1 : 0), score: r.piece > 0 ? r.piece : tile };
}

const showerWallArea = (v: Values) => {
  const sides = v.type === 1 ? 1 : 2; // corner shower: back + one side
  return v.width * v.height + sides * v.depth * v.height + v.niches * NICHE_EXTRA_SQFT;
};

export const logic: CalculatorLogic[] = [
  {
    slug: "tile-calculator",
    fields: [
      { id: "length", label: "Area length", dim: "length", default: 12, min: 0, step: 0.5 },
      { id: "width", label: "Area width", dim: "length", default: 10, min: 0, step: 0.5 },
      ...tileSizeFields(12, 12, 0.125),
      boxField(),
      wasteField(10, "10% for a straight layout; 15% for diagonal, herringbone or lots of cuts."),
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const exact = tilesFor(area, v.tileLength, v.tileWidth, v.joint);
      const tiles = ceil(withWaste(exact, v.waste));
      const buyArea = withWaste(area, v.waste);
      return [
        { key: "tiles", label: "Tiles to buy", value: tiles, unit: "tiles", format: "integer", primary: true },
        { key: "boxes", label: "Boxes", value: ceil(safeDiv(buyArea, v.boxCoverage)), unit: "boxes", format: "integer" },
        { key: "area", label: "Area to tile", value: area, dim: "area", decimals: 1 },
        { key: "buyArea", label: "Area including waste", value: buyArea, dim: "area", decimals: 1 },
        { key: "tilesExact", label: "Tiles before waste", value: exact, unit: "tiles", decimals: 1 },
      ];
    },
  },
  {
    slug: "grout-calculator",
    fields: [
      { id: "area", label: "Tiled area", dim: "area", default: 120, min: 0, step: 1 },
      ...tileSizeFields(12, 12, 0.125),
      { id: "depth", label: "Joint depth (tile thickness)", dim: "smallLength", default: 0.375, min: 0.0625, step: 0.0625, help: "Usually the tile thickness: 1/4 in (0.25) for wall tile and mosaics, 3/8 in (0.375) for most floor tile." },
      { id: "bagSize", label: "Bag size", dim: "weight", default: 25, min: 1, step: 1, help: "Sanded grout usually comes in 25 lb bags; unsanded in 10 lb." },
      wasteField(10, "Extra for mixing losses and grout left on the float and sponge."),
    ],
    compute: (v) => {
      const lbPerSqFt = groutVolumePerSqFt(v.tileLength, v.tileWidth, v.joint, v.depth) * GROUT_LB_PER_CU_IN;
      const pounds = withWaste(v.area * lbPerSqFt, v.waste);
      return [
        { key: "pounds", label: "Grout needed", value: pounds, dim: "weight", decimals: 1, primary: true },
        { key: "bags", label: "Bags to buy", value: ceil(safeDiv(pounds, v.bagSize)), unit: "bags", format: "integer" },
        { key: "bagCoverage", label: "Coverage per bag (before waste)", value: safeDiv(v.bagSize, lbPerSqFt), dim: "area", decimals: 0 },
        { key: "lbPer100", label: "Grout per 100 sq ft (before waste)", value: lbPerSqFt * 100, dim: "weight", decimals: 1 },
      ];
    },
  },
  {
    slug: "wall-tile-calculator",
    fields: [
      { id: "wall1", label: "Wall 1 width", dim: "length", default: 8, min: 0, step: 0.25 },
      { id: "wall2", label: "Wall 2 width", dim: "length", default: 5, min: 0, step: 0.25, help: "Use 0 for walls you are not tiling." },
      { id: "wall3", label: "Wall 3 width", dim: "length", default: 0, min: 0, step: 0.25 },
      { id: "wall4", label: "Wall 4 width", dim: "length", default: 0, min: 0, step: 0.25 },
      { id: "height", label: "Tile height on the wall", dim: "length", default: 4, min: 0, step: 0.25, help: "Wainscot is often 3–4 ft; full height to the ceiling about 8 ft." },
      { id: "openings", label: "Openings to subtract", dim: "area", default: 0, min: 0, step: 1, help: "Windows, doors or a vanity mirror area that will not be tiled." },
      ...tileSizeFields(6, 3, 0.0625),
      boxField(),
      {
        id: "trimTop",
        label: "Bullnose or trim along the top edge?",
        type: "select",
        default: 1,
        options: [
          { label: "No", value: 0 },
          { label: "Yes", value: 1 },
        ],
      },
      { id: "trimEnds", label: "Exposed vertical edges needing trim", default: 0, min: 0, max: 8, step: 1 },
      { id: "trimPiece", label: "Trim piece length", dim: "smallLength", default: 12, min: 1, step: 0.5, showIf: (v) => v.trimTop > 0 || v.trimEnds > 0 },
      wasteField(10, "10% for straight wall layouts; 15% for patterns or many cuts around fixtures."),
    ],
    compute: (v) => {
      const run = v.wall1 + v.wall2 + v.wall3 + v.wall4;
      const area = Math.max(0, run * v.height - v.openings);
      const exact = tilesFor(area, v.tileLength, v.tileWidth, v.joint);
      const trimFt = (v.trimTop ? run : 0) + v.trimEnds * v.height;
      return [
        { key: "tiles", label: "Wall tiles to buy", value: ceil(withWaste(exact, v.waste)), unit: "tiles", format: "integer", primary: true },
        { key: "boxes", label: "Boxes", value: ceil(safeDiv(withWaste(area, v.waste), v.boxCoverage)), unit: "boxes", format: "integer" },
        { key: "area", label: "Wall area to tile", value: area, dim: "area", decimals: 1 },
        { key: "trimPieces", label: "Trim pieces", value: ceil(withWaste(safeDiv(trimFt * 12, v.trimPiece), v.waste)), unit: "pieces", format: "integer" },
        { key: "trimLength", label: "Trim run", value: trimFt, dim: "length", decimals: 1 },
      ];
    },
  },
  {
    slug: "backsplash-tile-calculator",
    fields: [
      { id: "run1", label: "Counter run 1 length", dim: "length", default: 10, min: 0, step: 0.25 },
      { id: "run2", label: "Counter run 2 length", dim: "length", default: 6, min: 0, step: 0.25, help: "Use 0 for runs you don't have (e.g. no L or U shape)." },
      { id: "run3", label: "Counter run 3 length", dim: "length", default: 0, min: 0, step: 0.25 },
      { id: "height", label: "Backsplash height", dim: "smallLength", default: 18, min: 0, step: 0.5, help: "Standard counter-to-cabinet gap is 18 in (46 cm)." },
      { id: "extra", label: "Extra area (e.g. full height behind the range)", dim: "area", default: 0, min: 0, step: 0.5 },
      { id: "subtract", label: "Area to subtract (window, etc.)", dim: "area", default: 0, min: 0, step: 0.5 },
      ...tileSizeFields(6, 3, 0.0625),
      boxField(),
      wasteField(10, "10% for straight subway layouts; 15–20% for herringbone or chevron."),
    ],
    compute: (v) => {
      const area = Math.max(0, (v.run1 + v.run2 + v.run3) * (v.height / 12) + v.extra - v.subtract);
      const exact = tilesFor(area, v.tileLength, v.tileWidth, v.joint);
      return [
        { key: "tiles", label: "Tiles to buy", value: ceil(withWaste(exact, v.waste)), unit: "tiles", format: "integer", primary: true },
        { key: "boxes", label: "Boxes", value: ceil(safeDiv(withWaste(area, v.waste), v.boxCoverage)), unit: "boxes", format: "integer" },
        { key: "area", label: "Backsplash area", value: area, dim: "area", decimals: 1 },
        { key: "buyArea", label: "Area including waste", value: withWaste(area, v.waste), dim: "area", decimals: 1 },
      ];
    },
  },
  {
    slug: "thinset-calculator",
    fields: [
      { id: "area", label: "Area to tile", dim: "area", default: 120, min: 0, step: 1 },
      {
        id: "trowel",
        label: "Trowel notch",
        type: "select",
        default: 60,
        options: [
          { label: '1/4 × 1/4 in square — tiles up to about 8 in (~85 sq ft per 50 lb)', value: 85 },
          { label: '1/4 × 3/8 in square — 12 in tiles (~60 sq ft per 50 lb)', value: 60 },
          { label: '1/2 × 1/2 in square — large-format tiles (~42 sq ft per 50 lb)', value: 42.5 },
          { label: "Enter coverage from the bag", value: 0 },
        ],
      },
      { id: "customCoverage", label: "Coverage per 50 lb bag", default: 60, min: 1, step: 1, suffix: "sq ft", help: "From the bag's coverage chart for your trowel size.", showIf: (v) => v.trowel === 0 },
      { id: "backButter", label: "Extra for back-buttering", default: 0, min: 0, max: 100, step: 5, suffix: "%", help: "Add mortar if you skim-coat the back of every tile (common for large-format tile); 25% is a reasonable allowance." },
      { id: "bagSize", label: "Bag size", dim: "weight", default: 50, min: 1, step: 1 },
      wasteField(10, "Extra for mortar that skins over and is scraped off, and uneven floors."),
    ],
    compute: (v) => {
      const per50 = v.trowel || v.customCoverage;
      const lbPerSqFt = safeDiv(50, per50);
      const pounds = withWaste(v.area * lbPerSqFt * (1 + (v.backButter || 0) / 100), v.waste);
      return [
        { key: "pounds", label: "Thinset needed", value: pounds, dim: "weight", decimals: 0, primary: true },
        { key: "bags", label: "Bags to buy", value: ceil(safeDiv(pounds, v.bagSize)), unit: "bags", format: "integer" },
        { key: "lbPerSqFt", label: "Thinset per sq ft", value: lbPerSqFt, unit: "lb/sq ft", decimals: 2 },
      ];
    },
  },
  {
    slug: "mosaic-tile-calculator",
    fields: [
      { id: "length", label: "Area length", dim: "length", default: 6, min: 0, step: 0.25 },
      { id: "width", label: "Area width", dim: "length", default: 5, min: 0, step: 0.25 },
      { id: "sheetLength", label: "Sheet length", dim: "smallLength", default: 12, min: 1, step: 0.125, help: "Measure across the sheet including the joint on one edge; most sheets are about 12 × 12 in." },
      { id: "sheetWidth", label: "Sheet width", dim: "smallLength", default: 12, min: 1, step: 0.125 },
      { id: "sheetsPerBox", label: "Sheets per box", default: 10, min: 1, step: 1 },
      { id: "chipSize", label: "Individual tile (chip) size", dim: "smallLength", default: 1, min: 0.25, step: 0.125, help: "Used for the grout estimate. Use the side length for square or hex chips." },
      { id: "joint", label: "Grout joint width", dim: "smallLength", default: 0.0625, min: 0, max: 0.5, step: 0.0625 },
      { id: "depth", label: "Tile thickness", dim: "smallLength", default: 0.25, min: 0.0625, step: 0.0625 },
      wasteField(10, "10% for straight runs; 15% for showers with drains, niches and curbs."),
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const sheets = ceil(withWaste(safeDiv(area * 144, v.sheetLength * v.sheetWidth), v.waste));
      const groutLb = withWaste(area * groutVolumePerSqFt(v.chipSize, v.chipSize, v.joint, v.depth) * GROUT_LB_PER_CU_IN, v.waste);
      return [
        { key: "sheets", label: "Mosaic sheets to buy", value: sheets, unit: "sheets", format: "integer", primary: true },
        { key: "boxes", label: "Boxes", value: ceil(safeDiv(sheets, v.sheetsPerBox)), unit: "boxes", format: "integer" },
        { key: "area", label: "Area to tile", value: area, dim: "area", decimals: 1 },
        { key: "groutLb", label: "Grout needed (cement)", value: groutLb, dim: "weight", decimals: 1 },
      ];
    },
  },
  {
    slug: "shower-tile-calculator",
    fields: [
      {
        id: "type",
        label: "Shower type",
        type: "select",
        default: 0,
        options: [
          { label: "Alcove shower (3 walls + floor)", value: 0 },
          { label: "Corner shower (2 walls + floor)", value: 1 },
          { label: "Tub surround (3 walls, no floor)", value: 2 },
        ],
      },
      { id: "width", label: "Back wall width", dim: "length", default: 5, min: 0, step: 0.25 },
      { id: "depth", label: "Side wall depth", dim: "length", default: 3, min: 0, step: 0.25, help: "A standard tub is about 2.5 ft (30 in) deep." },
      { id: "height", label: "Tile height", dim: "length", default: 8, min: 0, step: 0.25, help: "Measured from the shower floor, or from the tub rim for a tub surround." },
      { id: "niches", label: "Recessed niches", default: 0, min: 0, max: 4, step: 1, help: "Each 12 × 24 in niche, 3.5 in deep, adds its inside sides." },
      ...tileSizeFields(24, 12, 0.125),
      boxField("boxCoverage", "Wall tile coverage per box", 16),
      wasteField(15, "Showers have many cuts around valves, niches and the floor slope: 15% is typical."),
    ],
    compute: (v) => {
      const wallArea = showerWallArea(v);
      const floorArea = v.type === 2 ? 0 : v.width * v.depth;
      const exact = tilesFor(wallArea, v.tileLength, v.tileWidth, v.joint);
      return [
        { key: "tiles", label: "Wall tiles to buy", value: ceil(withWaste(exact, v.waste)), unit: "tiles", format: "integer", primary: true },
        { key: "boxes", label: "Wall tile boxes", value: ceil(safeDiv(withWaste(wallArea, v.waste), v.boxCoverage)), unit: "boxes", format: "integer" },
        { key: "wallArea", label: "Wall area to tile", value: wallArea, dim: "area", decimals: 1 },
        { key: "floorArea", label: "Shower floor area", value: floorArea, dim: "area", decimals: 1 },
        { key: "floorBuy", label: "Floor tile to buy (incl. waste)", value: withWaste(floorArea, v.waste), dim: "area", decimals: 1 },
      ];
    },
  },
  {
    slug: "tile-layout-calculator",
    fields: [
      { id: "length", label: "Room length", dim: "length", default: 13, min: 0, step: 0.25 },
      { id: "width", label: "Room width", dim: "length", default: 10.5, min: 0, step: 0.25 },
      ...tileSizeFields(12, 12, 0.125),
      {
        id: "start",
        label: "Layout",
        type: "select",
        default: 0,
        options: [
          { label: "Centered (best of tile-on-center or grout-line-on-center)", value: 0 },
          { label: "Start with a full tile at one wall", value: 1 },
        ],
      },
    ],
    compute: (v) => {
      // Tile length runs along the room length; tile width along the room width.
      const L = v.length * 12;
      const W = v.width * 12;
      const along = v.start ? wallStartLayout(L, v.tileLength, v.joint) : centredLayout(L, v.tileLength, v.joint);
      const across = v.start ? wallStartLayout(W, v.tileWidth, v.joint) : centredLayout(W, v.tileWidth, v.joint);
      const results: ResultItem[] = [
        { key: "smallestCut", label: "Smallest edge cut", value: Math.min(along.score, across.score), dim: "smallLength", decimals: 2, primary: true },
        { key: "lengthCut", label: "Edge cut at the ends of the length", value: along.score, dim: "smallLength", decimals: 2, help: "Shows a full tile when no cut is needed." },
        { key: "widthCut", label: "Edge cut at the ends of the width", value: across.score, dim: "smallLength", decimals: 2 },
        { key: "tilesAlongLength", label: "Tiles along the length (full + cut)", value: along.count, unit: "tiles", format: "integer" },
        { key: "tilesAlongWidth", label: "Tiles along the width (full + cut)", value: across.count, unit: "tiles", format: "integer" },
        { key: "totalTiles", label: "Tile positions in the grid", value: along.count * across.count, unit: "tiles", format: "integer" },
      ];
      if (!v.start) {
        const a = centredLayout(L, v.tileLength, v.joint);
        const b = centredLayout(W, v.tileWidth, v.joint);
        results.push(
          { key: "lengthTileCentred", label: "Length cut with a tile on the center line", value: a.tileCentred, dim: "smallLength", decimals: 2 },
          { key: "lengthGroutCentred", label: "Length cut with a grout line on the center line", value: a.groutCentred, dim: "smallLength", decimals: 2 },
          { key: "widthTileCentred", label: "Width cut with a tile on the center line", value: b.tileCentred, dim: "smallLength", decimals: 2 },
          { key: "widthGroutCentred", label: "Width cut with a grout line on the center line", value: b.groutCentred, dim: "smallLength", decimals: 2 },
        );
      }
      return results;
    },
  },
  {
    slug: "tile-installation-cost-calculator",
    fields: [
      { id: "area", label: "Area to tile", dim: "area", default: 100, min: 0, step: 1 },
      { id: "tilePrice", label: "Tile price", dim: "pricePerArea", default: 4, min: 0, step: 0.25, help: "Ceramic and porcelain often run $1–$10 per sq ft; natural stone and designer tile more." },
      { id: "laborPrice", label: "Installation labor", dim: "pricePerArea", default: 10, min: 0, step: 0.5, help: "Typical US range about $5–$15 per sq ft for floors; more for walls, showers, mosaics and patterns." },
      { id: "settingPrice", label: "Setting materials (thinset, grout, sealer)", dim: "pricePerArea", default: 1.5, min: 0, step: 0.25 },
      { id: "backerPrice", label: "Backer board or membrane", dim: "pricePerArea", default: 0, min: 0, step: 0.25, help: "Often $1–$3 per sq ft installed where needed." },
      { id: "demoPrice", label: "Removal of old flooring", dim: "pricePerArea", default: 2, min: 0, step: 0.25, help: "Use 0 if the floor is already bare." },
      wasteField(10, "Tile overage for cuts and breakage: 10% straight, 15% diagonal or herringbone."),
    ],
    compute: (v) => {
      const tileCost = withWaste(v.area, v.waste) * v.tilePrice;
      const labor = v.area * v.laborPrice;
      const other = v.area * (v.settingPrice + v.backerPrice + v.demoPrice);
      const total = tileCost + labor + other;
      return [
        { key: "total", label: "Estimated installed cost", value: total, format: "currency", primary: true },
        { key: "perSqFt", label: "Installed cost per sq ft", value: safeDiv(total, v.area), format: "currency", decimals: 2 },
        { key: "tileCost", label: "Tile (incl. waste)", value: tileCost, format: "currency" },
        { key: "laborCost", label: "Labor", value: labor, format: "currency" },
        { key: "otherCost", label: "Setting materials, backer and removal", value: other, format: "currency" },
      ];
    },
  },
  {
    slug: "bathroom-tile-estimator",
    fields: [
      { id: "length", label: "Bathroom length", dim: "length", default: 8, min: 0, step: 0.25 },
      { id: "width", label: "Bathroom width", dim: "length", default: 5, min: 0, step: 0.25 },
      {
        id: "showerType",
        label: "Tub or shower",
        type: "select",
        default: 1,
        options: [
          { label: "None", value: 0 },
          { label: "Tub with tiled surround (3 walls)", value: 1 },
          { label: "Tiled alcove shower (3 walls; floor tiled separately)", value: 2 },
        ],
      },
      { id: "showerWidth", label: "Tub/shower width", dim: "length", default: 5, min: 0, step: 0.25, showIf: (v) => v.showerType > 0 },
      { id: "showerDepth", label: "Tub/shower depth", dim: "length", default: 2.5, min: 0, step: 0.25, showIf: (v) => v.showerType > 0 },
      { id: "showerHeight", label: "Surround tile height", dim: "length", default: 6, min: 0, step: 0.25, showIf: (v) => v.showerType > 0, help: "Above the tub rim, or from the shower floor." },
      { id: "wainscotRun", label: "Wainscot run (outside the shower)", dim: "length", default: 0, min: 0, step: 0.5, help: "Length of wall with tile wainscot; 0 for none." },
      { id: "wainscotHeight", label: "Wainscot height", dim: "length", default: 3.5, min: 0, step: 0.25, showIf: (v) => v.wainscotRun > 0 },
      { id: "floorTileLength", label: "Floor tile length", dim: "smallLength", default: 12, min: 0.25, step: 0.25 },
      { id: "floorTileWidth", label: "Floor tile width", dim: "smallLength", default: 12, min: 0.25, step: 0.25 },
      { id: "wallTileLength", label: "Wall tile length", dim: "smallLength", default: 6, min: 0.25, step: 0.25 },
      { id: "wallTileWidth", label: "Wall tile width", dim: "smallLength", default: 3, min: 0.25, step: 0.25 },
      jointField(0.125),
      boxField("floorBox", "Floor tile coverage per box", 10),
      boxField("wallBox", "Wall tile coverage per box", 10),
      wasteField(10, "10% for straight layouts; 15% for diagonal or patterned floors."),
    ],
    compute: (v) => {
      const hasShower = v.showerType > 0;
      const footprint = hasShower ? v.showerWidth * v.showerDepth : 0;
      const floorArea = Math.max(0, v.length * v.width - footprint);
      const surround = hasShower ? (v.showerWidth + 2 * v.showerDepth) * v.showerHeight : 0;
      const wainscot = v.wainscotRun * (v.wainscotHeight || 0);
      const wallArea = surround + wainscot;
      const floorTiles = ceil(withWaste(tilesFor(floorArea, v.floorTileLength, v.floorTileWidth, v.joint), v.waste));
      const wallTiles = ceil(withWaste(tilesFor(wallArea, v.wallTileLength, v.wallTileWidth, v.joint), v.waste));
      return [
        { key: "totalBuy", label: "Total tile to buy (incl. waste)", value: withWaste(floorArea + wallArea, v.waste), dim: "area", decimals: 1, primary: true },
        { key: "floorTiles", label: "Floor tiles", value: floorTiles, unit: "tiles", format: "integer" },
        { key: "floorBoxes", label: "Floor tile boxes", value: ceil(safeDiv(withWaste(floorArea, v.waste), v.floorBox)), unit: "boxes", format: "integer" },
        { key: "wallTiles", label: "Wall tiles", value: wallTiles, unit: "tiles", format: "integer" },
        { key: "wallBoxes", label: "Wall tile boxes", value: ceil(safeDiv(withWaste(wallArea, v.waste), v.wallBox)), unit: "boxes", format: "integer" },
        { key: "floorArea", label: "Floor area to tile", value: floorArea, dim: "area", decimals: 1 },
        { key: "wallArea", label: "Wall area to tile", value: wallArea, dim: "area", decimals: 1 },
      ];
    },
  },
];
