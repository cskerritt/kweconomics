# Design Spec: kweconomics.com Improvements

**Date:** 2026-06-02
**Repo:** cskerritt/kweconomics (local copy: `Documents/New project/kweconomics`)
**Brand (canonical):** Kincaid Wolstein Economics
**Working branch:** to be created off `main` (e.g., `site-improvements-2026-06`)

## Goal

A multi-part improvement pass on the live kweconomics.com site:
1. Fix audit issues (brand consistency, wrong geo coordinates, duplicate testimonials).
2. Add a **Meet the Team** page and move the principal bio off the homepage.
3. Add **four interactive financial calculators** with live charts and email lead-capture.

The live site is built from this repo, so all contact values stay as-is (they already match production). No backend exists; the site is a static Vite + React + TypeScript + shadcn/Tailwind SPA with prerendering.

---

## Decisions (locked)

| Topic | Decision |
|-------|----------|
| Brand name | Keep **Kincaid Wolstein Economics**; normalize stray "KW Economics" text → "Kincaid Wolstein Economics". Logo *filename* unchanged. |
| Contact info | Unchanged — matches live: phone **(201) 343-0700**, email **chris@kweconomics.com**, address **1 University Plaza Dr, Hackensack, NJ 07601**, hours **Mon–Fri 8AM–6PM EST**. |
| Geo coordinates | **Fix bug**: `41.9211, −71.5253` (in MA) → Hackensack `40.8859, −74.0435`. |
| Duplicate testimonials | Remove `<Testimonials/>` from homepage; keep `<TestimonialsSection/>`. |
| Homepage bio | Replace big `<About/>` section with a compact **TeamTeaser** (2 cards) linking to `/team`. |
| Calculators | Build all 4: Present Value, Lost Earnings, Life Care Plan, Household Services. |
| Calculator posture | Open + live results; **email-gated "send me a copy / request review"** capture via Formspree. |
| Lead pipeline | Reuse existing **Formspree** endpoint (`formspree.io/f/mnnvgzgd`). No jspdf, no EmailJS. User copy delivered via Formspree autoresponse (dashboard config). |
| PDF dependency | **Not added.** Decision: email/Formspree path instead. |

---

## 1. Audit Fixes

### 1.1 Brand consistency
- Replace the 9 "KW Economics" textual references with "Kincaid Wolstein Economics".
- Update logo `alt` text (`Header.tsx`) "KW Economics Logo" → "Kincaid Wolstein Economics Logo".
- Leave asset filenames (`kw-economics-logo.png`, `kw-logo.png`) untouched.

### 1.2 Geo coordinate fix
Files: `src/pages/Index.tsx`, `src/components/GlobalSchemaMarkup.tsx`, `src/components/LocalSEOEnhanced.tsx`, `src/components/RichSnippets.tsx`.
Change `latitude "41.9211"` → `"40.8859"` and `longitude "-71.5253"` → `"-74.0435"` everywhere they appear.

### 1.3 Remove duplicate testimonials
In `src/pages/Index.tsx`, remove the `<Testimonials />` render and its import (line ~15, ~143). Keep `<TestimonialsSection />`.

### 1.4 (Minor, optional) EmailJS env bug
`formHandler.ts` `getEmailServiceConfig()` reads `process.env.VITE_*` which is undefined in Vite (needs `import.meta.env.VITE_*`). The path is unused (Formspree is live), so this is noted but not required for this work.

---

## 2. Meet the Team Page

### 2.1 Data model — `src/data/team.ts`
Single source of truth consumed by both the page and the homepage teaser.

```ts
export interface TeamMember {
  slug: string;
  name: string;
  title: string;
  photo: string;          // imported asset or /lovable-uploads path
  credentials: string[];  // shown as a list
  bio: string;            // full paragraph(s)
  shortBio: string;       // 1–2 sentences for the teaser card
  links?: { label: string; href: string }[];
}
export const teamMembers: TeamMember[];
```

