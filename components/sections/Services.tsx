import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import { services } from "@/lib/data/services";

const accentBg: Record<string, string> = {
  blue: "from-brand-blue/22 to-brand-cyan/8",
  teal: "from-brand-teal/22 to-brand-green/8",
  cyan: "from-brand-cyan/22 to-brand-blue/8",
  green: "from-brand-green/22 to-brand-teal/8",
};

const accentIcon: Record<string, string> = {
  blue: "from-brand-deep to-brand-blue",
  teal: "from-brand-teal to-brand-green",
  cyan: "from-brand-blue to-brand-cyan",
  green: "from-brand-green to-brand-teal",
};

export default function Services() {
  return (
    <section id="servicios" className="relative py-28 sm:py-36" aria-label="Servicios">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Servicios"
            title="Todo lo que tu operación necesita, en un solo lugar"
            description="Desde la venta y el alquiler de maquinaria hasta el servicio técnico y la restauración de pisos. Soluciones integrales con estándares de ingeniería."
          />
          <Reveal delay={0.1}>
            <Link
              href="/servicios"
              className="group inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-5 py-3 text-sm font-medium text-ink backdrop-blur-md transition-colors hover:bg-white/60"
            >
              Ver todos los servicios
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 0.08}>
              <GlassCard as="article" className="group h-full">
                <Link href={`/servicios/${service.slug}`} className="flex h-full flex-col p-7">
                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${accentBg[service.accent]} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                  />
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${accentIcon[service.accent]} text-white shadow-glow`}
                  >
                    <service.icon size={24} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-ink">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.excerpt}</p>

                  <ul className="mt-5 space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-ink-soft">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-brand-blue">
                    Conocer más
                    <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
