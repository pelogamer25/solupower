import { Wrench, Package, Layers, Sofa } from "lucide-react";
import type { Service } from "@/types";

export const services: Service[] = [
  {
    // Slug kept as-is: the page is indexed and several 308s point at it.
    slug: "restauracion-de-pisos",
    title: "Mantenimiento y Tratamiento de Pisos",
    excerpt:
      "Cristalizado, brillo natural, pulido, destronque e hidrófugo para toda clase de superficie.",
    description:
      "Mantenimiento y tratamiento de pisos: cristalizado, brillo natural, pulido, destronque e hidrófugo para la recuperación de toda clase de superficie. Devolvemos el brillo y protegemos el piso frente al tráfico y la humedad, en mármol, granito, concreto y baldosas.",
    icon: Layers,
    features: [
      "Cristalizado de piso",
      "Brillo natural",
      "Pulido",
      "Destronque",
      "Hidrófugo",
      "Recuperación de toda clase de superficie",
    ],
    accent: "blue",
  },
  {
    slug: "lavado-de-alfombras-y-mobiliario",
    title: "Lavado profesional, desinfección de alfombras y mobiliario",
    excerpt:
      "Lavado profundo en proceso semihúmedo con equipos de inyección y extracción.",
    description:
      "Lavado profesional y desinfección de alfombras y mobiliario: lavado profundo en proceso semihúmedo con equipos de inyección y extracción que elimina manchas y olores, y recupera las fibras de alfombras, tapetes y mobiliario.",
    icon: Sofa,
    features: [
      "Lavado profundo de alfombras",
      "Lavado y desinfección de mobiliario",
      "Proceso semihúmedo de inyección y extracción",
      "Eliminación de manchas y recuperación de fibras",
    ],
    accent: "green",
  },
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
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
