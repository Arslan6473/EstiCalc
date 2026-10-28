import type { CalculatorLogic, SelectField, Values } from "../types";
import { ceil, safeDiv, wasteField, withWaste } from "../helpers";

const DOOR_SQFT = 20; // 3 ft x 6 ft 8 in interior door
const WINDOW_SQFT = 15; // 3 ft x 5 ft average window
const TAPE_FT_PER_SQFT = 0.37; // ~370 ft of joint tape per 1,000 sq ft of board
const BF_PER_FT: Record<number, number> = { 4: 4 / 6, 6: 1 }; // 2x4 = 0.667 bd ft/ft, 2x6 = 1 bd ft/ft

// Blown-in attic insulation, derived from manufacturer attic coverage charts:
// pounds of installed insulation per sq ft per R-value point, R-value per inch, bag weight.
const LOOSE_FILL = [
  { lbPerSqftPerR: 0.0134, rPerInch: 2.5, bagLb: 25.5 }, // loose-fill fiberglass (e.g. JM Attic Protector)
  { lbPerSqftPerR: 0.031, rPerInch: 3.7, bagLb: 25 }, // loose-fill cellulose (e.g. Greenfiber 25 lb bag)
];

const SPRAY_R_PER_INCH = [3.6, 6.5]; // open-cell, closed-cell (DOE typical values)

const sheetSelect = (id = "sheet"): SelectField => ({
  id,
  label: "Sheet size",
  type: "select",
  default: 32,
  options: [
    { label: "4 × 8 ft (32 sq ft)", value: 32 },
    { label: "4 × 10 ft (40 sq ft)", value: 40 },
    { label: "4 × 12 ft (48 sq ft)", value: 48 },
    { label: "54 in × 12 ft (54 sq ft)", value: 54 },
  ],
});

const spacingSelect = (id = "spacing", label = "Stud spacing (on center)"): SelectField => ({
  id,
  label,
  type: "select",
  default: 16,
  options: [
    { label: "12 in on center", value: 12 },
    { label: "16 in on center (standard)", value: 16 },
    { label: "24 in on center", value: 24 },
  ],
});

/** Studs for a straight run: one every `spacing` inches plus the closing stud. */
const studsForRun = (lengthFt: number, spacingIn: number) =>
  lengthFt > 0 && spacingIn > 0 ? ceil((lengthFt * 12) / spacingIn) + 1 : 0;

/** Screws to hang one sheet laid perpendicular to the framing (ends land on framing). */
function screwsPerSheet(sheetSqft: number, framingIn: number, screwIn: number) {
  if (framingIn <= 0 || screwIn <= 0) return 0;
  const widthIn = sheetSqft === 54 ? 54 : 48;
  const lengthIn = (sheetSqft * 144) / widthIn;
  const members = Math.floor(lengthIn / framingIn + 1e-9) + 1;
  const perMember = Math.floor(widthIn / screwIn + 1e-9) + 1;
  return members * perMember;
}

const insulationTypeShow = (types: number[]) => (v: Values) => types.includes(v.type);

