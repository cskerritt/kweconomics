# KWEconomics → KWVRS Visual Facelift Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the GitHub/Railway KWEconomics site look like the current KWVRS site — navy + gold palette, Source Serif 4 / Inter / JetBrains Mono typography, and the KWVRS motion/hero/reveal system — as a visual-only facelift.

**Architecture:** KWEconomics is Vite + React + TS + Tailwind **v3** (`tailwind.config.ts`) + shadcn/ui, with HSL design tokens in `src/index.css`. We recolor those tokens to navy+gold (keeping every shadcn token name so existing classes keep compiling), add the three Google fonts + `fontFamily` config, append the KWVRS motion CSS (plain keyframes/classes, gold-adapted), port three small components (`useReveal` hook, `Reveal`, `ScrollProgress`), then apply aurora heroes + scroll-reveals + hover-lift across the page templates. KWVRS's Tailwind v4 `@theme` token block is NOT ported; only the framework-agnostic motion CSS is.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind v3, shadcn/ui, react-router-dom.

**Source of truth for the look:** the KWVRS repo at `~/Documents/New project/KWVRS` (`cskerritt/kwvrs-site`).

**Verification model:** This is visual/CSS work, so "tests" are (a) `npm run build` must pass after each code task, and (b) a `npm run preview` visual + contrast check at the QA task. Run all commands from the repo root: `cd "/Users/chrisskerritt/Documents/New project/KWEconomics"`.

**Branch:** Work is on `facelift/kwvrs-look` (already created off local `main`). The spec is already committed there.

---

## Color reference (computed from KWVRS hex → HSL for Tailwind v3 tokens)

Use these HSL triples (Tailwind/shadcn store HSL **without** `hsl()`). Values are close approximations of the KWVRS hexes; verify visually at QA and nudge lightness if needed.

| Purpose | KWVRS hex | HSL token value |
|---|---|---|
| navy (primary) | `#14223d` | `220 51% 16%` |
| navy-light | `#2a3a5c` | `221 37% 26%` |
| navy-dark | `#0c1729` | `217 55% 10%` |
| gold (accent) | `#C4973B` | `40 54% 50%` |
| gold-light | ~`#d6b063` | `40 60% 62%` |
| gold-dark | ~`#9c7426` | `40 61% 38%` |
| warm white (background) | `#FAFAF8` | `60 20% 98%` |
| body text (foreground) | navy ink | `220 35% 18%` |

---

## Task 1: Recolor design tokens (blue → navy + gold)

**Files:**
- Modify: `src/index.css` (the `:root` and `.dark` `@layer base` blocks, lines ~9–122)

- [ ] **Step 1: Replace the `:root` token block**

In `src/index.css`, replace the existing `:root { ... }` token values inside `@layer base` with navy+gold. Set these tokens (keep any tokens not listed unchanged):

```css
:root {
  --background: 60 20% 98%;
  --foreground: 220 35% 18%;

  --card: 0 0% 100%;
  --card-foreground: 220 35% 18%;

  --popover: 0 0% 100%;
  --popover-foreground: 220 35% 18%;

  --primary: 220 51% 16%;          /* navy */
  --primary-foreground: 60 20% 98%;

  --secondary: 220 30% 94%;
  --secondary-foreground: 220 51% 16%;

  --muted: 220 16% 94%;
  --muted-foreground: 220 12% 42%;

  --accent: 40 54% 50%;            /* gold */
  --accent-foreground: 220 51% 16%;

  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 98%;

  --border: 220 16% 86%;
  --input: 220 16% 86%;
  --ring: 40 54% 50%;              /* gold focus ring */

  /* Brand palette (token names retained for code stability) */
  --navy: 220 51% 16%;
  --navy-light: 221 37% 26%;
  --navy-dark: 217 55% 10%;
  --gold: 40 54% 50%;
  --gold-light: 40 60% 62%;
  --gold-dark: 40 61% 38%;
  --blue-gray: 220 18% 30%;
  --light-gray: 220 16% 95%;
  --medium-gray: 220 12% 47%;

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, hsl(220 51% 16%), hsl(221 37% 26%));
  --gradient-subtle: linear-gradient(180deg, hsl(0 0% 100%), hsl(60 20% 98%));
  --gradient-hero: linear-gradient(135deg, hsl(217 55% 10%) 0%, hsl(220 51% 16%) 100%);

  /* Shadows */
  --shadow-elegant: 0 10px 30px -10px hsl(220 51% 16% / 0.3);
  --shadow-soft: 0 4px 20px -4px hsl(220 51% 16% / 0.15);
  --shadow-card: 0 8px 32px -8px hsl(220 51% 16% / 0.12);

  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-bouncy: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --radius: 0.5rem;
}
```

