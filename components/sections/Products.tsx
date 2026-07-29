import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { products } from "@/lib/data/products";
import { productPhoto } from "@/lib/productPhoto";

const visual: Record<string, string> = {
  blue: "from-brand-deep via-brand-blue to-brand-cyan",
  teal: "from-brand-teal via-brand-teal to-brand-green",
  cyan: "from-brand-blue via-brand-cyan to-brand-teal",
  green: "from-brand-green via-brand-teal to-brand-cyan",
};

export default function Products() {
  // Homepage previews only products with a real photo (for now);
  // the full catalog lives on /productos.
  const featured = products.filter((p) => productPhoto(p.slug));

  return (
    <section id="productos" className="relative py-28 sm:py-36" aria-label="Productos">
      <div className="container-x">
        <SectionHeading
          eyebrow="Productos"
          title="Maquinaria seleccionada para cada superficie"
          description="Un catálogo de equipos industriales pensados para durar y rendir. Elige por categoría y solicita tu cotización en segundos."
          align="center"
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) => {
            const photo = productPhoto(product.slug);
            return (
            <Reveal key={product.slug} delay={(i % 3) * 0.08}>
              <GlassCard as="article" pastel className="group h-full">
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
                        <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_30%_20%,rgba(255,255,255,0.5),transparent)]" />
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

                  <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-white/40 pt-4">
                    {product.specs.slice(0, 2).map((spec) => (
                      <div key={spec.label}>
                        <dt className="text-[11px] uppercase tracking-wide text-ink-faint">{spec.label}</dt>
                        <dd className="text-sm font-medium text-ink">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>

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

        <div className="mt-12 flex justify-center">
          <Button href="/productos" variant="primary" icon={<ArrowRight size={17} />}>
            Ver catálogo completo
          </Button>
        </div>
      </div>
    </section>
  );
}
