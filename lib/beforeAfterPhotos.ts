import { existsSync } from "node:fs";
import { join } from "node:path";

// SERVER-ONLY. Do not import from a "use client" component.

const DIR = "antes-despues";
const EXTS = ["png", "jpg", "jpeg", "webp"] as const;

function find(name: string): string | undefined {
  for (const ext of EXTS) {
    const rel = `${DIR}/${name}.${ext}`;
    if (existsSync(join(process.cwd(), "public", rel)))
      return `/${DIR}/${encodeURIComponent(`${name}.${ext}`)}`;
  }
  return undefined;
}

/**
 * Photos for the homepage before/after slider, by convention:
 *   public/antes-despues/antes.(png|jpg|jpeg|webp)
 *   public/antes-despues/despues.(png|jpg|jpeg|webp)  (accented "después" also works)
 * Missing files → undefined → the slider keeps its gradient placeholder.
 */
export function beforeAfterPhotos() {
  return {
    antes: find("antes") ?? find("antés") ?? undefined,
    despues: find("despues") ?? find("después") ?? undefined,
  };
}
