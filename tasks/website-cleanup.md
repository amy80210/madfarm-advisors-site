# Website cleanup: madfarm-advisors.com

Pre-launch pass following Rebar's `website-cleanup` checklist (rebar-code/rebar-skills), adapted for a static HTML site on Vercel.
Audits: axe-core 4.8.4 and `hover-contrast.js` from `compliance-testing`, run on all 11 pages at 1280 px; overflow check at 320, 375, 390, 414, 768, 1024 and 1280 px.

| # | Area | Issue | Fix | Status |
|---|------|-------|-----|--------|
| 1 | A11y | "Explore Case Studies" / "Schedule a Call" underline links, hover: #C85A22 on #1C2024, 3.86:1 (6 pages) | Hover uses `--copper-on-dark` #E8853F, 6.13:1 | done |
| 2 | A11y | About team chip, hover: arrow #E8853F on lighter chip, 4.21:1 | Lighter hover wash (8%), 4.83:1 | done |
| 3 | A11y | Copper button on dark sections hovers to steel and disappears into the section | Hovers to white with steel text on hero, page hero, CTA band and contact panel | done |
| 4 | A11y | `--ink-mute` captions #75787C, 3.7-4.4:1 (case cards, quotes, resources, form "(optional)") | Darkened to #63666A, 4.6:1+ on every light surface | done |
| 5 | A11y | Homepage "01-04" pillar numbers at 50% opacity, 2.2:1 | Full opacity, 5.4:1 | done |
| 6 | A11y | Process "fixed half" eyebrow copper on steel, 2.75:1 | `--copper-on-dark` | done |
| 7 | A11y | Heading levels skipped (footer h5, case-study and team h4, card h3 under h1) | Footer and card headings re-levelled; hidden h2 on Case Studies and Resources; styling unchanged | done |
| 8 | A11y | Advisor cards: `aria-label` on a span, photo alt repeats the name | Icon and photo marked decorative (the card link already names the advisor) | done |
| 9 | A11y | No skip link, no visible keyboard focus style | "Skip to content" link on every page; copper `:focus-visible` outline (brighter on dark) | done |
| 10 | A11y | Mobile menu: no Escape, no focus handling, page behind still reachable, links tabbable while closed | Escape closes and returns focus; focus moves into menu; page behind is `inert`; closes past 720 px; `aria-controls`; `100dvh` | done |
| 11 | A11y | FAQ buttons don't report open/closed; collapsed answers still tabbable | `aria-expanded` / `aria-controls`; collapsed answers hidden | done |
| 12 | SEO | Titles up to 83 chars, descriptions up to 239 chars, em dashes | All 11 pages: titles 31-54 chars, descriptions 136-160 | done |
| 13 | SEO | One shared social image; no `og:image:alt`, `og:site_name`, `twitter:*` on inner pages | Per-page 1200x630 share card in `images/og/` (48-108 KB); full OG + Twitter tag set on every page | done |
| 14 | SEO | Structured data only on home | `WebSite` on home, `BreadcrumbList` on every inner page; homepage schema image updated | done |
| 15 | SEO | No `theme-color` | Added (#1C2024) | done |
| 16 | Redirects | Old Squarespace URLs would 404 after launch | `vercel.json` 301s: /home, /about, /contact, /privacy-policy, /guide-valuations, /ma-acronym-glossary, /guide-timeline (with and without trailing slash; query strings kept) | done |
| 17 | Legal | No privacy policy (old site had one; the contact form collects personal data) | `privacy-policy.html` ported from the old site, contact email updated to info@, contact-form paragraph added, linked in every footer, in sitemap | done, needs Spencer's review |
| 18 | Perf | Google Fonts loaded from a third party (render-blocking) | Self-hosted woff2 (Inter variable + Libre Baskerville 400/400i/700, ~110 KB), two preloaded | done |
| 19 | Perf | Hero image not prioritised; below-fold images load eagerly | Homepage hero `fetchpriority="high"`; images after the first section `loading="lazy"` | done |
| 20 | Scaffold | 15 unused images (~2 MB: `vs-*`, `*-src`, `human.jpg`, `madfarm-mark.png`) and the old `og-image.jpg` | Removed (recoverable from git history) | done |
| 21 | Scaffold | `onerror` "photo to add" placeholder handlers on headshots | Removed | done |
| 22 | Copy | Two "Coming soon" Resources cards linked to `#` | Plain cards, not links | done |
| 23 | Mobile | Sideways scroll at phone widths: About team cards, Carve-Out stat tiles, Contact form (475 px fields) | Stacked layouts and constrained form fields; no overflow on any page at any tested width | done |
| 24 | Mobile | Form inputs at 15.7 px make iOS Safari zoom on focus | 16 px | done |
| 25 | Forms | No spam protection or length limits | Honeypot field (bots get a fake success), server-side length caps, `maxlength` on inputs | done |
| 26 | Security | No security headers; repo working files publicly downloadable | `vercel.json`: nosniff, Referrer-Policy, HSTS, X-Frame-Options, Permissions-Policy, CSP (site loads nothing third-party); `.vercelignore` for SEO-CHECKLIST.md, print/, tasks/, og/ | done |

## Before / after

| Metric | Before | After |
|--------|--------|-------|
| axe violations (nodes, 10 pages) | 51 across 4 rules | 0 (11 pages) |
| Hover/focus contrast failures | 6 | 0 |
| Pages that scroll sideways on phones | 3 | 0 |
| Third-party requests on page load | Google Fonts (2 hosts) | none |
| Share images | 1 shared | 11, one per page |
| Old-site URLs that 404 | 7 | 0 |
| Lighthouse (mobile / desktop) | not run | run on the Vercel preview (chrome-devtools MCP not installed here) |

## Left for a human

- **Spencer:** review the privacy policy wording (ported from the old Squarespace page).
- **Vercel domains:** add both `madfarm-advisors.com` and `www.madfarm-advisors.com`, with www redirecting to the apex (the site's canonical host). Then move DNS off Squarespace.
- **MailerSend:** `MAILERSEND_API_KEY` in Vercel and the sending domain verified (already in SEO-CHECKLIST.md).
- **Firewall:** `vercel-bot-block` was not run (needs a `VERCEL_TOKEN` and the team slug). Dry run first, then `--apply`.
- **After deploy:** check one share link in the LinkedIn Post Inspector; submit `sitemap.xml` in Google Search Console; run Lighthouse on the preview URL.
- **Optional:** Vercel BotID on `/api/contact` if spam gets past the honeypot.
- Share images: edit the list in `og/render.sh` and re-run it when a page headline changes.
