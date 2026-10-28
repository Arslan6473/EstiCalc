export const site = {
  name: "EstiCalc",
  tagline: "Free home improvement calculators",
  description:
    "Free, accurate home improvement calculators for paint, flooring, tile, drywall, concrete, landscaping, roofing and project costs. No sign-up, works in feet or metres.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://esticalc.com").replace(/\/$/, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@esticalc.com",
  author: "EstiCalc Editorial Team",
  locale: "en_US",
  /** Date the calculator formulas and content were last reviewed. */
  reviewedOn: "2026-10-28",
  twitter: "@esticalc",
};

export const adsense = {
  /** e.g. ca-pub-1234567890123456 — set NEXT_PUBLIC_ADSENSE_CLIENT to enable ads. */
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
  slots: {
    calculator: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CALCULATOR || "",
    inArticle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE || "",
    sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || "",
  },
};

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
