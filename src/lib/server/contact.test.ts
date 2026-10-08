import { describe, expect, it } from 'vitest';
import {
	buildEmail,
	CONTACT_MESSAGES,
	escapeHtml,
	isHoneypot,
	parseContact,
	routeFor,
	validateContact,
	type ContactFields
} from './contact.ts';

function form(values: Record<string, string>): FormData {
	const data = new FormData();
	for (const [key, value] of Object.entries(values)) data.set(key, value);
	return data;
}

const valid: ContactFields = {
	name: 'Test Owner',
	email: 'owner@example.com',
	phone: '',
	company: '',
	subject: 'sell-side',
	message: 'A short note.',
	website: ''
};

describe('parseContact', () => {
	it('trims every field and defaults the subject to general', () => {
		const fields = parseContact(form({ name: '  Test Owner ', email: ' owner@example.com' }));
		expect(fields.name).toBe('Test Owner');
		expect(fields.email).toBe('owner@example.com');
		expect(fields.subject).toBe('general');
		expect(fields.message).toBe('');
	});

	it('detects the honeypot', () => {
		expect(isHoneypot(parseContact(form({ website: 'https://spam.example' })))).toBe(true);
		expect(isHoneypot(parseContact(form({ website: '  ' })))).toBe(false);
	});
});

describe('validateContact', () => {
	it('accepts a complete inquiry', () => {
		expect(validateContact(valid)).toEqual({ ok: true });
	});

	it('names each missing required field', () => {
		expect(validateContact({ ...valid, name: '', message: '' })).toEqual({
			ok: false,
			message: CONTACT_MESSAGES.required,
			invalid: ['name', 'message']
		});
	});

	it.each(['owner', 'owner@localhost', 'a b@example.com', '@example.com'])(
		'rejects the email %s',
		(email) => {
			expect(validateContact({ ...valid, email })).toEqual({
				ok: false,
				message: CONTACT_MESSAGES.email,
				invalid: ['email']
			});
		}
	);

	it.each([
		['name', 200],
		['phone', 50],
		['company', 200],
		['message', 5000]
	] as const)('caps %s at %i characters', (field, limit) => {
		expect(validateContact({ ...valid, [field]: 'x'.repeat(limit) })).toEqual({ ok: true });
		expect(validateContact({ ...valid, [field]: 'x'.repeat(limit + 1) })).toEqual({
			ok: false,
			message: CONTACT_MESSAGES.tooLong,
			invalid: [field]
		});
	});

	it('caps email at 254 characters', () => {
		const email = `${'x'.repeat(243)}@example.com`;
		expect(email).toHaveLength(255);
		expect(validateContact({ ...valid, email })).toMatchObject({ ok: false, invalid: ['email'] });
	});
});

describe('subject routing', () => {
	it.each([
		['sell-side', 'Selling a Business'],
		['valuation', 'Pre-Engagement Valuation'],
		['not-ready', 'Planning Ahead (Not Ready Yet)'],
		['referral', 'Referral'],
		['general', 'General Inquiry'],
		['unknown', 'General Inquiry'],
		['constructor', 'General Inquiry']
	])('routes %s to "%s"', (subject, label) => {
		const route = routeFor(subject);
		expect(route.label).toBe(label);
		expect(route.recipients).toEqual(['info@madfarm-advisors.com']);
	});
});

describe('buildEmail', () => {
	it('builds the subject line from the route and the name', () => {
		expect(buildEmail(valid).subject).toBe('[Website] Selling a Business — Test Owner');
	});

	it('leaves out empty optional fields', () => {
		const mail = buildEmail(valid);
		expect(mail.text).not.toContain('Phone:');
		expect(mail.html).not.toContain('Company:');
	});

	it('includes phone and company when given', () => {
		const mail = buildEmail({ ...valid, phone: '555 0100', company: 'Acme' });
		expect(mail.text).toContain('Phone: 555 0100\nCompany: Acme\n');
		expect(mail.html).toContain('<strong>Company:</strong> Acme');
	});

	it('escapes HTML in every field and keeps line breaks in the message', () => {
		const mail = buildEmail({
			...valid,
			name: '<b>Owner</b>',
			company: 'A & B "Co"',
			message: "line one\n<script>alert('x')</script>"
		});
		expect(mail.html).toContain('&lt;b&gt;Owner&lt;/b&gt;');
		expect(mail.html).toContain('A &amp; B &quot;Co&quot;');
		expect(mail.html).toContain('line one<br>&lt;script&gt;alert(&#39;x&#39;)&lt;/script&gt;');
		expect(mail.html).not.toContain('<script>');
		// The plain-text part is not HTML, so it stays as typed.
		expect(mail.text).toContain("<script>alert('x')</script>");
	});
});

describe('escapeHtml', () => {
	it('escapes the five special characters', () => {
		expect(escapeHtml(`&<>"'`)).toBe('&amp;&lt;&gt;&quot;&#39;');
	});
});
