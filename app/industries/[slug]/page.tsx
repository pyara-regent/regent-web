import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/regent/layout/page-hero";
import { SiteFooter } from "@/components/regent/layout/site-footer";
import { JsonLd } from "@/components/regent/seo/json-ld";
import { ContactCtaSection } from "@/components/regent/sections/contact-cta";
import { ArrowBullet, PillButton, SectionEyebrow } from "@/components/regent/ui/primitives";
import { industries, serviceBenefits } from "@/lib/regent-content";
import {
  absoluteUrl,
  createBreadcrumbJsonLd,
  createPageMetadata,
  getIndustryOgImagePath,
} from "@/lib/seo";
import { getSiteUrl, siteConfig } from "@/lib/site-config";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);

  if (!industry) {
    return createPageMetadata({
      title: "Industry Not Found",
      description: "The requested Regent Technologies industry page could not be found.",
      path: "/industries",
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: industry.title,
    description: industry.description,
    path: `/industries/${industry.slug}`,
    image: industry.image,
    imageAlt: industry.title,
    socialImage: getIndustryOgImagePath(industry.slug),
  });
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);

  if (!industry) {
    notFound();
  }
  const breadcrumbStructuredData = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: industry.title, path: `/industries/${industry.slug}` },
  ]);
  const industryServiceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/industries/${industry.slug}`)}#industry-service`,
    name: `${industry.title} sharpening and tooling support`,
    description: industry.longDescription,
    url: absoluteUrl(`/industries/${industry.slug}`),
    image: absoluteUrl(industry.image),
    provider: {
      "@id": `${getSiteUrl()}#localbusiness`,
      name: siteConfig.name,
    },
    areaServed: {
      "@type": "Country",
      name: "Sri Lanka",
    },
  };

  return (
    <main className="bg-white text-[var(--foreground)]">
      <JsonLd data={[breadcrumbStructuredData, industryServiceStructuredData]} />
      <PageHero
        currentPath="/industries"
        eyebrow="Industry"
        title={industry.title}
        description={industry.description}
        image="/regent/hero.png"
        imageAlt={industry.title}
      />
      <section className="mx-auto grid max-w-[1440px] gap-12 px-4 py-20 md:px-12 md:py-[104px] lg:grid-cols-[minmax(0,1fr)_460px] lg:items-start">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <SectionEyebrow label="What We Support" />
            <h1 className="text-3xl font-bold leading-tight md:text-[40px]">
              Reliable cutting performance for {industry.title.toLowerCase()}
            </h1>
            <p className="text-lg leading-8 text-[var(--muted)]">
              {industry.longDescription}
            </p>
          </div>
          <ul className="space-y-1">
            {serviceBenefits.map((item) => (
              <ArrowBullet key={item}>{item}</ArrowBullet>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4">
            <PillButton href="/contact" label="Contact Regent" />
            <PillButton href="/products" label="View Products" variant="dark" />
          </div>
        </div>
        <div className="rounded-2xl border border-black/8 bg-[var(--surface)] p-10">
          <Image
            src={industry.image}
            alt=""
            width={180}
            height={180}
            className="mx-auto h-40 w-40 object-contain"
          />
          <p className="mt-8 text-center text-lg font-semibold leading-8 text-[var(--neutral-800)]">
            Sharpening, product guidance, and pickup coordination for active production teams.
          </p>
        </div>
      </section>
      <ContactCtaSection />
      <SiteFooter />
    </main>
  );
}
