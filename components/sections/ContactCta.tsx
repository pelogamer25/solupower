import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import TextReveal from "@/components/ui/TextReveal";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export default function ContactCta() {
  return (
    <section id="contacto" className="relative py-24 sm:py-32" aria-label="Contacto">
      <div className="container-x">
        <div className="glass relative overflow-hidden rounded-5xl px-6 py-16 text-center sm:px-16 sm:py-24">
          {/* internal ambient glow so the CTA glows but stays on the same canvas */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(30,95,191,0.35),transparent_65%)] blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(34,167,155,0.32),transparent_65%)] blur-2xl" />

          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-brand-blue backdrop-blur-md">
              Hablemos
            </span>
          </Reveal>

          <TextReveal
            as="h2"
            text="¿Listo para llevar tu operación al siguiente nivel?"
            className="mx-auto mt-6 max-w-3xl font-display text-display font-semibold text-ink"
          />

          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
              Cuéntanos qué necesitas y diseñamos la solución exacta para tu empresa.
              Cotización clara, sin compromiso.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href="/cotizacion" variant="primary" icon={<ArrowRight size={17} />}>
                Solicitar cotización
              </Button>
              <Button href={siteConfig.contact.whatsapp} external variant="whatsapp" icon={<MessageCircle size={17} />}>
                WhatsApp
              </Button>
              <Button href={siteConfig.contact.phoneHref} external variant="glass" icon={<Phone size={16} />}>
                Llamar
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
