import type { CalculatorLogic, Field, ResultItem } from "../types";
import { ceil, safeDiv, wasteField, withWaste } from "../helpers";

const DOOR_SQFT = 20; // 3 ft x 6 ft 8 in standard interior door
const WINDOW_SQFT = 15; // 3 ft x 5 ft average window
/** One US gallon spread 1 mil (0.001 in) thick covers 231 in³ / (144 × 0.001) = 1604 sq ft. */
const SQFT_PER_GAL_AT_ONE_MIL = 231 / 0.144;
const WALLPAPER_TRIM_IN = 4; // 2 in top + 2 in bottom trimming allowance per strip
const RAIL_FACE_FT = 3.5 / 12; // face of a 2x4 rail
const STEP_SQFT_PER_FT = 1.5; // tread (~11 in) + riser (~7 in) per foot of stair width

const coatsField = (def = 2, max = 5): Field => ({ id: "coats", label: "Coats", default: def, min: 1, max, step: 1, suffix: "coats" });

const coverageField = (def: number, help: string, label = "Coverage per coat"): Field => ({
  id: "coverage",
  label,
  dim: "coverage",
  default: def,
  min: 25,
  step: 10,
  help,
});

/** Split a gallon total into 5-gallon buckets plus 1-gallon cans (whole gallons). */
function buyPlan(gallons: number): ResultItem[] {
  const total = ceil(gallons);
  const buckets = Math.floor(total / 5);
  return [
    { key: "buckets", label: "5-gallon buckets", value: buckets, unit: "buckets", format: "integer" },
    { key: "extraCans", label: "Plus 1-gallon cans", value: total - buckets * 5, unit: "cans", format: "integer" },
  ];
}

/** Cheapest mix of 5-gallon buckets and 1-gallon cans to cover a whole number of gallons. */
function cheapestPaint(gallons: number, perGallon: number, perBucket: number) {
  const n = ceil(gallons);
  let best = n * perGallon;
  for (let b = 1; b <= Math.ceil(n / 5); b++) best = Math.min(best, b * perBucket + Math.max(0, n - 5 * b) * perGallon);
  return best;
}

