import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { pages } from '#lib/site.ts';
import { deals } from './deals.ts';

const source = readFileSync(fileURLToPath(new URL('./deals.ts', import.meta.url)), 'utf8');
// Only the entries: the type above them also mentions `closed`.
const entries = source.slice(source.indexOf('export const deals'));

describe('deals', () => {
	it('marks every unknown close date with `// date unknown`', () => {
		const unmarked = entries
			.split('\n')
			.filter((line) => /\bclosed:\s*null\b/.test(line) && !/\/\/ date unknown\b/.test(line))
			.map((line) => line.trim());
		expect(unmarked).toEqual([]);
	});

	it('has one `closed` line per deal, so the source check sees every entry', () => {
		const closedLines = entries.split('\n').filter((line) => /^\s*closed:/.test(line));
		expect(closedLines).toHaveLength(deals.length);
	});

	it('has a source for every known date and none for an unknown one', () => {
		for (const deal of deals) {
			expect(deal.closedSource === null, deal.id).toBe(deal.closed === null);
		}
	});

	it('has unique ids', () => {
		const ids = deals.map((deal) => deal.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it('links only to case studies in the route registry', () => {
		const paths = new Set<string>(pages.map((page) => page.path));
		for (const deal of deals) {
			if (deal.caseStudy) expect(paths.has(deal.caseStudy), deal.id).toBe(true);
		}
	});
});
