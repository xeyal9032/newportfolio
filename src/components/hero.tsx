"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { HeroStatus } from "./hero-status";

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
      className="relative isolate min-h-[100svh] overflow-x-clip bg-[#070809] text-white"
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

      <div className="relative container-page grid min-h-[100svh] items-center gap-8 pb-12 pt-24 sm:gap-10 sm:pb-14 sm:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-14 lg:pb-20 lg:pt-32">
        <div className="min-w-0 max-w-2xl">
          <motion.p
            className="text-[0.68rem] font-semibold tracking-[0.16em] text-white/75 uppercase sm:text-[0.75rem] sm:tracking-[0.22em]"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {t("role")}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.02 }}
          >
            <HeroStatus />
          </motion.div>

          <motion.h1
            id="hero-heading"
            className={cn(
              "mt-3 break-words font-semibold tracking-[-0.05em] text-white sm:mt-4",
              longLocale
                ? "text-[clamp(2.25rem,9vw,5.2rem)] leading-[1.08]"
                : "text-[clamp(2.5rem,10vw,5.8rem)] leading-[1.02]",
            )}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.04 }}
          >
            {t("name")}
          </motion.h1>

          <motion.p
            className={cn(
              "mt-4 max-w-xl break-words font-medium tracking-[-0.03em] text-white sm:mt-5",
              longLocale
                ? "text-[clamp(1.2rem,4.2vw,2.1rem)] leading-snug"
                : "text-[clamp(1.3rem,4.6vw,2.35rem)] leading-[1.2]",
            )}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("headline")}
          </motion.p>

          <motion.p
            className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-white/85 sm:mt-5 sm:text-[1.02rem] md:text-[1.12rem]"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
          >
            {t("sub")}
          </motion.p>

          <motion.div
            className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <a
              href="#work"
              className="hero-btn-primary inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 text-center text-[0.95rem] font-semibold transition hover:-translate-y-0.5 sm:w-auto"
            >
              {t("ctaPrimary")}
            </a>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-secondary inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 text-center text-[0.95rem] font-semibold backdrop-blur-md transition hover:-translate-y-0.5 sm:w-auto"
            >
              {t("ctaSecondary")}
            </a>
          </motion.div>

          <motion.div
            className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-10 sm:gap-3 md:grid-cols-4"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.26 }}
          >
            {pillars.map((item, index) => (
              <div
                key={item.key}
                className="min-w-0 rounded-2xl border border-white/15 bg-white/5 px-3 py-3 backdrop-blur-sm"
              >
                <p className="text-[0.65rem] tracking-[0.16em] text-white/45">
                  0{index + 1}
                </p>
                <p className="mt-1.5 truncate text-[0.78rem] font-semibold tracking-[0.06em] text-white">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full min-w-0 max-w-xl lg:max-w-none"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.14 }}
        >
          <div className="overflow-hidden rounded-[22px] border border-white/15 bg-[#0d1014]/80 shadow-[0_40px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:rounded-[28px]">
            <div className="flex min-w-0 items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#28c840]" />
              <span className="ml-2 truncate text-xs tracking-[0.08em] text-white/45">
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

            <div className="space-y-2.5 overflow-x-auto p-4 font-mono text-[0.72rem] leading-relaxed text-[#9ad7c0] sm:space-y-3 sm:p-5 sm:text-[0.78rem] md:p-6 md:text-[0.84rem]">
              <p>
                <span className="text-white/40">const</span>{" "}
                <span className="text-[#8ec4d6]">builder</span> = {"{"}
              </p>
              <p className="pl-4 whitespace-nowrap sm:whitespace-normal">
                name: <span className="text-[#f0c674]">&quot;Khayal Jamilli&quot;</span>,
              </p>
              <p className="pl-4 whitespace-nowrap sm:whitespace-normal">
                focus: [
                <span className="text-[#f0c674]">&quot;Web&quot;</span>,{" "}
                <span className="text-[#f0c674]">&quot;AI&quot;</span>,{" "}
                <span className="text-[#f0c674]">&quot;Automation&quot;</span>]
              </p>
              <p className="pl-4">
                shipping: <span className="text-[#c5a5ff]">true</span>
              </p>
              <p>{"}"}</p>
              <p className="pt-1 text-white/50">// {t("codeNote")}</p>
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-white/15 bg-[#12161c]/90 px-4 py-3 text-xs text-white/80 shadow-xl backdrop-blur md:absolute md:right-2 md:-bottom-3 md:mt-0 md:max-w-[240px]">
            <p className="tracking-[0.12em] text-white/45 uppercase">Live</p>
            <p className="mt-1 font-medium leading-snug">{t("liveNote")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
