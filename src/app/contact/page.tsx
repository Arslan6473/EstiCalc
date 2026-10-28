import { ContactForm } from "@/components/ContactForm";
import { StaticPage } from "@/components/ui/StaticPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Contact the EstiCalc team to report a calculator error, suggest a new calculator, or ask a question. We reply to every message.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <StaticPage title="Contact us" path="/contact" intro="Questions, corrections and calculator ideas are always welcome.">
      <p>
        The quickest way to reach us is by email at <a href={`mailto:${site.email}`}>{site.email}</a>. We aim to reply within
        two business days. You can also use the form below, which opens your email app with your message ready to send.
      </p>
      <ContactForm email={site.email} />
      <h2>Reporting a calculator error</h2>
      <p>
        Accuracy matters to us. If a result looks wrong, tell us the calculator name, the values you entered, the result you
        got and what you expected. We check every report against the formula and manufacturer data, and correct the page if
        we find a problem.
      </p>
      <h2>Privacy requests</h2>
      <p>
        To ask about the data collected when you use this site, or to make a privacy request, email us with the subject
        “Privacy request”. See our privacy policy for details.
      </p>
    </StaticPage>
  );
}
