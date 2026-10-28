import type { CalculatorContent } from "../types";

const UPDATED = "2026-10-28";
const REGION_NOTE = "Prices are typical US ranges and vary by region, season, site access and contractor — replace the defaults with your local quotes.";

export const content: CalculatorContent[] = [
  {
    slug: "fence-cost-calculator",
    name: "Fence Cost Calculator",
    category: "cost-budgeting",
    kind: "cost",
    featured: false,
    seoTitle: "Fence Cost Calculator – Wood, Vinyl, Chain Link and Aluminum",
    description:
      "Free fence cost calculator: estimate the installed cost of a wood, vinyl, chain link or aluminum fence, including gates, old fence removal and permits.",
    intro:
      "Fence quotes are usually priced per linear foot, plus extra for gates, removal of an old fence and permits. Enter your fence length and type, adjust the typical installed prices to match your local quotes, and this calculator builds a complete budget with a contingency for surprises like rocky soil.",
    keywords: [
      "fence cost calculator",
      "fence installation cost",
      "cost of fence per foot",
      "wood privacy fence cost",
      "vinyl fence cost",
      "chain link fence cost",
    ],
    howToUse: [
      "Measure the total fence line in feet (or metres), not including gate openings if your installer prices gates separately.",
      "Choose the fence type and adjust the installed price per foot to match local quotes.",
      "Enter the number of gates and a price per gate.",
      "Choose whether an old fence must be removed, and add permit or survey fees.",
      "Keep a 10% contingency and read the total and the all-in cost per foot.",
    ],
    formula: {
      lines: [
        "Fence = length × installed price per foot",
        "Removal = length × removal price per foot (if removing an old fence)",
        "Total = (fence + gates × gate price + removal + fees) × (1 + contingency %)",
      ],
      notes: [
        "Default installed prices: wood privacy $35/ft, vinyl privacy $45/ft, 4 ft chain link $22/ft, aluminum $45/ft. They are typical US figures and vary by region and height.",
      ],
    },
    example: {
      scenario: "150 ft of 6 ft wood privacy fence with one walk gate, replacing an old fence, with $200 in fees and a 10% contingency.",
      inputs: { length: 150, material: 0, woodPrice: 35, gates: 1, gatePrice: 500, remove: 1, removalPrice: 5, fees: 200, contingency: 10 },
      expected: { fence: 5250, gatesCost: 500, removal: 750, contingencyAmount: 670, total: 7370, perFoot: 49.13 },
      steps: [
        "Fence = 150 × $35 = $5,250.",
        "Gate = $500; removal = 150 × $5 = $750; fees = $200. Subtotal = $6,700.",
        "Contingency = 10% × $6,700 = $670.",
        "Total = $7,370, or about $49 per foot all-in.",
      ],
    },
    tips: [
      "Call 811 before any digging so buried utility lines are marked — it is free and required in most states.",
      "Confirm your property line (a survey if in doubt) and check HOA and local rules on height, style and setbacks before ordering.",
      "Fence prices climb with height; a 6 ft fence typically costs noticeably more per foot than a 4 ft one.",
      "Ask whether quotes include post concrete, hardware, removal and haul-away, so you are comparing like with like.",
    ],
    faqs: [
      {
        q: "How much does a fence cost per linear foot?",
        a: "Typical installed US ranges are roughly $25–$50 per ft for a 6 ft wood privacy fence, $30–$60 for vinyl, $15–$35 for 4 ft chain link and $30–$65 for aluminum. Your region, soil, terrain and height all move the price.",
      },
      {
        q: "How much does it cost to fence in a backyard?",
        a: "Multiply the fence length by the per-foot price and add gates. A 150 ft wood privacy fence at $35/ft is about $5,250 before gates, removal and fees — roughly $6,500–$7,500 all-in.",
      },
      {
        q: "What is the cheapest type of fence?",
        a: "Chain link is generally the least expensive installed option, followed by basic pressure-treated wood. Vinyl and aluminum cost more upfront but need little maintenance.",
      },
      {
        q: "Do I need a permit to build a fence?",
        a: "Many towns require a permit or zoning approval, especially for fences over a certain height (often 6 ft in back yards and lower in front yards) or near pools. Check with your local building department and HOA.",
      },
      {
        q: "How much does a fence gate cost?",
        a: "A standard 3–4 ft walk gate commonly adds roughly $250–$1,000 installed, depending on material and hardware. Wide double drive gates and automated gates cost considerably more.",
      },
    ],
    sources: [
      { title: "Call 811 before you dig", publisher: "Common Ground Alliance", url: "https://call811.com" },
      { title: "Residential fence regulations", publisher: "Local building and zoning departments (example: International Residential Code adoptions)" },
      { title: "Fence installation cost guides", publisher: "American Fence Association" },
    ],
    related: ["fence-calculator", "fence-stain-calculator", "post-hole-calculator", "deck-cost-calculator", "contractor-markup-calculator"],
    cost: {
      priceRange: "about $15–$65 per linear foot installed depending on material, plus $250–$1,000+ per gate",
      assumptions: [
        "Per-foot prices are installed (posts, rails, panels or pickets, concrete, hardware and labor) on fairly level, diggable ground.",
        "Wood and vinyl prices assume a 6 ft privacy fence; chain link assumes 4 ft galvanized; aluminum assumes a 4–5 ft ornamental style.",
        "Removal covers tearing out and hauling away an old fence of similar length.",
        "Slopes, rock, tree roots and long gate spans increase labor and are not included.",
        REGION_NOTE,
      ],
      updated: UPDATED,
    },
  },
  {
    slug: "deck-cost-calculator",
    name: "Deck Cost Calculator",
    category: "cost-budgeting",
    kind: "cost",
    featured: false,
    seoTitle: "Deck Cost Calculator – Wood vs Composite Deck Price Estimate",
    description:
      "Free deck cost calculator: estimate a new deck in pressure-treated wood, cedar, composite or PVC, with railings, stairs, permits and removal of an old deck.",
    intro:
      "A deck's price depends mostly on its size and decking material, but railings, stairs, permits and removing the old deck add up fast. Enter your deck size and options, adjust the typical installed prices to match local quotes, and this calculator shows the total and the all-in cost per square foot.",
    keywords: [
      "deck cost calculator",
      "cost to build a deck",
      "composite deck cost",
      "deck cost per square foot",
      "pressure treated deck cost",
      "deck estimate",
    ],
    howToUse: [
      "Enter the deck's length along the house and its depth out into the yard.",
      "Choose the decking material and check the installed price per square foot (it covers footings, framing, decking and labor).",
      "Enter the railing length on open sides and the price per foot for your railing style.",
      "Enter the number of stair steps, plus any old deck removal and permit costs.",
      "Keep a 10% contingency and read the total and cost per square foot.",
    ],
    formula: {
      lines: [
        "Deck = length × depth × price per sq ft (by material)",
        "Railings = railing length × price per ft;  stairs = steps × price per step",
        "Total = (deck + railings + stairs + removal + permit) × (1 + contingency %)",
      ],
      notes: [
        "Default deck prices: pressure-treated $35, cedar/redwood $45, composite $60, PVC $70 per sq ft built — typical US figures for a simple, low, attached deck.",
        "Second-story decks, complex shapes, built-in benches, lighting and covered roofs cost more.",
      ],
    },
    example: {
      scenario: "A 16 × 12 ft composite deck with 36 ft of railing, 3 stair steps and a $300 permit, with a 10% contingency.",
      inputs: { length: 16, width: 12, material: 2, compositePrice: 60, railing: 36, railingPrice: 50, steps: 3, stepPrice: 200, removal: 0, permit: 300, contingency: 10 },
      expected: { area: 192, deck: 11520, railingCost: 1800, stairs: 600, contingencyAmount: 1422, total: 15642, perSqFt: 81.47 },
      steps: [
        "Area = 16 × 12 = 192 sq ft; deck = 192 × $60 = $11,520.",
        "Railings = 36 × $50 = $1,800; stairs = 3 × $200 = $600; permit = $300. Subtotal = $14,220.",
        "Contingency = 10% × $14,220 = $1,422.",
        "Total = $15,642, or about $81 per sq ft all-in.",
      ],
    },
    tips: [
      "Composite costs more upfront but avoids yearly staining and sealing; compare the 10–15 year cost, not just the install price.",
      "The frame is usually pressure-treated lumber whatever the decking — ask what joist spacing and fasteners the quote assumes.",
      "Most building codes require guards on decks more than 30 in above grade; check your local rules before skipping railings.",
      "Get the permit: unpermitted decks can cause problems with insurance claims and home sales.",
    ],
    faqs: [
      {
        q: "How much does it cost to build a deck per square foot?",
        a: "Typical installed ranges are roughly $25–$50 per sq ft for pressure-treated wood, $35–$60 for cedar, $45–$85 for composite and $50–$95 for PVC, before railings and stairs. Height, design and region change the price a lot.",
      },
      {
        q: "How much does a 12 × 12 deck cost?",
        a: "A 144 sq ft pressure-treated deck at $35/sq ft is about $5,000 for the platform; with railings, steps and a permit it often lands around $7,000–$8,000. In composite at $60/sq ft, expect about $8,600 for the platform alone.",
      },
      {
        q: "Is composite decking worth the extra cost?",
        a: "It often is if you plan to stay for many years. Composite needs no staining or sealing and resists rot and splinters, which offsets its higher upfront price over time. Wood is cheaper to build and easier to repair.",
      },
      {
        q: "Do I need a permit for a deck?",
        a: "Most jurisdictions require a permit for attached decks and for decks over a certain height or size. The permit ensures the ledger, footings and guards meet code — check with your building department.",
      },
      {
        q: "How much does deck railing cost?",
        a: "Roughly $25–$60 per linear foot for basic wood railing, and $50–$150 or more for composite, aluminum, glass or cable systems.",
      },
    ],
    sources: [
      { title: "Prescriptive Residential Wood Deck Construction Guide (DCA 6)", publisher: "American Wood Council" },
      { title: "International Residential Code — decks and guards", publisher: "International Code Council" },
      { title: "Cost vs. Value Report", publisher: "Zonda / Journal of Light Construction" },
    ],
    related: ["deck-boards-calculator", "deck-joists-calculator", "deck-stain-calculator", "home-improvement-roi-calculator", "fence-cost-calculator"],
    cost: {
      priceRange: "about $25–$95 per sq ft built depending on material, plus railings and stairs",
      assumptions: [
        "Per-square-foot prices cover footings, pressure-treated framing, decking, fasteners and labor for a simple rectangular deck less than about 4 ft above grade.",
        "Railings are priced per linear foot of open edge; stairs are priced per step.",
        "Excludes roofs or pergolas, lighting, built-ins, engineering and major site work.",
        REGION_NOTE,
      ],
      updated: UPDATED,
    },
  },
  {
    slug: "kitchen-remodel-cost-calculator",
    name: "Kitchen Remodel Cost Calculator",
    category: "cost-budgeting",
    kind: "cost",
    featured: false,
    seoTitle: "Kitchen Remodel Cost Calculator – Itemized Budget Estimate",
    description:
      "Free kitchen remodel cost calculator: build an itemized budget for cabinets, countertops, backsplash, flooring, appliances, plumbing and electrical work.",
    intro:
      "A kitchen remodel is really a dozen projects in one. This calculator builds an itemized estimate — cabinets by the linear foot, countertops and backsplash by the square foot, flooring, appliances, plumbing, electrical, demolition and permits — using typical installed US prices you can replace with your own quotes, then adds a contingency for the surprises behind old walls.",
    keywords: [
      "kitchen remodel cost calculator",
      "kitchen renovation cost",
      "how much does a kitchen remodel cost",
      "kitchen remodel budget",
      "cost of new kitchen cabinets",
      "kitchen remodel estimate",
    ],
    howToUse: [
      "Enter the kitchen floor area (used for flooring and the cost per square foot).",
      "Measure the cabinet run in linear feet — count base and wall cabinets separately — and choose a price per foot for your cabinet grade.",
      "Enter the countertop and backsplash areas and their installed prices.",
      "Adjust the lump sums for appliances, plumbing, electrical, demolition, other finishes and permits.",
      "Keep a 15–20% contingency, then review the total and the breakdown.",
    ],
    formula: {
      lines: [
        "Cabinets = cabinet run × price per ft;  counters = counter area × price per sq ft",
        "Backsplash = backsplash area × price;  flooring = kitchen area × floor price",
        "Subtotal = cabinets + counters + backsplash + flooring + appliances + plumbing + electrical + demo + other + permits",
        "Total = subtotal × (1 + contingency %)",
      ],
      notes: [
        "Cabinets and countertops are usually the largest share of a kitchen budget, followed by labor-heavy trades and appliances.",
        "Moving walls, plumbing or gas lines, or adding windows, can add thousands — add those as 'other' once you have quotes.",
      ],
    },
    example: {
      scenario: "A 150 sq ft kitchen with 20 linear ft of mid-grade cabinets, 40 sq ft of stone counters, 30 sq ft of tile backsplash, a $5,000 appliance package and a 15% contingency.",
      inputs: {
        kitchenArea: 150,
        cabinetLength: 20,
        cabinetPrice: 350,
        counterArea: 40,
        counterPrice: 80,
        backsplashArea: 30,
        backsplashPrice: 25,
        floorPrice: 9,
        appliances: 5000,
        plumbing: 1500,
        electrical: 2000,
        demo: 1500,
        other: 1000,
        permit: 500,
        contingency: 15,
      },
      expected: { cabinets: 7000, counters: 3200, backsplash: 750, flooring: 1350, subtotal: 23800, contingencyAmount: 3570, total: 27370, perSqFt: 182.47 },
      steps: [
        "Cabinets = 20 × $350 = $7,000; counters = 40 × $80 = $3,200; backsplash = 30 × $25 = $750; flooring = 150 × $9 = $1,350.",
        "Lump sums: appliances $5,000 + plumbing $1,500 + electrical $2,000 + demo $1,500 + other $1,000 + permits $500 = $11,500.",
        "Subtotal = $12,300 + $11,500 = $23,800; contingency = 15% × $23,800 = $3,570.",
        "Total = $27,370, or about $182 per sq ft of kitchen.",
      ],
    },
    tips: [
      "Keep the sink, range and dishwasher in their current locations if you can — moving plumbing, gas and venting adds a lot of cost.",
      "Refacing or painting sound cabinets and replacing only the doors and counters can cut the biggest line item dramatically.",
      "Order cabinets and appliances early; lead times often dictate the project schedule.",
      "Get a fixed-price contract with a clear allowance list for items you have not chosen yet.",
    ],
    faqs: [
      {
        q: "How much does a kitchen remodel cost?",
        a: "It depends mostly on scope and finishes. A cosmetic refresh (paint, hardware, counters, backsplash) may cost under $15,000, a midrange remodel with new cabinets and appliances commonly lands in the $25,000–$60,000 range, and high-end or layout-changing remodels can exceed $100,000. Build your own scope above.",
      },
      {
        q: "What is the most expensive part of a kitchen remodel?",
        a: "Usually cabinets, which often take the largest single share of the budget, followed by labor and installation, appliances and countertops.",
      },
      {
        q: "How much do kitchen cabinets cost per linear foot?",
        a: "Installed, stock cabinets often run about $150–$350 per linear foot, semi-custom about $350–$700 and custom $700 or more. Count base and wall cabinets as separate runs.",
      },
      {
        q: "How much contingency should I budget for a kitchen remodel?",
        a: "Plan on 15–20%. Opening walls and floors often reveals outdated wiring, plumbing leaks or subfloor damage that must be fixed before finishes go in.",
      },
      {
        q: "How long does a kitchen remodel take?",
        a: "A cosmetic update may take one to three weeks. A full remodel commonly takes six to twelve weeks of construction, plus planning and ordering time beforehand.",
      },
    ],
    sources: [
      { title: "Kitchen planning guidelines and budget resources", publisher: "National Kitchen & Bath Association" },
      { title: "Cost vs. Value Report", publisher: "Zonda / Journal of Light Construction" },
      { title: "Remodeling: hiring a contractor", publisher: "Federal Trade Commission (Consumer Advice)" },
    ],
    related: ["renovation-budget-calculator", "backsplash-tile-calculator", "cabinet-paint-calculator", "contractor-markup-calculator", "home-improvement-roi-calculator"],
    cost: {
      priceRange: "roughly $15,000 for a cosmetic refresh to $60,000+ for a full midrange remodel, with high-end kitchens often exceeding $100,000",
      assumptions: [
        "Cabinet, countertop, backsplash and flooring prices are installed (materials and labor).",
        "Assumes the existing layout is kept; relocating walls, plumbing, gas or venting is not included.",
        "Lump sums for plumbing and electrical cover replacing fixtures and modest upgrades, not a full rewire or repipe.",
        "Contingency defaults to 15% because older homes often hide problems behind walls and floors.",
        REGION_NOTE,
      ],
      updated: UPDATED,
    },
  },
  {
    slug: "bathroom-remodel-cost-calculator",
    name: "Bathroom Remodel Cost Calculator",
    category: "cost-budgeting",
    kind: "cost",
    featured: false,
    seoTitle: "Bathroom Remodel Cost Calculator – Itemized Bath Budget",
    description:
      "Free bathroom remodel cost calculator: itemize tile, vanity, toilet, tub or shower, plumbing, electrical, demolition and permits to estimate your bathroom budget.",
    intro:
      "Bathrooms pack expensive trades — plumbing, electrical, waterproofing and tile — into a small room, so the cost per square foot is high. This calculator itemizes a typical full remodel using installed US prices you can edit, so you can see where the money goes and test cheaper or pricier options before you call contractors.",
    keywords: [
      "bathroom remodel cost calculator",
      "bathroom renovation cost",
      "how much does a bathroom remodel cost",
      "bathroom remodel budget",
      "shower remodel cost",
      "small bathroom remodel cost",
    ],
    howToUse: [
      "Enter the bathroom floor area and the area of wall or shower tile (0 if you are using a one-piece tub or shower unit).",
      "Adjust the installed tile prices to match your tile choice and local labor.",
      "Edit the lump sums for the vanity, toilet, tub or shower, plumbing, electrical, demolition, finishes and permits.",
      "Keep a 15–20% contingency for water damage or rot found behind old tile.",
      "Read the total, the breakdown and the cost per square foot.",
    ],
    formula: {
      lines: [
        "Tile = floor area × floor tile price + wall tile area × wall tile price",
        "Fixtures = vanity + toilet + tub/shower",
        "Total = (tile + fixtures + plumbing + electrical + demo + other + permits) × (1 + contingency %)",
      ],
      notes: [
        "Because fixtures and trades cost about the same in a small or large bathroom, small bathrooms have a much higher cost per square foot.",
      ],
    },
    example: {
      scenario: "A full remodel of a 5 × 8 ft (40 sq ft) bathroom with 100 sq ft of tub-surround tile and a 15% contingency.",
      inputs: {
        floorArea: 40,
        floorPrice: 15,
        wallTileArea: 100,
        wallTilePrice: 25,
        vanity: 1500,
        toilet: 500,
        tub: 2500,
        plumbing: 2500,
        electrical: 1500,
        demo: 1200,
        other: 800,
        permit: 300,
        contingency: 15,
      },
      expected: { tile: 3100, fixtures: 4500, trades: 4000, subtotal: 13900, contingencyAmount: 2085, total: 15985 },
      steps: [
        "Tile = 40 × $15 + 100 × $25 = $600 + $2,500 = $3,100.",
        "Fixtures = $1,500 + $500 + $2,500 = $4,500; plumbing + electrical = $4,000.",
        "Subtotal = $3,100 + $4,500 + $4,000 + $1,200 demo + $800 other + $300 permit = $13,900.",
        "Contingency = 15% × $13,900 = $2,085, so the total is $15,985 — about $400 per sq ft.",
      ],
    },
    tips: [
      "Keep the toilet, tub and sink drains where they are to avoid the biggest plumbing costs.",
      "Insist on a proper waterproofing membrane behind and under shower tile — it is the part you never see but always pay for if it fails.",
      "Add a quiet, properly ducted exhaust fan; moisture control protects your new finishes.",
      "Consider a refinished or relined tub if the tub itself is sound — it can save thousands.",
    ],
    faqs: [
      {
        q: "How much does a bathroom remodel cost?",
        a: "A cosmetic update (vanity, lighting, paint, toilet) can cost under $10,000. A full remodel of a standard 5 × 8 ft bath with new tile and fixtures commonly runs about $15,000–$30,000, and large primary baths with custom showers can exceed $50,000. Prices vary widely by region.",
      },
      {
        q: "How much does it cost to remodel a small bathroom?",
        a: "Small bathrooms still need the same trades, so a full remodel is rarely much below $10,000–$15,000. Keeping the layout and choosing stock fixtures keeps it at the low end.",
      },
      {
        q: "How much does it cost to tile a shower?",
        a: "Installed wall tile commonly costs about $15–$40 per sq ft, including waterproofing and setting materials. A typical tub surround of 70–100 sq ft is therefore roughly $1,000–$4,000 in tile work.",
      },
      {
        q: "What adds the most cost to a bathroom remodel?",
        a: "Moving plumbing, custom tiled showers, high-end tile, heated floors and replacing rotten subfloor or framing are the usual budget-busters.",
      },
      {
        q: "How long does a bathroom remodel take?",
        a: "A full bathroom remodel typically takes two to six weeks of work, depending on the scope, inspections and how quickly fixtures and tile arrive.",
      },
    ],
    sources: [
      { title: "Bathroom planning guidelines", publisher: "National Kitchen & Bath Association" },
      { title: "Cost vs. Value Report", publisher: "Zonda / Journal of Light Construction" },
      { title: "Tile installation and waterproofing standards (ANSI A108/A118)", publisher: "Tile Council of North America" },
    ],
    related: ["bathroom-tile-estimator", "shower-tile-calculator", "tile-installation-cost-calculator", "renovation-budget-calculator", "home-improvement-roi-calculator"],
    cost: {
      priceRange: "roughly $10,000–$30,000 for most full remodels of a standard bathroom, with large or high-end baths exceeding $50,000",
      assumptions: [
        "Tile prices are installed, including setting materials and waterproofing.",
        "Fixture prices are installed, mid-grade products.",
        "Assumes the existing layout and drain locations are kept.",
        "Excludes structural repairs, heated floors, custom glass enclosures and relocating walls.",
        REGION_NOTE,
      ],
      updated: UPDATED,
    },
  },
  {
    slug: "roof-replacement-cost-calculator",
    name: "Roof Replacement Cost Calculator",
    category: "cost-budgeting",
    kind: "cost",
    featured: false,
    seoTitle: "Roof Replacement Cost Calculator – Cost per Square Estimate",
    description:
      "Free roof replacement cost calculator: estimate a new asphalt, metal or tile roof from roof area or house footprint and pitch, including tear-off and deck repairs.",
    intro:
      "Roofers price by the square — 100 sq ft of roof surface. If you do not know your roof area, enter the house footprint and pitch and the calculator works it out. Choose the roofing material, tear-off layers and likely deck repairs, and you will get a full replacement budget using typical installed US prices you can edit.",
    keywords: [
      "roof replacement cost calculator",
      "new roof cost",
      "roof cost per square",
      "asphalt shingle roof cost",
      "metal roof cost",
      "roofing estimate calculator",
    ],
    howToUse: [
      "Enter the roof area if you know it, or the house footprint including overhangs plus the roof pitch.",
      "Choose the roofing material and check the installed price per square.",
      "Choose how many old layers must be torn off and the tear-off price per square.",
      "Add an allowance for rotten deck sheets and for flashing, skylights, vents and permits.",
      "Keep a 10% contingency and read the total and the all-in price per square.",
    ],
    formula: {
      lines: [
        "Roof area = footprint × √(1 + (pitch ÷ 12)²)   (or entered directly)",
        "Squares = roof area ÷ 100",
        "Roofing = squares × price per square;  tear-off = squares × layers × tear-off price",
        "Total = (roofing + tear-off + deck sheets × sheet price + extras) × (1 + contingency %)",
      ],
      notes: [
        "Pitch multipliers: 4/12 = 1.054, 6/12 = 1.118, 8/12 = 1.202, 10/12 = 1.302, 12/12 = 1.414.",
        "Contractors build shingle waste and accessories into their per-square price, so no waste is added here.",
      ],
    },
    example: {
      scenario: "A house with a 1,600 sq ft footprint and a 6/12 roof, re-roofed with architectural shingles over one torn-off layer, replacing 5 deck sheets.",
      inputs: { mode: 1, footprint: 1600, pitch: 6, material: 1, price1: 550, layers: 1, tearOffPrice: 150, sheets: 5, sheetPrice: 100, extras: 500, contingency: 10 },
      expected: { roofArea: 1788.85, squares: 17.89, roofing: 9838.7, tearOff: 2683.28, decking: 500, total: 14874.18 },
      steps: [
        "Roof area = 1,600 × √(1 + 0.5²) = 1,600 × 1.118 = 1,789 sq ft = 17.89 squares.",
        "Roofing = 17.89 × $550 = $9,839; tear-off = 17.89 × $150 = $2,683.",
        "Deck sheets = 5 × $100 = $500; extras = $500. Subtotal = $13,522.",
        "Contingency = 10% = $1,352, so the total is about $14,874 — roughly $831 per square all-in.",
      ],
    },
    tips: [
      "Get at least three written quotes that list the same items: underlayment, ice and water shield, drip edge, ventilation and flashing.",
      "Ask for a per-sheet price for replacing rotten decking in the contract, so surprises do not become blank checks.",
      "Many codes allow only two layers of shingles — and a full tear-off lets the roofer inspect and repair the deck.",
      "Steep (over 8/12), multi-story and complex roofs with many valleys and dormers cost more per square.",
    ],
    faqs: [
      {
        q: "How much does a new roof cost?",
        a: "For an asphalt shingle roof, typical installed prices run about $450–$750 per square (100 sq ft) including standard accessories; a 20-square roof is therefore roughly $9,000–$15,000 before tear-off and repairs. Metal and tile cost substantially more.",
      },
      {
        q: "What is a roofing square?",
        a: "A square is 100 sq ft of roof surface. A 2,000 sq ft roof is 20 squares. Prices and shingle bundles are both quoted per square.",
      },
      {
        q: "How do I calculate my roof area from my house size?",
        a: "Multiply the footprint (including overhangs) by the pitch multiplier: about 1.05 for a 4/12 roof, 1.12 for 6/12, 1.20 for 8/12 and 1.41 for 12/12. A 1,600 sq ft footprint with a 6/12 roof is about 1,790 sq ft of roof.",
      },
      {
        q: "Is a metal roof worth the cost?",
        a: "Standing-seam metal often costs about twice as much as architectural shingles upfront but can last much longer and shed snow well. It makes most sense if you plan to stay in the home for many years.",
      },
      {
        q: "Can you put new shingles over old ones?",
        a: "Building codes generally allow a second layer of asphalt shingles over one existing layer if the deck is sound, but many roofers and manufacturers recommend a full tear-off so the deck can be inspected and warranties are not affected.",
      },
    ],
    sources: [
      { title: "International Residential Code, Chapter 9: Roof Assemblies", publisher: "International Code Council" },
      { title: "Choosing a professional roofing contractor", publisher: "National Roofing Contractors Association" },
      { title: "Asphalt shingle installation and reroofing guidance", publisher: "Asphalt Roofing Manufacturers Association" },
    ],
    related: ["roofing-squares-calculator", "roof-square-footage-calculator", "roof-pitch-calculator", "shingles-calculator", "gutters-calculator"],
    cost: {
      priceRange: "about $350–$750 per square installed for asphalt shingles, $900–$1,600 for standing-seam metal and $1,000–$2,000+ for tile",
      assumptions: [
        "Per-square prices include underlayment, starter, ridge caps, flashing basics and labor on a one- or two-story walkable roof.",
        "Tear-off is priced per square per layer, including disposal.",
        "Deck repairs assume 4 × 8 ft sheathing sheets replaced as needed.",
        "Steep, tall or complex roofs, chimney rebuilding, gutters and structural repairs are not included.",
        REGION_NOTE,
      ],
      updated: UPDATED,
    },
  },
  {
    slug: "driveway-cost-calculator",
    name: "Driveway Cost Calculator",
    category: "cost-budgeting",
    kind: "cost",
    featured: false,
    seoTitle: "Driveway Cost Calculator – Gravel, Asphalt, Concrete, Pavers",
    description:
      "Free driveway cost calculator: compare the installed cost of a gravel, asphalt, concrete or paver driveway, including removal of an old driveway and permits.",
    intro:
      "Driveway prices are quoted per square foot, and the surface you choose changes the price more than anything else. Enter the length and width, choose gravel, asphalt, concrete or pavers, and the calculator estimates the installed cost — including tearing out an old driveway, permits and a contingency — using typical US prices you can edit.",
    keywords: [
      "driveway cost calculator",
      "concrete driveway cost",
      "asphalt driveway cost",
      "paver driveway cost",
      "gravel driveway cost",
      "driveway replacement cost",
    ],
    howToUse: [
      "Measure the driveway length and width (10–12 ft for one car, 18–24 ft for two side by side).",
      "Choose the surface and check the installed price per square foot.",
      "Choose whether an old driveway must be removed and enter the removal price.",
      "Add permit, curb-cut or other fees and keep a 10% contingency.",
      "Switch surfaces to compare totals side by side.",
    ],
    formula: {
      lines: [
        "Area = length × width",
        "Driveway = area × installed price per sq ft",
        "Total = (driveway + area × removal price + fees) × (1 + contingency %)",
      ],
      notes: [
        "Default installed prices: gravel $2.50, asphalt $7, concrete $10 and pavers $25 per sq ft — typical US figures including a compacted base.",
      ],
    },
    example: {
      scenario: "Replacing an old 50 × 12 ft driveway with plain concrete, with $150 in fees and a 10% contingency.",
      inputs: { length: 50, width: 12, material: 2, concretePrice: 10, remove: 1, removalPrice: 3, fees: 150, contingency: 10 },
      expected: { area: 600, surface: 6000, removal: 1800, contingencyAmount: 795, total: 8745, perSqFt: 14.58 },
      steps: [
        "Area = 50 × 12 = 600 sq ft.",
        "Concrete = 600 × $10 = $6,000; removal = 600 × $3 = $1,800; fees = $150. Subtotal = $7,950.",
        "Contingency = 10% × $7,950 = $795.",
        "Total = $8,745, about $14.58 per sq ft all-in.",
      ],
    },
    tips: [
      "A well-compacted base matters more than the surface — ask what base depth and material the quote includes.",
      "Concrete driveways typically use 4 in of concrete for cars and 5–6 in where heavy trucks will park.",
      "Seal asphalt periodically and keep heavy vehicles off fresh asphalt and concrete until fully cured.",
      "Check whether your town requires a permit for the apron where the driveway meets the street.",
    ],
    faqs: [
      {
        q: "How much does a concrete driveway cost?",
        a: "Plain concrete driveways typically cost about $8–$15 per sq ft installed. A 600 sq ft driveway is therefore roughly $5,000–$9,000 before removal of an old surface. Stamped or colored concrete costs more.",
      },
      {
        q: "Is asphalt cheaper than concrete?",
        a: "Usually, yes — asphalt commonly costs about $5–$10 per sq ft installed versus $8–$15 for concrete. Asphalt needs resealing every few years, while concrete generally lasts longer with less maintenance.",
      },
      {
        q: "What is the cheapest driveway?",
        a: "Gravel is the least expensive, often about $1.50–$4 per sq ft with a proper base. It needs periodic topping up and grading.",
      },
      {
        q: "How much does a paver driveway cost?",
        a: "Paver driveways typically cost about $15–$40 per sq ft installed, depending on the paver and base requirements. They cost more upfront but individual pavers can be replaced.",
      },
      {
        q: "How much does it cost to remove an old driveway?",
        a: "Roughly $1–$6 per sq ft, depending on the material, thickness and reinforcement and the distance to a disposal site.",
      },
    ],
    sources: [
      { title: "Concrete driveways: guide for homeowners", publisher: "American Concrete Institute" },
      { title: "Residential asphalt driveway guidance", publisher: "National Asphalt Pavement Association" },
      { title: "Interlocking concrete pavement driveways", publisher: "Interlocking Concrete Pavement Institute" },
    ],
    related: ["concrete-slab-calculator", "concrete-cost-calculator", "gravel-calculator", "paver-calculator", "paver-base-calculator"],
    cost: {
      priceRange: "about $1.50–$4 per sq ft for gravel, $5–$10 for asphalt, $8–$15 for concrete and $15–$40 for pavers, installed",
      assumptions: [
        "Prices include excavation of a few inches, a compacted gravel base and the finished surface on reasonably level ground.",
        "Concrete assumes a plain 4–5 in broom-finished slab; decorative finishes cost more.",
        "Removal covers breaking up and hauling away an existing driveway of the same size.",
        "Major grading, drainage, retaining walls and long driveways on difficult sites are not included.",
        REGION_NOTE,
      ],
      updated: UPDATED,
    },
  },
  {
    slug: "contractor-markup-calculator",
    name: "Contractor Markup Calculator",
    category: "cost-budgeting",
    kind: "cost",
    featured: false,
    seoTitle: "Contractor Markup Calculator – Markup vs Margin Explained",
    description:
      "Free contractor markup calculator: turn job costs into a selling price using a markup or a target gross margin, and see the matching markup and margin percentages.",
    intro:
      "Markup and margin are not the same thing, and mixing them up is one of the most common pricing mistakes in contracting. Enter your job costs and either a markup or a target gross margin, and this calculator gives you the price to charge, the gross profit, and both percentages side by side.",
    keywords: [
      "contractor markup calculator",
      "markup vs margin",
      "construction markup calculator",
      "markup to margin calculator",
      "how much should a contractor mark up",
      "job pricing calculator",
    ],
    howToUse: [
      "Enter the direct costs of the job: materials, labor (with payroll taxes and insurance), subcontractors and other costs.",
      "Choose whether to price with a markup percentage or a target gross margin.",
      "Enter your markup or target margin.",
      "Read the price to charge, the gross profit, and the equivalent markup and margin.",
    ],
    formula: {
      lines: [
        "Job cost = materials + labor + subcontractors + other",
        "With markup:  price = cost × (1 + markup %)",
        "With margin:  price = cost ÷ (1 − margin %)",
        "Markup = profit ÷ cost;  margin = profit ÷ price;  margin = markup ÷ (1 + markup)",
      ],
      notes: [
        "Markup is measured against cost; margin is measured against the selling price. A 25% markup gives only a 20% margin, and a 50% markup gives a 33.3% margin.",
        "Gross profit must cover company overhead (office, vehicles, insurance, marketing, your own salary) before any net profit is left.",
      ],
    },
    example: {
      scenario: "A job with $4,000 of materials, $5,000 of labor and $1,000 of other costs, priced with a 25% markup.",
      inputs: { materials: 4000, labor: 5000, subs: 0, otherCost: 1000, mode: 0, markup: 25 },
      expected: { cost: 10000, price: 12500, profit: 2500, markupPct: 25, marginPct: 20 },
      steps: [
        "Job cost = $4,000 + $5,000 + $0 + $1,000 = $10,000.",
        "Price = $10,000 × 1.25 = $12,500, so gross profit = $2,500.",
        "Markup = $2,500 ÷ $10,000 = 25%; margin = $2,500 ÷ $12,500 = 20%.",
        "To hit a 25% margin instead, price = $10,000 ÷ 0.75 = $13,333 — a 33.3% markup.",
      ],
    },
    tips: [
      "Work out your annual overhead first; your markup must cover it across all the jobs you realistically win in a year.",
      "Price from your margin target, not from a markup you picked — it is the margin that shows up on your profit and loss statement.",
      "Small jobs usually need a higher markup because fixed costs like travel, setup and estimating are spread over less work.",
      "Track estimated versus actual costs on every job so your markup is based on real numbers.",
    ],
    faqs: [
      {
        q: "What is the difference between markup and margin?",
        a: "Markup is profit as a percentage of cost; margin is profit as a percentage of the selling price. On a $10,000 job sold for $12,500, the $2,500 profit is a 25% markup but a 20% margin.",
      },
      {
        q: "How do I convert markup to margin?",
        a: "Margin = markup ÷ (1 + markup). A 25% markup is a 20% margin, 33.3% is 25%, 50% is 33.3% and 100% is 50%. To go the other way, markup = margin ÷ (1 − margin).",
      },
      {
        q: "What is a typical contractor markup?",
        a: "There is no standard figure — it depends on overhead, job size, trade and risk. Many remodeling business advisers suggest that residential contractors need a gross margin somewhere around 25–35% to cover overhead and earn a profit, which corresponds to a markup of roughly 33–54%. Calculate yours from your own overhead.",
      },
      {
        q: "What does '10 and 10' mean in construction?",
        a: "It refers to 10% overhead plus 10% profit. Applied one after the other (cost × 1.10 × 1.10) it is a 21% markup, or about a 17.4% margin — which is too low for many small contractors to cover real overhead.",
      },
      {
        q: "Should markup be applied to subcontractor costs?",
        a: "Usually, yes. A general contractor manages, schedules and warranties subcontracted work and carries the risk, so marking it up is standard practice, though some contractors use a lower rate on subs than on self-performed work.",
      },
    ],
    sources: [
      { title: "Markup and profit: a contractor's guide", publisher: "Craftsman Book Company (Michael C. Stone)" },
      { title: "Financial management resources for builders and remodelers", publisher: "National Association of Home Builders" },
      { title: "Pricing products and services", publisher: "U.S. Small Business Administration" },
    ],
    related: ["renovation-budget-calculator", "home-improvement-roi-calculator", "kitchen-remodel-cost-calculator", "painter-labor-cost-calculator"],
    cost: {
      priceRange: "no standard rate — markup depends on overhead, job size and risk",
      assumptions: [
        "Job cost should include every direct cost: materials with tax and delivery, labor with payroll taxes and insurance, subcontractors, equipment, permits and disposal.",
        "Markup is calculated on total job cost; margin is calculated on the selling price.",
        "Gross profit must cover overhead before any net profit remains — this calculator does not split the two.",
        "Sales tax on the selling price, if it applies in your state, is not included.",
        "The default dollar amounts are an example only — enter your own job's costs.",
      ],
      updated: UPDATED,
    },
  },
  {
    slug: "renovation-budget-calculator",
    name: "Renovation Budget Calculator",
    category: "cost-budgeting",
    kind: "cost",
    featured: false,
    seoTitle: "Renovation Budget Calculator – Plan Costs and Contingency",
    description:
      "Free renovation budget calculator: total your planned remodel costs by trade, add a contingency and see whether your cash and financing cover the whole project.",
    intro:
      "Most renovation budgets fail not because one item is overpriced but because nothing was set aside for surprises. Enter the money you have available and your planned costs by category, choose a contingency, and this calculator shows the total budget you need, how much is left over (or short), and the most you can commit before contingency.",
    keywords: [
      "renovation budget calculator",
      "home renovation budget",
      "remodel budget planner",
      "renovation contingency",
      "how much to budget for a renovation",
      "home remodel cost planner",
    ],
    howToUse: [
      "Enter the total money available from savings, loans or a line of credit.",
      "Enter your planned or quoted costs in each category; leave unused categories at 0.",
      "Include design, permits and inspections, plus costs such as temporary housing or storage.",
      "Choose a contingency — 10% for simple cosmetic work, 15–20% for older homes or opened walls.",
      "Check the total needed and the amount left over; a negative number is a shortfall.",
    ],
    formula: {
      lines: [
        "Planned costs = sum of all categories",
        "Contingency = planned costs × contingency %",
        "Total budget needed = planned costs + contingency",
        "Left over = money available − total;  most you can plan = money available ÷ (1 + contingency %)",
      ],
      notes: [
        "Contingency is applied to all planned costs, including fees, so it scales with the size of the project.",
      ],
    },
    example: {
      scenario: "A $50,000 renovation fund covering $42,500 of planned work with a 15% contingency.",
      inputs: { available: 50000, demo: 2000, structure: 8000, plumbing: 5000, electrical: 5000, finishes: 10000, fixtures: 10000, fees: 2500, other: 0, contingency: 15 },
      expected: { items: 42500, contingencyAmount: 6375, total: 48875, remaining: 1125, maxPlanned: 43478.26 },
      steps: [
        "Planned costs = $2,000 + $8,000 + $5,000 + $5,000 + $10,000 + $10,000 + $2,500 = $42,500.",
        "Contingency = 15% × $42,500 = $6,375.",
        "Total needed = $48,875, leaving $1,125 of the $50,000.",
        "The most you could commit to before contingency is $50,000 ÷ 1.15 = $43,478.",
      ],
    },
    tips: [
      "Get written quotes for the largest categories before you finalize the budget — guesses are usually low.",
      "Decide in advance which 'nice to have' items you will drop if the contingency gets used.",
      "Leave the contingency untouched for genuine surprises, not upgrades chosen halfway through.",
      "Remember costs outside the contract: permits, appliance delivery, eating out during a kitchen remodel, and furniture storage.",
    ],
    faqs: [
      {
        q: "How much contingency should I add to a renovation budget?",
        a: "A common rule of thumb is 10% for straightforward cosmetic work and 15–20% for older homes, structural changes or projects that open walls and floors, where hidden problems are more likely.",
      },
      {
        q: "How do I make a renovation budget?",
        a: "List every part of the project by trade, get quotes or reliable estimates for each, add fees and living costs, then add a contingency. Compare the total to the money you actually have, and trim scope before work starts — not halfway through.",
      },
      {
        q: "What should I do if my renovation is over budget?",
        a: "Reduce scope rather than quality: phase work over time, keep existing layouts, refinish instead of replacing, or choose stock rather than custom items. Avoid cutting the contingency to make the numbers fit.",
      },
      {
        q: "Should the contingency be included in the financing amount?",
        a: "Yes — arrange access to the full total including contingency, because problems discovered mid-project must usually be fixed before work can continue.",
      },
      {
        q: "What hidden costs do renovations have?",
        a: "Common ones are permit and inspection fees, design fees, dumpster rental, temporary housing, storage, utility upgrades (such as an electrical panel) and repairs to damage found behind walls.",
      },
    ],
    sources: [
      { title: "Hiring a contractor", publisher: "Federal Trade Commission (Consumer Advice)" },
      { title: "Home improvement loans and financing options", publisher: "Consumer Financial Protection Bureau" },
      { title: "Remodeling planning resources", publisher: "National Association of the Remodeling Industry" },
    ],
    related: ["kitchen-remodel-cost-calculator", "bathroom-remodel-cost-calculator", "contractor-markup-calculator", "home-improvement-roi-calculator"],
    cost: {
      priceRange: "a 10–20% contingency on top of planned costs is a common planning rule",
      assumptions: [
        "Category amounts are your own quotes or estimates — the defaults are an example only.",
        "Contingency is applied to the total of all categories, including fees.",
        "Financing costs such as interest and loan fees are not included unless you add them to 'Other'.",
        "Taxes and price increases between quote and purchase are not modeled; update figures as quotes arrive.",
      ],
      updated: UPDATED,
    },
  },
  {
    slug: "home-improvement-roi-calculator",
    name: "Home Improvement ROI Calculator",
    category: "cost-budgeting",
    kind: "cost",
    featured: false,
    seoTitle: "Home Improvement ROI Calculator – Cost Recouped and Payback",
    description:
      "Free home improvement ROI calculator: enter project cost, added home value and any yearly savings to see your return on investment, cost recouped and payback period.",
    intro:
      "Will a remodel pay for itself? Enter what the project will cost, how much it is likely to add to your home's sale price, and any yearly savings such as lower energy bills, and this calculator shows your return on investment, the share of the cost recouped at resale, and how long savings alone would take to pay it back.",
    keywords: [
      "home improvement roi calculator",
      "remodel return on investment",
      "renovation roi",
      "cost recouped at resale",
      "home upgrade payback calculator",
      "does renovation add value",
    ],
    howToUse: [
      "Enter the full project cost, including permits, design and financing fees.",
      "Enter your best estimate of how much the project will add to your home's sale price — ask a local real estate agent or appraiser.",
      "If the project saves money each year (for example insulation or a heat pump), enter the yearly savings.",
      "Enter how many years you expect to stay before selling.",
      "Read the ROI, the cost recouped at resale and the payback period.",
    ],
    formula: {
      lines: [
        "Total return = value added + yearly savings × years until you sell",
        "ROI = (total return − cost) ÷ cost × 100",
        "Cost recouped = value added ÷ cost × 100",
        "Payback (years) = cost ÷ yearly savings",
      ],
      notes: [
        "This is a simple, undiscounted calculation: it ignores inflation, interest on financing and the time value of money.",
        "The value a project adds is an estimate that depends heavily on your local market, the home's price range and the quality of the work.",
      ],
    },
    example: {
      scenario: "A $6,000 insulation and air-sealing upgrade expected to add $3,000 to the sale price and save $600 a year, in a home you plan to sell in 7 years.",
      inputs: { cost: 6000, valueAdded: 3000, annualSavings: 600, years: 7 },
      expected: { roi: 20, recouped: 50, net: 1200, savingsTotal: 4200, payback: 10 },
      steps: [
        "Savings while you own the home = $600 × 7 = $4,200.",
        "Total return = $3,000 + $4,200 = $7,200; net gain = $7,200 − $6,000 = $1,200.",
        "ROI = $1,200 ÷ $6,000 = 20%; cost recouped at resale = $3,000 ÷ $6,000 = 50%.",
        "Payback from savings alone = $6,000 ÷ $600 = 10 years.",
      ],
    },
    tips: [
      "Do not count on any remodel adding more than it costs — most recoup only part of their cost at resale.",
      "Maintenance and repairs (roof, HVAC, drainage) protect value even when they do not add much to the sale price.",
      "Avoid over-improving well beyond the norm for your neighborhood; buyers rarely pay full price for it.",
      "Check for tax credits, utility rebates and incentives on energy-efficiency upgrades, which reduce your real cost.",
    ],
    faqs: [
      {
        q: "Which home improvements have the best ROI?",
        a: "Industry surveys such as the annual Cost vs. Value Report have generally found that smaller exterior projects — like garage door or entry door replacement and siding — recoup a higher share of their cost than large kitchen or bathroom remodels or additions. Results vary by region and year.",
      },
      {
        q: "Do home renovations pay for themselves?",
        a: "Rarely in resale value alone. Most remodels recoup only part of their cost when the home sells; the rest of the return is your enjoyment of the space and, for efficiency upgrades, lower bills.",
      },
      {
        q: "How do I estimate the value a renovation adds?",
        a: "Ask a local real estate agent or appraiser to compare recent sales of similar homes with and without the feature. Published averages are a starting point, but local markets differ a lot.",
      },
      {
        q: "What is a good ROI for a home improvement?",
        a: "Any project that recoups most of its cost while making the home more comfortable, safer or cheaper to run is usually a good investment. Projects that break even or better on resale are uncommon.",
      },
      {
        q: "How do I calculate payback for an energy upgrade?",
        a: "Divide the net cost (after rebates and tax credits) by the yearly energy savings. A $6,000 upgrade saving $600 a year pays back in 10 years, before counting any added resale value.",
      },
    ],
    sources: [
      { title: "Cost vs. Value Report", publisher: "Zonda / Journal of Light Construction" },
      { title: "Remodeling Impact Report", publisher: "National Association of Realtors" },
      { title: "Energy Saver: home energy upgrades", publisher: "U.S. Department of Energy" },
    ],
    related: ["renovation-budget-calculator", "kitchen-remodel-cost-calculator", "bathroom-remodel-cost-calculator", "deck-cost-calculator", "insulation-cost-calculator"],
    cost: {
      priceRange: "most remodeling projects recoup only part of their cost at resale; few return more than they cost",
      assumptions: [
        "Project cost and value added are your own estimates — the defaults are an example only.",
        "ROI is simple and undiscounted: no inflation, interest or opportunity cost.",
        "Yearly savings are assumed constant over the years you own the home.",
        "Selling costs and taxes are not included.",
      ],
      updated: UPDATED,
    },
  },
];
