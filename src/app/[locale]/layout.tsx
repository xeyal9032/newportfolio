import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/data/site";
import { Providers } from "@/components/providers";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { Assistant } from "@/components/assistant";
import { CommandPalette } from "@/components/command-palette";
import { KonamiEgg } from "@/components/konami-egg";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const url = siteConfig.siteUrl;

  return {
    metadataBase: new URL(url),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((code) => [code, `/${code}`]),
      ),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${url}/${locale}`,
      siteName: siteConfig.name,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    jobTitle: "Web Developer",
    worksFor: {
      "@type": "Organization",
      name: siteConfig.company,
      url: siteConfig.companyUrl,
    },
    sameAs: [siteConfig.githubUrl, siteConfig.linkedinUrl],
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <div className="site-shell">
          <div className="grain" aria-hidden />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
          <Assistant />
          <CommandPalette />
          <KonamiEgg />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Providers>
    </NextIntlClientProvider>
  );
}
