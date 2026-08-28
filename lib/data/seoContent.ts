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
  "hidrolavadora-industrial-1900-psi": [
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
          link: "restauracion-de-pisos",
        },
        {
          h3: "Aplicaciones en centros comerciales",
          body: "Parqueaderos, fachadas y zonas comunes de alto tránsito se mantienen impecables combinando hidrolavado con",
          link: "aspiradoras",
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
          body: "Para acabados de piso de alto tránsito el hidrolavado se combina con la",
          link: "brilladora-industrial-17",
        },
      ],
    },
  ],

  "brilladora-industrial-17": [
    {
      h2: "¿Qué es una brilladora industrial?",
      intro:
        "Las brilladoras industriales pulen y dan acabado espejo a pisos de alto tránsito con motores de alta velocidad, logrando superficies uniformes con mínimo esfuerzo operativo.",
      blocks: [
        {
          h3: "Pulidora de pisos para porcelanato y granito",
          body: "Una pulidora de pisos recupera porcelanato y granito desgastado; el trabajo completo lo cubre nuestro servicio de",
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
          body: "Un acabado perfecto empieza por preparar y nivelar la superficie dentro de nuestro servicio de",
          link: "restauracion-de-pisos",
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

  aspiradoras: [
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
          link: "restauracion-de-pisos",
        },
      ],
    },
    {
      h2: "Ventajas de las aspiradoras industriales",
      blocks: [
        {
          h3: "Operación continua",
          body: "La disponibilidad permanente se asegura con un plan de",
          link: "servicio-tecnico",
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
          h3: "Fregadoras industriales para grandes superficies",
          body: "Las fregadoras industriales rinden más cuando se combinan con",
          link: "aspiradoras",
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
          link: "servicio-tecnico",
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
          link: "servicio-tecnico",
        },
        {
          h3: "Complemento del equipo humano",
          body: "El polvo y los residuos finos se cubren con",
          link: "aspiradoras",
        },
      ],
    },
  ],


  // --- Bloques por categoría. La página /productos/categoria/<slug> los toma
  // con getProductSeo(cat.slug), así que la clave ES el slug de la categoría.
  brilladoras: [
    {
      h2: "Brilladoras y pulidoras de pisos industriales",
      intro:
        "Las brilladoras industriales giran a alta velocidad para pulir, abrillantar y lavar pisos de alto tránsito, con platos de 17″ y 20″ y accesorios intercambiables según el acabado que busques.",
      blocks: [
        {
          h3: "Pulidora de pisos para mármol, granito y porcelanato",
          body: "Una pulidora de pisos devuelve el brillo a mármol, granito y porcelanato desgastado; el proceso completo lo cubre nuestro servicio de",
          link: "restauracion-de-pisos",
        },
        {
          h3: "Máquina abrillantadora industrial para alto tránsito",
          body: "La máquina abrillantadora industrial mantiene el acabado entre jornadas y se alterna con el paso de los",
          link: "scrubbers",
        },
        {
          h3: "Pulido de concreto con discos diamantados",
          body: "Para pulir pisos de concreto usamos discos diamantados de grano progresivo; el paso a paso está en la guía sobre",
          link: "como-restaurar-pisos-industriales",
        },
      ],
    },
    {
      h2: "Comprar o alquilar una brilladora",
      blocks: [
        {
          h3: "Pulidoras en Medellín por proyecto",
          body: "Si necesitas pulidoras en Medellín solo para una obra puntual, sale mejor el",
          link: "alquiler",
        },
        {
          h3: "Vida útil del equipo",
          body: "El desgaste de platos, discos y motor se controla con un plan de",
          link: "servicio-tecnico",
        },
      ],
    },
  ],

  hidrolavadoras: [
    {
      h2: "Hidrolavadoras industriales en Medellín",
      intro:
        "Agua a alta presión, fría o caliente, para remover grasa, cemento, hollín y suciedad incrustada que la limpieza manual no alcanza. Equipos pensados para operación continua, no para uso doméstico.",
      blocks: [
        {
          h3: "Agua fría y agua caliente",
          body: "El agua caliente disuelve grasas pesadas y acelera el secado; cómo elegir presión y caudal está en la guía sobre",
          link: "elegir-hidrolavadora-industrial",
        },
        {
          h3: "Alquiler de hidrolavadoras en Medellín",
          body: "Puedes validar el equipo en tu operación antes de comprarlo con el",
          link: "alquiler",
        },
        {
          h3: "Repuestos y reparación multimarcas",
          body: "Reparamos hidrolavadoras de cualquier marca con repuestos originales en nuestro",
          link: "servicio-tecnico",
        },
      ],
    },
  ],

  barredoras: [
    {
      h2: "Barredoras industriales para grandes áreas",
      intro:
        "Barredoras de conducción y a batería que recogen polvo, escombro y residuo suelto en bodegas, parqueaderos y exteriores, cubriendo en una pasada lo que un equipo de aseo tarda horas en barrer.",
      blocks: [
        {
          h3: "Barredora industrial hombre caminando o a bordo",
          body: "Elegir entre barredora industrial de acompañante o de conducción depende del área; para superficies muy grandes conviene sumar",
          link: "scrubbers",
        },
        {
          h3: "Polvo fino y residuo suelto",
          body: "El material fino que la barredora levanta se recoge después con",
          link: "aspiradoras",
        },
        {
          h3: "Disponibilidad de la flota",
          body: "Las paradas por falla se evitan con un plan de",
          link: "mantenimiento-preventivo-maquinaria",
        },
      ],
    },
  ],

  extractoras: [
    {
      h2: "Extractoras para alfombras, tapetes y tapicería",
      intro:
        "Equipos de inyección y extracción que aplican solución de limpieza a presión y la recuperan con la suciedad disuelta, en proceso semihúmedo y con tiempos de secado cortos.",
      blocks: [
        {
          h3: "Lavado de tapetes y alfombras en sitio",
          body: "Para el lavado de tapetes y alfombras sin desmontar nada, ofrecemos también el servicio completo de",
          link: "lavado-de-alfombras-y-mobiliario",
        },
        {
          h3: "Aspirado previo obligatorio",
          body: "Antes de inyectar agua hay que retirar el sólido seco con",
          link: "aspiradoras",
        },
      ],
    },
  ],

  robots: [
    {
      h2: "Robots de limpieza autónomos",
      intro:
        "Navegación inteligente, mapeo del espacio y carga automática: limpian de forma consistente y sin supervisión constante, liberando al equipo humano para el trabajo que sí requiere criterio.",
      blocks: [
        {
          h3: "Automatización de grandes superficies",
          body: "El robot cubre la rutina diaria y deja el trabajo pesado y puntual a las",
          link: "scrubbers",
        },
        {
          h3: "Puesta en marcha y calibración",
          body: "El mapeo inicial y la calibración los acompaña nuestro",
          link: "servicio-tecnico",
        },
      ],
    },
  ],

};

