import type { Metadata } from "next";
import { PageHero } from "@/components/regent/layout/page-hero";
import { SiteFooter } from "@/components/regent/layout/site-footer";
import { JsonLd } from "@/components/regent/seo/json-ld";
import { ContactCtaSection } from "@/components/regent/sections/contact-cta";
import { FaqSection } from "@/components/regent/sections/faq-section";
import { listFaqs } from "@/lib/products/queries";
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "FAQ",
  description:
    "Find answers about Regent Technologies blade sharpening services, pickup and delivery, products, and operational support in Sri Lanka.",
  path: "/faq",
  image: "/regent/video-section.png",
});

export const dynamic = "force-dynamic";

export default async function Page() {
  const faqs = await listFaqs();
  const breadcrumbStructuredData = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ]);
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="bg-white text-[var(--foreground)]">
      <JsonLd data={[breadcrumbStructuredData, faqStructuredData]} />
      <PageHero
        currentPath="/faq"
        eyebrow="Frequently Asked Questions"
        title="Answers For Service, Pickup, And Product Questions"
        description="Use this FAQ to understand how Regent Technologies handles sharpening, logistics, tooling support, and common customer requests."
        image="/regent/video-section.png"
        imageAlt="Regent Technologies FAQ"
      />
      <FaqSection items={faqs} />
      <ContactCtaSection />
      <SiteFooter />
    </main>
  );
}
