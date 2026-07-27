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
  "restauracion-de-pisos": "mantenimiento y limpieza de superficies",
  // productos
  "aspiradoras-industriales": "aspiradoras industriales",
  scrubbers: "scrubbers industriales",
  "robots-de-limpieza": "robots de limpieza industrial",
  "brilladora-industrial-17": "brilladora industrial 17",
  "brilladora-industrial-k-20": "brilladora industrial K-20",
  "fregadora-hombre-a-pie": "fregadora hombre a pie",
  "grande-brio-ride-on-75-650-ecoray": "fregadora Grande Brio Ride on 75",
  "grande-brio-ride-on-145-1000-plus": "fregadora Grande Brio Ride on 145",
  "barredora-u-200": "barredora industrial U 200",
  "barredora-u-190": "barredora industrial U 190",
  "barredora-u90": "barredora U90",
  "durasweep-70bt": "barredora Durasweep 70BT",
  "hidrolavadora-blitz": "hidrolavadora Blitz",
  "hidrolavadora-industrial-1900-psi": "hidrolavadora industrial 1900 PSI",
  "hidrolavadora-annovi-kb-813": "hidrolavadora Annovi KB 813",
  "extractora-jb-175": "extractora JB-175",
  // blog
  "como-restaurar-pisos-industriales": "cómo restaurar pisos industriales",
  "elegir-hidrolavadora-industrial": "elegir una hidrolavadora industrial",
  "mantenimiento-preventivo-maquinaria": "mantenimiento preventivo de maquinaria",
  // casos
  "recuperacion-de-superficies": "recuperación de superficies",
  "cristalizado-y-pulido-de-pisos": "cristalizado y pulido de pisos",
  "lavado-y-desinfeccion-de-alfombras": "lavado y desinfección de alfombras",
  "lavado-profundo-de-pisos": "lavado profundo y desmanche de pisos",
};

