import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/regent/layout/site-footer";
import { SiteHeader } from "@/components/regent/layout/site-header";
import { absoluteUrl, getPageOgImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const description =
  "The requested Regent Technologies page could not be found. Return to the homepage or contact Regent Technologies for direct support.";
const notFoundOgImage = getPageOgImagePath("/");

export const metadata: Metadata = {
  title: "Page Not Found",
  description,
  openGraph: {
    title: `Page Not Found - ${siteConfig.name}`,
    description,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: absoluteUrl(notFoundOgImage),
        width: 1200,
        height: 630,
        alt: "Regent Technologies page not found preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Page Not Found - ${siteConfig.name}`,
    description,
    images: [absoluteUrl(notFoundOgImage)],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="bg-white text-[var(--foreground)]">
      <section className="bg-[var(--regent-blue-950)]">
        <SiteHeader />
        <div className="mx-auto max-w-[1440px] px-4 py-24 text-white md:px-12 md:py-32">
          <div className="max-w-[760px] space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white/75">
              404
            </p>
            <h1 className="text-4xl font-bold leading-[1.15] md:text-[56px] md:leading-[1.2]">
              The page you requested could not be found.
            </h1>
            <p className="text-lg leading-8 text-[var(--muted-light)]">
              Return to the Regent Technologies homepage or continue to the
              contact page if you need direct help from our team.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-[var(--regent-red)] px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-[var(--regent-red-dark)] md:text-lg"
                href="/"
              >
                Back To Home
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
