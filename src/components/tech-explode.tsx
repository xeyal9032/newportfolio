"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  BrainCircuit,
  Cloud,
  Database,
  Layout,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { techEcosystem } from "@/data/projects";
import { cn } from "@/lib/utils";

const groupIcons: Record<(typeof techEcosystem)[number]["id"], LucideIcon> = {
  frontend: Layout,
  backend: Server,
  data: Database,
  ai: BrainCircuit,
  cloud: Cloud,
  tools: Wrench,
};

type LayerProps = {
  group: (typeof techEcosystem)[number];
  index: number;
  progress: MotionValue<number>;
  label: string;
};

function Layer({ group, index, progress, label }: LayerProps) {
  const Icon = groupIcons[group.id];

  // Deck overlap → real separation with readable gaps.
  const spacing = useTransform(progress, [0, 0.14, 0.78, 1], [-48, -48, 12, 12]);
  const marginTop = useTransform(spacing, (value) => (index === 0 ? 0 : value));
  const scale = useTransform(
    progress,
    [0, 0.14, 0.78, 1],
    [1 - index * 0.012, 1 - index * 0.012, 1, 1],
  );
  const detailOpacity = useTransform(progress, [0, 0.3, 0.58, 1], [0, 0, 1, 1]);
  const detailMaxHeight = useTransform(
    progress,
    [0, 0.3, 0.58, 1],
    ["0px", "0px", "4.5rem", "4.5rem"],
  );
  const x = useTransform(
    progress,
    [0, 0.14, 0.78, 1],
    [0, 0, index % 2 === 0 ? -8 : 8, index % 2 === 0 ? -8 : 8],
  );

  return (
    <motion.article
      className="relative w-full"
      style={{
        marginTop,
        scale,
        x,
        zIndex: techEcosystem.length - index,
      }}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[20px] border border-white/14",
          "bg-[#12161c] px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.45)]",
          "sm:rounded-[22px] sm:px-5 sm:py-3.5",
        )}
        style={{
          boxShadow: `0 18px 40px rgba(0,0,0,0.45), inset 0 0 0 1px color-mix(in oklab, ${group.accent} 28%, transparent)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-1"
          style={{ background: group.accent }}
          aria-hidden
        />

        <div className="relative flex items-center gap-3 sm:gap-3.5">
          <div
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/12 sm:size-10"
            style={{
              background: `color-mix(in oklab, ${group.accent} 24%, #12161c)`,
            }}
          >
            <Icon className="size-4 text-white" strokeWidth={1.7} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
              <p className="font-mono text-[0.62rem] tracking-[0.18em] text-white/40 uppercase">
                0{index + 1}
              </p>
              <h3 className="text-[0.98rem] font-semibold tracking-[-0.03em] text-white sm:text-[1.08rem]">
                {label}
              </h3>
            </div>

            <motion.div
              className="overflow-hidden"
              style={{ opacity: detailOpacity, maxHeight: detailMaxHeight }}
            >
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/12 bg-[#0d1014] px-2.5 py-1 font-mono text-[0.66rem] text-white/90 sm:text-[0.7rem]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function TechExplode() {
  const t = useTranslations("tech");
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const coreOpacity = useTransform(scrollYProgress, [0, 0.1, 0.28], [1, 0.85, 0]);
  const coreScale = useTransform(scrollYProgress, [0, 0.1, 0.28], [1, 0.96, 0.88]);
  const coreY = useTransform(scrollYProgress, [0, 0.1, 0.28], [0, -8, -28]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08, 0.18], [1, 1, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const stackOpacity = useTransform(scrollYProgress, [0, 0.08, 0.2], [0.4, 0.65, 1]);
  const stackScale = useTransform(scrollYProgress, [0.55, 0.9], [1, 0.94]);

  if (reduce) {
    return (
      <section
        id="stack"
        aria-labelledby="tech-heading"
        className="relative isolate overflow-clip bg-[#070809] py-16 text-white sm:py-20"
      >
        <div className="container-page">
          <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/45 uppercase">
            {t("explodeEyebrow")}
          </p>
          <h2
            id="tech-heading"
            className="mt-3 max-w-[16ch] text-[clamp(1.9rem,5.2vw,3.5rem)] font-semibold tracking-[-0.045em]"
          >
            {t("explodeTitle")}
          </h2>
          <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-white/65">
            {t("explodeSubtitle")}
          </p>
          <div className="mt-10 flex flex-col gap-3">
            {techEcosystem.map((group, index) => {
              const Icon = groupIcons[group.id];
              return (
                <article
                  key={group.id}
                  className="rounded-[22px] border border-white/14 bg-[#12161c] px-4 py-3.5 sm:px-5 sm:py-4"
                  style={{
                    boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${group.accent} 28%, transparent)`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="inline-flex size-10 items-center justify-center rounded-2xl border border-white/12"
                      style={{
                        background: `color-mix(in oklab, ${group.accent} 24%, #12161c)`,
                      }}
                    >
                      <Icon className="size-4 text-white" strokeWidth={1.7} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[0.65rem] tracking-[0.18em] text-white/40 uppercase">
                        0{index + 1} · {t(`groups.${group.id}`)}
                      </p>
                      <p className="mt-1 text-[0.78rem] text-white/55">
                        {t(`descriptions.${group.id}`)}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-white/12 bg-[#0d1014] px-2.5 py-1 font-mono text-[0.68rem] text-white/90"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="stack"
      aria-labelledby="tech-heading"
      className="relative isolate h-[380vh] overflow-clip bg-[#070809] text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,rgba(142,196,214,0.16),transparent_42%),radial-gradient(ellipse_at_80%_70%,rgba(154,215,192,0.08),transparent_40%)]"
        aria-hidden
      />

      <div className="sticky top-0 flex min-h-[100svh] flex-col justify-between overflow-hidden py-6 sm:py-8">
        <div className="container-page relative z-10 shrink-0">
          <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/45 uppercase sm:text-[0.74rem]">
            {t("explodeEyebrow")}
          </p>
          <h2
            id="tech-heading"
            className="mt-3 max-w-[16ch] text-[clamp(1.7rem,4.6vw,3rem)] font-semibold tracking-[-0.045em] text-white"
          >
            {t("explodeTitle")}
          </h2>
          <p className="mt-2 max-w-xl text-[0.92rem] leading-relaxed text-white/65 sm:text-[1rem]">
            {t("explodeSubtitle")}
          </p>
          <motion.p
            className="mt-3 inline-flex items-center gap-2 font-mono text-[0.72rem] text-white/40"
            style={{ opacity: hintOpacity }}
          >
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#9ad7c0]" />
            {t("explodeHint")}
          </motion.p>
        </div>

        <div className="relative mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-4">
          <motion.div
            className="pointer-events-none absolute inset-x-6 top-[42%] z-0 -translate-y-1/2 sm:inset-x-10"
            style={{ opacity: coreOpacity, scale: coreScale, y: coreY }}
            aria-hidden
          >
            <div className="mx-auto max-w-md rounded-[28px] border border-white/12 bg-[#10141a] px-6 py-7 text-center shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
              <p className="font-mono text-[0.68rem] tracking-[0.2em] text-[#8ec4d6] uppercase">
                {t("coreLabel")}
              </p>
              <p className="mt-3 text-[1.3rem] font-semibold tracking-[-0.04em] text-white sm:text-[1.5rem]">
                {t("coreTitle")}
              </p>
              <p className="mt-2 text-sm text-white/50">{t("coreSub")}</p>
            </div>
          </motion.div>

          <motion.div
            className="relative z-10 flex w-full flex-col"
            style={{ opacity: stackOpacity, scale: stackScale }}
          >
            {techEcosystem.map((group, index) => (
              <Layer
                key={group.id}
                group={group}
                index={index}
                progress={scrollYProgress}
                label={t(`groups.${group.id}`)}
              />
            ))}
          </motion.div>
        </div>

        <div className="container-page relative z-10 shrink-0 pb-2">
          <div className="mx-auto h-px max-w-md overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-[#8ec4d6] via-[#9ad7c0] to-[#d4b483]"
              style={{ width: progressWidth }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
