import Link from "next/link";
import { internalLink } from "@/lib/data/relations";

/** Keyword-anchored inline internal link. */
function L({ slug }: { slug: string }) {
  const { href, anchor } = internalLink(slug);
  return (
    <Link
      href={href}
      className="font-medium text-brand-blue underline decoration-brand-cyan/40 underline-offset-4 transition-colors hover:text-brand-deep"
    >
      {anchor}
    </Link>
  );
}

const proseClass =
  "space-y-5 text-base leading-relaxed text-ink-soft [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mt-7 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-ink [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-ink";

/** Unique, long-form article body per slug. No shared/duplicated template. */
export default function ArticleBody({ slug }: { slug: string }) {
  switch (slug) {
    case "como-restaurar-pisos-industriales":
      return <RestaurarPisos />;
    case "elegir-hidrolavadora-industrial":
      return <ElegirHidrolavadora />;
    case "mantenimiento-preventivo-maquinaria":
      return <MantenimientoPreventivo />;
    default:
      return null;
  }
}

function RestaurarPisos() {
  return (
    <div className={proseClass}>
      <p>
        Un piso industrial deteriorado no es solo un problema estético: es un riesgo de seguridad,
        un foco de acumulación de polvo y, muchas veces, la causa silenciosa de que la maquinaria
        de aseo rinda menos de lo que debería. La buena noticia es que la mayoría de los pisos de
        concreto, porcelanato o granito se pueden recuperar sin necesidad de demolerlos, y muchas
        veces <strong>sin detener la operación</strong>. En esta guía explicamos, paso a paso, cómo
        se restaura un piso industrial y cómo decidir el método correcto según tu superficie.
      </p>

      <h2>¿Cuándo un piso industrial necesita restauración?</h2>
      <p>
        Las señales más comunes son la pérdida de brillo, las juntas abiertas, las manchas que ya
        no salen con lavado convencional, las microfisuras y las zonas de alto tránsito visiblemente
        más desgastadas que el resto. Si el piso “empolva” al pisarlo o si los montacargas dejan
        marcas permanentes, la capa superficial ya perdió su sello y conviene intervenir antes de
        que el daño llegue a la masa del concreto.
      </p>

      <h3>Diagnóstico previo</h3>
      <p>
        Antes de tocar el piso medimos dureza, porosidad y planitud. Un concreto muy poroso pedirá
        más pasadas de sellado; uno con desniveles marcados requerirá desbaste antes que pulido.
        Este diagnóstico define el plan y evita sorpresas de costo a mitad del proyecto.
      </p>

      <h2>Las tres etapas de una restauración profesional</h2>

      <h3>1. Preparación y nivelación de la superficie</h3>
      <p>
        las irregularidades. Aquí el equipo protagonista es la maquinaria de desbaste y pulido de
        nuestro servicio de <L slug="restauracion-de-pisos" />, que abre el poro del concreto y deja
        una base uniforme sobre la cual el resto del proceso adhiere de forma duradera. Una
        preparación deficiente es la causa número uno de que una restauración “bonita” falle a los
        pocos meses.
      </p>

      <h3>2. Pulido y acabado</h3>
      <p>
        Con la base lista se pasa al pulido progresivo con discos de grano cada vez más fino hasta
        alcanzar el nivel de brillo deseado. Para el mantenimiento del brillo en el tiempo, y en
        superficies de porcelanato o granito, entra la{" "}
        <L slug="brilladora-industrial-17" />, que da el acabado espejo característico de un piso
        bien cuidado.
      </p>

      <h3>3. Sellado y protección</h3>
      <p>
        El último paso es proteger. Según el uso del área, el sellado puede ir desde un endurecedor
        penetrante hasta un recubrimiento de alta resistencia. En plantas, laboratorios y zonas de
        producción, la opción más robusta suele ser la pintura epóxica, que aporta resistencia
        química y mecánica además de un acabado estético y fácil de limpiar.
      </p>

      <h2>Restaurar sin detener la operación</h2>
      <p>
        En centros logísticos y plantas que trabajan 24/7, la clave es sectorizar: se interviene por
        zonas, se coordina con los turnos y se usan equipos con aspiración integrada para minimizar
        el polvo. Así se recupera el piso metro a metro sin frenar la producción. Todo esto forma
        parte de nuestro servicio integral de <L slug="restauracion-de-pisos" />.
      </p>

      <h2>¿Comprar el equipo o contratar el servicio?</h2>
      <p>
        Si tu empresa hará mantenimiento recurrente de pisos, tener el equipo propio tiene sentido.
        Si es un proyecto puntual, casi siempre conviene el{" "}
        <L slug="alquiler" /> o contratar el servicio llave en mano. Un caso real de este tipo lo
        documentamos en nuestra sección de casos de éxito, donde recuperamos miles de metros
        cuadrados en un centro de distribución en plena operación.
      </p>

      <p>
        Cada piso es distinto, así que el mejor primer paso es un diagnóstico en sitio. Si quieres,
        lo coordinamos y te entregamos una propuesta clara y sin compromiso.
      </p>
    </div>
  );
}

