import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label={`${site.name} home`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="" width={36} height={36} className="h-9 w-9" />
      <span className="font-display text-xl font-extrabold tracking-tight text-slate-900">
        Esti<span className="text-brand-700">Calc</span>
      </span>
    </Link>
  );
}