export const serviceSeo: Record<string, SeoSection[]> = {
  alquiler: [
    {
      h2: "Alquiler de maquinaria de limpieza",
      intro:
        "Planes flexibles por día, semana o proyecto, con entrega, soporte y mantenimiento incluidos. Ideal para picos de producción u obras temporales.",
      blocks: [
        {
          h3: "Alquiler de hidrolavadoras en Medellín",
          body: "El alquiler de hidrolavadoras en Medellín es nuestro servicio más pedido por temporada; el equipo estrella es la",
          link: "hidrolavadora-industrial-1900-psi",
        },
        {
          h3: "Renting de fregadoras industriales por proyecto",
          body: "Para bodegas y plantas el renting de fregadoras industriales sale mejor que comprar; trabajamos con",
          link: "scrubbers",
        },
      ],
    },
    {
      h2: "Alquilar o comprar",
      blocks: [
        {
          h3: "Cuándo conviene comprar",
          body: "Si el uso es permanente, evalúa comprar el equipo en el catálogo de",
          link: "productos",
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
          h3: "Técnico de hidrolavadoras y equipos industriales",
          body: "Nuestro técnico de hidrolavadoras atiende cualquier marca, empezando por la",
          link: "hidrolavadora-industrial-1900-psi",
        },
        {
          h3: "Del correctivo al preventivo",
          body: "Para evitar fallas repetidas lo complementamos con un plan de",
          link: "mantenimiento-preventivo-maquinaria",
        },
        {
          h3: "Cuidado de equipos de acabado",
          body: "También calibramos y afinamos la",
          link: "brilladora-industrial-17",
        },
      ],
    },
  ],

  "lavado-de-alfombras-y-mobiliario": [
    {
      h2: "Lavado profesional y desinfección de alfombras y mobiliario",
      intro:
        "Lavado profundo en proceso semihúmedo con equipos de inyección y extracción: elimina manchas y olores y recupera las fibras, con tiempos de secado cortos que no detienen la operación.",
      blocks: [
        {
          h3: "Lavado de tapetes y alfombras con inyección y extracción",
          body: "El lavado de tapetes y alfombras se hace en proceso semihúmedo con la",
          link: "extractora-jb-175",
        },
        {
          h3: "Limpieza de alfombras industrial en sitio",
          body: "La limpieza de alfombras industrial arranca retirando el polvo y los sólidos con",
          link: "aspiradoras",
        },
        {
          h3: "Pisos y superficies duras",
          body: "Para el piso bajo la alfombra y las superficies duras contamos con el",
          link: "restauracion-de-pisos",
        },
      ],
    },
    {
      h2: "Caso relacionado",
      blocks: [
        {
          h3: "Resultados en textiles",
          body: "Puedes ver un trabajo real en el caso de",
          link: "lavado-y-desinfeccion-de-alfombras",
        },
      ],
    },
  ],

  "restauracion-de-pisos": [
    {
      h2: "Mantenimiento y tratamiento de pisos industriales",
      intro:
        "Cristalizado, brillo natural, pulido, destronque e hidrófugo sobre mármol, granito, concreto y baldosas, con acabados de alto brillo y protección duradera.",
      blocks: [
        {
          h3: "Limpieza y pulido de pisos: preparación de la superficie",
          body: "La limpieza y pulido de pisos arranca con el destronque y la nivelación; para el acabado espejo lo combinamos con la",
          link: "brilladora-industrial-17",
        },
        {
          h3: "Acabado y brillo",
          body: "El brillo final y el mantenimiento de retail se sostienen alternando con el paso de los",
          link: "scrubbers",
        },
        {
          h3: "Alfombras y mobiliario",
          body: "Si además necesitas recuperar textiles, lo cubre nuestro servicio de",
          link: "lavado-de-alfombras-y-mobiliario",
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

};

export function getProductSeo(slug: string): SeoSection[] {
  return productSeo[slug] ?? [];
}
export function getServiceSeo(slug: string): SeoSection[] {
  return serviceSeo[slug] ?? [];
}
