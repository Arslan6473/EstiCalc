import Link from "next/link";
import { StaticPage } from "@/components/ui/StaticPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How EstiCalc handles your data: calculations stay in your browser, how Google AdSense and analytics cookies work, your opt-out choices and your rights.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <StaticPage title="Privacy policy" path="/privacy-policy" updated={site.reviewedOn}>
      <p>
        This privacy policy explains what information {site.name} ({site.url}) collects, how it is used, and the choices you
        have. By using the site you agree to this policy.
      </p>

      <h2>Information we collect</h2>
      <h3>Calculator inputs</h3>
      <p>
        Calculations run entirely in your browser. The numbers you enter are not sent to or stored on our servers. If you use
        the Share link feature, your inputs are placed in the link itself so that anyone you send it to can see them.
      </p>
      <h3>Information you send us</h3>
      <p>
        If you email us or use the contact form, we receive your name, email address and message. We use this only to reply
        to you and do not sell or share it.
      </p>
      <h3>Log and usage data</h3>
      <p>
        Like most websites, our hosting provider automatically records standard log information such as IP address, browser
        type, referring page, pages visited and time of visit. We use this to keep the site secure and working, and to
        understand which pages are useful.
      </p>

      <h2>Cookies and similar technologies</h2>
      <p>
        Cookies are small text files stored on your device. We use a local setting to remember that you have dismissed the
        cookie notice. Third parties, including Google, use cookies as described below. See our{" "}
        <Link href="/cookie-policy">cookie policy</Link> for details.
      </p>

      <h2>Advertising — Google AdSense</h2>
      <p>{site.name} is free because it shows advertising served by Google AdSense.</p>
      <ul>
        <li>Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites.</li>
        <li>
          Google’s use of advertising cookies, including the DoubleClick (DART) cookie, enables it and its partners to serve ads to
          you based on your visits to this site and/or other sites on the Internet.
        </li>
        <li>
          You may opt out of personalised advertising by visiting{" "}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>. You can also opt out
          of some third-party vendors’ use of cookies for personalised advertising at{" "}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a> or, in Europe,{" "}
          <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer">www.youronlinechoices.eu</a>.
        </li>
        <li>
          Learn more in{" "}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
            how Google uses information from sites that use its services
          </a>
          .
        </li>
      </ul>
      <p>
        Visitors in the European Economic Area, the United Kingdom and Switzerland are asked for consent before personalised
        ads or non-essential cookies are used, through a Google-certified consent management platform. You can change your
        choice at any time from the privacy settings link shown by that tool.
      </p>

      <h2>Analytics</h2>
      <p>
        We may use Google Analytics to understand how visitors use the site in aggregate (for example, which calculators are
        most popular). Google Analytics uses cookies and collects data such as pages viewed and approximate location. You can
        opt out using the{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics opt-out browser add-on</a>.
      </p>

      <p>
        We also use Vercel Web Analytics, provided by our hosting company, to count page views. It does not use cookies and
        does not track you across other websites; visitors are counted in aggregate without identifying individuals.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>To operate, maintain and improve the website and calculators.</li>
        <li>To respond to messages and correction requests.</li>
        <li>To show advertising that keeps the site free.</li>
        <li>To detect and prevent abuse, fraud and security issues.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>Your rights</h2>
      <h3>GDPR (EEA, UK and Switzerland)</h3>
      <p>
        You have the right to access, correct or delete your personal data, to object to or restrict processing, to data
        portability, and to withdraw consent at any time. Our legal bases are consent (advertising and analytics cookies) and
        legitimate interests (security and site operation). You may complain to your local data protection authority.
      </p>
      <h3>CCPA / CPRA (California)</h3>
      <p>
        California residents have the right to know what personal information is collected, to request deletion, to correct
        it, and to opt out of the “sale” or “sharing” of personal information for cross-context behavioural advertising. You
        can opt out of personalised ads using the links above. We will not discriminate against you for exercising these
        rights.
      </p>
      <p>
        To make a request, email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Children’s privacy</h2>
      <p>
        This site is intended for adults planning home projects. We do not knowingly collect personal information from
        children under 13 (or under 16 in the EEA). If you believe a child has sent us information, contact us and we will
        delete it.
      </p>

      <h2>Data retention and security</h2>
      <p>
        We keep emails only as long as needed to respond and for reasonable record keeping. The site is served over HTTPS. No
        method of transmission over the Internet is completely secure, but we take reasonable measures to protect information.
      </p>

      <h2>Links to other sites</h2>
      <p>We link to manufacturers, government agencies and other sources. Their privacy practices are their own.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy. The “last updated” date above shows when it last changed.</p>

      <h2>Contact</h2>
      <p>
        Questions about privacy? Email <a href={`mailto:${site.email}`}>{site.email}</a> or use our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </StaticPage>
  );
}
