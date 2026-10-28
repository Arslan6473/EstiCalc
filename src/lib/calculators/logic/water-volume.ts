import type { CalculatorLogic } from "../types";
import { safeDiv, shapeSelect } from "../helpers";

const GAL_PER_CU_FT = 7.48052;
const CU_IN_PER_GAL = 231;
const CU_IN_PER_CU_FT = 1728;
const LB_PER_GAL_WATER = 8.34;

const pos = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

/** Wetted cross-section of a horizontal cylinder of radius r filled to depth h. */
function circularSegment(r: number, h: number) {
  if (r <= 0 || h <= 0) return 0;
  if (h >= 2 * r) return Math.PI * r * r;
  return r * r * Math.acos((r - h) / r) - (r - h) * Math.sqrt(2 * r * h - h * h);
}

export const logic: CalculatorLogic[] = [
  {
    slug: "pool-volume-calculator",
    fields: [
      shapeSelect("shape", ["Rectangle", "Round", "Oval"]),
      { id: "length", label: "Length", dim: "length", default: 32, min: 0, step: 0.5, showIf: (v) => v.shape !== 1 },
      { id: "width", label: "Width", dim: "length", default: 16, min: 0, step: 0.5, showIf: (v) => v.shape !== 1 },
      { id: "diameter", label: "Diameter", dim: "length", default: 24, min: 0, step: 0.5, showIf: (v) => v.shape === 1 },
      { id: "shallow", label: "Water depth at shallow end", dim: "length", default: 3.5, min: 0, step: 0.25, help: "Measure to the water line, not the top of the wall." },
      { id: "deep", label: "Water depth at deep end", dim: "length", default: 6, min: 0, step: 0.25, help: "For a flat-bottom or above-ground pool, enter the same depth twice." },
      {
        id: "flow",
        label: "Hose flow rate",
        default: 8,
        min: 0,
        step: 0.5,
        suffix: "US gal/min",
        help: "Time how long your hose takes to fill a 5-gallon bucket: 5 ÷ minutes = gal/min. 1 gal/min ≈ 3.8 L/min.",
      },
    ],
    compute: (v) => {
      const surface =
        v.shape === 1
          ? Math.PI * (pos(v.diameter) / 2) ** 2
          : v.shape === 2
            ? Math.PI * (pos(v.length) / 2) * (pos(v.width) / 2)
            : pos(v.length) * pos(v.width);
      const avgDepth = (pos(v.shallow) + pos(v.deep)) / 2;
      const cuFt = surface * avgDepth;
      const gallons = cuFt * GAL_PER_CU_FT;
      return [
        { key: "gallons", label: "Pool volume", value: gallons, dim: "liquid", decimals: 0, primary: true },
        { key: "cubicFeet", label: "Volume in cubic feet", value: cuFt, dim: "volume", decimals: 0 },
        { key: "surfaceArea", label: "Water surface area", value: surface, dim: "area", decimals: 0 },
        { key: "averageDepth", label: "Average depth", value: avgDepth, dim: "length", decimals: 2 },
        { key: "fillHours", label: "Time to fill with a hose", value: safeDiv(gallons, pos(v.flow) * 60), unit: "hours", decimals: 1 },
      ];
    },
  },
  {
    slug: "water-tank-volume-calculator",
    fields: [
      shapeSelect("shape", ["Vertical cylinder", "Horizontal cylinder", "Rectangular"]),
      { id: "diameter", label: "Inside diameter", dim: "smallLength", default: 48, min: 0, step: 0.5, showIf: (v) => v.shape !== 2 },
      { id: "height", label: "Inside height", dim: "smallLength", default: 60, min: 0, step: 0.5, showIf: (v) => v.shape !== 1 },
      { id: "length", label: "Inside length", dim: "smallLength", default: 72, min: 0, step: 0.5, showIf: (v) => v.shape !== 0 },
      { id: "width", label: "Inside width", dim: "smallLength", default: 36, min: 0, step: 0.5, showIf: (v) => v.shape === 2 },
      {
        id: "level",
        label: "Current water depth",
        dim: "smallLength",
        default: 60,
        min: 0,
        step: 0.5,
        help: "Measured from the inside bottom. A value above the tank height counts as full.",
      },
    ],
    compute: (v) => {
      let capacityCuIn: number;
      let currentCuIn: number;
      if (v.shape === 1) {
        const r = pos(v.diameter) / 2;
        const L = pos(v.length);
        capacityCuIn = Math.PI * r * r * L;
        currentCuIn = circularSegment(r, pos(v.level)) * L;
      } else if (v.shape === 2) {
        const base = pos(v.length) * pos(v.width);
        capacityCuIn = base * pos(v.height);
        currentCuIn = base * Math.min(pos(v.level), pos(v.height));
      } else {
        const base = Math.PI * (pos(v.diameter) / 2) ** 2;
        capacityCuIn = base * pos(v.height);
        currentCuIn = base * Math.min(pos(v.level), pos(v.height));
      }
      const capacityGal = capacityCuIn / CU_IN_PER_GAL;
      const currentGal = currentCuIn / CU_IN_PER_GAL;
      return [
        { key: "capacityGallons", label: "Total tank capacity", value: capacityGal, dim: "liquid", decimals: 1, primary: true },
        { key: "currentGallons", label: "Water at current depth", value: currentGal, dim: "liquid", decimals: 1 },
        { key: "percentFull", label: "Tank fill level (by volume)", value: safeDiv(currentCuIn, capacityCuIn) * 100, unit: "%", decimals: 1 },
        { key: "capacityCubicFeet", label: "Capacity in cubic feet", value: capacityCuIn / CU_IN_PER_CU_FT, dim: "volume", decimals: 2 },
        { key: "waterWeight", label: "Weight of water at current depth", value: currentGal * LB_PER_GAL_WATER, dim: "weight", decimals: 0, help: "Fresh water weighs about 8.34 lb per US gallon (1 kg per litre)." },
      ];
    },
  },
  {
    slug: "pond-volume-calculator",
    fields: [
      shapeSelect("shape", ["Rectangle", "Circle", "Oval or irregular"]),
      { id: "length", label: "Length (longest point)", dim: "length", default: 12, min: 0, step: 0.5, showIf: (v) => v.shape !== 1 },
      { id: "width", label: "Width (widest point)", dim: "length", default: 8, min: 0, step: 0.5, showIf: (v) => v.shape !== 1 },
      { id: "diameter", label: "Diameter", dim: "length", default: 10, min: 0, step: 0.5, showIf: (v) => v.shape === 1 },
      {
        id: "avgDepth",
        label: "Average water depth",
        dim: "length",
        default: 1.5,
        min: 0,
        step: 0.25,
        help: "Take several depth readings across the pond and average them. Shelves and sloped sides lower the average.",
      },
      { id: "maxDepth", label: "Maximum depth", dim: "length", default: 2, min: 0, step: 0.25, help: "The deepest point, used to size the liner." },
      { id: "overlap", label: "Liner overlap per edge", dim: "length", default: 1, min: 0, step: 0.25, help: "Extra liner tucked under edging stones on each side. 1 ft (30 cm) is typical." },
    ],
    compute: (v) => {
      const L = v.shape === 1 ? pos(v.diameter) : pos(v.length);
      const W = v.shape === 1 ? pos(v.diameter) : pos(v.width);
      const surface = v.shape === 0 ? L * W : Math.PI * (L / 2) * (W / 2);
      const cuFt = surface * pos(v.avgDepth);
      const gallons = cuFt * GAL_PER_CU_FT;
      const extra = 2 * pos(v.maxDepth) + 2 * pos(v.overlap);
      const linerL = L > 0 ? L + extra : 0;
      const linerW = W > 0 ? W + extra : 0;
      return [
        { key: "gallons", label: "Pond volume", value: gallons, dim: "liquid", decimals: 0, primary: true },
        { key: "cubicFeet", label: "Volume in cubic feet", value: cuFt, dim: "volume", decimals: 1 },
        { key: "surfaceArea", label: "Water surface area", value: surface, dim: "area", decimals: 1 },
        { key: "linerLength", label: "Liner length", value: linerL, dim: "length", decimals: 1 },
        { key: "linerWidth", label: "Liner width", value: linerW, dim: "length", decimals: 1 },
        { key: "linerArea", label: "Liner area", value: linerL * linerW, dim: "area", decimals: 0 },
        { key: "pumpFlow", label: "Minimum pump flow per hour", value: gallons, dim: "liquid", decimals: 0, help: "Rule of thumb: circulate the full pond volume at least once an hour." },
      ];
    },
  },
];
