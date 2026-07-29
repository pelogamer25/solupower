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
import { productCategoryMeta, productsInCategory } from "@/lib/data/products";
import { productPhoto } from "@/lib/productPhoto";

export const metadata: Metadata = pageMetadata({
  title: "Productos y maquinaria de limpieza industrial",
  description:
    "Explora nuestra maquinaria de limpieza industrial por tipo: brilladoras, hidrolavadoras, aspiradoras, scrubbers, barredoras, extractoras y robots. Equipos de alto rendimiento SOLUPOWER.",
  path: "/productos",
});

const accentIcon: Record<string, string> = {
  blue: "from-brand-deep to-brand-blue",
  teal: "from-brand-teal to-brand-green",
  cyan: "from-brand-blue to-brand-cyan",
  green: "from-brand-green to-brand-teal",
};

/** First real photo found among a category's products (for the card banner). */
function categoryPhoto(slug: string) {
  for (const p of productsInCategory(slug)) {
    const photo = productPhoto(p.slug);
    if (photo) return photo;
  }
  return undefined;
}

export default function ProductosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Productos"
        title="Maquinaria para cada superficie"
        description="Elige el tipo de equipo que necesitas. Cada categoría reúne los modelos ideales para tu operación, con fichas técnicas y cotización en segundos."
        crumbs={[{ name: "Productos", path: "/productos" }]}
      />

      <section className="py-12" aria-label="Categorías de producto">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {productCategoryMeta.map((cat, i) => {
            const photo = categoryPhoto(cat.slug);
            const count = productsInCategory(cat.slug).length;
            return (
              <Reveal key={cat.slug} delay={(i % 3) * 0.08}>
                <GlassCard as="article" pastel className="group h-full">
                  <Link href={`/productos/categoria/${cat.slug}`} className="flex h-full flex-col">
                    <div className="relative m-2 h-44 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-deep to-brand-blue">
                      {photo ? (
                        <Image
                          src={photo}
                          alt={`${cat.name} industriales — SOLUPOWER`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="bg-white object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="grain absolute inset-0 opacity-30" />
                      )}
                      <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-ink backdrop-blur-md">
                        {count} {count === 1 ? "modelo" : "modelos"}
                      </span>
                      <span className={`absolute bottom-3 left-3 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${accentIcon[cat.accent]} text-white shadow-glow`}>
                        <cat.icon size={20} />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6 pt-3">
                      <h2 className="font-display text-xl font-semibold text-ink">{cat.name}</h2>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{cat.tagline}</p>
                      <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-brand-blue">
                        Ver {cat.name.toLowerCase()}
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

      <PillarSection variant="productos" />

      <ContactCta />
    </>
  );
}
