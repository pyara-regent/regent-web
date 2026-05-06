import Link from "next/link";
import { SiteFooter } from "@/components/regent/layout/site-footer";
import { SiteHeader } from "@/components/regent/layout/site-header";

export default function NotFound() {
  return (
    <main className="bg-white text-[var(--foreground)]">
      <section className="bg-[var(--regent-blue-950)]">
        <SiteHeader currentPath="/industries" />
        <div className="mx-auto max-w-[1440px] px-4 py-24 text-white md:px-12 md:py-32">
          <div className="max-w-[760px] space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white/75">
              Industry Not Found
            </p>
            <h1 className="text-4xl font-bold leading-[1.15] md:text-[56px] md:leading-[1.2]">
              This industry page is not available.
            </h1>
            <p className="text-lg leading-8 text-[var(--muted-light)]">
              View the industries Regent Technologies supports or contact the team for direct sharpening and tooling guidance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-[var(--regent-red)] px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-[var(--regent-red-dark)] md:text-lg"
                href="/industries"
              >
                View Industries
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-white px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-white hover:text-[var(--regent-blue-900)] md:text-lg"
                href="/contact"
              >
                Contact Regent
              </Link>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