function ElegirHidrolavadora() {
  return (
    <div className={proseClass}>
      <p>
        Elegir una hidrolavadora industrial parece sencillo hasta que te enfrentas a decenas de
        modelos con cifras de PSI, GPM, motores eléctricos o a gasolina y agua fría o caliente.
        Comprar “la más potente” rara vez es la mejor decisión: una máquina sobredimensionada
        gasta más, pesa más y puede dañar superficies delicadas. La correcta es la que se ajusta a
        <strong> tu</strong> tipo de suciedad, superficie y frecuencia de uso. Aquí te explicamos
        los factores que realmente importan.
      </p>

      <h2>Los tres números que definen una hidrolavadora</h2>

      <h3>Presión (PSI)</h3>
      <p>
        El PSI mide la fuerza con la que sale el agua y determina qué tan incrustada puede estar la
        suciedad que vas a remover. Para limpieza general de pisos y vehículos, 1500–2000 PSI suele
        bastar; para grasa industrial, cemento adherido o preparación de superficies, se buscan
        equipos cercanos a los 3000 PSI.
      </p>

      <h3>Caudal (GPM o L/min)</h3>
      <p>
        El caudal define cuánta agua mueves por minuto y, con ello, la <strong>velocidad</strong> de
        trabajo. Dos máquinas con el mismo PSI pero distinto caudal rinden muy diferente: más caudal
        arrastra más suciedad y termina antes. Para áreas grandes, prioriza caudal tanto como
        presión.
      </p>

      <h3>Temperatura: agua fría o caliente</h3>
      <p>
        El agua caliente disuelve grasas y acelera el secado, por lo que es casi obligatoria en
        cocinas industriales, plantas de alimentos y talleres con aceite. Si tu suciedad es
        principalmente polvo, barro o residuos secos, el agua fría cumple y abarata el equipo.
      </p>

      <h2>Eléctrica o a gasolina</h2>
      <p>
        Las eléctricas son más silenciosas, no emiten gases y son ideales para interiores. Las de
        gasolina ofrecen autonomía donde no hay toma de corriente, útiles en obra y exteriores. La
        decisión depende más de <strong>dónde</strong> vas a trabajar que de la potencia.
      </p>

      <h2>Errores frecuentes al comprar</h2>
      <ul>
        <li>Fijarse solo en el PSI e ignorar el caudal.</li>
        <li>Comprar equipo doméstico para uso continuo: se recalienta y falla pronto.</li>
        <li>Olvidar el respaldo posventa: sin repuestos ni técnicos, la máquina se vuelve chatarra.</li>
      </ul>
      <p>
        Ese último punto es decisivo: una hidrolavadora industrial es una inversión que solo rinde
        si cuenta con un buen <L slug="servicio-tecnico" /> detrás para diagnóstico, repuestos y
        calibración.
      </p>

      <h2>¿Comprar o alquilar?</h2>
      <p>
        Si el uso es esporádico o quieres probar un modelo antes de decidir, el{" "}
        <L slug="alquiler" /> es la vía más inteligente: accedes al equipo por el tiempo que lo
        necesitas, con soporte incluido. Si el uso es intensivo y permanente, la compra amortiza
        rápido. Puedes ver todas las opciones, como la{" "}
        <L slug="hidrolavadora-industrial-1900-psi" />, en nuestro catálogo de productos.
      </p>

      <h2>Complementa tu equipo</h2>
      <p>
        En muchas operaciones la hidrolavadora trabaja junto a otros equipos: las{" "}
        <L slug="aspiradoras-industriales" /> para recoger el agua y los residuos, o los{" "}
        <L slug="scrubbers" /> para el lavado y secado de grandes superficies. Pensar en el proceso
        completo, y no en una sola máquina, es lo que diferencia a una operación eficiente.
      </p>

      <p>
        ¿Sigues con dudas sobre qué modelo se ajusta a tu caso? Cuéntanos qué necesitas limpiar y en
        qué superficie, y te recomendamos el equipo exacto sin compromiso.
      </p>
    </div>
  );
}

