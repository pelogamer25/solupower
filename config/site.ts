export const siteConfig = {
  name: "SOLUPOWER",
  legalName: "Soluciones Industriales RM S.A.S.",
  shortDesc:
    "Venta, alquiler y mantenimiento especializado de equipos de limpieza industrial.",
  // Full description (for the About/Organization context — can be long).
  description:
    "SOLUPOWER (Soluciones Industriales RM S.A.S.) — venta, alquiler y servicio técnico de equipos de limpieza industrial: hidrolavadoras, brilladoras, aspiradoras, scrubbers y más. Ingeniería, precisión y excelencia.",
  // SEO meta description (≤155 chars, avoids SERP truncation).
  metaDescription:
    "Venta, alquiler y servicio técnico de equipos de limpieza industrial en Bogotá y Colombia: hidrolavadoras, brilladoras, scrubbers y más.",
  url: "https://www.solupower.co",
  locale: "es_CO",
  themeColor: "#F5F7FA",
  // TODO: confirmar datos reales de negocio (afectan SEO local / LocalBusiness schema).
  geo: { latitude: 4.711, longitude: -74.0721 },
  areaServed: ["Bogotá", "Cundinamarca", "Colombia"],
  priceRange: "$$",
  openingHours: [
    "Mo-Fr 08:00-18:00",
    "Sa 08:00-13:00",
  ],
  foundingYear: "2014",
  keywords: [
    "limpieza industrial",
    "equipos industriales",
    "hidrolavadoras industriales",
    "brilladoras industriales",
    "aspiradoras industriales",
    "mantenimiento industrial",
    "restauración de pisos",
    "servicio técnico maquinaria",
    "alquiler maquinaria industrial",
    "pintura epóxica",
  ],
  contact: {
    phone: "+57 300 000 0000",
    phoneHref: "tel:+573000000000",
    whatsapp: "https://wa.me/573000000000",
    email: "contacto@solupower.co",
    address: "Bogotá D.C., Colombia",
  },
  social: {
    instagram: "https://instagram.com/solupower",
    facebook: "https://facebook.com/solupower",
    linkedin: "https://linkedin.com/company/solupower",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Primary navigation — every route is reachable, no orphan pages. */
export const navLinks = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Productos", href: "/productos" },
  { label: "Casos de éxito", href: "/casos-de-exito" },
  { label: "Galería", href: "/galeria" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const footerNav = {
  Empresa: [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Casos de éxito", href: "/casos-de-exito" },
    { label: "Clientes", href: "/clientes" },
    { label: "Blog", href: "/blog" },
  ],
  Soluciones: [
    { label: "Servicios", href: "/servicios" },
    { label: "Productos", href: "/productos" },
    { label: "Galería", href: "/galeria" },
    { label: "Cotización", href: "/cotizacion" },
  ],
  Legal: [
    { label: "Política de privacidad", href: "/privacidad" },
    { label: "Términos y condiciones", href: "/terminos" },
    { label: "Contacto", href: "/contacto" },
  ],
} as const;
