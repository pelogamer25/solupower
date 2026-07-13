"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { createElement } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  /** Element to render, e.g. "h1", "h2", "p". */
  as?: keyof HTMLElementTagNameMap;
  delay?: number;
  once?: boolean;
}

/** Word-by-word masked reveal for headlines. */
export default function TextReveal({
  text,
  className,
  as = "h2",
  delay = 0,
  once = true,
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : 0.055, delayChildren: delay },
    },
  };

  const word: Variants = {
    hidden: reduce ? { opacity: 0 } : { y: "110%" },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionTag = motion[as as "h2"];

  return createElement(
    MotionTag,
    {
      className,
      variants: container,
      initial: "hidden",
      whileInView: "visible",
      viewport: { once, margin: "-10% 0px" },
    },
    words.map((w, i) => (
      <span
        key={`${w}-${i}`}
        className="inline-block overflow-hidden align-bottom"
        style={{ paddingBottom: "0.08em", marginBottom: "-0.08em" }}
      >
        <motion.span variants={word} className="inline-block">
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      </span>
    )),
  );
}
