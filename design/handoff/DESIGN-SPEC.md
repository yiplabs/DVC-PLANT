# Handoff: Sproutly — Gamified Garden Community Dashboard

## Overview
Sproutly is a playful, gamified community SaaS where indie projects are represented as plants in a shared garden. Community members "water" projects (support/engagement), founders level their plant through growth milestones, complete quests (mini courses + PDF guides), collect written feature submissions from the community, and pitch live on a Shark-Tank-style stream. Projects are **manually approved by admins ("garden keepers")** — the whole product should feel personal, soft, rounded, and purple-forward (Duolingo × Discord energy; nothing corporate).

This bundle contains the full design canvas plus this spec. Five product pages are covered:

1. **Garden** (project hero / character-select screen) — light + dark mode
2. **All Projects** (directory, keeper-approved, personal cards)
3. **Quests** (course + PDF guided path)
4. **Submissions** (folder of all community requests per project)
5. **Stage** (request a live pitch spot + stream lineup)

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, **not production code to copy directly**. The task is to **recreate these designs in the target codebase's existing environment** (React, Vue, etc.) using its established patterns and libraries. If no environment exists yet, choose the most appropriate stack (e.g. Next.js/React + Tailwind or CSS-in-JS) and implement the designs there.

`Sproutly Garden.dc.html` is a design-canvas file: it renders **all screens side by side, newest iterations at the top**, each frame labeled with a badge (`5a`, `4a`, `3a`, `2a`, `1a`, `1b`, `1c`). Frames `1c` (simple list directory) is an early iteration **superseded by `2a`** — implement `2a`. All frames are 1920×1080 desktop layouts.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, radii, shadows and copy are final intent. Recreate pixel-perfectly using the codebase's component conventions. Placeholder data (project names, people, quotes) is illustrative.

---

## Global Chrome (all screens)

### Top header — 72px tall, sticky
- Background: `linear-gradient(90deg, #6c5ce7 0%, #4834d4 50%, #00cec9 100%)`
- Grid: `1fr auto 1fr` (logo left, search centered, actions right), padding `0 28px`
- Logo: 40×40 tile, radius 14, `rgba(255,255,255,0.22)`, white sprout icon; wordmark "Sproutly" white, 900, 20px
- Search: 460×44 fully-rounded pill, `rgba(255,255,255,0.18)`, 1px border `rgba(255,255,255,0.28)`, white search icon + placeholder "Search the garden…" (15px/600, `rgba(255,255,255,0.85)`)
- Right: two 40×40 icon buttons (radius 14, `rgba(255,255,255,0.18)`, white stroke icons: bell, trophy) + 40px circular avatar (amber gradient `#ffd166→#fbbf24`, 2px border `rgba(255,255,255,0.75)`, initial letter 900 in `#7c2d12`)

### Left sidebar — 232px, white
- Border-right `1px #f0eef9`, padding `24px 16px`, vertical stack gap 6
- Nav pills: padding `12px 18px`, radius 999, 15px/800, icon 19px stroke 2.2 `currentColor`
- Items (in order): **Home, Garden, Quests, Stage, Submissions, Settings** (Leaderboard and Chat were deliberately removed — chat lives in an external program)
- Inactive: text `#6b6689`. Active: background `#eef0ff`, text `#6c5ce7`
- Dark mode: sidebar `#191527`, border `rgba(255,255,255,0.06)`, inactive `#9d96c0`, active bg `rgba(108,92,231,0.25)` text `#b9aefc`

### Page background
- Light: warm near-white `#faf8f4`. Dark: near-black purple `#14111f`

---

## Screen 1 — Garden (project hero), frames `1a` (light) & `1b` (dark)

**Purpose:** A single project's "character-select" stage. One big adorable plant = the project's health/level. Community waters it.

**Layout:** sidebar | center stage (flex 1, relative) | activity rail 320px.

