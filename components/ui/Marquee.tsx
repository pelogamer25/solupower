import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MarqueeProps {
  items: ReactNode[];
  className?: string;
}

/** Infinite, seamless marquee. CSS-only (duplicated track). Pauses on hover. */
export default function Marquee({ items, className }: MarqueeProps) {
  const track = (
    <ul className="flex shrink-0 items-center gap-4 pr-4" aria-hidden={false}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div className="animate-marquee flex min-w-full shrink-0 group-hover:[animation-play-state:paused]">
        {track}
        <span aria-hidden>{track}</span>
      </div>
    </div>
  );
}
