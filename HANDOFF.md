# Sproutly — Handoff Notes

Hi Yu 👋 — this repo is a **design-and-feel prototype**: a complete, deployable
frontend with **zero backend**. Everything you see runs on mock data and local
React state. This doc is the map for taking it over — whether you connect it to
a real backend here, or lift pieces into your own repo.

## The 30-second tour

```
app/                    Next.js App Router pages (all "use client" — no server data)
├── garden/             All Projects directory  →  /garden
│   └── [slug]/         A project's Garden page →  /garden/rankkit
├── quests/  stage/  submissions/   the other product pages
├── admin/              Founder editing panel (see "Overrides" below)
├── settings/           Theme + particle toggles
└── globals.css         ALL design tokens + styles (single file, organized by section)

components/
├── AppShell.tsx        Header + one-tab sidebar (the whole showcase = one nav entry)
├── plants.tsx          Every plant illustration: hero (8 growth tiers), minis, mascots
├── icons.tsx           The full icon set (24×24, rounded 2.2px strokes)
└── ThemeProvider.tsx   Light/dark + particles, persisted to localStorage

lib/
├── data.ts             ★ ALL mock data + entity shapes — your API replaces this file
├── overrides.ts        localStorage stand-in for "founder edits project" (delete when API lands)
└── video.ts            YouTube link parsing/thumbnails

design/handoff/         The original design spec + canvas (source of truth for visuals)
public/guides/          Placeholder quest PDFs (swap for real course PDFs, same filenames)
```

## Where the real backend plugs in

Every interaction already works optimistically in the UI; each one maps to an
obvious endpoint. Search the code for `HANDOFF NOTE` comments at each site.

| Feature | Today (mock) | Needs |
| --- | --- | --- |
| Water (community vote) | local state in `GardenStage.tsx` | POST water + daily rate limit per user |
| Project edits (name, pitch, links, video, team, milestones) | `lib/overrides.ts` → localStorage | PATCH /projects/:slug (admin panel + Garden page both read it) |
| Backdrop upload | FileReader data-URL, not persisted | image upload → `backdropUrl` field |
| Submissions + upvotes + statuses | local state in `submissions/page.tsx` | CRUD + one-vote-per-user toggle |
| Quest completion + XP/level | local state in `quests/page.tsx` | server-driven progression |
| Stage spot requests + lineup | local state in `stage/page.tsx` | request/create + keeper confirm flow |
| Keeper approve flow | local state in `garden/page.tsx` (+ mock card in admin rail) | approval queue, keeper role |
| Auth / roles | none — "you" are Maya (RankKit founder) everywhere | founder vs. keeper vs. gardener gating |

The entity shapes in `lib/data.ts` (`Project`, `Submission`, `Quest`, lineup,
stream channel) were written to match the design spec's suggested state model —
they should survive contact with a real schema mostly unchanged. Past pitch
nights deliberately link out to the stream channel (`streamChannel` in
`lib/data.ts`) rather than per-project recordings.

## Design system in one place

`app/globals.css` starts with two token blocks (`:root` light, `[data-theme="dark"]`
dark). **Every color, radius, shadow, and glass recipe on the site is a variable
there** — retheming or extracting to your own system is a one-file job. The
written spec behind it all is `design/handoff/DESIGN-SPEC.md`.

Fonts: Nunito via `next/font`. Artwork: 100% inline SVG (no raster assets).

## Things that are intentionally fake

- **Search** in the header, **bell/trophy** buttons — visual only.
- **Record video** buttons — placeholder; only the YouTube-link flow works.
- **Course videos** — the lesson player modal is a mock (no real playback).
- **Dock carousel** on the Garden page previews growth tiers (it does not
  navigate between projects — Visit buttons in All Projects do that).
- Numbers like "132 gardeners" / voter counts are decorative; waters/health
  totals are computed from the mock data where it was cheap to do so.

## Running it

`npm install && npm run dev` — no env vars, no services. `npm run build` is
exactly what Vercel runs; the repo deploys there with zero config.
