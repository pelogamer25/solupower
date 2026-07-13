import Breadcrumbs, { type Crumb } from "@/components/layout/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import TextReveal from "@/components/ui/TextReveal";
import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
}

/** Consistent inner-page hero. Sits on the shared ambient canvas, no hard break. */
export default function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: PageHeaderProps) {
  return (
    <header className="relative pb-8 pt-36 sm:pt-40">
      <div className="container-x">
        <Breadcrumbs items={crumbs} />
        {eyebrow && (
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-brand-blue backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
              {eyebrow}
            </span>
          </Reveal>
        )}
        <TextReveal
          as="h1"
          text={title}
          className="mt-5 max-w-4xl font-display text-hero font-semibold text-ink"
        />
        {description && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{description}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.2}>
            <div className="mt-8">{children}</div>
          </Reveal>
        )}
      </div>
    </header>
  );
}
