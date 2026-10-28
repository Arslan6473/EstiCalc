import Link from "next/link";
import { StaticPage } from "@/components/ui/StaticPage";
import { calculators } from "@/lib/calculators/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About EstiCalc",
  description:
    "EstiCalc builds free, accurate home improvement calculators so homeowners and contractors can buy the right amount of material the first time.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <StaticPage
      title="About EstiCalc"
      path="/about"
      intro="Free, accurate calculators that help you buy the right amount of material the first time."
    >
      <h2>Why we built EstiCalc</h2>
      <p>
        Almost every home improvement project starts with the same question: <em>how much do I need?</em> Buy too little and
        you lose a weekend to an extra trip to the store — or end up with mismatched paint or tile from a different batch. Buy
        too much and you are left with expensive leftovers. {site.name} exists to answer that question quickly and reliably,
        for free.
      </p>
      <p>
        Today the site has {calculators.length} calculators covering measurement, paint and finishes, flooring, tile, drywall
        and insulation, concrete and masonry, landscaping, outdoor structures and roofing, room comfort, project costs and
        water volume. Every calculator works in feet or metres and needs no account or sign-up.
      </p>

      <h2>What makes our calculators different</h2>
      <ul>
        <li>
          <strong>The formula is always shown.</strong> We explain exactly how each result is calculated, so you can check it
          or adapt it to your project.
        </li>
        <li>
          <strong>Every tool has a worked example.</strong> Each example is tested automatically against the calculator, so
          the numbers on the page always match the tool.
        </li>
        <li>
          <strong>Waste is built in.</strong> Material calculators include an adjustable waste allowance, because real projects
          involve cuts, breakage and mistakes.
        </li>
        <li>
          <strong>Costs are dated.</strong> Cost calculators state the typical price range, the assumptions behind it and the
          date prices were last checked. Every price can be replaced with your local quote.
        </li>
        <li>
          <strong>Safety comes first.</strong> Calculators for structural, roofing, electrical and HVAC work clearly say that
          results are planning estimates to be confirmed by a licensed professional.
        </li>
      </ul>

      <h2>Who is behind the site</h2>
      <p>
        {site.name} is written and maintained by the {site.author}. We check formulas against manufacturer coverage charts, trade association
        guidance and building code references, and we update pages when products or prices change. You can read exactly how we
        work in our <Link href="/editorial-policy">editorial policy</Link>.
      </p>

      <h2>How the site is funded</h2>
      <p>
        {site.name} is free because it is supported by advertising. Advertisers never influence our formulas, results or
        recommendations, and we do not accept payment to feature products. Read our{" "}
        <Link href="/privacy-policy">privacy policy</Link> to learn how ads use cookies.
      </p>

      <h2>Get in touch</h2>
      <p>
        Found a mistake, want a new calculator, or have a question about a result? We read every message — please{" "}
        <Link href="/contact">contact us</Link>.
      </p>
    </StaticPage>
  );
}
