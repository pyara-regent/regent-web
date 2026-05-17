import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/regent/layout/page-hero";
import { SiteFooter } from "@/components/regent/layout/site-footer";
import { ContactCtaSection } from "@/components/regent/sections/contact-cta";
import { JsonLd } from "@/components/regent/seo/json-ld";
import { ProductGallery } from "@/components/regent/ui/product-gallery";
import { ProductInquiryModal } from "@/components/regent/ui/product-inquiry-modal";
import { SectionEyebrow } from "@/components/regent/ui/primitives";
import { productCategoryBySlug } from "@/lib/products/catalog-metadata";
import { getProductBySlug } from "@/lib/products/queries";
import {
  absoluteUrl,
  createBreadcrumbJsonLd,
  createPageMetadata,
  getProductOgImagePath,
} from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-config";

type Params = Promise<{ slug: string }>;

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return createPageMetadata({
      title: "Product Not Found",
      description: "The requested Regent Technologies product could not be found.",
      path: "/products",
      noIndex: true,
    });
  }

  const title = /\bSri Lanka\b/i.test(product.metaTitle)
    ? product.metaTitle
    : `${product.metaTitle} Sri Lanka`;

  return createPageMetadata({
    title,
    description: product.metaDescription,
    path: `/products/${product.slug}`,
    image: product.images[0] ?? "/regent/products-main.png",
    imageAlt: product.name,
    socialImage: getProductOgImagePath(product.slug),
  });
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const heroImage = product.images[0] ?? "/regent/products-main.png";
  const productUrl = `${getSiteUrl()}/products/${product.slug}`;
  const category = productCategoryBySlug[product.slug] ?? "Industrial Tools";
  const breadcrumbStructuredData = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: product.name, path: `/products/${product.slug}` },
  ]);
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.name,
    description: product.description,
    category,
    image: product.images.length
      ? product.images.map((image) => absoluteUrl(image))
      : [absoluteUrl("/regent/products-main.png")],
    url: productUrl,
    mainEntityOfPage: productUrl,
    brand: {
      "@type": "Brand",
      name: "Regent Technologies",
    },
    seller: {
      "@id": `${getSiteUrl()}#localbusiness`,
      name: "Regent Technologies",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Category",
        value: category,
      },
      {
        "@type": "PropertyValue",
        name: "Availability",
        value: "Contact Regent Technologies for current pricing and availability",
      },
    ],
  };

  return (
    <main className="bg-white text-[var(--foreground)]">
      <JsonLd data={[breadcrumbStructuredData, productStructuredData]} />
      <PageHero
        currentPath="/products"
        eyebrow="Product"
        title={product.name}
        description={product.metaDescription}
        image={heroImage}
        imageAlt={product.name}
        actions={[
          { href: "/products", label: "All Products", variant: "secondary" },
        ]}
      >
        <ProductInquiryModal
          productName={product.name}
          productSlug={product.slug}
          productUrl={productUrl}
          turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        />
      </PageHero>
      <section className="mx-auto grid max-w-[1440px] gap-12 px-4 py-20 md:px-12 md:py-[104px] lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:items-start">
        <ProductGallery images={product.images} name={product.name} />
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <SectionEyebrow label="Details" />
            <h1 className="text-3xl font-bold leading-tight md:text-[40px]">
              {product.name}
            </h1>
            <p className="text-lg leading-8 text-[var(--muted)]">{product.description}</p>
          </div>
          <div className="rounded-2xl border border-black/8 bg-[var(--surface)] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--regent-red)]">
              Need Pricing Or Availability?
            </p>
            <p className="mt-3 text-base leading-7 text-[var(--muted)]">
              Send the product name, quantity, and application details. The Regent team will confirm the best option.
            </p>
          </div>
        </div>
      </section>
      <ContactCtaSection />
      <SiteFooter />
    </main>
  );
}
