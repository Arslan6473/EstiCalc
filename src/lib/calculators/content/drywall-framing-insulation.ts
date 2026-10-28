import type { CalculatorContent } from "../types";

const UPDATED = "2026-10-28";

export const content: CalculatorContent[] = [
  {
    slug: "drywall-sheets-calculator",
    name: "Drywall Sheets Calculator",
    category: "drywall-framing-insulation",
    kind: "material",
    featured: true,
    seoTitle: "Drywall Calculator – How Many Sheets of Drywall Do I Need?",
    description:
      "Free drywall calculator: enter room size, doors and windows to see how many 4×8, 4×10 or 4×12 sheets to buy for walls and ceiling, with waste included.",
    intro:
      "Work out how many sheets of drywall (gypsum board) you need for a room. Enter the room's length, width and wall height, take off doors and windows, choose whether to hang the ceiling and pick a sheet size. The calculator adds a cutting allowance and rounds up to whole sheets, so you know exactly what to load on the cart.",
    keywords: [
      "drywall calculator",
      "how many sheets of drywall do i need",
      "drywall sheet calculator",
      "sheetrock calculator",
      "drywall estimator",
      "4x8 drywall sheets per room",
    ],
    howToUse: [
      "Measure the room's length and width at floor level and the wall height from floor to ceiling.",
      "Count the doors and windows. Large openings such as patio doors are better measured and taken off the area separately.",
      "Choose whether you are also covering the ceiling.",
      "Pick the sheet size you plan to buy. Longer sheets mean fewer seams to tape but are heavier to handle.",
      "Keep the 10% waste allowance (15% for rooms with lots of corners, soffits or angles) and read the number of sheets.",
    ],
    formula: {
      lines: [
        "Wall area = 2 × (length + width) × height − (doors × 20 sq ft) − (windows × 15 sq ft)",
        "Total area = wall area + ceiling area (length × width, if included)",
        "Sheets = total area ÷ sheet area × (1 + waste %), rounded up",
      ],
      notes: [
        "Sheet areas: 4 × 8 ft = 32 sq ft, 4 × 10 ft = 40 sq ft, 4 × 12 ft = 48 sq ft, 54 in × 12 ft = 54 sq ft.",
        "Many pros don't subtract small openings at all and use the offcuts elsewhere — the waste allowance covers both approaches.",
      ],
    },
    example: {
      scenario: "A 14 × 12 ft bedroom with 8 ft walls, one door and two windows, hanging walls and ceiling with 4 × 8 sheets.",
      inputs: { length: 14, width: 12, height: 8, doors: 1, windows: 2, ceiling: 1, sheet: 32, waste: 10 },
      expected: { wallArea: 366, totalArea: 534, sheets: 19, wallSheets: 12, ceilingSheets: 6 },
      steps: [
        "Gross wall area = 2 × (14 + 12) × 8 = 416 sq ft. Openings = 20 + 2 × 15 = 50 sq ft, so net wall area = 366 sq ft.",
        "Ceiling = 14 × 12 = 168 sq ft, so the total is 366 + 168 = 534 sq ft.",
        "534 ÷ 32 sq ft per sheet = 16.7 sheets.",
        "Add 10% waste: 16.7 × 1.10 = 18.4, so buy 19 sheets of 4 × 8 drywall.",
      ],
    },
    tips: [
      "Use 1/2 in board on walls and 1/2 in sag-resistant or 5/8 in board on ceilings, especially with 24 in joist spacing.",
      "Hang ceilings first, then walls, with the top wall sheet tight to the ceiling.",
      "Running sheets horizontally on walls usually gives fewer, easier-to-finish joints on 8 ft walls.",
      "Use moisture-resistant board in bathrooms and cement board behind tile in wet areas. Garages attached to a house often need 5/8 in Type X fire-rated board on the shared wall — check local code.",
      "Order a couple of extra sheets on big jobs: a return trip for one sheet costs more than the sheet.",
    ],
    faqs: [
      {
        q: "How many sheets of drywall do I need for a 12 × 12 room?",
        a: "A 12 × 12 room with 8 ft walls has 384 sq ft of wall. Take off a door and two windows (about 50 sq ft) and add the 144 sq ft ceiling and you have about 478 sq ft — 15 sheets of 4 × 8, or 17 with a 10% allowance.",
      },
      {
        q: "How many square feet is a sheet of drywall?",
        a: "A 4 × 8 sheet covers 32 sq ft, a 4 × 10 covers 40 sq ft and a 4 × 12 covers 48 sq ft. In metric, a 1.2 × 2.4 m board covers 2.88 m².",
      },
      {
        q: "Should I use 4 × 8 or 4 × 12 drywall sheets?",
        a: "4 × 12 sheets cover a 12 ft wall in one piece, so there are fewer butt joints to tape, but they weigh around 75–90 lb at 1/2 in and are hard to carry through tight halls. 4 × 8 sheets are easier for one person and fit most vehicles.",
      },
      {
        q: "How much extra drywall should I buy?",
        a: "Allow 10% for a simple rectangular room and 15% for rooms with many corners, soffits, closets or sloped ceilings. Offcuts can often be reused above doors and windows.",
      },
      {
        q: "Do I subtract windows and doors when estimating drywall?",
        a: "Subtracting them gives a tighter estimate. This calculator takes off about 20 sq ft per door and 15 sq ft per window. Some installers skip the deduction because offcuts from openings are rarely usable, which acts as extra waste allowance.",
      },
    ],
    sources: [
      { title: "Gypsum Construction Handbook", publisher: "USG Corporation" },
      { title: "GA-216: Application and Finishing of Gypsum Panel Products", publisher: "Gypsum Association" },
      { title: "International Residential Code, Section R702.3 Gypsum Board", publisher: "International Code Council" },
    ],
    related: ["joint-compound-calculator", "drywall-screws-calculator", "drywall-cost-calculator", "wall-area-calculator", "stud-count-calculator"],
  },
  {
    slug: "joint-compound-calculator",
    name: "Joint Compound Calculator",
    category: "drywall-framing-insulation",
    kind: "material",
    featured: true,
    seoTitle: "Joint Compound Calculator – How Much Drywall Mud Do I Need?",
    description:
      "Estimate how much drywall joint compound and paper tape you need: enter the board area to get gallons, buckets and tape rolls for a Level 4 finish.",
    intro:
      "Find out how much joint compound (drywall mud) and joint tape to buy. Enter the total area of drywall you are finishing and the calculator uses the manufacturer coverage rate — about 9.4 gallons per 1,000 sq ft for taping and two finish coats — to give you gallons, buckets and rolls of tape.",
    keywords: [
      "joint compound calculator",
      "how much drywall mud do i need",
      "drywall mud calculator",
      "joint compound coverage",
      "drywall tape calculator",
      "buckets of mud per sheet of drywall",
    ],
    howToUse: [
      "Enter the total drywall area you are finishing (walls plus ceiling). The drywall sheets calculator gives you this figure.",
      "Keep the default coverage of 9.4 gallons per 1,000 sq ft for a standard Level 4 finish, or raise it if you are skim-coating to Level 5.",
      "Choose the container you plan to buy — 4.5 gallon pails are the most economical.",
      "Choose your tape roll length and read the gallons, containers and rolls of tape.",
    ],
    formula: {
      lines: [
        "Compound (gal) = area × coverage per 1,000 sq ft ÷ 1,000 × (1 + waste %)",
        "Containers = compound ÷ container size, rounded up",
        "Joint tape (ft) ≈ area × 0.37 (about 370 ft per 1,000 sq ft of board)",
      ],
      notes: [
        "USG publishes approximately 9.4 gallons of ready-mixed compound per 1,000 sq ft of gypsum panels for taping and finishing.",
        "A Level 5 finish adds a thin skim coat over the entire surface and can roughly double compound use; level 3 (for heavy texture) uses a little less.",
      ],
    },
    example: {
      scenario: "Finishing 534 sq ft of drywall (a 14 × 12 room including the ceiling) with ready-mixed compound in 4.5 gallon pails and 500 ft tape rolls.",
      inputs: { area: 534, coverage: 9.4, bucket: 4.5, roll: 500, waste: 10 },
      expected: { gallons: 5.5216, containers: 2, tapeFeet: 197.58, tapeRolls: 1 },
      steps: [
        "Compound = 534 × 9.4 ÷ 1,000 = 5.02 gallons.",
        "Add 10% waste: 5.02 × 1.10 = 5.52 gallons.",
        "5.52 ÷ 4.5 gallons per pail = 1.23, so buy 2 pails.",
        "Tape = 534 × 0.37 = 198 ft, so one 500 ft roll is plenty.",
      ],
    },
    tips: [
      "Use a setting-type (powder) compound for the tape coat on big jobs or in cold, damp weather — it hardens chemically and shrinks less.",
      "Lightweight all-purpose compound sands much more easily for finish coats; heavier all-purpose mud has stronger bond for embedding tape.",
      "Mix ready-mixed compound briefly with a paddle before use, and thin it with a little water for the final coat.",
      "Keep the pail sealed with a layer of water on top of the mud to stop it drying out between coats.",
      "Use mesh tape only with setting-type compound; paper tape is stronger in inside corners.",
    ],
    faqs: [
      {
        q: "How much joint compound do I need per sheet of drywall?",
        a: "At about 9.4 gallons per 1,000 sq ft, one 4 × 8 sheet (32 sq ft) uses roughly 0.3 gallons, so a 4.5 gallon pail finishes around 14–15 sheets to a Level 4 finish.",
      },
      {
        q: "How many buckets of mud for 1,000 sq ft of drywall?",
        a: "About 9.4 gallons, so two 4.5 gallon pails (9 gallons) plus a little extra, or three pails if you want a safe margin. USG itself suggests about two pails of its UltraLightweight compound per 1,000 sq ft.",
      },
      {
        q: "How much drywall tape do I need?",
        a: "Plan on about 370 ft of tape per 1,000 sq ft of board, which covers flat seams, butt joints and inside corners. A 500 ft roll finishes roughly 1,300 sq ft.",
      },
      {
        q: "What is a Level 4 vs Level 5 drywall finish?",
        a: "Level 4 (tape coat plus two finish coats on joints and screw heads) is standard for flat or eggshell paint. Level 5 adds a thin skim coat over the whole surface for gloss paint or critical lighting and uses noticeably more compound.",
      },
      {
        q: "Is joint compound the same as drywall mud?",
        a: "Yes. 'Mud' is the trade name for joint compound. It comes ready-mixed in pails (all-purpose, lightweight, topping) or as setting-type powder with set times such as 5, 20, 45 or 90 minutes.",
      },
    ],
    sources: [
      { title: "Sheetrock Brand Plus 3 Lightweight All Purpose Joint Compound — product data", publisher: "USG Corporation" },
      { title: "Gypsum Construction Handbook", publisher: "USG Corporation" },
      { title: "GA-214: Recommended Levels of Gypsum Board Finish", publisher: "Gypsum Association" },
    ],
    related: ["drywall-sheets-calculator", "drywall-screws-calculator", "drywall-cost-calculator", "primer-calculator"],
  },
  {
    slug: "drywall-screws-calculator",
    name: "Drywall Screws Calculator",
    category: "drywall-framing-insulation",
    kind: "material",
    seoTitle: "Drywall Screws Calculator – How Many Screws Per Sheet?",
    description:
      "Count the drywall screws you need for walls and ceilings based on sheet size, framing spacing and code screw spacing, with pounds to buy and screws per sheet.",
    intro:
      "Work out how many drywall screws to buy. The calculator lays out each sheet across the framing, counts a screw at every framing member at your chosen spacing, and totals walls and ceilings separately because ceilings need tighter spacing. You also get an approximate weight so you can choose the right box.",
    keywords: [
      "drywall screws calculator",
      "how many drywall screws per sheet",
      "drywall screw spacing",
      "screws per 4x8 sheet of drywall",
      "how many pounds of drywall screws",
    ],
    howToUse: [
      "Enter the wall and ceiling drywall areas (from the drywall sheets calculator or your own measurements).",
      "Choose the sheet size and framing spacing — 16 in on center is standard for walls, 16 or 24 in for ceiling joists.",
      "Keep the code-maximum screw spacing (16 in on walls, 12 in on ceilings) or tighten it if your inspector or board manufacturer asks for more.",
      "Enter the screws-per-pound figure from the box to convert the count into pounds.",
    ],
    formula: {
      lines: [
        "Framing members per sheet = sheet length ÷ framing spacing + 1",
        "Screws per member = sheet width ÷ screw spacing + 1",
        "Screws = (wall sheets × screws per wall sheet + ceiling sheets × screws per ceiling sheet) × (1 + waste %)",
      ],
      notes: [
        "Sheets are assumed to run perpendicular to the framing with both ends landing on a stud or joist, as recommended for gypsum board.",
        "IRC Table R702.3.5 sets maximum screw spacing for 1/2 in board at 12 in on ceilings and 16 in on walls.",
      ],
    },
    example: {
      scenario: "Hanging 366 sq ft of walls and 168 sq ft of ceiling with 4 × 8 sheets on 16 in framing, screws every 16 in on walls and 12 in on ceilings.",
      inputs: { wallArea: 366, ceilingArea: 168, sheet: 32, framing: 16, wallScrew: 16, ceilingScrew: 12, perLb: 300, waste: 10 },
      expected: { perWallSheet: 28, perCeilingSheet: 35, sheets: 18, screws: 601, pounds: 2.0033 },
      steps: [
        "Wall sheets = 366 ÷ 32 = 11.4 → 12. Ceiling sheets = 168 ÷ 32 = 5.25 → 6.",
        "A horizontal 8 ft sheet crosses 96 ÷ 16 + 1 = 7 studs. On walls each stud gets 48 ÷ 16 + 1 = 4 screws (28 per sheet); on ceilings 48 ÷ 12 + 1 = 5 screws (35 per sheet).",
        "12 × 28 + 6 × 35 = 546 screws; add 10% = 601 screws.",
        "At about 300 screws per pound, that is roughly 2 lb of screws.",
      ],
    },
    tips: [
      "Use 1-1/4 in coarse-thread screws for 1/2 in board on wood studs and 1-5/8 in for 5/8 in board; use fine-thread screws for steel studs.",
      "Set screws just below the surface without tearing the face paper — a drywall screw-gun clutch or dimpler bit makes this easy.",
      "Keep screws at least 3/8 in from sheet edges and ends.",
      "A 5 lb box is usually cheaper per screw than 1 lb boxes if you are hanging more than about 15 sheets.",
    ],
    faqs: [
      {
        q: "How many screws per sheet of drywall?",
        a: "For a 4 × 8 sheet hung horizontally on 16 in studs, about 28 screws on walls (16 in spacing) and 35 on ceilings (12 in spacing). A 4 × 12 sheet needs about 40 on walls and 50 on ceilings.",
      },
      {
        q: "What is the code spacing for drywall screws?",
        a: "Under IRC Table R702.3.5, screws for 1/2 in gypsum board can be up to 16 in apart on walls and 12 in apart on ceilings when framing is 16 in on center. Fire-rated assemblies and some manufacturers call for closer spacing.",
      },
      {
        q: "How many pounds of drywall screws do I need?",
        a: "1-1/4 in coarse-thread screws usually run around 250–350 per pound, so 1,000 sq ft of drywall (about 1,100–1,200 screws) needs roughly 4–5 lb. Check the count printed on the box.",
      },
      {
        q: "Should I use nails or screws for drywall?",
        a: "Screws hold better and are far less prone to popping as framing dries. Nails are still allowed by code but need closer spacing (7 in on ceilings, 8 in on walls for 1/2 in board).",
      },
      {
        q: "Do I need more screws with 24 in stud spacing?",
        a: "No — fewer framing members means fewer screws per sheet, but use thicker or sag-resistant board on ceilings with 24 in joists, and some manufacturers require 12 in spacing on walls at 24 in centers.",
      },
    ],
    sources: [
      { title: "International Residential Code, Table R702.3.5 Minimum Thickness and Application of Gypsum Board", publisher: "International Code Council" },
      { title: "GA-216: Application and Finishing of Gypsum Panel Products", publisher: "Gypsum Association" },
      { title: "Gypsum Construction Handbook", publisher: "USG Corporation" },
    ],
    related: ["drywall-sheets-calculator", "joint-compound-calculator", "stud-count-calculator", "drywall-cost-calculator"],
  },
  {
    slug: "stud-count-calculator",
    name: "Stud Count Calculator",
    category: "drywall-framing-insulation",
    kind: "material",
    seoTitle: "Stud Calculator – How Many Studs Do I Need for a Wall?",
    description:
      "Calculate how many 2×4 or 2×6 studs a wall needs at 12, 16 or 24 in on center, including extra studs for openings and corners, plus plate lumber.",
    intro:
      "Count the studs for a wall before you head to the lumber yard. Enter the wall length and stud spacing, add your door and window openings and corners, and the calculator gives the number of studs to buy and the plate lumber for the bottom plate and double top plate.",
    keywords: [
      "stud calculator",
      "how many studs do i need",
      "stud count calculator",
      "studs 16 inches on center calculator",
      "wall framing calculator",
      "how many 2x4 for a wall",
    ],
    howToUse: [
      "Measure the length of the wall you are framing.",
      "Choose the stud spacing — 16 in on center is standard; 24 in is common with 2×6 exterior walls (advanced framing).",
      "Enter the number of door and window openings and the number of corners or intersecting walls along this wall.",
      "Enter the length of board you plan to buy for plates, keep the waste allowance and read the result.",
    ],
    formula: {
      lines: [
        "Studs at spacing = (wall length in inches ÷ spacing, rounded up) + 1",
        "Studs = (studs at spacing + 2 × openings + 2 × corners) × (1 + waste %), rounded up",
        "Plate lumber = 3 × wall length (one bottom plate + double top plate)",
      ],
      notes: [
        "The '2 per opening' rule covers the extra king and jack studs; cripple studs above and below openings usually come from offcuts.",
        "Headers are not included — use the framing lumber calculator for a whole-wall takeoff with headers.",
      ],
    },
    example: {
      scenario: "A 20 ft interior wall at 16 in on center with one door and a corner at each end, using 12 ft boards for plates.",
      inputs: { length: 20, spacing: 16, openings: 1, corners: 2, plateLength: 12, waste: 10 },
      expected: { baseStuds: 16, studs: 25, plateFeet: 60, plateBoards: 6 },
      steps: [
        "20 ft = 240 in; 240 ÷ 16 = 15 spaces, so 15 + 1 = 16 studs.",
        "Add 2 for the door and 2 × 2 = 4 for the corners: 16 + 2 + 4 = 22 studs.",
        "Add 10% for bad boards: 22 × 1.10 = 24.2, so buy 25 studs.",
        "Plates = 3 × 20 = 60 ft; 60 ÷ 12 = 5 boards, plus 10% = 5.5, so buy 6 twelve-foot boards.",
      ],
    },
    tips: [
      "Sight down each stud at the store and reject badly crowned, twisted or split boards.",
      "Precut studs (92-5/8 in for 2×4) give an 8 ft finished ceiling height with a single bottom and double top plate.",
      "Use pressure-treated lumber for bottom plates on concrete floors.",
      "Mark stud layout on the top and bottom plates together so studs end up perfectly plumb and on 16 in centers for the drywall.",
    ],
    faqs: [
      {
        q: "How many studs do I need for a 10 ft wall?",
        a: "At 16 in on center, a 10 ft (120 in) wall needs 120 ÷ 16 = 7.5 → 8 spaces + 1 = 9 studs, plus extras for corners and openings — typically 11–13 studs to buy.",
      },
      {
        q: "How do you calculate studs at 16 inches on center?",
        a: "Convert the wall length to inches, divide by 16, round up and add one. A quick shortcut is 3/4 of a stud per foot of wall, plus one, plus extras for openings and corners.",
      },
      {
        q: "How many studs for a corner?",
        a: "A typical corner uses two or three studs (or a stud plus blocking/ladder framing) to give backing for drywall on both walls, which is why the calculator adds about 2 studs per corner or wall intersection.",
      },
      {
        q: "Should I use 16 or 24 inch stud spacing?",
        a: "16 in is standard and required for many interior walls and 2×4 bearing walls. 24 in spacing is allowed for 2×6 exterior walls and non-bearing 2×4 walls in many cases (IRC Table R602.3(5)) and saves lumber, but needs stiffer drywall.",
      },
    ],
    sources: [
      { title: "International Residential Code, Section R602 Wood Wall Framing", publisher: "International Code Council" },
      { title: "Advanced Framing (Optimum Value Engineering)", publisher: "U.S. Department of Energy, Building America Solution Center" },
      { title: "Wood Frame Construction Manual", publisher: "American Wood Council" },
    ],
    related: ["framing-lumber-calculator", "drywall-sheets-calculator", "board-foot-calculator", "batt-insulation-calculator"],
  },
  {
    slug: "batt-insulation-calculator",
    name: "Batt Insulation Calculator",
    category: "drywall-framing-insulation",
    kind: "material",
    seoTitle: "Batt Insulation Calculator – How Many Bags of Insulation?",
    description:
      "Estimate fiberglass or mineral wool batt insulation for walls, floors and ceilings: enter the area and package coverage to get bags and batts to buy.",
    intro:
      "Find out how many packages of batt insulation you need for walls, floors or an attic. Enter the area of the space, your framing spacing and the coverage printed on the package, and the calculator gives you the number of bags and individual batts to buy.",
    keywords: [
      "batt insulation calculator",
      "how much insulation do i need",
      "fiberglass insulation calculator",
      "wall insulation calculator",
      "how many bags of insulation do i need",
    ],
    howToUse: [
      "Measure the area to insulate: wall length × wall height (minus large windows and doors), or the floor/ceiling area.",
      "Choose the framing spacing — it sets the batt width (15 in for 16 in centers, 23 in for 24 in centers).",
      "Enter the batt length and the coverage in square feet printed on the package for the R-value you are buying.",
      "Keep a small waste allowance for trimming and read the packages to buy.",
    ],
    formula: {
      lines: [
        "Area with waste = area × (1 + waste %)",
        "Packages = area with waste ÷ coverage per package, rounded up",
        "Batts = area with waste ÷ (batt width × batt length ÷ 144), rounded up",
      ],
      notes: [
        "Package coverage is the gross wall area the batts fill, so do not subtract the studs.",
        "Common wall R-values: R-13 or R-15 in 2×4 walls, R-19 to R-21 in 2×6 walls; check the IECC requirement for your climate zone.",
      ],
    },
    example: {
      scenario: "Insulating 290 sq ft of 2×4 exterior wall (8 ft high, 16 in centers) with R-13 batts sold in 106.56 sq ft bags of 15 × 93 in batts.",
      inputs: { area: 290, spacing: 16, battLength: 93, packCoverage: 106.56, waste: 5 },
      expected: { area: 304.5, packages: 3, batts: 32, battArea: 9.6875 },
      steps: [
        "Area with waste = 290 × 1.05 = 304.5 sq ft.",
        "Packages = 304.5 ÷ 106.56 = 2.86, so buy 3 bags.",
        "Each 15 × 93 in batt covers 15 × 93 ÷ 144 = 9.69 sq ft, so you need 304.5 ÷ 9.69 = 31.4 → 32 batts.",
      ],
    },
    tips: [
      "Don't compress batts — squashing an R-19 batt into a 2×4 cavity lowers its R-value. Buy the R-value made for your stud depth.",
      "Split batts around wiring and cut them neatly around boxes; gaps and voids cut real-world performance noticeably.",
      "Kraft-faced batts provide a vapor retarder; the facing goes toward the heated side in cold climates. Follow local code for your climate zone.",
      "Wear gloves, long sleeves, eye protection and an N95 mask when handling fiberglass.",
    ],
    faqs: [
      {
        q: "How much insulation do I need for a 12 × 12 room?",
        a: "If you insulate all four 8 ft walls, that's 2 × (12 + 12) × 8 = 384 sq ft minus openings — around 4 bags of R-13 at about 100 sq ft per bag. For only the exterior walls, measure those walls alone.",
      },
      {
        q: "How many square feet does a bag of R-13 insulation cover?",
        a: "It depends on the pack: common R-13 packages cover roughly 40 sq ft (small packs) to over 100 sq ft (contractor packs). Always use the coverage printed on the bag.",
      },
      {
        q: "What R-value insulation do I need for walls?",
        a: "The 2021 IECC calls for R-13 in 2×4 walls in the warmest zones and R-20 (or R-13 plus continuous insulation) in many colder zones. Check your local code and the DOE insulation map.",
      },
      {
        q: "Should I use 15 in or 23 in wide batts?",
        a: "Use 15 in wide batts for framing at 16 in on center and 23 in wide batts for framing at 24 in on center so the batts fit snugly without gaps.",
      },
      {
        q: "Do I subtract studs when calculating insulation?",
        a: "No. Measure the gross area. Manufacturers state coverage as the wall area the package fills, which already accounts for the studs.",
      },
    ],
    sources: [
      { title: "Insulation — Types and R-values", publisher: "U.S. Department of Energy, Energy Saver" },
      { title: "2021 International Energy Conservation Code, Table R402.1.2", publisher: "International Code Council" },
      { title: "Batt insulation installation guidelines", publisher: "North American Insulation Manufacturers Association (NAIMA)" },
    ],
    related: ["attic-insulation-calculator", "spray-foam-calculator", "insulation-cost-calculator", "wall-area-calculator"],
  },
  {
    slug: "attic-insulation-calculator",
    name: "Attic Insulation Calculator",
    category: "drywall-framing-insulation",
    kind: "material",
    seoTitle: "Attic Insulation Calculator – Bags of Blown-In Insulation",
    description:
      "Calculate how many bags of blown-in cellulose or fiberglass you need to bring your attic up to R-38, R-49 or R-60, and how many inches to add.",
    intro:
      "Plan a blown-in attic insulation top-up. Enter the attic floor area, the R-value already there and the R-value you want, choose cellulose or fiberglass, and the calculator estimates how many bags to buy and how deep the new layer should be. If you have the coverage chart from the bag, enter it for an exact match.",
    keywords: [
      "attic insulation calculator",
      "blown in insulation calculator",
      "how many bags of blown in insulation do i need",
      "cellulose insulation calculator",
      "attic insulation r-value depth",
    ],
    howToUse: [
      "Measure the attic floor area — usually the footprint of the heated rooms below.",
      "Measure the depth of existing insulation and estimate its R-value (about R-3 per inch for old batts or cellulose, R-2.5 per inch for loose fiberglass).",
      "Choose your target R-value. The DOE recommends R-30 to R-49 in the warmest zones and R-49 to R-60 in most of the country.",
      "Pick cellulose or fiberglass. If you have the bag's coverage chart, enter its bags per 1,000 sq ft for the R-value you are adding.",
    ],
    formula: {
      lines: [
        "R-value to add = target R − existing R",
        "Insulation weight = area × R to add × lb per sq ft per R (cellulose ≈ 0.031, fiberglass ≈ 0.0134)",
        "Bags = weight ÷ bag weight × (1 + waste %), rounded up — or area ÷ 1,000 × chart bags per 1,000 sq ft",
        "Settled depth to add = R to add ÷ R per inch (cellulose ≈ 3.7, fiberglass ≈ 2.5)",
      ],
      notes: [
        "Estimates are derived from published attic coverage charts, e.g. Greenfiber cellulose (25 lb bag, about 47 bags per 1,000 sq ft at R-38) and Johns Manville Attic Protector fiberglass (about 19 bags per 1,000 sq ft at R-38).",
        "Products differ — the chart on your bag is the legal reference for the R-value installed.",
      ],
    },
    example: {
      scenario: "A 1,200 sq ft attic with about R-11 of old insulation, topped up to R-49 with blown cellulose in 25 lb bags.",
      inputs: { area: 1200, material: 1, existingR: 11, targetR: 49, chartBags: 0, waste: 5 },
      expected: { addR: 38, pounds: 1413.6, bags: 60, depth: 10.27 },
      steps: [
        "R to add = 49 − 11 = 38.",
        "Weight = 1,200 × 38 × 0.031 = 1,414 lb of cellulose.",
        "1,414 ÷ 25 lb = 56.5 bags; add 5% = 59.4, so buy 60 bags.",
        "Depth to add = 38 ÷ 3.7 ≈ 10.3 in of settled cellulose (install a little deeper — it settles).",
      ],
    },
    tips: [
      "Air-seal top plates, wiring holes and the attic hatch before adding insulation — it often saves as much energy as the insulation itself.",
      "Keep insulation clear of recessed lights not rated IC, chimneys and flues, and install baffles so soffit vents stay open.",
      "Staple depth rulers to trusses every few hundred square feet so you can see when you have reached the target depth.",
      "Many home centers lend the blowing machine free with a minimum bag purchase.",
    ],
    faqs: [
      {
        q: "How many bags of blown-in insulation do I need for 1,000 sq ft?",
        a: "To add R-38 over a bare attic floor you need roughly 47–48 bags of 25 lb cellulose or about 19–20 bags of fiberglass blowing wool for 1,000 sq ft. Check the chart on your specific product.",
      },
      {
        q: "How thick should attic insulation be for R-49?",
        a: "About 13–14 in of settled cellulose or 18–19 in of loose-fill fiberglass. Fiberglass needs more depth for the same R-value but weighs much less.",
      },
      {
        q: "What R-value should my attic be?",
        a: "The U.S. Department of Energy recommends R-30 to R-49 in zone 1, R-49 to R-60 in zones 2–3 and R-60 in zones 4–8 for uninsulated attics, and adding R-25 to R-49 over existing insulation depending on zone.",
      },
      {
        q: "Can I blow new insulation over old insulation?",
        a: "Yes, as long as the old insulation is dry, free of mold or pest damage and not vermiculite (which may contain asbestos). Loose fill can go over batts; avoid adding faced batts on top of existing insulation.",
      },
      {
        q: "Is cellulose or fiberglass better for attics?",
        a: "Both work well. Cellulose has a higher R-value per inch and fills around obstacles densely; fiberglass is lighter, which matters for older ceilings, and does not absorb moisture.",
      },
    ],
    sources: [
      { title: "Insulation — Recommended home insulation R-values", publisher: "U.S. Department of Energy / ENERGY STAR" },
      { title: "Cel-Pak cellulose attic coverage chart", publisher: "Greenfiber" },
      { title: "Attic Protector B-785 blowing wool attic coverage chart", publisher: "Johns Manville" },
    ],
    related: ["batt-insulation-calculator", "insulation-cost-calculator", "spray-foam-calculator", "square-footage-calculator"],
  },
  {
    slug: "spray-foam-calculator",
    name: "Spray Foam Calculator",
    category: "drywall-framing-insulation",
    kind: "material",
    seoTitle: "Spray Foam Calculator – Board Feet and Kits Needed",
    description:
      "Calculate spray foam insulation in board feet, the number of DIY kits to buy and the R-value you'll get for open-cell or closed-cell foam.",
    intro:
      "Spray foam is sold by the board foot — one square foot, one inch thick. Enter the area you want to spray and the thickness, choose open-cell or closed-cell foam, and the calculator converts it to board feet, the number of DIY kits to buy and the approximate R-value of the finished layer.",
    keywords: [
      "spray foam calculator",
      "spray foam board feet calculator",
      "how much spray foam do i need",
      "spray foam kit calculator",
      "closed cell spray foam r value",
    ],
    howToUse: [
      "Measure the area to spray (for rim joists: perimeter × joist depth).",
      "Choose the thickness. Closed-cell foam is usually sprayed 1–3 in thick; open-cell 3–6 in.",
      "Select the foam type to see the R-value.",
      "Enter your kit's rated yield in board feet and keep a generous waste allowance — DIY kits rarely reach their label yield.",
    ],
    formula: {
      lines: [
        "Board feet = area (sq ft) × thickness (in)",
        "Foam needed = board feet × (1 + waste %)",
        "Kits = foam needed ÷ kit yield, rounded up",
        "R-value ≈ thickness × R per inch (open-cell ≈ 3.6, closed-cell ≈ 6.5)",
      ],
      notes: [
        "Kit yields are theoretical at ideal temperature (usually about 70–80 °F for both the tanks and the surface). Cold tanks give much lower yield.",
      ],
    },
    example: {
      scenario: "Spraying 300 sq ft of basement rim joist and wall at 2 in of closed-cell foam with 600 board-foot kits.",
      inputs: { area: 300, thickness: 2, foam: 1, kitSize: 600, waste: 10 },
      expected: { netBoardFeet: 600, boardFeet: 660, kits: 2, rValue: 13 },
      steps: [
        "Board feet = 300 × 2 = 600.",
        "Add 10%: 600 × 1.10 = 660 board feet.",
        "660 ÷ 600 = 1.1, so buy 2 kits (or one 600 plus one 200 kit).",
        "R-value ≈ 2 × 6.5 = R-13.",
      ],
    },
    tips: [
      "Warm the tanks to the temperature on the label for a day before spraying — it has a big effect on yield and quality.",
      "Spray closed-cell foam in passes of no more than about 1–2 in at a time to avoid excess heat and shrinkage.",
      "Wear a full-face respirator with organic vapor cartridges, gloves and coveralls, and ventilate the space. Keep others out until it has cured.",
      "Most codes require spray foam in living spaces to be covered by an ignition or thermal barrier such as 1/2 in drywall.",
    ],
    faqs: [
      {
        q: "What is a board foot of spray foam?",
        a: "One board foot is 1 sq ft of foam 1 in thick (144 cubic inches). A 600 board-foot kit covers 600 sq ft at 1 in, 300 sq ft at 2 in or 200 sq ft at 3 in in theory.",
      },
      {
        q: "How much does a 600 board-foot kit really cover?",
        a: "In real DIY use, often 10–25% less than the label because of cold tanks, overspray and uneven thickness. That's why this calculator adds a waste allowance.",
      },
      {
        q: "Open-cell vs closed-cell spray foam: which do I need?",
        a: "Closed-cell is denser, around R-6 to R-7 per inch, and acts as a vapor retarder — good for rim joists, basements and thin cavities. Open-cell is about R-3.5 to R-3.7 per inch, cheaper per board foot, and good for roofs and interior sound control.",
      },
      {
        q: "How thick should spray foam be?",
        a: "It depends on your R-value target: 2 in of closed-cell gives about R-13 for a 2×4 wall; 3 in gives about R-19 to R-20. Open-cell usually fills a 2×4 cavity (3.5 in) for about R-13.",
      },
    ],
    sources: [
      { title: "Insulation materials — Spray foam", publisher: "U.S. Department of Energy, Energy Saver" },
      { title: "Spray Polyurethane Foam: Health and safety", publisher: "U.S. Environmental Protection Agency" },
      { title: "International Residential Code, Section R316 Foam Plastic", publisher: "International Code Council" },
    ],
    related: ["batt-insulation-calculator", "attic-insulation-calculator", "insulation-cost-calculator", "board-foot-calculator"],
  },
  {
    slug: "framing-lumber-calculator",
    name: "Framing Lumber Calculator",
    category: "drywall-framing-insulation",
    kind: "material",
    safety: true,
    seoTitle: "Framing Lumber Calculator – Studs, Plates and Headers",
    description:
      "Estimate wall framing lumber: studs, plates, header stock and total board feet for 2×4 or 2×6 walls at 12, 16 or 24 inch spacing, with openings and corners.",
    intro:
      "Get a complete wall-framing takeoff for one or several walls. Enter the total wall length, stud length and spacing, the number and width of openings and the number of corners, and the calculator gives the studs to buy, plate lumber, header stock and the total board feet of studs and plates for pricing.",
    keywords: [
      "framing lumber calculator",
      "wall framing calculator",
      "lumber estimate for framing",
      "how much lumber to frame a wall",
      "2x4 wall framing calculator",
      "framing takeoff",
    ],
    howToUse: [
      "Add up the length of all walls you are framing.",
      "Enter the stud length (8 ft for 8 ft walls, or the precut length you plan to buy) and the stud spacing.",
      "Choose 2×4 or 2×6 lumber.",
      "Enter the number of door and window openings, their average rough opening width, and the number of corners and wall intersections.",
      "Read studs, plates, headers and board feet. Size headers for bearing walls from the code tables or an engineer.",
    ],
    formula: {
      lines: [
        "Studs = (wall length ÷ spacing + 1 + 2 × openings + 2 × corners) × (1 + waste %)",
        "Plates = 3 × wall length × (1 + waste %)",
        "Header stock = openings × (opening width + 3 in) × 2 plies",
        "Board feet = (studs × stud length + plate length) × (2 ÷ 3 for 2×4, or 1 for 2×6)",
      ],
      notes: [
        "Board feet use nominal sizes: a 2×4 is 2 × 4 ÷ 12 = 0.667 bd ft per foot; a 2×6 is 1 bd ft per foot. Headers are excluded because their depth depends on the span and load.",
      ],
    },
    example: {
      scenario: "Framing 40 ft of 8 ft 2×4 wall at 16 in on center with three 3 ft openings and four corners.",
      inputs: { length: 40, height: 8, spacing: 16, size: 4, openings: 3, openingWidth: 3, corners: 4, waste: 10 },
      expected: { studs: 50, plateFeet: 132, headerFeet: 19.5, boardFeet: 354.67 },
      steps: [
        "Studs at spacing = 480 in ÷ 16 = 30 spaces + 1 = 31; add 3 × 2 for openings and 4 × 2 for corners = 45.",
        "Add 10%: 45 × 1.10 = 49.5 → 50 studs.",
        "Plates = 3 × 40 = 120 ft + 10% = 132 ft. Headers = 3 × 3.25 ft × 2 = 19.5 ft of header stock.",
        "Board feet = (50 × 8 + 132) × 0.667 = 532 × 0.667 ≈ 355 bd ft.",
      ],
    },
    tips: [
      "Header sizes for load-bearing walls come from IRC Tables R602.7(1)–(3) or an engineer; non-bearing walls can use a flat 2× header.",
      "Order a mix of precut studs and longer boards — you need full-length lumber for plates, headers and blocking.",
      "Store lumber flat and covered on site to prevent warping before you frame.",
      "Use pressure-treated lumber for any plate in contact with concrete.",
    ],
    faqs: [
      {
        q: "How do I estimate lumber for framing a wall?",
        a: "A quick rule is one stud per foot of wall at 16 in spacing (it covers extras for corners and openings), plus three times the wall length in plate lumber. This calculator gives a more precise count.",
      },
      {
        q: "How many board feet are in a 2×4×8?",
        a: "A 2×4×8 contains 2 × 4 × 8 ÷ 12 = 5.33 board feet. A 2×6×8 contains 8 board feet.",
      },
      {
        q: "What size header do I need?",
        a: "It depends on the opening width, whether the wall is load-bearing, the building width and snow load. For example, IRC tables often allow a doubled 2×6 over a 3 ft opening in a bearing wall supporting only a roof, but always check the tables or ask an engineer.",
      },
      {
        q: "Do I need a permit to frame walls?",
        a: "Usually for new structural walls, additions, or removing bearing walls; often not for a non-bearing partition. Check with your local building department before starting.",
      },
    ],
    sources: [
      { title: "International Residential Code, Section R602 Wood Wall Framing and Table R602.7 Headers", publisher: "International Code Council" },
      { title: "Wood Frame Construction Manual", publisher: "American Wood Council" },
      { title: "Advanced Framing (Optimum Value Engineering)", publisher: "U.S. Department of Energy, Building America Solution Center" },
    ],
    related: ["stud-count-calculator", "board-foot-calculator", "drywall-sheets-calculator", "batt-insulation-calculator"],
  },
  {
    slug: "drywall-cost-calculator",
    name: "Drywall Cost Calculator",
    category: "drywall-framing-insulation",
    kind: "cost",
    seoTitle: "Drywall Cost Calculator – Cost to Hang and Finish Drywall",
    description:
      "Estimate the cost to hang and finish drywall: sheets, mud, tape and screws plus contractor labor per square foot, with editable prices for your area.",
    intro:
      "Estimate what a drywall job will cost, either as a DIY project or with a contractor. Enter the drywall area, the price you'll pay per sheet and for finishing supplies, and a labor rate per square foot, and the calculator totals the materials, labor and cost per square foot. Every price can be changed to match local quotes.",
    keywords: [
      "drywall cost calculator",
      "cost to drywall a room",
      "drywall installation cost per square foot",
      "drywall labor cost",
      "how much does drywall cost",
    ],
    howToUse: [
      "Enter the drywall area (walls plus ceiling). The drywall sheets calculator can work this out from room dimensions.",
      "Choose the sheet size and enter your local price per sheet.",
      "Adjust the supplies allowance for mud, tape, screws and corner bead.",
      "Pick DIY or contractor, and enter the labor rate from local quotes if you are hiring out.",
    ],
    formula: {
      lines: [
        "Sheets = area ÷ sheet area × (1 + waste %), rounded up",
        "Materials = sheets × price per sheet + area × supplies per sq ft",
        "Labor = area × labor rate (contractor only)",
        "Total = materials + labor",
      ],
      notes: ["Labor is charged on the actual area, not on the waste allowance."],
    },
    example: {
      scenario: "Hanging and finishing 534 sq ft of drywall (a 14 × 12 room with ceiling) using $16 4 × 8 sheets, $0.20/sq ft supplies and a contractor at $1.75/sq ft.",
      inputs: { area: 534, sheet: 32, sheetPrice: 16, suppliesPrice: 0.2, pro: 1, laborPrice: 1.75, waste: 10 },
      expected: { sheets: 19, materials: 410.8, labor: 934.5, total: 1345.3, perSqft: 2.5193 },
      steps: [
        "Sheets = 534 ÷ 32 × 1.10 = 18.4 → 19 sheets × $16 = $304.",
        "Supplies = 534 × $0.20 = $106.80, so materials total $410.80.",
        "Labor = 534 × $1.75 = $934.50.",
        "Total = $410.80 + $934.50 = $1,345.30, or about $2.52 per sq ft.",
      ],
    },
    tips: [
      "Get at least three written quotes and confirm the finish level (Level 4 is standard), who handles debris, and whether texture and primer are included.",
      "Small jobs and patches are often priced as a day rate or minimum charge rather than per square foot.",
      "High ceilings, stairwells and lots of corners raise labor costs; open rectangular rooms are cheapest.",
      "Moisture-resistant, mold-resistant and 5/8 in fire-rated board cost more per sheet than standard 1/2 in board.",
    ],
    faqs: [
      {
        q: "How much does it cost to drywall a 12 × 12 room?",
        a: "A 12 × 12 room with 8 ft walls and ceiling has roughly 480–530 sq ft of drywall. At a typical $1.75–$3.50 per sq ft installed and finished, that is around $850–$1,850, depending on region and finish.",
      },
      {
        q: "What is the cost per square foot to hang and finish drywall?",
        a: "Typical US contractor pricing is about $1.75 to $3.50 per sq ft for materials and labor at a Level 4 finish, with labor making up most of it. Prices vary widely by region.",
      },
      {
        q: "How much does a sheet of drywall cost?",
        a: "Standard 1/2 in 4 × 8 sheets typically cost about $12–$20; 4 × 12 sheets, moisture-resistant and 5/8 in Type X fire-rated sheets cost more.",
      },
      {
        q: "Is it cheaper to drywall yourself?",
        a: "Materials alone usually run about $0.60–$0.90 per sq ft, so DIY can save more than half the cost. Taping and finishing to a smooth, invisible joint is the hard part — many homeowners hang the board themselves and hire a finisher.",
      },
      {
        q: "Does drywall cost include painting?",
        a: "Usually not. Primer and paint are typically separate. Use the paint cost calculator to add them.",
      },
    ],
    sources: [
      { title: "Gypsum Construction Handbook", publisher: "USG Corporation" },
      { title: "Producer Price Index — Gypsum products", publisher: "U.S. Bureau of Labor Statistics" },
      { title: "Occupational Outlook: Drywall and Ceiling Tile Installers, and Tapers", publisher: "U.S. Bureau of Labor Statistics" },
    ],
    related: ["drywall-sheets-calculator", "joint-compound-calculator", "paint-cost-calculator", "renovation-budget-calculator"],
    cost: {
      priceRange: "$1.75–$3.50 per sq ft installed and finished; about $0.60–$0.90 per sq ft for DIY materials",
      assumptions: [
        "1/2 in standard gypsum board at $12–$20 per 4 × 8 sheet.",
        "Level 4 finish (tape, two finish coats) ready for primer; texture, primer and paint are extra.",
        "Labor of $1.25–$2.75 per sq ft; typical US ranges that vary by region, access and job size.",
        "Does not include demolition, framing repairs, debris disposal or permits.",
      ],
      updated: UPDATED,
    },
  },
  {
    slug: "insulation-cost-calculator",
    name: "Insulation Cost Calculator",
    category: "drywall-framing-insulation",
    kind: "cost",
    seoTitle: "Insulation Cost Calculator – Batts, Blown-In and Spray Foam",
    description:
      "Compare insulation costs for fiberglass batts, blown-in cellulose or fiberglass and spray foam. Enter the area and local prices to estimate your project.",
    intro:
      "Estimate the installed cost of insulating an attic, walls or floor. Choose fiberglass batts, blown-in fiberglass or cellulose, or open- or closed-cell spray foam, enter the area and adjust the price to local quotes. Spray foam is priced per board foot, so you also set the thickness. Optionally add the cost of removing old insulation.",
    keywords: [
      "insulation cost calculator",
      "attic insulation cost",
      "blown in insulation cost per square foot",
      "spray foam insulation cost",
      "cost to insulate a house",
    ],
    howToUse: [
      "Enter the area to insulate in square feet.",
      "Choose the insulation type.",
      "Adjust the installed price to match your quotes (per sq ft for batts and blown-in, per board foot and thickness for spray foam).",
      "Add a removal cost if old, damaged or contaminated insulation must come out first.",
    ],
    formula: {
      lines: [
        "Batts or blown-in: cost = area × installed price per sq ft",
        "Spray foam: cost = area × thickness (in) × price per board foot",
        "Total = installed cost + area × removal price",
      ],
      notes: ["Blown-in prices assume about R-38 to R-49 of attic insulation; higher R-values cost proportionally more."],
    },
    example: {
      scenario: "A 1,200 sq ft attic: old insulation removed at $1.00/sq ft and replaced with blown cellulose at $1.60/sq ft installed.",
      inputs: { area: 1200, type: 2, priceCellulose: 1.6, removal: 1 },
      expected: { installed: 1920, removal: 1200, total: 3120, perSqft: 2.6 },
      steps: [
        "Installed cellulose = 1,200 × $1.60 = $1,920.",
        "Removal = 1,200 × $1.00 = $1,200.",
        "Total = $1,920 + $1,200 = $3,120, or $2.60 per sq ft.",
      ],
    },
    tips: [
      "Ask for air sealing to be included or quoted separately — it is one of the most cost-effective energy upgrades.",
      "Check for federal tax credits, utility rebates and state programs for insulation and air sealing; the rules change, so confirm current terms with the IRS and your utility.",
      "Ask installers for the R-value and the number of bags or the thickness they will install, and get an attic card signed after the job.",
      "DIY blown-in insulation costs only the bags (machine rental is often free), roughly half of a contractor price.",
    ],
    faqs: [
      {
        q: "How much does it cost to insulate a 1,000 sq ft attic?",
        a: "With blown-in fiberglass or cellulose at about $1.00–$2.30 per sq ft installed, roughly $1,000–$2,300. Removing old insulation or air sealing first adds to that.",
      },
      {
        q: "Is spray foam worth the extra cost?",
        a: "Spray foam costs more per R-value but also air-seals. It is often worth it for rim joists, cathedral ceilings and unvented roof assemblies; for an open attic floor, blown-in insulation plus air sealing is usually much cheaper for the same performance.",
      },
      {
        q: "How much does spray foam cost per square foot?",
        a: "Open-cell is typically $0.40–$0.70 per board foot and closed-cell $1.00–$1.75 per board foot installed. So 3 in of closed-cell runs roughly $3–$5 per sq ft.",
      },
      {
        q: "What is the cheapest type of insulation?",
        a: "Fiberglass batts are usually cheapest for open wall cavities, and blown-in fiberglass or cellulose is usually cheapest for attic floors.",
      },
      {
        q: "How much does it cost to remove old insulation?",
        a: "Typically about $1.00–$2.00 per sq ft, more if it is contaminated by rodents or mold. Vermiculite may contain asbestos and should be tested before anyone disturbs it.",
      },
    ],
    sources: [
      { title: "Insulation — Where to insulate and recommended R-values", publisher: "U.S. Department of Energy, Energy Saver" },
      { title: "Seal and Insulate with ENERGY STAR", publisher: "ENERGY STAR (U.S. EPA)" },
      { title: "Protect Your Family from Exposures to Asbestos — Vermiculite insulation", publisher: "U.S. Environmental Protection Agency" },
    ],
    related: ["attic-insulation-calculator", "batt-insulation-calculator", "spray-foam-calculator", "home-improvement-roi-calculator"],
    cost: {
      priceRange: "$0.90–$2.30 per sq ft for batts or blown-in; $0.40–$1.75 per board foot for spray foam (installed)",
      assumptions: [
        "Batts: $0.90–$2.00 per sq ft installed in open framing.",
        "Blown-in fiberglass or cellulose: $1.00–$2.30 per sq ft for about R-38 to R-49 in an accessible attic.",
        "Open-cell spray foam $0.40–$0.70 and closed-cell $1.00–$1.75 per board foot installed.",
        "Typical US contractor pricing that varies by region, access and job size; excludes air sealing, permits and rebates.",
      ],
      updated: UPDATED,
    },
  },
];