### Stage backdrop (key feature)
- Founders can upload a **background image** (e.g. a screenshot of their website) that fills the whole stage area behind the plant. In the prototype this is a drag-and-drop `<image-slot>`; in production it's a project setting (`backdropUrl`) with an upload.
- Above the image sits a **readability veil** (no pointer events):
  - Light: `linear-gradient(180deg, rgba(250,248,244,0.9) 0%, rgba(250,248,244,0.44) 38%, rgba(250,248,244,0.3) 62%, rgba(250,248,244,0.74) 100%)` plus `radial-gradient(circle at 50% 44%, rgba(108,92,231,0.13), transparent 58%)`
  - Dark: same stops with `rgba(20,17,31, 0.93/0.52/0.4/0.84)` and radial `rgba(108,92,231,0.3)`
- With no image, the stage shows the plain warm bg + lavender radial glow.

### Center column (z above veil)
- Micro label `PROJECT` — 12px/800, letter-spacing 0.24em, `#a29bce` (dark `#7d76a3`)
- Heading `RankKit` — 78px/900, `#2d2a45` (dark `#f2efff`), letter-spacing -0.02em
- Founder chip: pill `#eef0ff` (dark `rgba(108,92,231,0.25)`), 24px gradient avatar + `@maya · Founder` 14px/800 `#6c5ce7` (dark `#c4bbff`)
- **Plant illustration**: inline SVG ~452×500 (viewBox 300×332). Soil mound: two ellipses `#8a6248` / `#a57c58` (dark `#6e4c37`/`#8a6248`) with a soft radial glow underneath (purple, opacity 0.38 light / 0.65 dark). Stem: 13px round-cap path with vertical gradient `#6c5ce7 → #4834d4 → #00cec9`. Four leaves: fills `#3ecf8e`/`#2eb872`, strokes `#27a06b`/`#219660` (5px). Flower: 6 petal circles r12.5 `#fbbf24` stroke `#f59e0b` around center circle r11 `#ffd166`, plus an amber radial glow (r48, opacity 0.5 light / 0.7 dark). Golden particles: ~7 small amber circles (r2.6–5, opacity 0.4–0.95) floating around the plant. Particles are toggleable.

### Milestone card (floats left: 52px from left, 168px from top, width 248)
- **Matte glass**: `linear-gradient(160deg, rgba(255,255,255,0.44), rgba(120,102,240,0.16))`, `backdrop-filter: blur(22px) saturate(1.35)`, border `1.5px rgba(255,255,255,0.8)`, radius 24, shadow `0 16px 40px rgba(108,92,231,0.18)`, padding 22
- Dark glass: `linear-gradient(160deg, rgba(139,124,247,0.2), rgba(32,27,49,0.36))`, border `rgba(255,255,255,0.16)`, shadow `0 16px 40px rgba(0,0,0,0.45)`
- Label `MILESTONE PATH` (11px/800, ls 0.2em)
- Vertical path of 7 nodes (31px circles) connected by a 3px line `rgba(108,92,231,0.16)` (dark `rgba(255,255,255,0.08)`):
  - Steps: Seed, Sprout, First Leaf, Budding, **Flowering (current)**, Pollinate, Full Bloom
  - Done (first 4): bg `#6c5ce7`, white 4px check
  - Current: bg `#fbbf24`, white 11px dot, glow `0 0 0 6px rgba(251,191,36,0.22), 0 0 20px rgba(251,191,36,0.65)`, label `#f59e0b`
  - Upcoming: bg `#e6e3f2` (dark `#3a3450`), label `#b3aed0` (dark `#6e678f`)

