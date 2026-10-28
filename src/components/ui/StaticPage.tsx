import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import { formatDate } from "@/lib/blog";

export function StaticPage({
  title,
  intro,
  path,
  updated,
  children,
}: {
  title: string;
  intro?: ReactNode;
  path: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader title={title} intro={intro} crumbs={[{ name: title, href: path }]} />
      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        {updated && (
          <p className="mb-8 text-sm text-slate-500">
            Last updated: <time dateTime={updated}>{formatDate(updated)}</time>
          </p>
        )}
        <div className="prose-content">{children}</div>
      </div>
    </>
  );
}
