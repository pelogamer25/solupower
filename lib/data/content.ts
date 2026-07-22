import { Compass, Target, HandshakeIcon, Gem } from "lucide-react";
import type { ProcessStep, FaqItem, Stat, Value, CaseStudy, Post } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    n: "01",
    title: "Diagnóstico",
    description:
      "Analizamos tu operación, superficies y objetivos para entender exactamente qué necesitas.",
  },
  {
    n: "02",
    title: "Cotización",
    description:
      "Diseñamos una propuesta clara y a la medida, con equipos y alcance definidos sin sorpresas.",
  },
  {
    n: "03",
    title: "Ejecución",
    description:
      "Nuestro equipo técnico implementa la solución con precisión, seguridad y estándares de ingeniería.",
  },
  {
    n: "04",
    title: "Seguimiento",
    description:
      "Acompañamos el resultado con mantenimiento y soporte continuo para garantizar el rendimiento.",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "¿Ofrecen alquiler además de venta?",
    answer:
      "Sí. Puedes adquirir maquinaria o alquilarla por día, semana o proyecto, con entrega, soporte y mantenimiento incluidos según el plan.",
  },
  {
    question: "¿Dan servicio técnico a máquinas de otras marcas?",
    answer:
      "Contamos con técnicos certificados que diagnostican y reparan equipos de cualquier marca, siempre con repuestos originales.",
  },
  {
    question: "¿Trabajan con planes de mantenimiento preventivo?",
    answer:
      "Diseñamos cronogramas de mantenimiento preventivo a la medida de tu planta para reducir fallas y evitar paradas no planificadas.",
  },
  {
    question: "¿En qué zonas prestan servicio?",
    answer:
      "Operamos en Medellín y Bogotá. Escríbenos por WhatsApp o el formulario y coordinamos la atención en tu ubicación.",
  },
  {
    question: "¿Cómo solicito una cotización?",
    answer:
      "Puedes usar el botón “Solicitar cotización”, escribirnos por WhatsApp o completar el formulario de contacto. Respondemos en el menor tiempo posible.",
  },
];

export const stats: Stat[] = [
  { value: "4", label: "Líneas de servicio integrales" },
  { value: "2", label: "Ciudades: Medellín y Bogotá" },
  { value: "+13", label: "Equipos en catálogo" },
  { value: "3 en 1", label: "Fregadoras: lavan, refriegan y secan" },
];

export const values: Value[] = [
  {
    title: "Precisión",
    description: "Ingeniería y método en cada intervención, sin dejar nada al azar.",
    icon: Target,
  },
  {
    title: "Excelencia",
    description: "Estándares altos y consistentes, del primer diagnóstico al último detalle.",
    icon: Gem,
  },
  {
    title: "Compromiso",
    description: "Acompañamos a nuestros clientes a largo plazo, como un socio real.",
    icon: HandshakeIcon,
  },
  {
    title: "Innovación",
    description: "Adoptamos tecnología que hace tu operación más eficiente y sostenible.",
    icon: Compass,
  },
];

