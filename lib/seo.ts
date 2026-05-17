import type { Metadata } from "next";
import { getSiteUrl, siteConfig } from "@/lib/site-config";

const defaultImage = "/regent/hero.png";
const defaultImageAlt = "Regent Technologies industrial blade sharpening in Sri Lanka";
const socialPreviewImageSize = {
  width: 1200,
  height: 630,
} as const;

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}`;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function createOgImagePath({
  title,
  description,
  path,
  image = defaultImage,
}: {
  title: string;
  description: string;
  path: `/${string}`;
  image?: string;
}) {
  const params = new URLSearchParams({
    title,
    description,
    path,
    image,
    fit: shouldContainOgImage(path, image) ? "contain" : "cover",
  });

  return `/api/og?${params.toString()}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  image = defaultImage,
  imageAlt = defaultImageAlt,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(createOgImagePath({ title, description, path, image }));
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

function shouldContainOgImage(path: `/${string}`, image: string) {
  return path.startsWith("/products") || image.includes("/regent/products/");
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
