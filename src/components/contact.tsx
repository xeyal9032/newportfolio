import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/site";
import { Reveal } from "./reveal";

export async function Contact() {
  const t = await getTranslations("contact");

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container-page">
        <Reveal>
          <h2 id="contact-heading" className="display max-w-[12ch]">
            {t("title")}
          </h2>
          <p className="mt-6 text-xl text-muted md:text-2xl">{t("subtitle")}</p>
          <p className="mt-3 text-xl text-foreground md:text-2xl">{t("cta")}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="btn btn-primary"
            >
              {t("email")}
            </a>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {t("github")}
            </a>
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {t("linkedin")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
