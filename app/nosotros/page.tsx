import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import ContactCta from "@/components/sections/ContactCta";
import { pageMetadata } from "@/lib/seo";
import { stats, values } from "@/lib/data/content";
import { workPhotos } from "@/lib/workPhotos";
import { teamPhoto } from "@/lib/teamPhoto";

export const metadata: Metadata = pageMetadata({
  title: "Nosotros | Limpieza y mantenimiento industrial en Medellín y Bogotá",
  description:
    "Conoce a SOLUPOWER (Soluciones Industriales RM S.A.S.): empresa colombiana especializada en soluciones integrales para la limpieza y el mantenimiento industrial.",
  path: "/nosotros",
});

export default function NosotrosPage() {
  const photos = workPhotos();
  const team = teamPhoto();
  const strip = photos.slice(0, 6);

  return (
    <>
      <PageHeader
        eyebrow="Sobre nosotros"
        title="Soluciones Industriales Inteligentes"
        description="SOLUPOWER es una empresa colombiana especializada en brindar soluciones integrales para la limpieza y el mantenimiento industrial, desde el suministro de equipos hasta el mantenimiento de superficies. Más que un proveedor, somos un aliado estratégico de nuestros clientes."
        crumbs={[{ name: "Nosotros", path: "/nosotros" }]}
      />

      {/* Team photo — framed at its own aspect ratio, so nobody gets cropped out */}
      {team && (
        <section className="pb-6 pt-2" aria-label="Nuestro equipo">
          <div className="container-x">
            <Reveal>
              <figure className={`mx-auto ${team.width >= team.height ? "max-w-2xl" : "max-w-sm"}`}>
                <div className="glass overflow-hidden rounded-5xl p-2">
                  <div
                    className="relative w-full overflow-hidden rounded-[1.7rem]"
                    style={{ aspectRatio: `${team.width} / ${team.height}` }}
                  >
                    <Image
                      src={team.src}
                      alt="Equipo de SOLUPOWER — Soluciones Industriales RM S.A.S."
                      fill
                      priority
                      sizes="(max-width: 640px) 92vw, 672px"
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                    <figcaption className="absolute bottom-5 left-5 rounded-full bg-white/85 px-4 py-2 text-sm font-medium text-ink backdrop-blur-md">
                      Nuestro equipo
                    </figcaption>
                  </div>
                </div>
              </figure>
            </Reveal>
          </div>
        </section>
      )}

      <section className="py-16" aria-label="Historia">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          {[
            {
              t: "¿Quiénes somos?",
              d: "SOLUPOWER es una empresa colombiana especializada en soluciones integrales para la limpieza y el mantenimiento industrial, con cobertura en Medellín y Bogotá.",
            },
            {
              t: "Nuestro enfoque",
              d: "Optimizar la operación de nuestros clientes mediante el suministro de equipos, maquinaria, insumos y servicios especializados que incrementan la productividad, reducen costos operativos y garantizan ambientes seguros y eficientes.",
            },
            {
              t: "Un aliado estratégico",
              d: "Más que un proveedor, acompañamos a las organizaciones en la transformación de sus procesos de limpieza y mantenimiento, incorporando innovación, tecnología y prácticas sostenibles que generan resultados medibles.",
            },
          ].map((item, i) => (
            <Reveal key={item.t} delay={i * 0.08}>
              <GlassCard className="h-full p-8">
                <h2 className="font-display text-xl font-semibold text-ink">{item.t}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16" aria-label="Cifras">
        <div className="container-x grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <GlassCard className="p-7 text-center">
                <div className="font-display text-4xl font-semibold text-gradient sm:text-5xl">{s.value}</div>
                <div className="mt-2 text-sm text-ink-soft">{s.label}</div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16" aria-label="Valores">
        <div className="container-x">
          <SectionHeading eyebrow="Valores" title="Lo que nos define" align="center" />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <GlassCard className="h-full p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,#1E5FBF,#35B6D8)] text-white">
                    <v.icon size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.description}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Real work photos */}
      {strip.length > 0 && (
        <section className="py-12" aria-label="Nuestro trabajo">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Nuestro trabajo" title="Resultados que se ven" />
              <Link
                href="/galeria"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue"
              >
                Ver la galería completa
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {strip.map((photo, i) => (
                <Reveal key={photo.src} delay={(i % 3) * 0.06}>
                  <div className="glass relative aspect-[4/3] overflow-hidden rounded-4xl p-1.5">
                    <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCta />
    </>
  );
}
