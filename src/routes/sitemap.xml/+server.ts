import { canonicalUrl } from '#lib/seo.ts';
import { pages } from '#lib/site.ts';
import type { RequestHandler } from './$types';

// fallow-ignore-next-line unused-export -- SvelteKit reads this page option
export const prerender = true;

export const GET: RequestHandler = () => {
	const urls = pages
		.map(
			(page) =>
				`  <url><loc>${canonicalUrl(page.path)}</loc><changefreq>${page.sitemap.changefreq}</changefreq><priority>${page.sitemap.priority}</priority></url>`
		)
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
