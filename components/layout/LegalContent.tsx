import Reveal from "@/components/ui/Reveal";

export interface LegalSection {
  heading: string;
  body: string[];
}

export default function LegalContent({ sections }: { sections: LegalSection[] }) {
  return (
    <section className="py-12" aria-label="Contenido legal">
      <div className="container-x max-w-3xl">
        <Reveal>
          <div className="glass rounded-5xl p-8 sm:p-12">
            <div className="space-y-10">
              {sections.map((s, i) => (
                <div key={s.heading}>
                  <h2 className="font-display text-xl font-semibold text-ink">
                    <span className="mr-2 text-brand-blue">{String(i + 1).padStart(2, "0")}.</span>
                    {s.heading}
                  </h2>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-soft">
                    {s.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