Leave the existing `--sidebar-*` tokens as they are (unused on public pages).

- [ ] **Step 2: Recolor the `.dark` block so a stray `.dark` doesn't render broken colors**

In the `.dark { ... }` block, set the brand-relevant tokens to dark-navy equivalents (we are not investing in dark mode, just keeping it coherent):

```css
.dark {
  --background: 217 55% 10%;
  --foreground: 60 20% 96%;
  --card: 220 51% 14%;
  --card-foreground: 60 20% 96%;
  --popover: 220 51% 14%;
  --popover-foreground: 60 20% 96%;
  --primary: 40 60% 62%;            /* gold reads as primary on dark */
  --primary-foreground: 217 55% 10%;
  --secondary: 221 37% 26%;
  --secondary-foreground: 60 20% 96%;
  --muted: 221 37% 22%;
  --muted-foreground: 220 14% 70%;
  --accent: 40 54% 50%;
  --accent-foreground: 217 55% 10%;
  --border: 221 37% 26%;
  --input: 221 37% 26%;
  --ring: 40 60% 62%;
  --gradient-hero: linear-gradient(135deg, hsl(217 55% 8%) 0%, hsl(220 51% 16%) 100%);
}
```

- [ ] **Step 3: Build to verify nothing broke**

Run: `npm run build`
Expected: build succeeds (exit 0). Token renames are value-only, so all existing `bg-primary`/`text-navy`/`border-border` usages still compile.

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "feat(design): recolor tokens to navy + gold (KWVRS palette)"
```

---

## Task 2: Typography (Source Serif 4 / Inter / JetBrains Mono)

**Files:**
- Modify: `index.html` (`<head>`)
- Modify: `tailwind.config.ts` (`theme.extend.fontFamily`)
- Modify: `src/index.css` (base layer body/heading rules)

- [ ] **Step 1: Add the `.js` bootstrap + font links to `index.html`**

In `index.html`, immediately after `<meta charset="UTF-8" />`, add the JS-gate script (must run before paint so motion hidden-states only apply with JS):

```html
    <!-- Enable JS-gated motion before first paint. No-JS/crawlers keep fully visible content. -->
    <script>document.documentElement.classList.add('js')</script>
```

Then, inside `<head>` (e.g. just before `<title>`), add the font loading block:

```html
    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="preload"
      href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap"
      as="style"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap"
      rel="stylesheet"
    />
```

Also update the existing `<meta name="theme-color" ...>` (if present) to `#14223d`.

- [ ] **Step 2: Add `fontFamily` to `tailwind.config.ts`**

Inside `theme.extend` in `tailwind.config.ts`, add:

```ts
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
```

- [ ] **Step 3: Set base typography in `src/index.css`**

In the `@layer base` block that already has `body { @apply bg-background text-foreground; }`, extend it so body uses Inter and headings use the serif:

```css
  body {
    @apply bg-background text-foreground font-sans;
  }
  h1, h2, h3 {
    @apply font-serif;
  }
```

- [ ] **Step 4: Build to verify**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add index.html tailwind.config.ts src/index.css
git commit -m "feat(design): add Source Serif 4 / Inter / JetBrains Mono + .js motion gate"
```

---

## Task 3: Port the motion CSS system (gold-adapted)

**Files:**
- Modify: `src/index.css` (append a new section at end of file)

- [ ] **Step 1: Append the motion system to `src/index.css`**

Add this block at the **end** of `src/index.css`. Note these are the KWVRS keyframes/classes with amber swapped for gold via local `--kw-gold*` vars (self-contained, no dependency on Tailwind tokens):

```css
/* ============================================================================
   KWVRS motion system (ported). JS-gated + reduced-motion safe.
   ========================================================================== */
