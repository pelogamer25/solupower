import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import RelatedContent from "@/components/seo/RelatedContent";
import ContextualCta from "@/components/seo/ContextualCta";
import ContactCta from "@/components/sections/ContactCta";
import { pageMetadata } from "@/lib/seo";
import { caseStudies, getCaseStudy } from "@/lib/data/content";
import { getRelated } from "@/lib/data/relations";

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

  return (
    <>
      <PageHeader
        eyebrow={study.sector}
        title={study.title}
        description={study.summary}
        crumbs={[
          { name: "Casos de éxito", path: "/casos-de-exito" },
          { name: study.client, path: `/casos-de-exito/${study.slug}` },
        ]}
      />

      <section className="py-12" aria-label="Detalle del caso">
        <div className="container-x grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <GlassCard className="p-8">
              <h2 className="font-display text-2xl font-semibold text-ink">El reto</h2>
              <p className="mt-4 text-ink-soft">
                {study.client} necesitaba una solución confiable en el sector {study.sector.toLowerCase()},
                sin comprometer la continuidad de su operación. Diseñamos un plan a la
                medida siguiendo nuestro método de cuatro pasos.
              </p>
              <h2 className="mt-8 font-display text-2xl font-semibold text-ink">La solución</h2>
              <ul className="mt-4 space-y-3">
                {["Diagnóstico técnico en sitio", "Ejecución con estándares de seguridad", "Seguimiento y soporte continuo"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-ink-soft">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-teal/15 text-brand-teal">
                      <Check size={14} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="h-full p-8">
              <span className="text-xs uppercase tracking-wide text-ink-faint">Resultado</span>
              <div className="mt-3 font-display text-4xl font-semibold text-gradient">{study.metric}</div>
              <p className="mt-4 text-sm text-ink-soft">
                Un resultado medible que refleja nuestro compromiso con la excelencia.
              </p>
              <div className="mt-6 border-t border-white/40 pt-6">
                <span className="text-xs uppercase tracking-wide text-ink-faint">Cliente</span>
                <div className="mt-1 font-display text-lg font-medium text-ink">{study.client}</div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <ContextualCta
        lead={`¿Tu operación enfrenta un reto similar en el sector ${study.sector.toLowerCase()}? Empieza por nuestro`}
        slug={related.servicios[0]?.slug ?? "mantenimiento-industrial"}
        tail=" y diseñamos una solución a tu medida."
        cta={{ href: "/cotizacion", label: "Solicitar cotización" }}
      />

      <RelatedContent slug={study.slug} title="Sigue explorando" />

      <ContactCta />
    </>
  );
}
