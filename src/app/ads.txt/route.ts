import { adsense } from "@/lib/site";

export const dynamic = "force-static";

// Google's AdSense ads.txt line: publisher id without the "ca-" prefix.
export function GET() {
  const pub = adsense.client.replace(/^ca-/, "");
  const body = pub ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n` : "# Set NEXT_PUBLIC_ADSENSE_CLIENT to publish your ads.txt\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