:root {
  --kw-spring: cubic-bezier(0.34, 1.42, 0.5, 1);
  --kw-ease:   cubic-bezier(0.16, 1, 0.3, 1);
  --kw-gold:       #C4973B;
  --kw-gold-light: #d6b063;
  --kw-gold-dark:  #9c7426;
  --kw-navy-light: #3c5da6;
}

:focus-visible {
  outline: 2px solid var(--kw-gold-light);
  outline-offset: 2px;
  border-radius: 3px;
}

.skip-link {
  position: absolute; left: 0.5rem; top: 0.5rem; z-index: 100;
  background: #14223d; color: #fff; font-weight: 600;
  padding: 0.625rem 1rem; border-radius: 0.5rem;
  transform: translateY(-160%);
  transition: transform 0.15s var(--kw-ease);
}
.skip-link:focus { transform: translateY(0); }

@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}

@keyframes kw-fade-up {
  from { opacity: 0; transform: translateY(28px) scale(0.985); }
  to   { opacity: 1; transform: none; }
}
@keyframes kw-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes kw-aurora-a {
  0%   { transform: translate3d(-8%, -6%, 0) scale(1.05) rotate(0deg); }
  50%  { transform: translate3d(8%, 6%, 0) scale(1.3) rotate(12deg); }
  100% { transform: translate3d(-8%, -6%, 0) scale(1.05) rotate(0deg); }
}
@keyframes kw-aurora-b {
  0%   { transform: translate3d(6%, 8%, 0) scale(1.2) rotate(0deg); }
  50%  { transform: translate3d(-6%, -4%, 0) scale(1) rotate(-14deg); }
  100% { transform: translate3d(6%, 8%, 0) scale(1.2) rotate(0deg); }
}
@keyframes kw-shimmer { to { background-position: 200% center; } }
@keyframes kw-sheen {
  0%   { transform: translateX(-160%) skewX(-20deg); }
  100% { transform: translateX(260%) skewX(-20deg); }
}
@keyframes kw-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}
.kw-float { animation: kw-float 5s ease-in-out infinite; }

.js .kw-page-enter { animation: kw-fade-up 0.5s var(--kw-ease) both; }
.js .kw-enter      { animation: kw-fade-up 0.72s var(--kw-spring) both; }
.js .kw-enter-slow { animation: kw-fade-up 0.95s var(--kw-spring) both; }
.js .kw-enter-1 { animation-delay: 0.10s; }
.js .kw-enter-2 { animation-delay: 0.20s; }
.js .kw-enter-3 { animation-delay: 0.30s; }
.js .kw-enter-4 { animation-delay: 0.40s; }

.js .kw-reveal {
  opacity: 0;
  transform: translateY(34px) scale(0.965);
  filter: blur(8px);
  transition: opacity 0.7s var(--kw-ease),
              transform 0.8s var(--kw-spring),
              filter 0.6s var(--kw-ease);
  transition-delay: var(--kw-reveal-delay, 0ms);
}
.js .kw-reveal.is-visible { opacity: 1; transform: none; filter: none; }
.js .kw-reveal--left  { transform: translateX(-44px) scale(0.98); }
.js .kw-reveal--right { transform: translateX(44px) scale(0.98); }
.js .kw-reveal--scale { transform: translateY(0) scale(0.9); }

@media (hover: none), (pointer: coarse) {
  .js .kw-reveal,
  .js .kw-reveal--left,
  .js .kw-reveal--right,
  .js .kw-reveal--scale {
    transform: translateY(14px);
    filter: none;
    transition: opacity 0.45s var(--kw-ease), transform 0.45s var(--kw-ease);
    transition-delay: min(var(--kw-reveal-delay, 0ms), 120ms);
  }
}

.kw-lift {
  transition: transform 0.25s var(--kw-ease),
              box-shadow 0.3s var(--kw-ease),
              border-color 0.25s ease;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .kw-lift:hover { transform: translateY(-4px); }
}
@media (hover: none) { .kw-lift:active { transform: scale(0.99); } }

