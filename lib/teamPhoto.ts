import { existsSync } from "node:fs";
import { join } from "node:path";
import { imageSize } from "./imageSize";

// SERVER-ONLY. Do not import from a "use client" component.

const DIR = "trabajos";
/** Filename (without extension) of the team photo inside /public/trabajos. */
export const TEAM_PHOTO_BASE = "equipodetrabajo";
const EXTS = ["jpeg", "jpg", "png", "webp", "avif"];

export interface TeamPhoto {
  src: string;
  /** Intrinsic size, so the frame matches the photo instead of cropping it. */
  width: number;
  height: number;
}

/**
 * The team photo — /public/trabajos/equipodetrabajo.* — or undefined if the
 * user hasn't dropped it in yet. Resolved by name (not by folder position) so
 * adding or renaming work photos can never repoint it to a random shot, and
 * measured on disk so replacing it with a different orientation just works.
 */
export function teamPhoto(): TeamPhoto | undefined {
  for (const ext of EXTS) {
    const file = `${TEAM_PHOTO_BASE}.${ext}`;
    const path = join(process.cwd(), "public", DIR, file);
    if (existsSync(path)) {
      const { width, height } = imageSize(path);
      return { src: `/${DIR}/${file}`, width, height };
    }
  }
  return undefined;
}
