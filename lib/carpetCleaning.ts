import { readdirSync } from "node:fs";
import { join } from "node:path";

// SERVER-ONLY. Do not import from a "use client" component.

const DIR = "alfombras";
const EXTS = ["png", "jpg", "jpeg", "webp"] as const;
/** How many numbered photos to look for per group. */
const MAX_PER_GROUP = 8;

interface CarpetGroup {
  /** Files are <key>-1.<ext>, <key>-2.<ext>, … in /public/alfombras. */
  key: string;
  title: string;
  description: string;
}

/** Photo groups shown on /servicios/lavado-de-alfombras-y-mobiliario. */
const groups: CarpetGroup[] = [
  {
    key: "lavado-equipos",
    title: "Lavado con equipos industriales",
    description:
      "Equipos de inyección y extracción para alfombras, tapetes y superficies textiles.",
  },
  {
    key: "extraccion-profunda",
    title: "Extracción profunda de suciedad",
    description:
      "Proceso semihúmedo que extrae la suciedad incrustada, elimina manchas y olores y recupera las fibras.",
  },
  {
    key: "sillas-mobiliario",
    title: "Lavado de sillas y mobiliario",
    description:
      "Lavado y desinfección de sillas, sofás y mobiliario, con tiempos de secado cortos.",
  },
];

export interface ResolvedCarpetGroup extends CarpetGroup {
  photos: string[];
}

/**
 * Photo groups with their images resolved by convention:
 *   public/alfombras/<key>-<n>.(png|jpg|jpeg|webp)   — n starting at 1
 *
 * Numbering is open-ended (up to MAX_PER_GROUP), so a group can gain or lose
 * photos with no code change. Groups without photos are dropped, and the
 * section hides itself while there are none — never a broken or empty block.
 */
/** Strips accents and case so "extracción-profunda-1" matches "extraccion-profunda-1". */
function normalize(name: string): string {
  return name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function carpetCleaningGroups(): ResolvedCarpetGroup[] {
  // Index the folder once by normalized filename, so a photo uploaded with an
  // accent or different casing is still found (and served under its real name).
  let files: string[] = [];
  try {
    files = readdirSync(join(process.cwd(), "public", DIR));
  } catch {
    return [];
  }
  const byNormalized = new Map<string, string>();
  for (const file of files) byNormalized.set(normalize(file), file);

  const out: ResolvedCarpetGroup[] = [];
  for (const group of groups) {
    const photos: string[] = [];
    for (let n = 1; n <= MAX_PER_GROUP; n++) {
      for (const ext of EXTS) {
        const actual = byNormalized.get(normalize(`${group.key}-${n}.${ext}`));
        if (actual) {
          photos.push(`/${DIR}/${encodeURIComponent(actual)}`);
          break;
        }
      }
    }
    if (photos.length > 0) out.push({ ...group, photos });
  }
  return out;
}
