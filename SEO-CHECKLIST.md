# Madfarm Advisors — SEO & Launch Checklist

## Done (in the build)
- [x] Unique `<title>` + meta description on every page
- [x] Open Graph + Twitter card tags + `images/og-image.jpg` (1200×630)
- [x] Canonical URLs on every page
- [x] Favicon set (32, 192, apple-touch)
- [x] `robots.txt` + `sitemap.xml`
- [x] JSON-LD structured data (`FinancialService`) on the homepage
- [x] Semantic headings, descriptive alt text, mobile-responsive
- [x] `case-study.html` set to `noindex` while it's a stub

## Before launch — confirm / replace
- [x] **Contact:** public contact is `info@madfarm-advisors.com` + Google Calendar booking link; phone is intentionally NOT public
- [ ] **Founding year:** site says 2021 (logo/schema), Spencer's bio says founded late 2020 — reconcile
- [x] **Tombstones:** 6 closed deals with logos (homepage scroll + hero ticker), per MF Logos list
- [x] **Headshots:** Spencer, Will, Tim updated
- [ ] **About page images** (when provided)
- [ ] **Case study** → replace `case-study.html` stub with real content or a Gamma link
- [ ] Real deal figures/dates for tombstones, if disclosable

## Deploy (when ready — mirrors Loveland)
- [ ] New GitHub repo under `amy80210`
- [ ] Import to Vercel → preview URL
- [ ] Add `MAILERSEND_API_KEY` env var in Vercel (see `.env.example`)
- [ ] Verify sending domain in MailerSend (`noreply@madfarm-advisors.com`)
- [ ] Point `madfarm-advisors.com` DNS at Vercel
- [ ] Submit sitemap in Google Search Console
