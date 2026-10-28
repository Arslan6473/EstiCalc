"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Link2, Printer, RotateCcw } from "lucide-react";
import { getLogic } from "@/lib/calculators/logic";
import type { Field, ResultItem, Values } from "@/lib/calculators/types";
import { fromImperial, toImperial, unitLabel, type UnitSystem } from "@/lib/calculators/units";

type Inputs = Record<string, string>;

const fieldDim = (f: Field) => (f.type === "select" ? undefined : f.dim);

/** Round for display in an input box without noisy float tails. */
function tidy(n: number) {
  if (!Number.isFinite(n)) return "0";
  const abs = Math.abs(n);
  const digits = abs >= 100 ? 1 : abs >= 1 ? 2 : 3;
  return String(Number(n.toFixed(digits)));
}

function defaultInputs(fields: Field[], system: UnitSystem): Inputs {
  return Object.fromEntries(fields.map((f) => [f.id, tidy(fromImperial(f.default, fieldDim(f), system))]));
}

function toValues(fields: Field[], inputs: Inputs, system: UnitSystem): Values {
  const v: Values = {};
  for (const f of fields) {
    const n = parseFloat(inputs[f.id]);
    v[f.id] = toImperial(Number.isFinite(n) ? n : 0, fieldDim(f), system);
  }
  return v;
}

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const usdCents = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

function formatResult(r: ResultItem, system: UnitSystem) {
  const value = fromImperial(r.value, r.dim, system);
  if (r.format === "currency") {
    return { text: (r.decimals === 0 || Math.abs(value) >= 1000 ? usd : usdCents).format(value), unit: "" };
  }
  const decimals = r.format === "integer" ? 0 : (r.decimals ?? 2);
  const text = value.toLocaleString("en-US", { maximumFractionDigits: decimals, minimumFractionDigits: 0 });
  if (r.format === "percent") return { text: `${text}%`, unit: "" };
  return { text, unit: r.dim ? unitLabel(r.dim, system) : (r.unit ?? "") };
}

