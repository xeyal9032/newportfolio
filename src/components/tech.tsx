import { getTranslations } from "next-intl/server";
import { techEcosystem } from "@/data/projects";
import { Reveal } from "./reveal";

export async function Tech() {
  const t = await getTranslations("tech");

  return (
    <section className="section" aria-labelledby="tech-heading">
      <div className="container-page">
        <Reveal>
          <h2 id="tech-heading" className="headline">
            {t("title")}
          </h2>
          <p className="lead mt-4">{t("subtitle")}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techEcosystem.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.04}>
              <div className="surface h-full p-6">
                <p className="text-sm text-muted">{t(`groups.${group.id}`)}</p>
                <ul className="mt-5 space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-lg tracking-[-0.02em] text-foreground"
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
    </section>
  );
}
