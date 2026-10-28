import type { CalculatorContent } from "../types";

const UPDATED = "2026-10-28";

export const content: CalculatorContent[] = [
  {
    slug: "flooring-calculator",
    name: "Flooring Calculator",
    category: "flooring",
    kind: "material",
    featured: true,
    seoTitle: "Flooring Calculator – How Many Boxes of Flooring Do I Need?",
    description:
      "Free flooring calculator: enter room size and box coverage to see the square footage and number of boxes to buy, with a waste allowance. Feet or metres.",
    intro:
      "Work out how much flooring to buy for any room. Enter the room's length and width, add any closets or nooks, type in the coverage printed on the carton and choose a waste allowance — the calculator returns the square footage you need and the number of full boxes to buy. It works for laminate, vinyl plank, engineered wood, hardwood and other boxed flooring.",
    keywords: [
      "flooring calculator",
      "how much flooring do i need",
      "flooring square footage calculator",
      "boxes of flooring calculator",
      "floor area calculator",
      "flooring estimator",
    ],
    howToUse: [
      "Measure the room's length and width at the widest points, wall to wall. Round each up to the next half foot.",
      "Add the area of any closets, alcoves or bump-outs that will get the same flooring in the extra area box.",
      "Enter the coverage per box from the carton label (for example 20 sq ft per box).",
      "Choose a waste allowance — 10% for a straight layout, 15% for diagonal or herringbone — and read the number of boxes.",
    ],
    formula: {
      lines: [
        "Floor area = length × width + extra area",
        "Flooring needed = floor area × (1 + waste %)",
        "Boxes = flooring needed ÷ coverage per box, rounded up",
      ],
      notes: [
        "Boxes are rounded up to whole cartons because stores do not sell partial boxes.",
        "Square yards = square feet ÷ 9, useful when comparing carpet or sheet vinyl prices.",
      ],
    },
    example: {
      scenario: "A 15 × 12 ft living room with no closets, using flooring that covers 20 sq ft per box and a 10% waste allowance.",
      inputs: { length: 15, width: 12, extra: 0, boxCoverage: 20, waste: 10 },
      expected: { area: 180, areaWithWaste: 198, boxes: 10, sqYd: 22 },
      steps: [
        "Floor area = 15 × 12 = 180 sq ft.",
        "Add 10% waste: 180 × 1.10 = 198 sq ft.",
        "Boxes = 198 ÷ 20 = 9.9, rounded up to 10 boxes (200 sq ft).",
        "In square yards that is 198 ÷ 9 = 22 sq yd.",
      ],
    },
    tips: [
      "Buy all cartons from the same production lot (check the lot or dye number) so colour and gloss match.",
      "Keep one unopened box after the job — matching discontinued flooring for a future repair is often impossible.",
      "For L-shaped or irregular rooms, split the floor into rectangles, measure each and add them together.",
      "Let wood and laminate acclimate in the room for the time the manufacturer specifies before installing.",
      "Most stores accept unopened boxes back, so rounding up costs little if you keep the receipt.",
    ],
    faqs: [
      {
        q: "How much flooring do I need for a 12 × 12 room?",
        a: "A 12 × 12 room is 144 sq ft. With a 10% waste allowance you need about 158 sq ft, which is 8 boxes of 20 sq ft flooring (160 sq ft).",
      },
      {
        q: "How much extra flooring should I buy?",
        a: "Add 10% for a standard straight installation in a rectangular room. Use 15% for diagonal layouts, herringbone or rooms with many corners and doorways, and 5–7% only for large, simple rooms with long straight runs.",
      },
      {
        q: "How many square feet are in a box of flooring?",
        a: "It varies by product. Laminate cartons commonly hold 15–25 sq ft, luxury vinyl plank 18–30 sq ft and solid hardwood 18–25 sq ft. The exact number is printed on the end of each box.",
      },
      {
        q: "Should I include closets in my flooring measurement?",
        a: "Yes, if the same flooring will continue into them. Measure each closet's length and width, multiply, and add the result as extra area. Do not subtract the space under built-in cabinets only if the flooring will run underneath.",
      },
      {
        q: "Do I subtract the area under kitchen cabinets?",
        a: "Usually yes. Floating floors such as laminate and vinyl plank are not installed under fixed cabinets or islands, so measure the open floor only. Some people do run flooring under cabinets in a full remodel; in that case include it.",
      },
      {
        q: "How do I convert square feet of flooring to square metres?",
        a: "Divide square feet by 10.764. For example, 198 sq ft is about 18.4 m². You can also switch the calculator to metric and enter metres directly.",
      },
    ],
    sources: [
      { title: "Installation instructions and carton coverage data for laminate and LVP", publisher: "Shaw Floors" },
      { title: "Hardwood flooring installation guidelines", publisher: "National Wood Flooring Association (NWFA)" },
      { title: "How to measure a room for flooring", publisher: "The Home Depot" },
    ],
    related: ["room-by-room-flooring-estimator", "laminate-flooring-calculator", "vinyl-plank-flooring-calculator", "flooring-cost-calculator", "square-footage-calculator", "underlayment-calculator"],
  },
  {
    slug: "laminate-flooring-calculator",
    name: "Laminate Flooring Calculator",
    category: "flooring",
    kind: "material",
    featured: true,
    seoTitle: "Laminate Flooring Calculator – Boxes and Underlayment Rolls",
    description:
      "Calculate how many boxes of laminate flooring and rolls of underlayment you need. Enter room size, box coverage and waste to get an accurate shopping list.",
    intro:
      "Plan a laminate floor without overbuying. Enter the room dimensions and the square footage printed on the laminate carton, choose whether you need separate underlayment, and the calculator tells you how many boxes of laminate and rolls of foam underlayment to buy — plus the room perimeter for the expansion gap and trim.",
    keywords: [
      "laminate flooring calculator",
      "how much laminate flooring do i need",
      "laminate boxes calculator",
      "laminate underlayment calculator",
      "laminate floor estimate",
    ],
    howToUse: [
      "Measure the room's length and width wall to wall.",
      "Enter the coverage per box from the laminate carton (often 15–25 sq ft).",
      "Choose whether your laminate has a pre-attached pad or needs separate underlayment, and enter the roll size.",
      "Set the waste allowance — 10% for straight installs, 15% for diagonal — and read the boxes and rolls.",
    ],
    formula: {
      lines: [
        "Floor area = length × width",
        "Laminate needed = floor area × (1 + waste %)",
        "Boxes = laminate needed ÷ coverage per box, rounded up",
        "Underlayment rolls = floor area ÷ roll coverage, rounded up",
        "Perimeter = 2 × (length + width)",
      ],
      notes: [
        "Underlayment is laid edge to edge and trimmed at the walls, so it is calculated on the net floor area.",
        "Laminate is a floating floor: leave the expansion gap the manufacturer specifies (commonly about ¼ in or 6–10 mm) around the whole perimeter and cover it with baseboard or quarter round.",
      ],
    },
    example: {
      scenario: "A 14 × 16 ft bedroom with laminate that covers 22 sq ft per box, separate 100 sq ft underlayment rolls and 10% waste.",
      inputs: { length: 14, width: 16, boxCoverage: 22, underlayment: 1, rollCoverage: 100, waste: 10 },
      expected: { area: 224, areaWithWaste: 246.4, boxes: 12, underlaymentRolls: 3, perimeter: 60 },
      steps: [
        "Floor area = 14 × 16 = 224 sq ft.",
        "With 10% waste: 224 × 1.10 = 246.4 sq ft.",
        "Boxes = 246.4 ÷ 22 = 11.2, rounded up to 12 boxes.",
        "Underlayment = 224 ÷ 100 = 2.24, rounded up to 3 rolls.",
        "Perimeter = 2 × (14 + 16) = 60 ft of expansion gap to cover with trim.",
      ],
    },
    tips: [
      "Open boxes from several cartons as you go and mix planks so the pattern repeat is not obvious.",
      "Stagger end joints by at least the distance the manufacturer specifies (often 8–12 in) to keep the floor stable.",
      "Over concrete, use underlayment with a built-in vapour barrier or lay 6-mil polyethylene first.",
      "Do not add a second pad under laminate that already has one attached — it can void the warranty and make joints flex.",
      "Plan the layout so the last row is not a thin sliver: if it would be under about 2 in wide, trim the first row too.",
    ],
    faqs: [
      {
        q: "How many boxes of laminate do I need for a 12 × 12 room?",
        a: "A 12 × 12 room is 144 sq ft. Add 10% waste for about 158 sq ft. With 22 sq ft cartons that is 158 ÷ 22 = 7.2, so buy 8 boxes.",
      },
      {
        q: "What waste factor should I use for laminate flooring?",
        a: "Most installers add 10% for a straight lay in a regular room. Use 15% for diagonal installation, rooms with many corners or angled walls, or if you are new to cutting laminate.",
      },
      {
        q: "Do I need underlayment for laminate flooring?",
        a: "Yes, unless the planks have a pad already attached. Underlayment cushions the floor, reduces noise and smooths minor subfloor flaws. Over concrete it should include a moisture barrier.",
      },
      {
        q: "How much underlayment do I need for laminate?",
        a: "Buy enough to cover the floor area. Foam underlayment commonly comes in 100 sq ft rolls, so a 224 sq ft room needs 3 rolls. Seams are butted together and taped rather than overlapped unless the product says otherwise.",
      },
      {
        q: "How big an expansion gap does laminate need?",
        a: "Follow the manufacturer's instructions; many call for roughly ¼ in to ⅜ in (6–10 mm) at every wall, cabinet and pipe. The gap lets the floor expand with humidity and is hidden by baseboard or quarter round.",
      },
    ],
    sources: [
      { title: "Laminate flooring installation guide", publisher: "Pergo" },
      { title: "Laminate installation instructions", publisher: "Mohawk Industries" },
      { title: "Laminate flooring standards and consumer information", publisher: "North American Laminate Flooring Association (NALFA)" },
    ],
    related: ["flooring-calculator", "underlayment-calculator", "baseboard-trim-calculator", "quarter-round-calculator", "vinyl-plank-flooring-calculator"],
  },
  {
    slug: "vinyl-plank-flooring-calculator",
    name: "Vinyl Plank Flooring Calculator",
    category: "flooring",
    kind: "material",
    featured: true,
    seoTitle: "Vinyl Plank Flooring Calculator – LVP Boxes and Planks Needed",
    description:
      "Free LVP calculator: find how many boxes and planks of luxury vinyl plank flooring you need from room size, plank size and box coverage, with waste included.",
    intro:
      "Estimate luxury vinyl plank (LVP) flooring for any room. Enter the room size, the square footage per carton and the plank dimensions, and the calculator returns the boxes to buy and roughly how many planks you will lay — including a waste allowance for end cuts and doorways.",
    keywords: [
      "vinyl plank flooring calculator",
      "lvp calculator",
      "how much vinyl plank flooring do i need",
      "luxury vinyl plank calculator",
      "vinyl flooring boxes calculator",
    ],
    howToUse: [
      "Measure the room's length and width wall to wall.",
      "Enter the coverage per box printed on the carton.",
      "Enter the plank length and width (for example 48 × 7 in) to see the approximate plank count.",
      "Choose a waste allowance and read the number of boxes to buy.",
    ],
    formula: {
      lines: [
        "Floor area = length × width",
        "Vinyl needed = floor area × (1 + waste %)",
        "Boxes = vinyl needed ÷ coverage per box, rounded up",
        "Plank area = plank length × plank width ÷ 144 (sq ft)",
        "Planks ≈ vinyl needed ÷ plank area, rounded up",
      ],
      notes: [
        "Plank count is approximate; buy by the box. It is useful for checking how many cuts and rows to expect.",
      ],
    },
    example: {
      scenario: "A 12 × 18 ft family room with 48 × 7 in planks that come 24 sq ft to a box, with 10% waste.",
      inputs: { length: 12, width: 18, boxCoverage: 24, plankLength: 48, plankWidth: 7, waste: 10 },
      expected: { area: 216, areaWithWaste: 237.6, boxes: 10, plankArea: 2.333, planks: 102 },
      steps: [
        "Floor area = 12 × 18 = 216 sq ft.",
        "With 10% waste: 216 × 1.10 = 237.6 sq ft.",
        "Boxes = 237.6 ÷ 24 = 9.9, rounded up to 10 boxes.",
        "Each plank is 48 × 7 ÷ 144 = 2.33 sq ft, so 237.6 ÷ 2.33 ≈ 102 planks.",
      ],
    },
    tips: [
      "Check whether your LVP has an attached pad; if so, most makers say not to add a separate foam underlayment.",
      "Over concrete, test for moisture and use the vapour barrier the manufacturer requires.",
      "Rigid-core (SPC/WPC) planks tolerate minor subfloor dips better than thin flexible vinyl, but most still need the floor flat to within about 3/16 in over 10 ft — check the instructions.",
      "Blend planks from several boxes as you lay them to avoid repeating patterns side by side.",
      "Leave the expansion gap specified for floating vinyl, especially in sunrooms and large open areas.",
    ],
    faqs: [
      {
        q: "How many boxes of vinyl plank do I need for 500 sq ft?",
        a: "Add 10% waste for 550 sq ft. With 24 sq ft boxes, 550 ÷ 24 = 22.9, so buy 23 boxes. Always use the coverage printed on your specific product.",
      },
      {
        q: "How much waste should I add for vinyl plank flooring?",
        a: "10% is standard for a straight installation. Use 15% for diagonal patterns, herringbone, or rooms with lots of doorways, closets and angled walls.",
      },
      {
        q: "How many square feet are in a box of LVP?",
        a: "Commonly 18–30 sq ft, depending on plank size and thickness. Thicker rigid-core planks often have fewer square feet per box than thin glue-down vinyl.",
      },
      {
        q: "Does vinyl plank flooring need underlayment?",
        a: "Many LVP products have a pad attached and need nothing else, except possibly a moisture barrier over concrete. Planks without a pad may need a thin underlayment approved by the manufacturer — never a thick foam pad, which can damage the locking joints.",
      },
      {
        q: "Can I install vinyl plank in a bathroom or kitchen?",
        a: "Yes. Most LVP is waterproof on the surface, which makes it popular for kitchens, bathrooms and laundry rooms. Seal the perimeter gap with flexible caulk in wet areas if the manufacturer recommends it.",
      },
    ],
    sources: [
      { title: "Luxury vinyl installation guidelines", publisher: "Shaw Floors" },
      { title: "Resilient flooring installation and maintenance", publisher: "Resilient Floor Covering Institute (RFCI)" },
      { title: "LVP installation instructions", publisher: "COREtec" },
    ],
    related: ["flooring-calculator", "laminate-flooring-calculator", "underlayment-calculator", "flooring-cost-calculator", "room-by-room-flooring-estimator"],
  },
  {
    slug: "carpet-calculator",
    name: "Carpet Calculator",
    category: "flooring",
    kind: "material",
    featured: true,
    seoTitle: "Carpet Calculator – Square Yards of Carpet for 12 ft Rolls",
    description:
      "Carpet calculator that accounts for 12 ft roll widths: see the square yards to buy, length to cut, seams and offcut waste for any room. Feet or metres.",
    intro:
      "Carpet is cut from rolls that are usually 12 ft wide, so you pay for the full roll width even if your room is narrower or slightly wider. This calculator lays strips across your room the way an installer would, picks the direction that uses the least carpet (or the one you choose), and tells you the square yards to buy, the number of seams and how much ends up as offcuts.",
    keywords: [
      "carpet calculator",
      "how much carpet do i need",
      "carpet square yard calculator",
      "carpet roll width calculator",
      "carpet estimator",
      "carpet yardage calculator",
    ],
    howToUse: [
      "Measure the room's length and width at the widest points, including the area into doorways.",
      "Enter the roll width — 12 ft is standard in the US; check for 13 ft 6 in or 15 ft options.",
      "Leave strip direction on Auto to minimise carpet, or choose a direction to keep seams out of traffic paths.",
      "Keep the trim allowance at about 6 in per strip, add waste only for patterned carpet, and read the square yards to buy.",
    ],
    formula: {
      lines: [
        "Strips along length = ⌈room width ÷ roll width⌉; cut length = strips × (room length + trim)",
        "Strips along width = ⌈room length ÷ roll width⌉; cut length = strips × (room width + trim)",
        "Carpet to buy (sq ft) = cut length × roll width × (1 + waste %)",
        "Square yards = sq ft ÷ 9",
        "Seams = strips − 1",
      ],
      notes: [
        "Auto picks whichever direction needs fewer linear feet of roll; on a tie, the one with fewer seams.",
        "All strips must have the pile running the same way, so offcuts can only be reused where they fit that direction — closets are a common place.",
        "Carpet pad is sold to cover the room area itself; it does not have roll-width waste in the same way.",
      ],
    },
    example: {
      scenario: "A 20 × 14 ft living room carpeted from a 12 ft roll with a 6 in trim allowance per strip and no pattern match.",
      inputs: { length: 20, width: 14, rollWidth: 12, direction: 0, trim: 6, waste: 0 },
      expected: { linearFeet: 29, carpetSqFt: 348, carpetSqYd: 38.667, seams: 1, roomArea: 280 },
      steps: [
        "Strips along the 20 ft length: 14 ÷ 12 = 1.17 → 2 strips × (20 + 0.5) = 41 ft of roll (492 sq ft).",
        "Strips along the 14 ft width: 20 ÷ 12 = 1.67 → 2 strips × (14 + 0.5) = 29 ft of roll (348 sq ft).",
        "Auto chooses the second layout: 29 ft × 12 ft = 348 sq ft = 38.67 sq yd, with one seam.",
        "Room area is 20 × 14 = 280 sq ft, so about 19.5% is offcut — normal for a room that is not a multiple of 12 ft.",
      ],
    },
    tips: [
      "Ask the retailer to plan the cut: a good seaming diagram can reuse offcuts in closets and save several square yards.",
      "Keep seams away from doorways and out of the main walking path, and run them toward the main light source so they are less visible.",
      "Patterned carpet needs extra for matching — the pattern repeat is listed on the sample's spec label.",
      "Budget for pad, tack strip and transition strips in addition to the carpet itself.",
      "Measure into each doorway to the middle of the door when closed, where the carpet meets the next floor.",
    ],
    faqs: [
      {
        q: "How much carpet do I need for a 12 × 12 room?",
        a: "A 12 × 12 room fits a 12 ft roll with no seam. With 6 in trim you cut 12.5 ft of roll: 12.5 × 12 = 150 sq ft, or about 16.7 sq yd, for a room of 144 sq ft (16 sq yd).",
      },
      {
        q: "Why do I have to buy more carpet than my room's square footage?",
        a: "Carpet comes on rolls of a fixed width, usually 12 ft. A 14 ft wide room needs two 12 ft strips, so 10 ft of width is left over. You also need a few inches at each wall for trimming.",
      },
      {
        q: "How do I convert square feet to square yards of carpet?",
        a: "Divide square feet by 9. For example, 348 sq ft ÷ 9 = 38.7 sq yd. Many stores price carpet per square foot now, but installers often still quote per square yard.",
      },
      {
        q: "How wide is a roll of carpet?",
        a: "In the US, most residential broadloom carpet is 12 ft wide. Some styles are also made 13 ft 6 in or 15 ft wide, which can eliminate seams in wider rooms.",
      },
      {
        q: "How much carpet pad do I need?",
        a: "Pad is needed for the room area only — 280 sq ft for a 20 × 14 room, plus a little for trimming. Pad pieces are butted and taped, so roll-width offcuts are not an issue in the same way.",
      },
      {
        q: "Should carpet seams run lengthwise or across the room?",
        a: "Ideally seams run toward the main window and away from heavy traffic. Use the strip direction setting to compare both options; the cheaper layout is not always the best-looking one.",
      },
    ],
    sources: [
      { title: "CRI 105 Standard for Installation of Residential Carpet", publisher: "Carpet and Rug Institute (CRI)" },
      { title: "Carpet buying guide and measuring tips", publisher: "Shaw Floors" },
      { title: "How to measure for carpet", publisher: "Lowe's" },
    ],
    related: ["stair-carpet-calculator", "flooring-calculator", "square-feet-to-square-yards-calculator", "flooring-cost-calculator", "room-by-room-flooring-estimator"],
  },
  {
    slug: "baseboard-trim-calculator",
    name: "Baseboard and Trim Calculator",
    category: "flooring",
    kind: "material",
    featured: true,
    seoTitle: "Baseboard Calculator – Linear Feet and Pieces of Trim",
    description:
      "Calculate how much baseboard you need: linear feet, number of 8, 12 or 16 ft pieces and material cost, with doorways subtracted and waste added for corners.",
    intro:
      "Find out how much baseboard or floor trim to buy for a room. Enter the room size, the number of doorways, the length of the boards you plan to buy and a price per foot. The calculator subtracts the door openings, adds waste for mitered corners, and tells you how many pieces to buy and roughly what they will cost.",
    keywords: [
      "baseboard calculator",
      "how much baseboard do i need",
      "baseboard trim calculator",
      "linear feet of baseboard",
      "trim calculator",
    ],
    howToUse: [
      "Measure the room's length and width (or add up each wall if the room is irregular).",
      "Enter the number of doorways and their average width including casing.",
      "Choose the board length you will buy — 8, 12 or 16 ft — and the price per linear foot.",
      "Set the waste allowance (10% is typical) and read the number of pieces and cost.",
    ],
    formula: {
      lines: [
        "Perimeter = 2 × (length + width)",
        "Wall length to trim = perimeter − doorways × doorway width",
        "Baseboard needed = wall length × (1 + waste %)",
        "Pieces = baseboard needed ÷ piece length, rounded up",
        "Cost = pieces × piece length × price per foot",
      ],
      notes: [
        "Longer boards mean fewer joints. Where a wall is longer than one board, join pieces with a scarf (angled) joint over a stud.",
      ],
    },
    example: {
      scenario: "A 14 × 12 ft bedroom with one 3 ft doorway, trimmed with 16 ft primed MDF baseboard at $1.50 per foot and 10% waste.",
      inputs: { length: 14, width: 12, doors: 1, doorWidth: 3, pieceLength: 16, price: 1.5, waste: 10 },
      expected: { perimeter: 52, netLength: 49, linearFeet: 53.9, pieces: 4, cost: 96 },
      steps: [
        "Perimeter = 2 × (14 + 12) = 52 ft.",
        "Subtract the doorway: 52 − 3 = 49 ft to trim.",
        "Add 10% waste: 49 × 1.10 = 53.9 ft.",
        "Pieces = 53.9 ÷ 16 = 3.4, rounded up to 4 pieces (64 ft).",
        "Cost = 64 ft × $1.50 = $96.",
      ],
    },
    tips: [
      "Plan the cuts wall by wall: a 14 ft wall needs a 16 ft board, and the 2 ft offcut is only useful for short returns.",
      "Cope inside corners rather than mitering them — coped joints stay tight when walls move.",
      "Buy finger-jointed or MDF baseboard for painted trim and solid wood for stained trim.",
      "Prime and paint baseboard before installing; you only need to fill nail holes and touch up afterwards.",
      "Add matching quarter round or shoe moulding if you are installing a floating floor that needs an expansion gap.",
    ],
    faqs: [
      {
        q: "How much baseboard do I need for a 12 × 12 room?",
        a: "A 12 × 12 room has a 48 ft perimeter. Subtract a 3 ft door for 45 ft, add 10% for about 49.5 ft. That is 4 pieces of 16 ft or 7 pieces of 8 ft baseboard.",
      },
      {
        q: "Do you subtract doorways when measuring for baseboard?",
        a: "Yes. Baseboard stops at the door casing, so subtract the width of each opening including the casing — about 3 ft for a standard interior door.",
      },
      {
        q: "How much extra baseboard should I buy?",
        a: "Add about 10% for miter and coped corners and offcuts. Rooms with many short walls, bay windows or outside corners may need 15%.",
      },
      {
        q: "What lengths does baseboard come in?",
        a: "Most home centres sell baseboard in 8, 12 and 16 ft lengths. Longer pieces cost more to transport but cut the number of visible joints.",
      },
      {
        q: "How much does baseboard cost per foot?",
        a: "Typical retail prices are roughly $1–$2 per foot for primed MDF or finger-jointed pine and more for solid hardwood or tall profiles. Prices vary by region and store, so enter your local price.",
      },
    ],
    sources: [
      { title: "How to install baseboard", publisher: "The Home Depot" },
      { title: "Interior trim and moulding guide", publisher: "Metrie" },
      { title: "Moulding profiles and installation", publisher: "Woodgrain" },
    ],
    related: ["quarter-round-calculator", "perimeter-calculator", "linear-feet-calculator", "flooring-calculator", "laminate-flooring-calculator"],
  },
  {
    slug: "hardwood-flooring-calculator",
    name: "Hardwood Flooring Calculator",
    category: "flooring",
    kind: "material",
    featured: false,
    seoTitle: "Hardwood Flooring Calculator – Boxes, Square Feet and Cost",
    description:
      "Estimate hardwood flooring for any room: square footage, boxes to buy and material cost, with a waste allowance for straight, diagonal or herringbone layouts.",
    intro:
      "Hardwood is one of the more expensive floors you can buy, so ordering the right amount matters. Enter the room size, the coverage per carton and your price per square foot, choose a waste factor for your layout, and the calculator shows how many boxes to order and what the wood itself will cost.",
    keywords: [
      "hardwood flooring calculator",
      "how much hardwood flooring do i need",
      "wood floor calculator",
      "hardwood flooring cost calculator",
      "engineered hardwood calculator",
    ],
    howToUse: [
      "Measure the room's length and width wall to wall.",
      "Enter the square feet per carton from the box or spec sheet.",
      "Enter the material price per square foot to estimate cost.",
      "Pick a waste factor: 7–10% straight lay, 15% or more for diagonal or herringbone.",
    ],
    formula: {
      lines: [
        "Floor area = length × width",
        "Hardwood needed = floor area × (1 + waste %)",
        "Boxes = hardwood needed ÷ coverage per box, rounded up",
        "Material cost = boxes × coverage per box × price per sq ft",
      ],
      notes: [
        "Cost uses the full boxes you buy, because you pay for whole cartons.",
        "Lower grades (cabin or character grade) contain more short and defective boards, so add extra waste.",
      ],
    },
    example: {
      scenario: "An 18 × 15 ft dining room in oak flooring that comes 20 sq ft to a box at $6 per sq ft, with 10% waste.",
      inputs: { length: 18, width: 15, boxCoverage: 20, price: 6, waste: 10 },
      expected: { area: 270, areaWithWaste: 297, boxes: 15, purchased: 300, cost: 1800 },
      steps: [
        "Floor area = 18 × 15 = 270 sq ft.",
        "With 10% waste: 270 × 1.10 = 297 sq ft.",
        "Boxes = 297 ÷ 20 = 14.85, rounded up to 15 boxes (300 sq ft).",
        "Material cost = 300 × $6 = $1,800.",
      ],
    },
    tips: [
      "Acclimate hardwood in the room where it will be installed and check moisture content with a meter — the NWFA recommends comparing wood and subfloor moisture before installing.",
      "Rack (dry-lay) boards from several boxes before nailing so colour and lengths are mixed.",
      "Run boards perpendicular to the floor joists where possible for a stiffer floor.",
      "Leave the expansion space the manufacturer specifies at walls and vertical obstructions.",
      "Save a few spare boards for future repairs — stain colours and milling change between batches.",
    ],
    faqs: [
      {
        q: "How much extra hardwood flooring should I order?",
        a: "Most installers order 7–10% extra for a straight installation in a simple room. Diagonal layouts typically need about 15%, and herringbone or chevron patterns can need 15–20% depending on the room.",
      },
      {
        q: "How many square feet are in a box of hardwood flooring?",
        a: "Solid hardwood cartons commonly hold about 18–25 sq ft; engineered hardwood boxes vary more. Use the figure printed on the carton or spec sheet.",
      },
      {
        q: "How much does hardwood flooring cost per square foot?",
        a: "Material alone typically runs about $4–$12 per sq ft depending on species, grade and width, with exotic and wide-plank boards costing more. Installation is extra; use the flooring cost calculator for a full estimate.",
      },
      {
        q: "Solid or engineered hardwood — does the amount differ?",
        a: "No. You calculate the area and waste the same way. Engineered hardwood can be installed over concrete and in basements where solid wood usually should not be.",
      },
      {
        q: "How long should hardwood acclimate before installation?",
        a: "It depends on the product and conditions. Some manufacturers specify a number of days; the NWFA approach is to acclimate until the wood's moisture content is within the range the manufacturer specifies for the subfloor and site.",
      },
    ],
    sources: [
      { title: "NWFA Installation Guidelines", publisher: "National Wood Flooring Association (NWFA)" },
      { title: "Hardwood flooring installation instructions", publisher: "Bruce (AHF Products)" },
      { title: "Wood Handbook: Wood as an Engineering Material", publisher: "USDA Forest Products Laboratory" },
    ],
    related: ["flooring-calculator", "flooring-cost-calculator", "underlayment-calculator", "baseboard-trim-calculator", "board-foot-calculator"],
  },
  {
    slug: "stair-carpet-calculator",
    name: "Stair Carpet Calculator",
    category: "flooring",
    kind: "material",
    featured: false,
    seoTitle: "Stair Carpet Calculator – How Much Carpet for Stairs?",
    description:
      "Work out how much carpet you need for stairs. Enter steps, tread, riser and width to get square yards from a 12 ft roll, cut length and pad for the treads.",
    intro:
      "Carpeting a staircase uses more carpet than the step count suggests, because each piece wraps the tread, the nose and the riser and is cut from a 12 ft wide roll. Enter the number of steps and their size, and the calculator works out how many step pieces fit across the roll, how much roll length to buy, and the pad needed for the treads.",
    keywords: [
      "stair carpet calculator",
      "how much carpet for stairs",
      "carpet for 13 stairs",
      "staircase carpet calculator",
      "stair runner calculator",
    ],
    howToUse: [
      "Count the steps (treads). A typical 8 ft floor-to-floor staircase has 12–14.",
      "Measure one tread's depth front to back and one riser's height, in inches.",
      "Measure the stair width to be carpeted, including any wrap on an open side.",
      "Check the nosing wrap allowance and roll width, then read the square yards to buy.",
    ],
    formula: {
      lines: [
        "Carpet per step = tread depth + riser height + nosing wrap",
        "Pieces across the roll = ⌊roll width (in) ÷ stair width⌋",
        "Rows = ⌈steps ÷ pieces across the roll⌉",
        "Roll length = rows × carpet per step ÷ 12 (ft)",
        "Carpet to buy = roll length × roll width × (1 + waste %); sq yd = sq ft ÷ 9",
      ],
      notes: [
        "This assumes box (straight) steps cut as individual pieces with the pile running down the stairs. Winders, pie-shaped and bullnose steps need extra — measure them separately.",
        "Landings are measured as a small room; use the carpet calculator and add the result.",
      ],
    },
    example: {
      scenario: "13 straight steps, each 36 in wide with 10 in treads and 7.5 in risers, a 2 in nosing wrap and a 12 ft roll, with 10% waste.",
      inputs: { steps: 13, tread: 10, riser: 7.5, stairWidth: 36, wrap: 2, rollWidth: 12, waste: 10 },
      expected: { pieceLength: 19.5, piecesPerRow: 4, rollLength: 6.5, carpetSqFt: 85.8, carpetSqYd: 9.533 },
      steps: [
        "Carpet per step = 10 + 7.5 + 2 = 19.5 in.",
        "A 12 ft roll is 144 in wide, so 144 ÷ 36 = 4 step pieces fit side by side.",
        "Rows = 13 ÷ 4 = 3.25 → 4 rows, and 4 × 19.5 in = 78 in = 6.5 ft of roll.",
        "Carpet = 6.5 × 12 = 78 sq ft, plus 10% = 85.8 sq ft, or about 9.5 sq yd.",
      ],
    },
    tips: [
      "Run the pile down the stairs so it wears evenly and looks consistent from the bottom.",
      "Choose a dense, low-pile carpet for stairs — it wraps the nose better and wears longer than plush.",
      "Stair pad usually covers the tread and wraps over the nose but not the riser.",
      "Many retailers have a minimum cut length; buying stairs and a landing or hallway together can use the roll more efficiently.",
      "For a runner instead of wall-to-wall, enter the runner width as the stair width.",
    ],
    faqs: [
      {
        q: "How much carpet do I need for 13 stairs?",
        a: "For 36 in wide box stairs with 10 in treads and 7.5 in risers, each step needs about 19.5 in of carpet. Four pieces fit across a 12 ft roll, so 4 rows use 6.5 ft of roll: about 78 sq ft, or roughly 9.5 sq yd with 10% extra.",
      },
      {
        q: "How do you measure stairs for carpet?",
        a: "Measure the tread depth and riser height in inches, add 1–2 in to wrap the nose, and multiply by the carpeted width. Measure every step if they are not uniform, and measure winders and landings separately.",
      },
      {
        q: "How many square yards of carpet for a flight of stairs?",
        a: "A straight flight of 12–14 standard 3 ft wide steps typically needs about 7–10 sq yd when cut from a 12 ft roll. Wider stairs, open sides or winders need more.",
      },
      {
        q: "Does stair carpet need padding?",
        a: "Yes. Pad makes stairs more comfortable and protects the carpet backing. It is cut to cover each tread and wrap over the nose; it is not usually applied to the riser.",
      },
      {
        q: "Is a stair runner cheaper than wall-to-wall stair carpet?",
        a: "A narrower runner uses less carpet and often fits more pieces across a roll, but runners usually need finished edges (binding) and stair rods or careful installation, which can add cost.",
      },
    ],
    sources: [
      { title: "CRI 105 Standard for Installation of Residential Carpet", publisher: "Carpet and Rug Institute (CRI)" },
      { title: "How to measure stairs for carpet", publisher: "Lowe's" },
      { title: "Stair carpet installation guide", publisher: "The Home Depot" },
    ],
    related: ["carpet-calculator", "stair-rise-run-calculator", "flooring-installation-cost-calculator", "square-feet-to-square-yards-calculator"],
  },
  {
    slug: "underlayment-calculator",
    name: "Underlayment Calculator",
    category: "flooring",
    kind: "material",
    featured: false,
    seoTitle: "Underlayment Calculator – Rolls of Flooring Underlayment",
    description:
      "Find how many rolls of underlayment you need for laminate, vinyl or engineered wood, plus the seam tape length. Enter room size and roll coverage.",
    intro:
      "Floating floors such as laminate, engineered wood and some vinyl planks sit on an underlayment that cushions, quiets and protects the floor. Enter your room size, the coverage and width of the roll you are buying, and the calculator returns the rolls needed and the linear feet of tape to seal the seams.",
    keywords: [
      "underlayment calculator",
      "how much underlayment do i need",
      "laminate underlayment rolls",
      "flooring underlayment calculator",
      "foam underlayment calculator",
    ],
    howToUse: [
      "Measure the room's length and width.",
      "Enter the square feet per roll printed on the package (100 sq ft is common).",
      "Enter the roll width so the calculator can count runs and seams.",
      "Keep a small waste allowance for trimming and read the number of rolls.",
    ],
    formula: {
      lines: [
        "Floor area = length × width",
        "Underlayment needed = floor area × (1 + waste %)",
        "Rolls = underlayment needed ÷ roll coverage, rounded up",
        "Runs = ⌈room width ÷ roll width⌉ (laid along the room length)",
        "Seam tape = (runs − 1) × room length",
      ],
      notes: [
        "Most foam underlayments are butted edge to edge and taped. Products with a built-in overlap strip already account for it in their stated coverage.",
      ],
    },
    example: {
      scenario: "A 16 × 12 ft room with 100 sq ft rolls about 3 ft 4 in wide, laid along the 16 ft length with 5% waste.",
      inputs: { length: 16, width: 12, rollCoverage: 100, rollWidth: 3.33, waste: 5 },
      expected: { area: 192, areaWithWaste: 201.6, rolls: 3, runs: 4, tape: 48 },
      steps: [
        "Floor area = 16 × 12 = 192 sq ft; with 5% waste = 201.6 sq ft.",
        "Rolls = 201.6 ÷ 100 = 2.02, rounded up to 3 rolls.",
        "Runs = 12 ÷ 3.33 = 3.6, so 4 runs across the room.",
        "Seam tape = 3 seams × 16 ft = 48 ft.",
      ],
    },
    tips: [
      "Over concrete, use an underlayment with an integrated vapour barrier, or lay 6-mil polyethylene first with overlapped, taped seams.",
      "Lay underlayment one or two runs at a time as you install the floor so it does not get torn or shifted.",
      "Do not double up underlayment under flooring that already has an attached pad.",
      "Check the flooring warranty — some manufacturers require their own underlayment or a minimum sound or moisture rating.",
    ],
    faqs: [
      {
        q: "How much underlayment do I need for 500 sq ft?",
        a: "Add about 5% for trimming, giving 525 sq ft. With 100 sq ft rolls you need 6 rolls; with 200 sq ft rolls you need 3.",
      },
      {
        q: "Do you overlap underlayment seams?",
        a: "Usually not. Standard foam underlayment is butted edge to edge and taped. Some products have a film flap that overlaps the next run — follow the instructions on the roll.",
      },
      {
        q: "Do I need underlayment for vinyl plank flooring?",
        a: "Often not. Many vinyl planks have a pad attached, and thick foam can damage the locking joints. Use only an underlayment the vinyl manufacturer approves.",
      },
      {
        q: "Which way should underlayment run?",
        a: "Many installers run underlayment in the same direction as the flooring planks, but follow the product instructions — some recommend running it perpendicular so seams in the pad and the planks do not line up.",
      },
      {
        q: "Is a vapour barrier the same as underlayment?",
        a: "Not always. A vapour barrier stops moisture rising from concrete; underlayment cushions and reduces noise. Combination products do both. Over wood subfloors, a vapour barrier may not be required or recommended — check the flooring instructions.",
      },
    ],
    sources: [
      { title: "Laminate flooring underlayment guidance", publisher: "North American Laminate Flooring Association (NALFA)" },
      { title: "Underlayment installation instructions", publisher: "MP Global Products (Floor Muffler)" },
      { title: "Choosing flooring underlayment", publisher: "The Home Depot" },
    ],
    related: ["laminate-flooring-calculator", "vinyl-plank-flooring-calculator", "hardwood-flooring-calculator", "flooring-calculator"],
  },
  {
    slug: "quarter-round-calculator",
    name: "Quarter Round Calculator",
    category: "flooring",
    kind: "material",
    featured: false,
    seoTitle: "Quarter Round Calculator – Linear Feet, Pieces and Nails",
    description:
      "Calculate how much quarter round or shoe moulding you need: linear feet, 8 ft pieces and brad nails, with doorways and cabinet runs subtracted.",
    intro:
      "Quarter round (or shoe moulding) covers the expansion gap between a floating floor and the baseboard. Enter the room size, doorways and any runs along cabinets or tubs that will not get trim, and the calculator tells you how many pieces to buy and roughly how many brad nails you will use.",
    keywords: [
      "quarter round calculator",
      "how much quarter round do i need",
      "shoe moulding calculator",
      "quarter round linear feet",
      "floor trim calculator",
    ],
    howToUse: [
      "Measure the room's length and width.",
      "Enter the number of doorways and their width, plus any lengths along cabinets or tubs to skip.",
      "Choose the piece length you will buy — usually 8 ft.",
      "Set the nail spacing and waste, then read the pieces and nails.",
    ],
    formula: {
      lines: [
        "Perimeter = 2 × (length + width)",
        "Length to cover = perimeter − doorways × doorway width − other runs skipped",
        "Quarter round needed = length to cover × (1 + waste %)",
        "Pieces = quarter round needed ÷ piece length, rounded up",
        "Nails ≈ length to cover (in) ÷ nail spacing, rounded up",
      ],
    },
    example: {
      scenario: "A 12 × 10 ft room with one 3 ft doorway, using 8 ft quarter round nailed every 12 in, with 10% waste.",
      inputs: { length: 12, width: 10, doors: 1, doorWidth: 3, exclude: 0, pieceLength: 8, nailSpacing: 12, waste: 10 },
      expected: { perimeter: 44, netLength: 41, linearFeet: 45.1, pieces: 6, nails: 41 },
      steps: [
        "Perimeter = 2 × (12 + 10) = 44 ft.",
        "Subtract the doorway: 44 − 3 = 41 ft.",
        "Add 10%: 41 × 1.10 = 45.1 ft.",
        "Pieces = 45.1 ÷ 8 = 5.6, so buy 6 pieces.",
        "Nails = 41 × 12 in ÷ 12 in = 41 brads.",
      ],
    },
    tips: [
      "Nail quarter round into the baseboard, not the floor — a floating floor must be free to move.",
      "Use 18-gauge brads long enough to pass through the moulding into the baseboard, commonly 1¼–1½ in.",
      "Miter outside corners and cope or miter inside corners; finish open ends with a small return cut.",
      "Paint or stain quarter round before installing, then fill nail holes and touch up.",
      "If you are replacing baseboard anyway, a thicker baseboard can cover the gap without quarter round.",
    ],
    faqs: [
      {
        q: "How much quarter round do I need for a 10 × 12 room?",
        a: "The perimeter is 44 ft. Subtract a 3 ft doorway for 41 ft, add 10% for about 45 ft — 6 pieces of 8 ft quarter round.",
      },
      {
        q: "What is the difference between quarter round and shoe moulding?",
        a: "Quarter round is a true quarter circle in profile; shoe moulding is taller than it is deep, so it is slimmer and less noticeable. Both cover the gap along the floor and are calculated the same way.",
      },
      {
        q: "Do you nail quarter round to the floor or the baseboard?",
        a: "To the baseboard. Nailing into a floating floor pins it in place and can cause buckling or gaps as it expands and contracts.",
      },
      {
        q: "How far apart should quarter round nails be?",
        a: "Every 12–16 in is a common spacing, plus a nail near each end of each piece. Tighter spacing helps on wavy walls.",
      },
      {
        q: "Do I need quarter round with laminate flooring?",
        a: "Only if you leave the baseboard in place. Laminate needs an expansion gap at the walls; quarter round or shoe moulding covers it. If you remove and reinstall the baseboard on top of the new floor, it can cover the gap instead.",
      },
    ],
    sources: [
      { title: "Laminate installation guide — perimeter trim", publisher: "Pergo" },
      { title: "How to install quarter round and shoe moulding", publisher: "The Home Depot" },
      { title: "Moulding profiles and installation", publisher: "Woodgrain" },
    ],
    related: ["baseboard-trim-calculator", "laminate-flooring-calculator", "vinyl-plank-flooring-calculator", "linear-feet-calculator"],
  },
  {
    slug: "floor-leveling-compound-calculator",
    name: "Floor Leveling Compound Calculator",
    category: "flooring",
    kind: "material",
    featured: false,
    seoTitle: "Self-Leveling Compound Calculator – How Many Bags?",
    description:
      "Calculate how many bags of self-leveling floor compound you need from the area and average depth. Uses bag yield in cubic feet and shows the total weight.",
    intro:
      "Self-leveling underlayment fills dips and low spots so new flooring lies flat. Because coverage drops quickly as the pour gets thicker, the key numbers are the area and the average depth. Enter both, plus the yield printed on your bag, and the calculator tells you how many bags to buy and how much they weigh.",
    keywords: [
      "self leveling compound calculator",
      "floor leveling compound calculator",
      "how many bags of self leveler do i need",
      "self leveling underlayment coverage",
      "floor leveler calculator",
    ],
    howToUse: [
      "Measure the length and width of the area that needs leveling (the whole floor or just the low section).",
      "Estimate the average depth with a long straightedge or laser — not the deepest point.",
      "Enter the yield per bag from the product label (about 0.45–0.5 cu ft for many 50 lb bags).",
      "Add waste and read the number of bags.",
    ],
    formula: {
      lines: [
        "Area = length × width",
        "Volume (cu ft) = area × average depth (in) ÷ 12",
        "Bags = volume × (1 + waste %) ÷ yield per bag, rounded up",
      ],
      notes: [
        "A yield of 0.5 cu ft covers about 48 sq ft at ⅛ in or 24 sq ft at ¼ in — which is why many bags state roughly 50 sq ft at ⅛ in.",
        "Most products require a primer first and have a minimum and maximum pour depth; check the data sheet.",
      ],
    },
    example: {
      scenario: "A 12 × 10 ft area with an average depth of ¼ in, using 50 lb bags that yield 0.5 cu ft, with 10% extra.",
      inputs: { length: 12, width: 10, depth: 0.25, bagYield: 0.5, bagWeight: 50, waste: 10 },
      expected: { area: 120, netVolume: 2.5, volume: 2.75, bags: 6, weight: 300 },
      steps: [
        "Area = 12 × 10 = 120 sq ft.",
        "Volume = 120 × 0.25 ÷ 12 = 2.5 cu ft.",
        "With 10% extra: 2.5 × 1.10 = 2.75 cu ft.",
        "Bags = 2.75 ÷ 0.5 = 5.5, rounded up to 6 bags (300 lb).",
      ],
    },
    tips: [
      "Prime the subfloor with the manufacturer's primer — it stops the compound losing water into the substrate and helps it bond.",
      "Seal gaps, holes and the perimeter so liquid compound does not run into the room below or under walls.",
      "Mix full bags with the exact water amount on the label; extra water weakens the surface.",
      "Have everything mixed and poured within the product's working time — often 10–20 minutes — so a helper is invaluable.",
      "Over wood subfloors, many products require metal lath and a minimum thickness; read the instructions before buying.",
    ],
    faqs: [
      {
        q: "How much does a 50 lb bag of self-leveler cover?",
        a: "Many 50 lb bags yield about 0.45–0.5 cu ft, which covers roughly 50 sq ft at ⅛ in, 25 sq ft at ¼ in or 12 sq ft at ½ in. Check your product's data sheet for its exact yield.",
      },
      {
        q: "How many bags of self-leveling compound do I need for 100 sq ft?",
        a: "At ⅛ in average depth, 100 sq ft needs about 1.04 cu ft — 3 bags at 0.5 cu ft each once you add 10%. At ¼ in it needs about 2.1 cu ft, or 5 bags.",
      },
      {
        q: "How do I measure the average depth?",
        a: "Lay a long straightedge or use a laser level and measure the gap at many points across the area. Average those readings. Using the deepest point alone will overestimate the bags considerably.",
      },
      {
        q: "How thick can self-leveling compound be poured?",
        a: "It depends on the product. Many standard levelers can be poured from a featheredge up to about 1 in or more in one lift, and some go deeper with aggregate added. Always follow the manufacturer's limits.",
      },
      {
        q: "Do I need to prime before self-leveling compound?",
        a: "Almost always. Primer seals porous concrete or wood so the compound does not dry too fast or form pinholes, and it improves the bond. Use the primer the manufacturer specifies.",
      },
    ],
    sources: [
      { title: "LevelQuik RS technical data sheet", publisher: "Custom Building Products" },
      { title: "Self-leveling underlayment data sheets", publisher: "W.W. Henry Company" },
      { title: "Self-leveling underlayment installation", publisher: "Ardex" },
    ],
    related: ["flooring-calculator", "concrete-bags-calculator", "cubic-feet-calculator", "vinyl-plank-flooring-calculator", "tile-calculator"],
  },
  {
    slug: "flooring-cost-calculator",
    name: "Flooring Cost Calculator",
    category: "flooring",
    kind: "cost",
    featured: false,
    seoTitle: "Flooring Cost Calculator – Material and Installation Estimate",
    description:
      "Estimate the full cost of new flooring: material with waste, underlayment, installation labor, old floor removal and trim. Edit every price for your area.",
    intro:
      "Get a realistic budget for a new floor, not just the price on the box. Enter the room size and your prices per square foot for flooring, underlayment, installation and removal, plus a lump sum for trim and transitions. The calculator adds waste to the materials and returns a total and an all-in cost per square foot you can compare with contractor quotes.",
    keywords: [
      "flooring cost calculator",
      "cost to install flooring",
      "new floor cost estimate",
      "flooring price per square foot",
      "laminate flooring cost",
      "hardwood floor cost calculator",
    ],
    howToUse: [
      "Enter the room's length and width.",
      "Enter the material price per square foot of the flooring you like.",
      "Enter underlayment, labor and removal prices — set any to 0 if they do not apply (for example DIY).",
      "Add a lump sum for trim, transitions and supplies, adjust waste and read the total.",
    ],
    formula: {
      lines: [
        "Floor area = length × width",
        "Material = floor area × (1 + waste %) × material price",
        "Underlayment = floor area × (1 + waste %) × underlayment price",
        "Labor = floor area × labor price; Removal = floor area × removal price",
        "Total = material + underlayment + labor + removal + extras",
      ],
      notes: ["Waste applies only to materials; installers charge on the actual floor area."],
    },
    example: {
      scenario: "A 12 × 15 ft room with $4/sq ft flooring, $0.50 underlayment, $3 installation, $1 tear-out, $150 for trim and supplies, and 10% waste.",
      inputs: { length: 12, width: 15, materialPrice: 4, underlaymentPrice: 0.5, laborPrice: 3, removalPrice: 1, extras: 150, waste: 10 },
      expected: { area: 180, material: 792, underlayment: 99, labor: 540, removal: 180, total: 1761, perSqFt: 9.783 },
      steps: [
        "Floor area = 12 × 15 = 180 sq ft; with 10% waste = 198 sq ft of material.",
        "Material = 198 × $4 = $792; underlayment = 198 × $0.50 = $99.",
        "Labor = 180 × $3 = $540; removal = 180 × $1 = $180.",
        "Total = $792 + $99 + $540 + $180 + $150 = $1,761, or about $9.78 per sq ft of floor.",
      ],
    },
    tips: [
      "Get at least three written quotes and check whether each includes removal, disposal, furniture moving, subfloor prep and trim.",
      "Subfloor repairs are the most common surprise cost — ask how the installer prices them before work starts.",
      "Material prices swing widely within each flooring type; mid-range products often give the best value per year of life.",
      "Installing flooring yourself saves the labor line, but rent or buy the right tools before comparing costs.",
      "Large open areas usually cost less per square foot to install than many small rooms, closets and stairs.",
    ],
    faqs: [
      {
        q: "How much does it cost to install flooring in a 12 × 12 room?",
        a: "A 12 × 12 room is 144 sq ft. With mid-range prices of $4/sq ft material, $3/sq ft labor and some extras, expect very roughly $1,200–$1,600. Budget laminate can come in under $1,000 and hardwood can exceed $2,500.",
      },
      {
        q: "What is the cheapest type of flooring to install?",
        a: "Sheet vinyl, budget carpet and entry-level laminate usually have the lowest installed cost per square foot. Click-together laminate and vinyl plank are also popular DIY floors, which removes labor cost entirely.",
      },
      {
        q: "How much does flooring cost per square foot installed?",
        a: "As a typical US range, installed prices run roughly $3–$10 per sq ft for carpet, laminate and vinyl plank and roughly $8–$20 or more for hardwood. Prices vary by region, product and job complexity.",
      },
      {
        q: "Does the flooring cost include removing the old floor?",
        a: "Not always. Tear-out and disposal is often a separate line item, commonly around $1–$3 per sq ft, and more for glued-down floors or tile. Check every quote for it.",
      },
      {
        q: "Why is waste added to the material cost but not the labor?",
        a: "You must buy extra material to cover cuts and offcuts, but installers charge for the floor area they cover. Adding waste to labor would overstate the estimate.",
      },
    ],
    sources: [
      { title: "Flooring installation services pricing", publisher: "The Home Depot" },
      { title: "Flooring installation services", publisher: "Lowe's" },
      { title: "Flooring buying guide", publisher: "Consumer Reports" },
    ],
    related: ["flooring-installation-cost-calculator", "flooring-calculator", "room-by-room-flooring-estimator", "renovation-budget-calculator", "contractor-markup-calculator"],
    cost: {
      priceRange: "About $3–$20+ per sq ft installed, depending on material (US, 2026). Prices vary by region.",
      assumptions: [
        "Default prices are mid-range US examples: $4/sq ft material, $0.50 underlayment, $3 labor, $1 removal.",
        "Waste is applied to flooring and underlayment only.",
        "Subfloor repair, moving appliances, stairs and sales tax are not included unless you add them to extras.",
        "Labor prices assume a standard rectangular room with a sound, level subfloor.",
      ],
      updated: UPDATED,
    },
  },
  {
    slug: "flooring-installation-cost-calculator",
    name: "Flooring Installation Cost Calculator",
    category: "flooring",
    kind: "cost",
    featured: false,
    seoTitle: "Flooring Installation Cost Calculator – Labor Estimate",
    description:
      "Estimate flooring installation labor: per-square-foot install rate, tear-out, subfloor prep, trim work, stairs and fees. Compare contractor quotes line by line.",
    intro:
      "Already have the flooring picked out? This calculator focuses on what you will pay the installer. Enter the room size and typical rates for installation, removal of the old floor, subfloor prep and trim work, add any stairs and fees, and it builds a line-by-line labor estimate you can hold up against real quotes.",
    keywords: [
      "flooring installation cost calculator",
      "flooring labor cost per square foot",
      "cost to install laminate flooring",
      "floor installation estimate",
      "cost to install vinyl plank flooring",
    ],
    howToUse: [
      "Enter the room's length and width; the perimeter is calculated for trim work.",
      "Enter the installation rate per square foot for your flooring type.",
      "Add removal, subfloor prep and trim rates — set any that do not apply to 0.",
      "Add stairs and other fees, then compare the total and per-square-foot figure with your quotes.",
    ],
    formula: {
      lines: [
        "Floor area = length × width; Perimeter = 2 × (length + width)",
        "Labor = area × install rate; Removal = area × removal rate; Prep = area × prep rate",
        "Trim = perimeter × trim rate; Stairs = steps × price per stair",
        "Total = labor + removal + prep + trim + stairs + other fees",
      ],
      notes: ["Material is not included — use the flooring cost calculator for a complete budget."],
    },
    example: {
      scenario: "A 20 × 15 ft room: $3/sq ft installation, $1 removal, $0.50 prep, $1.50 per foot for trim, no stairs and $100 in other fees.",
      inputs: { length: 20, width: 15, laborRate: 3, removalRate: 1, prepRate: 0.5, trimRate: 1.5, stairs: 0, stairRate: 75, otherFees: 100 },
      expected: { area: 300, labor: 900, removal: 300, prep: 150, trim: 105, total: 1555, perSqFt: 5.183 },
      steps: [
        "Area = 20 × 15 = 300 sq ft; perimeter = 2 × (20 + 15) = 70 ft.",
        "Labor = 300 × $3 = $900; removal = 300 × $1 = $300; prep = 300 × $0.50 = $150.",
        "Trim = 70 × $1.50 = $105.",
        "Total = $900 + $300 + $150 + $105 + $100 = $1,555, about $5.18 per sq ft.",
      ],
    },
    tips: [
      "Ask whether the quote is per square foot of floor or per square foot of material purchased — some include waste.",
      "Many installers have a minimum job charge, which makes very small rooms expensive per square foot.",
      "Moving furniture and appliances yourself can remove a line from the bill; disconnecting gas or water appliances should be left to a pro.",
      "Herringbone, diagonal and glue-down installs take longer and are usually priced higher than a straight floating floor.",
      "Get the subfloor-repair rate in writing before work starts so surprises are priced fairly.",
    ],
    faqs: [
      {
        q: "How much does it cost to install 1,000 sq ft of flooring?",
        a: "Labor alone at $2–$5 per sq ft for laminate or vinyl plank is roughly $2,000–$5,000 for 1,000 sq ft, before removal, prep, trim and material. Hardwood installation typically costs more per square foot.",
      },
      {
        q: "What is the labor cost to install laminate flooring?",
        a: "A typical US range is about $2–$5 per sq ft for installation only, depending on region, room complexity and whether the installer also handles underlayment and trim.",
      },
      {
        q: "How much does it cost to remove old flooring?",
        a: "Commonly around $1–$3 per sq ft including disposal. Carpet is usually at the low end; glued-down vinyl, hardwood and especially ceramic tile cost more.",
      },
      {
        q: "How much do installers charge for stairs?",
        a: "Stairs are usually priced per step and vary widely — carpet stairs often cost less per step than hardwood or vinyl stair nosing, which needs more cutting and fitting. Get a specific quote.",
      },
      {
        q: "Is it cheaper to install flooring yourself?",
        a: "Yes, for click-together laminate and vinyl plank many homeowners save the full labor cost. Hardwood nailing, carpet stretching and seaming, and tile need tools and skill, so professional installation is usually worth it.",
      },
    ],
    sources: [
      { title: "Flooring installation services", publisher: "The Home Depot" },
      { title: "Flooring installation services", publisher: "Lowe's" },
      { title: "NWFA Installation Guidelines", publisher: "National Wood Flooring Association (NWFA)" },
    ],
    related: ["flooring-cost-calculator", "flooring-calculator", "baseboard-trim-calculator", "contractor-markup-calculator", "tile-installation-cost-calculator"],
    cost: {
      priceRange: "About $1–$10 per sq ft for installation labor, plus removal and prep (US, 2026). Prices vary by region.",
      assumptions: [
        "Default rates are mid-range US examples: $3/sq ft install, $1 removal, $0.50 prep, $1.50 per foot of trim.",
        "Flooring material, underlayment and sales tax are not included.",
        "Trim work is priced on the full room perimeter.",
        "Stairs, moving and minimum charges vary widely by installer; edit them to match your quotes.",
      ],
      updated: UPDATED,
    },
  },
  {
    slug: "room-by-room-flooring-estimator",
    name: "Room-by-room Flooring Estimator",
    category: "flooring",
    kind: "material",
    featured: false,
    seoTitle: "Room-by-Room Flooring Estimator – Boxes for Up to 4 Rooms",
    description:
      "Estimate flooring for up to four rooms at once. Enter each room's size to get total square footage, boxes to buy and material cost for the whole job.",
    intro:
      "Doing more than one room? Enter the length and width of up to four rooms, hallways or closets, and the estimator totals the area, adds a single waste allowance and tells you how many boxes to buy for the whole project — so everything comes from the same production lot.",
    keywords: [
      "room by room flooring calculator",
      "flooring estimator multiple rooms",
      "whole house flooring calculator",
      "flooring calculator for multiple rooms",
      "total flooring square footage",
    ],
    howToUse: [
      "Enter the length and width of each room; leave unused rooms at 0.",
      "Split L-shaped rooms into two rectangles and enter them as separate rooms.",
      "Enter the coverage per box and the price per square foot.",
      "Set the waste allowance and read the total boxes and cost.",
    ],
    formula: {
      lines: [
        "Room area = length × width (for each room)",
        "Total area = sum of all room areas",
        "Flooring needed = total area × (1 + waste %)",
        "Boxes = flooring needed ÷ coverage per box, rounded up",
        "Cost = boxes × coverage per box × price per sq ft",
      ],
      notes: [
        "Totalling the rooms before rounding usually saves a box or two compared with rounding each room up separately, because offcuts from one room can start rows in another.",
      ],
    },
    example: {
      scenario: "A 14 × 12 ft bedroom, a 12 × 10 ft office and an 8 × 5 ft hallway, using 20 sq ft boxes at $3.50 per sq ft with 10% waste.",
      inputs: { room1Length: 14, room1Width: 12, room2Length: 12, room2Width: 10, room3Length: 8, room3Width: 5, room4Length: 0, room4Width: 0, boxCoverage: 20, price: 3.5, waste: 10 },
      expected: { room1Area: 168, room2Area: 120, room3Area: 40, totalArea: 328, areaWithWaste: 360.8, boxes: 19, cost: 1330 },
      steps: [
        "Room areas: 14 × 12 = 168, 12 × 10 = 120 and 8 × 5 = 40 sq ft.",
        "Total = 168 + 120 + 40 = 328 sq ft; with 10% waste = 360.8 sq ft.",
        "Boxes = 360.8 ÷ 20 = 18.04, rounded up to 19 boxes (380 sq ft).",
        "Cost = 380 × $3.50 = $1,330.",
      ],
    },
    tips: [
      "Order everything at once so all boxes share one dye lot.",
      "Plan where flooring changes direction or meets other floors — each transition needs a threshold or reducer strip.",
      "Floating floors over large connected areas may need expansion breaks in doorways; check the maximum run length in the instructions.",
      "Use a slightly higher waste allowance when there are many small rooms or closets.",
    ],
    faqs: [
      {
        q: "How do I calculate flooring for multiple rooms?",
        a: "Multiply each room's length by its width, add the areas together, then add a waste allowance (usually 10%) to the total. Divide by the carton coverage and round up.",
      },
      {
        q: "Should I add waste to each room or to the total?",
        a: "Adding it to the total is usually accurate enough and avoids over-rounding. For very irregular rooms, you can raise the overall waste percentage instead.",
      },
      {
        q: "How do I measure a hallway or closet for flooring?",
        a: "Measure the length and width and enter it as its own room. For a closet, measure to the back wall; for a hallway, measure into each doorway to where the transition will sit.",
      },
      {
        q: "How much flooring do I need for a whole house?",
        a: "Add up the area of every room that gets the same flooring. Use the four slots here for each group of rooms, or split the house into batches. Typical whole-floor jobs still use about 10% waste.",
      },
      {
        q: "Can I use the same flooring throughout the house?",
        a: "Often yes — continuous flooring makes spaces feel larger. Check that the product is rated for wet areas like kitchens and bathrooms if you include them.",
      },
    ],
    sources: [
      { title: "How to measure a room for flooring", publisher: "The Home Depot" },
      { title: "Installation guidelines for floating floors", publisher: "Shaw Floors" },
      { title: "NWFA Installation Guidelines", publisher: "National Wood Flooring Association (NWFA)" },
    ],
    related: ["flooring-calculator", "square-footage-calculator", "l-shaped-room-area-calculator", "flooring-cost-calculator", "room-area-calculator"],
  },
];
