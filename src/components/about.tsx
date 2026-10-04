import { getTranslations } from "next-intl/server";
import { Reveal } from "./reveal";

export async function About() {
  const t = await getTranslations("about");

  const languages = ["az", "tr", "ru", "uk", "de", "en"] as const;
  const education = ["master", "bachelor", "cert"] as const;

  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <h2 id="about-heading" className="headline max-w-[14ch]">
            {t("title")}
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
            <p className="text-foreground">{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </div>
        </Reveal>

        <div className="space-y-4">
          <Reveal delay={0.05}>
            <div className="surface p-7">
              <p className="eyebrow">{t("languagesTitle")}</p>
              <ul className="mt-5 space-y-3">
                {languages.map((code) => (
                  <li key={code} className="text-[0.98rem] text-foreground">
                    {t(`languages.${code}`)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="surface p-7">
              <p className="eyebrow">{t("educationTitle")}</p>
              <ul className="mt-5 space-y-4">
                {education.map((item) => (
                  <li
                    key={item}
                    className="text-[0.98rem] leading-relaxed text-foreground"
                  >
                    {t(`education.${item}`)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
