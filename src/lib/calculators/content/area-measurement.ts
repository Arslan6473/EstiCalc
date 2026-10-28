import type { CalculatorContent } from "../types";

const NIST_SP811 = {
  title: "NIST Special Publication 811: Guide for the Use of the International System of Units (SI)",
  publisher: "National Institute of Standards and Technology (NIST)",
  url: "https://www.nist.gov/pml/special-publication-811",
};
const NIST_HB44 = {
  title: "Handbook 44, Appendix C: General Tables of Units of Measurement",
  publisher: "National Institute of Standards and Technology (NIST)",
};
const ANSI_Z765 = {
  title: "ANSI Z765 – Single-Family Residential Buildings: Square Footage Method for Calculating",
  publisher: "American National Standards Institute / Home Innovation Research Labs",
};

export const content: CalculatorContent[] = [
  // 1 ─────────────────────────────────────────────────────────────────────
  {
    slug: "square-footage-calculator",
    name: "Square Footage Calculator",
    category: "area-measurement",
    kind: "planning",
    featured: true,
    seoTitle: "Square Footage Calculator – Find Sq Ft of Rooms & Spaces",
    description:
      "Free square footage calculator: add up to four rectangular areas, include a waste allowance and price per sq ft, and get total square feet, sq yd or m² instantly.",
    intro:
      "Work out the square footage of a room, a whole floor or any space you can break into rectangles. Enter the length and width of up to four areas, and the calculator adds them together, shows the total in square feet, square yards and square metres, and tells you how much material to order once you add a waste allowance. Add a price per square foot to get a quick material budget.",
    keywords: [
      "square footage calculator",
      "how to calculate square feet",
      "sq ft calculator",
      "square feet of a room",
      "area calculator feet",
      "flooring square footage",
    ],
    howToUse: [
      "Sketch the space and split it into rectangles. A room with a closet is two rectangles; an L-shaped room is two.",
      "Measure the length and width of each rectangle at floor level, to the nearest inch (or centimetre). Convert inches to decimal feet: 6 in = 0.5 ft.",
      "Enter each rectangle as Area 1 to Area 4. Leave unused areas at 0.",
      "Set a waste allowance if you are ordering material — 10% suits most flooring and sod jobs.",
      "Optionally enter a price per square foot to estimate the material cost.",
    ],
    formula: {
      lines: [
        "Area of each rectangle = length × width",
        "Total area = Area 1 + Area 2 + Area 3 + Area 4",
        "Area to order = total area × (1 + waste %)",
        "Square yards = square feet ÷ 9   ·   Square metres = square feet × 0.0929",
      ],
      notes: [
        "Always multiply feet by feet. If one side is in inches, divide it by 12 first — mixing units is the most common mistake.",
        "For circles and triangles use the circle and triangle area calculator, then add the result to your total.",
      ],
    },
    example: {
      scenario:
        "You are pricing luxury vinyl plank for a 12 × 15 ft living room and a 10 × 11 ft bedroom. The plank costs $3.50 per sq ft and you want 10% extra for cuts.",
      inputs: { length1: 12, width1: 15, length2: 10, width2: 11, waste: 10, price: 3.5 },
      expected: { area: 290, areaWithWaste: 319, squareYards: 32.222, cost: 1116.5 },
      steps: [
        "Living room: 12 × 15 = 180 sq ft. Bedroom: 10 × 11 = 110 sq ft.",
        "Total area = 180 + 110 = 290 sq ft (32.2 sq yd, or about 26.9 m²).",
        "Add 10% waste: 290 × 1.10 = 319 sq ft to order.",
        "Material cost = 319 × $3.50 = $1,116.50 before tax and delivery.",
      ],
    },
    tips: [
      "Measure each wall twice and use the larger figure — rooms are rarely perfectly square.",
      "Measure into doorways to the point where the new floor will stop (usually the centre of the door when closed).",
      "Flooring is sold by the carton, so round your order up to whole boxes after adding waste.",
      "For the official living area of a house (for a listing or appraisal), measure the exterior walls of finished, heated space — that is a different method from measuring for materials.",
    ],
    faqs: [
      {
        q: "How do I calculate square footage?",
        a: "Multiply length by width, both in feet. A room 12 ft long and 14 ft wide is 12 × 14 = 168 sq ft. For irregular spaces, split them into rectangles, work out each one, and add them up.",
      },
      {
        q: "How many square feet is a 12 × 12 room?",
        a: "A 12 × 12 ft room is 144 sq ft (16 sq yd, about 13.4 m²). If you are buying flooring, add about 10% for cuts, so order around 158 sq ft.",
      },
      {
        q: "How do I convert inches to square feet?",
        a: "Multiply length × width in inches, then divide by 144 (because 12 × 12 = 144 square inches make one square foot). For example, a 30 × 48 in area is 1,440 sq in ÷ 144 = 10 sq ft.",
      },
      {
        q: "How do I find the square footage of an odd-shaped room?",
        a: "Divide the room into rectangles that do not overlap, measure each one, and add them together. Bay windows and angled corners can be approximated as small rectangles or triangles; the circle and triangle area calculator handles the non-rectangular parts.",
      },
      {
        q: "How much extra flooring should I buy?",
        a: "About 5–10% extra is common for straight-lay flooring in simple rooms, 10–15% for rooms with many corners, and 15% or more for diagonal or herringbone patterns. Keep a spare box for future repairs.",
      },
      {
        q: "How do I convert square feet to square metres?",
        a: "Multiply square feet by 0.0929, or divide by 10.764. For example, 290 sq ft × 0.0929 ≈ 26.9 m². Switch the calculator to metric to enter and read everything in metres.",
      },
    ],
    sources: [
      ANSI_Z765,
      NIST_HB44,
      { title: "Flooring installation guidelines: estimating material", publisher: "National Wood Flooring Association (NWFA)" },
    ],
    related: ["room-area-calculator", "l-shaped-room-area-calculator", "flooring-calculator", "square-feet-to-square-yards-calculator", "waste-percentage-calculator"],
  },
  // 2 ─────────────────────────────────────────────────────────────────────
  {
    slug: "room-area-calculator",
    name: "Room Area Calculator",
    category: "area-measurement",
    kind: "planning",
    featured: true,
    seoTitle: "Room Area Calculator – Floor, Wall & Ceiling Area in One",
    description:
      "Enter a room's length, width and ceiling height to get floor area, wall area, ceiling area, perimeter and room volume in one step. Includes closets and bump-outs.",
    intro:
      "Measure a room once and get every number a renovation needs: floor area for flooring, wall area for paint or wallpaper, ceiling area, the perimeter for baseboard, and the room's volume for heating, cooling and ventilation. If the room has a closet, bay or alcove, add it as a bump-out and the calculator includes it in the floor area and perimeter.",
    keywords: [
      "room area calculator",
      "room square footage",
      "floor area calculator",
      "room size calculator",
      "room volume calculator",
      "how big is my room",
    ],
    howToUse: [
      "Measure the room's length and width wall to wall at floor level.",
      "Measure the ceiling height from the finished floor to the ceiling.",
      "If there is a closet or bump-out, enter its width (along the wall) and depth (how far it extends). Leave both at 0 if not.",
      "Read the floor, wall and ceiling areas, perimeter and volume. Switch to metric to work in metres.",
    ],
    formula: {
      lines: [
        "Floor area = length × width + alcove width × alcove depth",
        "Perimeter = 2 × (length + width) + 2 × alcove depth",
        "Gross wall area = perimeter × ceiling height",
        "Ceiling area = floor area   ·   Room volume = floor area × ceiling height",
      ],
      notes: [
        "A bump-out adds its depth twice to the perimeter (two side walls); its back wall replaces the section of main wall it opens from, so the width does not change the perimeter.",
        "Wall area here is gross — subtract doors and windows with the wall area calculator before buying paint or drywall.",
      ],
    },
    example: {
      scenario: "A 14 × 12 ft bedroom with 8 ft ceilings and a closet 4 ft wide and 2 ft deep.",
      inputs: { length: 14, width: 12, height: 8, alcoveWidth: 4, alcoveDepth: 2 },
      expected: { floorArea: 176, perimeter: 56, wallArea: 448, ceilingArea: 176, volume: 1408, squareYards: 19.556 },
      steps: [
        "Main floor = 14 × 12 = 168 sq ft. Closet = 4 × 2 = 8 sq ft. Total floor area = 176 sq ft.",
        "Perimeter = 2 × (14 + 12) + 2 × 2 = 52 + 4 = 56 ft.",
        "Gross wall area = 56 × 8 = 448 sq ft.",
        "Ceiling area = 176 sq ft, and volume = 176 × 8 = 1,408 cu ft.",
      ],
    },
    tips: [
      "Write measurements on a quick sketch of the room as you go — it makes the closet and doorway decisions obvious later.",
      "Room volume is what ventilation and air-purifier ratings are based on; floor area is what most AC and heating rules of thumb use.",
      "Use a laser measure for long rooms; tape measures sag over 15 ft or more.",
      "Measure ceiling height in a few spots in older houses — floors and ceilings are often out of level.",
    ],
    faqs: [
      {
        q: "How do I calculate the area of a room?",
        a: "Multiply the room's length by its width. A 14 × 12 ft room has a floor area of 168 sq ft. If the room has a closet or alcove, work out that rectangle separately and add it.",
      },
      {
        q: "What is the average bedroom size?",
        a: "Sizes vary widely by home age and region, but secondary bedrooms around 10 × 10 to 11 × 12 ft (100–132 sq ft) and primary bedrooms of 12 × 14 ft or larger are common in US homes. Many building codes set a minimum habitable room size of 70 sq ft — check your local code.",
      },
      {
        q: "How do I calculate the volume of a room?",
        a: "Multiply length × width × ceiling height. A 14 × 12 ft room with 8 ft ceilings is 1,344 cu ft. Volume is used for ventilation (air changes per hour) and air purifier sizing.",
      },
      {
        q: "Should I include closets in the room's square footage?",
        a: "Include them when buying flooring for the closet too. For real-estate living area, closets inside finished space are normally counted as part of the home's total square footage.",
      },
      {
        q: "How do I find the wall area of a room?",
        a: "Multiply the perimeter by the ceiling height. A 14 × 12 ft room has a 52 ft perimeter, so with 8 ft walls that is 416 sq ft before you take off doors and windows.",
      },
    ],
    sources: [
      ANSI_Z765,
      { title: "International Residential Code (IRC), Section R304: Minimum Room Areas", publisher: "International Code Council (ICC)" },
      NIST_HB44,
    ],
    related: ["square-footage-calculator", "wall-area-calculator", "paint-calculator", "flooring-calculator", "ac-btu-calculator"],
  },
  // 3 ─────────────────────────────────────────────────────────────────────
  {
    slug: "wall-area-calculator",
    name: "Wall Area Calculator",
    category: "area-measurement",
    kind: "planning",
    featured: true,
    seoTitle: "Wall Area Calculator – Square Feet of Walls Minus Openings",
    description:
      "Calculate the square footage of one wall or a whole room, minus doors and windows. Get the net wall area for paint, wallpaper, drywall, paneling or tile.",
    intro:
      "Find the net area of your walls before buying paint, wallpaper, drywall, wainscoting or wall tile. Measure one wall or all four walls of a room, enter the number of doors and windows, and the calculator subtracts the openings so you only pay for the surface you will actually cover.",
    keywords: [
      "wall area calculator",
      "wall square footage calculator",
      "how to calculate wall area",
      "square feet of walls",
      "wall area minus doors and windows",
      "wall surface area",
    ],
    howToUse: [
      "Choose whether you are measuring all four walls of a room or a single wall.",
      "Enter the room's length and width (or the single wall's length) and the wall height.",
      "Count the doors and windows. Adjust the area per door and window if yours are larger than standard.",
      "Read the net wall area — the figure to use for paint, wallpaper or panels.",
    ],
    formula: {
      lines: [
        "Wall length = 2 × (room length + room width)   (or the single wall's length)",
        "Gross wall area = wall length × wall height",
        "Openings = doors × door area + windows × window area",
        "Net wall area = gross wall area − openings",
      ],
      notes: [
        "Defaults: 20 sq ft per door (3 ft × 6 ft 8 in) and 15 sq ft per window (3 × 5 ft). Measure patio doors and picture windows and enter their real area.",
        "For gable walls, add the triangle on top: ½ × wall width × height of the peak above the wall plate.",
      ],
    },
    example: {
      scenario: "A 12 × 10 ft home office with 8 ft walls, one standard door and two average windows.",
      inputs: { mode: 0, length: 12, width: 10, height: 8, doors: 1, doorArea: 20, windows: 2, windowArea: 15 },
      expected: { wallLength: 44, grossArea: 352, openings: 50, netArea: 302 },
      steps: [
        "Wall length = 2 × (12 + 10) = 44 ft.",
        "Gross wall area = 44 × 8 = 352 sq ft.",
        "Openings = 1 × 20 + 2 × 15 = 50 sq ft.",
        "Net wall area = 352 − 50 = 302 sq ft (about 28 m²).",
      ],
    },
    tips: [
      "For drywall, many pros do not subtract small windows — the cut-outs become scrap anyway. Subtract openings for paint and wallpaper.",
      "Measure wall height from the floor to the ceiling, not to the top of the baseboard, unless you are only covering the area above it.",
      "If a wall has a sloped ceiling, measure the low and high heights and use the average as the wall height.",
      "Write down each wall separately for accent walls or wallpaper with a pattern repeat.",
    ],
    faqs: [
      {
        q: "How do I calculate the square footage of a wall?",
        a: "Multiply the wall's length by its height. A 12 ft wall that is 8 ft tall is 96 sq ft. Subtract any doors and windows in that wall to get the area you will actually cover.",
      },
      {
        q: "What is the wall area of a 12 × 12 room?",
        a: "With 8 ft walls, the four walls total 2 × (12 + 12) × 8 = 384 sq ft. Take off about 20 sq ft per door and 15 sq ft per window: with one door and two windows that leaves 334 sq ft.",
      },
      {
        q: "Should I subtract doors and windows when calculating wall area?",
        a: "Yes for paint, wallpaper and wall tile, so you do not overbuy. For drywall and paneling, many installers ignore small openings because the cut-out pieces are rarely reusable.",
      },
      {
        q: "How big is a standard door and window?",
        a: "A standard interior door is 30–36 in wide and 80 in tall, roughly 17–20 sq ft. Windows vary a lot; a 3 × 5 ft window is 15 sq ft. Measure anything larger, such as sliding patio doors (often about 6 × 6 ft 8 in, or 40 sq ft).",
      },
      {
        q: "How do I calculate the area of a gable or triangular wall?",
        a: "Work out the rectangular part (width × wall height) and add the triangle above it: ½ × width × peak height. A 24 ft wide gable wall that rises 6 ft above the 8 ft wall line is 192 + 72 = 264 sq ft.",
      },
    ],
    sources: [
      { title: "How much paint do I need? Measuring walls and openings", publisher: "Benjamin Moore" },
      { title: "The Gypsum Construction Handbook", publisher: "USG Corporation" },
      NIST_HB44,
    ],
    related: ["paint-calculator", "drywall-sheets-calculator", "wallpaper-calculator", "wall-tile-calculator", "room-area-calculator"],
  },
  // 4 ─────────────────────────────────────────────────────────────────────
  {
    slug: "l-shaped-room-area-calculator",
    name: "L-Shaped Room Area Calculator",
    category: "area-measurement",
    kind: "planning",
    featured: true,
    seoTitle: "L-Shaped Room Calculator – Square Footage of an L-Shaped Room",
    description:
      "Find the square footage and perimeter of an L-shaped room from its two outside dimensions and the missing corner. Includes a waste allowance for flooring.",
    intro:
      "L-shaped rooms are easy to get wrong because it is tempting to add the two legs together and count the corner twice. This calculator uses the cut-out method instead: measure the full outside length and width as if the room were a rectangle, then measure the missing corner. It returns the true floor area, the area to order with waste, the perimeter and the two rectangles the room splits into.",
    keywords: [
      "l shaped room calculator",
      "l shaped room square footage",
      "area of l shaped room",
      "l shaped floor area",
      "how to measure an l shaped room",
    ],
    howToUse: [
      "Measure the two longest outside walls of the L — these are the overall length and overall width.",
      "Measure the missing corner (the notch) along both directions. Its length runs the same way as the overall length.",
      "Set your waste allowance; L-shapes create extra offcuts, so 10–15% is common for flooring.",
      "Read the floor area, area to order and perimeter.",
    ],
    formula: {
      lines: [
        "Floor area = overall length × overall width − notch length × notch width",
        "Perimeter = 2 × (overall length + overall width)",
        "Section A = (overall length − notch length) × overall width",
        "Section B = notch length × (overall width − notch width)",
      ],
      notes: [
        "Section A + Section B always equals the floor area — a useful check against measuring each leg separately.",
        "The perimeter of any L-shape equals that of its bounding rectangle, because the notch moves two walls inward without changing their total length.",
      ],
    },
    example: {
      scenario:
        "An open-plan kitchen and family room measures 20 ft by 16 ft overall, with an 8 × 6 ft corner missing where the hallway is. You are buying laminate with 10% waste.",
      inputs: { length: 20, width: 16, notchLength: 8, notchWidth: 6, waste: 10 },
      expected: { area: 272, areaWithWaste: 299.2, perimeter: 72, sectionA: 192, sectionB: 80 },
      steps: [
        "Bounding rectangle = 20 × 16 = 320 sq ft. Missing corner = 8 × 6 = 48 sq ft.",
        "Floor area = 320 − 48 = 272 sq ft.",
        "Check: Section A = 12 × 16 = 192, Section B = 8 × 10 = 80, and 192 + 80 = 272 sq ft.",
        "With 10% waste, order 272 × 1.10 = 299.2 sq ft. Perimeter = 2 × (20 + 16) = 72 ft.",
      ],
    },
    tips: [
      "Sketch the L and label every wall before you measure — the inside corner walls should add up to the outside walls.",
      "Check the corner is square with the 3-4-5 method: mark 3 ft on one wall and 4 ft on the other; the diagonal should be exactly 5 ft.",
      "For flooring, run planks along the longest leg so the visual line continues through the turn.",
      "For a U-shaped or T-shaped room, subtract each missing rectangle, or add the sections using the square footage calculator.",
    ],
    faqs: [
      {
        q: "How do you calculate the square footage of an L-shaped room?",
        a: "Either split it into two rectangles and add them, or measure the full outside rectangle and subtract the missing corner. A room 20 × 16 ft overall with an 8 × 6 ft notch is 320 − 48 = 272 sq ft.",
      },
      {
        q: "Why is my L-shaped room total too big?",
        a: "Most likely the corner square was counted twice — once in each leg. If you add the two legs, measure one leg the full length and the other only from where the first one ends.",
      },
      {
        q: "How much extra flooring do I need for an L-shaped room?",
        a: "Plan on about 10–15%. The inside corner and the change of direction create more cuts than a simple rectangle. Diagonal layouts need more, often 15–20%.",
      },
      {
        q: "What is the perimeter of an L-shaped room?",
        a: "It equals the perimeter of the bounding rectangle: 2 × (overall length + overall width). For a 20 × 16 ft L-shaped room, that is 72 ft, regardless of the notch size.",
      },
      {
        q: "Can I use this for an L-shaped deck or patio?",
        a: "Yes. The geometry is the same — use the area for decking, pavers or concrete, and the perimeter for edging or railing.",
      },
    ],
    sources: [ANSI_Z765, NIST_HB44, { title: "Flooring installation guidelines: estimating material", publisher: "National Wood Flooring Association (NWFA)" }],
    related: ["square-footage-calculator", "room-area-calculator", "flooring-calculator", "perimeter-calculator", "laminate-flooring-calculator"],
  },
  // 5 ─────────────────────────────────────────────────────────────────────
  {
    slug: "cubic-yard-calculator",
    name: "Cubic Yard Calculator",
    category: "area-measurement",
    kind: "material",
    featured: true,
    seoTitle: "Cubic Yard Calculator – Yards of Mulch, Soil, Gravel & Concrete",
    description:
      "Convert length, width and depth into cubic yards for mulch, soil, gravel or concrete. Handles rectangles and circles, adds waste, and shows cubic feet and bags.",
    intro:
      "Bulk landscape materials and ready-mix concrete are sold by the cubic yard, but you measure in feet and inches. Enter the area's length and width (or diameter for a round bed) and the depth in inches, and this calculator converts it to cubic yards, adds an allowance for settling and uneven ground, and shows the equivalent number of 2 cu ft bags in case you would rather buy bagged.",
    keywords: [
      "cubic yard calculator",
      "how many cubic yards do i need",
      "yards of mulch calculator",
      "cubic yards of soil",
      "cubic yards of gravel",
      "convert feet to cubic yards",
    ],
    howToUse: [
      "Choose rectangle or circle and enter the length and width, or the diameter.",
      "Enter the depth in inches. For mulch use 2–3 in, gravel paths 3–4 in, topsoil for lawns 4–6 in.",
      "Set a waste allowance — 5–10% covers settling, compaction and uneven grade.",
      "Order the cubic yards shown. Most suppliers sell in ½ or ¼ yard increments, so round up.",
    ],
    formula: {
      lines: [
        "Cubic feet = length (ft) × width (ft) × depth (in) ÷ 12",
        "Circle: cubic feet = π × (diameter ÷ 2)² × depth (in) ÷ 12",
        "Cubic yards = cubic feet ÷ 27",
        "To order = cubic yards × (1 + waste %)",
      ],
      notes: [
        "A cubic yard is 3 ft × 3 ft × 3 ft = 27 cu ft (0.765 m³).",
        "One cubic yard covers 324 sq ft at 1 in deep, 108 sq ft at 3 in, and 81 sq ft at 4 in.",
      ],
    },
    example: {
      scenario: "A 20 × 10 ft flower bed getting a 3 in layer of shredded mulch, with 5% extra.",
      inputs: { shape: 0, length: 20, width: 10, depth: 3, waste: 5 },
      expected: { cubicFeet: 50, cubicYards: 1.8519, cubicYardsOrder: 1.9444, bags2: 27, surfaceArea: 200 },
      steps: [
        "Area = 20 × 10 = 200 sq ft. Depth = 3 in ÷ 12 = 0.25 ft.",
        "Volume = 200 × 0.25 = 50 cu ft.",
        "Cubic yards = 50 ÷ 27 = 1.85 cu yd; with 5% extra = 1.94 cu yd, so order 2 yards.",
        "Bagged alternative: 1.94 × 27 = 52.5 cu ft ÷ 2 = 26.25, so 27 bags of 2 cu ft.",
      ],
    },
    tips: [
      "Above about 3 cu yd, bulk delivery is usually far cheaper than bags — but factor in the delivery fee.",
      "Measure depth after you level and compact the base, not before.",
      "Concrete is less forgiving than mulch: use at least 5–10% extra, because running short mid-pour is costly.",
      "A typical pickup bed holds about 1–2 cu yd of mulch but much less gravel or soil by weight — check your truck's payload.",
    ],
    faqs: [
      {
        q: "How many cubic yards do I need for a 10 × 10 area?",
        a: "At 4 in deep, a 10 × 10 ft area needs 100 × (4 ÷ 12) = 33.3 cu ft, which is 1.23 cu yd. At 3 in deep it is 0.93 cu yd, and at 2 in deep 0.62 cu yd.",
      },
      {
        q: "How do I convert cubic feet to cubic yards?",
        a: "Divide by 27. For example, 54 cu ft ÷ 27 = 2 cu yd. To go the other way, multiply cubic yards by 27.",
      },
      {
        q: "How many bags of mulch equal a cubic yard?",
        a: "Thirteen and a half 2 cu ft bags make one cubic yard (27 ÷ 2), and nine 3 cu ft bags make one yard.",
      },
      {
        q: "How much area does a cubic yard cover?",
        a: "A cubic yard covers 324 sq ft at 1 in deep. Divide 324 by your depth in inches: 162 sq ft at 2 in, 108 sq ft at 3 in, 81 sq ft at 4 in and 54 sq ft at 6 in.",
      },
      {
        q: "How much does a cubic yard weigh?",
        a: "It depends on the material. Mulch is light, often around 400–800 lb per yard; topsoil and gravel are typically around a ton or more per yard, and concrete is about 4,000 lb. Ask your supplier, especially before hauling it yourself.",
      },
    ],
    sources: [
      NIST_HB44,
      { title: "Mulch and soil calculator guidance", publisher: "Mulch & Soil Council" },
      { title: "Concrete in Practice: ordering ready mixed concrete", publisher: "National Ready Mixed Concrete Association (NRMCA)" },
    ],
    related: ["mulch-calculator", "gravel-calculator", "topsoil-calculator", "concrete-slab-calculator", "cubic-feet-calculator"],
  },
  // 6 ─────────────────────────────────────────────────────────────────────
  {
    slug: "cubic-feet-calculator",
    name: "Cubic Feet Calculator",
    category: "area-measurement",
    kind: "planning",
    featured: false,
    seoTitle: "Cubic Feet Calculator – Volume of Boxes, Beds & Cylinders",
    description:
      "Calculate cubic feet for boxes, raised beds, planters, cylinders and storage spaces. Shows cubic yards and gallons too, for one item or several identical ones.",
    intro:
      "Use this cubic feet calculator to find the volume of anything box-shaped or cylindrical — a raised garden bed, a planter, a storage unit, a moving box, a sonotube or a water trough. Enter the dimensions in feet, choose how many identical items you have, and get the total in cubic feet, cubic yards and US gallons (or cubic metres and litres in metric).",
    keywords: [
      "cubic feet calculator",
      "how to calculate cubic feet",
      "cubic footage calculator",
      "volume calculator feet",
      "cubic feet of a cylinder",
      "cubic feet to gallons",
    ],
    howToUse: [
      "Choose a box (rectangular) or cylinder shape.",
      "Enter the inside length and width, or the diameter, plus the height or fill depth. Convert inches to decimal feet (9 in = 0.75 ft), or switch to metric.",
      "Enter how many identical items you are filling.",
      "Read the total cubic feet, cubic yards and liquid capacity.",
    ],
    formula: {
      lines: [
        "Box: cubic feet = length × width × height",
        "Cylinder: cubic feet = π × (diameter ÷ 2)² × height",
        "Total = cubic feet per item × number of items",
        "Cubic yards = cubic feet ÷ 27   ·   US gallons = cubic feet × 7.48",
      ],
      notes: [
        "If you measured in inches, multiply the three dimensions and divide by 1,728 (12 × 12 × 12) to get cubic feet.",
        "Use inside dimensions for capacity and outside dimensions for space taken up (e.g. shipping or storage).",
      ],
    },
    example: {
      scenario: "Two raised garden beds, each 6 ft long, 3 ft wide and filled 1.5 ft deep with soil mix.",
      inputs: { shape: 0, length: 6, width: 3, height: 1.5, quantity: 2 },
      expected: { cubicFeetEach: 27, cubicFeet: 54, cubicYards: 2, gallons: 403.95 },
      steps: [
        "Each bed = 6 × 3 × 1.5 = 27 cu ft.",
        "Two beds = 27 × 2 = 54 cu ft.",
        "In cubic yards: 54 ÷ 27 = 2 cu yd — a typical bulk soil order.",
        "As a liquid capacity: 54 × 7.48 ≈ 404 gallons.",
      ],
    },
    tips: [
      "Soil and compost settle by 10–20% after watering, so overfill raised beds slightly or plan to top up.",
      "Bagged products list cubic feet on the bag; divide your total by the bag size to get the count.",
      "For a sonotube (concrete form), use the cylinder option with the inside diameter in feet: a 12 in tube is 1 ft.",
      "Moving companies estimate truck size in cubic feet — measure your largest furniture as boxes and add them up.",
    ],
    faqs: [
      {
        q: "How do I calculate cubic feet?",
        a: "Multiply length × width × height, all in feet. A box 4 ft long, 2 ft wide and 3 ft tall is 24 cu ft. If you measured in inches, multiply them and divide by 1,728.",
      },
      {
        q: "How many gallons are in a cubic foot?",
        a: "One cubic foot holds 7.48 US gallons (28.3 litres). Multiply cubic feet by 7.48 to get gallons.",
      },
      {
        q: "How do I find the cubic feet of a cylinder?",
        a: "Multiply π (3.1416) by the radius squared and by the height. A cylinder 2 ft across and 3 ft tall is 3.1416 × 1 × 3 = 9.42 cu ft.",
      },
      {
        q: "How many cubic feet of soil do I need for a 4 × 8 raised bed?",
        a: "At 12 in deep, a 4 × 8 ft bed needs 4 × 8 × 1 = 32 cu ft — about 1.2 cu yd, or 16 bags of 2 cu ft. At 10 in deep it needs about 26.7 cu ft.",
      },
      {
        q: "How many cubic feet are in a cubic yard?",
        a: "There are 27 cubic feet in a cubic yard, because a cubic yard is 3 ft × 3 ft × 3 ft.",
      },
    ],
    sources: [
      NIST_HB44,
      NIST_SP811,
      { title: "Raised bed gardening", publisher: "University of Minnesota Extension" },
    ],
    related: ["cubic-yard-calculator", "raised-bed-soil-calculator", "concrete-column-calculator", "water-tank-volume-calculator", "unit-converter"],
  },
  // 7 ─────────────────────────────────────────────────────────────────────
  {
    slug: "perimeter-calculator",
    name: "Perimeter Calculator",
    category: "area-measurement",
    kind: "planning",
    featured: false,
    seoTitle: "Perimeter Calculator – Rectangle, Circle & Triangle",
    description:
      "Find the perimeter of a rectangle, circle or triangle for fencing, edging, trim or baseboard. Also shows the enclosed area, in feet, yards or metres.",
    intro:
      "Perimeter is the distance all the way around a shape — the number you need for fencing, landscape edging, baseboard, crown molding, border tile or string lights. Pick a rectangle, circle or triangle, enter its dimensions, and the calculator gives you the perimeter (or circumference) along with the area it encloses.",
    keywords: [
      "perimeter calculator",
      "how to find perimeter",
      "circumference calculator",
      "perimeter of a rectangle",
      "perimeter of a triangle",
      "fence perimeter calculator",
    ],
    howToUse: [
      "Choose the shape: rectangle or square, circle, or triangle.",
      "Enter the length and width, the diameter, or the three side lengths.",
      "Read the perimeter. For fencing or edging, subtract gate openings and add a little for overlaps.",
    ],
    formula: {
      lines: [
        "Rectangle: perimeter = 2 × (length + width)",
        "Circle: circumference = π × diameter",
        "Triangle: perimeter = side A + side B + side C",
        "Triangle area (Heron): √[s(s − a)(s − b)(s − c)], where s = (a + b + c) ÷ 2",
      ],
      notes: [
        "Three sides only form a triangle if the two shorter sides add up to more than the longest; otherwise the result is 0.",
        "For an L-shaped room or yard, the perimeter equals 2 × (overall length + overall width).",
      ],
    },
    example: {
      scenario: "Fencing a 20 × 12 ft rectangular garden plot.",
      inputs: { shape: 0, length: 20, width: 12 },
      expected: { perimeter: 64, area: 240, perimeterYards: 21.333 },
      steps: [
        "Perimeter = 2 × (20 + 12) = 64 ft (about 19.5 m).",
        "In yards: 64 ÷ 3 = 21.3 yd.",
        "Enclosed area = 20 × 12 = 240 sq ft.",
      ],
    },
    tips: [
      "Subtract the width of each gate from the fence perimeter, then add the gate itself as a separate item.",
      "For baseboard, subtract door openings but add 10% for miter cuts and short leftover pieces.",
      "To measure a curved bed, lay a garden hose along the edge, then straighten it and measure the hose.",
      "Corner posts are shared by two sides — count them once when ordering fence posts.",
    ],
    faqs: [
      {
        q: "How do you find the perimeter of a rectangle?",
        a: "Add the length and width and double it: P = 2 × (L + W). A 20 × 12 ft yard has a perimeter of 64 ft.",
      },
      {
        q: "What is the difference between perimeter and area?",
        a: "Perimeter is the distance around a shape, measured in linear units (feet, metres). Area is the surface inside it, measured in square units (square feet, m²). Fencing uses perimeter; sod and flooring use area.",
      },
      {
        q: "How do I calculate the circumference of a circle?",
        a: "Multiply the diameter by π (about 3.1416). A 10 ft round patio has a circumference of 31.4 ft. If you know the radius, multiply it by 2π.",
      },
      {
        q: "How much edging do I need for a round flower bed?",
        a: "Measure the bed's diameter and multiply by 3.14. An 8 ft wide bed needs about 25 ft of edging, plus a few inches for overlap at the joint.",
      },
      {
        q: "How many feet of fence do I need for a quarter-acre lot?",
        a: "A quarter acre is about 10,890 sq ft. If it were a square, each side would be about 104 ft, so the perimeter is around 417 ft. Real lots are rarely square, so measure each side.",
      },
    ],
    sources: [
      NIST_HB44,
      { title: "Perimeter, area and volume", publisher: "Khan Academy" },
      { title: "Heron's Formula", publisher: "Wolfram MathWorld" },
    ],
    related: ["linear-feet-calculator", "fence-calculator", "edging-calculator", "baseboard-trim-calculator", "circle-triangle-area-calculator"],
  },
  // 8 ─────────────────────────────────────────────────────────────────────
  {
    slug: "linear-feet-calculator",
    name: "Linear Feet Calculator",
    category: "area-measurement",
    kind: "planning",
    featured: false,
    seoTitle: "Linear Feet Calculator – Total Length, Stock Pieces & Cost",
    description:
      "Add up pieces of trim, lumber, pipe or fencing in linear feet, add waste, see how many 8–16 ft stock lengths to buy and estimate cost per linear foot.",
    intro:
      "Linear feet (also called lineal feet or running feet) is simply length — width and thickness do not matter. This calculator totals up to three groups of pieces, adds a waste allowance, works out how many stock lengths to buy from the lumber yard, and, if you enter a price per linear foot, estimates the cost. It works for trim, molding, lumber, pipe, gutters, countertop edges and fencing.",
    keywords: [
      "linear feet calculator",
      "how to calculate linear feet",
      "lineal feet calculator",
      "linear foot to board",
      "linear feet of trim",
      "price per linear foot",
    ],
    howToUse: [
      "Group identical pieces together and enter the count and the length of each piece in feet (3 ft 6 in = 3.5 ft).",
      "Use the other groups for different lengths. Leave unused groups at 0.",
      "Pick the stock length your store sells (8, 10, 12, 14 or 16 ft) and a waste allowance.",
      "Optionally enter a price per linear foot to estimate the cost.",
    ],
    formula: {
      lines: [
        "Total linear feet = Σ (pieces × length of each piece)",
        "Linear feet to buy = total × (1 + waste %)",
        "Stock pieces = linear feet to buy ÷ stock length, rounded up",
        "Cost = linear feet to buy × price per linear foot",
      ],
      notes: [
        "The stock-piece count assumes offcuts can be used elsewhere. If every piece must be one continuous length, check that each fits a single stock board.",
        "If you have inches, divide by 12 to get feet: 96 in = 8 ft.",
      ],
    },
    example: {
      scenario:
        "Casing for a closet project: six 8 ft pieces and four 3 ft 6 in pieces, sold in 12 ft lengths at $1.25 per linear foot, with 10% waste.",
      inputs: { qty1: 6, len1: 8, qty2: 4, len2: 3.5, qty3: 0, len3: 0, stock: 12, waste: 10, price: 1.25 },
      expected: { linearFeet: 62, linearFeetWithWaste: 68.2, stockPieces: 6, cost: 85.25, yards: 20.667 },
      steps: [
        "Group 1 = 6 × 8 = 48 ft. Group 2 = 4 × 3.5 = 14 ft. Total = 62 linear ft.",
        "With 10% waste: 62 × 1.10 = 68.2 linear ft.",
        "Stock pieces = 68.2 ÷ 12 = 5.68, so buy 6 twelve-foot lengths.",
        "Cost = 68.2 × $1.25 = $85.25.",
      ],
    },
    tips: [
      "Plan your cut list before buying: a 12 ft board gives one 8 ft piece and one 3.5 ft piece with only 6 in of scrap.",
      "Buy trim in the longest lengths you can transport, so long walls need no joints.",
      "Check each board for straightness at the store by sighting down its length.",
      "Linear feet is not the same as board feet. Board feet also account for thickness and width; use the board foot calculator for hardwood pricing.",
    ],
    faqs: [
      {
        q: "How do I calculate linear feet?",
        a: "Measure the length of each piece in feet and add them up. Width and thickness do not matter. Ten boards that are each 8 ft long are 80 linear feet.",
      },
      {
        q: "How do I convert inches to linear feet?",
        a: "Divide inches by 12. A 54 in shelf is 4.5 linear feet. To convert a total measured in inches, add all the inches first, then divide by 12.",
      },
      {
        q: "What is the difference between linear feet and square feet?",
        a: "Linear feet measures length in one direction only. Square feet measures area (length × width). To convert, you need the width: a 6 in (0.5 ft) wide board 10 linear ft long covers 5 sq ft.",
      },
      {
        q: "How many linear feet of baseboard do I need for a 12 × 12 room?",
        a: "The perimeter is 48 ft. Subtract about 3 ft for a standard door to get 45 ft, then add 10% for cuts — roughly 50 linear ft, or five 10 ft pieces or four 12 ft pieces with careful planning.",
      },
      {
        q: "What does price per linear foot mean?",
        a: "It is the cost for each foot of length. An 8 ft board priced at $1.50 per linear foot costs $12. Countertops, fencing and gutters are often quoted this way.",
      },
    ],
    sources: [
      { title: "American Softwood Lumber Standard (Voluntary Product Standard PS 20)", publisher: "National Institute of Standards and Technology (NIST)" },
      NIST_HB44,
      { title: "Wood Handbook: Wood as an Engineering Material", publisher: "USDA Forest Products Laboratory" },
    ],
    related: ["board-foot-calculator", "baseboard-trim-calculator", "perimeter-calculator", "fence-calculator", "quarter-round-calculator"],
  },
  // 9 ─────────────────────────────────────────────────────────────────────
  {
    slug: "square-feet-to-square-yards-calculator",
    name: "Square Feet to Square Yards Calculator",
    category: "area-measurement",
    kind: "conversion",
    featured: false,
    seoTitle: "Square Feet to Square Yards Calculator (sq ft to sq yd)",
    description:
      "Convert square feet to square yards, or enter length and width in feet. Shows square metres too, plus square yards with waste for carpet and sod orders.",
    intro:
      "Carpet, some vinyl and many landscape fabrics are priced by the square yard, while rooms are measured in square feet. Enter an area in square feet — or the room's length and width — and this converter gives the square yards, the square metre equivalent and, if you add a waste allowance, how many square yards to order.",
    keywords: [
      "square feet to square yards",
      "sq ft to sq yd",
      "convert square feet to square yards",
      "square yards calculator",
      "carpet square yards calculator",
    ],
    howToUse: [
      "Choose whether you know the total square feet or the length and width.",
      "Enter the area, or the length and width in feet.",
      "Add a waste allowance if you are ordering carpet (10% or more for seams and pattern matching).",
      "Read the area in square yards, square feet and square metres.",
    ],
    formula: {
      lines: [
        "Square yards = square feet ÷ 9",
        "Square feet = length (ft) × width (ft)",
        "Square metres = square feet × 0.09290304",
        "Square yards to order = square yards × (1 + waste %)",
      ],
      notes: [
        "There are 9 sq ft in a square yard because a yard is 3 ft, and 3 × 3 = 9.",
        "One square yard is 0.836 m²; one square metre is 1.196 sq yd.",
      ],
    },
    example: {
      scenario: "Carpeting a 12 × 15 ft bedroom, with 10% extra for seams and trimming.",
      inputs: { mode: 1, length: 12, width: 15, waste: 10 },
      expected: { squareFeet: 180, squareYards: 20, squareYardsOrder: 22, squareMetres: 16.72 },
      steps: [
        "Area = 12 × 15 = 180 sq ft.",
        "Square yards = 180 ÷ 9 = 20 sq yd.",
        "With 10% waste: 20 × 1.10 = 22 sq yd.",
        "In metric: 180 × 0.0929 = 16.7 m².",
      ],
    },
    tips: [
      "Carpet comes off a roll, usually 12 ft (sometimes 15 ft) wide, so the amount you buy depends on the roll layout — ask for a seam diagram from your installer.",
      "When comparing prices, convert per-square-yard prices to per-square-foot by dividing by 9: $27/sq yd = $3/sq ft.",
      "Sod and artificial turf are sometimes quoted per square yard too; the same conversion applies.",
      "Round up to the next whole square yard when ordering.",
    ],
    faqs: [
      {
        q: "How many square feet are in a square yard?",
        a: "There are 9 sq ft in one square yard (3 ft × 3 ft).",
      },
      {
        q: "How do I convert square feet to square yards?",
        a: "Divide the square feet by 9. For example, 450 sq ft ÷ 9 = 50 sq yd.",
      },
      {
        q: "How many square yards is a 12 × 12 room?",
        a: "A 12 × 12 ft room is 144 sq ft, which is 144 ÷ 9 = 16 sq yd. Add about 10% for carpet waste, giving roughly 17.6 sq yd.",
      },
      {
        q: "How do I convert carpet price per square yard to per square foot?",
        a: "Divide the square-yard price by 9. Carpet at $36 per square yard costs $4 per square foot. Multiply by 9 to go the other way.",
      },
      {
        q: "How many square yards is 1,000 square feet?",
        a: "1,000 sq ft ÷ 9 = 111.1 sq yd, or about 92.9 m².",
      },
    ],
    sources: [NIST_HB44, NIST_SP811, { title: "Carpet installation standard CRI 105", publisher: "Carpet and Rug Institute (CRI)" }],
    related: ["carpet-calculator", "square-footage-calculator", "unit-converter", "sod-calculator", "room-area-calculator"],
  },
  // 10 ────────────────────────────────────────────────────────────────────
  {
    slug: "board-foot-calculator",
    name: "Board Foot Calculator",
    category: "area-measurement",
    kind: "material",
    featured: false,
    seoTitle: "Board Foot Calculator – Lumber Board Feet & Cost",
    description:
      "Calculate board feet for hardwood and lumber from thickness, width and length. Add waste for defects and get the total cost at your price per board foot.",
    intro:
      "Hardwood and rough-sawn lumber are sold by the board foot, a unit of volume equal to a piece 1 in thick, 12 in wide and 1 ft long (144 cubic inches). Enter the thickness and width in inches, the length in feet and how many boards you need, and the calculator gives the total board feet, the amount to buy with a waste allowance, and the cost at your yard's price.",
    keywords: [
      "board foot calculator",
      "how to calculate board feet",
      "board feet formula",
      "lumber calculator",
      "hardwood board feet",
      "board foot price",
    ],
    howToUse: [
      "Enter the board thickness in inches. Hardwood is sold in quarters: 4/4 = 1 in, 5/4 = 1¼ in, 6/4 = 1½ in, 8/4 = 2 in.",
      "Enter the width in inches and the length in feet.",
      "Enter the number of boards and a waste allowance for knots, checks, splits and planing.",
      "Enter your price per board foot to see the cost.",
    ],
    formula: {
      lines: [
        "Board feet per board = thickness (in) × width (in) × length (ft) ÷ 12",
        "Total board feet = board feet per board × number of boards",
        "Board feet to buy = total × (1 + waste %)",
        "Cost = board feet to buy × price per board foot",
      ],
      notes: [
        "If length is in inches, use thickness × width × length ÷ 144 instead.",
        "Hardwood is measured by its rough (unplaned) thickness. Softwood dimension lumber is usually priced per piece or per linear foot, and board feet for softwood use nominal sizes (a 2×4 counts as 2 × 4 in, not 1½ × 3½ in).",
      ],
    },
    example: {
      scenario:
        "A tabletop needs six 5/4 boards, 8 in wide and 10 ft long. The lumber yard charges $9 per board foot and you allow 20% for defects.",
      inputs: { thickness: 1.25, width: 8, length: 10, quantity: 6, waste: 20, price: 9 },
      expected: { boardFeetEach: 8.333, boardFeet: 50, boardFeetWithWaste: 60, cost: 540, cubicFeet: 4.1667 },
      steps: [
        "Each board = 1.25 × 8 × 10 ÷ 12 = 8.33 board feet.",
        "Six boards = 8.33 × 6 = 50 board feet.",
        "With 20% waste: 50 × 1.20 = 60 board feet.",
        "Cost = 60 × $9 = $540.",
      ],
    },
    tips: [
      "Hardwood boards come in random widths and lengths, so yards often sell by the total board feet in your pile — bring a tape measure and this calculator.",
      "Buy thicker stock than your finished size: 4/4 rough lumber typically surfaces to about ¾ in (S2S).",
      "Allow more waste (25–30%) for lower grades with more knots, or when you need long, clear pieces.",
      "Let lumber acclimate in your shop for a week or two before milling to reduce movement.",
    ],
    faqs: [
      {
        q: "How do you calculate board feet?",
        a: "Multiply thickness (in) × width (in) × length (ft) and divide by 12. A 1 × 6 in board that is 8 ft long is 1 × 6 × 8 ÷ 12 = 4 board feet.",
      },
      {
        q: "What is a board foot?",
        a: "A board foot is a volume of wood equal to 144 cubic inches — a piece 1 in thick, 12 in wide and 12 in long. Twelve board feet equal one cubic foot.",
      },
      {
        q: "How many board feet are in a 2×4?",
        a: "Using nominal size, a 2×4 has 2 × 4 ÷ 12 = 0.667 board feet per linear foot, so an 8 ft 2×4 is 5.33 board feet.",
      },
      {
        q: "What does 4/4, 5/4 and 8/4 mean?",
        a: "It is the rough thickness in quarters of an inch: 4/4 is 1 in, 5/4 is 1¼ in, 6/4 is 1½ in and 8/4 is 2 in. The board foot calculation uses this rough thickness.",
      },
      {
        q: "Is board feet the same as linear feet?",
        a: "No. Linear feet only measures length. Board feet measures volume, so a wide or thick board has more board feet per linear foot. A 1 × 12 in board has 1 board foot per linear foot; a 1 × 6 in board has 0.5.",
      },
    ],
    sources: [
      { title: "Rules for the Measurement and Inspection of Hardwood and Cypress", publisher: "National Hardwood Lumber Association (NHLA)" },
      { title: "Wood Handbook: Wood as an Engineering Material", publisher: "USDA Forest Products Laboratory" },
      { title: "American Softwood Lumber Standard (Voluntary Product Standard PS 20)", publisher: "National Institute of Standards and Technology (NIST)" },
    ],
    related: ["linear-feet-calculator", "framing-lumber-calculator", "cubic-feet-calculator", "deck-boards-calculator", "waste-percentage-calculator"],
  },
  // 11 ────────────────────────────────────────────────────────────────────
  {
    slug: "circle-triangle-area-calculator",
    name: "Circle and Triangle Area Calculator",
    category: "area-measurement",
    kind: "planning",
    featured: false,
    seoTitle: "Circle & Triangle Area Calculator – Round & Angled Spaces",
    description:
      "Find the area of a circle from its diameter, or a triangle from base and height or three sides. Ideal for round patios, flower beds and angled room corners.",
    intro:
      "Not every space is a rectangle. Round patios, circular flower beds and tree rings, gable walls, angled corners and triangular garden beds all need a different formula. Choose circle or triangle, enter the measurements you have, and the calculator returns the area — plus the circumference or perimeter — so you can order pavers, mulch, sod or paint with confidence.",
    keywords: [
      "circle area calculator",
      "triangle area calculator",
      "area of a circle in square feet",
      "area of a triangle",
      "heron's formula calculator",
      "round patio square footage",
    ],
    howToUse: [
      "Choose circle, triangle by base and height, or triangle by three sides.",
      "For a circle, measure straight across through the centre (the diameter).",
      "For a triangle, enter the base and the perpendicular height, or measure all three sides if you cannot find the height.",
      "Read the area. Add it to rectangular areas in the square footage calculator for complex shapes.",
    ],
    formula: {
      lines: [
        "Circle: area = π × (diameter ÷ 2)²   ·   circumference = π × diameter",
        "Triangle (base and height): area = ½ × base × height",
        "Triangle (three sides): area = √[s(s − a)(s − b)(s − c)], where s = (a + b + c) ÷ 2",
      ],
      notes: [
        "The height of a triangle is measured at a right angle to the base, not along a sloping side.",
        "A semicircle is half of a circle's area; a quarter circle is a quarter.",
      ],
    },
    example: {
      scenario: "A round paver patio 12 ft across.",
      inputs: { shape: 0, diameter: 12 },
      expected: { area: 113.097, circumference: 37.699, radius: 6, squareYards: 12.566 },
      steps: [
        "Radius = 12 ÷ 2 = 6 ft.",
        "Area = π × 6² = 3.1416 × 36 = 113.1 sq ft (about 10.5 m²).",
        "Circumference = π × 12 = 37.7 ft — the length of edging or border pavers.",
        "Add 5–10% extra pavers for the curved cuts around the edge.",
      ],
    },
    tips: [
      "To find a circle's centre on the ground, measure the widest point in two directions; where they cross is the centre.",
      "If you only know the circumference, divide it by π to get the diameter (a 31.4 ft edge means a 10 ft circle).",
      "Right triangles are the easy case: the two sides that meet at the square corner are the base and height.",
      "Circular paving needs more cutting waste than square layouts — plan on 10% or more with large pavers.",
    ],
    faqs: [
      {
        q: "How do I calculate the square footage of a circle?",
        a: "Square the radius (half the diameter) and multiply by 3.1416. A 10 ft circle has a radius of 5 ft, so its area is 3.1416 × 25 = 78.5 sq ft.",
      },
      {
        q: "How do I find the area of a triangle?",
        a: "Multiply the base by the height and halve it. A triangle with a 10 ft base and 6 ft height is ½ × 10 × 6 = 30 sq ft.",
      },
      {
        q: "How do I find a triangle's area if I only know the three sides?",
        a: "Use Heron's formula: work out s = half the perimeter, then area = √[s(s − a)(s − b)(s − c)]. A 6-8-10 ft triangle has s = 12 and area √(12 × 6 × 4 × 2) = 24 sq ft.",
      },
      {
        q: "How many pavers do I need for a 12 ft round patio?",
        a: "The patio is about 113 sq ft. With standard 4 × 8 in pavers (0.22 sq ft each, about 4.5 per sq ft) that is roughly 510 pavers, plus 5–10% for cuts — about 540–560.",
      },
      {
        q: "What is the area of a semicircle?",
        a: "Half the area of the full circle: ½ × π × r². A half-round deck 16 ft across (8 ft radius) is ½ × 3.1416 × 64 = 100.5 sq ft.",
      },
    ],
    sources: [
      { title: "Area of circles; Area of triangles", publisher: "Khan Academy" },
      { title: "Heron's Formula", publisher: "Wolfram MathWorld" },
      NIST_HB44,
    ],
    related: ["square-footage-calculator", "perimeter-calculator", "paver-calculator", "tree-ring-calculator", "mulch-calculator"],
  },
  // 12 ────────────────────────────────────────────────────────────────────
  {
    slug: "unit-converter",
    name: "Unit Converter (Feet, Inches, Metres)",
    category: "area-measurement",
    kind: "conversion",
    featured: false,
    seoTitle: "Feet, Inches & Metres Converter – Length Unit Converter",
    description:
      "Convert between inches, feet, yards, millimetres, centimetres and metres in one step. See every unit at once, plus the answer in feet and inches.",
    intro:
      "Converting between imperial and metric measurements is part of almost every project — a European tile in millimetres, a US cabinet in inches, a plan drawn in metres. Enter a length, choose the unit it is in and the unit you want, and this converter shows the answer along with the same length in every other unit, including feet-and-inches.",
    keywords: [
      "feet to metres converter",
      "inches to cm",
      "metres to feet and inches",
      "mm to inches",
      "length unit converter",
      "cm to feet",
    ],
    howToUse: [
      "Type the value you want to convert.",
      "Choose the unit it is measured in.",
      "Choose the unit you want the answer in.",
      "Read the result, plus the same length in all six units and as feet and inches.",
    ],
    formula: {
      lines: [
        "1 inch = 25.4 mm = 2.54 cm (exact)",
        "1 foot = 12 in = 304.8 mm = 0.3048 m (exact)",
        "1 yard = 3 ft = 36 in = 0.9144 m (exact)",
        "1 metre = 39.37 in = 3.2808 ft = 1.0936 yd",
      ],
      notes: [
        "Since 1959, the international inch has been defined as exactly 25.4 mm, so all imperial-to-metric length conversions are exact multiples of that.",
        "Feet and inches: whole feet = the integer part of the feet value; remaining inches = (feet − whole feet) × 12.",
      ],
    },
    example: {
      scenario: "A European kitchen plan shows a ceiling height of 2.4 m. What is that in feet and inches?",
      inputs: { value: 2.4, from: 5, to: 1 },
      expected: { converted: 7.874, feet: 7.874, inches: 94.488, wholeFeet: 7, remainingInches: 10.488, centimetres: 240 },
      steps: [
        "2.4 m = 2,400 mm. 2,400 ÷ 25.4 = 94.49 in.",
        "94.49 in ÷ 12 = 7.874 ft.",
        "Whole feet = 7, leaving 0.874 × 12 = 10.49 in.",
        "So 2.4 m ≈ 7 ft 10½ in.",
      ],
    },
    tips: [
      "Tape measures with both inch and metric scales avoid conversion errors on site.",
      "Round metric conversions sensibly: a 600 mm cabinet is 23⅝ in, not exactly 24 in, so check fits before assuming a standard size.",
      "To convert decimal inches to sixteenths, multiply the decimal by 16: 0.49 in × 16 ≈ 8, so 8/16 or ½ in.",
      "For areas, square the length factor: 1 m² = 10.764 sq ft, not 3.28 sq ft.",
    ],
    faqs: [
      {
        q: "How many centimetres are in an inch?",
        a: "Exactly 2.54 cm (25.4 mm) are in one inch. To convert inches to centimetres, multiply by 2.54.",
      },
      {
        q: "How do I convert metres to feet and inches?",
        a: "Multiply metres by 3.2808 to get decimal feet. The whole number is the feet; multiply the decimal part by 12 for inches. For example, 1.8 m = 5.906 ft = 5 ft 10.9 in.",
      },
      {
        q: "How many feet are in a metre?",
        a: "One metre is 3.2808 ft, or 3 ft 3.37 in. One foot is 0.3048 m.",
      },
      {
        q: "How do I convert millimetres to inches?",
        a: "Divide millimetres by 25.4. A 12 mm laminate plank is 12 ÷ 25.4 = 0.47 in thick, just under ½ in.",
      },
      {
        q: "How do I convert feet to centimetres?",
        a: "Multiply feet by 30.48. An 8 ft ceiling is 243.84 cm (about 2.44 m).",
      },
    ],
    sources: [NIST_SP811, NIST_HB44, { title: "The International System of Units (SI Brochure)", publisher: "Bureau International des Poids et Mesures (BIPM)" }],
    related: ["square-feet-to-square-yards-calculator", "square-footage-calculator", "linear-feet-calculator", "cubic-feet-calculator"],
  },
  // 13 ────────────────────────────────────────────────────────────────────
  {
    slug: "waste-percentage-calculator",
    name: "Waste Percentage Calculator",
    category: "area-measurement",
    kind: "planning",
    featured: false,
    seoTitle: "Waste Percentage Calculator – How Much Extra Material to Order",
    description:
      "Add a waste factor to any material order. Enter the amount needed, waste % and box size to see how much to order, boxes to buy and your true overage.",
    intro:
      "Almost every material you buy needs a little extra for cuts, breakage, pattern matching and mistakes. Enter the exact amount you measured, the waste percentage that suits your job and the quantity per box or bundle, and this calculator tells you how much to order, how many boxes to buy, what you will actually receive and what your real overage is after rounding up.",
    keywords: [
      "waste percentage calculator",
      "waste factor calculator",
      "how much extra flooring to buy",
      "overage calculator",
      "material waste allowance",
      "how much extra tile to order",
    ],
    howToUse: [
      "Enter the exact quantity you measured, in any unit (sq ft, linear ft, tiles, boards).",
      "Choose a waste percentage for your material and layout (see the guide below).",
      "Enter how many units come in each box, carton or bundle. Use 1 for items sold individually.",
      "Optionally enter the price per box, then read the amount to order and boxes to buy.",
    ],
    formula: {
      lines: [
        "Amount to order = amount needed × (1 + waste % ÷ 100)",
        "Boxes = amount to order ÷ units per box, rounded up",
        "Actual overage = (boxes × units per box − amount needed) ÷ amount needed × 100",
      ],
      notes: [
        "Typical allowances: 5–10% for straight-lay flooring in simple rooms, 10–15% for rooms with many corners, 15–20% for diagonal or herringbone layouts, and 10–20% for trim and tile, more for large-format or patterned tile.",
        "Some estimators use amount ÷ (1 − waste %) instead. At 10% that gives 11.1% extra rather than 10%; the difference is small for low percentages.",
      ],
    },
    example: {
      scenario:
        "A 240 sq ft room needs laminate that comes in 22.5 sq ft cartons at $45 each. You choose 10% waste.",
      inputs: { needed: 240, waste: 10, packSize: 22.5, packPrice: 45 },
      expected: { orderAmount: 264, extra: 24, packs: 12, totalBought: 270, actualOverage: 12.5, cost: 540 },
      steps: [
        "Amount to order = 240 × 1.10 = 264 sq ft (24 sq ft extra).",
        "Cartons = 264 ÷ 22.5 = 11.73, so buy 12 cartons.",
        "You receive 12 × 22.5 = 270 sq ft — an actual overage of 30 ÷ 240 = 12.5%.",
        "Cost = 12 × $45 = $540.",
      ],
    },
    tips: [
      "Ask whether unopened boxes can be returned — it makes rounding up painless.",
      "Keep at least one spare box of flooring or tile for repairs; matching dye lots years later is difficult.",
      "Use a higher waste factor for first-time DIY projects, natural stone with colour variation and patterns that must line up.",
      "Buy all material at once from the same lot or batch so colour and size are consistent.",
    ],
    faqs: [
      {
        q: "What waste percentage should I use for flooring?",
        a: "About 5–10% for laminate, vinyl plank or hardwood laid straight in a simple room, 10–15% for rooms with closets, angles or many doorways, and 15–20% for diagonal or herringbone patterns. Always check the manufacturer's guidance.",
      },
      {
        q: "How do I add 10% waste to a measurement?",
        a: "Multiply by 1.10. For 300 sq ft, order 300 × 1.10 = 330 sq ft. For 15% multiply by 1.15, for 20% by 1.20.",
      },
      {
        q: "How much extra tile should I buy?",
        a: "Plan on about 10% for a standard straight layout and 15% or more for diagonal layouts, large-format tiles or rooms with many cuts. Natural stone and handmade tiles may need more to allow for sorting.",
      },
      {
        q: "Why is my actual overage higher than my waste percentage?",
        a: "Because materials come in whole boxes. Rounding up to the next box adds extra on top of your waste allowance — in the example, 10% waste became 12.5% after rounding to 12 cartons.",
      },
      {
        q: "Should I add waste for paint?",
        a: "A small allowance, around 5–10%, covers paint left in trays and rollers and touch-ups. Paint calculators usually include this already, so do not add it twice.",
      },
    ],
    sources: [
      { title: "TCNA Handbook for Ceramic, Glass, and Stone Tile Installation", publisher: "Tile Council of North America (TCNA)" },
      { title: "Flooring installation guidelines: estimating material", publisher: "National Wood Flooring Association (NWFA)" },
    ],
    related: ["flooring-calculator", "tile-calculator", "square-footage-calculator", "baseboard-trim-calculator", "board-foot-calculator"],
  },
];
