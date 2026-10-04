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

export async function getGithubRepos(limit = 8): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
      {
        headers: authHeaders(),
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return [];
    const repos = (await res.json()) as GithubRepo[];
    return repos
      .filter((repo) => !repo.fork && repo.name !== username)
      .slice(0, limit);
  } catch {
    return [];
  }
}
