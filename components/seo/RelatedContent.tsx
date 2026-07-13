import Link from "next/link";
import { ArrowUpRight, Wrench, Package, FileText, Trophy } from "lucide-react";
import { getRelated, pillars, type RelatedItem } from "@/lib/data/relations";
import Reveal from "@/components/ui/Reveal";

interface RelatedContentProps {
  slug: string;
  /** Emphasize the cluster pillar the current page belongs to. */
  pillar?: keyof typeof pillars;
  title?: string;
}

const groups = [
  { key: "servicios", label: "Servicios relacionados", icon: Wrench },
  { key: "productos", label: "Productos relacionados", icon: Package },
  { key: "articulos", label: "Artículos relacionados", icon: FileText },
  { key: "casos", label: "Casos de éxito relacionados", icon: Trophy },
] as const;

/**
 * "También te puede interesar" — auto-built from the semantic graph so every page
 * links out to related services, products, articles and cases with keyword anchors.
 */
export default function RelatedContent({
  slug,
  pillar,
  title = "También te puede interesar",
}: RelatedContentProps) {
  const related = getRelated(slug);
  if (!related.all.length) return null;

  return (
    <section className="py-16" aria-label="Contenido relacionado">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
          {pillar && (
            <Link
              href={pillars[pillar].href}
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue"
            >
              Ver todos los {pillars[pillar].anchor}
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {groups.map((group) => {
            const items = related[group.key] as RelatedItem[];
            if (!items.length) return null;
            return (
              <Reveal key={group.key}>
                <div className="glass rounded-4xl p-7">
                  <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-faint">
                    <group.icon size={16} className="text-brand-blue" />
                    {group.label}
                  </div>
                  <ul className="mt-4 divide-y divide-white/40">
                    {items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={item.href}
                          className="group flex items-center justify-between gap-3 py-3 text-ink transition-colors hover:text-brand-blue"
                        >
                          <span className="text-sm font-medium">{item.title}</span>
                          <ArrowUpRight
                            size={15}
                            className="shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-blue"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
