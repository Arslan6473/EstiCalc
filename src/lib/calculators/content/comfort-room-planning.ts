import type { CalculatorContent } from "../types";

export const content: CalculatorContent[] = [
  {
    slug: "ac-btu-calculator",
    name: "AC BTU Calculator",
    category: "comfort-room-planning",
    kind: "planning",
    safety: true,
    seoTitle: "AC BTU Calculator – What Size Air Conditioner Do I Need?",
    description:
      "Find the right air conditioner size in BTU for a room. Based on the ENERGY STAR sizing chart with adjustments for sun, shade, occupants and kitchens.",
    intro:
      "Choosing a room air conditioner that is too small leaves you hot; one that is too big cycles on and off without drying the air, leaving the room cold and clammy. This calculator uses the room-size chart published by ENERGY STAR, then applies its standard adjustments for sunny or shaded rooms, extra occupants and kitchens, and suggests the next common unit size.",
    keywords: [
      "ac btu calculator",
      "what size air conditioner do i need",
      "btu calculator for room",
      "window ac size calculator",
      "air conditioner size by square feet",
      "how many btu do i need",
    ],
    howToUse: [
      "Measure the room's length and width. For an open-plan space, include the whole area the unit has to cool.",
      "Choose the sun exposure: heavily shaded, average, or very sunny (large west- or south-facing windows).",
      "Enter how many people regularly use the room at the same time.",
      "Choose whether it is a kitchen, then read the BTU needed and the next common unit size.",
    ],
    formula: {
      lines: [
        "Base BTU/hr from the ENERGY STAR chart by floor area (e.g. 150–250 sq ft → 6,000; 250–300 → 7,000; 450–550 → 12,000)",
        "Heavily shaded room: base × 0.9; very sunny room: base × 1.1",
        "Add 600 BTU/hr for each regular occupant beyond two",
        "Kitchen: add 4,000 BTU/hr",
        "Tons = BTU/hr ÷ 12,000",
      ],
      notes: [
        "The chart assumes 8 ft ceilings and ordinary insulation. Rooms over 2,500 sq ft are beyond the chart and are scaled from its top row — at that size you need a whole-house system sized by a professional.",
        "This is a rule-of-thumb sizing for room (window, portable and through-wall) units. Central air and heat pumps should be sized with an ACCA Manual J load calculation.",
      ],
    },
    example: {
      scenario: "A 20 × 14 ft living room with big west-facing windows (very sunny), used by three people in the evening. It is not a kitchen.",
      inputs: { length: 20, width: 14, sun: 2, occupants: 3, kitchen: 0 },
      expected: { area: 280, baseBtu: 7000, btu: 8300, suggested: 9000, tons: 0.692 },
      steps: [
        "Area = 20 × 14 = 280 sq ft, which falls in the 250–300 sq ft row: 7,000 BTU/hr.",
        "Very sunny: 7,000 × 1.10 = 7,700 BTU/hr.",
        "One person beyond two: 7,700 + 600 = 8,300 BTU/hr.",
        "The next common size up is a 9,000 BTU unit (about 0.69 tons needed).",
      ],
    },
    tips: [
      "Do not oversize: ENERGY STAR notes that an oversized unit removes humidity less effectively, so the room can feel damp and cold.",
      "Check the unit's voltage — larger window units (often above about 12,000–15,000 BTU) may need a 240 V circuit. Have an electrician confirm your circuit before installing.",
      "Look for the ENERGY STAR label and a high CEER rating to reduce running costs.",
      "Close blinds on sunny windows during the afternoon; shading can cut the cooling load noticeably.",
      "Portable ACs are often rated differently (SACC); compare their seasonally adjusted rating with this result.",
    ],
    faqs: [
      {
        q: "What size air conditioner do I need for a 12 × 12 room?",
        a: "A 12 × 12 room is 144 sq ft, which ENERGY STAR puts at 5,000 BTU/hr. Bump it to about 5,500 BTU (a 6,000 BTU unit) if the room is very sunny, and add 600 BTU for each regular occupant beyond two.",
      },
      {
        q: "How many BTU do I need per square foot?",
        a: "Room-AC sizing works out to roughly 20 BTU per sq ft for small and medium rooms, falling to about 14–18 BTU per sq ft for large spaces in the ENERGY STAR chart. Sun, occupants, insulation and climate all change the real number.",
      },
      {
        q: "What size AC for 500 square feet?",
        a: "500 sq ft is in the 450–550 sq ft row of the ENERGY STAR chart: 12,000 BTU/hr (1 ton). A very sunny room would need about 13,200 BTU, so a 14,000 BTU unit.",
      },
      {
        q: "Is a bigger air conditioner better?",
        a: "No. An oversized unit cools the air quickly and shuts off before it removes much moisture, so the room feels clammy and the unit short-cycles, which wastes energy and wears it out faster.",
      },
      {
        q: "How many BTU does a kitchen need?",
        a: "ENERGY STAR recommends adding 4,000 BTU/hr if the unit will cool a kitchen, to offset heat from cooking appliances.",
      },
      {
        q: "Can I use this to size central air conditioning?",
        a: "Use it only as a rough check. Central systems and heat pumps should be sized with an ACCA Manual J load calculation, which accounts for insulation, windows, air leakage, duct location and your local climate. Ask an HVAC contractor for one.",
      },
    ],
    sources: [
      { title: "Room Air Conditioners — sizing chart and buying guidance", publisher: "ENERGY STAR (U.S. EPA)" },
      { title: "Manual J Residential Load Calculation", publisher: "Air Conditioning Contractors of America (ACCA)" },
      { title: "Room Air Conditioners", publisher: "U.S. Department of Energy — Energy Saver" },
    ],
    related: ["room-heating-calculator", "ceiling-fan-size-calculator", "room-area-calculator", "square-footage-calculator", "window-area-calculator"],
  },
  {
    slug: "room-heating-calculator",
    name: "Room Heating Calculator",
    category: "comfort-room-planning",
    kind: "planning",
    safety: true,
    seoTitle: "Room Heating Calculator – BTU and Watts to Heat a Room",
    description:
      "Estimate how many BTU or watts you need to heat a room, adjusted for climate, ceiling height and insulation — plus how many 1,500 W heaters that is.",
    intro:
      "Whether you are choosing a space heater, a wall heater or a mini-split for one room, you need a rough idea of the heat output required. This calculator uses common BTU-per-square-foot rules of thumb for your climate, adjusts for ceiling height and how well the room holds heat, and converts the result to watts and a number of electric heaters.",
    keywords: [
      "room heating calculator",
      "btu heating calculator",
      "space heater size calculator",
      "how many watts to heat a room",
      "heater size for room",
    ],
    howToUse: [
      "Measure the room's length and width and its ceiling height.",
      "Pick the climate band that best matches your winters.",
      "Choose the insulation level: newer and well sealed, average, or older and drafty.",
      "Enter the heater wattage you are considering (1,500 W is typical for plug-in heaters) and read the result.",
    ],
    formula: {
      lines: [
        "Heat needed (BTU/hr) = area × climate BTU per sq ft × (ceiling height ÷ 8) × insulation factor",
        "Climate: warm 30, moderate 40, cold 50, very cold 60 BTU/hr per sq ft",
        "Insulation factor: well insulated 0.9, average 1.0, poorly insulated 1.2",
        "Watts = BTU/hr ÷ 3.412; heaters = watts ÷ heater wattage, rounded up",
      ],
      notes: [
        "These are planning rules of thumb, not a heat-loss calculation. A whole-house furnace, boiler or heat pump must be sized with an ACCA Manual J load calculation.",
        "A widely quoted shortcut for supplemental electric heat is about 10 W per sq ft (34 BTU/hr) for an 8 ft ceiling in average conditions; colder climates need more.",
      ],
    },
    example: {
      scenario: "A 15 × 12 ft bedroom with 8 ft ceilings in a moderate climate and average insulation, heated with 1,500 W heaters.",
      inputs: { length: 15, width: 12, height: 8, climate: 40, insulation: 1, heaterWatts: 1500 },
      expected: { area: 180, btu: 7200, watts: 2110.2, heaters: 2, btuPerSqFt: 40 },
      steps: [
        "Area = 15 × 12 = 180 sq ft.",
        "Heat = 180 × 40 BTU × (8 ÷ 8) × 1.0 = 7,200 BTU/hr.",
        "Watts = 7,200 ÷ 3.412 ≈ 2,110 W.",
        "2,110 ÷ 1,500 = 1.4, so two 1,500 W heaters (or one larger hard-wired heater) would be needed as the only heat source.",
      ],
    },
    tips: [
      "Plug space heaters directly into a wall outlet — not an extension cord or power strip — and keep them at least 3 ft from anything that can burn, as fire-safety agencies advise.",
      "A standard 15 A, 120 V circuit can supply one 1,500 W heater; two on the same circuit will usually trip the breaker.",
      "Choose heaters with tip-over and overheat shut-off and a recognised safety listing (UL, ETL or CSA).",
      "Sealing drafts around windows and doors often reduces the heat needed more cheaply than a bigger heater.",
      "Hard-wired baseboard and wall heaters must be installed to code — hire a licensed electrician.",
    ],
    faqs: [
      {
        q: "How many watts do I need to heat a room?",
        a: "A common rule of thumb is about 10 W per sq ft for a room with 8 ft ceilings in average conditions, so a 150 sq ft room needs about 1,500 W. In colder climates or poorly insulated rooms, plan on more.",
      },
      {
        q: "How big a room will a 1,500 W heater heat?",
        a: "A 1,500 W heater puts out about 5,100 BTU/hr. As supplemental heat it is usually rated for around 150 sq ft; as the only heat source in a cold climate it may comfortably heat closer to 100 sq ft.",
      },
      {
        q: "How many BTU per square foot do I need for heating?",
        a: "Rules of thumb range from about 30 BTU per sq ft in warm climates to 60 BTU per sq ft in very cold ones, for 8 ft ceilings. Insulation, windows and air leakage can move the real figure a lot.",
      },
      {
        q: "How do I convert watts to BTU?",
        a: "1 watt = 3.412 BTU/hr. Multiply watts by 3.412 to get BTU/hr, or divide BTU/hr by 3.412 to get watts. A 1,500 W heater is about 5,118 BTU/hr.",
      },
      {
        q: "Should I use this to size a furnace or heat pump?",
        a: "No. It is meant for single rooms and supplemental heaters. Whole-house equipment should be sized by an HVAC professional using an ACCA Manual J calculation; oversized furnaces and heat pumps short-cycle and waste energy.",
      },
      {
        q: "Do high ceilings need more heat?",
        a: "Yes. There is more air to heat and warm air collects near the ceiling. The calculator scales the result by ceiling height ÷ 8 ft; a ceiling fan on low in reverse can push warm air back down.",
      },
    ],
    sources: [
      { title: "Portable Heaters", publisher: "U.S. Department of Energy — Energy Saver" },
      { title: "Space heater safety", publisher: "U.S. Consumer Product Safety Commission (CPSC)" },
      { title: "Heating safety tips", publisher: "National Fire Protection Association (NFPA)" },
      { title: "Manual J Residential Load Calculation", publisher: "Air Conditioning Contractors of America (ACCA)" },
    ],
    related: ["ac-btu-calculator", "ceiling-fan-size-calculator", "attic-insulation-calculator", "window-area-calculator", "room-area-calculator"],
  },
  {
    slug: "ceiling-fan-size-calculator",
    name: "Ceiling Fan Size Calculator",
    category: "comfort-room-planning",
    kind: "planning",
    seoTitle: "Ceiling Fan Size Calculator – Blade Span and Downrod Length",
    description:
      "Find the right ceiling fan size for your room: recommended blade span by square footage, the downrod length for your ceiling height and blade clearance.",
    intro:
      "A ceiling fan that is too small barely moves the air; one that is too large can feel like a wind tunnel. Enter the room size and ceiling height, and the calculator recommends a blade span range, how many fans a very large room needs, and the downrod length that puts the blades at a comfortable, safe height.",
    keywords: [
      "ceiling fan size calculator",
      "what size ceiling fan do i need",
      "ceiling fan size chart",
      "downrod length calculator",
      "ceiling fan blade span",
    ],
    howToUse: [
      "Measure the room's length and width. For an open plan, measure the zone the fan will serve.",
      "Enter the ceiling height.",
      "Enter the fan's height without a downrod (ceiling to blades) from the spec sheet — about 12 in is typical.",
      "Read the blade span range, number of fans and suggested downrod length.",
    ],
    formula: {
      lines: [
        "Area = length × width",
        "Fans = area ÷ 600 sq ft, rounded up (minimum 1); area per fan = area ÷ fans",
        "Blade span by area per fan: ≤75 sq ft 29–36 in; 76–144 → 36–42 in; 145–225 → 44–50 in; 226–400 → 50–54 in; over 400 → 56–72 in",
        "Downrod = (ceiling height − 8.5 ft) × 12 − fan height, minimum 0",
        "Blade height = ceiling height − (fan height + downrod) ÷ 12",
      ],
      notes: [
        "The span bands follow common manufacturer sizing charts and U.S. Department of Energy guidance that 36–44 in fans suit rooms up to about 225 sq ft and 52 in or larger fans suit bigger rooms.",
        "Splitting rooms over 600 sq ft between several fans is a planning rule of thumb for even airflow.",
        "Downrods are sold in fixed lengths; pick the nearest size that keeps blades at least 7 ft above the floor.",
      ],
    },
    example: {
      scenario: "A 16 × 14 ft bedroom with a 10 ft ceiling and a fan that hangs 12 in from the ceiling without a downrod.",
      inputs: { length: 16, width: 14, height: 10, fanHeight: 12 },
      expected: { area: 224, fans: 1, spanMin: 44, spanMax: 50, downrod: 6, bladeHeight: 8.5 },
      steps: [
        "Area = 16 × 14 = 224 sq ft — one fan.",
        "224 sq ft falls in the 145–225 sq ft band: a 44–50 in blade span.",
        "Downrod = (10 − 8.5) × 12 − 12 = 18 − 12 = 6 in.",
        "Blade height = 10 − (12 + 6) ÷ 12 = 8.5 ft above the floor.",
      ],
    },
    tips: [
      "Keep blades at least 7 ft above the floor; 8–9 ft gives the best airflow. DOE Energy Saver also suggests 10–12 in below the ceiling and at least 18 in from walls.",
      "On sloped or vaulted ceilings, use an angled-ceiling adapter and a downrod long enough for the blades to clear the slope.",
      "Mount fans only on an electrical box rated for ceiling fan support — a standard light-fixture box can fail. Hire an electrician if you are unsure.",
      "Run the fan counter-clockwise (viewed from below) in summer for a cooling breeze, and clockwise on low in winter to push warm air down.",
      "ENERGY STAR-certified fans and DC motors use noticeably less electricity than older models.",
    ],
    faqs: [
      {
        q: "What size ceiling fan for a 12 × 12 room?",
        a: "A 12 × 12 room is 144 sq ft, which suits a 36–42 in fan. A 42 in fan is the more common choice for a standard bedroom.",
      },
      {
        q: "What size ceiling fan for a 20 × 20 living room?",
        a: "400 sq ft calls for about a 50–54 in fan. If the room is open to another space or long and narrow, consider a 56 in or larger fan, or two smaller fans.",
      },
      {
        q: "How long should a ceiling fan downrod be?",
        a: "Choose a downrod that puts the blades about 8–9 ft above the floor. With a typical fan, that means little or no downrod on an 8–9 ft ceiling, about 6 in on 10 ft, about 18 in on 11 ft and about 30 in on 12 ft.",
      },
      {
        q: "How low can a ceiling fan hang?",
        a: "Blades should be at least 7 ft above the floor for safety — fan manufacturers and product safety standards call for this clearance. For low ceilings, choose a low-profile (hugger) fan.",
      },
      {
        q: "Is a bigger ceiling fan better?",
        a: "Not necessarily. Airflow (CFM) depends on motor, blade pitch and speed as well as size. Match the span to the room and compare the CFM and CFM-per-watt figures on the box.",
      },
    ],
    sources: [
      { title: "Fans for Cooling", publisher: "U.S. Department of Energy — Energy Saver" },
      { title: "Ceiling Fans — ENERGY STAR certified products", publisher: "ENERGY STAR (U.S. EPA)" },
      { title: "Ceiling fan size guide", publisher: "Hunter Fan Company" },
    ],
    related: ["ac-btu-calculator", "room-heating-calculator", "light-lumens-calculator", "room-area-calculator"],
  },
  {
    slug: "light-lumens-calculator",
    name: "Light Lumens Calculator",
    category: "comfort-room-planning",
    kind: "planning",
    seoTitle: "Lumens Calculator – How Much Light Does a Room Need?",
    description:
      "Calculate the lumens a room needs from its size and use, using foot-candle guidelines for living rooms, kitchens, baths and offices — plus the number of bulbs.",
    intro:
      "Lighting is measured in lumens, and the right amount depends on the size of the room and what you do in it. Pick the room type, enter its dimensions and the brightness of the bulbs you plan to buy, and the calculator converts a recommended light level (in foot-candles) into total lumens and a bulb count.",
    keywords: [
      "lumens calculator",
      "how many lumens do i need",
      "lumens per square foot",
      "room lighting calculator",
      "foot candle calculator",
    ],
    howToUse: [
      "Measure the room's length and width.",
      "Choose the room type, or Custom to enter your own foot-candle target.",
      "Enter the lumens of the bulb you plan to use (printed on the Lighting Facts label).",
      "Read the total lumens and the number of bulbs.",
    ],
    formula: {
      lines: [
        "Area = length × width",
        "Lumens needed = area × foot-candles (1 foot-candle = 1 lumen per sq ft)",
        "Bulbs = lumens needed ÷ lumens per bulb, rounded up",
      ],
      notes: [
        "Foot-candle targets are typical residential guidance: living rooms and bedrooms 10–20, kitchens and dining 30–40, kitchen work areas and bathrooms 70–80, offices about 50, hallways 5–10. The calculator uses the middle of each band.",
        "This is the light leaving the fixtures; dark walls, tall ceilings and shades absorb some, so add more for those rooms.",
      ],
    },
    example: {
      scenario: "A 14 × 12 ft living room lit to 15 foot-candles with 800-lumen LED bulbs.",
      inputs: { length: 14, width: 12, roomType: 0, bulbLumens: 800 },
      expected: { area: 168, footCandles: 15, lumens: 2520, bulbs: 4 },
      steps: [
        "Area = 14 × 12 = 168 sq ft.",
        "Lumens = 168 × 15 = 2,520 lumens.",
        "Bulbs = 2,520 ÷ 800 = 3.15, so plan for 4 bulbs of 800 lumens.",
      ],
    },
    tips: [
      "Layer the light: general (ceiling), task (under-cabinet, desk, vanity) and accent lamps. Task areas need far more light than the room average.",
      "Use dimmers so one lighting plan works for both bright tasks and relaxing evenings.",
      "Compare bulbs by lumens, not watts. An 800-lumen LED replaces a 60 W incandescent while drawing only about 8–10 W.",
      "Choose colour temperature by room: 2700–3000 K feels warm for living spaces; 3500–4000 K suits kitchens and work areas.",
    ],
    faqs: [
      {
        q: "How many lumens do I need for a living room?",
        a: "Living rooms typically need 10–20 foot-candles, or 10–20 lumens per sq ft. A 12 × 15 ft (180 sq ft) living room needs roughly 1,800–3,600 lumens from all its lights combined.",
      },
      {
        q: "How many lumens for a kitchen?",
        a: "For general kitchen lighting plan on 30–40 lumens per sq ft, and 70–80 on countertops and other work surfaces. A 150 sq ft kitchen needs about 4,500–6,000 lumens of general light plus task lighting.",
      },
      {
        q: "How many lumens is a 60 W bulb?",
        a: "A 60 W incandescent bulb gives about 800 lumens. A 75 W equivalent is about 1,100 lumens and a 100 W equivalent about 1,600 lumens.",
      },
      {
        q: "What is a foot-candle?",
        a: "A foot-candle is one lumen of light falling on one square foot. Lighting designers use it to set target brightness for a space; multiplying foot-candles by area gives the lumens needed.",
      },
      {
        q: "Do higher ceilings need more lumens?",
        a: "Yes. Light spreads out over a greater distance, so less reaches the floor. For ceilings above about 9 ft, increase your target or use fixtures that aim light downward.",
      },
    ],
    sources: [
      { title: "The Lighting Handbook", publisher: "Illuminating Engineering Society (IES)" },
      { title: "Lumens and the Lighting Facts label", publisher: "U.S. Department of Energy — Energy Saver" },
      { title: "Lighting Facts label rules", publisher: "U.S. Federal Trade Commission (FTC)" },
    ],
    related: ["ceiling-fan-size-calculator", "room-area-calculator", "window-area-calculator", "square-footage-calculator"],
  },
  {
    slug: "rug-size-calculator",
    name: "Rug Size Calculator",
    category: "comfort-room-planning",
    kind: "planning",
    seoTitle: "Rug Size Calculator – What Size Rug for My Room, Bed or Table?",
    description:
      "Find the right rug size for a living room, dining table or bed. Get the ideal dimensions and the closest standard size, such as 5×8, 8×10 or 9×12.",
    intro:
      "The most common rug mistake is buying one that is too small. Choose whether the rug is for a whole room, under a dining table or under a bed, enter a few measurements, and the calculator works out the ideal rug dimensions using standard design guidelines, then picks the closest standard size you can buy off the shelf.",
    keywords: [
      "rug size calculator",
      "what size rug do i need",
      "rug size guide",
      "dining room rug size",
      "rug size for queen bed",
    ],
    howToUse: [
      "Choose where the rug is going: a whole room, under a dining table or under a bed.",
      "For a room, enter its length and width and the bare-floor border you want (18 in is common).",
      "For a dining table, enter the table size and how far the rug should extend (24 in minimum for chairs).",
      "For a bed, pick the mattress size and how far the rug should extend past the sides, then read the ideal and standard sizes.",
    ],
    formula: {
      lines: [
        "Room: rug = (room length − 2 × border) × (room width − 2 × border); choose the largest standard size that fits inside",
        "Dining: rug = (table length + 2 × reach) × (table width + 2 × reach); choose the smallest standard size that covers it",
        "Bed: rug = (bed width + 2 × reach) across × (⅔ × bed length + reach) deep, placed under the lower two-thirds of the bed",
        "Standard sizes checked: 2×3, 3×5, 4×6, 5×7, 5×8, 6×9, 8×10, 9×12, 10×14, 12×15 ft (either orientation)",
      ],
      notes: [
        "Mattress sizes used: twin 38×75 in, full 54×75, queen 60×80, king 76×80, California king 72×84.",
      ],
    },
    example: {
      scenario: "A 15 × 12 ft living room where you want about 18 in of bare floor showing on every side.",
      inputs: { use: 0, roomLength: 15, roomWidth: 12, border: 18 },
      expected: { idealLength: 12, idealWidth: 9, standardLength: 12, standardWidth: 9, idealArea: 108 },
      steps: [
        "Border on both sides = 2 × 18 in = 36 in = 3 ft.",
        "Ideal rug = (15 − 3) × (12 − 3) = 12 × 9 ft.",
        "The largest standard size that fits is 9 × 12 ft — an exact match.",
      ],
    },
    tips: [
      "In a living room, aim for at least the front legs of every sofa and chair to sit on the rug so the seating area feels connected.",
      "Under a dining table, measure with chairs pulled out — chair legs catching the rug edge is a common annoyance.",
      "Mark the proposed size on the floor with painter's tape before buying to see how it looks.",
      "Use a non-slip rug pad about 1 in smaller than the rug on each side.",
      "If no standard size fits a large or oddly shaped room, a carpet retailer can cut and bind broadloom to any size.",
    ],
    faqs: [
      {
        q: "What size rug for a queen bed?",
        a: "An 8 × 10 ft rug turned so the 10 ft side runs across the bed gives about 2 ft of rug on each side of a queen mattress. A 9 × 12 gives more coverage in larger rooms.",
      },
      {
        q: "What size rug for a king bed?",
        a: "A 9 × 12 ft rug placed across the bed is the usual choice — a king is 76 in wide, so an 8 × 10 leaves less than 2 ft on each side.",
      },
      {
        q: "What size rug do I need under a dining table?",
        a: "Add at least 24 in on every side of the table. A 6 × 3.5 ft table needs about 10 × 7.5 ft of rug, so an 8 × 10 ft rug is the standard choice.",
      },
      {
        q: "How much floor should show around an area rug?",
        a: "Designers typically leave 12–24 in of bare floor between the rug and the walls, with 18 in a common target. Smaller rooms can go down to about 8–12 in.",
      },
      {
        q: "What size rug for a 12 × 15 living room?",
        a: "With an 18 in border, the ideal rug is 9 × 12 ft, which is a standard size. An 8 × 10 also works if you prefer more visible floor.",
      },
    ],
    sources: [
      { title: "Mattress size standards", publisher: "International Sleep Products Association (ISPA)" },
      { title: "Rug size guide", publisher: "Pottery Barn" },
      { title: "How to choose a rug size", publisher: "Crate & Barrel" },
    ],
    related: ["room-area-calculator", "carpet-calculator", "curtain-size-calculator", "square-footage-calculator"],
  },
  {
    slug: "curtain-size-calculator",
    name: "Curtain Size Calculator",
    category: "comfort-room-planning",
    kind: "planning",
    seoTitle: "Curtain Size Calculator – Curtain Length, Width and Rod Size",
    description:
      "Work out curtain length, how many panels you need and the curtain rod length for any window. Choose floor, puddle or sill length and how full you want them.",
    intro:
      "Curtains look best when they are hung high and wide and are full enough to gather softly when closed. Enter your window's width, where you want the curtains to end and how high and wide you will mount the rod, and the calculator gives the finished curtain length, the ready-made length to buy, the number of panels and the rod length.",
    keywords: [
      "curtain size calculator",
      "what size curtains do i need",
      "curtain length calculator",
      "how wide should curtains be",
      "curtain rod length calculator",
    ],
    howToUse: [
      "Measure the window width across the outside of the trim.",
      "Pick a length style. For floor-length styles, measure from the top of the trim to the floor; for sill styles, from the top of the trim to the sill.",
      "Enter how high above the trim and how far past each side you will mount the rod.",
      "Choose a fullness and the width of one ready-made panel, then read the results.",
    ],
    formula: {
      lines: [
        "Rod length = window width + 2 × rod extension",
        "Total curtain width = rod length × fullness",
        "Panels = total curtain width ÷ panel width, rounded up to an even number for a pair",
        "Floor styles: length = trim-to-floor + rod height − ½ in (float), +0 (kiss), +1 in (break) or +6 in (puddle)",
        "Sill styles: length = window height + rod height − ½ in (sill) or + 4 in (below sill)",
      ],
      notes: [
        "Length is measured from where the curtain hangs — the top of the rod for grommet and rod-pocket panels, or the ring eyelet for clip rings.",
        "Ready-made panels commonly come in 63, 84, 95, 108 and 120 in lengths; buy the next size up and hem.",
      ],
    },
    example: {
      scenario: "A 48 in wide window whose trim top is 84 in above the floor, with the rod 5 in above the trim and 6 in past each side, 2× fullness, floor-length curtains and 50 in wide panels.",
      inputs: { windowWidth: 48, style: 0, frameToFloor: 84, rodAbove: 5, rodExtension: 6, fullness: 2, panelWidth: 50 },
      expected: { rodLength: 60, fabricWidth: 120, panels: 4, length: 88.5, standardLength: 95 },
      steps: [
        "Rod length = 48 + 2 × 6 = 60 in.",
        "Total width at 2× fullness = 60 × 2 = 120 in; 120 ÷ 50 = 2.4 → 3 panels, rounded to 4 for an even pair.",
        "Length = 84 + 5 − 0.5 = 88.5 in to float just above the floor.",
        "Buy 95 in panels and hem them, or use clip rings to take up some of the length.",
      ],
    },
    tips: [
      "Hang the rod high — halfway between the trim and the ceiling, or just below crown moulding, makes windows look taller.",
      "Extend the rod far enough that open curtains stack against the wall, not over the glass.",
      "Sheer and lightweight fabrics need more fullness (2.5–3×) than heavy, lined drapes.",
      "Measure each window separately — older homes often have windows of slightly different sizes.",
      "Wash or steam fabric before hemming if it may shrink.",
    ],
    faqs: [
      {
        q: "How wide should curtains be?",
        a: "For a soft, gathered look, the combined width of the panels should be about 2 to 2.5 times the rod length. Use 1.5× for a flat, tailored look and up to 3× for sheers.",
      },
      {
        q: "How long should curtains be?",
        a: "Floor-length curtains that float about ½ in above the floor are the most popular and easiest to clean around. A 1 in break or 6 in puddle looks more formal; sill-length suits kitchens and windows above radiators or furniture.",
      },
      {
        q: "How many curtain panels do I need for a 72 in window?",
        a: "With the rod 6 in past each side (84 in rod) and 2× fullness you need 168 in of curtain. With 50 in panels that is 3.4, so buy 4 panels (2 pairs).",
      },
      {
        q: "How far should a curtain rod extend past the window?",
        a: "Typically 3–10 in on each side. More extension lets the stacked curtains clear the glass and makes the window look wider.",
      },
      {
        q: "What length curtains for an 8 ft ceiling?",
        a: "With the rod mounted near the ceiling, most 8 ft (96 in) rooms suit 84 in or 95 in panels, depending on rod height. Measure from the rod to the floor and pick the next standard length up.",
      },
    ],
    sources: [
      { title: "How to measure for curtains and drapes", publisher: "The Home Depot" },
      { title: "Curtain and drapery measuring guide", publisher: "Pottery Barn" },
      { title: "Window treatment measuring instructions", publisher: "Hunter Douglas" },
    ],
    related: ["window-area-calculator", "rug-size-calculator", "light-lumens-calculator", "linear-feet-calculator"],
  },
  {
    slug: "window-area-calculator",
    name: "Window Area Calculator",
    category: "comfort-room-planning",
    kind: "planning",
    seoTitle: "Window Area Calculator – Total Glazing and Code Minimums",
    description:
      "Add up the area of every window in a room and compare it with the IRC minimums of 8% of floor area for natural light and 4% openable area for ventilation.",
    intro:
      "Window area matters for natural light, heat gain and loss, window film and treatments, and building-code checks. Enter up to three window sizes and how many of each, plus the room's floor size, and the calculator totals the window area and compares it with the International Residential Code's minimum glazing and ventilation for habitable rooms.",
    keywords: [
      "window area calculator",
      "window square footage calculator",
      "glazing area calculator",
      "window to floor ratio",
      "natural light requirement",
    ],
    howToUse: [
      "Measure the width and height of each window in inches. For code checks, measure the glass; for coverings or film, measure what you need to cover.",
      "Enter up to three window sizes and how many of each.",
      "Enter the room's length and width to compare window area with floor area (or 0 to skip).",
      "Read the total window area, the percentage of floor area and the IRC minimums.",
    ],
    formula: {
      lines: [
        "Window area (sq ft) = count × width (in) × height (in) ÷ 144, summed for each window type",
        "Window-to-floor ratio = window area ÷ floor area × 100",
        "IRC minimum glazing = 8% of floor area; minimum openable area for natural ventilation = 4% of floor area",
      ],
      notes: [
        "IRC Section R303.1 allows exceptions, for example where mechanical ventilation and artificial light meeting the code are provided. Your local code may differ.",
        "Sleeping rooms also need an emergency escape opening (IRC R310) — a size check that uses the net clear opening, not the window area.",
      ],
    },
    example: {
      scenario: "A 14 × 12 ft bedroom with two 36 × 60 in windows and one 24 × 36 in window.",
      inputs: { w1Count: 2, w1Width: 36, w1Height: 60, w2Count: 1, w2Width: 24, w2Height: 36, w3Count: 0, roomLength: 14, roomWidth: 12 },
      expected: { area: 36, count: 3, floorArea: 168, pctFloor: 21.43, minGlazing: 13.44, minVent: 6.72 },
      steps: [
        "Large windows: 2 × 36 × 60 ÷ 144 = 30 sq ft.",
        "Small window: 1 × 24 × 36 ÷ 144 = 6 sq ft. Total = 36 sq ft.",
        "Floor area = 14 × 12 = 168 sq ft, so windows equal 36 ÷ 168 = 21.4% of the floor.",
        "IRC minimums: 8% × 168 = 13.4 sq ft of glazing and 4% × 168 = 6.7 sq ft openable.",
      ],
    },
    tips: [
      "Window frames take up part of the rough size; glass area is smaller than the overall unit, so measure the glass when checking code minimums.",
      "Use the area to estimate window film, screens or the cooling load from sunny windows.",
      "When replacing windows, the opening and egress requirements of the current code usually apply — check with your building department.",
      "Look for ENERGY STAR-certified windows rated for your climate zone to cut heat loss and gain.",
    ],
    faqs: [
      {
        q: "How do you calculate window area?",
        a: "Multiply width by height. In inches, divide by 144 to get square feet — a 36 × 60 in window is 2,160 sq in, or 15 sq ft. Add the areas of all windows in the room.",
      },
      {
        q: "How much window area does a bedroom need by code?",
        a: "Under IRC R303.1, habitable rooms need glazing of at least 8% of the floor area and an openable area of at least 4% for natural ventilation, unless code-compliant artificial light and mechanical ventilation are provided. A 12 × 12 bedroom needs about 11.5 sq ft of glass and 5.8 sq ft openable.",
      },
      {
        q: "What is the minimum egress window size?",
        a: "The IRC requires emergency escape openings in sleeping rooms with a net clear opening of at least 5.7 sq ft (5.0 sq ft at grade-floor level), at least 24 in high and 20 in wide, with a sill no more than 44 in above the floor. Local codes may vary.",
      },
      {
        q: "What is a good window-to-floor ratio?",
        a: "Code minimum is 8% of floor area for natural light. Many well-lit rooms are in the 15–25% range. More glass brings more daylight but also more heat gain and loss, so window quality matters.",
      },
      {
        q: "Should I measure the window frame or the glass?",
        a: "It depends on the purpose. Code light requirements refer to the glazed area, so measure the glass. For blinds, curtains or replacement windows, measure the opening or trim as the product instructions describe.",
      },
    ],
    sources: [
      { title: "International Residential Code — R303 Light, Ventilation and Heating; R310 Emergency Escape and Rescue Openings", publisher: "International Code Council (ICC)" },
      { title: "Residential Windows, Doors and Skylights", publisher: "ENERGY STAR (U.S. EPA)" },
      { title: "Energy-efficient window coverings and windows", publisher: "U.S. Department of Energy — Energy Saver" },
    ],
    related: ["curtain-size-calculator", "wall-area-calculator", "ac-btu-calculator", "room-heating-calculator", "light-lumens-calculator"],
  },
];
