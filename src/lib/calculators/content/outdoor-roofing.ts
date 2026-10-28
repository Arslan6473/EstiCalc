import type { CalculatorContent } from "../types";

const IRC = "International Code Council (International Residential Code)";
const AWC_DCA6 = { title: "DCA 6 — Prescriptive Residential Wood Deck Construction Guide", publisher: "American Wood Council" };

export const content: CalculatorContent[] = [
  {
    slug: "fence-calculator",
    name: "Fence Calculator",
    category: "outdoor-roofing",
    kind: "material",
    featured: true,
    seoTitle: "Fence Calculator – Posts, Rails, Pickets, Panels & Concrete",
    description:
      "Free fence calculator: enter fence length, height, post spacing and gates to get posts, rails, pickets or panels and bags of concrete. Feet or metres.",
    intro:
      "Plan a wood or panel fence in one go. Enter the total fence length, height, post spacing, corners and gates, and the calculator works out how many posts, rails and pickets (or prefab panels) you need, how long the posts must be, and how many bags of concrete to set them — with a waste allowance for bad boards and spillage.",
    keywords: [
      "fence calculator",
      "fence post calculator",
      "how many fence posts do i need",
      "fence picket calculator",
      "fence material calculator",
      "concrete for fence posts",
      "privacy fence calculator",
    ],
    howToUse: [
      "Measure the full fence line in feet (or metres), including the gate openings, and count the corners.",
      "Enter the fence height and the post spacing — 8 ft on center is standard for wood privacy fences and most prefab panels.",
      "Choose pickets on rails or prefab panels. For pickets, enter the board width and any gap between boards.",
      "Enter the number of gates and their width so the openings are removed from the picket count.",
      "Set the post size, hole diameter and embedment depth, pick a concrete bag size, and read your material list.",
    ],
    formula: {
      lines: [
        "Fenced length = total length − (gates × gate width)",
        "Posts = ⌈fenced length ÷ post spacing⌉ + 1 + corners + gates",
        "Sections = posts − 1 − gates;  Rails = sections × rails per section",
        "Pickets = fenced length × 12 ÷ (picket width + gap) × (1 + waste %)",
        "Concrete per post = (π × (hole Ø ÷ 2)² − post width²) × depth ÷ 1,728 cu ft",
        "Bags = posts × concrete per post × (1 + waste %) ÷ bag yield",
      ],
      notes: [
        "Each corner and each gate adds a post because the fence sections restart there.",
        "Premixed concrete yields roughly 0.375 cu ft per 50 lb bag of fast-setting mix, 0.45 cu ft per 60 lb bag and 0.60 cu ft per 80 lb bag.",
        "Post length = fence height + embedment depth. Most guides bury about one-third of the above-ground height, and deeper where frost heave is a concern.",
      ],
    },
    example: {
      scenario:
        "A 100 ft, 6 ft tall privacy fence with one 4 ft gate, posts 8 ft apart, three rails per section, 5½ in pickets butted tight, 4×4 posts set 24 in deep in 10 in holes with 80 lb bags of concrete.",
      inputs: { length: 100, height: 6, spacing: 8, style: 0, corners: 0, gates: 1, gateWidth: 4, rails: 3, picketWidth: 5.5, picketGap: 0, postSize: 3.5, holeDiameter: 10, holeDepth: 24, bagYield: 0.6, waste: 10 },
      expected: { posts: 14, sections: 12, rails: 40, pickets: 231, postLength: 8, concrete: 14.1787, bags: 24 },
      steps: [
        "Fenced length = 100 − 4 = 96 ft, so 96 ÷ 8 = 12 sections.",
        "Posts = 12 + 1 + 0 corners + 1 gate = 14 posts, each 6 + 2 = 8 ft long.",
        "Rails = 12 sections × 3 = 36, plus 10% = 39.6 → 40 rails.",
        "Pickets = 96 × 12 ÷ 5.5 = 209.5, plus 10% = 230.4 → 231 pickets.",
        "Concrete per post = (π × 5² − 3.5²) × 24 ÷ 1,728 = 0.92 cu ft; 14 posts × 0.92 × 1.10 = 14.18 cu ft.",
        "14.18 ÷ 0.60 cu ft per 80 lb bag = 23.6 → 24 bags.",
      ],
    },
    tips: [
      "Call 811 (in the US) a few days before you dig so buried utility lines can be marked.",
      "Confirm your property line and any HOA or city height limits before buying materials — 6 ft is a common maximum for back-yard fences.",
      "Put 4–6 in of gravel in the bottom of each hole for drainage, and crown the concrete at the top so water runs away from the post.",
      "Use ground-contact rated pressure-treated posts (UC4A or better) even if the rest of the fence is cedar.",
      "Gate posts carry the most load — many builders upsize them to 6×6 or set them deeper.",
    ],
    faqs: [
      {
        q: "How many fence posts do I need for 100 feet?",
        a: "At 8 ft spacing, a straight 100 ft fence needs 100 ÷ 8 = 12.5, rounded up to 13 sections, plus one end post — 14 posts. Each corner and gate adds roughly one more. At 6 ft spacing you would need 18 posts.",
      },
      {
        q: "How far apart should fence posts be?",
        a: "6 to 8 ft on center is standard. Wood privacy fences and most prefab panels use 8 ft; go closer (6 ft) for tall fences, windy sites or heavy materials such as solid board-on-board.",
      },
      {
        q: "How many bags of concrete per fence post?",
        a: "A 4×4 post set 24 in deep in a 10 in hole needs about 0.92 cu ft of concrete — roughly 1½ 80 lb bags or 2½ 50 lb bags of fast-setting mix. A 6×6 in a 12 in hole, 36 in deep, needs about 1.7 cu ft (three 80 lb bags).",
      },
      {
        q: "How deep should fence posts be?",
        a: "A common rule is to bury at least one-third of the post's above-ground height — about 2 ft for a 6 ft fence, which is why 8 ft posts are standard. In cold climates go below the frost line, and check local code.",
      },
      {
        q: "How many pickets do I need per 8 ft section?",
        a: "With 5½ in wide pickets and no gap, an 8 ft (96 in) section takes 96 ÷ 5.5 = 17.5, so 18 pickets. With a 2 in gap between 3½ in pickets it takes 96 ÷ 5.5 = about 18 as well.",
      },
      {
        q: "How long should fence posts be?",
        a: "Add the fence height to the embedment depth. A 6 ft fence with 2 ft in the ground needs 8 ft posts; a 4 ft fence usually uses 6 ft posts.",
      },
    ],
    sources: [
      { title: "Setting fence posts — product yields and instructions", publisher: "Quikrete" },
      { title: "How to build a wood fence", publisher: "The Home Depot" },
      { title: "Call before you dig — 811", publisher: "Common Ground Alliance" },
    ],
    related: ["fence-cost-calculator", "post-hole-calculator", "concrete-bags-calculator", "fence-stain-calculator", "linear-feet-calculator"],
  },
  {
    slug: "deck-boards-calculator",
    name: "Deck Boards Calculator",
    category: "outdoor-roofing",
    kind: "material",
    featured: true,
    seoTitle: "Deck Boards Calculator – How Many Deck Boards Do I Need?",
    description:
      "Free deck boards calculator: enter deck size, board width, gap and board length to see how many decking boards and screws to buy. Wood or composite.",
    intro:
      "Work out how many deck boards to buy for a new deck or a re-deck. Enter the deck's length and width, the actual board width, the gap between boards and the length of board you plan to buy, and the calculator gives the number of rows, total linear feet, boards and face screws — with a waste allowance for end cuts and staggered joints.",
    keywords: [
      "deck boards calculator",
      "how many deck boards do i need",
      "decking calculator",
      "composite decking calculator",
      "deck board linear feet",
      "deck screws calculator",
    ],
    howToUse: [
      "Measure the deck length in the direction the boards will run, and the width across the boards.",
      "Enter the actual board width (5½ in for 5/4×6 and 2×6) and the gap recommended by the board maker.",
      "Choose the board length you will buy — matching the deck length or a clean fraction of it reduces waste.",
      "Pick your joist spacing so the screw count is right, adjust waste (15% for diagonal layouts) and read the results.",
    ],
    formula: {
      lines: [
        "Rows = ⌈deck width × 12 ÷ (board width + gap)⌉",
        "Linear feet = rows × deck length × (1 + waste %)",
        "Boards = ⌈linear feet ÷ board length⌉",
        "Screws = rows × (⌈deck length × 12 ÷ joist spacing⌉ + 1) × 2 × (1 + waste %)",
      ],
      notes: [
        "Rows are rounded up: the last board is usually ripped to width.",
        "Face-screwing uses two screws at every joist; hidden fastener systems use one clip per joist crossing — check the maker's coverage chart.",
        "Composite boards usually need joists at 16 in on center or closer (12 in for diagonal layouts).",
      ],
    },
    example: {
      scenario: "A 16 × 12 ft deck with boards running the 16 ft way, 5½ in boards with 3/16 in gaps, 16 ft boards and joists at 16 in on center.",
      inputs: { length: 16, width: 12, boardWidth: 5.5, gap: 0.1875, boardLength: 16, joistSpacing: 16, waste: 10 },
      expected: { rows: 26, linearFeet: 457.6, boards: 29, screws: 744, area: 192 },
      steps: [
        "Each row takes 5.5 + 0.1875 = 5.6875 in, so 144 in ÷ 5.6875 = 25.3 → 26 rows.",
        "Linear feet = 26 × 16 = 416 ft, plus 10% = 457.6 ft.",
        "Boards = 457.6 ÷ 16 = 28.6 → 29 sixteen-foot boards.",
        "Joist crossings = 192 ÷ 16 + 1 = 13; screws = 26 × 13 × 2 = 676, plus 10% = 744 screws.",
      ],
    },
    tips: [
      "Buy board lengths that span the deck in one piece, or break evenly on joists — a 12 ft deck from 16 ft boards wastes 4 ft per row.",
      "Doubling the joist where board ends butt gives each end solid bearing for screws.",
      "Wood boards shrink as they dry: pressure-treated boards are often laid tight and open up to a gap on their own.",
      "Composite boards expand and contract along their length — follow the maker's end-gap rules for the installation temperature.",
      "Order a few spare boards from the same batch so colour matches if you need to replace one later.",
    ],
    faqs: [
      {
        q: "How many deck boards do I need for a 12 × 12 deck?",
        a: "With 5½ in boards and 3/16 in gaps, 144 in ÷ 5.69 in = 26 rows of 12 ft boards. That's 26 boards, or 29 with 10% waste.",
      },
      {
        q: "How many deck boards for a 16 × 16 deck?",
        a: "192 in ÷ 5.69 in = 34 rows. Using 16 ft boards that's 34 boards, about 38 with 10% waste.",
      },
      {
        q: "How much should I add for waste on decking?",
        a: "10% is typical for straight decks, 15% for diagonal or herringbone layouts and picture-frame borders, and less if your board length exactly matches the deck.",
      },
      {
        q: "What gap should I leave between deck boards?",
        a: "About ⅛–¼ in (3–6 mm) is common for kiln-dried wood and composite boards. Wet pressure-treated lumber is often installed tight because it shrinks. Always follow the manufacturer's spacing.",
      },
      {
        q: "How many screws do I need per deck board?",
        a: "Two screws at every joist. A 16 ft board over joists at 16 in on center crosses 13 joists, so it needs 26 screws. With 5½ in boards at 16 in on center that works out to roughly 320 screws per 100 sq ft.",
      },
    ],
    sources: [
      { title: "Decking installation guide — spacing, gapping and fastening", publisher: "Trex Company" },
      { title: "Installation guidelines for wood decking", publisher: "Western Red Cedar Lumber Association" },
      AWC_DCA6,
    ],
    related: ["deck-joists-calculator", "deck-stain-calculator", "deck-cost-calculator", "stair-rise-run-calculator", "board-foot-calculator"],
  },
  {
    slug: "deck-joists-calculator",
    name: "Deck Joists Calculator",
    category: "outdoor-roofing",
    kind: "material",
    featured: false,
    safety: true,
    seoTitle: "Deck Joist Calculator – Joist Count, Spacing & Span Check",
    description:
      "Free deck joist calculator: get the number of joists, hangers and board lengths for your deck, and check the span against IRC deck joist span tables.",
    intro:
      "Count the joists for a new deck and sanity-check their span in one step. Enter the deck length along the ledger or beam, the joist span, spacing, size and lumber species, and the calculator returns the number of joists and hangers, the board length to buy and the approximate maximum span allowed for that size from the IRC deck joist table. It is a planning aid: decks are structural, so confirm with your local building department and a qualified pro.",
    keywords: [
      "deck joist calculator",
      "deck joist span calculator",
      "how many joists for a deck",
      "deck joist spacing",
      "2x8 deck joist span",
      "2x10 deck joist span",
    ],
    howToUse: [
      "Measure the deck length along the house (ledger) or beam — the direction the joists are spaced along.",
      "Enter the joist span: the clear distance from the ledger to the beam (excluding any cantilever).",
      "Choose the spacing, joist size and lumber species. Southern pine is common in the East and South; hem-fir and Douglas fir in the West.",
      "Check the span margin: a negative number means the joist is too long for that size and spacing — go deeper, closer or add a beam.",
    ],
    formula: {
      lines: [
        "Joists = ⌈deck length × 12 ÷ spacing⌉ + 1",
        "Board length = next even length (8 ft minimum) ≥ joist span",
        "Span margin = max allowable span − your span",
      ],
      notes: [
        "Maximum spans are approximate values from IRC Table R507.6 for No. 2 grade, wet-service lumber with a 40 psf live load and 10 psf dead load. Heavier loads (hot tubs, snow over 40 psf) need engineering.",
        "The count includes the two outside joists. Add blocking, a rim joist across the joist ends and extra joists wherever board ends butt.",
        "Composite decking often limits joist spacing to 16 in (12 in on diagonals) regardless of the span table.",
      ],
    },
    example: {
      scenario: "A 16 ft wide deck with 12 ft southern pine 2×10 joists at 16 in on center, plus 5% spares.",
      inputs: { length: 16, span: 12, spacing: 16, size: 10, species: 0, waste: 5 },
      expected: { joists: 13, joistsToBuy: 14, buyLength: 12, maxSpan: 14, spanMargin: 2, hangers: 13, rimLength: 16 },
      steps: [
        "Joists = 16 × 12 ÷ 16 = 12 spaces, + 1 = 13 joists (and 13 hangers at the ledger).",
        "With 5% spares: 13 × 1.05 = 13.65 → buy 14 boards, each 12 ft.",
        "The IRC table allows about 14 ft 0 in for a southern pine 2×10 at 16 in, so the 12 ft span has about 2 ft of margin.",
        "Add a 16 ft rim joist across the outer ends of the joists.",
      ],
    },
    tips: [
      "Use joist hangers rated for the joist size and the matching structural fasteners specified by the hanger maker — not drywall or deck screws.",
      "Install joists crown-up so any bow straightens under load.",
      "A ledger attached to a house must be through-bolted or lagged per code and properly flashed; it is the most common deck failure point.",
      "Joist tape on top of pressure-treated joists helps keep water out of fastener holes and extends joist life.",
    ],
    faqs: [
      {
        q: "How far can a 2×8 deck joist span?",
        a: "Under the IRC deck table (No. 2 lumber, 40 psf live load), a 2×8 at 16 in on center spans about 11 ft 10 in in southern pine and about 11 ft 1 in in Douglas fir-larch, hem-fir or SPF. At 24 in spacing it drops to about 9 ft.",
      },
      {
        q: "How far can a 2×10 deck joist span?",
        a: "Roughly 14 ft 0 in at 16 in on center in southern pine and about 13 ft 7 in in Douglas fir-larch or hem-fir; at 12 in spacing about 16 ft. Always confirm with the code edition your jurisdiction uses.",
      },
      {
        q: "How many joists do I need for a 12 × 16 deck?",
        a: "If the joists run the 12 ft direction and are spaced along the 16 ft side at 16 in on center: 192 ÷ 16 = 12 spaces + 1 = 13 joists. At 12 in spacing you'd need 17.",
      },
      {
        q: "Should deck joists be 12 or 16 inches apart?",
        a: "16 in on center is standard for straight-laid wood and most composite decking. Use 12 in for diagonal decking, many composite boards on diagonals, or when you want a stiffer feel.",
      },
      {
        q: "Do I need a permit to build a deck?",
        a: "In most US jurisdictions, yes — especially if the deck is attached to the house, more than 30 in above grade or over a certain size. The permit review also confirms your joist, beam and footing sizes.",
      },
    ],
    sources: [
      { title: "International Residential Code, Section R507 — Exterior Decks (Table R507.6)", publisher: IRC },
      AWC_DCA6,
      { title: "Deck connection and joist hanger installation guide", publisher: "Simpson Strong-Tie" },
    ],
    related: ["deck-boards-calculator", "deck-cost-calculator", "stair-rise-run-calculator", "framing-lumber-calculator", "footing-calculator"],
  },
  {
    slug: "stair-rise-run-calculator",
    name: "Stair Rise and Run Calculator",
    category: "outdoor-roofing",
    kind: "planning",
    featured: false,
    safety: true,
    seoTitle: "Stair Rise and Run Calculator – Risers, Treads & Stringers",
    description:
      "Free stair calculator: enter the total rise to get the number of steps, riser height, tread run, stringer length and stair angle, checked against IRC limits.",
    intro:
      "Lay out deck or porch stairs before you cut a stringer. Enter the total rise from the landing to the top of the deck, your maximum riser height and tread depth, and the calculator finds the number of risers and treads, the exact riser height, the total run, the stringer length and angle, plus a comfort check. Stairs are a common source of falls, so confirm the layout with your local code and building inspector.",
    keywords: [
      "stair rise and run calculator",
      "stair stringer calculator",
      "deck stair calculator",
      "how many steps do i need",
      "riser height calculator",
      "stair calculator",
    ],
    howToUse: [
      "Measure the total rise plumb from the landing or ground (where the bottom step will sit) to the top of the finished deck surface.",
      "Enter the maximum riser height you want — the IRC allows 7¾ in; 7 to 7½ in is easier to climb.",
      "Enter the tread depth (10 in minimum under the IRC; 10½–11 in is common with two 5½ in deck boards).",
      "Enter the stair width and stringer spacing to get the number of stringers, then read the layout.",
    ],
    formula: {
      lines: [
        "Risers = ⌈total rise ÷ max riser height⌉",
        "Riser height = total rise ÷ risers",
        "Treads = risers − 1 (the deck itself is the top step)",
        "Total run = treads × tread depth",
        "Stringer length = √(total rise² + total run²);  Angle = atan(total rise ÷ total run)",
        "Comfort check = 2 × riser + tread (24–25 in feels natural)",
      ],
      notes: [
        "The IRC (R311.7) sets a 7¾ in maximum riser and 10 in minimum tread for dwellings, with no more than ⅜ in variation between the largest and smallest riser or tread in a flight.",
        "Buy stringer stock about 1–2 ft longer than the diagonal length to allow for the top and bottom cuts.",
        "Re-measure the total rise where the stair will actually land — sloping ground changes it.",
      ],
    },
    example: {
      scenario: "A deck 37 in above a level patio, max 7½ in risers, 10½ in treads, a 3 ft wide stair with stringers no more than 18 in apart.",
      inputs: { totalRise: 37, maxRiser: 7.5, tread: 10.5, stairWidth: 3, stringerSpacing: 18 },
      expected: { risers: 5, riserHeight: 7.4, treads: 4, totalRun: 42, stringerLength: 4.6644, angle: 41.38, comfort: 25.3, stringers: 3 },
      steps: [
        "Risers = 37 ÷ 7.5 = 4.93 → 5 risers, each 37 ÷ 5 = 7.4 in.",
        "Treads = 5 − 1 = 4; total run = 4 × 10.5 = 42 in.",
        "Stringer = √(37² + 42²) = √3,133 = 55.97 in ≈ 4.66 ft (buy 6 ft or longer stock).",
        "Angle = atan(37 ÷ 42) = 41.4°; comfort check = 2 × 7.4 + 10.5 = 25.3 in.",
        "Stringers = 36 ÷ 18 = 2 spaces + 1 = 3 stringers.",
      ],
    },
    tips: [
      "Use 2×12 pressure-treated stock for cut stringers; at least 5 in of solid wood should remain below the notches (AWC DCA 6 guidance).",
      "Set the bottom of the stair on a concrete pad or footing, not on bare soil.",
      "A graspable handrail is generally required once a stair has four or more risers — check your local code.",
      "Subtract the tread thickness from the first riser when you mark the stringer so the bottom step comes out the same height as the rest.",
    ],
    faqs: [
      {
        q: "What is the maximum riser height for stairs?",
        a: "The International Residential Code allows a maximum of 7¾ in (197 mm) per riser and requires risers in one flight to be within ⅜ in of each other. Some local codes and commercial codes are stricter (often 7 in).",
      },
      {
        q: "What is the minimum tread depth?",
        a: "10 in (254 mm) under the IRC, measured nosing to nosing. Treads made from two 5½ in deck boards give about 11 in, which is comfortable outdoors.",
      },
      {
        q: "How many steps do I need for a 3 ft rise?",
        a: "36 in ÷ 7¾ in = 4.6, so 5 risers of 7.2 in and 4 treads. With 10½ in treads the stair projects 42 in from the deck.",
      },
      {
        q: "How do I calculate stair stringer length?",
        a: "Use Pythagoras: stringer = √(total rise² + total run²). For a 37 in rise and 42 in run that's 56 in, so buy a board at least 6 ft long to leave room for the cuts.",
      },
      {
        q: "What is a comfortable stair angle?",
        a: "Most comfortable stairs fall between about 30° and 37°. At code limits (7¾ in riser, 10 in tread) a stair is about 38°; outdoor stairs with lower risers and deeper treads feel safer.",
      },
      {
        q: "How far apart should stair stringers be?",
        a: "Many deck guides allow up to about 18 in on center for solid-wood treads. Composite treads frequently require 12 in — check the manufacturer's instructions.",
      },
    ],
    sources: [
      { title: "International Residential Code, Section R311.7 — Stairways", publisher: IRC },
      AWC_DCA6,
      { title: "Composite stair installation — stringer spacing", publisher: "Trex Company" },
    ],
    related: ["deck-joists-calculator", "deck-boards-calculator", "concrete-stairs-calculator", "stair-carpet-calculator", "rafter-length-calculator"],
  },
  {
    slug: "roofing-squares-calculator",
    name: "Roofing Squares Calculator",
    category: "outdoor-roofing",
    kind: "material",
    featured: false,
    seoTitle: "Roofing Squares Calculator – How Many Squares Is My Roof?",
    description:
      "Free roofing squares calculator: enter the roof footprint and pitch to find the true roof area and how many roofing squares to order, including waste.",
    intro:
      "Roofing is sold and priced by the square — 100 sq ft of roof surface. Enter the length and width of your roof's footprint (including overhangs) and the pitch, and the calculator applies the pitch multiplier to find the real sloped area and the number of squares to order, with a waste allowance for cuts, hips and valleys.",
    keywords: [
      "roofing squares calculator",
      "roofing square",
      "how many squares is my roof",
      "roof squares calculator",
      "roofing material calculator",
      "roof pitch multiplier",
    ],
    howToUse: [
      "Measure the outside length and width of the house and add the overhang on each side — or measure the drip edge-to-drip edge footprint from the ground or a site plan.",
      "Enter the roof pitch as rise per 12 in of run (e.g. 6 for a 6/12 roof). Use the roof pitch calculator if you are not sure.",
      "Set the waste allowance: about 10% for a simple gable, 15% or more for hips, valleys and dormers.",
      "Read the squares, rounded up to whole squares for ordering.",
    ],
    formula: {
      lines: [
        "Pitch multiplier = √(1 + (rise ÷ 12)²)",
        "Roof area = footprint length × footprint width × pitch multiplier",
        "Squares = roof area ÷ 100 × (1 + waste %)",
      ],
      notes: [
        "The multiplier works for any roof whose planes all share the same pitch — gable, hip or a mix. For mixed pitches, calculate each section separately.",
        "Common multipliers: 4/12 = 1.054, 6/12 = 1.118, 8/12 = 1.202, 10/12 = 1.302, 12/12 = 1.414.",
      ],
    },
    example: {
      scenario: "A 40 × 30 ft roof footprint (overhangs included) at a 6/12 pitch with 10% waste.",
      inputs: { length: 40, width: 30, pitch: 6, waste: 10 },
      expected: { footprint: 1200, multiplier: 1.118, roofArea: 1341.64, squares: 14.758, squaresRounded: 15 },
      steps: [
        "Footprint = 40 × 30 = 1,200 sq ft.",
        "Multiplier = √(1 + 0.5²) = √1.25 = 1.118.",
        "Roof area = 1,200 × 1.118 = 1,341.6 sq ft = 13.42 squares.",
        "With 10% waste: 13.42 × 1.10 = 14.76 → order 15 squares.",
      ],
    },
    tips: [
      "Measure from the ground whenever possible; walking a roof is dangerous, especially above 6/12 or when wet.",
      "Your roofer's estimate may be in squares of the finished roof plus waste — compare like with like.",
      "Detached garages, porches and sheds with different pitches should be calculated as separate sections.",
      "Shingle bundles are sold in fractions of a square (usually 3 per square), so you can order to the nearest bundle rather than a whole square.",
    ],
    faqs: [
      {
        q: "What is a square in roofing?",
        a: "A roofing square is 100 sq ft (9.29 m²) of roof surface. A 2,000 sq ft roof is 20 squares. Shingles, underlayment and labour are commonly priced per square.",
      },
      {
        q: "How many squares is a 2,000 sq ft house?",
        a: "It depends on footprint, overhangs and pitch, not floor area. A single-story 2,000 sq ft house with 1 ft overhangs at a 6/12 pitch is often around 24–26 squares before waste; a two-story house of the same floor area has about half the roof.",
      },
      {
        q: "How do I calculate roof area from the ground?",
        a: "Measure the footprint including overhangs, find the pitch with a level and tape (rise over 12 in of run), then multiply the footprint by √(1 + (rise ÷ 12)²).",
      },
      {
        q: "How much waste should I add for roofing?",
        a: "Around 10% for a simple gable roof and 15–20% for cut-up roofs with hips, valleys and dormers. Starter strips and ridge caps are usually calculated separately.",
      },
      {
        q: "Does a steeper roof need more shingles?",
        a: "Yes. The same footprint has more surface area as the pitch increases: a 12/12 roof has about 41% more area than a flat roof of the same footprint, while a 4/12 roof has only about 5% more.",
      },
    ],
    sources: [
      { title: "The NRCA Roofing Manual: Steep-slope Roof Systems", publisher: "National Roofing Contractors Association" },
      { title: "How to measure a roof and estimate shingles", publisher: "Owens Corning" },
      { title: "Asphalt shingle installation and estimating basics", publisher: "Asphalt Roofing Manufacturers Association" },
    ],
    related: ["shingles-calculator", "roof-square-footage-calculator", "roof-pitch-calculator", "roof-replacement-cost-calculator", "gutters-calculator"],
  },
  {
    slug: "roof-square-footage-calculator",
    name: "Roof Square Footage Calculator",
    category: "outdoor-roofing",
    kind: "planning",
    featured: false,
    seoTitle: "Roof Square Footage Calculator – Measure Your Roof Area",
    description:
      "Free roof square footage calculator: enter house size, overhang and pitch to find the true sloped roof area, with an optional second section for a garage or porch.",
    intro:
      "Find the real surface area of your roof from measurements you can take on the ground. Enter the house's wall-to-wall length and width, the overhang and the roof pitch; the calculator adds the overhangs, applies the pitch multiplier and returns the roof area in square feet (or square metres) and roofing squares. Add a second section for an attached garage, porch or addition with a different pitch.",
    keywords: [
      "roof square footage calculator",
      "roof area calculator",
      "how to calculate roof square footage",
      "roof surface area",
      "roof size calculator",
      "measure roof from ground",
    ],
    howToUse: [
      "Measure the outside length and width of the house walls under the main roof.",
      "Enter the overhang — how far the eaves and rakes stick out past the walls (often 12 to 24 in).",
      "Enter the main roof pitch as rise per 12 in of run.",
      "If there is a second roof section with its own pitch, enter its footprint (overhangs included) and pitch; leave length at 0 otherwise.",
    ],
    formula: {
      lines: [
        "Main footprint = (length + 2 × overhang) × (width + 2 × overhang)",
        "Pitch multiplier = √(1 + (rise ÷ 12)²)",
        "Main roof area = main footprint × multiplier",
        "Total = main roof area + second section footprint × its multiplier;  Squares = total ÷ 100",
      ],
      notes: [
        "This is the true sloped surface area with no waste. Use the shingles or roofing squares calculator to add waste for ordering.",
        "Overlapping sections (where a garage roof ties into the main roof) are slightly overcounted, which acts as a small safety margin.",
      ],
    },
    example: {
      scenario: "A 40 × 28 ft house with 1 ft overhangs and an 8/12 roof, plus a 12 × 10 ft porch roof (overhangs included) at 4/12.",
      inputs: { length: 40, width: 28, overhang: 1, pitch: 8, length2: 12, width2: 10, pitch2: 4 },
      expected: { area1: 1514.33, area2: 126.49, totalArea: 1640.82, squares: 16.41, multiplier: 1.2019, angle: 33.69 },
      steps: [
        "Main footprint = (40 + 2) × (28 + 2) = 42 × 30 = 1,260 sq ft.",
        "8/12 multiplier = √(1 + 0.667²) = 1.202, so main roof = 1,260 × 1.202 = 1,514.3 sq ft.",
        "Porch = 12 × 10 = 120 sq ft × 1.054 (4/12) = 126.5 sq ft.",
        "Total = 1,514.3 + 126.5 = 1,640.8 sq ft ≈ 16.4 squares.",
      ],
    },
    tips: [
      "Count rows of shingle exposure or use aerial measurement reports to double-check a complicated roof.",
      "Gable and hip roofs with the same footprint and pitch have the same area — the hip just has more waste and ridge.",
      "Satellite measurement services and roofers' drone reports are a useful cross-check before ordering.",
      "Never measure a steep or wet roof from on top without fall protection.",
    ],
    faqs: [
      {
        q: "How do I calculate the square footage of my roof?",
        a: "Multiply the footprint (including overhangs) by the pitch multiplier √(1 + (rise ÷ 12)²). For example, a 1,260 sq ft footprint at 8/12 is 1,260 × 1.202 = 1,514 sq ft of roof.",
      },
      {
        q: "Is roof square footage the same as house square footage?",
        a: "No. Roof area depends on the footprint, overhangs and pitch. A single-story house usually has a roof 1.2–1.5 times its floor area; a two-story house has much less roof per square foot of living space.",
      },
      {
        q: "How big is a 30-square roof?",
        a: "3,000 sq ft (about 279 m²) of sloped roof surface — one square is 100 sq ft.",
      },
      {
        q: "Do hip roofs have more area than gable roofs?",
        a: "Not if the footprint and pitch are the same — the area is identical. Hip roofs do need more waste and more ridge cap because of the extra hip lines.",
      },
      {
        q: "What overhang should I use?",
        a: "Measure it. Typical eave overhangs are 12–24 in; rake (gable end) overhangs are often smaller. If they differ, use the average.",
      },
    ],
    sources: [
      { title: "The NRCA Roofing Manual: Steep-slope Roof Systems", publisher: "National Roofing Contractors Association" },
      { title: "Estimating roof area and pitch factors", publisher: "GAF" },
    ],
    related: ["roofing-squares-calculator", "shingles-calculator", "roof-pitch-calculator", "roof-replacement-cost-calculator", "square-footage-calculator"],
  },
  {
    slug: "shingles-calculator",
    name: "Shingles Calculator",
    category: "outdoor-roofing",
    kind: "material",
    featured: false,
    seoTitle: "Shingles Calculator – Bundles, Starter, Ridge Cap & Nails",
    description:
      "Free shingle calculator: work out bundles of shingles, starter strip, ridge cap, underlayment rolls and roofing nails from your roof area or footprint and pitch.",
    intro:
      "Get a complete asphalt shingle shopping list. Enter your roof area — or the footprint and pitch — choose how many bundles make a square for your shingle, and add the eave, rake and ridge lengths. The calculator returns shingle bundles with waste, plus starter strip, hip and ridge cap bundles, underlayment rolls and an approximate nail count.",
    keywords: [
      "shingles calculator",
      "how many bundles of shingles do i need",
      "roof shingle calculator",
      "bundles per square",
      "ridge cap calculator",
      "starter strip calculator",
      "roofing nails per square",
    ],
    howToUse: [
      "Enter the roof area if you know it, or the footprint (including overhangs) and pitch.",
      "Choose bundles per square from the shingle wrapper — 3 for most architectural and 3-tab shingles.",
      "Add the total length of eaves and rakes (for starter strip) and of ridges and hips (for cap shingles), plus each product's coverage per bundle.",
      "Pick your underlayment and nailing pattern, set waste (10% simple, 15% complex) and read the list.",
    ],
    formula: {
      lines: [
        "Roof area = footprint × √(1 + (rise ÷ 12)²)  (or entered directly)",
        "Squares = roof area ÷ 100 × (1 + waste %)",
        "Shingle bundles = ⌈squares × bundles per square⌉",
        "Starter bundles = ⌈eave + rake length ÷ starter coverage⌉;  Cap bundles = ⌈ridge + hip length ÷ cap coverage⌉",
        "Underlayment rolls = ⌈roof area × (1 + waste %) ÷ roll coverage⌉",
        "Nails ≈ squares × 66 shingles × nails per shingle",
      ],
      notes: [
        "Most architectural laminate shingles come about 3 bundles per square (roughly 22 shingles per bundle, ~66 per square); heavyweight designer shingles can be 4–5.",
        "Starter and cap products vary widely in coverage — always use the figure printed on the bundle.",
        "Nail count is approximate; codes and manufacturers require 6 nails in high-wind zones and on steep slopes.",
      ],
    },
    example: {
      scenario: "A 40 × 30 ft footprint at 6/12, 3-bundle architectural shingles, 147 ft of eaves and rakes, a 40 ft ridge, synthetic underlayment and a 4-nail pattern with 10% waste.",
      inputs: { mode: 1, length: 40, width: 30, pitch: 6, bundlesPerSquare: 3, starterLength: 147, starterCoverage: 100, ridgeLength: 40, ridgeCoverage: 25, underlayment: 1000, nailsPerShingle: 4, waste: 10 },
      expected: { roofArea: 1341.64, squares: 14.758, bundles: 45, starterBundles: 2, ridgeBundles: 2, underlaymentRolls: 2, nails: 3897 },
      steps: [
        "Roof area = 40 × 30 × 1.118 = 1,341.6 sq ft.",
        "Squares with waste = 13.42 × 1.10 = 14.76; bundles = 14.76 × 3 = 44.3 → 45 bundles.",
        "Starter = 147 ÷ 100 = 1.47 → 2 bundles; ridge cap = 40 ÷ 25 = 1.6 → 2 bundles.",
        "Underlayment = 1,341.6 × 1.10 ÷ 1,000 = 1.48 → 2 rolls.",
        "Nails = 14.76 × 66 × 4 ≈ 3,897 nails.",
      ],
    },
    tips: [
      "Most suppliers accept returns of unopened bundles — order a couple extra rather than running short mid-job.",
      "Check the wrapper: exposure and bundle count differ between brands and product lines.",
      "Ice-and-water shield is usually required along eaves in cold climates and in valleys — calculate it separately in linear feet.",
      "Bundles weigh roughly 60–80 lb each; have them delivered to the roof (rooftop loading) if possible.",
    ],
    faqs: [
      {
        q: "How many bundles of shingles are in a square?",
        a: "Three bundles per square (100 sq ft) for most architectural and 3-tab shingles. Some heavyweight or designer shingles need four or five bundles per square — the wrapper says.",
      },
      {
        q: "How many bundles of shingles do I need for a 1,500 sq ft roof?",
        a: "1,500 sq ft = 15 squares. With 10% waste that's 16.5 squares × 3 = 49.5, so 50 bundles of standard architectural shingles, plus starter and ridge cap.",
      },
      {
        q: "How many bundles of shingles for a 10 × 12 shed?",
        a: "A 10 × 12 ft shed with 6 in overhangs and a 6/12 roof is about 11 × 13 × 1.118 = 160 sq ft. With 10% waste that's 1.76 squares × 3 = 6 bundles.",
      },
      {
        q: "How much ridge cap do I need?",
        a: "Add the length of every ridge and hip, then divide by the coverage per bundle — typically 20–33 linear ft for dedicated ridge cap shingles. A 40 ft ridge needs about 2 bundles at 25 ft each.",
      },
      {
        q: "How many nails per square of shingles?",
        a: "About 260–270 nails with a 4-nail pattern (≈66 shingles per square), or about 400 with a 6-nail pattern.",
      },
      {
        q: "Do I need starter shingles on the rakes?",
        a: "Starter at the eaves is always needed. Many manufacturers also recommend (or require for wind warranties) starter along the rakes — check your shingle's installation instructions.",
      },
    ],
    sources: [
      { title: "Timberline HDZ shingle application instructions", publisher: "GAF" },
      { title: "Duration shingle installation instructions", publisher: "Owens Corning" },
      { title: "Residential Asphalt Roofing Manual", publisher: "Asphalt Roofing Manufacturers Association" },
    ],
    related: ["roofing-squares-calculator", "roof-square-footage-calculator", "roof-pitch-calculator", "roof-replacement-cost-calculator", "gutters-calculator"],
  },
  {
    slug: "siding-calculator",
    name: "Siding Calculator",
    category: "outdoor-roofing",
    kind: "material",
    featured: false,
    seoTitle: "Siding Calculator – Squares, Boxes, J-Channel & Corners",
    description:
      "Free siding calculator: enter wall length, height, gables and openings to estimate squares and boxes of siding, starter strip, J-channel and corner posts.",
    intro:
      "Estimate vinyl, fiber cement or wood siding for the whole house. Enter the total wall length and height, the gable ends, and the windows, doors and garage doors you'll side around, and the calculator returns the net area in squares (with waste), boxes to buy, plus linear feet of starter strip and J-channel and the number of outside corner posts.",
    keywords: [
      "siding calculator",
      "vinyl siding calculator",
      "how much siding do i need",
      "siding squares calculator",
      "siding estimator",
      "house siding calculator",
    ],
    howToUse: [
      "Add up the length of every wall to be sided (the perimeter for a whole house) and enter the wall height up to the eaves.",
      "Enter the number of gable ends with their width and height from eave to peak.",
      "Count windows and entry doors, and enter the area of garage doors or other large openings.",
      "Enter outside corners and squares per box from the product label, adjust waste and read the results.",
    ],
    formula: {
      lines: [
        "Wall area = perimeter × wall height;  Gable area = gables × ½ × gable width × gable height",
        "Net area = wall area + gable area − (windows × 15) − (doors × 20) − other openings",
        "Squares = net area ÷ 100 × (1 + waste %);  Boxes = ⌈squares ÷ squares per box⌉",
        "J-channel = windows × 16 ft + doors × 16.3 ft + gable rakes (2 × √((width ÷ 2)² + height²) per gable)",
        "Corner posts = outside corners × ⌈wall height ÷ 10⌉",
      ],
      notes: [
        "Windows are assumed to be about 3 × 5 ft (15 sq ft, 16 ft of J-channel around them) and doors about 3 × 6 ft 8 in (20 sq ft; J-channel on the top and sides).",
        "Starter strip runs along the bottom of every wall. J-channel at the gable rakes is often replaced by other trim — adjust to your product.",
      ],
    },
    example: {
      scenario: "A 40 × 30 ft house (140 ft perimeter) with 9 ft walls, two 30 ft wide gables 7.5 ft tall, 10 windows, 2 doors and a 16 × 7 ft garage door, 4 outside corners and 2-square boxes.",
      inputs: { perimeter: 140, height: 9, gables: 2, gableBase: 30, gableHeight: 7.5, windows: 10, doors: 2, otherOpenings: 112, corners: 4, squaresPerBox: 2, waste: 10 },
      expected: { grossArea: 1485, netArea: 1183, squares: 13.013, boxes: 7, starter: 140, jChannel: 259.75, cornerPosts: 4 },
      steps: [
        "Walls = 140 × 9 = 1,260 sq ft; gables = 2 × ½ × 30 × 7.5 = 225 sq ft; gross = 1,485 sq ft.",
        "Openings = 10 × 15 + 2 × 20 + 112 = 302 sq ft, so net = 1,183 sq ft.",
        "Squares = 11.83 × 1.10 = 13.01; boxes = 13.01 ÷ 2 = 6.5 → 7 boxes.",
        "J-channel = 160 (windows) + 32.7 (doors) + 67.1 (gable rakes) = 259.7 ft; starter = 140 ft; corner posts = 4.",
      ],
    },
    tips: [
      "Measure big picture windows, patio doors and bay windows individually rather than using the 15 sq ft average.",
      "Buy trim pieces (J-channel, corners, starter) with 5–10% extra too — lengths are hard to splice neatly.",
      "Vinyl siding must hang loosely on its nails to expand and contract; follow the manufacturer's nailing instructions.",
      "Order all siding at once from the same production run so the colour matches.",
    ],
    faqs: [
      {
        q: "How much siding do I need for a 2,000 sq ft house?",
        a: "Floor area isn't enough — measure the walls. A 2,000 sq ft single-story house might have 1,800–2,200 sq ft of wall before openings, or roughly 18–22 squares with waste. Use the calculator with your actual perimeter and wall height.",
      },
      {
        q: "How many square feet are in a box of vinyl siding?",
        a: "Most boxes hold 2 squares (200 sq ft), though some profiles and premium products are packed differently. The coverage is printed on the box.",
      },
      {
        q: "How do I calculate the area of a gable end?",
        a: "A gable is a triangle: ½ × width × height. A 30 ft wide gable rising 7½ ft to the peak is ½ × 30 × 7.5 = 112.5 sq ft.",
      },
      {
        q: "How much waste should I add for siding?",
        a: "10% for simple rectangular houses and 15% for houses with many windows, gables, dormers or corners. Steep gables generate more offcuts.",
      },
      {
        q: "Should I subtract windows and doors?",
        a: "Yes. Subtract about 15 sq ft per average window and 20 sq ft per door, and the actual area of garage doors (112 sq ft for a 16 × 7 door). Keep small openings in if you want extra margin.",
      },
    ],
    sources: [
      { title: "Vinyl Siding Installation Manual", publisher: "Vinyl Siding Institute" },
      { title: "HardiePlank lap siding installation requirements", publisher: "James Hardie" },
      { title: "How to measure for siding", publisher: "Lowe's" },
    ],
    related: ["exterior-paint-calculator", "wall-area-calculator", "stone-veneer-calculator", "window-area-calculator", "gutters-calculator"],
  },
  {
    slug: "gutters-calculator",
    name: "Gutters Calculator",
    category: "outdoor-roofing",
    kind: "material",
    featured: false,
    seoTitle: "Gutter Calculator – Gutter Length, Downspouts & Hangers",
    description:
      "Free gutter calculator: enter eave length, runs and wall height to get gutter feet, 10 ft sections, downspouts, elbows, hangers and end caps you need.",
    intro:
      "Plan new gutters from a few measurements. Enter the total eave length you want guttered, how many separate runs there are, the number of corners and the height from the eaves to the ground. The calculator returns gutter length with waste, 10 ft sections, downspouts and their pieces and elbows, hidden hangers and end caps.",
    keywords: [
      "gutter calculator",
      "how many downspouts do i need",
      "gutter hanger spacing",
      "gutter materials calculator",
      "rain gutter calculator",
      "downspout calculator",
    ],
    howToUse: [
      "Measure the length of every eave edge that needs a gutter and add them up.",
      "Count the separate runs (each continuous length with two end caps) and any inside or outside corners.",
      "Enter the maximum gutter length per downspout — 30–40 ft is a common rule, less in heavy-rain regions — and the height from the gutter to the ground.",
      "Set the hanger spacing (24 in is typical; 18 in in snow country), choose waste and read the parts list.",
    ],
    formula: {
      lines: [
        "Gutter = eave length × (1 + waste %);  Sections = ⌈gutter ÷ 10⌉",
        "Downspouts = max(runs, ⌈eave length ÷ max length per downspout⌉)",
        "Downspout pieces = downspouts × ⌈height ÷ 10⌉;  Elbows = downspouts × 3",
        "Hangers = ⌈eave length × 12 ÷ hanger spacing⌉ + runs;  End caps = runs × 2",
      ],
      notes: [
        "Three elbows per downspout covers the usual two at the top (to bring the spout back to the wall) and one at the bottom to turn it out.",
        "Slope gutters toward the outlet about ¼ in per 10 ft. Long runs often slope from the middle to a downspout at each end.",
        "Downspout capacity depends on rainfall intensity and roof area; a 3 × 4 in downspout carries roughly twice what a 2 × 3 in one does.",
      ],
    },
    example: {
      scenario: "120 ft of eaves in two runs, no corners, one downspout per 35 ft, 10 ft from gutter to ground, hangers every 24 in, 5% waste.",
      inputs: { length: 120, runs: 2, corners: 0, maxPerDownspout: 35, downspoutHeight: 10, hangerSpacing: 24, waste: 5 },
      expected: { gutterLength: 126, sections: 13, downspouts: 4, downspoutPieces: 4, elbows: 12, hangers: 62, endCaps: 4 },
      steps: [
        "Gutter = 120 × 1.05 = 126 ft → thirteen 10 ft sections (or 126 ft of seamless).",
        "Downspouts = max(2 runs, 120 ÷ 35 = 3.4 → 4) = 4, each needing one 10 ft piece and 3 elbows (12 elbows).",
        "Hangers = 120 × 12 ÷ 24 = 60, + 1 extra per run = 62.",
        "End caps = 2 runs × 2 = 4.",
      ],
    },
    tips: [
      "5 in K-style gutters suit most homes; 6 in gutters with 3 × 4 in downspouts handle steep or large roofs and heavy rain better.",
      "Discharge downspouts at least several feet from the foundation with extensions or splash blocks.",
      "Fasten hangers into the rafter tails or a solid fascia, not just the fascia board's face over rot.",
      "Seamless gutters are formed on site by installers and avoid leaky joints on long runs.",
    ],
    faqs: [
      {
        q: "How many downspouts do I need?",
        a: "A common rule is one downspout per 30–40 ft of gutter, and at least one per run. Large or steep roofs and high-rainfall areas need more, or larger 3 × 4 in downspouts.",
      },
      {
        q: "How far apart should gutter hangers be?",
        a: "Every 24 in is typical for hidden hangers; many installers go to 18 in (or closer) where heavy snow and ice load the gutters. Never more than about 36 in.",
      },
      {
        q: "How much slope should gutters have?",
        a: "About ¼ in of fall per 10 ft of gutter toward the downspout. A 40 ft run draining to one end drops about 1 in.",
      },
      {
        q: "How many feet of gutter do I need for my house?",
        a: "Measure every eave edge that sheds water — usually the two long sides of a gable house, or all four sides of a hip roof. A 40 × 30 ft hip-roofed house with 1 ft overhangs has about 148 ft of eaves.",
      },
      {
        q: "How many elbows per downspout?",
        a: "Usually three: two at the top to offset the downspout from the gutter outlet back to the wall, and one at the bottom to direct water away. Extra elbows are needed to jog around obstacles.",
      },
    ],
    sources: [
      { title: "Architectural Sheet Metal Manual — gutters and downspouts", publisher: "SMACNA" },
      { title: "Gutter installation guide", publisher: "Amerimax Home Products" },
      { title: "How to install gutters", publisher: "The Home Depot" },
    ],
    related: ["roofing-squares-calculator", "siding-calculator", "shingles-calculator", "linear-feet-calculator", "roof-square-footage-calculator"],
  },
  {
    slug: "roof-pitch-calculator",
    name: "Roof Pitch Calculator",
    category: "outdoor-roofing",
    kind: "conversion",
    featured: false,
    safety: true,
    seoTitle: "Roof Pitch Calculator – Pitch, Angle, Slope % & Multiplier",
    description:
      "Free roof pitch calculator: convert rise and run or a roof angle into pitch (x/12), degrees, slope percent, area multiplier and hip/valley factor.",
    intro:
      "Convert between the ways roof slope is described. Enter the rise and run you measured (or the roof angle in degrees) and the calculator gives the pitch in inches per 12, the angle, the slope as a percentage, the multiplier used to turn a footprint into true roof area, and the hip/valley length factor. Measuring pitch usually means working at height — use a ladder safely, or measure from the attic or a gable end.",
    keywords: [
      "roof pitch calculator",
      "roof pitch to degrees",
      "roof angle calculator",
      "roof slope calculator",
      "6/12 pitch in degrees",
      "how to measure roof pitch",
    ],
    howToUse: [
      "Choose whether you know the rise and run or the roof angle.",
      "For rise and run, hold a level horizontally against a rafter or the roof, measure 12 in (or any length) along it, and measure straight down/up to the roof surface.",
      "Enter the values — any run works; the calculator scales it to a 12 in run.",
      "Use the pitch multiplier to convert a roof footprint into its sloped area.",
    ],
    formula: {
      lines: [
        "Pitch = rise ÷ run × 12 (in per 12 in);  Slope % = rise ÷ run × 100",
        "Angle = atan(rise ÷ run);  from an angle: pitch = tan(angle) × 12",
        "Pitch multiplier = √(1 + (pitch ÷ 12)²)",
        "Hip/valley factor (equal pitches) = √(pitch² + 288) ÷ 12",
      ],
      notes: [
        "The hip/valley factor is the length of hip or valley per foot of the common rafter's horizontal run (the hip runs diagonally, 16.97 in per 12 in of common run).",
        "Low-slope roofs (below 4/12) need special underlayment for shingles, and asphalt shingles are generally not allowed below 2/12.",
      ],
    },
    example: {
      scenario: "With a level held against a rafter, the roof rises 9 in over a 16 in run.",
      inputs: { mode: 0, rise: 9, run: 16 },
      expected: { pitch: 6.75, angle: 29.36, percent: 56.25, multiplier: 1.1473, hipFactor: 1.522 },
      steps: [
        "Pitch = 9 ÷ 16 × 12 = 6.75, so the roof is 6¾/12.",
        "Angle = atan(9 ÷ 16) = atan(0.5625) = 29.36°; slope = 56.25%.",
        "Multiplier = √(1 + 0.5625²) = √1.3164 = 1.147.",
        "Hip/valley factor = √(6.75² + 288) ÷ 12 = √333.6 ÷ 12 = 1.522.",
      ],
    },
    tips: [
      "Measure pitch from inside the attic on a rafter or from a gable end with a speed square — it avoids climbing on the roof.",
      "Smartphone level apps can read the angle on a rafter; convert it here.",
      "Roofs above about 7/12 are generally considered steep for walking — roofers use harnesses and roof jacks.",
      "Pitch affects material choice: check the minimum slope for your shingles, metal panels or tile.",
    ],
    faqs: [
      {
        q: "What is a 6/12 roof pitch in degrees?",
        a: "26.57°. Common conversions: 3/12 = 14.0°, 4/12 = 18.4°, 5/12 = 22.6°, 8/12 = 33.7°, 10/12 = 39.8°, 12/12 = 45°.",
      },
      {
        q: "How do I measure roof pitch?",
        a: "Hold a level horizontally with one end touching the roof or rafter. Mark 12 in along the level and measure vertically from that mark to the roof. That vertical distance is the rise — e.g. 6 in means a 6/12 pitch.",
      },
      {
        q: "What is the most common roof pitch?",
        a: "Pitches between 4/12 and 9/12 are most common on US homes, with 6/12 a frequent choice because it sheds water well and is still walkable for installers.",
      },
      {
        q: "What is the minimum pitch for asphalt shingles?",
        a: "Asphalt shingles generally require at least 2/12, and slopes from 2/12 up to 4/12 need double-layer underlayment or other low-slope measures per the IRC and the manufacturer.",
      },
      {
        q: "What is the difference between roof pitch and slope?",
        a: "They're often used interchangeably. Strictly, slope is rise over run (e.g. 6 in 12), while pitch traditionally meant rise over the full span; in everyday US roofing both refer to x/12.",
      },
    ],
    sources: [
      { title: "International Residential Code, Section R905 — Requirements for roof coverings", publisher: IRC },
      { title: "The NRCA Roofing Manual: Steep-slope Roof Systems", publisher: "National Roofing Contractors Association" },
      { title: "Fall protection in residential construction", publisher: "OSHA" },
    ],
    related: ["rafter-length-calculator", "roofing-squares-calculator", "roof-square-footage-calculator", "shingles-calculator", "unit-converter"],
  },
  {
    slug: "rafter-length-calculator",
    name: "Rafter Length Calculator",
    category: "outdoor-roofing",
    kind: "planning",
    featured: false,
    safety: true,
    seoTitle: "Rafter Length Calculator – Common Rafters by Span & Pitch",
    description:
      "Free rafter length calculator: enter building span, roof pitch, ridge board and overhang to get common rafter length, roof rise, board size and rafter count.",
    intro:
      "Work out common rafter lengths for a shed, garage or addition roof. Enter the building span, roof pitch, ridge board thickness and overhang, and the calculator returns the line length from ridge to wall, the overhang tail, the total rafter length, the roof rise, the stock length to buy and how many rafters you need. Rafter size and spacing must still meet span tables and your local code — have structural framing checked by your building department or a licensed pro.",
    keywords: [
      "rafter length calculator",
      "common rafter calculator",
      "how to calculate rafter length",
      "roof rafter calculator",
      "shed rafter length",
      "rafter span calculator",
    ],
    howToUse: [
      "Enter the building span, measured from the outside of one wall to the outside of the opposite wall.",
      "Enter the roof pitch as rise per 12 in and the ridge board thickness (1½ in for a 2× ridge).",
      "Enter the horizontal overhang beyond the wall and the rafter spacing.",
      "Enter the building length along the ridge to count rafters, then read the results.",
    ],
    formula: {
      lines: [
        "Run = span ÷ 2 − ridge thickness ÷ 2",
        "Pitch multiplier = √(1 + (pitch ÷ 12)²)",
        "Line length = run × multiplier;  Tail = overhang × multiplier",
        "Rise = run × pitch ÷ 12",
        "Rafters = (⌈building length × 12 ÷ spacing⌉ + 1) × 2",
      ],
      notes: [
        "Line length is measured along the rafter's measuring line from the ridge plumb cut to the outside of the wall (the birdsmouth heel).",
        "Board length to buy adds about 6 in for cuts and rounds up to the next even lumber length.",
        "This counts common rafters only; hip, valley and jack rafters need separate layout.",
      ],
    },
    example: {
      scenario: "A 24 ft wide garage, 40 ft long, with a 6/12 roof, a 1½ in ridge board, 12 in overhang and rafters 24 in on center.",
      inputs: { span: 24, pitch: 6, ridge: 1.5, overhang: 12, spacing: 24, buildingLength: 40 },
      expected: { mainLength: 13.3465, tailLength: 1.118, totalLength: 14.4646, rise: 5.9688, buyLength: 16, rafters: 42, angle: 26.57 },
      steps: [
        "Run = 12 ft − 0.75 in (0.0625 ft) = 11.9375 ft.",
        "Line length = 11.9375 × 1.118 = 13.35 ft; tail = 1 × 1.118 = 1.12 ft; total = 14.46 ft (about 14 ft 5½ in).",
        "Rise = 11.9375 × 6 ÷ 12 = 5.97 ft. Add about 6 in for cuts: 14.96 ft → buy 16 ft boards.",
        "Rafters per side = 480 ÷ 24 = 20 + 1 = 21, so 42 rafters in total.",
      ],
    },
    tips: [
      "Cut one pattern rafter, test it at both ends of the building, then use it to mark the rest.",
      "Birdsmouth seat cuts should not remove more than about one-third of the rafter depth (a common framing rule) — check with your inspector.",
      "Use rafter ties or ceiling joists to stop the walls spreading under a ridge-board roof; a structural ridge beam has different rules.",
      "Snow load and span determine rafter size — look up your local design snow load before choosing 2×6, 2×8 or larger.",
    ],
    faqs: [
      {
        q: "How do I calculate rafter length?",
        a: "Divide the span in half, subtract half the ridge thickness to get the run, then multiply by √(1 + (pitch ÷ 12)²). Add the overhang times the same multiplier for the tail.",
      },
      {
        q: "How long is a rafter for a 24 ft span at 6/12?",
        a: "About 13 ft 4 in from ridge to wall with a 1½ in ridge board, plus about 1 ft 1½ in for a 12 in overhang — roughly 14 ft 5½ in in total, cut from a 16 ft board.",
      },
      {
        q: "How many rafters do I need?",
        a: "Divide the building length (in inches) by the spacing, round up and add one — then double it for both sides. A 40 ft building at 24 in on center needs 21 per side, 42 total.",
      },
      {
        q: "Should rafters be 16 or 24 inches on center?",
        a: "Both are common. 24 in suits lighter loads and engineered sheathing; 16 in allows smaller rafters for a given span or heavier snow loads. Check the IRC rafter span tables for your size, grade and load.",
      },
      {
        q: "What size rafter do I need?",
        a: "It depends on span, spacing, species, grade and snow load. Look up the IRC rafter span tables (Section R802) or the AWC span tables and confirm with your building department.",
      },
    ],
    sources: [
      { title: "International Residential Code, Section R802 — Wood Roof Framing", publisher: IRC },
      { title: "Span Tables for Joists and Rafters", publisher: "American Wood Council" },
      { title: "Speed square rafter layout guide", publisher: "Swanson Tool Co." },
    ],
    related: ["roof-pitch-calculator", "framing-lumber-calculator", "roofing-squares-calculator", "board-foot-calculator", "roof-square-footage-calculator"],
  },
  {
    slug: "pergola-materials-calculator",
    name: "Pergola Materials Calculator",
    category: "outdoor-roofing",
    kind: "material",
    featured: false,
    safety: true,
    seoTitle: "Pergola Materials Calculator – Posts, Beams, Rafters & Slats",
    description:
      "Free pergola calculator: enter pergola size, height and spacing to get posts, beams, rafters, top slats, lumber lengths and concrete bags for the footings.",
    intro:
      "Turn your pergola idea into a lumber list. Enter the length and width, post height, beam span, overhang and the spacing of rafters and top slats, and the calculator returns the number of posts, beam boards, rafters and slats with their lengths, plus concrete and bags for the post footings. A pergola is a structure that must resist wind uplift, so confirm sizes and footing depth with local code and a qualified pro.",
    keywords: [
      "pergola materials calculator",
      "pergola calculator",
      "pergola lumber list",
      "how many rafters for a pergola",
      "pergola post spacing",
      "pergola kit size",
    ],
    howToUse: [
      "Enter the pergola length (the direction the beams run) and width (the direction the rafters run).",
      "Enter the post height above ground and the maximum beam span between posts for your beam size.",
      "Choose single or doubled beams, the overhang at each end, and the rafter and top-slat spacing (0 for no slats).",
      "Enter post size and footing dimensions, pick a concrete bag size and read the material list.",
    ],
    formula: {
      lines: [
        "Posts = (⌈length ÷ max beam span⌉ + 1) × 2",
        "Beam boards = 2 × (1 or 2 per side);  Beam length = length + 2 × overhang",
        "Rafters = (⌈length × 12 ÷ rafter spacing⌉ + 1) × (1 + waste %);  Rafter length = width + 2 × overhang",
        "Top slats = (⌈width × 12 ÷ slat spacing⌉ + 1) × (1 + waste %);  slat length ≈ beam length",
        "Concrete = posts × (π × (hole Ø ÷ 2)² − post width²) × depth ÷ 1,728 × (1 + waste %)",
      ],
      notes: [
        "Post board length = height above ground + footing depth, rounded up to the next even lumber length. If posts sit on surface brackets instead of in the ground, use the above-ground height only.",
        "Overhang is applied at both ends of both beams and rafters for simplicity.",
      ],
    },
    example: {
      scenario: "A 12 × 12 ft pergola with 8 ft 6×6 posts, doubled beams spanning 12 ft, 1 ft overhangs, rafters at 16 in, top slats at 12 in and 12 in diameter footings 36 in deep with 80 lb bags.",
      inputs: { length: 12, width: 12, height: 8, maxBeamSpan: 12, beamStyle: 2, overhang: 1, rafterSpacing: 16, purlinSpacing: 12, postSize: 5.5, holeDiameter: 12, holeDepth: 36, bagYield: 0.6, waste: 10 },
      expected: { posts: 4, postLength: 12, beams: 4, beamLength: 14, rafters: 11, rafterLength: 14, purlins: 15, concrete: 7.5943, bags: 13 },
      steps: [
        "Posts = (12 ÷ 12 = 1, + 1) × 2 = 4 posts; each needs 8 + 3 = 11 ft → buy 12 ft 6×6s.",
        "Doubled beams: 4 boards, each 12 + 2 × 1 = 14 ft.",
        "Rafters = 144 ÷ 16 = 9 + 1 = 10, plus 10% = 11 rafters, each 14 ft.",
        "Top slats = 144 ÷ 12 = 12 + 1 = 13, plus 10% = 14.3 → 15 slats.",
        "Concrete per post = (π × 6² − 5.5²) × 36 ÷ 1,728 = 1.73 cu ft; × 4 posts × 1.10 = 7.59 cu ft → 13 bags of 80 lb.",
      ],
    },
    tips: [
      "Attach beams to posts with structural bolts or rated connectors and use hurricane ties between rafters and beams — pergolas catch a surprising amount of wind.",
      "Cedar, redwood and pressure-treated pine are typical; use ground-contact rated lumber for any post set in concrete or soil.",
      "Diagonal knee braces between posts and beams add a lot of stiffness to a freestanding pergola.",
      "If attaching a pergola to the house, use a properly flashed ledger, as for a deck.",
      "Check permit rules: many jurisdictions require a permit above a certain size or when the structure is attached to the house.",
    ],
    faqs: [
      {
        q: "How many posts does a 12 × 12 pergola need?",
        a: "Four, one at each corner, when the beams can span 12 ft (typically doubled 2×10 or larger, depending on species and load). Spans beyond that need a middle post on each side — six in total.",
      },
      {
        q: "How far apart should pergola rafters be?",
        a: "12 to 24 in on center. 16 in is common and gives good shade; closer spacing or top slats add more shade, wider spacing feels more open.",
      },
      {
        q: "What size posts for a pergola?",
        a: "6×6 posts are the usual choice for residential pergolas — they resist bending and give room for notching beams. 4×4s are generally only suitable for small, light structures.",
      },
      {
        q: "How deep should pergola footings be?",
        a: "Below your local frost line and typically at least 24–36 in, with holes about 12 in across for 6×6 posts. Local code sets the minimum, so check with your building department.",
      },
      {
        q: "How much concrete for pergola posts?",
        a: "A 6×6 post in a 12 in hole, 36 in deep, takes about 1.7 cu ft — roughly three 80 lb bags per post, or about 12–13 bags for a four-post pergola with a little extra.",
      },
    ],
    sources: [
      AWC_DCA6,
      { title: "Outdoor accents and pergola connector installation guide", publisher: "Simpson Strong-Tie" },
      { title: "Concrete mix yields and post-setting instructions", publisher: "Quikrete" },
    ],
    related: ["post-hole-calculator", "concrete-bags-calculator", "deck-joists-calculator", "framing-lumber-calculator", "deck-cost-calculator"],
  },
];
