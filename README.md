# Sproutly — Gamified Garden Community Dashboard

A playful community SaaS where indie projects grow as plants in a shared garden.
Community members **water** projects, founders level up through **milestones**,
complete **quests**, collect community **submissions**, and pitch live on the
**stage** stream. Duolingo × Discord energy — soft, rounded, purple-forward.

> **Design-only prototype.** There is intentionally **no backend** — every screen
> runs on mock data in [`lib/data.ts`](lib/data.ts) with local React state. The
> focus of this repo is the design and the general feel. It will later be
> connected to a real project / handed off for integration.

## Stack

- [Next.js](https://nextjs.org) (App Router) + React + TypeScript
- Plain CSS with design tokens as CSS variables (`app/globals.css`) — light **and** dark theme
- Nunito via `next/font` — zero other runtime dependencies
- All artwork is inline SVG (no raster assets), ported from the design canvas

## Screens

| Route | Screen |
| --- | --- |
| `/garden` | **All Projects** — keeper-approved directory with pending-approval banner and filters |
| `/garden/[slug]` | **Garden** — a project's character-select stage: hero plant, milestone path, plant health + Water button, dock carousel, activity rail |
| `/quests` | **Quests** — course + PDF guided path (done / in-progress / locked) |
| `/submissions` | **Submissions** — community request folder with upvotes, statuses, founder replies and a composer |
| `/stage` | **Stage** — request a live pitch spot + stream lineup |
| `/settings` | Theme + particle toggles |

Interactions that work today: light/dark toggle (header moon/sun or Settings),
watering (health + counter + droplet micro-animation), directory & submission
filters, upvoting, adding a submission, pitch-length picker, and the Garden
backdrop drop-zone (drop any screenshot onto the stage — it becomes the backdrop
behind the readability veil, exactly like the `backdropUrl` project setting will).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (what Vercel runs)
```

## Deploy to Vercel

The repo is a standard Next.js app at the root — import it on
[vercel.com/new](https://vercel.com/new) (or `npx vercel`) and it deploys with
zero configuration.

## Design source

The original handoff lives in [`design/handoff/`](design/handoff):

- `DESIGN-SPEC.md` — the full written spec (tokens, layouts, copy, behavior)
- `Sproutly Garden.dc.html` — the design canvas with all frames (open in a browser)
- `image-slot.js` — prototype drag-and-drop helper (reference only)

Design tokens in `app/globals.css` mirror the spec's tables one-to-one, so
tweaking the feel (colors, radii, shadows, glass) is a single-file job.
