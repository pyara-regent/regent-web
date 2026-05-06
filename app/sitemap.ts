import type { MetadataRoute } from "next";
import { listProducts } from "@/lib/products/queries";
import { getSiteUrl } from "@/lib/site-config";
import { industries } from "@/lib/regent-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const staticRoutes = [
    {
      path: "",
      changeFrequency: "weekly",
      priority: 1,
      images: ["/regent/hero.png"],
    },
    {
      path: "/services",
      changeFrequency: "weekly",
      priority: 0.95,
      images: ["/regent/service-sharpening.png", "/regent/service-delivery.png"],
    },
    {
      path: "/products",
      changeFrequency: "weekly",
      priority: 0.95,
      images: ["/regent/products/doc/arden-router-bits-set.png"],
    },
    {
      path: "/contact",
      changeFrequency: "monthly",
      priority: 0.9,
      images: ["/regent/hero.png"],
    },
    {
      path: "/about",
      changeFrequency: "monthly",
      priority: 0.85,
      images: ["/regent/about.png"],
    },
    {
      path: "/industries",
      changeFrequency: "monthly",
      priority: 0.8,
      images: ["/regent/why-regent.png"],
    },
    {
      path: "/faq",
      changeFrequency: "monthly",
      priority: 0.7,
      images: ["/regent/video-section.png"],
    },
  ];

  const industryRoutes = industries.map((industry) => ({
    url: `${baseUrl}/industries/${industry.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
    images: [`${baseUrl}${industry.image}`],
  }));
  const firstProductPage = await listProducts({ pageSize: 24 });
  const remainingProductPages =
    firstProductPage.totalPages > 1
      ? await Promise.all(
          Array.from({ length: firstProductPage.totalPages - 1 }, (_, index) =>
            listProducts({ page: index + 2, pageSize: 24 }),
          ),
        )
      : [];
  const products = [
    ...firstProductPage.items,
    ...remainingProductPages.flatMap((page) => page.items),
  ];
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.75,
    images: product.images.map((image) => `${baseUrl}${image}`),
  }));

  const staticSitemapRoutes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency as "weekly" | "monthly",
    priority: route.priority,
    images: route.images.map((image) => `${baseUrl}${image}`),
  }));

  return [...staticSitemapRoutes, ...industryRoutes, ...productRoutes];
}
