"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const LINE_KEYS = ["systems", "ai", "automation", "available"] as const;

export function HeroStatus() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();

  const lines = useMemo(
    () => LINE_KEYS.map((key) => t(`statusLines.${key}`)),
    [t],
  );

  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState(reduce ? lines[0] : "");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">(
    "typing",
  );

  useEffect(() => {
    if (reduce) {
      setText(lines[lineIndex]);
      const timer = window.setTimeout(() => {
        setLineIndex((value) => (value + 1) % lines.length);
      }, 2800);
      return () => window.clearTimeout(timer);
    }

    const full = lines[lineIndex];

    if (phase === "typing") {
      if (text.length < full.length) {
        const timer = window.setTimeout(() => {
          setText(full.slice(0, text.length + 1));
        }, 34 + (text.length % 3) * 8);
        return () => window.clearTimeout(timer);
      }
      const timer = window.setTimeout(() => setPhase("holding"), 40);
      return () => window.clearTimeout(timer);
    }

    if (phase === "holding") {
      const timer = window.setTimeout(() => setPhase("deleting"), 1800);
      return () => window.clearTimeout(timer);
    }

    if (text.length > 0) {
      const timer = window.setTimeout(() => {
        setText(full.slice(0, text.length - 1));
      }, 18);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setLineIndex((value) => (value + 1) % lines.length);
      setPhase("typing");
    }, 180);
    return () => window.clearTimeout(timer);
  }, [lineIndex, lines, phase, reduce, text]);

  return (
    <div
      className={cn(
        "mt-4 inline-flex max-w-full items-center gap-2 overflow-hidden rounded-xl",
        "border border-white/15 bg-black/35 px-3 py-2 font-mono text-[0.78rem]",
        "text-white/85 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-md",
        "sm:mt-5 sm:px-3.5 sm:py-2.5 sm:text-[0.84rem]",
      )}
      aria-live="polite"
    >
      <span className="shrink-0 text-[#8ec4d6]">$</span>
      <span className="shrink-0 text-white/40">{t("statusPrompt")}</span>
      <span className="min-w-0 truncate">
        <span className="text-[#9ad7c0]">{text}</span>
        <span
          className={cn(
            "ml-0.5 inline-block h-[1em] w-[0.55ch] translate-y-[0.08em] bg-[#f0c674]",
            !reduce && "animate-pulse",
          )}
          aria-hidden
        />
      </span>
    </div>
  );
}
