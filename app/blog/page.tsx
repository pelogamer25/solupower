import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import { pageMetadata } from "@/lib/seo";
import { posts } from "@/lib/data/content";

export const metadata: Metadata = pageMetadata({
  title: "Blog — Limpieza y mantenimiento industrial",
  description:
    "Artículos y guías sobre limpieza industrial, restauración de pisos, elección de equipos y mantenimiento preventivo. Conocimiento técnico de SOLUPOWER.",
  path: "/blog",
});

const categories = ["Todos", ...Array.from(new Set(posts.map((p) => p.category)))];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Conocimiento que impulsa tu operación"
        description="Guías prácticas y perspectivas técnicas sobre el mundo de la limpieza y el mantenimiento industrial."
        crumbs={[{ name: "Blog", path: "/blog" }]}
      />

      <section className="py-8" aria-label="Categorías del blog">
        <div className="container-x flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-white/50 bg-white/40 px-4 py-2 text-sm text-ink-soft backdrop-blur-md"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      <section className="py-8" aria-label="Artículos">
        <div className="container-x grid gap-5 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.08}>
              <GlassCard as="article" className="group h-full">
                <Link href={`/blog/${post.slug}`} className="flex h-full flex-col p-7">
                  <div className="flex items-center gap-3 text-xs text-ink-faint">
                    <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 font-medium text-brand-blue">{post.category}</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="mt-4 font-display text-lg font-semibold text-ink">{post.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-white/40 pt-5 text-xs text-ink-faint">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <ArrowUpRight size={15} className="text-brand-blue transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
