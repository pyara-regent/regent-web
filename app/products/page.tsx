import type { Metadata } from "next";
import { PageHero } from "@/components/regent/layout/page-hero";
import { SiteFooter } from "@/components/regent/layout/site-footer";
import { ContactCtaSection } from "@/components/regent/sections/contact-cta";
import { ProductsCatalogSection } from "@/components/regent/sections/products-catalog-section";
import { JsonLd } from "@/components/regent/seo/json-ld";
import { listProducts } from "@/lib/products/queries";
import {
  createBreadcrumbJsonLd,
  createItemListJsonLd,
  createPageMetadata,
} from "@/lib/seo";

type SearchParams = Promise<{ q?: string; page?: string }>;

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const params = await searchParams;
  const hasQueryState = Boolean(params.q?.trim() || params.page);

  return createPageMetadata({
    title: "Industrial Tools and Blade Sharpening Products Sri Lanka",
    description:
      "Browse Regent Technologies products including ARDEN routing tools, pneumatic tools, power tools, tyre rebuilding tools, woodworking tools, accessories, and blade sharpening support.",
    path: "/products",
    image: "/regent/products/doc/arden-router-bits-set.png",
    noIndex: hasQueryState,
  });
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const page = Number(params.page || 1);
  const data = await listProducts({
    page: Number.isInteger(page) && page > 0 ? page : 1,
    pageSize: 9,
    query: params.q,
  });
  const breadcrumbStructuredData = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ]);
  const productListStructuredData = createItemListJsonLd({
    name: "Regent Technologies Product Catalog",
    description:
      "Industrial tools, ARDEN routing tools, pneumatic tools, power tools, tyre rebuilding tools, woodworking products, and blade sharpening support.",
    path: "/products",
    items: data.items.map((item) => ({
      name: item.name,
      path: `/products/${item.slug}`,
      image: item.images[0],
    })),
  });

  return (
    <main className="bg-white text-[var(--foreground)]">
      <JsonLd data={[breadcrumbStructuredData, productListStructuredData]} />
      <PageHero
        currentPath="/products"
        eyebrow="Product Catalog"
        title="Professional Tools, Accessories, And Industrial Product Support"
        description="Browse ARDEN routing tools, pneumatic tools, power tools, tyre rebuilding tools, woodworking hardware, accessories, and sharpening-supported industrial products."
        image="/regent/products/doc/arden-router-bits-set.png"
        imageAlt="Regent Technologies product catalog"
        actions={[
          { href: "/contact", label: "Ask About Products" },
          { href: "/services", label: "View Services", variant: "secondary" },
        ]}
      />
      <ProductsCatalogSection
        items={data.items}
        currentPage={data.page}
        totalPages={data.totalPages}
        query={params.q}
      />
      <ContactCtaSection />
      <SiteFooter />
    </main>
  );
}
