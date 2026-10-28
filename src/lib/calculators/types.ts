import type { Dimension } from "./units";

/** Input values passed to compute(), always in imperial base units. */
export type Values = Record<string, number>;

export interface NumberField {
  id: string;
  label: string;
  type?: "number";
  /** Physical dimension; enables automatic feet/metre conversion. */
  dim?: Dimension;
  /** Default value in imperial base units. */
  default: number;
  min?: number;
  max?: number;
  step?: number;
  /** Unit shown next to non-dimensional inputs, e.g. "%", "$", "coats". */
  suffix?: string;
  /** Prefix such as "$" for money inputs. */
  prefix?: string;
  help?: string;
  showIf?: (v: Values) => boolean;
}

export interface SelectField {
  id: string;
  label: string;
  type: "select";
  options: { label: string; value: number }[];
  default: number;
  help?: string;
  showIf?: (v: Values) => boolean;
}

export type Field = NumberField | SelectField;

export interface ResultItem {
  /** Stable key, used by worked-example tests. */
  key: string;
  label: string;
  /** Value in imperial base units (converted for display when dim is set). */
  value: number;
  dim?: Dimension;
  /** Unit label for non-dimensional results, e.g. "gallons", "bags", "sheets". */
  unit?: string;
  format?: "number" | "integer" | "currency" | "percent";
  decimals?: number;
  /** Highlight as the headline answer. */
  primary?: boolean;
  help?: string;
}

/** Pure calculation logic — bundled to the browser, so keep it free of prose. */
export interface CalculatorLogic {
  slug: string;
  fields: Field[];
  compute: (v: Values) => ResultItem[];
}

export type CategorySlug =
  | "area-measurement"
  | "paint-finishes"
  | "flooring"
  | "tile"
  | "drywall-framing-insulation"
  | "concrete-masonry"
  | "landscaping"
  | "outdoor-roofing"
  | "comfort-room-planning"
  | "cost-budgeting"
  | "water-volume";

export type CalculatorKind = "material" | "cost" | "conversion" | "planning";

export interface Faq {
  q: string;
  a: string;
}

export interface Source {
  title: string;
  publisher: string;
  url?: string;
}

/** Editorial content — rendered on the server only. */
export interface CalculatorContent {
  slug: string;
  /** Display name, e.g. "Paint Calculator". */
  name: string;
  category: CategorySlug;
  kind: CalculatorKind;
  /** Launch calculator (★ in the plan). */
  featured?: boolean;
  /** SEO <title> without the brand suffix, 50–60 chars. */
  seoTitle: string;
  /** Meta description, 140–160 chars. */
  description: string;
  /** One-paragraph intro shown under the H1. */
  intro: string;
  keywords: string[];
  howToUse: string[];
  formula: { lines: string[]; notes?: string[] };
  example: {
    scenario: string;
    /** Inputs in imperial base units; merged over field defaults. */
    inputs: Values;
    /** Expected result values by ResultItem.key (imperial), checked by tests. */
    expected: Record<string, number>;
    steps: string[];
  };
  tips: string[];
  faqs: Faq[];
  sources: Source[];
  related: string[];
  /** Structural, electrical, HVAC or roof-pitch work: show the licensed-pro note. */
  safety?: boolean;
  /** Required when kind === "cost". */
  cost?: { priceRange: string; assumptions: string[]; updated: string };
}
