import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import ContactCta from "@/components/sections/ContactCta";
import { pageMetadata } from "@/lib/seo";
import { caseStudies } from "@/lib/data/content";

export const metadata: Metadata = pageMetadata({
  title: "Casos de éxito",
  description:
    "Proyectos reales de limpieza, restauración y mantenimiento industrial ejecutados por SOLUPOWER, con resultados medibles para nuestros clientes.",
  path: "/casos-de-exito",
});

export default function CasosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Casos de éxito"
        title="Resultados que hablan por nosotros"
        description="Una selección de proyectos donde nuestra ingeniería marcó la diferencia."
        crumbs={[{ name: "Casos de éxito", path: "/casos-de-exito" }]}
      />

      <section className="py-12" aria-label="Lista de casos">
        <div className="container-x grid gap-5 lg:grid-cols-3">
          {caseStudies.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.08}>
              <GlassCard as="article" className="group h-full">
                <Link href={`/casos-de-exito/${c.slug}`} className="flex h-full flex-col p-7">
                  <span className="text-xs uppercase tracking-wide text-brand-blue">{c.sector}</span>
                  <h2 className="mt-3 font-display text-lg font-semibold text-ink">{c.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.summary}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-white/40 pt-5">
                    <span className="font-display text-lg font-semibold text-gradient">{c.metric}</span>
                    <ArrowUpRight size={16} className="text-brand-blue transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCta />
    </>
  );
}
