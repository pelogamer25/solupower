import { Disc3, Droplets, Wind, SprayCan, Brush, Sofa, Bot, type LucideIcon } from "lucide-react";
import type { Product } from "@/types";

export const productCategories = [
  "Brilladoras",
  "Hidrolavadoras",
  "Aspiradoras",
  "Scrubbers",
  "Barredoras",
  "Extractoras",
  "Robots",
] as const;

export interface ProductCategory {
  /** URL slug: /productos/categoria/<slug> */
  slug: string;
  /** Must match Product.category exactly. */
  name: (typeof productCategories)[number];
  /** Short SEO description shown on the category card and page intro. */
  tagline: string;
  icon: LucideIcon;
  accent: "blue" | "teal" | "cyan" | "green";
}

/** Category taxonomy — drives the products dropdown, the /productos pillar and the per-type pages. */
export const productCategoryMeta: ProductCategory[] = [
  { slug: "brilladoras", name: "Brilladoras", accent: "blue", icon: Disc3, tagline: "Brilladoras industriales de alta velocidad para pulir y abrillantar pisos de alto tránsito." },
  { slug: "hidrolavadoras", name: "Hidrolavadoras", accent: "cyan", icon: Droplets, tagline: "Hidrolavadoras industriales de agua fría y caliente y alta presión para el lavado más exigente." },
  { slug: "aspiradoras", name: "Aspiradoras", accent: "teal", icon: Wind, tagline: "Aspiradoras profesionales e industriales para sólidos y líquidos, con uno, dos o tres motores." },
  { slug: "scrubbers", name: "Scrubbers", accent: "blue", icon: SprayCan, tagline: "Fregadoras (scrubbers) que lavan, refriegan, aspiran y secan grandes superficies en una sola pasada." },
  { slug: "barredoras", name: "Barredoras", accent: "green", icon: Brush, tagline: "Barredoras industriales de conducción y a batería para grandes áreas y alto tráfico." },
  { slug: "extractoras", name: "Extractoras", accent: "teal", icon: Sofa, tagline: "Extractoras para el lavado profesional de alfombras, muebles y superficies textiles." },
  { slug: "robots", name: "Robots", accent: "green", icon: Bot, tagline: "Robots de limpieza autónomos e inteligentes con control desde app y carga automática." },
];

export function getCategoryMeta(slug: string) {
  return productCategoryMeta.find((c) => c.slug === slug);
}
/** Category slug for a product's category name (for building URLs/breadcrumbs). */
export function categorySlugOf(name: string) {
  return productCategoryMeta.find((c) => c.name === name)?.slug;
}
/** All products of a category, by category slug. */
export function productsInCategory(slug: string) {
  const meta = getCategoryMeta(slug);
  return meta ? products.filter((p) => p.category === meta.name) : [];
}

