"use client";

import Image from "next/image";
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
      className="relative min-h-[100svh] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-atmosphere.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,9,0.55)_0%,rgba(7,8,9,0.72)_45%,rgba(7,8,9,0.92)_100%)] dark:bg-[linear-gradient(180deg,rgba(7,8,9,0.45)_0%,rgba(7,8,9,0.7)_50%,rgba(7,8,9,0.95)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(142,196,214,0.18),transparent_45%)]" />
      </div>

      <div className="relative container-page flex min-h-[100svh] flex-col justify-end pb-16 pt-28 md:pb-24 md:pt-32">
        <div className="max-w-4xl">
          <motion.p
            className="text-[0.78rem] font-medium tracking-[0.22em] text-white/65 uppercase"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {t("name")}
          </motion.p>

          <motion.h1
            id="hero-heading"
            className="mt-5 max-w-[14ch] text-[clamp(3.4rem,9vw,7rem)] leading-[0.92] font-medium tracking-[-0.055em] text-white"
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            {t("headline")}
          </motion.h1>

          <motion.p
            className="mt-7 max-w-xl text-[1.12rem] leading-relaxed text-white/72 md:text-[1.28rem]"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            {t("sub")}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            <a
              href="#work"
              className="btn bg-white text-[#0b0c0f] shadow-[0_16px_40px_rgba(0,0,0,0.28)] hover:bg-white/95"
            >
              {t("ctaPrimary")}
            </a>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-white/20 bg-white/5 text-white backdrop-blur-md hover:bg-white/10"
            >
              {t("ctaSecondary")}
            </a>
          </motion.div>
        </div>

        <motion.div
          className="mt-14 grid grid-cols-2 gap-3 border-t border-white/10 pt-8 sm:grid-cols-4"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          aria-hidden
        >
          {pillars.map((label, index) => (
            <div key={label} className="min-w-0">
              <p className="text-[0.68rem] tracking-[0.18em] text-white/40">
                0{index + 1}
              </p>
              <p className="mt-2 text-sm font-medium tracking-[0.08em] text-white/85">
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
