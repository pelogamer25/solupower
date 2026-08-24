import { existsSync } from "node:fs";
import { join } from "node:path";

// SERVER-ONLY. Do not import from a "use client" component.

const DIR = "pisos";
const EXTS = ["png", "jpg", "jpeg", "webp"] as const;

interface FloorFinish {
  /** Filename (without extension) to look for in /public/pisos. */
  key: string;
  title: string;
  description: string;
}

/** The finishes shown on /servicios/restauracion-de-pisos. */
const finishes: FloorFinish[] = [
  {
    key: "cristalizado",
    title: "Cristalizado",
    description:
      "Devuelve el brillo y protege la superficie frente al tráfico, en mármol, granito y baldosas.",
  },
  {
    key: "brillo-natural",
    title: "Acabados en brillo natural y espejo",
    description:
      "Del brillo natural al efecto espejo, según el acabado que necesite cada superficie.",
  },
  {
    key: "pulido-diamantado",
    title: "Pulido y diamantado",
    description:
      "Pulido y diamantado para nivelar, rebajar y recuperar toda clase de superficie.",
  },
];

export interface ResolvedFloorFinish extends FloorFinish {
  src: string;
}

/**
 * Finishes that already have a photo in public/pisos/<key>.(png|jpg|jpeg|webp).
 *
 * Resolved by convention so photos can be dropped in over time with no code
 * change; a finish without a photo is simply left out, and the section hides
 * itself entirely while there are none — never a broken or empty block.
 */
export function floorFinishes(): ResolvedFloorFinish[] {
  const out: ResolvedFloorFinish[] = [];
  for (const finish of finishes) {
    for (const ext of EXTS) {
      const rel = `${DIR}/${finish.key}.${ext}`;
      if (existsSync(join(process.cwd(), "public", rel))) {
        out.push({ ...finish, src: `/${rel}` });
        break;
      }
    }
  }
  return out;
}
