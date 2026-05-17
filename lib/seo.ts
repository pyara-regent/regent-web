import type { Metadata } from "next";
import { getSiteUrl, siteConfig } from "@/lib/site-config";

const defaultImageAlt = "Regent Technologies industrial blade sharpening in Sri Lanka";
const socialPreviewImageSize = {
  width: 1200,
  height: 630,
} as const;
const staticPageOgImages: Record<string, string> = {
  "/": "/og/home.jpg",
  "/about": "/og/about.jpg",
  "/services": "/og/services.jpg",
  "/products": "/og/products.jpg",
  "/industries": "/og/industries.jpg",
  "/contact": "/og/contact.jpg",
  "/faq": "/og/faq.jpg",
  "/privacy-policy": "/og/privacy-policy.jpg",
  "/terms-of-service": "/og/terms-of-service.jpg",
};
const productOgSlugs = new Set([
  "precision-blade-sharpening",
  "arden-router-bits",
  "pneumatic-tools",
  "pneumatic-brad-nailer-f50",
  "pneumatic-brad-nailer-f32",
  "pneumatic-stapler-1013j",
  "pneumatic-stapler-422j",
  "pneumatic-screwdrivers",
  "power-tools",
  "routers",
  "industrial-drills",
  "grinders",
  "planers",
  "jig-saws",
  "circular-saws",
  "screw-drivers",
  "tyre-rebuilding-tools",
  "tyre-buffing-blades",
  "r6-refills",
  "woodworking-tools",
  "stainless-steel-tube-handles",
  "drawer-runners",
  "magnets",
  "drawer-lockers",
  "hinges-set",
  "shelf-supports",
  "sanding-rolls-belts",
  "router-bits-boring-bits",
  "tongue-groove-cutter-set",
  "mortising-chisel-bit",
  "hand-planer-blades",
  "power-tool-accessories",
  "nail-pins",
  "stapler-pins",
  "band-saw-blades",
  "boring-bits",
  "power-tool-circular-saw-blades",
  "planer-blades",
  "router-bits",
  "screw-bits-bosch",
  "tct-blades",
  "hss-blades",
  "maintenance-kits",
  "technician-toolkits",
  "rebuild-wheel-systems",
]);
const industryOgSlugs = new Set([
  "woodworking-industry",
  "furniture-manufacturing",
  "packaging-industry",
  "printing-industry",
  "metal-fabrication",
  "plastic-processing",
]);

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}`;
  image?: string;
  imageAlt?: string;
  socialImage?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function getPageOgImagePath(path: `/${string}`) {
  if (staticPageOgImages[path]) {
    return staticPageOgImages[path];
  }

  const productSlug = path.match(/^\/products\/([^/?#]+)$/)?.[1];
  if (productSlug) {
    return getProductOgImagePath(productSlug);
  }

  const industrySlug = path.match(/^\/industries\/([^/?#]+)$/)?.[1];
  if (industrySlug) {
    return getIndustryOgImagePath(industrySlug);
  }

  return staticPageOgImages["/"];
}

export function getProductOgImagePath(slug: string) {
  return productOgSlugs.has(slug) ? `/og/products-${slug}.jpg` : "/og/products.jpg";
}

export function getIndustryOgImagePath(slug: string) {
  return industryOgSlugs.has(slug)
    ? `/og/industries-${slug}.jpg`
    : "/og/industries.jpg";
}

export function createPageMetadata({
  title,
  description,
  path,
  imageAlt = defaultImageAlt,
  socialImage,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(socialImage ?? getPageOgImagePath(path));
  const fullTitle = `${title} - ${siteConfig.name}`;

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: socialPreviewImageSize.width,
          height: socialPreviewImageSize.height,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
    },
  };
}

export const privateRouteRobots = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
} as const;

export function createBreadcrumbJsonLd(
  items: Array<{
    name: string;
    path: `/${string}`;
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createItemListJsonLd({
  name,
  description,
  path,
  items,
}: {
  name: string;
  description?: string;
  path: `/${string}`;
  items: Array<{
    name: string;
    path: `/${string}`;
    image?: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${absoluteUrl(path)}#item-list`,
    name,
    ...(description ? { description } : {}),
    url: absoluteUrl(path),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
      ...(item.image ? { image: absoluteUrl(item.image) } : {}),
    })),
  };
}

export function sanitizeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
