"use client";

import { usePathname } from "next/navigation";
import { bubbleMessage, waLink } from "@/lib/whatsapp";

/**
 * Floating WhatsApp button, present on every page.
 *
 * The message is written from the route, so a person who taps it from the
 * rental page opens the chat already saying they want to rent — nobody has to
 * type "hola" and wait.
 *
 * Layering: z-[80] keeps it above page content but below the gallery lightbox
 * (z-[120]), so a fullscreen photo is never covered by a green circle.
 */
export default function WhatsAppBubble() {
  const pathname = usePathname() || "/";
  const href = waLink(bubbleMessage(pathname));

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="wa-bubble group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[80] flex items-center gap-2.5 rounded-full bg-[#25D366] p-4 text-white shadow-[0_6px_16px_-4px_rgba(0,0,0,0.35)] outline-none transition-[transform,box-shadow] duration-300 ease-smooth hover:shadow-[0_10px_28px_-6px_rgba(37,211,102,0.65)] focus-visible:ring-4 focus-visible:ring-[#25D366]/40 motion-safe:hover:-translate-y-0.5 sm:px-5 sm:py-4"
    >
      {/* Brand glyph: a generic chat icon doesn't read as "WhatsApp" at 24px. */}
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden focusable="false" className="shrink-0">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.470 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35Z" />
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.25 8.24Z" />
      </svg>

      {/* The label only shows where there's room; the circle carries mobile. */}
      <span className="hidden text-sm font-medium sm:inline">Escríbenos</span>
    </a>
  );
}