export const products: Product[] = [
  {
    slug: "aspiradoras-industriales",
    name: "Aspiradoras industriales",
    category: "Aspiradoras",
    excerpt: "Para sólidos y líquidos, con uno, dos o tres motores.",
    description:
      "Aspiradoras profesionales e industriales para sólidos y líquidos, libres de mantenimiento y de uso específico. Disponibles con uno, dos y tres motores para aspirar agua y polvo.",
    specs: [
      { label: "Uso", value: "Profesional e industrial" },
      { label: "Aspiran", value: "Sólidos y líquidos (agua y polvo)" },
      { label: "Motores", value: "1, 2 o 3" },
      { label: "Mantenimiento", value: "Libres de mantenimiento" },
    ],
    accent: "teal",
    imageIndex: 22,
  },
  {
    slug: "scrubbers",
    name: "Fregadoras (Scrubbers)",
    category: "Scrubbers",
    excerpt: "Tres procesos en uno: lavan, refriegan, aspiran y secan.",
    description:
      "Fregadoras (scrubbers) ideales para la limpieza de grandes superficies. Realizan tres procesos en uno: lavan, refriegan, aspiran y secan.",
    specs: [
      { label: "Ideales para", value: "Grandes superficies" },
      { label: "Procesos", value: "3 en 1" },
      { label: "Funciones", value: "Lavan, refriegan, aspiran y secan" },
      { label: "Tipo", value: "Hombre a pie / hombre a bordo" },
    ],
    accent: "blue",
    imageIndex: 30,
  },
  {
    slug: "robots-de-limpieza",
    name: "Robots de limpieza",
    category: "Robots",
    excerpt: "Autónomos e inteligentes, con control desde aplicación móvil.",
    description:
      "Robots de limpieza autónomos e inteligentes: robot aspirador y fregadora autónoma con control mediante aplicación móvil y carga automática, ideal para superficies medianas y grandes; y robot todo en uno para barrido y aspiración en superficies pequeñas.",
    specs: [
      { label: "Tipo", value: "Aspirador y fregadora autónoma" },
      { label: "Control", value: "Aplicación móvil" },
      { label: "Carga", value: "Automática" },
      { label: "Superficies", value: "Pequeñas, medianas y grandes" },
    ],
    accent: "green",
    imageIndex: 36,
  },

  // ---------------------------------------------------------------------------
  // Modelos específicos tomados de la presentación de producto (fichas técnicas).
  // Datos fieles a la ficha: NO se incluyen precios (sin dato en la presentación).
  // ---------------------------------------------------------------------------

  // ----- Brilladoras -----
  {
    slug: "brilladora-industrial-17",
    name: "Brilladora industrial 17",
    category: "Brilladoras",
    excerpt: 'Brilladora monodisco de 17″ para pulido y abrillantado de pisos.',
    description:
      'Brilladora industrial monodisco de 17″ de diámetro de chasis, con motor de 1.500 W y depósito de agua de 15 L. Velocidad de rotación de 175 r/min para pulir y abrillantar pisos de alto tránsito.',
    specs: [
      { label: "Diámetro del chasis", value: '17″' },
      { label: "Potencia", value: "1.500 W" },
      { label: "Voltaje", value: "110 / 220 V" },
      { label: "Frecuencia", value: "60 / 50 Hz" },
      { label: "Velocidad de rotación", value: "175 r/min" },
      { label: "Ruido", value: "60 dB" },
      { label: "Peso", value: "44 kg" },
      { label: "Cable de alimentación", value: "12 m" },
      { label: "Depósito de agua", value: "15 L" },
    ],
    accent: "blue",
    imageIndex: 6,
  },
  {
    slug: "brilladora-industrial-k-20",
    name: "Brilladora industrial K-20",
    category: "Brilladoras",
    excerpt: 'Brilladora monodisco de 20″ para grandes superficies.',
    description:
      'Brilladora industrial K-20 con chasis de 20″ de diámetro, motor de 1.500 W y depósito de agua de 15 L. Velocidad de rotación de 175 r/min, ideal para el abrillantado de grandes superficies.',
    specs: [
      { label: "Diámetro del chasis", value: '20″' },
      { label: "Potencia", value: "1.500 W" },
      { label: "Voltaje", value: "110 / 220 V" },
      { label: "Frecuencia", value: "60 / 50 Hz" },
      { label: "Velocidad de rotación", value: "175 r/min" },
      { label: "Ruido", value: "60 dB" },
      { label: "Peso", value: "44 kg" },
      { label: "Cable de alimentación", value: "12 m" },
      { label: "Depósito de agua", value: "15 L" },
    ],
    accent: "blue",
    imageIndex: 7,
  },

  // ----- Fregadoras / Scrubbers -----
  {
    slug: "fregadora-hombre-a-pie",
    name: "Fregadora hombre a pie",
    category: "Scrubbers",
    excerpt: "Fregadora de conducción a pie con doble cepillo y aspiración de 3 etapas.",
    description:
      "Fregadora automática de conducción a pie (hombre a pie) con doble cepillo de 280 mm, tracción propia y sistema de aspiración de 3 etapas para lavar y secar en una sola pasada. Ancho de fregado de 650 mm y alimentación a 24 V.",
    specs: [
      { label: "Ancho de fregado", value: "650 mm" },
      { label: "Diámetro cepillos", value: "2 × 280 mm" },
      { label: "Rpm cepillos", value: "140 rpm" },
      { label: "Presión cepillos", value: "30 kg" },
      { label: "Motor cepillos", value: "2 × 200 W" },
      { label: "Motor de aspiración", value: "490 W (3 etapas)" },
      { label: "Depresión aspirador", value: "1590 mm H₂O" },
      { label: "Motor de tracción", value: "200 W" },
      { label: "Tensión", value: "24 V" },
      { label: "Potencia total", value: "1090 W" },
      { label: "Cargador de batería", value: "15 A/h" },
    ],
    accent: "teal",
    imageIndex: 30,
  },
  {
    slug: "grande-brio-ride-on-75-650-ecoray",
    name: "Grande Brio Ride on 75 – 650 Ecoray",
    category: "Scrubbers",
    excerpt: "Fregadora hombre a bordo con sistema Ecoray para grandes áreas.",
    description:
      "Fregadora Grande Brio Ride on 75 – 650 Ecoray, excelente para limpiar grandes áreas: aumenta la productividad y la limpieza y reduce el esfuerzo de trabajo. Incorpora el sistema Ecoray con fuente UV de larga vida y 750 mm de ancho de fregado.",
    specs: [
      { label: "Ancho de fregado", value: "750 mm" },
      { label: "Sistema Ecoray", value: "100 microW/mm²" },
      { label: "Vida fuente UV", value: "9000 h" },
      { label: "Diámetro cepillos", value: "4 × 180 mm" },
      { label: "Rpm cepillos", value: "190 rpm" },
      { label: "Presión cepillos", value: "28 kg" },
      { label: "Motor cepillos", value: "4 × 100 W" },
      { label: "Motor de aspiración", value: "490 W (3 etapas)" },
      { label: "Depresión aspirador", value: "1590 mm H₂O" },
      { label: "Motor de tracción", value: "700 W (frontal)" },
      { label: "Tensión", value: "24 V" },
    ],
    accent: "teal",
    imageIndex: 31,
  },
  {
    slug: "grande-brio-ride-on-145-1000-plus",
    name: "Grande Brio Ride on 145-1000 Plus",
    category: "Scrubbers",
    excerpt: "Fregadora hombre a bordo de gran formato, 1100 mm de ancho de fregado.",
    description:
      "Las fregadoras de hombre a bordo son excelentes para limpiar grandes áreas: aumentan la productividad y la limpieza y reducen el esfuerzo de trabajo. La Grande Brio Ride on 145-1000 Plus ofrece 1100 mm de ancho de fregado para las operaciones más exigentes.",
    specs: [
      { label: "Ancho de fregado", value: "1100 mm" },
      { label: "Diámetro cepillos", value: "2 × 525 mm" },
      { label: "Rpm cepillos", value: "190 rpm" },
      { label: "Presión cepillos", value: "0–60 kg" },
      { label: "Motor cepillos", value: "2 × 650 W" },
      { label: "Motor de aspiración", value: "490 W (3 etapas)" },
      { label: "Depresión aspirador", value: "1590 mm H₂O" },
      { label: "Motor de tracción", value: "900 W (frontal)" },
      { label: "Tensión", value: "24 V" },
      { label: "Potencia total", value: "2690 W" },
      { label: "Cargador de batería", value: "25 A/h" },
    ],
    accent: "teal",
    imageIndex: 32,
  },

  // ----- Barredoras -----
  {
    slug: "barredora-u-200",
    name: "Barredora U 200",
    category: "Barredoras",
    excerpt: "Barredora industrial de conducción con 2.100 mm de ancho de limpieza.",
    description:
      "Barredora industrial hombre a bordo con 2.100 mm de ancho de limpieza, cubo de basura y depósito de agua de 200 L y baterías de plomo ácido de 48 V. Diseñada para grandes superficies con 8–10 h de autonomía.",
    specs: [
      { label: "Ancho de limpieza", value: "2.100 mm" },
      { label: "Cepillo principal", value: "785 mm" },
      { label: "Cepillo lateral", value: "90.4 mm" },
      { label: "Autonomía", value: "8–10 h" },
      { label: "Cubo de basura", value: "200 L" },
      { label: "Depósito de agua", value: "200 L" },
      { label: "Baterías", value: "48 V / 150 Ah (plomo ácido)" },
      { label: "Motor cepillo principal", value: "800 W" },
      { label: "Motor cepillo lateral", value: "90.4 W" },
      { label: "Motor de aspiración", value: "500.2 W" },
      { label: "Motor de desplazamiento", value: "1.800 W" },
      { label: "Peso neto", value: "689 kg" },
      { label: "Peso bruto", value: "990 kg" },
      { label: "Tamaño", value: "2.630 × 2.050 × 2.550 mm" },
    ],
    accent: "green",
    imageIndex: 12,
  },
  {
    slug: "barredora-u-190",
    name: "Barredora U 190",
    category: "Barredoras",
    excerpt: "Barredora industrial de 1.900 mm con eficiencia de hasta 16.800 m²/h.",
    description:
      "Barredora industrial hombre a bordo con 1.900 mm de ancho de limpieza y una eficiencia teórica de hasta 16.800 m²/h. Cuenta con tolva de desechos de 180 L, tanque de agua de 80 L y baterías de 48 V.",
    specs: [
      { label: "Ancho de limpieza", value: "1.900 mm" },
      { label: "Cepillo rodante", value: "700 mm" },
      { label: "Cepillo lateral", value: "500.4 mm" },
      { label: "Autonomía", value: "8–10 h" },
      { label: "Funcionamiento continuo", value: "4–5 h" },
      { label: "Eficiencia de limpieza", value: "16.800 m²/h" },
      { label: "Batería", value: "48 V / 100 Ah" },
      { label: "Motor de aspiración", value: "500 W" },
      { label: "Motor cepillo rodante", value: "800 W" },
      { label: "Motor cepillo lateral", value: "80.4 W" },
      { label: "Motor impulsor", value: "1.200 W" },
      { label: "Tolva de desechos", value: "180 L" },
      { label: "Tanque de agua", value: "80 L" },
      { label: "Peso total", value: "780 kg" },
      { label: "Tamaño", value: "2.330 × 1.900 × 1.960 mm" },
    ],
    accent: "green",
    imageIndex: 13,
  },
  {
    slug: "barredora-u90",
    name: "Barredora U90",
    category: "Barredoras",
    excerpt: "Barredora manual compacta de 920 mm con doble cepillo lateral.",
    description:
      "Barredora compacta de empuje manual con 920 mm de ancho de limpieza y doble cepillo lateral. Cubo de basura de 55 L y solo 23 kg de peso, ideal para espacios medianos. Velocidad máxima de 8 km/h.",
    specs: [
      { label: "Ancho de limpieza", value: "920 mm" },
      { label: "Cepillo principal", value: "480 mm" },
      { label: "Cepillo lateral", value: "350 × 2 mm" },
      { label: "Autonomía", value: "8–10 h" },
      { label: "Velocidad máxima", value: "8 km/h" },
      { label: "Cubo de basura", value: "55 L" },
      { label: "Peso", value: "23 kg" },
      { label: "Tamaño", value: "1.300 × 920 × 1.035 mm" },
    ],
    accent: "green",
    imageIndex: 14,
  },
  {
    slug: "durasweep-70bt",
    name: "Durasweep 70BT",
    category: "Barredoras",
    excerpt: "Barredora a batería con tracción eléctrica y 710 mm de ancho de barrido.",
    description:
      "Barredora Durasweep 70BT con alimentación a batería de 12 V y tracción eléctrica. Ancho de barrido central de 710 mm (880 mm con cepillo lateral), filtro de panel horizontal de 2 m² y emisiones sonoras de 62,5 dB(A).",
    specs: [
      { label: "Alimentación", value: "Batería 12 V" },
      { label: "Tracción", value: "Eléctrica" },
      { label: "Ancho de barrido central", value: "710 mm" },
      { label: "Ancho con cepillo lateral", value: "880 mm" },
      { label: "Potencia total", value: "400 W" },
      { label: "Pendiente máxima", value: "2 %" },
      { label: "Cargador de batería", value: "12 A/h" },
      { label: "Capacidad batería máx.", value: "185 Ah/5" },
      { label: "Compartimiento baterías", value: "377 × 244 × 280 mm" },
      { label: "Superficie de filtro", value: "2 m²" },
      { label: "Tipo de filtro", value: "Panel horizontal" },
      { label: "Agitador de filtro", value: "Manual" },
      { label: "Emisiones sonoras", value: "62,5 dB(A)" },
      { label: "Dimensiones", value: "1.260 × 830 × 850 mm" },
      { label: "Peso sin baterías", value: "120 kg" },
      { label: "Peso con batería", value: "158,50 kg" },
      { label: "Embalaje", value: "1.180 × 900 × 960 mm" },
    ],
    accent: "green",
    imageIndex: 15,
  },

  // ----- Hidrolavadoras -----
  {
    slug: "hidrolavadora-blitz",
    name: "Hidrolavadora Blitz",
    category: "Hidrolavadoras",
    excerpt: "Hidrolavadora Annovi Reverberi Blitz, hasta 1.800 PSI regulables.",
    description:
      "Hidrolavadora Blitz con motor Annovi Reverberi y bomba Interpump. Presión de trabajo regulable de 1.500 a 1.800 PSI (130 bar), caudal de 8 L/min y 3,5 HP de potencia. Incluye pistola, regulador de presión, manómetro y manguera de alta presión de 8 m.",
    specs: [
      { label: "Motor", value: "Annovi Reverberi" },
      { label: "Bomba", value: "Interpump" },
      { label: "Presión de trabajo", value: "1.500–1.800 PSI (regulable)" },
      { label: "Caudal", value: "8 L/min" },
      { label: "Potencia", value: "3,5 HP (2,18 kW)" },
      { label: "Voltaje", value: "110-115 V monofásico" },
      { label: "Amperaje", value: "20 A" },
      { label: "Frecuencia", value: "60 Hz" },
      { label: "RPM", value: "1.750" },
      { label: "Peso", value: "25 kg" },
      { label: "Manguera de alta presión", value: "8 m" },
      { label: "Dimensiones", value: "41 × 23 × 24" },
    ],
    accent: "cyan",
    imageIndex: 16,
  },
  {
    slug: "hidrolavadora-industrial-1900-psi",
    name: "Hidrolavadora Industrial 1900 PSI",
    category: "Hidrolavadoras",
    excerpt: "Hidrolavadora industrial eléctrica de 3 HP, presión continua de 1.900 PSI.",
    description:
      "Hidrolavadora industrial eléctrica de servicio pesado con presión continua de 1.900 PSI y motor de 3 HP a 220 V. Protección térmica, ciclo de trabajo 65% / 35% y hasta 12 horas de operación diaria.",
    specs: [
      { label: "Presión continua", value: "1.900 PSI" },
      { label: "Potencia del motor", value: "3.00 HP" },
      { label: "Tipo de motor", value: "Eléctrico" },
      { label: "Velocidad del motor", value: "1.450 RPM" },
      { label: "Voltaje", value: "220 V" },
      { label: "Corriente máxima", value: "20.00 A" },
      { label: "Protección térmica", value: "Sí" },
      { label: "Encendido", value: "Por interruptor" },
      { label: "Operación máxima", value: "12 h/día" },
      { label: "Ciclo de trabajo", value: "65% / 35%" },
      { label: "Caudal de agua", value: "8.00 lpm" },
      { label: "Dimensiones de empaque", value: "75,5 × 43,5 × 55,5 cm" },
    ],
    accent: "cyan",
    imageIndex: 17,
  },
  {
    slug: "hidrolavadora-annovi-kb-813",
    name: "Hidrolavadora Annovi 1900 PSI KB 813",
    category: "Hidrolavadoras",
    excerpt: "Hidrolavadora Annovi Reverberi KB 813, presión regulable hasta 1.800 PSI.",
    description:
      "Hidrolavadora Annovi 1900 PSI KB 813 con motor Annovi Reverberi y bomba Interpump. Presión de trabajo regulable de 1.500 a 1.800 PSI (130 bar), caudal de 8 L/min y 3,5 HP. Incluye pistola, regulador de presión, manómetro y manguera de alta presión de 8 m.",
    specs: [
      { label: "Motor", value: "Annovi Reverberi" },
      { label: "Bomba", value: "Interpump" },
      { label: "Presión de trabajo", value: "1.500–1.800 PSI (regulable)" },
      { label: "Caudal", value: "8 L/min" },
      { label: "Potencia", value: "3,5 HP (2,18 kW)" },
      { label: "Voltaje", value: "110-115 V monofásico" },
      { label: "Amperaje", value: "20 A" },
      { label: "Frecuencia", value: "60 Hz" },
      { label: "RPM", value: "1.750" },
      { label: "Peso", value: "25 kg" },
      { label: "Manguera de alta presión", value: "8 m" },
      { label: "Dimensiones", value: "41 × 23 × 24" },
    ],
    accent: "cyan",
    imageIndex: 18,
  },

  // ----- Extractoras / lavado de alfombras y muebles -----
  {
    slug: "extractora-jb-175",
    name: "Extractora JB-175",
    category: "Extractoras",
    excerpt: "Extractora húmedo/seco de 35 L para lavado profesional de alfombras y muebles.",
    description:
      "Extractora JB-175 de 35 L con motor único de 1.500 W y función húmedo/seco, parte del kit profesional para lavado de alfombras y muebles. Succión de vacío de 200 mbar, sistema de enfriamiento por reciclado y juego completo de accesorios: boquilla de succión plana, cepillo de vacío para piso, boquilla para piso húmedo, manguera de 40 mm, cepillo redondo grande y tubo de metal.",
    specs: [
      { label: "Capacidad", value: "35 L (motor único)" },
      { label: "Potencia", value: "1.500 W" },
      { label: "Función", value: "Húmedo / seco" },
      { label: "Succión de vacío", value: "200 mbar" },
      { label: "Voltaje", value: "230 V" },
      { label: "Sistema de enfriamiento", value: "Reciclado" },
      { label: "Longitud del cable", value: "5 m" },
      { label: "Tamaño", value: "50,5 × 42,5 × 73 cm" },
    ],
    accent: "teal",
    imageIndex: 22,
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
