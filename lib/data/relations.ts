import { services } from "./services";
import { products } from "./products";
import { posts, caseStudies } from "./content";

export type EntityKind = "servicio" | "producto" | "blog" | "caso";

export interface RelatedRef {
  kind: EntityKind;
  slug: string;
}

export interface RelatedItem extends RelatedRef {
  title: string;
  excerpt: string;
  href: string;
  label: string;
  anchor: string;
}

const basePath: Record<EntityKind, string> = {
  servicio: "/servicios",
  producto: "/productos",
  blog: "/blog",
  caso: "/casos-de-exito",
};

const kindLabel: Record<EntityKind, string> = {
  servicio: "Servicio",
  producto: "Producto",
  blog: "Artículo",
  caso: "Caso de éxito",
};

/** Content pillars (Topic Clusters). Satellites link between each other and back here. */
export const pillars = {
  productos: {
    title: "Equipos de limpieza industrial",
    href: "/productos",
    anchor: "equipos de limpieza industrial",
  },
  servicios: {
    title: "Servicios de limpieza y mantenimiento industrial",
    href: "/servicios",
    anchor: "servicios de limpieza y mantenimiento industrial",
  },
} as const;

/** Canonical keyword anchor text per entity — never generic ("clic aquí"). */
export const anchors: Record<string, string> = {
  // servicios
  "venta-de-maquinaria": "venta de maquinaria industrial",
  alquiler: "alquiler de maquinaria de limpieza",
  "servicio-tecnico": "servicio técnico para maquinaria industrial",
  "mantenimiento-industrial": "mantenimiento industrial preventivo",
  "restauracion-de-pisos": "restauración de pisos industriales",
  "limpieza-especializada": "limpieza industrial especializada",
  "pintura-epoxica": "pintura epóxica para pisos industriales",
  "mantenimientos-locativos": "mantenimientos locativos",
  // productos
  "brilladoras-industriales": "brilladoras industriales",
  "hidrolavadoras-industriales": "hidrolavadoras industriales",
  "aspiradoras-industriales": "aspiradoras industriales",
  scrubbers: "scrubbers industriales",
  "robots-de-limpieza": "robots de limpieza industrial",
  desbastadoras: "desbastadoras de concreto",
  // blog
  "como-restaurar-pisos-industriales": "cómo restaurar pisos industriales",
  "elegir-hidrolavadora-industrial": "elegir una hidrolavadora industrial",
  "mantenimiento-preventivo-maquinaria": "mantenimiento preventivo de maquinaria",
  // casos
  "planta-logistica-alto-transito": "restauración de pisos en un centro logístico",
  "planta-alimentos-mantenimiento": "mantenimiento de equipos en planta de alimentos",
  "parqueadero-pintura-epoxica": "pintura epóxica en parqueadero",
};