### Plant health card (floats right: 52px from right, 190px from top, width 300)
- Same glass treatment as milestone card
- Label `PLANT HEALTH`
- XP bar: 18px tall, radius 999, track `rgba(108,92,231,0.16)` (dark `rgba(255,255,255,0.1)`), fill `linear-gradient(90deg,#6c5ce7,#00cec9)` at **80%** (width = health)
- Under bar: `80 / 100` (13px/800 `#6b6689`) and stage name `Flowering` (13px/800 `#f59e0b`)
- **Water button**: full-width, bg `#6c5ce7` (hover `#5b4bd6` light / `#7d6ef0` dark), radius 16, padding 14, white water-drop icon + "Water" 17px/900 white, shadow `0 10px 24px rgba(108,92,231,0.4)`
- Three stat chips (12px/800): `12-day streak` (flame `#f59e0b`), `248 waters` (drop `#6c5ce7`), `Level 5` (star `#fbbf24`). Light: bg `rgba(255,255,255,0.62)` border `rgba(255,255,255,0.78)`; dark: bg `rgba(255,255,255,0.05)` border `rgba(255,255,255,0.08)` text `#c9c3e8`

### Dock carousel (bottom center, 26px from bottom)
- Glass pill: light `rgba(255,255,255,0.5)` + blur(20px), border `1.5px rgba(255,255,255,0.75)`, radius 26; dark `rgba(32,27,49,0.55)`, border `rgba(255,255,255,0.14)`
- Left/right arrow buttons: 36px circles, `#eef0ff` with `#6c5ce7` chevrons (dark `rgba(108,92,231,0.22)` / `#b9aefc`)
- 8 plant thumbnails: 54px circles `#eef0ff` (dark `rgba(108,92,231,0.16)`) each containing a 34px mini plant SVG at growth stages 1→8 (seed, sprout, seedling, sapling, bud, blooming, flowering, full bloom)
- Active thumb ring: `0 0 0 3px #fff, 0 0 0 6px #6c5ce7` (dark gap `#201b31`, ring `#8b7cf7`)

### Activity rail (right, 320px)
- Label `ACTIVITY`
- Tiles: white (dark `#201b31` + hairline), radius 18, padding `12px 14px`, shadow `0 6px 18px rgba(108,92,231,0.08)`
- Each: 40px avatar with a 2px **gradient ring** (padding 2px; gradients: purple→teal, amber→purple, teal→green, indigo→purple; inner circle `#eef0ff` with 900 initial in `#6c5ce7`), one-line update (`<b>Name</b> action`, 13px), tiny timestamp (11px/800 `#b3aed0`)
- Sample feed: Maya watered RankKit · 2m; Leo hit Budding on Looply · 8m; Ana boosted PixelPay · 14m; Sam joined the garden · 21m; Rio watered Nestly · 33m; Priya commented on RankKit · 1h

---

## Screen 2 — All Projects (frame `2a`; frame `1c` is the superseded v1)

**Purpose:** Directory of all plants. Every project is hand-approved by a keeper; each card should feel personal.

**Layout:** sidebar | main (flex) | rail 312px.

