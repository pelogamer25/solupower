import { readdirSync } from "node:fs";
import { join } from "node:path";
import { TEAM_PHOTO_BASE } from "./teamPhoto";
import { serviceExtraFiles } from "./serviceExtraPhotos";

// SERVER-ONLY. Do not import from a "use client" component.

const DIR = "trabajos";
const IMAGE_EXT = /\.(png|jpe?g|webp|avif|gif)$/i;

export interface WorkPhoto {
  src: string;
  /** Descriptive alt text — one keyword variation per photo, never repeated. */
  alt: string;
  /** Short overlay caption shown on the tile. */
  caption: string;
}

/**
 * Alt text and caption per photo, keyed by filename.
 *
 * SEO: search engines read the alt attribute as the image's content. A single
 * string repeated across every photo tells them nothing and reads as boilerplate
 * to a screen reader too, so each entry describes what is actually in the frame
 * and carries a different keyword variation (pulido, cristalizado, lavado de
 * alfombras, brillo espejo…). Never paste the same line into two entries.
 */
const meta: Record<string, Omit<WorkPhoto, "src">> = {
  "extraccion-agua-piso-madera-oficina": {
    alt: "Operario de SOLUPOWER extrayendo agua de un piso de madera en una oficina durante un lavado profundo",
    caption: "Lavado y extracción en oficina",
  },
  "piso-marmol-terraza-piscina-medellin": {
    alt: "Piso de mármol de la terraza y la zona de piscina de un edificio en Medellín después del mantenimiento",
    caption: "Mármol en zona de piscina",
  },
  "pulido-de-bordes-piso-drenaje": {
    alt: "Pulido de los bordes del piso junto a una rejilla de drenaje con equipo de diamantado",
    caption: "Pulido de bordes y remates",
  },
  "deck-marmol-piscina-edificio": {
    alt: "Deck en mármol alrededor de la piscina de un edificio residencial tras el tratamiento de pisos",
    caption: "Deck de piscina tratado",
  },
  "piso-pulido-brillo-espejo-local-comercial": {
    alt: "Piso pulido con acabado brillo espejo en un local comercial, reflejando la iluminación del techo",
    caption: "Acabado brillo espejo",
  },
  "mantenimiento-piso-terraza-zona-social": {
    alt: "Mantenimiento del piso de la terraza y la zona social de un edificio con maquinaria industrial",
    caption: "Terraza y zona social",
  },
  "brilladora-industrial-piso-lobby": {
    alt: "Técnico de SOLUPOWER abrillantando el piso del lobby de un edificio con una brilladora industrial",
    caption: "Abrillantado de lobby",
  },
  "lavado-de-alfombras-zona-comun-medellin": {
    alt: "Lavado de la alfombra de una zona común en Medellín con equipo de inyección y extracción",
    caption: "Alfombra de zona común",
  },
  "pulido-de-meson-en-marmol-blanco": {
    alt: "Mesón en mármol blanco pulido y cristalizado en la zona de baños de un edificio corporativo",
    caption: "Mesón en mármol pulido",
  },
  "lavado-de-alfombras-equipo-rotativo": {
    alt: "Lavado de una alfombra de gran formato con máquina rotativa y champú industrial",
    caption: "Lavado con máquina rotativa",
  },
  "marmol-pulido-efecto-espejo": {
    alt: "Piso en mármol pulido con efecto espejo tras el proceso de cristalizado de SOLUPOWER",
    caption: "Mármol con efecto espejo",
  },
};

const FALLBACK: Omit<WorkPhoto, "src"> = {
  alt: "Trabajo real de limpieza y mantenimiento industrial realizado por SOLUPOWER",
  caption: "Trabajo realizado",
};

/**
 * Lists every image dropped into /public/trabajos — ANY filename works.
 * Returns public URLs (filename URI-encoded so spaces/accents are safe),
 * sorted by name, each with its alt text and caption. A file with no entry in
 * `meta` still shows up, with generic copy, so the drop-in convention holds.
 * Empty array if the folder is missing or empty, so the UI can fall back to
 * placeholders.
 *
 * Two kinds of image live in the same folder but are excluded, because they
 * illustrate a specific page rather than being a "result" for the gallery:
 * the team photo (belongs to "Nosotros" — and a group portrait crops badly
 * into a square tile) and the per-service illustrations.
 */
export function workPhotos(): WorkPhoto[] {
  try {
    return readdirSync(join(process.cwd(), "public", DIR))
      .filter((f) => IMAGE_EXT.test(f))
      .filter((f) => !f.startsWith(`${TEAM_PHOTO_BASE}.`))
      .filter((f) => !serviceExtraFiles.has(f))
      .sort((a, b) => a.localeCompare(b, "es"))
      .map((f) => ({
        src: `/${DIR}/${encodeURIComponent(f)}`,
        ...(meta[f.replace(IMAGE_EXT, "")] ?? FALLBACK),
      }));
  } catch {
    return [];
  }
}
