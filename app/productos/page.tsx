import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import PillarSection from "@/components/seo/PillarSection";
import ContactCta from "@/components/sections/ContactCta";
import { pageMetadata } from "@/lib/seo";
import { products, productCategories } from "@/lib/data/products";
import { productPhoto } from "@/lib/productPhoto";

export const metadata: Metadata = pageMetadata({
  title: "Productos y maquinaria industrial",
  description:
    "Brilladoras, hidrolavadoras, fregadoras, barredoras, aspiradoras, extractoras, robots y destroncadoras. Equipos de limpieza profesional e industrial SOLUPOWER.",
  path: "/productos",
});

const visual: Record<string, string> = {
  blue: "from-brand-deep via-brand-blue to-brand-cyan",
  teal: "from-brand-teal via-brand-teal to-brand-green",
  cyan: "from-brand-blue via-brand-cyan to-brand-teal",
  green: "from-brand-green via-brand-teal to-brand-cyan",
};

export default function ProductosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Productos"
        title="Maquinaria para cada superficie"
        description="Selecciona por categoría y solicita tu cotización. Equipos pensados para durar y rendir en los entornos más exigentes."
        crumbs={[{ name: "Productos", path: "/productos" }]}
      />

      <section className="py-8" aria-label="Categorías">
        <div className="container-x flex flex-wrap gap-2">
          {productCategories
            .filter((cat) => products.some((p) => p.category === cat))
            .map((cat) => (
              <a
                key={cat}
                href={`#${cat.toLowerCase()}`}
                className="rounded-full border border-white/50 bg-white/40 px-4 py-2 text-sm text-ink-soft backdrop-blur-md transition-colors hover:border-brand-blue/40 hover:text-brand-blue"
              >
                {cat}
              </a>
            ))}
        </div>
      </section>

      {productCategories
        .map((cat) => ({ cat, items: products.filter((p) => p.category === cat) }))
        .filter((group) => group.items.length > 0)
        .map(({ cat, items }) => (
          <section
            key={cat}
            id={cat.toLowerCase()}
            className="scroll-mt-28 py-10"
            aria-label={cat}
          >
            <div className="container-x">
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{cat}</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product, i) => {
                  const photo = productPhoto(product.slug);
                  return (
                  <Reveal key={product.slug} delay={(i % 3) * 0.08}>
                    <GlassCard as="article" className="group h-full">
                      <Link href={`/productos/${product.slug}`} className="block">
                        <div className="relative m-2 h-44 overflow-hidden rounded-3xl">
                          {photo ? (
                            <>
                              <div className="absolute inset-0 bg-white" />
                              <Image
                                src={photo}
                                alt={`${product.name} — SOLUPOWER`}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                              />
                            </>
                          ) : (
                            <>
                              <div className={`absolute inset-0 bg-gradient-to-br ${visual[product.accent]}`} />
                              <div className="grain absolute inset-0 opacity-40" />
                            </>
                          )}
                          <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-ink backdrop-blur-md">
                            {product.category}
                          </span>
                          <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-brand-blue backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
                            <ArrowUpRight size={18} />
                          </span>
                        </div>
                      </Link>
                      <div className="p-6 pt-3">
                        <h3 className="font-display text-lg font-semibold text-ink">{product.name}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{product.excerpt}</p>
                        <div className="mt-5">
                          <Button href={`/cotizacion?producto=${product.slug}`} variant="ghost" className="w-full py-2.5 text-[13px]">
                            Cotizar
                          </Button>
                        </div>
                      </div>
                    </GlassCard>
                  </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

      <PillarSection variant="productos" />

      <ContactCta />
    </>
  );
}
