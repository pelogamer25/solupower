import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import RelatedContent from "@/components/seo/RelatedContent";
import ContextualCta from "@/components/seo/ContextualCta";
import ContactCta from "@/components/sections/ContactCta";
import { pageMetadata } from "@/lib/seo";
import { caseStudies, getCaseStudy } from "@/lib/data/content";
import { getRelated } from "@/lib/data/relations";
import { workPhotos } from "@/lib/workPhotos";
import { caseComparisons } from "@/lib/caseBeforeAfter";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return pageMetadata({
    title: study.title,
    description: study.summary,
    path: `/casos-de-exito/${study.slug}`,
  });
}

export default async function CasoDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const related = getRelated(study.slug);
  const photos = workPhotos().slice(0, 6);
  const comparisons = caseComparisons(study.slug);

  return (
    <>
      <PageHeader
        eyebrow={study.sector}
        title={study.title}
        description={study.summary}
        crumbs={[
          { name: "Casos de éxito", path: "/casos-de-exito" },
          { name: study.title, path: `/casos-de-exito/${study.slug}` },
        ]}
      />

      <section className="py-12" aria-label="Detalle del trabajo">
        <div className="container-x grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <GlassCard className="p-8">
              <h2 className="font-display text-2xl font-semibold text-ink">El trabajo</h2>
              <p className="mt-4 text-ink-soft">{study.summary}</p>
              {study.details && study.details.length > 0 && (
                <>
                  <h2 className="mt-8 font-display text-2xl font-semibold text-ink">Qué incluye</h2>
                  <ul className="mt-4 space-y-3">
                    {study.details.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-ink-soft">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-teal/15 text-brand-teal">
                          <Check size={14} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="h-full p-8">
              <span className="text-xs uppercase tracking-wide text-ink-faint">Resultado</span>
              <div className="mt-3 font-display text-4xl font-semibold text-gradient">{study.metric}</div>
              <p className="mt-4 text-sm text-ink-soft">
                Trabajo realizado con equipos industriales especializados de SOLUPOWER.
              </p>
              <div className="mt-6 border-t border-white/40 pt-6">
                <span className="text-xs uppercase tracking-wide text-ink-faint">Línea de servicio</span>
                <div className="mt-1 font-display text-lg font-medium text-ink">{study.sector}</div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* Before / after comparisons */}
      {comparisons.length > 0 && (
        <section className="py-8" aria-label="Antes y después">
          <div className="container-x">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-ink">Antes y después</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
                La misma superficie, fotografiada antes de intervenirla y una vez terminado el
                proceso.
              </p>
            </Reveal>

            <div className="mt-7 space-y-6">
              {comparisons.map((c, i) => (
                <Reveal key={c.key} delay={i * 0.08}>
                  <article className="glass overflow-hidden rounded-5xl p-5 sm:p-7">
                    <h3 className="font-display text-lg font-semibold text-ink">{c.title}</h3>
                    <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-ink-soft">
                      {c.description}
                    </p>

                    {/* One column per side. Stacks on mobile, side by side from sm up. */}
                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      {[
                        { photos: c.antes, label: "Antes", after: false },
                        { photos: c.despues, label: "Después", after: true },
                      ].map((side) => (
                        <div key={side.label}>
                          {/* The side is named in text, so it never depends on colour alone */}
                          <span
                            className={
                              side.after
                                ? "inline-flex rounded-full bg-[linear-gradient(135deg,#1E5FBF,#35B6D8)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-glow"
                                : "inline-flex rounded-full bg-ink/75 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white"
                            }
                          >
                            {side.label}
                          </span>
                          <div className="mt-3 grid gap-4">
                            {side.photos.map((src, n) => (
                              <figure
                                key={src}
                                /* Fixed ratio reserves the space, so nothing jumps while loading */
                                className="relative w-full overflow-hidden rounded-4xl bg-white ring-1 ring-white/60"
                                style={{ aspectRatio: c.ratio }}
                              >
                                <Image
                                  src={src}
                                  alt={
                                    side.photos.length > 1
                                      ? `${c.title} — ${side.label.toLowerCase()} (${n + 1} de ${side.photos.length}), trabajo de SOLUPOWER`
                                      : `${c.title} — ${side.label.toLowerCase()} del trabajo de SOLUPOWER`
                                  }
                                  fill
                                  loading="lazy"
                                  sizes="(max-width: 640px) 92vw, 46vw"
                                  className="object-cover"
                                />
                              </figure>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Real work photos (from /public/trabajos) */}
      {photos.length > 0 && (
        <section className="py-8" aria-label="Trabajo real en imágenes">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold text-ink">Trabajo real</h2>
              <Link
                href="/galeria"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue"
              >
                Ver toda la galería
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {photos.map((src) => (
                <div key={src} className="glass relative aspect-[4/3] overflow-hidden rounded-4xl p-1.5">
                  <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                    <Image
                      src={src}
                      alt={`${study.title} — trabajo real de SOLUPOWER`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContextualCta
        lead="¿Tu operación necesita un trabajo como este? Empieza por nuestro servicio de"
        slug={related.servicios[0]?.slug ?? "servicio-tecnico"}
        tail=" y diseñamos una solución a tu medida."
        cta={{ href: "/cotizacion", label: "Solicitar cotización" }}
      />

      <RelatedContent slug={study.slug} title="Sigue explorando" />

      <ContactCta />
    </>
  );
}
