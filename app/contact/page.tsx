import type { Metadata } from "next";
import { ContactCtaSection } from "@/components/regent/sections/contact-cta";
import {
  ContactInfoSection,
  ContactSupportSection,
} from "@/components/regent/sections/contact-sections";
import { PageHero } from "@/components/regent/layout/page-hero";
import { SiteFooter } from "@/components/regent/layout/site-footer";
import { JsonLd } from "@/components/regent/seo/json-ld";
import { contactEmail } from "@/lib/regent-content";
import { absoluteUrl, createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { getSiteUrl, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Regent Technologies",
  description:
    "Contact Regent Technologies in Moratuwa for industrial blade sharpening, pickup coordination, product guidance, and service inquiries in Sri Lanka.",
  path: "/contact",
  image: "/regent/hero.png",
});

export default function Page() {
  const breadcrumbStructuredData = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact Regent Technologies", path: "/contact" },
  ]);
  const contactPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${absoluteUrl("/contact")}#contact-page`,
    name: "Contact Regent Technologies",
    description: metadata.description,
    url: absoluteUrl("/contact"),
    mainEntity: {
      "@id": `${getSiteUrl()}#localbusiness`,
      name: siteConfig.name,
      email: siteConfig.email,
      telephone: siteConfig.phoneNumbers.map((phone) =>
        phone.href.replace(/^tel:/, ""),
      ),
    },
  };

  return (
    <main className="bg-white text-[var(--foreground)]">
      <JsonLd data={[breadcrumbStructuredData, contactPageStructuredData]} />
      <PageHero
        currentPath="/contact"
        eyebrow="Get In Touch"
        title="Contact Regent Technologies"
        description="Speak with our team about blade sharpening, recurring pickup schedules, or the right service setup for your production floor."
        image="/regent/hero.png"
        imageAlt="Contact Regent Technologies"
        actions={[
          { href: "tel:+94112650397", label: "Call Us Now" },
          {
            href: `mailto:${contactEmail}`,
            label: "Email Regent",
            variant: "secondary",
          },
        ]}
      />
      <ContactInfoSection />
      <ContactSupportSection />
      <ContactCtaSection />
      <SiteFooter />
    </main>
  );
}
