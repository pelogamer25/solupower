import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import SeoProse from "@/components/seo/SeoProse";
import ContextualCta from "@/components/seo/ContextualCta";
import RelatedContent from "@/components/seo/RelatedContent";
import ContactCta from "@/components/sections/ContactCta";
import { pageMetadata, serviceJsonLd, jsonLdScript } from "@/lib/seo";
import { services, getService } from "@/lib/data/services";
import { getServiceSeo } from "@/lib/data/seoContent";
import { getRelated } from "@/lib/data/relations";
import { serviceImage } from "@/lib/serviceImage";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: service.description,
    path: `/servicios/${service.slug}`,
    keywords: [service.title.toLowerCase(), "limpieza industrial", "mantenimiento industrial"],
  });
}

export default async function ServicioDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const seo = getServiceSeo(service.slug);
  const related = getRelated(service.slug);
  const ctaProduct = related.productos[0]?.slug ?? "hidrolavadora-industrial-1900-psi";
  const photo = serviceImage(service.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(serviceJsonLd(service))}
      />

      <PageHeader
        eyebrow="Servicio"
        title={service.title}
        description={service.description}
        crumbs={[
          { name: "Servicios", path: "/servicios" },
          { name: service.title, path: `/servicios/${service.slug}` },
        ]}
      >
        <Button href="/cotizacion" variant="primary" icon={<ArrowRight size={17} />}>
          Solicitar cotización
        </Button>
      </PageHeader>

      {/* Real work photo of this service */}
      {photo && (
        <section className="pb-4 pt-2" aria-label="Trabajo real">
          <div className="container-x">
            <Reveal>
              <div className="glass relative aspect-[16/8] w-full overflow-hidden rounded-5xl p-2 sm:aspect-[16/6]">
                <div className="relative h-full w-full overflow-hidden rounded-[1.7rem]">
                  <Image
                    src={photo}
                    alt={`${service.title} — trabajo real de SOLUPOWER`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 1100px"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="py-12" aria-label="Detalles del servicio">
        <div className="container-x grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <GlassCard className="p-8">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[linear-gradient(135deg,#1E5FBF,#35B6D8)] text-white shadow-glow">
                <service.icon size={28} />
              </span>
              <h2 className="mt-6 font-display text-2xl font-semibold text-ink">¿Qué incluye?</h2>
              <ul className="mt-6 space-y-3">
                {service.features.map((f) => (
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
              <h2 className="font-display text-lg font-semibold text-ink">¿Por qué SOLUPOWER?</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Combinamos equipos de última generación, técnicos certificados y un
                acompañamiento cercano. Cada intervención sigue un método claro para
                garantizar resultados consistentes y medibles.
              </p>
              <div className="mt-6">
                <Button href="/contacto" variant="ghost" className="w-full">
                  Hablar con un asesor
                </Button>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* SEO body: H2 / H3 with contextual internal links */}
      {seo.length > 0 && (
        <section className="py-8" aria-label="Información detallada">
          <div className="container-x">
            <SeoProse sections={seo} />
          </div>
        </section>
      )}

      {/* Contextual CTA with keyword anchor */}
      <ContextualCta
        lead={`¿Buscas ${service.title.toLowerCase()}? También ofrecemos`}
        slug={ctaProduct}
        tail=" y equipos de alto rendimiento para complementar tu operación."
        cta={{ href: "/cotizacion", label: "Solicitar cotización" }}
      />

      {/* "También te puede interesar" */}
      <RelatedContent slug={service.slug} pillar="servicios" />

      <ContactCta />
    </>
  );
}
