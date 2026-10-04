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
    const onScroll = () => setScrolled(window.scrollY > 40);
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
      <div className="container-page flex h-[4.35rem] items-center justify-between gap-4">
        <a
          href="#top"
          className={cn(
            "text-[0.98rem] font-semibold tracking-[-0.02em] transition",
            overHero ? "text-white" : "text-foreground",
          )}
        >
          Khayal Jamilli
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className={cn(
                "text-[0.9rem] font-medium transition",
                overHero
                  ? "text-white/80 hover:text-white"
                  : "text-muted hover:text-foreground",
              )}
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSelector forceLight={overHero} />
          </div>
          <ThemeToggle forceLight={overHero} />
          <button
            type="button"
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full border lg:hidden",
              overHero
                ? "border-white/35 bg-white/10 text-white"
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
          "border-t border-border bg-[#0b0c0e]/96 backdrop-blur-xl lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="container-page flex flex-col gap-4 py-5">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-lg text-white"
              onClick={() => setOpen(false)}
            >
              {t(link.key)}
            </a>
          ))}
          <div className="pt-2 sm:hidden">
            <LanguageSelector forceLight />
          </div>
        </div>
      </div>
    </header>
  );
}
