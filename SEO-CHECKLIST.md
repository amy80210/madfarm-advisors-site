# Madfarm Advisors — SEO & Launch Checklist

## Done (in the build)
- [x] Unique `<title>` + meta description on every page
- [x] Open Graph + Twitter card tags + per-page share images in `images/og/` (regenerate with `og/render.sh`)
- [x] Canonical URLs on every page
- [x] Favicon set (32, 192, apple-touch)
- [x] `robots.txt` + `sitemap.xml`
- [x] JSON-LD structured data (`FinancialService`) on the homepage
- [x] Semantic headings, descriptive alt text, mobile-responsive
- [x] `case-study.html` set to `noindex` while it's a stub

## Before launch — confirm / replace
- [x] **Contact:** public contact is `info@madfarm-advisors.com` + Google Calendar booking link; phone is intentionally NOT public
- [x] **Founding year:** late 2020 (schema set to 2020)
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
