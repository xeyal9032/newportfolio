"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

const labels: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  tr: "TR",
  de: "DE",
  az: "AZ",
};

type LanguageSelectorProps = {
  forceLight?: boolean;
};

export function LanguageSelector({ forceLight = false }: LanguageSelectorProps) {
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
        className={cn(
          "h-9 appearance-none rounded-full border px-3 pr-7 text-sm transition disabled:opacity-60",
          forceLight
            ? "border-white/35 bg-white/10 text-white hover:bg-white/18"
            : "border-border bg-surface/60 text-foreground hover:bg-accent-soft",
        )}
        aria-label={t("language")}
      >
        {locales.map((code) => (
          <option key={code} value={code} className="bg-white text-black dark:bg-[#121418] dark:text-white">
            {labels[code]}
          </option>
        ))}
      </select>
      <span
        className={cn(
          "pointer-events-none absolute right-2.5 text-[10px]",
          forceLight ? "text-white/70" : "text-muted",
        )}
      >
        ▾
      </span>
    </label>
  );
}
