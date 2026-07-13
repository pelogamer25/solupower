import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import LegalContent, { type LegalSection } from "@/components/layout/LegalContent";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = pageMetadata({
  title: "Política de privacidad",
  description:
    "Conoce cómo SOLUPOWER (Soluciones Industriales RM S.A.S.) trata y protege tus datos personales.",
  path: "/privacidad",
});

const sections: LegalSection[] = [
  {
    heading: "Responsable del tratamiento",
    body: [
      `${siteConfig.legalName} es responsable del tratamiento de los datos personales recolectados a través de este sitio web y sus canales de contacto.`,
    ],
  },
  {
    heading: "Datos que recolectamos",
    body: [
      "Recolectamos la información que nos proporcionas voluntariamente al completar formularios de contacto o cotización, tales como nombre, empresa, correo electrónico, teléfono y el detalle de tu solicitud.",
    ],
  },
  {
    heading: "Finalidad",
    body: [
      "Utilizamos tus datos para responder solicitudes, elaborar cotizaciones, prestar nuestros servicios y mantener comunicación comercial relacionada con tu interés.",
    ],
  },
  {
    heading: "Tus derechos",
    body: [
      "Puedes conocer, actualizar, rectificar y solicitar la supresión de tus datos en cualquier momento, así como revocar la autorización otorgada, escribiéndonos a nuestro correo de contacto.",
    ],
  },
  {
    heading: "Seguridad",
    body: [
      "Aplicamos medidas técnicas y organizativas razonables para proteger tus datos frente a accesos no autorizados, pérdida o alteración.",
    ],
  },
  {
    heading: "Contacto",
    body: [
      `Para ejercer tus derechos o resolver dudas sobre esta política, escríbenos a ${siteConfig.contact.email}.`,
    ],
  },
];

export default function PrivacidadPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Política de privacidad"
        description="La protección de tus datos es una prioridad. Aquí explicamos cómo los tratamos."
        crumbs={[{ name: "Política de privacidad", path: "/privacidad" }]}
      />
      <LegalContent sections={sections} />
    </>
  );
}
