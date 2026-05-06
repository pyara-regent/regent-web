import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/regent/layout/page-hero";
import { SiteFooter } from "@/components/regent/layout/site-footer";
import { JsonLd } from "@/components/regent/seo/json-ld";
import { ContactCtaSection } from "@/components/regent/sections/contact-cta";
import { PartnerCarouselSection } from "@/components/regent/sections/partner-carousel";
import { SectionEyebrow } from "@/components/regent/ui/primitives";
import { whyChoosePoints } from "@/lib/regent-content";
import { absoluteUrl, createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { getSiteUrl, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "About Regent Technologies",
  description:
    "Learn about Regent Technologies, a Sri Lankan industrial tool sharpening and servicing company using advanced European technology for cutting solutions, woodworking tools, accessories, and pneumatic machinery.",
  path: "/about",
  image: "/regent/about.png",
});

export default function Page() {
  const breadcrumbStructuredData = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About Regent Technologies", path: "/about" },
  ]);
  const aboutPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${absoluteUrl("/about")}#about-page`,
    name: "About Regent Technologies",
    description: metadata.description,
    url: absoluteUrl("/about"),
    mainEntity: {
      "@id": `${getSiteUrl()}#localbusiness`,
      name: siteConfig.name,
    },
  };

  return (
    <main className="bg-white text-[var(--foreground)]">
      <JsonLd data={[breadcrumbStructuredData, aboutPageStructuredData]} />
      <PageHero
        currentPath="/about"
        eyebrow="About Regent"
        title="Precision Industrial Tool Sharpening And Cutting Solutions"
        description="Regent Technologies provides industrial tool sharpening, servicing, premium woodworking tools, accessories, and pneumatic machinery for production teams across Sri Lanka."
        image="/regent/about.png"
        imageAlt="Regent Technologies sharpening work"
      />
      <section className="mx-auto grid max-w-[1440px] gap-12 px-4 py-20 md:px-12 md:py-[104px] lg:grid-cols-[minmax(0,1fr)_560px] lg:items-center">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <SectionEyebrow label="Company" />
            <h1 className="text-3xl font-bold leading-tight md:text-[40px]">
              Complete cutting support for demanding industrial work
            </h1>
            <p className="text-lg leading-8 text-[var(--muted)]">
              Regent Technologies is a leading industrial tool sharpening and servicing company, offering precision solutions for woodworking, plastic, printing, and corrugated industries.
            </p>
          </div>
          <div className="space-y-5 border-l-4 border-[var(--regent-red)] pl-6 text-lg leading-8 text-[var(--muted)]">
            <p>
              Using advanced European technology, the company helps restore
              cutting performance, extend tool life, and reduce avoidable
              downtime for customers who depend on accurate, reliable tools in
              daily production.
            </p>
            <p>
              Alongside sharpening and servicing, Regent imports and supplies
              premium woodworking tools, accessories, and pneumatic machinery
              to deliver complete cutting solutions from one trusted partner.
            </p>
          </div>
        </div>
        <Image
          src="/regent/why-regent.png"
          alt="Technician inspecting industrial blade"
          width={1000}
          height={1500}
          className="h-[520px] w-full rounded-2xl object-cover"
          sizes="(max-width: 1024px) 100vw, 560px"
        />
      </section>
      <section className="bg-[var(--regent-blue-900)] text-white">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-16 md:px-12 md:py-20 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
          <div>
            <SectionEyebrow label="Our Mission" className="text-white" />
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-[40px]">
              Improve tool performance
            </h2>
          </div>
          <div className="border-l-4 border-[var(--regent-red)] pl-6 text-lg leading-8 text-[var(--muted-light)]">
            <p>
              Our mission is to provide precision industrial tool sharpening
              and high-quality cutting solutions using advanced European
              technology. We are committed to improving tool performance,
              extending tool life, reducing downtime, and building long-term
              partnerships through reliable service, consistent quality, and
              strong after-sales support.
            </p>
          </div>
        </div>
      </section>
      <PartnerCarouselSection />
      <section className="bg-[var(--surface)]">
        <div className="mx-auto max-w-[1440px] px-4 py-20 md:px-12 md:py-[104px]">
          <div className="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
            <div>
              <SectionEyebrow label="Why Regent" />
              <h2 className="mt-3 text-3xl font-bold leading-tight">
                Reliable service, clear product support, and direct communication.
              </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {whyChoosePoints.map((item) => (
                <details
                  key={item.title}
                  className="group rounded-2xl border border-black/8 bg-white px-5 py-4 shadow-[0_14px_34px_rgba(17,37,90,0.05)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[var(--foreground)]">
                    <span>{item.title}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--regent-red)] text-lg leading-none text-white transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-base leading-7 text-[var(--muted)]">
                    {item.detail}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ContactCtaSection />
      <SiteFooter />
    </main>
  );
}
