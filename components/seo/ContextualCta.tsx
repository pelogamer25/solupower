import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { internalLink } from "@/lib/data/relations";

interface ContextualCtaProps {
  /** Sentence lead, before the keyword-anchored inline link. */
  lead: string;
  /** Target slug — rendered as a keyword-rich inline link inside the sentence. */
  slug: string;
  /** Sentence tail, after the link (optional). */
  tail?: string;
  /** Optional button. */
  cta?: { href: string; label: string };
}

/**
 * A contextual CTA placed after important blocks. The message carries a natural,
 * keyword-anchored internal link (never "clic aquí") to distribute authority.
 */
export default function ContextualCta({ lead, slug, tail = ".", cta }: ContextualCtaProps) {
  const link = internalLink(slug);
  return (
    <aside className="container-x py-8" aria-label="Recomendación relacionada">
      <div className="glass flex flex-col items-start justify-between gap-5 rounded-4xl p-7 sm:flex-row sm:items-center">
        <p className="max-w-2xl text-base leading-relaxed text-ink">
          {lead}{" "}
          <Link
            href={link.href}
            className="font-semibold text-brand-blue underline decoration-brand-cyan/40 underline-offset-4 transition-colors hover:text-brand-deep"
          >
            {link.anchor}
          </Link>
          {tail}
        </p>
        {cta && (
          <Link
            href={cta.href}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[linear-gradient(100deg,#0A3D91,#1E5FBF_45%,#35B6D8)] px-6 py-3 text-sm font-medium text-white shadow-glow transition hover:brightness-110"
          >
            {cta.label}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </aside>
  );
}