**Members:**

1. **Christopher Skerritt, M.Ed., MBA** — *Principal Economist*
   - Photo: `/lovable-uploads/abec9830-380f-469f-9ee8-f9c7278c3372.png` (existing).
   - Credentials/bio: migrated verbatim from the current homepage `About.tsx` (CRC, LRC, FVE, CVE, CLCP, ABVE/F, AREA President 2025–2026, etc.).

2. **Zachary Sperling** — *Economic Associate*
   - Photo: `src/assets/zach-sperling.jpg` (**user to drop file in**; until present, page uses a neutral placeholder avatar so the build never breaks).
   - Bio (final, provided by user):
     > Zachary Sperling is a financial professional specializing in Public Policy, Social Advocacy, and Forensic Economics. With double majors in Economics and Criminology from The College of New Jersey, Zachary spent 3 years reintegrating formerly incarcerated individuals back into society via court advocacy, community planning, and background-friendly vocational training. Zachary is utilizing his experience with disenfranchised populations, legal proceedings, and economic knowledge to assist Kincaid Wolstein's Economic Department as an Economic Associate.
   - Credentials: B.A. Economics & B.A. Criminology, The College of New Jersey.

### 2.2 Page — `src/pages/Team.tsx` at route `/team`
- `Header` + `Footer`, `SEOHead` (title "Meet the Team | Kincaid Wolstein Economics").
- Intro heading + one detailed card per member (photo, name, title, credentials list, full bio, links).
- `Person` schema (JSON-LD) for each member, plus `employee` linkage to the org schema.

### 2.3 Homepage teaser — `src/components/TeamTeaser.tsx`
- Two compact cards (photo, name, title, `shortBio`) + "Meet the team →" link to `/team`.
- In `src/pages/Index.tsx`, **replace** `<About />` with `<TeamTeaser />` (remove the `About` import).
- The `/about` page (`pages/About.tsx`, "Our Expertise") stays as-is.

### 2.4 Navigation, footer, sitemap
- Add **Meet the Team** to the Header "About" dropdown and the mobile menu.
- Add a Team link to `Footer.tsx`.
- Add `/team` to `generate-sitemap.mjs` static routes.

---

## 3. Calculators

### 3.1 Shared finance library — `src/lib/finance.ts`
Pure, dependency-free, unit-tested functions:
- `presentValue({ payment, years, discountRate, growthRate, timing })` → total PV.
- `pvSchedule(...)` → per-year array `{ year, nominal, discounted, cumulativePV }` for charting.
- `lostEarningsPV({ annualEarnings, currentAge, retirementAge, wageGrowth, discountRate, fringePct })`.
- `lifeCarePV({ annualCost, medicalInflation, years, discountRate })`.
- `householdServicesPV({ hoursPerWeek, hourlyWage, years, growthRate, discountRate })`.

All higher-level functions compose `pvSchedule`. Rates accepted as percentages (e.g., `3` = 3%) and normalized internally.

### 3.2 Testing — add Vitest
- Add `vitest` (devDependency) + `"test": "vitest run"` script.
- `src/lib/finance.test.ts` covers: zero discount = sum of nominal; known annuity PV closed-form check; growth = discount edge case; retirement age ≤ current age yields 0; timing begin vs end differs by one period factor.

### 3.3 Shared UI — `src/components/calculators/`
- `CalculatorLayout.tsx` — heading, disclaimer banner, two-column grid (controls left, results+chart right), CTA, lead-capture trigger.
- `SliderField.tsx` — labeled shadcn `Slider` + synced numeric `Input` (typing and dragging stay in sync), with min/max/step/unit.
- `ResultsPanel.tsx` — formatted total PV + key sub-figures (currency formatting).
- `PVChart.tsx` — Recharts (existing dep): bars for nominal vs discounted per year + a cumulative-PV line; responsive.
- `LeadCaptureDialog.tsx` — name + email form; on submit POSTs to Formspree with calculator name, all inputs, and computed results; success toast. Reuses validation helpers from `formHandler.ts`.

