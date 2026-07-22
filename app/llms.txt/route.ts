import { siteConfig } from "@/config/site";
import { services } from "@/lib/data/services";
import { products } from "@/lib/data/products";
import { posts } from "@/lib/data/content";

export const dynamic = "force-static";

/**
 * /llms.txt — a plain-text map of the site for AI crawlers / LLMs (GEO).
 * Generated from the data layer so it stays in sync.
 */
export function GET() {
  const base = siteConfig.url;
  const line = (label: string, path: string, desc: string) =>
    `- [${label}](${base}${path}): ${desc}`;

  const body = `# ${siteConfig.name}

> ${siteConfig.legalName}. ${siteConfig.metaDescription}

${siteConfig.name} es una empresa colombiana especializada en soluciones integrales
para la limpieza y el mantenimiento industrial: suministro de equipos, renting,
mantenimiento y servicio técnico especializado, con sede en Medellín y cobertura
en Medellín y Bogotá.

## Servicios
${services.map((s) => line(s.title, `/servicios/${s.slug}`, s.excerpt)).join("\n")}

## Productos
${products.map((p) => line(p.name, `/productos/${p.slug}`, p.excerpt)).join("\n")}

## Recursos
${posts.map((p) => line(p.title, `/blog/${p.slug}`, p.excerpt)).join("\n")}

## Páginas clave
${line("Inicio", "/", "Presentación general de SOLUPOWER")}
${line("Nosotros", "/nosotros", "Historia, misión y valores")}
${line("Casos de éxito", "/casos-de-exito", "Proyectos ejecutados con resultados")}
${line("Contacto", "/contacto", "Teléfono, WhatsApp, correo y formulario")}
${line("Cotización", "/cotizacion", "Solicitar cotización sin compromiso")}

## Contacto
- Teléfono: ${siteConfig.contact.phone}
- Email: ${siteConfig.contact.email}
- WhatsApp: ${siteConfig.contact.whatsapp}
- Ubicación: ${siteConfig.contact.address}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
