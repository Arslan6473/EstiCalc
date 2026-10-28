import type { CalculatorLogic, Field } from "../types";
import { ceil, safeDiv } from "../helpers";

/** ENERGY STAR room air conditioner sizing chart: [max sq ft, BTU/hr]. */
const AC_CHART: [number, number][] = [
  [150, 5000],
  [250, 6000],
  [300, 7000],
  [350, 8000],
  [400, 9000],
  [450, 10000],
  [550, 12000],
  [700, 14000],
  [1000, 18000],
  [1200, 21000],
  [1400, 23000],
  [1500, 24000],
  [2000, 30000],
  [2500, 34000],
];

/** Common room / window AC capacities sold in the US. */
const AC_SIZES = [5000, 6000, 7000, 8000, 9000, 10000, 12000, 14000, 15000, 18000, 21000, 24000, 25000, 28000, 30000, 34000, 36000];

export function acBaseBtu(area: number) {
  if (area <= 0) return 0;
  for (const [max, btu] of AC_CHART) if (area <= max) return btu;
  // Beyond the chart: scale the top row (about 13.6 BTU per sq ft).
  return (34000 * area) / 2500;
}

/** Ceiling fan blade span by area served: [max sq ft, min in, max in]. */
const FAN_CHART: [number, number, number][] = [
  [75, 29, 36],
  [144, 36, 42],
  [225, 44, 50],
  [400, 50, 54],
  [Infinity, 56, 72],
];

/** Standard rug sizes in feet [short, long]. */
const RUG_SIZES: [number, number][] = [
  [2, 3],
  [3, 5],
  [4, 6],
  [5, 7],
  [5, 8],
  [6, 9],
  [8, 10],
  [9, 12],
  [10, 14],
  [12, 15],
];

/** Bed mattress sizes in inches [width, length]. */
const BEDS: [number, number][] = [
  [38, 75], // twin
  [54, 75], // full
  [60, 80], // queen
  [76, 80], // king
  [72, 84], // California king
];

/** Target light levels by room [label, foot-candles used]. Last entry is custom. */
const LIGHT_LEVELS: [string, number][] = [
  ["Living room / family room (10–20 fc)", 15],
  ["Bedroom (10–20 fc)", 15],
  ["Dining room (30–40 fc)", 35],
  ["Kitchen — general (30–40 fc)", 35],
  ["Kitchen — work areas (70–80 fc)", 75],
  ["Bathroom (70–80 fc)", 75],
  ["Home office (about 50 fc)", 50],
  ["Hallway / stairs (5–10 fc)", 7.5],
  ["Garage / workshop (about 50 fc)", 50],
  ["Custom", 0],
];
const CUSTOM_LIGHT = LIGHT_LEVELS.length - 1;

/** Common ready-made curtain panel lengths in inches. */
const CURTAIN_LENGTHS = [63, 84, 95, 108, 120];

const windowFields = (n: number, count: number, w: number, h: number): Field[] => [
  { id: `w${n}Count`, label: `Window type ${n} — how many`, default: count, min: 0, step: 1, suffix: "windows", help: n > 1 ? "Leave at 0 if not used." : undefined },
  { id: `w${n}Width`, label: `Window type ${n} — width`, dim: "smallLength", default: w, min: 0, step: 0.5, showIf: (v) => v[`w${n}Count`] > 0 },
  { id: `w${n}Height`, label: `Window type ${n} — height`, dim: "smallLength", default: h, min: 0, step: 0.5, showIf: (v) => v[`w${n}Count`] > 0 },
];

