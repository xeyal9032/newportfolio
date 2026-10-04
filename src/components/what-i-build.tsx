import { getTranslations } from "next-intl/server";
import { Reveal } from "./reveal";

const items = [
  {
    key: "web",
    tech: "React · Next.js · TypeScript",
    visual:
      "radial-gradient(circle at 20% 20%, rgba(142,196,214,0.28), transparent 45%), linear-gradient(145deg, #14181e, #0b0d10)",
  },
  {
    key: "ai",
    tech: "LLMs · OpenAI · Workflows",
    visual:
      "radial-gradient(circle at 80% 30%, rgba(255,255,255,0.12), transparent 40%), linear-gradient(160deg, #171b21, #0c0e12)",
  },
  {
    key: "automation",
    tech: "Python · APIs · Ops",
    visual:
      "radial-gradient(circle at 30% 80%, rgba(142,196,214,0.18), transparent 40%), linear-gradient(180deg, #151920, #0a0c10)",
  },
  {
    key: "digital",
    tech: "Cloud · Product · Delivery",
    visual:
      "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.08), transparent 45%), linear-gradient(135deg, #12161c, #090b0e)",
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

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.key} delay={index * 0.05}>
              <article className="group overflow-hidden rounded-[26px] border border-border bg-surface shadow-[var(--shadow-soft)] transition duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow)]">
                <div
                  className="relative h-40 md:h-48"
                  style={{ background: item.visual }}
                  aria-hidden
                >
                  <div className="absolute inset-0 opacity-40 mix-blend-overlay [background-image:linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.08)_50%,transparent_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[0.72rem] tracking-[0.2em] text-white/55">
                      0{index + 1}
                    </p>
                  </div>
                </div>
                <div className="p-7 md:p-8">
                  <h3 className="text-[1.7rem] tracking-[-0.03em] text-foreground">
                    {t(`items.${item.key}.title`)}
                  </h3>
                  <p className="mt-3 max-w-md text-[1rem] leading-relaxed text-muted">
                    {t(`items.${item.key}.description`)}
                  </p>
                  <div className="divider-line mt-8" />
                  <p className="mt-4 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                    {item.tech}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
