import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import Button from "@/components/ui/Button";
import { navLinks } from "@/config/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center justify-center px-6 pt-32" aria-label="Página no encontrada">
      <div className="glass container-x max-w-2xl rounded-5xl p-10 text-center sm:p-16">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[linear-gradient(135deg,#1E5FBF,#35B6D8)] text-white shadow-glow">
          <Compass size={28} />
        </span>
        <p className="mt-8 font-display text-7xl font-semibold text-gradient">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-ink">
          Esta página no existe
        </h1>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          La ruta que buscas no está disponible o ha sido movida. Volvamos a un lugar seguro.
        </p>

        <div className="mt-8 flex justify-center">
          <Button href="/" variant="primary" icon={<ArrowLeft size={17} />}>
            Volver al inicio
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2 border-t border-white/40 pt-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-white/50 bg-white/40 px-4 py-2 text-sm text-ink-soft backdrop-blur-md transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
