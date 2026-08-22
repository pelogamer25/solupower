import { existsSync, openSync, readSync, closeSync, statSync } from "node:fs";
import { join } from "node:path";

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

/** Fallback used when the header can't be parsed (e.g. AVIF). */
const FALLBACK = { width: 4, height: 3 };

/**
 * Reads intrinsic dimensions straight from the file header (JPEG/PNG/WebP).
 * Done by hand rather than with sharp: sharp is only a transitive dependency
 * here, so importing it in app code would be fragile.
 */
function imageSize(path: string): { width: number; height: number } {
  let fd: number | undefined;
  try {
    const size = Math.min(statSync(path).size, 512 * 1024);
    const buf = Buffer.alloc(size);
    fd = openSync(path, "r");
    readSync(fd, buf, 0, size, 0);

    // PNG: IHDR width/height at bytes 16..24
    if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }

    // WebP: "RIFF"…"WEBP"
    if (buf.length > 30 && buf.toString("latin1", 0, 4) === "RIFF" && buf.toString("latin1", 8, 12) === "WEBP") {
      const fmt = buf.toString("latin1", 12, 16);
      if (fmt === "VP8X") {
        return {
          width: 1 + buf.readUIntLE(24, 3),
          height: 1 + buf.readUIntLE(27, 3),
        };
      }
      if (fmt === "VP8 ") {
        return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
      }
    }

    // JPEG: walk the markers to the SOFn frame header
    if (buf.length > 4 && buf.readUInt16BE(0) === 0xffd8) {
      let i = 2;
      while (i + 9 < buf.length) {
        if (buf[i] !== 0xff) {
          i++;
          continue;
        }
        const marker = buf[i + 1];
        // SOF0..SOF15, excluding DHT (c4), JPG (c8) and DAC (cc)
        if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
          return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
        }
        i += 2 + buf.readUInt16BE(i + 2);
      }
    }
  } catch {
    /* fall through */
  } finally {
    if (fd !== undefined) closeSync(fd);
  }
  return FALLBACK;
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
