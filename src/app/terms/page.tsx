import Link from "next/link";
import { StaticPage } from "@/components/ui/StaticPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "The terms for using EstiCalc's free home improvement calculators and guides: permitted use, intellectual property, disclaimers and limitation of liability.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <StaticPage title="Terms of use" path="/terms" updated={site.reviewedOn}>
      <p>
        These terms govern your use of {site.name} ({site.url}). By using the site you agree to them. If you do not agree,
        please do not use the site.
      </p>

      <h2>Use of the site</h2>
      <p>
        You may use the calculators and read the articles free of charge for personal and business planning. You agree not to
        misuse the site, including by attempting to disrupt it, scraping it at a volume that affects other visitors, or using
        it for any unlawful purpose.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The text, calculators, illustrations and design of the site belong to {site.name} unless stated otherwise. You may
        share links to any page and quote short extracts with attribution and a link. Do not republish whole articles or copy
        the calculators without written permission.
      </p>

      <h2>No warranty</h2>
      <p>
        The site is provided “as is” without warranties of any kind. Results are estimates; see our{" "}
        <Link href="/disclaimer">disclaimer</Link>.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {site.name} is not liable for any direct, indirect or consequential loss arising
        from your use of the site or reliance on its results, including over- or under-ordering of materials, project costs, or
        work that does not meet code.
      </p>

      <h2>Third-party content</h2>
      <p>
        Advertising and external links are provided by third parties. Your dealings with them are solely between you and them.
      </p>

      <h2>Privacy</h2>
      <p>
        Our <Link href="/privacy-policy">privacy policy</Link> and <Link href="/cookie-policy">cookie policy</Link> explain how
        information is handled.
      </p>

      <h2>Changes</h2>
      <p>We may update these terms. Continued use of the site after a change means you accept the updated terms.</p>

      <h2>Contact</h2>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </StaticPage>
  );
}
