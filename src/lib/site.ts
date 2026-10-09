// The route registry. Every page is listed once. It feeds the header nav,
// the footer links, Seo.svelte, sitemap.xml and the e2e SEO matrix.

export const SITE_URL = 'https://madfarm-advisors.com';
export const SITE_NAME = 'Madfarm Advisors';
export const CONTACT_EMAIL = 'info@madfarm-advisors.com';
export const SCHEDULE_URL =
	'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0SPZqSb-E2HhHyk3IjZ08Nt1dkyxakiIWX0lumyj8OQpdlR3kehUxgAIQfdVb7jfjI8W2z7oEw';

/** The page that embeds `SCHEDULE_URL`. Every "Schedule a Call" link goes here. */
export const SCHEDULE_PATH = '/schedule';

export type SitePath =
	| '/'
	| '/process'
	| '/about'
	| '/case-studies'
	| '/case-studies/industrial'
	| '/case-studies/hvac'
	| '/case-studies/carveout'
	| '/case-studies/saas'
	| '/resources'
	| '/contact'
	| '/schedule'
	| '/privacy-policy';

export type SitePage = {
	path: SitePath;
	title: string;
	description: string;
	/** Name of this page in the BreadcrumbList. */
	breadcrumb: string;
	/** Parent page in the breadcrumb chain. Home has none. */
	parent?: SitePath;
	/** Label in the header nav and footer. Pages without one are not linked there. */
	navLabel?: string;
	ogImage: string;
	ogType: 'website' | 'article';
	/** The `.html` URL this page had before the rebuild. It returns a 301. Newer pages have none. */
	legacyPath?: string;
	sitemap: { changefreq: 'monthly' | 'yearly'; priority: string };
};

