import { cn } from "@/lib/utils";

/** SOLUPOWER wordmark: a gradient "power" bolt mark + type. */
export default function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[linear-gradient(135deg,#0A3D91,#1E5FBF_50%,#35B6D8)] shadow-glow">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M13 2 4 13.5h6L11 22l9-11.5h-6L13 2Z"
            fill="white"
            fillOpacity="0.95"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-bold tracking-tight text-ink">
          SOLU<span className="text-gradient">POWER</span>
        </span>
        <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.22em] text-ink-faint">
          Soluciones Industriales
        </span>
      </span>
    </span>
  );
}
