import type { CalculatorLogic, ResultItem, Values } from "../types";
import { CU_FT_PER_CU_YD, ceil, safeDiv, shapeSelect, wasteField, withWaste } from "../helpers";

const SQ_FT_PER_SQ_YD = 9;
const SQ_M_PER_SQ_FT = 0.09290304;
const GAL_PER_CU_FT = 7.48052;
const DOOR_SQFT = 20; // 3 ft x 6 ft 8 in standard interior door
const WINDOW_SQFT = 15; // 3 ft x 5 ft average window

const pos = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

/** Heron's formula; returns 0 for side lengths that cannot form a triangle. */
function heron(a: number, b: number, c: number) {
  const s = (a + b + c) / 2;
  const sq = s * (s - a) * (s - b) * (s - c);
  return sq > 0 ? Math.sqrt(sq) : 0;
}

const isRect = (v: Values) => v.shape === 0;
const isCircle = (v: Values) => v.shape === 1;
const isTriangle = (v: Values) => v.shape === 2;

/** Length units for the unit converter, expressed in inches. */
const LENGTH_UNITS = [
  { label: "Inches (in)", short: "in", inches: 1 },
  { label: "Feet (ft)", short: "ft", inches: 12 },
  { label: "Yards (yd)", short: "yd", inches: 36 },
  { label: "Millimetres (mm)", short: "mm", inches: 1 / 25.4 },
  { label: "Centimetres (cm)", short: "cm", inches: 1 / 2.54 },
  { label: "Metres (m)", short: "m", inches: 1 / 0.0254 },
];
const unitOptions = LENGTH_UNITS.map((u, value) => ({ label: u.label, value }));

const STOCK_LENGTHS = [8, 10, 12, 14, 16];

