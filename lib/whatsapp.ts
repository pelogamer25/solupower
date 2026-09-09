import { siteConfig } from "@/config/site";

/**
 * WhatsApp deep links.
 *
 * Everything the site "sends" goes here: there is no inbox and no backend, so
 * WhatsApp is the actual channel. Each link carries a message written for the
 * person on the other end — the salesperson should be able to answer without
 * asking what the lead was looking at.
 */

/** Digits-only number wa.me expects, taken from the single source of truth. */
const PHONE = siteConfig.contact.whatsapp.split("/").pop() ?? "";

/** wa.me link with a prefilled message. */
export function waLink(message: string): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

/** Where the person was standing when they tapped. Sales needs this. */
function fromLine(path: string): string {
  const host = siteConfig.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return `_Escribo desde ${host}${path}_`;
}

/* ------------------------------------------------------------------ *
 * Floating bubble — the opener is written from the page's intent.
 * ------------------------------------------------------------------ */

const serviceIntent: Record<string, string> = {
  alquiler: "Quisiera alquilar equipos de limpieza.",
  "servicio-tecnico": "Necesito servicio técnico para un equipo.",
  "restauracion-de-pisos": "Necesito mantenimiento y tratamiento de pisos.",
  "lavado-de-alfombras-y-mobiliario": "Necesito lavado de alfombras y mobiliario.",
};

const categoryIntent: Record<string, string> = {
  brilladoras: "Quisiera cotizar una brilladora.",
  hidrolavadoras: "Quisiera cotizar una hidrolavadora industrial.",
  aspiradoras: "Quisiera cotizar una aspiradora industrial.",
  scrubbers: "Quisiera cotizar una fregadora industrial.",
  barredoras: "Quisiera cotizar una barredora industrial.",
  extractoras: "Quisiera cotizar una extractora.",
  robots: "Quisiera cotizar un robot de limpieza.",
};

/** The opening line for a given route. */
function intentFor(path: string): string {
  const clean = path.replace(/\/$/, "") || "/";
  const seg = clean.split("/").filter(Boolean);

  if (seg[0] === "servicios") {
    return (seg[1] && serviceIntent[seg[1]]) || "Quisiera información sobre sus servicios.";
  }
  if (seg[0] === "productos") {
    if (seg[1] === "categoria" && seg[2]) {
      return categoryIntent[seg[2]] ?? "Quisiera cotizar un equipo de su catálogo.";
    }
    if (seg[1]) return "Quisiera cotizar un equipo de su catálogo.";
    return "Quisiera cotizar equipos de limpieza industrial.";
  }
  if (seg[0] === "casos-de-exito") return "Vi sus casos de éxito y quisiera una cotización.";
  if (seg[0] === "blog") return "Leí un artículo en su blog y tengo una consulta.";
  if (seg[0] === "cotizacion" || seg[0] === "contacto") return "Quisiera solicitar una cotización.";
  if (seg[0] === "galeria") return "Vi su galería de trabajos y quisiera una cotización.";

  return "Quisiera información sobre sus servicios de limpieza industrial.";
}

/** Prefilled message for the floating bubble on a given route. */
export function bubbleMessage(path: string): string {
  return [`Hola SOLUPOWER 👋`, ``, intentFor(path), ``, fromLine(path)].join("\n");
}

/* ------------------------------------------------------------------ *
 * Quote form — the full lead, formatted so it's readable in the chat.
 * ------------------------------------------------------------------ */

export interface QuoteLead {
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  /** Service picked in the select, as its title. */
  service?: string;
  /** Product the visitor arrived from (/cotizacion?producto=…). */
  product?: string;
  message: string;
  /** Path of the page holding the form. */
  path: string;
}

/**
 * Turn a submitted form into a WhatsApp message.
 *
 * WhatsApp renders *asterisks* as bold and _underscores_ as italic, so the
 * labels stand out and the chat stays scannable on a phone. Empty optional
 * fields are dropped rather than sent as "Empresa: —".
 */
export function quoteMessage(lead: QuoteLead): string {
  const opener = lead.product
    ? `Quisiera cotizar este equipo: *${lead.product}*.`
    : lead.service
      ? `Quisiera cotizar: *${lead.service}*.`
      : "Quisiera solicitar una cotización.";

  const facts: string[] = [`*Nombre:* ${lead.name}`];
  if (lead.company) facts.push(`*Empresa:* ${lead.company}`);
  if (lead.email) facts.push(`*Correo:* ${lead.email}`);
  if (lead.phone) facts.push(`*Teléfono:* ${lead.phone}`);
  // Product pages preselect the equipment, so the service is extra context.
  if (lead.product && lead.service) facts.push(`*Servicio:* ${lead.service}`);

  return [
    "Hola SOLUPOWER 👋",
    "",
    opener,
    "",
    ...facts,
    "",
    "*Lo que necesito:*",
    lead.message,
    "",
    fromLine(lead.path),
  ].join("\n");
}

/* ------------------------------------------------------------------ *
 * Catalog — every "Cotizar" button opens the chat already talking
 * about that specific machine.
 * ------------------------------------------------------------------ */

export interface QuotableProduct {
  slug: string;
  name: string;
  category: string;
}

/** Prefilled message for a specific piece of equipment. */
export function productQuoteMessage(p: QuotableProduct): string {
  return [
    "Hola SOLUPOWER 👋",
    "",
    `Quisiera cotizar este equipo: *${p.name}* (${p.category}).`,
    "",
    "¿Me pueden indicar precio, disponibilidad y si está para alquiler?",
    "",
    fromLine(`/productos/${p.slug}`),
  ].join("\n");
}

/** wa.me link for a specific piece of equipment. */
export function productQuoteLink(p: QuotableProduct): string {
  return waLink(productQuoteMessage(p));
}

/** Prefilled message for a service, used by the service pages' CTA. */
export function serviceQuoteLink(slug: string, title: string): string {
  return waLink(
    [
      "Hola SOLUPOWER 👋",
      "",
      serviceIntent[slug] ?? `Quisiera cotizar: *${title}*.`,
      "",
      "¿Me pueden dar más información y una cotización?",
      "",
      fromLine(`/servicios/${slug}`),
    ].join("\n"),
  );
}
