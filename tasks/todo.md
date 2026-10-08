# Rebuild madfarm-advisors-site on SvelteKit

## Context

Clint delivered the site as 11 hand-written `.html` files, one 1172-line `css/style.css`, `js/main.js` and one Vercel function, `api/contact.js`. Every page repeats the header, footer and `<head>`. Images need a manual `npm run images` step.

We rebuild it in the same repo as a prerendered SvelteKit site. It is a faithful port: same design, same copy, same behavior. Content stays in `.svelte` files. No CMS, no Markdown, no Tailwind, no shadcn. Styles follow the `good-css` skill in `.agents/skills/good-css`.

Outcome: one layout, shared components with scoped styles, automatic image variants, and no client JavaScript.

## Decisions (defaults; change any at review)

| Topic | Decision |
| --- | --- |
| Baseline to copy | `matchstick-website` for `package.json`, `Seo.svelte` + `seo.ts`, Vitest and Playwright config. `workbench-website` for `eslint.config.js` and the `?enhanced` image rule. |
| Package manager | npm, as in both examples. |
| Adapter | `@sveltejs/adapter-vercel`. Root `+layout.ts`: `prerender = true`, `csr = false`. |
| JavaScript | None shipped. `csr = false` keeps the strict `script-src 'self'` CSP in `vercel.json` unchanged. |
| URLs | Clean URLs (`/about`). Every old `.html` URL gets a 301. |
| Case studies | 4 route files under `/case-studies/`, each holding its own copy. No `[slug]` data route. |
| Images | `@sveltejs/enhanced-img`. Sources move to `src/lib/assets/`. The 130 committed variants and `scripts/optimize-images.mjs` go away. |
| Contact | `src/routes/contact/+page.server.ts` form action with MailerSend. This one route sets `prerender = false`. |
| Branch | `sveltekit-rebuild` from `origin/main`. `optimize-images` stays separate; the rebuild replaces it. |
| CI | Not added. Neither example has it. |

## Technical design

### Component rules

Shared components are the default. A block used 2 or more times becomes one component in `src/lib/components/`; the inventory found about 20.

| Need | Mechanism | Example |
| --- | --- | --- |
| Fixed variant | Typed prop that maps to a modifier class in the scoped style | `<Button variant="copper">`, `<SectionHead align="center">`, `<Eyebrow tone="dark">` |
| Continuous value | CSS variable the component exposes, with a default | `<CtaBand --cta-bg-opacity="0.26">`, `<PageHero --hero-title-size="var(--step-4)">` |
| Copy and inner markup | Snippets (`children` and named snippets), so text stays in the page file | `<QuoteBlock>{#snippet attribution()}…{/snippet}</QuoteBlock>` |
| Attributes | `...rest` spread on the root element | `id`, `aria-labelledby` |
| Placement | The parent owns spacing with `gap` on a stack or grid. A shared component sets no outer margin. | `references/spacing-and-shape.md` |

- `class` pass-through accepts global utilities only (`.narrow`, `.visually-hidden`). A parent's scoped class cannot reach a child's markup in Svelte, so CSS variables do that job.
- No arbitrary `style` strings as props. Each exposed variable is listed in a comment at the top of the component's `<style>`.
- A component adapts to its slot with container queries, not with page breakpoints (`references/layout.md`).
- A block used once stays in its page file or a page-local component. No abstraction for a single use.
- Every style rule follows the "In all CSS" list in `.agents/skills/good-css/SKILL.md`, and the matching reference file is read before the component is written.

### CSS variables

All global tokens live in one `:root` block in `src/app.css`, in three tiers.

| Tier | Examples | Rule |
| --- | --- | --- |
| Primitive | `--steel`, `--copper`, `--chalk`, `--sand` | Raw values. Names stay as Clint wrote them. Only tier 2 reads them. |
| Semantic | `--surface`, `--text`, `--text-soft`, `--accent`, `--hairline` | Components read only these. |
| Scale | `--step--1` to `--step-5`, `--space-*`, `--radius`, `--maxw`, `--gutter`, `--ease`, `--dur-*` | One fluid `clamp()` scale for type and space. |

