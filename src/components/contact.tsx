import { getTranslations } from "next-intl/server";
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import {
  GitHubIcon,
  GmailIcon,
  GovMateIcon,
  LinkedInIcon,
} from "./brand-icons";
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
      action: t("channels.email.action"),
      icon: GmailIcon,
      iconClass: "size-5 text-white",
      external: false,
      primary: true,
    },
    {
      id: "linkedin",
      href: siteConfig.linkedinUrl,
      label: t("channels.linkedin.label"),
      value: t("channels.linkedin.value"),
      hint: t("channels.linkedin.hint"),
      action: t("channels.linkedin.action"),
      icon: LinkedInIcon,
      iconClass: "size-5 text-[#0A66C2]",
      external: true,
      primary: false,
    },
    {
      id: "github",
      href: siteConfig.githubUrl,
      label: t("channels.github.label"),
      value: `@${siteConfig.githubUsername}`,
      hint: t("channels.github.hint"),
      action: t("channels.github.action"),
      icon: GitHubIcon,
      iconClass: "size-5 text-foreground",
      external: true,
      primary: false,
    },
    {
      id: "org",
      href: siteConfig.githubOrgUrl,
      label: t("channels.org.label"),
      value: siteConfig.githubOrg,
      hint: t("channels.org.hint"),
      action: t("channels.org.action"),
      icon: GovMateIcon,
      iconClass: "size-5 text-foreground",
      external: true,
      primary: false,
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

          <div className="min-w-0 space-y-6">
            <Reveal delay={0.05}>
              <div>
                <p className="eyebrow">{t("channelsTitle")}</p>
                <p className="mt-3 max-w-xl text-[1.02rem] leading-relaxed text-muted">
                  {t("channelsSubtitle")}
                </p>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
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
                          aria-label={`${channel.action}: ${channel.value}`}
                          className={
                            channel.primary
                              ? "group flex h-full flex-col rounded-[22px] border border-foreground bg-foreground p-5 text-background shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow)] sm:p-5"
                              : "group flex h-full flex-col rounded-[22px] border border-border bg-surface p-5 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-foreground/25 hover:shadow-[var(--shadow)] sm:p-5"
                          }
                        >
                          <span className="flex items-start justify-between gap-3">
                            <span
                              className={
                                channel.primary
                                  ? "inline-flex size-11 items-center justify-center rounded-2xl border border-background/20 bg-background/10"
                                  : "inline-flex size-11 items-center justify-center rounded-2xl border border-border bg-background"
                              }
                            >
                              <Icon className={channel.iconClass} />
                            </span>
                            <ArrowUpRight
                              className={
                                channel.primary
                                  ? "size-4 shrink-0 text-background/70 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-background"
                                  : "size-4 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                              }
                              aria-hidden
                            />
                          </span>

                          <span
                            className={
                              channel.primary
                                ? "mt-4 text-[0.68rem] font-semibold tracking-[0.16em] text-background/60 uppercase"
                                : "mt-4 text-[0.68rem] font-semibold tracking-[0.16em] text-muted uppercase"
                            }
                          >
                            {channel.label}
                          </span>
                          <span
                            className={
                              channel.primary
                                ? "mt-1.5 break-all text-[1.02rem] font-semibold tracking-[-0.02em] text-background"
                                : "mt-1.5 break-all text-[1.02rem] font-semibold tracking-[-0.02em] text-foreground"
                            }
                          >
                            {channel.value}
                          </span>
                          <span
                            className={
                              channel.primary
                                ? "mt-2 flex-1 text-[0.84rem] leading-relaxed text-background/70"
                                : "mt-2 flex-1 text-[0.84rem] leading-relaxed text-muted"
                            }
                          >
                            {channel.hint}
                          </span>

                          <span
                            className={
                              channel.primary
                                ? "mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-background px-3 py-1.5 text-[0.78rem] font-semibold text-foreground"
                                : "mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-[0.78rem] font-semibold text-foreground transition group-hover:border-foreground/30"
                            }
                          >
                            {channel.action}
                            <ArrowUpRight className="size-3.5" aria-hidden />
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[22px] border border-border bg-surface p-5 shadow-[var(--shadow-soft)] sm:p-6">
                <p className="eyebrow">{t("processTitle")}</p>
                <ol className="mt-5 space-y-4">
                  {processKeys.map((key, index) => (
                    <li key={key} className="flex gap-4">
                      <span className="mt-0.5 font-mono text-[0.72rem] font-semibold tracking-[0.12em] text-accent">
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
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
