import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about EstiCalc calculators: cost, accuracy, units, waste allowances, cost estimates, privacy and how to report an error.",
  path: "/faq",
});

const groups: { title: string; faqs: { q: string; a: string }[] }[] = [
  {
    title: "Using the calculators",
    faqs: [
      { q: "Do I need an account?", a: "No. Every calculator is free and works instantly in your browser without an account, sign-up or download." },
      { q: "How do I switch between feet and metres?", a: "Use the Feet / inches and Metres / cm toggle at the top of any calculator that uses measurements. Values you have entered are converted automatically." },
      { q: "Can I save or share a calculation?", a: "Yes. Use Share link to copy a link that reopens the calculator with your exact values, Copy results to paste the numbers into a note or message, or Print to keep a paper copy." },
      { q: "What is the waste allowance?", a: "It is extra material added on top of the exact quantity to cover cuts, breakage, pattern matching and mistakes. Typical allowances are 5–10% for simple layouts and 15–20% for diagonal or complex layouts. You can change it on every material calculator." },
      { q: "Why does the calculator round up?", a: "Materials are sold in whole units — cans, boxes, bags and sheets — so we round the number to buy up to the next whole unit while also showing the exact quantity." },
    ],
  },
  {
    title: "Accuracy and costs",
    faqs: [
      { q: "How accurate are the results?", a: "Formulas are checked against manufacturer coverage charts and tested against a worked example. Results are estimates: real quantities depend on the product, surface condition, layout and installer. Confirm quantities with your supplier for large orders." },
      { q: "Where do the prices come from?", a: "Cost calculators use typical U.S. price ranges and show the assumptions and the date prices were checked. Prices vary by region and change over time, so replace the default prices with your local quotes." },
      { q: "Can I use these results for permits or structural design?", a: "No. Structural, roofing, electrical and HVAC results are planning estimates only. Building work must follow your local code and be designed or checked by a licensed professional." },
    ],
  },
  {
    title: "About the site",
    faqs: [
      { q: "How is EstiCalc free?", a: "The site is supported by advertising. Ads never affect calculator results or recommendations." },
      { q: "I found an error — how do I report it?", a: "Please use the contact page and include the calculator name, the values you entered and what you expected. We check every report." },
      { q: "Can you add a calculator I need?", a: "Yes — suggest it through the contact page. We add new calculators regularly based on reader requests." },
      { q: "Do you store the numbers I enter?", a: "No. Calculations run in your browser and the values you type are not sent to our servers. See the privacy policy for how cookies and advertising work." },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader title="Frequently asked questions" intro={`Everything you need to know about using ${site.name}.`} crumbs={[{ name: "FAQ", href: "/faq" }]} />
      <div className="mx-auto max-w-3xl space-y-12 px-4 pt-10 sm:px-6">
        {groups.map((g) => (
          <section key={g.title} aria-labelledby={g.title}>
            <h2 id={g.title} className="font-display text-2xl font-bold text-slate-900">
              {g.title}
            </h2>
            <div className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
              {g.faqs.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                    <h3>{f.q}</h3>
                    <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="mt-3 leading-relaxed text-slate-700">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
        <p className="text-slate-600">
          Still have a question?{" "}
          <Link href="/contact" className="font-semibold text-brand-700 underline">
            Contact us
          </Link>
          .
        </p>
      </div>
      <JsonLd
        data={{
          "@type": "FAQPage",
          mainEntity: groups.flatMap((g) => g.faqs).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </>
  );
}
