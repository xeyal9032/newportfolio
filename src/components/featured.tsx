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
          <h2 id="featured-heading" className="headline mt-4 max-w-[12ch]">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-3xl text-[clamp(1.25rem,2.4vw,1.85rem)] leading-snug tracking-[-0.02em] text-muted">
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 overflow-hidden rounded-[28px] border border-border bg-surface shadow-[var(--shadow)]">
            <div className="relative aspect-[16/10] w-full md:aspect-[21/9]">
              <Image
                src="/images/govmate-product.jpg"
                alt={t("imageAlt")}
                fill
                sizes="(max-width: 1180px) 100vw, 1180px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(7,8,9,0.78)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                <p className="text-sm tracking-[0.16em] text-white/60 uppercase">
                  govmateai.com
                </p>
                <p className="mt-2 max-w-2xl text-xl text-white md:text-2xl">
                  {t("visualCaption")}
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="border-b border-border p-8 md:p-12 lg:border-r lg:border-b-0">
                <p className="text-[1.05rem] leading-relaxed text-muted md:text-lg">
                  {t("body")}
                </p>
                <ul className="mt-10 space-y-4">
                  {points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-[1rem] leading-relaxed text-foreground"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a
                    href={featuredProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    {t("viewProject")}
                  </a>
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    {t("github")}
                  </a>
                </div>
              </div>

              <div className="grid gap-4 p-8 md:grid-cols-2 md:p-10">
                {featuredProject.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="rounded-2xl border border-border bg-surface-elevated px-5 py-6"
                  >
                    <p className="text-xs tracking-[0.14em] text-muted uppercase">
                      Stack
                    </p>
                    <p className="mt-3 text-lg tracking-[-0.02em]">{tech}</p>
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
