/**
 * Equipment available for rent, shown in the auto-advancing carousel on
 * /servicios/alquiler. Each entry points at a real photo in /public/products
 * and links to its product category for internal linking.
 */
export interface RentalEquipment {
  name: string;
  /** One short line — what it does and what it's for. */
  description: string;
  /** Real photo in /public/products. */
  photo: string;
  /** Category page this equipment belongs to. */
  href: string;
}

export const rentalEquipment: RentalEquipment[] = [
  {
    name: "Fregadoras de piso",
    description:
      "Trabajo pesado con tres procesos en uno: lavan, friegan y secan en una sola pasada.",
    photo: "/products/fregadora-hombre-a-pie.png",
    href: "/productos/categoria/scrubbers",
  },
  {
    name: "Hidrolavadoras",
    description:
      "Agua fría y caliente de alta presión para desengrase y limpieza profunda.",
    photo: "/products/hidrolavadora-industrial-1900-psi.png",
    href: "/productos/categoria/hidrolavadoras",
  },
  {
    name: "Brilladoras",
    description:
      "Platos de 17″ y 20″ que pulen, brillan y lavan todo tipo de superficies.",
    photo: "/products/brilladora-industrial-17.png",
    href: "/productos/categoria/brilladoras",
  },
  {
    name: "Aspiradoras",
    description:
      "Profesionales e industriales de uno, dos y tres motores, para agua y polvo.",
    photo: "/products/aspiradoras-industriales.jpg",
    href: "/productos/categoria/aspiradoras",
  },
];
