import { describe, expect, it } from "vitest";
import { catalog } from "@/lib/calculators/catalog";
import { calculators, getCalculator } from "@/lib/calculators/content";
import { allLogic, getLogic } from "@/lib/calculators/logic";
import type { CalculatorLogic, Values } from "@/lib/calculators/types";

const catalogSlugs = new Set(catalog.map((c) => c.slug));

function defaults(logic: CalculatorLogic): Values {
  return Object.fromEntries(logic.fields.map((f) => [f.id, f.default]));
}

function close(actual: number, expected: number) {
  const tol = Math.max(Math.abs(expected) * 0.01, 0.011);
  return Math.abs(actual - expected) <= tol;
}

describe("registry", () => {
  it("every calculator in the plan has content and logic", () => {
    const missing = catalog.filter((c) => !getCalculator(c.slug) || !getLogic(c.slug)).map((c) => c.slug);
    expect(missing).toEqual([]);
  });

  it("has no unknown or duplicate slugs", () => {
    const logicSlugs = allLogic.map((l) => l.slug);
    expect(new Set(logicSlugs).size).toBe(logicSlugs.length);
    expect(logicSlugs.filter((s) => !catalogSlugs.has(s))).toEqual([]);
    expect(calculators.filter((c) => !catalogSlugs.has(c.slug)).map((c) => c.slug)).toEqual([]);
  });
});

describe.each(calculators.map((c) => [c.slug, c] as const))("%s", (slug, content) => {
  const logic = getLogic(slug)!;
  const entry = catalog.find((c) => c.slug === slug)!;

  it("has logic and matches the catalog", () => {
    expect(logic).toBeDefined();
    expect(content.category).toBe(entry.category);
    expect(!!content.featured).toBe(entry.featured);
  });

  it("returns finite results for default inputs", () => {
    const results = logic.compute(defaults(logic));
    expect(results.length).toBeGreaterThan(0);
    for (const r of results) expect(Number.isFinite(r.value), r.key).toBe(true);
    expect(results.filter((r) => r.primary).length).toBe(1);
  });

  it("reproduces the worked example", () => {
    const fieldIds = new Set(logic.fields.map((f) => f.id));
    for (const k of Object.keys(content.example.inputs)) expect(fieldIds.has(k), `unknown input ${k}`).toBe(true);
    const results = logic.compute({ ...defaults(logic), ...content.example.inputs });
    const byKey = new Map(results.map((r) => [r.key, r.value]));
    expect(Object.keys(content.example.expected).length).toBeGreaterThan(0);
    for (const [key, expected] of Object.entries(content.example.expected)) {
      expect(byKey.has(key), `missing result ${key}`).toBe(true);
      const actual = byKey.get(key)!;
      expect(close(actual, expected), `${key}: got ${actual}, expected ${expected}`).toBe(true);
    }
  });

  it("follows the site rules for its kind", () => {
    if (content.kind === "material") {
      expect(logic.fields.some((f) => f.id === "waste"), "material calculators need a waste field").toBe(true);
      expect(logic.fields.some((f) => "dim" in f && f.dim), "material calculators need a unit toggle").toBe(true);
    }
    if (entry.cost) {
      expect(content.kind).toBe("cost");
      expect(content.cost?.priceRange).toBeTruthy();
      expect(content.cost?.assumptions.length).toBeGreaterThan(0);
      expect(content.cost?.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    if (entry.safety) expect(content.safety).toBe(true);
  });

  it("has complete SEO content", () => {
    expect(content.seoTitle.length).toBeLessThanOrEqual(70);
    expect(content.description.length).toBeGreaterThanOrEqual(110);
    expect(content.description.length).toBeLessThanOrEqual(165);
    expect(content.keywords.length).toBeGreaterThanOrEqual(4);
    expect(content.faqs.length).toBeGreaterThanOrEqual(4);
    expect(content.sources.length).toBeGreaterThanOrEqual(2);
    expect(content.howToUse.length).toBeGreaterThanOrEqual(3);
    expect(content.example.steps.length).toBeGreaterThanOrEqual(2);
    expect(content.related.filter((r) => !catalogSlugs.has(r) || r === slug)).toEqual([]);
    expect(content.related.length).toBeGreaterThanOrEqual(3);
  });
});
