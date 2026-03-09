# Jhon Tajumbina Portfolio

A modern, bilingual (Spanish/English) personal portfolio built with Next.js, TypeScript, and Tailwind CSS.

This project showcases:
- Professional profile and tech stack
- Interactive portfolio (projects, certifications, skills)
- Professional journey timeline (2021-2026)
- Contact section and social links
- Responsive, animation-driven experience for desktop and mobile

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- next-intl (custom locale provider)
- ESLint

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev`: Run local dev server
- `npm run build`: Build production bundle
- `npm run start`: Start production server
- `npm run lint`: Run lint checks

## Project Structure

- `app/`: routes, layout, global styles
- `components/`: UI sections and shared components
- `lib/data.ts`: portfolio data (projects, certificates, timeline, personal info)
- `messages/`: localization dictionaries (`en.json`, `es.json`)
- `public/`: static assets

## Internationalization

The UI supports Spanish (`es`) and English (`en`).
Language state is managed in `LocaleProvider` and persisted via cookie/local storage.

To update translations:
1. Edit `messages/es.json`
2. Edit `messages/en.json`
3. Keep keys aligned across both files

## Quality Checks

Before pushing changes:

```bash
npm run lint
npm run build
```

## Deployment

This app is ready to deploy on Vercel.

Typical flow:
1. Push to `main`
2. Import repository in Vercel
3. Deploy (automatic build with Next.js defaults)

## Contributing

If you contribute, follow the repository conventions in `AGENTS.md`:
- Keep changes focused and small
- Preserve bilingual consistency
- Validate responsive behavior (mobile + desktop)
- Include lint/build verification
