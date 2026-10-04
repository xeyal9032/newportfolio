import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/site";
import { Reveal } from "./reveal";

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
                  {t("ctaEmail")}
                </a>
                <a
                  href={siteConfig.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full sm:w-auto"
                >
                  {t("ctaLinkedin")}
                </a>
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full sm:w-auto"
                >
                  {t("ctaGithub")}
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-14">
          <Reveal>
            <h3 className="text-2xl tracking-[-0.03em] text-foreground md:text-3xl">
              {t("principlesTitle")}
            </h3>
            <p className="mt-3 max-w-2xl text-[1.02rem] text-muted">
              {t("principlesSubtitle")}
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {principles.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
                <article className="surface h-full p-7">
                  <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
                    0{index + 1}
                  </p>
                  <h4 className="mt-4 text-xl tracking-[-0.02em] text-foreground">
                    {t(`principles.${item}.title`)}
                  </h4>
                  <p className="mt-3 text-[1rem] leading-relaxed text-muted">
                    {t(`principles.${item}.body`)}
                  </p>
                </article>
              </Reveal>
            ))}
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
            <div className="surface h-full p-7 md:p-8">
              <p className="eyebrow">{t("languagesTitle")}</p>
              <ul className="mt-6 space-y-3">
                {languages.map((code) => (
                  <li
                    key={code}
                    className="flex flex-col gap-1 border-b border-border pb-3 text-[1rem] last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <span className="font-medium text-foreground">
                      {t(`languages.${code}`).split("—")[0].trim()}
                    </span>
                    <span className="text-sm text-muted">
                      {t(`languages.${code}`).split("—")[1]?.trim()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="surface h-full p-7 md:p-8">
              <p className="eyebrow">{t("educationTitle")}</p>
              <ul className="mt-6 space-y-5">
                {education.map((item) => (
                  <li key={item} className="border-b border-border pb-5 last:border-b-0 last:pb-0">
                    <p className="text-[1.05rem] font-medium leading-relaxed text-foreground">
                      {t(`education.${item}`)}
                    </p>
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
