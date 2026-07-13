"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data/content";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="proceso" className="relative py-28 sm:py-36" aria-label="Nuestro proceso">
      <div className="container-x">
        <SectionHeading
          eyebrow="Proceso"
          title="Un método claro, de principio a fin"
          description="Cuatro pasos que garantizan resultados consistentes y una experiencia sin fricciones."
        />

        <div ref={ref} className="relative mt-16 pl-8 sm:pl-0">
          {/* Rail */}
          <div className="absolute left-[15px] top-2 h-full w-0.5 bg-white/50 sm:left-1/2 sm:-translate-x-1/2" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-[15px] top-2 h-full w-0.5 origin-top bg-[linear-gradient(180deg,#0A3D91,#1E5FBF,#35B6D8,#22A79B)] sm:left-1/2 sm:-translate-x-1/2"
          />

          <ol className="space-y-10 sm:space-y-0">
            {processSteps.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={step.n}
                  className={`relative sm:grid sm:grid-cols-2 sm:gap-12 ${
                    left ? "" : "sm:[&>*]:col-start-2"
                  } sm:py-8`}
                >
                  {/* Node */}
                  <span className="absolute left-[15px] top-2 z-10 -translate-x-1/2 sm:left-1/2">
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-white/70 bg-white text-xs font-semibold text-brand-blue shadow-glass">
                      {step.n}
                    </span>
                  </span>

                  <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-15% 0px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`glass ml-10 rounded-4xl p-7 sm:ml-0 ${
                      left ? "sm:mr-10 sm:text-right" : "sm:ml-10"
                    }`}
                  >
                    <h3 className="font-display text-xl font-semibold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
