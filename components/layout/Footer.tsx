import Link from "next/link";
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { services } from "@/lib/data/services";
import { products } from "@/lib/data/products";
import { posts } from "@/lib/data/content";
import { anchors } from "@/lib/data/relations";

/** SEO footer: categorized internal links (not just contact data). */
const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Productos",
    links: products
      .slice(0, 6)
      .map((p) => ({ href: `/productos/${p.slug}`, label: anchors[p.slug] ?? p.name })),
  },
  {
    title: "Servicios",
    links: services
      .slice(0, 6)
      .map((s) => ({ href: `/servicios/${s.slug}`, label: anchors[s.slug] ?? s.title })),
  },
  {
    title: "Empresa",
    links: [
      { href: "/nosotros", label: "Sobre nosotros" },
      { href: "/casos-de-exito", label: "Casos de éxito" },
      { href: "/clientes", label: "Clientes" },
      { href: "/galeria", label: "Galería" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { href: "/blog", label: "Blog" },
      ...posts.slice(0, 2).map((p) => ({ href: `/blog/${p.slug}`, label: p.title })),
      { href: "/cotizacion", label: "Solicitar cotización" },
    ],
  },
  {
    title: "Empresa · Legal",
    links: [
      { href: "/contacto", label: "Contacto" },
      { href: "/privacidad", label: "Política de privacidad" },
      { href: "/terminos", label: "Términos y condiciones" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 px-3 pb-6 sm:px-5">
      <div className="glass container-x overflow-hidden rounded-5xl px-6 py-14 sm:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(5,1fr)]">
          <div className="max-w-sm lg:col-span-1">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              {siteConfig.shortDesc} Ingeniería, precisión y excelencia para operaciones que no se detienen.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink href={siteConfig.social.instagram} label="Instagram">
                <Instagram size={18} />
              </SocialLink>
              <SocialLink href={siteConfig.social.facebook} label="Facebook">
                <Facebook size={18} />
              </SocialLink>
              <SocialLink href={siteConfig.social.linkedin} label="LinkedIn">
                <Linkedin size={18} />
              </SocialLink>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/40 pt-8 md:grid-cols-2 lg:grid-cols-4">
          <ContactRow icon={<Phone size={16} />} href={siteConfig.contact.phoneHref}>
            {siteConfig.contact.phone}
          </ContactRow>
          <ContactRow icon={<Phone size={16} />} href={siteConfig.contact.phone2Href}>
            {siteConfig.contact.phone2}
          </ContactRow>
          <ContactRow icon={<Mail size={16} />} href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </ContactRow>
          <ContactRow icon={<MapPin size={16} />}>{siteConfig.contact.address}</ContactRow>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/40 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-faint">
            © {year} {siteConfig.legalName}. Todos los derechos reservados.
          </p>
          <Button href={siteConfig.contact.whatsapp} external variant="whatsapp" className="px-5 py-2.5 text-[13px]">
            Escríbenos por WhatsApp
          </Button>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-white/40 text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:text-brand-blue"
    >
      {children}
    </a>
  );
}

function ContactRow({
  icon,
  href,
  children,
}: {
  icon: React.ReactNode;
  href?: string;
  children: React.ReactNode;
}) {
  const body = (
    <span className="flex items-center gap-3 text-sm text-ink-soft transition-colors hover:text-ink">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/50 text-brand-blue">
        {icon}
      </span>
      {children}
    </span>
  );
  return href ? <a href={href}>{body}</a> : <div>{body}</div>;
}
