import type { Metadata } from "next";
import HeroSequence from "@/components/sections/HeroSequence";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Products from "@/components/sections/Products";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Clients from "@/components/sections/Clients";
import Process from "@/components/sections/Process";
import Gallery from "@/components/sections/Gallery";
import Faq from "@/components/sections/Faq";
import ExploreMap from "@/components/sections/ExploreMap";
import ContactCta from "@/components/sections/ContactCta";
import { pageMetadata, jsonLdScript } from "@/lib/seo";
import { services } from "@/lib/data/services";
import { siteConfig } from "@/config/site";
import { workPhotos } from "@/lib/workPhotos";
import { beforeAfterPhotos } from "@/lib/beforeAfterPhotos";

export const metadata: Metadata = pageMetadata({
  title: "Soluciones industriales para empresas que buscan excelencia",
  description: siteConfig.metaDescription,
  path: "/",
});

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  provider: {
    "@type": "Organization",
    name: siteConfig.name,
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title },
    })),
  },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(homeJsonLd)} />
      <HeroSequence />
      <Services />
      <About />
      <Products />
      <BeforeAfter {...beforeAfterPhotos()} />
      <Process />
      <Clients />
      <Gallery photos={workPhotos()} />
      <Faq />
      <ExploreMap />
      <ContactCta />
    </>
  );
}
