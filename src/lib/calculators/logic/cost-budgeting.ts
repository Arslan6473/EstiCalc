import type { CalculatorLogic, NumberField, ResultItem } from "../types";
import { safeDiv } from "../helpers";

const money = (id: string, label: string, def: number, help?: string, step = 50): NumberField => ({
  id,
  label,
  default: def,
  min: 0,
  step,
  prefix: "$",
  help,
});

const contingencyField = (def = 10, help = "Buffer for surprises found once work starts. 10–20% is common."): NumberField => ({
  id: "contingency",
  label: "Contingency",
  default: def,
  min: 0,
  max: 50,
  step: 1,
  suffix: "%",
  help,
});

/** Adds contingency and returns the standard total / contingency results. */
function totals(subtotal: number, contingencyPct: number) {
  const contingency = subtotal * (contingencyPct / 100);
  return { contingency, total: subtotal + contingency };
}

const usd = (key: string, label: string, value: number, primary = false): ResultItem => ({
  key,
  label,
  value,
  format: "currency",
  ...(primary ? { primary: true } : {}),
});

const PITCH_OPTIONS = [3, 4, 5, 6, 7, 8, 9, 10, 12].map((rise) => ({ label: `${rise}/12`, value: rise }));

export const logic: CalculatorLogic[] = [
  {
    slug: "fence-cost-calculator",
    fields: [
      { id: "length", label: "Fence length", dim: "length", default: 150, min: 0, step: 1 },
      {
        id: "material",
        label: "Fence type",
        type: "select",
        default: 0,
        options: [
          { label: "Wood privacy (6 ft)", value: 0 },
          { label: "Vinyl privacy (6 ft)", value: 1 },
          { label: "Chain link (4 ft)", value: 2 },
          { label: "Aluminum ornamental (4–5 ft)", value: 3 },
        ],
      },
      { id: "woodPrice", label: "Wood fence installed price", dim: "pricePerLength", default: 35, min: 0, step: 1, help: "Typical $25–$50 per ft.", showIf: (v) => v.material === 0 },
      { id: "vinylPrice", label: "Vinyl fence installed price", dim: "pricePerLength", default: 45, min: 0, step: 1, help: "Typical $30–$60 per ft.", showIf: (v) => v.material === 1 },
      { id: "chainPrice", label: "Chain link installed price", dim: "pricePerLength", default: 22, min: 0, step: 1, help: "Typical $15–$35 per ft.", showIf: (v) => v.material === 2 },
      { id: "aluminumPrice", label: "Aluminum fence installed price", dim: "pricePerLength", default: 45, min: 0, step: 1, help: "Typical $30–$65 per ft.", showIf: (v) => v.material === 3 },
      { id: "gates", label: "Gates", default: 1, min: 0, step: 1, suffix: "gates" },
      money("gatePrice", "Price per gate, installed", 500, "Typical $250–$1,000 for a walk gate; double drive gates cost more.", 25),
      {
        id: "remove",
        label: "Remove an old fence?",
        type: "select",
        default: 0,
        options: [
          { label: "No", value: 0 },
          { label: "Yes", value: 1 },
        ],
      },
      { id: "removalPrice", label: "Removal & haul-away price", dim: "pricePerLength", default: 5, min: 0, step: 0.5, help: "Typical $3–$8 per ft.", showIf: (v) => v.remove === 1 },
      money("fees", "Permit, survey & other fees", 200, "Permits are often $0–$400; a boundary survey can add several hundred dollars."),
      contingencyField(10),
    ],
    compute: (v) => {
      const prices = [v.woodPrice, v.vinylPrice, v.chainPrice, v.aluminumPrice];
      const fence = v.length * (prices[v.material] ?? v.woodPrice);
      const gates = v.gates * v.gatePrice;
      const removal = v.remove === 1 ? v.length * v.removalPrice : 0;
      const subtotal = fence + gates + removal + v.fees;
      const { contingency, total } = totals(subtotal, v.contingency);
      return [
        usd("total", "Estimated fence cost", total, true),
        usd("fence", "Fence (installed)", fence),
        usd("gatesCost", "Gates", gates),
        usd("removal", "Old fence removal", removal),
        usd("contingencyAmount", "Contingency", contingency),
        { key: "perFoot", label: "All-in cost per linear foot", value: safeDiv(total, v.length), dim: "pricePerLength", decimals: 2 },
      ];
    },
  },
  {
    slug: "deck-cost-calculator",
    fields: [
      { id: "length", label: "Deck length", dim: "length", default: 16, min: 0, step: 0.5 },
      { id: "width", label: "Deck depth (out from the house)", dim: "length", default: 12, min: 0, step: 0.5 },
      {
        id: "material",
        label: "Decking material",
        type: "select",
        default: 0,
        options: [
          { label: "Pressure-treated pine", value: 0 },
          { label: "Cedar or redwood", value: 1 },
          { label: "Composite", value: 2 },
          { label: "PVC / cellular vinyl", value: 3 },
        ],
      },
      { id: "ptPrice", label: "Pressure-treated deck price", dim: "pricePerArea", default: 35, min: 0, step: 1, help: "Typical $25–$50 per sq ft built.", showIf: (v) => v.material === 0 },
      { id: "cedarPrice", label: "Cedar / redwood deck price", dim: "pricePerArea", default: 45, min: 0, step: 1, help: "Typical $35–$60 per sq ft built.", showIf: (v) => v.material === 1 },
      { id: "compositePrice", label: "Composite deck price", dim: "pricePerArea", default: 60, min: 0, step: 1, help: "Typical $45–$85 per sq ft built.", showIf: (v) => v.material === 2 },
      { id: "pvcPrice", label: "PVC deck price", dim: "pricePerArea", default: 70, min: 0, step: 1, help: "Typical $50–$95 per sq ft built.", showIf: (v) => v.material === 3 },
      { id: "railing", label: "Railing length", dim: "length", default: 36, min: 0, step: 1, help: "Open sides only — not the side against the house or the stair opening." },
      { id: "railingPrice", label: "Railing installed price", dim: "pricePerLength", default: 50, min: 0, step: 1, help: "Typical $25–$60 per ft for wood, $50–$150+ for composite, aluminum or cable." },
      { id: "steps", label: "Stair steps", default: 3, min: 0, step: 1, suffix: "steps" },
      money("stepPrice", "Price per step", 200, "Typical $100–$300 per step, built to match the deck.", 10),
      money("removal", "Old deck removal", 0, "Typical $1,000–$3,000 for demolition and disposal."),
      money("permit", "Permit & inspections", 300, "Most attached decks need a permit; fees vary widely by town."),
      contingencyField(10),
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const prices = [v.ptPrice, v.cedarPrice, v.compositePrice, v.pvcPrice];
      const deck = area * (prices[v.material] ?? v.ptPrice);
      const railing = v.railing * v.railingPrice;
      const stairs = v.steps * v.stepPrice;
      const subtotal = deck + railing + stairs + v.removal + v.permit;
      const { contingency, total } = totals(subtotal, v.contingency);
      return [
        usd("total", "Estimated deck cost", total, true),
        usd("deck", "Deck structure & surface", deck),
        usd("railingCost", "Railings", railing),
        usd("stairs", "Stairs", stairs),
        usd("contingencyAmount", "Contingency", contingency),
        { key: "area", label: "Deck area", value: area, dim: "area", decimals: 0 },
        { key: "perSqFt", label: "All-in cost per sq ft", value: safeDiv(total, area), dim: "pricePerArea", decimals: 2 },
      ];
    },
  },
  {
    slug: "kitchen-remodel-cost-calculator",
    fields: [
      { id: "kitchenArea", label: "Kitchen floor area", dim: "area", default: 150, min: 0, step: 5 },
      { id: "cabinetLength", label: "Cabinet run (base + wall)", dim: "length", default: 20, min: 0, step: 1, help: "Linear feet of cabinet boxes, counting upper and lower runs separately." },
      { id: "cabinetPrice", label: "Cabinets installed", dim: "pricePerLength", default: 350, min: 0, step: 10, help: "Stock ~$150–$350/ft, semi-custom ~$350–$700/ft, custom $700+/ft." },
      { id: "counterArea", label: "Countertop area", dim: "area", default: 40, min: 0, step: 1 },
      { id: "counterPrice", label: "Countertop installed", dim: "pricePerArea", default: 80, min: 0, step: 1, help: "Laminate ~$20–$50, granite or quartz ~$50–$150 per sq ft." },
      { id: "backsplashArea", label: "Backsplash area", dim: "area", default: 30, min: 0, step: 1 },
      { id: "backsplashPrice", label: "Backsplash installed", dim: "pricePerArea", default: 25, min: 0, step: 1, help: "Typical $15–$50 per sq ft for tile." },
      { id: "floorPrice", label: "Flooring installed", dim: "pricePerArea", default: 9, min: 0, step: 0.5, help: "Applied to the kitchen floor area. Vinyl ~$4–$8, tile or hardwood ~$8–$20 per sq ft." },
      money("appliances", "Appliances", 5000, "A basic package is ~$3,000–$6,000; pro-style suites far more."),
      money("plumbing", "Sink, faucet & plumbing", 1500),
      money("electrical", "Lighting & electrical", 2000),
      money("demo", "Demolition & disposal", 1500),
      money("other", "Paint, drywall, hardware & other", 1000),
      money("permit", "Design & permits", 500),
      contingencyField(15, "Older homes often hide wiring, plumbing or subfloor problems. 15–20% is prudent."),
    ],
    compute: (v) => {
      const cabinets = v.cabinetLength * v.cabinetPrice;
      const counters = v.counterArea * v.counterPrice;
      const backsplash = v.backsplashArea * v.backsplashPrice;
      const flooring = v.kitchenArea * v.floorPrice;
      const services = v.plumbing + v.electrical;
      const subtotal = cabinets + counters + backsplash + flooring + v.appliances + services + v.demo + v.other + v.permit;
      const { contingency, total } = totals(subtotal, v.contingency);
      return [
        usd("total", "Estimated remodel cost", total, true),
        usd("cabinets", "Cabinets", cabinets),
        usd("counters", "Countertops", counters),
        usd("backsplash", "Backsplash", backsplash),
        usd("flooring", "Flooring", flooring),
        usd("services", "Plumbing & electrical", services),
        usd("subtotal", "Subtotal before contingency", subtotal),
        usd("contingencyAmount", "Contingency", contingency),
        { key: "perSqFt", label: "Cost per sq ft of kitchen", value: safeDiv(total, v.kitchenArea), dim: "pricePerArea", decimals: 0 },
      ];
    },
  },
  {
    slug: "bathroom-remodel-cost-calculator",
    fields: [
      { id: "floorArea", label: "Bathroom floor area", dim: "area", default: 40, min: 0, step: 1, help: "A standard 5 × 8 ft bathroom is 40 sq ft (3.7 m²)." },
      { id: "floorPrice", label: "Floor tile installed", dim: "pricePerArea", default: 15, min: 0, step: 1, help: "Typical $10–$25 per sq ft." },
      { id: "wallTileArea", label: "Wall / shower tile area", dim: "area", default: 100, min: 0, step: 5, help: "A tub surround is about 70–100 sq ft; enter 0 for a fiberglass unit." },
      { id: "wallTilePrice", label: "Wall tile installed", dim: "pricePerArea", default: 25, min: 0, step: 1, help: "Typical $15–$40 per sq ft." },
      money("vanity", "Vanity & top", 1500, "Typical $500–$3,000 installed for a single vanity."),
      money("toilet", "Toilet, installed", 500, "Typical $300–$900."),
      money("tub", "Tub or shower base / pan", 2500, "Typical $1,000–$5,000 installed, more for a curbless or custom shower."),
      money("plumbing", "Plumbing work & fixtures", 2500, "Valves, faucets, drain changes and labor."),
      money("electrical", "Lighting, fan & electrical", 1500),
      money("demo", "Demolition & disposal", 1200),
      money("other", "Drywall, paint, mirror & accessories", 800),
      money("permit", "Permits", 300),
      contingencyField(15, "Rot, leaks and outdated wiring are common once walls are opened. 15–20% is prudent."),
    ],
    compute: (v) => {
      const floor = v.floorArea * v.floorPrice;
      const walls = v.wallTileArea * v.wallTilePrice;
      const fixtures = v.vanity + v.toilet + v.tub;
      const subtotal = floor + walls + fixtures + v.plumbing + v.electrical + v.demo + v.other + v.permit;
      const { contingency, total } = totals(subtotal, v.contingency);
      return [
        usd("total", "Estimated remodel cost", total, true),
        usd("tile", "Floor & wall tile", floor + walls),
        usd("fixtures", "Vanity, toilet & tub/shower", fixtures),
        usd("trades", "Plumbing & electrical", v.plumbing + v.electrical),
        usd("subtotal", "Subtotal before contingency", subtotal),
        usd("contingencyAmount", "Contingency", contingency),
        { key: "perSqFt", label: "Cost per sq ft of bathroom", value: safeDiv(total, v.floorArea), dim: "pricePerArea", decimals: 0 },
      ];
    },
  },
  {
    slug: "roof-replacement-cost-calculator",
    fields: [
      {
        id: "mode",
        label: "Roof size",
        type: "select",
        default: 1,
        options: [
          { label: "I know the roof area", value: 0 },
          { label: "Estimate from footprint and pitch", value: 1 },
        ],
      },
      { id: "roofArea", label: "Roof area", dim: "area", default: 2000, min: 0, step: 50, showIf: (v) => v.mode === 0 },
      { id: "footprint", label: "House footprint incl. overhangs", dim: "area", default: 1600, min: 0, step: 50, showIf: (v) => v.mode === 1 },
      { id: "pitch", label: "Roof pitch (rise per 12 in run)", type: "select", default: 6, options: PITCH_OPTIONS, showIf: (v) => v.mode === 1 },
      {
        id: "material",
        label: "Roofing material",
        type: "select",
        default: 1,
        options: [
          { label: "3-tab asphalt shingles", value: 0 },
          { label: "Architectural asphalt shingles", value: 1 },
          { label: "Standing-seam metal", value: 2 },
          { label: "Concrete or clay tile", value: 3 },
        ],
      },
      { id: "price0", label: "3-tab installed price", default: 450, min: 0, step: 10, prefix: "$", suffix: "/square", help: "Typical $350–$550 per square (100 sq ft).", showIf: (v) => v.material === 0 },
      { id: "price1", label: "Architectural installed price", default: 550, min: 0, step: 10, prefix: "$", suffix: "/square", help: "Typical $450–$750 per square.", showIf: (v) => v.material === 1 },
      { id: "price2", label: "Standing-seam installed price", default: 1200, min: 0, step: 25, prefix: "$", suffix: "/square", help: "Typical $900–$1,600 per square.", showIf: (v) => v.material === 2 },
      { id: "price3", label: "Tile installed price", default: 1300, min: 0, step: 25, prefix: "$", suffix: "/square", help: "Typical $1,000–$2,000+ per square.", showIf: (v) => v.material === 3 },
      {
        id: "layers",
        label: "Old layers to tear off",
        type: "select",
        default: 1,
        options: [
          { label: "None (new roof deck)", value: 0 },
          { label: "1 layer", value: 1 },
          { label: "2 layers", value: 2 },
        ],
      },
      { id: "tearOffPrice", label: "Tear-off price per layer", default: 150, min: 0, step: 10, prefix: "$", suffix: "/square", help: "Typical $100–$250 per square, including disposal.", showIf: (v) => v.layers > 0 },
      { id: "sheets", label: "Roof deck sheets to replace", default: 0, min: 0, step: 1, suffix: "sheets", help: "Rotten 4 × 8 ft sheathing found during tear-off." },
      money("sheetPrice", "Price per sheet, installed", 100, "Typical $70–$130 per sheet.", 5),
      money("extras", "Flashing, skylights, vents & permit", 500, "Chimney reflashing, skylight work, ridge vents and permit fees."),
      contingencyField(10),
    ],
    compute: (v) => {
      const factor = Math.sqrt(1 + (v.pitch / 12) ** 2);
      const area = v.mode === 1 ? v.footprint * factor : v.roofArea;
      const squares = area / 100;
      const prices = [v.price0, v.price1, v.price2, v.price3];
      const roofing = squares * (prices[v.material] ?? v.price1);
      const tearOff = squares * v.layers * v.tearOffPrice;
      const decking = v.sheets * v.sheetPrice;
      const subtotal = roofing + tearOff + decking + v.extras;
      const { contingency, total } = totals(subtotal, v.contingency);
      return [
        usd("total", "Estimated roof replacement", total, true),
        usd("roofing", "New roofing, installed", roofing),
        usd("tearOff", "Tear-off & disposal", tearOff),
        usd("decking", "Deck repairs", decking),
        usd("contingencyAmount", "Contingency", contingency),
        { key: "roofArea", label: "Roof area", value: area, dim: "area", decimals: 0 },
        { key: "squares", label: "Roofing squares", value: squares, unit: "squares", decimals: 1 },
        { key: "perSquare", label: "All-in cost per square", value: safeDiv(total, squares), format: "currency" },
      ];
    },
  },
  {
    slug: "driveway-cost-calculator",
    fields: [
      { id: "length", label: "Driveway length", dim: "length", default: 50, min: 0, step: 1 },
      { id: "width", label: "Driveway width", dim: "length", default: 12, min: 0, step: 0.5, help: "10–12 ft for one car, 18–24 ft for two side by side." },
      {
        id: "material",
        label: "Surface",
        type: "select",
        default: 2,
        options: [
          { label: "Gravel", value: 0 },
          { label: "Asphalt", value: 1 },
          { label: "Concrete", value: 2 },
          { label: "Pavers", value: 3 },
        ],
      },
      { id: "gravelPrice", label: "Gravel installed price", dim: "pricePerArea", default: 2.5, min: 0, step: 0.25, help: "Typical $1.50–$4 per sq ft with base.", showIf: (v) => v.material === 0 },
      { id: "asphaltPrice", label: "Asphalt installed price", dim: "pricePerArea", default: 7, min: 0, step: 0.25, help: "Typical $5–$10 per sq ft.", showIf: (v) => v.material === 1 },
      { id: "concretePrice", label: "Concrete installed price", dim: "pricePerArea", default: 10, min: 0, step: 0.25, help: "Typical $8–$15 per sq ft for a 4–5 in slab; decorative finishes cost more.", showIf: (v) => v.material === 2 },
      { id: "paverPrice", label: "Paver installed price", dim: "pricePerArea", default: 25, min: 0, step: 0.5, help: "Typical $15–$40 per sq ft.", showIf: (v) => v.material === 3 },
      {
        id: "remove",
        label: "Remove an old driveway?",
        type: "select",
        default: 0,
        options: [
          { label: "No", value: 0 },
          { label: "Yes", value: 1 },
        ],
      },
      { id: "removalPrice", label: "Removal & disposal price", dim: "pricePerArea", default: 3, min: 0, step: 0.25, help: "Typical $1–$6 per sq ft; reinforced concrete is at the top end.", showIf: (v) => v.remove === 1 },
      money("fees", "Permit, curb cut & other", 150),
      contingencyField(10),
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const prices = [v.gravelPrice, v.asphaltPrice, v.concretePrice, v.paverPrice];
      const surface = area * (prices[v.material] ?? v.concretePrice);
      const removal = v.remove === 1 ? area * v.removalPrice : 0;
      const subtotal = surface + removal + v.fees;
      const { contingency, total } = totals(subtotal, v.contingency);
      return [
        usd("total", "Estimated driveway cost", total, true),
        usd("surface", "New driveway, installed", surface),
        usd("removal", "Old driveway removal", removal),
        usd("contingencyAmount", "Contingency", contingency),
        { key: "area", label: "Driveway area", value: area, dim: "area", decimals: 0 },
        { key: "perSqFt", label: "All-in cost per sq ft", value: safeDiv(total, area), dim: "pricePerArea", decimals: 2 },
      ];
    },
  },
  {
    slug: "contractor-markup-calculator",
    fields: [
      money("materials", "Materials", 4000),
      money("labor", "Labor (incl. payroll costs)", 5000),
      money("subs", "Subcontractors", 0),
      money("otherCost", "Equipment, permits, dumpster & other", 1000),
      {
        id: "mode",
        label: "Price using",
        type: "select",
        default: 0,
        options: [
          { label: "Markup % (on cost)", value: 0 },
          { label: "Target gross margin % (of price)", value: 1 },
        ],
      },
      { id: "markup", label: "Markup", default: 25, min: 0, max: 500, step: 1, suffix: "%", showIf: (v) => v.mode === 0 },
      { id: "margin", label: "Target gross margin", default: 20, min: 0, max: 95, step: 1, suffix: "%", help: "Must be below 100%.", showIf: (v) => v.mode === 1 },
    ],
    compute: (v) => {
      const cost = v.materials + v.labor + v.subs + v.otherCost;
      const margin = Math.min(Math.max(v.margin, 0), 99.9) / 100;
      const price = v.mode === 1 ? cost / (1 - margin) : cost * (1 + v.markup / 100);
      const profit = price - cost;
      return [
        usd("price", "Price to charge", price, true),
        usd("profit", "Gross profit", profit),
        usd("cost", "Total job cost", cost),
        { key: "markupPct", label: "Markup (profit ÷ cost)", value: safeDiv(profit, cost) * 100, format: "percent", decimals: 1 },
        { key: "marginPct", label: "Gross margin (profit ÷ price)", value: safeDiv(profit, price) * 100, format: "percent", decimals: 1 },
      ];
    },
  },
  {
    slug: "renovation-budget-calculator",
    fields: [
      money("available", "Money available (cash + financing)", 50000, undefined, 500),
      money("demo", "Demolition & site prep", 2000),
      money("structure", "Structural & carpentry", 8000),
      money("plumbing", "Plumbing", 5000),
      money("electrical", "Electrical & HVAC", 5000),
      money("finishes", "Finishes (flooring, drywall, paint, tile)", 10000),
      money("fixtures", "Cabinets, fixtures & appliances", 10000),
      money("fees", "Design, permits & inspections", 2500),
      money("other", "Other (temporary housing, storage, cleanup)", 0),
      contingencyField(15, "10% for straightforward cosmetic work, 15–20% for older homes or opened walls."),
    ],
    compute: (v) => {
      const items = v.demo + v.structure + v.plumbing + v.electrical + v.finishes + v.fixtures + v.fees + v.other;
      const { contingency, total } = totals(items, v.contingency);
      return [
        usd("total", "Total budget needed", total, true),
        usd("items", "Planned costs", items),
        usd("contingencyAmount", "Contingency", contingency),
        usd("remaining", "Left over (negative = shortfall)", v.available - total),
        usd("maxPlanned", "Most you can plan to spend before contingency", v.available / (1 + v.contingency / 100)),
        { key: "contingencyShare", label: "Contingency share of total", value: safeDiv(contingency, total) * 100, format: "percent", decimals: 1 },
      ];
    },
  },
  {
    slug: "home-improvement-roi-calculator",
    fields: [
      money("cost", "Project cost", 20000, "Everything you will pay, including permits and financing fees.", 500),
      money("valueAdded", "Increase in home value", 14000, "Ask a local agent or appraiser what the project adds to your sale price.", 500),
      money("annualSavings", "Yearly savings (energy, upkeep)", 0, "Leave at 0 for purely cosmetic projects.", 50),
      { id: "years", label: "Years until you sell", default: 5, min: 0, step: 1, suffix: "years" },
    ],
    compute: (v) => {
      const savings = v.annualSavings * v.years;
      const totalReturn = v.valueAdded + savings;
      const net = totalReturn - v.cost;
      return [
        { key: "roi", label: "Return on investment", value: safeDiv(net, v.cost) * 100, format: "percent", decimals: 1, primary: true },
        { key: "recouped", label: "Cost recouped at resale", value: safeDiv(v.valueAdded, v.cost) * 100, format: "percent", decimals: 1 },
        usd("net", "Net gain (negative = net cost)", net),
        usd("savingsTotal", "Savings while you own the home", savings),
        { key: "payback", label: "Payback from savings alone (0 = no savings)", value: safeDiv(v.cost, v.annualSavings), unit: "years", decimals: 1 },
      ];
    },
  },
];
