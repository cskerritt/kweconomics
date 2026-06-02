# kweconomics.com Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix site audit issues, add a Meet the Team page (moving the principal bio off the homepage), and add four interactive financial calculators with live charts and Formspree lead capture.

**Architecture:** Vite + React 18 + TypeScript SPA with react-router-dom, shadcn/ui (Radix) components, Tailwind, Recharts (already installed), and prerendering. Calculators share one unit-tested pure-math library (`src/lib/finance.ts`) and a config-driven generic page so the four tools are registry entries, not duplicated files. Lead capture reuses the existing Formspree endpoint. No backend.

**Tech Stack:** TypeScript, React, react-router-dom v6, shadcn/ui, Recharts, Vitest (new, for finance lib), Formspree (existing).

---

## Environment note (local installs)

This machine has a TLS-intercepting root CA that breaks `npm` cert validation. When a task says `npm install`, if it fails with `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`, run it as:
```bash
npm install <pkg> --strict-ssl=false
```
On a normal machine the plain command works. The build itself (`npm run build`) needs no network and works normally. Dev server: `npm run dev` (port 8080).

---

## File Structure

**Phase 1 — Audit fixes (modify only):**
- `src/pages/Index.tsx` — geo coords, remove `<Testimonials/>`, swap `<About/>`→`<TeamTeaser/>` (Phase 2).
- `src/components/GlobalSchemaMarkup.tsx`, `src/components/LocalSEOEnhanced.tsx`, `src/components/RichSnippets.tsx` — geo coords.
- `src/components/Header.tsx` — logo alt text + nav additions (Phases 2/3).

**Phase 2 — Meet the Team:**
- Create `src/data/team.ts` — team member data (single source of truth).
- Create `src/components/TeamTeaser.tsx` — homepage 2-card teaser.
- Create `src/pages/Team.tsx` — `/team` page with Person schema.
- Create `src/assets/zach-placeholder.tsx` is NOT needed; placeholder handled via a constant path.
- Modify `src/App.tsx` (route), `src/components/Header.tsx` (nav), `src/components/Footer.tsx` (link), `generate-sitemap.mjs` (sitemap).

**Phase 3 — Calculators:**
- Create `src/lib/finance.ts` + `src/lib/finance.test.ts` — pure PV math + tests.
- Create `vitest.config.ts`; modify `package.json` (test script + vitest dep).
- Create `src/data/calculatorRegistry.ts` — 4 calculator configs + compute fns.
- Create `src/components/calculators/SliderField.tsx`, `PVChart.tsx`, `ResultsPanel.tsx`, `LeadCaptureDialog.tsx`, `CalculatorLayout.tsx`.
- Create `src/pages/calculators/CalculatorPage.tsx` (generic) + `src/pages/calculators/CalculatorsHub.tsx`.
- Modify `src/App.tsx` (routes), `src/components/Header.tsx` (nav), `generate-sitemap.mjs`.

---

# PHASE 1 — Audit Fixes

### Task 1: Fix wrong geo coordinates

**Files:**
- Modify: `src/pages/Index.tsx`
- Modify: `src/components/GlobalSchemaMarkup.tsx`
- Modify: `src/components/LocalSEOEnhanced.tsx`
- Modify: `src/components/RichSnippets.tsx`

- [ ] **Step 1: Replace coordinates in all four files**

In each file, find `"41.9211"` and replace with `"40.8859"`; find `"-71.5253"` and replace with `"-74.0435"`.

Verify with:
```bash
grep -rn "41.9211\|-71.5253" src
```
Expected: no matches.

```bash
grep -rcn "40.8859" src
```
Expected: matches in Index.tsx, GlobalSchemaMarkup.tsx, LocalSEOEnhanced.tsx, RichSnippets.tsx.

- [ ] **Step 2: Commit**
```bash
git add src/pages/Index.tsx src/components/GlobalSchemaMarkup.tsx src/components/LocalSEOEnhanced.tsx src/components/RichSnippets.tsx
git commit -m "fix: correct geo coordinates to Hackensack, NJ"
```

---

### Task 2: Brand consistency (KW Economics → Kincaid Wolstein Economics)

**Files:**
- Modify: multiple under `src/` (text occurrences of "KW Economics")

- [ ] **Step 1: List the occurrences**
```bash
grep -rn "KW Economics" src
```
Note each. Do NOT touch asset filenames (`kw-economics-logo.png`, `kw-logo.png`) or import identifiers (e.g. `kwEconomicsLogo`).

- [ ] **Step 2: Replace human-readable text only**

For each occurrence that is display text or schema `alternateName`/`alt`, change "KW Economics" → "Kincaid Wolstein Economics". Specifically in `src/components/Header.tsx` change `alt="KW Economics Logo"` → `alt="Kincaid Wolstein Economics Logo"`.

For `src/pages/Index.tsx` structured data `"alternateName": ["KW Economics"]` — leave the `alternateName` array as-is (an alternate name is legitimately allowed to differ); only normalize prose/visible text. If unsure, prefer leaving schema `alternateName` and changing only visible UI text and `alt` attributes.

- [ ] **Step 3: Verify build**
```bash
npm run build
```
Expected: `✓ built` with no TypeScript errors.

- [ ] **Step 4: Commit**
```bash
git add -A
git commit -m "chore: normalize brand text to Kincaid Wolstein Economics"
```

---

### Task 3: Remove duplicate testimonials section

**Files:**
- Modify: `src/pages/Index.tsx`

- [ ] **Step 1: Remove the import and render of `Testimonials`**

In `src/pages/Index.tsx`, delete the line:
```tsx
import Testimonials from "@/components/Testimonials";
```
and delete the `<Testimonials />` line in the JSX (the one rendered immediately before `<TestimonialsSection />`). Keep `TestimonialsSection`.

