# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 16 App Router project written in TypeScript.
- `app/`: routes, layout, and global styles (`app/page.tsx`, `app/layout.tsx`, `app/globals.css`).
- `components/`: reusable UI sections (e.g., `Hero.tsx`, `PortfolioSection.tsx`, `LanguageSwitcher.tsx`).
- `lib/`: shared data/config logic (`lib/data.ts`).
- `messages/`: localization dictionaries (`en.json`, `es.json`) used by `next-intl`.
- `public/`: static assets served directly.

Keep page-level composition in `app/` and move reusable UI/stateful pieces into `components/`.

## Build, Test, and Development Commands
- `npm run dev`: start local development server at `http://localhost:3000`.
- `npm run build`: create a production build.
- `npm run start`: run the production build locally.
- `npm run lint`: run ESLint checks (`eslint-config-next`).

Run `npm run lint` before opening a PR.

## Coding Style & Naming Conventions
- Language: TypeScript + React function components.
- Indentation: 2 spaces; keep imports grouped and unused code removed.
- Components/files: `PascalCase` (e.g., `PortfolioSection.tsx`).
- Variables/functions/hooks: `camelCase`.
- Routes in `app/`: follow Next.js conventions (`page.tsx`, `layout.tsx`).
- Styling: prefer existing global/Tailwind patterns already used in the codebase.

## Testing Guidelines
There is currently no automated test framework configured. For now:
- Treat `npm run lint` and a successful `npm run build` as required validation.
- Manually verify key flows: locale switch (EN/ES), responsive layout, and animation-heavy sections.

If you add tests, colocate them near source files using `*.test.ts(x)` naming.

## Commit & Pull Request Guidelines
Recent commits use concise, imperative summaries (e.g., `Add internationalization (ES/EN) with language switcher dropdown`). Follow that style:
- Start with a verb (`Add`, `Fix`, `Improve`, `Refactor`).
- Keep subject line specific and under ~72 chars when possible.

PRs should include:
- Clear description of user-visible and technical changes.
- Linked issue/task (if available).
- Screenshots or short recordings for UI changes (desktop + mobile when relevant).
- Notes on validation performed (`lint`, `build`, manual checks).
