/**
 * Equipment available for rent, shown in the auto-advancing carousel on
 * /servicios/alquiler.
 *
 * Pure data — no filesystem access — because the carousel is a client
 * component. Photos are resolved on the server by lib/rentalPhoto.ts, which
 * prefers /public/alquiler/<key>.<ext> and falls back to `fallbackPhoto`.
 */
export interface RentalEquipment {
  /** Filename (without extension) to look for in /public/alquiler. */
  key: string;
  name: string;
  /** One short line — what it does and what it's for. */
  description: string;
  /** Catalog photo used until a dedicated rental photo is dropped in. */
  fallbackPhoto: string;
  /** Category page this equipment belongs to. */
  href: string;
}

export const rentalEquipment: RentalEquipment[] = [
  {
    key: "fregadoras",
    name: "Fregadoras de piso",
    description:
      "Trabajo pesado con tres procesos en uno: lavan, friegan y secan en una sola pasada.",
    fallbackPhoto: "/products/fregadora-hombre-a-pie.png",
    href: "/productos/categoria/scrubbers",
  },
  {
    key: "hidrolavadoras",
    name: "Hidrolavadoras",
    description:
      "Agua fría y caliente de alta presión para desengrase y limpieza profunda.",
    fallbackPhoto: "/products/hidrolavadora-industrial-1900-psi.png",
    href: "/productos/categoria/hidrolavadoras",
  },
  {
    key: "brilladoras",
    name: "Brilladoras",
    description:
      "Platos de 17″ y 20″ que pulen, brillan y lavan todo tipo de superficies.",
    fallbackPhoto: "/products/brilladora-industrial-17.png",
    href: "/productos/categoria/brilladoras",
  },
  {
    key: "aspiradoras",
    name: "Aspiradoras",
    description:
      "Profesionales e industriales de uno, dos y tres motores, para agua y polvo.",
    fallbackPhoto: "/products/aspiradoras-industriales.jpg",
    href: "/productos/categoria/aspiradoras",
  },
];