- Label `CHOOSE A PLANT`, heading `All Projects` (52px/900), subline "Every plant here was hand-approved by a garden keeper." Filter chips right-aligned: **All** (active: `#6c5ce7` bg, white) / Thriving / Wilting / New (white, border `#e8e5f4`, `#6b6689`)
- **Pending approval banner** (top, full width): bg `linear-gradient(160deg,#fffdf5,#fef7e2)`, border `2px #fcd34d`, radius 24. Contains: 62px logo tile (amber gradient monogram) + 62px plant tile (`#fef3c7` with seed sprout) — equal sizes; name "Orbit Notes" + `PENDING` chip (`#fef3c7`/`#b45309`, ls 0.1em); founder stack "Jules Kim & Dana Fox · submitted 2h ago — their one-line pitch"; actions: "Later" (white, amber border) + "Review & approve" (bg `#fbbf24`, text `#7c2d12`, 900)
- **Project grid**: 2 columns, gap 14. Card: white, radius 24, hairline `#f0eef9`, shadow `0 10px 28px rgba(108,92,231,0.08)`, padding `18px 20px`, horizontal flex:
  - **Logo tile 84×84** (THE main identity; per-project gradient monogram, mixed radii — some 22px squircles, some circles) next to **plant tile 84×84** (radius 22, tinted bg `#f4f2ff`, mini plant SVG on a soil ellipse) — **equal size, logo first**
  - Title row: name 20px/900 `#2d2a45` + stage badge (uppercase 11px/800 pill; amber `#fef3d7`/`#b45309` for Flowering/Budding/Wilting; emerald `#e7f8ef`/`#1d9d6b` for Thriving/Sprout/Regrowth/etc.) + keeper chip right (`#eef0ff`, check icon, "Approved · Ines")
  - Founder row: overlapping 24px avatar stack (-7px overlap, 2px white border, gradient fills) + all names ("Maya Chen & Leo Marsh", "Ana, Sam & Priya") + "· Planted Mar 12" (12px `#b3aed0`)
  - Pitch quote: "Helping indie makers climb the charts." (14.5px/700 `#565271`, in curly quotes)
  - Bottom row: health bar (9px, track `#eef0ff`, purple→teal fill) with "80% health · 248 waters" caption + **Visit** button (pill, `#eef0ff`/`#6c5ce7`, hover `#e2e5ff`)
  - Special plants: **Fernbase = wilted** (brown drooping stem `#a07850`, tan leaf, warm tile `#f8f1e7`, 18% health); **Quilljar = regrowth** (gray scarred stem `#9a94ae` + fresh green leaf, tile `#f1eff8`, 37%)
- **Rail**: (1) Submit card — cute mascot SVG (purple pot with face, sprout, teal watering can), label `SUBMIT YOUR PROJECT`, copy "Plant a seed — add your logo and your team, and let the community help it grow.", purple button. (2) `GARDEN KEEPERS` card — keeper rows (36px gradient avatar, name, "34 approvals this season")

---

## Screen 3 — Quests (frame `3a`)

**Purpose:** Guided founder curriculum. Each quest links a mini video course and a PDF guide. Fixed order: website → domain → marketing.

- Label `QUESTS`, heading `Grow your project` (52px/900), subline + chips `1 of 3 complete` (lavender) and `+40 XP earned` (amber)
- **Quest path** (max-width 980): vertical **3px dashed connector** `#ddd8f2` behind 56px circular nodes; each quest is a row [node | card]:
  1. **Launch a simple website** — DONE. Node `#6c5ce7` + white check. White card: microlabel `QUEST 1`, title 21px/900, desc "A one-pager is enough — the course walks you through building it in an afternoon.", chips: `▶ 12-min course` (lavender), `one-pager-template.pdf` (white + doc icon), `+40 XP` (amber). Right: `Completed` chip (`#e7f8ef`/`#1d9d6b`)
  2. **Claim your domain name** — IN PROGRESS. Node `#fbbf24` with glow `0 0 0 7px rgba(251,191,36,0.22), 0 0 24px rgba(251,191,36,0.6)`. Card border `2px #fde68a`, shadow `0 16px 40px rgba(251,191,36,0.18)`, microlabel `QUEST 2 · IN PROGRESS` in `#d99a06`, desc "Pick a name people can spell out loud — the checklist keeps you from common traps.", chips `▶ 8-min course` / `domain-checklist.pdf` / `+40 XP`. Right: **Continue quest** primary button
  3. **Run your first marketing push** — LOCKED. Node `#e6e3f2` + lock icon `#a29bce`. Card bg `#fbfaf7`, border `#efece2`, title `#8f8aa8`, desc "Explain what you're building, where it helps, and invite the garden to try it.", all chips muted (`#f3f1ec`/`#b3aed0`), `+60 XP`. Right: `Finish quest 2 first` chip with lock
- **Rail (340px)**: `CONTINUE LEARNING` card — 150px video tile (header gradient bg, 54px white play circle, `8:24` duration chip), "Naming & domains" 18px/900, "Lesson 1 of 3 · with keeper Ines", 9px progress bar at 35%, **Resume course** button. Below: PDF row card — 46px lavender doc tile, `domain-checklist.pdf`, "2 pages · updated May 2026", circular download button

