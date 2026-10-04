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
    getGithubRepos(12),
  ]);

  return (
    <section id="github" className="section" aria-labelledby="github-heading">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">GitHub</p>
              <h2 id="github-heading" className="headline mt-4">
                {t("title")}
              </h2>
              <p className="lead mt-5">{t("subtitle")}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                {t("viewProfile")}
              </a>
              <a
                href={siteConfig.githubOrgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                GovMateAi
              </a>
            </div>
          </div>
        </Reveal>

        {repos.length === 0 ? (
          <Reveal delay={0.05}>
            <div className="surface mt-12 p-8 text-muted">{t("fallback")}</div>
          </Reveal>
        ) : (
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {repos.map((repo, index) => (
              <Reveal key={repo.id} delay={index * 0.03}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface block h-full p-7 transition duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {repo.owner ? (
                        <p className="text-[0.7rem] tracking-[0.12em] text-muted uppercase">
                          {repo.owner}
                        </p>
                      ) : null}
                      <h3 className="mt-1 text-xl tracking-[-0.02em]">
                        {repo.name}
                      </h3>
                    </div>
                    {repo.language ? (
                      <span className="shrink-0 rounded-full border border-border px-2.5 py-1 text-xs text-muted">
                        {repo.language}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">
                    {repo.description || t("noDescription")}
                  </p>
                  <p className="mt-7 text-xs tracking-[0.08em] text-muted uppercase">
                    {t("updated")} {formatDate(repo.updated_at, locale)}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        )}

        {profile ? (
          <Reveal delay={0.08}>
            <p className="mt-10 text-sm text-muted">
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
