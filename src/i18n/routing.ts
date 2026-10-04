import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ru", "tr", "de", "az"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});