.kw-underline {
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 2px; background-position: 0 100%; background-repeat: no-repeat;
  transition: background-size 0.3s var(--kw-ease);
}
.kw-underline:hover { background-size: 100% 2px; }

.kw-aurora { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
.kw-aurora::before, .kw-aurora::after {
  content: ""; position: absolute; border-radius: 50%;
  filter: blur(70px); opacity: 0.55; will-change: transform;
}
.kw-aurora::before {
  width: 60vw; height: 60vw; left: -12%; top: -34%;
  background: radial-gradient(circle, var(--kw-gold-light) 0%, transparent 62%);
  animation: kw-aurora-a 20s ease-in-out infinite;
}
.kw-aurora::after {
  width: 55vw; height: 55vw; right: -12%; bottom: -38%;
  background: radial-gradient(circle, var(--kw-navy-light) 0%, transparent 62%);
  animation: kw-aurora-b 26s ease-in-out infinite;
}
.kw-grid {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 40%, #000 30%, transparent 78%);
  -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 40%, #000 30%, transparent 78%);
}

.kw-gradient-text {
  background: linear-gradient(100deg,
    currentColor 0%, currentColor 38%,
    var(--kw-gold-light) 50%,
    currentColor 62%, currentColor 100%);
  background-size: 200% auto;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; color: transparent;
  animation: kw-shimmer 6.5s linear infinite;
}

.kw-progress {
  position: fixed; top: 0; left: 0; right: 0; height: 3px; z-index: 60;
  transform: scaleX(var(--kw-progress, 0)); transform-origin: 0 50%;
  background: linear-gradient(90deg, var(--kw-gold-dark), var(--kw-gold-light));
  box-shadow: 0 0 12px color-mix(in srgb, var(--kw-gold-light) 60%, transparent);
}

.kw-magnetic { position: relative; overflow: hidden; transition: transform 0.2s var(--kw-ease); }
.kw-magnetic::after {
  content: ""; position: absolute; top: 0; left: 0; height: 100%; width: 55%;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,0.4), transparent);
  transform: translateX(-160%) skewX(-20deg); pointer-events: none;
}
@media (hover: hover) and (pointer: fine) {
  .kw-magnetic:hover::after { animation: kw-sheen 0.85s var(--kw-ease); }
}

@media (prefers-reduced-motion: reduce) {
  .js .kw-page-enter,
  .js .kw-enter,
  .js .kw-enter-slow,
  .js .kw-reveal {
    animation: none !important; transition: none !important;
    opacity: 1 !important; transform: none !important; filter: none !important;
  }
  .kw-aurora, .kw-gradient-text, .kw-float { animation: none !important; }
  .kw-gradient-text { -webkit-text-fill-color: currentColor; color: inherit; }
  .kw-magnetic::after { display: none; }
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 2: Build to verify**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat(motion): port KWVRS motion system (aurora/reveal/enter/lift), gold-adapted"
```

---

## Task 4: Port Reveal hook + components, mount globally

**Files:**
- Create: `src/hooks/use-reveal.ts`
- Create: `src/components/Reveal.tsx`
- Create: `src/components/ScrollProgress.tsx`
- Modify: `src/App.tsx` (mount `ScrollProgress`, add `kw-page-enter` wrapper)

- [ ] **Step 1: Create `src/hooks/use-reveal.ts`**

```ts
import { useEffect, useRef } from "react";

/**
 * Scroll-reveal hook. Attach the returned ref to an element carrying the
 * `kw-reveal` class; `is-visible` is added once when it scrolls into view.
 * SEO/no-JS safe (hidden state is gated behind `.js` in CSS). Reveals
 * immediately when reduced-motion is preferred or IO is unavailable.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
```

- [ ] **Step 2: Create `src/components/Reveal.tsx`**

```tsx
import type { ElementType, ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

export type RevealVariant = "up" | "left" | "right" | "scale";

const VARIANT_CLASS: Record<RevealVariant, string> = {
  up: "",
  left: "kw-reveal--left",
  right: "kw-reveal--right",
  scale: "kw-reveal--scale",
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  as?: ElementType;
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  variant = "up",
  as: Tag = "div",
  className = "",
}: RevealProps) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={`kw-reveal ${VARIANT_CLASS[variant]} ${className}`.trim()}
      style={delay ? { ["--kw-reveal-delay" as string]: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 3: Create `src/components/ScrollProgress.tsx`**

```tsx
import { useEffect, useRef } from "react";

/** Thin gold bar pinned to the top that fills as the page scrolls. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      el.style.setProperty("--kw-progress", String(p));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="kw-progress" aria-hidden="true" />;
}
```

- [ ] **Step 4: Mount in `src/App.tsx`**

Add the import near the other component imports:

```tsx
import ScrollProgress from "@/components/ScrollProgress";
```

Render `<ScrollProgress />` once inside the top-level layout (inside `<BrowserRouter>`, before `<Routes>`), e.g.:

```tsx
<BrowserRouter>
  <ScrollProgress />
  {/* ...existing header/routes... */}
