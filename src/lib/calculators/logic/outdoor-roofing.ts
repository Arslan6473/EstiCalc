import type { CalculatorLogic, ResultItem, SelectField, Values } from "../types";
import { ceil, safeDiv, wasteField, withWaste } from "../helpers";

/** Roof slope factor: sloped length (or area) per unit of horizontal run (or plan area). */
const pitchMultiplier = (risePer12: number) => Math.sqrt(1 + (risePer12 / 12) ** 2);

const CU_IN_PER_CU_FT = 1728;

/** Volume of concrete around one post, in cu ft (round hole minus square post). */
function concretePerPost(holeDiaIn: number, depthIn: number, postSideIn: number) {
  const hole = Math.PI * (holeDiaIn / 2) ** 2 * depthIn;
  const post = postSideIn ** 2 * depthIn;
  return Math.max(0, hole - post) / CU_IN_PER_CU_FT;
}

/** Yield in cu ft of common premixed concrete bag sizes. */
function bagSelect(defaultYield = 0.6): SelectField {
  return {
    id: "bagYield",
    label: "Concrete bag size",
    type: "select",
    default: defaultYield,
    options: [
      { label: "50 lb fast-setting (≈0.375 cu ft)", value: 0.375 },
      { label: "60 lb (≈0.45 cu ft)", value: 0.45 },
      { label: "80 lb (≈0.60 cu ft)", value: 0.6 },
    ],
  };
}

/** Next standard lumber length (even feet, 8 ft minimum) at or above a cut length. */
const nextLumberLength = (ft: number) => Math.max(8, ceil(ft / 2) * 2);

const pitchField = (def = 6) => ({
  id: "pitch",
  label: "Roof pitch (rise per 12 in of run)",
  default: def,
  min: 0,
  max: 24,
  step: 0.5,
  suffix: "/12",
  help: "A 6/12 roof rises 6 in for every 12 in of horizontal run.",
});

/**
 * Approximate maximum deck joist spans (ft), No. 2 grade, 40 psf live + 10 psf dead,
 * based on IRC Table R507.6. Index: [species][size][spacing].
 */
const JOIST_SPANS: Record<number, Record<number, Record<number, number>>> = {
  // Southern pine
  0: {
    6: { 12: 9 + 11 / 12, 16: 9, 24: 7 + 7 / 12 },
    8: { 12: 13 + 1 / 12, 16: 11 + 10 / 12, 24: 9 + 8 / 12 },
    10: { 12: 16 + 2 / 12, 16: 14, 24: 11 + 5 / 12 },
    12: { 12: 18, 16: 16 + 6 / 12, 24: 13 + 6 / 12 },
  },
  // Douglas fir-larch, hem-fir, spruce-pine-fir
  1: {
    6: { 12: 9 + 6 / 12, 16: 8 + 8 / 12, 24: 7 + 2 / 12 },
    8: { 12: 12 + 6 / 12, 16: 11 + 1 / 12, 24: 9 + 1 / 12 },
    10: { 12: 15 + 8 / 12, 16: 13 + 7 / 12, 24: 11 + 1 / 12 },
    12: { 12: 18, 16: 15 + 9 / 12, 24: 12 + 10 / 12 },
  },
  // Redwood, western cedars, ponderosa pine, red pine
  2: {
    6: { 12: 8 + 10 / 12, 16: 8, 24: 7 },
    8: { 12: 11 + 8 / 12, 16: 10 + 7 / 12, 24: 8 + 8 / 12 },
    10: { 12: 14 + 11 / 12, 16: 13, 24: 10 + 7 / 12 },
    12: { 12: 17 + 5 / 12, 16: 15 + 1 / 12, 24: 12 + 4 / 12 },
  },
};

const shingleArea = (v: Values) => (v.mode === 1 ? v.length * v.width * pitchMultiplier(v.pitch) : v.roofArea);

