import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Gallery from "@/components/sections/Gallery";
import ContactCta from "@/components/sections/ContactCta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Galería de proyectos",
  description:
    "Galería de trabajos de limpieza, restauración de pisos, pintura epóxica y equipos industriales en acción de SOLUPOWER.",
  path: "/galeria",
});

export default function GaleriaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Galería"
        title="Nuestro trabajo, en imágenes"
        description="Superficies transformadas y equipos en operación. Explora una muestra de lo que hacemos."
        crumbs={[{ name: "Galería", path: "/galeria" }]}
      />
      <Gallery />
      <ContactCta />
    </>
  );
}
