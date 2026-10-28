import type { CalculatorContent } from "../types";

const UPDATED = "2026-10-28";

export const content: CalculatorContent[] = [
  {
    slug: "mulch-calculator",
    name: "Mulch Calculator",
    category: "landscaping",
    kind: "material",
    featured: true,
    seoTitle: "Mulch Calculator – Cubic Yards and Bags of Mulch Needed",
    description:
      "Free mulch calculator: enter your bed size and depth to see how many cubic yards or 2 cu ft bags of mulch to buy. Works for rectangles, circles, feet or metres.",
    intro:
      "Work out how much mulch you need before you head to the garden center. Enter the size of your bed (rectangle, circle or a known area) and how deep you want the mulch, and the calculator gives you the bulk amount in cubic yards plus the number of bags — with a small allowance for settling.",
    keywords: [
      "mulch calculator",
      "how much mulch do i need",
      "cubic yards of mulch",
      "bags of mulch calculator",
      "mulch coverage calculator",
      "bark mulch estimator",
    ],
    howToUse: [
      "Choose the bed shape. For odd shapes, split the bed into rectangles and circles, or measure the area another way and pick 'I know the area'.",
      "Measure the length and width (or the diameter) in feet or metres.",
      "Choose a depth: 2–3 in (5–7.5 cm) for most beds, 3–4 in if you are smothering weeds or using coarse bark.",
      "Check the bag size on the mulch you plan to buy — 2 cu ft is the most common.",
      "Leave the 10% allowance for settling, then read the cubic yards (for bulk delivery) or the bag count.",
    ],
    formula: {
      lines: [
        "Area = length × width   (circle: π × (diameter ÷ 2)²)",
        "Volume (cu ft) = area × depth (in) ÷ 12 × (1 + waste %)",
        "Cubic yards = cu ft ÷ 27",
        "Bags = cu ft ÷ bag size, rounded up",
      ],
      notes: [
        "One cubic yard of mulch covers about 324 sq ft at 1 in deep, 108 sq ft at 3 in deep and 81 sq ft at 4 in deep.",
        "A cubic yard is 27 cu ft, so it equals 13.5 two-cubic-foot bags or 9 three-cubic-foot bags.",
      ],
    },
    example: {
      scenario: "A 20 × 10 ft front bed, mulched 3 in deep with a 10% allowance for settling.",
      inputs: { shape: 0, length: 20, width: 10, depth: 3, bagSize: 2, waste: 10 },
      expected: { areaSqFt: 200, cubicFeet: 55, cubicYards: 2.037, bags: 28, bags3: 19 },
      steps: [
        "Area = 20 × 10 = 200 sq ft.",
        "Volume = 200 × 3 ÷ 12 = 50 cu ft; plus 10% = 55 cu ft.",
        "Cubic yards = 55 ÷ 27 = 2.04 cu yd — order 2 cu yd in bulk (the small difference is the settling allowance).",
        "Bags = 55 ÷ 2 = 27.5, so buy 28 two-cubic-foot bags (or 19 three-cubic-foot bags).",
      ],
    },
    tips: [
      "Bulk mulch is usually cheaper than bags once you need more than about 2 cubic yards — but factor in the delivery fee.",
      "Pull mulch a few inches back from tree trunks, shrub stems and the house siding to prevent rot and pests.",
      "If you already have 1–2 in of old mulch, top it up to 3 in total rather than adding a full new layer.",
      "Lay cardboard or newspaper under new mulch to smother existing weeds instead of using landscape fabric in planting beds.",
    ],
    faqs: [
      {
        q: "How much area does a cubic yard of mulch cover?",
        a: "At 3 in deep, one cubic yard covers about 108 sq ft (10 m²). At 2 in it covers about 162 sq ft and at 4 in about 81 sq ft. Divide 324 by your depth in inches to get the sq ft per yard.",
      },
      {
        q: "How many bags of mulch are in a yard?",
        a: "A cubic yard is 27 cu ft, so it takes 13.5 bags of 2 cu ft, 9 bags of 3 cu ft or 18 bags of 1.5 cu ft.",
      },
      {
        q: "How deep should mulch be?",
        a: "Two to three inches is right for most planting beds. Go to 3–4 in for coarse bark or to suppress weeds, but avoid more than 4 in, which can starve roots of oxygen and keep the soil too wet.",
      },
      {
        q: "How many bags of mulch do I need for a 10 × 10 bed?",
        a: "A 10 × 10 bed is 100 sq ft. At 3 in deep that is 25 cu ft, or about 27.5 cu ft with a 10% allowance — 14 bags of 2 cu ft, or just over 1 cubic yard in bulk.",
      },
      {
        q: "Should I remove old mulch before adding new?",
        a: "Usually not. Old mulch breaks down into the soil. Rake it to loosen any matted layer, then add enough new mulch to bring the total depth back to 2–3 in.",
      },
    ],
    sources: [
      { title: "Mulching for a healthy landscape", publisher: "Virginia Cooperative Extension" },
      { title: "Using mulches in managed landscapes", publisher: "University of Minnesota Extension" },
      { title: "Proper mulching techniques", publisher: "International Society of Arboriculture (TreesAreGood.org)" },
    ],
    related: ["tree-ring-calculator", "compost-calculator", "topsoil-calculator", "edging-calculator", "cubic-yard-calculator"],
  },
  {
    slug: "gravel-calculator",
    name: "Gravel Calculator",
    category: "landscaping",
    kind: "material",
    featured: true,
    seoTitle: "Gravel Calculator – Cubic Yards, Tons and Bags of Gravel",
    description:
      "Free gravel calculator: enter area and depth to get cubic yards, approximate tons and 0.5 cu ft bags of gravel or crushed stone for paths, patios and driveways.",
    intro:
      "Gravel is sold by the cubic yard, by the ton or in small bags, so you need all three numbers to compare prices. Enter the size and depth of your path, patio or driveway and choose the stone type, and this calculator gives you the volume, an approximate weight and the bag count.",
    keywords: [
      "gravel calculator",
      "how much gravel do i need",
      "gravel tons calculator",
      "crushed stone calculator",
      "cubic yards of gravel",
      "driveway gravel calculator",
    ],
    howToUse: [
      "Choose rectangle, circle or a known area, and enter the dimensions.",
      "Enter the finished depth: 2–3 in for paths and decorative beds, 4 in per layer for driveways.",
      "Pick the gravel type so the weight estimate uses a sensible density, or enter your supplier's figure.",
      "Keep the 10% allowance for compaction and an uneven base.",
      "Use cubic yards or tons to order bulk gravel, or the bag count for small projects.",
    ],
    formula: {
      lines: [
        "Volume (cu ft) = area × depth (in) ÷ 12 × (1 + waste %)",
        "Cubic yards = cu ft ÷ 27",
        "Tons = cubic yards × density (tons per cu yd)",
        "Bags = cu ft ÷ bag size, rounded up",
      ],
      notes: [
        "Density assumptions (dry, loose, US short tons): pea gravel ~1.4, crushed stone such as #57 ~1.35, crusher run / road base ~1.5, river rock ~1.35 tons per cu yd. Wet or very fine material is heavier — ask your supplier.",
        "1 US ton per cu yd is about 1.19 tonnes per m³.",
      ],
    },
    example: {
      scenario: "A 50 × 10 ft gravel parking pad, 4 in deep in crushed #57 stone, with a 10% allowance.",
      inputs: { shape: 0, length: 50, width: 10, depth: 4, type: 1, bagSize: 0.5, waste: 10 },
      expected: { areaSqFt: 500, cubicFeet: 183.33, cubicYards: 6.79, tons: 9.17, bags: 367 },
      steps: [
        "Area = 50 × 10 = 500 sq ft.",
        "Volume = 500 × 4 ÷ 12 = 166.7 cu ft; plus 10% = 183.3 cu ft.",
        "Cubic yards = 183.3 ÷ 27 = 6.79 cu yd.",
        "Weight ≈ 6.79 × 1.35 = 9.2 tons — order about 7 cu yd or 9–10 tons. Bagged, it would be 367 half-cubic-foot bags, so bulk is the clear choice.",
      ],
    },
    tips: [
      "For driveways, build in layers: 4–6 in of larger crushed stone or crusher run as a base, then 2–4 in of a smaller surface stone.",
      "Angular crushed stone locks together and stays put; round pea gravel and river rock roll underfoot and migrate unless edged.",
      "Lay a woven geotextile fabric on soft or clay soils so the gravel does not sink into the mud.",
      "Ask whether your supplier sells by the ton or by the yard, and use the matching figure when comparing quotes.",
    ],
    faqs: [
      {
        q: "How many tons of gravel are in a cubic yard?",
        a: "Most gravel weighs about 1.3–1.5 US tons per cubic yard (roughly 2,600–3,000 lb). This calculator uses 1.35 for crushed stone and 1.4 for pea gravel by default; your supplier can tell you the exact figure for their stone.",
      },
      {
        q: "How much area does a ton of gravel cover?",
        a: "At 2 in deep, a ton of crushed stone covers roughly 120 sq ft; at 3 in about 80 sq ft; at 4 in about 60 sq ft. It depends on the stone's density.",
      },
      {
        q: "How deep should gravel be for a driveway?",
        a: "A new gravel driveway typically has 4–6 in of compacted base stone plus 2–4 in of surface gravel, so 8–12 in in total on soft ground. A path or patio needs only 2–3 in over a compacted base.",
      },
      {
        q: "How many bags of gravel equal a yard?",
        a: "Bagged gravel is usually 0.5 cu ft, so a cubic yard (27 cu ft) is 54 bags — about 2,700 lb of stone. Beyond about half a yard, bulk delivery is usually cheaper and much less work.",
      },
      {
        q: "What size gravel is best for a walkway?",
        a: "Small stone of ⅜–¾ in is comfortable to walk on. Crushed stone with fines (such as crusher run or decomposed granite) packs firm; pea gravel is attractive but shifts underfoot unless it is contained by edging.",
      },
    ],
    sources: [
      { title: "Aggregate unit weights and product data", publisher: "National Stone, Sand & Gravel Association" },
      { title: "Gravel Roads Construction and Maintenance Guide", publisher: "Federal Highway Administration" },
      { title: "Building gravel driveways and walks", publisher: "Penn State Extension" },
    ],
    related: ["pea-gravel-calculator", "river-rock-calculator", "paver-base-calculator", "driveway-cost-calculator", "cubic-yard-calculator"],
  },
  {
    slug: "topsoil-calculator",
    name: "Topsoil Calculator",
    category: "landscaping",
    kind: "material",
    featured: true,
    seoTitle: "Topsoil Calculator – How Many Yards of Topsoil Do I Need?",
    description:
      "Free topsoil calculator: get cubic yards, bags and approximate tons of topsoil for a new lawn, garden bed or leveling job, including an allowance for settling.",
    intro:
      "Whether you are leveling a lawn, preparing for sod or building a new garden bed, this calculator tells you how much topsoil to order. Enter the area and depth, and you will get the volume in cubic yards, the bag count and an approximate weight — with extra built in because loose soil settles.",
    keywords: [
      "topsoil calculator",
      "how much topsoil do i need",
      "yards of topsoil",
      "topsoil for new lawn",
      "bags of topsoil calculator",
      "soil calculator",
    ],
    howToUse: [
      "Enter the area as a rectangle, circle or known square footage.",
      "Choose the depth: 1–2 in to level low spots, 4–6 in under new sod or seed, 8–12 in for new vegetable or flower beds.",
      "Leave the settling allowance at 15% unless your supplier sells screened, compacted soil.",
      "Adjust the density only if you know your soil's weight (wet soil is heavier).",
      "Order the cubic yards in bulk, or use the bag count for small jobs.",
    ],
    formula: {
      lines: [
        "Volume (cu ft) = area × depth (in) ÷ 12 × (1 + settling %)",
        "Cubic yards = cu ft ÷ 27",
        "Tons ≈ cubic yards × 1.1 (dry, loose topsoil)",
        "Bags = cu ft ÷ bag size, rounded up",
      ],
      notes: [
        "Dry, screened topsoil weighs roughly 1–1.2 US tons per cubic yard; moist soil can weigh noticeably more.",
        "One cubic yard spread 4 in deep covers about 81 sq ft (7.5 m²).",
      ],
    },
    example: {
      scenario: "Preparing a 30 × 20 ft area for new sod with 4 in of topsoil and a 15% settling allowance.",
      inputs: { shape: 0, length: 30, width: 20, depth: 4, density: 1.1, bagSize: 0.75, waste: 15 },
      expected: { areaSqFt: 600, cubicFeet: 230, cubicYards: 8.52, tons: 9.37, bags: 307 },
      steps: [
        "Area = 30 × 20 = 600 sq ft.",
        "Volume = 600 × 4 ÷ 12 = 200 cu ft; plus 15% = 230 cu ft.",
        "Cubic yards = 230 ÷ 27 = 8.52 — order 8.5 to 9 cu yd.",
        "Weight ≈ 8.52 × 1.1 = 9.4 tons. Bagged at 0.75 cu ft per bag it would take 307 bags, so bulk delivery is the practical option.",
      ],
    },
    tips: [
      "Ask for screened topsoil — it is free of rocks, roots and clods and spreads far more easily.",
      "Mix the first few inches of new topsoil into the existing soil so roots do not stop at a layer boundary.",
      "For garden beds, a blended 'garden mix' with compost is often better value than plain topsoil plus separate compost.",
      "Have a dump truck tip the load on a tarp close to the work area to save hours of wheelbarrow trips.",
    ],
    faqs: [
      {
        q: "How much does a yard of topsoil cover?",
        a: "One cubic yard covers about 324 sq ft at 1 in deep, 162 sq ft at 2 in, 81 sq ft at 4 in and 54 sq ft at 6 in.",
      },
      {
        q: "How much topsoil do I need for new grass?",
        a: "Aim for at least 4–6 in of good topsoil under new sod or seed. For a 1,000 sq ft lawn at 4 in that is about 12.3 cu yd, or about 14 cu yd with a 15% settling allowance.",
      },
      {
        q: "How much does a yard of topsoil weigh?",
        a: "Roughly 2,000–2,400 lb (1–1.2 US tons) when dry and loose, and more when wet. That matters if you plan to haul it in a pickup — most half-ton pickups can safely carry only about half a yard.",
      },
      {
        q: "How many bags of topsoil make a yard?",
        a: "With common 0.75 cu ft bags, a cubic yard takes 36 bags. With 1 cu ft bags it takes 27.",
      },
      {
        q: "Why add extra for settling?",
        a: "Loose soil contains air pockets. Once it is raked, rolled and watered it can settle 10–20%, so ordering exactly the calculated volume leaves you short of your finished grade.",
      },
    ],
    sources: [
      { title: "Establishing a lawn: soil preparation", publisher: "University of Maryland Extension" },
      { title: "Soil texture and bulk density", publisher: "USDA Natural Resources Conservation Service" },
      { title: "Improving garden soils", publisher: "Colorado State University Extension" },
    ],
    related: ["compost-calculator", "sod-calculator", "grass-seed-calculator", "raised-bed-soil-calculator", "cubic-yard-calculator"],
  },
  {
    slug: "sand-calculator",
    name: "Sand Calculator",
    category: "landscaping",
    kind: "material",
    featured: false,
    seoTitle: "Sand Calculator – Cubic Yards, Tons and Bags of Sand",
    description:
      "Free sand calculator for sandboxes, paver bedding and pool bases: enter area and depth to get cubic yards, tons and 50 lb bags of sand. Feet or metres.",
    intro:
      "Use this calculator to estimate sand for a sandbox, a paver setting bed, a pool base or leveling under a shed. Enter the area and depth, and it returns cubic yards, cubic feet, an approximate weight in tons and the number of 50 lb (0.5 cu ft) bags.",
    keywords: [
      "sand calculator",
      "how much sand do i need",
      "sandbox sand calculator",
      "tons of sand calculator",
      "paver sand calculator",
      "bags of play sand",
    ],
    howToUse: [
      "Enter the area as a rectangle, circle or known square footage.",
      "Enter the sand depth — about 1 in for a paver bed, 2 in under an above-ground pool, 6–12 in for a sandbox.",
      "Keep the default density of 1.35 tons per cubic yard unless your supplier gives a different figure.",
      "Check the bag size; a 50 lb bag of play sand is about 0.5 cu ft.",
      "Read the cubic yards or tons for a bulk order, or the bag count.",
    ],
    formula: {
      lines: [
        "Volume (cu ft) = area × depth (in) ÷ 12 × (1 + waste %)",
        "Cubic yards = cu ft ÷ 27",
        "Tons = cubic yards × 1.35 (dry sand)",
        "Bags = cu ft ÷ 0.5, rounded up",
      ],
      notes: [
        "Dry sand weighs about 2,600–2,800 lb per cubic yard (around 100 lb per cu ft); damp sand is heavier.",
        "Concrete sand (coarse, washed) is used under pavers; play sand is washed and screened finer for children's sandboxes.",
      ],
    },
    example: {
      scenario: "A 6 × 6 ft sandbox filled 12 in deep with play sand, plus 5% extra.",
      inputs: { shape: 0, length: 6, width: 6, depth: 12, density: 1.35, bagSize: 0.5, waste: 5 },
      expected: { areaSqFt: 36, cubicFeet: 37.8, cubicYards: 1.4, tons: 1.89, bags: 76 },
      steps: [
        "Area = 6 × 6 = 36 sq ft.",
        "Volume = 36 × 12 ÷ 12 = 36 cu ft; plus 5% = 37.8 cu ft.",
        "Cubic yards = 37.8 ÷ 27 = 1.4 cu yd, weighing about 1.4 × 1.35 = 1.89 tons.",
        "Bags = 37.8 ÷ 0.5 = 75.6, so 76 bags of 50 lb play sand.",
      ],
    },
    tips: [
      "Fill a sandbox only to 2–3 in below the rim so sand stays in the box.",
      "Under pavers, use about 1 in of coarse concrete sand screeded level — not play sand, which washes out and does not drain as well.",
      "Polymeric sand for paver joints is a different product; buy it by the manufacturer's coverage chart.",
      "A sand load is heavy: 1 cubic yard weighs well over a ton, more than many pickup trucks can safely carry.",
    ],
    faqs: [
      {
        q: "How much does a yard of sand weigh?",
        a: "About 2,600–2,800 lb (1.3–1.4 US tons) when dry, and up to around 3,000 lb when wet. This calculator assumes 1.35 tons per cubic yard.",
      },
      {
        q: "How many bags of sand do I need for a sandbox?",
        a: "A 4 × 4 ft sandbox filled 8 in deep needs about 10.7 cu ft, or 22 bags of 50 lb play sand. A 6 × 6 ft box at 12 in needs about 72 bags before any extra.",
      },
      {
        q: "How much sand do I need under pavers?",
        a: "Use about 1 in of bedding sand over the compacted gravel base. For 100 sq ft that is about 8.3 cu ft, or 17 bags of 0.5 cu ft — roughly 0.3 cubic yard.",
      },
      {
        q: "How many bags of sand are in a ton?",
        a: "With 50 lb bags, a US ton (2,000 lb) is 40 bags, which is about 20 cu ft or three-quarters of a cubic yard.",
      },
      {
        q: "What depth of sand goes under an above-ground pool?",
        a: "Most manufacturers call for a 1–2 in layer of clean, compacted sand on a level base, often with a cove of sand around the inside edge. Always follow the pool maker's installation guide.",
      },
    ],
    sources: [
      { title: "Construction aggregates: sand and gravel", publisher: "U.S. Geological Survey" },
      { title: "Interlocking concrete pavement installation guide (bedding sand)", publisher: "Interlocking Concrete Pavement Institute" },
      { title: "Public Playground Safety Handbook", publisher: "U.S. Consumer Product Safety Commission" },
    ],
    related: ["paver-base-calculator", "paver-calculator", "gravel-calculator", "cubic-yard-calculator", "pea-gravel-calculator"],
  },
  {
    slug: "sod-calculator",
    name: "Sod Calculator",
    category: "landscaping",
    kind: "material",
    featured: false,
    seoTitle: "Sod Calculator – Square Feet, Pieces and Pallets of Sod",
    description:
      "Free sod calculator: add up to three lawn areas to get the square feet, number of sod slabs or rolls and pallets to order, with a waste allowance for cuts.",
    intro:
      "Sod is sold by the square foot, the square yard, the piece and the pallet. Enter up to three rectangular lawn areas, choose your piece size and the coverage of a pallet from your sod farm, and this calculator tells you exactly what to order.",
    keywords: [
      "sod calculator",
      "how much sod do i need",
      "pallets of sod",
      "sod square feet calculator",
      "sod rolls calculator",
      "new lawn sod estimate",
    ],
    howToUse: [
      "Split the lawn into up to three rectangles and enter each length and width (leave unused areas at 0).",
      "Choose the piece size your supplier sells — 16 × 24 in slabs are the most common in many areas.",
      "Enter the pallet coverage from your supplier (usually 400–500 sq ft).",
      "Use 5% waste for simple rectangles and 10–15% for curved beds and lots of trees.",
      "Order the sod area or pallet count, and schedule delivery for the day you will lay it.",
    ],
    formula: {
      lines: [
        "Lawn area = Σ (length × width) for each area",
        "Sod to order = lawn area × (1 + waste %)",
        "Pieces = sod to order ÷ piece area, rounded up",
        "Pallets = sod to order ÷ pallet coverage, rounded up",
      ],
      notes: [
        "A 16 × 24 in slab covers 2.67 sq ft; an 18 × 24 in slab 3 sq ft; a 2 × 5 ft roll 10 sq ft.",
        "1 square yard = 9 sq ft. Pallet sizes vary by grower, so always confirm coverage.",
      ],
    },
    example: {
      scenario: "A 40 × 25 ft back lawn plus a 15 × 10 ft side strip, using 16 × 24 in slabs, 450 sq ft pallets and 5% waste.",
      inputs: { length1: 40, width1: 25, length2: 15, width2: 10, length3: 0, width3: 0, piece: 0, pallet: 450, waste: 5 },
      expected: { lawnArea: 1150, orderArea: 1207.5, pieces: 453, pallets: 3 },
      steps: [
        "Lawn area = 40 × 25 + 15 × 10 = 1,000 + 150 = 1,150 sq ft.",
        "Add 5% waste: 1,150 × 1.05 = 1,207.5 sq ft.",
        "Pieces = 1,207.5 ÷ 2.67 = 452.8, so 453 slabs.",
        "Pallets = 1,207.5 ÷ 450 = 2.68, so 3 pallets — the leftover patches spare sod for repairs.",
      ],
    },
    tips: [
      "Sod is perishable. Lay it the day it arrives, especially in hot weather, and keep pallets shaded and moist.",
      "Stagger the joints like brickwork and push edges tightly together without stretching the pieces.",
      "Prepare the soil first — 4–6 in of loosened, leveled topsoil — and roll the new sod to remove air pockets.",
      "Water deeply right after installation and keep the sod moist until the roots knit, usually 2–3 weeks.",
    ],
    faqs: [
      {
        q: "How much sod is on a pallet?",
        a: "Most pallets hold 400–500 sq ft, but it varies by grower, grass type and region. Ask your supplier — this calculator uses 450 sq ft by default.",
      },
      {
        q: "How many pieces of sod do I need for 1,000 sq ft?",
        a: "With 16 × 24 in slabs (2.67 sq ft each), 1,000 sq ft takes 375 pieces, or about 394 with 5% waste. With 2 × 5 ft rolls it takes 100 rolls, or 105 with waste.",
      },
      {
        q: "How much extra sod should I order?",
        a: "Add about 5% for simple rectangular lawns and 10–15% for curved edges, islands, trees and slopes, where you will trim more pieces.",
      },
      {
        q: "Is sod sold by the square foot or square yard?",
        a: "Both. Many retailers price by the square foot or piece, while sod farms often quote per pallet or per square yard. Divide square feet by 9 to get square yards.",
      },
      {
        q: "When is the best time to lay sod?",
        a: "Cool-season grasses root best in early fall or spring; warm-season grasses such as Bermuda, zoysia and St. Augustine establish best in late spring and early summer when soil is warm.",
      },
    ],
    sources: [
      { title: "Establishing a lawn from sod", publisher: "Penn State Extension" },
      { title: "Sod installation guidelines", publisher: "Turfgrass Producers International" },
      { title: "Lawn establishment", publisher: "University of Georgia Cooperative Extension" },
    ],
    related: ["topsoil-calculator", "grass-seed-calculator", "square-footage-calculator", "landscape-cost-calculator", "edging-calculator"],
  },
  {
    slug: "grass-seed-calculator",
    name: "Grass Seed Calculator",
    category: "landscaping",
    kind: "material",
    featured: false,
    seoTitle: "Grass Seed Calculator – Pounds of Seed by Grass Type",
    description:
      "Free grass seed calculator: pick your grass type and lawn size to see how many pounds and bags of seed to buy for a new lawn or for overseeding.",
    intro:
      "Each grass species has its own seeding rate — a pound of tiny Kentucky bluegrass seed covers far more ground than a pound of tall fescue. Choose your grass, enter your lawn size and whether you are starting from bare soil or overseeding, and the calculator returns the pounds and bags of seed to buy.",
    keywords: [
      "grass seed calculator",
      "how much grass seed do i need",
      "grass seed per square foot",
      "overseeding rate calculator",
      "lawn seed calculator",
      "pounds of grass seed per 1000 sq ft",
    ],
    howToUse: [
      "Enter your lawn size as a rectangle, circle or known area.",
      "Choose your grass type. If your seed bag lists a different rate, choose 'Custom rate' and type it in.",
      "Pick 'New lawn' for bare soil, or 'Overseeding' to thicken an existing lawn at about half the rate.",
      "Enter the bag size you plan to buy.",
      "Read the pounds of seed and the number of bags.",
    ],
    formula: {
      lines: [
        "Seed (lb) = area ÷ 1,000 × seeding rate (lb per 1,000 sq ft) × (1 + extra %)",
        "Overseeding rate ≈ new-lawn rate ÷ 2",
        "Bags = seed ÷ bag weight, rounded up",
      ],
      notes: [
        "Default new-lawn rates are mid-range values from university extension guides: Kentucky bluegrass 2, tall fescue 7, perennial ryegrass 7, fine fescue 4, sun & shade mix 5, hulled Bermudagrass 1.5, zoysiagrass 1.5, centipedegrass 0.5 and bahiagrass 7 lb per 1,000 sq ft.",
        "Seed labels and local extension recommendations take priority — rates vary with seed quality, mix and region.",
      ],
    },
    example: {
      scenario: "Seeding a new 50 × 40 ft lawn with tall fescue, buying 5 lb bags with 5% extra.",
      inputs: { shape: 0, length: 50, width: 40, grass: 1, project: 0, bagWeight: 5, waste: 5 },
      expected: { areaSqFt: 2000, rate: 7, seedLb: 14.7, bags: 3 },
      steps: [
        "Area = 50 × 40 = 2,000 sq ft.",
        "Seed = 2,000 ÷ 1,000 × 7 lb = 14 lb.",
        "Add 5%: 14 × 1.05 = 14.7 lb.",
        "Bags = 14.7 ÷ 5 = 2.94, so buy 3 bags of 5 lb.",
      ],
    },
    tips: [
      "Seed cool-season grasses (fescue, bluegrass, ryegrass) in late summer to early fall; seed warm-season grasses in late spring once soil is warm.",
      "Spread half the seed in one direction and half at right angles for even coverage.",
      "Rake seed lightly into the top ¼ in of soil and keep it consistently moist until it germinates.",
      "Using much more seed than recommended makes seedlings compete and can produce a weaker lawn, not a thicker one.",
    ],
    faqs: [
      {
        q: "How much grass seed do I need per 1,000 sq ft?",
        a: "It depends on the grass: roughly 1–2 lb for Kentucky bluegrass, 6–8 lb for tall fescue, 6–9 lb for perennial ryegrass and 1–2 lb for hulled Bermudagrass for a new lawn. Overseeding uses about half those amounts.",
      },
      {
        q: "How much grass seed for a 5,000 sq ft lawn?",
        a: "For a new tall fescue lawn at 7 lb per 1,000 sq ft, you need about 35 lb. Overseeding the same lawn needs about 17–18 lb. Kentucky bluegrass at 2 lb per 1,000 sq ft needs only about 10 lb.",
      },
      {
        q: "What is the overseeding rate?",
        a: "Overseeding an existing lawn usually uses about half the new-lawn rate — for tall fescue roughly 3–4 lb per 1,000 sq ft. Thin, patchy lawns may need closer to the full rate.",
      },
      {
        q: "Can I put down too much grass seed?",
        a: "Yes. Heavy seeding creates crowded seedlings that compete for water and light and are more prone to disease. Stick to the label rate.",
      },
      {
        q: "How many square feet does a 5 lb bag of grass seed cover?",
        a: "Divide 5,000 by the seeding rate. A 5 lb bag of tall fescue at 7 lb per 1,000 sq ft covers about 700 sq ft as a new lawn, or about 1,400 sq ft when overseeding.",
      },
    ],
    sources: [
      { title: "Lawn establishment: seeding rates for turfgrasses", publisher: "Purdue University Turfgrass Science" },
      { title: "Seeding a lawn", publisher: "Penn State Extension" },
      { title: "Lawns in Georgia: establishing warm-season grasses", publisher: "University of Georgia Cooperative Extension" },
    ],
    related: ["sod-calculator", "topsoil-calculator", "compost-calculator", "square-footage-calculator"],
  },
  {
    slug: "raised-bed-soil-calculator",
    name: "Raised Bed Soil Calculator",
    category: "landscaping",
    kind: "material",
    featured: false,
    seoTitle: "Raised Bed Soil Calculator – Cubic Feet, Bags and Soil Mix",
    description:
      "Free raised bed soil calculator: enter bed size, depth and number of beds to get cubic feet, yards and bags of soil, plus topsoil and compost amounts for your mix.",
    intro:
      "Raised beds swallow more soil than most gardeners expect. Enter the inside dimensions of your beds and how deep you will fill them, choose a bagged mix or a home blend, and the calculator tells you the total soil volume, the number of bags and how much topsoil, compost and aeration material go into the blend.",
    keywords: [
      "raised bed soil calculator",
      "how much soil for raised bed",
      "raised garden bed soil",
      "cubic feet of soil for raised bed",
      "raised bed soil mix",
      "bags of soil for raised bed",
    ],
    howToUse: [
      "Enter the number of identical beds and their inside length and width.",
      "Enter the soil depth — usually the bed height minus an inch or two so soil and mulch do not spill over.",
      "Choose a single bagged mix or one of the home blends.",
      "Keep the 10% settling allowance (new soil sinks noticeably in the first season).",
      "Read the total cubic feet and bags, or the cubic yards and blend portions for a bulk order.",
    ],
    formula: {
      lines: [
        "Volume (cu ft) = beds × length × width × depth (in) ÷ 12 × (1 + settling %)",
        "Cubic yards = cu ft ÷ 27",
        "Bags = cu ft ÷ bag size, rounded up",
        "Blend portions = volume × 60% / 30% / 10% (or 50% / 50%)",
      ],
      notes: [
        "A 60/30/10 blend of topsoil, compost and an aeration material (perlite, pumice or fine bark) is a common, affordable raised-bed recipe; many extension services suggest roughly two parts soil to one part compost.",
        "For beds deeper than about 18 in, some gardeners fill the bottom with logs or coarse organic matter to save soil; reduce the depth here accordingly.",
      ],
    },
    example: {
      scenario: "Two 8 × 4 ft beds filled 12 in deep with a 60/30/10 blend and 10% settling allowance.",
      inputs: { beds: 2, length: 8, width: 4, depth: 12, mix: 1, bagSize: 1.5, waste: 10 },
      expected: { cubicFeet: 70.4, cubicYards: 2.61, bags: 47, topsoil: 42.24, compost: 21.12, aeration: 7.04 },
      steps: [
        "One bed = 8 × 4 × 12 ÷ 12 = 32 cu ft; two beds = 64 cu ft.",
        "Add 10%: 64 × 1.10 = 70.4 cu ft, or 70.4 ÷ 27 = 2.61 cu yd.",
        "Blend: 60% topsoil = 42.2 cu ft, 30% compost = 21.1 cu ft, 10% aeration = 7.0 cu ft.",
        "Bagged instead: 70.4 ÷ 1.5 = 46.9, so 47 bags of 1.5 cu ft raised-bed mix.",
      ],
    },
    tips: [
      "Bagged raised-bed mix is convenient for one or two small beds; for three or more, a bulk blend is usually far cheaper.",
      "Do not fill beds with pure bagged potting mix or pure compost — both shrink a lot and can be too rich or too light on their own.",
      "Top up beds with 1–2 in of compost each season to replace what the plants used and what settled.",
      "If gophers or moles are a problem, staple hardware cloth across the bottom before adding soil.",
    ],
    faqs: [
      {
        q: "How much soil do I need for a 4 × 8 raised bed?",
        a: "A 4 × 8 ft bed filled 12 in deep holds 32 cu ft (about 1.2 cu yd). Add 10% for settling and buy about 35 cu ft — roughly 24 bags of 1.5 cu ft or 18 bags of 2 cu ft.",
      },
      {
        q: "How deep should raised bed soil be?",
        a: "Most vegetables do well in 8–12 in of good soil; deep-rooted crops such as tomatoes, squash and carrots appreciate 12–18 in, especially over poor native soil.",
      },
      {
        q: "What is the best soil mix for raised beds?",
        a: "A popular, budget-friendly blend is about 60% screened topsoil, 30% compost and 10% perlite, pumice or fine bark. A simpler 50/50 topsoil and compost mix also works well.",
      },
      {
        q: "How many bags of soil fill a raised bed?",
        a: "Divide the bed volume in cubic feet by the bag size. A 3 × 6 ft bed 10 in deep holds 15 cu ft, which is 10 bags of 1.5 cu ft (11 with a settling allowance).",
      },
      {
        q: "Is it cheaper to buy bulk soil for raised beds?",
        a: "Usually yes once you need more than about 1 cubic yard (27 cu ft). Bulk soil costs far less per cubic foot, but compare the delivery fee against the bag price for your total.",
      },
    ],
    sources: [
      { title: "Raised bed gardening", publisher: "University of Illinois Extension" },
      { title: "Soil mixes for raised beds and containers", publisher: "Oregon State University Extension Service" },
      { title: "Building raised beds", publisher: "University of Maryland Extension" },
    ],
    related: ["topsoil-calculator", "compost-calculator", "mulch-calculator", "cubic-feet-calculator"],
  },
  {
    slug: "pea-gravel-calculator",
    name: "Pea Gravel Calculator",
    category: "landscaping",
    kind: "material",
    featured: false,
    seoTitle: "Pea Gravel Calculator – Yards, Tons and Bags of Pea Gravel",
    description:
      "Free pea gravel calculator for patios, paths, dog runs and play areas: enter area and depth to get cubic yards, approximate tons and 0.5 cu ft bags.",
    intro:
      "Pea gravel — small, smooth, rounded stone about ⅜ in across — is a favorite for patios, paths, dog runs and play areas. Enter your area and depth to see how many cubic yards, tons or bags you need, with an allowance for the way pea gravel shifts and settles.",
    keywords: [
      "pea gravel calculator",
      "how much pea gravel do i need",
      "pea gravel tons",
      "pea gravel patio calculator",
      "bags of pea gravel",
      "pea gravel coverage",
    ],
    howToUse: [
      "Enter the area as a rectangle, circle or known square footage.",
      "Choose a depth: 2–3 in for patios and paths, 3–4 in for dog runs, and much deeper under play equipment.",
      "Keep the density at 1.4 tons per cubic yard unless your supplier says otherwise.",
      "Leave a 10% allowance for settling and stone that migrates.",
      "Read the cubic yards or tons for bulk orders, or the bag count.",
    ],
    formula: {
      lines: [
        "Volume (cu ft) = area × depth (in) ÷ 12 × (1 + waste %)",
        "Cubic yards = cu ft ÷ 27",
        "Tons = cubic yards × 1.4",
        "Bags = cu ft ÷ 0.5, rounded up",
      ],
      notes: [
        "Pea gravel weighs roughly 1.3–1.5 US tons per cubic yard; 1.4 is used as a typical value.",
        "At 2 in deep, a ton of pea gravel covers about 115 sq ft; at 3 in about 77 sq ft.",
      ],
    },
    example: {
      scenario: "A 12 × 12 ft pea gravel patio laid 3 in deep with a 10% allowance.",
      inputs: { shape: 0, length: 12, width: 12, depth: 3, density: 1.4, bagSize: 0.5, waste: 10 },
      expected: { areaSqFt: 144, cubicFeet: 39.6, cubicYards: 1.47, tons: 2.05, bags: 80 },
      steps: [
        "Area = 12 × 12 = 144 sq ft.",
        "Volume = 144 × 3 ÷ 12 = 36 cu ft; plus 10% = 39.6 cu ft.",
        "Cubic yards = 39.6 ÷ 27 = 1.47 cu yd, about 1.47 × 1.4 = 2.05 tons.",
        "Bagged: 39.6 ÷ 0.5 = 79.2, so 80 bags — bulk delivery of 1.5 cu yd is usually cheaper.",
      ],
    },
    tips: [
      "Contain pea gravel with sturdy edging — steel, stone or timber — or it will migrate into the lawn.",
      "Lay 2–4 in of compacted crushed stone under a pea gravel patio so it feels firmer underfoot and furniture legs do not sink.",
      "Use a landscape fabric beneath to keep the stone from mixing into soil.",
      "Keep pea gravel away from the immediate base of doors — the small stones track indoors easily.",
    ],
    faqs: [
      {
        q: "How much does a yard of pea gravel weigh?",
        a: "About 2,600–3,000 lb, or roughly 1.3–1.5 US tons. This calculator uses 1.4 tons per cubic yard.",
      },
      {
        q: "How deep should pea gravel be for a patio?",
        a: "About 2–3 in of pea gravel over a compacted base of crushed stone. Deeper pea gravel is harder to walk on because the round stones roll.",
      },
      {
        q: "How deep should pea gravel be under a swing set?",
        a: "The U.S. Consumer Product Safety Commission's Public Playground Safety Handbook calls for a maintained loose-fill depth of about 9 in for most play equipment. Because loose-fill compresses and scatters, install more than that and top it up regularly.",
      },
      {
        q: "How many bags of pea gravel do I need?",
        a: "Divide the volume in cubic feet by 0.5. For a 10 × 10 ft area at 2 in deep, that is 16.7 cu ft, or 34 bags before any allowance.",
      },
      {
        q: "Is pea gravel good for dog runs?",
        a: "Yes — it drains quickly, is easy to rinse and is comfortable for paws. Use 3–4 in over a compacted base and rake it level regularly.",
      },
    ],
    sources: [
      { title: "Public Playground Safety Handbook", publisher: "U.S. Consumer Product Safety Commission" },
      { title: "Aggregate unit weights and product data", publisher: "National Stone, Sand & Gravel Association" },
      { title: "Hardscape materials for home landscapes", publisher: "University of Florida IFAS Extension" },
    ],
    related: ["gravel-calculator", "river-rock-calculator", "edging-calculator", "decomposed-granite-calculator", "cubic-yard-calculator"],
  },
  {
    slug: "river-rock-calculator",
    name: "River Rock Calculator",
    category: "landscaping",
    kind: "material",
    featured: false,
    seoTitle: "River Rock Calculator – Tons, Yards and Bags of River Rock",
    description:
      "Free river rock calculator: enter your bed or dry creek size and depth to get cubic yards, tons, bags and the square feet one ton of river rock will cover.",
    intro:
      "River rock is usually sold by the ton, but beds are measured in feet. This calculator converts your area and depth into cubic yards, an approximate weight and bag count, and tells you how many square feet a single ton covers at your chosen depth.",
    keywords: [
      "river rock calculator",
      "how much river rock do i need",
      "river rock per ton coverage",
      "landscape rock calculator",
      "decorative rock calculator",
      "dry creek bed rock",
    ],
    howToUse: [
      "Enter the area — split long, winding beds or dry creeks into rectangles, or use a known area.",
      "Choose a depth of about twice the stone size: 2 in for ¾–1½ in rock, 3–4 in for 1½–3 in rock, 5–6 in for 3–5 in rock.",
      "Keep the density at 1.35 tons per cubic yard unless your supplier specifies otherwise.",
      "Leave 10% extra to fill gaps between larger stones.",
      "Order by the ton or cubic yard, or use the bag count for small areas.",
    ],
    formula: {
      lines: [
        "Volume (cu ft) = area × depth (in) ÷ 12 × (1 + waste %)",
        "Cubic yards = cu ft ÷ 27;  tons = cubic yards × 1.35",
        "Coverage per ton (sq ft) = (27 ÷ 1.35) ÷ (depth ÷ 12)",
      ],
      notes: [
        "River rock weighs roughly 1.3–1.4 US tons per cubic yard; size and stone type change this slightly.",
        "Larger stones leave bigger voids, so they need a deeper layer to hide the fabric or soil below.",
      ],
    },
    example: {
      scenario: "A 20 × 4 ft drainage bed along a foundation, filled 3 in deep with 1–2 in river rock.",
      inputs: { shape: 0, length: 20, width: 4, depth: 3, density: 1.35, bagSize: 0.5, waste: 10 },
      expected: { areaSqFt: 80, cubicFeet: 22, cubicYards: 0.815, tons: 1.1, coveragePerTon: 80 },
      steps: [
        "Area = 20 × 4 = 80 sq ft.",
        "Volume = 80 × 3 ÷ 12 = 20 cu ft; plus 10% = 22 cu ft = 0.81 cu yd.",
        "Weight = 0.81 × 1.35 = 1.1 tons.",
        "At 3 in deep, one ton covers (27 ÷ 1.35) ÷ 0.25 = 80 sq ft, which confirms roughly 1.1 tons for this bed.",
      ],
    },
    tips: [
      "Lay a heavy-duty landscape fabric first so weeds do not grow through and stones do not sink into soil.",
      "Mix two or three stone sizes for a natural dry creek look — large stones on the banks, smaller in the channel.",
      "Rock beds against the house should slope away from the foundation so water drains outward.",
      "River rock absorbs and radiates heat; keep it away from heat-sensitive plants in hot climates.",
    ],
    faqs: [
      {
        q: "How many square feet does a ton of river rock cover?",
        a: "At 2 in deep about 120 sq ft, at 3 in about 80 sq ft and at 4 in about 60 sq ft, assuming 1.35 tons per cubic yard. Large stones cover a little less because they need a deeper layer.",
      },
      {
        q: "How deep should river rock be?",
        a: "A good rule is about twice the average stone size so no soil or fabric shows through — roughly 2 in for small ¾–1½ in rock and 4–6 in for 3–5 in rock.",
      },
      {
        q: "How much does a cubic yard of river rock weigh?",
        a: "Roughly 2,600–2,800 lb (about 1.3–1.4 US tons).",
      },
      {
        q: "How many bags of river rock equal a ton?",
        a: "Bags are typically 0.5 cu ft and weigh about 50 lb, so a US ton is about 40 bags. That is usually far more expensive than bulk rock once you need more than half a ton.",
      },
      {
        q: "Is river rock better than mulch?",
        a: "Rock never needs replacing and will not blow or float away, so it suits drainage areas and foundation strips. Mulch is better for planting beds because it feeds the soil, keeps roots cooler and holds moisture.",
      },
    ],
    sources: [
      { title: "Aggregate unit weights and product data", publisher: "National Stone, Sand & Gravel Association" },
      { title: "Inorganic mulches in the landscape", publisher: "Utah State University Extension" },
      { title: "Rain gardens and dry creek beds", publisher: "University of Wisconsin–Madison Extension" },
    ],
    related: ["gravel-calculator", "pea-gravel-calculator", "edging-calculator", "mulch-calculator", "cubic-yard-calculator"],
  },
  {
    slug: "compost-calculator",
    name: "Compost Calculator",
    category: "landscaping",
    kind: "material",
    featured: false,
    seoTitle: "Compost Calculator – Cubic Yards and Bags of Compost",
    description:
      "Free compost calculator: work out cubic yards or bags of compost to top-dress a lawn, side-dress beds or amend new garden soil, based on area and depth.",
    intro:
      "How much compost you need depends on how you use it: a thin ¼ in top-dressing on a lawn, an inch around established plants, or a couple of inches worked into a new bed. Pick the use and enter the area, and the calculator gives you the cubic yards and bag count.",
    keywords: [
      "compost calculator",
      "how much compost do i need",
      "compost for lawn top dressing",
      "cubic yards of compost",
      "compost for garden beds",
      "bags of compost calculator",
    ],
    howToUse: [
      "Enter the area as a rectangle, circle or known square footage.",
      "Choose how you will use the compost — or 'Custom depth' to enter your own.",
      "Check the bag size (often 0.75 or 1 cu ft) if you are buying bagged compost.",
      "Read the cubic yards for bulk delivery or the bags needed.",
    ],
    formula: {
      lines: [
        "Volume (cu ft) = area × depth (in) ÷ 12 × (1 + waste %)",
        "Cubic yards = cu ft ÷ 27",
        "Bags = cu ft ÷ bag size, rounded up",
      ],
      notes: [
        "Preset depths: lawn top-dressing ¼ in, mulching or side-dressing beds 1 in, amending a new bed 2 in (then tilled into the top 6–8 in of soil).",
        "Many extension services advise against more than about 2–3 in of compost mixed into beds each year, to avoid excess salts and phosphorus.",
      ],
    },
    example: {
      scenario: "Amending a new 20 × 10 ft vegetable garden with 2 in of compost (5% extra), bought in 1 cu ft bags.",
      inputs: { shape: 0, length: 20, width: 10, use: 2, bagSize: 1, waste: 5 },
      expected: { areaSqFt: 200, cubicFeet: 35, cubicYards: 1.296, bags: 35 },
      steps: [
        "Area = 20 × 10 = 200 sq ft.",
        "Volume = 200 × 2 ÷ 12 = 33.3 cu ft; plus 5% = 35 cu ft.",
        "Cubic yards = 35 ÷ 27 = 1.3 cu yd.",
        "Bags = 35 ÷ 1 = 35 one-cubic-foot bags — a 1.25–1.5 yard bulk load would likely cost less.",
      ],
    },
    tips: [
      "Screen compost to ½ in or finer for lawn top-dressing so it falls between the grass blades.",
      "Top-dress lawns after core aeration so compost works into the holes.",
      "Use finished compost that smells earthy, not sour or ammonia-like; unfinished compost can tie up nitrogen.",
      "Ask municipal yard-waste programs — many sell screened compost in bulk at low cost.",
    ],
    faqs: [
      {
        q: "How much compost do I need to top-dress a lawn?",
        a: "About ¼ in. For 1,000 sq ft that is about 21 cu ft, or 0.77 cubic yard; for a 5,000 sq ft lawn about 3.9 cubic yards.",
      },
      {
        q: "How much compost should I add to a garden bed?",
        a: "For a new bed, spread 1–3 in and mix it into the top 6–8 in of soil. For established beds, 1 in spread around plants each year is usually enough.",
      },
      {
        q: "How many bags of compost make a cubic yard?",
        a: "A cubic yard is 27 cu ft: 27 bags of 1 cu ft or 36 bags of 0.75 cu ft.",
      },
      {
        q: "Can you use too much compost?",
        a: "Yes. Very heavy, repeated applications can build up phosphorus and salts and make soil too loose. Keep annual additions moderate, and test your soil every few years.",
      },
      {
        q: "How much area does a yard of compost cover?",
        a: "About 1,296 sq ft at ¼ in, 324 sq ft at 1 in and 162 sq ft at 2 in.",
      },
    ],
    sources: [
      { title: "Using compost in the garden and landscape", publisher: "Cornell Waste Management Institute / Cornell Cooperative Extension" },
      { title: "Composting and compost use", publisher: "U.S. Environmental Protection Agency" },
      { title: "Top-dressing lawns with compost", publisher: "Washington State University Extension" },
    ],
    related: ["topsoil-calculator", "raised-bed-soil-calculator", "mulch-calculator", "grass-seed-calculator", "cubic-yard-calculator"],
  },
  {
    slug: "decomposed-granite-calculator",
    name: "Decomposed Granite Calculator",
    category: "landscaping",
    kind: "material",
    featured: false,
    seoTitle: "Decomposed Granite Calculator – Yards and Tons of DG",
    description:
      "Free decomposed granite calculator: get cubic yards and tons of DG for paths and patios, with a compaction allowance and an optional crushed-stone base layer.",
    intro:
      "Decomposed granite (DG) is a fine, sandy crushed granite that compacts into a firm, natural-looking surface for paths, patios and garden floors. Enter the area and finished depth, add a base layer if you need one, and the calculator gives you the cubic yards and tons of DG and base to order — allowing for the compaction DG goes through when it is wetted and rolled.",
    keywords: [
      "decomposed granite calculator",
      "how much decomposed granite do i need",
      "dg calculator",
      "decomposed granite tons",
      "stabilized dg path",
      "decomposed granite patio",
    ],
    howToUse: [
      "Enter the path or patio area as a rectangle, circle or known area.",
      "Enter the finished DG depth: 2–3 in for paths, 3–4 in for patios.",
      "On clay soils or for any vehicle use, add a 4 in base of compacted road base.",
      "Keep the 15% compaction allowance — DG compacts significantly when wetted and rolled.",
      "Order the DG and base in cubic yards or tons.",
    ],
    formula: {
      lines: [
        "DG volume (cu ft) = area × depth (in) ÷ 12 × (1 + compaction %)",
        "Cubic yards = cu ft ÷ 27;  tons = cubic yards × 1.4",
        "Base cubic yards = area × base depth ÷ 12 × (1 + compaction %) ÷ 27;  base tons = × 1.5",
      ],
      notes: [
        "Density assumptions: DG ~1.4 US tons per cubic yard (range about 1.3–1.5); road base ~1.5.",
        "Stabilized DG (pre-mixed with a binder) is installed the same way but must be compacted while damp in 2 in lifts.",
      ],
    },
    example: {
      scenario: "A 30 × 4 ft garden path with 3 in of DG over a 4 in compacted base, with 15% compaction allowance.",
      inputs: { shape: 0, length: 30, width: 4, depth: 3, density: 1.4, baseDepth: 4, baseDensity: 1.5, waste: 15 },
      expected: { areaSqFt: 120, cubicYards: 1.278, tons: 1.789, baseCubicYards: 1.704, baseTons: 2.556 },
      steps: [
        "Area = 30 × 4 = 120 sq ft.",
        "DG = 120 × 3 ÷ 12 = 30 cu ft; plus 15% = 34.5 cu ft = 1.28 cu yd ≈ 1.79 tons.",
        "Base = 120 × 4 ÷ 12 = 40 cu ft; plus 15% = 46 cu ft = 1.70 cu yd ≈ 2.56 tons.",
        "Order about 1.25–1.5 cu yd of DG and 1.75 cu yd of base.",
      ],
    },
    tips: [
      "Install DG in 1–2 in layers, misting each layer and compacting it with a plate compactor or hand tamper.",
      "Use rigid edging (steel, concrete or timber) — DG paths without edging spread and crumble at the margins.",
      "Crown or slope the path slightly (about 2%) so water runs off instead of washing out fines.",
      "Consider stabilized DG for slopes, high-traffic patios and accessible routes where a firmer surface is needed.",
    ],
    faqs: [
      {
        q: "How deep should decomposed granite be?",
        a: "About 2–3 in for garden paths and 3–4 in for patios, laid over a firm, compacted subgrade. Add a 3–4 in road-base layer on clay or for driveway use.",
      },
      {
        q: "How much does a yard of decomposed granite weigh?",
        a: "Roughly 2,600–3,000 lb (about 1.3–1.5 US tons) when dry. This calculator uses 1.4 tons per cubic yard.",
      },
      {
        q: "How much area does a ton of DG cover?",
        a: "At 3 in compacted depth, a ton covers roughly 60–70 sq ft once you allow for compaction. At 2 in it covers about 90–100 sq ft.",
      },
      {
        q: "Why does DG need a compaction allowance?",
        a: "Loose DG contains air between the particles. Wetting and compacting it reduces its volume by roughly 15–25%, so you need more loose material than the finished depth suggests.",
      },
      {
        q: "Does decomposed granite need a base?",
        a: "On well-draining, firm soil, DG can go directly on a compacted subgrade. On clay, soft soil or where vehicles will drive, add 3–4 in of compacted road base underneath.",
      },
    ],
    sources: [
      { title: "Decomposed granite paths and patios", publisher: "University of California Agriculture and Natural Resources" },
      { title: "Aggregate unit weights and product data", publisher: "National Stone, Sand & Gravel Association" },
      { title: "Firm and stable surfaces for accessible routes", publisher: "U.S. Access Board" },
    ],
    related: ["gravel-calculator", "pea-gravel-calculator", "paver-base-calculator", "edging-calculator", "cubic-yard-calculator"],
  },
  {
    slug: "edging-calculator",
    name: "Edging Calculator",
    category: "landscaping",
    kind: "material",
    featured: false,
    seoTitle: "Landscape Edging Calculator – Feet, Rolls and Stakes",
    description:
      "Free landscape edging calculator: find the feet of edging, rolls or strips, stakes and connectors for rectangular beds, round beds or curved borders.",
    intro:
      "Edging keeps mulch, gravel and lawn where they belong. Choose a rectangular bed, round bed or measured curve, enter the size, and this calculator tells you how many feet of edging to buy, how many rolls or strips that is, and how many stakes and connectors to pick up.",
    keywords: [
      "edging calculator",
      "landscape edging calculator",
      "how much edging do i need",
      "garden border calculator",
      "lawn edging feet",
      "edging stakes calculator",
    ],
    howToUse: [
      "Choose the bed shape. For curved beds, lay a garden hose along the line and measure the hose.",
      "Enter the dimensions; for rectangles, enter any length that does not need edging, such as a side along the house.",
      "Enter the length of one roll or strip and the stake spacing from the product instructions.",
      "Keep 10% extra for overlaps at joints and gentle curves.",
      "Read the total feet, rolls or strips, stakes and connectors.",
    ],
    formula: {
      lines: [
        "Rectangle edge = 2 × (length + width) − length not edged",
        "Round bed edge = π × diameter",
        "Edging to buy = edge × (1 + waste %);  rolls = edging ÷ roll length, rounded up",
        "Stakes = edging ÷ spacing, rounded up (+1 for an open run)",
      ],
      notes: [
        "A closed loop needs one connector per piece; an open run needs one fewer.",
        "Stake spacing depends on the product: plastic edging is often staked every 3–4 ft, and more closely on curves.",
      ],
    },
    example: {
      scenario: "A 12 × 6 ft bed against the house (the 12 ft back side needs no edging), with 20 ft plastic edging rolls and stakes every 4 ft.",
      inputs: { shape: 0, length: 12, width: 6, exclude: 12, pieceLength: 20, stakeSpacing: 4, waste: 10 },
      expected: { edgeLength: 24, edgingLength: 26.4, pieces: 2, stakes: 8, connectors: 1 },
      steps: [
        "Edge = 2 × (12 + 6) − 12 = 24 ft.",
        "Add 10%: 24 × 1.10 = 26.4 ft.",
        "Rolls = 26.4 ÷ 20 = 1.32, so 2 rolls, joined with 1 connector.",
        "Stakes = 26.4 ÷ 4 = 6.6 → 7, plus 1 for the end of the open run = 8 stakes.",
      ],
    },
    tips: [
      "Set edging so the top sits about ½ in above the soil or turf — high enough to stop roots, low enough for a mower wheel.",
      "Steel and aluminum edging hold crisp lines and last decades; plastic is cheaper and easier to curve.",
      "Dig a narrow trench with a flat spade first; edging pounded into undisturbed soil tends to buckle.",
      "On tight curves, add extra stakes to stop the edging springing back straight.",
    ],
    faqs: [
      {
        q: "How do I measure for landscape edging?",
        a: "Measure every edge that needs a border. For straight beds, add up the sides; for round beds, multiply the diameter by 3.14; for free-form curves, lay a hose along the line and measure the hose.",
      },
      {
        q: "How much edging do I need for a circle around a tree?",
        a: "Multiply the ring diameter by 3.14. A 6 ft ring needs about 19 ft of edging, or about 21 ft with overlap.",
      },
      {
        q: "How many stakes do I need for edging?",
        a: "Follow the product instructions — commonly one stake every 3–4 ft for plastic edging, plus one at each end and extras on curves. For 40 ft of edging at 4 ft spacing, plan on about 11 stakes.",
      },
      {
        q: "How deep should landscape edging be installed?",
        a: "Most edging is 4–6 in tall and is buried so only about ½ in shows. Taller edging (6 in or more) is better at stopping spreading grasses such as Bermuda.",
      },
      {
        q: "What is the most durable landscape edging?",
        a: "Steel, aluminum, concrete and stone edging typically outlast plastic by many years and hold straight lines best. Heavy-gauge plastic is the budget choice and handles curves easily.",
      },
    ],
    sources: [
      { title: "Installation instructions for landscape edging", publisher: "Manufacturer product guides (e.g. Dimex, Col-Met)" },
      { title: "Landscape design and installation basics", publisher: "University of Florida IFAS Extension" },
    ],
    related: ["mulch-calculator", "pea-gravel-calculator", "tree-ring-calculator", "perimeter-calculator", "linear-feet-calculator"],
  },
  {
    slug: "tree-ring-calculator",
    name: "Tree Ring Calculator",
    category: "landscaping",
    kind: "material",
    featured: false,
    seoTitle: "Tree Ring Calculator – Mulch Bags for a Ring Around a Tree",
    description:
      "Free tree ring calculator: find the mulch or stone bags for rings around one or more trees, leaving a gap at the trunk, plus edging length for each ring.",
    intro:
      "A mulch ring protects a tree from mower and trimmer damage and keeps its roots cool and moist. Enter the ring diameter, trunk size and the bare gap you will leave at the bark, and this calculator works out the ring area, the mulch or stone to buy for one tree or a whole row, and the edging to go around them.",
    keywords: [
      "tree ring calculator",
      "mulch around tree calculator",
      "how much mulch around a tree",
      "tree ring mulch bags",
      "tree ring edging",
      "mulch ring size",
    ],
    howToUse: [
      "Enter the number of trees that will get identical rings.",
      "Enter the ring diameter — at least 3–4 ft, and ideally wider toward the drip line.",
      "Enter the trunk diameter and the bare gap to leave around the trunk (a few inches).",
      "Choose the depth (2–4 in) and the bag size — 2 cu ft for mulch, 0.5 cu ft for decorative stone.",
      "Read the bags to buy and the edging length if you are bordering the rings.",
    ],
    formula: {
      lines: [
        "Hole diameter = trunk diameter + 2 × gap",
        "Ring area = π ÷ 4 × (ring diameter² − hole diameter²)",
        "Volume = ring area × depth (in) ÷ 12 × trees × (1 + waste %)",
        "Bags = volume ÷ bag size, rounded up;  edging = π × ring diameter × trees",
      ],
      notes: [
        "Arborists recommend 2–4 in of mulch, pulled back from the trunk — never piled against the bark in a 'mulch volcano'.",
      ],
    },
    example: {
      scenario: "Three young trees with 8 in trunks, each getting a 6 ft ring of mulch 3 in deep with a 3 in gap at the trunk, using 2 cu ft bags.",
      inputs: { trees: 3, ringDiameter: 6, trunk: 8, gap: 3, depth: 3, bagSize: 2, waste: 5 },
      expected: { ringArea: 27.21, cubicFeet: 21.42, cubicYards: 0.794, bags: 11, edging: 56.55 },
      steps: [
        "Hole = 8 + 2 × 3 = 14 in = 1.17 ft.",
        "Ring area = 0.785 × (6² − 1.17²) = 0.785 × 34.64 = 27.2 sq ft per tree.",
        "Volume = 27.2 × 3 ÷ 12 × 3 trees = 20.4 cu ft; plus 5% = 21.4 cu ft.",
        "Bags = 21.4 ÷ 2 = 10.7 → 11 bags. Edging = 3.14 × 6 × 3 = 56.5 ft.",
      ],
    },
    tips: [
      "A wider, shallow ring is better for the tree than a narrow, deep one.",
      "Avoid piling mulch against the trunk — it holds moisture against the bark and invites rot, insects and rodents.",
      "Do not add soil or edging stones over existing roots; it can suffocate them.",
      "Refresh the ring each year to keep it at 2–3 in, removing excess if it has built up.",
    ],
    faqs: [
      {
        q: "How big should a mulch ring around a tree be?",
        a: "At least 3–4 ft across for young trees, and ideally wider — out toward the drip line — as the tree grows. A wider ring means less root competition from turf.",
      },
      {
        q: "How many bags of mulch do I need around a tree?",
        a: "A 6 ft ring 3 in deep needs about 7 cu ft (allowing for the trunk), so 4 bags of 2 cu ft. A 4 ft ring at the same depth needs about 3 cu ft, or 2 bags.",
      },
      {
        q: "How deep should mulch be around a tree?",
        a: "Two to four inches, kept a few inches away from the trunk. Deeper mulch can starve roots of oxygen and hold too much moisture.",
      },
      {
        q: "Can I use rock instead of mulch around a tree?",
        a: "You can, but organic mulch is better for the tree because it breaks down, feeds the soil and keeps roots cooler. Rock can heat up in the sun and does not improve the soil.",
      },
      {
        q: "What is a mulch volcano?",
        a: "A cone of mulch piled high against a trunk. It is a common mistake that can lead to bark decay, girdling roots and pests. Keep mulch flat, wide and away from the bark.",
      },
    ],
    sources: [
      { title: "Proper mulching techniques", publisher: "International Society of Arboriculture (TreesAreGood.org)" },
      { title: "Mulching trees and shrubs", publisher: "Morton Arboretum" },
      { title: "Mulch for trees", publisher: "USDA Forest Service" },
    ],
    related: ["mulch-calculator", "edging-calculator", "river-rock-calculator", "circle-triangle-area-calculator"],
  },
  {
    slug: "landscape-cost-calculator",
    name: "Landscape Cost Calculator",
    category: "landscaping",
    kind: "cost",
    featured: false,
    seoTitle: "Landscaping Cost Calculator – Sod, Plants, Patio and Irrigation",
    description:
      "Free landscaping cost calculator: estimate a yard project from sod, planting beds, shrubs, trees, paver patio and irrigation using editable typical US prices.",
    intro:
      "Landscaping quotes are hard to compare because every project mixes different pieces. This calculator lets you build your own estimate line by line — new sod, planting beds, shrubs, trees, a paver patio and irrigation zones — using typical installed US prices that you can replace with your local quotes, plus a contingency for the unexpected.",
    keywords: [
      "landscaping cost calculator",
      "landscape cost estimator",
      "how much does landscaping cost",
      "backyard landscaping cost",
      "sod installation cost",
      "yard makeover budget",
    ],
    howToUse: [
      "Enter the area of new sod and of planting beds; leave any item you are not doing at 0.",
      "Enter the number of shrubs and trees to plant.",
      "Add the area of any paver patio or walkway and the number of irrigation zones.",
      "Replace the default prices with quotes from local landscapers or nurseries where you have them.",
      "Keep a 10–15% contingency and read the estimated total and cost breakdown.",
    ],
    formula: {
      lines: [
        "Lawn & plants = sod area × sod price + bed area × bed price + shrubs × shrub price + trees × tree price",
        "Hardscape = patio area × patio price;  irrigation = zones × price per zone",
        "Total = (lawn & plants + hardscape + irrigation + design & other) × (1 + contingency %)",
      ],
      notes: [
        "Prices are installed (materials + labor) and represent typical US ranges; they vary widely by region, access, soil and season.",
      ],
    },
    example: {
      scenario: "1,000 sq ft of sod, 200 sq ft of planting beds, 10 shrubs, 2 trees and a 150 sq ft paver patio, with a 10% contingency.",
      inputs: {
        sodArea: 1000,
        sodPrice: 1.5,
        bedArea: 200,
        bedPrice: 5,
        shrubs: 10,
        shrubPrice: 75,
        trees: 2,
        treePrice: 400,
        patioArea: 150,
        patioPrice: 25,
        zones: 0,
        design: 0,
        contingency: 10,
      },
      expected: { softscape: 4050, hardscape: 3750, contingencyAmount: 780, total: 8580, perSqFt: 6.356 },
      steps: [
        "Sod = 1,000 × $1.50 = $1,500; beds = 200 × $5 = $1,000.",
        "Plants = 10 × $75 + 2 × $400 = $1,550, so lawn & plants = $4,050.",
        "Patio = 150 × $25 = $3,750. Subtotal = $7,800.",
        "Contingency = 10% × $7,800 = $780, for a total of $8,580 — about $6.36 per sq ft of the 1,350 sq ft project area.",
      ],
    },
    tips: [
      "Get at least three itemized quotes so you can compare the same scope line by line.",
      "Do hardscape (patios, walls, drainage) before planting and sod — heavy equipment ruins new lawns.",
      "Plants are cheaper in smaller container sizes; a 1-gallon shrub often catches up with a 5-gallon one within a few seasons.",
      "Phase a large plan over several years, starting with grading, drainage and irrigation.",
    ],
    faqs: [
      {
        q: "How much does it cost to landscape a backyard?",
        a: "It varies enormously with scope. A simple refresh with sod and a few beds may cost a few thousand dollars; projects with patios, irrigation, lighting and mature trees often run into the tens of thousands. Build your own scope above to see where your project lands.",
      },
      {
        q: "How much does sod installation cost per square foot?",
        a: "Typically about $1–$2.50 per sq ft installed, including basic soil preparation, depending on the grass, region and how much grading is needed. Sod alone, picked up, is usually well under half of that.",
      },
      {
        q: "How much does it cost to plant a tree?",
        a: "Installed prices commonly range from about $150 for a small container tree to $1,000 or more for a large balled-and-burlapped tree, depending on size, species and access.",
      },
      {
        q: "How much does a sprinkler system cost?",
        a: "Installers often price by zone; a typical residential zone runs roughly $600–$1,500 installed, and an average yard needs several zones. Soil, water pressure and controller choice affect the price.",
      },
      {
        q: "How much contingency should I add to a landscaping budget?",
        a: "Ten to fifteen percent is sensible. Rocky or compacted soil, drainage problems and buried utilities or debris are common surprises once digging starts.",
      },
    ],
    sources: [
      { title: "Landscape installation cost factors", publisher: "National Association of Landscape Professionals" },
      { title: "Planting and establishing trees", publisher: "International Society of Arboriculture (TreesAreGood.org)" },
      { title: "WaterSense: landscaping and irrigation tips", publisher: "U.S. Environmental Protection Agency" },
    ],
    related: ["sod-calculator", "mulch-calculator", "paver-calculator", "renovation-budget-calculator", "grass-seed-calculator"],
    cost: {
      priceRange:
        "installed prices of about $1–$2.50/sq ft for sod, $3–$10/sq ft for bed preparation, $30–$150 per shrub, $150–$1,000+ per tree, $15–$40/sq ft for paver patios and $600–$1,500 per irrigation zone",
      assumptions: [
        "All prices are installed (materials and labor) for a typical suburban US lot with reasonable access.",
        "Bed preparation covers soil amendment, edging and mulch; plants are priced separately.",
        "Excludes major grading, retaining walls, drainage systems, lighting and removal of large trees or stumps.",
        "Design fees, permits and delivery charges go in the 'Design, permits & other' field.",
        "Prices vary widely by region and season — replace the defaults with local quotes.",
      ],
      updated: UPDATED,
    },
  },
];
