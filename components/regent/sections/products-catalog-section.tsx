import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import type { Product } from "@/lib/db/schema";
import { productCategoryBySlug } from "@/lib/products/catalog-metadata";
import { PaginationNav } from "@/components/regent/ui/pagination-nav";

export function ProductsCatalogSection({
  items,
  currentPage,
  totalPages,
  query = "",
}: {
  items: Product[];
  currentPage: number;
  totalPages: number;
  query?: string;
}) {
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);

  return (
    <section id="products-catalog" className="scroll-mt-8 mx-auto max-w-[1440px] px-4 py-20 md:px-12 md:py-[104px]">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--regent-red)]">
            Catalog Page {safePage} of {totalPages}
          </p>
          <h2 className="text-3xl font-bold leading-[1.25] md:text-[32px] md:leading-[48px]">
            Product Listings
          </h2>
          <p className="max-w-[760px] text-lg leading-8 text-[var(--muted)]">
            Browse workshop tools, sharpening-related products, and industrial
            support items selected to complement Regent Technologies services.
          </p>
        </div>
        <form className="grid w-full gap-3 md:max-w-[520px] md:grid-cols-[1fr_auto]" action="/products#products-catalog">
          <label className="sr-only" htmlFor="products-search">
            Search products
          </label>
          <input
            id="products-search"
            className="rounded-full border border-black/10 px-5 py-3 text-sm outline-none transition-colors focus:border-[var(--regent-red)]"
            name="q"
            defaultValue={query}
            placeholder="Search products"
          />
          <button
            className="rounded-full bg-[var(--regent-red)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--regent-red-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--regent-red)] focus-visible:ring-offset-4"
            type="submit"
          >
            <span className="text-white">Search</span>
          </button>
        </form>
      </div>

      <div className="mb-10 rounded-2xl border border-[var(--regent-red)]/15 bg-[var(--regent-red-soft)] px-6 py-5 md:flex md:items-center md:justify-between md:gap-8">
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--regent-red)]">
            Featured Brand
          </p>
          <h3 className="text-xl font-bold leading-8 text-[var(--foreground)]">
            {siteConfig.productHighlight}
          </h3>
        </div>
        <p className="mt-3 max-w-[640px] text-base leading-7 text-[var(--muted)] md:mt-0">
          Ask our team about ARDEN router bits from Arden Precision Technology
          Co. Ltd. of Taiwan, matching cutter profiles, and practical options
          for woodworking and production use.
        </p>
      </div>

      {items.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.slug}
              className="group overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_18px_42px_rgba(17,37,90,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(17,37,90,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--regent-red)] focus-visible:ring-offset-4"
              href={`/products/${item.slug}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b border-black/5 bg-white">
                {item.images[0] ? (
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-sm font-semibold text-[var(--muted)]">
                    Image coming soon
                  </span>
                )}
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--regent-red)]">
                  {productCategoryBySlug[item.slug] ?? "Product"}
                </p>
                <h3 className="mt-3 text-2xl font-bold leading-8 text-[var(--foreground)]">
                  {item.name}
                </h3>
                <p className="mt-4 line-clamp-4 text-base leading-7 text-[var(--muted)]">
                  {item.description}
                </p>
                <span className="mt-6 inline-flex text-base font-semibold text-[var(--regent-red)] transition-colors duration-200 group-hover:text-[var(--regent-red-dark)]">
                  View Product
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-black/8 bg-white p-8 text-center shadow-[0_18px_42px_rgba(17,37,90,0.06)]">
          <h3 className="text-2xl font-bold text-[var(--foreground)]">No products found</h3>
          <p className="mt-3 text-base leading-7 text-[var(--muted)]">
            Try a different product name, tool type, or service keyword.
          </p>
        </div>
      )}

      <div className="mt-12">
        <PaginationNav
          currentPage={safePage}
          totalPages={totalPages}
          basePath="/products"
          fragment="products-catalog"
          query={{ q: query }}
        />
      </div>
    </section>
  );
}
