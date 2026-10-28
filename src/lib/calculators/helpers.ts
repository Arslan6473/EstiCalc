import type { NumberField, SelectField } from "./types";

/** Standard waste allowance input, required on every material calculator. */
export function wasteField(defaultPct = 10, help?: string): NumberField {
  return {
    id: "waste",
    label: "Waste allowance",
    default: defaultPct,
    min: 0,
    max: 50,
    step: 1,
    suffix: "%",
    help: help ?? "Extra material for cuts, breakage and mistakes.",
  };
}

export const withWaste = (qty: number, wastePct: number) => qty * (1 + (wastePct || 0) / 100);

export const ceil = (n: number) => (Number.isFinite(n) ? Math.ceil(n - 1e-9) : 0);

export const safeDiv = (a: number, b: number) => (b ? a / b : 0);

export const CU_FT_PER_CU_YD = 27;

export function shapeSelect(id = "shape", options = ["Rectangle", "Circle"]): SelectField {
  return {
    id,
    label: "Shape",
    type: "select",
    default: 0,
    options: options.map((label, value) => ({ label, value })),
  };
}
