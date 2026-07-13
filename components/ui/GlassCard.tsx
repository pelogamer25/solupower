import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "section";
  interactive?: boolean;
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
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        "glass relative overflow-hidden rounded-4xl",
        interactive &&
          "transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-white/70 hover:shadow-glass-lg",
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
