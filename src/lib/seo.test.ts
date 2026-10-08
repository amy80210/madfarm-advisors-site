import { describe, expect, it } from 'vitest';
import {
	breadcrumbChain,
	buildBreadcrumbSchema,
	canonicalUrl,
	resolveSeo,
	serializeJsonLd
} from './seo.ts';
import { footerNav, headerNav, pages, SITE_URL } from './site.ts';

describe('route registry', () => {
	it('lists 11 pages with unique paths', () => {
		expect(pages).toHaveLength(11);
		expect(new Set(pages.map((page) => page.path)).size).toBe(11);
	});

	it.each(pages)('$path has an absolute canonical and a clean path', (page) => {
		const url = canonicalUrl(page.path);
		expect(url.startsWith(`${SITE_URL}/`)).toBe(true);
		expect(page.path.endsWith('.html')).toBe(false);
		if (page.path !== '/') expect(page.path.endsWith('/')).toBe(false);
	});

	it.each(pages)('$path keeps its old .html URL for the 301', (page) => {
		expect(page.legacyPath).toMatch(/^\/[a-z-]+\.html$/);
	});

	it('gives every nav link a label', () => {
		expect(headerNav.map((link) => link.label)).toEqual([
			'Process',
			'Case Studies',
			'About',
			'Contact'
		]);
		expect(footerNav.map((link) => link.label)).toEqual([
			'About',
			'Process',
			'Case Studies',
			'Resources'
		]);
	});
});

describe('resolveSeo', () => {
	it('uses the constant site URL for the home canonical', () => {
		expect(resolveSeo('/').url).toBe('https://madfarm-advisors.com/');
	});

	it('builds the image alt from the title without the brand suffix', () => {
		expect(resolveSeo('/process').imageAlt).toBe('Madfarm Advisors: The Sell-Side Process');
		expect(resolveSeo('/').imageAlt).toBe('Madfarm Advisors: Madfarm Advisors');
	});

	it('puts FinancialService and WebSite on home only', () => {
		expect(resolveSeo('/').structuredData.map((schema) => schema['@type'])).toEqual([
			'FinancialService',
			'WebSite'
		]);
		expect(resolveSeo('/about').structuredData.map((schema) => schema['@type'])).toEqual([
			'BreadcrumbList'
		]);
	});
});

describe('breadcrumbs', () => {
	it('has 2 levels for a top page', () => {
		expect(breadcrumbChain('/about').map((page) => page.breadcrumb)).toEqual(['Home', 'About']);
	});

	it('has 3 levels for a case study', () => {
		const schema = buildBreadcrumbSchema('/case-studies/hvac');
		expect(schema?.itemListElement).toEqual([
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://madfarm-advisors.com/' },
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Case Studies',
				item: 'https://madfarm-advisors.com/case-studies'
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: 'Commercial HVAC',
				item: 'https://madfarm-advisors.com/case-studies/hvac'
			}
		]);
	});

	it('has none for home', () => {
		expect(buildBreadcrumbSchema('/')).toBeNull();
	});
});

describe('serializeJsonLd', () => {
	it('escapes "<" so a value cannot close the script tag', () => {
		expect(serializeJsonLd({ name: '</script><b>' })).not.toContain('<');
	});
});
