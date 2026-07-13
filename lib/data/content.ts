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
      "Operamos en Bogotá y a nivel nacional. Escríbenos por WhatsApp o el formulario y coordinamos la atención en tu ubicación.",
  },
  {
    question: "¿Cómo solicito una cotización?",
    answer:
      "Puedes usar el botón “Solicitar cotización”, escribirnos por WhatsApp o completar el formulario de contacto. Respondemos en el menor tiempo posible.",
  },
];

export const stats: Stat[] = [
  { value: "+12", label: "Años de experiencia" },
  { value: "+500", label: "Proyectos ejecutados" },
  { value: "+150", label: "Clientes industriales" },
  { value: "24/7", label: "Soporte técnico" },
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

export const caseStudies: CaseStudy[] = [
  {
    slug: "planta-logistica-alto-transito",
    client: "Centro logístico nacional",
    sector: "Logística",
    title: "Restauración de 8.000 m² de piso en operación continua",
    summary:
      "Recuperamos un piso de concreto de alto tránsito con desbaste, pulido y sellado, sin detener la operación del centro de distribución.",
    metric: "8.000 m² recuperados",
  },
  {
    slug: "planta-alimentos-mantenimiento",
    client: "Planta de alimentos",
    sector: "Manufactura",
    title: "Plan de mantenimiento preventivo para flota de scrubbers",
    summary:
      "Implementamos un cronograma preventivo que redujo drásticamente las paradas por falla y extendió la vida útil de los equipos.",
    metric: "-60% de paradas",
  },
  {
    slug: "parqueadero-pintura-epoxica",
    client: "Complejo corporativo",
    sector: "Inmobiliario",
    title: "Recubrimiento epóxico en parqueadero de 5 niveles",
    summary:
      "Aplicamos un sistema epóxico de alta resistencia con demarcación de seguridad, elevando durabilidad y estética del espacio.",
    metric: "5 niveles intervenidos",
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
  "Grupo Andino",
  "LogiCorp",
  "Alimentos del Valle",
  "MetroPlaza",
  "Constructora Sur",
  "IndustriaTech",
  "Puerto Central",
  "RetailMax",
];

export const galleryItems = [
  { title: "Pulido de acabado espejo", tag: "Restauración", ratio: "tall" },
  { title: "Hidrolavado de fachada", tag: "Limpieza", ratio: "wide" },
  { title: "Recubrimiento epóxico", tag: "Pintura", ratio: "square" },
  { title: "Scrubber en bodega", tag: "Equipos", ratio: "wide" },
  { title: "Mantenimiento de flota", tag: "Servicio técnico", ratio: "square" },
  { title: "Desbaste de concreto", tag: "Preparación", ratio: "tall" },
] as const;
