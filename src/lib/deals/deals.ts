// Closed transactions shown on the home page. The array order is the display order.

import type { Picture } from '@sveltejs/enhanced-img';
import type { SitePath } from '#lib/site.ts';
import aableHvac from '#lib/assets/deals/aable-hvac.png?w=200;400&enhanced';
import imeg from '#lib/assets/deals/imeg.png?w=200;289&enhanced';
import innovae from '#lib/assets/deals/innovae.png?w=200;360&enhanced';
import kirraCapital from '#lib/assets/deals/kirra-capital.png?w=200;400&enhanced';
import primusWindpower from '#lib/assets/deals/primus-windpower.png?w=200;400&enhanced';
import rivaRidge from '#lib/assets/deals/riva-ridge.png?w=200;400&enhanced';
import ryseEnergy from '#lib/assets/deals/ryse-energy.png?w=200;206&enhanced';
import snakeRiver from '#lib/assets/deals/snake-river.png?w=200;330&enhanced';
import sourceCommunications from '#lib/assets/deals/source-communications.png?w=200;400&enhanced';
import wmi from '#lib/assets/deals/wmi.png?w=200;400&enhanced';

export type Party =
	| {
			kind: 'logo';
			/** The alt text of the logo. */
			name: string;
			logo: Picture;
			/** Rendered width in px. It is the `sizes` value of the image. */
			displayWidth: number;
			/** A logo that needs more height than a wide wordmark. */
			tall?: boolean;
	  }
	| { kind: 'wordmark'; name: string }
	| { kind: 'confidential'; descriptor: string };

export type Deal = {
	id: string;
	seller: Party;
	buyer: Party;
	relation: 'acquired by';
	role: 'Exclusive Sell-Side Advisor';
	/** Recorded, not rendered. `null` needs a `// date unknown` comment on its line. */
	closed: { year: number; month?: number } | null;
	/** Where the date came from. */
	closedSource: string | null;
	sector?: string;
	/** Route of the case study for this deal. */
	caseStudy?: SitePath;
};

export const deals: Deal[] = [
	{
		id: 'innovae-imeg',
		seller: { kind: 'logo', name: 'Innovae', logo: innovae, displayWidth: 136 },
		buyer: { kind: 'logo', name: 'IMEG', logo: imeg, displayWidth: 170 },
		relation: 'acquired by',
		role: 'Exclusive Sell-Side Advisor',
		closed: { year: 2024, month: 11 },
		closedSource: 'Case study page (old case-industrial.html line 87, "Closed: November 2024")',
		sector: 'Bio-Pharma Manufacturing & Engineering Services',
		caseStudy: '/case-studies/industrial'
	},
	{
		id: 'wmi-snake-river',
		seller: {
			kind: 'logo',
			name: 'Western Mechanical & Industrial (WMI)',
			logo: wmi,
			displayWidth: 170,
			tall: true
		},
		buyer: {
			kind: 'logo',
			name: 'Snake River Industrial Partners',
			logo: snakeRiver,
			displayWidth: 190
		},
		relation: 'acquired by',
		role: 'Exclusive Sell-Side Advisor',
		closed: null, // date unknown
		closedSource: null
	},
	{
		id: 'primus-windpower-ryse-energy',
		seller: { kind: 'logo', name: 'Primus Windpower', logo: primusWindpower, displayWidth: 190 },
		buyer: { kind: 'logo', name: 'Ryse Energy', logo: ryseEnergy, displayWidth: 113, tall: true },
		relation: 'acquired by',
		role: 'Exclusive Sell-Side Advisor',
		closed: { year: 2023 },
		closedSource: 'Case study page (old case-carveout.html line 87, "Closed: 2023")',
		sector: 'Renewable Energy Manufacturing',
		caseStudy: '/case-studies/carveout'
	},
	{
		id: 'confidential-saas-kirra-capital',
		seller: { kind: 'confidential', descriptor: 'Vertical SaaS Company' },
		buyer: { kind: 'logo', name: 'Kirra Capital', logo: kirraCapital, displayWidth: 159 },
		relation: 'acquired by',
		role: 'Exclusive Sell-Side Advisor',
		closed: null, // date unknown
		closedSource: null
	},
	{
		id: 'aable-hvac-riva-ridge',
		seller: { kind: 'logo', name: 'AAble HVAC', logo: aableHvac, displayWidth: 136, tall: true },
		buyer: { kind: 'logo', name: 'Riva Ridge', logo: rivaRidge, displayWidth: 190 },
		relation: 'acquired by',
		role: 'Exclusive Sell-Side Advisor',
		closed: { year: 2025, month: 11 },
		closedSource: 'Case study page (old case-hvac.html line 87, "Closed: November 2025")',
		sector: 'Commercial HVAC & Facility Services',
		caseStudy: '/case-studies/hvac'
	},
	{
		id: 'source-communications-tkw-capital',
		seller: {
			kind: 'logo',
			name: 'Source Communications',
			logo: sourceCommunications,
			displayWidth: 170,
			tall: true
		},
		buyer: { kind: 'wordmark', name: 'tKW Capital' },
		relation: 'acquired by',
		role: 'Exclusive Sell-Side Advisor',
		closed: null, // date unknown
		closedSource: null
	}
];
