import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.map((locale) => ({
    url: `${siteConfig.siteUrl}/${locale}`,
    lastModified,
    changeFrequency: "weekly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
  }));
}
