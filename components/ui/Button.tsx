"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "glass" | "ghost" | "whatsapp";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
  external?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit";
}

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300 ease-smooth will-change-transform";

const variants: Record<Variant, string> = {
  primary:
    "text-white shadow-glow bg-[linear-gradient(100deg,#0A3D91,#1E5FBF_45%,#35B6D8)] hover:brightness-110",
  glass:
    "glass text-ink hover:bg-white/70",
  ghost:
    "text-ink border border-white/50 bg-white/30 backdrop-blur-md hover:bg-white/50",
  whatsapp:
    "text-white bg-[linear-gradient(100deg,#22A79B,#3E9E6E)] hover:brightness-110",
};

/** Magnetic button: subtly follows the cursor for a premium, tactile feel. */
export default function Button({
  children,
  href,
  variant = "primary",
  className,
  icon,
  external,
  ariaLabel,
  type = "button",
}: ButtonProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.3 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  const inner = (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn(base, variants[variant], className)}
    >
      {content}
    </motion.span>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className="inline-flex">
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} aria-label={ariaLabel} className="inline-flex">
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} aria-label={ariaLabel} className="inline-flex">
      {inner}
    </button>
  );
}
