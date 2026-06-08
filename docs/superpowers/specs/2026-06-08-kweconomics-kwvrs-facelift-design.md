# KWEconomics → KWVRS Visual Facelift — Design

**Date:** 2026-06-08
**Repo:** `github.com/cskerritt/kweconomics` (deploys via Railway)
**Local working copy:** `~/Documents/New project/KWEconomics`
**Branch base:** current local `main` (18 commits ahead of `origin/main`; the facelift rides on top of that unpushed work — team page, calculators, audit fixes)

## Goal

Make KWEconomics look and feel like the current KWVRS site, using KWEconomics's
gold accent. This is a **visual facelift only** — no content rewrites, no
routing/structure changes, no business-logic changes.

## Context & key findings

There are two separate KWEconomics codebases. We are targeting the **GitHub /
Railway** one (the actively-developed, live path), NOT the legacy tagonline SSH
server (`v0.kweconomics.com`, GitLab), whose navy+gold "Trusted Expert" look and
CLAUDE.md SSH workflow are stale and out of scope.

The GitHub/Railway repo is currently:
- **Blue** palette (shadcn HSL tokens, primary `201 78% 40%`, `--navy` aliased to
  the same blue), with a `.dark` mode block.
- **Default sans** typography (no Source Serif 4 / Inter / JetBrains Mono).
- Plain blue-gradient hero (`bg-gradient-hero`), no motion system.
- Tailwind **v3** (`tailwind.config.ts` + `@tailwind base/components/utilities`).

KWVRS, the look we're matching, is:
- Navy `#14223d` (+ `-light #2a3a5c`, `-dark #0c1729`) + warm accent.
- Source Serif 4 (headlines) / Inter (body) / JetBrains Mono (data).
- A plain-CSS motion system: aurora + grid heroes, scroll reveals, staggered
  entrance cascades, hover-lift, scroll-progress bar — all `.js`-gated and
  `prefers-reduced-motion`-aware, so prerendered/no-JS HTML stays fully visible.
- Tailwind **v4** (`@theme` inline) — note: the *token block* is NOT directly
  portable to KWEconomics's v3 setup, but the motion CSS (plain keyframes +
  classes) is fully portable.

Because the GitHub repo has none of the palette, fonts, or motion yet, the
facelift is a **Full KWVRS look** (confirmed with user): recolor + typography +
motion, with the accent set to KWEconomics gold `#C4973B`.

## Scope decisions (confirmed)

| Decision | Choice |
|---|---|
| What to copy | Full KWVRS look (recolor + fonts + motion/heroes) |
| Accent | KWEconomics gold `#C4973B` (not KWVRS amber) |
| Target repo | GitHub / Railway (`cskerritt/kweconomics`) |
| Branch base | Current local `main` (on top of 18 unpushed commits) |
| Execution | Local work + local build/preview, then push to GitHub → Railway auto-deploy |

## Design

### 1. Color system (recolor blue → navy + gold)
Rewrite the HSL tokens in `src/index.css` so the existing shadcn token names keep
working but resolve to navy + gold. Token names are retained for code stability
(every `bg-primary`, `text-navy`, `border-border` keeps compiling).

- `--navy` / `--navy-light` / `--navy-dark` → HSL of `#14223d` / `#2a3a5c` / `#0c1729`.
- Introduce gold tokens: `--gold` = `#C4973B`, plus `--gold-light` and
  `--gold-dark` variants for WCAG (light gold for eyebrows/labels on navy;
  darker gold for text/icons on light backgrounds — KWVRS's contrast lesson:
  no invisible eyebrows, target ≥4.5:1).
- Map shadcn semantic tokens: `--primary` → navy, `--accent`/`--ring` → gold,
  `--background` → warm white (`#FAFAF8`-equivalent HSL), `--foreground` → navy.
- Update `--gradient-hero`, `--gradient-primary`, `--shadow-elegant/soft/card`
  to navy/gold.
- **Dark mode:** the repo ships a `.dark` block. KWVRS has no dark mode. We will
  recolor the `.dark` block to navy/gold for consistency but not invest in it
  (out-of-scope to redesign); ensure it doesn't break. (If a `.dark` toggle is
  never actually triggered, this is cosmetic only.)

