import { readdirSync } from "node:fs";
import { join } from "node:path";
import { TEAM_PHOTO_BASE } from "./teamPhoto";
import { serviceExtraFiles } from "./serviceExtraPhotos";

// SERVER-ONLY. Do not import from a "use client" component.

const DIR = "trabajos";
const IMAGE_EXT = /\.(png|jpe?g|webp|avif|gif)$/i;

/**
 * Lists every image dropped into /public/trabajos — ANY filename works.
 * Returns public URLs (filename URI-encoded so spaces/accents are safe),
 * sorted by name. Empty array if the folder is missing or empty, so the
 * UI can fall back to placeholders.
 *
 * Two kinds of image live in the same folder but are excluded, because they
 * illustrate a specific page rather than being a "result" for the gallery:
 * the team photo (belongs to "Nosotros" — and a group portrait crops badly
 * into a square tile) and the per-service illustrations.
 */
export function workPhotos(): string[] {
  try {
    return readdirSync(join(process.cwd(), "public", DIR))
      .filter((f) => IMAGE_EXT.test(f))
      .filter((f) => !f.startsWith(`${TEAM_PHOTO_BASE}.`))
      .filter((f) => !serviceExtraFiles.has(f))
      .sort((a, b) => a.localeCompare(b, "es"))
      .map((f) => `/${DIR}/${encodeURIComponent(f)}`);
  } catch {
    return [];
  }
}
