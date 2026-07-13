/**
 * SEO body content with a strict single-H1 / H2 / H3 hierarchy.
 * Each H3 paragraph may end with `link` (a slug) that the renderer turns into a
 * keyword-anchored internal link — contextual interlinking inside the content.
 */
export interface SeoBlock {
  h3: string;
  body: string;
  /** slug of a related entity; rendered as a keyword-anchored inline link. */
  link?: string;
}
export interface SeoSection {
  h2: string;
  intro?: string;
  blocks: SeoBlock[];
}

export const productSeo: Record<string, SeoSection[]> = {
  "hidrolavadoras-industriales": [
    {
      h2: "¿Qué es una hidrolavadora industrial?",
      intro:
        "Una hidrolavadora industrial genera agua a alta presión para remover grasa, cemento, hollín y suciedad incrustada que la limpieza manual no alcanza. Es un equipo esencial en operaciones que exigen higiene y velocidad.",
      blocks: [
        {
          h3: "Aplicaciones en la industria alimentaria",
          body: "En plantas de alimentos el lavado a presión mantiene los estándares sanitarios y se complementa muy bien con los",
          link: "scrubbers",
        },
        {
          h3: "Aplicaciones en hospitales y clínicas",
          body: "En entornos hospitalarios la desinfección profunda de superficies es crítica; por eso la integramos dentro de nuestra",
          link: "limpieza-especializada",
        },
        {
          h3: "Aplicaciones en centros comerciales",
          body: "Parqueaderos, fachadas y zonas comunes de alto tránsito se mantienen impecables combinando hidrolavado con",
          link: "aspiradoras-industriales",
        },
      ],
    },
    {
      h2: "Ventajas de una hidrolavadora industrial",
      blocks: [
        {
          h3: "Reducción de costos operativos",
          body: "Antes de comprar puedes validar el equipo en tu operación con nuestro",
          link: "alquiler",
        },
        {
          h3: "Mayor productividad",
          body: "Para sostener el rendimiento en el tiempo es clave contar con un buen",
          link: "servicio-tecnico",
        },
        {
          h3: "Ahorro de agua",
          body: "La alta presión limpia usando menos agua; profundizamos en cómo elegir el caudal correcto en la guía sobre",
          link: "elegir-hidrolavadora-industrial",
        },
      ],
    },
    {
      h2: "Modelos disponibles",
      blocks: [
        { h3: "Agua fría", body: "Ideales para suciedad general y uso frecuente en exteriores e interiores." },
        { h3: "Agua caliente", body: "El agua caliente disuelve grasas pesadas y acelera el secado en zonas de producción." },
        {
          h3: "Alta presión",
          body: "Para acabados de piso de alto tránsito el hidrolavado se combina con",
          link: "brilladoras-industriales",
        },
      ],
    },
  ],

  "brilladoras-industriales": [
    {
      h2: "¿Qué es una brilladora industrial?",
      intro:
        "Las brilladoras industriales pulen y dan acabado espejo a pisos de alto tránsito con motores de alta velocidad, logrando superficies uniformes con mínimo esfuerzo operativo.",
      blocks: [
        {
          h3: "Acabado en pisos de porcelanato y granito",
          body: "Para recuperar pisos muy desgastados el pulido se apoya en nuestro servicio de",
          link: "restauracion-de-pisos",
        },
        {
          h3: "Mantenimiento de brillo en retail",
          body: "En superficies grandes el brillo se sostiene alternando con el paso de",
          link: "scrubbers",
        },
      ],
    },
    {
      h2: "Ventajas de las brilladoras industriales",
      blocks: [
        {
          h3: "Preparación previa de la superficie",
          body: "Un acabado perfecto empieza por nivelar el piso con",
          link: "desbastadoras",
        },
        {
          h3: "Disponibilidad flexible",
          body: "Puedes acceder al equipo por proyecto mediante el",
          link: "alquiler",
        },
        {
          h3: "Vida útil prolongada",
          body: "El desgaste de discos y motor se controla con un plan de",
          link: "servicio-tecnico",
        },
      ],
    },
  ],

  "aspiradoras-industriales": [
    {
      h2: "¿Qué es una aspiradora industrial?",
      intro:
        "Las aspiradoras industriales aspiran polvo, líquidos y residuos con gran capacidad y filtración multi-etapa, resistiendo la operación continua de plantas y bodegas.",
      blocks: [
        {
          h3: "Sólidos y líquidos en un solo equipo",
          body: "Para el lavado de fondo del piso trabajan en conjunto con los",
          link: "scrubbers",
        },
        {
          h3: "Limpieza de polvo fino",
          body: "En procesos que generan partículas se integran dentro de nuestra",
          link: "limpieza-especializada",
        },
      ],
    },
    {
      h2: "Ventajas de las aspiradoras industriales",
      blocks: [
        {
          h3: "Operación continua",
          body: "La disponibilidad permanente se asegura con un plan de",
          link: "mantenimiento-industrial",
        },
        {
          h3: "Automatización del proceso",
          body: "Para grandes áreas conviene evaluar además los",
          link: "robots-de-limpieza",
        },
      ],
    },
  ],

  scrubbers: [
    {
      h2: "¿Qué es un scrubber (fregadora)?",
      intro:
        "Un scrubber lava, restriega y seca el piso en una sola pasada, multiplicando la productividad en bodegas, supermercados y plantas con grandes superficies.",
      blocks: [
        {
          h3: "Rendimiento en grandes superficies",
          body: "Cuando el volumen crece, la operación se optimiza sumando",
          link: "aspiradoras-industriales",
        },
        {
          h3: "Modelos hombre a bordo y acompañante",
          body: "Para operar sin supervisión constante evalúa también los",
          link: "robots-de-limpieza",
        },
      ],
    },
    {
      h2: "Ventajas de los scrubbers",
      blocks: [
        {
          h3: "Flexibilidad de acceso",
          body: "Puedes cubrir picos de operación con el",
          link: "alquiler",
        },
        {
          h3: "Menos paradas por falla",
          body: "La continuidad se protege con un programa de",
          link: "mantenimiento-industrial",
        },
      ],
    },
  ],

  "robots-de-limpieza": [
    {
      h2: "¿Qué es un robot de limpieza industrial?",
      intro:
        "Los robots de limpieza operan de forma autónoma con navegación inteligente y mapeo del espacio, reduciendo costos y garantizando consistencia 24/7 sin supervisión constante.",
      blocks: [
        {
          h3: "Automatización de la limpieza",
          body: "Para tareas específicas se combinan con el paso puntual de",
          link: "scrubbers",
        },
        {
          h3: "Integración con tu operación",
          body: "El despliegue y la calibración se acompañan con nuestro",
          link: "servicio-tecnico",
        },
      ],
    },
    {
      h2: "Ventajas de los robots de limpieza",
      blocks: [
        {
          h3: "Reducción de costos a largo plazo",
          body: "El retorno se maximiza con un plan de",
          link: "mantenimiento-industrial",
        },
        {
          h3: "Complemento del equipo humano",
          body: "El polvo y los residuos finos se cubren con",
          link: "aspiradoras-industriales",
        },
      ],
    },
  ],

  desbastadoras: [
    {
      h2: "¿Qué es una desbastadora de concreto?",
      intro:
        "Las desbastadoras preparan, nivelan y pulen superficies de concreto, removiendo recubrimientos antiguos y dejando el piso listo para acabados de alta resistencia.",
      blocks: [
        {
          h3: "Preparación para recubrimientos",
          body: "Tras el desbaste el piso queda listo para aplicar",
          link: "pintura-epoxica",
        },
        {
          h3: "Concreto pulido de acabado espejo",
          body: "El brillo final se logra combinando el desbaste con",
          link: "brilladoras-industriales",
        },
      ],
    },
    {
      h2: "Ventajas de las desbastadoras",
      blocks: [
        {
          h3: "Base de una restauración duradera",
          body: "Es el primer paso de nuestro servicio de",
          link: "restauracion-de-pisos",
        },
        {
          h3: "Acceso por proyecto",
          body: "Para obras temporales conviene el",
          link: "alquiler",
        },
      ],
    },
  ],
};

