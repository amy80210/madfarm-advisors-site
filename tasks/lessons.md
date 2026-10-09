# Lessons

- 2026-10-08: Before a scaffold, check the framework's latest major on npm (`npm view <pkg> dist-tags`). Do not copy versions from a baseline repo. The plan named SvelteKit 2; SvelteKit 3 was current.
- 2026-10-08: A site with `csr = false` on Vercel fails in `adapter-vercel` 7.0.0 when Skew Protection is on. `vite.config.ts` clears `VERCEL_SKEW_PROTECTION_ENABLED`; remove that line when the adapter handles a missing client entry.
- 2026-10-08: Scroll-driven reveals need a length range (`entry 0px entry 64px`), not a percentage. A percentage leaves a block that rests at the fold half transparent, and axe reports it as low contrast.
