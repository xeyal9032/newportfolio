import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero";
import { WhatIBuild } from "@/components/what-i-build";
import { Featured } from "@/components/featured";
import { Tech } from "@/components/tech";
import { Projects } from "@/components/projects";
import { GithubSection } from "@/components/github-section";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <WhatIBuild />
      <Featured />
      <Tech />
      <Projects />
      <GithubSection />
      <About />
      <Contact />
    </>
  );
}
