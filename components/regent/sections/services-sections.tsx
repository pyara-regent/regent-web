import Image from "next/image";
import {
  serviceBenefits,
  serviceProcess,
  sharpenedToolTypes,
} from "@/lib/regent-content";
import type { Service } from "@/lib/db/schema";
import { SectionEyebrow } from "@/components/regent/ui/primitives";
import { ServiceDetailsModal } from "@/components/regent/ui/service-details-modal";

function ServiceBenefitBullet({ children }: { children: string }) {
  return (
    <li className="flex gap-3 rounded-2xl bg-white p-4 text-base font-semibold leading-7 text-[var(--neutral-800)] shadow-[0_12px_30px_rgba(17,37,90,0.05)]">
      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--regent-red-soft)] text-[var(--regent-red)]">
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3.333 12.06 7.51l4.607.67-3.334 3.25.787 4.588L10 13.852l-4.12 2.166.787-4.588-3.334-3.25 4.607-.67L10 3.333Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  );
}

export function ServicesOverviewSection({ services }: { services: Service[] }) {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-12 md:py-[104px]">
      <div className="space-y-12">
        <div className="space-y-4">
          <SectionEyebrow label="Service Scope" />
          <h2 className="text-3xl font-bold leading-[1.25] md:text-[32px] md:leading-[48px]">
            Services Designed For Production Reliability
          </h2>
          <p className="max-w-[900px] text-lg leading-8 text-[var(--muted)]">
            Regent Technologies combines machine accuracy, practical workflow
            support, and industrial service coordination so customers can keep
            tooling in service with less interruption.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.slug}
              className="relative min-h-[540px] overflow-hidden rounded-2xl bg-black"
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
                <div>
                  <ServiceDetailsModal
                    title={service.title}
                    intro={service.modalIntro}
                    details={service.details}
                    bestFor={service.bestFor}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesBenefitsSection() {
  return (
    <section className="bg-[var(--surface)]">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-20 md:px-12 md:py-[104px] lg:grid-cols-[minmax(0,1fr)_560px] lg:items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <SectionEyebrow label="Why It Works" />
            <h2 className="text-3xl font-bold leading-[1.25] md:text-[32px] md:leading-[48px]">
              Precision, Cooling, And Practical Logistics
            </h2>
            <p className="max-w-[760px] text-lg leading-8 text-[var(--muted)]">
              Our sharpening model is built around output consistency, tool
              protection, and service coordination that makes sense for active
              production environments.
            </p>
          </div>

          <ul className="grid gap-3">
            {serviceBenefits.map((item) => (
              <ServiceBenefitBullet key={item}>{item}</ServiceBenefitBullet>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <Image
            src="/regent/about.png"
            alt="Blade sharpening sparks"
            width={1500}
            height={1500}
            className="h-[520px] w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
        </div>
      </div>
    </section>
  );
}

export function ServicesToolTypesSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-12 md:py-[104px]">
      <div className="space-y-10">
        <div className="max-w-[920px] space-y-4">
          <SectionEyebrow label="Types Of Blades & Tools Sharpened" />
          <h2 className="text-3xl font-bold leading-[1.25] md:text-[32px] md:leading-[48px]">
            Industrial blade and cutter coverage from the business brief
          </h2>
          <p className="text-lg leading-8 text-[var(--muted)]">
            Regent Technologies handles a practical range of production blades,
            cutting tools, and boring bits used across woodworking, packaging,
            printing, plastic, metal, and industrial workshop operations.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sharpenedToolTypes.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_16px_40px_rgba(17,37,90,0.06)]"
            >
              <div className="relative aspect-[4/3] bg-[var(--surface)]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
                />
              </div>
              <h3 className="min-h-20 px-5 py-4 text-lg font-bold leading-7 text-[var(--foreground)]">
                {item.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesProcessSection() {
  return (
    <section id="service-process" className="mx-auto max-w-[1440px] px-4 py-20 md:px-12 md:py-[104px]">
      <div className="space-y-10">
        <div className="space-y-4">
          <SectionEyebrow label="Service Process" />
          <h2 className="text-3xl font-bold leading-[1.25] md:text-[32px] md:leading-[48px]">
            How A Regent Service Flow Works
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {serviceProcess.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl border border-black/8 bg-white p-8 shadow-[0_16px_40px_rgba(17,37,90,0.05)]"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--regent-red)]">
                Step {index + 1}
              </div>
              <h3 className="mt-4 text-2xl font-bold leading-8 text-[var(--foreground)]">
                {step.title}
              </h3>
              <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