---

## Screen 4 — Submissions (frame `4a`)

**Purpose:** A per-project folder collecting every message/request the community submitted ("I would like to see…"). Replaces in-app chat (chat lives in an external program).

- Label `SUBMISSION FOLDER`, heading `RankKit submissions`, subline "Everything the community has asked for, in one place — founders read them all."
- Project switcher pill top-right (28px logo tile + "RankKit" + chevron)
- Filter chips: `All · 6` (active) / New / Considering / Planned / Shipped
- **Submission cards** (full-width rows, white, radius 20, padding `16px 20px`): 38px gradient avatar; author 13px/800 + relative time 11px `#b3aed0`; message 15px/700 `#2d2a45`; optional **founder reply strip** (bg `#f6f4ff`, radius 12, 12.5px/700 `#6c5ce7`, e.g. `Maya (founder): "On the list — pairing it with the next table update."`). Right column: **upvote pill** (chevron-up + count; filled `#6c5ce7`/white when the viewer upvoted, otherwise `#eef0ff`/`#6c5ce7`) above a **status chip**: `NEW` (`#eef0ff`/`#6c5ce7`), `CONSIDERING` (`#fef3d7`/`#b45309`), `PLANNED` (`#e7f8ef`/`#1d9d6b`), `SHIPPED` (`#dff7f5`/`#0a9490`)
- Sample content: keyboard shortcuts (▲12, Considering, replied), dark mode (▲23, Shipped, replied), weekly digest (▲8, Planned), CSV export (▲6, New), rank sparklines (▲15, Considering), public API (▲4, New)
- **Rail (340px)**: `ADD A SUBMISSION` card — 96px faux-textarea (bg `#f7f6fd`, border `1.5px #e8e5f4`, placeholder "I would like to see…"), **Submit to the folder** primary button, microcopy "Founders read every submission and set a status."

---

## Screen 5 — Stage (frame `5a`)

**Purpose:** Founders request a spot to pitch live on the community stream (Shark-Tank-style Q&A). These pages only cover discovery + request + lineup; the live/stream mechanics already exist elsewhere on the site.

