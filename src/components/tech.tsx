import {
  Boxes,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layout,
  PenTool,
  Server,
  Sparkles,
  Terminal,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { techEcosystem } from "@/data/projects";
import { Reveal } from "./reveal";

const groupIcons: Record<(typeof techEcosystem)[number]["id"], LucideIcon> = {
  frontend: Layout,
  backend: Server,
  data: Database,
  ai: BrainCircuit,
  cloud: Cloud,
  tools: Wrench,
};

const itemIcons: Record<string, LucideIcon> = {
  React: Code2,
  "Next.js": Boxes,
  TypeScript: Terminal,
  "Tailwind CSS": Sparkles,
  "Node.js": Server,
  "REST APIs": Code2,
  Prisma: Database,
  PostgreSQL: Database,
  Supabase: Database,
  SQL: Database,
  OpenAI: BrainCircuit,
  LLMs: Sparkles,
  "AI workflows": BrainCircuit,
  Vercel: Cloud,
  Netlify: Cloud,
  Git: GitBranch,
  GitHub: GitBranch,
  Cursor: Terminal,
  Figma: PenTool,
};

export async function Tech() {
  const t = await getTranslations("tech");

  return (
    <section className="section" aria-labelledby="tech-heading">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Stack</p>
          <h2 id="tech-heading" className="headline mt-4 max-w-[14ch]">
            {t("title")}
          </h2>
          <p className="lead mt-5">{t("subtitle")}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {techEcosystem.map((group, index) => {
            const Icon = groupIcons[group.id];

            return (
              <Reveal key={group.id} delay={index * 0.04}>
                <article className="group relative h-full overflow-hidden rounded-[28px] border border-border bg-surface p-7 shadow-[var(--shadow-soft)] transition duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow)] md:p-8">
                  <div
                    className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full opacity-30 blur-3xl transition duration-500 group-hover:opacity-50"
                    style={{ background: group.accent }}
                    aria-hidden
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
                        0{index + 1}
                      </p>
                      <h3 className="mt-3 text-2xl tracking-[-0.03em] text-foreground">
                        {t(`groups.${group.id}`)}
                      </h3>
                      <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-muted">
                        {t(`descriptions.${group.id}`)}
                      </p>
                    </div>
                    <div
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border"
                      style={{
                        background: `color-mix(in oklab, ${group.accent} 18%, transparent)`,
                      }}
                    >
                      <Icon
                        className="h-5 w-5 text-foreground"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </div>
                  </div>

                  <ul className="relative mt-7 flex flex-wrap gap-2.5">
                    {group.items.map((item) => {
                      const ItemIcon = itemIcons[item] ?? Code2;
                      return (
                        <li
                          key={item}
                          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3.5 py-2 text-sm font-medium text-foreground transition group-hover:border-foreground/20"
                        >
                          <ItemIcon
                            className="h-3.5 w-3.5 text-muted"
                            strokeWidth={1.8}
                            aria-hidden
                          />
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
