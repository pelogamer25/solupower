import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import { services } from "@/lib/data/services";
import { products } from "@/lib/data/products";
import { anchors, pillars } from "@/lib/data/relations";

/**
 * Home authority hub. Links out to every pillar and satellite page with keyword
 * anchors, so link equity flows from the Home to all key pages and Google can
 * reach any page within a couple of clicks.
 */
export default function ExploreMap() {
  const company = [
    { href: "/nosotros", label: "Sobre nosotros" },
    { href: "/casos-de-exito", label: "Casos de éxito" },
    { href: "/clientes", label: "Nuestros clientes" },
    { href: "/blog", label: "Blog de limpieza industrial" },
    { href: "/galeria", label: "Galería de proyectos" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <section id="explorar" className="relative py-24 sm:py-32" aria-label="Explora SOLUPOWER">
      <div className="container-x">
        <SectionHeading
          eyebrow="Explora"
          title="Todo el ecosistema SOLUPOWER"
          description="Recorre nuestras soluciones, equipos y recursos. Cada sección está conectada para que encuentres exactamente lo que tu operación necesita."
          align="center"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* Pillar: Servicios */}
          <Reveal>
            <GlassCard className="h-full p-7">
              <Link href={pillars.servicios.href} className="group flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {pillars.servicios.title}
                </h3>
                <ArrowUpRight size={16} className="text-brand-blue transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <ul className="mt-4 space-y-2.5">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/servicios/${s.slug}`}
                      className="text-sm text-ink-soft transition-colors hover:text-brand-blue"
                    >
                      {anchors[s.slug] ?? s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          {/* Pillar: Productos */}
          <Reveal delay={0.08}>
            <GlassCard className="h-full p-7">
              <Link href={pillars.productos.href} className="group flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {pillars.productos.title}
                </h3>
                <ArrowUpRight size={16} className="text-brand-blue transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <ul className="mt-4 space-y-2.5">
                {products.slice(0, 6).map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/productos/${p.slug}`}
                      className="text-sm text-ink-soft transition-colors hover:text-brand-blue"
                    >
                      {anchors[p.slug] ?? p.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/productos"
                    className="text-sm font-medium text-brand-blue transition-colors hover:text-brand-deep"
                  >
                    Ver catálogo completo
                  </Link>
                </li>
              </ul>
            </GlassCard>
          </Reveal>

          {/* Empresa & recursos */}
          <Reveal delay={0.16}>
            <GlassCard className="h-full p-7">
              <h3 className="font-display text-lg font-semibold text-ink">Empresa y recursos</h3>
              <ul className="mt-4 space-y-2.5">
                {company.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      className="text-sm text-ink-soft transition-colors hover:text-brand-blue"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/cotizacion"
                    className="text-sm font-medium text-brand-blue transition-colors hover:text-brand-deep"
                  >
                    Solicitar cotización
                  </Link>
                </li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
