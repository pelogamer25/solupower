import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import PillarSection from "@/components/seo/PillarSection";
import ContactCta from "@/components/sections/ContactCta";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/data/services";

export const metadata: Metadata = pageMetadata({
  title: "Servicios de limpieza y mantenimiento industrial",
  description:
    "Venta y alquiler de maquinaria, servicio técnico, mantenimiento industrial, restauración de pisos, pintura epóxica y más. Soluciones integrales de SOLUPOWER.",
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
        description="Ocho líneas de servicio diseñadas para cubrir todo el ciclo de vida de tus equipos y superficies industriales."
        crumbs={[{ name: "Servicios", path: "/servicios" }]}
      />

      <section className="py-12" aria-label="Lista de servicios">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 0.08}>
              <GlassCard as="article" className="group h-full">
                <Link href={`/servicios/${service.slug}`} className="flex h-full flex-col p-7">
                  <span className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${accentIcon[service.accent]} text-white shadow-glow`}>
                    <service.icon size={24} />
                  </span>
                  <h2 className="mt-6 font-display text-xl font-semibold text-ink">{service.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.excerpt}</p>
                  <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-brand-blue">
                    Conocer más
                    <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <PillarSection variant="servicios" />

      <ContactCta />
    </>
  );
}
