import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/site";
import { FooterTerminal } from "./footer-terminal";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container-page py-10 md:py-12">
        <div className="grid items-stretch gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div className="flex min-w-0 flex-col justify-between gap-8">
            <div>
              <p className="text-lg tracking-[-0.02em] text-foreground">
                {siteConfig.name}
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                {t("tagline")}
              </p>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
                {t("terminalNote")}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted">
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
                  className="break-all hover:text-foreground"
                >
                  Email
                </a>
              </div>
              <p className="text-sm text-muted">{t("rights", { year })}</p>
            </div>
          </div>

          <FooterTerminal />
        </div>
      </div>
    </footer>
  );
}