/** The semantic graph. Each entity connects to related services, products, articles and cases. */
const graph: Record<string, RelatedRef[]> = {
  // ---------------- Productos (cluster: Equipos de limpieza industrial) ----------------
  "hidrolavadoras-industriales": [
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "servicio", slug: "alquiler" },
    { kind: "servicio", slug: "limpieza-especializada" },
    { kind: "producto", slug: "aspiradoras-industriales" },
    { kind: "producto", slug: "brilladoras-industriales" },
    { kind: "producto", slug: "scrubbers" },
    { kind: "blog", slug: "elegir-hidrolavadora-industrial" },
    { kind: "blog", slug: "mantenimiento-preventivo-maquinaria" },
    { kind: "caso", slug: "planta-logistica-alto-transito" },
  ],
  "brilladoras-industriales": [
    { kind: "servicio", slug: "restauracion-de-pisos" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "servicio", slug: "alquiler" },
    { kind: "producto", slug: "desbastadoras" },
    { kind: "producto", slug: "scrubbers" },
    { kind: "producto", slug: "aspiradoras-industriales" },
    { kind: "blog", slug: "como-restaurar-pisos-industriales" },
    { kind: "caso", slug: "planta-logistica-alto-transito" },
  ],
  "aspiradoras-industriales": [
    { kind: "servicio", slug: "limpieza-especializada" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "servicio", slug: "mantenimiento-industrial" },
    { kind: "producto", slug: "scrubbers" },
    { kind: "producto", slug: "hidrolavadoras-industriales" },
    { kind: "producto", slug: "robots-de-limpieza" },
    { kind: "blog", slug: "mantenimiento-preventivo-maquinaria" },
    { kind: "caso", slug: "planta-alimentos-mantenimiento" },
  ],
  scrubbers: [
    { kind: "servicio", slug: "limpieza-especializada" },
    { kind: "servicio", slug: "alquiler" },
    { kind: "servicio", slug: "mantenimiento-industrial" },
    { kind: "producto", slug: "aspiradoras-industriales" },
    { kind: "producto", slug: "robots-de-limpieza" },
    { kind: "producto", slug: "brilladoras-industriales" },
    { kind: "blog", slug: "mantenimiento-preventivo-maquinaria" },
    { kind: "caso", slug: "planta-alimentos-mantenimiento" },
  ],
  "robots-de-limpieza": [
    { kind: "servicio", slug: "limpieza-especializada" },
    { kind: "servicio", slug: "mantenimiento-industrial" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "producto", slug: "scrubbers" },
    { kind: "producto", slug: "aspiradoras-industriales" },
    { kind: "producto", slug: "hidrolavadoras-industriales" },
    { kind: "blog", slug: "mantenimiento-preventivo-maquinaria" },
    { kind: "caso", slug: "planta-alimentos-mantenimiento" },
  ],
  desbastadoras: [
    { kind: "servicio", slug: "restauracion-de-pisos" },
    { kind: "servicio", slug: "pintura-epoxica" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "producto", slug: "brilladoras-industriales" },
    { kind: "producto", slug: "scrubbers" },
    { kind: "producto", slug: "hidrolavadoras-industriales" },
    { kind: "blog", slug: "como-restaurar-pisos-industriales" },
    { kind: "caso", slug: "parqueadero-pintura-epoxica" },
  ],

  // ---------------- Servicios (cluster: Servicios de limpieza y mantenimiento) ----------------
  "servicio-tecnico": [
    { kind: "servicio", slug: "mantenimiento-industrial" },
    { kind: "servicio", slug: "alquiler" },
    { kind: "producto", slug: "hidrolavadoras-industriales" },
    { kind: "producto", slug: "brilladoras-industriales" },
    { kind: "producto", slug: "scrubbers" },
    { kind: "blog", slug: "mantenimiento-preventivo-maquinaria" },
    { kind: "caso", slug: "planta-alimentos-mantenimiento" },
  ],
  alquiler: [
    { kind: "servicio", slug: "venta-de-maquinaria" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "servicio", slug: "mantenimiento-industrial" },
    { kind: "producto", slug: "hidrolavadoras-industriales" },
    { kind: "producto", slug: "scrubbers" },
    { kind: "producto", slug: "aspiradoras-industriales" },
    { kind: "blog", slug: "elegir-hidrolavadora-industrial" },
    { kind: "caso", slug: "planta-logistica-alto-transito" },
  ],
  "venta-de-maquinaria": [
    { kind: "servicio", slug: "alquiler" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "producto", slug: "brilladoras-industriales" },
    { kind: "producto", slug: "hidrolavadoras-industriales" },
    { kind: "producto", slug: "robots-de-limpieza" },
    { kind: "blog", slug: "elegir-hidrolavadora-industrial" },
    { kind: "caso", slug: "planta-alimentos-mantenimiento" },
  ],
  "mantenimiento-industrial": [
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "servicio", slug: "mantenimientos-locativos" },
    { kind: "servicio", slug: "alquiler" },
    { kind: "producto", slug: "scrubbers" },
    { kind: "producto", slug: "aspiradoras-industriales" },
    { kind: "producto", slug: "hidrolavadoras-industriales" },
    { kind: "blog", slug: "mantenimiento-preventivo-maquinaria" },
    { kind: "caso", slug: "planta-alimentos-mantenimiento" },
  ],
  "restauracion-de-pisos": [
    { kind: "servicio", slug: "pintura-epoxica" },
    { kind: "servicio", slug: "limpieza-especializada" },
    { kind: "servicio", slug: "mantenimientos-locativos" },
    { kind: "producto", slug: "desbastadoras" },
    { kind: "producto", slug: "brilladoras-industriales" },
    { kind: "blog", slug: "como-restaurar-pisos-industriales" },
    { kind: "caso", slug: "planta-logistica-alto-transito" },
  ],
  "limpieza-especializada": [
    { kind: "servicio", slug: "restauracion-de-pisos" },
    { kind: "servicio", slug: "mantenimiento-industrial" },
    { kind: "servicio", slug: "alquiler" },
    { kind: "producto", slug: "hidrolavadoras-industriales" },
    { kind: "producto", slug: "aspiradoras-industriales" },
    { kind: "producto", slug: "scrubbers" },
    { kind: "blog", slug: "como-restaurar-pisos-industriales" },
    { kind: "caso", slug: "planta-logistica-alto-transito" },
  ],
  "pintura-epoxica": [
    { kind: "servicio", slug: "restauracion-de-pisos" },
    { kind: "servicio", slug: "mantenimientos-locativos" },
    { kind: "producto", slug: "desbastadoras" },
    { kind: "blog", slug: "como-restaurar-pisos-industriales" },
    { kind: "caso", slug: "parqueadero-pintura-epoxica" },
  ],
  "mantenimientos-locativos": [
    { kind: "servicio", slug: "mantenimiento-industrial" },
    { kind: "servicio", slug: "pintura-epoxica" },
    { kind: "servicio", slug: "limpieza-especializada" },
    { kind: "producto", slug: "hidrolavadoras-industriales" },
    { kind: "blog", slug: "mantenimiento-preventivo-maquinaria" },
    { kind: "caso", slug: "parqueadero-pintura-epoxica" },
  ],

  // ---------------- Blog ----------------
  "como-restaurar-pisos-industriales": [
    { kind: "servicio", slug: "restauracion-de-pisos" },
    { kind: "servicio", slug: "pintura-epoxica" },
    { kind: "servicio", slug: "limpieza-especializada" },
    { kind: "producto", slug: "desbastadoras" },
    { kind: "producto", slug: "brilladoras-industriales" },
    { kind: "blog", slug: "mantenimiento-preventivo-maquinaria" },
    { kind: "caso", slug: "planta-logistica-alto-transito" },
  ],
  "elegir-hidrolavadora-industrial": [
    { kind: "servicio", slug: "alquiler" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "servicio", slug: "venta-de-maquinaria" },
    { kind: "producto", slug: "hidrolavadoras-industriales" },
    { kind: "producto", slug: "aspiradoras-industriales" },
    { kind: "blog", slug: "mantenimiento-preventivo-maquinaria" },
    { kind: "caso", slug: "planta-logistica-alto-transito" },
  ],
  "mantenimiento-preventivo-maquinaria": [
    { kind: "servicio", slug: "mantenimiento-industrial" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "producto", slug: "scrubbers" },
    { kind: "producto", slug: "hidrolavadoras-industriales" },
    { kind: "blog", slug: "elegir-hidrolavadora-industrial" },
    { kind: "caso", slug: "planta-alimentos-mantenimiento" },
  ],

  // ---------------- Casos de éxito ----------------
  "planta-logistica-alto-transito": [
    { kind: "servicio", slug: "restauracion-de-pisos" },
    { kind: "servicio", slug: "limpieza-especializada" },
    { kind: "producto", slug: "desbastadoras" },
    { kind: "producto", slug: "brilladoras-industriales" },
    { kind: "blog", slug: "como-restaurar-pisos-industriales" },
  ],
  "planta-alimentos-mantenimiento": [
    { kind: "servicio", slug: "mantenimiento-industrial" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "producto", slug: "scrubbers" },
    { kind: "producto", slug: "aspiradoras-industriales" },
    { kind: "blog", slug: "mantenimiento-preventivo-maquinaria" },
  ],
  "parqueadero-pintura-epoxica": [
    { kind: "servicio", slug: "pintura-epoxica" },
    { kind: "servicio", slug: "restauracion-de-pisos" },
    { kind: "producto", slug: "desbastadoras" },
    { kind: "blog", slug: "como-restaurar-pisos-industriales" },
  ],
};

