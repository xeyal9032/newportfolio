"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { projects, type ProjectCategory } from "@/data/projects";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

const filters = ["all", "ai", "web", "automation", "tools"] as const;

export function Projects() {
  const t = useTranslations("projects");
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");

  const visible = useMemo(() => {
    if (filter === "all") return projects.filter((p) => !p.featured);
    return projects.filter(
      (project) => project.category === filter && !project.featured,
    );
  }, [filter]);

  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 id="projects-heading" className="headline mt-4">
            {t("title")}
          </h2>
          <p className="lead mt-5">{t("subtitle")}</p>
        </Reveal>

        <div
          className="mt-8 flex flex-wrap gap-2 sm:mt-10"
          role="tablist"
          aria-label="Project filters"
        >
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              onClick={() => setFilter(item)}
              className={cn(
                "rounded-full border px-3.5 py-2 text-sm transition sm:px-4",
                filter === item
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-surface text-foreground/80 hover:text-foreground",
              )}
            >
              {t(`filters.${item}`)}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
          {visible.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.03}>
              <article className="group overflow-hidden rounded-[18px] border border-border bg-surface shadow-[var(--shadow-soft)] transition duration-500 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)] sm:rounded-[20px]">
                <div className="relative aspect-[16/11] overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 360px"
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(7,8,9,0.75)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5">
                    <p className="text-[0.62rem] tracking-[0.14em] text-white/65 uppercase">
                      {t(`filters.${project.category as ProjectCategory}`)}
                    </p>
                    <h3 className="mt-1 text-[1.05rem] font-semibold tracking-[-0.03em] text-white sm:text-[1.12rem]">
                      {project.name}
                    </h3>
                  </div>
                </div>
                <div className="p-3.5 sm:p-4">
                  <p className="line-clamp-2 text-[0.82rem] leading-relaxed text-muted">
                    {t(project.descriptionKey)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border px-2 py-0.5 text-[0.68rem] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3.5 flex flex-wrap items-center gap-3">
                    {project.isPrivate ? (
                      <span className="rounded-full border border-border px-2 py-0.5 text-[0.65rem] tracking-[0.08em] text-muted uppercase">
                        {t("private")}
                      </span>
                    ) : (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.78rem] font-medium text-foreground underline-offset-4 hover:underline"
                      >
                        {t("viewGithub")}
                      </a>
                    )}
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.78rem] font-medium text-accent underline-offset-4 hover:underline"
                      >
                        {t("viewLive")}
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
