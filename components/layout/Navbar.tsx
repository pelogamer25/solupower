"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";
import { services } from "@/lib/data/services";
import { productCategoryMeta } from "@/lib/data/products";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

const accentIcon: Record<string, string> = {
  blue: "from-brand-deep to-brand-blue",
  teal: "from-brand-teal to-brand-green",
  cyan: "from-brand-blue to-brand-cyan",
  green: "from-brand-green to-brand-teal",
};

type MenuKey = "servicios" | "productos" | null;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuKey>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  // Close the open dropdown on outside click / Escape (click-driven, touch-safe)
  useEffect(() => {
    if (!menu) return;
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.nav
        initial={false}
        animate={{
          maxWidth: scrolled ? 1080 : 1240,
          paddingTop: scrolled ? 8 : 12,
          paddingBottom: scrolled ? 8 : 12,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "flex w-full items-center justify-between rounded-full px-4 sm:px-5 transition-colors duration-500",
          scrolled ? "glass shadow-glass" : "border border-transparent bg-white/10 backdrop-blur-md",
        )}
      >
        <Link href="/" aria-label={`${siteConfig.name} — inicio`} className="shrink-0">
          <Logo />
        </Link>

        <ul ref={navRef} className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            // ---- Servicios dropdown ----
            if (link.href === "/servicios") {
              const openHere = menu === "servicios";
              const active = pathname.startsWith("/servicios");
              return (
                <li key={link.href} className="relative">
                  <MenuTrigger
                    label={link.label}
                    active={active}
                    open={openHere}
                    onClick={() => setMenu(openHere ? null : "servicios")}
                  />
                  <AnimatePresence>
                    {openHere && (
                      <DropdownPanel label="Servicios" className="w-[min(88vw,25rem)]">
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/servicios/${s.slug}`}
                            role="menuitem"
                            onClick={() => setMenu(null)}
                            className={cn(
                              "group flex items-start gap-3 rounded-3xl p-3 transition-colors",
                              pathname === `/servicios/${s.slug}` ? "bg-white/60" : "hover:bg-white/50",
                            )}
                          >
                            <IconBadge accent={s.accent}>
                              <s.icon size={18} />
                            </IconBadge>
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold text-ink">{s.title}</span>
                              <span className="mt-0.5 block text-xs leading-snug text-ink-soft">{s.excerpt}</span>
                            </span>
                          </Link>
                        ))}
                        <FooterLink href="/servicios" onClick={() => setMenu(null)}>
                          Ver todos los servicios
                        </FooterLink>
                      </DropdownPanel>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            // ---- Productos dropdown (by category) ----
            if (link.href === "/productos") {
              const openHere = menu === "productos";
              const active = pathname.startsWith("/productos");
              return (
                <li key={link.href} className="relative">
                  <MenuTrigger
                    label={link.label}
                    active={active}
                    open={openHere}
                    onClick={() => setMenu(openHere ? null : "productos")}
                  />
                  <AnimatePresence>
                    {openHere && (
                      <DropdownPanel label="Productos" className="w-[min(92vw,34rem)]">
                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                          {productCategoryMeta.map((c) => {
                            const catActive = pathname === `/productos/categoria/${c.slug}`;
                            return (
                              <Link
                                key={c.slug}
                                href={`/productos/categoria/${c.slug}`}
                                role="menuitem"
                                onClick={() => setMenu(null)}
                                className={cn(
                                  "group flex items-center gap-3 rounded-3xl p-3 transition-colors",
                                  catActive ? "bg-white/60" : "hover:bg-white/50",
                                )}
                              >
                                <IconBadge accent={c.accent}>
                                  <c.icon size={18} />
                                </IconBadge>
                                <span className="min-w-0 text-sm font-semibold text-ink">{c.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                        <FooterLink href="/productos" onClick={() => setMenu(null)}>
                          Ver todos los productos
                        </FooterLink>
                      </DropdownPanel>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            // ---- Plain link ----
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    active ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/60 shadow-glass"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href="/cotizacion" variant="primary" className="px-5 py-2.5 text-[13px]">
              Cotizar
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full text-ink lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass absolute inset-x-3 top-[4.6rem] max-h-[80vh] overflow-y-auto rounded-4xl p-5 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                if (link.href === "/servicios") {
                  return (
                    <li key={link.href}>
                      <Link href="/servicios" className="block rounded-2xl px-4 py-3 text-base font-medium text-ink hover:bg-white/50">
                        {link.label}
                      </Link>
                      <ul className="mb-1 ml-3 mt-1 flex flex-col gap-0.5 border-l border-white/50 pl-3">
                        {services.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/servicios/${s.slug}`}
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-ink-soft hover:bg-white/50 hover:text-ink"
                            >
                              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${accentIcon[s.accent]} text-white`}>
                                <s.icon size={14} />
                              </span>
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }
                if (link.href === "/productos") {
                  return (
                    <li key={link.href}>
                      <Link href="/productos" className="block rounded-2xl px-4 py-3 text-base font-medium text-ink hover:bg-white/50">
                        {link.label}
                      </Link>
                      <ul className="mb-1 ml-3 mt-1 flex flex-col gap-0.5 border-l border-white/50 pl-3">
                        {productCategoryMeta.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/productos/categoria/${c.slug}`}
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-ink-soft hover:bg-white/50 hover:text-ink"
                            >
                              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${accentIcon[c.accent]} text-white`}>
                                <c.icon size={14} />
                              </span>
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }
                return (
                  <li key={link.href}>
                    <Link href={link.href} className="block rounded-2xl px-4 py-3 text-base font-medium text-ink hover:bg-white/50">
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex flex-col gap-2">
              <Button href="/cotizacion" variant="primary" className="w-full">
                Solicitar cotización
              </Button>
              <Button href={siteConfig.contact.whatsapp} external variant="whatsapp" className="w-full">
                WhatsApp
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------- dropdown building blocks ---------- */

function MenuTrigger({
  label,
  active,
  open,
  onClick,
}: {
  label: string;
  active: boolean;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="menu"
      aria-expanded={open}
      className={cn(
        "relative flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
        active ? "text-ink" : "text-ink-soft hover:text-ink",
      )}
    >
      {active && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 -z-10 rounded-full bg-white/60 shadow-glass"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      {label}
      <ChevronDown size={15} className={cn("transition-transform duration-300", open && "rotate-180")} />
    </button>
  );
}

function DropdownPanel({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      role="menu"
      aria-label={label}
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "glass absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 rounded-4xl p-2 shadow-glass-lg",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

function IconBadge({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <span className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${accentIcon[accent]} text-white shadow-glow`}>
      {children}
    </span>
  );
}

function FooterLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onClick}
      className="mt-1 flex items-center justify-center gap-1.5 rounded-3xl px-3 py-2.5 text-sm font-medium text-brand-blue transition-colors hover:bg-white/50"
    >
      {children}
      <ArrowUpRight size={15} />
    </Link>
  );
}
