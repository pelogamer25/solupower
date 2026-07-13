"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

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

  const from =
    direction === "up"
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
      : { opacity: 0, filter: blur ? "blur(12px)" : "blur(0px)", ...from },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
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
