import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import LegalContent, { type LegalSection } from "@/components/layout/LegalContent";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = pageMetadata({
  title: "Términos y condiciones",
  description:
    "Términos y condiciones de uso del sitio web y los servicios de SOLUPOWER (Soluciones Industriales RM S.A.S.).",
  path: "/terminos",
});

const sections: LegalSection[] = [
  {
    heading: "Aceptación",
    body: [
      "Al navegar y utilizar este sitio web aceptas los presentes términos y condiciones. Si no estás de acuerdo, te pedimos no utilizar el sitio.",
    ],
  },
  {
    heading: "Uso del sitio",
    body: [
      "El contenido de este sitio es informativo. Te comprometes a usarlo de forma lícita y a no realizar acciones que afecten su funcionamiento o seguridad.",
    ],
  },
  {
    heading: "Cotizaciones y servicios",
    body: [
      "Las cotizaciones tienen carácter informativo y pueden variar según las condiciones específicas de cada proyecto. La prestación de servicios se regirá por los acuerdos particulares que se suscriban.",
    ],
  },
  {
    heading: "Propiedad intelectual",
    body: [
      `Los textos, marcas, logotipos y demás elementos del sitio pertenecen a ${siteConfig.legalName} o a sus respectivos titulares y están protegidos por la ley.`,
    ],
  },
  {
    heading: "Limitación de responsabilidad",
    body: [
      "Procuramos mantener la información actualizada y precisa, pero no garantizamos que esté libre de errores. No nos hacemos responsables por decisiones tomadas únicamente con base en el contenido del sitio.",
    ],
  },
  {
    heading: "Contacto",
    body: [`Para cualquier consulta sobre estos términos, escríbenos a ${siteConfig.contact.email}.`],
  },
];

export default function TerminosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Términos y condiciones"
        description="Las reglas que rigen el uso de nuestro sitio y servicios."
        crumbs={[{ name: "Términos y condiciones", path: "/terminos" }]}
      />
      <LegalContent sections={sections} />
    </>
  );
}
