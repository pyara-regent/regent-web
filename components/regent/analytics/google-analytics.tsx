"use client";

import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";

const analyticsExcludedPrefixes = ["/hidden-admin"] as const;

export function GoogleAnalytics() {
  const pathname = usePathname();
  const shouldExclude = analyticsExcludedPrefixes.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (shouldExclude || !siteConfig.googleAnalyticsId) {
    return null;
  }

  return <NextGoogleAnalytics gaId={siteConfig.googleAnalyticsId} />;
}