- **Dark sections:** `.bg-steel` redeclares the semantic tokens (`--surface`, `--text`, `--accent: var(--copper-on-dark)`). This replaces the 45-line selector list at `css/style.css:651-695` that patches each component on dark.
- **Component variants:** a component exposes its own custom properties, set by a prop through `style:--x` on its root. Example: `<CtaBand bgOpacity={0.26}>` sets `--cta-bg-opacity`. This replaces the 90 inline `style=""` attributes.
- **Scoped styles never redefine global tokens.** They read them.
- `@property` only for a token that animates.
- PR 1 keeps the hex values. PR 2 converts them to `oklch()`.

### Canonical, sitemap, breadcrumbs

One route registry, `src/lib/site.ts`, lists every page once: `path`, `title`, `description`, `navLabel`, `breadcrumb`, `parent`, `ogImage`, `ogType`. It feeds five things: header nav, footer links, `Seo.svelte`, `sitemap.xml`, and the e2e SEO matrix.

- **Canonical:** `SITE_URL + path`. `SITE_URL` is the constant `https://madfarm-advisors.com`, never the request origin, so preview deploys stay correct. No trailing slash; home is `/`. `og:url` always equals the canonical. `kit.prerender.origin` is set to the same value.
- **Old URLs:** each `.html` URL returns a 301 to its clean URL, and the sitemap lists only clean URLs.
- **Breadcrumbs:** JSON-LD `BreadcrumbList` only, as today. It is built from the `parent` chain in the registry: 2 levels for top pages, 3 for case studies (Home > Case Studies > name). No visible breadcrumb is added, because the current design has none.
- **JSON-LD output:** `serializeJsonLd()` from `matchstick-website/src/lib/seo.ts`, which escapes `<`.
- **Unit test:** every registry entry yields an absolute canonical, and no path ends in `.html` or `/`.

### Deals (tombstones)

- `src/lib/deals/Tombstone.svelte`: one deal. It renders seller, "acquired by", buyer and the role tag.
- `src/lib/deals/deals.ts`: one typed entry per deal. The array order is the display order.
- `DealsMarquee.svelte` reads the list and builds the second, `aria-hidden` half itself. Nobody duplicates markup by hand.

```ts
type Party =
  | { kind: 'logo'; name: string; logo: Picture; displayWidth: number; tall?: boolean }
  | { kind: 'wordmark'; name: string }
  | { kind: 'confidential'; descriptor: string };

type Deal = {
  id: string;
  seller: Party;
  buyer: Party;
  relation: 'acquired by';
  role: 'Exclusive Sell-Side Advisor';
  closed: { year: number; month?: number } | null; // recorded, not rendered
  closedSource: string | null; // where the date came from
  sector?: string;
  caseStudy?: string; // route path
};
```

To add a deal: put the logos in `src/lib/assets/deals/`, add one entry. A Vitest test fails if an entry has no `closed` value and no `// date unknown` marker.

Dates: the repo gives 3 of 6 (`case-hvac.html:87` November 2025, `case-industrial.html:87` November 2024, `case-carveout.html:87` 2023). I match each date to its deal from the page content and public press releases, and record the source. Deals I cannot date stay `null` and go in `## Action required`.

### Accessibility (target: WCAG 2.2 AA)

Native elements carry the roles and states. No ARIA is maintained by hand.

