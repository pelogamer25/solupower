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
    // Some phones — especially in-app / embedded browsers — misreport
    // `(pointer: coarse)` as false, which would (wrongly) give them the heavy
    // desktop path (blur filters, stalling reveal animations). Combine signals:
    // any of these being true means "treat as touch".
    const detect = () =>
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches ||
      (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);

    setCoarse(detect());
    const mq = window.matchMedia("(pointer: coarse)");
    const onChange = () => setCoarse(detect());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return coarse;
}
