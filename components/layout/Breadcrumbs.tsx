import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export interface Crumb {
  name: string;
  path: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const full: Crumb[] = [{ name: "Inicio", path: "/" }, ...items];

  return (
    <nav aria-label="Ruta de navegación" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(full))}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-soft">
        {full.map((crumb, i) => {
          const last = i === full.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="transition-colors hover:text-ink">
                  {crumb.name}
                </Link>
              )}
              {!last && <ChevronRight size={14} className="text-ink-faint" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
