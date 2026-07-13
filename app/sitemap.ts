import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/lib/data/services";
import { products } from "@/lib/data/products";
import { posts, caseStudies } from "@/lib/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/nosotros",
    "/servicios",
    "/productos",
    "/casos-de-exito",
    "/galeria",
    "/blog",
    "/clientes",
    "/contacto",
    "/cotizacion",
    "/privacidad",
    "/terminos",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: (path === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/servicios/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/productos/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const caseRoutes = caseStudies.map((c) => ({
    url: `${base}/casos-de-exito/${c.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...productRoutes, ...postRoutes, ...caseRoutes];
}
