export type ProjectCategory = "ai" | "web" | "automation" | "tools";

export type Project = {
  id: string;
  name: string;
  slug: string;
  descriptionKey: string;
  longDescriptionKey: string;
  category: ProjectCategory;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "govmate-ai",
    name: "GovMate AI",
    slug: "govmate-ai",
    descriptionKey: "items.govmate.description",
    longDescriptionKey: "items.govmate.longDescription",
    category: "ai",
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "OpenAI",
      "Stripe",
      "Tailwind",
    ],
    githubUrl: "https://github.com/xeyal9032/govmate-ai",
    liveUrl: "https://govmateai.com",
    image: "/images/govmate-product.jpg",
    featured: true,
  },
  {
    id: "ostwind",
    name: "OstWind",
    slug: "ostwind",
    descriptionKey: "items.ostwind.description",
    longDescriptionKey: "items.ostwind.longDescription",
    category: "web",
    technologies: ["Next.js", "TypeScript", "Prisma", "CMS"],
    githubUrl: "https://github.com/xeyal9032/ostwind",
    liveUrl: "https://frontend.ostwind.az",
    image: "/images/ostwind-cover.jpg",
  },
  {
    id: "evrak",
    name: "BelegPair",
    slug: "evrak-karsilastirma",
    descriptionKey: "items.evrak.description",
    longDescriptionKey: "items.evrak.longDescription",
    category: "automation",
    technologies: ["Python", "Excel", "DATEV"],
    githubUrl: "https://github.com/xeyal9032/Evrak_Karsilastirma_Araci",
    liveUrl: "https://belegpair.govmateai.com",
    image: "/images/belegpair-cover.jpg",
  },
  {
    id: "ostwind-ai",
    name: "OstWind Group AI",
    slug: "ostwindgroup-ai",
    descriptionKey: "items.ostwindAi.description",
    longDescriptionKey: "items.ostwindAi.longDescription",
    category: "ai",
    technologies: ["React", "Google AI", "JavaScript"],
    githubUrl: "https://github.com/xeyal9032/ostwindgroup-ai",
    image: "/images/hero-atmosphere.jpg",
  },
  {
    id: "nextcode",
    name: "NextCode Group",
    slug: "nextcode-group",
    descriptionKey: "items.nextcode.description",
    longDescriptionKey: "items.nextcode.longDescription",
    category: "web",
    technologies: ["PHP", "HTML", "CSS"],
    githubUrl: "https://github.com/xeyal9032/nextcode-group-website",
    image: "/images/ostwind-cover.jpg",
  },
  {
    id: "megashop",
    name: "MegaShop",
    slug: "megashop",
    descriptionKey: "items.megashop.description",
    longDescriptionKey: "items.megashop.longDescription",
    category: "web",
    technologies: ["PHP", "MySQL"],
    githubUrl: "https://github.com/xeyal9032/MegaShop",
    image: "/images/belegpair-cover.jpg",
  },
  {
    id: "jarvis",
    name: "Jarvis",
    slug: "jarvis",
    descriptionKey: "items.jarvis.description",
    longDescriptionKey: "items.jarvis.longDescription",
    category: "tools",
    technologies: ["HTML", "JavaScript"],
    githubUrl: "https://github.com/xeyal9032/jarvis",
    image: "/images/hero-atmosphere.jpg",
  },
  {
    id: "xeyal-os",
    name: "Xeyal OS",
    slug: "xeyal-os",
    descriptionKey: "items.xeyalOs.description",
    longDescriptionKey: "items.xeyalOs.longDescription",
    category: "web",
    technologies: ["Next.js", "React Three Fiber", "TypeScript"],
    githubUrl: "https://github.com/xeyal9032/xeyal-os",
    image: "/images/govmate-product.jpg",
  },
];

export const featuredProject = projects.find((p) => p.featured)!;

export const techEcosystem = [
  {
    id: "frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "backend",
    items: ["Node.js", "REST APIs", "Prisma"],
  },
  {
    id: "data",
    items: ["PostgreSQL", "Supabase", "SQL"],
  },
  {
    id: "ai",
    items: ["OpenAI", "LLMs", "AI workflows"],
  },
  {
    id: "cloud",
    items: ["Vercel", "Netlify"],
  },
  {
    id: "tools",
    items: ["Git", "GitHub", "Cursor", "Figma"],
  },
] as const;
