import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import PillarSection from "@/components/seo/PillarSection";
import SeoProse from "@/components/seo/SeoProse";
import ContactCta from "@/components/sections/ContactCta";
import { pageMetadata, jsonLdScript } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { productCategoryMeta, getCategoryMeta, productsInCategory } from "@/lib/data/products";
import { productPhoto } from "@/lib/productPhoto";
import { getProductSeo } from "@/lib/data/seoContent";

/**
 * SERP title per category. The internal label isn't always what people type:
 * nobody searches "Scrubbers industriales" in Colombia — they search
 * "fregadoras industriales". See seo/keywords.md.
 */
const categoryTitle: Record<string, string> = {
  brilladoras: "Brilladoras y pulidoras de pisos industriales",
  hidrolavadoras: "Hidrolavadoras industriales en Medellín",
  aspiradoras: "Aspiradoras industriales en Medellín y Bogotá",
  scrubbers: "Fregadoras industriales (scrubbers)",
  barredoras: "Barredoras industriales en Medellín y Bogotá",
  extractoras: "Extractoras para alfombras y tapicería",
  robots: "Robots de limpieza autónomos",
};

export function generateStaticParams() {
  return productCategoryMeta.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const cat = getCategoryMeta(slug);
  if (!cat) return {};
  return pageMetadata({
    title: categoryTitle[cat.slug] ?? `${cat.name} industriales`,
    description: cat.tagline,
    path: `/productos/categoria/${cat.slug}`,
    keywords: [cat.name.toLowerCase(), "equipos de limpieza industrial", "maquinaria industrial"],
  });
}

const visual: Record<string, string> = {
  blue: "from-brand-deep via-brand-blue to-brand-cyan",
  teal: "from-brand-teal via-brand-teal to-brand-green",
  cyan: "from-brand-blue via-brand-cyan to-brand-teal",
  green: "from-brand-green via-brand-teal to-brand-cyan",
};

export default async function CategoriaPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const cat = getCategoryMeta(slug);
  if (!cat) notFound();

  const items = productsInCategory(cat.slug);
  // "Scrubber" is the industry's word, not the buyer's: in Colombia the search
  // is "fregadoras industriales". The H1 leads with that and keeps the term.
  const heading = cat.slug === "scrubbers" ? "Fregadoras industriales (scrubbers)" : `${cat.name} industriales`;
  // SEO body kept from the retired overview products, whose slug was the category's.
  const seo = getProductSeo(cat.slug);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${cat.name} industriales`,
    description: cat.tagline,
    url: `${siteConfig.url}/productos/categoria/${cat.slug}`,
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: `${siteConfig.url}/productos/${p.slug}`,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(collectionJsonLd)} />

      <PageHeader
        eyebrow="Productos"
        title={heading}
        description={cat.tagline}
        crumbs={[
          { name: "Productos", path: "/productos" },
          { name: cat.name, path: `/productos/categoria/${cat.slug}` },
        ]}
      >
        <Button href="/cotizacion" variant="primary">
          Solicitar cotización
        </Button>
      </PageHeader>

      {/* Category switcher — internal links to every type */}
      <nav className="py-4" aria-label="Categorías de producto">
        <div className="container-x flex flex-wrap gap-2">
          {productCategoryMeta.map((c) => {
            const active = c.slug === cat.slug;
            return (
              <Link
                key={c.slug}
                href={`/productos/categoria/${c.slug}`}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-md transition-colors ${
                  active
                    ? "border-brand-blue/40 bg-white/70 text-ink"
                    : "border-white/50 bg-white/40 text-ink-soft hover:border-brand-blue/40 hover:text-brand-blue"
                }`}
              >
                <c.icon size={15} className="text-brand-blue" />
                {c.name}
              </Link>
            );
          })}
        </div>
      </nav>

      <section className="py-10" aria-label={`Productos: ${cat.name}`}>
        <div className="container-x">
          {items.length === 0 ? (
            <GlassCard className="p-10 text-center text-ink-soft">
              Pronto agregaremos modelos en esta categoría.{" "}
              <Link href="/cotizacion" className="font-medium text-brand-blue">
                Solicita una cotización
              </Link>{" "}
              y te asesoramos.
            </GlassCard>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((product, i) => {
                const photo = productPhoto(product.slug);
                return (
                  <Reveal key={product.slug} delay={(i % 3) * 0.08}>
                    <GlassCard as="article" pastel className="group h-full">
                      <Link href={`/productos/${product.slug}`} className="block">
                        <div className="relative m-2 h-60 overflow-hidden rounded-3xl sm:h-64">
                          {photo ? (
                            <>
                              <div className="absolute inset-0 bg-white" />
                              <Image
                                src={photo}
                                alt={`${product.name} — SOLUPOWER`}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-contain p-2.5 transition-transform duration-500 group-hover:scale-105"
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
                        <h2 className="font-display text-lg font-semibold text-ink">{product.name}</h2>
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
          )}
        </div>
      </section>

      {seo.length > 0 && (
        <section className="py-8" aria-label="Información detallada">
          <div className="container-x">
            <SeoProse sections={seo} />
          </div>
        </section>
      )}

      <PillarSection variant="productos" />

      <ContactCta />
    </>
  );
}