</BrowserRouter>
```

If there is a single wrapping element around `<Routes>` (a `<main>` or `<div>`), add the `kw-page-enter` class to it so routed content fades in:

```tsx
<main className="kw-page-enter">
  <Routes>{/* ... */}</Routes>
</main>
```

If no such wrapper exists, wrap `<Routes>` in `<div className="kw-page-enter">`.

- [ ] **Step 5: Build to verify**

Run: `npm run build`
Expected: build succeeds; `@/hooks/use-reveal` and the two components resolve.

- [ ] **Step 6: Commit**

```bash
git add src/hooks/use-reveal.ts src/components/Reveal.tsx src/components/ScrollProgress.tsx src/App.tsx
git commit -m "feat(motion): add Reveal hook/component + ScrollProgress, mount globally"
```

---

## Task 5: Homepage hero — aurora treatment

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Convert the hero `<section>` to the KWVRS aurora pattern**

In `src/components/Hero.tsx`, change the outer `<section>` so it uses a navy gradient, `isolate`, the aurora + grid layers, and staggered entrance classes. Keep the existing copy/buttons/links. Pattern (adapt the inner content to the existing markup):

```tsx
<section className="relative isolate overflow-hidden bg-gradient-to-br from-navy via-navy to-navy-dark text-white min-h-[600px] flex items-center">
  <div className="kw-aurora" aria-hidden="true" />
  <div className="kw-grid" aria-hidden="true" />
  <div className="container mx-auto px-6 relative z-10">
    {/* existing grid/content — add entrance classes to the headline + subhead + CTA row: */}
    {/* <h1 className="kw-enter kw-enter-1 font-serif text-5xl lg:text-6xl font-bold ..."> */}
    {/* <p  className="kw-enter kw-enter-2 ..."> */}
    {/* <div className="kw-enter kw-enter-3 flex ... gap-4"> (button row) */}
  </div>
</section>
```

Concrete edits:
- Remove the old `bg-gradient-hero` and the decorative `<img heroImage>` overlay (the aurora replaces it). If you prefer to keep the photo, leave the `<img>` but place it under the aurora (`z-0`, lower opacity) — optional.
- Add `kw-enter kw-enter-1` to the `<h1>` and `font-serif` (headlines are serif now).
- Add `kw-enter kw-enter-2` to the lead `<p>`.
- Add `kw-enter kw-enter-3` to the CTA button row `<div>`.
- The three quick-contact tiles row: add `className="... kw-lift"` to each tile.

- [ ] **Step 2: Build to verify**

Run: `npm run build`
Expected: build succeeds. (`navy`/`navy-dark` are valid Tailwind colors from `tailwind.config.ts`.)

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat(hero): aurora+grid homepage hero with staggered entrance"
```

---

## Task 6: Apply hero treatment to the page templates

