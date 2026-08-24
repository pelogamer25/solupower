"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, MessageCircle, ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import Button from "@/components/ui/Button";
import { useCoarsePointer } from "@/lib/useCoarsePointer";

const VIDEO_SRC = "/hero/hero.mp4";
const POSTER_SRC = "/hero/frame-00.jpg";

/**
 * Cinematic video hero. A tall wrapper pins the footage while company
 * information fades in and out in phases over it. Everything sits on the shared
 * light canvas — the sequence dissolves into the page, no hard break.
 *
 * The video autoplays muted on a loop (the only form of autoplay browsers
 * allow) rather than being scroll-scrubbed: seeking a video on every scroll
 * event is unreliable on mobile, which is what the old frame sequence worked
 * around. A native <video> is both simpler and lighter than 40 JPEG frames.
 */
export default function HeroSequence() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const coarse = useCoarsePointer();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // subtle zoom parallax on the footage (hooks must run before any early return)
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const cinematicFade = useTransform(scrollYProgress, [0.9, 1], [1, 0.55]);

  // ---- Reduced motion: static poster + stacked info, no pinning ----
  if (reduce) {
    return <StaticHero />;
  }

  // ---- Touch: one screen, no pinning ----
  // The pinned stage holds the page for 300vh, so on a phone you swipe through
  // three screens while the footage stays put — it reads as "scrolling is
  // broken". Phones get a single-viewport hero that scrolls away normally.
  if (coarse) {
    return <MobileHero />;
  }

  return (
    <section aria-label="Introducción SOLUPOWER" className="relative">
      {/* Tall driver: scroll advances the phases (shorter ride on mobile) */}
      <div ref={wrapRef} className="relative h-[300vh] md:h-[500vh]">
        {/* Pinned stage */}
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <motion.div style={{ scale, opacity: cinematicFade }} className="absolute inset-0">
            <video
              className="h-full w-full object-cover"
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
            />
          </motion.div>

          {/* Legibility + blend scrims (keep the page's light canvas continuity) */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(6,17,38,0.62)_0%,rgba(6,17,38,0.28)_38%,transparent_70%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38vh] bg-[linear-gradient(180deg,transparent,#F5F7FA_92%)]" />

          {/* --- Progressive company info, phased over the footage --- */}
          <div className="container-x absolute inset-0 z-10 flex items-center">
            <Phase p={scrollYProgress} range={[0.0, 0.06, 0.2, 0.26]}>
              <Eyebrow>Soluciones Industriales RM S.A.S.</Eyebrow>
              <h1 className="mt-5 max-w-2xl font-display text-hero font-semibold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.55),0_2px_14px_rgba(0,0,0,0.35)]">
                Soluciones industriales para empresas que buscan{" "}
                <span className="bg-[linear-gradient(100deg,#7ad0ec,#8fe3c9)] bg-clip-text text-transparent">
                  excelencia.
                </span>
              </h1>
              <p className="mt-6 max-w-md text-lg text-white/80">
                Alquiler, mantenimiento y servicio técnico especializado de equipos de limpieza industrial.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/cotizacion" variant="primary" icon={<ArrowRight size={17} />}>
                  Solicitar cotización
                </Button>
                <Button href={siteConfig.contact.whatsapp} external variant="glass" icon={<MessageCircle size={17} />}>
                  WhatsApp
                </Button>
              </div>
            </Phase>

            <Phase p={scrollYProgress} range={[0.28, 0.34, 0.46, 0.52]}>
              <Eyebrow>Ingeniería y precisión</Eyebrow>
              <h2 className="mt-5 max-w-2xl font-display text-display font-semibold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.55),0_2px_14px_rgba(0,0,0,0.35)]">
                Más de una década elevando el estándar de la industria.
              </h2>
              <p className="mt-6 max-w-lg text-lg text-white/80">
                Combinamos tecnología de punta, técnicos certificados y un método claro
                para mantener tu operación en marcha, sin fricciones.
              </p>
            </Phase>

            <Phase p={scrollYProgress} range={[0.54, 0.6, 0.72, 0.78]}>
              <Eyebrow>Nuestro respaldo</Eyebrow>
              <div className="mt-6 grid max-w-2xl grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
                {[
                  ["+12", "Años"],
                  ["+500", "Proyectos"],
                  ["+150", "Clientes"],
                  ["24/7", "Soporte"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <div className="font-display text-4xl font-semibold text-white sm:text-5xl">{v}</div>
                    <div className="mt-1 text-sm uppercase tracking-widest text-white/70">{l}</div>
                  </div>
                ))}
              </div>
            </Phase>

            <Phase p={scrollYProgress} range={[0.8, 0.86, 0.98, 1.0]} last>
              <Eyebrow>Comencemos</Eyebrow>
              <h2 className="mt-5 max-w-2xl font-display text-display font-semibold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.55),0_2px_14px_rgba(0,0,0,0.35)]">
                Todo lo que tu operación necesita, en un solo lugar.
              </h2>
              <div className="mt-8">
                <Button href="/servicios" variant="primary" icon={<ArrowRight size={17} />}>
                  Descubre nuestros servicios
                </Button>
              </div>
            </Phase>
          </div>

          {/* Scroll cue + progress rail */}
          <ScrollCue p={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

/* ---------- helpers ---------- */

function Phase({
  p,
  range,
  last = false,
  children,
}: {
  p: MotionValue<number>;
  range: [number, number, number, number];
  last?: boolean;
  children: React.ReactNode;
}) {
  const [a, b, c, d] = range;
  const opacity = useTransform(p, [a, b, c, d], [0, 1, 1, last ? 1 : 0]);
  const y = useTransform(p, [a, b, c, d], [40, 0, 0, last ? 0 : -40]);
  const blur = useTransform(p, [a, b, c, d], [10, 0, 0, last ? 0 : 10]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.div
      style={{ opacity, y, filter }}
      className="pointer-events-none absolute inset-x-0 px-[inherit]"
    >
      {/* re-enable pointer events for actual controls */}
      <div className="pointer-events-auto container-x">{children}</div>
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
      {children}
    </span>
  );
}

function ScrollCue({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0, 0.08], [1, 0]);
  const width = useTransform(p, [0, 1], ["0%", "100%"]);
  return (
    <>
      <motion.div style={{ opacity }} className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
        <span className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-[11px] uppercase tracking-[0.22em]">Scroll</span>
          <ChevronDown size={18} className="animate-float" />
        </span>
      </motion.div>
      {/* thin progress rail bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-white/10">
        <motion.div style={{ width }} className="h-full bg-[linear-gradient(90deg,#1E5FBF,#35B6D8,#22A79B)]" />
      </div>
    </>
  );
}

/**
 * Touch hero: the footage plays behind one screen of copy, in normal document
 * flow. No pinning, no scroll-linked values and no phase machinery — scrolling
 * behaves exactly as the user expects, and the page costs far less to render.
 */
function MobileHero() {
  return (
    <section aria-label="Introducción SOLUPOWER" className="relative overflow-hidden">
      <div className="relative flex min-h-[100svh] items-center pt-28">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(6,17,38,0.72)_0%,rgba(6,17,38,0.42)_45%,rgba(6,17,38,0.18)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30vh] bg-[linear-gradient(180deg,transparent,#F5F7FA_94%)]" />

        <div className="container-x relative z-10 pb-24">
          <Eyebrow>Soluciones Industriales RM S.A.S.</Eyebrow>
          <h1 className="mt-5 max-w-2xl font-display text-hero font-semibold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.55),0_2px_14px_rgba(0,0,0,0.35)]">
            Soluciones industriales para empresas que buscan{" "}
            <span className="bg-[linear-gradient(100deg,#7ad0ec,#8fe3c9)] bg-clip-text text-transparent">
              excelencia.
            </span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-white/85">
            Alquiler, mantenimiento y servicio técnico especializado de equipos de limpieza
            industrial.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/cotizacion" variant="primary" icon={<ArrowRight size={17} />}>
              Solicitar cotización
            </Button>
            <Button href={siteConfig.contact.whatsapp} external variant="glass" icon={<MessageCircle size={17} />}>
              WhatsApp
            </Button>
          </div>
        </div>

        <span
          aria-hidden
          className="absolute inset-x-0 bottom-7 z-10 flex flex-col items-center gap-1.5 text-white/70"
        >
          <span className="text-[11px] uppercase tracking-[0.22em]">Scroll</span>
          <ChevronDown size={18} className="animate-float" />
        </span>
      </div>
    </section>
  );
}

/** Reduced-motion fallback: a static poster + stacked copy, no autoplaying video. */
function StaticHero() {
  return (
    <section aria-label="Introducción SOLUPOWER" className="relative min-h-[92svh] overflow-hidden pt-28">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${POSTER_SRC})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(6,17,38,0.6),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30vh] bg-[linear-gradient(180deg,transparent,#F5F7FA)]" />
      <div className="container-x relative z-10 flex min-h-[70svh] items-center">
        <div className="max-w-2xl">
          <Eyebrow>Soluciones Industriales RM S.A.S.</Eyebrow>
          <h1 className="mt-5 font-display text-hero font-semibold text-white">
            Soluciones industriales para empresas que buscan excelencia.
          </h1>
          <p className="mt-6 max-w-md text-lg text-white/80">
            Alquiler, mantenimiento y servicio técnico especializado de equipos de limpieza industrial.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/cotizacion" variant="primary" icon={<ArrowRight size={17} />}>
              Solicitar cotización
            </Button>
            <Button href={siteConfig.contact.whatsapp} external variant="glass" icon={<MessageCircle size={17} />}>
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
