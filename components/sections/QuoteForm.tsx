"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "done";

export default function QuoteForm({ defaultProduct }: { defaultProduct?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(form: HTMLFormElement) {
    const data = new FormData(form);
    const next: Record<string, string> = {};
    if (!String(data.get("name")).trim()) next.name = "Ingresa tu nombre.";
    const email = String(data.get("email")).trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Ingresa un correo válido.";
    if (!String(data.get("message")).trim()) next.message = "Cuéntanos qué necesitas.";
    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validate(e.currentTarget);
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("loading");
    // Demo submit — wire to a Server Action or API route in production.
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="glass flex flex-col items-center rounded-5xl px-8 py-16 text-center" role="status" aria-live="polite">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-[linear-gradient(135deg,#22A79B,#3E9E6E)] text-white">
          <Check size={30} />
        </span>
        <h3 className="mt-6 font-display text-2xl font-semibold text-ink">¡Solicitud enviada!</h3>
        <p className="mt-2 max-w-sm text-ink-soft">
          Gracias por escribirnos. Nuestro equipo se pondrá en contacto contigo muy pronto.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-5xl p-6 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre" name="name" error={errors.name} autoComplete="name" />
        <Field label="Empresa" name="company" required={false} autoComplete="organization" />
        <Field label="Correo" name="email" type="email" error={errors.email} autoComplete="email" />
        <Field label="Teléfono" name="phone" type="tel" required={false} autoComplete="tel" />

        <div className="sm:col-span-2">
          <Label htmlFor="service">Servicio de interés</Label>
          <select
            id="service"
            name="service"
            defaultValue={defaultProduct ?? ""}
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
        disabled={status === "loading"}
        className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(100deg,#0A3D91,#1E5FBF_45%,#35B6D8)] px-7 py-4 text-sm font-medium text-white shadow-glow transition hover:brightness-110 disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={17} className="animate-spin" /> Enviando…
          </>
        ) : (
          <>
            Enviar solicitud
            <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
          </>
        )}
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
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
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
