import { existsSync } from "node:fs";
import { join } from "node:path";

// SERVER-ONLY. Do not import from a "use client" component.

const EXTS = ["png", "jpg", "jpeg", "webp"] as const;

/**
 * Returns the public URL of a product's real photo, by convention:
 *   public/products/<slug>.(png|jpg|jpeg|webp)
 *
 * If no such file exists yet, returns undefined so the UI keeps the gradient
 * placeholder — this lets photos be dropped into /public/products over time
 * without any code changes and without ever showing a broken image.
 */
export function productPhoto(slug: string): string | undefined {
  for (const ext of EXTS) {
    const rel = `products/${slug}.${ext}`;
    if (existsSync(join(process.cwd(), "public", rel))) return `/${rel}`;
  }
  return undefined;
}
