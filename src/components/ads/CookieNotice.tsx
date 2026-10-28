"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const KEY = "esticalc-cookie-notice";

const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function isDismissed() {
  try {
    return Boolean(localStorage.getItem(KEY));
  } catch {
    // Storage blocked: don't nag on every page.
    return true;
  }
}

export function CookieNotice() {
  // Server snapshot is "dismissed" so the notice only appears after hydration.
  const dismissed = useSyncExternalStore(subscribe, isDismissed, () => true);

  if (dismissed) return null;

  const close = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    listeners.forEach((l) => l());
  };

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="no-print fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:flex sm:items-center sm:gap-4"
    >
      <p className="text-sm text-slate-600">
        We use cookies to remember your preferences and, with advertising partners such as Google, to show and measure
        ads. See our{" "}
        <Link href="/cookie-policy" className="font-semibold text-brand-700 underline">
          cookie policy
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="font-semibold text-brand-700 underline">
          privacy policy
        </Link>
        .
      </p>
      <button
        type="button"
        onClick={close}
        className="mt-3 w-full shrink-0 rounded-full bg-brand-700 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-800 sm:mt-0 sm:w-auto"
      >
        Got it
      </button>
    </div>
  );
}
