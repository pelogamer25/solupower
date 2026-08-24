import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, ArrowRight, Wrench } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import SeoProse from "@/components/seo/SeoProse";
import ContextualCta from "@/components/seo/ContextualCta";
import RelatedContent from "@/components/seo/RelatedContent";
import ContactCta from "@/components/sections/ContactCta";
import RentalCarousel from "@/components/sections/RentalCarousel";
import { pageMetadata, serviceJsonLd, jsonLdScript } from "@/lib/seo";
import { services, getService } from "@/lib/data/services";
import { getServiceSeo } from "@/lib/data/seoContent";
import { getRelated } from "@/lib/data/relations";
import { serviceImage } from "@/lib/serviceImage";
import { serviceExtraPhotos } from "@/lib/serviceExtraPhotos";
import { rentalEquipmentWithPhotos } from "@/lib/rentalPhoto";
import { floorFinishes } from "@/lib/floorFinishes";
import { carpetCleaningGroups } from "@/lib/carpetCleaning";

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
  const extraPhotos = serviceExtraPhotos(service.slug);
  const finishes = service.slug === "restauracion-de-pisos" ? floorFinishes() : [];
  const carpetGroups =
    service.slug === "lavado-de-alfombras-y-mobiliario" ? carpetCleaningGroups() : [];

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

      {/* Carpet & upholstery work, grouped by stage of the process */}
      {carpetGroups.length > 0 && (
        <section className="py-10" aria-label="Nuestro proceso de lavado">
          <div className="container-x">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-ink">Nuestro proceso</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
                Del lavado con equipo industrial a la recuperación de sillas y mobiliario.
              </p>
            </Reveal>

            <div className="mt-8 space-y-10">
              {carpetGroups.map((group, gi) => (
                <div key={group.key}>
                  <Reveal delay={gi * 0.05}>
                    <h3 className="font-display text-lg font-semibold text-ink">{group.title}</h3>
                    <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-soft">
                      {group.description}
                    </p>
                  </Reveal>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.photos.map((src, i) => (
                      <Reveal key={src} delay={(i % 3) * 0.06}>
                        <div className="glass overflow-hidden rounded-4xl p-2">
                          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.6rem] bg-white">
                            <Image
                              src={src}
                              alt={`${group.title} — trabajo real de SOLUPOWER`}
                              fill
                              loading="lazy"
                              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 33vw"
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Floor processes and finishes we deliver, each with a real photo */}
      {finishes.length > 0 && (
        <section className="py-10" aria-label="Procesos y acabados de piso">
          <div className="container-x">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-ink">
                Nuestros procesos y acabados
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
                Elegimos el tratamiento según el material, el estado y el nivel de tráfico
                de cada superficie.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {finishes.map((finish, i) => (
                <Reveal key={finish.key} delay={(i % 3) * 0.08}>
                  <figure className="glass h-full overflow-hidden rounded-4xl p-2">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.6rem] bg-white">
                      <Image
                        src={finish.src}
                        alt={`${finish.title} de pisos — trabajo real de SOLUPOWER`}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="p-5">
                      <h3 className="font-display text-lg font-semibold text-ink">
                        {finish.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {finish.description}
                      </p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Multi-brand claim + workshop photos (servicio técnico) */}
      {service.slug === "servicio-tecnico" && (
        <section className="py-10" aria-label="Somos multimarcas">
          <div className="container-x">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#1E5FBF,#35B6D8)] px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-glow">
                  <Wrench size={16} />
                  Somos multimarcas
                </span>
                <p className="mt-5 text-base leading-relaxed text-ink-soft">
                  Reparamos y mantenemos equipos de limpieza industrial de{" "}
                  <strong className="font-semibold text-ink">cualquier marca</strong>, con mano de
                  obra calificada y stock de repuestos y consumibles.
                </p>
              </div>
            </Reveal>

            {extraPhotos.length > 0 && (
              <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
                {extraPhotos.map((p, i) => (
                  <Reveal key={p.src} delay={i * 0.08}>
                    <figure className="glass overflow-hidden rounded-4xl p-2">
                      <div className="relative aspect-square w-full overflow-hidden rounded-[1.6rem] bg-white">
                        <Image
                          src={p.src}
                          alt={p.alt}
                          fill
                          sizes="(max-width: 640px) 92vw, 380px"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="px-4 pb-3 pt-4 text-center text-sm font-medium text-ink">
                        {p.caption}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Equipment available for rent — auto-advancing showcase */}
      {service.slug === "alquiler" && (
        <section className="py-10" aria-label="Equipos disponibles en alquiler">
          <div className="container-x">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-ink">
                Equipos disponibles en alquiler
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
                Accede al equipo que necesitas por el tiempo que lo necesitas, con respaldo
                técnico incluido.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-7">
                <RentalCarousel items={rentalEquipmentWithPhotos()} />
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
