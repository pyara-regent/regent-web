import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/regent/layout/page-hero";
import { SiteFooter } from "@/components/regent/layout/site-footer";
import { JsonLd } from "@/components/regent/seo/json-ld";
import { ContactCtaSection } from "@/components/regent/sections/contact-cta";
import { SectionEyebrow } from "@/components/regent/ui/primitives";
import { industries } from "@/lib/regent-content";
import {
  createBreadcrumbJsonLd,
  createItemListJsonLd,
  createPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Industries Served",
  description:
    "Regent Technologies supports Sri Lankan woodworking, furniture, packaging, printing, metal fabrication, and plastic processing teams with blade sharpening and tooling support.",
  path: "/industries",
  image: "/regent/why-regent.png",
});

export default function Page() {
  const breadcrumbStructuredData = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
  ]);
  const industryListStructuredData = createItemListJsonLd({
    name: "Industries Served By Regent Technologies",
    description:
      "Woodworking, furniture, packaging, printing, metal fabrication, and plastic processing industry support.",
    path: "/industries",
    items: industries.map((industry) => ({
      name: industry.title,
      path: `/industries/${industry.slug}`,
      image: industry.image,
    })),
  });

  return (
    <main className="bg-white text-[var(--foreground)]">
      <JsonLd data={[breadcrumbStructuredData, industryListStructuredData]} />
      <PageHero
        currentPath="/industries"
        eyebrow="Industries"
        title="Sharpening And Tool Support For Production Teams"
        description="Regent Technologies supports workshops and industrial teams that depend on clean cuts, predictable tool life, and direct service coordination."
        image="/regent/why-regent.png"
        imageAlt="Industries served by Regent Technologies"
      />
      <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-12 md:py-[104px]">
        <div className="mb-12 max-w-[760px]">
          <SectionEyebrow label="Coverage" />
          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-[40px]">
            Industries We Serve
          </h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_18px_42px_rgba(17,37,90,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(17,37,90,0.1)]"
            >
              <div className="flex h-44 items-center justify-center bg-[var(--surface)]">
                <Image
                  src={industry.image}
                  alt=""
                  width={96}
                  height={96}
                  className="h-24 w-24 object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold leading-8">{industry.title}</h2>
                <p className="mt-3 text-base leading-7 text-[var(--muted)]">
                  {industry.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <ContactCtaSection />
      <SiteFooter />
    </main>
  );
}
