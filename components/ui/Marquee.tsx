"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MarqueeProps {
  items: ReactNode[];
  className?: string;
}

/**
 * Infinite, seamless marquee. CSS-only track, duplicated for the loop.
 *
 * Two things it has to get right on a phone:
 *
 * 1. It has to be stoppable. `group-hover` never fires on a touchscreen, so
 *    the strip used to slide forever with no way to hold it still and read a
 *    name. Touching it now pauses it too.
 * 2. It shouldn't burn battery off-screen. An observer stops the animation
 *    when the strip leaves the viewport — `content-visibility: auto` would do
 *    this in pure CSS, but without an intrinsic size the element collapses
 *    while skipped and the page jumps under the reader's thumb.
 */
export default function Marquee({ items, className }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [held, setHeld] = useState(false);
  // One source of truth: an inline animationPlayState beats any class, so the
  // hover pause has to live here too or it would be silently overridden.
  const paused = !visible || hovered || held;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "200px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const track = (
    <ul className="flex shrink-0 items-center gap-4 pr-4" aria-hidden={false}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onPointerDown={() => setHeld(true)}
      onPointerUp={() => setHeld(false)}
      onPointerCancel={() => setHeld(false)}
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        style={{ animationPlayState: paused ? "paused" : "running" }}
        className="animate-marquee flex min-w-full shrink-0 motion-reduce:animate-none"
      >
        {track}
        <span aria-hidden>{track}</span>
      </div>
    </div>
  );
}
