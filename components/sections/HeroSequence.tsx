"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, MessageCircle, ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import Button from "@/components/ui/Button";
import { useCoarsePointer } from "@/lib/useCoarsePointer";

const FRAME_COUNT = 40;
const framePath = (i: number) => `/hero/frame-${String(i).padStart(2, "0")}.jpg`;
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll-scrubbed image sequence (Apple-style). A tall wrapper drives a pinned
 * canvas: scroll progress maps 1:1 to the 40 HERO_SCENES frames, while company
 * information fades in and out in phases over the footage. Everything sits on
 * the shared light canvas — the sequence dissolves into the page, no hard break.
 */
export default function HeroSequence() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  /** Pre-decoded, pre-cropped GPU bitmaps (mobile): drawing = trivial blit. */
  const bitmapsRef = useRef<(ImageBitmap | null)[]>([]);
  const lastIndexRef = useRef(-1);
  /** Frame interpolation: a rAF loop lerps `current` toward the scroll target. */
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef(0);
  const runningRef = useRef(false);
  const [posterReady, setPosterReady] = useState(false);
  const reduce = useReducedMotion();
  // Mobile: degrade the expensive parts (canvas DPR, scroll-linked blur/zoom).
  const coarse = useCoarsePointer();
  const coarseRef = useRef(false);
  coarseRef.current = coarse;

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // ---- Load the poster frame first (LCP), then preload the rest when idle ----
  useEffect(() => {
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);

    const poster = new Image();
    poster.src = framePath(0);
    // hint the browser this is the important frame
    try { (poster as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "high"; } catch {}
    poster.onload = () => {
      drawFrame(0);
      setPosterReady(true);
    };
    imgs[0] = poster;
    imagesRef.current = imgs;

    let cancelled = false;
    const preloadRest = async () => {
      if (cancelled) return;
      for (let i = 1; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.src = framePath(i);
        imgs[i] = img;
      }
      // Decode every frame OFF the scroll path (first-draw JPEG decode on the
      // main thread is the #1 cause of scrub jank on phones). On mobile, also
      // pre-crop + pre-scale each frame to the exact canvas size as ImageBitmap
      // so every subsequent draw is a trivial 1:1 GPU blit.
      const canvas = canvasRef.current;
      const makeBitmaps =
        coarseRef.current && typeof window.createImageBitmap === "function" && canvas;
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (cancelled) return;
        const img = imgs[i];
        if (!img) continue;
        try {
          await img.decode();
          if (makeBitmaps) {
            const cw = canvas.clientWidth;
            const ch = canvas.clientHeight;
            if (cw > 0 && ch > 0) {
              // center-crop the source to the canvas aspect, then resize
              const ir = img.naturalWidth / img.naturalHeight;
              const cr = cw / ch;
              let sw = img.naturalWidth;
              let sh = img.naturalHeight;
              let sx = 0;
              let sy = 0;
              if (ir > cr) {
                sw = sh * cr;
                sx = (img.naturalWidth - sw) / 2;
              } else {
                sh = sw / cr;
                sy = (img.naturalHeight - sh) / 2;
              }
              bitmapsRef.current[i] = await createImageBitmap(img, sx, sy, sw, sh, {
                resizeWidth: cw,
                resizeHeight: ch,
                resizeQuality: "medium",
              });
            }
          }
        } catch {
          /* frame stays as plain <img>; cover-draw fallback handles it */
        }
      }
    };

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number;
    let timeoutId: ReturnType<typeof setTimeout>;
    if (w.requestIdleCallback) idleId = w.requestIdleCallback(preloadRest, { timeout: 1500 });
    else timeoutId = setTimeout(preloadRest, 500);

    return () => {
      cancelled = true;
      if (w.cancelIdleCallback && idleId) w.cancelIdleCallback(idleId);
      if (timeoutId) clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Canvas drawing (cover fit, DPR-aware; opaque ctx = faster compositing) ----
  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bitmap = bitmapsRef.current[index];
    const img = imagesRef.current[index];
    const source: ImageBitmap | HTMLImageElement | null =
      bitmap ?? (img && img.complete && img.naturalWidth > 0 ? img : null);
    if (!source) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Mobile GPUs: draw at 1x — the frame is 100svh, DPR2 means 4x the pixels.
    const dpr = coarseRef.current ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const sw = "naturalWidth" in source ? source.naturalWidth : source.width;
    const sh = "naturalHeight" in source ? source.naturalHeight : source.height;
    if (sw === cw && sh === ch) {
      // pre-cropped bitmap: 1:1 blit, nothing to compute
      ctx.drawImage(source, 0, 0, cw, ch);
      return;
    }
    // cover
    const ir = sw / sh;
    const cr = cw / ch;
    let dw = cw;
    let dh = ch;
    if (cr > ir) dh = cw / ir;
    else dw = ch * ir;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;
    ctx.drawImage(source, dx, dy, dw, dh);
  }

  // ---- Map scroll -> frame via an interpolated rAF loop ----
  // Scroll only updates the *target*; a self-stopping rAF loop lerps the
  // current frame toward it (max one draw per display frame, smooth catch-up,
  // zero work once settled). This is what makes the scrub feel fluid on touch.
  function tick() {
    const target = targetRef.current;
    const cur = currentRef.current;
    const next = Math.abs(target - cur) < 0.04 ? target : cur + (target - cur) * 0.24;
    currentRef.current = next;
    const index = Math.round(next);
    if (index !== lastIndexRef.current) {
      lastIndexRef.current = index;
      drawFrame(index);
    }
    if (next !== target) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      runningRef.current = false;
    }
  }

  function kick() {
    if (runningRef.current) return;
    runningRef.current = true;
    rafRef.current = requestAnimationFrame(tick);
  }

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    targetRef.current = Math.min(FRAME_COUNT - 1, Math.max(0, p * (FRAME_COUNT - 1)));
    kick();
  });

  // stop the loop cleanly on unmount; free decoded bitmaps
  useEffect(() => {
    const bitmaps = bitmapsRef.current;
    return () => {
      cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
      for (const b of bitmaps) b?.close?.();
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      const p = scrollYProgress.get();
      const index = Math.min(FRAME_COUNT - 1, Math.round(p * (FRAME_COUNT - 1)));
      drawFrame(index);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // subtle zoom parallax on the footage (hooks must run before any early return)
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const cinematicFade = useTransform(scrollYProgress, [0.9, 1], [1, 0.55]);

  // ---- Reduced motion: static poster + stacked info, no pinning ----
  if (reduce) {
    return <StaticHero />;
  }

  return (
    <section aria-label="Introducción SOLUPOWER" className="relative">
      {/* Tall driver: scroll scrubs the sequence (shorter ride on mobile) */}
      <div ref={wrapRef} className="relative h-[300vh] md:h-[500vh]">
        {/* Pinned stage */}
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* Mobile: no scroll-linked zoom — rescaling a full-screen canvas re-rasterizes every frame */}
          <motion.div
            style={coarse ? { opacity: cinematicFade } : { scale, opacity: cinematicFade }}
            className="absolute inset-0"
          >
            <canvas ref={canvasRef} className="h-full w-full" aria-hidden />
          </motion.div>

          {/* Legibility + blend scrims (keep the page's light canvas continuity) */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(6,17,38,0.62)_0%,rgba(6,17,38,0.28)_38%,transparent_70%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38vh] bg-[linear-gradient(180deg,transparent,#F5F7FA_92%)]" />

          {/* Loading shimmer until the poster frame is painted */}
          {!posterReady && (
            <div className="absolute inset-0 animate-pulse bg-[linear-gradient(120deg,#1E5FBF,#35B6D8_55%,#22A79B)] opacity-40" />
          )}

          {/* --- Progressive company info, phased over the footage --- */}
          <div className="container-x absolute inset-0 z-10 flex items-center">
            <Phase p={scrollYProgress} range={[0.0, 0.06, 0.2, 0.26]} still={coarse}>
              <Eyebrow>Soluciones Industriales RM S.A.S.</Eyebrow>
              <h1 className="mt-5 max-w-2xl font-display text-hero font-semibold text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
                Soluciones industriales para empresas que buscan{" "}
                <span className="bg-[linear-gradient(100deg,#7ad0ec,#8fe3c9)] bg-clip-text text-transparent">
                  excelencia.
                </span>
              </h1>
              <p className="mt-6 max-w-md text-lg text-white/80">
                Suministro, renting, mantenimiento y servicio técnico especializado de equipos de limpieza industrial.
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

            <Phase p={scrollYProgress} range={[0.28, 0.34, 0.46, 0.52]} still={coarse}>
              <Eyebrow>Ingeniería y precisión</Eyebrow>
              <h2 className="mt-5 max-w-2xl font-display text-display font-semibold text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
                Más de una década elevando el estándar de la industria.
              </h2>
              <p className="mt-6 max-w-lg text-lg text-white/80">
                Combinamos tecnología de punta, técnicos certificados y un método claro
                para mantener tu operación en marcha, sin fricciones.
              </p>
            </Phase>

            <Phase p={scrollYProgress} range={[0.54, 0.6, 0.72, 0.78]} still={coarse}>
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

            <Phase p={scrollYProgress} range={[0.8, 0.86, 0.98, 1.0]} last still={coarse}>
              <Eyebrow>Comencemos</Eyebrow>
              <h2 className="mt-5 max-w-2xl font-display text-display font-semibold text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
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
  still = false,
  children,
}: {
  p: MotionValue<number>;
  range: [number, number, number, number];
  last?: boolean;
  /** Mobile: skip the scroll-linked blur filter (repaints are too expensive). */
  still?: boolean;
  children: React.ReactNode;
}) {
  const [a, b, c, d] = range;
  const opacity = useTransform(p, [a, b, c, d], [0, 1, 1, last ? 1 : 0]);
  const y = useTransform(p, [a, b, c, d], [40, 0, 0, last ? 0 : -40]);
  const blur = useTransform(p, [a, b, c, d], [10, 0, 0, last ? 0 : 10]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.div
      style={still ? { opacity, y } : { opacity, y, filter }}
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

/** Reduced-motion fallback: first frame as a static poster + stacked copy. */
function StaticHero() {
  return (
    <section aria-label="Introducción SOLUPOWER" className="relative min-h-[92svh] overflow-hidden pt-28">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${framePath(0)})` }}
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
            Suministro, renting, mantenimiento y servicio técnico especializado de equipos de limpieza industrial.
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
