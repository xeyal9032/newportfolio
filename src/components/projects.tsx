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

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {visible.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.03}>
              <article className="group overflow-hidden rounded-[26px] border border-border bg-surface shadow-[var(--shadow-soft)] transition duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 560px"
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(7,8,9,0.7)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[0.7rem] tracking-[0.16em] text-white/65 uppercase">
                      {t(`filters.${project.category as ProjectCategory}`)}
                    </p>
                    <h3 className="mt-2 text-2xl tracking-[-0.03em] text-white">
                      {project.name}
                    </h3>
                  </div>
                </div>
                <div className="p-7">
                  <p className="text-[1rem] leading-relaxed text-muted">
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
                  <div className="mt-7 flex flex-wrap gap-4">
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
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
