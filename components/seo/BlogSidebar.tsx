import Link from "next/link";
import { getRelated } from "@/lib/data/relations";
import { posts } from "@/lib/data/content";

/** Blog sidebar: dense internal linking for authority flow and discovery. */
export default function BlogSidebar({ currentSlug }: { currentSlug: string }) {
  const related = getRelated(currentSlug);
  const categories = Array.from(new Set(posts.map((p) => p.category)));
  const latest = posts.filter((p) => p.slug !== currentSlug).slice(0, 4);

  return (
    <aside className="space-y-5" aria-label="Contenido relacionado del blog">
      {related.servicios.length > 0 && (
        <SidebarCard title="Servicios relacionados">
          {related.servicios.map((s) => (
            <SidebarLink key={s.slug} href={s.href}>
              {s.anchor}
            </SidebarLink>
          ))}
        </SidebarCard>
      )}

      {related.productos.length > 0 && (
        <SidebarCard title="Productos relacionados">
          {related.productos.map((p) => (
            <SidebarLink key={p.slug} href={p.href}>
              {p.anchor}
            </SidebarLink>
          ))}
        </SidebarCard>
      )}

      {related.articulos.length > 0 && (
        <SidebarCard title="Artículos relacionados">
          {related.articulos.map((a) => (
            <SidebarLink key={a.slug} href={a.href}>
              {a.title}
            </SidebarLink>
          ))}
        </SidebarCard>
      )}

      <SidebarCard title="Categorías">
        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map((cat) => (
            <Link
              key={cat}
              href="/blog"
              className="rounded-full border border-white/50 bg-white/40 px-3 py-1.5 text-xs text-ink-soft transition-colors hover:text-brand-blue"
            >
              {cat}
            </Link>
          ))}
        </div>
      </SidebarCard>

      <SidebarCard title="Últimos artículos">
        {latest.map((p) => (
          <SidebarLink key={p.slug} href={`/blog/${p.slug}`}>
            {p.title}
          </SidebarLink>
        ))}
      </SidebarCard>
    </aside>
  );
}

function SidebarCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-4xl p-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">{title}</h2>
      <div className="mt-3 space-y-1">{children}</div>
    </div>
  );
}

function SidebarLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block border-b border-white/30 py-2 text-sm text-ink-soft transition-colors last:border-0 hover:text-brand-blue"
    >
      {children}
    </Link>
  );
}