- [ ] **Step 2: Verify build**
```bash
npm run build
```
Expected: `✓ built`, no "Testimonials is not defined" or unused-import errors.

- [ ] **Step 3: Commit**
```bash
git add src/pages/Index.tsx
git commit -m "chore: remove duplicate testimonials section from homepage"
```

---

# PHASE 2 — Meet the Team

### Task 4: Create team data module

**Files:**
- Create: `src/data/team.ts`

- [ ] **Step 1: Write `src/data/team.ts`**
```ts
export interface TeamMember {
  slug: string;
  name: string;
  title: string;
  photo: string;          // public path or imported asset URL
  hasPhoto: boolean;      // false → render initials placeholder
  credentials: string[];
  bio: string;
  shortBio: string;
  links?: { label: string; href: string }[];
}

export const teamMembers: TeamMember[] = [
  {
    slug: "christopher-skerritt",
    name: "Christopher Skerritt, M.Ed., MBA",
    title: "Principal Economist",
    photo: "/lovable-uploads/abec9830-380f-469f-9ee8-f9c7278c3372.png",
    hasPhoto: true,
    credentials: [
      "Master of Business Administration – Healthcare Leadership, Bryant University (2024)",
      "Master of Education in Rehabilitation Counseling, Springfield College (2016)",
      "Certified Rehabilitation Counselor (CRC)",
      "Licensed Rehabilitation Counselor (LRC)",
      "Fellow of Vocational Experts (FVE)",
      "Certified Life Care Planner (CLCP)",
      "Fellow of the American Board of Vocational Experts (ABVE/F)",
      "Certified Vocational Evaluator (CVE)",
      "President, American Rehabilitation Economics Association (2025–2026)",
    ],
    bio: "Principal Economist specializing in forensic economic analysis, vocational rehabilitation, and life care planning. With extensive credentials including CRC, LRC, FVE, CVE, CLCP, and ABVE/F, Christopher provides economic loss assessments, business valuation, and disability evaluation, and has provided expert testimony in matters nationwide.",
    shortBio: "Principal Economist specializing in forensic economics, vocational rehabilitation, and life care planning.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/christopherskerritt" },
    ],
  },
  {
    slug: "zachary-sperling",
    name: "Zachary Sperling",
    title: "Economic Associate",
    photo: "/lovable-uploads/zach-sperling.jpg",
    hasPhoto: false,
    credentials: [
      "B.A. Economics, The College of New Jersey",
      "B.A. Criminology, The College of New Jersey",
    ],
    bio: "Zachary Sperling is a financial professional specializing in Public Policy, Social Advocacy, and Forensic Economics. With double majors in Economics and Criminology from The College of New Jersey, Zachary spent 3 years reintegrating formerly incarcerated individuals back into society via court advocacy, community planning, and background-friendly vocational training. Zachary is utilizing his experience with disenfranchised populations, legal proceedings, and economic knowledge to assist Kincaid Wolstein's Economic Department as an Economic Associate.",
    shortBio: "Economic Associate specializing in public policy, social advocacy, and forensic economics.",
  },
];

export function getInitials(name: string): string {
  return name
    .replace(/,.*$/, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}
```

> Note: `hasPhoto: false` for Zach until the file is added. When the photo file is saved to `public/lovable-uploads/zach-sperling.jpg`, flip `hasPhoto` to `true`.

- [ ] **Step 2: Verify build**
```bash
npm run build
```
Expected: `✓ built`.

- [ ] **Step 3: Commit**
```bash
git add src/data/team.ts
git commit -m "feat: add team data module"
```

---

### Task 5: Homepage team teaser (replace About section)

**Files:**
- Create: `src/components/TeamTeaser.tsx`
- Modify: `src/pages/Index.tsx`

- [ ] **Step 1: Write `src/components/TeamTeaser.tsx`**
```tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users2 } from "lucide-react";
import { teamMembers, getInitials } from "@/data/team";

const TeamTeaser = () => (
  <section id="team" className="py-20 bg-background">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-4">Meet the Team</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experienced economists providing trusted forensic analysis and expert testimony.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {teamMembers.map((m) => (
          <Card key={m.slug} className="p-8 shadow-card border-0 bg-gradient-subtle text-center">
            {m.hasPhoto ? (
              <img
                src={m.photo}
                alt={m.name}
                className="w-28 h-28 object-cover object-top rounded-full mx-auto mb-4 shadow-soft"
              />
            ) : (
              <div className="w-28 h-28 rounded-full mx-auto mb-4 bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold">
                {getInitials(m.name)}
              </div>
            )}
            <h3 className="text-xl font-semibold text-foreground">{m.name}</h3>
            <p className="text-primary font-medium mb-3">{m.title}</p>
            <p className="text-muted-foreground text-sm">{m.shortBio}</p>
          </Card>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to="/team">
          <Button variant="professional" size="lg" className="group">
            <Users2 className="h-5 w-5 mr-2" />
            Meet the Team
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

export default TeamTeaser;
```

- [ ] **Step 2: Swap into `src/pages/Index.tsx`**

Replace the import `import About from "@/components/About";` with `import TeamTeaser from "@/components/TeamTeaser";`. In the JSX, replace `<About />` with `<TeamTeaser />`.

- [ ] **Step 3: Verify build + dev**
```bash
npm run build
```
Expected: `✓ built`. Then `npm run dev`, open http://localhost:8080/, confirm the homepage shows the two-card team teaser where the long bio used to be, and "Meet the Team" links to `/team`.

- [ ] **Step 4: Commit**
```bash
git add src/components/TeamTeaser.tsx src/pages/Index.tsx
git commit -m "feat: replace homepage bio with team teaser"
```

