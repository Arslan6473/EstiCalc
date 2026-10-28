import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

export function PageHeader({
  title,
  intro,
  crumbs,
  children,
}: {
  title: string;
  intro?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-slate-200 bg-gradient-to-b from-brand-50/70 to-white">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-5 max-w-4xl font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {intro && <div className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">{intro}</div>}
        {children}
      </div>
    </div>
  );
}
