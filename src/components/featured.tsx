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
          <h2 id="featured-heading" className="headline mt-4">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-xl tracking-[-0.02em] text-muted md:text-2xl">
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="surface mt-12 overflow-hidden">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="border-b border-border p-8 md:p-12 lg:border-b-0 lg:border-r">
                <p className="lead !max-w-xl">{t("body")}</p>
                <ul className="mt-10 space-y-4">
                  {points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-[0.98rem] leading-relaxed text-foreground/90"
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

              <div
                className="relative min-h-[320px] bg-[linear-gradient(160deg,var(--accent-soft),transparent_40%),linear-gradient(180deg,var(--surface-elevated),var(--background))] p-8 md:p-10"
                aria-hidden
              >
                <div className="mx-auto flex h-full max-w-sm flex-col justify-center gap-4">
                  <div className="rounded-2xl border border-border bg-background/70 p-5 shadow-[var(--shadow)] backdrop-blur">
                    <p className="text-xs tracking-[0.16em] text-muted uppercase">
                      Document analysis
                    </p>
                    <p className="mt-3 text-lg tracking-[-0.02em]">
                      Official letter understood
                    </p>
                    <div className="mt-5 space-y-2">
                      <div className="h-2 rounded-full bg-accent-soft" />
                      <div className="h-2 w-4/5 rounded-full bg-border" />
                      <div className="h-2 w-2/3 rounded-full bg-border" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-border bg-background/60 p-4">
                      <p className="text-xs text-muted">Languages</p>
                      <p className="mt-2 text-sm font-medium">TR · DE · EN · AZ</p>
                    </div>
                    <div className="rounded-2xl border border-border bg-background/60 p-4">
                      <p className="text-xs text-muted">Deadline</p>
                      <p className="mt-2 text-sm font-medium">Tracked</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-muted">
                    {featuredProject.technologies.slice(0, 4).join(" · ")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
