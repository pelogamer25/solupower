import { existsSync } from "node:fs";
import { join } from "node:path";
import { rentalEquipment, type RentalEquipment } from "./data/rentalEquipment";

// SERVER-ONLY. Do not import from a "use client" component.

const DIR = "alquiler";
const EXTS = ["png", "jpg", "jpeg", "webp"] as const;

export interface ResolvedRentalEquipment extends RentalEquipment {
  /** Resolved public URL of the photo to show. */
  photo: string;
}

/**
 * Rental equipment with its photo resolved by convention:
 *   public/alquiler/<key>.(png|jpg|jpeg|webp)
 *
 * Drop a file named after the key (fregadoras, hidrolavadoras, brilladoras,
 * aspiradoras) and the carousel picks it up with no code change. Until then it
 * keeps showing the catalog photo, so the section is never broken or empty.
 */
export function rentalEquipmentWithPhotos(): ResolvedRentalEquipment[] {
  return rentalEquipment.map((item) => {
    for (const ext of EXTS) {
      const rel = `${DIR}/${item.key}.${ext}`;
      if (existsSync(join(process.cwd(), "public", rel))) {
        return { ...item, photo: `/${rel}` };
      }
    }
    return { ...item, photo: item.fallbackPhoto };
  });
}
