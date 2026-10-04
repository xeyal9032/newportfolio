import { getTranslations } from "next-intl/server";
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Clock3,
  GitBranch,
  Mail,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { Reveal } from "./reveal";

const focusKeys = ["product", "ai", "automation", "platforms"] as const;
const processKeys = ["brief", "build", "ship"] as const;

export async function Contact() {
  const t = await getTranslations("contact");

  const channels = [
    {
      id: "email",
      href: `mailto:${siteConfig.email}`,
      label: t("channels.email.label"),
      value: siteConfig.email,
      hint: t("channels.email.hint"),
      icon: Mail,
      external: false,
    },
    {
      id: "linkedin",
      href: siteConfig.linkedinUrl,
      label: t("channels.linkedin.label"),
      value: t("channels.linkedin.value"),
      hint: t("channels.linkedin.hint"),
      icon: Briefcase,
      external: true,
    },
    {
      id: "github",
      href: siteConfig.githubUrl,
      label: t("channels.github.label"),
      value: `@${siteConfig.githubUsername}`,
      hint: t("channels.github.hint"),
      icon: GitBranch,
      external: true,
    },
    {
      id: "org",
      href: siteConfig.githubOrgUrl,
      label: t("channels.org.label"),
      value: siteConfig.githubOrg,
      hint: t("channels.org.hint"),
      icon: Building2,
      external: true,
    },
  ] as const;

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 max-w-3xl">
              <p className="eyebrow">{t("eyebrow")}</p>
              <h2
                id="contact-heading"
                className="headline mt-4 max-w-[18ch]"
              >
                {t("title")}
              </h2>
              <p className="lead mt-5">{t("subtitle")}</p>
            </div>
            <div className="inline-flex w-fit max-w-full items-center rounded-full border border-border bg-surface px-4 py-2 text-sm leading-snug text-muted">
              <span className="mr-2 inline-block size-2 shrink-0 rounded-full bg-[color-mix(in_oklab,#5f9f7a_85%,transparent)]" />
              <span className="min-w-0">{t("availability")}</span>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="min-w-0 space-y-10">
            <Reveal delay={0.03}>
              <div className="space-y-5 text-[1.05rem] leading-relaxed text-muted md:text-[1.12rem]">
                <p className="text-[1.12rem] font-medium leading-relaxed text-foreground md:text-[1.28rem]">
                  {t("intro")}
                </p>
                <p>{t("body")}</p>
                <p>{t("cta")}</p>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="border-t border-border pt-4">
                  <div className="flex items-center gap-2 text-muted">
                    <Clock3 className="size-4" aria-hidden />
                    <p className="text-[0.72rem] tracking-[0.14em] uppercase">
                      {t("meta.responseLabel")}
                    </p>
                  </div>
                  <p className="mt-2 text-[1.05rem] font-medium text-foreground">
                    {t("meta.responseValue")}
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex items-center gap-2 text-muted">
                    <MapPin className="size-4" aria-hidden />
                    <p className="text-[0.72rem] tracking-[0.14em] uppercase">
                      {t("meta.locationLabel")}
                    </p>
                  </div>
                  <p className="mt-2 text-[1.05rem] font-medium text-foreground">
                    {t("meta.locationValue")}
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex items-center gap-2 text-muted">
                    <MessageSquare className="size-4" aria-hidden />
                    <p className="text-[0.72rem] tracking-[0.14em] uppercase">
                      {t("meta.languagesLabel")}
                    </p>
                  </div>
                  <p className="mt-2 text-[1.05rem] font-medium text-foreground">
                    {t("meta.languagesValue")}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div>
                <p className="eyebrow">{t("focusTitle")}</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {focusKeys.map((key) => (
                    <li
                      key={key}
                      className="border-l-2 border-[color-mix(in_oklab,var(--accent)_55%,var(--border))] pl-4"
                    >
                      <p className="font-medium text-foreground">
                        {t(`focus.${key}.title`)}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {t(`focus.${key}.body`)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="btn btn-primary w-full sm:w-auto"
                >
                  <Mail className="size-4" aria-hidden />
                  {t("email")}
                </a>
                <a
                  href={siteConfig.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full sm:w-auto"
                >
                  {t("linkedin")}
                </a>
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full sm:w-auto"
                >
                  {t("github")}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <div className="min-w-0 overflow-hidden rounded-[22px] border border-border bg-[linear-gradient(165deg,var(--surface)_0%,var(--surface-elevated)_100%)] shadow-[var(--shadow-soft)] sm:rounded-[28px]">
              <div className="border-b border-border px-5 py-5 sm:px-6 sm:py-6 md:px-8">
                <p className="eyebrow">{t("channelsTitle")}</p>
                <p className="mt-3 text-[1.02rem] leading-relaxed text-muted sm:text-[1.05rem]">
                  {t("channelsSubtitle")}
                </p>
              </div>

              <ul className="divide-y divide-border">
                {channels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <li key={channel.id}>
                      <a
                        href={channel.href}
                        target={channel.external ? "_blank" : undefined}
                        rel={
                          channel.external ? "noopener noreferrer" : undefined
                        }
                        className="group flex items-start gap-3 px-5 py-4 transition hover:bg-[color-mix(in_oklab,var(--foreground)_3.5%,transparent)] sm:gap-4 sm:px-6 sm:py-5 md:px-8"
                      >
                        <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground">
                          <Icon className="size-4" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-3">
                            <span className="text-[0.72rem] tracking-[0.14em] text-muted uppercase">
                              {channel.label}
                            </span>
                            <ArrowUpRight
                              className="size-4 shrink-0 text-muted transition group-hover:text-foreground"
                              aria-hidden
                            />
                          </span>
                          <span className="mt-1 block break-all text-[1rem] font-medium text-foreground sm:truncate sm:text-[1.05rem]">
                            {channel.value}
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-muted">
                            {channel.hint}
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="border-t border-border px-6 py-6 md:px-8">
                <p className="eyebrow">{t("processTitle")}</p>
                <ol className="mt-5 space-y-4">
                  {processKeys.map((key, index) => (
                    <li key={key} className="flex gap-4">
                      <span className="mt-0.5 text-[0.75rem] font-semibold tracking-[0.12em] text-muted">
                        0{index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">
                          {t(`process.${key}.title`)}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {t(`process.${key}.body`)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
