"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const t = useTranslations("nav");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
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
        // Sit above the 56px assistant FAB + gap, same right edge
        "fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.25rem)] z-[55]",
        "inline-flex size-12 items-center justify-center rounded-full border border-border",
        "bg-surface/95 text-foreground shadow-[var(--shadow-soft)] backdrop-blur-md",
        "transition duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow)]",
        "focus-visible:outline-none md:right-6 md:bottom-[5.25rem]",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <ArrowUp className="size-5" strokeWidth={2.2} aria-hidden />
    </button>
  );
}
