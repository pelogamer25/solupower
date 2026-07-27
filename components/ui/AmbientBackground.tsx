/**
 * The "single continuous canvas". A fixed, full-viewport field of slowly
 * drifting gradient light. Every section sits on top of this — so there are
 * no hard color breaks between sections, only depth and blur.
 * Pure CSS, server-rendered, zero JS.
 */
export default function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* base wash */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#F5F7FA_0%,#EEF3F8_50%,#F3F6FB_100%)]" />

      {/* drifting light fields — static & fewer on mobile (animated blur is GPU-heavy) */}
      <div className="absolute -left-[15%] -top-[20%] h-[75vh] w-[75vh] rounded-full bg-[radial-gradient(circle,rgba(30,95,191,0.30),transparent_62%)] blur-2xl sm:blur-3xl sm:animate-gradient-drift" />
      <div className="absolute right-[-10%] top-[8%] h-[68vh] w-[68vh] rounded-full bg-[radial-gradient(circle,rgba(53,182,216,0.28),transparent_62%)] blur-2xl sm:blur-3xl sm:animate-gradient-drift [animation-delay:-6s]" />
      <div className="hidden sm:block sm:animate-gradient-drift absolute left-[10%] top-[52%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,rgba(34,167,155,0.24),transparent_62%)] blur-3xl [animation-delay:-11s]" />
      <div className="hidden sm:block sm:animate-gradient-drift absolute bottom-[-18%] right-[6%] h-[72vh] w-[72vh] rounded-full bg-[radial-gradient(circle,rgba(62,158,110,0.20),transparent_64%)] blur-3xl [animation-delay:-16s]" />

      {/* soft top sheen */}
      <div className="absolute inset-x-0 top-0 h-[40vh] bg-[linear-gradient(180deg,rgba(255,255,255,0.7),transparent)]" />
    </div>
  );
}