export const logic: CalculatorLogic[] = [
  {
    slug: "fence-calculator",
    fields: [
      { id: "length", label: "Total fence length", dim: "length", default: 100, min: 0, step: 1 },
      { id: "height", label: "Fence height", dim: "length", default: 6, min: 1, max: 12, step: 0.5 },
      {
        id: "spacing",
        label: "Post spacing (on center)",
        dim: "length",
        default: 8,
        min: 2,
        max: 10,
        step: 0.5,
        help: "6–8 ft is typical. Prefab panels set the spacing — usually 8 ft.",
      },
      {
        id: "style",
        label: "Fence style",
        type: "select",
        default: 0,
        options: [
          { label: "Pickets or boards on rails", value: 0 },
          { label: "Prefabricated panels", value: 1 },
        ],
      },
      { id: "corners", label: "Corners", default: 0, min: 0, step: 1, help: "Each corner adds a post because sections restart there." },
      { id: "gates", label: "Gates", default: 1, min: 0, step: 1 },
      { id: "gateWidth", label: "Gate width", dim: "length", default: 4, min: 0, step: 0.5, showIf: (v) => v.gates > 0 },
      {
        id: "rails",
        label: "Rails per section",
        default: 3,
        min: 2,
        max: 4,
        step: 1,
        help: "2 rails for fences up to about 4 ft, 3 rails for 5–6 ft fences.",
        showIf: (v) => v.style === 0,
      },
      { id: "picketWidth", label: "Picket width (actual)", dim: "smallLength", default: 5.5, min: 1, step: 0.25, help: "A 1×6 board is 5½ in wide.", showIf: (v) => v.style === 0 },
      { id: "picketGap", label: "Gap between pickets", dim: "smallLength", default: 0, min: 0, step: 0.125, help: "0 for a privacy fence.", showIf: (v) => v.style === 0 },
      { id: "postSize", label: "Post size (actual)", dim: "smallLength", default: 3.5, min: 1, step: 0.5, help: "A 4×4 post is 3½ in square; a 6×6 is 5½ in." },
      { id: "holeDiameter", label: "Post hole diameter", dim: "smallLength", default: 10, min: 4, step: 1, help: "About 3× the post width." },
      { id: "holeDepth", label: "Post embedment depth", dim: "smallLength", default: 24, min: 12, step: 1, help: "At least ⅓ of the post's above-ground height, and below the frost line where required." },
      bagSelect(),
      wasteField(10, "Extra pickets, rails and concrete for bad boards, mistakes and spillage."),
    ],
    compute: (v) => {
      const gateTotal = v.gates > 0 ? v.gates * v.gateWidth : 0;
      const net = Math.max(0, v.length - gateTotal);
      const bays = ceil(safeDiv(net, v.spacing));
      const posts = net > 0 ? bays + 1 + v.corners + v.gates : 0;
      const sections = Math.max(0, posts - 1 - v.gates);
      const perPost = concretePerPost(v.holeDiameter, v.holeDepth, v.postSize);
      const concrete = withWaste(posts * perPost, v.waste);
      const results: ResultItem[] = [
        { key: "posts", label: "Fence posts", value: posts, unit: "posts", format: "integer", primary: true },
        { key: "postLength", label: "Post length (height + embedment)", value: v.height + v.holeDepth / 12, dim: "length", decimals: 1 },
        { key: "sections", label: "Fence sections", value: sections, unit: "sections", format: "integer" },
      ];
      if (v.style === 1) {
        results.push({ key: "panels", label: "Fence panels", value: sections, unit: "panels", format: "integer" });
      } else {
        const pickets = withWaste(safeDiv(net * 12, v.picketWidth + v.picketGap), v.waste);
        results.push(
          { key: "rails", label: "Rails (one section long)", value: ceil(withWaste(sections * v.rails, v.waste)), unit: "rails", format: "integer" },
          { key: "pickets", label: "Pickets", value: ceil(pickets), unit: "pickets", format: "integer" },
        );
      }
      results.push(
        { key: "concrete", label: "Concrete for posts", value: concrete, dim: "volume", decimals: 2 },
        { key: "bags", label: "Concrete bags", value: ceil(safeDiv(concrete, v.bagYield)), unit: "bags", format: "integer" },
      );
      return results;
    },
  },
  {
    slug: "deck-boards-calculator",
    fields: [
      { id: "length", label: "Deck length (direction boards run)", dim: "length", default: 16, min: 0, step: 0.5 },
      { id: "width", label: "Deck width (across the boards)", dim: "length", default: 12, min: 0, step: 0.5 },
      { id: "boardWidth", label: "Board width (actual)", dim: "smallLength", default: 5.5, min: 1, step: 0.125, help: "5/4×6 and 2×6 boards are 5½ in wide." },
      { id: "gap", label: "Gap between boards", dim: "smallLength", default: 0.1875, min: 0, step: 0.0625, help: "⅛–¼ in is common; follow the board maker's spacing." },
      {
        id: "boardLength",
        label: "Board length you will buy",
        type: "select",
        default: 16,
        options: [8, 10, 12, 16, 20].map((n) => ({ label: `${n} ft`, value: n })),
      },
      {
        id: "joistSpacing",
        label: "Joist spacing",
        type: "select",
        default: 16,
        options: [
          { label: "12 in on center", value: 12 },
          { label: "16 in on center", value: 16 },
          { label: "24 in on center", value: 24 },
        ],
      },
      wasteField(10, "Extra for end cuts, staggered joints and rejected boards. Use 15% for diagonal layouts."),
    ],
    compute: (v) => {
      const area = v.length * v.width;
      const rows = ceil(safeDiv(v.width * 12, v.boardWidth + v.gap));
      const linearFt = withWaste(rows * v.length, v.waste);
      const crossings = ceil(safeDiv(v.length * 12, v.joistSpacing)) + 1;
      const screws = withWaste(rows * crossings * 2, v.waste);
      return [
        { key: "boards", label: `Deck boards (${v.boardLength} ft)`, value: ceil(safeDiv(linearFt, v.boardLength)), unit: "boards", format: "integer", primary: true },
        { key: "rows", label: "Rows of boards", value: rows, unit: "rows", format: "integer" },
        { key: "linearFeet", label: "Decking incl. waste", value: linearFt, dim: "length", decimals: 0 },
        { key: "screws", label: "Deck screws (2 per joist)", value: ceil(screws), unit: "screws", format: "integer" },
        { key: "area", label: "Deck area", value: area, dim: "area", decimals: 0 },
      ];
    },
  },
  {
    slug: "deck-joists-calculator",
    fields: [
      { id: "length", label: "Deck length along the ledger/beam", dim: "length", default: 16, min: 0, step: 0.5 },
      { id: "span", label: "Joist span (ledger to beam)", dim: "length", default: 12, min: 0, step: 0.5 },
      {
        id: "spacing",
        label: "Joist spacing",
        type: "select",
        default: 16,
        options: [
          { label: "12 in on center", value: 12 },
          { label: "16 in on center", value: 16 },
          { label: "24 in on center", value: 24 },
        ],
      },
      {
        id: "size",
        label: "Joist size",
        type: "select",
        default: 10,
        options: [
          { label: "2×6", value: 6 },
          { label: "2×8", value: 8 },
          { label: "2×10", value: 10 },
          { label: "2×12", value: 12 },
        ],
      },
      {
        id: "species",
        label: "Lumber species (No. 2 grade)",
        type: "select",
        default: 0,
        options: [
          { label: "Southern pine", value: 0 },
          { label: "Douglas fir-larch, hem-fir, SPF", value: 1 },
          { label: "Redwood, western cedar, ponderosa/red pine", value: 2 },
        ],
      },
      wasteField(5, "Spare joists for crowned, twisted or split boards."),
    ],
    compute: (v) => {
      const joists = v.length > 0 ? ceil(safeDiv(v.length * 12, v.spacing)) + 1 : 0;
      const maxSpan = JOIST_SPANS[v.species]?.[v.size]?.[v.spacing] ?? 0;
      return [
        { key: "joists", label: "Joists (incl. 2 end joists)", value: joists, unit: "joists", format: "integer", primary: true },
        { key: "joistsToBuy", label: "Joists to buy incl. spares", value: ceil(withWaste(joists, v.waste)), unit: "boards", format: "integer" },
        { key: "buyLength", label: "Joist board length to buy", value: nextLumberLength(v.span), dim: "length", decimals: 0 },
        { key: "maxSpan", label: "Approx. max allowed span (IRC table)", value: maxSpan, dim: "length", decimals: 2 },
        { key: "spanMargin", label: "Span margin (negative = too long)", value: maxSpan - v.span, dim: "length", decimals: 2 },
        { key: "hangers", label: "Joist hangers at ledger", value: joists, unit: "hangers", format: "integer" },
        { key: "rimLength", label: "Rim joist length", value: v.length, dim: "length", decimals: 1 },
        { key: "joistLinearFeet", label: "Total joist length", value: joists * v.span, dim: "length", decimals: 0 },
      ];
    },
  },
  {
    slug: "stair-rise-run-calculator",
    fields: [
      { id: "totalRise", label: "Total rise (ground to top of deck)", dim: "smallLength", default: 37, min: 1, step: 0.25, help: "Measure plumb from the landing surface to the top of the finished deck." },
      { id: "maxRiser", label: "Maximum riser height", dim: "smallLength", default: 7.5, min: 4, max: 7.75, step: 0.125, help: "The IRC allows up to 7¾ in; 7–7½ in is more comfortable." },
      { id: "tread", label: "Tread depth (run per step)", dim: "smallLength", default: 10.5, min: 10, max: 14, step: 0.25, help: "The IRC minimum is 10 in, measured nosing to nosing." },
      { id: "stairWidth", label: "Stair width", dim: "length", default: 3, min: 3, step: 0.5, help: "36 in is the usual minimum width." },
      { id: "stringerSpacing", label: "Max stringer spacing", dim: "smallLength", default: 18, min: 8, max: 24, step: 1, help: "Use 12 in or less for composite treads — check the tread maker." },
    ],
    compute: (v) => {
      const risers = v.totalRise > 0 ? ceil(safeDiv(v.totalRise, v.maxRiser)) : 0;
      const riser = safeDiv(v.totalRise, risers);
      const treads = Math.max(0, risers - 1);
      const run = treads * v.tread;
      const stringerIn = Math.hypot(v.totalRise, run);
      return [
        { key: "riserHeight", label: "Riser height", value: riser, dim: "smallLength", decimals: 2, primary: true },
        { key: "risers", label: "Number of risers", value: risers, unit: "risers", format: "integer" },
        { key: "treads", label: "Number of treads", value: treads, unit: "treads", format: "integer" },
        { key: "totalRun", label: "Total run (horizontal length)", value: run, dim: "smallLength", decimals: 1 },
        { key: "stringerLength", label: "Stringer length (diagonal, before cuts)", value: stringerIn / 12, dim: "length", decimals: 2 },
        { key: "angle", label: "Stair angle", value: (Math.atan2(v.totalRise, run) * 180) / Math.PI, unit: "°", decimals: 1 },
        { key: "comfort", label: "Comfort check (2 × riser + tread)", value: 2 * riser + v.tread, dim: "smallLength", decimals: 2, help: "24–25 in feels natural." },
        { key: "stringers", label: "Stringers", value: ceil(safeDiv(v.stairWidth * 12, v.stringerSpacing)) + 1, unit: "stringers", format: "integer" },
      ];
    },
  },
  {
    slug: "roofing-squares-calculator",
    fields: [
      { id: "length", label: "Roof footprint length (incl. overhangs)", dim: "length", default: 40, min: 0, step: 0.5 },
      { id: "width", label: "Roof footprint width (incl. overhangs)", dim: "length", default: 30, min: 0, step: 0.5 },
      pitchField(6),
      wasteField(10, "10% for simple gable roofs, 15% or more for hips, valleys and dormers."),
    ],
    compute: (v) => {
      const footprint = v.length * v.width;
      const mult = pitchMultiplier(v.pitch);
      const roofArea = footprint * mult;
      const squares = withWaste(roofArea / 100, v.waste);
      return [
        { key: "squares", label: "Roofing squares incl. waste", value: squares, unit: "squares", decimals: 2, primary: true },
        { key: "squaresRounded", label: "Squares to order (rounded up)", value: ceil(squares), unit: "squares", format: "integer" },
        { key: "roofArea", label: "Actual roof surface area", value: roofArea, dim: "area", decimals: 0 },
        { key: "footprint", label: "Footprint (plan) area", value: footprint, dim: "area", decimals: 0 },
        { key: "multiplier", label: "Pitch multiplier", value: mult, unit: "×", decimals: 3 },
      ];
    },
  },
  {
    slug: "roof-square-footage-calculator",
    fields: [
      { id: "length", label: "House length (wall to wall)", dim: "length", default: 40, min: 0, step: 0.5 },
      { id: "width", label: "House width (wall to wall)", dim: "length", default: 28, min: 0, step: 0.5 },
      { id: "overhang", label: "Eave and rake overhang", dim: "length", default: 1, min: 0, max: 4, step: 0.25, help: "Horizontal distance the roof extends past the walls on each side." },
      pitchField(8),
      { id: "length2", label: "Second roof section length (0 = none)", dim: "length", default: 0, min: 0, step: 0.5, help: "Garage, porch or addition, measured including its overhangs." },
      { id: "width2", label: "Second roof section width", dim: "length", default: 0, min: 0, step: 0.5, showIf: (v) => v.length2 > 0 },
      { ...pitchField(4), id: "pitch2", label: "Second section pitch (rise per 12)", showIf: (v) => v.length2 > 0 },
    ],
    compute: (v) => {
      const plan1 = (v.length + 2 * v.overhang) * (v.width + 2 * v.overhang);
      const area1 = plan1 * pitchMultiplier(v.pitch);
      const area2 = v.length2 > 0 ? v.length2 * v.width2 * pitchMultiplier(v.pitch2) : 0;
      const total = area1 + area2;
      return [
        { key: "totalArea", label: "Total roof area", value: total, dim: "area", decimals: 0, primary: true },
        { key: "squares", label: "Roofing squares (no waste)", value: total / 100, unit: "squares", decimals: 2 },
        { key: "area1", label: "Main roof area", value: area1, dim: "area", decimals: 0 },
        { key: "area2", label: "Second section area", value: area2, dim: "area", decimals: 0 },
        { key: "multiplier", label: "Main roof pitch multiplier", value: pitchMultiplier(v.pitch), unit: "×", decimals: 3 },
        { key: "angle", label: "Main roof angle", value: (Math.atan(v.pitch / 12) * 180) / Math.PI, unit: "°", decimals: 1 },
      ];
    },
  },
  {
    slug: "shingles-calculator",
    fields: [
      {
        id: "mode",
        label: "How do you want to enter the roof?",
        type: "select",
        default: 1,
        options: [
          { label: "I know the roof area", value: 0 },
          { label: "Footprint and pitch", value: 1 },
        ],
      },
      { id: "roofArea", label: "Roof area", dim: "area", default: 2000, min: 0, step: 10, showIf: (v) => v.mode === 0 },
      { id: "length", label: "Footprint length (incl. overhangs)", dim: "length", default: 40, min: 0, step: 0.5, showIf: (v) => v.mode === 1 },
      { id: "width", label: "Footprint width (incl. overhangs)", dim: "length", default: 30, min: 0, step: 0.5, showIf: (v) => v.mode === 1 },
      { ...pitchField(6), showIf: (v: Values) => v.mode === 1 },
      {
        id: "bundlesPerSquare",
        label: "Bundles per square",
        type: "select",
        default: 3,
        options: [
          { label: "3 — standard architectural or 3-tab", value: 3 },
          { label: "4 — heavyweight / designer", value: 4 },
          { label: "5 — premium designer", value: 5 },
        ],
      },
      { id: "starterLength", label: "Eaves + rakes length (starter strip)", dim: "length", default: 147, min: 0, step: 1, help: "Total length of all roof edges. Leave rakes out if your shingle maker does not require starter there." },
      { id: "starterCoverage", label: "Starter coverage per bundle", dim: "length", default: 100, min: 10, step: 1, help: "Typically about 100–120 ft — see the bundle wrapper." },
      { id: "ridgeLength", label: "Ridge + hip length (cap shingles)", dim: "length", default: 40, min: 0, step: 1 },
      { id: "ridgeCoverage", label: "Ridge cap coverage per bundle", dim: "length", default: 25, min: 5, step: 1, help: "Often 20–33 ft depending on the product." },
      {
        id: "underlayment",
        label: "Underlayment",
        type: "select",
        default: 1000,
        options: [
          { label: "Synthetic, 10-square roll (1,000 sq ft)", value: 1000 },
          { label: "#15 felt (≈400 sq ft per roll)", value: 400 },
          { label: "#30 felt (≈200 sq ft per roll)", value: 200 },
        ],
      },
      {
        id: "nailsPerShingle",
        label: "Nailing pattern",
        type: "select",
        default: 4,
        options: [
          { label: "4 nails per shingle", value: 4 },
          { label: "6 nails per shingle (high wind)", value: 6 },
        ],
      },
      wasteField(10, "10% for simple gable roofs, 15% or more for hips, valleys and dormers."),
    ],
    compute: (v) => {
      const area = shingleArea(v);
      const squares = withWaste(area / 100, v.waste);
      return [
        { key: "bundles", label: "Shingle bundles", value: ceil(squares * v.bundlesPerSquare), unit: "bundles", format: "integer", primary: true },
        { key: "squares", label: "Squares incl. waste", value: squares, unit: "squares", decimals: 2 },
        { key: "roofArea", label: "Roof area", value: area, dim: "area", decimals: 0 },
        { key: "starterBundles", label: "Starter strip bundles", value: ceil(safeDiv(v.starterLength, v.starterCoverage)), unit: "bundles", format: "integer" },
        { key: "ridgeBundles", label: "Hip & ridge cap bundles", value: ceil(safeDiv(v.ridgeLength, v.ridgeCoverage)), unit: "bundles", format: "integer" },
        { key: "underlaymentRolls", label: "Underlayment rolls", value: ceil(safeDiv(withWaste(area, v.waste), v.underlayment)), unit: "rolls", format: "integer" },
        { key: "nails", label: "Roofing nails (≈66 shingles per square)", value: ceil(squares * 66 * v.nailsPerShingle), unit: "nails", format: "integer" },
      ];
    },
  },
  {
    slug: "siding-calculator",
    fields: [
      { id: "perimeter", label: "Total wall length (perimeter)", dim: "length", default: 140, min: 0, step: 1, help: "Add up the lengths of every wall you are siding." },
      { id: "height", label: "Wall height (to the eaves)", dim: "length", default: 9, min: 0, step: 0.5 },
      { id: "gables", label: "Gable ends", default: 2, min: 0, step: 1 },
      { id: "gableBase", label: "Gable width", dim: "length", default: 30, min: 0, step: 0.5, showIf: (v) => v.gables > 0 },
      { id: "gableHeight", label: "Gable height (eave to peak)", dim: "length", default: 7.5, min: 0, step: 0.5, showIf: (v) => v.gables > 0 },
      { id: "windows", label: "Windows", default: 10, min: 0, step: 1, help: "Each window removes about 15 sq ft (1.4 m²)." },
      { id: "doors", label: "Entry doors", default: 2, min: 0, step: 1, help: "Each door removes about 20 sq ft (1.9 m²)." },
      { id: "otherOpenings", label: "Other openings (garage doors etc.)", dim: "area", default: 112, min: 0, step: 1, help: "A 16 × 7 ft garage door is 112 sq ft; a 9 × 7 ft door is 63 sq ft." },
      { id: "corners", label: "Outside corners", default: 4, min: 0, step: 1 },
      { id: "squaresPerBox", label: "Squares per box", default: 2, min: 0.5, step: 0.5, suffix: "sq", help: "Most vinyl siding boxes cover 2 squares (200 sq ft). Check the label." },
      wasteField(10, "10% for simple walls; 15% for many openings, gables or a complex house."),
    ],
    compute: (v) => {
      const walls = v.perimeter * v.height;
      const gableArea = v.gables > 0 ? v.gables * 0.5 * v.gableBase * v.gableHeight : 0;
      const openings = v.windows * 15 + v.doors * 20 + v.otherOpenings;
      const net = Math.max(0, walls + gableArea - openings);
      const squares = withWaste(net / 100, v.waste);
      const rakes = v.gables > 0 ? v.gables * 2 * Math.hypot(v.gableBase / 2, v.gableHeight) : 0;
      const jChannel = v.windows * 16 + v.doors * (3 + 2 * (80 / 12)) + rakes;
      return [
        { key: "squares", label: "Siding squares incl. waste", value: squares, unit: "squares", decimals: 2, primary: true },
        { key: "boxes", label: "Boxes of siding", value: ceil(safeDiv(squares, v.squaresPerBox)), unit: "boxes", format: "integer" },
        { key: "netArea", label: "Net wall area to side", value: net, dim: "area", decimals: 0 },
        { key: "grossArea", label: "Gross wall + gable area", value: walls + gableArea, dim: "area", decimals: 0 },
        { key: "starter", label: "Starter strip", value: v.perimeter, dim: "length", decimals: 0 },
        { key: "jChannel", label: "J-channel (windows, doors, gable rakes)", value: jChannel, dim: "length", decimals: 0 },
        { key: "cornerPosts", label: "Outside corner posts (10 ft)", value: v.corners * ceil(v.height / 10), unit: "posts", format: "integer" },
      ];
    },
  },
  {
    slug: "gutters-calculator",
    fields: [
      { id: "length", label: "Total eave length to gutter", dim: "length", default: 120, min: 0, step: 1 },
      { id: "runs", label: "Separate gutter runs", default: 2, min: 1, step: 1, help: "A run is a continuous length of gutter with two end caps." },
      { id: "corners", label: "Inside + outside corners", default: 0, min: 0, step: 1 },
      { id: "maxPerDownspout", label: "Max gutter length per downspout", dim: "length", default: 35, min: 10, max: 60, step: 1, help: "A common rule is one downspout every 30–40 ft; use less in heavy-rain areas." },
      { id: "downspoutHeight", label: "Downspout height (eave to ground)", dim: "length", default: 10, min: 1, step: 0.5 },
      { id: "hangerSpacing", label: "Hanger spacing", dim: "smallLength", default: 24, min: 12, max: 36, step: 1, help: "24 in is typical; 18 in in heavy-snow areas." },
      wasteField(5, "Extra gutter for overlaps, miters and cutting errors."),
    ],
    compute: (v) => {
      const gutter = withWaste(v.length, v.waste);
      const downspouts = v.length > 0 ? Math.max(v.runs, ceil(safeDiv(v.length, v.maxPerDownspout))) : 0;
      return [
        { key: "gutterLength", label: "Gutter incl. waste", value: gutter, dim: "length", decimals: 0, primary: true },
        { key: "sections", label: "10 ft gutter sections (if not seamless)", value: ceil(gutter / 10), unit: "sections", format: "integer" },
        { key: "downspouts", label: "Downspouts", value: downspouts, unit: "downspouts", format: "integer" },
        { key: "downspoutPieces", label: "10 ft downspout pieces", value: downspouts * ceil(v.downspoutHeight / 10), unit: "pieces", format: "integer" },
        { key: "elbows", label: "Downspout elbows (3 each)", value: downspouts * 3, unit: "elbows", format: "integer" },
        { key: "hangers", label: "Hidden hangers", value: v.length > 0 ? ceil(safeDiv(v.length * 12, v.hangerSpacing)) + v.runs : 0, unit: "hangers", format: "integer" },
        { key: "endCaps", label: "End caps", value: v.runs * 2, unit: "caps", format: "integer" },
        { key: "corners", label: "Corners (miters)", value: v.corners, unit: "corners", format: "integer" },
      ];
    },
  },
  {
    slug: "roof-pitch-calculator",
    fields: [
      {
        id: "mode",
        label: "What do you know?",
        type: "select",
        default: 0,
        options: [
          { label: "Rise and run", value: 0 },
          { label: "Roof angle in degrees", value: 1 },
        ],
      },
      { id: "rise", label: "Rise (vertical)", dim: "smallLength", default: 6, min: 0, step: 0.125, showIf: (v) => v.mode === 0 },
      { id: "run", label: "Run (horizontal)", dim: "smallLength", default: 12, min: 0.1, step: 0.125, help: "Measure with a level held horizontally against the roof.", showIf: (v) => v.mode === 0 },
      { id: "angle", label: "Roof angle", default: 26.57, min: 0, max: 80, step: 0.1, suffix: "°", showIf: (v) => v.mode === 1 },
    ],
    compute: (v) => {
      const slope = v.mode === 1 ? Math.tan((Math.min(Math.max(v.angle, 0), 80) * Math.PI) / 180) : safeDiv(v.rise, v.run);
      const pitch = slope * 12;
      return [
        { key: "pitch", label: "Roof pitch", value: pitch, unit: "in 12", decimals: 2, primary: true },
        { key: "angle", label: "Roof angle", value: (Math.atan(slope) * 180) / Math.PI, unit: "°", decimals: 2 },
        { key: "percent", label: "Slope as a percentage", value: slope * 100, format: "percent", decimals: 1 },
        { key: "multiplier", label: "Pitch (area) multiplier", value: pitchMultiplier(pitch), unit: "×", decimals: 3 },
        { key: "hipFactor", label: "Hip/valley length per ft of run", value: Math.sqrt(pitch ** 2 + 288) / 12, unit: "×", decimals: 3 },
      ];
    },
  },
  {
    slug: "rafter-length-calculator",
    fields: [
      { id: "span", label: "Building span (outside of wall to outside of wall)", dim: "length", default: 24, min: 0, step: 0.5 },
      pitchField(6),
      { id: "ridge", label: "Ridge board thickness", dim: "smallLength", default: 1.5, min: 0, step: 0.25, help: "1½ in for a 2× ridge board; 0 if rafters meet tip to tip." },
      { id: "overhang", label: "Overhang (horizontal)", dim: "smallLength", default: 12, min: 0, step: 1 },
      {
        id: "spacing",
        label: "Rafter spacing",
        type: "select",
        default: 24,
        options: [
          { label: "12 in on center", value: 12 },
          { label: "16 in on center", value: 16 },
          { label: "24 in on center", value: 24 },
        ],
      },
      { id: "buildingLength", label: "Building length (along the ridge)", dim: "length", default: 40, min: 0, step: 0.5 },
    ],
    compute: (v) => {
      const mult = pitchMultiplier(v.pitch);
      const run = Math.max(0, v.span / 2 - v.ridge / 2 / 12);
      const main = run * mult;
      const tail = (v.overhang / 12) * mult;
      const total = main + tail;
      const perSide = v.buildingLength > 0 ? ceil(safeDiv(v.buildingLength * 12, v.spacing)) + 1 : 0;
      return [
        { key: "totalLength", label: "Rafter length incl. overhang", value: total, dim: "length", decimals: 2, primary: true },
        { key: "mainLength", label: "Ridge to wall (line length)", value: main, dim: "length", decimals: 2 },
        { key: "tailLength", label: "Overhang (tail) length", value: tail, dim: "length", decimals: 2 },
        { key: "rise", label: "Roof rise (wall top to ridge line)", value: run * (v.pitch / 12), dim: "length", decimals: 2 },
        { key: "buyLength", label: "Board length to buy", value: nextLumberLength(total + 0.5), dim: "length", decimals: 0, help: "Includes about 6 in for plumb and seat cuts." },
        { key: "rafters", label: "Common rafters (both sides)", value: perSide * 2, unit: "rafters", format: "integer" },
        { key: "angle", label: "Roof angle (plumb-cut angle)", value: (Math.atan(v.pitch / 12) * 180) / Math.PI, unit: "°", decimals: 1 },
      ];
    },
  },
  {
    slug: "pergola-materials-calculator",
    fields: [
      { id: "length", label: "Pergola length (beam direction)", dim: "length", default: 12, min: 0, step: 0.5 },
      { id: "width", label: "Pergola width (rafter direction)", dim: "length", default: 12, min: 0, step: 0.5 },
      { id: "height", label: "Post height above ground", dim: "length", default: 8, min: 6, step: 0.5 },
      { id: "maxBeamSpan", label: "Max beam span between posts", dim: "length", default: 12, min: 4, max: 16, step: 0.5, help: "Depends on beam size and species — check a span table." },
      {
        id: "beamStyle",
        label: "Beams",
        type: "select",
        default: 2,
        options: [
          { label: "Single beam per side", value: 1 },
          { label: "Doubled beam per side (sandwiching posts)", value: 2 },
        ],
      },
      { id: "overhang", label: "Overhang past posts/beams (each end)", dim: "length", default: 1, min: 0, max: 3, step: 0.25 },
      { id: "rafterSpacing", label: "Rafter spacing", dim: "smallLength", default: 16, min: 6, max: 36, step: 1 },
      { id: "purlinSpacing", label: "Top slat (purlin) spacing, 0 = none", dim: "smallLength", default: 12, min: 0, max: 36, step: 1 },
      { id: "postSize", label: "Post size (actual)", dim: "smallLength", default: 5.5, min: 3.5, step: 0.5, help: "A 6×6 post is 5½ in square." },
      { id: "holeDiameter", label: "Footing hole diameter", dim: "smallLength", default: 12, min: 6, step: 1 },
      { id: "holeDepth", label: "Footing depth", dim: "smallLength", default: 36, min: 12, step: 1, help: "Go below your local frost line." },
      bagSelect(),
      wasteField(10, "Spare rafters and slats for bad boards; extra concrete for spillage."),
    ],
    compute: (v) => {
      const postsPerSide = v.length > 0 ? ceil(safeDiv(v.length, v.maxBeamSpan)) + 1 : 0;
      const posts = postsPerSide * 2;
      const rafters = v.length > 0 ? ceil(safeDiv(v.length * 12, v.rafterSpacing)) + 1 : 0;
      const purlins = v.purlinSpacing > 0 && v.width > 0 ? ceil(safeDiv(v.width * 12, v.purlinSpacing)) + 1 : 0;
      const concrete = withWaste(posts * concretePerPost(v.holeDiameter, v.holeDepth, v.postSize), v.waste);
      return [
        { key: "posts", label: "Posts", value: posts, unit: "posts", format: "integer", primary: true },
        { key: "postLength", label: "Post board length to buy", value: nextLumberLength(v.height + v.holeDepth / 12), dim: "length", decimals: 0 },
        { key: "beams", label: "Beam boards", value: 2 * v.beamStyle, unit: "boards", format: "integer" },
        { key: "beamLength", label: "Beam length", value: v.length + 2 * v.overhang, dim: "length", decimals: 1 },
        { key: "rafters", label: "Rafters incl. spares", value: ceil(withWaste(rafters, v.waste)), unit: "rafters", format: "integer" },
        { key: "rafterLength", label: "Rafter length", value: v.width + 2 * v.overhang, dim: "length", decimals: 1 },
        { key: "purlins", label: "Top slats incl. spares", value: ceil(withWaste(purlins, v.waste)), unit: "slats", format: "integer" },
        { key: "concrete", label: "Footing concrete", value: concrete, dim: "volume", decimals: 2 },
        { key: "bags", label: "Concrete bags", value: ceil(safeDiv(concrete, v.bagYield)), unit: "bags", format: "integer" },
      ];
    },
  },
];
