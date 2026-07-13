import type { Product } from "@/types";

export const productCategories = [
  "Brilladoras",
  "Hidrolavadoras",
  "Aspiradoras",
  "Scrubbers",
  "Robots",
  "Desbastadoras",
] as const;

// NOTE: `priceFrom` values are ILLUSTRATIVE placeholders (COP) so the Offer/price
// mechanism works end to end. Replace with real pricing before launch.
export const products: Product[] = [
  {
    slug: "brilladoras-industriales",
    name: "Brilladoras industriales",
    category: "Brilladoras",
    excerpt: "Brillo profesional y uniforme en pisos de alto tránsito.",
    description:
      "Brilladoras de alta velocidad diseñadas para dar acabado espejo a grandes superficies con mínimo esfuerzo operativo. Motor robusto, bajo consumo y ergonomía superior.",
    specs: [
      { label: "Velocidad", value: "Hasta 1500 RPM" },
      { label: "Ancho de trabajo", value: '20" – 27"' },
      { label: "Voltaje", value: "110V / 220V" },
      { label: "Aplicación", value: "Alto tránsito" },
    ],
    accent: "blue",
    priceFrom: 1200000,
    imageIndex: 6,
  },
  {
    slug: "hidrolavadoras-industriales",
    name: "Hidrolavadoras industriales",
    category: "Hidrolavadoras",
    excerpt: "Presión de trabajo intensa para las tareas más exigentes.",
    description:
      "Hidrolavadoras de agua fría y caliente para remover grasa, cemento y suciedad incrustada. Alta presión, caudal constante y componentes de grado industrial.",
    specs: [
      { label: "Presión", value: "Hasta 3000 PSI" },
      { label: "Caudal", value: "Hasta 15 L/min" },
      { label: "Temperatura", value: "Agua fría / caliente" },
      { label: "Uso", value: "Servicio pesado" },
    ],
    accent: "cyan",
    priceFrom: 1800000,
    imageIndex: 14,
  },
  {
    slug: "aspiradoras-industriales",
    name: "Aspiradoras industriales",
    category: "Aspiradoras",
    excerpt: "Succión potente para sólidos y líquidos en entornos exigentes.",
    description:
      "Aspiradoras de gran capacidad para polvo, líquidos y residuos industriales. Filtración eficiente, tanque de alta resistencia y operación continua.",
    specs: [
      { label: "Capacidad", value: "30 – 80 L" },
      { label: "Succión", value: "Sólidos y líquidos" },
      { label: "Filtración", value: "Multi-etapa" },
      { label: "Motor", value: "Servicio continuo" },
    ],
    accent: "teal",
    priceFrom: 900000,
    imageIndex: 22,
  },
  {
    slug: "scrubbers",
    name: "Scrubbers (Fregadoras)",
    category: "Scrubbers",
    excerpt: "Lavado y secado en una sola pasada, más productividad.",
    description:
      "Fregadoras que lavan, restriegan y secan el piso en un solo movimiento. Ideales para bodegas, supermercados y plantas con grandes áreas.",
    specs: [
      { label: "Rendimiento", value: "Hasta 3000 m²/h" },
      { label: "Tipo", value: "Hombre a bordo / acompañante" },
      { label: "Autonomía", value: "Batería / cable" },
      { label: "Secado", value: "Inmediato" },
    ],
    accent: "blue",
    priceFrom: 6000000,
    imageIndex: 30,
  },
  {
    slug: "robots-de-limpieza",
    name: "Robots de limpieza",
    category: "Robots",
    excerpt: "Automatización inteligente para operaciones 24/7.",
    description:
      "Robots autónomos de limpieza con navegación inteligente y mapeo del espacio. Reducen costos operativos y garantizan consistencia sin supervisión constante.",
    specs: [
      { label: "Navegación", value: "Autónoma / mapeo" },
      { label: "Operación", value: "24/7" },
      { label: "Control", value: "App y programación" },
      { label: "Seguridad", value: "Sensores anticolisión" },
    ],
    accent: "green",
    priceFrom: 12000000,
    imageIndex: 36,
  },
  {
    slug: "desbastadoras",
    name: "Desbastadoras",
    category: "Desbastadoras",
    excerpt: "Preparación y nivelación de superficies de concreto.",
    description:
      "Desbastadoras y pulidoras de concreto para preparación de superficies, remoción de recubrimientos y acabados pulidos de alta resistencia.",
    specs: [
      { label: "Discos", value: "Diamante intercambiable" },
      { label: "Ancho", value: '10" – 24"' },
      { label: "Aplicación", value: "Concreto pulido" },
      { label: "Aspiración", value: "Compatible" },
    ],
    accent: "cyan",
    priceFrom: 3500000,
    imageIndex: 2,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

/** Formats a COP amount as "$1.800.000". */
export function formatCOP(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}
