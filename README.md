# Sofía Álvarez · Portfolio

Personal portfolio of **Sofía Álvarez**, Product Designer & Design Engineer. Designed and coded by me, from a blank brief to a live product, directing AI-assisted development with Claude Code.

**Live site:** [sofia-alvarez-ux-iu.vercel.app](https://sofia-alvarez-ux-iu.vercel.app/) · **LinkedIn:** [sofía-álvarez-20](https://www.linkedin.com/in/sof%C3%ADa-%C3%A1lvarez-20/)

## What's inside

Five case studies, each one a full page with process, decisions and results:

| Case study | What it shows |
|---|---|
| **Milestone** | Personal finance app designed, built (Flutter + Firebase) and tested end to end. SEQ 6.55/7, 9 fixes shipped to production. [Code](https://github.com/Sofi-Alvarez/Hito-app) |
| **IUPI** | Fintech MVP for saving and investing, designed in a 5-week cross-functional team |
| **Mas Bank** | Responsive mobile and desktop banking |
| **Bookie** | Location-based reading app, hackathon finalist |
| **This portfolio** | How the site itself was designed and built in code |

## How it was built

The site was not designed in high fidelity in Figma first. Design and development ran in parallel:

```
Sketch ─► Spec / prompt ─► Claude Code ─► Result in the browser ─► Design review ─► Next iteration
```

- **Started from a Figma Make export** and evolved in code with Claude Code: own design system, light and dark mode, responsive layout, page transitions and full case study pages.
- **Every design decision is mine**; the AI implements. Changes go through branches and pull requests.
- The visual identity, voice and tone are documented from the code itself in [`IDENTIDAD_DE_MARCA.md`](IDENTIDAD_DE_MARCA.md), so the same system can be reused in other products.

## Tech stack

- **React 18** + **TypeScript**, bundled with **Vite**
- **Tailwind CSS 4** for styling, with light and dark themes
- **Radix UI** primitives for accessible components
- **Motion** for page transitions and micro-interactions
- **React Router** for the case study pages
- **Vercel** for hosting and Web Analytics

## Project structure

```
src/
├── main.tsx
├── app/
│   ├── App.tsx              Routes: home and one page per case study
│   ├── contexts/
│   │   └── ThemeContext.tsx Light / dark mode
│   └── components/
│       ├── Navbar, Hero, About, Projects, Skills, Feedback, Contact, Footer
│       └── ui/              Shared UI primitives and the case study pages
├── hooks/useAnalytics.ts    Page and event tracking
├── styles/                  Tailwind setup, theme tokens, fonts
└── imports/                 Images and mockups used in the case studies
```

## Performance

The first version was built as a single 33 MB `index.html`, with every image inlined. It now ships as separate, cacheable files: the initial download is around 225 KB of HTML, JS and CSS (gzip), and images load as you scroll. Heavy Figma exports were re-encoded as WebP, without visible loss of quality.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```