Apply the **same** aurora hero pattern from Task 5 to each template's top hero/header `<section>`. For each file: find the top hero `<section>`, give it `relative isolate overflow-hidden bg-gradient-to-br from-navy via-navy to-navy-dark text-white`, insert `<div className="kw-aurora" aria-hidden="true" />` and `<div className="kw-grid" aria-hidden="true" />` as the first children, wrap inner content in `relative z-10`, make the `<h1>` `font-serif kw-enter kw-enter-1`, and add `kw-enter kw-enter-2` to the subhead.

**Files (do these in three commits to keep changes reviewable):**

- [ ] **Step 1: Service/advisory cluster** — apply to:
  - `src/pages/Services.tsx`
  - `src/pages/ServiceHubPage.tsx`
  - `src/pages/ServiceLocationPage.tsx`
  - `src/pages/Advisory.tsx`

- [ ] **Step 2: Build + commit cluster 1**

Run: `npm run build` (expect success)
```bash
git add src/pages/Services.tsx src/pages/ServiceHubPage.tsx src/pages/ServiceLocationPage.tsx src/pages/Advisory.tsx
git commit -m "feat(hero): aurora heroes on service/advisory templates"
```

- [ ] **Step 3: Location cluster** — apply to:
  - `src/pages/Locations.tsx`
  - `src/pages/LocationServicesPage.tsx`
  - `src/pages/StatePage.tsx`
  - `src/pages/CaseTypeIndex.tsx`
  - `src/pages/CaseTypePage.tsx`

- [ ] **Step 4: Build + commit cluster 2**

Run: `npm run build` (expect success)
```bash
git add src/pages/Locations.tsx src/pages/LocationServicesPage.tsx src/pages/StatePage.tsx src/pages/CaseTypeIndex.tsx src/pages/CaseTypePage.tsx
git commit -m "feat(hero): aurora heroes on location/case-type templates"
```

- [ ] **Step 5: Company/conversion cluster** — apply to:
  - `src/pages/About.tsx`
  - `src/pages/Team.tsx`
  - `src/pages/Experience.tsx`
  - `src/pages/Contact.tsx`
  - `src/pages/CaseStudies.tsx`
  - `src/pages/ScheduleConsultation.tsx`
  - `src/pages/calculators/CalculatorsHub.tsx`

- [ ] **Step 6: Build + commit cluster 3**

Run: `npm run build` (expect success)
```bash
git add src/pages/About.tsx src/pages/Team.tsx src/pages/Experience.tsx src/pages/Contact.tsx src/pages/CaseStudies.tsx src/pages/ScheduleConsultation.tsx src/pages/calculators/CalculatorsHub.tsx
git commit -m "feat(hero): aurora heroes on company/conversion templates"
```

---

## Task 7: Scroll-reveals + hover-lift on content sections

**Files:**
- Modify: `src/pages/Index.tsx` (homepage body sections)
- Modify: card components used across pages: `src/components/Services.tsx`, `src/components/TeamTeaser.tsx`, `src/components/CaseStudyPreviews.tsx`, `src/components/RelatedServices.tsx`, `src/components/FAQSection.tsx`

- [ ] **Step 1: Wrap homepage body sections in `Reveal`**

In `src/pages/Index.tsx`, import Reveal and wrap each major below-the-fold `<section>` (services grid, team teaser, case studies, FAQ, CTA). Stagger grid children with `delay`:

```tsx
import Reveal from "@/components/Reveal";
// ...
<Reveal><SectionComponent /></Reveal>
// for a grid of N cards, wrap each card:
{items.map((item, i) => (
  <Reveal key={item.id} delay={i * 80} className="h-full">
    <Card {...} />
  </Reveal>
))}
```

- [ ] **Step 2: Add `kw-lift` to card surfaces**

In the listed card components, add `kw-lift` to the outermost card element's `className` (alongside existing classes). Example:

```tsx
<div className="rounded-xl border border-border bg-card shadow-card kw-lift ...">
```

