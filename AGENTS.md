# AGENTS.md

Compact notes for agents working in this repo. Verify against config/scripts before trusting prose (including `README.md`).

## Commands

```bash
npm install
npm run dev     # Next dev server (Turbopack), http://localhost:3000
npm run lint    # eslint (flat config, repo root, no args)
npm run build   # next build — production verification
npm run start
```

- There is **no test, typecheck, formatter, or codegen script**. Verification order: `npm run lint` → `npm run build`.
- `next build` compiles cleanly only because `jsconfig.json` defines the path alias below; don't delete it.
- **Lint is strict**: `eslint-config-next/core-web-vitals` includes React Compiler rules that fail the build on (a) impure calls like `Math.random()` during render — use index-derived deterministic values or module-level constants; (b) synchronous `setState` inside `useEffect` — read external stores with `useSyncExternalStore` instead. `next build` does *not* run ESLint; only `npm run lint` does.

## Architecture

- Next.js 16 **App Router**, plain **JavaScript** (no TypeScript), React 19, Tailwind CSS **v4**, Framer Motion, Lucide. The palette is soft pink: `globals.css` `:root` sets `--background: #fff8f7` / `--foreground: #49343b`, and components use `#927b83` for muted text plus `bg-white`/`bg-[#fff8f7]`-style surfaces. Keep new sections/components on those tokens instead of reintroducing dark surfaces (`bg-[#161014]`, `text-[#b7a0a7]`).
- Two routes: `/` (gated home) and `/welcome` (secret-answer login). `src/app/page.js` wraps all home content in the client `Gate` component, which redirects to `/welcome` unless the security question was answered during the current page load, and shows `BirthdayNote` once inside. Never render home content outside `Gate` — it must not leak before the check.
- **Auth is memory-only by design.** `src/lib/auth.js` holds a module-level `granted` flag and never touches storage, so every refresh/new tab locks the site again and re-asks the question. Do not "fix" this by adding localStorage/sessionStorage persistence.
- **All personalization lives in `src/data/siteConfig.js`**: the gate question/answers and the birthday-note copy (`birthday`: headline/title/wishes/signature). `src/lib/auth.js` holds the gate helper; `src/lib/birthday.js` has `isBirthdayWindow()`; `Gate` shows `BirthdayNote` once inside — it opens ~600 ms after entry only while the date is inside `birthday.window` (default Nov 8–9); set `birthday.forceShow` to preview it any time.
- The gate is a romantic gesture, **not real security** — it's client-side only (anyone can view source or read the answer in the bundle). Do not add auth infrastructure unless asked.
- Remaining pages: `src/app/page.js` composes client components from `src/components/` (every component starts with `"use client"`; `layout.js` and `welcome/page.js` are the only server files — the latter exists to export `metadata`).
- `@/*` maps to `./src/*` via `jsconfig.json` `paths`. All cross-directory imports use it (`@/components/...`, `@/data/memories`); keep using it for new imports.
- Timeline + gallery content lives in `src/data/memories.js`. Other copy is hardcoded inside components (`LoveLetter.jsx`, `Surprise.jsx`, `Footer.jsx`).
- Tailwind v4 is CSS-first: `postcss.config.mjs` loads `@tailwindcss/postcss`, `globals.css` has `@import "tailwindcss"` and **no `tailwind.config.*` file exists**. Custom classes (`.font-romantic`, `.floating`, keyframes) are plain CSS in `globals.css` — add new theme/utilities there, not in a JS config.
- `next.config.mjs` is empty. Using `next/image` with remote URLs requires adding `images.remotePatterns` first; local assets are expected.

## Gotchas

- **Photos and music are the user's personal files.** `public/images/` holds `memory_1.jpeg` / `memory_2.jpeg` / `memory_3.jpg` / `memory_4.jpg` (referenced from `src/data/memories.js` and `src/components/Hero.jsx`) plus unused `*.svg` starter artwork; `public/music/our_music.mp3` (~10 MB) is wired into `MusicPlayer.jsx`. The `ADD_YOUR_SONG_HERE.txt` note and the `*.svg` files are leftovers — no code references them. Changing a filename means updating the `src` path too.
- No database, auth, or env vars; `.env*` is gitignored and unused.
- ESLint ignores `.next/`, `out/`, `build/`, `next-env.d.ts` (see `eslint.config.mjs`).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
