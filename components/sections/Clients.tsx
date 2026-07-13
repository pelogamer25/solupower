import SectionHeading from "@/components/ui/SectionHeading";
import Marquee from "@/components/ui/Marquee";
import { clients } from "@/lib/data/content";

export default function Clients() {
  const logos = clients.map((name) => (
    <div
      key={name}
      className="glass-soft flex h-16 items-center rounded-2xl px-8 text-sm font-semibold tracking-tight text-ink-soft transition-colors hover:text-ink"
    >
      {name}
    </div>
  ));

  return (
    <section id="clientes" className="relative py-24 sm:py-28" aria-label="Clientes">
      <div className="container-x">
        <SectionHeading
          eyebrow="Clientes"
          title="Empresas que confían en nosotros"
          align="center"
        />
      </div>
      <div className="mt-14 space-y-4">
        <Marquee items={logos} />
        <Marquee items={[...logos].reverse()} className="[animation-direction:reverse]" />
      </div>
    </section>
  );
}
