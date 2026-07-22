"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
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
            className="glass relative aspect-[16/9] w-full select-none overflow-hidden rounded-5xl p-2"
            onMouseDown={(e) => {
              dragging.current = true;
              setFromClientX(e.clientX);
            }}
            onMouseMove={(e) => dragging.current && setFromClientX(e.clientX)}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
            onTouchStart={(e) => setFromClientX(e.touches[0].clientX)}
            onTouchMove={(e) => setFromClientX(e.touches[0].clientX)}
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
                  aria-label="Comparar antes y después"
                  aria-valuenow={Math.round(pos)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  role="slider"
                  onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") setPos((p) => Math.max(2, p - 4));
                    if (e.key === "ArrowRight") setPos((p) => Math.min(98, p + 4));
                  }}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-12 w-12 cursor-ew-resize place-items-center rounded-full bg-white text-brand-blue shadow-glass-lg"
                >
                  <MoveHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>
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
