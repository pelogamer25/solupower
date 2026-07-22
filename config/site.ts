export const siteConfig = {
  name: "SOLUPOWER",
  legalName: "Soluciones Industriales RM S.A.S.",
  tagline: "Soluciones Industriales Inteligentes",
  shortDesc:
    "Soluciones integrales para la limpieza y el mantenimiento industrial: equipos, insumos, renting y servicio técnico especializado.",
  // Full description (for the About/Organization context — can be long).
  description:
    "SOLUPOWER (Soluciones Industriales RM S.A.S.) es una empresa colombiana especializada en soluciones integrales para la limpieza y el mantenimiento industrial: suministro de equipos de limpieza profesional e industrial, mantenimiento y limpieza de superficies, servicio técnico especializado y renting (alquiler) de equipos.",
  // SEO meta description (≤155 chars, avoids SERP truncation).
  metaDescription:
    "Suministro, renting y servicio técnico de equipos de limpieza industrial en Medellín y Bogotá: brilladoras, hidrolavadoras, fregadoras, aspiradoras y más.",
  url: "https://www.solupower.co",
  locale: "es_CO",
  themeColor: "#F5F7FA",
  // Sede: Calle 20A No. 79–32, Medellín (coordenadas aproximadas del sector).
  geo: { latitude: 6.2442, longitude: -75.5812 },
  areaServed: ["Medellín", "Bogotá", "Colombia"],
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
    phone: "+57 310 788 9380",
    phoneHref: "tel:+573107889380",
    phone2: "+57 311 260 1454",
    phone2Href: "tel:+573112601454",
    whatsapp: "https://wa.me/573107889380",
    email: "Solucionesindustrailes.rm04@gmail.com",
    address: "Calle 20A No. 79–32, Medellín, Colombia",
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