function MantenimientoPreventivo() {
  return (
    <div className={proseClass}>
      <p>
        El mantenimiento preventivo es una de esas inversiones cuyo valor no se ve… hasta que falta.
        Nadie celebra la parada que <strong>no</strong> ocurrió ni la reparación costosa que se
        evitó. Sin embargo, en operaciones industriales que dependen de su maquinaria de aseo, un
        buen plan preventivo es la diferencia entre una flota que rinde durante años y una que se
        detiene en el peor momento. Veamos por qué y cómo implementarlo.
      </p>

      <h2>Correctivo vs. preventivo: dos filosofías</h2>
      <p>
        El mantenimiento <strong>correctivo</strong> repara cuando algo ya falló. Es reactivo, suele
        ser más caro y siempre llega en mal momento. El <strong>preventivo</strong>, en cambio,
        anticipa: revisa, limpia, lubrica y reemplaza componentes de desgaste <em>antes</em> de que
        provoquen una falla. La primera filosofía apaga incendios; la segunda evita que se enciendan.
      </p>

      <h2>Qué incluye un plan preventivo bien hecho</h2>

      <h3>Cronograma por horas de uso</h3>
      <p>
        No todas las máquinas se desgastan al mismo ritmo. Un buen plan se basa en las horas reales
        de operación, no en el calendario, y define intervalos de revisión para cada equipo. Un
        scrubber que trabaja tres turnos necesita más frecuencia que uno de uso ocasional.
      </p>

      <h3>Puntos críticos de revisión</h3>
      <ul>
        <li>Filtros y sistemas de aspiración, que pierden eficiencia al saturarse.</li>
        <li>Cepillos, discos y escobillas de goma, componentes de desgaste natural.</li>
        <li>Baterías y sistemas de carga en equipos autónomos.</li>
        <li>Sellos, mangueras y conexiones en equipos de agua a presión.</li>
      </ul>

      <h3>Repuestos originales y registro</h3>
      <p>
        Usar repuestos originales y llevar un historial por equipo permite anticipar reemplazos y
        detectar patrones de falla. Esa trazabilidad es parte de un buen{" "}
        <L slug="servicio-tecnico" /> y de un plan de{" "}
        <L slug="mantenimiento-preventivo-maquinaria" />.
      </p>

      <h2>El impacto real en costos</h2>
      <p>
        Un plan preventivo reduce las paradas no planificadas, alarga la vida útil de los equipos y
        estabiliza el presupuesto de mantenimiento (dejas de tener “sorpresas” de reparación). En
        nuestra experiencia con flotas de <L slug="scrubbers" /> y{" "}
        <L slug="aspiradoras-industriales" />, un cronograma bien ejecutado disminuye
        drásticamente las fallas críticas y mejora la disponibilidad de la maquinaria.
      </p>

      <h2>Cómo empezar</h2>
      <p>
        El primer paso es un inventario de equipos con sus horas de uso y su estado actual. A partir
        de ahí se diseña el cronograma y se definen responsables. Si tu operación aún trabaja en modo
        correctivo, migrar a preventivo es más sencillo de lo que parece y se paga solo. Podemos
        ayudarte a estructurarlo y ejecutarlo de principio a fin.
      </p>

      <p>
        Cuéntanos cuántos equipos tienes y cómo los usas, y diseñamos un plan de mantenimiento a la
        medida de tu planta.
      </p>
    </div>
  );
}
