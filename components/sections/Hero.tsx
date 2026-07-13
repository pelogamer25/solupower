"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, MessageCircle, Gauge, ShieldCheck, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import Button from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.8], [0, 8]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  // mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 120, damping: 20 });
  const py = useSpring(my, { stiffness: 120, damping: 20 });

  function onMouseMove(e: React.MouseEvent) {
    if (reduce) return;
    const { innerWidth, innerHeight } = window;
    mx.set((e.clientX / innerWidth - 0.5) * 2);
    my.set((e.clientY / innerHeight - 0.5) * 2);
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28"
      aria-label="Introducción"
    >
      <motion.div style={{ y, opacity, filter }} className="container-x relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Copy */}
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-brand-blue backdrop-blur-md"
            >
              <Sparkles size={14} className="text-brand-cyan" />
              Soluciones Industriales RM S.A.S.
            </motion.span>

            <h1 className="mt-6 font-display text-hero font-semibold text-ink">
              <Word delay={0.15}>Soluciones</Word>{" "}
              <Word delay={0.23}>industriales</Word>{" "}
              <Word delay={0.31}>para</Word>{" "}
              <Word delay={0.39}>empresas</Word>{" "}
              <Word delay={0.47}>que</Word>{" "}
              <Word delay={0.55}>buscan</Word>{" "}
              <span className="text-gradient">
                <Word delay={0.63}>excelencia.</Word>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease }}
              className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft"
            >
              Venta, alquiler y mantenimiento especializado de equipos de limpieza
              industrial. Ingeniería y precisión para operaciones que no se detienen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.82, ease }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button href="/cotizacion" variant="primary" icon={<ArrowRight size={17} />}>
                Solicitar cotización
              </Button>
              <Button
                href={siteConfig.contact.whatsapp}
                external
                variant="glass"
                icon={<MessageCircle size={17} />}
              >
                WhatsApp
              </Button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1, ease }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-soft"
            >
              <li className="flex items-center gap-2"><Gauge size={16} className="text-brand-blue" /> Alto rendimiento</li>
              <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-brand-teal" /> Garantía y respaldo</li>
              <li className="flex items-center gap-2"><Sparkles size={16} className="text-brand-cyan" /> +12 años de experiencia</li>
            </motion.ul>
          </div>

          {/* Floating glass composition (replaces a photo — clean and premium) */}
          <div className="relative hidden h-[460px] lg:block" aria-hidden>
            <FloatingCard
              px={px} py={py} depth={26}
              className="left-2 top-6 w-64"
              tone="from-brand-blue/20 to-brand-cyan/10"
            >
              <div className="text-xs uppercase tracking-widest text-brand-blue">Equipos</div>
              <div className="mt-2 font-display text-3xl font-semibold text-ink">3000 PSI</div>
              <div className="mt-1 text-sm text-ink-soft">Hidrolavadoras de servicio pesado</div>
            </FloatingCard>

            <FloatingCard
              px={px} py={py} depth={-18}
              className="right-0 top-28 w-56"
              tone="from-brand-teal/20 to-brand-green/10"
            >
              <div className="text-xs uppercase tracking-widest text-brand-teal">Cobertura</div>
              <div className="mt-2 font-display text-3xl font-semibold text-ink">+500</div>
              <div className="mt-1 text-sm text-ink-soft">Proyectos ejecutados</div>
            </FloatingCard>

            <FloatingCard
              px={px} py={py} depth={40}
              className="bottom-2 left-16 w-60"
              tone="from-brand-cyan/20 to-brand-blue/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-brand-blue">Soporte</div>
                  <div className="mt-2 font-display text-3xl font-semibold text-ink">24/7</div>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(135deg,#1E5FBF,#35B6D8)] text-white">
                  <ShieldCheck size={20} />
                </span>
              </div>
            </FloatingCard>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute inset-x-0 bottom-7 z-10 flex justify-center"
      >
        <Link href="#servicios" aria-label="Desplazar hacia abajo" className="flex flex-col items-center gap-2 text-ink-faint">
          <span className="text-[11px] uppercase tracking-[0.22em]">Scroll</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-ink-faint/50 p-1">
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-brand-blue"
            />
          </span>
        </Link>
      </motion.div>
    </section>
  );
}

function Word({ children, delay }: { children: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: "0.1em", marginBottom: "-0.1em" }}>
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.8, delay, ease }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function FloatingCard({
  children,
  className,
  px,
  py,
  depth,
  tone,
}: {
  children: React.ReactNode;
  className?: string;
  px: ReturnType<typeof useSpring>;
  py: ReturnType<typeof useSpring>;
  depth: number;
  tone: string;
}) {
  const tx = useTransform(px, (v) => v * depth);
  const ty = useTransform(py, (v) => v * depth);
  return (
    <motion.div
      style={{ x: tx, y: ty }}
      className={`glass animate-float absolute rounded-4xl p-5 ${className ?? ""}`}
    >
      <div className={`pointer-events-none absolute inset-0 -z-10 rounded-4xl bg-gradient-to-br ${tone}`} />
      {children}
    </motion.div>
  );
}
