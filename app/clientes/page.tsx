import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import ContactCta from "@/components/sections/ContactCta";
import { pageMetadata } from "@/lib/seo";
import { clients } from "@/lib/data/content";

export const metadata: Metadata = pageMetadata({
  title: "Clientes en logística, retail e industria",
  description:
    "Empresas de logística, manufactura, retail e industria que confían en SOLUPOWER para sus soluciones de limpieza y mantenimiento industrial.",
  path: "/clientes",
});

export default function ClientesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Clientes"
        title="Marcas que confían en nosotros"
        description="Trabajamos con empresas exigentes de múltiples sectores. Su confianza es nuestro mejor respaldo."
        crumbs={[{ name: "Clientes", path: "/clientes" }]}
      />

      <section className="py-12" aria-label="Lista de clientes">
        <div className="container-x grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {clients.map((name, i) => (
            <Reveal key={name} delay={(i % 4) * 0.06}>
              <GlassCard className="flex min-h-28 h-full items-center justify-center p-6">
                <span className="text-center font-display text-lg font-semibold tracking-tight text-ink-soft">{name}</span>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCta />
    </>
  );
}
