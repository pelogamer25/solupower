"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Slim reading-progress bar with the brand gradient. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-[linear-gradient(90deg,#0A3D91,#1E5FBF,#35B6D8,#22A79B)]"
    />
  );
}