// The array order is the sitemap order.
export const pages: SitePage[] = [
	{
		path: '/',
		title: 'Madfarm Advisors | Lower Middle Market M&A Advisors',
		description:
			'Senior-led sell-side M&A for owners of mission-critical businesses: industrials, commercial services, software and professional services, $5M to $50M revenue.',
		breadcrumb: 'Home',
		ogImage: '/images/og/home.jpg',
		ogType: 'website',
		legacyPath: '/index.html',
		sitemap: { changefreq: 'monthly', priority: '1.0' }
	},
	{
		path: '/process',
		title: 'The Sell-Side Process | Madfarm Advisors',
		description:
			'How a Madfarm sell-side engagement runs: five phases and three decision gates, with a timeline scoped to your business. Disciplined preparation, built strategy.',
		breadcrumb: 'The Process',
		parent: '/',
		navLabel: 'Process',
		ogImage: '/images/og/process.jpg',
		ogType: 'website',
		legacyPath: '/process.html',
		sitemap: { changefreq: 'monthly', priority: '0.9' }
	},
	{
		path: '/about',
		title: 'About Madfarm Advisors | Senior-Led Sell-Side M&A',
		description:
			'Madfarm Advisors is a senior-led lower middle market investment bank. The principal who pitches your engagement runs it from first meeting to close.',
		breadcrumb: 'About',
		parent: '/',
		navLabel: 'About',
		ogImage: '/images/og/about.jpg',
		ogType: 'website',
		legacyPath: '/about.html',
		sitemap: { changefreq: 'monthly', priority: '0.8' }
	},
	{
		path: '/case-studies',
		title: 'Case Studies | Madfarm Advisors',
		description:
			'Closed sell-side engagements in detail: how Madfarm Advisors defended value and structured outcomes for owners of mission-critical businesses.',
		breadcrumb: 'Case Studies',
		parent: '/',
		navLabel: 'Case Studies',
		ogImage: '/images/og/case-studies.jpg',
		ogType: 'website',
		legacyPath: '/case-studies.html',
		sitemap: { changefreq: 'monthly', priority: '0.8' }
	},
	{
		path: '/case-studies/industrial',
		title: 'Defending Value in Bio-Pharma Engineering | Madfarm',
		description:
			'How Madfarm defended a 9.0× EBITDA multiple and surfaced 20 to 25% more true EBITDA for a bio-pharma engineering firm, through a mid-diligence client loss.',
		breadcrumb: 'Bio-Pharma Engineering',
		parent: '/case-studies',
		ogImage: '/images/og/case-industrial.jpg',
		ogType: 'article',
		legacyPath: '/case-industrial.html',
		sitemap: { changefreq: 'monthly', priority: '0.7' }
	},
	{
		path: '/case-studies/hvac',
		title: 'A Founder Transition in Commercial HVAC | Madfarm',
		description:
			'How Madfarm structured a majority recapitalization for a commercial HVAC business: an all-cash close at 2.0× the 2025 benchmark, through a credit crunch.',
		breadcrumb: 'Commercial HVAC',
		parent: '/case-studies',
		ogImage: '/images/og/case-hvac.jpg',
		ogType: 'article',
		legacyPath: '/case-hvac.html',
		sitemap: { changefreq: 'monthly', priority: '0.7' }
	},
	{
		path: '/case-studies/carveout',
		title: 'Carving Out a Non-Core Division | Madfarm Advisors',
		description:
			'How Madfarm ran a PE carve-out of a renewable energy manufacturing division, kept it a going concern, and placed it with a cross-border strategic buyer.',
		breadcrumb: 'Corporate Carve-Out',
		parent: '/case-studies',
		ogImage: '/images/og/case-carveout.jpg',
		ogType: 'article',
		legacyPath: '/case-carveout.html',
		sitemap: { changefreq: 'monthly', priority: '0.7' }
	},
	{
		path: '/case-studies/saas',
		title: 'Vertical SaaS: Retention Discount to Premium | Madfarm',
		description:
			'How Madfarm sold a founder-led vertical SaaS platform with embedded payments: rebuilt metrics, a clear payments story, and a premium all-cash exit.',
		breadcrumb: 'Vertical SaaS',
		parent: '/case-studies',
		ogImage: '/images/og/case-saas.jpg',
		ogType: 'article',
		legacyPath: '/case-saas.html',
		sitemap: { changefreq: 'monthly', priority: '0.7' }
	},
	{
		path: '/resources',
		title: 'Resources for Business Owners | Madfarm Advisors',
		description:
			'Practical guides for owners considering a sale: how buyers value your business, how a sell-side process runs, and what to focus on before you sell.',
		breadcrumb: 'Resources',
		parent: '/',
		navLabel: 'Resources',
		ogImage: '/images/og/resources.jpg',
		ogType: 'website',
		legacyPath: '/resources.html',
		sitemap: { changefreq: 'monthly', priority: '0.6' }
	},
	{
		path: '/contact',
		title: 'Contact Madfarm Advisors | Talk to a Senior Banker',
		description:
			'Talk to a senior banker at Madfarm Advisors about selling your business. Direct contact, no long forms. Schedule a call or send a short note.',
		breadcrumb: 'Contact',
		parent: '/',
		navLabel: 'Contact',
		ogImage: '/images/og/contact.jpg',
		ogType: 'website',
		legacyPath: '/contact.html',
		sitemap: { changefreq: 'yearly', priority: '0.7' }
	},
	{
		path: '/schedule',
		title: 'Schedule a Call | Madfarm Advisors',
		description:
			'Book a call with a senior banker at Madfarm Advisors. Pick a time that works for you to talk about selling your business.',
		breadcrumb: 'Schedule a Call',
		parent: '/',
		ogImage: '/images/og/contact.jpg',
		ogType: 'website',
		sitemap: { changefreq: 'yearly', priority: '0.7' }
	},
	{
		path: '/privacy-policy',
		title: 'Privacy Policy | Madfarm Advisors',
		description:
			'How Madfarm Advisors collects, uses and protects the personal and financial information that clients and website visitors share with us.',
		breadcrumb: 'Privacy Policy',
		parent: '/',
		navLabel: 'Privacy Policy',
		ogImage: '/images/og/privacy-policy.jpg',
		ogType: 'website',
		legacyPath: '/privacy-policy.html',
		sitemap: { changefreq: 'yearly', priority: '0.2' }
	}
];

const byPath = new Map<string, SitePage>(pages.map((page) => [page.path, page]));

export function getPage(path: SitePath): SitePage {
	const page = byPath.get(path);
	if (!page) throw new Error(`No registry entry for ${path}`);
	return page;
}

function navLinks(paths: SitePath[]): Array<{ path: SitePath; label: string }> {
	return paths.map((path) => {
		const { navLabel } = getPage(path);
		if (!navLabel) throw new Error(`${path} has no navLabel`);
		return { path, label: navLabel };
	});
}

export const headerNav = navLinks(['/process', '/case-studies', '/about', '/contact']);
export const footerNav = navLinks(['/about', '/process', '/case-studies', '/resources']);
