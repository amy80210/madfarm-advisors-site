// A static site. Every page is prerendered and ships no JavaScript,
// which keeps the strict `script-src 'self'` CSP in vercel.json valid.
// /contact overrides `prerender` because its form action runs on the server.
export const prerender = true;
export const csr = false;
