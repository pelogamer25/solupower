"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { ResolvedRentalEquipment } from "@/lib/rentalPhoto";

const INTERVAL = 4500;

/**
 * Auto-advancing showcase of the equipment available for rent.
 *
 * Slides crossfade with plain CSS opacity (all of them stay mounted) rather
 * than a scroll- or viewport-driven animation: those can stall in mobile
 * in-app browsers and leave a slide stuck invisible. Autoplay pauses on hover,
 * on focus and when the tab is hidden, and never starts under reduced motion.
 */
export default function RentalCarousel({ items }: { items: ResolvedRentalEquipment[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number) => setIndex(((next % items.length) + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    if (reduce || paused || items.length < 2) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % items.length), INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [reduce, paused, items.length]);

  // Don't advance in a background tab (saves battery, avoids a jump on return)
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div
      className="glass overflow-hidden rounded-5xl p-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Equipos disponibles en alquiler"
    >
      <div className="grid items-stretch sm:grid-cols-2">
        {/* Photo stack */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.7rem] bg-white">
          {items.map((item, i) => (
            <Image
              key={item.photo}
              src={item.photo}
              alt={`${item.name} en alquiler — SOLUPOWER`}
              fill
              sizes="(max-width: 640px) 92vw, 45vw"
              priority={i === 0}
              className={`object-contain p-6 transition-opacity duration-700 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Copy stack */}
        <div className="relative min-h-[13rem] sm:min-h-[16rem]">
          {items.map((item, i) => (
            <div
              key={item.name}
              aria-hidden={i !== index}
              className={`absolute inset-0 flex flex-col justify-center p-7 transition-opacity duration-700 sm:p-9 ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-blue">
                En alquiler
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{item.name}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{item.description}</p>
              <Link
                href={item.href}
                tabIndex={i === index ? 0 : -1}
                className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue"
              >
                Ver {item.name.toLowerCase()}
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <div className="flex items-center gap-2" role="tablist" aria-label="Elegir equipo">
          {items.map((item, i) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={item.name}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-7 bg-brand-blue" : "w-2 bg-ink/20 hover:bg-ink/35"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Equipo anterior"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/50 bg-white/50 text-ink transition-colors hover:bg-white/80"
          >
            <ChevronLeft size={17} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Equipo siguiente"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/50 bg-white/50 text-ink transition-colors hover:bg-white/80"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      {/* Screen-reader announcement of the current slide */}
      <p className="sr-only" aria-live="polite">
        {items[index].name}: {items[index].description}
      </p>
    </div>
  );
}
