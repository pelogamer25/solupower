import { existsSync } from "node:fs";
import { join } from "node:path";

// SERVER-ONLY. Do not import from a "use client" component.

// Each service mapped to a real SOLUPOWER work photo (public/trabajos) that
// actually depicts that kind of work. Raw filename → resolved+encoded at runtime.
const map: Record<string, string> = {
  "venta-de-maquinaria": "WhatsApp Image 2026-07-16 at 3.52.42 PM.jpeg", // equipo + equipo de limpieza
  alquiler: "WhatsApp Image 2026-07-16 at 4.03.54 PM.jpeg", // máquina fregando piso
  "servicio-tecnico": "WhatsApp Image 2026-07-16 at 4.112123.03 PM.jpeg", // operario con máquina
  "restauracion-de-pisos": "WhatsApp Image 2026-07-16 at 4.12asd.50 PM.jpeg", // mármol pulido efecto espejo
};

/** Public URL of a service's illustrative work photo, or undefined if missing. */
export function serviceImage(slug: string): string | undefined {
  const file = map[slug];
  if (!file) return undefined;
  return existsSync(join(process.cwd(), "public", "trabajos", file))
    ? `/trabajos/${encodeURIComponent(file)}`
    : undefined;
}
