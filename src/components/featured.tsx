import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { featuredProject } from "@/data/projects";
import { Reveal } from "./reveal";

export async function Featured() {
  const t = await getTranslations("featured");

  const points = [
    t("points.interface"),
    t("points.multilingual"),
    t("points.workflow"),
    t("points.stack"),
  ];

  return (
    <section className="section" aria-labelledby="featured-heading">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 id="featured-heading" className="headline mt-4 max-w-[16ch]">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-3xl text-[clamp(1.1rem,2.4vw,1.85rem)] leading-snug tracking-[-0.02em] text-muted">
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 overflow-hidden rounded-[22px] border border-border bg-surface shadow-[var(--shadow)] sm:mt-12 sm:rounded-[28px]">
            <div className="relative aspect-[16/11] w-full overflow-hidden sm:aspect-[16/10] md:aspect-[21/9]">
              <Image
                src="/images/govmate-product.jpg"
                alt={t("imageAlt")}
                fill
                sizes="(max-width: 1180px) 100vw, 1180px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(7,8,9,0.78)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-10">
                <p className="text-xs tracking-[0.16em] text-white/60 uppercase sm:text-sm">
                  govmateai.com
                </p>
                <p className="mt-2 max-w-2xl text-[1.05rem] leading-snug text-white sm:text-xl md:text-2xl">
                  {t("visualCaption")}
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="border-b border-border p-5 sm:p-8 md:p-12 lg:border-r lg:border-b-0">
                <p className="text-[1.02rem] leading-relaxed text-muted md:text-lg">
                  {t("body")}
                </p>
                <ul className="mt-8 space-y-4 sm:mt-10">
                  {points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-[0.98rem] leading-relaxed text-foreground sm:text-[1rem]"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden
                      />
                      <span className="min-w-0">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
                  <a
                    href={featuredProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    {t("viewProject")}
                  </a>
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary w-full sm:w-auto"
                  >
                    {t("github")}
                  </a>
                </div>
              </div>

              <div className="grid gap-3 p-5 sm:gap-4 sm:p-8 md:grid-cols-2 md:p-10">
                {featuredProject.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="rounded-2xl border border-border bg-surface-elevated px-4 py-5 sm:px-5 sm:py-6"
                  >
                    <p className="text-xs tracking-[0.14em] text-muted uppercase">
                      Stack
                    </p>
                    <p className="mt-2 text-base tracking-[-0.02em] sm:mt-3 sm:text-lg">
                      {tech}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
