import { cn } from "@/lib/utils";
import LogoMark from "@/components/ui/LogoMark";

/** SOLUPOWER lockup: the hexagon isotype plus the wordmark. */
export default function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-10 w-10 shrink-0" />
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