export const logic: CalculatorLogic[] = [
  {
    slug: "paint-calculator",
    fields: [
      { id: "length", label: "Room length", dim: "length", default: 12, min: 0, step: 0.5 },
      { id: "width", label: "Room width", dim: "length", default: 12, min: 0, step: 0.5 },
      { id: "height", label: "Wall height", dim: "length", default: 8, min: 0, step: 0.5 },
      { id: "doors", label: "Number of doors", default: 1, min: 0, step: 1, help: "Each door removes about 20 sq ft (1.9 m²)." },
      { id: "windows", label: "Number of windows", default: 2, min: 0, step: 1, help: "Each window removes about 15 sq ft (1.4 m²)." },
      { id: "coats", label: "Coats", default: 2, min: 1, max: 5, step: 1, suffix: "coats" },
      {
        id: "coverage",
        label: "Paint coverage",
        dim: "coverage",
        default: 350,
        min: 50,
        step: 10,
        help: "Most interior paints cover 250–400 sq ft per gallon. Check the can.",
      },
      {
        id: "ceiling",
        label: "Paint the ceiling too?",
        type: "select",
        default: 0,
        options: [
          { label: "No — walls only", value: 0 },
          { label: "Yes — walls and ceiling", value: 1 },
        ],
      },
      wasteField(10, "Extra for touch-ups, rough surfaces and paint left in the tray."),
    ],
    compute: (v) => {
      const wallArea = 2 * (v.length + v.width) * v.height;
      const openings = v.doors * DOOR_SQFT + v.windows * WINDOW_SQFT;
      const ceilingArea = v.ceiling ? v.length * v.width : 0;
      const paintable = Math.max(0, wallArea - openings) + ceilingArea;
      const gallons = v.coverage > 0 ? withWaste((paintable * v.coats) / v.coverage, v.waste) : 0;
      return [
        { key: "gallons", label: "Paint needed", value: gallons, dim: "liquid", decimals: 1, primary: true },
        { key: "cans", label: "1-gallon cans to buy", value: ceil(gallons), unit: "cans", format: "integer" },
        { key: "paintableArea", label: "Paintable area (per coat)", value: paintable, dim: "area", decimals: 0 },
        { key: "wallArea", label: "Gross wall area", value: wallArea, dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "ceiling-paint-calculator",
    fields: [
      { id: "length", label: "Ceiling length", dim: "length", default: 12, min: 0, step: 0.5 },
      { id: "width", label: "Ceiling width", dim: "length", default: 14, min: 0, step: 0.5 },
      {
        id: "slope",
        label: "Ceiling shape",
        type: "select",
        default: 1,
        options: [
          { label: "Flat", value: 1 },
          { label: "Sloped 4/12 (single slope or vaulted)", value: 1.054 },
          { label: "Sloped 6/12", value: 1.118 },
          { label: "Sloped 8/12", value: 1.202 },
          { label: "Sloped 12/12 (45°)", value: 1.414 },
        ],
        help: "A sloped ceiling has more surface than the floor below it. The factor is the rafter length per foot of run.",
      },
      {
        id: "texture",
        label: "Ceiling surface",
        type: "select",
        default: 1,
        options: [
          { label: "Smooth (label coverage)", value: 1 },
          { label: "Light texture / orange peel (+15%)", value: 1.15 },
          { label: "Heavy texture / popcorn (+50%)", value: 1.5 },
        ],
      },
      coatsField(2),
      coverageField(400, "Flat ceiling paints typically list 350–400 sq ft per gallon. Check the can."),
      wasteField(10, "Extra for roller loading, the tray and touch-ups."),
    ],
    compute: (v) => {
      const floorArea = v.length * v.width;
      const area = floorArea * (v.slope || 1);
      const gallons = withWaste(safeDiv(area * v.coats * (v.texture || 1), v.coverage), v.waste);
      return [
        { key: "gallons", label: "Ceiling paint needed", value: gallons, dim: "liquid", decimals: 2, primary: true },
        { key: "cans", label: "1-gallon cans to buy", value: ceil(gallons), unit: "cans", format: "integer" },
        { key: "quarts", label: "Or in quarts", value: ceil(gallons * 4), unit: "quarts", format: "integer" },
        { key: "ceilingArea", label: "Ceiling surface area", value: area, dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "exterior-paint-calculator",
    fields: [
      { id: "length", label: "House length", dim: "length", default: 40, min: 0, step: 0.5 },
      { id: "width", label: "House width", dim: "length", default: 30, min: 0, step: 0.5 },
      { id: "height", label: "Wall height (ground to eaves)", dim: "length", default: 10, min: 0, step: 0.5, help: "About 9–10 ft for one story, 18–20 ft for two." },
      { id: "gables", label: "Gable ends", default: 2, min: 0, max: 8, step: 1, help: "Triangular wall sections under the roof, usually on the short (width) walls." },
      { id: "gableHeight", label: "Gable height (eave to peak)", dim: "length", default: 6, min: 0, step: 0.5, showIf: (v) => v.gables > 0 },
      { id: "doors", label: "Exterior doors", default: 2, min: 0, step: 1, help: "Each door removes about 20 sq ft (1.9 m²)." },
      { id: "windows", label: "Windows", default: 10, min: 0, step: 1, help: "Each window removes about 15 sq ft (1.4 m²)." },
      { id: "otherOpenings", label: "Other unpainted area", dim: "area", default: 0, min: 0, step: 1, help: "Garage doors (a double door is about 112 sq ft), brick or stone sections." },
      {
        id: "surface",
        label: "Siding surface",
        type: "select",
        default: 1,
        options: [
          { label: "Smooth: fiber cement, vinyl, primed wood (label coverage)", value: 1 },
          { label: "Rough-sawn wood, cedar shingles (+25%)", value: 1.25 },
          { label: "Stucco, brick, block (+50%)", value: 1.5 },
        ],
      },
      coatsField(2),
      coverageField(300, "Exterior paints usually list 250–400 sq ft per gallon on smooth surfaces."),
      wasteField(10, "Extra for overspray, rough edges and touch-ups."),
    ],
    compute: (v) => {
      const wallArea = 2 * (v.length + v.width) * v.height;
      const gableArea = v.gables * 0.5 * v.width * (v.gableHeight || 0);
      const openings = v.doors * DOOR_SQFT + v.windows * WINDOW_SQFT + (v.otherOpenings || 0);
      const paintable = Math.max(0, wallArea + gableArea - openings);
      const gallons = withWaste(safeDiv(paintable * v.coats * (v.surface || 1), v.coverage), v.waste);
      return [
        { key: "gallons", label: "Exterior paint needed", value: gallons, dim: "liquid", decimals: 1, primary: true },
        { key: "cans", label: "Total gallons to buy", value: ceil(gallons), unit: "gallons", format: "integer" },
        ...buyPlan(gallons),
        { key: "paintableArea", label: "Paintable area (per coat)", value: paintable, dim: "area", decimals: 0 },
        { key: "gableArea", label: "Gable area", value: gableArea, dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "wallpaper-calculator",
    fields: [
      { id: "length", label: "Room length", dim: "length", default: 12, min: 0, step: 0.5 },
      { id: "width", label: "Room width", dim: "length", default: 10, min: 0, step: 0.5 },
      { id: "height", label: "Wall height", dim: "length", default: 8, min: 0, step: 0.25 },
      { id: "doors", label: "Doors", default: 1, min: 0, step: 1 },
      { id: "windows", label: "Windows", default: 2, min: 0, step: 1 },
      { id: "rollWidth", label: "Roll width", dim: "smallLength", default: 20.5, min: 1, step: 0.5, help: "US rolls are usually 20.5 in (52 cm) wide; European rolls 53 cm." },
      { id: "rollLength", label: "Roll length", dim: "length", default: 33, min: 1, step: 0.5, help: "A US double roll is about 33 ft (10 m); a single roll about 16.5 ft." },
      { id: "repeat", label: "Pattern repeat", dim: "smallLength", default: 21, min: 0, step: 0.25, help: "Printed on the label. Use 0 for random-match papers." },
      wasteField(10, "Extra for hanging mistakes and future repairs. Many installers buy one spare roll."),
    ],
    compute: (v) => {
      const perimeter = 2 * (v.length + v.width);
      const rawStripIn = v.height * 12 + WALLPAPER_TRIM_IN;
      const stripIn = v.repeat > 0 ? ceil(rawStripIn / v.repeat) * v.repeat : rawStripIn;
      const grossStrips = ceil(safeDiv(perimeter * 12, v.rollWidth));
      const stripArea = (stripIn / 12) * (v.rollWidth / 12);
      const openingArea = v.doors * DOOR_SQFT + v.windows * WINDOW_SQFT;
      const savedStrips = Math.floor(safeDiv(openingArea, stripArea));
      const strips = Math.max(0, grossStrips - savedStrips);
      const stripsPerRoll = Math.floor(safeDiv(v.rollLength * 12, stripIn) + 1e-9);
      const rolls = ceil(withWaste(safeDiv(strips, stripsPerRoll), v.waste));
      return [
        { key: "rolls", label: "Rolls to buy", value: rolls, unit: "rolls", format: "integer", primary: true },
        { key: "strips", label: "Full-height strips needed", value: strips, unit: "strips", format: "integer" },
        { key: "stripsPerRoll", label: "Strips per roll", value: stripsPerRoll, unit: "strips", format: "integer" },
        { key: "stripLength", label: "Cut length per strip", value: stripIn, dim: "smallLength", decimals: 1 },
        { key: "wallArea", label: "Net wall area", value: Math.max(0, perimeter * v.height - openingArea), dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "primer-calculator",
    fields: [
      { id: "wallArea", label: "Wall area to prime", dim: "area", default: 350, min: 0, step: 1, help: "Net of doors and windows. Use the wall area calculator if you need it." },
      { id: "ceilingArea", label: "Ceiling area to prime", dim: "area", default: 0, min: 0, step: 1 },
      {
        id: "surface",
        label: "Surface",
        type: "select",
        default: 1,
        options: [
          { label: "New drywall or smooth painted surface (label coverage)", value: 1 },
          { label: "Bare wood, patched or porous plaster (+25%)", value: 1.25 },
          { label: "Masonry, stucco or brick (+50%)", value: 1.5 },
        ],
      },
      coatsField(1, 3),
      coverageField(300, "Most primers list 200–400 sq ft per gallon. Check the can."),
      wasteField(10, "Extra for porous patches, the tray and roller."),
    ],
    compute: (v) => {
      const area = v.wallArea + v.ceilingArea;
      const gallons = withWaste(safeDiv(area * v.coats * (v.surface || 1), v.coverage), v.waste);
      return [
        { key: "gallons", label: "Primer needed", value: gallons, dim: "liquid", decimals: 1, primary: true },
        { key: "cans", label: "1-gallon cans to buy", value: ceil(gallons), unit: "cans", format: "integer" },
        ...buyPlan(gallons),
        { key: "area", label: "Area to prime (per coat)", value: area, dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "deck-stain-calculator",
    fields: [
      { id: "length", label: "Deck length", dim: "length", default: 16, min: 0, step: 0.5 },
      { id: "width", label: "Deck width", dim: "length", default: 12, min: 0, step: 0.5 },
      { id: "railing", label: "Railing length", dim: "length", default: 40, min: 0, step: 1, help: "Total run of railing. Use 0 if there is none." },
      { id: "railHeight", label: "Railing height", dim: "length", default: 3, min: 0, step: 0.25, showIf: (v) => v.railing > 0 },
      { id: "steps", label: "Number of steps", default: 4, min: 0, step: 1 },
      { id: "stairWidth", label: "Stair width", dim: "length", default: 4, min: 0, step: 0.5, showIf: (v) => v.steps > 0 },
      coatsField(2, 3),
      coverageField(250, "Stain labels typically list 150–300 sq ft per gallon; use the low end for rough or weathered wood."),
      wasteField(10, "Extra for board ends, gaps and thirsty wood."),
    ],
    compute: (v) => {
      const deckArea = v.length * v.width;
      const railArea = v.railing * (v.railHeight || 0);
      const stairArea = v.steps * (v.stairWidth || 0) * STEP_SQFT_PER_FT;
      const total = deckArea + railArea + stairArea;
      const gallons = withWaste(safeDiv(total * v.coats, v.coverage), v.waste);
      return [
        { key: "gallons", label: "Deck stain needed", value: gallons, dim: "liquid", decimals: 1, primary: true },
        { key: "cans", label: "1-gallon cans to buy", value: ceil(gallons), unit: "cans", format: "integer" },
        { key: "totalArea", label: "Total area to stain (per coat)", value: total, dim: "area", decimals: 0 },
        { key: "deckArea", label: "Deck floor area", value: deckArea, dim: "area", decimals: 0 },
        { key: "railArea", label: "Railing area", value: railArea, dim: "area", decimals: 0 },
        { key: "stairArea", label: "Stair area", value: stairArea, dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "fence-stain-calculator",
    fields: [
      { id: "length", label: "Fence length", dim: "length", default: 100, min: 0, step: 1 },
      { id: "height", label: "Fence height", dim: "length", default: 6, min: 0, step: 0.5 },
      {
        id: "sides",
        label: "Sides to stain",
        type: "select",
        default: 2,
        options: [
          { label: "One side", value: 1 },
          { label: "Both sides", value: 2 },
        ],
      },
      { id: "boardWidth", label: "Board width", dim: "smallLength", default: 5.5, min: 0.5, step: 0.25, help: "A nominal 1x6 picket is 5.5 in (14 cm) wide." },
      { id: "gap", label: "Gap between boards", dim: "smallLength", default: 0, min: 0, step: 0.25, help: "0 for a solid privacy fence." },
      { id: "rails", label: "Horizontal rails", default: 3, min: 0, max: 6, step: 1, help: "Rails show on the back side only; counted when you stain both sides." },
      coatsField(1, 3),
      coverageField(150, "Rough-sawn fence boards soak up stain; labels often list 100–200 sq ft per gallon on rough wood."),
      wasteField(10, "Extra for posts, board edges and sprayer overspray."),
    ],
    compute: (v) => {
      const solidFraction = safeDiv(v.boardWidth, v.boardWidth + v.gap);
      const faceArea = v.length * v.height * solidFraction;
      const railArea = v.sides >= 2 ? v.rails * v.length * RAIL_FACE_FT : 0;
      const total = faceArea * v.sides + railArea;
      const gallons = withWaste(safeDiv(total * v.coats, v.coverage), v.waste);
      return [
        { key: "gallons", label: "Fence stain needed", value: gallons, dim: "liquid", decimals: 1, primary: true },
        { key: "cans", label: "Total gallons to buy", value: ceil(gallons), unit: "gallons", format: "integer" },
        ...buyPlan(gallons),
        { key: "totalArea", label: "Area to stain (per coat)", value: total, dim: "area", decimals: 0 },
        { key: "solidPercent", label: "Board coverage of the fence face", value: solidFraction * 100, format: "percent", decimals: 0 },
      ];
    },
  },
  {
    slug: "cabinet-paint-calculator",
    fields: [
      { id: "doors", label: "Cabinet doors", default: 20, min: 0, step: 1 },
      { id: "doorWidth", label: "Average door width", dim: "smallLength", default: 15, min: 0, step: 0.5 },
      { id: "doorHeight", label: "Average door height", dim: "smallLength", default: 30, min: 0, step: 0.5 },
      {
        id: "doorSides",
        label: "Door sides to paint",
        type: "select",
        default: 2,
        options: [
          { label: "Fronts only", value: 1 },
          { label: "Fronts and backs", value: 2 },
        ],
      },
      { id: "drawers", label: "Drawer fronts", default: 8, min: 0, step: 1 },
      { id: "drawerWidth", label: "Average drawer front width", dim: "smallLength", default: 15, min: 0, step: 0.5, showIf: (v) => v.drawers > 0 },
      { id: "drawerHeight", label: "Average drawer front height", dim: "smallLength", default: 6, min: 0, step: 0.5, showIf: (v) => v.drawers > 0 },
      { id: "frameArea", label: "Face frames and exposed cabinet sides", dim: "area", default: 40, min: 0, step: 1, help: "Roughly the front area of the cabinet boxes minus the doors, plus any visible end panels." },
      coatsField(2, 4),
      coverageField(350, "Cabinet enamels typically list 300–400 sq ft per gallon."),
      {
        id: "primer",
        label: "Prime first?",
        type: "select",
        default: 1,
        options: [
          { label: "No", value: 0 },
          { label: "Yes — one coat of bonding primer", value: 1 },
        ],
      },
      { id: "primerCoverage", label: "Primer coverage", dim: "coverage", default: 300, min: 25, step: 10, showIf: (v) => v.primer > 0 },
      wasteField(10, "Extra for edges, profiles and the paint left in a sprayer or tray."),
    ],
    compute: (v) => {
      const doorArea = safeDiv(v.doors * v.doorWidth * v.doorHeight * v.doorSides, 144);
      const drawerArea = safeDiv(v.drawers * (v.drawerWidth || 0) * (v.drawerHeight || 0), 144);
      const area = doorArea + drawerArea + v.frameArea;
      const gallons = withWaste(safeDiv(area * v.coats, v.coverage), v.waste);
      const primerGallons = v.primer ? withWaste(safeDiv(area, v.primerCoverage), v.waste) : 0;
      return [
        { key: "gallons", label: "Cabinet paint needed", value: gallons, dim: "liquid", decimals: 2, primary: true },
        { key: "quarts", label: "Quarts to buy", value: ceil(gallons * 4), unit: "quarts", format: "integer" },
        { key: "primerGallons", label: "Primer needed", value: primerGallons, dim: "liquid", decimals: 2 },
        { key: "primerQuarts", label: "Primer quarts to buy", value: ceil(primerGallons * 4), unit: "quarts", format: "integer" },
        { key: "area", label: "Surface area (per coat)", value: area, dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "epoxy-floor-coating-calculator",
    fields: [
      { id: "length", label: "Floor length", dim: "length", default: 24, min: 0, step: 0.5 },
      { id: "width", label: "Floor width", dim: "length", default: 24, min: 0, step: 0.5 },
      coatsField(2, 4),
      { id: "dft", label: "Dry film thickness per coat", default: 10, min: 1, max: 60, step: 1, suffix: "mils", help: "1 mil = 0.001 in (25 microns). Check the product data sheet; 8–12 mils per coat is common for roll-on epoxy." },
      { id: "solids", label: "Solids by volume", default: 100, min: 10, max: 100, step: 1, suffix: "%", help: "100% for solvent-free epoxy; water-based kits are often around 50%. Listed on the data sheet." },
      { id: "kitSize", label: "Kit size (mixed volume)", dim: "liquid", default: 1, min: 0.1, step: 0.25 },
      wasteField(10, "Extra for porous concrete, mixing buckets and roller pickup. Use 15–20% on rough or unsealed slabs."),
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const coverage = safeDiv(SQFT_PER_GAL_AT_ONE_MIL * (v.solids / 100), v.dft);
      const gallons = withWaste(safeDiv(area * v.coats, coverage), v.waste);
      return [
        { key: "gallons", label: "Epoxy needed (mixed)", value: gallons, dim: "liquid", decimals: 2, primary: true },
        { key: "kits", label: "Kits to buy", value: ceil(safeDiv(gallons, v.kitSize)), unit: "kits", format: "integer" },
        { key: "coverage", label: "Coverage per coat", value: coverage, dim: "coverage", decimals: 0 },
        { key: "wetMils", label: "Wet film thickness to apply", value: safeDiv(v.dft * 100, v.solids), unit: "mils", decimals: 1 },
        { key: "area", label: "Floor area", value: area, dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "paint-cost-calculator",
    fields: [
      { id: "area", label: "Area to paint", dim: "area", default: 400, min: 0, step: 1, help: "Wall (and ceiling) area net of doors and windows." },
      coatsField(2),
      coverageField(350, "Most interior paints list 250–400 sq ft per gallon."),
      { id: "pricePerGallon", label: "Paint price per gallon", prefix: "$", default: 45, min: 0, step: 1, help: "Typical US range: about $25–$80 per gallon." },
      { id: "pricePerBucket", label: "Paint price per 5-gallon bucket", prefix: "$", default: 200, min: 0, step: 5, help: "Used only when buckets work out cheaper than single gallons." },
      {
        id: "primer",
        label: "Primer",
        type: "select",
        default: 0,
        options: [
          { label: "None", value: 0 },
          { label: "One coat", value: 1 },
        ],
      },
      { id: "primerPrice", label: "Primer price per gallon", prefix: "$", default: 25, min: 0, step: 1, showIf: (v) => v.primer > 0 },
      { id: "primerCoverage", label: "Primer coverage", dim: "coverage", default: 300, min: 25, step: 10, showIf: (v) => v.primer > 0 },
      { id: "supplies", label: "Supplies (rollers, brushes, tape, drop cloths)", prefix: "$", default: 50, min: 0, step: 5 },
      wasteField(10, "Extra for touch-ups and paint left in the tray."),
    ],
    compute: (v) => {
      const gallons = withWaste(safeDiv(v.area * v.coats, v.coverage), v.waste);
      const paintCost = cheapestPaint(gallons, v.pricePerGallon, v.pricePerBucket);
      const primerGallons = v.primer ? withWaste(safeDiv(v.area, v.primerCoverage), v.waste) : 0;
      const primerCost = ceil(primerGallons) * (v.primerPrice || 0);
      const total = paintCost + primerCost + v.supplies;
      return [
        { key: "total", label: "Estimated material cost", value: total, format: "currency", primary: true },
        { key: "paintCost", label: "Paint", value: paintCost, format: "currency" },
        { key: "primerCost", label: "Primer", value: primerCost, format: "currency" },
        { key: "gallons", label: "Paint needed", value: gallons, dim: "liquid", decimals: 1 },
        { key: "costPerSqFt", label: "Cost per sq ft of surface", value: safeDiv(total, v.area), format: "currency", decimals: 2 },
      ];
    },
  },
  {
    slug: "painter-labor-cost-calculator",
    fields: [
      { id: "area", label: "Area to paint", dim: "area", default: 1000, min: 0, step: 10, help: "Walls plus ceilings, net of openings." },
      coatsField(2),
      { id: "rate", label: "Production rate per painter", default: 150, min: 10, step: 10, suffix: "sq ft/hr", help: "Rolling and cutting in walls: roughly 100–200 sq ft per hour per coat. Lower for trim-heavy or high rooms." },
      { id: "prepHours", label: "Prep, setup and cleanup", default: 6, min: 0, step: 0.5, suffix: "hours", help: "Moving furniture, masking, patching and cleanup." },
      { id: "trimItems", label: "Doors and windows with trim to paint", default: 0, min: 0, step: 1 },
      { id: "trimHours", label: "Hours per door or window", default: 1, min: 0, step: 0.25, suffix: "hours", showIf: (v) => v.trimItems > 0 },
      { id: "hourlyRate", label: "Hourly rate per painter", prefix: "$", default: 50, min: 0, step: 1, help: "Typical US range: about $25–$75 per hour." },
      { id: "crew", label: "Painters on the crew", default: 2, min: 1, max: 10, step: 1 },
    ],
    compute: (v) => {
      const paintHours = safeDiv(v.area * v.coats, v.rate);
      const hours = paintHours + v.prepHours + v.trimItems * (v.trimHours || 0);
      const cost = hours * v.hourlyRate;
      return [
        { key: "laborCost", label: "Estimated labor cost", value: cost, format: "currency", primary: true },
        { key: "hours", label: "Total labor hours", value: hours, unit: "hours", decimals: 1 },
        { key: "days", label: "Working days for the crew (8 h)", value: safeDiv(hours, v.crew * 8), unit: "days", decimals: 1 },
        { key: "costPerSqFt", label: "Labor per sq ft of surface", value: safeDiv(cost, v.area), format: "currency", decimals: 2 },
      ];
    },
  },
  {
    slug: "number-of-coats-calculator",
    fields: [
      {
        id: "surface",
        label: "Surface condition",
        type: "select",
        default: 0,
        options: [
          { label: "Previously painted, clean and sound", value: 0 },
          { label: "Patched, stained or glossy", value: 1 },
          { label: "New drywall, bare wood or masonry", value: 2 },
        ],
      },
      {
        id: "color",
        label: "Color change",
        type: "select",
        default: 1,
        options: [
          { label: "Same color", value: 0 },
          { label: "Similar shade", value: 1 },
          { label: "Light over dark", value: 2 },
          { label: "Deep or bold color (reds, navies, dark greens)", value: 3 },
        ],
      },
      { id: "area", label: "Area to paint", dim: "area", default: 400, min: 0, step: 1 },
      coverageField(350, "Paint coverage from the can, per coat."),
      { id: "primerCoverage", label: "Primer coverage", dim: "coverage", default: 300, min: 25, step: 10 },
      wasteField(10),
    ],
    compute: (v) => {
      const primerCoats = v.surface >= 1 || v.color >= 2 ? 1 : 0;
      const finishCoats = v.surface === 0 && v.color === 0 ? 1 : 2;
      const gallons = withWaste(safeDiv(v.area * finishCoats, v.coverage), v.waste);
      const primerGallons = withWaste(safeDiv(v.area * primerCoats, v.primerCoverage), v.waste);
      return [
        { key: "finishCoats", label: "Finish coats recommended", value: finishCoats, unit: "coats", format: "integer", primary: true },
        { key: "primerCoats", label: "Primer coats", value: primerCoats, unit: "coats", format: "integer" },
        { key: "gallons", label: "Paint needed", value: gallons, dim: "liquid", decimals: 1 },
        { key: "primerGallons", label: "Primer needed", value: primerGallons, dim: "liquid", decimals: 1 },
      ];
    },
  },
];
