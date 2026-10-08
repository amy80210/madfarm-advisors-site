import {
	CONTACT_EMAIL,
	getPage,
	SITE_NAME,
	SITE_URL,
	type SitePage,
	type SitePath
} from './site.ts';

export type JsonLd = Record<string, unknown>;

/** Always built from the SITE_URL constant, never the request origin, so preview deploys stay correct. */
export function canonicalUrl(path: SitePath): string {
	return `${SITE_URL}${path}`;
}

function absoluteUrl(pathOrUrl: string): string {
	return /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
}

/** Home > … > this page, following the `parent` chain in the registry. */
export function breadcrumbChain(path: SitePath): SitePage[] {
	const chain: SitePage[] = [];
	let current: SitePage | undefined = getPage(path);
	while (current) {
		chain.unshift(current);
		current = current.parent ? getPage(current.parent) : undefined;
	}
	return chain;
}

export function buildBreadcrumbSchema(path: SitePath): JsonLd | null {
	if (path === '/') return null;
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: breadcrumbChain(path).map((page, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: page.breadcrumb,
			item: canonicalUrl(page.path)
		}))
	};
}

function buildHomeSchemas(): JsonLd[] {
	return [
		{
			'@context': 'https://schema.org',
			'@type': 'FinancialService',
			additionalType: 'https://en.wikipedia.org/wiki/Investment_banking',
			name: SITE_NAME,
			url: `${SITE_URL}/`,
			logo: `${SITE_URL}/images/logos/madfarm-stack-dark.png`,
			image: `${SITE_URL}/images/og/home.jpg`,
			description:
				'Lower middle market investment bank selling mission-critical businesses — industrials, commercial services, software, and professional services. Senior representation on every deal.',
			email: CONTACT_EMAIL,
			foundingDate: '2020',
			areaServed: 'US',
			knowsAbout: [
				'Sell-side M&A',
				'Lower middle market',
				'Mergers and acquisitions advisory',
				'Industrials',
				'Commercial services',
				'Software',
				'Professional services'
			],
			memberOf: { '@type': 'Organization', name: 'Alliance of Mergers & Acquisitions Advisors' }
		},
		{ '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` }
	];
}

export function serializeJsonLd(data: JsonLd): string {
	return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** The full JSON-LD tag, for `{@html}` in `<svelte:head>`. */
export function jsonLdScript(data: JsonLd): string {
	return `<script type="application/ld+json">${serializeJsonLd(data)}</${'script'}>`;
}

export type ResolvedSeo = {
	title: string;
	description: string;
	url: string;
	image: string;
	imageAlt: string;
	ogType: SitePage['ogType'];
	structuredData: JsonLd[];
};

export function resolveSeo(path: SitePath): ResolvedSeo {
	const page = getPage(path);
	const breadcrumb = buildBreadcrumbSchema(path);
	return {
		title: page.title,
		description: page.description,
		url: canonicalUrl(path),
		image: absoluteUrl(page.ogImage),
		imageAlt: `${SITE_NAME}: ${page.title.split(' | ')[0]}`,
		ogType: page.ogType,
		structuredData: breadcrumb ? [breadcrumb] : buildHomeSchemas()
	};
}
