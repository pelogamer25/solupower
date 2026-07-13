import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import { internalLink, pillars } from "@/lib/data/relations";
import { posts, caseStudies } from "@/lib/data/content";

interface PillarSectionProps {
  variant: "productos" | "servicios";
}

function InlineLink({ slug }: { slug: string }) {
  const link = internalLink(slug);
  return (
    <Link
      href={link.href}
      className="font-medium text-brand-blue underline decoration-brand-cyan/40 underline-offset-4 transition-colors hover:text-brand-deep"
    >
      {link.anchor}
    </Link>
  );
}

/**
 * Cluster/pillar context block: explains how the pillar connects to the rest of
 * the ecosystem and links to satellites in the opposite cluster + resources.
 */
export default function PillarSection({ variant }: PillarSectionProps) {
  const isProducts = variant === "productos";
  const crossLinks = isProducts
    ? ["servicio-tecnico", "alquiler", "mantenimiento-industrial"]
    : ["hidrolavadoras-industriales", "scrubbers", "brilladoras-industriales"];

  const relatedPosts = posts.slice(0, 3);
  const relatedCases = caseStudies.slice(0, 3);

  return (
    <section className="py-16" aria-label="Contexto del ecosistema">
      <div className="container-x">
        <Reveal>
          <div className="glass rounded-5xl p-8 sm:p-12">
            <h2 className="max-w-3xl font-display text-2xl font-semibold text-ink sm:text-3xl">
              {isProducts
                ? "Equipos que se integran con nuestros servicios"
                : "Servicios respaldados por la mejor maquinaria"}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-soft">
              {isProducts ? (
                <>
                  Nuestros {pillars.productos.anchor} no funcionan de forma aislada: cada equipo
                  se apoya en un ecosistema de servicios. Complementa tu compra con{" "}
                  <InlineLink slug={crossLinks[0]} />, evalúa el{" "}
                  <InlineLink slug={crossLinks[1]} /> antes de decidir y protege tu inversión con{" "}
                  <InlineLink slug={crossLinks[2]} />.
                </>
              ) : (
                <>
                  Detrás de cada uno de nuestros {pillars.servicios.anchor} hay equipos de alto
                  rendimiento. Trabajamos con{" "}
                  <InlineLink slug={crossLinks[0]} />, <InlineLink slug={crossLinks[1]} /> y{" "}
                  <InlineLink slug={crossLinks[2]} /> para garantizar resultados consistentes.
                </>
              )}
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full p-7">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Artículos del blog
              </h3>
              <ul className="mt-4 divide-y divide-white/40">
                {relatedPosts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex items-center justify-between gap-3 py-3 text-sm font-medium text-ink transition-colors hover:text-brand-blue"
                    >
                      {p.title}
                      <ArrowUpRight size={15} className="shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard className="h-full p-7">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Casos de éxito
              </h3>
              <ul className="mt-4 divide-y divide-white/40">
                {relatedCases.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/casos-de-exito/${c.slug}`}
                      className="group flex items-center justify-between gap-3 py-3 text-sm font-medium text-ink transition-colors hover:text-brand-blue"
                    >
                      {c.title}
                      <ArrowUpRight size={15} className="shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