/** The semantic graph. Each entity connects to related services, products, articles and cases. */
const graph: Record<string, RelatedRef[]> = {
  // ---------------- Productos (cluster: Equipos de limpieza industrial) ----------------
  "hidrolavadora-industrial-1900-psi": [
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "servicio", slug: "alquiler" },
    { kind: "servicio", slug: "restauracion-de-pisos" },
    { kind: "producto", slug: "aspiradoras-industriales" },
    { kind: "producto", slug: "brilladora-industrial-17" },
    { kind: "producto", slug: "scrubbers" },
    { kind: "blog", slug: "elegir-hidrolavadora-industrial" },
    { kind: "blog", slug: "mantenimiento-preventivo-maquinaria" },
    { kind: "caso", slug: "recuperacion-de-superficies" },
  ],
  "brilladora-industrial-17": [
    { kind: "servicio", slug: "restauracion-de-pisos" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "servicio", slug: "alquiler" },
    { kind: "producto", slug: "desbastadoras" },
    { kind: "producto", slug: "scrubbers" },
    { kind: "producto", slug: "aspiradoras-industriales" },
    { kind: "blog", slug: "como-restaurar-pisos-industriales" },
    { kind: "caso", slug: "recuperacion-de-superficies" },
  ],
  "aspiradoras-industriales": [
    { kind: "servicio", slug: "restauracion-de-pisos" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "producto", slug: "scrubbers" },
    { kind: "producto", slug: "hidrolavadora-industrial-1900-psi" },
    { kind: "producto", slug: "robots-de-limpieza" },
    { kind: "blog", slug: "mantenimiento-preventivo-maquinaria" },
    { kind: "caso", slug: "lavado-profundo-de-pisos" },
  ],
  scrubbers: [
    { kind: "servicio", slug: "restauracion-de-pisos" },
    { kind: "servicio", slug: "alquiler" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "producto", slug: "aspiradoras-industriales" },
    { kind: "producto", slug: "robots-de-limpieza" },
    { kind: "producto", slug: "brilladora-industrial-17" },
    { kind: "blog", slug: "mantenimiento-preventivo-maquinaria" },
    { kind: "caso", slug: "lavado-profundo-de-pisos" },
  ],
  "robots-de-limpieza": [
    { kind: "servicio", slug: "restauracion-de-pisos" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "producto", slug: "scrubbers" },
    { kind: "producto", slug: "aspiradoras-industriales" },
    { kind: "producto", slug: "hidrolavadora-industrial-1900-psi" },
    { kind: "blog", slug: "mantenimiento-preventivo-maquinaria" },
    { kind: "caso", slug: "lavado-profundo-de-pisos" },
  ],

  // ---------------- Servicios (cluster: Servicios de limpieza y mantenimiento) ----------------
  "servicio-tecnico": [
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "servicio", slug: "alquiler" },
    { kind: "producto", slug: "hidrolavadora-industrial-1900-psi" },
    { kind: "producto", slug: "brilladora-industrial-17" },
    { kind: "producto", slug: "scrubbers" },
    { kind: "blog", slug: "mantenimiento-preventivo-maquinaria" },
    { kind: "caso", slug: "lavado-profundo-de-pisos" },
  ],
  alquiler: [
    { kind: "servicio", slug: "venta-de-maquinaria" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "producto", slug: "hidrolavadora-industrial-1900-psi" },
    { kind: "producto", slug: "scrubbers" },
    { kind: "producto", slug: "aspiradoras-industriales" },
    { kind: "blog", slug: "elegir-hidrolavadora-industrial" },
    { kind: "caso", slug: "recuperacion-de-superficies" },
  ],
  "venta-de-maquinaria": [
    { kind: "servicio", slug: "alquiler" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "producto", slug: "brilladora-industrial-17" },
    { kind: "producto", slug: "hidrolavadora-industrial-1900-psi" },
    { kind: "producto", slug: "robots-de-limpieza" },
    { kind: "blog", slug: "elegir-hidrolavadora-industrial" },
    { kind: "caso", slug: "lavado-profundo-de-pisos" },
  ],
  "restauracion-de-pisos": [
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "servicio", slug: "alquiler" },
    { kind: "servicio", slug: "venta-de-maquinaria" },
    { kind: "producto", slug: "desbastadoras" },
    { kind: "producto", slug: "brilladora-industrial-17" },
    { kind: "producto", slug: "extractora-jb-175" },
    { kind: "blog", slug: "como-restaurar-pisos-industriales" },
    { kind: "caso", slug: "recuperacion-de-superficies" },
  ],

  // ---------------- Blog ----------------
  "como-restaurar-pisos-industriales": [
    { kind: "servicio", slug: "restauracion-de-pisos" },
    { kind: "servicio", slug: "restauracion-de-pisos" },
    { kind: "servicio", slug: "restauracion-de-pisos" },
    { kind: "producto", slug: "desbastadoras" },
    { kind: "producto", slug: "brilladora-industrial-17" },
    { kind: "blog", slug: "mantenimiento-preventivo-maquinaria" },
    { kind: "caso", slug: "recuperacion-de-superficies" },
  ],
  "elegir-hidrolavadora-industrial": [
    { kind: "servicio", slug: "alquiler" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "servicio", slug: "venta-de-maquinaria" },
    { kind: "producto", slug: "hidrolavadora-industrial-1900-psi" },
    { kind: "producto", slug: "aspiradoras-industriales" },
    { kind: "blog", slug: "mantenimiento-preventivo-maquinaria" },
    { kind: "caso", slug: "recuperacion-de-superficies" },
  ],
  "mantenimiento-preventivo-maquinaria": [
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "producto", slug: "scrubbers" },
    { kind: "producto", slug: "hidrolavadora-industrial-1900-psi" },
    { kind: "blog", slug: "elegir-hidrolavadora-industrial" },
    { kind: "caso", slug: "lavado-profundo-de-pisos" },
  ],

  // ---------------- Casos de éxito (líneas de trabajo reales) ----------------
  "recuperacion-de-superficies": [
    { kind: "servicio", slug: "restauracion-de-pisos" },
    { kind: "servicio", slug: "restauracion-de-pisos" },
    { kind: "producto", slug: "desbastadoras" },
    { kind: "producto", slug: "brilladora-industrial-17" },
    { kind: "blog", slug: "como-restaurar-pisos-industriales" },
  ],
  "cristalizado-y-pulido-de-pisos": [
    { kind: "servicio", slug: "restauracion-de-pisos" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "producto", slug: "brilladora-industrial-17" },
    { kind: "producto", slug: "desbastadoras" },
    { kind: "blog", slug: "como-restaurar-pisos-industriales" },
  ],
  "lavado-y-desinfeccion-de-alfombras": [
    { kind: "servicio", slug: "restauracion-de-pisos" },
    { kind: "producto", slug: "extractora-jb-175" },
    { kind: "producto", slug: "aspiradoras-industriales" },
    { kind: "blog", slug: "mantenimiento-preventivo-maquinaria" },
  ],
  "lavado-profundo-de-pisos": [
    { kind: "servicio", slug: "restauracion-de-pisos" },
    { kind: "servicio", slug: "servicio-tecnico" },
    { kind: "producto", slug: "scrubbers" },
    { kind: "producto", slug: "hidrolavadora-industrial-1900-psi" },
    { kind: "blog", slug: "mantenimiento-preventivo-maquinaria" },
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
  const seen = new Set<string>();
  const items = (graph[slug] ?? [])
    .map(resolve)
    .filter((item): item is RelatedItem => {
      // Drop unresolved (deleted) entities, self-references, and duplicates —
      // this makes slug repointing safe (collisions collapse to one link).
      if (!item || item.slug === slug) return false;
      const key = `${item.kind}:${item.slug}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
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
