import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  Focus,
  GitPullRequestArrow,
  GraduationCap,
  Languages,
  PackageCheck,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { GitHubIcon, GmailIcon, LinkedInIcon } from "./brand-icons";
import { Reveal } from "./reveal";

const principleIcons: Record<
  "clarity" | "reliability" | "shipping" | "collaboration",
  LucideIcon
> = {
  clarity: Focus,
  reliability: ShieldCheck,
  shipping: PackageCheck,
  collaboration: GitPullRequestArrow,
};

const languageScores: Record<"az" | "tr" | "ru" | "uk" | "de" | "en", number> = {
  az: 5,
  tr: 4,
  ru: 4,
  uk: 4,
  de: 3,
  en: 3,
};

export async function About() {
  const t = await getTranslations("about");

  const languages = ["az", "tr", "ru", "uk", "de", "en"] as const;
  const education = ["master", "bachelor", "cert"] as const;
  const principles = ["clarity", "reliability", "shipping", "collaboration"] as const;
  const experience = ["govmate", "ostwind", "automation"] as const;

  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2
            id="about-heading"
            className="headline mt-4 max-w-[20ch]"
          >
            {t("title")}
          </h2>
          <p className="lead mt-5 max-w-3xl">{t("lead")}</p>
        </Reveal>

        <div className="mt-10 grid items-start gap-10 sm:mt-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          <Reveal>
            <div className="media-frame relative mx-auto aspect-[4/5] w-full max-w-md lg:mx-0 lg:max-w-none">
              <Image
                src="/images/portrait.jpg"
                alt={t("portraitAlt")}
                fill
                sizes="(max-width: 1024px) 90vw, 460px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(7,8,9,0.72)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-7">
                <p className="text-sm font-semibold tracking-[0.16em] text-white uppercase">
                  Khayal Jamilli
                </p>
                <p className="mt-1 text-[0.9rem] font-medium leading-snug text-white sm:text-[0.95rem]">
                  {t("role")}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/85">
                  {t("location")}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.04}>
              <div className="space-y-5 text-[1.08rem] leading-relaxed text-muted md:text-[1.12rem]">
                <p className="text-[1.2rem] font-medium leading-relaxed text-foreground md:text-[1.28rem]">
                  {t("p1")}
                </p>
                <p>{t("p2")}</p>
                <p>{t("p3")}</p>
                <p>{t("p4")}</p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="btn btn-primary w-full sm:w-auto"
                >
                  <GmailIcon className="size-4 shrink-0" />
                  {t("ctaEmail")}
                </a>
                <a
                  href={siteConfig.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full sm:w-auto"
                >
                  <LinkedInIcon className="size-4 shrink-0 text-[#0A66C2]" />
                  {t("ctaLinkedin")}
                </a>
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full sm:w-auto"
                >
                  <GitHubIcon className="size-4 shrink-0" />
                  {t("ctaGithub")}
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-[24px] border border-border bg-[linear-gradient(180deg,var(--surface)_0%,var(--surface-elevated)_100%)] shadow-[var(--shadow-soft)]">
          <Reveal>
            <div className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-7 sm:py-6">
              <div className="min-w-0">
                <p className="font-mono text-[0.68rem] tracking-[0.16em] text-accent uppercase">
                  01 — 04
                </p>
                <h3 className="mt-2 text-[1.55rem] font-semibold tracking-[-0.035em] text-foreground sm:text-[1.85rem]">
                  {t("principlesTitle")}
                </h3>
                <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
                  {t("principlesSubtitle")}
                </p>
              </div>
              <p className="shrink-0 font-mono text-[0.72rem] text-muted">
                operating principles
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2">
            {principles.map((item, index) => {
              const Icon = principleIcons[item];
              return (
                <Reveal key={item} delay={index * 0.04}>
                  <article
                    className={cn(
                      "h-full px-5 py-5 sm:px-7 sm:py-6",
                      index < 2 && "border-b border-border",
                      index % 2 === 0 && "md:border-r md:border-border",
                    )}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl border border-border bg-background text-foreground">
                        <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <p className="font-mono text-[0.68rem] tracking-[0.16em] text-accent uppercase">
                            0{index + 1}
                          </p>
                          <h4 className="text-[1.05rem] font-semibold tracking-[-0.025em] text-foreground sm:text-[1.12rem]">
                            {t(`principles.${item}.title`)}
                          </h4>
                        </div>
                        <p className="mt-2 text-[0.9rem] leading-relaxed text-muted sm:text-[0.94rem]">
                          {t(`principles.${item}.body`)}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="mt-14">
          <Reveal>
            <h3 className="text-2xl tracking-[-0.03em] text-foreground md:text-3xl">
              {t("experienceTitle")}
            </h3>
            <p className="mt-3 max-w-2xl text-[1.02rem] text-muted">
              {t("experienceSubtitle")}
            </p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {experience.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
                <article className="surface grid gap-4 p-7 md:grid-cols-[180px_1fr] md:gap-8">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                      {t(`experience.${item}.tag`)}
                    </p>
                    <p className="mt-3 text-lg font-semibold text-foreground">
                      {t(`experience.${item}.title`)}
                    </p>
                  </div>
                  <p className="text-[1.02rem] leading-relaxed text-muted">
                    {t(`experience.${item}.body`)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="h-full overflow-hidden rounded-[24px] border border-border bg-[linear-gradient(180deg,var(--surface)_0%,var(--surface-elevated)_100%)] shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-3 border-b border-border px-5 py-4 sm:px-6">
                <span className="inline-flex size-9 items-center justify-center rounded-xl border border-border bg-background">
                  <Languages className="size-4 text-foreground" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-mono text-[0.65rem] tracking-[0.16em] text-accent uppercase">
                    06
                  </p>
                  <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em] text-foreground">
                    {t("languagesTitle")}
                  </h3>
                </div>
              </div>
              <ul className="divide-y divide-border">
                {languages.map((code) => {
                  const [name, level] = t(`languages.${code}`)
                    .split("—")
                    .map((part) => part.trim());
                  const score = languageScores[code];
                  return (
                    <li
                      key={code}
                      className="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-6"
                    >
                      <div className="min-w-0">
                        <p className="text-[0.95rem] font-medium text-foreground">
                          {name}
                        </p>
                        <p className="mt-0.5 text-[0.78rem] text-muted">{level}</p>
                      </div>
                      <div
                        className="flex shrink-0 items-center gap-1"
                        aria-label={`${score} / 5`}
                      >
                        {Array.from({ length: 5 }).map((_, dot) => (
                          <span
                            key={dot}
                            className={cn(
                              "size-1.5 rounded-full",
                              dot < score ? "bg-accent" : "bg-border",
                            )}
                          />
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="h-full overflow-hidden rounded-[24px] border border-border bg-[linear-gradient(180deg,var(--surface)_0%,var(--surface-elevated)_100%)] shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-3 border-b border-border px-5 py-4 sm:px-6">
                <span className="inline-flex size-9 items-center justify-center rounded-xl border border-border bg-background">
                  <GraduationCap className="size-4 text-foreground" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-mono text-[0.65rem] tracking-[0.16em] text-accent uppercase">
                    NURE
                  </p>
                  <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em] text-foreground">
                    {t("educationTitle")}
                  </h3>
                </div>
              </div>
              <ul className="divide-y divide-border">
                {education.map((item, index) => (
                  <li key={item} className="px-5 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-start gap-3">
                      <p className="mt-0.5 font-mono text-[0.65rem] tracking-[0.14em] text-accent uppercase">
                        0{index + 1}
                      </p>
                      <div className="min-w-0">
                        <p className="text-[0.98rem] font-semibold tracking-[-0.02em] text-foreground">
                          {t(`education.${item}.degree`)}
                        </p>
                        <p className="mt-1 text-[0.88rem] leading-snug text-foreground/85">
                          {t(`education.${item}.school`)}
                        </p>
                        <p className="mt-1 font-mono text-[0.72rem] text-muted">
                          {t(`education.${item}.meta`)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
