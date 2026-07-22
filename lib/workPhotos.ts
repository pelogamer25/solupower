import { readdirSync } from "node:fs";
import { join } from "node:path";

// SERVER-ONLY. Do not import from a "use client" component.

const DIR = "trabajos";
const IMAGE_EXT = /\.(png|jpe?g|webp|avif|gif)$/i;

/**
 * Lists every image dropped into /public/trabajos — ANY filename works.
 * Returns public URLs (filename URI-encoded so spaces/accents are safe),
 * sorted by name. Empty array if the folder is missing or empty, so the
 * UI can fall back to placeholders.
 */
export function workPhotos(): string[] {
  try {
    return readdirSync(join(process.cwd(), "public", DIR))
      .filter((f) => IMAGE_EXT.test(f))
      .sort((a, b) => a.localeCompare(b, "es"))
      .map((f) => `/${DIR}/${encodeURIComponent(f)}`);
  } catch {
    return [];
  }
}
