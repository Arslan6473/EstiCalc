export type UnitSystem = "imperial" | "metric";

/**
 * Physical dimension of a field or result. Calculator logic always works in
 * imperial base units; the widget converts metric input/output at the edges.
 */
export type Dimension =
  | "length" // ft  <-> m
  | "smallLength" // in  <-> cm
  | "area" // sq ft <-> m²
  | "volume" // cu ft <-> m³
  | "cubicYards" // cu yd <-> m³
  | "weight" // lb <-> kg
  | "liquid" // US gal <-> L
  | "coverage" // sq ft/gal <-> m²/L
  | "pricePerArea" // $/sq ft <-> $/m²
  | "pricePerLength" // $/ft <-> $/m
  | "pricePerVolume"; // $/cu yd <-> $/m³

/** Multiply a metric value by this factor to get the imperial base value. */
export const METRIC_TO_IMPERIAL: Record<Dimension, number> = {
  length: 3.28084,
  smallLength: 1 / 2.54,
  area: 10.7639,
  volume: 35.3147,
  cubicYards: 1.30795,
  weight: 2.20462,
  liquid: 0.264172,
  coverage: 40.7458,
  pricePerArea: 1 / 10.7639,
  pricePerLength: 1 / 3.28084,
  pricePerVolume: 1 / 1.30795,
};

export const UNIT_LABELS: Record<Dimension, Record<UnitSystem, string>> = {
  length: { imperial: "ft", metric: "m" },
  smallLength: { imperial: "in", metric: "cm" },
  area: { imperial: "sq ft", metric: "m²" },
  volume: { imperial: "cu ft", metric: "m³" },
  cubicYards: { imperial: "cu yd", metric: "m³" },
  weight: { imperial: "lb", metric: "kg" },
  liquid: { imperial: "gal", metric: "L" },
  coverage: { imperial: "sq ft/gal", metric: "m²/L" },
  pricePerArea: { imperial: "$/sq ft", metric: "$/m²" },
  pricePerLength: { imperial: "$/ft", metric: "$/m" },
  pricePerVolume: { imperial: "$/cu yd", metric: "$/m³" },
};

export function toImperial(value: number, dim: Dimension | undefined, system: UnitSystem) {
  if (!dim || system === "imperial") return value;
  return value * METRIC_TO_IMPERIAL[dim];
}

export function fromImperial(value: number, dim: Dimension | undefined, system: UnitSystem) {
  if (!dim || system === "imperial") return value;
  return value / METRIC_TO_IMPERIAL[dim];
}

export function unitLabel(dim: Dimension | undefined, system: UnitSystem) {
  return dim ? UNIT_LABELS[dim][system] : "";
}
