"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

interface BeforeAfterProps {
  /** Real photos (from /public/antes-despues). Missing → gradient placeholder. */
  antes?: string;
  despues?: string;
}

/** Interactive before/after comparator with a draggable handle. */
export default function BeforeAfter({ antes, despues }: BeforeAfterProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, pct)));
  }, []);

  /**
   * Pointer events cover mouse, pen and touch at once, and pointer capture
   * keeps the drag alive when the finger leaves the box.
   *
   * The rule that matters on a phone: a touch only starts a drag if it began
   * on the handle. Anywhere else the finger belongs to the page — dragging
   * from the image meant scrolling past this section moved the divider
   * instead of scrolling, which read as the page being stuck.
   */
  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const onHandle = (e.target as HTMLElement).closest("[data-ba-handle]") !== null;
      if (e.pointerType === "touch" && !onHandle) return;
      dragging.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      setFromClientX(e.clientX);
    },
    [setFromClientX],
  );

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  }, []);

  return (
    <section id="antes-despues" className="relative py-28 sm:py-36" aria-label="Antes y después">
      <div className="container-x">
        <SectionHeading
          eyebrow="Antes y después"
          title="El resultado habla por sí solo"
          description="Arrastra el control para comparar el estado de una superficie antes y después de nuestra intervención."
          align="center"
        />

        <div className="mt-14">
          <div
            ref={containerRef}
            // pan-y tells the browser the vertical axis is the page's; only the
            // handle (touch-action: none) claims the horizontal one.
            style={{ touchAction: "pan-y" }}
            className="glass relative aspect-[4/3] w-full select-none overflow-hidden rounded-5xl p-2 sm:aspect-[16/9]"
            onPointerDown={onPointerDown}
            onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[1.9rem]">
              {/* AFTER (base layer) */}
              <div className="absolute inset-0 bg-[linear-gradient(120deg,#1E5FBF,#35B6D8_55%,#22A79B)]">
                {despues ? (
                  <Image
                    src={despues}
                    alt="Superficie después de la intervención de SOLUPOWER"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className="grain absolute inset-0 opacity-30" />
                )}
                <Label side="right">Después</Label>
              </div>

              {/* BEFORE (clipped layer) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(120deg,#6b7280,#4b5563_55%,#374151)]">
                  {antes ? (
                    <Image
                      src={antes}
                      alt="Superficie antes de la intervención de SOLUPOWER"
                      fill
                      sizes="100vw"
                      className="object-cover"
                      draggable={false}
                    />
                  ) : (
                    <div className="grain absolute inset-0 opacity-50" />
                  )}
                  <Label side="left">Antes</Label>
                </div>
              </div>

              {/* Handle */}
              <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
                <div className="absolute inset-y-0 -translate-x-1/2">
                  <div className="h-full w-0.5 bg-white/90" />
                </div>
                <button
                  type="button"
                  data-ba-handle
                  style={{ touchAction: "none" }}
                  aria-label="Comparar antes y después"
                  aria-valuenow={Math.round(pos)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  role="slider"
                  onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") setPos((p) => Math.max(2, p - 4));
                    if (e.key === "ArrowRight") setPos((p) => Math.min(98, p + 4));
                  }}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-12 w-12 cursor-ew-resize place-items-center rounded-full bg-white text-brand-blue shadow-glass-lg outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/40"
                >
                  <MoveHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/casos-de-exito"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue"
          >
            Ver más casos de pulido de pisos y lavado de alfombras
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Label({ side, children }: { side: "left" | "right"; children: string }) {
  return (
    <span
      className={`absolute top-5 ${side === "left" ? "left-5" : "right-5"} rounded-full bg-black/25 px-3.5 py-1.5 text-xs font-medium uppercase tracking-widest text-white backdrop-blur-md`}
    >
      {children}
    </span>
  );
}
