"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();

  const pillars = [
    t("pillars.web"),
    t("pillars.ai"),
    t("pillars.automation"),
    t("pillars.cloud"),
  ];

  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-4rem)] items-center py-16 md:py-20"
      aria-labelledby="hero-heading"
    >
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            className="eyebrow mb-5"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {t("name")}
          </motion.p>
          <motion.h1
            id="hero-heading"
            className="display max-w-[11ch]"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            {t("headline")}
          </motion.h1>
          <motion.p
            className="lead mt-6"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            {t("sub")}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            <a href="#work" className="btn btn-primary">
              {t("ctaPrimary")}
            </a>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {t("ctaSecondary")}
            </a>
          </motion.div>
        </div>

        <motion.div
          className="surface relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden p-6 sm:aspect-square lg:max-w-none"
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--accent-soft),transparent_45%),radial-gradient(circle_at_80%_70%,var(--hero-glow-2),transparent_40%)]" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>Product Surface</span>
              <span className="rounded-full border border-border px-2 py-1">
                Live
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {pillars.map((label, index) => (
                <motion.div
                  key={label}
                  className="rounded-[14px] border border-border bg-surface-elevated/80 px-4 py-5"
                  animate={
                    reduce
                      ? undefined
                      : {
                          y: [0, index % 2 === 0 ? -6 : 6, 0],
                        }
                  }
                  transition={{
                    duration: 4.5 + index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <p className="text-[0.7rem] tracking-[0.18em] text-muted">
                    0{index + 1}
                  </p>
                  <p className="mt-3 text-sm font-medium tracking-wide">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="rounded-[14px] border border-border bg-background/50 px-4 py-3 text-sm text-muted">
              Web · AI · Automation · Cloud
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
