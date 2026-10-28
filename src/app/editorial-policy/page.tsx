import Link from "next/link";
import { StaticPage } from "@/components/ui/StaticPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Editorial Policy & Methodology",
  description:
    "How EstiCalc builds and checks its calculators: formula sources, worked-example testing, waste allowances, dated cost data, safety notes and corrections.",
  path: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  return (
    <StaticPage
      title="Editorial policy & methodology"
      path="/editorial-policy"
      updated={site.reviewedOn}
      intro="How we build, check and maintain every calculator and guide on EstiCalc."
    >
      <h2>Our standards</h2>
      <p>
        Every calculator and article on {site.name} is written to help you make a practical decision: how much material to
        buy, what a project is likely to cost, or how to measure correctly. We aim to be accurate, transparent about our
        assumptions, and honest about the limits of an online estimate.
      </p>

      <h2>How we build a calculator</h2>
      <ol>
        <li>
          <strong>Research the method.</strong> We start from manufacturer installation guides and coverage charts, trade
          association guidance, government sources such as ENERGY STAR and the U.S. Department of Energy, and the International
          Residential Code where it applies.
        </li>
        <li>
          <strong>Write the formula in plain language.</strong> Each page shows the formula we use and the assumptions behind
          it, such as standard door and window sizes or bag yields.
        </li>
        <li>
          <strong>Test it.</strong> Every calculator has a worked example, and an automated test checks that the calculator
          reproduces that example. We also compare results with a manufacturer coverage chart or a known example before
          publishing.
        </li>
        <li>
          <strong>Add waste and units.</strong> Material calculators include an adjustable waste allowance and work in both
          feet and metres.
        </li>
        <li>
          <strong>Review and date.</strong> Pages show when they were last reviewed.
        </li>
      </ol>

      <h2>Cost estimates</h2>
      <p>
        Prices vary widely by region, supplier, season and contractor. Every cost calculator states a typical price range, the
        assumptions used and the date prices were last checked, and every price is an editable input so you can use your own
        quotes. Cost results are budgeting guides, not quotes.
      </p>

      <h2>Safety-related calculators</h2>
      <p>
        Calculators involving framing, rafters, roof pitch, stairs, decks, retaining walls, footings, heating and air
        conditioning, or anything structural or electrical give planning estimates only. They carry a clear notice that the
        design must follow local building codes and be confirmed by a licensed professional.
      </p>

      <h2>Independence and advertising</h2>
      <p>
        {site.name} is funded by advertising. Advertisers have no influence over our formulas, results, rankings or
        recommendations. We do not accept paid placements in calculators or guides, and ads are always clearly separated from
        content.
      </p>

      <h2>Corrections</h2>
      <p>
        If you find an error, please <Link href="/contact">contact us</Link>. We investigate every report, correct confirmed
        errors promptly, and update the page’s review date.
      </p>
    </StaticPage>
  );
}
