import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/site";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <div className="container-page flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-lg tracking-[-0.02em]">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-muted">{t("tagline")}</p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-muted">
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:text-foreground"
          >
            Email
          </a>
        </div>
        <p className="text-sm text-muted">{t("rights", { year })}</p>
      </div>
    </footer>
  );
}
