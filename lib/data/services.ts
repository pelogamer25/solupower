import { Wrench, Package, Layers } from "lucide-react";
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
    slug: "restauracion-de-pisos",
    title: "Mantenimiento y limpieza de superficies",
    excerpt: "Cristalizado y pulido de pisos, y lavado profesional de alfombras y mobiliario.",
    description:
      "Mantenimiento de pisos y toda clase de superficies (cristalizado, abrillantado, pulido y diamantado de mármol, granito, concreto y baldosas) junto con limpieza y desinfección profesional de alfombras, mobiliario y pisos: lavado profundo en proceso semihúmedo con equipos de inyección y extracción, eliminación de manchas y recuperación de fibras y superficies.",
    icon: Layers,
    features: [
      "Cristalizado, abrillantado y pulido diamantado",
      "Mármol, granito, concreto y baldosas",
      "Lavado y desinfección de alfombras y mobiliario",
      "Lavado profundo de pisos y superficies de alto tráfico",
    ],
    accent: "blue",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
