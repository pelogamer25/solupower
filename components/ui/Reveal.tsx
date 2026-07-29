"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useCoarsePointer } from "@/lib/useCoarsePointer";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  once?: boolean;
  blur?: boolean;
}

const offset = 40;

/** Elegant scroll-reveal: fade + blur-in + directional slide. */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  once = true,
  blur = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const coarse = useCoarsePointer();

  // Touch / reduced-motion: render content statically visible. The scroll-reveal
  // (opacity + blur + slide) can stall in some mobile in-app browsers, leaving
  // blocks stuck faded/blurred — so content visibility must never depend on it.
  // The elegant reveal stays a desktop enhancement.
  if (coarse || reduce) {
    return <div className={className}>{children}</div>;
  }

  const withBlur = blur;
  const withSlide = true;

  const from = !withSlide
    ? {}
    : direction === "up"
    ? { y: offset }
    : direction === "down"
    ? { y: -offset }
    : direction === "left"
    ? { x: offset }
    : direction === "right"
    ? { x: -offset }
    : {};

  const variants: Variants = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, ...(withBlur ? { filter: "blur(12px)" } : {}), ...from },
    visible: {
      opacity: 1,
      // Only write x/y (and thus a transform) when we actually slide — omitting
      // them on touch keeps the element off a composited layer, so text stays crisp.
      ...(withSlide ? { x: 0, y: 0 } : {}),
      ...(withBlur ? { filter: "blur(0px)" } : {}),
      transition: {
        duration: 0.85,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
    >
      {children}
    </motion.div>
  );
}
