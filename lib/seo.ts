import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetaOptions {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}

/**
 * Build per-page metadata using Next.js Metadata API.
 * `title` here is the page title; the root layout template adds the brand suffix.
 */
export function pageMetadata({
  title,
  description,
  path = "/",
  keywords,
}: PageMetaOptions): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  // Clamped centrally so no page — including ones added later — ships a snippet
  // Google will cut mid-word. Pages with tuned copy are already under the limit
  // and pass through untouched.
  description = clampSnippet(description);
  return {
    title,
    description,
    keywords: keywords ?? [...siteConfig.keywords],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** breadcrumbs -> JSON-LD BreadcrumbList */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    // Real brand mark (512×512, transparent) — Google prefers the logo itself
    // over the social card for the knowledge-panel logo.
    logo: {
      "@type": "ImageObject",
      url: new URL("/logo.png", siteConfig.url).toString(),
      width: 512,
      height: 512,
    },
    image: new URL("/opengraph-image", siteConfig.url).toString(),
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    foundingDate: siteConfig.foundingYear,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: "Medellín",
      addressRegion: "Antioquia",
      addressCountry: "CO",
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.linkedin,
    ],
  };
}

/** LocalBusiness / ProfessionalService — the key signal for the local pack. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: new URL("/logo.png", siteConfig.url).toString(),
    image: new URL("/opengraph-image", siteConfig.url).toString(),
    description: siteConfig.metaDescription,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    priceRange: siteConfig.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: "Medellín",
      addressRegion: "Antioquia",
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: siteConfig.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
    openingHoursSpecification: siteConfig.openingHours.map((h) => {
      const [days, range] = h.split(" ");
      const [opens, closes] = range.split("-");
      return { "@type": "OpeningHoursSpecification", dayOfWeek: days, opens, closes };
    }),
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.linkedin,
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "es-CO",
  };
}

export function serviceJsonLd(service: { title: string; description: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "Organization", name: siteConfig.name },
    areaServed: "CO",
    url: new URL(`/servicios/${service.slug}`, siteConfig.url).toString(),
  };
}

export function productJsonLd(product: {
  name: string;
  description: string;
  slug: string;
  priceFrom?: number;
  imageIndex?: number;
}) {
  const url = new URL(`/productos/${product.slug}`, siteConfig.url).toString();
  const image =
    product.imageIndex !== undefined
      ? new URL(`/hero/frame-${String(product.imageIndex).padStart(2, "0")}.jpg`, siteConfig.url).toString()
      : new URL("/opengraph-image", siteConfig.url).toString();

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image,
    brand: { "@type": "Brand", name: siteConfig.name },
    category: "Equipos de limpieza industrial",
    url,
    ...(product.priceFrom
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "COP",
            price: product.priceFrom,
            priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            url,
            seller: { "@type": "Organization", name: siteConfig.name },
          },
        }
      : {}),
  };
}

/** Small server component-safe helper to render a JSON-LD script tag. */
export function jsonLdScript(data: object) {
  return {
    __html: JSON.stringify(data),
  };
}

/**
 * SERP snippet limit. Google renders roughly 155–160 characters before the
 * ellipsis; anything past that is written for nobody.
 */
const SNIPPET_MAX = 158;

/** Clip to the last whole word that fits, so a snippet never ends mid-word. */
export function clampSnippet(text: string, max = SNIPPET_MAX): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—-]$/, "") + "…";
}

/**
 * Closing line for a product snippet, by category. The product `excerpt` is a
 * tight one-liner (~75 chars) that leaves room for the keyword + city that the
 * model name alone doesn't carry. One per category so 20 products don't all
 * ship the same boilerplate tail.
 */
const categoryTail: Record<string, string> = {
  Aspiradoras: "Aspiradoras industriales en Medellín, con servicio técnico y repuestos.",
  Hidrolavadoras: "Hidrolavadoras industriales en Medellín: venta, alquiler y repuestos.",
  Brilladoras: "Brilladoras y pulidoras de pisos: venta y alquiler en Medellín.",
  Scrubbers: "Fregadoras industriales en Medellín: venta, alquiler y soporte técnico.",
  Barredoras: "Barredoras industriales en Medellín y Bogotá, con soporte multimarcas.",
  Extractoras: "Extractoras para lavado de tapetes y alfombras, con servicio técnico.",
  Robots: "Robots de limpieza autónomos para grandes superficies en Colombia.",
};

/** Meta description for a product: explicit override, else excerpt + category tail. */
export function productSnippet(p: { excerpt: string; category: string; seoDescription?: string }) {
  return clampSnippet(p.seoDescription ?? `${p.excerpt} ${categoryTail[p.category] ?? ""}`);
}
