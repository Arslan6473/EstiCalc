import type { CalculatorContent } from "../types";

const UPDATED = "2026-10-28";

const QUIKRETE_SOURCE = { title: "Concrete Mix (No. 1101) product data sheet — bag yields", publisher: "Quikrete" };
const PCA_SOURCE = { title: "Concrete basics and design and control of concrete mixtures", publisher: "Portland Cement Association" };
const ACI_SOURCE = { title: "ACI 332: Residential Code Requirements for Structural Concrete", publisher: "American Concrete Institute" };
const IRC_FOUNDATIONS = { title: "International Residential Code, Chapter 4 Foundations", publisher: "International Code Council" };

export const content: CalculatorContent[] = [
  {
    slug: "concrete-slab-calculator",
    name: "Concrete Slab Calculator",
    category: "concrete-masonry",
    kind: "material",
    featured: true,
    seoTitle: "Concrete Slab Calculator – Cubic Yards and Bags for a Slab",
    description:
      "Free concrete slab calculator: enter length, width and thickness to get cubic yards of ready-mix or the number of 60 lb and 80 lb bags, with waste included.",
    intro:
      "Work out how much concrete you need for a patio, shed base, walkway or garage floor. Enter the slab's length, width and thickness, and the calculator gives the volume in cubic yards (for ordering ready-mix) and cubic feet, plus how many 80 lb or 60 lb bags you would need to mix it yourself.",
    keywords: [
      "concrete slab calculator",
      "concrete calculator",
      "how much concrete do i need",
      "cubic yards of concrete for slab",
      "concrete yardage calculator",
      "how many bags of concrete for a slab",
    ],
    howToUse: [
      "Measure the slab's length and width inside the forms.",
      "Enter the thickness in inches — 4 in for patios and walks, 5–6 in for driveways and slabs that carry vehicles.",
      "Keep at least a 5–10% allowance for spillage, uneven subgrade and form bulge.",
      "Read the cubic yards to order, or the number of bags if you are mixing by hand.",
    ],
    formula: {
      lines: [
        "Volume (cu ft) = length × width × (thickness ÷ 12) × (1 + waste %)",
        "Cubic yards = cubic feet ÷ 27",
        "80 lb bags = cubic feet ÷ 0.60;  60 lb bags = cubic feet ÷ 0.45",
      ],
      notes: [
        "Bag yields are from Quikrete's data sheet: an 80 lb bag makes about 0.60 cu ft and a 60 lb bag about 0.45 cu ft of concrete.",
        "1 cubic yard = 27 cubic feet ≈ 0.76 m³. A 4 in slab uses about 1.23 cu yd per 100 sq ft before waste.",
      ],
    },
    example: {
      scenario: "A 10 × 10 ft shed slab, 4 in thick, with a 10% allowance.",
      inputs: { length: 10, width: 10, thickness: 4, waste: 10 },
      expected: { area: 100, cubicFeet: 36.667, yards: 1.358, bags80: 62, bags60: 82 },
      steps: [
        "Volume = 10 × 10 × (4 ÷ 12) = 33.33 cu ft.",
        "Add 10%: 33.33 × 1.10 = 36.67 cu ft = 36.67 ÷ 27 = 1.36 cu yd.",
        "80 lb bags = 36.67 ÷ 0.60 = 61.1 → 62 bags (or 82 sixty-pound bags).",
        "At 62 bags it is usually easier and cheaper to order 1.5 cu yd of ready-mix.",
      ],
    },
    tips: [
      "Ready-mix usually becomes cheaper and much easier than bags above about 1 cubic yard (roughly 45 bags of 80 lb).",
      "Compact 4 in of gravel under the slab and check the forms are level — an extra 1/2 in of depth over a 10 × 10 slab adds about 4 cu ft.",
      "Place control joints at intervals of roughly 2–3 times the slab thickness in feet (8–12 ft for a 4 in slab) and at least a quarter of the slab depth.",
      "Order ready-mix in quarter-yard steps and ask about short-load fees for small orders.",
    ],
    faqs: [
      {
        q: "How much concrete do I need for a 10 × 10 slab?",
        a: "A 10 × 10 ft slab 4 in thick is 33.3 cu ft, or 1.23 cu yd. With 10% extra, plan on about 1.36 cu yd — 62 bags of 80 lb mix, or order 1.5 yards of ready-mix.",
      },
      {
        q: "How many bags of concrete for a 12 × 12 slab?",
        a: "A 12 × 12 × 4 in slab is 48 cu ft. With 10% waste that is 52.8 cu ft — 88 bags of 80 lb concrete or 118 bags of 60 lb. Ready-mix (about 2 cu yd) is the practical choice.",
      },
      {
        q: "How thick should a concrete slab be?",
        a: "4 in is standard for patios, sidewalks and shed floors; 5–6 in for driveways and garage floors; 6 in or more for heavy vehicles. The IRC requires at least 3-1/2 in for interior floor slabs on ground.",
      },
      {
        q: "How many square feet does a yard of concrete cover?",
        a: "One cubic yard covers 81 sq ft at 4 in thick, 65 sq ft at 5 in and 54 sq ft at 6 in.",
      },
      {
        q: "How much extra concrete should I order?",
        a: "Most contractors add 5–10%. Running short mid-pour is far more costly than a little leftover, so use 10% for hand-dug or uneven bases.",
      },
    ],
    sources: [QUIKRETE_SOURCE, PCA_SOURCE, { title: "International Residential Code, Section R506 Concrete Floors (On Ground)", publisher: "International Code Council" }],
    related: ["concrete-bags-calculator", "concrete-cost-calculator", "cubic-yard-calculator", "gravel-calculator", "footing-calculator"],
  },
  {
    slug: "concrete-bags-calculator",
    name: "Concrete Bags Calculator",
    category: "concrete-masonry",
    kind: "material",
    featured: true,
    seoTitle: "Concrete Bag Calculator – How Many Bags of Concrete Do I Need?",
    description:
      "How many bags of concrete do you need? Enter a slab or round hole size and choose 40, 50, 60 or 80 lb bags to get the bag count, volume and total weight.",
    intro:
      "Find out exactly how many bags of premixed concrete to buy. Choose a rectangular slab or pad, or a round hole or column, enter its size and how many you are pouring, and pick your bag size. The calculator uses manufacturer bag yields to give the number of bags, the volume and the total weight you'll be hauling.",
    keywords: [
      "concrete bag calculator",
      "how many bags of concrete do i need",
      "80 lb bag of concrete coverage",
      "60 lb bag concrete calculator",
      "quikrete calculator",
      "bags of concrete per cubic yard",
    ],
    howToUse: [
      "Choose the shape: a slab/pad or a round hole/column.",
      "Enter the dimensions (thickness or diameter in inches) and how many identical pours you have.",
      "Choose the bag size you plan to buy.",
      "Keep the 10% allowance and read the number of bags.",
    ],
    formula: {
      lines: [
        "Slab volume = length × width × (thickness ÷ 12);  Round volume = π × (diameter ÷ 24)² × depth",
        "Total volume = volume × count × (1 + waste %)",
        "Bags = total volume ÷ bag yield (40 lb ≈ 0.30, 50 lb ≈ 0.375, 60 lb ≈ 0.45, 80 lb ≈ 0.60 cu ft), rounded up",
      ],
      notes: [
        "Yields are from Quikrete and Sakrete product data and assume standard concrete mix. Fast-setting and high-strength mixes are similar per pound — check the bag.",
        "It takes about 45 bags of 80 lb or 60 bags of 60 lb to make one cubic yard.",
      ],
    },
    example: {
      scenario: "An 8 × 6 ft pad for an AC unit or hot tub step, 4 in thick, using 60 lb bags.",
      inputs: { shape: 0, length: 8, width: 6, depth: 4, count: 1, bag: 60, waste: 10 },
      expected: { cubicFeet: 17.6, yards: 0.6519, bags: 40, weight: 2400 },
      steps: [
        "Volume = 8 × 6 × (4 ÷ 12) = 16 cu ft.",
        "Add 10%: 16 × 1.10 = 17.6 cu ft (0.65 cu yd).",
        "60 lb bags = 17.6 ÷ 0.45 = 39.1 → 40 bags.",
        "40 bags × 60 lb = 2,400 lb — that's more than a typical pickup's payload, so plan two trips or delivery.",
      ],
    },
    tips: [
      "80 lb bags are cheaper per cubic foot; 60 or 50 lb bags are much easier to lift and mix by hand.",
      "Rent a drum mixer for anything over about 15–20 bags.",
      "Add water gradually — the bag lists about 3 quarts per 80 lb bag (check the label). Too much water weakens concrete.",
      "Keep the bags dry and off the ground; hardened lumps mean the cement has started to hydrate.",
    ],
    faqs: [
      {
        q: "How many 80 lb bags of concrete make a yard?",
        a: "One cubic yard is 27 cu ft. At 0.60 cu ft per bag, it takes 45 bags of 80 lb concrete — or 60 bags of 60 lb, or 90 bags of 40 lb.",
      },
      {
        q: "How much does an 80 lb bag of concrete cover?",
        a: "An 80 lb bag yields about 0.60 cu ft: enough for 1.8 sq ft at 4 in thick, 2.4 sq ft at 3 in, or 3.6 sq ft at 2 in.",
      },
      {
        q: "How many bags of concrete for a fence post?",
        a: "A 10 in diameter hole 3 ft deep holds about 1.6 cu ft; minus a 4×4 post that is about 1.4 cu ft, or roughly 2.5 bags of 80 lb or 4 bags of 50 lb fast-setting mix per post. Use the post hole calculator for details.",
      },
      {
        q: "Is it cheaper to buy bags or ready-mix concrete?",
        a: "Bags are cheaper for small jobs under about 1 cu yd. Above that, ready-mix is usually cheaper and gives a stronger, more uniform pour, though small loads may carry a short-load fee.",
      },
      {
        q: "What is the difference between 60 lb and 80 lb bags?",
        a: "Only the amount: both are the same mix. An 80 lb bag makes 0.60 cu ft and a 60 lb bag 0.45 cu ft, so you need a third more 60 lb bags.",
      },
    ],
    sources: [QUIKRETE_SOURCE, { title: "Concrete Mix product information — yields", publisher: "Sakrete" }, PCA_SOURCE],
    related: ["concrete-slab-calculator", "post-hole-calculator", "concrete-column-calculator", "concrete-cost-calculator"],
  },
  {
    slug: "footing-calculator",
    name: "Footing Calculator",
    category: "concrete-masonry",
    kind: "material",
    safety: true,
    seoTitle: "Footing Calculator – Concrete for Continuous and Pad Footings",
    description:
      "Calculate concrete for continuous wall footings and square pad footings in cubic yards, cubic feet and 80 lb bags. Includes IRC minimum size guidance.",
    intro:
      "Estimate the concrete for a foundation footing. Enter the length, width and thickness of a continuous (strip) footing and, if you have them, the number and size of square pad footings for posts or piers. The calculator totals the volume in cubic yards for ordering, with a waste allowance for trench irregularities.",
    keywords: [
      "footing calculator",
      "concrete footing calculator",
      "how much concrete for footings",
      "foundation footing calculator",
      "pad footing concrete calculator",
    ],
    howToUse: [
      "Enter the total length of continuous footing (for a foundation, the perimeter plus any interior bearing lines).",
      "Enter the footing width and thickness from your plans. The IRC minimums are 12 in wide and 6 in thick, but loads and soil often require more.",
      "Add any square pad footings and their size and thickness.",
      "Keep a 10% allowance and read the cubic yards to order.",
    ],
    formula: {
      lines: [
        "Continuous footing = length × (width ÷ 12) × (thickness ÷ 12)",
        "Pad footings = number × (pad width ÷ 12)² × (pad thickness ÷ 12)",
        "Total (cu yd) = (continuous + pads) × (1 + waste %) ÷ 27",
      ],
      notes: [
        "Footings must bear on undisturbed soil below the local frost depth (IRC R403.1.4). Your building department sets that depth.",
        "Earth-formed trenches are rarely exactly square, so 10–15% extra is common.",
      ],
    },
    example: {
      scenario: "A 60 ft perimeter footing 16 in wide and 8 in thick, plus four 24 × 24 in pads 12 in thick.",
      inputs: { length: 60, width: 16, depth: 8, pads: 4, padSize: 24, padDepth: 12, waste: 10 },
      expected: { continuousCuFt: 53.333, padCuFt: 16, cubicFeet: 76.267, yards: 2.8247, bags: 128 },
      steps: [
        "Continuous = 60 × (16 ÷ 12) × (8 ÷ 12) = 60 × 1.333 × 0.667 = 53.3 cu ft.",
        "Pads = 4 × 2 × 2 × 1 = 16 cu ft.",
        "Total = 69.3 cu ft × 1.10 = 76.3 cu ft ÷ 27 = 2.82 cu yd — order 3 yards.",
        "By bag that would be 76.3 ÷ 0.60 = 128 bags of 80 lb, which is why footings are usually poured with ready-mix.",
      ],
    },
    tips: [
      "Have the trench inspected before the pour if a permit is required — most jurisdictions inspect footings and rebar.",
      "Keep rebar at least 3 in from soil using rebar chairs or bricks; don't lay it on the ground.",
      "Remove loose soil and standing water from the trench bottom before pouring.",
      "Set anchor bolts or vertical dowels while the concrete is still plastic.",
    ],
    faqs: [
      {
        q: "How big should a footing be?",
        a: "Under the IRC, footings must be at least 12 in wide and 6 in thick, and wider for heavier loads or weak soils (IRC Table R403.1(1)). A common size for a one-story house on average soil is 16–20 in wide and 8 in thick.",
      },
      {
        q: "How deep should footings be?",
        a: "The bottom must be at least 12 in below undisturbed grade and below the frost line set by your local code — anywhere from 12 in in warm areas to 48 in or more in cold climates.",
      },
      {
        q: "How much concrete for a 10 ft footing?",
        a: "A 10 ft footing 16 in wide and 8 in thick is 10 × 1.33 × 0.67 = 8.9 cu ft, or 0.33 cu yd. With 10% extra that's about 16 bags of 80 lb concrete.",
      },
      {
        q: "Do footings need rebar?",
        a: "Many jurisdictions require at least two continuous #4 bars in footings, especially in seismic areas or under masonry walls. Follow your plans and local code.",
      },
    ],
    sources: [IRC_FOUNDATIONS, ACI_SOURCE, QUIKRETE_SOURCE],
    related: ["concrete-slab-calculator", "concrete-column-calculator", "cinder-block-calculator", "concrete-cost-calculator"],
  },
  {
    slug: "post-hole-calculator",
    name: "Post Hole Concrete Calculator",
    category: "concrete-masonry",
    kind: "material",
    seoTitle: "Post Hole Concrete Calculator – Bags per Fence or Deck Post",
    description:
      "Calculate how many bags of concrete to set fence or deck posts: enter hole size, depth, post size and gravel base to get bags per hole and the total to buy.",
    intro:
      "Find out how much concrete you need to set fence posts, deck posts or mailbox posts. Enter the number of posts, hole diameter and depth, the post size and any gravel at the bottom of the hole, and the calculator subtracts the post's own volume to give the bags of concrete to buy.",
    keywords: [
      "post hole concrete calculator",
      "how many bags of concrete per fence post",
      "fence post concrete calculator",
      "concrete for 4x4 post",
      "quikrete fast setting per post",
    ],
    howToUse: [
      "Enter the number of posts.",
      "Enter the hole diameter (about 3× the post width) and the hole depth (about 1/3 of the post's above-ground height, and below the frost line).",
      "Choose the post size so its volume is subtracted, and enter any gravel layer at the bottom.",
      "Choose your bag size — 50 lb fast-setting concrete is the most common for posts.",
    ],
    formula: {
      lines: [
        "Concrete depth = hole depth − gravel depth",
        "Concrete per hole = π × (diameter ÷ 24)² × concrete depth − post cross-section × concrete depth",
        "Bags = holes × concrete per hole × (1 + waste %) ÷ bag yield, rounded up",
      ],
      notes: [
        "A 4×4 post measures 3-1/2 × 3-1/2 in and a 6×6 post 5-1/2 × 5-1/2 in.",
        "Quikrete Fast-Setting Concrete Mix yields about 0.375 cu ft per 50 lb bag; standard 80 lb bags yield about 0.60 cu ft.",
      ],
    },
    example: {
      scenario: "Ten 4×4 fence posts in 10 in diameter holes 3 ft deep, with 6 in of gravel at the bottom, using 50 lb bags of fast-setting mix.",
      inputs: { posts: 10, diameter: 10, depth: 3, post: 3.5, gravel: 6, bag: 50, waste: 10 },
      expected: { perHole: 1.1509, cubicFeet: 12.6596, bags: 34, bagsPerHole: 3.376 },
      steps: [
        "Concrete depth = 3 − 0.5 = 2.5 ft.",
        "Hole volume = π × (10 ÷ 24)² × 2.5 = 1.364 cu ft; post volume = (3.5 ÷ 12)² × 2.5 = 0.213 cu ft; so 1.151 cu ft per hole.",
        "10 holes × 1.151 × 1.10 = 12.66 cu ft.",
        "12.66 ÷ 0.375 = 33.8 → 34 bags of 50 lb fast-setting concrete (about 3.4 per post).",
      ],
    },
    tips: [
      "Slope the top of the concrete away from the post so water runs off instead of pooling against the wood.",
      "Brace posts plumb in two directions before you add concrete; fast-setting mix sets in 20–40 minutes.",
      "Call 811 a few days before digging so buried utilities are marked — it's free and required in most states.",
      "Use ground-contact rated pressure-treated posts for anything set in concrete or soil.",
    ],
    faqs: [
      {
        q: "How many bags of concrete per fence post?",
        a: "For a 4×4 post in a 10 in hole 2.5–3 ft deep, plan on about 2–2.5 bags of 80 lb concrete or 3–4 bags of 50 lb fast-setting mix per post. A 6×6 in a 12 in hole needs roughly half as much again.",
      },
      {
        q: "How deep should a fence post hole be?",
        a: "A common rule is one-third of the post's height above ground — so 2 ft for a 6 ft fence — and always below your local frost depth for deck and structural posts.",
      },
      {
        q: "How wide should a post hole be?",
        a: "About three times the width of the post: 10–12 in for a 4×4 and 16–18 in for a 6×6. Check the hole diameter required for deck footings in your local code or plans.",
      },
      {
        q: "Do I need gravel at the bottom of a post hole?",
        a: "A few inches of gravel helps water drain away from the end of the post and is recommended by most post-setting guides. It reduces the concrete needed.",
      },
      {
        q: "Should I mix fast-setting concrete or pour it dry?",
        a: "Quikrete's instructions for Fast-Setting Concrete Mix are to pour the dry mix into the hole and then add water, about one gallon per 50 lb bag. Standard concrete mix should be mixed with water first.",
      },
    ],
    sources: [
      { title: "Fast-Setting Concrete Mix (No. 1004) product data sheet", publisher: "Quikrete" },
      QUIKRETE_SOURCE,
      { title: "Call 811 Before You Dig", publisher: "Common Ground Alliance" },
    ],
    related: ["concrete-bags-calculator", "fence-calculator", "concrete-column-calculator", "deck-cost-calculator"],
  },
  {
    slug: "concrete-column-calculator",
    name: "Concrete Column Calculator",
    category: "concrete-masonry",
    kind: "material",
    safety: true,
    seoTitle: "Concrete Column Calculator – Round Tubes and Square Piers",
    description:
      "Calculate concrete for round tube-form piers or square columns: enter diameter or sides, height and quantity to get cubic yards, cubic feet and bags.",
    intro:
      "Work out the concrete for round tube-form piers (like Sonotube forms) or square and rectangular columns. Enter the size, height and how many columns you are pouring, and the calculator gives the total in cubic yards and cubic feet, plus the number of 80 lb and 60 lb bags.",
    keywords: [
      "concrete column calculator",
      "sonotube concrete calculator",
      "concrete pier calculator",
      "how many bags of concrete for a 12 inch sonotube",
      "round column concrete volume",
    ],
    howToUse: [
      "Choose round or square/rectangular.",
      "Enter the diameter (round) or width and depth (square), in inches.",
      "Enter the column height including any part below grade, and the number of columns.",
      "Keep a 10% allowance and read the volume and bags.",
    ],
    formula: {
      lines: [
        "Round: volume = π × (diameter ÷ 24)² × height",
        "Square/rectangular: volume = (width ÷ 12) × (depth ÷ 12) × height",
        "Total = volume × number of columns × (1 + waste %); cu yd = cu ft ÷ 27",
      ],
      notes: ["Volumes for common tube sizes per foot of height: 8 in ≈ 0.35 cu ft, 10 in ≈ 0.55 cu ft, 12 in ≈ 0.79 cu ft."],
    },
    example: {
      scenario: "Four 12 in diameter deck piers, 4 ft tall, poured in cardboard tube forms.",
      inputs: { shape: 0, diameter: 12, height: 4, count: 4, waste: 10 },
      expected: { each: 3.1416, cubicFeet: 13.823, yards: 0.512, bags: 24, bags60: 31 },
      steps: [
        "Volume per pier = π × (12 ÷ 24)² × 4 = π × 0.25 × 4 = 3.14 cu ft.",
        "4 piers × 3.14 = 12.57 cu ft; add 10% = 13.82 cu ft (0.51 cu yd).",
        "80 lb bags = 13.82 ÷ 0.60 = 23.0 → 24 bags (or 31 sixty-pound bags).",
      ],
    },
    tips: [
      "Columns that carry a structure need the size, reinforcement and footing specified by code tables or an engineer — a belled or spread footing is often required under a tube form.",
      "Pour in lifts and rod or vibrate the concrete to remove air pockets, especially around rebar.",
      "Brace tube forms plumb and backfill around them before pouring so they don't shift.",
      "Set post bases or anchor bolts in the wet concrete at the exact height and alignment.",
    ],
    faqs: [
      {
        q: "How many bags of concrete for a 12 inch Sonotube?",
        a: "A 12 in tube holds about 0.79 cu ft per foot of height — about 1.3 bags of 80 lb concrete per foot. A 4 ft tube needs about 5.2 bags; buy 6.",
      },
      {
        q: "How many bags for a 10 inch tube 4 ft deep?",
        a: "π × (10 ÷ 24)² × 4 = 2.18 cu ft, or about 3.6 bags of 80 lb concrete — buy 4 per tube.",
      },
      {
        q: "How do you calculate the volume of a round column?",
        a: "Multiply π by the radius squared and by the height, using the same unit throughout. With the diameter in inches and height in feet: π × (diameter ÷ 24)² × height gives cubic feet.",
      },
      {
        q: "Do concrete piers need rebar?",
        a: "Deck piers often include at least one or two vertical bars, and many codes or plans require them. Structural columns always need reinforcement designed for the load.",
      },
    ],
    sources: [ACI_SOURCE, QUIKRETE_SOURCE, { title: "Prescriptive Residential Wood Deck Construction Guide (DCA 6)", publisher: "American Wood Council" }],
    related: ["concrete-bags-calculator", "footing-calculator", "post-hole-calculator", "deck-joists-calculator"],
  },
  {
    slug: "concrete-stairs-calculator",
    name: "Concrete Stairs Calculator",
    category: "concrete-masonry",
    kind: "material",
    safety: true,
    seoTitle: "Concrete Stairs Calculator – Concrete for Steps and Landing",
    description:
      "Calculate concrete for solid steps: enter the number of steps, rise, tread depth, width and top landing to get cubic yards, cubic feet and bags.",
    intro:
      "Estimate the concrete for a set of solid poured concrete steps, such as front or back entry stairs. Enter the number of steps, riser height, tread depth, stair width and the depth of any top landing, and the calculator works out the volume step by step and the bags or yards you need.",
    keywords: [
      "concrete stairs calculator",
      "concrete steps calculator",
      "how much concrete for steps",
      "concrete step volume",
      "concrete porch steps calculator",
    ],
    howToUse: [
      "Enter the number of steps (risers) from the ground up to the top surface.",
      "Enter the riser height and tread depth. The IRC allows a maximum 7-3/4 in rise and a minimum 10 in tread.",
      "Enter the stair width and the depth of any landing behind the top step.",
      "Read the cubic yards and the bag count.",
    ],
    formula: {
      lines: [
        "Each step i (from the bottom) is a block i × rise high and one tread deep",
        "Side profile (sq in) = rise × tread × n(n + 1) ÷ 2 + n × rise × landing depth",
        "Volume = profile ÷ 144 × width × (1 + waste %)",
      ],
      notes: ["Assumes solid steps on a compacted base. Steps with a gravel or block fill inside need less concrete."],
    },
    example: {
      scenario: "Three steps with a 7 in rise and 11 in tread, 4 ft wide, with a 3 ft deep landing at the top.",
      inputs: { steps: 3, rise: 7, run: 11, width: 4, landing: 3, waste: 10 },
      expected: { cubicFeet: 37.217, yards: 1.3784, bags: 63, totalRise: 21 },
      steps: [
        "Steps profile = 7 × 11 × (3 × 4 ÷ 2) = 7 × 11 × 6 = 462 sq in.",
        "Landing profile = 3 × 7 × 36 = 756 sq in, so the total profile is 1,218 sq in = 8.46 sq ft.",
        "Volume = 8.46 × 4 ft wide = 33.8 cu ft; add 10% = 37.2 cu ft = 1.38 cu yd.",
        "That's 63 bags of 80 lb concrete — order 1.5 yards of ready-mix instead.",
      ],
    },
    tips: [
      "Keep every riser the same height within 3/8 in, as the IRC requires — uneven steps are a trip hazard.",
      "Fill the bulk of large steps with compacted gravel or broken concrete to cut the volume, keeping at least 4 in of concrete on the treads and risers.",
      "Slope treads about 1/4 in per foot so water drains, and use a broom finish for grip.",
      "Steps over 30 in high, or with more than three or four risers, typically need guards and a handrail.",
    ],
    faqs: [
      {
        q: "How much concrete do I need for 3 steps?",
        a: "Three 4 ft wide steps with a 7 in rise and 11 in tread, without a landing, are about 12.8 cu ft — roughly 24 bags of 80 lb concrete with 10% extra. A 3 ft landing at the top more than doubles that.",
      },
      {
        q: "What is the standard rise and run for concrete steps?",
        a: "Most outdoor steps use a 6–7-1/2 in rise and 11–14 in tread. The IRC caps residential risers at 7-3/4 in and requires treads of at least 10 in.",
      },
      {
        q: "How thick should concrete steps be?",
        a: "Solid steps are concrete all the way down. If you fill the middle with gravel, keep the concrete at least 4 in thick on treads, risers and the landing, and reinforce it with rebar.",
      },
      {
        q: "Do concrete steps need a footing?",
        a: "Steps attached to a house usually need a footing below the frost line or must be isolated so frost heave doesn't push them into the house. Check local requirements.",
      },
    ],
    sources: [
      { title: "International Residential Code, Section R311.7 Stairways", publisher: "International Code Council" },
      PCA_SOURCE,
      QUIKRETE_SOURCE,
    ],
    related: ["stair-rise-run-calculator", "concrete-bags-calculator", "concrete-slab-calculator", "concrete-cost-calculator"],
  },
  {
    slug: "cinder-block-calculator",
    name: "Cinder Block Calculator",
    category: "concrete-masonry",
    kind: "material",
    seoTitle: "Cinder Block Calculator – How Many Concrete Blocks Do I Need?",
    description:
      "Calculate how many concrete (cinder) blocks you need for a wall, plus mortar bags. Works for standard 8×8×16 and other block sizes, with openings subtracted.",
    intro:
      "Estimate the concrete masonry units (CMU, often called cinder blocks) for a wall. Enter the wall length and height, subtract any openings and choose the block face size. The calculator counts the blocks, the number of courses and the 80 lb bags of mortar mix needed to lay them.",
    keywords: [
      "cinder block calculator",
      "concrete block calculator",
      "how many cinder blocks do i need",
      "cmu calculator",
      "block wall calculator",
    ],
    howToUse: [
      "Measure the wall length and height.",
      "Enter the area of any doors or windows to subtract.",
      "Choose the block face size. 8×8×16, 6×8×16 and 12×8×16 blocks all have the same 16 × 8 in face.",
      "Keep a 5% allowance for breakage and cuts and read the blocks and mortar bags.",
    ],
    formula: {
      lines: [
        "Wall area = length × height − openings",
        "Blocks = wall area × 1.125 per sq ft (16 × 8 in nominal face) × (1 + waste %)",
        "Mortar bags (80 lb) = blocks ÷ 13, rounded up",
      ],
      notes: [
        "Nominal block sizes include a 3/8 in mortar joint: an 8×8×16 block is actually 7-5/8 × 7-5/8 × 15-5/8 in.",
        "Quikrete states an 80 lb bag of Mason Mix lays up to 13 standard 8×8×16 blocks.",
      ],
    },
    example: {
      scenario: "A 20 ft long, 4 ft high garden wall of standard 8×8×16 blocks.",
      inputs: { length: 20, height: 4, openings: 0, face: 8, waste: 5 },
      expected: { area: 80, blocks: 95, mortarBags: 8, courses: 6 },
      steps: [
        "Wall area = 20 × 4 = 80 sq ft.",
        "Blocks = 80 × 1.125 = 90; add 5% = 94.5 → 95 blocks.",
        "Courses = 48 in ÷ 8 in = 6.",
        "Mortar = 95 ÷ 13 = 7.3 → 8 bags of 80 lb mason mix.",
      ],
    },
    tips: [
      "Block walls need a concrete footing below the frost line, usually twice as wide as the wall.",
      "Order corner (end) blocks and half blocks for wall ends to avoid cutting.",
      "Fill cores with grout and rebar where your plans or local code require — most retaining or load-bearing block walls need it.",
      "Lay the first course carefully in a full mortar bed; every other course depends on it being level.",
    ],
    faqs: [
      {
        q: "How many cinder blocks per square foot?",
        a: "Standard blocks with a 16 × 8 in face (including the mortar joint) need 1.125 blocks per square foot, or 112.5 per 100 sq ft.",
      },
      {
        q: "How many blocks do I need for a 10 × 10 wall?",
        a: "A wall 10 ft long and 10 ft high is 100 sq ft, which needs about 113 standard blocks, or about 119 with 5% extra.",
      },
      {
        q: "How much mortar do I need for 100 blocks?",
        a: "About eight 80 lb bags of premixed mason mix, based on Quikrete's figure of up to 13 blocks per bag. With bulk masonry cement and sand, roughly 1 bag of masonry cement per 25–30 blocks is a common estimate.",
      },
      {
        q: "What is the difference between a cinder block and a concrete block?",
        a: "Traditional cinder blocks used coal cinders as aggregate. Today almost all 'cinder blocks' are concrete masonry units made with sand and gravel, which are stronger and heavier.",
      },
    ],
    sources: [
      { title: "Mason Mix (No. 1136) product data sheet", publisher: "Quikrete" },
      { title: "TEK notes on concrete masonry construction", publisher: "National Concrete Masonry Association (NCMA)" },
      { title: "International Residential Code, Chapter 6 Wall Construction — Masonry", publisher: "International Code Council" },
    ],
    related: ["mortar-calculator", "footing-calculator", "brick-calculator", "retaining-wall-calculator"],
  },
  {
    slug: "brick-calculator",
    name: "Brick Calculator",
    category: "concrete-masonry",
    kind: "material",
    seoTitle: "Brick Calculator – How Many Bricks Do I Need for a Wall?",
    description:
      "Estimate how many bricks you need for a wall or veneer: choose modular, standard, queen or king brick and joint size, subtract openings and get mortar bags.",
    intro:
      "Calculate the number of bricks for a wall, veneer, chimney face or garden wall. Enter the wall length and height, subtract windows and doors, and choose the brick size and mortar joint width. The calculator gives bricks per square foot, the total to buy with breakage allowance, and the bags of mortar mix to lay them.",
    keywords: [
      "brick calculator",
      "how many bricks do i need",
      "bricks per square foot",
      "brick wall calculator",
      "brick veneer calculator",
      "brick and mortar calculator",
    ],
    howToUse: [
      "Measure the wall's length and height.",
      "Add up the area of windows and doors and enter it as openings.",
      "Choose the brick size — modular is the most common in the US — and the mortar joint (3/8 in is standard).",
      "Keep a 5% allowance and read the bricks and mortar bags.",
    ],
    formula: {
      lines: [
        "Bricks per sq ft = 144 ÷ ((brick length + joint) × (brick height + joint))",
        "Bricks = (length × height − openings) × bricks per sq ft × (1 + waste %)",
        "Mortar bags (80 lb) = bricks ÷ 37, rounded up",
      ],
      notes: [
        "Face sizes: modular 7-5/8 × 2-1/4 in (6.86 per sq ft with 3/8 in joints), standard 8 × 2-1/4 in, queen 7-5/8 × 2-3/4 in, king 9-5/8 × 2-5/8 in.",
        "Quikrete states an 80 lb bag of Mason Mix lays up to 37 standard bricks.",
      ],
    },
    example: {
      scenario: "A 20 × 8 ft wall with 12 sq ft of window, in modular brick with 3/8 in joints.",
      inputs: { length: 20, height: 8, openings: 12, brick: 0, joint: 0.375, waste: 5 },
      expected: { area: 148, perSqft: 6.857, bricks: 1066, mortarBags: 29 },
      steps: [
        "Net area = 20 × 8 − 12 = 148 sq ft.",
        "Bricks per sq ft = 144 ÷ (8 × 2.625) = 6.86.",
        "148 × 6.86 = 1,015 bricks; add 5% = 1,065.6 → 1,066 bricks.",
        "Mortar = 1,066 ÷ 37 = 28.8 → 29 bags of 80 lb mason mix.",
      ],
    },
    tips: [
      "Buy all bricks from one production run, and blend from several pallets as you lay, to avoid color banding.",
      "Bricks are often sold by the pallet (around 500 for modular); ask whether you can return unopened extras.",
      "For veneer, you'll also need wall ties (about one per 2.67 sq ft under IRC R703.8.4), flashing and weep holes.",
      "Don't lay brick in freezing weather without cold-weather precautions — the mortar can fail.",
    ],
    faqs: [
      {
        q: "How many bricks per square foot?",
        a: "With standard 3/8 in joints: modular brick 6.86, standard brick 6.55, queen brick 5.8 and king brick 4.8 bricks per square foot.",
      },
      {
        q: "How many bricks do I need for a 10 × 10 wall?",
        a: "A 100 sq ft wall in modular brick needs about 686 bricks, or about 720 with 5% extra.",
      },
      {
        q: "How many bricks are in a pallet?",
        a: "It varies by manufacturer and size, but modular brick pallets usually hold around 500 bricks. Check with your supplier.",
      },
      {
        q: "How much mortar do I need per 1,000 bricks?",
        a: "About 27 bags of 80 lb premixed mason mix by Quikrete's yield of up to 37 bricks per bag. BIA puts the net mortar volume at roughly 8 cu ft per 1,000 modular bricks before waste.",
      },
      {
        q: "How much extra brick should I order?",
        a: "The Brick Industry Association suggests about 5% for breakage and cutting. Add more for complex patterns or many corners.",
      },
    ],
    sources: [
      { title: "Technical Note 10: Dimensioning and Estimating Brick Masonry", publisher: "Brick Industry Association" },
      { title: "Mason Mix (No. 1136) product data sheet", publisher: "Quikrete" },
      { title: "International Residential Code, Section R703.8 Anchored Stone and Masonry Veneer", publisher: "International Code Council" },
    ],
    related: ["mortar-calculator", "cinder-block-calculator", "stone-veneer-calculator", "wall-area-calculator"],
  },
  {
    slug: "mortar-calculator",
    name: "Mortar Calculator",
    category: "concrete-masonry",
    kind: "material",
    seoTitle: "Mortar Calculator – Bags of Mortar for Brick and Block",
    description:
      "Find how many bags of mortar mix you need to lay brick or concrete block. Enter the wall area or unit count and get 80 lb bags, based on manufacturer yields.",
    intro:
      "Estimate the mortar for a brick or block project. Choose what you are laying, then enter either the wall area or the number of bricks or blocks. The calculator uses the manufacturer's laying yield for premixed 80 lb mason mix bags to tell you how many bags to buy, with an allowance for mortar that is dropped or stiffens in the tub.",
    keywords: [
      "mortar calculator",
      "how much mortar do i need",
      "bags of mortar per brick",
      "mortar for block wall",
      "mason mix calculator",
    ],
    howToUse: [
      "Choose modular brick, standard brick or 8×8×16 concrete block.",
      "Enter the wall area, or enter the number of units if you already know it.",
      "Adjust the units-per-bag figure if your mortar product lists a different yield.",
      "Keep a 10% allowance and read the number of bags.",
    ],
    formula: {
      lines: [
        "Units = number entered, or wall area × units per sq ft (modular brick 6.86, standard brick 6.55, block 1.125)",
        "Bags = units ÷ units per 80 lb bag × (1 + waste %), rounded up",
        "Mixed mortar ≈ bags × 0.70 cu ft",
      ],
      notes: [
        "Quikrete states an 80 lb bag of Mason Mix lays up to 37 standard bricks or 13 standard 8×8×16 blocks, at 3/8 in joints.",
        "Use Type N mortar for general above-grade work and Type S for below grade, retaining walls and areas with high wind or seismic loads.",
      ],
    },
    example: {
      scenario: "Laying 100 sq ft of modular brick with 80 lb bags of mason mix.",
      inputs: { unit: 0, area: 100, units: 0, bricksPerBag: 37, waste: 10 },
      expected: { units: 685.71, exactBags: 20.386, bags: 21 },
      steps: [
        "Bricks = 100 sq ft × 6.857 = 686 bricks.",
        "Bags = 686 ÷ 37 = 18.5.",
        "Add 10%: 18.5 × 1.10 = 20.4 → buy 21 bags.",
      ],
    },
    tips: [
      "Mix only what you can use in about 2 hours; retempering once with a little water is fine, but discard mortar that has started to set.",
      "For big jobs, mixing masonry cement and sand on site is cheaper than premixed bags — about one 70 lb bag of masonry cement to 3 parts sand by volume.",
      "Keep joint thickness consistent at 3/8 in; thicker joints use noticeably more mortar.",
      "Tool joints when the mortar is thumbprint-hard for a weather-tight concave finish.",
    ],
    faqs: [
      {
        q: "How many bricks does one bag of mortar lay?",
        a: "An 80 lb bag of premixed mason mix lays up to about 37 standard bricks; a 60 lb bag about 27. Real-world numbers are often a little lower.",
      },
      {
        q: "How many blocks does a bag of mortar lay?",
        a: "Up to about 13 standard 8×8×16 blocks per 80 lb bag of mason mix, according to Quikrete.",
      },
      {
        q: "What type of mortar should I use?",
        a: "Type N is the general-purpose mortar for above-grade walls and veneer. Type S is stronger and used for foundations, retaining walls and below-grade work. Type M is the strongest and used for heavy loads.",
      },
      {
        q: "How much mortar for 1,000 bricks?",
        a: "About 27 bags of 80 lb mason mix, or roughly 8 cu ft of net mortar in the joints plus waste, according to Brick Industry Association estimating tables.",
      },
    ],
    sources: [
      { title: "Mason Mix (No. 1136) product data sheet", publisher: "Quikrete" },
      { title: "Technical Note 10: Dimensioning and Estimating Brick Masonry", publisher: "Brick Industry Association" },
      { title: "ASTM C270: Standard Specification for Mortar for Unit Masonry", publisher: "ASTM International" },
    ],
    related: ["brick-calculator", "cinder-block-calculator", "stone-veneer-calculator", "retaining-wall-calculator"],
  },
  {
    slug: "paver-calculator",
    name: "Paver Calculator",
    category: "concrete-masonry",
    kind: "material",
    seoTitle: "Paver Calculator – How Many Pavers Do I Need for a Patio?",
    description:
      "Calculate how many pavers you need for a patio, walkway or driveway: enter the area and paver size, plus joint width and pattern waste, to get the count.",
    intro:
      "Plan a paver patio, path or driveway. Enter the length and width of the area and the size of the pavers, add a joint width if your pavers don't have built-in spacers, and choose a waste allowance for your laying pattern. The calculator gives the number of pavers, pavers per square foot and the edge restraint you need.",
    keywords: [
      "paver calculator",
      "how many pavers do i need",
      "patio paver calculator",
      "pavers per square foot",
      "brick paver calculator",
    ],
    howToUse: [
      "Measure the length and width of the area. For irregular shapes, split them into rectangles and add the counts.",
      "Enter the paver's length and width as listed by the manufacturer.",
      "Enter a joint width only for clay pavers or mortared joints — most concrete pavers have spacer nibs built in.",
      "Choose the waste allowance for your pattern and read the paver count.",
    ],
    formula: {
      lines: [
        "Pavers per sq ft = 144 ÷ ((paver length + joint) × (paver width + joint))",
        "Pavers = length × width × pavers per sq ft × (1 + waste %), rounded up",
        "Edge restraint = 2 × (length + width)",
      ],
      notes: ["A 4 × 8 in paver works out to 4.5 per square foot; a 6 × 9 in paver to 2.67; a 12 × 12 in paver to 1."],
    },
    example: {
      scenario: "A 16 × 12 ft patio of 4 × 8 in concrete pavers laid in a basketweave pattern.",
      inputs: { length: 16, width: 12, paverL: 8, paverW: 4, joint: 0, waste: 10 },
      expected: { area: 192, perSqft: 4.5, pavers: 951, edging: 56 },
      steps: [
        "Area = 16 × 12 = 192 sq ft.",
        "Pavers per sq ft = 144 ÷ (8 × 4) = 4.5.",
        "192 × 4.5 = 864 pavers; add 10% = 950.4 → 951 pavers.",
        "Edge restraint = 2 × (16 + 12) = 56 ft (less any side against the house).",
      ],
    },
    tips: [
      "Herringbone and curved edges create more cuts — allow 15%. Herringbone at 45° is also the strongest pattern for driveways.",
      "Keep a few spare pavers from the same batch for future repairs.",
      "Use 2-3/8 in (60 mm) pavers for patios and walks and 3-1/8 in (80 mm) pavers for driveways.",
      "Sweep polymeric sand into the joints and compact the pavers with a plate compactor fitted with a pad.",
    ],
    faqs: [
      {
        q: "How many pavers do I need for a 10 × 10 patio?",
        a: "A 100 sq ft patio needs 450 pavers of 4 × 8 in, or about 495 with 10% extra. With 6 × 9 in pavers it's about 267, or 294 with 10% extra.",
      },
      {
        q: "How many 4 × 8 pavers per square foot?",
        a: "4.5 per square foot, since each paver covers 32 square inches and a square foot is 144 square inches.",
      },
      {
        q: "How much extra pavers should I buy?",
        a: "About 5% for straight running bond, 10% for basketweave or patterns with some cutting, and 15% for herringbone, diagonal layouts or curved borders.",
      },
      {
        q: "What goes under pavers?",
        a: "A compacted crushed-stone base (4–6 in for patios, 8–12 in for driveways) topped with 1 in of coarse bedding sand, plus edge restraint around the perimeter. Use the paver base calculator for quantities.",
      },
      {
        q: "Do I need to account for joints between pavers?",
        a: "Most concrete pavers are sized so their nominal dimensions include the narrow joint created by the spacer nibs, so you don't add anything. For clay pavers or mortar-set pavers, add the joint width.",
      },
    ],
    sources: [
      { title: "ICPI Tech Spec 2: Construction of Interlocking Concrete Pavements", publisher: "Interlocking Concrete Pavement Institute" },
      { title: "Technical Note 14: Paving Systems Using Clay Pavers", publisher: "Brick Industry Association" },
      { title: "Paver installation guide", publisher: "Belgard" },
    ],
    related: ["paver-base-calculator", "sand-calculator", "gravel-calculator", "square-footage-calculator"],
  },
  {
    slug: "paver-base-calculator",
    name: "Paver Base Calculator",
    category: "concrete-masonry",
    kind: "material",
    seoTitle: "Paver Base Calculator – Gravel and Sand Under Pavers",
    description:
      "Calculate the crushed stone base and bedding sand for a paver patio or driveway in cubic yards and tons, with a compaction allowance and excavation depth.",
    intro:
      "Work out the base materials for a paver project. Enter the area, the compacted depth of crushed-stone base and the bedding sand depth, and the calculator gives the cubic yards and approximate tons of each to order, including an allowance for compaction, plus how deep to dig.",
    keywords: [
      "paver base calculator",
      "how much gravel for paver base",
      "paver sand calculator",
      "crushed stone base calculator",
      "paver base tons",
    ],
    howToUse: [
      "Enter the length and width of the paved area (add about 6 in on each side if the base extends past the edge restraint).",
      "Enter the compacted base depth: 4–6 in for patios and walks, 8–12 in for driveways or poor soils.",
      "Enter the bedding sand depth (1 in is standard).",
      "Keep the compaction allowance and read the yards and tons.",
    ],
    formula: {
      lines: [
        "Base (cu yd) = length × width × (base depth ÷ 12) × (1 + allowance %) ÷ 27",
        "Sand (cu yd) = length × width × (sand depth ÷ 12) × (1 + allowance %) ÷ 27",
        "Tons ≈ cu yd × 1.4 for crushed stone, × 1.35 for sand",
        "Excavation depth = base + sand + paver thickness (2-3/8 in)",
      ],
      notes: ["Densities vary by stone and moisture; your supplier can confirm the tons per yard for their material."],
    },
    example: {
      scenario: "A 16 × 12 ft patio with 4 in of compacted base and 1 in of bedding sand.",
      inputs: { length: 16, width: 12, baseDepth: 4, sandDepth: 1, waste: 20 },
      expected: { baseYards: 2.8444, baseTons: 3.982, sandYards: 0.7111, sandTons: 0.96, excavation: 7.375 },
      steps: [
        "Base = 192 sq ft × (4 ÷ 12) = 64 cu ft; add 20% = 76.8 cu ft = 2.84 cu yd ≈ 4.0 tons.",
        "Sand = 192 × (1 ÷ 12) = 16 cu ft; add 20% = 19.2 cu ft = 0.71 cu yd ≈ 0.96 tons.",
        "Dig 4 + 1 + 2.375 = 7.4 in below finished grade (plus any slope for drainage).",
      ],
    },
    tips: [
      "Use dense-graded crushed stone (often sold as 'crusher run', 'QP' or 'road base'), not round pea gravel.",
      "Compact the base in 2–4 in lifts with a plate compactor, dampening it slightly for best density.",
      "Slope the base about 1/8–1/4 in per foot away from the house so water drains off the patio.",
      "Screed the bedding sand — never compact it before the pavers are laid.",
    ],
    faqs: [
      {
        q: "How much base do I need for pavers?",
        a: "ICPI guidance is typically at least 4–6 in of compacted crushed stone for pedestrian patios and walks and 8–12 in for driveways, more on clay or poorly drained soils.",
      },
      {
        q: "How many tons of gravel for a 12 × 12 patio?",
        a: "At 4 in deep plus 20% for compaction, a 12 × 12 patio needs about 2.1 cu yd of crushed stone — roughly 3 tons.",
      },
      {
        q: "How much sand do I need under pavers?",
        a: "One inch of bedding sand covers about 324 sq ft per cubic yard. A 200 sq ft patio needs about 0.6–0.75 cu yd including allowance.",
      },
      {
        q: "Why add extra for compaction?",
        a: "Loose crushed stone shrinks by roughly 15–25% when compacted, so you need more loose material than the finished depth suggests.",
      },
    ],
    sources: [
      { title: "ICPI Tech Spec 2: Construction of Interlocking Concrete Pavements", publisher: "Interlocking Concrete Pavement Institute" },
      { title: "Hardscape installation guidelines — base preparation", publisher: "Unilock" },
      { title: "Hardscapes base preparation guide", publisher: "Belgard" },
    ],
    related: ["paver-calculator", "gravel-calculator", "sand-calculator", "cubic-yard-calculator"],
  },
  {
    slug: "retaining-wall-calculator",
    name: "Retaining Wall Calculator",
    category: "concrete-masonry",
    kind: "material",
    safety: true,
    seoTitle: "Retaining Wall Calculator – Blocks, Caps and Gravel",
    description:
      "Estimate segmental retaining wall blocks, cap units, leveling-pad gravel and drainage stone from wall length, height and block size, including a buried course.",
    intro:
      "Plan a segmental block retaining wall for a garden, terrace or slope. Enter the wall length and exposed height, the block size and how deep the first course is buried, and the calculator counts the courses, blocks and caps, plus the gravel for the leveling pad and the drainage stone behind the wall.",
    keywords: [
      "retaining wall calculator",
      "retaining wall block calculator",
      "how many retaining wall blocks do i need",
      "retaining wall gravel calculator",
      "landscape wall block calculator",
    ],
    howToUse: [
      "Measure the wall length along the face, and the exposed height above finished grade.",
      "Enter the block face length and height from the manufacturer (e.g. 12 × 4 in or 16 × 6 in).",
      "Enter the buried depth of the first course — usually 1 in per 8 in of wall height, at least 6 in.",
      "Enter the cap length and read the blocks, caps and gravel.",
    ],
    formula: {
      lines: [
        "Courses = (exposed height + buried depth) ÷ block height, rounded up",
        "Blocks = courses × (wall length ÷ block length, rounded up) × (1 + waste %)",
        "Caps = wall length ÷ cap length × (1 + waste %)",
        "Leveling pad = length × 2 ft × 0.5 ft;  drainage stone = length × 1 ft × total height (cu ft ÷ 27)",
      ],
      notes: [
        "The leveling pad is typically 6 in of compacted crushed stone, about 24 in wide; drainage stone is usually 12 in of clean 3/4 in gravel behind the wall with a perforated drain pipe at the base.",
        "Walls over 4 ft tall, or supporting a slope, driveway or structure, usually require an engineered design and a permit.",
      ],
    },
    example: {
      scenario: "A 20 ft long, 3 ft high garden wall using 12 × 4 in blocks, with 6 in buried, and 12 in caps.",
      inputs: { length: 20, height: 3, blockL: 12, blockH: 4, bury: 6, capL: 12, waste: 5 },
      expected: { courses: 11, blocks: 231, caps: 21, baseYards: 0.7407, drainYards: 2.5926 },
      steps: [
        "Total height = 36 + 6 = 42 in; 42 ÷ 4 = 10.5 → 11 courses.",
        "Blocks per course = 240 in ÷ 12 = 20; 11 × 20 = 220 blocks; add 5% = 231 blocks.",
        "Caps = 20 × 1.05 = 21 caps.",
        "Leveling pad = 20 × 2 × 0.5 = 20 cu ft = 0.74 cu yd; drainage stone = 20 × 1 × 3.5 = 70 cu ft = 2.59 cu yd.",
      ],
    },
    tips: [
      "Call 811 before you dig, and check whether your town requires a permit — many do over 3–4 ft.",
      "Get the first course perfectly level and compacted; mistakes multiply as the wall goes up.",
      "Install a perforated drain pipe behind the bottom course and wrap the drainage zone in filter fabric so soil doesn't clog the stone.",
      "Taller walls need geogrid reinforcement layers per the block manufacturer's design charts.",
    ],
    faqs: [
      {
        q: "How many retaining wall blocks do I need?",
        a: "Divide the wall length by the block length for blocks per course, then multiply by the number of courses (including the buried one). A 20 ft × 3 ft wall of 12 × 4 in blocks needs about 220 blocks plus waste.",
      },
      {
        q: "How deep should the first course of a retaining wall be buried?",
        a: "Most block manufacturers specify 1 in of burial for every 8 in of wall height, with a minimum of about 6 in — so at least one full course for short walls.",
      },
      {
        q: "How much gravel do I need behind a retaining wall?",
        a: "Plan on about 12 in of clean drainage stone behind the wall for its full height. That's about 0.04 cu yd per foot of wall per foot of height — 2.6 cu yd for a 20 ft long, 3.5 ft total-height wall.",
      },
      {
        q: "How tall can a retaining wall be without an engineer?",
        a: "Many codes require an engineered design for walls over 4 ft measured from the bottom of the footing, or any wall supporting a surcharge such as a driveway, slope or building. Check your local rules.",
      },
    ],
    sources: [
      { title: "Segmental Retaining Walls — Design and installation (TEK notes)", publisher: "National Concrete Masonry Association (NCMA)" },
      { title: "International Building Code / International Residential Code — retaining walls and permits", publisher: "International Code Council" },
      { title: "Retaining wall installation guide", publisher: "Allan Block" },
    ],
    related: ["paver-base-calculator", "gravel-calculator", "cinder-block-calculator", "landscape-cost-calculator"],
  },
  {
    slug: "stone-veneer-calculator",
    name: "Stone Veneer Calculator",
    category: "concrete-masonry",
    kind: "material",
    seoTitle: "Stone Veneer Calculator – Flats, Corners, Mortar and Lath",
    description:
      "Estimate manufactured stone veneer: square feet of flats, linear feet of corners, Type S mortar bags and metal lath sheets, with openings and waste included.",
    intro:
      "Plan a stone veneer project on a wall, fireplace, column or foundation. Enter the wall size, openings and the total height of outside corners, and the calculator works out the flat stone (in square feet) and corner pieces (in linear feet) to order, plus the mortar and metal lath for the installation.",
    keywords: [
      "stone veneer calculator",
      "manufactured stone calculator",
      "how much stone veneer do i need",
      "stone veneer corners calculator",
      "stone veneer mortar calculator",
    ],
    howToUse: [
      "Measure the wall length and height and subtract windows and doors.",
      "Add up the height of every outside corner in linear feet — corner pieces are sold separately.",
      "Check the flat-area coverage of the corner pieces on your product's spec sheet (often about 0.75 sq ft per linear foot).",
      "Choose whether you need a scratch coat (framed or sheathed walls with lath) and set the setting bed thickness.",
    ],
    formula: {
      lines: [
        "Net area = length × height − openings",
        "Flats = (net area − corner ft × corner coverage) × (1 + waste %)",
        "Mortar (cu ft) = net area × (scratch coat 0.5 in + setting bed) ÷ 12 × (1 + waste %); bags = cu ft ÷ 0.70",
        "Lath sheets = net area ÷ 16 sq ft effective × (1 + waste %)",
      ],
      notes: [
        "An 80 lb bag of Type S mortar makes roughly 0.70 cu ft — about 17 sq ft of scratch coat at 1/2 in, per Quikrete.",
        "A 27 in × 8 ft sheet of metal lath covers about 16 sq ft after laps.",
      ],
    },
    example: {
      scenario: "A 20 ft × 4 ft wainscot on a sheathed wall with 8 linear feet of outside corners, scratch coat plus 1/2 in setting bed.",
      inputs: { length: 20, height: 4, openings: 0, corners: 8, cornerCoverage: 0.75, scratch: 1, bed: 0.5, waste: 10 },
      expected: { area: 80, flats: 81.4, cornerFeet: 8.8, mortarBags: 11, lath: 6 },
      steps: [
        "Net area = 20 × 4 = 80 sq ft. Corners cover 8 × 0.75 = 6 sq ft, so flats = 74 sq ft × 1.10 = 81.4 sq ft.",
        "Corners = 8 × 1.10 = 8.8 linear ft.",
        "Mortar = 80 × (0.5 + 0.5) ÷ 12 = 6.67 cu ft × 1.10 = 7.33 cu ft ÷ 0.70 = 10.5 → 11 bags.",
        "Lath = 80 ÷ 16 = 5 × 1.10 = 5.5 → 6 sheets.",
      ],
    },
    tips: [
      "Lay out stones on the ground first and mix from several boxes for a natural blend of colors and sizes.",
      "On framed walls, install two layers of water-resistive barrier, galvanized lath and a weep screed at the base, as ASTM C1063 and manufacturer instructions require.",
      "Keep veneer at least 4 in above soil and 2 in above paved surfaces (check manufacturer requirements).",
      "Use the mortar type the stone manufacturer specifies — usually Type S or a polymer-modified veneer mortar.",
    ],
    faqs: [
      {
        q: "How do I calculate stone veneer for corners?",
        a: "Measure the total height of all outside corners in linear feet and order that many feet of corner pieces plus about 10%. Then subtract the area the corners cover (often about 0.75 sq ft per linear foot) from the flat stone.",
      },
      {
        q: "How much does a box of stone veneer cover?",
        a: "Flat boxes typically cover around 10 sq ft and corner boxes about 6 linear feet, but it varies by profile — tightly fitted profiles may cover less. Check the box.",
      },
      {
        q: "How many bags of mortar for stone veneer?",
        a: "Expect roughly one 80 lb bag per 8–9 sq ft when you need both a 1/2 in scratch coat and a 1/2 in setting bed, or one bag per 15–17 sq ft for the setting bed alone over masonry.",
      },
      {
        q: "Do I need a scratch coat for stone veneer?",
        a: "Yes on framed or sheathed walls with lath. On clean, unsealed concrete or block you can often apply stone directly with a setting bed — check the manufacturer's instructions.",
      },
    ],
    sources: [
      { title: "Installation Guide for Adhered Manufactured Stone Veneer", publisher: "National Concrete Masonry Association (NCMA)" },
      { title: "ASTM C1063: Standard Specification for Installation of Lathing and Furring to Receive Interior and Exterior Portland Cement-Based Plaster", publisher: "ASTM International" },
      { title: "Veneer Stone Mortar product data", publisher: "Quikrete" },
    ],
    related: ["brick-calculator", "mortar-calculator", "wall-area-calculator", "siding-calculator"],
  },
  {
    slug: "concrete-cost-calculator",
    name: "Concrete Cost Calculator",
    category: "concrete-masonry",
    kind: "cost",
    seoTitle: "Concrete Cost Calculator – Slab Cost per Yard and Sq Ft",
    description:
      "Estimate the cost of a concrete slab: ready-mix per cubic yard, delivery fees, reinforcement and labor, with a bagged-concrete price comparison.",
    intro:
      "Estimate what a concrete slab will cost to pour. Enter the slab size and thickness, your local ready-mix price, delivery fees, reinforcement and labor rates, and the calculator rounds the order to the nearest quarter yard and totals the job — with the cost of the same volume in 80 lb bags for comparison.",
    keywords: [
      "concrete cost calculator",
      "concrete slab cost",
      "cost of concrete per yard",
      "concrete cost per square foot",
      "how much does a concrete patio cost",
    ],
    howToUse: [
      "Enter the slab length, width and thickness.",
      "Enter the ready-mix price per cubic yard from a local plant, and any delivery or short-load fees.",
      "Enter the cost of reinforcement (wire mesh or rebar) and labor per square foot, or set labor to 0 for DIY.",
      "Compare the ready-mix total with the bagged-concrete cost shown below it.",
    ],
    formula: {
      lines: [
        "Volume (cu yd) = length × width × (thickness ÷ 12) × (1 + waste %) ÷ 27, rounded up to the next 1/4 yd",
        "Total = cu yd × price per yd + delivery + area × (reinforcement + labor)",
        "Bagged alternative = (cu ft ÷ 0.60) bags × price per 80 lb bag",
      ],
      notes: ["Many plants charge a short-load fee for orders under about 4–6 cu yd, and an extra charge if the truck waits beyond the allowed unloading time."],
    },
    example: {
      scenario: "A 20 × 12 ft patio, 4 in thick, with ready-mix at $175/yd, $100 short-load fee, $0.50/sq ft mesh and $4/sq ft labor.",
      inputs: { length: 20, width: 12, thickness: 4, waste: 10, yardPrice: 175, delivery: 100, rebar: 0.5, labor: 4, bagPrice: 6.5 },
      expected: { orderedYards: 3.5, concreteCost: 612.5, total: 1792.5, perSqft: 7.469, bagCost: 955.5 },
      steps: [
        "Volume = 20 × 12 × (4 ÷ 12) = 80 cu ft × 1.10 = 88 cu ft = 3.26 cu yd → order 3.5 yd.",
        "Concrete = 3.5 × $175 = $612.50; plus $100 delivery.",
        "Reinforcement = 240 × $0.50 = $120; labor = 240 × $4 = $960.",
        "Total = $612.50 + $100 + $120 + $960 = $1,792.50, or about $7.47 per sq ft. The same concrete in 147 bags would cost $955.50 for material alone.",
      ],
    },
    tips: [
      "Get quotes from two or three ready-mix plants — prices and short-load fees vary a lot.",
      "Have the forms, base and crew ready before the truck arrives; waiting time is billed.",
      "Ask about decorative finishes (stamped, colored, exposed aggregate) separately — they can double the labor cost.",
      "For tiny jobs, some suppliers sell 'U-cart' or trailer loads of ready-mix that avoid short-load fees.",
    ],
    faqs: [
      {
        q: "How much does a yard of concrete cost?",
        a: "Ready-mix concrete typically costs about $150–$220 per cubic yard delivered in the US, depending on region, strength and additives. Short-load and fuel surcharges can add $50–$200 or more on small orders.",
      },
      {
        q: "How much does a 20 × 20 concrete slab cost?",
        a: "A 20 × 20 ft, 4 in slab needs about 5.5 cu yd with waste. With labor and reinforcement, typical installed cost is about $6–$12 per sq ft, or roughly $2,400–$4,800.",
      },
      {
        q: "What is the cost of concrete per square foot?",
        a: "A plain 4 in slab installed by a contractor usually costs about $6–$12 per sq ft. Material alone is about $2–$3 per sq ft at typical ready-mix prices.",
      },
      {
        q: "Is it cheaper to mix concrete yourself?",
        a: "For under about 1 cubic yard, bags are usually cheaper. For larger slabs, ready-mix is often cheaper per yard, far faster and gives a more uniform result.",
      },
      {
        q: "What affects the cost of a concrete slab?",
        a: "Thickness, site access, excavation and base preparation, reinforcement, finish type, local labor rates and the distance from the ready-mix plant.",
      },
    ],
    sources: [
      PCA_SOURCE,
      { title: "Producer Price Index — Ready-mix concrete", publisher: "U.S. Bureau of Labor Statistics" },
      { title: "Ready mixed concrete industry data", publisher: "National Ready Mixed Concrete Association" },
    ],
    related: ["concrete-slab-calculator", "concrete-bags-calculator", "driveway-cost-calculator", "renovation-budget-calculator"],
    cost: {
      priceRange: "$6–$12 per sq ft installed for a 4 in slab; ready-mix about $150–$220 per cu yd",
      assumptions: [
        "Ready-mix concrete at $150–$220 per cubic yard delivered, ordered in 1/4 yd increments.",
        "Labor, forms and finishing at $3–$6 per sq ft for a plain broom finish; reinforcement at about $0.30–$0.75 per sq ft.",
        "Short-load/delivery fee of about $50–$200 on small orders.",
        "Typical US ranges that vary by region; excludes excavation, gravel base, demolition, permits and decorative finishes.",
      ],
      updated: UPDATED,
    },
  },
];