export const serviceSeo: Record<string, SeoSection[]> = {
  "venta-de-maquinaria": [
    {
      h2: "Venta de maquinaria de limpieza industrial",
      intro:
        "Comercializamos equipos de las marcas líderes del sector con asesoría técnica para acertar según tu superficie, volumen de trabajo y presupuesto.",
      blocks: [
        {
          h3: "Asesoría para elegir el equipo correcto",
          body: "Si no sabes por dónde empezar, te ayuda la guía sobre",
          link: "elegir-hidrolavadora-industrial",
        },
        {
          h3: "Prueba antes de comprar",
          body: "Puedes validar el equipo en tu operación con el",
          link: "alquiler",
        },
        {
          h3: "Respaldo posterior a la compra",
          body: "Cada venta incluye acompañamiento y",
          link: "servicio-tecnico",
        },
      ],
    },
    {
      h2: "Equipos disponibles",
      blocks: [
        {
          h3: "Equipos de lavado a presión",
          body: "Las más solicitadas para servicio pesado son las",
          link: "hidrolavadoras-industriales",
        },
        {
          h3: "Equipos de acabado de pisos",
          body: "Para brillo y mantenimiento de superficies ofrecemos",
          link: "brilladoras-industriales",
        },
      ],
    },
  ],

  alquiler: [
    {
      h2: "Alquiler de maquinaria de limpieza",
      intro:
        "Planes flexibles por día, semana o proyecto, con entrega, soporte y mantenimiento incluidos. Ideal para picos de producción u obras temporales.",
      blocks: [
        {
          h3: "Alquiler para picos de operación",
          body: "Los equipos más pedidos por temporada son las",
          link: "hidrolavadoras-industriales",
        },
        {
          h3: "Grandes superficies por proyecto",
          body: "Para bodegas y plantas conviene alquilar",
          link: "scrubbers",
        },
      ],
    },
    {
      h2: "Alquilar o comprar",
      blocks: [
        {
          h3: "Cuándo conviene comprar",
          body: "Si el uso es permanente, evalúa nuestra",
          link: "venta-de-maquinaria",
        },
        {
          h3: "Soporte durante el alquiler",
          body: "Todo alquiler está respaldado por nuestro",
          link: "servicio-tecnico",
        },
      ],
    },
  ],

  "servicio-tecnico": [
    {
      h2: "Servicio técnico para maquinaria industrial",
      intro:
        "Técnicos certificados y repuestos originales para diagnosticar, reparar y calibrar equipos de cualquier marca, con reportes claros y tiempos de respuesta ágiles.",
      blocks: [
        {
          h3: "Diagnóstico y reparación",
          body: "El servicio cubre equipos de lavado como las",
          link: "hidrolavadoras-industriales",
        },
        {
          h3: "Del correctivo al preventivo",
          body: "Para evitar fallas repetidas lo complementamos con",
          link: "mantenimiento-industrial",
        },
        {
          h3: "Cuidado de equipos de acabado",
          body: "También calibramos y afinamos las",
          link: "brilladoras-industriales",
        },
      ],
    },
  ],

  "mantenimiento-industrial": [
    {
      h2: "Mantenimiento industrial preventivo",
      intro:
        "Programas de mantenimiento preventivo y correctivo a la medida de tu planta para reducir fallas, optimizar costos y evitar paradas no planificadas.",
      blocks: [
        {
          h3: "Cronogramas a la medida",
          body: "Explicamos el retorno de esta inversión en el artículo sobre",
          link: "mantenimiento-preventivo-maquinaria",
        },
        {
          h3: "Diagnóstico especializado",
          body: "Se apoya en el trabajo puntual de nuestro",
          link: "servicio-tecnico",
        },
        {
          h3: "Cuidado de tu flota",
          body: "Mantenemos en marcha equipos como los",
          link: "scrubbers",
        },
      ],
    },
  ],

  "restauracion-de-pisos": [
    {
      h2: "Restauración de pisos industriales",
      intro:
        "Desbaste, pulido y sellado profesional de pisos en concreto, porcelanato y granito, con acabados de alto brillo y protección duradera.",
      blocks: [
        {
          h3: "Preparación de la superficie",
          body: "El proceso arranca nivelando el piso con",
          link: "desbastadoras",
        },
        {
          h3: "Acabado y brillo",
          body: "El pulido final se realiza con",
          link: "brilladoras-industriales",
        },
        {
          h3: "Protección de larga duración",
          body: "Para máxima resistencia rematamos con",
          link: "pintura-epoxica",
        },
      ],
    },
    {
      h2: "Guía relacionada",
      blocks: [
        {
          h3: "Cómo planear una restauración",
          body: "Reunimos el paso a paso en el artículo sobre",
          link: "como-restaurar-pisos-industriales",
        },
      ],
    },
  ],

  "limpieza-especializada": [
    {
      h2: "Limpieza industrial especializada",
      intro:
        "Protocolos técnicos de limpieza profunda para plantas, bodegas, parqueaderos y superficies críticas, con equipos y químicos adecuados para cada material.",
      blocks: [
        {
          h3: "Equipos de lavado a presión",
          body: "Para grasa y suciedad incrustada usamos",
          link: "hidrolavadoras-industriales",
        },
        {
          h3: "Control de polvo y residuos",
          body: "El material particulado se gestiona con",
          link: "aspiradoras-industriales",
        },
        {
          h3: "Recuperación de pisos",
          body: "Cuando la superficie está deteriorada sumamos",
          link: "restauracion-de-pisos",
        },
      ],
    },
  ],

  "pintura-epoxica": [
    {
      h2: "Pintura epóxica para pisos industriales",
      intro:
        "Sistemas epóxicos que aportan resistencia química, mecánica y estética a pisos de plantas, laboratorios y zonas de producción.",
      blocks: [
        {
          h3: "Preparación de la base",
          body: "La adherencia depende de un buen desbaste con",
          link: "desbastadoras",
        },
        {
          h3: "Parte de una restauración integral",
          body: "Suele aplicarse dentro de nuestro servicio de",
          link: "restauracion-de-pisos",
        },
      ],
    },
  ],

  "mantenimientos-locativos": [
    {
      h2: "Mantenimientos locativos",
      intro:
        "Servicios integrales para conservar tus instalaciones en óptimas condiciones: adecuaciones, reparaciones y acabados con personal calificado.",
      blocks: [
        {
          h3: "Gestión llave en mano",
          body: "Se articula con el",
          link: "mantenimiento-industrial",
        },
        {
          h3: "Acabados y recubrimientos",
          body: "Cuando el piso lo requiere, aplicamos",
          link: "pintura-epoxica",
        },
      ],
    },
  ],
};

export function getProductSeo(slug: string): SeoSection[] {
  return productSeo[slug] ?? [];
}
export function getServiceSeo(slug: string): SeoSection[] {
  return serviceSeo[slug] ?? [];
}
