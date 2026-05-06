import Link from "next/link";
import { SiteFooter } from "@/components/regent/layout/site-footer";
import { SiteHeader } from "@/components/regent/layout/site-header";

export default function NotFound() {
  return (
    <main className="bg-white text-[var(--foreground)]">
      <section className="bg-[var(--regent-blue-950)]">
        <SiteHeader currentPath="/products" />
        <div className="mx-auto max-w-[1440px] px-4 py-24 text-white md:px-12 md:py-32">
          <div className="max-w-[760px] space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white/75">
              Product Not Found
            </p>
            <h1 className="text-4xl font-bold leading-[1.15] md:text-[56px] md:leading-[1.2]">
              This product is not available in the catalog.
            </h1>
            <p className="text-lg leading-8 text-[var(--muted-light)]">
              Browse the full catalog or contact Regent Technologies if you are looking for a specific blade, tool, accessory, or service item.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-[var(--regent-red)] px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-[var(--regent-red-dark)] md:text-lg"
                href="/products"
              >
                Browse Products
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