export const logic: CalculatorLogic[] = [
  {
    slug: "drywall-sheets-calculator",
    fields: [
      { id: "length", label: "Room length", dim: "length", default: 12, min: 0, step: 0.5 },
      { id: "width", label: "Room width", dim: "length", default: 12, min: 0, step: 0.5 },
      { id: "height", label: "Wall height", dim: "length", default: 8, min: 0, step: 0.5 },
      { id: "doors", label: "Number of doors", default: 1, min: 0, step: 1, help: "Each door removes about 20 sq ft (1.9 m²)." },
      { id: "windows", label: "Number of windows", default: 2, min: 0, step: 1, help: "Each window removes about 15 sq ft (1.4 m²)." },
      {
        id: "ceiling",
        label: "Hang the ceiling too?",
        type: "select",
        default: 1,
        options: [
          { label: "No — walls only", value: 0 },
          { label: "Yes — walls and ceiling", value: 1 },
        ],
      },
      sheetSelect(),
      wasteField(10, "Extra for cut-offs around openings and damaged sheets. Use 15% for rooms with many corners."),
    ],
    compute: (v) => {
      const wallArea = Math.max(0, 2 * (v.length + v.width) * v.height - v.doors * DOOR_SQFT - v.windows * WINDOW_SQFT);
      const ceilingArea = v.ceiling ? v.length * v.width : 0;
      const total = wallArea + ceilingArea;
      const sheets = ceil(withWaste(safeDiv(total, v.sheet), v.waste));
      return [
        { key: "sheets", label: "Drywall sheets to buy", value: sheets, unit: "sheets", format: "integer", primary: true },
        { key: "wallSheets", label: "Sheets for walls (no waste)", value: ceil(safeDiv(wallArea, v.sheet)), unit: "sheets", format: "integer" },
        { key: "ceilingSheets", label: "Sheets for ceiling (no waste)", value: ceil(safeDiv(ceilingArea, v.sheet)), unit: "sheets", format: "integer" },
        { key: "totalArea", label: "Area to cover", value: total, dim: "area", decimals: 0 },
        { key: "wallArea", label: "Net wall area", value: wallArea, dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "joint-compound-calculator",
    fields: [
      { id: "area", label: "Drywall area to finish", dim: "area", default: 500, min: 0, step: 10, help: "Total board surface: walls plus ceiling." },
      {
        id: "coverage",
        label: "Compound per 1,000 sq ft",
        default: 9.4,
        min: 1,
        max: 40,
        step: 0.1,
        suffix: "gal",
        help: "USG lists about 9.4 gal per 1,000 sq ft for a Level 4 finish (tape coat + 2 finish coats). Raise it for a Level 5 skim coat.",
      },
      {
        id: "bucket",
        label: "Container size",
        type: "select",
        default: 4.5,
        options: [
          { label: "4.5-gallon pail", value: 4.5 },
          { label: "3.5-gallon carton", value: 3.5 },
          { label: "1-gallon pail", value: 1 },
        ],
      },
      {
        id: "roll",
        label: "Tape roll length",
        type: "select",
        default: 500,
        options: [
          { label: "250 ft roll", value: 250 },
          { label: "500 ft roll", value: 500 },
        ],
      },
      wasteField(10, "Compound that dries out in the pan, is sanded off or dropped."),
    ],
    compute: (v) => {
      const gallons = withWaste((v.area * v.coverage) / 1000, v.waste);
      const tape = v.area * TAPE_FT_PER_SQFT;
      return [
        { key: "gallons", label: "Joint compound needed", value: gallons, dim: "liquid", decimals: 1, primary: true },
        { key: "containers", label: "Containers to buy", value: ceil(safeDiv(gallons, v.bucket)), unit: "containers", format: "integer" },
        { key: "tapeFeet", label: "Joint tape needed", value: tape, dim: "length", decimals: 0 },
        { key: "tapeRolls", label: "Tape rolls", value: ceil(safeDiv(tape, v.roll)), unit: "rolls", format: "integer" },
      ];
    },
  },
  {
    slug: "drywall-screws-calculator",
    fields: [
      { id: "wallArea", label: "Wall drywall area", dim: "area", default: 366, min: 0, step: 10 },
      { id: "ceilingArea", label: "Ceiling drywall area", dim: "area", default: 144, min: 0, step: 10 },
      sheetSelect(),
      spacingSelect("framing", "Framing spacing (on center)"),
      { id: "wallScrew", label: "Screw spacing on walls", dim: "smallLength", default: 16, min: 4, max: 16, step: 1, help: "IRC Table R702.3.5 allows up to 16 in on walls with screws." },
      { id: "ceilingScrew", label: "Screw spacing on ceilings", dim: "smallLength", default: 12, min: 4, max: 12, step: 1, help: "Code maximum is 12 in on ceilings." },
      { id: "perLb", label: "Screws per pound", default: 300, min: 50, step: 10, suffix: "per lb", help: "Check the box: 1-1/4 in coarse-thread screws run roughly 250–350 per lb." },
      wasteField(10, "Dropped and stripped screws."),
    ],
    compute: (v) => {
      const wallSheets = ceil(safeDiv(v.wallArea, v.sheet));
      const ceilingSheets = ceil(safeDiv(v.ceilingArea, v.sheet));
      const perWall = screwsPerSheet(v.sheet, v.framing, v.wallScrew);
      const perCeiling = screwsPerSheet(v.sheet, v.framing, v.ceilingScrew);
      const screws = ceil(withWaste(wallSheets * perWall + ceilingSheets * perCeiling, v.waste));
      return [
        { key: "screws", label: "Drywall screws needed", value: screws, unit: "screws", format: "integer", primary: true },
        { key: "pounds", label: "Approximate weight to buy", value: safeDiv(screws, v.perLb), dim: "weight", decimals: 1 },
        { key: "perWallSheet", label: "Screws per wall sheet", value: perWall, unit: "screws", format: "integer" },
        { key: "perCeilingSheet", label: "Screws per ceiling sheet", value: perCeiling, unit: "screws", format: "integer" },
        { key: "sheets", label: "Sheets (walls + ceiling)", value: wallSheets + ceilingSheets, unit: "sheets", format: "integer" },
      ];
    },
  },
  {
    slug: "stud-count-calculator",
    fields: [
      { id: "length", label: "Wall length", dim: "length", default: 20, min: 0, step: 0.5 },
      spacingSelect(),
      { id: "openings", label: "Door and window openings", default: 1, min: 0, step: 1, help: "Each opening adds about 2 studs (extra king and jack studs)." },
      { id: "corners", label: "Corners and wall intersections", default: 2, min: 0, step: 1, help: "Each corner or T-intersection adds about 2 studs for backing." },
      { id: "plateLength", label: "Plate board length", dim: "length", default: 12, min: 6, step: 2, help: "Length of the boards you will buy for plates." },
      wasteField(10, "Extra for crooked, split or twisted boards."),
    ],
    compute: (v) => {
      const base = studsForRun(v.length, v.spacing);
      const studs = ceil(withWaste(base + v.openings * 2 + v.corners * 2, v.waste));
      const plateFt = 3 * v.length; // one bottom plate + double top plate
      return [
        { key: "studs", label: "Studs to buy", value: studs, unit: "studs", format: "integer", primary: true },
        { key: "baseStuds", label: "Studs at regular spacing", value: base, unit: "studs", format: "integer" },
        { key: "plateFeet", label: "Plate lumber (bottom + double top)", value: plateFt, dim: "length", decimals: 0 },
        { key: "plateBoards", label: "Plate boards to buy", value: ceil(withWaste(safeDiv(plateFt, v.plateLength), v.waste)), unit: "boards", format: "integer" },
      ];
    },
  },
  {
    slug: "batt-insulation-calculator",
    fields: [
      { id: "area", label: "Area to insulate", dim: "area", default: 290, min: 0, step: 10, help: "Wall length × height minus large windows and doors, or the ceiling/floor area." },
      {
        id: "spacing",
        label: "Framing spacing",
        type: "select",
        default: 16,
        options: [
          { label: "16 in on center (15 in wide batts)", value: 16 },
          { label: "24 in on center (23 in wide batts)", value: 24 },
        ],
      },
      { id: "battLength", label: "Batt length", dim: "smallLength", default: 93, min: 12, step: 1, help: "93 in batts fit 8 ft walls; 105 in fit 9 ft walls; ceilings often use 48 in batts or rolls." },
      { id: "packCoverage", label: "Coverage per package", dim: "area", default: 106.56, min: 1, step: 0.5, help: "Printed on the bag — it varies by R-value and pack size." },
      wasteField(5, "Extra for trimming around boxes, pipes and short bays."),
    ],
    compute: (v) => {
      const area = withWaste(v.area, v.waste);
      const battWidth = v.spacing === 24 ? 23 : 15;
      const battSqft = (battWidth * v.battLength) / 144;
      return [
        { key: "packages", label: "Packages to buy", value: ceil(safeDiv(area, v.packCoverage)), unit: "packages", format: "integer", primary: true },
        { key: "batts", label: "Individual batts", value: ceil(safeDiv(area, battSqft)), unit: "batts", format: "integer" },
        { key: "area", label: "Area incl. waste", value: area, dim: "area", decimals: 0 },
        { key: "battArea", label: "Coverage per batt", value: battSqft, dim: "area", decimals: 2 },
      ];
    },
  },
  {
    slug: "attic-insulation-calculator",
    fields: [
      { id: "area", label: "Attic floor area", dim: "area", default: 1200, min: 0, step: 10 },
      {
        id: "material",
        label: "Blown-in material",
        type: "select",
        default: 1,
        options: [
          { label: "Loose-fill fiberglass", value: 0 },
          { label: "Loose-fill cellulose", value: 1 },
        ],
      },
      { id: "existingR", label: "Existing R-value", default: 11, min: 0, max: 60, step: 1, suffix: "R", help: "Measure the depth: old batts or cellulose ≈ R-3 per inch, loose fiberglass ≈ R-2.5 per inch. Enter 0 for an empty attic." },
      {
        id: "targetR",
        label: "Target R-value",
        type: "select",
        default: 49,
        options: [
          { label: "R-30", value: 30 },
          { label: "R-38", value: 38 },
          { label: "R-49", value: 49 },
          { label: "R-60", value: 60 },
        ],
      },
      { id: "chartBags", label: "Bags per 1,000 sq ft from the bag chart (optional)", default: 0, min: 0, step: 0.1, suffix: "bags", help: "Enter the figure from your product's coverage chart for the R-value you are adding; leave 0 to use the estimate." },
      wasteField(5, "Extra for blowing losses and uneven depth."),
    ],
    compute: (v) => {
      const m = LOOSE_FILL[v.material] ?? LOOSE_FILL[1];
      const addR = Math.max(0, v.targetR - v.existingR);
      const pounds = v.area * addR * m.lbPerSqftPerR;
      const rawBags = v.chartBags > 0 ? (v.area / 1000) * v.chartBags : pounds / m.bagLb;
      return [
        { key: "bags", label: "Bags to buy", value: ceil(withWaste(rawBags, v.waste)), unit: "bags", format: "integer", primary: true },
        { key: "addR", label: "R-value to add", value: addR, unit: "R", format: "number", decimals: 0 },
        { key: "depth", label: "Settled depth to add", value: m.rPerInch ? addR / m.rPerInch : 0, dim: "smallLength", decimals: 1 },
        { key: "pounds", label: "Insulation weight (estimate)", value: pounds, dim: "weight", decimals: 0 },
      ];
    },
  },
  {
    slug: "spray-foam-calculator",
    fields: [
      { id: "area", label: "Area to spray", dim: "area", default: 300, min: 0, step: 10 },
      { id: "thickness", label: "Foam thickness", dim: "smallLength", default: 2, min: 0.5, step: 0.5 },
      {
        id: "foam",
        label: "Foam type",
        type: "select",
        default: 1,
        options: [
          { label: "Open-cell (≈ R-3.6 per inch)", value: 0 },
          { label: "Closed-cell (≈ R-6.5 per inch)", value: 1 },
        ],
      },
      { id: "kitSize", label: "Kit yield", default: 600, min: 1, step: 1, suffix: "board ft", help: "DIY kits are sold by theoretical yield, e.g. 200 or 600 board feet. Check the box." },
      wasteField(10, "Real-world yield is usually below the label — cold cans and overspray cut it further."),
    ],
    compute: (v) => {
      const boardFeet = v.area * v.thickness;
      const needed = withWaste(boardFeet, v.waste);
      return [
        { key: "boardFeet", label: "Foam needed (incl. waste)", value: needed, unit: "board ft", format: "number", decimals: 0, primary: true },
        { key: "kits", label: "Kits to buy", value: ceil(safeDiv(needed, v.kitSize)), unit: "kits", format: "integer" },
        { key: "rValue", label: "Approximate R-value", value: v.thickness * (SPRAY_R_PER_INCH[v.foam] ?? 6.5), unit: "R", format: "number", decimals: 1 },
        { key: "netBoardFeet", label: "Board feet (no waste)", value: boardFeet, unit: "board ft", format: "number", decimals: 0 },
      ];
    },
  },
  {
    slug: "framing-lumber-calculator",
    fields: [
      { id: "length", label: "Total wall length", dim: "length", default: 40, min: 0, step: 1, help: "Add up all walls you are framing." },
      { id: "height", label: "Stud length", dim: "length", default: 8, min: 1, step: 0.5, help: "Use 8 ft for 8 ft walls (or buy 92-5/8 in precut studs)." },
      spacingSelect(),
      {
        id: "size",
        label: "Lumber size",
        type: "select",
        default: 4,
        options: [
          { label: "2×4", value: 4 },
          { label: "2×6", value: 6 },
        ],
      },
      { id: "openings", label: "Door and window openings", default: 3, min: 0, step: 1 },
      { id: "openingWidth", label: "Average rough opening width", dim: "length", default: 3, min: 0, step: 0.5 },
      { id: "corners", label: "Corners and intersections", default: 4, min: 0, step: 1 },
      wasteField(10, "Extra for crooked boards and cutting errors."),
    ],
    compute: (v) => {
      const studs = ceil(withWaste(studsForRun(v.length, v.spacing) + v.openings * 2 + v.corners * 2, v.waste));
      const plateFt = withWaste(3 * v.length, v.waste);
      const headerFt = v.openings * (v.openingWidth + 0.25) * 2; // two-ply header, 3 in longer than the opening
      const boardFeet = (studs * v.height + plateFt) * (BF_PER_FT[v.size] ?? BF_PER_FT[4]);
      return [
        { key: "studs", label: "Studs to buy", value: studs, unit: "studs", format: "integer", primary: true },
        { key: "plateFeet", label: "Plate lumber (incl. waste)", value: plateFt, dim: "length", decimals: 0 },
        { key: "headerFeet", label: "Header stock (2-ply)", value: headerFt, dim: "length", decimals: 1 },
        { key: "boardFeet", label: "Studs + plates in board feet", value: boardFeet, unit: "board ft", format: "number", decimals: 0 },
      ];
    },
  },
  {
    slug: "drywall-cost-calculator",
    fields: [
      { id: "area", label: "Drywall area", dim: "area", default: 534, min: 0, step: 10, help: "Walls plus ceiling, after subtracting large openings." },
      sheetSelect(),
      { id: "sheetPrice", label: "Price per sheet", default: 16, min: 0, step: 0.5, prefix: "$", help: "1/2 in 4×8 sheets typically cost $12–$20; moisture- or fire-rated board costs more." },
      { id: "suppliesPrice", label: "Finishing supplies", dim: "pricePerArea", default: 0.2, min: 0, step: 0.05, help: "Mud, tape, screws and corner bead: roughly $0.15–$0.30 per sq ft." },
      {
        id: "pro",
        label: "Who is doing the work?",
        type: "select",
        default: 1,
        options: [
          { label: "DIY — materials only", value: 0 },
          { label: "Hire a drywall contractor", value: 1 },
        ],
      },
      { id: "laborPrice", label: "Labor (hang + finish)", dim: "pricePerArea", default: 1.75, min: 0, step: 0.05, help: "Typically $1.25–$2.75 per sq ft for a Level 4 finish.", showIf: (v) => v.pro === 1 },
      wasteField(10),
    ],
    compute: (v) => {
      const sheets = ceil(withWaste(safeDiv(v.area, v.sheet), v.waste));
      const sheetCost = sheets * v.sheetPrice;
      const supplies = v.area * v.suppliesPrice;
      const labor = v.pro ? v.area * v.laborPrice : 0;
      const total = sheetCost + supplies + labor;
      return [
        { key: "total", label: "Estimated total cost", value: total, format: "currency", primary: true },
        { key: "materials", label: "Materials", value: sheetCost + supplies, format: "currency" },
        { key: "labor", label: "Labor", value: labor, format: "currency" },
        { key: "perSqft", label: "Cost per sq ft", value: safeDiv(total, v.area), dim: "pricePerArea", decimals: 2 },
        { key: "sheets", label: "Sheets", value: sheets, unit: "sheets", format: "integer" },
      ];
    },
  },
  {
    slug: "insulation-cost-calculator",
    fields: [
      { id: "area", label: "Area to insulate", dim: "area", default: 1200, min: 0, step: 10 },
      {
        id: "type",
        label: "Insulation type",
        type: "select",
        default: 2,
        options: [
          { label: "Fiberglass batts", value: 0 },
          { label: "Blown-in fiberglass", value: 1 },
          { label: "Blown-in cellulose", value: 2 },
          { label: "Open-cell spray foam", value: 3 },
          { label: "Closed-cell spray foam", value: 4 },
        ],
      },
      { id: "priceBatt", label: "Installed price", dim: "pricePerArea", default: 1.25, min: 0, step: 0.05, help: "Typical: $0.90–$2.00 per sq ft installed.", showIf: insulationTypeShow([0]) },
      { id: "priceBlownFg", label: "Installed price", dim: "pricePerArea", default: 1.5, min: 0, step: 0.05, help: "Typical: $1.00–$2.20 per sq ft for about R-38 to R-49.", showIf: insulationTypeShow([1]) },
      { id: "priceCellulose", label: "Installed price", dim: "pricePerArea", default: 1.6, min: 0, step: 0.05, help: "Typical: $1.10–$2.30 per sq ft for about R-38 to R-49.", showIf: insulationTypeShow([2]) },
      { id: "thickness", label: "Foam thickness", dim: "smallLength", default: 3, min: 0.5, step: 0.5, showIf: insulationTypeShow([3, 4]) },
      { id: "priceOpen", label: "Price per board foot", default: 0.55, min: 0, step: 0.05, prefix: "$", help: "Typical: $0.40–$0.70 per board foot installed.", showIf: insulationTypeShow([3]) },
      { id: "priceClosed", label: "Price per board foot", default: 1.25, min: 0, step: 0.05, prefix: "$", help: "Typical: $1.00–$1.75 per board foot installed.", showIf: insulationTypeShow([4]) },
      { id: "removal", label: "Old insulation removal", dim: "pricePerArea", default: 0, min: 0, step: 0.05, help: "Leave 0 if not needed; removal typically adds $1.00–$2.00 per sq ft." },
    ],
    compute: (v) => {
      let installed: number;
      if (v.type === 3) installed = v.area * v.thickness * v.priceOpen;
      else if (v.type === 4) installed = v.area * v.thickness * v.priceClosed;
      else installed = v.area * ([v.priceBatt, v.priceBlownFg, v.priceCellulose][v.type] ?? v.priceCellulose);
      const removal = v.area * v.removal;
      const total = installed + removal;
      return [
        { key: "total", label: "Estimated total cost", value: total, format: "currency", primary: true },
        { key: "installed", label: "Insulation installed", value: installed, format: "currency" },
        { key: "removal", label: "Removal of old insulation", value: removal, format: "currency" },
        { key: "perSqft", label: "Cost per sq ft", value: safeDiv(total, v.area), dim: "pricePerArea", decimals: 2 },
      ];
    },
  },
];
