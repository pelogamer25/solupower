import { Wrench, Package, Layers, Sparkles, Sofa } from "lucide-react";
import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "alquiler",
    title: "Alquiler de equipos",
    excerpt: "Alquiler de equipos de limpieza para trabajo pesado, por el tiempo que lo necesitas.",
    description:
      "Alquiler de equipos de limpieza: fregadoras de piso para trabajo pesado que realizan tres procesos en uno; hidrolavadoras de agua fría y caliente de alta presión; brilladoras con platos de 17″ y 20″ que pulen, brillan y lavan; y aspiradoras profesionales e industriales de uno, dos y tres motores para agua y polvo.",
    icon: Package,
    features: [
      "Brilladoras con platos de 17″ y 20″",
      "Aspiradoras de 1, 2 y 3 motores (agua y polvo)",
      "Hidrolavadoras de agua fría y caliente",
      "Fregadoras de piso para trabajo pesado",
    ],
    accent: "teal",
  },
  {
    slug: "servicio-tecnico",
    title: "Servicio técnico especializado",
    excerpt: "Somos multimarcas: centro de diagnóstico y reparación para equipos de limpieza.",
    description:
      "Somos multimarcas: reparamos y mantenemos equipos de limpieza industrial de cualquier marca. Centro de diagnóstico y reparación con atención personalizada y tiempos de respuesta acordes a su necesidad, minimizando el impacto en su operación. Reparación y mantenimiento de aspiradoras, brilladoras, hidrolavadoras y equipos de limpieza industrial.",
    icon: Wrench,
    features: [
      "SOMOS MULTIMARCAS: atendemos equipos de cualquier marca",
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
    // Two distinct lines of work, presented separately on the same page.
    parts: [
      {
        title: "Mantenimiento de superficies",
        description:
          "Recuperación y acabado de toda clase de superficies: devolvemos el brillo y protegemos el piso frente al tráfico y la humedad.",
        items: [
          "Cristalizado de piso",
          "Brillo natural",
          "Pulido",
          "Destronque",
          "Hidrófugo",
          "Recuperación de toda clase de superficie",
        ],
        icon: Sparkles,
      },
      {
        title: "Lavado profesional y desinfección de alfombras y mobiliario",
        description:
          "Lavado profundo en proceso semihúmedo con equipos de inyección y extracción: elimina manchas, olores y recupera las fibras.",
        items: [
          "Lavado profundo de alfombras",
          "Lavado y desinfección de mobiliario",
          "Proceso semihúmedo de inyección y extracción",
          "Eliminación de manchas y recuperación de fibras",
        ],
        icon: Sofa,
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
