import { readdirSync } from "node:fs";
import { join } from "node:path";
import { imageSize } from "./imageSize";

// SERVER-ONLY. Do not import from a "use client" component.

const DIR = "casos";
const EXTS = ["png", "jpg", "jpeg", "webp"] as const;
/** How many numbered photos to look for per side. */
const MAX_PER_SIDE = 6;

interface Comparison {
  /**
   * Files are <key>-antes.<ext> / <key>-despues.<ext> for a single photo, or
   * <key>-antes-1.<ext>, <key>-antes-2.<ext>, … when a side has several.
   */
  key: string;
  title: string;
  description: string;
}

/** Before/after comparisons per case study. */
const map: Record<string, Comparison[]> = {
  "recuperacion-de-superficies": [
    {
      key: "pulido-destronque-concreto",
      title: "Pulido y destronque de concreto",
      description:
        "Destronque para nivelar y rebajar la superficie, y pulido con discos especializados hasta dejar el concreto uniforme.",
    },
  ],
  "cristalizado-y-pulido-de-pisos": [
    {
      key: "cristalizado-brillo",
      title: "Cristalizado y brillo",
      description:
        "Cristalizado que sella y endurece la superficie, devolviéndole el brillo y protegiéndola del tráfico.",
    },
    {
      key: "abrillantado-natural",
      title: "Abrillantado natural",
      description:
        "Pisos de mármol, granito y todo tipo de piedra, recuperando su brillo natural.",
    },
  ],
  "lavado-profundo-de-pisos": [
    {
      key: "lavado-desmanche-pisos",
      title: "Lavado profundo y desmanche de pisos",
      description:
        "Lavado industrial de superficies duras de alto tráfico con equipos que maximizan la eficiencia del proceso.",
    },
  ],
  "lavado-y-desinfeccion-de-alfombras": [
    {
      key: "lavado-alfombras",
      title: "Lavado profundo y desinfección de alfombras y mobiliario",
      description:
        "Lavado profundo en proceso semihúmedo con equipos de inyección y extracción, que elimina manchas y recupera las fibras.",
    },
    {
      key: "desmanche-mobiliario",
      title: "Lavado y desmanche de mobiliario",
      description:
        "Lavado profesional de sillas y mobiliario, con eliminación de manchas y extracción de agentes contaminantes.",
    },
  ],
};

export interface ResolvedComparison extends Comparison {
  antes: string[];
  despues: string[];
  /**
   * One frame ratio shared by every photo of the comparison. A before/after
   * only reads evenly if the shots sit in identical frames, so we average the
   * real ratios and crop all of them to that — instead of forcing a fixed box
   * that would lop the top off portrait shots.
   */
  ratio: string;
}

/** Strips accents and case, so "despues" also matches a file named "después". */
function normalize(name: string): string {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

/**
 * Before/after photos for a case study, resolved by convention from
 * /public/casos. A side may hold one photo (<key>-antes.jpg) or several
 * (<key>-antes-1.jpg, -2 …); both spellings are accepted at once.
 *
 * Only comparisons with photos on BOTH sides are returned — a lone "antes"
 * would render a comparison with nothing to compare against.
 */
export function caseComparisons(caseSlug: string): ResolvedComparison[] {
  const entries = map[caseSlug];
  if (!entries) return [];

  let files: string[] = [];
  try {
    files = readdirSync(join(process.cwd(), "public", DIR));
  } catch {
    return [];
  }
  const byNormalized = new Map<string, string>();
  for (const file of files) byNormalized.set(normalize(file), file);

  const lookup = (base: string) => {
    for (const ext of EXTS) {
      const actual = byNormalized.get(normalize(`${base}.${ext}`));
      if (actual) {
        return {
          src: `/${DIR}/${encodeURIComponent(actual)}`,
          size: imageSize(join(process.cwd(), "public", DIR, actual)),
        };
      }
    }
    return undefined;
  };

  /** Unnumbered photo first, then -1, -2, … so both conventions can coexist. */
  const side = (key: string, which: string) => {
    const found = [];
    const single = lookup(`${key}-${which}`);
    if (single) found.push(single);
    for (let n = 1; n <= MAX_PER_SIDE; n++) {
      const numbered = lookup(`${key}-${which}-${n}`);
      if (numbered) found.push(numbered);
    }
    return found;
  };

  const out: ResolvedComparison[] = [];
  for (const entry of entries) {
    const antes = side(entry.key, "antes");
    const despues = side(entry.key, "despues");
    if (antes.length === 0 || despues.length === 0) continue;

    const all = [...antes, ...despues];
    const average =
      all.reduce((sum, p) => sum + p.size.width / p.size.height, 0) / all.length;

    out.push({
      ...entry,
      antes: antes.map((p) => p.src),
      despues: despues.map((p) => p.src),
      ratio: `${average.toFixed(4)} / 1`,
    });
  }
  return out;
}
