import { existsSync } from "node:fs";
import { join } from "node:path";

// SERVER-ONLY. Do not import from a "use client" component.

const DIR = "trabajos";
/** Filename (without extension) of the team photo inside /public/trabajos. */
export const TEAM_PHOTO_BASE = "equipodetrabajo";
const EXTS = ["jpeg", "jpg", "png", "webp", "avif"];

/**
 * The team photo — /public/trabajos/equipodetrabajo.* — or undefined if the
 * user hasn't dropped it in yet. Resolved by name (not by folder position) so
 * adding or renaming work photos can never repoint it to a random shot.
 */
export function teamPhoto(): string | undefined {
  for (const ext of EXTS) {
    const file = `${TEAM_PHOTO_BASE}.${ext}`;
    if (existsSync(join(process.cwd(), "public", DIR, file))) {
      return `/${DIR}/${file}`;
    }
  }
  return undefined;
}
