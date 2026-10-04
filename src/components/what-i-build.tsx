import { getTranslations } from "next-intl/server";
import { Reveal } from "./reveal";

const items = [
  { key: "web", tech: "React · Next.js · TypeScript" },
  { key: "ai", tech: "LLMs · OpenAI · Workflows" },
  { key: "automation", tech: "Python · APIs · Ops" },
  { key: "digital", tech: "Cloud · Product · Delivery" },
] as const;

export async function WhatIBuild() {
  const t = await getTranslations("whatIBuild");

  return (
    <section id="work" className="section" aria-labelledby="what-heading">
      <div className="container-page">
        <Reveal>
          <h2 id="what-heading" className="headline max-w-[12ch]">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.key} delay={index * 0.05}>
              <article className="surface group h-full p-7 transition duration-300 hover:-translate-y-0.5">
                <p className="text-sm tracking-[0.18em] text-muted">
                  0{index + 1}
                </p>
                <h3 className="mt-5 text-2xl tracking-[-0.03em]">
                  {t(`items.${item.key}.title`)}
                </h3>
                <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-muted">
                  {t(`items.${item.key}.description`)}
                </p>
                <div className="mt-8 h-px w-full bg-border" />
                <p className="mt-4 text-xs tracking-[0.12em] text-accent uppercase">
                  {item.tech}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
