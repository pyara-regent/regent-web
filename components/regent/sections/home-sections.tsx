import Image from "next/image";
import Link from "next/link";
import {
  aboutHighlights,
  industries,
  productFeatures,
  whyChoosePoints,
} from "@/lib/regent-content";
import type { Service } from "@/lib/db/schema";
import { siteConfig } from "@/lib/site-config";
import { ArrowBullet, PillButton, SectionEyebrow } from "@/components/regent/ui/primitives";

export function HomeAboutSection() {
  return (
    <section id="about" className="mx-auto max-w-[1440px] px-4 py-20 md:px-12 md:py-[119px]">
      <div className="grid gap-12 lg:grid-cols-[551px_minmax(0,664px)] lg:items-center lg:justify-between">
        <div className="space-y-10">
          <div className="space-y-4">
            <SectionEyebrow label="Who We Are" />
            <h2 className="text-3xl font-bold leading-[1.25] text-[var(--foreground)] md:text-[32px] md:leading-[48px]">
              Precision Automated Sharpening for Industrial Blades
            </h2>
            <p className="text-lg leading-8 text-[var(--muted)]">
              Regent Technologies is a specialized industrial service provider
              with {siteConfig.experienceLabel.toLowerCase()} focused on
              high-precision sharpening of TCT (Tungsten Carbide Tipped) and
              HSS (High-Speed Steel) cutting tools.
            </p>
          </div>

          <ul className="space-y-1">
            {aboutHighlights.map((item) => (
              <ArrowBullet key={item}>{item}</ArrowBullet>
            ))}
          </ul>

          <PillButton
            href="/contact"
            label="Need Professional Blade Sharpening?"
            variant="dark"
            className="gap-2"
          />
        </div>

        <div className="relative overflow-hidden rounded-lg">
          <Image
            src="/regent/about.png"
            alt="Grinding sparks during sharpening"
            width={1500}
            height={1500}
            className="h-[420px] w-full object-cover object-center md:h-[600px]"
            sizes="(max-width: 1024px) 100vw, 664px"
          />
        </div>
      </div>
    </section>
  );
}

export function IndustriesSection() {
  return (
    <section id="industries" className="bg-[var(--surface)]">
      <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-12 md:py-[56px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[664px] space-y-2">
            <h2 className="text-3xl font-bold leading-[1.25] text-[var(--foreground)] md:text-[32px] md:leading-[48px]">
              Industries We Serve
            </h2>
            <p className="text-lg font-medium leading-7 text-[#767676]">
              We provide precision sharpening solutions for a wide range of
              industries that depend on sharp, reliable cutting tools for
              efficient production, dependable turnaround, and repeatable quality.
            </p>
          </div>
          <PillButton href="/industries" label="View Industries" variant="text" />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.title}
              className="rounded-lg bg-white px-6 py-8 text-center shadow-[0_0_16px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(17,37,90,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--regent-red)] focus-visible:ring-offset-4"
              href={`/industries/${industry.slug}`}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center">
                <Image
                  src={industry.image}
                  alt=""
                  width={64}
                  height={64}
                  className="h-16 w-16 object-contain"
                />
              </div>
              <h3 className="mt-6 text-2xl font-bold leading-8 text-[var(--neutral-800)]">
                {industry.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">
                {industry.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeServicesSection({ services }: { services: Service[] }) {
  return (
    <section id="services" className="mx-auto max-w-[1440px] px-4 py-20 md:px-12 md:py-[104px]">
      <div className="flex flex-col gap-6 text-center md:items-center">
        <h2 className="text-3xl font-bold leading-[1.25] text-[var(--foreground)] md:text-[32px] md:leading-[48px]">
          Our Services
        </h2>
        <p className="max-w-[720px] text-lg leading-8 text-[var(--muted)]">
          See the main service options here, then visit the services page for the full details.
        </p>
        <PillButton href="/services" label="Know Our Services" variant="dark" />
      </div>

      <div className="mt-14 grid gap-4 xl:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.slug}
            className="relative min-h-[540px] overflow-hidden bg-black"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 664px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black/90" />
            <div className="relative flex h-full flex-col justify-end gap-8 p-8 text-white md:p-10">
              <div className="space-y-4">
                <h3 className="text-[32px] font-bold leading-8 md:text-4xl">
                  {service.title}
                </h3>
                <p className="max-w-[584px] text-lg leading-8 text-[var(--muted-light)]">
                  {service.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProductsPreviewSection() {
  return (
    <section id="products" className="mx-auto max-w-[1440px] px-4 py-20 md:px-12 md:py-[104px]">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[760px] space-y-3">
          <SectionEyebrow label="Our Products" />
          <h2 className="text-3xl font-bold leading-[1.25] text-[var(--foreground)] md:text-[32px] md:leading-[48px]">
            Professional Tools & Machinery
          </h2>
          <p className="text-lg leading-8 text-[var(--muted)]">
            Practical tooling, accessories, and blade support for workshops,
            manufacturers, and production teams.
          </p>
        </div>
        <PillButton href="/products" label="Browse Products" variant="dark" />
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {productFeatures.map((feature) => (
          <Link
            key={feature.title}
            className="group overflow-hidden rounded-2xl border border-black/8 bg-[var(--regent-blue-900)] shadow-[0_18px_42px_rgba(17,37,90,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(17,37,90,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--regent-red)] focus-visible:ring-offset-4"
            href={`/products/${feature.slug}`}
          >
            <div className="relative aspect-[4/3] border-b border-white/10 bg-white">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
            </div>
            <div className="flex min-h-[216px] flex-col gap-3 p-6 text-white md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/75">
                {feature.category}
              </p>
              <h3 className="text-2xl font-bold leading-8">{feature.title}</h3>
              <p className="max-w-[420px] text-base leading-7 text-white/80">
                {feature.summary}
              </p>
              <span className="mt-2 text-sm font-bold uppercase tracking-[0.08em] text-white">
                View Product
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function WhyRegentSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 pb-20 md:px-12 md:pb-[106px]">
      <div className="grid gap-10 lg:grid-cols-[664px_minmax(0,664px)] lg:items-start lg:justify-between">
        <div className="overflow-hidden rounded-lg lg:sticky lg:top-8">
          <Image
            src="/regent/why-regent.png"
            alt="Technician inspecting a blade"
            width={1000}
            height={1500}
            className="h-[420px] w-full object-cover object-center md:h-[550px]"
            sizes="(max-width: 1024px) 100vw, 664px"
          />
        </div>

        <div className="space-y-6 px-0 md:px-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold leading-[1.25] text-[var(--foreground)] md:text-[32px] md:leading-[48px]">
              Why Choose <span className="text-[var(--regent-red)]">Regent Technologies</span>
            </h2>
            <p className="text-lg leading-8 text-[var(--muted)]">
              At Regent Technologies, we combine advanced sharpening
              technology with industry expertise to deliver reliable blade
              maintenance solutions for workshops, factories, and production teams.
            </p>
          </div>

          <div className="space-y-3">
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
                <p className="mt-3 max-w-[560px] text-base leading-7 text-[var(--muted)]">
                  {item.detail}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
