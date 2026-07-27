"use client";

import { useEffect, useState } from "react";

/**
 * True on touch-first devices (phones/tablets). Used to degrade expensive
 * effects (blur filters, canvas DPR, smooth-scroll loops) on mobile GPUs.
 * Starts false (SSR-safe) and resolves after mount.
 */
export function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setCoarse(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setCoarse(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return coarse;
}
