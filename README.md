<div align="center">

# Khayal Jamilli — Portfolio

**Web Developer · AI · Digital Solutions**

Premium multilingual portfolio for production web products, AI workflows, and automation systems.

<br/>

[![Live Site](https://img.shields.io/badge/Live-portfolio.govmateai.com-0b0c0f?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio.govmateai.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br/>

[Website](https://portfolio.govmateai.com) ·
[GovMate AI](https://govmateai.com) ·
[GitHub](https://github.com/xeyal9032) ·
[LinkedIn](https://www.linkedin.com/in/khayaljamilli9032)

</div>

---

## Overview

A calm, production-minded personal site — not a template wall of badges.
Built to present real products, clear interfaces, and shippable engineering.

| | |
|:--|:--|
| **Live** | [portfolio.govmateai.com](https://portfolio.govmateai.com) |
| **Stack** | Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 |
| **i18n** | EN · RU · TR · DE · AZ |
| **Theme** | Dark / Light |
| **Deploy** | Vercel |

---

## Feature cards

<table>
  <tr>
    <td width="50%" valign="top">

### Product-first hero
Full-bleed atmosphere, strong brand signal, clear CTAs, and a workspace visual that reads like a real build environment.

</td>
    <td width="50%" valign="top">

### Multilingual by default
Five locales with next-intl — English, Russian, Turkish, German, and Azerbaijani — including flag-based language switching.

</td>
  </tr>
  <tr>
    <td width="50%" valign="top">

### Work & project gallery
Curated project cards with professional cover imagery across personal and [GovMateAi](https://github.com/GovMateAi) repositories.

</td>
    <td width="50%" valign="top">

### Live GitHub section
Public repositories pulled live from `@xeyal9032` and the GovMateAi organization — never invented.

</td>
  </tr>
  <tr>
    <td width="50%" valign="top">

### About + contact system
Principles, selected experience, languages, education, direct channels, and a clear collaboration process.

</td>
    <td width="50%" valign="top">

### Polished UX details
Theme toggle, back-to-top control, responsive layouts for mobile / tablet / laptop, and contrast-safe dark mode.

</td>
  </tr>
  <tr>
    <td width="50%" valign="top" colspan="2">

### KJ Assistant
OpenAI-powered portfolio robot that answers visitor questions about skills, projects, availability and how to start a collaboration — in EN / RU / TR / DE / AZ.

</td>
  </tr>
</table>

---

## Tech stack

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/next--intl-000000?style=flat-square&logo=i18next&logoColor=white" alt="next-intl" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/next--themes-111111?style=flat-square&logo=moon&logoColor=white" alt="next-themes" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
</p>

---

## Selected products

<table>
  <tr>
    <td width="33%" valign="top">

**GovMate AI**  
AI product for German bureaucracy — document analysis, deadlines, official replies.

[govmateai.com](https://govmateai.com)

</td>
    <td width="33%" valign="top">

**OstWind**  
Multilingual education consultancy platform with CMS and admin operations.

[frontend.ostwind.az](https://frontend.ostwind.az)

</td>
    <td width="33%" valign="top">

**BelegPair**  
DATEV / journal document comparison with clear multilingual Excel reporting.

[belegpair.govmateai.com](https://belegpair.govmateai.com)

</td>
  </tr>
</table>

---

## Project structure

```text
src/
├── app/                 # App Router + locales
├── components/          # Hero, Work, Projects, About, Contact, Nav…
├── data/                # site + projects config
├── i18n/                # routing + navigation
├── lib/                 # GitHub fetch + utils
└── messages/            # en / ru / tr / de / az
public/images/           # covers, portrait, product visuals
```

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en).

### Environment

Copy `.env.example` → `.env.local`:

```bash
GITHUB_USERNAME=xeyal9032
GITHUB_TOKEN=
NEXT_PUBLIC_SITE_URL=https://portfolio.govmateai.com
NEXT_PUBLIC_CONTACT_EMAIL=xeyalcemilli9032@gmail.com
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
```

`GITHUB_TOKEN` is optional — it raises GitHub API rate limits for the live repos section.  
`OPENAI_API_KEY` is required for the KJ Assistant chat widget.

### Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |

---

## Deployment

Hosted on **Vercel** with custom domain:

**https://portfolio.govmateai.com**

Production aliases also include the Vercel project URL for previews and rollbacks.

---

## Contact

- Email: [xeyalcemilli9032@gmail.com](mailto:xeyalcemilli9032@gmail.com)
- GitHub: [@xeyal9032](https://github.com/xeyal9032)
- Org: [GovMateAi](https://github.com/GovMateAi)
- LinkedIn: [khayaljamilli9032](https://www.linkedin.com/in/khayaljamilli9032)

---

<div align="center">

Built for clarity. Shipped for production.

**© Khayal Jamilli**

</div>
