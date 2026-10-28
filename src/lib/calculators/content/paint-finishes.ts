import type { CalculatorContent } from "../types";

export const content: CalculatorContent[] = [
  {
    slug: "paint-calculator",
    name: "Paint Calculator",
    category: "paint-finishes",
    kind: "material",
    featured: true,
    seoTitle: "Paint Calculator – How Much Paint Do I Need for a Room?",
    description:
      "Free paint calculator: enter room size, doors, windows and coats to see exactly how many gallons or litres of paint to buy. Works in feet or metres.",
    intro:
      "Find out how much paint you need for a room in seconds. Enter the room's length, width and wall height, take off doors and windows, choose the number of coats and your paint's coverage, and the calculator tells you how many gallons (or litres) to buy — with a small allowance for touch-ups.",
    keywords: [
      "paint calculator",
      "how much paint do i need",
      "room paint calculator",
      "gallons of paint per room",
      "paint estimator",
      "wall paint calculator",
    ],
    howToUse: [
      "Measure the room's length and width along the floor, and the wall height from floor to ceiling.",
      "Count the doors and windows you will not be painting.",
      "Choose the number of coats — two coats is standard, especially over a colour change.",
      "Enter the coverage printed on the paint can (sq ft per gallon or m² per litre).",
      "Pick whether to include the ceiling, adjust the waste allowance, and read your result.",
    ],
    formula: {
      lines: [
        "Wall area = 2 × (length + width) × wall height",
        "Paintable area = wall area − (doors × 20 sq ft) − (windows × 15 sq ft) [+ ceiling area]",
        "Paint needed = paintable area × coats ÷ coverage × (1 + waste %)",
      ],
      notes: [
        "A standard interior door is about 20 sq ft (1.9 m²) and an average window about 15 sq ft (1.4 m²).",
        "Coverage varies by product and surface: new drywall, textured walls and dark-to-light colour changes use more paint.",
      ],
    },
    example: {
      scenario: "A 12 × 12 ft bedroom with 8 ft walls, one door and two windows, painted with two coats of paint that covers 350 sq ft per gallon.",
      inputs: { length: 12, width: 12, height: 8, doors: 1, windows: 2, coats: 2, coverage: 350, ceiling: 0, waste: 10 },
      expected: { wallArea: 384, paintableArea: 334, gallons: 2.0994, cans: 3 },
      steps: [
        "Wall area = 2 × (12 + 12) × 8 = 384 sq ft.",
        "Openings = 1 × 20 + 2 × 15 = 50 sq ft, so paintable area = 384 − 50 = 334 sq ft.",
        "Paint = 334 × 2 coats ÷ 350 = 1.91 gallons.",
        "Add 10% waste: 1.91 × 1.10 = 2.1 gallons, so buy 3 one-gallon cans (or one 2-gallon option plus a quart for touch-ups).",
      ],
    },
    tips: [
      "Buy all your paint from the same batch, or mix ('box') the cans together, so the colour is consistent across walls.",
      "Prime new drywall, patched areas and stains first — primer is cheaper than an extra coat of finish paint.",
      "A 5-gallon bucket is usually cheaper per gallon if you need four gallons or more of one colour.",
      "Keep leftover paint labelled with the room name for future touch-ups.",
    ],
    faqs: [
      {
        q: "How much paint do I need for a 12 × 12 room?",
        a: "With 8 ft ceilings, one door and two windows, a 12 × 12 room has about 334 sq ft of paintable wall. Two coats at 350 sq ft per gallon need roughly 2 gallons, so most people buy 2 gallons plus a quart, or 3 gallons to be safe.",
      },
      {
        q: "How many square feet does a gallon of paint cover?",
        a: "Most interior wall paints cover 250 to 400 sq ft per gallon per coat on smooth, primed surfaces. Rough, porous or textured surfaces can drop coverage to 200 sq ft or less, so always check the manufacturer's label.",
      },
      {
        q: "Do I really need two coats of paint?",
        a: "Two coats give an even colour and better durability, and they are essential when changing colour or painting over a patched wall. A single coat can work when repainting the same colour with a high-quality paint.",
      },
      {
        q: "Should I subtract doors and windows?",
        a: "Yes. Subtracting openings stops you overbuying. This calculator removes about 20 sq ft per door and 15 sq ft per window; for very large windows or patio doors, measure them and subtract the actual area.",
      },
      {
        q: "How much paint do I need for the ceiling?",
        a: "The ceiling area is simply length × width. Ceiling paint often covers slightly less than wall paint, so choose 'walls and ceiling' above or use the dedicated ceiling paint calculator for a separate product.",
      },
    ],
    sources: [
      { title: "Paint coverage and spread rate guidance on product data sheets", publisher: "Sherwin-Williams" },
      { title: "How much paint do I need?", publisher: "Benjamin Moore" },
      { title: "Painting interior walls — preparation and coverage", publisher: "The Home Depot" },
    ],
    related: ["ceiling-paint-calculator", "primer-calculator", "wall-area-calculator", "paint-cost-calculator", "number-of-coats-calculator"],
  },
  {
    slug: "ceiling-paint-calculator",
    name: "Ceiling Paint Calculator",
    category: "paint-finishes",
    kind: "material",
    featured: true,
    seoTitle: "Ceiling Paint Calculator – Gallons for Flat, Sloped & Popcorn",
    description:
      "Work out how much ceiling paint to buy. Enter the room size, slope and texture to get gallons, quarts or litres for flat, vaulted and popcorn ceilings.",
    intro:
      "Ceilings are easy to measure but easy to misjudge: a vaulted ceiling has more surface than the floor below it, and textured or popcorn finishes soak up far more paint than smooth drywall. Enter the room's length and width, pick the ceiling shape and texture, and this calculator tells you how many gallons (or quarts) of ceiling paint to buy.",
    keywords: [
      "ceiling paint calculator",
      "how much ceiling paint do i need",
      "ceiling paint coverage",
      "popcorn ceiling paint",
      "vaulted ceiling paint calculator",
      "gallons of ceiling paint per room",
    ],
    howToUse: [
      "Measure the room's length and width at floor level — for a flat ceiling the ceiling area equals the floor area.",
      "If the ceiling slopes, choose the roof pitch it follows (4/12, 6/12 and so on). The calculator multiplies the floor area by the slope factor.",
      "Choose the surface: smooth drywall, a light orange-peel texture, or a heavy knockdown or popcorn texture.",
      "Enter the coverage from the paint can and the number of coats (two is normal for a color change or new drywall).",
      "Read the gallons needed. For small rooms the quart count is often the cheaper way to buy.",
    ],
    formula: {
      lines: [
        "Floor area = length × width",
        "Ceiling area = floor area × slope factor (1.000 flat, 1.054 for 4/12, 1.118 for 6/12, 1.202 for 8/12, 1.414 for 12/12)",
        "Paint (gal) = ceiling area × coats × texture factor ÷ coverage × (1 + waste %)",
      ],
      notes: [
        "The slope factor is the length of a sloped surface per foot of horizontal run: √(12² + rise²) ÷ 12.",
        "Texture factors (+15% light texture, +50% heavy or popcorn) are rule-of-thumb allowances; porous acoustic ceilings can use even more. Test a small area if you are unsure.",
      ],
    },
    example: {
      scenario: "A 12 × 14 ft living room with a flat, smooth ceiling, two coats of flat ceiling paint rated at 400 sq ft per gallon.",
      inputs: { length: 12, width: 14, slope: 1, texture: 1, coats: 2, coverage: 400, waste: 10 },
      expected: { ceilingArea: 168, gallons: 0.924, cans: 1, quarts: 4 },
      steps: [
        "Ceiling area = 12 × 14 × 1.000 = 168 sq ft.",
        "Paint = 168 × 2 coats ÷ 400 = 0.84 gallons.",
        "Add 10% waste: 0.84 × 1.10 = 0.92 gallons — one 1-gallon can is enough.",
      ],
    },
    tips: [
      "Use a flat, low-spatter ceiling paint: flat sheen hides roller marks and drywall seams far better than eggshell.",
      "Paint the ceiling before the walls so drips and roller spatter land on walls you have not painted yet.",
      "Test popcorn ceilings in a hidden corner first — some older texture loosens when it gets wet, and pre-1980s texture may contain asbestos, so have it tested before disturbing it.",
      "Use an extension pole and a 3/4 in (19 mm) nap roller on textured ceilings so the paint reaches into the texture.",
      "Color-changing ceiling paints go on pink or purple and dry white, which makes missed spots easy to see.",
    ],
    faqs: [
      {
        q: "How much paint do I need for a 12 × 12 ceiling?",
        a: "A 12 × 12 ceiling is 144 sq ft. Two coats at 400 sq ft per gallon need 0.72 gallons, or about 0.8 gallons with a 10% allowance, so one gallon is plenty. A single coat on a same-color repaint needs only about 2 quarts.",
      },
      {
        q: "Is ceiling paint different from wall paint?",
        a: "Ceiling paints are usually flat, thicker and formulated to spatter less when rolled overhead. Some are also tinted to dry a bright white. You can use flat wall paint on a ceiling, but dedicated ceiling paint is easier to apply.",
      },
      {
        q: "How much more paint does a popcorn ceiling need?",
        a: "Heavily textured and popcorn ceilings have far more surface and absorb paint, so plan on at least 50% more paint than a smooth ceiling of the same size. A thick, porous acoustic texture may need double; check the label's coverage for rough surfaces.",
      },
      {
        q: "How do I measure a vaulted or cathedral ceiling?",
        a: "Measure the floor below it and multiply by the slope factor for the roof pitch: about 1.12 for a 6/12 pitch and 1.41 for 12/12. A 12 × 14 room under a 6/12 cathedral ceiling has about 188 sq ft of ceiling, not 168. Add any flat sections and gable walls separately.",
      },
      {
        q: "Do I need two coats of ceiling paint?",
        a: "Two coats are recommended for new drywall, stains and color changes. A ceiling that is clean and already the same white often looks fine with one good coat. Stains from water or smoke should be spot-primed with a stain-blocking primer first, or they bleed through.",
      },
    ],
    sources: [
      { title: "Ceiling paint product data sheets (coverage and application)", publisher: "Sherwin-Williams" },
      { title: "How to paint a ceiling", publisher: "Benjamin Moore" },
      { title: "Asbestos in your home", publisher: "U.S. Environmental Protection Agency", url: "https://www.epa.gov/asbestos/protect-your-family-exposures-asbestos" },
    ],
    related: ["paint-calculator", "primer-calculator", "room-area-calculator", "paint-cost-calculator"],
  },
  {
    slug: "exterior-paint-calculator",
    name: "Exterior Paint Calculator",
    category: "paint-finishes",
    kind: "material",
    featured: true,
    seoTitle: "Exterior Paint Calculator – How Much Paint for a House?",
    description:
      "Estimate gallons of exterior house paint from wall size, gables, doors and windows and siding type. See 5-gallon buckets plus single cans to buy.",
    intro:
      "Painting a house is a big purchase, and buying too little means mismatched batches while buying too much wastes money. This exterior paint calculator measures the walls from the house footprint, adds the triangular gable ends, takes off doors, windows and garage doors, and adjusts for rough or masonry surfaces — then splits the total into 5-gallon buckets and single gallons.",
    keywords: [
      "exterior paint calculator",
      "how much paint to paint a house",
      "house paint calculator",
      "exterior house paint gallons",
      "siding paint calculator",
      "how many gallons of paint for exterior",
    ],
    howToUse: [
      "Measure the length and width of the house footprint and the wall height from the ground (or foundation top) to the eaves.",
      "Count the gable ends — the triangles under a pitched roof — and measure the height from the eave line to the peak.",
      "Count exterior doors and windows, and enter the area of anything else you won't paint, such as garage doors or brick sections.",
      "Choose the siding surface, set the coats and enter the coverage from the paint label.",
      "Read the total gallons, then the suggested mix of 5-gallon buckets and 1-gallon cans.",
    ],
    formula: {
      lines: [
        "Wall area = 2 × (length + width) × wall height",
        "Gable area = number of gables × ½ × house width × gable height",
        "Paintable area = wall area + gable area − (doors × 20) − (windows × 15) − other openings",
        "Paint (gal) = paintable area × coats × surface factor ÷ coverage × (1 + waste %)",
      ],
      notes: [
        "Gable ends are assumed to sit on the short (width) walls, which is the most common layout.",
        "Surface factors (+25% rough wood, +50% stucco or masonry) are planning allowances: rough surfaces have more area and absorb more paint. Use the label's rough-surface coverage when it is given.",
        "Trim, fascia, soffits and shutters are usually a separate color — estimate them separately.",
      ],
    },
    example: {
      scenario: "A 40 × 30 ft single-story house with 10 ft walls, two 6 ft gables, two doors and 10 windows, smooth fiber-cement siding, two coats at 300 sq ft per gallon.",
      inputs: { length: 40, width: 30, height: 10, gables: 2, gableHeight: 6, doors: 2, windows: 10, otherOpenings: 0, surface: 1, coats: 2, coverage: 300, waste: 10 },
      expected: { paintableArea: 1390, gableArea: 180, gallons: 10.1933, cans: 11, buckets: 2, extraCans: 1 },
      steps: [
        "Wall area = 2 × (40 + 30) × 10 = 1,400 sq ft.",
        "Gables = 2 × ½ × 30 × 6 = 180 sq ft.",
        "Openings = 2 × 20 + 10 × 15 = 190 sq ft, so paintable area = 1,400 + 180 − 190 = 1,390 sq ft.",
        "Paint = 1,390 × 2 ÷ 300 = 9.27 gallons; with 10% waste, 10.19 gallons.",
        "Round up to 11 gallons: two 5-gallon buckets plus one 1-gallon can.",
      ],
    },
    tips: [
      "Pour all the buckets into one large container ('boxing') before you start so the color is identical on every wall.",
      "Paint when the air and surface are within the label's temperature range (often 35–50 °F minimum) and no rain is expected for the cure time.",
      "Wash, scrape and spot-prime bare wood before painting — adhesion problems, not paint quality, cause most peeling.",
      "Spraying uses noticeably more paint than brushing and rolling because of overspray; add 20–30% if you plan to spray.",
      "Houses built before 1978 may have lead paint. Follow the EPA's lead-safe practices or hire an RRP-certified contractor before sanding or scraping.",
    ],
    faqs: [
      {
        q: "How much paint do I need for a 1,500 sq ft house?",
        a: "Floor area isn't wall area. A typical 1,500 sq ft single-story house has roughly 1,300–1,700 sq ft of exterior wall. At 300 sq ft per gallon, two coats need about 9–12 gallons, plus trim paint. Measure the walls for a real figure.",
      },
      {
        q: "How many square feet does a gallon of exterior paint cover?",
        a: "Most exterior paints list 250–400 sq ft per gallon on smooth, primed surfaces. Rough-sawn wood, shingles and stucco can cut that to 150–250 sq ft. Always check the label's figure for your surface.",
      },
      {
        q: "Should I buy 5-gallon buckets or single gallons?",
        a: "Five-gallon buckets usually cost less per gallon and give a consistent color batch. For anything over about 4 gallons of one color, a bucket plus a few single cans is normally the best value.",
      },
      {
        q: "Do I need one or two coats on the outside of my house?",
        a: "Two coats is the standard recommendation for durability and even color, especially on bare wood, a color change or weathered siding. A single coat can work when repainting the same color over sound, recently painted siding.",
      },
      {
        q: "How do I calculate the area of a gable?",
        a: "A gable is a triangle: ½ × base × height. On a 30 ft wide house with a 6 ft rise from the eaves to the peak, each gable is ½ × 30 × 6 = 90 sq ft.",
      },
      {
        q: "How much paint do I need for trim?",
        a: "Trim is usually a separate color. As a rough guide, a gallon of trim paint covers around 300–400 linear feet of 4–6 in trim per coat; most average houses need 1–3 gallons of trim paint.",
      },
    ],
    sources: [
      { title: "Exterior paint product data sheets (coverage and application conditions)", publisher: "Sherwin-Williams" },
      { title: "How to paint the exterior of a house", publisher: "Benjamin Moore" },
      { title: "Lead Renovation, Repair and Painting Program", publisher: "U.S. Environmental Protection Agency", url: "https://www.epa.gov/lead/lead-renovation-repair-and-painting-program" },
    ],
    related: ["paint-calculator", "primer-calculator", "wall-area-calculator", "siding-calculator", "paint-cost-calculator"],
  },
  {
    slug: "wallpaper-calculator",
    name: "Wallpaper Calculator",
    category: "paint-finishes",
    kind: "material",
    featured: true,
    seoTitle: "Wallpaper Calculator – How Many Rolls Do I Need?",
    description:
      "Calculate wallpaper rolls by counting full-height strips, with pattern repeat, roll size, doors and windows. Works for US double rolls and metric rolls.",
    intro:
      "Wallpaper is hung in vertical strips, so the most reliable way to estimate it is to count strips rather than divide square footage. This calculator works out how long each strip must be (including trimming and pattern matching), how many strips each roll yields, and how many strips go around your room — then tells you how many rolls to order.",
    keywords: [
      "wallpaper calculator",
      "how many rolls of wallpaper do i need",
      "wallpaper roll calculator",
      "wallpaper pattern repeat calculator",
      "wallpaper estimator",
      "double roll wallpaper coverage",
    ],
    howToUse: [
      "Measure the room's length, width and wall height.",
      "Count doors and windows. The calculator deducts whole strips only when the openings add up to at least a full strip.",
      "Enter the roll width and length from the label (US double rolls are about 20.5 in × 33 ft).",
      "Enter the pattern repeat from the label, or 0 for random-match papers and plain grasscloth.",
      "Read the number of rolls. Order them all at once from the same batch (dye lot).",
    ],
    formula: {
      lines: [
        "Strip length = wall height + 4 in trim, rounded up to a whole number of pattern repeats",
        "Strips around the room = perimeter ÷ roll width (rounded up)",
        "Strips saved by openings = (doors × 20 + windows × 15 sq ft) ÷ area of one strip (rounded down)",
        "Strips per roll = roll length ÷ strip length (rounded down)",
        "Rolls = strips needed ÷ strips per roll × (1 + waste %), rounded up",
      ],
      notes: [
        "The leftover piece at the end of each roll is usually too short to use, which is why strip counting is more accurate than area ÷ roll coverage.",
        "Drop-match patterns waste on average about half a repeat more per strip than straight matches; add a little extra waste for large drop repeats.",
      ],
    },
    example: {
      scenario: "A 12 × 10 ft bedroom with 8 ft walls, one door and two windows, using US double rolls (20.5 in × 33 ft) with a 21 in pattern repeat.",
      inputs: { length: 12, width: 10, height: 8, doors: 1, windows: 2, rollWidth: 20.5, rollLength: 33, repeat: 21, waste: 10 },
      expected: { stripLength: 105, strips: 23, stripsPerRoll: 3, rolls: 9, wallArea: 302 },
      steps: [
        "Strip length = 96 in + 4 in = 100 in, rounded up to whole 21 in repeats: 5 × 21 = 105 in.",
        "Perimeter = 2 × (12 + 10) = 44 ft = 528 in; 528 ÷ 20.5 = 25.8, so 26 strips.",
        "Openings = 50 sq ft; one strip covers 8.75 × 1.71 = 14.9 sq ft, so openings save 3 strips. Strips needed = 23.",
        "Strips per roll = 396 in ÷ 105 in = 3.77, so 3 usable strips per roll.",
        "Rolls = 23 ÷ 3 = 7.67; with 10% extra, 8.4, so order 9 double rolls.",
      ],
    },
    tips: [
      "Check that every roll has the same batch or lot number — colors can vary between print runs.",
      "Large pattern repeats waste a lot of paper. In the example, a random-match paper would need only 6 rolls for the same room.",
      "Prime walls with a wallpaper primer (sizing) so the paper slides into position and comes off cleanly later.",
      "Start hanging at the least visible corner, because the final strip rarely matches the first one perfectly.",
      "Keep at least one spare roll for future repairs; matching a discontinued pattern later is often impossible.",
    ],
    faqs: [
      {
        q: "How many rolls of wallpaper do I need for a 12 × 12 room?",
        a: "With 8 ft walls, a 12 × 12 room has 48 ft of wall, or about 29 strips of 20.5 in paper. With a short pattern repeat you get 3–4 strips per 33 ft double roll, so you need roughly 8–10 double rolls before deducting doors and windows. Use the calculator with your actual repeat.",
      },
      {
        q: "What is the difference between a single and a double roll?",
        a: "Wallpaper is priced by the single roll in the US but usually sold in double rolls. A double roll is about 20.5 in × 33 ft, roughly 56 sq ft; a single roll is half that. European rolls are typically 53 cm × 10 m, about 5.3 m².",
      },
      {
        q: "What does pattern repeat mean?",
        a: "The pattern repeat is the vertical distance before the design repeats. Each strip has to start at the same point in the pattern, so strip lengths are rounded up to whole repeats — a 21 in repeat can add several inches of waste per strip.",
      },
      {
        q: "Should I subtract doors and windows for wallpaper?",
        a: "Only partly. Paper still goes above doors and above and below windows, and the off-cuts are rarely usable elsewhere. This calculator deducts whole strips only when the openings add up to the area of a complete strip, which keeps the estimate on the safe side.",
      },
      {
        q: "How much extra wallpaper should I buy?",
        a: "Professionals typically allow about 10–15% extra, or at least one spare roll, for mistakes, damaged edges and future repairs. Paper with a large or drop-match repeat needs the higher figure.",
      },
    ],
    sources: [
      { title: "Wallpaper estimating and hanging guides", publisher: "York Wallcoverings" },
      { title: "How to measure for wallpaper", publisher: "Graham & Brown" },
      { title: "Wallcovering installation guidance", publisher: "Wallcoverings Association" },
    ],
    related: ["wall-area-calculator", "paint-calculator", "primer-calculator", "room-area-calculator"],
  },
  {
    slug: "primer-calculator",
    name: "Primer Calculator",
    category: "paint-finishes",
    kind: "material",
    seoTitle: "Primer Calculator – How Much Primer Do I Need?",
    description:
      "Find out how many gallons of primer to buy for walls and ceilings, adjusted for new drywall, bare wood or masonry. Results in gallons or litres.",
    intro:
      "Primer seals porous surfaces, blocks stains and helps the finish coat bond and look even. This primer calculator takes your wall and ceiling area, adjusts for how absorbent the surface is, and tells you how many gallons (or litres) to buy — so you can prime new drywall, patched walls or bare wood without running short.",
    keywords: [
      "primer calculator",
      "how much primer do i need",
      "primer coverage per gallon",
      "drywall primer calculator",
      "how many gallons of primer",
    ],
    howToUse: [
      "Enter the wall area to prime (net of doors and windows) and any ceiling area. The wall area calculator can work this out from room dimensions.",
      "Choose the surface: smooth or new drywall, porous bare wood or patched plaster, or masonry and stucco.",
      "Set the number of coats — one is normal; very porous or heavily stained surfaces may need two.",
      "Enter the primer's coverage from the can and read the gallons to buy.",
    ],
    formula: {
      lines: [
        "Area = wall area + ceiling area",
        "Primer (gal) = area × coats × surface factor ÷ coverage × (1 + waste %)",
      ],
      notes: [
        "Surface factors (+25% for bare wood or patched plaster, +50% for masonry) are planning allowances for absorbent or rough surfaces.",
        "Primer labels often quote 200–400 sq ft per gallon; drywall (PVA) primers sit at the higher end, stain-blocking and masonry primers at the lower end.",
      ],
    },
    example: {
      scenario: "A new 12 × 12 ft room with 8 ft drywall walls (384 sq ft) and a drywall ceiling (144 sq ft), one coat of drywall primer at 300 sq ft per gallon.",
      inputs: { wallArea: 384, ceilingArea: 144, surface: 1, coats: 1, coverage: 300, waste: 10 },
      expected: { area: 528, gallons: 1.936, cans: 2 },
      steps: [
        "Area = 384 + 144 = 528 sq ft.",
        "Primer = 528 × 1 coat × 1.0 ÷ 300 = 1.76 gallons.",
        "Add 10% waste: 1.76 × 1.10 = 1.94 gallons, so buy 2 gallons.",
      ],
    },
    tips: [
      "Use a PVA drywall primer on new drywall — it is inexpensive and evens out the porosity of paper and joint compound.",
      "Use a stain-blocking (often shellac- or oil-based) primer over water stains, smoke, marker or knots in wood.",
      "Ask the store to tint the primer toward your finish color, or gray for deep colors, to save a finish coat.",
      "Spot-priming small patches works on painted walls, but a full coat gives the most even sheen on new drywall.",
    ],
    faqs: [
      {
        q: "How much primer do I need for a 12 × 12 room?",
        a: "The walls of a 12 × 12 room with 8 ft ceilings are about 384 sq ft before openings. At 300 sq ft per gallon, one coat needs about 1.3 gallons, or 1.4 with waste, so buy 2 gallons — or 1 gallon if you subtract doors and windows and the primer covers 350 sq ft or more.",
      },
      {
        q: "Do I need primer before painting?",
        a: "Prime new drywall, bare wood, patched areas, stains and glossy surfaces. You can usually skip primer when repainting a sound, clean wall with a similar color.",
      },
      {
        q: "Does primer cover as much as paint?",
        a: "Usually a little less. Many primers cover 200–400 sq ft per gallon, while finish paints often cover 250–400. Porous surfaces absorb the first coat, which is exactly why primer is used there.",
      },
      {
        q: "Is paint-and-primer-in-one enough?",
        a: "Self-priming paints work well over previously painted, sound surfaces. For new drywall, bare wood, heavy stains or glossy surfaces, a dedicated primer still gives better adhesion and stain blocking.",
      },
      {
        q: "How many coats of primer do I need?",
        a: "One coat is enough for most jobs. Use two on very porous surfaces such as raw plaster or masonry, or when blocking strong stains or a very dark color.",
      },
    ],
    sources: [
      { title: "Primer product data sheets (coverage and recommended uses)", publisher: "Zinsser (Rust-Oleum)" },
      { title: "Why and when to use primer", publisher: "Sherwin-Williams" },
      { title: "Choosing the right primer", publisher: "Benjamin Moore" },
    ],
    related: ["paint-calculator", "number-of-coats-calculator", "wall-area-calculator", "ceiling-paint-calculator"],
  },
  {
    slug: "deck-stain-calculator",
    name: "Deck Stain Calculator",
    category: "paint-finishes",
    kind: "material",
    seoTitle: "Deck Stain Calculator – Gallons for Deck, Railings & Stairs",
    description:
      "Estimate how much deck stain to buy for the deck floor, railings and stairs. Enter size, coats and coverage to get gallons or litres of stain.",
    intro:
      "Deck stain coverage varies a lot with the wood's age and texture, and it's easy to forget the railings and stairs. This calculator adds up the deck floor, the railing (treated as a flat panel) and the steps, then applies your coats and the stain's coverage to tell you how many gallons to buy.",
    keywords: [
      "deck stain calculator",
      "how much deck stain do i need",
      "deck stain coverage",
      "gallons of stain for deck",
      "deck railing stain calculator",
    ],
    howToUse: [
      "Measure the deck's length and width.",
      "Measure the total length of railing and its height. Enter 0 if there is no railing.",
      "Count the steps and measure the stair width.",
      "Enter the number of coats and the coverage from the stain label — use the rough-wood figure for old or weathered boards.",
      "Read the gallons of stain to buy.",
    ],
    formula: {
      lines: [
        "Deck area = length × width",
        "Railing area = railing length × railing height",
        "Stair area = steps × stair width × 1.5 ft (tread + riser)",
        "Stain (gal) = (deck + railing + stairs) × coats ÷ coverage × (1 + waste %)",
      ],
      notes: [
        "A balustrade railing is treated as a solid panel: balusters have four faces but gaps between them, which roughly balances out.",
        "Each step is counted as about 1.5 sq ft per foot of width, covering a 10–11 in tread and a 7–7.5 in riser.",
      ],
    },
    example: {
      scenario: "A 16 × 12 ft deck with 40 ft of 3 ft railing and four 4 ft wide steps, two coats at 250 sq ft per gallon.",
      inputs: { length: 16, width: 12, railing: 40, railHeight: 3, steps: 4, stairWidth: 4, coats: 2, coverage: 250, waste: 10 },
      expected: { deckArea: 192, railArea: 120, stairArea: 24, totalArea: 336, gallons: 2.9568, cans: 3 },
      steps: [
        "Deck = 16 × 12 = 192 sq ft; railing = 40 × 3 = 120 sq ft; stairs = 4 × 4 × 1.5 = 24 sq ft.",
        "Total = 192 + 120 + 24 = 336 sq ft.",
        "Stain = 336 × 2 ÷ 250 = 2.69 gallons; with 10% waste, 2.96 gallons.",
        "Buy 3 gallons.",
      ],
    },
    tips: [
      "Clean the deck with a deck cleaner and let it dry for at least two days before staining.",
      "New pressure-treated lumber often needs weeks to dry out before it will absorb stain; sprinkle water on it — if it beads, wait.",
      "Many semi-transparent stains are applied in two thin coats, the second wet-on-wet; follow the label, because some products are one-coat only.",
      "Stir, don't shake, and box several cans together for an even color.",
      "Avoid staining in direct midday sun, which dries the stain too fast and leaves lap marks.",
    ],
    faqs: [
      {
        q: "How much stain do I need for a 12 × 12 deck?",
        a: "A 12 × 12 deck floor is 144 sq ft. Two coats at 250 sq ft per gallon need about 1.2 gallons, so buy 2 gallons — more if you also have railings and stairs, which can easily double the area.",
      },
      {
        q: "How many square feet does a gallon of deck stain cover?",
        a: "Typical labels list about 150–300 sq ft per gallon. Weathered, rough or very dry wood is at the low end; smooth, newer boards at the high end. Solid stains usually cover more than transparent ones on the second coat.",
      },
      {
        q: "How do I estimate stain for deck railings?",
        a: "Multiply the railing length by its height and treat it as a solid panel. A 40 ft run of 3 ft railing is about 120 sq ft per coat — often more than half of a small deck's floor area.",
      },
      {
        q: "One coat or two coats of deck stain?",
        a: "It depends on the product. Many semi-transparent and solid stains recommend two thin coats; some penetrating oils are designed as one coat. Never apply more than the wood can absorb — excess stain stays tacky and peels.",
      },
      {
        q: "Should I stain the underside of the deck boards?",
        a: "It isn't required. Some builders seal the ends and undersides of new boards to slow moisture uptake, but most homeowners stain only the top, edges, railings and stairs.",
      },
    ],
    sources: [
      { title: "Deck stain product data sheets (coverage and coats)", publisher: "Behr" },
      { title: "Wood Handbook: Wood as an Engineering Material — finishing wood", publisher: "USDA Forest Products Laboratory" },
      { title: "How to stain a deck", publisher: "Cabot" },
    ],
    related: ["deck-boards-calculator", "fence-stain-calculator", "deck-cost-calculator", "square-footage-calculator"],
  },
  {
    slug: "fence-stain-calculator",
    name: "Fence Stain Calculator",
    category: "paint-finishes",
    kind: "material",
    seoTitle: "Fence Stain Calculator – How Much Stain for My Fence?",
    description:
      "Estimate gallons of fence stain for privacy or picket fences, one or both sides, including rails. Shows 5-gallon buckets and single cans to buy.",
    intro:
      "A 100 ft privacy fence has over 1,000 sq ft of surface once you count both sides — more than many houses' interior walls. This fence stain calculator works from the fence length and height, accounts for the gaps between pickets and the back-side rails, and converts it all to gallons and 5-gallon buckets.",
    keywords: [
      "fence stain calculator",
      "how much stain for a fence",
      "fence stain coverage",
      "privacy fence stain gallons",
      "picket fence stain calculator",
    ],
    howToUse: [
      "Measure the total fence length and its height.",
      "Choose whether you're staining one side or both.",
      "Enter the board width and the gap between boards (0 for a solid privacy fence).",
      "Enter the number of horizontal rails — these appear on the back side, so they count only when staining both sides.",
      "Enter coats and coverage from the stain label, then read the gallons and buckets to buy.",
    ],
    formula: {
      lines: [
        "Board coverage = board width ÷ (board width + gap)",
        "Face area per side = length × height × board coverage",
        "Rail area (both sides only) = rails × length × 3.5 in ÷ 12",
        "Stain (gal) = (face area × sides + rail area) × coats ÷ coverage × (1 + waste %)",
      ],
      notes: [
        "Rails are assumed to be 2 × 4s with a 3.5 in face. Posts, board edges and the tops of rails are covered by the waste allowance.",
        "Rough-sawn cedar and pine fence boards absorb more stain than smooth lumber, so use the label's rough-surface coverage.",
      ],
    },
    example: {
      scenario: "A 100 ft, 6 ft high solid privacy fence with three rails, stained on both sides with one coat at 150 sq ft per gallon.",
      inputs: { length: 100, height: 6, sides: 2, boardWidth: 5.5, gap: 0, rails: 3, coats: 1, coverage: 150, waste: 10 },
      expected: { totalArea: 1287.5, gallons: 9.4417, cans: 10, buckets: 2, extraCans: 0 },
      steps: [
        "Board coverage = 5.5 ÷ (5.5 + 0) = 100%, so each side = 100 × 6 = 600 sq ft.",
        "Rails = 3 × 100 × 3.5 ÷ 12 = 87.5 sq ft.",
        "Total = 600 × 2 + 87.5 = 1,287.5 sq ft.",
        "Stain = 1,287.5 ÷ 150 = 8.58 gallons; with 10% waste, 9.44 gallons.",
        "Round up to 10 gallons: two 5-gallon buckets.",
      ],
    },
    tips: [
      "A pump or airless sprayer with a back-brush is the fastest way to stain a fence, but it uses more stain — keep the waste allowance at 15–20% if spraying.",
      "Wait until new pressure-treated or green lumber has dried out; water should soak in, not bead up.",
      "Stain the hidden edges of overlapping boards (board-on-board fences) before they're installed if you can.",
      "Cover plants and the neighbor's property, and check the weather — most stains need 24–48 hours without rain.",
    ],
    faqs: [
      {
        q: "How much stain do I need for a 6 ft privacy fence?",
        a: "Each foot of 6 ft privacy fence is 6 sq ft per side. At 150 sq ft per gallon, one coat on one side needs about 1 gallon per 25 ft of fence; both sides with rails need about 1 gallon per 11–12 ft.",
      },
      {
        q: "How many square feet does a gallon of fence stain cover?",
        a: "Labels typically list 100–200 sq ft per gallon on rough-sawn wood and up to about 300 sq ft on smooth wood. Old, dry wood soaks up much more on the first coat.",
      },
      {
        q: "How do I account for gaps in a picket fence?",
        a: "Enter the board width and the gap. With 3.5 in pickets and a 2.5 in gap, the boards cover 3.5 ÷ 6 = 58% of the fence face, so you need about 58% of the stain a solid fence of the same size would need.",
      },
      {
        q: "Do I need to stain both sides of the fence?",
        a: "Both sides weather, so staining both protects the wood best. If a neighbor owns the other side, you'll need their agreement to stain it.",
      },
      {
        q: "Is it better to spray or brush fence stain?",
        a: "Spraying is much faster, but back-brushing or rolling afterwards works the stain into the wood and gives a more even, longer-lasting finish. Expect sprayers to use more stain because of overspray.",
      },
    ],
    sources: [
      { title: "Exterior wood stain product data sheets", publisher: "Behr" },
      { title: "Wood Handbook: Wood as an Engineering Material — finishing wood", publisher: "USDA Forest Products Laboratory" },
      { title: "How to stain a fence", publisher: "Thompson's WaterSeal" },
    ],
    related: ["fence-calculator", "deck-stain-calculator", "fence-cost-calculator", "linear-feet-calculator"],
  },
  {
    slug: "cabinet-paint-calculator",
    name: "Cabinet Paint Calculator",
    category: "paint-finishes",
    kind: "material",
    seoTitle: "Cabinet Paint Calculator – How Much Paint for Kitchen Cabinets?",
    description:
      "Estimate paint and primer for kitchen cabinets from the number and size of doors and drawers plus face frames. Results in quarts, gallons or litres.",
    intro:
      "Painting kitchen cabinets takes less paint than most people expect, but it needs the right paint and usually a bonding primer. Enter the number and average size of your doors and drawer fronts, the face-frame area, and your coats, and this calculator tells you how many quarts or gallons of cabinet paint and primer to buy.",
    keywords: [
      "cabinet paint calculator",
      "how much paint for kitchen cabinets",
      "cabinet paint quarts or gallon",
      "painting kitchen cabinets paint amount",
      "cabinet primer calculator",
    ],
    howToUse: [
      "Count the cabinet doors and measure an average door's width and height in inches.",
      "Choose whether you'll paint fronts only or fronts and backs.",
      "Count drawer fronts and measure an average one.",
      "Estimate the face frames and visible cabinet sides in square feet (frame width × height of each cabinet run, plus end panels).",
      "Set coats, coverage and whether you'll prime, then read the quarts or gallons to buy.",
    ],
    formula: {
      lines: [
        "Door area = doors × width × height ÷ 144 × sides",
        "Drawer area = drawer fronts × width × height ÷ 144",
        "Total area = door area + drawer area + face frames",
        "Paint (gal) = total area × coats ÷ coverage × (1 + waste %)",
        "Primer (gal) = total area ÷ primer coverage × (1 + waste %)",
      ],
      notes: [
        "Dimensions are in inches; dividing by 144 converts square inches to square feet.",
        "Door edges and raised-panel profiles add a little area, which the waste allowance covers.",
      ],
    },
    example: {
      scenario: "A kitchen with 20 doors (15 × 30 in, both sides), 8 drawer fronts (15 × 6 in), 40 sq ft of face frames, two coats at 350 sq ft per gallon, and one coat of primer at 300 sq ft per gallon.",
      inputs: { doors: 20, doorWidth: 15, doorHeight: 30, doorSides: 2, drawers: 8, drawerWidth: 15, drawerHeight: 6, frameArea: 40, coats: 2, coverage: 350, primer: 1, primerCoverage: 300, waste: 10 },
      expected: { area: 170, gallons: 1.0686, quarts: 5, primerGallons: 0.6233, primerQuarts: 3 },
      steps: [
        "Doors = 20 × 15 × 30 ÷ 144 × 2 = 125 sq ft.",
        "Drawers = 8 × 15 × 6 ÷ 144 = 5 sq ft. Total = 125 + 5 + 40 = 170 sq ft.",
        "Paint = 170 × 2 ÷ 350 × 1.10 = 1.07 gallons — buy 1 gallon plus 1 quart (5 quarts).",
        "Primer = 170 ÷ 300 × 1.10 = 0.62 gallons — 3 quarts, or a gallon if it's cheaper.",
      ],
    },
    tips: [
      "Use a cabinet-grade enamel (waterborne alkyd or urethane-modified acrylic) — it levels out brush marks and cures hard.",
      "Degrease every surface first; kitchen grease is the main cause of paint failure on cabinets.",
      "Scuff-sand glossy finishes and use a bonding primer so the paint grips.",
      "Label doors and hinges as you remove them, and paint doors flat on a rack to avoid drips.",
      "Allow the full cure time on the label (often a week or more) before heavy use, even if the paint feels dry.",
    ],
    faqs: [
      {
        q: "How much paint do I need for kitchen cabinets?",
        a: "An average kitchen with 20–30 doors and drawers has roughly 120–200 sq ft of surface to paint, both sides of the doors included. Two coats usually need 1–1.5 gallons of paint plus about 3 quarts to 1 gallon of primer.",
      },
      {
        q: "Should I buy quarts or a gallon of cabinet paint?",
        a: "If you need more than about 3 quarts, a gallon is usually cheaper and avoids color variation between cans. Quarts make sense for a small bathroom vanity.",
      },
      {
        q: "Do I need to paint the inside of cabinet doors?",
        a: "Most people paint both sides of the doors because the backs are visible when the doors open. The cabinet interiors are usually left as they are.",
      },
      {
        q: "Do I need primer to paint cabinets?",
        a: "Yes, in most cases. Factory finishes are slick and often contain lacquer or varnish, so scuff-sand and use a bonding primer. Stain-blocking primer also stops wood tannins bleeding through light colors.",
      },
      {
        q: "How many coats of paint do cabinets need?",
        a: "Two thin coats of finish paint over one coat of primer is the standard. Thin coats level better and cure harder than one thick coat.",
      },
    ],
    sources: [
      { title: "Cabinet and trim enamel product data sheets", publisher: "Sherwin-Williams" },
      { title: "How to paint kitchen cabinets", publisher: "Benjamin Moore" },
      { title: "Bonding primer product data sheets", publisher: "Zinsser (Rust-Oleum)" },
    ],
    related: ["paint-calculator", "primer-calculator", "kitchen-remodel-cost-calculator", "paint-cost-calculator"],
  },
  {
    slug: "epoxy-floor-coating-calculator",
    name: "Epoxy Floor Coating Calculator",
    category: "paint-finishes",
    kind: "material",
    seoTitle: "Epoxy Floor Calculator – How Much Epoxy for a Garage Floor?",
    description:
      "Calculate gallons of epoxy floor coating and kits for a garage or basement from floor size, coats, mil thickness and solids content. Feet or metres.",
    intro:
      "Epoxy coverage depends on how thick each coat is and how much of the product is solids. A 100%-solids epoxy keeps its full wet thickness, while a water-based kit loses about half to evaporation. This calculator uses the standard film-thickness formula to tell you how many gallons and kits you need for a garage, basement or shop floor.",
    keywords: [
      "epoxy floor calculator",
      "how much epoxy for garage floor",
      "epoxy coverage calculator",
      "garage floor coating calculator",
      "epoxy mil thickness coverage",
    ],
    howToUse: [
      "Measure the floor's length and width (a typical two-car garage is about 20–24 ft square).",
      "Enter the number of coats — usually a base coat plus a topcoat.",
      "Enter the dry film thickness per coat and the solids by volume from the product data sheet.",
      "Enter the mixed volume of one kit, then read the gallons and kits to buy.",
    ],
    formula: {
      lines: [
        "Coverage (sq ft/gal) = 1,604 × solids % ÷ dry film thickness (mils)",
        "Epoxy (gal) = floor area × coats ÷ coverage × (1 + waste %)",
        "Wet film thickness = dry film thickness ÷ solids %",
      ],
      notes: [
        "One US gallon is 231 cu in; spread 1 mil (0.001 in) thick it covers 231 ÷ (144 × 0.001) ≈ 1,604 sq ft.",
        "Porous or rough concrete absorbs some of the first coat, so theoretical coverage is a best case — the waste allowance covers this.",
      ],
    },
    example: {
      scenario: "A 24 × 24 ft two-car garage, two coats of 100%-solids epoxy at 10 mils each, sold in 1-gallon kits.",
      inputs: { length: 24, width: 24, coats: 2, dft: 10, solids: 100, kitSize: 1, waste: 10 },
      expected: { area: 576, coverage: 160.4167, gallons: 7.8994, kits: 8, wetMils: 10 },
      steps: [
        "Floor area = 24 × 24 = 576 sq ft.",
        "Coverage = 1,604 × 1.00 ÷ 10 = 160 sq ft per gallon per coat.",
        "Epoxy = 576 × 2 ÷ 160.4 = 7.18 gallons; with 10% waste, 7.90 gallons.",
        "Buy 8 one-gallon kits.",
      ],
    },
    tips: [
      "Test for moisture first: tape a 2 × 2 ft plastic sheet to the slab for 24 hours; condensation underneath means epoxy may fail.",
      "Grind or acid-etch the concrete to open the surface — epoxy won't bond to smooth, sealed or oily concrete.",
      "Mix only what you can apply within the pot life, and pour it out of the bucket onto the floor promptly to extend working time.",
      "Broadcast decorative flakes into the wet base coat if you want texture and to hide imperfections; add a clear topcoat for durability.",
      "Ventilate well and wear the gloves and respirator recommended on the safety data sheet.",
    ],
    faqs: [
      {
        q: "How much epoxy do I need for a 2-car garage?",
        a: "A 24 × 24 ft garage is 576 sq ft. At 10 mils per coat with 100%-solids epoxy (about 160 sq ft per gallon), two coats need about 7–8 gallons. A water-based kit at 50% solids applied to 4 mils dry covers about 200 sq ft per gallon per coat.",
      },
      {
        q: "What does 'solids by volume' mean?",
        a: "It's the share of the coating that stays on the floor after the solvent or water evaporates. A 50%-solids product applied 10 mils wet dries to 5 mils; a 100%-solids epoxy dries to the same thickness it was applied.",
      },
      {
        q: "How thick should a garage floor epoxy be?",
        a: "Roll-on garage systems are commonly 8–15 mils per coat, and multi-coat flake systems total 20–30 mils or more. Always follow the manufacturer's recommended thickness for the product you buy.",
      },
      {
        q: "How many square feet does a gallon of epoxy cover?",
        a: "At 1 mil a gallon would cover about 1,604 sq ft, so coverage is 1,604 × solids ÷ thickness. That's about 160 sq ft per gallon at 10 mils for 100%-solids epoxy, or 200 sq ft at 8 mils.",
      },
      {
        q: "Should I add extra epoxy for porous concrete?",
        a: "Yes. New or rough concrete soaks up part of the first coat. Allow 15–20% extra on porous slabs, or apply a penetrating epoxy primer first.",
      },
    ],
    sources: [
      { title: "Epoxy floor coating product data sheets (solids, film thickness and coverage)", publisher: "Rust-Oleum" },
      { title: "Coating thickness and spread rate fundamentals", publisher: "AMPP (Association for Materials Protection and Performance)" },
      { title: "Concrete moisture testing guidance", publisher: "American Concrete Institute" },
    ],
    related: ["square-footage-calculator", "concrete-slab-calculator", "paint-cost-calculator", "floor-leveling-compound-calculator"],
  },
  {
    slug: "paint-cost-calculator",
    name: "Paint Cost Calculator",
    category: "paint-finishes",
    kind: "cost",
    seoTitle: "Paint Cost Calculator – Material Cost for Your Painting Project",
    description:
      "Estimate the cost of paint, primer and supplies for a room or house. Picks the cheapest mix of 1-gallon cans and 5-gallon buckets. Prices editable.",
    intro:
      "Know what your paint will cost before you head to the store. Enter the area, coats, coverage and the prices you see locally, and this calculator works out the gallons needed, finds the cheapest combination of single gallons and 5-gallon buckets, and adds primer and supplies for a complete materials budget.",
    keywords: [
      "paint cost calculator",
      "how much does paint cost",
      "cost to paint a room materials",
      "paint price per gallon",
      "painting budget calculator",
    ],
    howToUse: [
      "Enter the total area to paint (walls and ceilings, net of doors and windows).",
      "Set coats and coverage from the paint can.",
      "Enter local prices for a gallon and a 5-gallon bucket of your chosen paint.",
      "Add primer if needed and enter its price and coverage.",
      "Enter a figure for rollers, brushes, tape and drop cloths, then read the total material cost.",
    ],
    formula: {
      lines: [
        "Paint (gal) = area × coats ÷ coverage × (1 + waste %), rounded up to whole gallons",
        "Paint cost = cheapest mix of 5-gallon buckets and 1-gallon cans for those gallons",
        "Primer cost = gallons of primer (rounded up) × primer price",
        "Total = paint + primer + supplies",
      ],
      notes: ["Labor is not included — see the painter labor cost calculator."],
    },
    example: {
      scenario: "800 sq ft of walls, two coats at 350 sq ft per gallon, paint at $45 per gallon or $200 per 5-gallon bucket, one coat of primer at $25 per gallon (300 sq ft per gallon) and $50 of supplies.",
      inputs: { area: 800, coats: 2, coverage: 350, pricePerGallon: 45, pricePerBucket: 200, primer: 1, primerPrice: 25, primerCoverage: 300, supplies: 50, waste: 10 },
      expected: { gallons: 5.0286, paintCost: 245, primerCost: 75, total: 370, costPerSqFt: 0.4625 },
      steps: [
        "Paint = 800 × 2 ÷ 350 × 1.10 = 5.03 gallons, so 6 gallons to buy.",
        "Six single gallons cost $270; one bucket plus one gallon costs $200 + $45 = $245 — the cheapest option.",
        "Primer = 800 ÷ 300 × 1.10 = 2.93 gallons → 3 × $25 = $75.",
        "Total = $245 + $75 + $50 = $370, or about $0.46 per sq ft.",
      ],
    },
    tips: [
      "Mid-range paint often costs less overall than budget paint because it covers in fewer coats.",
      "Watch for seasonal paint sales — major brands and retailers commonly run them around holiday weekends.",
      "Reuse roller frames and good brushes; buy new roller covers for each color.",
      "Tinted primer can save a full coat of more expensive finish paint when changing colors.",
    ],
    faqs: [
      {
        q: "How much does a gallon of paint cost?",
        a: "In the US, interior wall paint typically costs about $25–$80 per gallon depending on brand and quality line; premium exterior and cabinet paints can cost more. Five-gallon buckets usually cost less per gallon. Prices vary by region and retailer.",
      },
      {
        q: "How much does it cost to paint a 12 × 12 room yourself?",
        a: "A 12 × 12 room needs about 2–3 gallons for two coats on the walls. At $30–$60 per gallon plus $30–$60 of supplies, expect roughly $90–$240 in materials.",
      },
      {
        q: "Is a 5-gallon bucket cheaper than buying single gallons?",
        a: "Usually, if you need four or more gallons of one color. This calculator compares both options and uses the cheaper mix.",
      },
      {
        q: "How much should I budget for painting supplies?",
        a: "For a room or two, rollers, covers, a brush, tray, tape, drop cloths and patching compound typically cost $30–$80. Add more for ladders or a sprayer if you don't own them.",
      },
      {
        q: "Does expensive paint really save money?",
        a: "Higher-quality paints generally have more pigment and binder, so they hide better and last longer. If they save a coat, the extra cost per gallon is often recovered.",
      },
    ],
    sources: [
      { title: "Interior paint product lines and pricing", publisher: "The Home Depot" },
      { title: "Interior paint product lines and pricing", publisher: "Sherwin-Williams" },
      { title: "How much paint do I need?", publisher: "Benjamin Moore" },
    ],
    related: ["paint-calculator", "painter-labor-cost-calculator", "primer-calculator", "renovation-budget-calculator"],
    cost: {
      priceRange: "Paint typically $25–$80 per gallon; about $0.15–$0.60 per sq ft of wall for two coats, materials only",
      assumptions: [
        "Typical US retail prices; your local prices may be higher or lower — edit them above.",
        "Gallons are rounded up to whole cans, and the cheaper mix of buckets and cans is used.",
        "Primer is bought in single gallons.",
        "Labor, ladders, sprayers and wall repairs are not included.",
      ],
      updated: "2026-10-28",
    },
  },
  {
    slug: "painter-labor-cost-calculator",
    name: "Painter Labor Cost Calculator",
    category: "paint-finishes",
    kind: "cost",
    seoTitle: "Painter Labor Cost Calculator – Estimate Painting Labor",
    description:
      "Estimate painter labor cost from the area, coats, production rate, prep time, trim and hourly rate. See total hours, crew days and labor per sq ft.",
    intro:
      "Most of a professional paint job's price is labor. This calculator estimates it the way painters do: surface area and coats divided by a production rate, plus prep and setup time and time for doors and window trim, multiplied by an hourly rate. Use it to sanity-check a quote or plan your own time.",
    keywords: [
      "painter labor cost calculator",
      "cost to hire a painter",
      "painting labor cost per square foot",
      "painter hourly rate",
      "interior painting labor estimate",
    ],
    howToUse: [
      "Enter the area to paint (walls and ceilings) and the number of coats.",
      "Set a production rate. 150 sq ft per hour per painter is a reasonable average for rolling and cutting in walls; use less for high ceilings, dark colors or lots of corners.",
      "Add hours for prep, setup and cleanup, and the number of doors and windows with trim to paint.",
      "Enter the hourly rate for each painter and the crew size, then read the labor cost and schedule.",
    ],
    formula: {
      lines: [
        "Painting hours = area × coats ÷ production rate",
        "Total hours = painting hours + prep hours + trim items × hours per item",
        "Labor cost = total hours × hourly rate",
        "Crew days = total hours ÷ (crew × 8)",
      ],
      notes: [
        "Hourly rates quoted by painting companies usually include their overhead and profit.",
        "Many contractors quote by the room or by square foot instead; dividing their price by the hours above shows the implied hourly rate.",
      ],
    },
    example: {
      scenario: "1,200 sq ft of walls and ceilings, two coats at 150 sq ft per hour, 6 hours of prep, no trim, two painters at $50 per hour.",
      inputs: { area: 1200, coats: 2, rate: 150, prepHours: 6, trimItems: 0, hourlyRate: 50, crew: 2 },
      expected: { hours: 22, laborCost: 1100, days: 1.375, costPerSqFt: 0.9167 },
      steps: [
        "Painting hours = 1,200 × 2 ÷ 150 = 16 hours.",
        "Total hours = 16 + 6 prep = 22 hours.",
        "Labor = 22 × $50 = $1,100, about $0.92 per sq ft of surface.",
        "With two painters, that's 22 ÷ 16 = 1.4 working days.",
      ],
    },
    tips: [
      "Get at least three written quotes that spell out prep work, number of coats, paint brand and what trim is included.",
      "Moving furniture and patching walls yourself can cut the prep hours you pay for.",
      "Ceilings, stairwells and dark color changes take longer per square foot than ordinary walls.",
      "Ask whether the painter holds the required license and insurance in your state, and for lead-safe certification on pre-1978 homes.",
    ],
    faqs: [
      {
        q: "How much do painters charge per hour?",
        a: "In the US, painters typically charge about $25–$75 per hour per painter, depending on region, experience and whether the rate includes the company's overhead. Prices vary widely by market.",
      },
      {
        q: "How much does painting labor cost per square foot?",
        a: "Interior painting labor is often quoted around $1–$3 per sq ft of wall surface, with more for ceilings, trim-heavy rooms and extensive repairs. Use the calculator to see what a quote implies in hours.",
      },
      {
        q: "How long does it take to paint a room?",
        a: "A 12 × 12 bedroom (about 330 sq ft of wall) with two coats takes one painter roughly 4–5 hours of painting at 150 sq ft per hour, plus 2–3 hours of prep and cleanup — usually a one-day job.",
      },
      {
        q: "Is it cheaper to pay painters by the hour or by the job?",
        a: "A fixed price protects you from overruns; an hourly rate can be cheaper for simple, well-prepared rooms. Either way, ask for an estimate of hours so you can compare quotes.",
      },
      {
        q: "Does labor cost include paint?",
        a: "Usually not separately — many contractors include materials in their quote and mark them up. Use the paint cost calculator to see the material part.",
      },
    ],
    sources: [
      { title: "Painting production rates and estimating guidance", publisher: "Painting Contractors Association (PCA)" },
      { title: "Occupational Outlook Handbook: Painters, Construction and Maintenance", publisher: "U.S. Bureau of Labor Statistics", url: "https://www.bls.gov/ooh/construction-and-extraction/painters-construction-and-maintenance.htm" },
      { title: "Lead Renovation, Repair and Painting Program", publisher: "U.S. Environmental Protection Agency", url: "https://www.epa.gov/lead/lead-renovation-repair-and-painting-program" },
    ],
    related: ["paint-cost-calculator", "paint-calculator", "contractor-markup-calculator", "renovation-budget-calculator"],
    cost: {
      priceRange: "About $25–$75 per painter-hour; often $1–$3 per sq ft of wall for interior labor",
      assumptions: [
        "Typical US rates that vary by region, season and contractor — edit the rate above.",
        "Production rate is per painter per coat; complex rooms are slower.",
        "Materials, wall repairs beyond basic patching and furniture moving by the contractor are not included.",
      ],
      updated: "2026-10-28",
    },
  },
  {
    slug: "number-of-coats-calculator",
    name: "Number of Coats Calculator",
    category: "paint-finishes",
    kind: "planning",
    seoTitle: "How Many Coats of Paint Do I Need? – Coats Calculator",
    description:
      "Find out how many coats of paint and primer you need based on the surface and color change, plus how many gallons of each to buy for your wall area.",
    intro:
      "One coat or two? Do you need primer? The answer depends on the surface you're painting and how big the color change is. Pick your surface and color change and this calculator recommends the number of primer and finish coats, following the guidance paint manufacturers give, then works out how much of each to buy.",
    keywords: [
      "how many coats of paint",
      "number of coats calculator",
      "do i need primer",
      "coats of paint for color change",
      "one or two coats of paint",
    ],
    howToUse: [
      "Choose the surface condition: sound painted wall, patched/stained/glossy, or new or bare material.",
      "Choose how much the color is changing.",
      "Enter the area and the coverage of your paint and primer.",
      "Read the recommended coats and gallons.",
    ],
    formula: {
      lines: [
        "Primer coats = 1 if the surface is patched, stained, glossy or bare, or the change is light-over-dark or a deep color; otherwise 0",
        "Finish coats = 1 for the same color on a sound painted surface; otherwise 2",
        "Paint (gal) = area × finish coats ÷ coverage × (1 + waste %)",
        "Primer (gal) = area × primer coats ÷ primer coverage × (1 + waste %)",
      ],
      notes: [
        "For deep colors, ask for primer tinted gray or toward the finish color; without it, deep reds and blues can need three or more finish coats.",
      ],
    },
    example: {
      scenario: "400 sq ft of previously painted walls in good condition, changing to a deep navy, paint at 350 and primer at 300 sq ft per gallon.",
      inputs: { surface: 0, color: 3, area: 400, coverage: 350, primerCoverage: 300, waste: 10 },
      expected: { finishCoats: 2, primerCoats: 1, gallons: 2.5143, primerGallons: 1.4667 },
      steps: [
        "A deep color calls for a tinted primer coat plus two finish coats.",
        "Paint = 400 × 2 ÷ 350 × 1.10 = 2.51 gallons — buy 3.",
        "Primer = 400 × 1 ÷ 300 × 1.10 = 1.47 gallons — buy 2.",
      ],
    },
    tips: [
      "Let each coat dry for the recoat time on the can; painting too soon can lift the coat underneath.",
      "Hold a work light at a low angle to the wall to spot thin areas before deciding on another coat.",
      "Deep and bright colors are often tinted into a special base with less hiding power — plan on the extra coat.",
      "A second coat also improves washability and sheen uniformity, not just color.",
    ],
    faqs: [
      {
        q: "Do I need two coats of paint?",
        a: "Two coats are the standard recommendation for even color and durability. One coat can be enough when repainting the same color on a clean, sound wall with good-quality paint.",
      },
      {
        q: "How many coats to cover a dark color with a light color?",
        a: "Plan on one coat of primer and two coats of the new color. Without primer, covering a dark color with a light one can take three or more coats.",
      },
      {
        q: "Do I need primer on new drywall?",
        a: "Yes. New drywall has paper and joint compound that absorb paint differently. A coat of drywall primer prevents 'flashing' (patchy sheen) and saves finish paint.",
      },
      {
        q: "Can I use paint-and-primer-in-one instead of primer?",
        a: "Over sound, previously painted walls, yes. For bare drywall, stains, glossy surfaces or big color changes, a dedicated primer still works better and is cheaper per gallon.",
      },
      {
        q: "How long should I wait between coats?",
        a: "Many latex wall paints can be recoated in about 2–4 hours, and oil-based paints often need 24 hours. Humidity and cold slow drying, so follow the label.",
      },
    ],
    sources: [
      { title: "Painting tips: primer and number of coats", publisher: "Sherwin-Williams" },
      { title: "How many coats of paint do I need?", publisher: "Benjamin Moore" },
      { title: "Primer selection guide", publisher: "Zinsser (Rust-Oleum)" },
    ],
    related: ["paint-calculator", "primer-calculator", "paint-cost-calculator", "ceiling-paint-calculator"],
  },
];
