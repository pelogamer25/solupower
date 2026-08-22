import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import PillarSection from "@/components/seo/PillarSection";
import ContactCta from "@/components/sections/ContactCta";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/data/services";
import { serviceImage } from "@/lib/serviceImage";

export const metadata: Metadata = pageMetadata({
  title: "Servicios de limpieza y mantenimiento industrial",
  description:
    "Alquiler de equipos, servicio técnico especializado y mantenimiento y limpieza de superficies. Soluciones integrales de limpieza y mantenimiento industrial de SOLUPOWER.",
  path: "/servicios",
});

const accentIcon: Record<string, string> = {
  blue: "from-brand-deep to-brand-blue",
  teal: "from-brand-teal to-brand-green",
  cyan: "from-brand-blue to-brand-cyan",
  green: "from-brand-green to-brand-teal",
};

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Servicios"
        title="Soluciones integrales para tu operación"
        description="Cuatro líneas de servicio diseñadas para cubrir todo el ciclo de vida de tus equipos y superficies industriales."
        crumbs={[{ name: "Servicios", path: "/servicios" }]}
      />

      <section className="py-12" aria-label="Lista de servicios">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const photo = serviceImage(service.slug);
            return (
            <Reveal key={service.slug} delay={(i % 3) * 0.08}>
              <GlassCard as="article" pastel className="group h-full">
                <Link href={`/servicios/${service.slug}`} className="flex h-full flex-col">
                  <div className="relative m-2 h-44 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-deep to-brand-blue">
                    {photo && (
                      <Image
                        src={photo}
                        alt={`${service.title} — trabajo real de SOLUPOWER`}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
                    <span className={`absolute bottom-3 left-3 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${accentIcon[service.accent]} text-white shadow-glow`}>
                      <service.icon size={20} />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 pt-3">
                    <h2 className="font-display text-xl font-semibold text-ink">{service.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.excerpt}</p>
                    <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-brand-blue">
                      Conocer más
                      <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </GlassCard>
            </Reveal>
            );
          })}
        </div>
      </section>

      <PillarSection variant="servicios" />

      <ContactCta />
    </>
  );
}
