import {
  Wrench,
  Package,
  Cog,
  ShieldCheck,
  Layers,
  Sparkles,
  PaintRoller,
  Building2,
} from "lucide-react";
import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "venta-de-maquinaria",
    title: "Suministro de equipos",
    excerpt: "Equipos de limpieza profesional e industrial para tu operación.",
    description:
      "Suministro de equipos de limpieza profesional e industrial: brilladoras para lavado, pulido y fregado; aspiradoras para sólidos y líquidos; hidrolavadoras de agua fría y caliente; fregadoras (scrubbers) y robots de limpieza autónomos e inteligentes.",
    icon: Package,
    features: [
      "Brilladoras: lavado, pulido y fregado",
      "Aspiradoras para sólidos y líquidos",
      "Hidrolavadoras de agua fría y caliente",
      "Fregadoras (scrubbers) y robots autónomos",
    ],
    accent: "blue",
  },
  {
    slug: "alquiler",
    title: "Renting de equipos",
    excerpt: "Alquiler de equipos de limpieza para trabajo pesado, por el tiempo que lo necesitas.",
    description:
      "Renting (alquiler) de equipos de limpieza: fregadoras de piso para trabajo pesado que realizan tres procesos en uno; hidrolavadoras de agua fría y caliente de alta presión; brilladoras con platos de 17″ y 20″ que pulen, brillan y lavan; aspiradoras profesionales e industriales de uno, dos y tres motores para agua y polvo; y destroncadora para desbastar, nivelar, rebajar, pulir y brillar sobre concreto, granito y terrazo.",
    icon: Package,
    features: [
      "Brilladoras con platos de 17″ y 20″",
      "Aspiradoras de 1, 2 y 3 motores (agua y polvo)",
      "Hidrolavadoras de agua fría y caliente",
      "Destroncadora para concreto, granito y terrazo",
    ],
    accent: "teal",
  },
  {
    slug: "servicio-tecnico",
    title: "Servicio técnico especializado",
    excerpt: "Centro de diagnóstico y reparación para equipos de limpieza.",
    description:
      "Centro de diagnóstico y reparación con atención personalizada y tiempos de respuesta acordes a su necesidad, minimizando el impacto en su operación. Reparación y mantenimiento de aspiradoras, brilladoras, hidrolavadoras y equipos de limpieza industrial.",
    icon: Wrench,
    features: [
      "Mano de obra calificada",
      "Mantenimientos preventivos y correctivos",
      "Stock de repuestos y consumibles",
      "Planes de contratación anual",
    ],
    accent: "cyan",
  },
  {
    slug: "mantenimiento-industrial",
    title: "Mantenimiento de equipos",
    excerpt: "Preventivos y correctivos que evitan paradas y optimizan costos.",
    description:
      "Mantenimientos preventivos y correctivos para equipos de limpieza, con mano de obra calificada y stock de repuestos y consumibles. Planes de contratación anual para optimizar costos y mantenimientos periódicos.",
    icon: Cog,
    features: ["Preventivos y correctivos", "Stock de repuestos y consumibles", "Planes de contratación anual"],
    accent: "green",
  },
  {
    slug: "restauracion-de-pisos",
    title: "Mantenimiento de pisos y superficies",
    excerpt: "Cristalizado, abrillantado y pulido diamantado para toda clase de superficies.",
    description:
      "Mantenimiento de pisos y toda clase de superficies: cristalizado de mármol, granito y concreto; abrillantado natural y efecto espejo; pulido y diamantado de mármol, granito, concreto y baldosas; y servicios especializados como proceso hidrófugo, resane y fraguado de juntas y recuperación de superficies.",
    icon: Layers,
    features: [
      "Cristalizado (mármol, granito, concreto)",
      "Abrillantado natural y efecto espejo",
      "Pulido y diamantado",
      "Hidrófugo, resane y recuperación de superficies",
    ],
    accent: "blue",
  },
  {
    slug: "limpieza-especializada",
    title: "Limpieza y desinfección",
    excerpt: "Lavado y desinfección de alfombras, mobiliario y pisos.",
    description:
      "Lavado y desinfección de alfombras con lavado profundo en proceso semihúmedo, extracción de agentes contaminantes, eliminación de manchas y recuperación de fibras; lavado profesional de sillas, muebles y colchones mediante equipos de inyección y extracción; y lavado profundo y desmanche de pisos duros como piedra, concreto, terrazo y otras superficies de alto tráfico.",
    icon: Sparkles,
    features: [
      "Alfombras: proceso semihúmedo que protege la fibra",
      "Mobiliario: sillas, muebles y colchones",
      "Pisos de piedra, concreto y terrazo",
      "Insumos altamente eficientes",
    ],
    accent: "teal",
  },
  {
    slug: "pintura-epoxica",
    title: "Pintura epóxica y demarcaciones",
    excerpt: "Recubrimientos y demarcaciones de alta resistencia para pisos de concreto.",
    description:
      "Aplicación de pintura epóxica y demarcaciones: pulido de concreto con discos especializados y acabado liso para terminación de pintura. Mantenimiento de pisos de concreto con pulido de discos híbridos, resinas metálicas, sellado e hidrófugo.",
    icon: PaintRoller,
    features: [
      "Pulido de concreto con discos especializados",
      "Acabado liso para terminación de pintura",
      "Resinas metálicas y sellado",
      "Proceso hidrófugo",
    ],
    accent: "cyan",
  },
  {
    slug: "mantenimientos-locativos",
    title: "Mantenimientos locativos",
    excerpt: "Reformas y acabados para conservar tus instalaciones.",
    description:
      "Servicios de mantenimiento locativo para conservar tus instalaciones en óptimas condiciones: reformas en drywall, estuco, pintura y cubiertas.",
    icon: Building2,
    features: ["Reformas en drywall", "Estuco y pintura", "Cubiertas"],
    accent: "green",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
