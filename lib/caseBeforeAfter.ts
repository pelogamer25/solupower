import { readdirSync } from "node:fs";
import { join } from "node:path";

// SERVER-ONLY. Do not import from a "use client" component.

const DIR = "casos";
const EXTS = ["png", "jpg", "jpeg", "webp"] as const;

interface Comparison {
  /** Files are <key>-antes.<ext> and <key>-despues.<ext> in /public/casos. */
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
};

export interface ResolvedComparison extends Comparison {
  antes: string;
  despues: string;
}

/** Strips accents and case, so "despues" also matches a file named "después". */
function normalize(name: string): string {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

/**
 * Before/after pairs for a case study, resolved by convention:
 *   public/casos/<key>-antes.(png|jpg|jpeg|webp)
 *   public/casos/<key>-despues.(png|jpg|jpeg|webp)
 *
 * Only complete pairs are returned — a lone "antes" would render a comparison
 * with nothing to compare against, so it waits until its partner is uploaded.
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

  const find = (key: string, side: string) => {
    for (const ext of EXTS) {
      const actual = byNormalized.get(normalize(`${key}-${side}.${ext}`));
      if (actual) return `/${DIR}/${encodeURIComponent(actual)}`;
    }
    return undefined;
  };

  const out: ResolvedComparison[] = [];
  for (const entry of entries) {
    const antes = find(entry.key, "antes");
    const despues = find(entry.key, "despues");
    if (antes && despues) out.push({ ...entry, antes, despues });
  }
  return out;
}
