import Link from "next/link";
import { StaticPage } from "@/components/ui/StaticPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "Which cookies EstiCalc and its partners use, including Google AdSense and Google Analytics cookies, and how to manage or turn them off in your browser.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <StaticPage title="Cookie policy" path="/cookie-policy" updated={site.reviewedOn}>
      <p>
        This page explains how {site.name} uses cookies and similar technologies such as local storage. For how we handle
        personal information more generally, see our <Link href="/privacy-policy">privacy policy</Link>.
      </p>

      <h2>What are cookies?</h2>
      <p>
        Cookies are small text files a website stores on your device. They let a site remember your actions and preferences
        and help advertisers measure and personalise ads.
      </p>

      <h2>Cookies we use</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Set by</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Strictly necessary (local storage)</td>
            <td>{site.name}</td>
            <td>Remembers that you dismissed the cookie notice.</td>
          </tr>
          <tr>
            <td>Advertising</td>
            <td>Google AdSense / DoubleClick</td>
            <td>Serves ads, limits how often you see the same ad, measures ad performance and, with consent, personalises ads.</td>
          </tr>
          <tr>
            <td>Analytics</td>
            <td>Google Analytics (if enabled)</td>
            <td>Counts visits and shows which pages are used, in aggregate.</td>
          </tr>
          <tr>
            <td>Consent</td>
            <td>Consent management platform</td>
            <td>Stores your cookie choices for visitors in the EEA, UK and Switzerland.</td>
          </tr>
        </tbody>
      </table>

      <h2>Managing cookies</h2>
      <ul>
        <li>
          Opt out of personalised Google ads at{" "}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
        </li>
        <li>
          Opt out of many third-party advertising cookies at{" "}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info</a>.
        </li>
        <li>
          Block or delete cookies in your browser settings. Blocking cookies does not stop the calculators from working, but you
          may see less relevant ads.
        </li>
      </ul>

      <h2>Questions</h2>
      <p>
        Contact us at <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </StaticPage>
  );
}