export function CalculatorWidget({ slug, name }: { slug: string; name: string }) {
  const logic = getLogic(slug)!;
  const hasUnits = logic.fields.some((f) => fieldDim(f));
  const [system, setSystem] = useState<UnitSystem>("imperial");
  const [inputs, setInputs] = useState<Inputs>(() => defaultInputs(logic.fields, "imperial"));
  const [copied, setCopied] = useState<"" | "results" | "link">("");

  // Restore a shared calculation from the URL (?u=metric&length=4...).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (![...params.keys()].length) return;
    const sys: UnitSystem = params.get("u") === "metric" && hasUnits ? "metric" : "imperial";
    const next = defaultInputs(logic.fields, sys);
    for (const f of logic.fields) {
      const p = params.get(f.id);
      if (p !== null && Number.isFinite(parseFloat(p))) next[f.id] = p;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from the URL
    setSystem(sys);
    setInputs(next);
  }, [logic.fields, hasUnits]);

  const values = useMemo(() => toValues(logic.fields, inputs, system), [logic.fields, inputs, system]);
  const results = useMemo(() => {
    try {
      return logic.compute(values).filter((r) => Number.isFinite(r.value));
    } catch {
      return [];
    }
  }, [logic, values]);

  const primary = results.find((r) => r.primary) ?? results[0];
  const secondary = results.filter((r) => r !== primary);

  function switchSystem(next: UnitSystem) {
    if (next === system) return;
    setInputs((prev) => {
      const converted: Inputs = { ...prev };
      for (const f of logic.fields) {
        const dim = fieldDim(f);
        const n = parseFloat(prev[f.id]);
        if (dim && Number.isFinite(n)) converted[f.id] = tidy(fromImperial(toImperial(n, dim, system), dim, next));
      }
      return converted;
    });
    setSystem(next);
  }

  function flash(kind: "results" | "link") {
    setCopied(kind);
    setTimeout(() => setCopied(""), 1800);
  }

  async function copyResults() {
    const lines = results.map((r) => {
      const f = formatResult(r, system);
      return `${r.label}: ${f.text}${f.unit ? ` ${f.unit}` : ""}`;
    });
    try {
      await navigator.clipboard.writeText(`${name}\n${lines.join("\n")}\n${window.location.origin}${window.location.pathname}`);
      flash("results");
    } catch {}
  }

  async function copyLink() {
    const params = new URLSearchParams();
    if (system === "metric") params.set("u", "metric");
    for (const f of logic.fields) params.set(f.id, inputs[f.id]);
    const url = `${window.location.origin}${window.location.pathname}?${params}`;
    try {
      await navigator.clipboard.writeText(url);
      window.history.replaceState(null, "", `?${params}`);
      flash("link");
    } catch {}
  }

  const visibleFields = logic.fields.filter((f) => !f.showIf || f.showIf(values));

  return (
    <section
      aria-label={name}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.18)]"
    >
      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        <form
          className="p-5 sm:p-7"
          onSubmit={(e) => e.preventDefault()}
          aria-describedby={`${slug}-desc`}
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 id={`${slug}-desc`} className="font-display text-lg font-bold text-slate-900">
              Enter your measurements
            </h2>
            {hasUnits && (
              <div role="radiogroup" aria-label="Units" className="no-print inline-flex rounded-full bg-slate-100 p-1 text-sm font-semibold">
                {(["imperial", "metric"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={system === s}
                    onClick={() => switchSystem(s)}
                    className={`rounded-full px-3.5 py-1.5 transition ${
                      system === s ? "bg-white text-brand-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {s === "imperial" ? "Feet / inches" : "Metres / cm"}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {visibleFields.map((f) => {
              const id = `${slug}-${f.id}`;
              const helpId = f.help ? `${id}-help` : undefined;
              const wide = f.type === "select" && f.options.some((o) => o.label.length > 22);
              return (
                <div key={f.id} className={wide ? "sm:col-span-2" : ""}>
                  <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-700">
                    {f.label}
                  </label>
                  {f.type === "select" ? (
                    <select
                      id={id}
                      value={inputs[f.id]}
                      aria-describedby={helpId}
                      onChange={(e) => setInputs((p) => ({ ...p, [f.id]: e.target.value }))}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
                    >
                      {f.options.map((o) => (
                        <option key={o.value} value={String(o.value)}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex rounded-xl border border-slate-300 bg-white shadow-sm focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-600/20">
                      {f.prefix && (
                        <span className="flex items-center pl-3 text-sm font-medium text-slate-500">{f.prefix}</span>
                      )}
                      <input
                        id={id}
                        type="number"
                        inputMode="decimal"
                        value={inputs[f.id]}
                        min={f.min}
                        max={f.max}
                        step={f.step ?? "any"}
                        aria-describedby={helpId}
                        onChange={(e) => setInputs((p) => ({ ...p, [f.id]: e.target.value }))}
                        className="w-full min-w-0 rounded-xl bg-transparent px-3 py-2.5 text-slate-900 focus:outline-none"
                      />
                      {(f.dim || f.suffix) && (
                        <span className="flex shrink-0 items-center pr-3 text-sm font-medium text-slate-500">
                          {f.dim ? unitLabel(f.dim, system) : f.suffix}
                        </span>
                      )}
                    </div>
                  )}
                  {f.help && (
                    <p id={helpId} className="mt-1 text-xs leading-snug text-slate-500">
                      {f.help}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setInputs(defaultInputs(logic.fields, system))}
            className="no-print mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset to example values
          </button>
        </form>

        <div className="flex flex-col border-t border-slate-200 bg-gradient-to-br from-brand-50 via-white to-amber-50/60 p-5 sm:p-7 lg:border-l lg:border-t-0">
          <h2 className="font-display text-lg font-bold text-slate-900">Your results</h2>
          <div aria-live="polite" className="mt-4 flex-1">
            {primary ? (
              <>
                <div className="rounded-2xl bg-brand-800 p-5 text-white shadow-lg">
                  <p className="text-sm font-medium text-brand-100">{primary.label}</p>
                  <p className="mt-1 font-display text-4xl font-extrabold tracking-tight">
                    {formatResult(primary, system).text}
                    <span className="ml-2 text-lg font-semibold text-brand-200">{formatResult(primary, system).unit}</span>
                  </p>
                  {primary.help && <p className="mt-2 text-xs text-brand-100">{primary.help}</p>}
                </div>
                {secondary.length > 0 && (
                  <dl className="mt-4 divide-y divide-slate-200/80 rounded-2xl border border-slate-200 bg-white">
                    {secondary.map((r) => {
                      const f = formatResult(r, system);
                      return (
                        <div key={r.key} className="flex items-baseline justify-between gap-4 px-4 py-3">
                          <dt className="text-sm text-slate-600">
                            {r.label}
                            {r.help && <span className="block text-xs text-slate-400">{r.help}</span>}
                          </dt>
                          <dd className="shrink-0 text-right font-semibold text-slate-900">
                            {f.text}
                            {f.unit && <span className="ml-1 text-sm font-medium text-slate-500">{f.unit}</span>}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                )}
              </>
            ) : (
              <p className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
                Enter your measurements to see results.
              </p>
            )}
          </div>

          <div className="no-print mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copyResults}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
            >
              {copied === "results" ? <Check className="h-4 w-4 text-brand-700" /> : <Copy className="h-4 w-4" />}
              {copied === "results" ? "Copied" : "Copy results"}
            </button>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
            >
              {copied === "link" ? <Check className="h-4 w-4 text-brand-700" /> : <Link2 className="h-4 w-4" />}
              {copied === "link" ? "Link copied" : "Share link"}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
            >
              <Printer className="h-4 w-4" /> Print
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