---

### Task 6: Meet the Team page + route + Person schema

**Files:**
- Create: `src/pages/Team.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Write `src/pages/Team.tsx`**
```tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Mail } from "lucide-react";
import { teamMembers, getInitials } from "@/data/team";

const Team = () => {
  const personSchema = teamMembers.map((m) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: m.name.replace(/,.*$/, ""),
    jobTitle: m.title,
    worksFor: { "@type": "Organization", name: "Kincaid Wolstein Economics" },
    description: m.shortBio,
  }));

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Meet the Team | Kincaid Wolstein Economics"
        description="Meet the economists of Kincaid Wolstein Economics — forensic economic analysis, vocational rehabilitation, and life care planning expertise."
        canonical="https://kweconomics.com/team"
        schema={personSchema}
      />
      <Header />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Meet the Team</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experienced economists delivering trusted forensic analysis and expert testimony.
            </p>
          </div>

          <div className="space-y-12 max-w-5xl mx-auto">
            {teamMembers.map((m) => (
              <Card key={m.slug} id={m.slug} className="p-8 shadow-card border-0 bg-card">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1 flex flex-col items-center text-center">
                    {m.hasPhoto ? (
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-48 h-48 object-cover object-top rounded-lg shadow-card mb-4"
                      />
                    ) : (
                      <div className="w-48 h-48 rounded-lg shadow-card mb-4 bg-primary/10 text-primary flex items-center justify-center text-5xl font-bold">
                        {getInitials(m.name)}
                      </div>
                    )}
                    <h2 className="text-2xl font-bold text-foreground">{m.name}</h2>
                    <p className="text-primary font-medium">{m.title}</p>
                    {m.links?.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors mt-2"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>

                  <div className="lg:col-span-2">
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">{m.bio}</p>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Credentials</h3>
                    <div className="space-y-2 mb-6">
                      {m.credentials.map((c) => (
                        <div key={c} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{c}</span>
                        </div>
                      ))}
                    </div>
                    <a
                      href="mailto:chris@kweconomics.com"
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      <Mail className="h-4 w-4 mr-2" /> Contact our team
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Team;
```

> Note: `SEOHead`'s `schema` prop accepts an object or array (it JSON-stringifies whatever is passed). If TypeScript complains about the array type, cast as `schema={personSchema as unknown as object}`.

- [ ] **Step 2: Register the route in `src/App.tsx`**

Add the lazy import near the other lazy imports:
```tsx
const Team = lazy(() => import("./pages/Team"));
```
Add the route inside the static-routes block (e.g., right after the `/about` route, well above the `/:slug` and `/:stateSlug` catch-alls):
```tsx
<Route path="/team" element={<Team />} />
```

- [ ] **Step 3: Verify build + dev**
```bash
npm run build
```
Expected: `✓ built`. Then `npm run dev` and open http://localhost:8080/team — both members render; Zach shows an initials placeholder.

- [ ] **Step 4: Commit**
```bash
git add src/pages/Team.tsx src/App.tsx
git commit -m "feat: add Meet the Team page at /team"
```

---

### Task 7: Team link in nav, footer, and sitemap

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `generate-sitemap.mjs`

- [ ] **Step 1: Add to Header "About" dropdown**

In `src/components/Header.tsx`, inside the About `DropdownMenuContent`, add a new item after the "Our Expertise" item:
```tsx
<DropdownMenuItem asChild>
  <Link to="/team" className="flex items-center gap-2 cursor-pointer">
    <Users className="h-4 w-4" />
    <span>Meet the Team</span>
  </Link>
</DropdownMenuItem>
```
(`Users` is already imported in Header.tsx.)

Also add to the mobile menu nav (after the `/about` mobile link):
```tsx
<Link
  to="/team"
  className="text-foreground hover:text-primary transition-colors"
  onClick={() => setIsMenuOpen(false)}
>
  Meet the Team
</Link>
```

- [ ] **Step 2: Add to Footer**

In `src/components/Footer.tsx`, find the company/links list and add a `<Link to="/team">Meet the Team</Link>` consistent with the existing footer link markup (match the surrounding link styling exactly).

- [ ] **Step 3: Add to sitemap**

In `generate-sitemap.mjs`, add to the `staticPages` array:
```js
{ path: '/team', priority: 0.8, changefreq: 'monthly' },
```

- [ ] **Step 4: Verify**
```bash
npm run build
node generate-sitemap.mjs
grep -c "/team" public/sitemap.xml
```
Expected: build passes; sitemap contains `https://kweconomics.com/team`.

- [ ] **Step 5: Commit**
```bash
git add src/components/Header.tsx src/components/Footer.tsx generate-sitemap.mjs public/sitemap.xml
git commit -m "feat: link Meet the Team in nav, footer, and sitemap"
```

---

# PHASE 3 — Calculators

### Task 8: Add Vitest + finance library (TDD)

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json`
- Create: `src/lib/finance.ts`
- Test: `src/lib/finance.test.ts`

- [ ] **Step 1: Install Vitest**
```bash
npm install -D vitest --strict-ssl=false
```
Expected: vitest added to devDependencies.

- [ ] **Step 2: Create `vitest.config.ts`**
```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  test: { environment: "node", include: ["src/**/*.test.ts"] },
});
```

- [ ] **Step 3: Add test script to `package.json`**

In the `"scripts"` block add:
```json
"test": "vitest run",
```

- [ ] **Step 4: Write the failing test `src/lib/finance.test.ts`**
```ts
import { describe, it, expect } from "vitest";
import {
  pvSchedule,
  presentValue,
  lostEarningsPV,
  lifeCarePV,
  householdServicesPV,
} from "./finance";

describe("pvSchedule / presentValue", () => {
  it("equals sum of payments when discount and growth are zero", () => {
    expect(presentValue({ payment: 100, years: 3, discountRate: 0, growthRate: 0 })).toBeCloseTo(300, 6);
  });

  it("matches closed-form ordinary annuity (end-of-year)", () => {
    // 100/1.1 + 100/1.21 + 100/1.331 = 248.6852...
    expect(presentValue({ payment: 100, years: 3, discountRate: 10, growthRate: 0, timing: "end" }))
      .toBeCloseTo(248.6852, 3);
  });

  it("begin-of-year PV is higher than end-of-year", () => {
    const end = presentValue({ payment: 100, years: 3, discountRate: 10, timing: "end" });
    const begin = presentValue({ payment: 100, years: 3, discountRate: 10, timing: "begin" });
    expect(begin).toBeGreaterThan(end);
  });

  it("growth equal to discount yields years * payment/(1+r) end-of-year", () => {
    // r = g = 5%, payment 100, 3 years => 3 * 100/1.05 = 285.714...
    expect(presentValue({ payment: 100, years: 3, discountRate: 5, growthRate: 5, timing: "end" }))
      .toBeCloseTo(285.7143, 3);
  });

  it("schedule cumulativePV increases monotonically", () => {
    const rows = pvSchedule({ payment: 100, years: 4, discountRate: 3, growthRate: 2 });
    for (let i = 1; i < rows.length; i++) {
      expect(rows[i].cumulativePV).toBeGreaterThan(rows[i - 1].cumulativePV);
    }
  });
});

describe("lostEarningsPV", () => {
  it("returns 0 when retirement age is at or below current age", () => {
    expect(lostEarningsPV({ annualEarnings: 50000, currentAge: 65, retirementAge: 65, wageGrowth: 2, discountRate: 3 }).totalPV)
      .toBe(0);
  });

  it("applies fringe percentage on top of earnings", () => {
    const noFringe = lostEarningsPV({ annualEarnings: 50000, currentAge: 40, retirementAge: 41, wageGrowth: 0, discountRate: 0, fringePct: 0 }).totalPV;
    const withFringe = lostEarningsPV({ annualEarnings: 50000, currentAge: 40, retirementAge: 41, wageGrowth: 0, discountRate: 0, fringePct: 20 }).totalPV;
    expect(withFringe).toBeCloseTo(noFringe * 1.2, 4);
  });
});

describe("lifeCarePV", () => {
  it("sums undiscounted cost when rates are zero", () => {
    expect(lifeCarePV({ annualCost: 1000, medicalInflation: 0, years: 5, discountRate: 0 }).totalPV)
      .toBeCloseTo(5000, 6);
  });
});

describe("householdServicesPV", () => {
  it("annualizes hours x wage x 52 with no growth/discount", () => {
    // 10 h/wk * $20 * 52 = 10400/yr * 2 years = 20800
    expect(householdServicesPV({ hoursPerWeek: 10, hourlyWage: 20, years: 2, growthRate: 0, discountRate: 0 }).totalPV)
      .toBeCloseTo(20800, 6);
  });
});
```

- [ ] **Step 5: Run the test to confirm it fails**
```bash
npm test
```
Expected: FAIL — `Failed to resolve import "./finance"` / functions not defined.

- [ ] **Step 6: Implement `src/lib/finance.ts`**
```ts
export type Timing = "end" | "begin";

export interface PVScheduleRow {
  year: number;
  nominal: number;
  discounted: number;
  cumulativePV: number;
}

export interface PVParams {
  payment: number;
  years: number;
  discountRate: number; // percent, e.g. 3 = 3%
  growthRate?: number;  // percent, default 0
  timing?: Timing;      // default "end"
}

const toRate = (pct: number): number => pct / 100;

export function pvSchedule(params: PVParams): PVScheduleRow[] {
  const { payment, years, discountRate, growthRate = 0, timing = "end" } = params;
  const r = toRate(discountRate);
  const g = toRate(growthRate);
  const rows: PVScheduleRow[] = [];
  let cumulative = 0;
  const n = Math.max(0, Math.round(years));
  for (let i = 1; i <= n; i++) {
    const nominal = payment * Math.pow(1 + g, i - 1);
    const exponent = timing === "begin" ? i - 1 : i;
    const discounted = nominal / Math.pow(1 + r, exponent);
    cumulative += discounted;
    rows.push({ year: i, nominal, discounted, cumulativePV: cumulative });
  }
  return rows;
}

export function presentValue(params: PVParams): number {
  const rows = pvSchedule(params);
  return rows.length ? rows[rows.length - 1].cumulativePV : 0;
}

export interface CalcResult {
  totalPV: number;
  schedule: PVScheduleRow[];
}

export interface LostEarningsParams {
  annualEarnings: number;
  currentAge: number;
  retirementAge: number;
  wageGrowth: number;
  discountRate: number;
  fringePct?: number;
}

export function lostEarningsPV(p: LostEarningsParams): CalcResult {
  const years = Math.max(0, Math.round(p.retirementAge - p.currentAge));
  const basePayment = p.annualEarnings * (1 + toRate(p.fringePct ?? 0));
  const schedule = pvSchedule({
    payment: basePayment,
    years,
    discountRate: p.discountRate,
    growthRate: p.wageGrowth,
    timing: "end",
  });
  return { totalPV: schedule.length ? schedule[schedule.length - 1].cumulativePV : 0, schedule };
}

export interface LifeCareParams {
  annualCost: number;
  medicalInflation: number;
  years: number;
  discountRate: number;
}

export function lifeCarePV(p: LifeCareParams): CalcResult {
  const schedule = pvSchedule({
    payment: p.annualCost,
    years: p.years,
    discountRate: p.discountRate,
    growthRate: p.medicalInflation,
    timing: "end",
  });
  return { totalPV: schedule.length ? schedule[schedule.length - 1].cumulativePV : 0, schedule };
}

export interface HouseholdServicesParams {
  hoursPerWeek: number;
  hourlyWage: number;
  years: number;
  growthRate: number;
  discountRate: number;
}

export function householdServicesPV(p: HouseholdServicesParams): CalcResult {
  const annual = p.hoursPerWeek * p.hourlyWage * 52;
  const schedule = pvSchedule({
    payment: annual,
    years: p.years,
    discountRate: p.discountRate,
    growthRate: p.growthRate,
    timing: "end",
  });
  return { totalPV: schedule.length ? schedule[schedule.length - 1].cumulativePV : 0, schedule };
}
```

- [ ] **Step 7: Run tests to confirm pass**
```bash
npm test
```
Expected: all tests PASS.

- [ ] **Step 8: Commit**
```bash
git add vitest.config.ts package.json package-lock.json src/lib/finance.ts src/lib/finance.test.ts
git commit -m "feat: add unit-tested present-value finance library"
```

---

### Task 9: Calculator registry (configs + compute)

**Files:**
- Create: `src/data/calculatorRegistry.ts`

- [ ] **Step 1: Write `src/data/calculatorRegistry.ts`**
```ts
import {
  pvSchedule,
  presentValue,
  lostEarningsPV,
  lifeCarePV,
  householdServicesPV,
  type PVScheduleRow,
} from "@/lib/finance";

export interface CalcFieldOption {
  label: string;
  value: number;
}

export interface CalcField {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
  unit?: "$" | "%" | "yrs" | "age" | "hrs/wk" | "$/hr" | "";
  options?: CalcFieldOption[]; // when present, render a Select instead of a slider
}

export interface CalcOutput {
  totalPV: number;
  schedule: PVScheduleRow[];
  extras?: { label: string; value: string }[];
}

export interface CalcConfig {
  slug: string;
  title: string;
  description: string;
  fields: CalcField[];
  compute: (v: Record<string, number>) => CalcOutput;
}

export const DISCLAIMER =
  "These calculators provide simplified, illustrative estimates for educational purposes only. They are not a substitute for a formal forensic economic analysis and should not be relied upon for litigation. Contact Kincaid Wolstein Economics for a case-specific evaluation.";

export const calculators: CalcConfig[] = [
  {
    slug: "present-value",
    title: "Present Value Calculator",
    description:
      "Estimate the present value of a stream of future payments, adjusting for growth and a discount rate.",
    fields: [
      { key: "payment", label: "Annual payment", min: 0, max: 500000, step: 1000, default: 50000, unit: "$" },
      { key: "years", label: "Number of years", min: 1, max: 60, step: 1, default: 20, unit: "yrs" },
      { key: "discountRate", label: "Discount rate", min: 0, max: 15, step: 0.1, default: 3, unit: "%" },
      { key: "growthRate", label: "Growth rate", min: 0, max: 15, step: 0.1, default: 2, unit: "%" },
      {
        key: "timing",
        label: "Payment timing",
        min: 0,
        max: 1,
        step: 1,
        default: 0,
        options: [
          { label: "End of year", value: 0 },
          { label: "Beginning of year", value: 1 },
        ],
      },
    ],
    compute: (v) => {
      const schedule = pvSchedule({
        payment: v.payment,
        years: v.years,
        discountRate: v.discountRate,
        growthRate: v.growthRate,
        timing: v.timing === 1 ? "begin" : "end",
      });
      return {
        totalPV: presentValue({
          payment: v.payment,
          years: v.years,
          discountRate: v.discountRate,
          growthRate: v.growthRate,
          timing: v.timing === 1 ? "begin" : "end",
        }),
        schedule,
      };
    },
  },
  {
    slug: "lost-earnings",
    title: "Lost Earnings Estimator",
    description:
      "Estimate the present value of lost future earnings from the current age to expected retirement.",
    fields: [
      { key: "annualEarnings", label: "Current annual earnings", min: 0, max: 500000, step: 1000, default: 60000, unit: "$" },
      { key: "currentAge", label: "Current age", min: 16, max: 75, step: 1, default: 40, unit: "age" },
      { key: "retirementAge", label: "Retirement age", min: 40, max: 80, step: 1, default: 67, unit: "age" },
      { key: "wageGrowth", label: "Annual wage growth", min: 0, max: 10, step: 0.1, default: 2.5, unit: "%" },
      { key: "discountRate", label: "Discount rate", min: 0, max: 15, step: 0.1, default: 3, unit: "%" },
      { key: "fringePct", label: "Fringe benefits", min: 0, max: 50, step: 1, default: 20, unit: "%" },
    ],
    compute: (v) => {
      const { totalPV, schedule } = lostEarningsPV({
        annualEarnings: v.annualEarnings,
        currentAge: v.currentAge,
        retirementAge: v.retirementAge,
        wageGrowth: v.wageGrowth,
        discountRate: v.discountRate,
        fringePct: v.fringePct,
      });
      return {
        totalPV,
        schedule,
        extras: [{ label: "Work-life years", value: String(Math.max(0, Math.round(v.retirementAge - v.currentAge))) }],
      };
    },
  },
  {
    slug: "life-care",
    title: "Life Care Plan Cost Projector",
    description:
      "Estimate the present value of recurring future care costs, adjusting for medical inflation.",
    fields: [
      { key: "annualCost", label: "Annual care cost", min: 0, max: 500000, step: 1000, default: 40000, unit: "$" },
      { key: "medicalInflation", label: "Medical inflation", min: 0, max: 12, step: 0.1, default: 3.5, unit: "%" },
      { key: "years", label: "Years of care", min: 1, max: 60, step: 1, default: 30, unit: "yrs" },
      { key: "discountRate", label: "Discount rate", min: 0, max: 15, step: 0.1, default: 3, unit: "%" },
    ],
    compute: (v) => {
      const { totalPV, schedule } = lifeCarePV({
        annualCost: v.annualCost,
        medicalInflation: v.medicalInflation,
        years: v.years,
        discountRate: v.discountRate,
      });
      return { totalPV, schedule };
    },
  },
  {
    slug: "household-services",
    title: "Household Services Loss Calculator",
    description:
      "Estimate the present value of lost household services based on replacement cost.",
    fields: [
      { key: "hoursPerWeek", label: "Hours per week", min: 0, max: 80, step: 1, default: 20, unit: "hrs/wk" },
      { key: "hourlyWage", label: "Replacement wage", min: 0, max: 100, step: 1, default: 18, unit: "$/hr" },
      { key: "years", label: "Number of years", min: 1, max: 60, step: 1, default: 25, unit: "yrs" },
      { key: "growthRate", label: "Wage growth", min: 0, max: 10, step: 0.1, default: 2, unit: "%" },
      { key: "discountRate", label: "Discount rate", min: 0, max: 15, step: 0.1, default: 3, unit: "%" },
    ],
    compute: (v) => {
      const { totalPV, schedule } = householdServicesPV({
        hoursPerWeek: v.hoursPerWeek,
        hourlyWage: v.hourlyWage,
        years: v.years,
        growthRate: v.growthRate,
        discountRate: v.discountRate,
      });
      return {
        totalPV,
        schedule,
        extras: [{ label: "Annualized value", value: `$${Math.round(v.hoursPerWeek * v.hourlyWage * 52).toLocaleString()}` }],
      };
    },
  },
];

export function getCalculator(slug: string): CalcConfig | undefined {
  return calculators.find((c) => c.slug === slug);
}
```

- [ ] **Step 2: Verify build**
```bash
npm run build
```
Expected: `✓ built`.

- [ ] **Step 3: Commit**
```bash
git add src/data/calculatorRegistry.ts
git commit -m "feat: add calculator registry with four configs"
```

---

### Task 10: Shared calculator UI components

**Files:**
- Create: `src/components/calculators/SliderField.tsx`
- Create: `src/components/calculators/ResultsPanel.tsx`
- Create: `src/components/calculators/PVChart.tsx`
- Create: `src/components/calculators/LeadCaptureDialog.tsx`
- Create: `src/components/calculators/CalculatorLayout.tsx`

- [ ] **Step 1: `SliderField.tsx`** (slider + synced number input, or a Select when options present)
```tsx
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CalcField } from "@/data/calculatorRegistry";

interface Props {
  field: CalcField;
  value: number;
  onChange: (value: number) => void;
}

const prefix = (unit?: string) => (unit === "$" || unit === "$/hr" ? "$" : "");
const suffix = (unit?: string) =>
  unit && unit !== "$" && unit !== "$/hr" ? ` ${unit === "%" ? "%" : unit}` : "";

const SliderField = ({ field, value, onChange }: Props) => {
  if (field.options) {
    return (
      <div className="space-y-2">
        <Label>{field.label}</Label>
        <Select value={String(value)} onValueChange={(v) => onChange(Number(v))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((o) => (
              <SelectItem key={o.value} value={String(o.value)}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{field.label}</Label>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-muted-foreground">{prefix(field.unit)}</span>
          <Input
            type="number"
            value={value}
            min={field.min}
            max={field.max}
            step={field.step}
            onChange={(e) => onChange(Number(e.target.value))}
            className="h-8 w-28 text-right"
          />
          <span className="text-muted-foreground">{suffix(field.unit)}</span>
        </div>
      </div>
      <Slider
        value={[value]}
        min={field.min}
        max={field.max}
        step={field.step}
        onValueChange={(vals) => onChange(vals[0])}
      />
    </div>
  );
};

export default SliderField;
```

- [ ] **Step 2: `ResultsPanel.tsx`**
```tsx
import { Card } from "@/components/ui/card";
import type { CalcOutput } from "@/data/calculatorRegistry";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const ResultsPanel = ({ output }: { output: CalcOutput }) => (
  <Card className="p-6 bg-gradient-subtle border-0 shadow-card">
    <p className="text-sm text-muted-foreground mb-1">Estimated Present Value</p>
    <p className="text-4xl font-bold text-primary mb-4">{fmt(output.totalPV)}</p>
    {output.extras && output.extras.length > 0 && (
      <div className="grid grid-cols-2 gap-3">
        {output.extras.map((e) => (
          <div key={e.label} className="bg-background rounded-lg p-3 text-center shadow-soft">
            <div className="text-lg font-semibold text-foreground">{e.value}</div>
            <div className="text-xs text-muted-foreground">{e.label}</div>
          </div>
        ))}
      </div>
    )}
  </Card>
);

export default ResultsPanel;
```

- [ ] **Step 3: `PVChart.tsx`** (Recharts)
```tsx
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import type { PVScheduleRow } from "@/lib/finance";

const compact = (n: number) =>
  n.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 1 });

const PVChart = ({ schedule }: { schedule: PVScheduleRow[] }) => (
  <div className="w-full h-72">
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={schedule} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={compact} tick={{ fontSize: 12 }} width={48} />
        <Tooltip
          formatter={(value: number) => `$${Math.round(value).toLocaleString()}`}
          labelFormatter={(l) => `Year ${l}`}
        />
        <Legend />
        <Bar dataKey="nominal" name="Nominal" fill="hsl(var(--muted-foreground))" opacity={0.4} />
        <Bar dataKey="discounted" name="Discounted (PV)" fill="hsl(var(--primary))" />
        <Line type="monotone" dataKey="cumulativePV" name="Cumulative PV" stroke="hsl(var(--primary))" dot={false} strokeWidth={2} />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);

export default PVChart;
```

- [ ] **Step 4: `LeadCaptureDialog.tsx`** (Formspree)
```tsx
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { validateEmail } from "@/utils/formHandler";
import { Mail } from "lucide-react";

interface Props {
  calculatorTitle: string;
  calculatorSlug: string;
  inputs: Record<string, number>;
  totalPV: number;
}

const LeadCaptureDialog = ({ calculatorTitle, calculatorSlug, inputs, totalPV }: Props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!name.trim()) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }
    if (!validateEmail(email)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/mnnvgzgd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          formType: `calculator-${calculatorSlug}`,
          subject: `Calculator lead: ${calculatorTitle} — ${name}`,
          name,
          email,
          calculator: calculatorTitle,
          inputs,
          estimatedPresentValue: Math.round(totalPV),
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      toast({ title: "Sent!", description: "We'll email your results summary shortly." });
      setOpen(false);
      setName("");
      setEmail("");
    } catch {
      toast({
        title: "Submission error",
        description: "Please try again or call (201) 343-0700.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="professional" size="lg">
          <Mail className="h-4 w-4 mr-2" /> Email me my results
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Email my results</DialogTitle>
          <DialogDescription>
            Enter your details and we'll send a summary of this estimate. No spam.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lead-name">Name</Label>
            <Input id="lead-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-email">Email</Label>
            <Input id="lead-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <Button className="w-full" onClick={submit} disabled={submitting}>
            {submitting ? "Sending..." : "Send my results"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureDialog;
```

- [ ] **Step 5: `CalculatorLayout.tsx`**
```tsx
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { DISCLAIMER } from "@/data/calculatorRegistry";

interface Props {
  title: string;
  description: string;
  controls: ReactNode;
  results: ReactNode;
}

const CalculatorLayout = ({ title, description, controls, results }: Props) => (
  <section className="py-12 bg-background">
    <div className="container mx-auto px-6">
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-6">{controls}</div>
        <div className="space-y-6">{results}</div>
      </div>
      <Alert className="mt-10 max-w-4xl">
        <Info className="h-4 w-4" />
        <AlertDescription>{DISCLAIMER}</AlertDescription>
      </Alert>
      <div className="mt-6">
        <Link to="/schedule-consultation">
          <Button variant="default" size="lg">Request a case-specific analysis</Button>
        </Link>
      </div>
    </div>
  </section>
);

export default CalculatorLayout;
```

- [ ] **Step 6: Verify build**
```bash
npm run build
```
Expected: `✓ built` (these are not yet imported anywhere, but must compile).

- [ ] **Step 7: Commit**
```bash
git add src/components/calculators
git commit -m "feat: add shared calculator UI components"
```

---

### Task 11: Generic calculator page, hub, and routes

**Files:**
- Create: `src/pages/calculators/CalculatorPage.tsx`
- Create: `src/pages/calculators/CalculatorsHub.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: `CalculatorPage.tsx`**
```tsx
import { useMemo, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import SliderField from "@/components/calculators/SliderField";
import ResultsPanel from "@/components/calculators/ResultsPanel";
import PVChart from "@/components/calculators/PVChart";
import LeadCaptureDialog from "@/components/calculators/LeadCaptureDialog";
import { getCalculator } from "@/data/calculatorRegistry";

const CalculatorPage = () => {
  const { calcSlug } = useParams();
  const config = calcSlug ? getCalculator(calcSlug) : undefined;

  const initial = useMemo(() => {
    const v: Record<string, number> = {};
    config?.fields.forEach((f) => (v[f.key] = f.default));
    return v;
  }, [config]);

  const [values, setValues] = useState<Record<string, number>>(initial);

  if (!config) return <Navigate to="/calculators" replace />;

  const output = config.compute(values);

  return (
    <div className="min-h-screen">
      <SEOHead
        title={`${config.title} | Kincaid Wolstein Economics`}
        description={config.description}
        canonical={`https://kweconomics.com/calculators/${config.slug}`}
      />
      <Header />
      <CalculatorLayout
        title={config.title}
        description={config.description}
        controls={config.fields.map((f) => (
          <SliderField
            key={f.key}
            field={f}
            value={values[f.key]}
            onChange={(val) => setValues((prev) => ({ ...prev, [f.key]: val }))}
          />
        ))}
        results={
          <>
            <ResultsPanel output={output} />
            <PVChart schedule={output.schedule} />
            <LeadCaptureDialog
              calculatorTitle={config.title}
              calculatorSlug={config.slug}
              inputs={values}
              totalPV={output.totalPV}
            />
          </>
        }
      />
      <Footer />
    </div>
  );
};

export default CalculatorPage;
```

- [ ] **Step 2: `CalculatorsHub.tsx`**
```tsx
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, Info, ArrowRight } from "lucide-react";
import { calculators, DISCLAIMER } from "@/data/calculatorRegistry";

const CalculatorsHub = () => (
  <div className="min-h-screen">
    <SEOHead
      title="Economic Damages Calculators | Kincaid Wolstein Economics"
      description="Free interactive calculators for present value, lost earnings, life care costs, and household services losses."
      canonical="https://kweconomics.com/calculators"
    />
    <Header />
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Economic Damages Calculators</h1>
          <p className="text-lg text-muted-foreground">
            Interactive tools to illustrate the present value of future economic losses.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {calculators.map((c) => (
            <Link key={c.slug} to={`/calculators/${c.slug}`}>
              <Card className="p-6 h-full shadow-card border-0 hover:shadow-lg transition-shadow group">
                <Calculator className="h-8 w-8 text-primary mb-3" />
                <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center">
                  {c.title}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </h2>
                <p className="text-muted-foreground text-sm">{c.description}</p>
              </Card>
            </Link>
          ))}
        </div>
        <Alert className="mt-12 max-w-4xl mx-auto">
          <Info className="h-4 w-4" />
          <AlertDescription>{DISCLAIMER}</AlertDescription>
        </Alert>
      </div>
    </section>
    <Footer />
  </div>
);

export default CalculatorsHub;
```

- [ ] **Step 3: Register routes in `src/App.tsx` (ABOVE catch-alls)**

Add lazy imports near the others:
```tsx
const CalculatorsHub = lazy(() => import("./pages/calculators/CalculatorsHub"));
const CalculatorPage = lazy(() => import("./pages/calculators/CalculatorPage"));
```
Add routes inside the static-routes block, immediately after the `/search` route (this is BEFORE the Service+Location, `/:slug`, `/:stateSlug/:citySlug`, and `/:stateSlug` catch-alls — ordering is critical or `/calculators/present-value` will be captured by `/:stateSlug/:citySlug`):
```tsx
<Route path="/calculators" element={<CalculatorsHub />} />
<Route path="/calculators/:calcSlug" element={<CalculatorPage />} />
```

- [ ] **Step 4: Verify build + dev**
```bash
npm run build
```
Expected: `✓ built`. Then `npm run dev` and check:
- http://localhost:8080/calculators → hub with 4 cards.
- http://localhost:8080/calculators/present-value → sliders update the PV figure and chart live; "Payment timing" is a dropdown.
- http://localhost:8080/calculators/lost-earnings, `/life-care`, `/household-services` all render and recompute.
- http://localhost:8080/calculators/bogus → redirects to `/calculators`.

- [ ] **Step 5: Commit**
```bash
git add src/pages/calculators src/App.tsx
git commit -m "feat: add calculators hub and generic calculator page with routes"
```

---

### Task 12: Calculators in nav and sitemap

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `generate-sitemap.mjs`

- [ ] **Step 1: Add to Header "Services" dropdown**

In `src/components/Header.tsx`, inside the Services `DropdownMenuContent`, after the "All Services" item add:
```tsx
<DropdownMenuItem asChild>
  <Link to="/calculators" className="flex items-center gap-2 cursor-pointer">
    <Calculator className="h-4 w-4" />
    <span>Calculators</span>
  </Link>
</DropdownMenuItem>
```
(`Calculator` is already imported in Header.tsx.)

Add to the mobile menu nav (after the `/case-types` mobile link):
```tsx
<Link
  to="/calculators"
  className="text-foreground hover:text-primary transition-colors"
  onClick={() => setIsMenuOpen(false)}
>
  Calculators
</Link>
```

- [ ] **Step 2: Add calculator routes to `generate-sitemap.mjs`**

In the `staticPages` array add:
```js
{ path: '/calculators', priority: 0.8, changefreq: 'monthly' },
{ path: '/calculators/present-value', priority: 0.7, changefreq: 'monthly' },
{ path: '/calculators/lost-earnings', priority: 0.7, changefreq: 'monthly' },
{ path: '/calculators/life-care', priority: 0.7, changefreq: 'monthly' },
{ path: '/calculators/household-services', priority: 0.7, changefreq: 'monthly' },
```

- [ ] **Step 3: Verify**
```bash
npm run build
node generate-sitemap.mjs
grep -c "/calculators" public/sitemap.xml
npm test
```
Expected: build passes; sitemap has 5+ `/calculators` URLs; all finance tests still pass.

- [ ] **Step 4: Commit**
```bash
git add src/components/Header.tsx generate-sitemap.mjs public/sitemap.xml
git commit -m "feat: link calculators in nav and sitemap"
```

---

## Final verification & handoff

- [ ] **Full build + tests**
```bash
npm run build && npm test
```
Expected: `✓ built` and all tests pass.

- [ ] **Push branch and open PR**
```bash
git push -u origin site-improvements-2026-06
gh pr create --base main --title "Site improvements: team page, calculators, audit fixes" --body "Implements docs/superpowers/specs/2026-06-02-kweconomics-improvements-design.md"
```

- [ ] **Post-merge manual steps (owner):**
  - Save Zach's headshot to `public/lovable-uploads/zach-sperling.jpg` and set `hasPhoto: true` in `src/data/team.ts`.
  - (Optional) Enable Formspree autoresponse so calculator users receive their results copy.

---

## Self-Review notes (author)

- **Spec coverage:** geo fix (T1), brand (T2), dup testimonials (T3), team data (T4), home teaser swap (T5), team page+schema (T6), nav/footer/sitemap for team (T7), finance lib+tests (T8), registry/4 calcs (T9), shared UI incl. lead capture (T10), pages+routes (T11), calc nav/sitemap (T12). All spec sections mapped.
- **Routing risk** explicitly handled in T11 (calculator routes above catch-alls).
- **Type consistency:** `CalcConfig`/`CalcField`/`CalcOutput`/`PVScheduleRow`/`CalcResult` names are used consistently across T8/T9/T10/T11.
- **Lead pipeline:** Formspree endpoint `mnnvgzgd` matches the existing `formHandler.ts`. No jspdf/EmailJS.
- **Photo path:** `public/lovable-uploads/zach-sperling.jpg` (public dir is served at root), consistent between `team.ts` and the post-merge step.
