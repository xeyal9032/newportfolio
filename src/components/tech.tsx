import { getTranslations } from "next-intl/server";
import { techEcosystem } from "@/data/projects";
import { Reveal } from "./reveal";

export async function Tech() {
  const t = await getTranslations("tech");

  return (
    <section className="section" aria-labelledby="tech-heading">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Stack</p>
          <h2 id="tech-heading" className="headline mt-4">
            {t("title")}
          </h2>
          <p className="lead mt-5">{t("subtitle")}</p>
        </Reveal>

        <div className="mt-14 overflow-hidden rounded-[28px] border border-border bg-surface shadow-[var(--shadow-soft)]">
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {techEcosystem.map((group, index) => (
              <Reveal key={group.id} delay={index * 0.03}>
                <div
                  className={cnBorder(index)}
                >
                  <p className="text-sm text-muted">{t(`groups.${group.id}`)}</p>
                  <ul className="mt-5 space-y-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-[1.15rem] tracking-[-0.02em] text-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function cnBorder(index: number) {
  const base = "h-full p-7 md:p-8";
  const borders = [
    "border-b border-border lg:border-r",
    "border-b border-border lg:border-r",
    "border-b border-border",
    "border-b border-border md:border-b-0 lg:border-r lg:border-b-0",
    "border-b border-border md:border-b-0 lg:border-r lg:border-b-0",
    "",
  ];
  return `${base} ${borders[index] ?? ""}`;
}
