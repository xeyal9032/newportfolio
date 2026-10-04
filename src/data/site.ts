export const siteConfig = {
  name: "Khayal Jamilli",
  title: "Khayal Jamilli — Web Developer, AI & Digital Solutions",
  description:
    "Portfolio of Khayal Jamilli — web development, AI applications, automation and modern digital solutions.",
  githubUsername: "xeyal9032",
  githubOrg: "GovMateAi",
  githubUrl: "https://github.com/xeyal9032",
  githubOrgUrl: "https://github.com/GovMateAi",
  linkedinUrl: "https://www.linkedin.com/in/khayaljamilli9032",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "xeyalcemilli9032@gmail.com",
  company: "OstWind Group",
  companyUrl: "https://frontend.ostwind.az/",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.govmateai.com",
  tagline: "Web Developer • AI • Digital Solutions",
} as const;
