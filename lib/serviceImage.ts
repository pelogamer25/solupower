import { existsSync } from "node:fs";
import { join } from "node:path";

// SERVER-ONLY. Do not import from a "use client" component.

// Each service mapped to a real SOLUPOWER photo that actually depicts that kind
// of work. Paths are relative to /public, so a service can draw from whichever
// folder its photos live in. Resolved + encoded at runtime.
const map: Record<string, string> = {
  "restauracion-de-pisos": "trabajos/marmol-pulido-efecto-espejo.jpeg",
  "lavado-de-alfombras-y-mobiliario": "alfombras/extraccion-profunda-1.jpg", // extracción sobre alfombra
  alquiler: "trabajos/perfillimpiadoras.jpg", // perfil de equipos disponibles en alquiler
  "servicio-tecnico": "trabajos/serviciotecnicoarreglando.png", // técnico reparando un equipo
};

/**
 * Services whose detail page opens without a banner. Their photo still fronts
 * the card in the listings — servicio técnico leads with its multibrand badge
 * and workshop photos instead of a wide header image.
 */
const noBanner = new Set(["servicio-tecnico"]);

function resolve(rel: string | undefined): string | undefined {
  if (!rel) return undefined;
  if (!existsSync(join(process.cwd(), "public", rel))) return undefined;
  // encode each segment, leaving the slashes intact
  return "/" + rel.split("/").map(encodeURIComponent).join("/");
}

/** Photo fronting a service's card in the listings, or undefined if missing. */
export function serviceImage(slug: string): string | undefined {
  return resolve(map[slug]);
}

/** Wide header photo for a service's own page — some services opt out. */
export function serviceBanner(slug: string): string | undefined {
  return noBanner.has(slug) ? undefined : resolve(map[slug]);
}