export const logic: CalculatorLogic[] = [
  {
    slug: "ac-btu-calculator",
    fields: [
      { id: "length", label: "Room length", dim: "length", default: 20, min: 0, step: 0.5 },
      { id: "width", label: "Room width", dim: "length", default: 14, min: 0, step: 0.5 },
      {
        id: "sun",
        label: "Sun exposure",
        type: "select",
        default: 0,
        options: [
          { label: "Average", value: 0 },
          { label: "Heavily shaded (−10%)", value: 1 },
          { label: "Very sunny (+10%)", value: 2 },
        ],
      },
      { id: "occupants", label: "People who regularly use the room", default: 2, min: 1, step: 1, suffix: "people", help: "Add 600 BTU for each person beyond two." },
      {
        id: "kitchen",
        label: "Is the room a kitchen?",
        type: "select",
        default: 0,
        options: [
          { label: "No", value: 0 },
          { label: "Yes (+4,000 BTU)", value: 1 },
        ],
      },
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const base = acBaseBtu(area);
      const sunFactor = v.sun === 1 ? 0.9 : v.sun === 2 ? 1.1 : 1;
      const people = Math.max(0, v.occupants - 2) * 600;
      const btu = area > 0 ? base * sunFactor + people + (v.kitchen ? 4000 : 0) : 0;
      const suggested = btu > 0 ? AC_SIZES.find((s) => s >= btu) ?? ceil(btu / 1000) * 1000 : 0;
      return [
        { key: "btu", label: "Cooling capacity needed", value: btu, unit: "BTU/hr", format: "integer", primary: true },
        { key: "suggested", label: "Next common unit size", value: suggested, unit: "BTU/hr", format: "integer" },
        { key: "baseBtu", label: "Base capacity for room size", value: base, unit: "BTU/hr", format: "integer" },
        { key: "tons", label: "Capacity in tons", value: btu / 12000, unit: "tons", decimals: 2 },
        { key: "area", label: "Room area", value: area, dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "room-heating-calculator",
    fields: [
      { id: "length", label: "Room length", dim: "length", default: 15, min: 0, step: 0.5 },
      { id: "width", label: "Room width", dim: "length", default: 12, min: 0, step: 0.5 },
      { id: "height", label: "Ceiling height", dim: "length", default: 8, min: 6, step: 0.5, help: "The rule of thumb assumes 8 ft (2.4 m); taller rooms are scaled up." },
      {
        id: "climate",
        label: "Climate",
        type: "select",
        default: 40,
        options: [
          { label: "Warm — mild winters (30 BTU/sq ft)", value: 30 },
          { label: "Moderate (40 BTU/sq ft)", value: 40 },
          { label: "Cold (50 BTU/sq ft)", value: 50 },
          { label: "Very cold (60 BTU/sq ft)", value: 60 },
        ],
      },
      {
        id: "insulation",
        label: "Insulation and windows",
        type: "select",
        default: 1,
        options: [
          { label: "Well insulated, newer windows (−10%)", value: 0.9 },
          { label: "Average", value: 1 },
          { label: "Poorly insulated, drafty (+20%)", value: 1.2 },
        ],
      },
      { id: "heaterWatts", label: "Heater size", default: 1500, min: 100, step: 100, suffix: "W", help: "1,500 W is the usual maximum for a plug-in heater on a 120 V outlet." },
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const heightFactor = Math.max(v.height, 0) / 8;
      const btu = area * v.climate * heightFactor * v.insulation;
      const watts = btu / 3.412;
      return [
        { key: "btu", label: "Heating capacity needed", value: btu, unit: "BTU/hr", format: "integer", primary: true },
        { key: "watts", label: "Equivalent electric heat", value: watts, unit: "W", format: "integer" },
        { key: "heaters", label: "Heaters of the size entered", value: v.heaterWatts > 0 ? ceil(watts / v.heaterWatts) : 0, unit: "heaters", format: "integer" },
        { key: "btuPerSqFt", label: "Heat per sq ft", value: safeDiv(btu, area), unit: "BTU/hr per sq ft", decimals: 1 },
        { key: "area", label: "Room area", value: area, dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "ceiling-fan-size-calculator",
    fields: [
      { id: "length", label: "Room length", dim: "length", default: 16, min: 0, step: 0.5 },
      { id: "width", label: "Room width", dim: "length", default: 14, min: 0, step: 0.5 },
      { id: "height", label: "Ceiling height", dim: "length", default: 10, min: 7, step: 0.5 },
      { id: "fanHeight", label: "Fan height without downrod", dim: "smallLength", default: 12, min: 0, step: 0.5, help: "Ceiling to the underside of the blades with the short mount supplied — on the spec sheet, often 10–14 in." },
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const fans = area > 0 ? Math.max(1, ceil(area / 600)) : 0;
      const perFan = safeDiv(area, fans);
      const [, minSpan, maxSpan] = FAN_CHART.find(([max]) => perFan <= max)!;
      const downrod = Math.max(0, (v.height - 8.5) * 12 - v.fanHeight);
      const bladeHeight = v.height - (v.fanHeight + downrod) / 12;
      return [
        { key: "spanMin", label: "Recommended blade span — from", value: area > 0 ? minSpan : 0, dim: "smallLength", decimals: 0, primary: true },
        { key: "spanMax", label: "Recommended blade span — up to", value: area > 0 ? maxSpan : 0, dim: "smallLength", decimals: 0 },
        { key: "fans", label: "Number of fans", value: fans, unit: "fans", format: "integer" },
        { key: "downrod", label: "Downrod for about 8.5 ft blade height", value: downrod, dim: "smallLength", decimals: 0 },
        { key: "bladeHeight", label: "Blade height above floor", value: bladeHeight, dim: "length", decimals: 2, help: "Keep blades at least 7 ft (2.1 m) above the floor." },
        { key: "area", label: "Room area", value: area, dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "light-lumens-calculator",
    fields: [
      { id: "length", label: "Room length", dim: "length", default: 14, min: 0, step: 0.5 },
      { id: "width", label: "Room width", dim: "length", default: 12, min: 0, step: 0.5 },
      {
        id: "roomType",
        label: "Room type",
        type: "select",
        default: 0,
        options: LIGHT_LEVELS.map(([label], value) => ({ label, value })),
        help: "fc = foot-candles, or lumens per square foot.",
      },
      { id: "customFc", label: "Target foot-candles", default: 30, min: 1, step: 1, suffix: "fc", showIf: (v) => v.roomType === CUSTOM_LIGHT },
      { id: "bulbLumens", label: "Lumens per bulb", default: 800, min: 50, step: 50, suffix: "lm", help: "A 60 W-equivalent LED gives about 800 lumens; a 100 W-equivalent about 1,600." },
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const fc = v.roomType === CUSTOM_LIGHT ? v.customFc : LIGHT_LEVELS[v.roomType]?.[1] ?? 0;
      const lumens = area * fc;
      return [
        { key: "lumens", label: "Total lumens needed", value: lumens, unit: "lumens", format: "integer", primary: true },
        { key: "bulbs", label: "Bulbs of the size entered", value: v.bulbLumens > 0 ? ceil(lumens / v.bulbLumens) : 0, unit: "bulbs", format: "integer" },
        { key: "footCandles", label: "Target light level", value: fc, unit: "foot-candles", decimals: 1 },
        { key: "area", label: "Room area", value: area, dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "rug-size-calculator",
    fields: [
      {
        id: "use",
        label: "Where is the rug going?",
        type: "select",
        default: 0,
        options: [
          { label: "Room — leave a floor border", value: 0 },
          { label: "Under a dining table", value: 1 },
          { label: "Under a bed", value: 2 },
        ],
      },
      { id: "roomLength", label: "Room length", dim: "length", default: 15, min: 0, step: 0.5, showIf: (v) => v.use === 0 },
      { id: "roomWidth", label: "Room width", dim: "length", default: 12, min: 0, step: 0.5, showIf: (v) => v.use === 0 },
      { id: "border", label: "Bare floor border on each side", dim: "smallLength", default: 18, min: 0, step: 1, help: "Designers usually leave 12–24 in (30–60 cm); 18 in is a common target.", showIf: (v) => v.use === 0 },
      { id: "tableLength", label: "Table length", dim: "length", default: 6, min: 0, step: 0.25, showIf: (v) => v.use === 1 },
      { id: "tableWidth", label: "Table width", dim: "length", default: 3.5, min: 0, step: 0.25, showIf: (v) => v.use === 1 },
      { id: "chairRoom", label: "Rug beyond table edge", dim: "smallLength", default: 24, min: 0, step: 1, help: "At least 24 in (60 cm) so chair legs stay on the rug when pulled out.", showIf: (v) => v.use === 1 },
      {
        id: "bed",
        label: "Bed size",
        type: "select",
        default: 2,
        options: [
          { label: "Twin", value: 0 },
          { label: "Full / double", value: 1 },
          { label: "Queen", value: 2 },
          { label: "King", value: 3 },
          { label: "California king", value: 4 },
        ],
        showIf: (v) => v.use === 2,
      },
      { id: "bedReach", label: "Rug beyond bed sides and foot", dim: "smallLength", default: 24, min: 0, step: 1, help: "18–24 in (45–60 cm) gives a soft landing when you get up.", showIf: (v) => v.use === 2 },
    ],
    compute: (v) => {
      let a = 0;
      let b = 0;
      let cover = false;
      if (v.use === 1) {
        a = v.tableLength + (2 * v.chairRoom) / 12;
        b = v.tableWidth + (2 * v.chairRoom) / 12;
        cover = true;
      } else if (v.use === 2) {
        const [bw, bl] = BEDS[v.bed] ?? BEDS[2];
        a = (bw + 2 * v.bedReach) / 12; // across the bed
        b = ((2 / 3) * bl + v.bedReach) / 12; // under the lower two-thirds
        cover = true;
      } else {
        a = Math.max(0, v.roomLength - (2 * v.border) / 12);
        b = Math.max(0, v.roomWidth - (2 * v.border) / 12);
      }
      const long = Math.max(a, b);
      const short = Math.min(a, b);
      const fits = ([s, l]: [number, number]) => (cover ? s >= short - 1e-9 && l >= long - 1e-9 : s <= short + 1e-9 && l <= long + 1e-9);
      const candidates = RUG_SIZES.filter(fits);
      const pick = cover ? candidates[0] : candidates[candidates.length - 1];
      return [
        { key: "idealLength", label: "Ideal rug length", value: long, dim: "length", decimals: 1, primary: true },
        { key: "idealWidth", label: "Ideal rug width", value: short, dim: "length", decimals: 1 },
        { key: "standardLength", label: "Closest standard size — length", value: pick ? pick[1] : 0, dim: "length", decimals: 0, help: "0 means no standard size fits — consider a custom or bound broadloom rug." },
        { key: "standardWidth", label: "Closest standard size — width", value: pick ? pick[0] : 0, dim: "length", decimals: 0 },
        { key: "idealArea", label: "Ideal rug area", value: long * short, dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "curtain-size-calculator",
    fields: [
      { id: "windowWidth", label: "Window width (outside of trim)", dim: "smallLength", default: 48, min: 1, step: 0.5 },
      {
        id: "style",
        label: "Curtain length style",
        type: "select",
        default: 0,
        options: [
          { label: "Floor length — ½ in above floor", value: 0 },
          { label: "Kiss the floor", value: 1 },
          { label: "Break — 1 in on the floor", value: 2 },
          { label: "Puddle — 6 in on the floor", value: 3 },
          { label: "Sill length — ½ in above sill", value: 4 },
          { label: "Below sill — 4 in past the sill", value: 5 },
        ],
      },
      { id: "frameToFloor", label: "Top of window trim to floor", dim: "smallLength", default: 84, min: 1, step: 0.5, showIf: (v) => v.style <= 3 },
      { id: "windowHeight", label: "Window height (top of trim to sill)", dim: "smallLength", default: 60, min: 1, step: 0.5, showIf: (v) => v.style >= 4 },
      { id: "rodAbove", label: "Rod height above window trim", dim: "smallLength", default: 5, min: 0, step: 0.5, help: "4–6 in (10–15 cm) is typical; mount higher to make the window look taller." },
      { id: "rodExtension", label: "Rod extension past trim (each side)", dim: "smallLength", default: 6, min: 0, step: 0.5, help: "3–10 in (8–25 cm) lets open curtains clear the glass." },
      {
        id: "fullness",
        label: "Fullness",
        type: "select",
        default: 2,
        options: [
          { label: "1.5× — flat, tailored", value: 1.5 },
          { label: "2× — standard", value: 2 },
          { label: "2.5× — full", value: 2.5 },
          { label: "3× — sheers, very full", value: 3 },
        ],
      },
      { id: "panelWidth", label: "Width of one panel", dim: "smallLength", default: 50, min: 1, step: 1, help: "Ready-made panels are often 50–54 in (127–137 cm) wide." },
    ],
    compute: (v) => {
      const rod = v.windowWidth + 2 * v.rodExtension;
      const fabric = rod * v.fullness;
      let panels = v.panelWidth > 0 ? ceil(fabric / v.panelWidth) : 0;
      if (panels > 1 && panels % 2) panels += 1; // split evenly for a pair that opens in the middle
      const offsets = [-0.5, 0, 1, 6];
      const length = v.style <= 3 ? v.frameToFloor + v.rodAbove + offsets[v.style] : v.windowHeight + v.rodAbove + (v.style === 4 ? -0.5 : 4);
      const standard = CURTAIN_LENGTHS.find((l) => l >= length - 1e-9) ?? 0;
      return [
        { key: "length", label: "Finished curtain length", value: length, dim: "smallLength", decimals: 1, primary: true },
        { key: "standardLength", label: "Ready-made length to buy (hem to fit)", value: standard, dim: "smallLength", decimals: 0, help: "0 means longer than standard sizes — order custom or extra-long panels." },
        { key: "panels", label: "Panels needed", value: panels, unit: "panels", format: "integer" },
        { key: "rodLength", label: "Curtain rod length", value: rod, dim: "smallLength", decimals: 1 },
        { key: "fabricWidth", label: "Total curtain width for fullness", value: fabric, dim: "smallLength", decimals: 0 },
      ];
    },
  },
  {
    slug: "window-area-calculator",
    fields: [
      ...windowFields(1, 2, 36, 60),
      ...windowFields(2, 1, 24, 36),
      ...windowFields(3, 0, 72, 80),
      { id: "roomLength", label: "Room length (optional)", dim: "length", default: 14, min: 0, step: 0.5, help: "Used to compare window area with floor area. 0 to skip." },
      { id: "roomWidth", label: "Room width (optional)", dim: "length", default: 12, min: 0, step: 0.5 },
    ],
    compute: (v) => {
      let area = 0;
      let count = 0;
      for (const n of [1, 2, 3]) {
        const c = Math.max(0, v[`w${n}Count`]);
        count += c;
        area += (c * v[`w${n}Width`] * v[`w${n}Height`]) / 144;
      }
      const floor = v.roomLength * v.roomWidth;
      return [
        { key: "area", label: "Total window area", value: area, dim: "area", decimals: 1, primary: true },
        { key: "count", label: "Number of windows", value: count, unit: "windows", format: "integer" },
        { key: "pctFloor", label: "Window area as % of floor area", value: floor > 0 ? (area / floor) * 100 : 0, unit: "%", decimals: 1 },
        { key: "minGlazing", label: "IRC minimum glazing (8% of floor)", value: floor * 0.08, dim: "area", decimals: 1 },
        { key: "minVent", label: "IRC minimum openable area (4% of floor)", value: floor * 0.04, dim: "area", decimals: 1 },
        { key: "floorArea", label: "Floor area", value: floor, dim: "area", decimals: 0 },
      ];
    },
  },
];
