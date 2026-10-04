"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const t = useTranslations("nav");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={t("backToTop")}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={cn(
        "fixed right-[max(5.25rem,calc(env(safe-area-inset-right)+4.25rem))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 inline-flex size-12 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-[var(--shadow)] transition duration-300 md:right-[5.75rem] md:bottom-6",
        "hover:-translate-y-0.5 focus-visible:outline-none",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="size-5" strokeWidth={2} aria-hidden />
    </button>
  );
}