- Label `LIVE SHOWCASE`, heading `Pitch on stream`, subline "Demo your project live on the garden stream — the hosts and the chat ask you questions."
- **Next-stream hero card**: 80px date tile (`#eef0ff`: JUL / 9 / THU), "Community pitch night #14" 22px/900, host avatar stack + "Hosted by keepers Ines & Tom · 7:00 PM CET · streamed live to the garden", `3 pitch spots left` amber chip, `Remind me` lavender button
- **Two-column grid** (1fr 1fr, gap 16):
  - **REQUEST A SPOT** card: field microlabels (10px/800, ls 0.16em, `#b3aed0`): `YOUR PROJECT` → selected row (bg `#f6f4ff`, border `1.5px #ddd8f8`, 38px logo, name + "Flowering · 80% health", purple check circle); `WHAT WILL YOU DEMO?` → 88px faux-textarea; `PITCH LENGTH` → chips 3 min (active) / 5 min / 8 min; note "After the demo, the hosts and the chat ask questions — friendly Shark Tank rules."; **Request my spot** primary button; microcopy "A keeper confirms your spot by DM before Thursday."
  - **THU JUL 9 · LINEUP** card: rows [time pill `7:05` | 34px logo | name + "Ana Reyes · 5 min" | status chip]. PixelPay CONFIRMED, Looply CONFIRMED, Quilljar WAITLIST, RankKit (viewer's own request, row highlighted bg `#f6f4ff` border `#ddd8f8`, subtitle "Your request · 3 min") PENDING. Footer: "Hosts pick four pitches per stream — replays land on the project's garden page."

---

## Interactions & Behavior
- **Hover**: primary buttons darken `#6c5ce7 → #5b4bd6` (dark mode lightens → `#7d6ef0`); lavender buttons `#eef0ff → #e2e5ff`. Transitions ~150ms ease.
- **Water**: clicking Water increments waters, bumps health bar (animate width ~300ms ease-out), could emit floating droplet/particle micro-animation. Rate-limit per user/day (design shows streak chip).
- **Backdrop upload** (Garden): founder-only; accepts image; rendered `object-fit: cover` behind the veil gradients. Cards stay glass (backdrop-blur) so the screenshot shows through.
- **Milestones**: server-driven progression; current node glows amber.
- **Dock carousel**: horizontal scroll/arrows through the community's plants; clicking a thumb navigates to that project's Garden page (active = current project).
- **Directory filters** and **submission filters**: client-side filter chips, single-select.
- **Approve flow**: keepers see PENDING banner/rows; "Review & approve" opens the review; approved projects get the keeper chip.
- **Submissions**: composer creates a submission (status NEW); upvote toggles (filled state when voted); founders set status + optional reply.
- **Quests**: completing quest N unlocks N+1; locked cards non-interactive. Course chip opens lesson player; PDF chip/download fetches the file. XP accrues to the profile.
- **Stage**: submitting the form creates a request → appears in lineup as PENDING (highlighted); keeper flips to CONFIRMED/WAITLIST. "Remind me" subscribes to a notification.
- **Dark mode** (frame `1b`): same layout/gradient header; swap surface/text/glass tokens listed above. Plant/stage glow is brighter in dark.

## State Management
Suggested entities:
- `Project { id, name, logoUrl, logoShape, founders: [{name, handle, avatar}], stage: 1–8 | 'wilted' | 'regrowth', health: 0–100, waters, streakDays, level, xp, quote, plantedAt, backdropUrl, approval: 'pending'|'approved', approvedBy }`
- `Submission { id, projectId, author, text, upvotes, viewerUpvoted, status: 'new'|'considering'|'planned'|'shipped', founderReply?, createdAt }`
- `Quest { id, order, title, description, courseUrl, courseMinutes, pdfName, pdfUrl, xp, state: 'done'|'active'|'locked', lessonProgress }`
- `StreamEvent { id, number, date, hosts, spotsLeft, lineup: [{projectId, timeSlot, minutes, status: 'confirmed'|'waitlist'|'pending'}] }`
- `Activity { id, actor, verb, targetProject, createdAt }`
- UI state: active nav route, directory filter, submissions filter, selected project (submissions/stage), theme (light/dark), particles on/off.

## Design Tokens

### Colors
| Token | Value |
|---|---|
| Purple (primary) | `#6c5ce7` (hover dark `#5b4bd6`, hover light `#7d6ef0`) |
| Indigo | `#4834d4` |
| Teal | `#00cec9` |
| Lavender tint (active pill, chips) | `#eef0ff` |
| Lavender wash (highlights, replies) | `#f6f4ff` (border `#ddd8f8`) |
| Amber | `#fbbf24` / deep `#f59e0b` / light `#ffd166` |
| Amber tint / text | `#fef3d7` / `#b45309` (banner border `#fcd34d`, card border `#fde68a`) |
| Green (leaves) | `#3ecf8e`, `#2eb872` (strokes `#27a06b`, `#219660`) |
| Emerald tint / text | `#e7f8ef` / `#1d9d6b` |
| Teal tint / text (SHIPPED) | `#dff7f5` / `#0a9490` |
| Ink | `#2d2a45`; body `#4a4664`; secondary `#6b6689`; muted `#a29bce`; faint `#b3aed0` |
| Light bg / card / hairline / border | `#faf8f4` / `#ffffff` / `#f0eef9` / `#e8e5f4` |
| Soil | `#8a6248` / `#a57c58`; wilted plant `#a07850`/`#c39a6b`; scarred stem `#9a94ae` |
| Dark bg / sidebar / card | `#14111f` / `#191527` / `#201b31`, hairline `rgba(255,255,255,0.08)` |
| Dark text / nav / active / chip text / label | `#f2efff` / `#9d96c0` / `#b9aefc` / `#c4bbff` / `#7d76a3` |
| Header gradient | `linear-gradient(90deg,#6c5ce7 0%,#4834d4 50%,#00cec9 100%)` |
| XP/health fill | `linear-gradient(90deg,#6c5ce7,#00cec9)` |

### Glass (matte, purple-tinted)
- Light card: `background: linear-gradient(160deg, rgba(255,255,255,0.44), rgba(120,102,240,0.16)); backdrop-filter: blur(22px) saturate(1.35); border: 1.5px solid rgba(255,255,255,0.8)`
- Light dock: `rgba(255,255,255,0.5)`, blur(20px), border `rgba(255,255,255,0.75)`
- Dark card: `linear-gradient(160deg, rgba(139,124,247,0.2), rgba(32,27,49,0.36))`, blur(22px), border `rgba(255,255,255,0.16)`
- Dark dock: `rgba(32,27,49,0.55)`, blur(20px), border `rgba(255,255,255,0.14)`

### Typography
- Family: **Nunito** (Google Fonts), weights 400/600/700/800/900. Extra-bold everywhere; friendly rounded sans.
- Scale: hero 78/900; page h1 52/900 (ls −0.02em); card title 20–22/900; quest/row title 21/900; body 14–15/600–700; chips 12–13/800; timestamps 11/700–800; micro section labels 11–12/800 with **letter-spacing 0.2–0.24em, uppercase**; field microlabels 10/800 ls 0.16em
- Line-height: headings 1.05; body 1.4–1.45

### Spacing & radius
- Radii: 999 (pills/avatars/bars), 28 (screen frame), 24 (cards), 20–22 (rows/tiles/logo squircles), 16–18 (buttons/inputs/small tiles), 14 (header icon tiles), 12 (reply strips)
- Common paddings: cards 20–24; rows 16×20; nav pills 12×18; chips 7×12–13; page gutters 40–44 top, 56–64 sides
- Gaps: card grids 14–16; lists 10–11; nav 6

### Shadows
- Card: `0 10px 28px rgba(108,92,231,0.08)`; elevated card `0 16px 40px rgba(108,92,231,0.12–0.18)`
- Primary button: `0 10px 24px rgba(108,92,231,0.4)`
- Amber emphasis: `0 16px 40px rgba(251,191,36,0.18)`; amber node glow `0 0 0 7px rgba(251,191,36,0.22), 0 0 24px rgba(251,191,36,0.6)`
- Dark surfaces: `0 16px 40px rgba(0,0,0,0.45)`
- Screen frame: `0 30px 80px rgba(45,42,69,0.18)`

## Assets
- **No raster assets.** Everything is inline SVG drawn in the prototype: the hero plant (thick round strokes, gradient stem), 8 mini plant growth stages + wilted + regrowth variants, the pot mascot with watering can, and all icons (19px, stroke 2.2, round caps: home, sprout, flag, video camera, folder, gear, bell, trophy, search, water drop, flame, star, play, document, download, lock, check, chevrons, send, sparkle). Recreate as an icon set or map to the codebase's icon library keeping the rounded 2.2px-stroke look.
- **Project logos** are user-uploaded images (fallback: gradient monogram tiles as shown). **Garden backdrop** is a user-uploaded screenshot.
- Font: Nunito via Google Fonts.

## Files
- `Sproutly Garden.dc.html` — the full design canvas (open in a browser; pan/zoom). Frames top-to-bottom/newest-first: `5a` Stage, `4a` Submissions, `3a` Quests, `2a` All Projects (current), `1a`/`1b` Garden light/dark, `1c` legacy directory (superseded).
- `image-slot.js` — drag-and-drop image placeholder used for the Garden backdrop in the prototype (reference only; implement as a normal upload + `object-fit: cover` layer in production).
