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
  // Mobile: no transform/blur layers on revealed blocks. A lingering composited
  // layer (from an animated transform or filter) makes mobile browsers rasterize
  // the text below device resolution → blurry text. On touch, fade opacity only.
  const coarse = useCoarsePointer();
  const withBlur = blur && !coarse;
  const withSlide = !coarse;

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
