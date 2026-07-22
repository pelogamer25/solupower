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
        slug={related.servicios[0]?.slug ?? "mantenimiento-industrial"}
        tail=" y diseñamos una solución a tu medida."
        cta={{ href: "/cotizacion", label: "Solicitar cotización" }}
      />

      <RelatedContent slug={study.slug} title="Sigue explorando" />

      <ContactCta />
    </>
  );
}