export const logic: CalculatorLogic[] = [
  {
    slug: "square-footage-calculator",
    fields: [
      { id: "length1", label: "Area 1 length", dim: "length", default: 12, min: 0, step: 0.5 },
      { id: "width1", label: "Area 1 width", dim: "length", default: 15, min: 0, step: 0.5 },
      { id: "length2", label: "Area 2 length", dim: "length", default: 0, min: 0, step: 0.5, help: "Optional. Leave at 0 if not used." },
      { id: "width2", label: "Area 2 width", dim: "length", default: 0, min: 0, step: 0.5 },
      { id: "length3", label: "Area 3 length", dim: "length", default: 0, min: 0, step: 0.5, help: "Optional. Leave at 0 if not used." },
      { id: "width3", label: "Area 3 width", dim: "length", default: 0, min: 0, step: 0.5 },
      { id: "length4", label: "Area 4 length", dim: "length", default: 0, min: 0, step: 0.5, help: "Optional. Leave at 0 if not used." },
      { id: "width4", label: "Area 4 width", dim: "length", default: 0, min: 0, step: 0.5 },
      wasteField(10, "Extra for cuts and offcuts when you order flooring, sod or similar materials."),
      {
        id: "price",
        label: "Material price (optional)",
        dim: "pricePerArea",
        default: 0,
        min: 0,
        step: 0.05,
        help: "Enter a price per sq ft (or m²) to estimate material cost. Leave at 0 to skip.",
      },
    ],
    compute: (v) => {
      const area =
        pos(v.length1) * pos(v.width1) +
        pos(v.length2) * pos(v.width2) +
        pos(v.length3) * pos(v.width3) +
        pos(v.length4) * pos(v.width4);
      const withExtra = withWaste(area, v.waste);
      const results: ResultItem[] = [
        { key: "area", label: "Total area", value: area, dim: "area", decimals: 1, primary: true },
        { key: "areaWithWaste", label: "Area to order (incl. waste)", value: withExtra, dim: "area", decimals: 1 },
        { key: "squareYards", label: "Total in square yards", value: area / SQ_FT_PER_SQ_YD, unit: "sq yd", decimals: 2 },
      ];
      if (v.price > 0) {
        results.push({ key: "cost", label: "Estimated material cost", value: withExtra * v.price, format: "currency" });
      }
      return results;
    },
  },
  {
    slug: "room-area-calculator",
    fields: [
      { id: "length", label: "Room length", dim: "length", default: 14, min: 0, step: 0.5 },
      { id: "width", label: "Room width", dim: "length", default: 12, min: 0, step: 0.5 },
      { id: "height", label: "Ceiling height", dim: "length", default: 8, min: 0, step: 0.5 },
      {
        id: "alcoveWidth",
        label: "Alcove or closet width",
        dim: "length",
        default: 0,
        min: 0,
        step: 0.5,
        help: "Optional bump-out (bay, closet, nook) measured along the wall. 0 = none.",
      },
      { id: "alcoveDepth", label: "Alcove or closet depth", dim: "length", default: 0, min: 0, step: 0.5, help: "How far the bump-out extends from the main wall." },
    ],
    compute: (v) => {
      const L = pos(v.length);
      const W = pos(v.width);
      const H = pos(v.height);
      const aw = pos(v.alcoveWidth);
      const ad = pos(v.alcoveDepth);
      const hasAlcove = aw > 0 && ad > 0;
      const floor = L * W + (hasAlcove ? aw * ad : 0);
      const perimeter = 2 * (L + W) + (hasAlcove ? 2 * ad : 0);
      return [
        { key: "floorArea", label: "Floor area", value: floor, dim: "area", decimals: 1, primary: true },
        { key: "wallArea", label: "Gross wall area", value: perimeter * H, dim: "area", decimals: 0, help: "Before subtracting doors and windows." },
        { key: "ceilingArea", label: "Ceiling area", value: floor, dim: "area", decimals: 1 },
        { key: "perimeter", label: "Perimeter", value: perimeter, dim: "length", decimals: 1 },
        { key: "volume", label: "Room volume", value: floor * H, dim: "volume", decimals: 0 },
        { key: "squareYards", label: "Floor area in square yards", value: floor / SQ_FT_PER_SQ_YD, unit: "sq yd", decimals: 2 },
      ];
    },
  },
  {
    slug: "wall-area-calculator",
    fields: [
      {
        id: "mode",
        label: "What are you measuring?",
        type: "select",
        default: 0,
        options: [
          { label: "All four walls of a room", value: 0 },
          { label: "A single wall", value: 1 },
        ],
      },
      { id: "length", label: "Room length (or wall length)", dim: "length", default: 12, min: 0, step: 0.5 },
      { id: "width", label: "Room width", dim: "length", default: 10, min: 0, step: 0.5, showIf: (v) => v.mode === 0 },
      { id: "height", label: "Wall height", dim: "length", default: 8, min: 0, step: 0.5 },
      { id: "doors", label: "Number of doors", default: 1, min: 0, step: 1 },
      { id: "doorArea", label: "Area per door", dim: "area", default: DOOR_SQFT, min: 0, step: 1, help: "A standard 3 ft × 6 ft 8 in door is about 20 sq ft (1.9 m²)." },
      { id: "windows", label: "Number of windows", default: 2, min: 0, step: 1 },
      { id: "windowArea", label: "Area per window", dim: "area", default: WINDOW_SQFT, min: 0, step: 1, help: "A 3 ft × 5 ft window is 15 sq ft (1.4 m²). Measure large windows." },
    ],
    compute: (v) => {
      const run = v.mode === 1 ? pos(v.length) : 2 * (pos(v.length) + pos(v.width));
      const gross = run * pos(v.height);
      const openings = pos(v.doors) * pos(v.doorArea) + pos(v.windows) * pos(v.windowArea);
      const net = Math.max(0, gross - openings);
      return [
        { key: "netArea", label: "Net wall area", value: net, dim: "area", decimals: 1, primary: true },
        { key: "grossArea", label: "Gross wall area", value: gross, dim: "area", decimals: 1 },
        { key: "openings", label: "Doors and windows deducted", value: Math.min(openings, gross), dim: "area", decimals: 1 },
        { key: "wallLength", label: "Total wall length", value: run, dim: "length", decimals: 1 },
      ];
    },
  },
  {
    slug: "l-shaped-room-area-calculator",
    fields: [
      { id: "length", label: "Overall length (longest side)", dim: "length", default: 20, min: 0, step: 0.5 },
      { id: "width", label: "Overall width (other long side)", dim: "length", default: 16, min: 0, step: 0.5 },
      { id: "notchLength", label: "Missing corner length", dim: "length", default: 8, min: 0, step: 0.5, help: "The cut-out corner that makes the room an L, measured along the length." },
      { id: "notchWidth", label: "Missing corner width", dim: "length", default: 6, min: 0, step: 0.5, help: "The cut-out corner measured along the width." },
      wasteField(10, "Extra for cuts. L-shaped rooms often need 10–15% for flooring."),
    ],
    compute: (v) => {
      const L = pos(v.length);
      const W = pos(v.width);
      const nl = Math.min(pos(v.notchLength), L);
      const nw = Math.min(pos(v.notchWidth), W);
      const area = L * W - nl * nw;
      return [
        { key: "area", label: "Floor area", value: area, dim: "area", decimals: 1, primary: true },
        { key: "areaWithWaste", label: "Area to order (incl. waste)", value: withWaste(area, v.waste), dim: "area", decimals: 1 },
        { key: "perimeter", label: "Perimeter", value: 2 * (L + W), dim: "length", decimals: 1 },
        { key: "sectionA", label: "Section A (full-width part)", value: (L - nl) * W, dim: "area", decimals: 1 },
        { key: "sectionB", label: "Section B (narrow part)", value: nl * (W - nw), dim: "area", decimals: 1 },
      ];
    },
  },
  {
    slug: "cubic-yard-calculator",
    fields: [
      shapeSelect("shape", ["Rectangle or square", "Circle"]),
      { id: "length", label: "Length", dim: "length", default: 10, min: 0, step: 0.5, showIf: (v) => v.shape === 0 },
      { id: "width", label: "Width", dim: "length", default: 10, min: 0, step: 0.5, showIf: (v) => v.shape === 0 },
      { id: "diameter", label: "Diameter", dim: "length", default: 10, min: 0, step: 0.5, showIf: (v) => v.shape === 1 },
      { id: "depth", label: "Depth or thickness", dim: "smallLength", default: 4, min: 0, step: 0.5, help: "Mulch: 2–3 in. Gravel paths: 3–4 in. Concrete slabs: 4 in." },
      wasteField(5, "Extra for settling, compaction and uneven ground. 5–10% is typical."),
    ],
    compute: (v) => {
      const surface = v.shape === 1 ? Math.PI * (pos(v.diameter) / 2) ** 2 : pos(v.length) * pos(v.width);
      const cuFt = surface * (pos(v.depth) / 12);
      const cuYd = cuFt / CU_FT_PER_CU_YD;
      const orderYd = withWaste(cuYd, v.waste);
      return [
        { key: "cubicYardsOrder", label: "Cubic yards to order (incl. waste)", value: orderYd, dim: "cubicYards", decimals: 2, primary: true },
        { key: "cubicYards", label: "Exact volume", value: cuYd, dim: "cubicYards", decimals: 2 },
        { key: "cubicFeet", label: "Volume in cubic feet", value: cuFt, dim: "volume", decimals: 1 },
        { key: "bags2", label: "2 cu ft bags (if buying bagged)", value: ceil(orderYd * CU_FT_PER_CU_YD / 2), unit: "bags", format: "integer" },
        { key: "surfaceArea", label: "Surface area covered", value: surface, dim: "area", decimals: 1 },
      ];
    },
  },
  {
    slug: "cubic-feet-calculator",
    fields: [
      shapeSelect("shape", ["Box (rectangular)", "Cylinder"]),
      { id: "length", label: "Length", dim: "length", default: 4, min: 0, step: 0.25, showIf: (v) => v.shape === 0 },
      { id: "width", label: "Width", dim: "length", default: 2, min: 0, step: 0.25, showIf: (v) => v.shape === 0 },
      { id: "diameter", label: "Diameter", dim: "length", default: 2, min: 0, step: 0.25, showIf: (v) => v.shape === 1 },
      { id: "height", label: "Height or depth", dim: "length", default: 3, min: 0, step: 0.25, help: "Use decimal feet: 6 in = 0.5 ft, 9 in = 0.75 ft." },
      { id: "quantity", label: "How many identical items?", default: 1, min: 1, step: 1, suffix: "items" },
    ],
    compute: (v) => {
      const base = v.shape === 1 ? Math.PI * (pos(v.diameter) / 2) ** 2 : pos(v.length) * pos(v.width);
      const each = base * pos(v.height);
      const total = each * Math.max(1, Math.round(pos(v.quantity)) || 1);
      return [
        { key: "cubicFeet", label: "Total volume", value: total, dim: "volume", decimals: 2, primary: true },
        { key: "cubicYards", label: "Total in cubic yards", value: total / CU_FT_PER_CU_YD, dim: "cubicYards", decimals: 3 },
        { key: "gallons", label: "Liquid capacity", value: total * GAL_PER_CU_FT, dim: "liquid", decimals: 1 },
        { key: "cubicFeetEach", label: "Volume of each item", value: each, dim: "volume", decimals: 2 },
      ];
    },
  },
  {
    slug: "perimeter-calculator",
    fields: [
      shapeSelect("shape", ["Rectangle or square", "Circle", "Triangle"]),
      { id: "length", label: "Length", dim: "length", default: 20, min: 0, step: 0.5, showIf: isRect },
      { id: "width", label: "Width", dim: "length", default: 12, min: 0, step: 0.5, showIf: isRect },
      { id: "diameter", label: "Diameter", dim: "length", default: 10, min: 0, step: 0.5, showIf: isCircle },
      { id: "sideA", label: "Side A", dim: "length", default: 12, min: 0, step: 0.5, showIf: isTriangle },
      { id: "sideB", label: "Side B", dim: "length", default: 16, min: 0, step: 0.5, showIf: isTriangle },
      { id: "sideC", label: "Side C", dim: "length", default: 20, min: 0, step: 0.5, showIf: isTriangle },
    ],
    compute: (v) => {
      let perimeter: number;
      let area: number;
      if (v.shape === 1) {
        perimeter = Math.PI * pos(v.diameter);
        area = Math.PI * (pos(v.diameter) / 2) ** 2;
      } else if (v.shape === 2) {
        const [a, b, c] = [pos(v.sideA), pos(v.sideB), pos(v.sideC)];
        area = heron(a, b, c);
        perimeter = area > 0 ? a + b + c : 0;
      } else {
        perimeter = 2 * (pos(v.length) + pos(v.width));
        area = pos(v.length) * pos(v.width);
      }
      return [
        { key: "perimeter", label: v.shape === 1 ? "Circumference" : "Perimeter", value: perimeter, dim: "length", decimals: 2, primary: true },
        { key: "area", label: "Enclosed area", value: area, dim: "area", decimals: 1 },
        { key: "perimeterYards", label: "Perimeter in yards", value: perimeter / 3, unit: "yd", decimals: 2 },
      ];
    },
  },
  {
    slug: "linear-feet-calculator",
    fields: [
      { id: "qty1", label: "Group 1: number of pieces", default: 6, min: 0, step: 1, suffix: "pcs" },
      { id: "len1", label: "Group 1: length of each piece", dim: "length", default: 8, min: 0, step: 0.25, help: "Use decimal feet: 3 ft 6 in = 3.5 ft." },
      { id: "qty2", label: "Group 2: number of pieces", default: 0, min: 0, step: 1, suffix: "pcs", help: "Optional. Leave at 0 if not used." },
      { id: "len2", label: "Group 2: length of each piece", dim: "length", default: 0, min: 0, step: 0.25 },
      { id: "qty3", label: "Group 3: number of pieces", default: 0, min: 0, step: 1, suffix: "pcs", help: "Optional. Leave at 0 if not used." },
      { id: "len3", label: "Group 3: length of each piece", dim: "length", default: 0, min: 0, step: 0.25 },
      {
        id: "stock",
        label: "Stock length sold at the store",
        type: "select",
        default: 12,
        options: STOCK_LENGTHS.map((ft) => ({ label: `${ft} ft (${(ft * 0.3048).toFixed(2)} m)`, value: ft })),
      },
      wasteField(10, "Extra for miter cuts, splices and defects. Trim usually needs 10–15%."),
      { id: "price", label: "Price per linear foot (optional)", dim: "pricePerLength", default: 0, min: 0, step: 0.05, help: "Leave at 0 to skip the cost estimate." },
    ],
    compute: (v) => {
      const total = pos(v.qty1) * pos(v.len1) + pos(v.qty2) * pos(v.len2) + pos(v.qty3) * pos(v.len3);
      const order = withWaste(total, v.waste);
      const results: ResultItem[] = [
        { key: "linearFeet", label: "Total linear feet", value: total, dim: "length", decimals: 1, primary: true },
        { key: "linearFeetWithWaste", label: "Linear feet to buy (incl. waste)", value: order, dim: "length", decimals: 1 },
        { key: "stockPieces", label: "Stock pieces to buy", value: ceil(safeDiv(order, v.stock)), unit: "pieces", format: "integer" },
        { key: "yards", label: "Total in yards", value: total / 3, unit: "yd", decimals: 2 },
      ];
      if (v.price > 0) {
        results.push({ key: "cost", label: "Estimated cost", value: order * v.price, format: "currency" });
      }
      return results;
    },
  },
  {
    slug: "square-feet-to-square-yards-calculator",
    fields: [
      {
        id: "mode",
        label: "What do you know?",
        type: "select",
        default: 0,
        options: [
          { label: "The area in square feet", value: 0 },
          { label: "Length and width in feet", value: 1 },
        ],
      },
      { id: "sqft", label: "Area", default: 450, min: 0, step: 1, suffix: "sq ft", showIf: (v) => v.mode === 0 },
      { id: "length", label: "Length", default: 12, min: 0, step: 0.5, suffix: "ft", showIf: (v) => v.mode === 1 },
      { id: "width", label: "Width", default: 15, min: 0, step: 0.5, suffix: "ft", showIf: (v) => v.mode === 1 },
      wasteField(0, "Optional. Add 10% or more when ordering carpet to allow for seams and pattern matching."),
    ],
    compute: (v) => {
      const sqft = v.mode === 1 ? pos(v.length) * pos(v.width) : pos(v.sqft);
      const sqyd = sqft / SQ_FT_PER_SQ_YD;
      return [
        { key: "squareYards", label: "Square yards", value: sqyd, unit: "sq yd", decimals: 2, primary: true },
        { key: "squareYardsOrder", label: "Square yards incl. waste", value: withWaste(sqyd, v.waste), unit: "sq yd", decimals: 2 },
        { key: "squareFeet", label: "Square feet", value: sqft, unit: "sq ft", decimals: 1 },
        { key: "squareMetres", label: "Square metres", value: sqft * SQ_M_PER_SQ_FT, unit: "m²", decimals: 2 },
      ];
    },
  },
  {
    slug: "board-foot-calculator",
    fields: [
      { id: "thickness", label: "Thickness", dim: "smallLength", default: 1, min: 0, step: 0.25, help: "Hardwood is sold by quarters: 4/4 = 1 in, 5/4 = 1.25 in, 8/4 = 2 in." },
      { id: "width", label: "Width", dim: "smallLength", default: 6, min: 0, step: 0.25 },
      { id: "length", label: "Length", dim: "length", default: 8, min: 0, step: 0.5 },
      { id: "quantity", label: "Number of boards", default: 10, min: 1, step: 1, suffix: "boards" },
      wasteField(15, "Rough hardwood loses wood to knots, checks and planing. 15–30% is common."),
      { id: "price", label: "Price per board foot", default: 6, min: 0, step: 0.25, prefix: "$", help: "Ask your lumber yard; set to 0 to skip the cost." },
    ],
    compute: (v) => {
      const each = (pos(v.thickness) * pos(v.width) * pos(v.length)) / 12;
      const total = each * pos(v.quantity);
      const order = withWaste(total, v.waste);
      return [
        { key: "boardFeet", label: "Total board feet", value: total, unit: "board ft", decimals: 2, primary: true },
        { key: "boardFeetWithWaste", label: "Board feet to buy (incl. waste)", value: order, unit: "board ft", decimals: 2 },
        { key: "boardFeetEach", label: "Board feet per board", value: each, unit: "board ft", decimals: 2 },
        { key: "cost", label: "Estimated cost", value: order * pos(v.price), format: "currency" },
        { key: "cubicFeet", label: "Volume", value: total / 12, dim: "volume", decimals: 2 },
      ];
    },
  },
  {
    slug: "circle-triangle-area-calculator",
    fields: [
      shapeSelect("shape", ["Circle", "Triangle (base and height)", "Triangle (three sides)"]),
      { id: "diameter", label: "Diameter", dim: "length", default: 10, min: 0, step: 0.5, help: "Twice the radius: measure straight across through the centre.", showIf: (v) => v.shape === 0 },
      { id: "base", label: "Base", dim: "length", default: 10, min: 0, step: 0.5, showIf: (v) => v.shape === 1 },
      { id: "height", label: "Height", dim: "length", default: 6, min: 0, step: 0.5, help: "Measured at a right angle from the base to the opposite point.", showIf: (v) => v.shape === 1 },
      { id: "sideA", label: "Side A", dim: "length", default: 6, min: 0, step: 0.5, showIf: (v) => v.shape === 2 },
      { id: "sideB", label: "Side B", dim: "length", default: 8, min: 0, step: 0.5, showIf: (v) => v.shape === 2 },
      { id: "sideC", label: "Side C", dim: "length", default: 10, min: 0, step: 0.5, showIf: (v) => v.shape === 2 },
    ],
    compute: (v) => {
      if (v.shape === 1) {
        const area = 0.5 * pos(v.base) * pos(v.height);
        return [
          { key: "area", label: "Triangle area", value: area, dim: "area", decimals: 2, primary: true },
          { key: "squareYards", label: "Area in square yards", value: area / SQ_FT_PER_SQ_YD, unit: "sq yd", decimals: 2 },
        ];
      }
      if (v.shape === 2) {
        const [a, b, c] = [pos(v.sideA), pos(v.sideB), pos(v.sideC)];
        const area = heron(a, b, c);
        return [
          { key: "area", label: "Triangle area", value: area, dim: "area", decimals: 2, primary: true, help: area ? undefined : "These sides cannot form a triangle: the two shorter sides must add up to more than the longest." },
          { key: "perimeter", label: "Perimeter", value: area > 0 ? a + b + c : 0, dim: "length", decimals: 2 },
          { key: "squareYards", label: "Area in square yards", value: area / SQ_FT_PER_SQ_YD, unit: "sq yd", decimals: 2 },
        ];
      }
      const d = pos(v.diameter);
      const area = Math.PI * (d / 2) ** 2;
      return [
        { key: "area", label: "Circle area", value: area, dim: "area", decimals: 2, primary: true },
        { key: "circumference", label: "Circumference", value: Math.PI * d, dim: "length", decimals: 2 },
        { key: "radius", label: "Radius", value: d / 2, dim: "length", decimals: 2 },
        { key: "squareYards", label: "Area in square yards", value: area / SQ_FT_PER_SQ_YD, unit: "sq yd", decimals: 2 },
      ];
    },
  },
  {
    slug: "unit-converter",
    fields: [
      { id: "value", label: "Value to convert", default: 10, min: 0, step: 0.01 },
      { id: "from", label: "From", type: "select", default: 1, options: unitOptions },
      { id: "to", label: "To", type: "select", default: 5, options: unitOptions },
    ],
    compute: (v) => {
      const from = LENGTH_UNITS[v.from] ?? LENGTH_UNITS[1];
      const to = LENGTH_UNITS[v.to] ?? LENGTH_UNITS[5];
      const inches = pos(v.value) * from.inches;
      const inUnit = (u: (typeof LENGTH_UNITS)[number]) => inches / u.inches;
      const feet = inches / 12;
      const wholeFeet = Math.floor(feet + 1e-9);
      return [
        { key: "converted", label: `Result in ${to.label.toLowerCase()}`, value: inUnit(to), unit: to.short, decimals: 4, primary: true },
        { key: "inches", label: "Inches", value: inches, unit: "in", decimals: 3 },
        { key: "feet", label: "Feet", value: feet, unit: "ft", decimals: 4 },
        { key: "wholeFeet", label: "Feet and inches: feet", value: wholeFeet, unit: "ft", format: "integer" },
        { key: "remainingInches", label: "Feet and inches: inches", value: Math.max(0, inches - wholeFeet * 12), unit: "in", decimals: 2 },
        { key: "yards", label: "Yards", value: inUnit(LENGTH_UNITS[2]), unit: "yd", decimals: 4 },
        { key: "millimetres", label: "Millimetres", value: inUnit(LENGTH_UNITS[3]), unit: "mm", decimals: 1 },
        { key: "centimetres", label: "Centimetres", value: inUnit(LENGTH_UNITS[4]), unit: "cm", decimals: 2 },
        { key: "metres", label: "Metres", value: inUnit(LENGTH_UNITS[5]), unit: "m", decimals: 4 },
      ];
    },
  },
  {
    slug: "waste-percentage-calculator",
    fields: [
      { id: "needed", label: "Material needed (exact)", default: 240, min: 0, step: 1, suffix: "units", help: "Any unit: sq ft, linear ft, tiles, boards. Use the measured amount, before waste." },
      wasteField(10, "Typical: 5–10% simple layouts, 15% diagonal or herringbone, 20%+ for large-format or patterned tile."),
      { id: "packSize", label: "Units per box or bundle", default: 22.5, min: 0, step: 0.5, suffix: "units", help: "E.g. sq ft per carton of flooring. Use 1 if sold individually." },
      { id: "packPrice", label: "Price per box (optional)", default: 0, min: 0, step: 0.5, prefix: "$", help: "Leave at 0 to skip the cost." },
    ],
    compute: (v) => {
      const needed = pos(v.needed);
      const order = withWaste(needed, v.waste);
      const pack = pos(v.packSize) || 1;
      const packs = ceil(order / pack);
      const bought = packs * pack;
      const results: ResultItem[] = [
        { key: "orderAmount", label: "Amount to order", value: order, unit: "units", decimals: 1, primary: true },
        { key: "extra", label: "Extra for waste", value: order - needed, unit: "units", decimals: 1 },
        { key: "packs", label: "Boxes or bundles to buy", value: packs, unit: "boxes", format: "integer" },
        { key: "totalBought", label: "Total you will receive", value: bought, unit: "units", decimals: 1 },
        { key: "actualOverage", label: "Actual overage after rounding up", value: safeDiv(bought - needed, needed) * 100, unit: "%", decimals: 1 },
      ];
      if (v.packPrice > 0) {
        results.push({ key: "cost", label: "Estimated cost", value: packs * v.packPrice, format: "currency" });
      }
      return results;
    },
  },
];
