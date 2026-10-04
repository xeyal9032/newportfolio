"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSelector } from "./language-selector";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", key: "about" },
  { href: "#work", key: "work" },
  { href: "#projects", key: "projects" },
  { href: "#github", key: "github" },
  { href: "#contact", key: "contact" },
] as const;

export function Nav() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overHero = !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "nav-blur" : "bg-transparent",
      )}
    >
      <div className="container-page flex h-[4.25rem] items-center justify-between gap-4">
        <a
          href="#top"
          className={cn(
            "text-[0.98rem] font-medium tracking-[-0.02em] transition",
            overHero ? "text-white" : "text-foreground",
          )}
        >
          Khayal Jamilli
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className={cn(
                "text-sm transition",
                overHero
                  ? "text-white/70 hover:text-white"
                  : "text-muted hover:text-foreground",
              )}
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className={cn("hidden sm:block", overHero && "[&_select]:border-white/20 [&_select]:text-white")}>
            <LanguageSelector />
          </div>
          <ThemeToggle />
          <button
            type="button"
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full border md:hidden",
              overHero
                ? "border-white/25 text-white"
                : "border-border text-foreground",
            )}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("close") : t("menu")}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? t("close") : t("menu")}</span>
            <span className="flex w-4 flex-col gap-1.5" aria-hidden>
              <span
                className={cn(
                  "h-px w-full transition",
                  overHero ? "bg-white" : "bg-foreground",
                  open && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-full transition",
                  overHero ? "bg-white" : "bg-foreground",
                  open && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "border-t border-border bg-background/95 backdrop-blur-xl md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="container-page flex flex-col gap-4 py-5">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-lg text-foreground"
              onClick={() => setOpen(false)}
            >
              {t(link.key)}
            </a>
          ))}
          <div className="pt-2 sm:hidden">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}
