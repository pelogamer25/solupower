import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import QuoteForm from "@/components/sections/QuoteForm";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = pageMetadata({
  title: "Contacto — Medellín y Bogotá",
  description:
    "Contáctanos para venta, alquiler o mantenimiento de equipos de limpieza industrial. Teléfono, correo, WhatsApp y formulario. SOLUPOWER, Colombia.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Hablemos de tu operación"
        description="Estamos listos para ayudarte. Escríbenos por el medio que prefieras y te responderemos lo antes posible."
        crumbs={[{ name: "Contacto", path: "/contacto" }]}
      />

      <section className="py-12" aria-label="Formulario e información de contacto">
        <div className="container-x grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <Reveal>
            <QuoteForm />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-4">
              <GlassCard className="p-7">
                <h2 className="font-display text-lg font-semibold text-ink">Datos de contacto</h2>
                <ul className="mt-5 space-y-4">
                  <ContactItem icon={<Phone size={16} />} href={siteConfig.contact.phoneHref} label={siteConfig.contact.phone} />
                  <ContactItem icon={<Phone size={16} />} href={siteConfig.contact.phone2Href} label={siteConfig.contact.phone2} />
                  <ContactItem icon={<Mail size={16} />} href={`mailto:${siteConfig.contact.email}`} label={siteConfig.contact.email} />
                  <ContactItem icon={<MessageCircle size={16} />} href={siteConfig.contact.whatsapp} label="WhatsApp" external />
                  <ContactItem icon={<MapPin size={16} />} label={siteConfig.contact.address} />
                </ul>
              </GlassCard>

              <GlassCard className="relative flex-1 overflow-hidden p-0">
                {/* Map placeholder — swap for an embedded map iframe / static map image */}
                <div className="relative h-full min-h-[220px] w-full bg-[linear-gradient(135deg,#1E5FBF,#35B6D8_60%,#22A79B)]">
                  <div className="grain absolute inset-0 opacity-30" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-medium text-ink backdrop-blur-md">
                      <MapPin size={16} className="text-brand-blue" /> {siteConfig.contact.address}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactItem({
  icon,
  label,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  external?: boolean;
}) {
  const body = (
    <span className="flex items-center gap-3 text-sm text-ink-soft transition-colors hover:text-ink">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/50 text-brand-blue">{icon}</span>
      {label}
    </span>
  );
  return (
    <li>
      {href ? (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {body}
        </a>
      ) : (
        body
      )}
    </li>
  );
}
