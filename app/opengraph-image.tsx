import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — Soluciones industriales de limpieza`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded Open Graph / Twitter card image, generated at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #0A3D91 0%, #1E5FBF 45%, #35B6D8 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.16)",
              color: "white",
              fontSize: "40px",
              fontWeight: 800,
            }}
          >
            S
          </div>
          <div style={{ display: "flex", color: "white", fontSize: "34px", fontWeight: 700, letterSpacing: "-1px" }}>
            SOLUPOWER
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              color: "white",
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              maxWidth: "900px",
            }}
          >
            Soluciones industriales para empresas que buscan excelencia
          </div>
          <div style={{ display: "flex", color: "rgba(255,255,255,0.85)", fontSize: "30px", maxWidth: "820px" }}>
            Alquiler y servicio técnico de equipos de limpieza industrial · Medellín y Bogotá
          </div>
        </div>

        <div style={{ display: "flex", color: "rgba(255,255,255,0.75)", fontSize: "26px" }}>
          {siteConfig.url.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size },
  );
}
