import { existsSync } from "node:fs";
import { join } from "node:path";

// SERVER-ONLY. Do not import from a "use client" component.

const DIR = "trabajos";

interface ExtraPhoto {
  /** Exact filename inside /public/trabajos. */
  file: string;
  caption: string;
  alt: string;
}

/**
 * Extra illustrative photos shown on a service page, beyond its main banner.
 * Resolved by exact filename so a missing file simply hides the block instead
 * of rendering a broken image.
 */
const map: Record<string, ExtraPhoto[]> = {
  "servicio-tecnico": [
    {
      file: "serviciotecnicoarreglando.png",
      caption: "Reparación en taller",
      alt: "Técnico de SOLUPOWER reparando un equipo de limpieza industrial",
    },
    {
      file: "stockderepuestos.png",
      caption: "Stock de repuestos",
      alt: "Stock de repuestos y consumibles para equipos de limpieza industrial de SOLUPOWER",
    },
  ],
};

export interface ResolvedExtraPhoto {
  src: string;
  caption: string;
  alt: string;
}

/** Existing extra photos for a service (empty array if none are on disk). */
export function serviceExtraPhotos(slug: string): ResolvedExtraPhoto[] {
  const entries = map[slug];
  if (!entries) return [];
  return entries
    .filter((e) => existsSync(join(process.cwd(), "public", DIR, e.file)))
    .map((e) => ({
      src: `/${DIR}/${encodeURIComponent(e.file)}`,
      caption: e.caption,
      alt: e.alt,
    }));
}

/**
 * Banner images that illustrate a service but aren't a "result" for the work
 * gallery (this one is an ultra-wide lineup that would crop to nothing in a
 * square tile).
 */
const bannerOnly = ["perfillimpiadoras.jpg"];

/** Filenames used as service illustrations — excluded from the work gallery. */
export const serviceExtraFiles = new Set([
  ...Object.values(map).flatMap((list) => list.map((e) => e.file)),
  ...bannerOnly,
]);