// Real lines of work from the SOLUPOWER portfolio (no invented clients or metrics).
export const caseStudies: CaseStudy[] = [
  {
    slug: "recuperacion-de-superficies",
    sector: "Pisos industriales",
    title: "Recuperación de superficies: antes y después",
    summary:
      "Recuperamos superficies deterioradas con pulido de concreto con discos especializados, aplicación de pintura epóxica y demarcaciones, y acabado liso para terminación de pintura.",
    metric: "Antes / Después",
    details: [
      "Pulido de concreto con discos especializados",
      "Aplicación de pintura epóxica y demarcaciones",
      "Acabado liso para terminación de pintura",
      "Mantenimiento de pisos de concreto: discos híbridos, resinas metálicas, sellado e hidrófugo",
    ],
  },
  {
    slug: "cristalizado-y-pulido-de-pisos",
    sector: "Mantenimiento de pisos",
    title: "Cristalizado, abrillantado y pulido diamantado",
    summary:
      "Mantenimiento de pisos y toda clase de superficies: cristalizado de mármol, granito y concreto; abrillantado natural y efecto espejo; y pulido y diamantado, incluidas baldosas.",
    metric: "Efecto espejo",
    details: [
      "Cristalizado de mármol, granito y concreto",
      "Abrillantado natural y efecto espejo",
      "Pulido y diamantado (mármol, granito, concreto y baldosas)",
      "Proceso hidrófugo, resane y fraguado de juntas",
    ],
  },
  {
    slug: "lavado-y-desinfeccion-de-alfombras",
    sector: "Limpieza y desinfección",
    title: "Lavado y desinfección de alfombras y mobiliario",
    summary:
      "Lavado profundo en proceso semihúmedo con equipos de inyección y extracción: eliminación de manchas, extracción de agentes contaminantes y recuperación de fibras. También sillas, muebles y colchones.",
    metric: "Proceso semihúmedo",
    details: [
      "Lavado profundo en proceso semihúmedo",
      "Equipos industriales especializados que protegen la fibra",
      "Eliminación de manchas y extracción de contaminantes",
      "Recuperación de fibras con insumos altamente eficientes",
      "Lavado profesional de sillas, muebles y colchones",
    ],
  },
  {
    slug: "lavado-profundo-de-pisos",
    sector: "Limpieza y desinfección",
    title: "Lavado profundo y desmanche de pisos",
    summary:
      "Lavado industrial de superficies duras como piedra, concreto, terrazo y otras superficies de alto tráfico, con equipos industriales que maximizan la eficiencia del proceso.",
    metric: "Alto tráfico",
    details: [
      "Superficies duras: piedra, concreto y terrazo",
      "Superficies de alto tráfico",
      "Equipos industriales que maximizan la eficiencia",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export const posts: Post[] = [
  {
    slug: "como-restaurar-pisos-industriales",
    title: "Cómo restaurar pisos industriales sin detener tu operación",
    excerpt:
      "Guía práctica sobre desbaste, pulido y sellado de pisos de concreto en entornos de alto tránsito.",
    category: "Restauración",
    date: "2026-05-18",
    readingTime: "6 min",
  },
  {
    slug: "elegir-hidrolavadora-industrial",
    title: "Cómo elegir la hidrolavadora industrial correcta",
    excerpt:
      "Presión, caudal y temperatura: los factores clave para acertar en tu próxima compra.",
    category: "Equipos",
    date: "2026-04-30",
    readingTime: "5 min",
  },
  {
    slug: "mantenimiento-preventivo-maquinaria",
    title: "Mantenimiento preventivo: el ahorro que no se ve",
    excerpt:
      "Por qué un buen plan preventivo reduce costos y evita paradas críticas en tu planta.",
    category: "Mantenimiento",
    date: "2026-03-22",
    readingTime: "4 min",
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export const clients: string[] = [
  "York Luxury Suites by BlueDoors",
  "BMW Autogermana",
  "Marriott Medellín",
  "Estelar",
  "Bimbo",
  "Grupo Eulen",
  "Greater Medellín Convention & Visitors Bureau",
  "JM Martínez",
  "Cinemas Procinal",
  "Bambú",
  "Bodytech",
  "Estelar Milla de Oro",
];

export const galleryItems = [
  { title: "Pulido de acabado espejo", tag: "Restauración", ratio: "tall" },
  { title: "Hidrolavado de fachada", tag: "Limpieza", ratio: "wide" },
  { title: "Recubrimiento epóxico", tag: "Pintura", ratio: "square" },
  { title: "Scrubber en bodega", tag: "Equipos", ratio: "wide" },
  { title: "Mantenimiento de flota", tag: "Servicio técnico", ratio: "square" },
  { title: "Desbaste de concreto", tag: "Preparación", ratio: "tall" },
] as const;
