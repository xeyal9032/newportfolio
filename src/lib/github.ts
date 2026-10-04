import { siteConfig } from "@/data/site";

export type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
  topics: string[];
  owner?: string;
};

export type GithubProfile = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
};

const username = process.env.GITHUB_USERNAME ?? siteConfig.githubUsername;
const org = siteConfig.githubOrg;

function authHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "khayal-portfolio",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export async function getGithubProfile(): Promise<GithubProfile | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: authHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as GithubProfile;
  } catch {
    return null;
  }
}

async function fetchUserRepos(): Promise<GithubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=40`,
    {
      headers: authHeaders(),
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) return [];
  return (await res.json()) as GithubRepo[];
}

async function fetchOrgRepos(): Promise<GithubRepo[]> {
  const res = await fetch(
    `https://api.github.com/orgs/${org}/repos?sort=updated&per_page=40`,
    {
      headers: authHeaders(),
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) return [];
  return (await res.json()) as GithubRepo[];
}

export async function getGithubRepos(limit = 12): Promise<GithubRepo[]> {
  try {
    const [userRepos, orgRepos] = await Promise.all([
      fetchUserRepos(),
      fetchOrgRepos(),
    ]);

    const skip = new Set([
      username,
      "newportfolio",
      ".github",
      "desktop-tutorial",
      "nextjs-boilerplate",
    ]);

    const merged = [...userRepos, ...orgRepos]
      .filter((repo) => !repo.fork && !skip.has(repo.name))
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      );

    const seen = new Set<string>();
    const unique: GithubRepo[] = [];
    for (const repo of merged) {
      const key = repo.html_url;
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push({
        ...repo,
        owner: repo.html_url.includes(`/${org}/`) ? org : username,
      });
      if (unique.length >= limit) break;
    }

    return unique;
  } catch {
    return [];
  }
}
