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
    logo: new URL("/opengraph-image", siteConfig.url).toString(),
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    foundingDate: siteConfig.foundingYear,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogotá",
      addressRegion: "Cundinamarca",
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
    image: new URL("/opengraph-image", siteConfig.url).toString(),
    description: siteConfig.metaDescription,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    priceRange: siteConfig.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: "Bogotá",
      addressRegion: "Cundinamarca",
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
