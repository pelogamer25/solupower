import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import { stats, values } from "@/lib/data/content";
import { teamPhoto } from "@/lib/teamPhoto";

export default function About() {
  const team = teamPhoto();

  return (
    <section id="nosotros" className="relative py-28 sm:py-36" aria-label="Sobre nosotros">
      <div className="container-x">
        <SectionHeading
          eyebrow="Sobre nosotros"
          title="Soluciones Industriales Inteligentes"
          description="SOLUPOWER es una empresa colombiana especializada en brindar soluciones integrales para la limpieza y el mantenimiento industrial, desde el suministro de equipos hasta el mantenimiento de superficies. Más que un proveedor, somos un aliado estratégico de nuestros clientes."
        />

        {/* Team photo — framed at its own aspect ratio, so nobody gets cropped out */}
        {team && (
          <Reveal delay={0.1}>
            <figure className={`mx-auto mt-14 ${team.width >= team.height ? "max-w-2xl" : "max-w-sm"}`}>
              <div className="glass overflow-hidden rounded-5xl p-2">
                <div
                  className="relative w-full overflow-hidden rounded-[1.7rem]"
                  style={{ aspectRatio: `${team.width} / ${team.height}` }}
                >
                  <Image
                    src={team.src}
                    alt="Equipo de trabajo de SOLUPOWER — Soluciones Industriales RM S.A.S."
                    fill
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
        )}

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

        <div className="mt-10">
          <Link
            href="/nosotros"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue"
          >
            Conoce la empresa de limpieza industrial detrás de SOLUPOWER
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
