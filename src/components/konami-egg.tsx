"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

const HOLD_MS = 6500;
const CHARS = "01<>/$#*+=";

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    target.isContentEditable ||
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT"
  );
}

function CodeRain({ active }: { active: boolean }) {
  const columns = useMemo(
    () =>
      Array.from({ length: 22 }, (_, index) => ({
        id: index,
        left: `${(index / 22) * 100}%`,
        delay: (index % 9) * 0.12,
        duration: 2.4 + (index % 5) * 0.35,
        text: Array.from(
          { length: 10 },
          () => CHARS[Math.floor(Math.random() * CHARS.length)],
        ).join(""),
      })),
    [],
  );

  if (!active) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.22]"
      aria-hidden
    >
      {columns.map((col) => (
        <span
          key={col.id}
          className="absolute top-[-30%] font-mono text-[0.68rem] leading-[1.15] text-[#8ec4d6]"
          style={{
            left: col.left,
            animation: `egg-rain ${col.duration}s linear ${col.delay}s infinite`,
          }}
        >
          {col.text.split("").map((char, i) => (
            <span
              key={`${col.id}-${i}`}
              className="block"
              style={{ opacity: 0.35 + (i / 10) * 0.65 }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}

export function KonamiEgg() {
  const t = useTranslations("easterEgg");
  const reduce = useReducedMotion();
  const bufferRef = useRef<string[]>([]);
  const lockRef = useRef(false);
  const closeTimerRef = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [bootStep, setBootStep] = useState(0);

  const bootLines = [t("boot1"), t("boot2"), t("boot3")];

  function close() {
    setOpen(false);
    lockRef.current = false;
    setTyped("");
    setBootStep(0);
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function trigger() {
    if (lockRef.current) return;
    lockRef.current = true;
    setTyped("");
    setBootStep(0);
    setOpen(true);
    closeTimerRef.current = window.setTimeout(close, HOLD_MS);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && lockRef.current) {
        event.preventDefault();
        close();
        return;
      }

      if (isEditableTarget(event.target)) return;

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const next = [...bufferRef.current, key].slice(-KONAMI.length);
      bufferRef.current = next;

      const matched = KONAMI.every((expected, index) => next[index] === expected);
      if (matched) {
        bufferRef.current = [];
        trigger();
      }
    }

    function onCustom() {
      trigger();
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("portfolio:easter-egg", onCustom);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("portfolio:easter-egg", onCustom);
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const full = t("bootLine");
    if (reduce) {
      setTyped(full);
      setBootStep(bootLines.length);
      return;
    }

    let i = 0;
    const typeTimer = window.setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) window.clearInterval(typeTimer);
    }, 18);

    let step = 0;
    const stepTimer = window.setInterval(() => {
      step += 1;
      setBootStep(step);
      if (step >= bootLines.length) window.clearInterval(stepTimer);
    }, 700);

    return () => {
      window.clearInterval(typeTimer);
      window.clearInterval(stepTimer);
    };
  }, [open, reduce, t, bootLines.length]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-label={t("title")}
        >
          <button
            type="button"
            aria-label={t("dismiss")}
            className="absolute inset-0 cursor-default bg-[#050607]/94"
            onClick={close}
          />

          {!reduce ? <CodeRain active={open} /> : null}

          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(142,196,214,0.22),transparent_52%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
            aria-hidden
          />

          <motion.div
            className={cn(
              "relative z-10 w-full max-w-xl overflow-hidden rounded-[28px]",
              "border border-white/14 bg-[#0d1014] text-white",
              "shadow-[0_40px_120px_rgba(0,0,0,0.65)]",
            )}
            initial={reduce ? false : { opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-[0.7rem] tracking-[0.14em] text-white/45">
                  {t("title")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] text-[#9ad7c0]">
                  <span className="size-1.5 animate-pulse rounded-full bg-[#9ad7c0]" />
                  live
                </span>
                <button
                  type="button"
                  onClick={close}
                  className="font-mono text-[0.68rem] tracking-[0.12em] text-white/45 transition hover:text-white"
                >
                  esc
                </button>
              </div>
            </div>

            <div className="px-6 py-8 sm:px-8 sm:py-10">
              <p className="font-mono text-[0.72rem] tracking-[0.22em] text-[#8ec4d6] uppercase">
                {t("eyebrow")}
              </p>

              <h2 className="mt-3 text-[clamp(2.4rem,8vw,3.8rem)] font-semibold tracking-[-0.055em] text-white">
                {t("headline")}
              </h2>

              <p className="mt-3 max-w-[36ch] text-[1.02rem] leading-relaxed text-white/75 sm:text-[1.08rem]">
                {t("line2")}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Web", "AI", "Automation", "Cloud"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 font-mono text-[0.7rem] text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(t("mailSubject"))}`}
                  className="egg-cta-primary inline-flex min-h-11 items-center rounded-full px-5 text-[0.92rem] font-semibold transition hover:-translate-y-0.5"
                >
                  {t("cta")}
                </a>
                <a
                  href="#contact"
                  onClick={close}
                  className="egg-cta-secondary inline-flex min-h-11 items-center rounded-full border px-5 text-[0.92rem] font-semibold transition hover:-translate-y-0.5"
                >
                  {t("ctaSecondary")}
                </a>
              </div>

              <div className="mt-8 space-y-1.5 border-t border-white/10 pt-4 font-mono text-[0.74rem]">
                {bootLines.slice(0, bootStep).map((line) => (
                  <p key={line} className="text-[#9ad7c0]">
                    ✓ {line}
                  </p>
                ))}
                <p className="text-white/55">
                  <span className="text-[#8ec4d6]">$</span> {typed}
                  <span
                    className={cn(
                      "ml-0.5 inline-block h-[1em] w-[0.55ch] translate-y-[0.1em] bg-[#f0c674]",
                      !reduce && "animate-pulse",
                    )}
                    aria-hidden
                  />
                </p>
              </div>
            </div>

            <div className="h-1 bg-white/8">
              <motion.div
                className="h-full bg-gradient-to-r from-[#8ec4d6] via-[#9ad7c0] to-[#f0c674]"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: HOLD_MS / 1000, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
