"use client";

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
    if (filter === "all") return projects;
    return projects.filter((project) => project.category === filter);
  }, [filter]);

  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="container-page">
        <Reveal>
          <h2 id="projects-heading" className="headline">
            {t("title")}
          </h2>
          <p className="lead mt-4">{t("subtitle")}</p>
        </Reveal>

        <div
          className="mt-10 flex flex-wrap gap-2"
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
                "rounded-full border px-4 py-2 text-sm transition",
                filter === item
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:text-foreground",
              )}
            >
              {t(`filters.${item}`)}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {visible.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.03}>
              <article className="surface flex h-full flex-col p-7 transition duration-300 hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs tracking-[0.14em] text-muted uppercase">
                      {t(`filters.${project.category as ProjectCategory}`)}
                    </p>
                    <h3 className="mt-3 text-2xl tracking-[-0.03em]">
                      {project.name}
                    </h3>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-muted">
                  {t(project.descriptionKey)}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    {t("viewGithub")}
                  </a>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-accent underline-offset-4 hover:underline"
                    >
                      {t("viewLive")}
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
