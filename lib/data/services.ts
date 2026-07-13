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
    title: "Venta de maquinaria",
    excerpt: "Equipos de limpieza industrial de alto rendimiento, listos para operar.",
    description:
      "Comercializamos maquinaria industrial de las marcas líderes del sector, con asesoría técnica para elegir el equipo exacto según tu operación, superficie y volumen de trabajo.",
    icon: Package,
    features: ["Asesoría técnica personalizada", "Garantía y respaldo", "Financiación disponible"],
    accent: "blue",
  },
  {
    slug: "alquiler",
    title: "Alquiler",
    excerpt: "Flexibilidad total: la máquina que necesitas, por el tiempo que la necesitas.",
    description:
      "Planes de alquiler por día, semana o proyecto. Ideal para picos de producción, obras temporales o pruebas antes de comprar. Entrega, soporte y mantenimiento incluidos.",
    icon: Package,
    features: ["Planes flexibles", "Entrega y recogida", "Soporte durante el alquiler"],
    accent: "teal",
  },
  {
    slug: "servicio-tecnico",
    title: "Servicio técnico",
    excerpt: "Diagnóstico preciso y reparación especializada para toda tu maquinaria.",
    description:
      "Técnicos certificados y repuestos originales. Diagnóstico, reparación y calibración de equipos de cualquier marca, con reportes claros y tiempos de respuesta ágiles.",
    icon: Wrench,
    features: ["Repuestos originales", "Diagnóstico certificado", "Respuesta rápida"],
    accent: "cyan",
  },
  {
    slug: "mantenimiento-industrial",
    title: "Mantenimiento industrial",
    excerpt: "Planes preventivos que evitan paradas y prolongan la vida útil.",
    description:
      "Programas de mantenimiento preventivo y correctivo a la medida de tu planta. Reducimos fallas, optimizamos costos y mantenemos tu operación en marcha.",
    icon: Cog,
    features: ["Planes preventivos", "Cronogramas a medida", "Menos paradas"],
    accent: "green",
  },
  {
    slug: "restauracion-de-pisos",
    title: "Restauración de pisos",
    excerpt: "Devolvemos el brillo y la resistencia a superficies de alto tránsito.",
    description:
      "Desbaste, pulido y sellado profesional de pisos en concreto, porcelanato y granito. Resultados de acabado espejo con protección duradera.",
    icon: Layers,
    features: ["Pulido de acabado espejo", "Sellado protector", "Alto tránsito"],
    accent: "blue",
  },
  {
    slug: "limpieza-especializada",
    title: "Limpieza especializada",
    excerpt: "Protocolos técnicos para entornos exigentes e industriales.",
    description:
      "Servicios de limpieza profunda para plantas, bodegas, parqueaderos y superficies críticas, con equipos y químicos adecuados para cada material.",
    icon: Sparkles,
    features: ["Protocolos técnicos", "Equipos profesionales", "Resultados medibles"],
    accent: "teal",
  },
  {
    slug: "pintura-epoxica",
    title: "Pintura epóxica",
    excerpt: "Recubrimientos de alta resistencia para pisos industriales.",
    description:
      "Aplicación de sistemas epóxicos que aportan resistencia química, mecánica y estética a pisos de plantas, laboratorios y zonas de producción.",
    icon: PaintRoller,
    features: ["Alta resistencia química", "Acabado uniforme", "Larga durabilidad"],
    accent: "cyan",
  },
  {
    slug: "mantenimientos-locativos",
    title: "Mantenimientos locativos",
    excerpt: "Cuidamos cada detalle de tus instalaciones, integralmente.",
    description:
      "Servicios integrales de mantenimiento locativo para conservar tus instalaciones en óptimas condiciones: adecuaciones, reparaciones y acabados.",
    icon: Building2,
    features: ["Servicio integral", "Personal calificado", "Gestión llave en mano"],
    accent: "green",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
