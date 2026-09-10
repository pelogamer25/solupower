import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * SOLUPOWER lockup: the isotype plus the wordmark.
 *
 * The mark comes from /public/logo.png rather than being inlined, so replacing
 * that one file swaps the logo everywhere it appears — navbar and footer —
 * without touching code. Two companions are NOT driven by it and have to be
 * replaced by hand if the artwork ever changes: app/icon.svg (browser tab) and
 * public/logo-white.svg (the knockout on the social card).
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/logo.png"
        alt="SOLUPOWER"
        width={40}
        height={40}
        // Sits in the fixed header, visible before any scroll: lazy-loading it
        // would show a gap on first paint.
        priority
        className="h-10 w-10 shrink-0 object-contain"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[19px] font-extrabold tracking-tight text-[#1F4E8C]">
          SOLUPOWER
        </span>
        <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.22em] text-ink-faint">
          Soluciones Industriales
        </span>
      </span>
    </span>
  );
}
