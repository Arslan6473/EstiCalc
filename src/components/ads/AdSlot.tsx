"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { adsense } from "@/lib/site";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Placement = keyof typeof adsense.slots;

const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === "1";

/**
 * A responsive AdSense unit. Renders nothing until NEXT_PUBLIC_ADSENSE_CLIENT and
 * the slot id for this placement are configured, so the site stays clean while
 * it is being reviewed (Auto ads still work with only the client id set).
 */
export function AdSlot({ placement, className = "" }: { placement: Placement; className?: string }) {
  const slot = adsense.slots[placement];
  const pathname = usePathname();

  if (!adsense.client || !slot) {
    if (!showPlaceholders) return null;
    return (
      <div
        className={`no-print flex min-h-[120px] items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-xs font-medium uppercase tracking-wide text-slate-400 ${className}`}
      >
        Ad placement · {placement}
      </div>
    );
  }

  return <AdUnit key={pathname} client={adsense.client} slot={slot} className={className} />;
}

function AdUnit({ client, slot, className }: { client: string; slot: string; className: string }) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.dataset.adsbygoogleStatus) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers or a not-yet-approved account; the page works without ads.
    }
  }, []);

  return (
    <div className={`no-print ${className}`}>
      <p className="mb-1 text-center text-[10px] uppercase tracking-widest text-slate-400">Advertisement</p>
      <ins
        ref={ref}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
