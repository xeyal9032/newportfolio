"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const languageMeta: Record<
  Locale,
  { code: string; name: string; Flag: () => ReactNode }
> = {
  en: { code: "EN", name: "English", Flag: FlagGB },
  ru: { code: "RU", name: "Русский", Flag: FlagRU },
  tr: { code: "TR", name: "Türkçe", Flag: FlagTR },
  de: { code: "DE", name: "Deutsch", Flag: FlagDE },
  az: { code: "AZ", name: "Azərbaycan", Flag: FlagAZ },
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
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const current = languageMeta[locale];

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const switchLocale = (next: Locale) => {
    if (next === locale) {
      setOpen(false);
      return;
    }
    setOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        disabled={pending}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={t("language")}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex h-9 items-center gap-2 rounded-full border px-2.5 text-sm transition disabled:opacity-60",
          forceLight
            ? "border-white/35 bg-white/10 text-white hover:bg-white/18"
            : "border-border bg-surface/60 text-foreground hover:bg-accent-soft",
        )}
      >
        <span className="overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)]">
          <current.Flag />
        </span>
        <span className="font-medium tracking-wide">{current.code}</span>
        <span
          className={cn(
            "text-[10px]",
            forceLight ? "text-white/70" : "text-muted",
          )}
        >
          ▾
        </span>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={t("language")}
          className={cn(
            "absolute top-[calc(100%+0.4rem)] right-0 z-50 w-[min(16rem,calc(100vw-2rem))] min-w-[11.5rem] overflow-hidden rounded-2xl border py-1 shadow-[var(--shadow)]",
            forceLight
              ? "border-white/20 bg-[#0f1216]/95 text-white backdrop-blur-md"
              : "border-border bg-surface text-foreground",
          )}
        >
          {locales.map((code) => {
            const item = languageMeta[code];
            const selected = code === locale;
            return (
              <li key={code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => switchLocale(code)}
                  className={cn(
                    "flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition",
                    selected
                      ? forceLight
                        ? "bg-white/14"
                        : "bg-accent-soft"
                      : forceLight
                        ? "hover:bg-white/10"
                        : "hover:bg-accent-soft/70",
                  )}
                >
                  <span className="overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)]">
                    <item.Flag />
                  </span>
                  <span className="min-w-[1.6rem] font-semibold tracking-wide">
                    {item.code}
                  </span>
                  <span
                    className={cn(
                      "truncate",
                      forceLight ? "text-white/70" : "text-muted",
                    )}
                  >
                    {item.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function FlagFrame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 16"
      width="22"
      height="15"
      aria-hidden
      className="block"
    >
      {children}
    </svg>
  );
}

function FlagGB() {
  return (
    <FlagFrame>
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#fff" strokeWidth="3.2" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" strokeWidth="1.6" />
      <path d="M12 0 V16 M0 8 H24" stroke="#fff" strokeWidth="5" />
      <path d="M12 0 V16 M0 8 H24" stroke="#C8102E" strokeWidth="2.6" />
    </FlagFrame>
  );
}

function FlagRU() {
  return (
    <FlagFrame>
      <rect width="24" height="16" fill="#fff" />
      <rect y="5.33" width="24" height="5.34" fill="#0039A6" />
      <rect y="10.67" width="24" height="5.33" fill="#D52B1E" />
    </FlagFrame>
  );
}

function FlagTR() {
  return (
    <FlagFrame>
      <rect width="24" height="16" fill="#E30A17" />
      <circle cx="10.2" cy="8" r="4.1" fill="#fff" />
      <circle cx="11.5" cy="8" r="3.25" fill="#E30A17" />
      <polygon
        fill="#fff"
        points="14.9,8 16.55,8.55 15.85,7 16.55,5.45 14.9,6 13.25,5.45 13.95,7 13.25,8.55"
      />
    </FlagFrame>
  );
}

function FlagDE() {
  return (
    <FlagFrame>
      <rect width="24" height="16" fill="#000" />
      <rect y="5.33" width="24" height="5.34" fill="#DD0000" />
      <rect y="10.67" width="24" height="5.33" fill="#FFCE00" />
    </FlagFrame>
  );
}

function FlagAZ() {
  return (
    <FlagFrame>
      <rect width="24" height="16" fill="#00B5E2" />
      <rect y="5.33" width="24" height="5.34" fill="#EF3340" />
      <rect y="10.67" width="24" height="5.33" fill="#509E2F" />
      <circle cx="10.4" cy="8" r="2.15" fill="#fff" />
      <circle cx="11.15" cy="8" r="1.7" fill="#EF3340" />
      <polygon
        fill="#fff"
        points="13.55,8 14.35,8.28 14,7.5 14.35,6.72 13.55,7 12.75,6.72 13.1,7.5 12.75,8.28"
      />
    </FlagFrame>
  );
}
