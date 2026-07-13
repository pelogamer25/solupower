import Reveal from "@/components/ui/Reveal";
import TextReveal from "@/components/ui/TextReveal";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-brand-blue backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <TextReveal
        as={as}
        text={title}
        className={cn(
          "mt-5 font-display font-semibold text-display text-ink",
          align === "center" && "mx-auto",
        )}
      />
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
