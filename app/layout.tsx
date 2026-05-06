import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@/components/regent/analytics/google-analytics";
import { JsonLd } from "@/components/regent/seo/json-ld";
import { absoluteUrl } from "@/lib/seo";
import { getSiteUrl, siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "industrial blade sharpening Sri Lanka",
    "TCT blade sharpening Sri Lanka",
    "HSS blade sharpening Sri Lanka",
    "blade sharpening Moratuwa",
    "Regent Technologies",
    "Arden Router Bits Sri Lanka",
    "woodworking tools Sri Lanka",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Industrial blade sharpening and tooling services",
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: getSiteUrl(),
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/regent/hero.png",
        width: 1600,
        height: 900,
        alt: "Regent Technologies industrial blade sharpening",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [absoluteUrl("/regent/hero.png")],
  },
  robots: {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = getSiteUrl();
  const organizationStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      name: siteConfig.name,
      url: siteUrl,
      publisher: {
        "@id": `${siteUrl}#localbusiness`,
      },
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${siteUrl}#localbusiness`,
      name: siteConfig.legalName,
      alternateName: "Regent",
      url: siteUrl,
      logo: absoluteUrl("/regent/brand/regent-logo-transparent.png"),
      image: absoluteUrl("/regent/hero.png"),
      description: siteConfig.description,
      email: siteConfig.email,
      telephone: siteConfig.phoneNumbers.map((phone) =>
        phone.href.replace(/^tel:/, ""),
      ),
      contactPoint: siteConfig.phoneNumbers.map((phone) => ({
        "@type": "ContactPoint",
        telephone: phone.href.replace(/^tel:/, ""),
        contactType: phone.primary ? "customer service" : "sales",
        areaServed: "LK",
        availableLanguage: ["en"],
      })),
      address: {
        "@type": "PostalAddress",
        streetAddress: "403 Bandaranayake Mawatha",
        addressLocality: "Moratuwa",
        postalCode: "10400",
        addressCountry: "LK",
      },
      areaServed: {
        "@type": "Country",
        name: "Sri Lanka",
      },
      sameAs: siteConfig.socialLinks.map((link) => link.href),
      hasMap: siteConfig.mapHref,
      knowsAbout: [
        "Industrial blade sharpening",
        "TCT blade sharpening",
        "HSS blade sharpening",
        "Arden Router Bits",
        "Woodworking tools",
        "Industrial tooling support",
      ],
    },
  ];

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <JsonLd data={organizationStructuredData} />
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
