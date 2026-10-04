import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/site";
import { Reveal } from "./reveal";

export async function Contact() {
  const t = await getTranslations("contact");

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container-page">
        <Reveal>
          <div className="overflow-hidden rounded-[32px] border border-border bg-[radial-gradient(circle_at_20%_10%,var(--accent-soft),transparent_40%),linear-gradient(180deg,var(--surface),var(--background))] px-8 py-16 shadow-[var(--shadow)] md:px-16 md:py-24">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2
              id="contact-heading"
              className="mt-5 max-w-[11ch] text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.05em]"
            >
              {t("title")}
            </h2>
            <p className="mt-7 max-w-2xl text-xl text-muted md:text-2xl">
              {t("subtitle")}
            </p>
            <p className="mt-3 text-xl text-foreground md:text-2xl">{t("cta")}</p>
            <div className="mt-12 flex flex-wrap gap-3">
              <a href={`mailto:${siteConfig.email}`} className="btn btn-primary">
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
