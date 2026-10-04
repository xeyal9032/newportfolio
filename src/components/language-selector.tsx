"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { useTransition } from "react";

const labels: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  tr: "TR",
  de: "DE",
  az: "AZ",
};

export function LanguageSelector() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const [pending, startTransition] = useTransition();

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{t("language")}</span>
      <select
        value={locale}
        disabled={pending}
        onChange={(event) => {
          const next = event.target.value as Locale;
          startTransition(() => {
            router.replace(pathname, { locale: next });
          });
        }}
        className="h-9 appearance-none rounded-full border border-border bg-transparent px-3 pr-7 text-sm text-foreground transition hover:bg-accent-soft disabled:opacity-60"
        aria-label={t("language")}
      >
        {locales.map((code) => (
          <option key={code} value={code} className="bg-surface text-foreground">
            {labels[code]}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2.5 text-[10px] text-muted">
        ▾
      </span>
    </label>
  );
}
