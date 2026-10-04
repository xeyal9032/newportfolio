import { getLocale, getTranslations } from "next-intl/server";
import { getGithubProfile, getGithubRepos } from "@/lib/github";
import { siteConfig } from "@/data/site";
import { formatDate } from "@/lib/utils";
import { Reveal } from "./reveal";

export async function GithubSection() {
  const t = await getTranslations("github");
  const locale = await getLocale();
  const [profile, repos] = await Promise.all([
    getGithubProfile(),
    getGithubRepos(8),
  ]);

  return (
    <section id="github" className="section" aria-labelledby="github-heading">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 id="github-heading" className="headline">
                {t("title")}
              </h2>
              <p className="lead mt-4">{t("subtitle")}</p>
            </div>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {t("viewProfile")}
            </a>
          </div>
        </Reveal>

        {repos.length === 0 ? (
          <Reveal delay={0.05}>
            <div className="surface mt-10 p-8 text-muted">{t("fallback")}</div>
          </Reveal>
        ) : (
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {repos.map((repo, index) => (
              <Reveal key={repo.id} delay={index * 0.03}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface block h-full p-6 transition duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl tracking-[-0.02em]">{repo.name}</h3>
                    {repo.language ? (
                      <span className="shrink-0 rounded-full border border-border px-2.5 py-1 text-xs text-muted">
                        {repo.language}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                    {repo.description || t("noDescription")}
                  </p>
                  <p className="mt-6 text-xs text-muted">
                    {t("updated")} {formatDate(repo.updated_at, locale)}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        )}

        {profile ? (
          <Reveal delay={0.08}>
            <p className="mt-8 text-sm text-muted">
              @{profile.login}
              {profile.public_repos
                ? ` · ${profile.public_repos} public repositories`
                : null}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
