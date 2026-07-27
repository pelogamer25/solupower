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
      // Retired product
      { source: "/productos/desbastadoras", destination: "/productos", permanent: true },
    ];
  },
};

export default nextConfig;