### 3.4 Calculator pages — `src/pages/calculators/`
Each composes `CalculatorLayout` + `SliderField`s + `PVChart` + `ResultsPanel`, with its own disclaimer copy and a "Schedule a consultation" CTA.

| Calculator | Route | Inputs |
|-----------|-------|--------|
| Present Value | `/calculators/present-value` | payment, years/units, discount rate, growth rate, timing (begin/end) |
| Lost Earnings | `/calculators/lost-earnings` | annual earnings, current age, retirement age, wage growth, discount rate, fringe % |
| Life Care Plan | `/calculators/life-care` | annual cost, medical inflation, years, discount rate |
| Household Services | `/calculators/household-services` | hours/week, hourly replacement wage, years, growth rate, discount rate |

Plus a hub page **`/calculators`** (`src/pages/calculators/CalculatorsHub.tsx`) with a card linking to each, intro copy, and the global disclaimer.

### 3.5 Disclaimer (every calculator + hub)
> These calculators provide simplified, illustrative estimates for educational purposes only. They are **not** a substitute for a formal forensic economic analysis and should not be relied upon for litigation. Contact Kincaid Wolstein Economics for a case-specific evaluation.

### 3.6 Routing (CRITICAL ordering)
In `src/App.tsx`, register calculator routes **above** the greedy catch-alls (`/:stateSlug/:citySlug`, `/:stateSlug`, `/:slug`, and legacy `/tools/*`). Lazy-load each page like the existing routes.

```tsx
<Route path="/calculators" element={<CalculatorsHub />} />
<Route path="/calculators/present-value" element={<PresentValueCalculator />} />
<Route path="/calculators/lost-earnings" element={<LostEarningsCalculator />} />
<Route path="/calculators/life-care" element={<LifeCareCalculator />} />
<Route path="/calculators/household-services" element={<HouseholdServicesCalculator />} />
```
(Placed immediately after the existing static routes block, before the Service+Location and location catch-all routes.)

### 3.7 Navigation & sitemap
- Add a **Calculators** group/link to the Header "Services" dropdown + mobile menu.
- Add the 5 calculator routes to `generate-sitemap.mjs`.

### 3.8 Lead capture flow
1. User adjusts sliders → results + chart update live (no gating on viewing).
2. "Email me a copy / Request a professional review" → `LeadCaptureDialog`.
3. On submit: POST to `https://formspree.io/f/mnnvgzgd` with `{ formType: 'calculator-<slug>', name, email, inputs, results, submittedAt }`.
4. Chris receives the lead with the user's scenario. (Optional, no code: enable Formspree autoresponse so the user also receives a copy.)

---

## 4. Build Order (phases)

**Phase 1 — Audit fixes** (brand, geo, duplicate testimonials). Small, safe, independently shippable.

**Phase 2 — Meet the Team** (`team.ts`, `Team.tsx`, `TeamTeaser.tsx`, homepage swap, nav/footer/sitemap, Person schema). Independently shippable.

**Phase 3 — Calculators** (Vitest + `finance.ts` + tests → shared calculator UI → 4 pages + hub → routing → lead capture → nav/sitemap). Largest; build finance lib test-first.

Each phase: `npm run build` must pass; verify locally before commit. Push branch and open a PR per the user's chosen workflow.

---

## Out of scope (not doing)
- Changing any contact values (they match live).
- Renaming the brand to "Skerritt Economic Consulting".
- Adding a real backend / database.
- jspdf or other PDF generation.
- Unrelated refactors of the location-page system.

## Open items / dependencies
- **Zach's photo file** must be saved to `src/assets/zach-sperling.jpg` (placeholder avatar used until then).
- (Optional) Enable Formspree autoresponse to deliver result copies to users.