| Piece | Standard used | WCAG points |
| --- | --- | --- |
| FAQ | `<details name="faq">` with `<summary><h3>` | Keyboard and expanded state are native (2.1.1, 4.1.2). Full-row summary, at least 44px high (2.5.8). `:focus-visible` ring (2.4.7). Height animation only in `prefers-reduced-motion: no-preference`; browsers without `interpolate-size` open with no animation. Browser find-in-page opens a closed answer. |
| Mobile menu | `<nav popover>` opened by `<button popovertarget>` | Escape closes and focus returns to the button, both native. `body:has(nav:popover-open) :is(main, footer) { visibility: hidden }` removes the page behind from the tab order and from screen readers, which replaces the `inert` script. At 721px and up the same `<nav>` shows inline. |
| Deals marquee | CSS animation | Stops under `prefers-reduced-motion: reduce`. Pauses on hover and on `:focus-within`. **Gap today:** 2.2.2 needs a visible pause control for motion over 5 seconds. I add a small pause toggle (a checkbox styled as a button, `:has(:checked)` pauses the track). This is the one visible addition to the design. |
| Scroll reveal | `animation-timeline: view()` in `@supports` | Content is visible by default, so nothing depends on script or support (today it is invisible until `main.js` runs). |
| Contact form | Native `<form method="POST">` | Visible `<label>` per field; `autocomplete` on name, email, tel, organization (1.3.5); `required` and `type="email"` with `:user-invalid` styles; server errors in a `role="alert"` summary plus `aria-invalid` and `aria-describedby` per field (3.3.1, 3.3.3); the action URL carries `#contact-form` so the reload lands on the result. Honeypot stays hidden from screen readers. |
| Chrome | Skip link, `<header>`, `<nav aria-label>`, `<main>`, `<footer>` | One `<h1>` per page, no skipped heading levels, `aria-current="page"` from the registry, external links keep `rel="noopener"`. |
| Type and zoom | `rem`-based `clamp()` | Text resizes at 200% zoom (1.4.4); no horizontal scroll at 320px (1.4.10). |

Checks beyond axe, because axe finds under half of real issues:
- `tests/e2e/keyboard.spec.ts`: Tab order through header, open and close the menu with keyboard, Escape returns focus, FAQ opens with Enter and Space, focus never lands behind the open menu.
- One manual VoiceOver pass on `/`, `/contact` and one case study, with notes in the PR.
- If the popover menu fails that pass, the fallback is `<dialog>` with a small external script. I report it before I switch.

## Stacked PRs

### PR 1: faithful port

Gate: the new site matches the current site in a screenshot diff.

1. **Scaffold.** SvelteKit 2, Svelte 5 runes, TypeScript strict, ESLint, Prettier, Vitest, Playwright, `enhancedImages()` in `vite.config.ts`. Commit `.agents/skills/good-css` and `skills-lock.json`.
2. **Static files.** `fonts/`, `downloads/`, `images/og/`, `images/favicon/`, `robots.txt` move to `static/`. `print/` and `og/` stay as build tools outside the deploy.
3. **Global CSS.** `src/app.css` keeps only `@font-face`, the `:root` tokens, the reset, typography and the utilities (`.wrap`, `.narrow`, `.bg-*`, `.visually-hidden`). The second `:root` at `css/style.css:658` merges into the first.
4. **Layout and SEO.** `src/routes/+layout.svelte` renders skip link, `Header`, `<main id="main">`, `Footer`. `Seo.svelte` + `seo.ts` produce title, description, canonical, OG, Twitter and JSON-LD (`FinancialService` + `WebSite` on home, `BreadcrumbList` elsewhere).
5. **Shared components** in `src/lib/components/`, each with its scoped `<style>` moved from `css/style.css`: `Header`, `Footer`, `Seo`, `Eyebrow`, `Button`, `SectionHead`, `PageHero`, `CtaBand`, `QuoteBlock`, `FeatureSplit`, `Icon`.
6. **Page components** next to their route: home (`Hero`, `DealsMarquee`, `Founder`, `SectorCard`, `Pillar`, `Faq`), about (`Leader`, `ExecCard`, `Advisor`), process (`Journey`), case studies (`CaseCard`, `Snapshot`, `StatTiles`, `CsList`), contact (`BeforeCard`, `Field`), resources (`ResCard`).
7. **Routes.** `/`, `/about`, `/process`, `/case-studies`, `/case-studies/carveout`, `/case-studies/hvac`, `/case-studies/industrial`, `/case-studies/saas`, `/contact`, `/resources`, `/privacy-policy`, plus a prerendered `sitemap.xml/+server.ts`.
8. **Replace `js/main.js` with HTML and CSS**, per `references/show-and-hide.md`, `interaction.md` and `scroll-and-viewport.md`:
   - FAQ: `<details name="faq">`.
   - Mobile menu: popover with `popovertarget`; scroll lock via `:has(:popover-open)`.
   - `.reveal`: `animation-timeline: view()` inside `@supports`. Content is visible where unsupported.
   - Header `scrolled` state: `animation-timeline: scroll()` inside `@supports`.
   - Contact form: native POST to the form action. Errors and success render from the `form` prop. Honeypot `website` field stays.