- [ ] **Step 3: Build to verify**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Index.tsx src/components/Services.tsx src/components/TeamTeaser.tsx src/components/CaseStudyPreviews.tsx src/components/RelatedServices.tsx src/components/FAQSection.tsx
git commit -m "feat(motion): scroll-reveals + hover-lift on content sections"
```

---

## Task 8: QA — build, preview, contrast, prerender

**Files:** none (verification + any small contrast fixes)

- [ ] **Step 1: Full production build**

Run: `npm run build`
Expected: success, no type errors.

- [ ] **Step 2: Local preview and visual sweep**

Run: `npm run preview`
Open the served URL. Verify on **desktop and a mobile viewport** (DevTools device toolbar):
- Homepage hero: navy background, gold aurora glow, serif headline, staggered fade-in.
- Scroll: gold progress bar fills; section grids reveal on scroll; cards lift on hover.
- Visit one page per cluster: a service page, a location/state page, a case-type page, About/Team, Contact, calculators hub. Each should show the aurora hero + serif headline.
- Toggle OS "Reduce Motion" → reload → confirm content is fully visible and static (no hidden/blank sections).

- [ ] **Step 3: Contrast spot-check**

Check (e.g. DevTools color picker / contrast ratio):
- Hero eyebrow/label text on navy ≥ 4.5:1 (use gold-light `#d6b063` or white for small text on navy; gold `#C4973B` on navy is borderline for small text — use `text-white` or gold-light for eyebrows).
- Primary buttons: text on gold/navy ≥ 4.5:1.
- Body text (navy ink on warm white) ≥ 4.5:1.
Fix any failures by switching the offending text token to gold-light or white. If you change a file, re-run `npm run build`.

- [ ] **Step 4: Regenerate sitemap/prerender if the repo uses it**

Run: `node generate-sitemap.mjs` (present at repo root) and any prerender script if one exists (check `package.json` scripts and `scripts/`). Expected: regenerates without error.

- [ ] **Step 5: Commit any QA fixes**

```bash
git add -A
git commit -m "fix(design): contrast + QA adjustments for facelift"
```

(Skip if no changes were needed.)

---

## Task 9: Ship (gated on user confirmation)

**Files:** none (git push)

- [ ] **Step 1: STOP and confirm with the user before pushing**

Pushing `facelift/kwvrs-look` (or merging to `main`) will deploy via Railway and will **also carry the 18 pre-existing unpushed `main` commits** (team page, calculators, audit fixes). Confirm the user wants both shipped together, and confirm whether to merge into `main` or open a PR / deploy the branch.

- [ ] **Step 2: Merge + push (per user's chosen method)**

Example (direct-to-main, if the user approves):
```bash
git checkout main
git merge --no-ff facelift/kwvrs-look -m "feat: KWVRS visual facelift (navy+gold, fonts, motion)"
git push origin main
```
Expected: push succeeds; Railway picks up the deploy.

- [ ] **Step 3: Verify the deployed site**

After Railway finishes, load `kweconomics.com` and confirm the navy+gold + serif + motion look is live, hero renders, no broken sections.

---

## Self-review notes

- **Spec coverage:** Color recolor (Task 1) ✓; typography (Task 2) ✓; motion CSS (Task 3) ✓; ported components + mount (Task 4) ✓; heroes homepage + templates (Tasks 5–6) ✓; reveals + lift (Task 7) ✓; QA/build/contrast/prerender (Task 8) ✓; ship gate carrying the 18 commits (Task 9) ✓. Dark-mode "recolor-not-break" handled in Task 1 Step 2 ✓.
- **Out-of-scope respected:** no content/copy rewrites, no routing changes, accent stays gold (not amber), KWVRS repo untouched, no Tailwind v4 migration. The flagged content-rule violations (stat numbers, "Free Case Assessment") are intentionally NOT addressed here.
- **Type/name consistency:** `useReveal` hook ↔ `Reveal` import path `@/hooks/use-reveal`; `ScrollProgress` default export ↔ App import; `kw-*` class names match between the CSS (Task 3) and usages (Tasks 5–7). Tailwind `navy`/`navy-dark`/`gold` colors come from `tailwind.config.ts` (navy/gold families) — note: if `gold` is referenced as a Tailwind class anywhere, ensure a `gold` color family is added to `tailwind.config.ts` mapping to `--gold*`; this plan only uses `text-navy`/`from-navy` (existing) and raw `--kw-gold*` in CSS, so no new Tailwind color class is strictly required.
```
