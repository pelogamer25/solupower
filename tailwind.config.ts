import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base surface
        canvas: "#F5F7FA",
        ink: {
          DEFAULT: "#111827",
          soft: "#64748B",
          faint: "#94A3B8",
        },
        // Elegant, low-saturation industrial accents
        brand: {
          deep: "#0A3D91", // azul profundo
          blue: "#1E5FBF",
          cyan: "#35B6D8",
          teal: "#22A79B", // turquesa
          green: "#3E9E6E", // verde industrial
        },
        glass: {
          border: "rgba(255,255,255,0.35)",
          surface: "rgba(255,255,255,0.45)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "hero": ["clamp(2.75rem, 7vw, 6.5rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display": ["clamp(2rem, 4.5vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
      },
      backdropBlur: {
        xl2: "40px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        glass: "0 1px 0 rgba(255,255,255,0.6) inset, 0 24px 60px -30px rgba(15,42,80,0.28)",
        "glass-lg": "0 1px 0 rgba(255,255,255,0.7) inset, 0 40px 90px -40px rgba(15,42,80,0.35)",
        glow: "0 0 60px -12px rgba(53,182,216,0.45)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
        "smooth-in": "cubic-bezier(0.64, 0, 0.78, 0)",
      },
      keyframes: {
        "gradient-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(4%, -3%, 0) scale(1.08)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "gradient-drift": "gradient-drift 22s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
