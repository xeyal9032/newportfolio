import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal } from "./reveal";

export async function About() {
  const t = await getTranslations("about");

  const languages = ["az", "tr", "ru", "uk", "de", "en"] as const;
  const education = ["master", "bachelor", "cert"] as const;

  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container-page">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="media-frame relative aspect-[4/5] max-w-md lg:max-w-none">
              <Image
                src="/images/portrait.jpg"
                alt={t("portraitAlt")}
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(7,8,9,0.55)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-sm tracking-[0.16em] text-white/70 uppercase">
                  Khayal Jamilli
                </p>
                <p className="mt-1 text-white/90">{t("role")}</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow">{t("eyebrow")}</p>
              <h2 id="about-heading" className="headline mt-4 max-w-[14ch]">
                {t("title")}
              </h2>
              <div className="mt-8 space-y-5 text-[1.08rem] leading-relaxed text-muted md:text-lg">
                <p className="text-foreground">{t("p1")}</p>
                <p>{t("p2")}</p>
                <p>{t("p3")}</p>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <Reveal delay={0.05}>
                <div className="surface h-full p-7">
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
                <div className="surface h-full p-7">
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
        </div>
      </div>
    </section>
  );
}
