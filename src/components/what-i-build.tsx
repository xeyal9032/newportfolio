import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal } from "./reveal";

const items = [
  {
    key: "web",
    tech: "React · Next.js · TypeScript",
    image: "/images/card-web.jpg",
  },
  {
    key: "ai",
    tech: "LLMs · OpenAI · Workflows",
    image: "/images/card-ai.jpg",
  },
  {
    key: "automation",
    tech: "Python · APIs · Ops",
    image: "/images/card-automation.jpg",
  },
  {
    key: "digital",
    tech: "Cloud · Product · Delivery",
    image: "/images/card-cloud.jpg",
  },
] as const;

export async function WhatIBuild() {
  const t = await getTranslations("whatIBuild");

  return (
    <section id="work" className="section" aria-labelledby="what-heading">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 id="what-heading" className="headline mt-4 max-w-[14ch]">
            {t("title")}
          </h2>
          <p className="lead mt-5">{t("subtitle")}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.key} delay={index * 0.05}>
              <article className="group overflow-hidden rounded-[28px] border border-border bg-surface shadow-[var(--shadow-soft)] transition duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={t(`items.${item.key}.title`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,9,0.08)_0%,rgba(7,8,9,0.35)_45%,rgba(7,8,9,0.82)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
                    <div>
                      <p className="text-[0.72rem] font-semibold tracking-[0.2em] text-white/70">
                        0{index + 1}
                      </p>
                      <h3 className="mt-2 text-[1.55rem] font-semibold tracking-[-0.03em] text-white md:text-[1.75rem]">
                        {t(`items.${item.key}.title`)}
                      </h3>
                    </div>
                    <span className="hidden rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.12em] text-white backdrop-blur sm:inline-flex">
                      {item.tech.split(" · ")[0]}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-7">
                  <p className="text-[1.02rem] leading-relaxed text-muted">
                    {t(`items.${item.key}.description`)}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.tech.split(" · ").map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs font-semibold tracking-[0.06em] text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
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
