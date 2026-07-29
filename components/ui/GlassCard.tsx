import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "section";
  interactive?: boolean;
  /** Soft pastel-blue halo behind the card (used on service & product cards). */
  pastel?: boolean;
}

/**
 * The core surface. CSS-only hover for performance — a subtle lift, a brighter
 * border and an ambient glow. No per-card JS.
 */
export default function GlassCard({
  children,
  className,
  as: Tag = "div",
  interactive = true,
  pastel = false,
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        "glass relative overflow-hidden rounded-4xl",
        pastel && "shadow-pastel",
        interactive && "transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-white/70",
        interactive && (pastel ? "hover:shadow-pastel-lg" : "hover:shadow-glass-lg"),
        className,
      )}
    >
      {/* top sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
      />
      {children}
    </Tag>
  );
}
