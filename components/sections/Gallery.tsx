"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { galleryItems } from "@/lib/data/content";

// Illustrative industrial frames (public/hero) mapped to each gallery item.
const frames = [10, 18, 26, 33, 4, 12];
const frameSrc = (i: number) => `/hero/frame-${String(frames[i % frames.length]).padStart(2, "0")}.jpg`;

const tones = [
  "from-brand-deep via-brand-blue to-brand-cyan",
  "from-brand-teal via-brand-teal to-brand-green",
  "from-brand-blue via-brand-cyan to-brand-teal",
  "from-brand-cyan via-brand-blue to-brand-deep",
  "from-brand-green via-brand-teal to-brand-cyan",
  "from-brand-blue via-brand-teal to-brand-green",
];

interface Tile {
  src: string;
  /** Caption data — only for the illustrative placeholder items. */
  title?: string;
  tag?: string;
  /** Real photos are shown complete in the lightbox (no crop). */
  real: boolean;
}

interface GalleryProps {
  /** Real work photos (from /public/trabajos). If present they replace the placeholders. */
  photos?: string[];
}

export default function Gallery({ photos = [] }: GalleryProps) {
  const [active, setActive] = useState<number | null>(null);

  const tiles: Tile[] = photos.length
    ? photos.map((src) => ({ src, real: true }))
    : galleryItems.map((item, i) => ({
        src: frameSrc(i),
        title: item.title,
        tag: item.tag,
        real: false,
      }));

  const activeTile = active !== null ? tiles[active] : null;

  return (
    <section id="galeria" className="relative py-28 sm:py-36" aria-label="Galería">
      <div className="container-x">
        <SectionHeading
          eyebrow="Galería"
          title="Trabajo real, resultados visibles"
          description="Una muestra de intervenciones, equipos en acción y superficies transformadas."
          align="center"
        />

        {/* Overlap-proof grid: every tile owns its aspect ratio — no fixed rows, no spans. */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {tiles.map((tile, i) => (
            <motion.button
              key={tile.src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={tile.title ?? `Ver foto ${i + 1} de trabajo real de SOLUPOWER`}
              initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group glass relative aspect-square overflow-hidden rounded-4xl p-1.5 text-left"
            >
              <div className={`relative h-full w-full overflow-hidden rounded-[1.6rem] bg-gradient-to-br ${tones[i % tones.length]}`}>
                <Image
                  src={tile.src}
                  alt={
                    tile.title
                      ? `${tile.title} — ${tile.tag} de limpieza industrial por SOLUPOWER`
                      : "Trabajo real de limpieza y mantenimiento industrial realizado por SOLUPOWER"
                  }
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {tile.title && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                    <div className="absolute inset-0 flex items-end p-5">
                      <div>
                        <span className="rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium text-ink backdrop-blur-md">
                          {tile.tag}
                        </span>
                        <h3 className="mt-2 font-display text-base font-semibold text-white drop-shadow">
                          {tile.title}
                        </h3>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeTile && active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[120] grid place-items-center bg-ink/30 p-6 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative w-full max-w-3xl overflow-hidden rounded-5xl p-2"
            >
              <div className={`relative aspect-[16/10] w-full overflow-hidden rounded-[1.9rem] ${activeTile.real ? "bg-ink/5" : `bg-gradient-to-br ${tones[active % tones.length]}`}`}>
                <Image
                  src={activeTile.src}
                  alt={
                    activeTile.title
                      ? `${activeTile.title} — ${activeTile.tag} de limpieza industrial por SOLUPOWER`
                      : "Trabajo real de limpieza y mantenimiento industrial realizado por SOLUPOWER"
                  }
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className={activeTile.real ? "object-contain" : "object-cover"}
                />
                {activeTile.title && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                    <div className="absolute inset-0 flex items-end p-7">
                      <div>
                        <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-ink">
                          {activeTile.tag}
                        </span>
                        <h3 className="mt-3 font-display text-2xl font-semibold text-white drop-shadow">
                          {activeTile.title}
                        </h3>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Cerrar"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-ink backdrop-blur-md transition-transform hover:scale-105"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
