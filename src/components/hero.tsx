"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const reduce = useReducedMotion();

  const pillars = [
    { key: "web", label: t("pillars.web") },
    { key: "ai", label: t("pillars.ai") },
    { key: "automation", label: t("pillars.automation") },
    { key: "cloud", label: t("pillars.cloud") },
  ];

  const longLocale = locale === "az" || locale === "ru" || locale === "de";

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#070809] text-white"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-dev-desk.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(7,8,9,0.92)_0%,rgba(7,8,9,0.78)_42%,rgba(7,8,9,0.55)_70%,rgba(7,8,9,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_15%,rgba(142,196,214,0.22),transparent_42%)]" />
      </div>

      <div className="relative container-page grid min-h-[100svh] items-center gap-10 pb-14 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-20 lg:pt-32">
        <div className="max-w-2xl">
          <motion.p
            className="text-[0.75rem] font-semibold tracking-[0.22em] text-white/75 uppercase"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {t("role")}
          </motion.p>

          <motion.h1
            id="hero-heading"
            className={cn(
              "mt-4 font-semibold tracking-[-0.05em] text-white",
              longLocale
                ? "text-[clamp(2.6rem,7.2vw,5.2rem)] leading-[1.05]"
                : "text-[clamp(3rem,8vw,5.8rem)] leading-[0.98]",
            )}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.04 }}
          >
            {t("name")}
          </motion.h1>

          <motion.p
            className={cn(
              "mt-5 font-medium tracking-[-0.03em] text-white",
              longLocale
                ? "max-w-[22ch] text-[clamp(1.35rem,3.2vw,2.1rem)] leading-snug"
                : "max-w-[18ch] text-[clamp(1.5rem,3.6vw,2.35rem)] leading-[1.15]",
            )}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("headline")}
          </motion.p>

          <motion.p
            className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-white/85 md:text-[1.12rem]"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
          >
            {t("sub")}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <a
              href="#work"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-[0.95rem] font-semibold text-[#0b0c0f] shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:bg-white/95"
            >
              {t("ctaPrimary")}
            </a>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 text-[0.95rem] font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/16"
            >
              {t("ctaSecondary")}
            </a>
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.26 }}
          >
            {pillars.map((item, index) => (
              <div
                key={item.key}
                className="rounded-2xl border border-white/15 bg-white/5 px-3 py-3 backdrop-blur-sm"
              >
                <p className="text-[0.65rem] tracking-[0.16em] text-white/45">
                  0{index + 1}
                </p>
                <p className="mt-1.5 text-[0.78rem] font-semibold tracking-[0.06em] text-white">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.14 }}
        >
          <div className="overflow-hidden rounded-[28px] border border-white/15 bg-[#0d1014]/80 shadow-[0_40px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs tracking-[0.08em] text-white/45">
                portfolio.ts — workspace
              </span>
            </div>

            <div className="relative aspect-[16/11]">
              <Image
                src="/images/hero-dev-desk.jpg"
                alt={t("visualAlt")}
                fill
                sizes="(max-width: 1024px) 90vw, 540px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(7,8,9,0.75)_100%)]" />
            </div>

            <div className="space-y-3 p-5 font-mono text-[0.78rem] leading-relaxed text-[#9ad7c0] md:p-6 md:text-[0.84rem]">
              <p>
                <span className="text-white/40">const</span>{" "}
                <span className="text-[#8ec4d6]">builder</span> = {"{"}
              </p>
              <p className="pl-4">
                name: <span className="text-[#f0c674]">&quot;Khayal Jamilli&quot;</span>,
              </p>
              <p className="pl-4">
                focus: [
                <span className="text-[#f0c674]">&quot;Web&quot;</span>,{" "}
                <span className="text-[#f0c674]">&quot;AI&quot;</span>,{" "}
                <span className="text-[#f0c674]">&quot;Automation&quot;</span>]
              </p>
              <p className="pl-4">
                shipping: <span className="text-[#c5a5ff]">true</span>
              </p>
              <p>{"}"}</p>
              <p className="pt-1 text-white/50">
                // {t("codeNote")}
              </p>
            </div>
          </div>

          <div className="absolute -right-2 -bottom-3 hidden rounded-2xl border border-white/15 bg-[#12161c]/90 px-4 py-3 text-xs text-white/80 shadow-xl backdrop-blur md:block">
            <p className="tracking-[0.12em] text-white/45 uppercase">Live</p>
            <p className="mt-1 font-medium">{t("liveNote")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
