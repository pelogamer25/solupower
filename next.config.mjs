/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // 301s for retired service pages → their surviving counterparts (preserves SEO).
  async redirects() {
    return [
      { source: "/servicios/limpieza-especializada", destination: "/servicios/restauracion-de-pisos", permanent: true },
      { source: "/servicios/pintura-epoxica", destination: "/servicios/restauracion-de-pisos", permanent: true },
      { source: "/servicios/mantenimientos-locativos", destination: "/servicios/restauracion-de-pisos", permanent: true },
      { source: "/servicios/mantenimiento-industrial", destination: "/servicios/servicio-tecnico", permanent: true },
      // "Suministro de equipos" is no longer a service — it lives in the catalog.
      { source: "/servicios/venta-de-maquinaria", destination: "/productos", permanent: true },
      // Retired products → their category page
      { source: "/productos/desbastadoras", destination: "/productos", permanent: true },
      { source: "/productos/aspiradoras-industriales", destination: "/productos/categoria/aspiradoras", permanent: true },
      { source: "/productos/scrubbers", destination: "/productos/categoria/scrubbers", permanent: true },
      { source: "/productos/durasweep-70bt", destination: "/productos/categoria/barredoras", permanent: true },
      // Renamed products (brand dropped in favour of the model code)
      { source: "/productos/grande-brio-ride-on-75-650-ecoray", destination: "/productos/fregadora-hombre-a-bordo-sl-75", permanent: true },
      { source: "/productos/grande-brio-ride-on-145-1000-plus", destination: "/productos/fregadora-hombre-a-bordo-sl-145", permanent: true },
    ];
  },
};

export default nextConfig;
