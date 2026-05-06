import type { Metadata } from "next";
import { PageHero } from "@/components/regent/layout/page-hero";
import { ContactCtaSection } from "@/components/regent/sections/contact-cta";
import {
  ServicesBenefitsSection,
  ServicesOverviewSection,
  ServicesProcessSection,
  ServicesToolTypesSection,
} from "@/components/regent/sections/services-sections";
import { SiteFooter } from "@/components/regent/layout/site-footer";
import { JsonLd } from "@/components/regent/seo/json-ld";
import {
  absoluteUrl,
  createBreadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";
import { listServices } from "@/lib/products/queries";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Blade and Tool Sharpening Services Sri Lanka",
  description:
    "Explore Regent Technologies fully automated blade and tool sharpening, industrial cutter care, and pickup and delivery support for Sri Lankan production teams.",
  path: "/services",
  image: "/regent/service-sharpening.png",
});

export default async function Page() {
  const services = await listServices();
  const breadcrumbStructuredData = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]);
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl("/services")}#industrial-blade-sharpening-service`,
    name: "Blade and tool sharpening service",
    serviceType: "Automated blade and tool sharpening",
    description: metadata.description,
    provider: {
      "@id": `${siteConfig.url.replace(/\/$/, "")}#localbusiness`,
      name: siteConfig.name,
    },
    image: absoluteUrl("/regent/service-sharpening.png"),
    areaServed: {
      "@type": "Country",
      name: "Sri Lanka",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Regent Technologies service support",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    },
    url: absoluteUrl("/services"),
  };

  return (
    <main className="bg-white text-[var(--foreground)]">
      <JsonLd data={[breadcrumbStructuredData, serviceStructuredData]} />
      <PageHero
        currentPath="/services"
        eyebrow="Fully Automated Sharpening"
        title="Blade & Tool Sharpening For Industrial Production"
        description="Regent Technologies uses advanced automated sharpening machines to deliver accurate, consistent, and efficient blade and precision tool care for industrial customers."
        image="/regent/service-sharpening.png"
        imageAlt="Regent Technologies services"
        actions={[
          { href: "/contact", label: "Schedule A Service" },
          { href: "/products", label: "Browse Products", variant: "secondary" },
        ]}
      />
      <ServicesOverviewSection services={services} />
      <ServicesToolTypesSection />
      <ServicesBenefitsSection />
      <ServicesProcessSection />
      <ContactCtaSection />
      <SiteFooter />
    </main>
  );
}
