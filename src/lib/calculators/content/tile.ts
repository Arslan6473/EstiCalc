import type { CalculatorContent } from "../types";

export const content: CalculatorContent[] = [
  {
    slug: "tile-calculator",
    name: "Tile Calculator",
    category: "tile",
    kind: "material",
    featured: true,
    seoTitle: "Tile Calculator – How Many Tiles and Boxes Do I Need?",
    description:
      "Calculate how many floor tiles and boxes to buy from room size, tile size and grout joint, with waste for cuts. Works in feet, inches or metric.",
    intro:
      "Whether you're tiling a bathroom floor, a kitchen or an entryway, the question is the same: how many tiles, and how many boxes? This tile calculator counts each tile together with its grout joint, adds an allowance for cuts and breakage, and converts the result into boxes using the coverage printed on the carton.",
    keywords: [
      "tile calculator",
      "how many tiles do i need",
      "floor tile calculator",
      "tile box calculator",
      "tiles per square foot",
      "tile square footage calculator",
    ],
    howToUse: [
      "Measure the length and width of the area. For L-shaped rooms, split them into rectangles and add the results.",
      "Enter the tile's actual size in inches (a nominal 12 × 12 tile is often closer to 11.8 in — use the size on the box).",
      "Enter the grout joint width you plan to use.",
      "Enter the coverage per box from the carton and choose a waste allowance: 10% for straight layouts, 15% for diagonal or herringbone.",
      "Read the number of tiles and boxes to buy.",
    ],
    formula: {
      lines: [
        "Area = length × width",
        "Tiles (exact) = area × 144 ÷ ((tile length + joint) × (tile width + joint))",
        "Tiles to buy = tiles × (1 + waste %), rounded up",
        "Boxes = area × (1 + waste %) ÷ coverage per box, rounded up",
      ],
      notes: [
        "Each tile occupies its own size plus one grout joint in each direction, which is why wider joints need slightly fewer tiles.",
        "Boxes are calculated from area, because box coverage is how tile is sold; buy whole boxes from the same lot (shade/caliber) number.",
      ],
    },
    example: {
      scenario: "A 12 × 10 ft kitchen floor with 12 × 12 in porcelain tile, 1/8 in grout joints, 10 sq ft per box and 10% waste.",
      inputs: { length: 12, width: 10, tileLength: 12, tileWidth: 12, joint: 0.125, boxCoverage: 10, waste: 10 },
      expected: { area: 120, tilesExact: 117.5385, tiles: 130, buyArea: 132, boxes: 14 },
      steps: [
        "Area = 12 × 10 = 120 sq ft.",
        "Each tile plus joint covers 12.125 × 12.125 = 147.0 sq in, so 120 × 144 ÷ 147.0 = 117.5 tiles.",
        "Add 10%: 117.5 × 1.10 = 129.3, so buy 130 tiles.",
        "Boxes = 120 × 1.10 ÷ 10 = 13.2, so buy 14 boxes.",
      ],
    },
    tips: [
      "Check every box for the same lot, shade and caliber numbers before you start — colors and sizes can vary between production runs.",
      "Dry-lay a row in each direction to plan cuts and avoid thin slivers at doorways (see the tile layout calculator).",
      "Keep at least a few spare tiles after the job for future repairs.",
      "Large tiles (15 in and up) need a flatter floor; check the manufacturer's flatness requirement before you buy.",
      "Measure into closets and under appliances you plan to tile beneath.",
    ],
    faqs: [
      {
        q: "How many 12 × 12 tiles do I need for 100 square feet?",
        a: "With 1/8 in joints, about 98 tiles cover 100 sq ft. Adding 10% for cuts and breakage gives about 108 tiles, or 11 boxes if each box covers 10 sq ft.",
      },
      {
        q: "How much extra tile should I buy?",
        a: "Buy about 10% extra for a straight layout in a simple room and 15% or more for diagonal, herringbone or rooms with lots of corners and obstacles. Large-format tiles often need more because each cut wastes more material.",
      },
      {
        q: "How many tiles are in a square foot?",
        a: "Ignoring grout, it's 144 ÷ (tile length × width in inches): 1 tile of 12 × 12, 2 tiles of 12 × 6, 4 tiles of 6 × 6, and 0.5 of a 12 × 24. Grout joints reduce the count slightly.",
      },
      {
        q: "Should I calculate tile by pieces or by boxes?",
        a: "Buy by boxes, because tile is sold by the carton. The piece count is useful for checking that the box coverage matches the tile size and for planning layout.",
      },
      {
        q: "Do I subtract the area under cabinets or a vanity?",
        a: "Usually yes for permanent cabinets and fixed vanities, which are typically installed before the floor tile. Many installers tile under freestanding appliances such as refrigerators and ranges.",
      },
      {
        q: "Does grout joint size change how many tiles I need?",
        a: "A little. With 12 × 12 tile, going from 1/16 in to 1/4 in joints reduces the tile count by about 4%. The effect is bigger with small tiles.",
      },
    ],
    sources: [
      { title: "TCNA Handbook for Ceramic, Glass, and Stone Tile Installation", publisher: "Tile Council of North America" },
      { title: "ANSI A108 / A118 / A136 American National Standard Specifications for the Installation of Ceramic Tile", publisher: "Tile Council of North America" },
      { title: "How to calculate tile for a floor", publisher: "The Home Depot" },
    ],
    related: ["grout-calculator", "thinset-calculator", "tile-layout-calculator", "tile-installation-cost-calculator", "square-footage-calculator"],
  },
  {
    slug: "grout-calculator",
    name: "Grout Calculator",
    category: "tile",
    kind: "material",
    featured: true,
    seoTitle: "Grout Calculator – How Much Grout Do I Need?",
    description:
      "Estimate pounds and bags of tile grout from area, tile size, tile thickness and joint width. Matches manufacturer coverage charts for sanded grout.",
    intro:
      "Grout needs depend on the volume of the joints, which changes dramatically with tile size and joint width: small mosaics with wide joints use many times more grout than large tiles with tight joints. This grout calculator works out the joint volume per square foot and converts it to pounds and bags of cement grout.",
    keywords: [
      "grout calculator",
      "how much grout do i need",
      "grout coverage calculator",
      "sanded grout calculator",
      "bags of grout per square foot",
    ],
    howToUse: [
      "Enter the area you are tiling.",
      "Enter the tile length, width and thickness in inches — the thickness is the depth of the grout joint.",
      "Enter the joint width you will use.",
      "Enter the bag size (sanded grout is usually 25 lb) and read the pounds and bags needed.",
    ],
    formula: {
      lines: [
        "Joint volume per sq ft (cu in) = 144 × (L + W) × joint × depth ÷ ((L + joint) × (W + joint))",
        "Grout (lb) = area × joint volume × 0.0653 lb per cu in × (1 + waste %)",
        "Bags = pounds ÷ bag size, rounded up",
      ],
      notes: [
        "The density factor (0.0653 lb of powder per cubic inch of joint) was back-calculated from a major manufacturer's published sanded-grout coverage chart and reproduces its figures to within about 1%.",
        "Unsanded, urethane and epoxy grouts have different densities; check their own coverage charts.",
      ],
    },
    example: {
      scenario: "120 sq ft of 12 × 12 in tile, 3/8 in thick, with 1/8 in joints and 25 lb bags of sanded grout.",
      inputs: { area: 120, tileLength: 12, tileWidth: 12, joint: 0.125, depth: 0.375, bagSize: 25, waste: 10 },
      expected: { lbPer100: 7.1956, bagCoverage: 347.4364, pounds: 9.4981, bags: 1 },
      steps: [
        "Joint volume = 144 × 24 × 0.125 × 0.375 ÷ (12.125 × 12.125) = 1.10 cu in per sq ft.",
        "Grout per sq ft = 1.10 × 0.0653 = 0.072 lb (7.2 lb per 100 sq ft), so one 25 lb bag covers about 347 sq ft.",
        "Grout = 120 × 0.072 × 1.10 = 9.5 lb — one 25 lb bag.",
      ],
    },
    tips: [
      "Use sanded grout for joints 1/8 in and wider and unsanded grout for joints narrower than 1/8 in, unless the manufacturer says otherwise.",
      "Mix only what you can use in about 30 minutes, and don't re-temper grout that has started to stiffen.",
      "Wait for the thinset to cure (often 24 hours) before grouting.",
      "Buy a little extra from the same batch so you have matching grout for repairs.",
      "Seal cement grout after it cures if the manufacturer recommends it; epoxy and many urethane grouts don't need sealing.",
    ],
    faqs: [
      {
        q: "How much grout do I need for 100 square feet?",
        a: "For 12 × 12 tile with 1/8 in joints, about 7–8 lb, so one 25 lb bag is enough. For 1 in mosaics with 1/16 in joints it's roughly 26 lb, and for 4 × 4 tile with 1/4 in joints about 50 lb.",
      },
      {
        q: "How far does a 25 lb bag of grout go?",
        a: "Custom Building Products' chart for Polyblend Plus sanded grout lists about 348 sq ft for 12 × 12 × 3/8 in tile with 1/8 in joints, but only about 177 sq ft at 1/4 in joints. Smaller tiles cover much less.",
      },
      {
        q: "Should I use sanded or unsanded grout?",
        a: "Sanded grout is the usual choice for joints 1/8 in and wider because the sand resists shrinking and cracking. Unsanded grout is for narrow joints and for polished stone or glass that sand could scratch.",
      },
      {
        q: "Why do small tiles need more grout?",
        a: "Small tiles have far more joint length per square foot. A square foot of 1 in mosaics has about 22 linear feet of joints; a square foot of 12 × 12 tile has about 2.",
      },
      {
        q: "What joint depth should I use?",
        a: "Use the full tile thickness. Joints should be cleaned out to the tile's full depth so the grout is fully packed and doesn't crack.",
      },
    ],
    sources: [
      { title: "Grout coverage chart (Polyblend Plus sanded grout)", publisher: "Custom Building Products" },
      { title: "TCNA Handbook for Ceramic, Glass, and Stone Tile Installation", publisher: "Tile Council of North America" },
      { title: "ANSI A118.6 / A118.7 cement grout specifications", publisher: "American National Standards Institute" },
    ],
    related: ["tile-calculator", "thinset-calculator", "mosaic-tile-calculator", "wall-tile-calculator"],
  },
  {
    slug: "wall-tile-calculator",
    name: "Wall Tile Calculator",
    category: "tile",
    kind: "material",
    featured: true,
    seoTitle: "Wall Tile Calculator – Tiles, Boxes and Trim for Walls",
    description:
      "Calculate wall tiles, boxes and bullnose or edge trim for up to four walls. Enter wall widths, tile height, tile size and openings to get a full list.",
    intro:
      "Wall tile jobs — a bathroom wainscot, a laundry room wall or a full-height feature wall — need a count of field tiles plus the trim that finishes the top and exposed edges. This wall tile calculator adds up to four walls, subtracts windows and doors, and gives you tiles, boxes and trim pieces in one go.",
    keywords: [
      "wall tile calculator",
      "how many wall tiles do i need",
      "bathroom wall tile calculator",
      "subway tile calculator",
      "bullnose trim calculator",
    ],
    howToUse: [
      "Enter the width of each wall you are tiling (use 0 for walls you skip).",
      "Enter how high the tile goes — wainscot is often 3–4 ft; full height runs to the ceiling.",
      "Enter the area of windows, doors or mirrors that won't be tiled.",
      "Enter the tile size and joint width, and the coverage per box.",
      "Choose whether the top edge needs trim and how many exposed vertical edges there are, and enter the trim piece length.",
    ],
    formula: {
      lines: [
        "Wall area = (wall 1 + wall 2 + wall 3 + wall 4) × tile height − openings",
        "Tiles = wall area × 144 ÷ ((L + joint) × (W + joint)) × (1 + waste %), rounded up",
        "Boxes = wall area × (1 + waste %) ÷ coverage per box, rounded up",
        "Trim run = top run (if trimmed) + exposed edges × height",
        "Trim pieces = trim run × 12 ÷ piece length × (1 + waste %), rounded up",
      ],
      notes: [
        "Bullnose, pencil liner and metal edge profiles are sold by the piece or by the linear foot — check what your trim comes in.",
      ],
    },
    example: {
      scenario: "Wainscot 4 ft high on an 8 ft wall and a 5 ft wall using 3 × 6 in subway tile, 1/16 in joints, 10 sq ft per box, with 12 in bullnose along the top.",
      inputs: { wall1: 8, wall2: 5, wall3: 0, wall4: 0, height: 4, openings: 0, tileLength: 6, tileWidth: 3, joint: 0.0625, boxCoverage: 10, trimTop: 1, trimEnds: 0, trimPiece: 12, waste: 10 },
      expected: { area: 52, tiles: 444, boxes: 6, trimLength: 13, trimPieces: 15 },
      steps: [
        "Wall area = (8 + 5) × 4 = 52 sq ft.",
        "Each tile plus joint covers 6.0625 × 3.0625 = 18.57 sq in, so 52 × 144 ÷ 18.57 = 403.3 tiles; with 10%, 444 tiles.",
        "Boxes = 52 × 1.10 ÷ 10 = 5.7, so 6 boxes.",
        "Trim = 13 ft = 156 in ÷ 12 in = 13 pieces; with 10%, 15 pieces.",
      ],
    },
    tips: [
      "Start the first full row on a level ledger board rather than on the floor or tub, which are rarely level.",
      "Plan the layout so cuts at corners and the top are at least half a tile where possible.",
      "In wet areas use a waterproofed backer board or a waterproofing membrane — not plain drywall.",
      "Order trim at the same time as the field tile; matching trim is often a special order with longer lead times.",
    ],
    faqs: [
      {
        q: "How many 3 × 6 subway tiles are in a square foot?",
        a: "About 7.75 tiles per sq ft with 1/16 in joints (8 without grout). A 50 sq ft wall needs about 390 tiles before waste, or about 430 with 10% extra.",
      },
      {
        q: "How high should bathroom wall tile go?",
        a: "Wainscot tile is commonly 36–48 in high. In showers, tile should cover at least the area that gets wet; many designs go to 72 in or all the way to the ceiling.",
      },
      {
        q: "Do I subtract windows and doors for wall tile?",
        a: "Yes, subtract the area of openings, but keep the full 10–15% waste allowance because you'll make extra cuts around them.",
      },
      {
        q: "How much bullnose trim do I need?",
        a: "Measure every exposed tile edge — usually the top of a wainscot plus any outside corners or ends. Divide the total inches by the trim piece length and add about 10%.",
      },
      {
        q: "Can I tile directly over drywall?",
        a: "On dry walls such as a kitchen or a powder room, tile can go on sound, primed drywall. In showers and tub surrounds, use cement backer board or foam board with waterproofing as the TCNA Handbook methods describe.",
      },
    ],
    sources: [
      { title: "TCNA Handbook for Ceramic, Glass, and Stone Tile Installation (wall methods)", publisher: "Tile Council of North America" },
      { title: "How to tile a wall", publisher: "The Home Depot" },
      { title: "Wall tile installation guides", publisher: "Daltile" },
    ],
    related: ["tile-calculator", "backsplash-tile-calculator", "shower-tile-calculator", "grout-calculator", "wall-area-calculator"],
  },
  {
    slug: "backsplash-tile-calculator",
    name: "Backsplash Tile Calculator",
    category: "tile",
    kind: "material",
    featured: true,
    seoTitle: "Backsplash Tile Calculator – Square Feet, Tiles and Boxes",
    description:
      "Figure out backsplash tile for kitchen counters: square feet, tiles and boxes for straight or L-shaped runs, the area behind the range and windows.",
    intro:
      "A kitchen backsplash is usually a narrow band between the counter and the upper cabinets, so it's easy to measure and easy to underestimate. Enter each counter run, the backsplash height, any full-height area behind the range, and subtract windows — this calculator gives you the square footage, the tile count and the boxes to buy.",
    keywords: [
      "backsplash tile calculator",
      "how much backsplash tile do i need",
      "kitchen backsplash calculator",
      "backsplash square footage",
      "subway tile backsplash calculator",
    ],
    howToUse: [
      "Measure the length of each counter run along the wall (up to three runs for an L or U kitchen).",
      "Measure the backsplash height in inches — 18 in is the usual space between counter and upper cabinets.",
      "Add any extra area, such as a full-height section behind the range hood, and subtract windows or outlets you won't tile around.",
      "Enter the tile size, joint width and box coverage, then read the tiles and boxes.",
    ],
    formula: {
      lines: [
        "Area = (run 1 + run 2 + run 3) × height ÷ 12 + extra − subtracted area",
        "Tiles = area × 144 ÷ ((L + joint) × (W + joint)) × (1 + waste %), rounded up",
        "Boxes = area × (1 + waste %) ÷ coverage per box, rounded up",
      ],
      notes: ["Small outlets and switches are cut around and are not worth subtracting; windows are."],
    },
    example: {
      scenario: "An L-shaped kitchen with 10 ft and 6 ft counter runs, an 18 in backsplash, 3 × 6 in subway tile with 1/16 in joints and 10 sq ft per box.",
      inputs: { run1: 10, run2: 6, run3: 0, height: 18, extra: 0, subtract: 0, tileLength: 6, tileWidth: 3, joint: 0.0625, boxCoverage: 10, waste: 10 },
      expected: { area: 24, buyArea: 26.4, tiles: 205, boxes: 3 },
      steps: [
        "Area = (10 + 6) × 18 ÷ 12 = 24 sq ft.",
        "Tiles = 24 × 144 ÷ (6.0625 × 3.0625) = 186.1; with 10%, 205 tiles.",
        "Buy area = 24 × 1.10 = 26.4 sq ft, so 3 boxes of 10 sq ft.",
      ],
    },
    tips: [
      "Herringbone and chevron patterns waste more tile — use 15–20% waste.",
      "Turn off power and use box extenders so outlet covers sit flush on top of the tile.",
      "Decide how you'll finish exposed ends (bullnose, a metal edge or ending at a cabinet) before you buy.",
      "Leave a small gap at the countertop and fill it with flexible caulk instead of grout to allow for movement.",
    ],
    faqs: [
      {
        q: "How many square feet is a typical kitchen backsplash?",
        a: "Most kitchens have about 25–40 sq ft of backsplash: 15–25 ft of counter run times 18 in, plus a few square feet behind the range.",
      },
      {
        q: "How much extra backsplash tile should I buy?",
        a: "Around 10% for straight subway layouts and 15–20% for herringbone, chevron or tiles with lots of cuts around windows and outlets.",
      },
      {
        q: "How tall is a standard backsplash?",
        a: "The gap between a 36 in counter and upper cabinets is usually 18 in, so that's the typical backsplash height. Areas without upper cabinets are often taken higher or to the ceiling.",
      },
      {
        q: "Should backsplash tile go behind the stove?",
        a: "Yes, usually. Many designs run the tile up to the range hood behind the cooktop; add that rectangle as extra area.",
      },
      {
        q: "Do I need grout for a backsplash?",
        a: "Yes. Most backsplash tiles use unsanded or fine sanded grout in 1/16–1/8 in joints. Use caulk, not grout, where the tile meets the countertop and inside corners.",
      },
    ],
    sources: [
      { title: "How to install a tile backsplash", publisher: "The Home Depot" },
      { title: "TCNA Handbook for Ceramic, Glass, and Stone Tile Installation", publisher: "Tile Council of North America" },
      { title: "Kitchen planning guidelines", publisher: "National Kitchen & Bath Association" },
    ],
    related: ["wall-tile-calculator", "tile-calculator", "grout-calculator", "kitchen-remodel-cost-calculator"],
  },
  {
    slug: "thinset-calculator",
    name: "Thinset Calculator",
    category: "tile",
    kind: "material",
    seoTitle: "Thinset Calculator – How Much Thinset Mortar Do I Need?",
    description:
      "Estimate pounds and 50 lb bags of thinset mortar from tile area and trowel notch size, with an allowance for back-buttering large-format tile.",
    intro:
      "Thinset coverage depends mostly on the trowel: a bigger notch leaves a thicker bed and uses more mortar. This thinset calculator uses typical coverage for common square-notch trowels, lets you enter the figure from your bag instead, and adds an allowance for back-buttering large tiles.",
    keywords: [
      "thinset calculator",
      "how much thinset do i need",
      "thinset coverage",
      "mortar for tile calculator",
      "trowel size coverage",
    ],
    howToUse: [
      "Enter the area you're tiling.",
      "Choose the trowel notch. Small tiles use a 1/4 × 1/4 in notch; 12 in tiles a 1/4 × 3/8 in or 1/2 × 1/2 in notch; large-format tiles often a 1/2 × 1/2 in notch. Or enter the coverage from your bag.",
      "If you'll back-butter every tile, add an allowance (about 25% is reasonable).",
      "Read the pounds and bags of thinset.",
    ],
    formula: {
      lines: [
        "Thinset per sq ft (lb) = 50 ÷ coverage per 50 lb bag",
        "Thinset (lb) = area × lb per sq ft × (1 + back-butter %) × (1 + waste %)",
        "Bags = pounds ÷ bag size, rounded up",
      ],
      notes: [
        "Coverage per 50 lb bag: about 85 sq ft with a 1/4 × 1/4 in square notch and 60 sq ft with a 1/4 × 3/8 in square notch (typical manufacturer figures). The 1/2 × 1/2 in figure (about 42 sq ft) is estimated from notch volume — always check your bag's chart.",
        "Real coverage varies with the substrate, tile back profile and how much mortar is scraped off.",
      ],
    },
    example: {
      scenario: "120 sq ft of 12 × 12 tile set with a 1/4 × 3/8 in square-notch trowel, no back-buttering, 50 lb bags.",
      inputs: { area: 120, trowel: 60, backButter: 0, bagSize: 50, waste: 10 },
      expected: { lbPerSqFt: 0.8333, pounds: 110, bags: 3 },
      steps: [
        "Thinset per sq ft = 50 ÷ 60 = 0.83 lb.",
        "Thinset = 120 × 0.83 × 1.10 = 110 lb.",
        "Bags = 110 ÷ 50 = 2.2, so buy 3 bags.",
      ],
    },
    tips: [
      "Pull a tile up now and then to check coverage: industry standards call for at least 80% mortar contact in dry interior areas and 95% in wet or exterior areas.",
      "Use a modified thinset meeting ANSI A118.4 or A118.15 for most porcelain, and a large-and-heavy-tile (LHT) mortar for big tiles.",
      "Mix with the amount of water on the bag, let it slake for the stated time, then remix — don't add water later.",
      "Comb the ridges in one straight direction, then press the tile across the ridges to collapse them.",
    ],
    faqs: [
      {
        q: "How much does a 50 lb bag of thinset cover?",
        a: "Roughly 85–95 sq ft with a 1/4 × 1/4 in square notch and 60–67 sq ft with a 1/4 × 3/8 in square notch, according to typical manufacturer charts. Larger notches cover less.",
      },
      {
        q: "What size trowel should I use for 12 × 24 tile?",
        a: "Large-format tiles commonly need a 1/2 × 1/2 in square notch or a specialized large-tile trowel, often with back-buttering. Choose the notch that achieves the required coverage when you lift a test tile.",
      },
      {
        q: "Should I back-butter tile?",
        a: "Back-buttering (a thin skim coat on the back of the tile) helps achieve full coverage with large-format, natural stone and textured-back tiles. It adds roughly 20–30% to mortar use.",
      },
      {
        q: "What is the minimum thinset coverage?",
        a: "ANSI A108.5 and the TCNA Handbook call for at least 80% contact in dry interior areas and 95% in wet areas such as showers, and for exterior installations, with edges and corners fully supported.",
      },
      {
        q: "Modified or unmodified thinset?",
        a: "Most porcelain and ceramic installations use a polymer-modified thinset. Some membranes require unmodified thinset — follow the membrane manufacturer's instructions.",
      },
    ],
    sources: [
      { title: "Mortar coverage charts (PremiumPlus, VersaBond and others)", publisher: "Custom Building Products" },
      { title: "Ultraflex 2 technical data sheet", publisher: "MAPEI" },
      { title: "ANSI A108.5 — setting tile with dry-set or modified mortar", publisher: "Tile Council of North America" },
    ],
    related: ["tile-calculator", "grout-calculator", "floor-leveling-compound-calculator", "shower-tile-calculator"],
  },
  {
    slug: "mosaic-tile-calculator",
    name: "Mosaic Tile Calculator",
    category: "tile",
    kind: "material",
    seoTitle: "Mosaic Tile Calculator – Sheets, Boxes and Grout",
    description:
      "Calculate mosaic tile sheets and boxes for floors, shower pans and backsplashes, plus the extra grout that small mosaic tiles need.",
    intro:
      "Mosaic tile is sold in mesh-backed sheets, usually about 12 × 12 in, and small chips use far more grout than regular tile. This mosaic tile calculator tells you how many sheets and boxes to buy for your area and estimates the grout from the chip size and joint width.",
    keywords: [
      "mosaic tile calculator",
      "how many mosaic sheets do i need",
      "mosaic tile sheets per square foot",
      "penny tile calculator",
      "mosaic grout calculator",
    ],
    howToUse: [
      "Measure the area's length and width.",
      "Measure an actual sheet including the joint to its neighbor — 12 × 12 in sheets are often 11.75–12 in.",
      "Enter sheets per box from the carton.",
      "Enter the chip size, joint width and tile thickness for the grout estimate.",
      "Read the sheets, boxes and pounds of grout.",
    ],
    formula: {
      lines: [
        "Sheets = area × 144 ÷ (sheet length × sheet width) × (1 + waste %), rounded up",
        "Boxes = sheets ÷ sheets per box, rounded up",
        "Grout (lb) = area × 144 × 2 × chip × joint × depth ÷ (chip + joint)² × 0.0653 × (1 + waste %)",
      ],
      notes: [
        "The grout estimate treats chips as squares; hexagon and penny rounds use somewhat more grout, so round up generously.",
        "0.0653 lb per cubic inch of joint is the same sanded-grout density used in the grout calculator.",
      ],
    },
    example: {
      scenario: "A 6 × 5 ft shower floor in 1 in square mosaics on 12 × 12 in sheets, 10 sheets per box, 1/16 in joints and 1/4 in thick tile.",
      inputs: { length: 6, width: 5, sheetLength: 12, sheetWidth: 12, sheetsPerBox: 10, chipSize: 1, joint: 0.0625, depth: 0.25, waste: 10 },
      expected: { area: 30, sheets: 33, boxes: 4, groutLb: 8.5898 },
      steps: [
        "Area = 6 × 5 = 30 sq ft; each sheet covers 1 sq ft, so 30 sheets; with 10%, 33 sheets.",
        "Boxes = 33 ÷ 10 = 3.3, so 4 boxes.",
        "Grout volume = 144 × 2 × 1 × 0.0625 × 0.25 ÷ 1.0625² = 3.99 cu in per sq ft.",
        "Grout = 30 × 3.99 × 0.0653 × 1.10 = 8.6 lb.",
      ],
    },
    tips: [
      "Use a smaller notch trowel (often 3/16 in V-notch or 1/4 × 1/4 in square) so thinset doesn't squeeze up between chips.",
      "Stagger sheet edges or blend sheets from different boxes so sheet outlines don't show as a grid.",
      "Small mosaics are ideal for sloped shower floors because they follow the slope to the drain.",
      "Cut sheets along the mesh with a utility knife before cutting individual chips.",
    ],
    faqs: [
      {
        q: "How many mosaic sheets do I need per square foot?",
        a: "One standard 12 × 12 in sheet covers about 1 sq ft. Many sheets are slightly smaller (e.g. 11.75 in), so measure one and enter its size; a 30 sq ft area then needs about 31 sheets before waste.",
      },
      {
        q: "How much grout do mosaics need?",
        a: "Much more than large tile. 1 × 1 in mosaics with 1/16 in joints use roughly 25–30 lb of grout per 100 sq ft, compared with about 7 lb for 12 × 12 tile with 1/8 in joints.",
      },
      {
        q: "How much extra mosaic tile should I buy?",
        a: "About 10% for simple areas, 15% for shower floors with drains, curbs and niches.",
      },
      {
        q: "What grout should I use for glass mosaics?",
        a: "Use unsanded or a grout approved for glass, because sand can scratch glass. Many installers use epoxy or urethane grout on glass for stain resistance.",
      },
      {
        q: "Can I use mosaic tile on a shower floor?",
        a: "Yes, and it's common. Small tiles follow the slope to the drain and the many grout lines add slip resistance. Make sure the tile is rated for wet floors.",
      },
    ],
    sources: [
      { title: "Grout coverage chart", publisher: "Custom Building Products" },
      { title: "TCNA Handbook for Ceramic, Glass, and Stone Tile Installation", publisher: "Tile Council of North America" },
      { title: "Mosaic installation guides", publisher: "Daltile" },
    ],
    related: ["grout-calculator", "shower-tile-calculator", "tile-calculator", "backsplash-tile-calculator"],
  },
  {
    slug: "shower-tile-calculator",
    name: "Shower Tile Calculator",
    category: "tile",
    kind: "material",
    seoTitle: "Shower Tile Calculator – Walls, Floor, Niches and Boxes",
    description:
      "Estimate shower tile for alcove, corner or tub surround walls and shower floors, including niches. Get wall tiles, boxes and floor tile area to buy.",
    intro:
      "A shower is the most cut-heavy area in most tile jobs: valve openings, niches, corners and a sloped floor. Choose an alcove shower, a corner shower or a tub surround, enter the dimensions and tile size, and this calculator works out the wall area, the tiles and boxes for the walls, and the floor tile to buy.",
    keywords: [
      "shower tile calculator",
      "how much tile for a shower",
      "tub surround tile calculator",
      "shower wall tile square feet",
      "shower niche tile",
    ],
    howToUse: [
      "Choose the shower type: alcove (back wall plus two sides), corner (two walls) or tub surround (three walls, no floor).",
      "Enter the back wall width, the side wall depth and the tile height (from the floor, or from the tub rim).",
      "Enter the number of recessed niches.",
      "Enter the wall tile size, joint and box coverage. Use 15% waste for showers.",
      "Read the wall tiles and boxes plus the floor area to buy in a floor or mosaic tile.",
    ],
    formula: {
      lines: [
        "Wall area = width × height + sides × depth × height + niches × 1.75 sq ft",
        "Wall tiles = wall area × 144 ÷ ((L + joint) × (W + joint)) × (1 + waste %), rounded up",
        "Floor area = width × depth (none for a tub surround)",
        "Floor tile to buy = floor area × (1 + waste %)",
      ],
      notes: [
        "Each 12 × 24 in niche, 3.5 in deep, adds about 1.75 sq ft of inside surface (the back of the niche replaces the wall tile that was there).",
        "Doors and glass panels are not subtracted; curbs and benches should be added as extra area.",
      ],
    },
    example: {
      scenario: "A 5 × 3 ft alcove shower tiled 8 ft high with one niche, 12 × 24 in wall tile, 1/8 in joints, 16 sq ft per box and 15% waste.",
      inputs: { type: 0, width: 5, depth: 3, height: 8, niches: 1, tileLength: 24, tileWidth: 12, joint: 0.125, boxCoverage: 16, waste: 15 },
      expected: { wallArea: 89.75, tiles: 51, boxes: 7, floorArea: 15, floorBuy: 17.25 },
      steps: [
        "Walls = 5 × 8 + 2 × 3 × 8 + 1.75 = 89.75 sq ft.",
        "Tiles = 89.75 × 144 ÷ (24.125 × 12.125) = 44.2; with 15%, 51 tiles.",
        "Boxes = 89.75 × 1.15 ÷ 16 = 6.5, so 7 boxes.",
        "Floor = 5 × 3 = 15 sq ft; with 15%, buy 17.25 sq ft of floor tile.",
      ],
    },
    tips: [
      "Waterproof the walls and floor (sheet or liquid membrane, or a foam board system) before tiling — tile and grout are not waterproof.",
      "Plan the niche height and position so its edges land on grout lines.",
      "Use small tiles (2 × 2 in or mosaics) on the floor so they follow the slope to the drain.",
      "Use 100% silicone or a color-matched sealant in inside corners and changes of plane, not grout.",
      "For thinset in wet areas, aim for at least 95% coverage on the back of every tile.",
    ],
    faqs: [
      {
        q: "How many square feet of tile is in a standard shower?",
        a: "A 5 × 3 ft alcove shower tiled to 8 ft has about 88 sq ft of wall plus 15 sq ft of floor. A 5 ft tub surround tiled 6 ft above the tub (60 × 30 in tub) has about 60 sq ft.",
      },
      {
        q: "How much extra tile should I buy for a shower?",
        a: "About 15% is typical because of the many cuts at the valve, niche, corners and ceiling. Large-format tiles or complex patterns may need 20%.",
      },
      {
        q: "How high should shower tile go?",
        a: "At least to the showerhead height; many installers tile to about 7 ft or to the ceiling. Building codes require a nonabsorbent wall surface above the drain to a minimum height — commonly 72 in — so check your local code.",
      },
      {
        q: "What tile is best for a shower floor?",
        a: "Small tiles with lots of grout lines, such as 2 × 2 in or mosaics, follow the slope and resist slipping. Look for tiles rated for wet floors.",
      },
      {
        q: "Do I need a different tile for the shower floor?",
        a: "Often, yes. Large wall tiles can't follow the slope of a standard shower floor, so most showers use a smaller floor tile. Linear-drain floors can use larger tiles.",
      },
    ],
    sources: [
      { title: "TCNA Handbook for Ceramic, Glass, and Stone Tile Installation (shower methods)", publisher: "Tile Council of North America" },
      { title: "International Residential Code — shower and tub wall finishes", publisher: "International Code Council" },
      { title: "Shower waterproofing system installation handbook", publisher: "Schluter Systems" },
    ],
    related: ["wall-tile-calculator", "mosaic-tile-calculator", "bathroom-tile-estimator", "thinset-calculator", "bathroom-remodel-cost-calculator"],
  },
  {
    slug: "tile-layout-calculator",
    name: "Tile Layout Calculator",
    category: "tile",
    kind: "planning",
    seoTitle: "Tile Layout Calculator – Plan Cuts and Avoid Thin Slivers",
    description:
      "Plan a tile layout: see the edge cut sizes for a centered or wall-start layout, how many tiles fit each way, and how to avoid slivers at the walls.",
    intro:
      "Nothing looks worse than a thin sliver of tile along a wall or at a doorway. This tile layout calculator shows the size of the cut pieces at each wall for your room and tile size. In centered mode it compares putting a tile on the center line versus a grout line on the center line and picks the one with bigger edge cuts.",
    keywords: [
      "tile layout calculator",
      "tile layout planner",
      "how to center tile in a room",
      "tile cut calculator",
      "avoid small tile cuts",
    ],
    howToUse: [
      "Measure the room's length and width wall to wall.",
      "Enter the tile size (length along the room's length) and the joint width.",
      "Choose a centered layout or a layout that starts with a full tile at one wall.",
      "Read the smallest edge cut. If it's under about a third of a tile, try the other centering option shown, or shift the layout.",
    ],
    formula: {
      lines: [
        "Module = tile size + joint",
        "Tile on center: remaining = dimension ÷ 2 − tile ÷ 2 − joint; edge cut = remaining − whole modules",
        "Grout line on center: remaining = dimension ÷ 2 − joint ÷ 2; edge cut = remaining − whole modules",
        "Wall start: edge cut = dimension − whole modules",
      ],
      notes: [
        "Centered layouts give equal cuts on opposite walls. The calculator picks whichever option gives the larger cut.",
        "Cuts are measured to the wall; subtract the perimeter expansion gap (typically about 1/4 in) required by the tile and setting materials.",
      ],
    },
    example: {
      scenario: "A 13 × 10.5 ft room with 12 × 12 in tile and 1/8 in joints, centered layout.",
      inputs: { length: 13, width: 10.5, tileLength: 12, tileWidth: 12, joint: 0.125, start: 0 },
      expected: { lengthTileCentred: 11.25, lengthGroutCentred: 5.1875, lengthCut: 11.25, widthTileCentred: 8.375, widthGroutCentred: 2.3125, widthCut: 8.375, smallestCut: 8.375, tilesAlongLength: 13, tilesAlongWidth: 11, totalTiles: 143 },
      steps: [
        "Length 156 in, half = 78 in. Tile on center: 78 − 6 − 0.125 = 71.875 in; 5 modules of 12.125 in = 60.625 in, so the cut is 11.25 in.",
        "Grout line on center: 77.9375 − 6 × 12.125 = 5.19 in — smaller, so a tile goes on the center line.",
        "Width 126 in, half = 63 in. Tile on center gives 8.375 in cuts; grout on center gives only 2.31 in, so again a tile goes on center.",
        "Tiles: 1 + 2 × 5 + 2 = 13 along the length and 1 + 2 × 4 + 2 = 11 along the width.",
      ],
    },
    tips: [
      "Snap chalk lines on the center lines and dry-lay a row each way before mixing thinset.",
      "Favor full tiles at the most visible edge — usually the doorway or the wall opposite the entry.",
      "Rooms are rarely square; measure at both ends and check the diagonal before committing to a layout.",
      "With rectangular tiles in an offset pattern, limit the offset to one-third for tiles over 18 in long to reduce lippage from tile warpage.",
    ],
    faqs: [
      {
        q: "Should I start tiling in the center of the room?",
        a: "Usually, yes. Starting from the center gives equal cuts on opposite walls so the floor looks balanced. In a small room where one wall is fully visible, starting with a full tile at that wall can look better.",
      },
      {
        q: "What is the smallest acceptable tile cut?",
        a: "Many tile setters aim for edge cuts of at least half a tile and avoid anything under about a third. Small slivers are hard to cut, break easily and draw the eye.",
      },
      {
        q: "How do I avoid a thin strip of tile at the wall?",
        a: "Switch between putting a tile on the center line and a grout line on the center line — this shifts the cuts by half a tile. The calculator shows both options.",
      },
      {
        q: "Do I need a gap between tile and wall?",
        a: "Yes. The TCNA Handbook calls for movement joints at the perimeter and changes of plane, typically about 1/4 in, which baseboard or trim covers. Subtract it from the cut sizes shown here.",
      },
      {
        q: "How do I lay out tile in an L-shaped room?",
        a: "Pick the most visible section and center the layout there, then extend the same lines into the rest of the room so grout lines stay continuous.",
      },
    ],
    sources: [
      { title: "TCNA Handbook for Ceramic, Glass, and Stone Tile Installation — movement joints (EJ171)", publisher: "Tile Council of North America" },
      { title: "ANSI A108.02 — general requirements for tile installation", publisher: "Tile Council of North America" },
      { title: "How to lay out a tile floor", publisher: "This Old House" },
    ],
    related: ["tile-calculator", "grout-calculator", "room-area-calculator", "flooring-calculator"],
  },
  {
    slug: "tile-installation-cost-calculator",
    name: "Tile Installation Cost Calculator",
    category: "tile",
    kind: "cost",
    seoTitle: "Tile Installation Cost Calculator – Price per Square Foot",
    description:
      "Estimate the cost to install tile: tile, labor, thinset and grout, backer board and old floor removal. Edit every price to see your total per sq ft.",
    intro:
      "Tile installation costs are a combination of the tile itself, the installer's labor, setting materials, underlayment and any demolition. This calculator adds them up per square foot with editable prices so you can build a budget or check a contractor's quote line by line.",
    keywords: [
      "tile installation cost calculator",
      "cost to install tile per square foot",
      "tile labor cost",
      "floor tile installation cost",
      "how much does tiling cost",
    ],
    howToUse: [
      "Enter the area to tile.",
      "Enter the tile price per square foot and the installer's labor rate.",
      "Enter the cost of setting materials, backer board or membrane, and removing the old floor (use 0 for anything that doesn't apply).",
      "Set the tile waste allowance and read the total and the cost per square foot.",
    ],
    formula: {
      lines: [
        "Tile cost = area × (1 + waste %) × tile price",
        "Labor = area × labor price",
        "Other = area × (setting materials + backer + removal)",
        "Total = tile + labor + other; cost per sq ft = total ÷ area",
      ],
      notes: [
        "Waste is applied only to the tile, because labor and materials are priced on the installed area.",
        "Contractors may charge minimums for small jobs and extra for patterns, large-format tile, stairs and leveling.",
      ],
    },
    example: {
      scenario: "100 sq ft of floor with $4/sq ft porcelain, $10/sq ft labor, $1.50/sq ft for thinset and grout, no new backer, $2/sq ft to remove old flooring, 10% tile waste.",
      inputs: { area: 100, tilePrice: 4, laborPrice: 10, settingPrice: 1.5, backerPrice: 0, demoPrice: 2, waste: 10 },
      expected: { tileCost: 440, laborCost: 1000, otherCost: 350, total: 1790, perSqFt: 17.9 },
      steps: [
        "Tile = 100 × 1.10 × $4 = $440.",
        "Labor = 100 × $10 = $1,000.",
        "Other = 100 × ($1.50 + $0 + $2) = $350.",
        "Total = $440 + $1,000 + $350 = $1,790, or $17.90 per sq ft.",
      ],
    },
    tips: [
      "Get at least three written quotes that list substrate prep, waterproofing, trim and baseboard work.",
      "Floor leveling and subfloor repairs are the most common surprise costs; ask how they will be priced.",
      "Large-format tile, herringbone and diagonal layouts typically cost more in labor and waste.",
      "Buying the tile yourself can save money, but confirm that the installer will warranty work with owner-supplied materials.",
    ],
    faqs: [
      {
        q: "How much does it cost to install tile per square foot?",
        a: "In the US, tile installation labor typically runs about $5–$15 per sq ft, and the total installed cost for common ceramic or porcelain is often around $10–$30 per sq ft including tile and materials. Prices vary by region and project complexity.",
      },
      {
        q: "Why is wall or shower tile more expensive to install?",
        a: "Walls and showers need waterproofing, more cuts, niches and trim, and setting tile on a vertical surface is slower. Expect a higher per-square-foot labor rate than for open floors.",
      },
      {
        q: "Is it cheaper to install tile yourself?",
        a: "You save the labor, which is often more than half of the cost, but you'll need a wet saw, trowels, a mixer and time. Mistakes in prep and waterproofing can be costly to fix later.",
      },
      {
        q: "Does tile cost include removing the old floor?",
        a: "Not always. Removal of old tile is labor-intensive and is often priced separately, commonly a few dollars per square foot plus disposal.",
      },
      {
        q: "Do I need backer board under floor tile?",
        a: "Over a wood subfloor, tile needs cement backer board or an uncoupling membrane, as described in the TCNA Handbook. Over sound concrete, it can often go directly on the slab.",
      },
    ],
    sources: [
      { title: "How much does tile installation cost?", publisher: "This Old House" },
      { title: "TCNA Handbook for Ceramic, Glass, and Stone Tile Installation", publisher: "Tile Council of North America" },
      { title: "Tile installation services pricing", publisher: "The Home Depot" },
    ],
    related: ["tile-calculator", "flooring-installation-cost-calculator", "bathroom-remodel-cost-calculator", "contractor-markup-calculator"],
    cost: {
      priceRange: "Labor typically $5–$15 per sq ft; about $10–$30 per sq ft installed for common ceramic or porcelain",
      assumptions: [
        "Typical US prices that vary by region, tile type and job complexity — edit every price above.",
        "Waste is added to the tile quantity only.",
        "Subfloor repair, leveling, plumbing, trim and baseboards are not included unless you add them.",
      ],
      updated: "2026-10-28",
    },
  },
  {
    slug: "bathroom-tile-estimator",
    name: "Bathroom Tile Estimator",
    category: "tile",
    kind: "material",
    seoTitle: "Bathroom Tile Estimator – Floor and Wall Tile for a Bathroom",
    description:
      "Estimate all the tile for a bathroom in one go: floor tile around the tub or shower, the tub surround or shower walls and wainscot, with boxes for each.",
    intro:
      "A bathroom usually uses two different tiles: one on the floor and one on the walls around the tub or shower. This bathroom tile estimator handles both together. It subtracts the tub or shower footprint from the floor, adds the surround and any wainscot, and gives separate tile and box counts for the floor and wall tile.",
    keywords: [
      "bathroom tile estimator",
      "how much tile for a bathroom",
      "bathroom tile calculator",
      "bathroom floor and wall tile",
      "tub surround tile calculator",
    ],
    howToUse: [
      "Enter the bathroom's length and width.",
      "Choose the tub or shower type and enter its width, depth and the height of the tiled surround.",
      "If you are adding wainscot outside the shower, enter its length and height.",
      "Enter the floor and wall tile sizes, the joint and coverage per box for each.",
      "Read the floor and wall tiles and boxes, plus the total tile area to buy.",
    ],
    formula: {
      lines: [
        "Floor area = room length × width − tub/shower footprint",
        "Surround area = (shower width + 2 × depth) × surround height",
        "Wall area = surround + wainscot run × wainscot height",
        "Tiles = area × 144 ÷ ((L + joint) × (W + joint)) × (1 + waste %), rounded up (floor and wall separately)",
        "Total to buy = (floor area + wall area) × (1 + waste %)",
      ],
      notes: [
        "For an alcove shower, the shower floor is not included — use the shower tile or mosaic calculator for it.",
        "Floor area under a vanity is included; subtract it if the vanity is installed first.",
      ],
    },
    example: {
      scenario: "An 8 × 5 ft bathroom with a 60 × 30 in tub tiled 6 ft high, 10 ft of 3 ft wainscot, 12 × 12 floor tile, 3 × 6 wall tile, 1/8 in joints, 10 sq ft per box.",
      inputs: { length: 8, width: 5, showerType: 1, showerWidth: 5, showerDepth: 2.5, showerHeight: 6, wainscotRun: 10, wainscotHeight: 3, floorTileLength: 12, floorTileWidth: 12, wallTileLength: 6, wallTileWidth: 3, joint: 0.125, floorBox: 10, wallBox: 10, waste: 10 },
      expected: { floorArea: 27.5, wallArea: 90, floorTiles: 30, floorBoxes: 4, wallTiles: 745, wallBoxes: 10, totalBuy: 129.25 },
      steps: [
        "Floor = 8 × 5 − 5 × 2.5 = 27.5 sq ft.",
        "Surround = (5 + 2 × 2.5) × 6 = 60 sq ft; wainscot = 10 × 3 = 30 sq ft; walls = 90 sq ft.",
        "Floor tiles = 27.5 × 144 ÷ 147.0 × 1.10 = 29.6, so 30 tiles in 4 boxes (30.25 ÷ 10).",
        "Wall tiles = 90 × 144 ÷ (6.125 × 3.125) × 1.10 = 744.8, so 745 tiles in 10 boxes (99 ÷ 10).",
        "Total to buy = 117.5 × 1.10 = 129.25 sq ft.",
      ],
    },
    tips: [
      "Use a floor tile with a slip-resistance rating suitable for wet interior floors.",
      "Waterproof the tub surround or shower walls before tiling; tile and grout alone don't stop water.",
      "Keep spare tiles from both the floor and wall lots for future repairs around plumbing.",
      "Decide on trim (bullnose or metal edge) for the wainscot top and surround edges before ordering.",
    ],
    faqs: [
      {
        q: "How much tile do I need for a 5 × 8 bathroom?",
        a: "A 5 × 8 bathroom with a standard 60 × 30 in tub has about 27.5 sq ft of floor. A tub surround tiled 6 ft high adds about 60 sq ft of wall. With 10% waste, buy about 30 sq ft of floor tile and 66 sq ft of wall tile.",
      },
      {
        q: "Should the bathroom floor and wall tile be different?",
        a: "They often are. Floor tile must be rated for floor use and have suitable slip resistance; wall tile can be thinner, glossier and lighter. Using the same porcelain on both is also common.",
      },
      {
        q: "How high should a tub surround be tiled?",
        a: "Typically 5–6 ft above the tub rim, or to the ceiling. Codes require a nonabsorbent surface above the tub to at least a minimum height (commonly 6 ft above the floor when a showerhead is installed) — check your local code.",
      },
      {
        q: "Do I tile under the vanity and toilet?",
        a: "Tile goes under the toilet. Under a vanity it depends on the order of work — many installers tile the whole floor so a future vanity of a different size still fits.",
      },
      {
        q: "How much does it cost to tile a small bathroom?",
        a: "Material plus labor for 100 sq ft of floor and wall tile commonly runs a few thousand dollars, depending on tile choice and waterproofing. Use the tile installation cost calculator with local prices.",
      },
    ],
    sources: [
      { title: "TCNA Handbook for Ceramic, Glass, and Stone Tile Installation", publisher: "Tile Council of North America" },
      { title: "International Residential Code — bathtub and shower spaces", publisher: "International Code Council" },
      { title: "Bathroom planning guidelines", publisher: "National Kitchen & Bath Association" },
    ],
    related: ["shower-tile-calculator", "tile-calculator", "wall-tile-calculator", "bathroom-remodel-cost-calculator", "tile-installation-cost-calculator"],
  },
];
