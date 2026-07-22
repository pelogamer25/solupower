import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import { stats, values } from "@/lib/data/content";

export default function About() {
  return (
    <section id="nosotros" className="relative py-28 sm:py-36" aria-label="Sobre nosotros">
      <div className="container-x">
        <SectionHeading
          eyebrow="Sobre nosotros"
          title="Soluciones Industriales Inteligentes"
          description="SOLUPOWER es una empresa colombiana especializada en soluciones integrales para la limpieza y el mantenimiento industrial. Optimizamos la operación de nuestros clientes con equipos, maquinaria, insumos y servicios especializados que incrementan la productividad, reducen costos operativos y garantizan ambientes seguros y eficientes."
        />

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <GlassCard className="p-7">
                <div className="font-display text-4xl font-semibold text-gradient sm:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-ink-soft">{stat.label}</div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* Values */}
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.08}>
              <GlassCard className="h-full p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,#1E5FBF,#35B6D8)] text-white">
                  <value.icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{value.description}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
