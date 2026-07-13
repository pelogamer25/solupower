import type { Metadata } from "next";
import { Check } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import QuoteForm from "@/components/sections/QuoteForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Solicitar cotización",
  description:
    "Solicita una cotización sin compromiso para venta, alquiler o mantenimiento de equipos de limpieza industrial. Respuesta rápida y personalizada de SOLUPOWER.",
  path: "/cotizacion",
});

const benefits = [
  "Respuesta ágil y personalizada",
  "Asesoría técnica sin compromiso",
  "Propuesta clara, sin costos ocultos",
  "Opciones de venta y alquiler",
];

export default async function CotizacionPage(props: {
  searchParams: Promise<{ producto?: string }>;
}) {
  const { producto } = await props.searchParams;

  return (
    <>
      <PageHeader
        eyebrow="Cotización"
        title="Solicita tu cotización"
        description="Cuéntanos qué necesitas y diseñamos la solución exacta para tu empresa. Sin compromiso."
        crumbs={[{ name: "Cotización", path: "/cotizacion" }]}
      />

      <section className="py-12" aria-label="Formulario de cotización">
        <div className="container-x grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <GlassCard className="h-full p-8">
              <h2 className="font-display text-xl font-semibold text-ink">¿Por qué cotizar con nosotros?</h2>
              <ul className="mt-6 space-y-4">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-ink-soft">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-teal/15 text-brand-teal">
                      <Check size={14} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <QuoteForm defaultProduct={producto} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
