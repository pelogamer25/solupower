"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Check, MessageCircle } from "lucide-react";
import { services } from "@/lib/data/services";
import { quoteMessage, waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Quote form.
 *
 * There is no inbox behind this site, so the form doesn't "send" — it composes
 * a WhatsApp message from what was typed and opens the chat with it prefilled.
 * The visitor still gets to answer at their own pace, and the sales team gets
 * the lead in the channel they actually watch.
 *
 * Because of that, email is optional: the reply happens on WhatsApp, and a
 * required email is friction that buys nothing.
 */
export default function QuoteForm({ product }: { product?: string }) {
  const [sent, setSent] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const pathname = usePathname() || "/cotizacion";

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const next: Record<string, string> = {};
    if (!get("name")) next.name = "Ingresa tu nombre.";
    const email = get("email");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Ese correo no parece válido.";
    if (!get("message")) next.message = "Cuéntanos qué necesitas.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const serviceSlug = get("service");
    const href = waLink(
      quoteMessage({
        name: get("name"),
        company: get("company"),
        email,
        phone: get("phone"),
        service: services.find((s) => s.slug === serviceSlug)?.title,
        product,
        message: get("message"),
        path: pathname,
      }),
    );

    // Opened straight from the submit gesture — an await here would break the
    // user-activation chain and the browser would block the tab.
    window.open(href, "_blank", "noopener,noreferrer");
    setSent(href);
  }

  if (sent) {
    return (
      <div className="glass flex flex-col items-center rounded-5xl px-8 py-16 text-center" role="status" aria-live="polite">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-[linear-gradient(135deg,#22A79B,#3E9E6E)] text-white">
          <Check size={30} />
        </span>
        <h3 className="mt-6 font-display text-2xl font-semibold text-ink">Te llevamos a WhatsApp</h3>
        <p className="mt-2 max-w-sm text-ink-soft">
          Abrimos el chat con tu solicitud ya escrita. Solo tienes que darle enviar y te
          respondemos de una vez.
        </p>
        {/* If the browser blocked the new tab, this is the way out. */}
        <a
          href={sent}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-medium text-white transition hover:brightness-110"
        >
          <MessageCircle size={17} />
          ¿No se abrió? Abrir WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-5xl p-6 sm:p-9">
      {/* Say where this goes before they start typing, not after. */}
      <p className="mb-6 flex items-start gap-2.5 rounded-2xl bg-[#25D366]/10 px-4 py-3 text-sm text-ink-soft">
        <MessageCircle size={17} className="mt-0.5 shrink-0 text-[#128C4A]" />
        <span>
          Al enviar, abrimos WhatsApp con tu solicitud ya redactada.
          {product && (
            <>
              {" "}
              Vamos a cotizar: <strong className="font-medium text-ink">{product}</strong>.
            </>
          )}
        </span>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre" name="name" error={errors.name} autoComplete="name" />
        <Field label="Empresa" name="company" required={false} autoComplete="organization" />
        <Field label="Correo" name="email" type="email" required={false} error={errors.email} autoComplete="email" />
        <Field label="Teléfono" name="phone" type="tel" required={false} autoComplete="tel" inputMode="tel" />

        <div className="sm:col-span-2">
          <Label htmlFor="service">Servicio de interés</Label>
          <select
            id="service"
            name="service"
            defaultValue=""
            className="mt-2 h-12 w-full rounded-2xl border border-white/50 bg-white/50 px-4 text-sm text-ink outline-none backdrop-blur-md transition focus:border-brand-blue"
          >
            <option value="">Selecciona una opción</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="message">Mensaje</Label>
          <textarea
            id="message"
            name="message"
            rows={4}
            aria-invalid={!!errors.message}
            className={cn(
              "mt-2 w-full rounded-2xl border bg-white/50 px-4 py-3 text-sm text-ink outline-none backdrop-blur-md transition focus:border-brand-blue",
              errors.message ? "border-red-400" : "border-white/50",
            )}
            placeholder="Cuéntanos sobre tu operación y qué necesitas…"
          />
          {errors.message && <ErrorText>{errors.message}</ErrorText>}
        </div>
      </div>

      <button
        type="submit"
        className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-medium text-white shadow-[0_6px_16px_-6px_rgba(37,211,102,0.8)] transition hover:brightness-110 sm:w-auto"
      >
        <MessageCircle size={17} />
        Enviar por WhatsApp
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required = true,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text";
}) {
  return (
    <div>
      <Label htmlFor={name}>
        {label} {!required && <span className="text-ink-faint">(opcional)</span>}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={cn(
          "mt-2 h-12 w-full rounded-2xl border bg-white/50 px-4 text-sm text-ink outline-none backdrop-blur-md transition focus:border-brand-blue",
          error ? "border-red-400" : "border-white/50",
        )}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
      {children}
    </label>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-1.5 text-xs text-red-500">
      {children}
    </p>
  );
}
