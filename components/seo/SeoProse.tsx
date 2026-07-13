import Link from "next/link";
import type { SeoSection } from "@/lib/data/seoContent";
import { internalLink } from "@/lib/data/relations";
import Reveal from "@/components/ui/Reveal";

/**
 * Renders SEO body content: one H1 lives in the page header, this provides the
 * H2 → H3 hierarchy. Each H3 paragraph can end with a keyword-anchored internal
 * link (contextual interlinking inside the content).
 */
export default function SeoProse({ sections }: { sections: SeoSection[] }) {
  if (!sections.length) return null;

  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <Reveal key={section.h2}>
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              {section.h2}
            </h2>
            {section.intro && (
              <p className="mt-4 text-base leading-relaxed text-ink-soft">{section.intro}</p>
            )}
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              {section.blocks.map((block) => {
                const link = block.link ? internalLink(block.link) : null;
                return (
                  <div key={block.h3} className="glass-soft rounded-3xl p-6">
                    <h3 className="font-display text-lg font-medium text-ink">{block.h3}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {block.body}
                      {link && (
                        <>
                          {" "}
                          <Link
                            href={link.href}
                            className="font-medium text-brand-blue underline decoration-brand-cyan/40 underline-offset-4 transition-colors hover:text-brand-deep"
                          >
                            {link.anchor}
                          </Link>
                          .
                        </>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </Reveal>
      ))}
    </div>
  );
}