9. **Contact action.** Port validation, length caps, subject routing and email body from `api/contact.js` into `src/lib/server/contact.ts`. Read `MAILERSEND_API_KEY` from `$env/dynamic/private`. Delete `api/contact.js`.
10. **`vercel.json`.** Keep all headers. Remove the 8 redirects that point `/about`, `/contact`, `/privacy-policy` to `.html` (they would loop). Repoint the 4 guide redirects to `/resources` and `/process`. Add 301s for the 11 old `.html` URLs.
11. **Cleanup in the port.** Drop about 60 dead selectors. Turn about 90 inline `style=""` attributes into props or classes. Delete the 11 `.html` files, `css/`, `js/`, `api/`, `scripts/optimize-images.mjs`.

Small fixes that change current behavior:
- `aria-current="page"` on every page. Today only `process.html` sets it.
- "Schedule a Call" in the header and footer always opens the Google Calendar link. Today `case-carveout.html` and `case-saas.html` point to `contact.html`.
- Stray `</div>` at `index.html:322` removed.
- `.ico` class collision between the FAQ icon and the icon tile resolved by scoping.

Not changed: all copy, including the "thirty-three weeks" line on `resources.html:87` that conflicts with `process.html`.

### PR 2: good-css pass (stacked on PR 1)

Gate: screenshot diff against PR 1.

- 16 hex colors to `oklch()`; hovers and tints from `color-mix(in oklch, …)`.
- Physical properties to logical properties.
- One fluid `clamp()` scale for type and space, per `references/foundations.md`.
- The 22 width `@media` queries to intrinsic grids, subgrid and container queries, per `references/layout.md`.
- Every `:hover` inside `@media (hover: hover) and (pointer: fine)`; `:active` on everything pressable; `:focus-visible` outlines.
- Motion inside `prefers-reduced-motion: no-preference`, with named properties.
- Check each entry's `Support:` line and report any gap.

## Execution method

- Steps 1 to 5 (scaffold, tokens, layout, shared components): inline, because every page depends on them.
- Steps 6 to 7 (11 pages): subagents, `model: opus`, one per page group (home, about, process, case studies ×4, contact + resources + privacy). Each has a checkable result: its page passes the screenshot diff.
- Screenshot diff: a script.
- PR 2: inline, one reference file at a time, diff after each.

## Verification

1. **Screenshot diff script** `scripts/visual-diff.mjs` (Playwright): 11 pages × 3 widths (390, 820, 1440), reduced motion on, old site served from `origin/main` on a claimed port against the new build. Report the mismatch percent per page. Target under 1% per page for PR 1.
2. **e2e** in `tests/e2e/`:
   - `no-js.spec.ts`: JavaScript disabled; menu opens, FAQ opens, contact validation errors show.
   - `seo.spec.ts`: title, description, canonical and `og:*` for all 11 pages match values taken from the old HTML.
   - `a11y.spec.ts`: axe on all 11 pages, zero violations.
   - `contact.spec.ts`: required fields, bad email, honeypot returns success without sending.
3. **Unit** (`vitest`): `seo.test.ts`, `contact.test.ts` (validation, caps, subject routing, HTML escaping).
4. **Build output check:** `grep -L "<script" .svelte-kit/output/prerendered/pages/*.html` lists every page except JSON-LD blocks; no `_app/immutable/entry` script tags.
5. **Vercel preview:** `curl -sI` each of the 11 old `.html` URLs and the 6 guide redirects returns 301 to the right target; the CSP header is present; one real contact submission arrives.
6. **Lighthouse** (`pagespeed` skill) on `/` and `/case-studies/carveout`, before and after numbers in the PR body.
7. `npm run check`, `npm run lint`, fallow clean for new code.

## First actions after approval

1. Copy this plan to `tasks/todo.md`.
2. `~/.claude/scripts/worktree-claim.sh sveltekit-rebuild --base origin/main`, then `EnterWorktree`.
3. `~/.claude/scripts/tmux-name.sh "madfarm sveltekit-rebuild"`.

## Action required (yours, at the end)

- Set `MAILERSEND_API_KEY` for the Vercel Preview environment, if it is set only for Production today.
- Give the closing year for each deal I could not date (up to 3 of 6).
- Review and merge PR 1, then PR 2.