function resolve(ref: RelatedRef): RelatedItem | null {
  const anchor = anchors[ref.slug] ?? ref.slug;
  const href = `${basePath[ref.kind]}/${ref.slug}`;
  const label = kindLabel[ref.kind];
  if (ref.kind === "servicio") {
    const s = services.find((x) => x.slug === ref.slug);
    return s ? { ...ref, title: s.title, excerpt: s.excerpt, href, label, anchor } : null;
  }
  if (ref.kind === "producto") {
    const p = products.find((x) => x.slug === ref.slug);
    return p ? { ...ref, title: p.name, excerpt: p.excerpt, href, label, anchor } : null;
  }
  if (ref.kind === "blog") {
    const p = posts.find((x) => x.slug === ref.slug);
    return p ? { ...ref, title: p.title, excerpt: p.excerpt, href, label, anchor } : null;
  }
  const c = caseStudies.find((x) => x.slug === ref.slug);
  return c ? { ...ref, title: c.title, excerpt: c.summary, href, label, anchor } : null;
}

export interface GroupedRelated {
  all: RelatedItem[];
  servicios: RelatedItem[];
  productos: RelatedItem[];
  articulos: RelatedItem[];
  casos: RelatedItem[];
}

/** Resolve all related entities for a given slug, grouped by kind. */
export function getRelated(slug: string): GroupedRelated {
  const items = (graph[slug] ?? []).map(resolve).filter(Boolean) as RelatedItem[];
  return {
    all: items,
    servicios: items.filter((i) => i.kind === "servicio"),
    productos: items.filter((i) => i.kind === "producto"),
    articulos: items.filter((i) => i.kind === "blog"),
    casos: items.filter((i) => i.kind === "caso"),
  };
}

/** { href, anchor } for a contextual inline link, by slug. */
export function internalLink(slug: string, kind?: EntityKind) {
  const k =
    kind ??
    (services.some((s) => s.slug === slug)
      ? "servicio"
      : products.some((p) => p.slug === slug)
      ? "producto"
      : posts.some((p) => p.slug === slug)
      ? "blog"
      : "caso");
  return { href: `${basePath[k]}/${slug}`, anchor: anchors[slug] ?? slug };
}