### 2. Typography
- Add Google Fonts `<link>`s to `index.html` (Source Serif 4 + Inter +
  JetBrains Mono, matching KWVRS's exact `css2` query, with preconnect/dns-prefetch).
- Add the `.js` class bootstrap to `index.html`:
  `<script>document.documentElement.classList.add('js')</script>` (before paint,
  in `<head>`) so motion hidden-states only apply when JS runs.
- Add `fontFamily` to `tailwind.config.ts`: `serif` → Source Serif 4, `sans` →
  Inter, `mono` → JetBrains Mono. Set body to `font-sans`, headings to
  `font-serif` (via a base layer rule or per-component).

### 3. Motion system (plain CSS, ported from KWVRS `index.css`)
Append to `src/index.css` (these are framework-agnostic, work in Tailwind v3):
- Easings `--kw-spring`, `--kw-ease`.
- Keyframes: `kw-fade-up`, `kw-fade-in`, `kw-aurora-a`, `kw-aurora-b`,
  `kw-shimmer`, `kw-sheen`, `kw-float`.
- Classes: `.kw-page-enter`, `.kw-enter`/`.kw-enter-slow`/`.kw-enter-1..4`,
  `.kw-reveal` (+ `--left`/`--right`/`--scale`), `.kw-lift`, `.kw-float`.
- All hidden-states scoped under `.js`; touch-device and
  `prefers-reduced-motion` guards copied verbatim.
- Accessibility: `:focus-visible` outline (gold) and `.skip-link`.

### 4. Ported components
From KWVRS, dropped into `src/components/` + `src/hooks/`:
- `Reveal.tsx` (+ its `use-reveal` hook) — IntersectionObserver scroll-reveal wrapper.
- `ScrollProgress.tsx` — thin gold scroll-progress bar (recolor amber → gold);
  mount once in `App.tsx`.
- Add `kw-page-enter` to the routed content wrapper in `App.tsx` for per-navigation entrance.

### 5. Heroes (aurora + grid, gold glow)
Apply the KWVRS hero treatment to `Hero.tsx` and the hero blocks of the main
templates: `Services`, `ServiceHubPage`, `Advisory`, `Locations`/`StatePage`/
`LocationServicesPage`, `CaseTypePage`/`CaseTypeIndex`, `Team`, `About`,
`Experience`, `Contact`, `CaseStudies`, `ScheduleConsultation`, and the
calculators hub (`src/pages/calculators/`). (Page set per the local repo's
20 `src/pages` files — there is no KnowledgeHub/Insights/Courts/Metro here;
those exist only on the legacy server build.)
- Navy base, layered aurora blobs (gold + navy-light), subtle grid overlay,
  staggered `.kw-enter` cascade on headline/subhead/CTAs.
- Headlines switch to `font-serif`.

### 6. Reveals & polish
- Wrap section grids (services grid, team teaser, case-study previews, location
  cards, calculators, FAQ) in `Reveal` with small stagger delays.
- Add `.kw-lift` to cards/tiles.
- Tighten color hierarchy; verify eyebrow/label and button contrast ≥4.5:1.

### 7. QA & ship
- `npm run build` (Vite) locally — must pass.
- Run the repo's prerender/sitemap step if present (`generate-sitemap.mjs` /
  any prerender script) so static HTML reflects changes.
- Local preview (`npm run preview` and/or Docker per the "Docker before deploy"
  rule) — spot-check homepage + 3–4 template types, mobile + desktop.
- Contrast spot-check on eyebrows, buttons, hero text.
- Commit on a `facelift/kwvrs-look` branch off local `main`; push to GitHub;
  Railway auto-deploys. (Pushing also carries the 18 prior unpushed commits —
  confirm with user before the push.)

## Out of scope (explicitly)
- Content/copy changes, routing/structure changes, new pages.
- Accent recolor to amber; any change to the KWVRS repo.
- Token migration to Tailwind v4.
- The tagonline SSH/GitLab server build.
- Redesigning dark mode (recolor-to-not-break only).

## Observations flagged (not fixed here)
- The GitHub build contains content that violates the documented KWEconomics
  content rules (stat numbers like "1000+ Cases Analyzed", "15+ Certifications",
  "10+ Years"; "Get Free Case Assessment" advocacy phrasing). These are
  **content**, so out of scope for this visual facelift, but noted for a future
  content pass.

## Risks / notes
- Recoloring via shadcn token remap is low-risk (names unchanged) but every page
  inherits the new palette at once — broad visual blast radius; the QA preview
  pass across template types is the safeguard.
- Dark-mode block must be recolored or neutralized so a stray `.dark` doesn't
  render broken colors.
- The 18 unpushed `main` commits will deploy together with the facelift on first
  push — gate the push on user confirmation.
