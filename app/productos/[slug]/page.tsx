import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import SeoProse from "@/components/seo/SeoProse";
import ContextualCta from "@/components/seo/ContextualCta";
import RelatedContent from "@/components/seo/RelatedContent";
import ContactCta from "@/components/sections/ContactCta";
import { pageMetadata, productJsonLd, jsonLdScript } from "@/lib/seo";
import { products, getProduct, formatCOP } from "@/lib/data/products";
import { getProductSeo } from "@/lib/data/seoContent";
import { getRelated } from "@/lib/data/relations";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    title: product.name,
    description: product.description,
    path: `/productos/${product.slug}`,
    keywords: [product.name.toLowerCase(), product.category.toLowerCase(), "equipos industriales"],
  });
}

const visual: Record<string, string> = {
  blue: "from-brand-deep via-brand-blue to-brand-cyan",
  teal: "from-brand-teal via-brand-teal to-brand-green",
  cyan: "from-brand-blue via-brand-cyan to-brand-teal",
  green: "from-brand-green via-brand-teal to-brand-cyan",
};

export default async function ProductoDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const seo = getProductSeo(product.slug);
  const related = getRelated(product.slug);
  const ctaService = related.servicios[0]?.slug ?? "alquiler";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(productJsonLd(product))}
      />

      <PageHeader
        eyebrow={product.category}
        title={product.name}
        description={product.description}
        crumbs={[
          { name: "Productos", path: "/productos" },
          { name: product.name, path: `/productos/${product.slug}` },
        ]}
      />

      <section className="py-12" aria-label="Detalle del producto">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="p-2">
              <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-[1.7rem] bg-gradient-to-br ${visual[product.accent]}`}>
                {product.imageIndex !== undefined && (
                  <Image
                    src={`/hero/frame-${String(product.imageIndex).padStart(2, "0")}.jpg`}
                    alt={`${product.name} — equipos de limpieza industrial SOLUPOWER en Colombia`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover mix-blend-luminosity opacity-90"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-deep/30 via-transparent to-white/10" />
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="h-full p-8">
              <h2 className="font-display text-xl font-semibold text-ink">Especificaciones</h2>
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
                {product.specs.map((spec) => (
                  <div key={spec.label}>
                    <dt className="text-[11px] uppercase tracking-wide text-ink-faint">{spec.label}</dt>
                    <dd className="mt-1 font-display text-lg font-medium text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              {product.priceFrom && (
                <div className="mt-8 flex items-end justify-between border-t border-white/40 pt-6">
                  <div>
                    <span className="text-[11px] uppercase tracking-wide text-ink-faint">Desde</span>
                    <div className="font-display text-3xl font-semibold text-gradient">
                      {formatCOP(product.priceFrom)}
                    </div>
                    <span className="text-xs text-ink-faint">+ IVA · precio de referencia, cotiza el tuyo</span>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={`/cotizacion?producto=${product.slug}`} variant="primary" icon={<ArrowRight size={17} />}>
                  Cotizar este equipo
                </Button>
                <Button href="/contacto" variant="ghost">
                  Hablar con un asesor
                </Button>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* SEO body: H2 / H3 with contextual internal links */}
      {seo.length > 0 && (
        <section className="py-8" aria-label="Información detallada">
          <div className="container-x">
            <SeoProse sections={seo} />
          </div>
        </section>
      )}

      {/* Contextual CTA with keyword anchor */}
      <ContextualCta
        lead={`Si su empresa necesita ${product.name.toLowerCase()}, conozca también nuestro`}
        slug={ctaService}
        tail=" para acceder al equipo con total flexibilidad."
        cta={{ href: `/cotizacion?producto=${product.slug}`, label: "Solicitar cotización" }}
      />

      {/* "También te puede interesar" — related services, products, articles, cases */}
      <RelatedContent slug={product.slug} pillar="productos" />

      <ContactCta />
    </>
  );
}
