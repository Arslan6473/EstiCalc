import type { CalculatorContent } from "../types";

const NIST_HB44 = {
  title: "Handbook 44, Appendix C: General Tables of Units of Measurement",
  publisher: "National Institute of Standards and Technology (NIST)",
};
const USGS_WATER = {
  title: "Water Science School: water density and weight per gallon",
  publisher: "U.S. Geological Survey (USGS)",
};

export const content: CalculatorContent[] = [
  // 115 ───────────────────────────────────────────────────────────────────
  {
    slug: "pool-volume-calculator",
    name: "Pool Volume Calculator",
    category: "water-volume",
    kind: "planning",
    featured: false,
    seoTitle: "Pool Volume Calculator – How Many Gallons Is My Pool?",
    description:
      "Find how many gallons your rectangle, round or oval pool holds from its size and shallow and deep end depths, plus cubic feet and how long a hose takes to fill it.",
    intro:
      "Knowing your pool's volume is the starting point for dosing chlorine and other chemicals, sizing a pump, filter or heater, and estimating how long it will take to fill. Choose a rectangular, round or oval pool, enter its size and the water depth at the shallow and deep ends, and the calculator returns the volume in US gallons (or litres), cubic feet and the approximate fill time from a garden hose.",
    keywords: [
      "pool volume calculator",
      "how many gallons in my pool",
      "pool gallons calculator",
      "above ground pool gallons",
      "swimming pool capacity",
      "pool water volume",
    ],
    howToUse: [
      "Choose the pool shape: rectangle, round (most above-ground pools) or oval.",
      "Measure the inside length and width, or the diameter, at the water line.",
      "Measure the water depth at the shallow and deep ends. For a flat-bottom pool, enter the same number in both.",
      "Optionally time your hose filling a 5-gallon bucket to get its flow rate, then read the volume and fill time.",
    ],
    formula: {
      lines: [
        "Average depth = (shallow depth + deep depth) ÷ 2",
        "Rectangle: cubic feet = length × width × average depth",
        "Round: cubic feet = π × (diameter ÷ 2)² × average depth",
        "Oval: cubic feet = π × (length ÷ 2) × (width ÷ 2) × average depth",
        "US gallons = cubic feet × 7.48   ·   Fill time (hours) = gallons ÷ (flow in gal/min × 60)",
      ],
      notes: [
        "The industry shortcuts 7.5 (rectangle), 5.9 (round, using diameter²) and 5.9 (oval, using length × width) come from these same formulas.",
        "Averaging the two depths assumes a fairly even slope. For a sport pool with a steep hopper, split the pool into a shallow and deep section and add them.",
      ],
    },
    example: {
      scenario: "A 32 × 16 ft rectangular in-ground pool with 3½ ft of water at the shallow end and 6 ft at the deep end, filled from a hose delivering 8 gallons per minute.",
      inputs: { shape: 0, length: 32, width: 16, shallow: 3.5, deep: 6, flow: 8 },
      expected: { averageDepth: 4.75, surfaceArea: 512, cubicFeet: 2432, gallons: 18192.6, fillHours: 37.9 },
      steps: [
        "Average depth = (3.5 + 6) ÷ 2 = 4.75 ft.",
        "Volume = 32 × 16 × 4.75 = 2,432 cu ft.",
        "Gallons = 2,432 × 7.48 ≈ 18,190 US gallons (about 68,900 litres).",
        "Fill time = 18,193 ÷ (8 × 60) ≈ 37.9 hours.",
      ],
    },
    tips: [
      "Measure depth to the water line, not the top of the wall — most pools run 6 in or so below the coping.",
      "Write your pool's gallons on the pump-room wall; every chemical label doses by gallons.",
      "Check with your water utility before filling a large pool. Some offer pool-fill programs or bulk delivery, and some limit filling during droughts.",
      "Running several hoses from different spigots fills faster than one, as long as your water pressure holds up.",
    ],
    faqs: [
      {
        q: "How many gallons is a 24 ft round above-ground pool?",
        a: "At 4 ft of water, a 24 ft round pool holds about π × 12² × 4 × 7.48 ≈ 13,500 gallons. At 3½ ft of water it holds about 11,800 gallons.",
      },
      {
        q: "How do I calculate the gallons in a rectangular pool?",
        a: "Multiply length × width × average depth (all in feet) × 7.48. A 16 × 32 ft pool averaging 4.75 ft deep holds 16 × 32 × 4.75 × 7.48 ≈ 18,200 gallons.",
      },
      {
        q: "How long does it take to fill a pool with a garden hose?",
        a: "Divide the gallons by your hose's flow rate in gallons per minute, then by 60 for hours. Many household hoses deliver somewhere around 5–10 gal/min, so an 18,000-gallon pool can take 30–60 hours. Time a 5-gallon bucket to find your own rate.",
      },
      {
        q: "How do I find the average depth of a pool?",
        a: "Add the shallow-end and deep-end water depths and divide by 2. With 3 ft and 8 ft ends, the average is 5.5 ft. If the bottom has a long flat shallow section and a short deep hopper, the true average may be lower.",
      },
      {
        q: "How many litres are in my pool?",
        a: "Multiply US gallons by 3.785, or switch the calculator to metric. An 18,000-gallon pool holds about 68,000 litres (68 m³).",
      },
      {
        q: "Why does pool volume matter?",
        a: "Chlorine, pH adjusters, shock and algaecide are all dosed per 10,000 gallons. Pumps and filters are sized to turn the volume over in a set number of hours, and heaters are sized by the gallons and surface area.",
      },
    ],
    sources: [
      { title: "ANSI/APSP/ICC-5 American National Standard for Residential Inground Swimming Pools", publisher: "Pool & Hot Tub Alliance (PHTA) / International Code Council" },
      { title: "Model Aquatic Health Code", publisher: "Centers for Disease Control and Prevention (CDC)" },
      NIST_HB44,
    ],
    related: ["water-tank-volume-calculator", "pond-volume-calculator", "cubic-feet-calculator", "concrete-cost-calculator"],
  },
  // 116 ───────────────────────────────────────────────────────────────────
  {
    slug: "water-tank-volume-calculator",
    name: "Water Tank Volume Calculator",
    category: "water-volume",
    kind: "planning",
    featured: false,
    seoTitle: "Water Tank Volume Calculator – Capacity & Gallons at Any Level",
    description:
      "Calculate the capacity of vertical, horizontal and rectangular tanks in gallons or litres, plus how much water is in the tank at its current depth and its weight.",
    intro:
      "Whether it is a rain barrel, a cistern, a well pressure or storage tank, a stock tank or a horizontal water trailer, this calculator gives you the full capacity in gallons and cubic feet. Enter the current water depth too and it tells you how much water is left, what percentage full the tank is by volume — not just by height — and how much that water weighs, which matters for platforms and stands.",
    keywords: [
      "water tank volume calculator",
      "tank capacity calculator",
      "cylinder tank gallons",
      "horizontal tank volume",
      "rain barrel volume",
      "how many gallons in a tank",
    ],
    howToUse: [
      "Choose the tank shape: vertical cylinder, horizontal cylinder or rectangular.",
      "Enter the inside dimensions in inches (or centimetres). For a cylinder, use the inside diameter.",
      "Measure the current water depth from the inside bottom with a dipstick or sight tube.",
      "Read the total capacity, current gallons, fill percentage and water weight.",
    ],
    formula: {
      lines: [
        "Vertical cylinder: volume = π × r² × height",
        "Rectangular: volume = length × width × height",
        "Horizontal cylinder (partly full): volume = length × [r² × acos((r − h) ÷ r) − (r − h) × √(2rh − h²)]",
        "US gallons = cubic inches ÷ 231   ·   Water weight = gallons × 8.34 lb",
      ],
      notes: [
        "r is the inside radius and h the water depth, both in inches. A US gallon is defined as exactly 231 cubic inches.",
        "In a horizontal cylinder, depth and volume are not proportional: a tank filled to a quarter of its diameter holds only about 20% of its capacity, while half depth is exactly half full.",
      ],
    },
    example: {
      scenario: "A horizontal cylindrical tank 48 in in diameter and 72 in long, with 12 in of water in the bottom.",
      inputs: { shape: 1, diameter: 48, length: 72, level: 12 },
      expected: { capacityGallons: 564.02, capacityCubicFeet: 75.398, currentGallons: 110.27, percentFull: 19.55, waterWeight: 919.6 },
      steps: [
        "Radius r = 24 in. Capacity = π × 24² × 72 = 130,288 cu in ÷ 231 = 564 gallons (75.4 cu ft).",
        "Wetted cross-section at h = 12 in: 24² × acos(12 ÷ 24) − 12 × √(2 × 24 × 12 − 12²) = 603.2 − 249.4 = 353.8 sq in.",
        "Water = 353.8 × 72 = 25,472 cu in ÷ 231 = 110.3 gallons — 19.6% full, even though the depth is 25% of the diameter.",
        "Weight = 110.3 × 8.34 ≈ 920 lb.",
      ],
    },
    tips: [
      "Use inside dimensions. Plastic and concrete tanks have thick walls, so outside measurements overstate capacity.",
      "Full water weighs about 8.34 lb per gallon: a 300-gallon tank weighs over 2,500 lb plus the tank itself. Make sure the base or deck can carry it.",
      "Manufacturers' nominal capacity often includes space above the outlet or overflow, so usable water is somewhat less.",
      "For drinking water, use tanks rated for potable water and follow your local health department's guidance on cleaning and disinfection.",
    ],
    faqs: [
      {
        q: "How do I calculate the gallons in a cylindrical tank?",
        a: "Multiply π × radius² × height, all in inches, and divide by 231. A tank 48 in across and 60 in tall holds 3.1416 × 24² × 60 ÷ 231 ≈ 470 gallons.",
      },
      {
        q: "How do I work out how much water is in a horizontal tank?",
        a: "Because the tank is round, each inch of depth holds a different amount. Use the circular-segment formula in this calculator: enter the diameter, length and water depth, and it returns the gallons and percentage full.",
      },
      {
        q: "How many gallons are in a cubic foot of water?",
        a: "One cubic foot holds 7.48 US gallons, and one US gallon is 231 cubic inches (3.785 litres).",
      },
      {
        q: "How much does 1,000 gallons of water weigh?",
        a: "About 8,340 lb (roughly 3,780 kg), since fresh water weighs about 8.34 lb per gallon or 1 kg per litre.",
      },
      {
        q: "How many gallons does a 55-gallon rain barrel actually hold?",
        a: "About 55 gallons when filled to the top, but the overflow fitting usually sits a few inches below the rim, so usable volume is often closer to 50 gallons. Measure the inside height to the overflow for an exact figure.",
      },
    ],
    sources: [NIST_HB44, USGS_WATER, { title: "Rainwater Harvesting Manual", publisher: "Texas Water Development Board" }],
    related: ["pool-volume-calculator", "pond-volume-calculator", "cubic-feet-calculator", "unit-converter"],
  },
  // 117 ───────────────────────────────────────────────────────────────────
  {
    slug: "pond-volume-calculator",
    name: "Pond Volume Calculator",
    category: "water-volume",
    kind: "planning",
    featured: false,
    seoTitle: "Pond Volume Calculator – Gallons, Liner Size & Pump Flow",
    description:
      "Estimate a garden pond's volume in gallons, the liner size to buy and the minimum pump flow. Works for rectangular, circular, oval and irregular ponds.",
    intro:
      "Garden ponds need three numbers: the volume (for treatments, fish stocking and pump sizing), the liner size, and the pump flow. Choose the pond shape, enter its length and width at the widest points along with its average and maximum depth, and the calculator returns the volume in gallons or litres, the liner dimensions with overlap for the edging, and a minimum pump flow based on turning the water over once an hour.",
    keywords: [
      "pond volume calculator",
      "how many gallons is my pond",
      "pond liner size calculator",
      "pond pump size calculator",
      "koi pond gallons",
      "garden pond volume",
    ],
    howToUse: [
      "Choose rectangle, circle, or oval/irregular for kidney and free-form ponds.",
      "Measure the length and width at the widest points (or the diameter of a round pond).",
      "Take depth readings across the pond and average them; also note the deepest point.",
      "Set the liner overlap (1 ft per edge is typical) and read the volume, liner size and pump flow.",
    ],
    formula: {
      lines: [
        "Rectangle: cubic feet = length × width × average depth",
        "Circle: cubic feet = π × (diameter ÷ 2)² × average depth",
        "Oval / irregular: cubic feet = π × (length ÷ 2) × (width ÷ 2) × average depth",
        "Gallons = cubic feet × 7.48",
        "Liner length = pond length + 2 × max depth + 2 × overlap (same for width)",
      ],
      notes: [
        "The oval formula (about 0.785 × length × width) is a reasonable estimate for kidney-shaped and free-form ponds measured at their widest points.",
        "Minimum pump flow follows the common rule of thumb of circulating the full volume at least once per hour; waterfalls, streams and koi ponds often need more.",
      ],
    },
    example: {
      scenario: "A free-form garden pond 12 ft long and 8 ft wide, averaging 1½ ft deep with a 2 ft deep centre, and 1 ft of liner overlap on each edge.",
      inputs: { shape: 2, length: 12, width: 8, avgDepth: 1.5, maxDepth: 2, overlap: 1 },
      expected: { surfaceArea: 75.398, cubicFeet: 113.097, gallons: 846.03, linerLength: 18, linerWidth: 14, linerArea: 252, pumpFlow: 846.03 },
      steps: [
        "Surface area = π × 6 × 4 = 75.4 sq ft.",
        "Volume = 75.4 × 1.5 = 113.1 cu ft × 7.48 ≈ 846 gallons (about 3,200 litres).",
        "Liner = (12 + 2 × 2 + 2 × 1) × (8 + 2 × 2 + 2 × 1) = 18 × 14 ft = 252 sq ft.",
        "Pump: at least about 850 gallons per hour at the head height of your outlet.",
      ],
    },
    tips: [
      "Pump ratings drop as the water is lifted higher — choose a pump that delivers your target flow at the actual head height of the waterfall or outlet.",
      "Liners come in standard sizes; round up to the next size rather than stretching a liner to fit.",
      "Use fish-safe EPDM or PVC liner, and lay an underlayment beneath it to protect against stones and roots.",
      "Dose treatments by the calculated volume, and re-measure if you add shelves or change the water level.",
    ],
    faqs: [
      {
        q: "How do I calculate how many gallons are in my pond?",
        a: "Multiply length × width × average depth in feet, then multiply by 7.48 for a rectangular pond. For round or oval ponds, multiply by 0.785 first. A 10 × 6 ft oval pond 2 ft deep holds about 0.785 × 10 × 6 × 2 × 7.48 ≈ 705 gallons.",
      },
      {
        q: "What size pond liner do I need?",
        a: "Add twice the maximum depth plus the overlap to both the length and width. A 10 × 8 ft pond, 2 ft deep with 1 ft of overlap per edge, needs a liner of (10 + 4 + 2) × (8 + 4 + 2) = 16 × 14 ft.",
      },
      {
        q: "What size pump do I need for my pond?",
        a: "A common guideline is a pump that moves the pond's full volume at least once an hour, measured at your actual head height. An 800-gallon pond needs at least about 800 gallons per hour; ponds with waterfalls or many fish often use more.",
      },
      {
        q: "How do I measure the average depth of a pond with shelves?",
        a: "Take depth readings at several evenly spaced points, including the shelves and the deepest area, and average them. A pond with 9 in plant shelves and a 2 ft centre might average around 1¼–1½ ft.",
      },
      {
        q: "How deep should a garden pond be for fish?",
        a: "Many goldfish ponds are at least 18–24 in deep, and koi ponds are often 3 ft or more. In cold climates, a deeper zone helps fish overwinter below the ice. Check local rules — some areas require fencing or barriers for water above a certain depth.",
      },
    ],
    sources: [
      { title: "Pond liner sizing and pump selection guides", publisher: "Aquascape, Inc." },
      { title: "Pond Management Guide", publisher: "Penn State Extension" },
      NIST_HB44,
    ],
    related: ["pool-volume-calculator", "water-tank-volume-calculator", "cubic-yard-calculator", "landscape-cost-calculator"],
  },
];
