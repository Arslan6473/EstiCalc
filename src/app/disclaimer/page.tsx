import Link from "next/link";
import { StaticPage } from "@/components/ui/StaticPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Disclaimer",
  description:
    "EstiCalc calculators provide estimates for planning only. Read how to use results, the limits of cost data, and why structural work needs a licensed professional.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <StaticPage title="Disclaimer" path="/disclaimer" updated={site.reviewedOn}>
      <h2>Estimates for planning only</h2>
      <p>
        The calculators and articles on {site.name} are provided for general information and planning. Results are estimates
        based on the values you enter and on the assumptions stated on each page. Actual material quantities and costs depend on
        the specific products, site conditions, layout, installation method and local prices.
      </p>
      <p>Always confirm quantities with your supplier and follow the manufacturer’s instructions for any product you use.</p>

      <h2>Not professional advice</h2>
      <p>
        Nothing on this site is engineering, architectural, electrical, legal or financial advice. Calculations involving
        structure (framing, beams, rafters, decks, stairs, footings, retaining walls), roofing, heating and cooling, gas or
        electrical work are planning estimates only. That work must comply with your local building codes and should be
        designed, inspected or approved by a licensed professional. Check whether your project needs a permit.
      </p>

      <h2>Cost information</h2>
      <p>
        Price ranges are typical U.S. figures at the date shown on each calculator and vary by region, supplier, season and
        contractor. They are not quotes. Get several written quotes before committing to a project.
      </p>

      <h2>Accuracy</h2>
      <p>
        We test every calculator against worked examples and manufacturer data and correct errors when we find them (see our{" "}
        <Link href="/editorial-policy">editorial policy</Link>), but we cannot guarantee that every result is complete, accurate
        or current. You use the site at your own risk, and {site.name} is not liable for any loss arising from its use.
      </p>

      <h2>External links and advertising</h2>
      <p>
        The site links to third-party websites and shows third-party advertising. We do not control and are not responsible for
        their content, products or services.
      </p>

      <p>
        Found a problem? <Link href="/contact">Let us know</Link>.
      </p>
    </StaticPage>
  );
}
