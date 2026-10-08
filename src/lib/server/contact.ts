import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';

// The sending domain must be verified in MailerSend.
const MAIL_FROM = 'noreply@madfarm-advisors.com';
const MAIL_FROM_NAME = 'Madfarm Advisors Website';

// Where inquiries land. Update if a general inbox is preferred.
const PRIMARY_INBOX = 'info@madfarm-advisors.com';

type Route = { label: string; recipients: string[] };

const SUBJECT_ROUTES = {
	'sell-side': { label: 'Selling a Business', recipients: [PRIMARY_INBOX] },
	valuation: { label: 'Pre-Engagement Valuation', recipients: [PRIMARY_INBOX] },
	'not-ready': { label: 'Planning Ahead (Not Ready Yet)', recipients: [PRIMARY_INBOX] },
	referral: { label: 'Referral', recipients: [PRIMARY_INBOX] },
	general: { label: 'General Inquiry', recipients: [PRIMARY_INBOX] }
} satisfies Record<string, Route>;

export const CONTACT_LIMITS = {
	name: 200,
	email: 254,
	phone: 50,
	company: 200,
	message: 5000
} as const;

export type ContactField = keyof typeof CONTACT_LIMITS;

export type ContactFields = Record<ContactField, string> & {
	subject: string;
	/** Honeypot. Real visitors never see this field. */
	website: string;
};

export type ContactValidation =
	{ ok: true } | { ok: false; message: string; invalid: ContactField[] };

export const CONTACT_MESSAGES = {
	required: 'Name, email, and message are required.',
	email: 'Please enter a valid email address.',
	tooLong: 'One of the fields is too long.',
	notConfigured: 'Something went wrong. Please email info@madfarm-advisors.com directly.',
	sendFailed: 'Could not send your message. Please email info@madfarm-advisors.com directly.',
	success: 'Thank you — your message is on its way. We’ll be in touch shortly.'
} as const;

export function escapeHtml(value: string): string {
	const entities: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;'
	};
	return value.replace(/[&<>"']/g, (char) => entities[char]);
}

export function parseContact(form: FormData): ContactFields {
	const read = (key: string, fallback = ''): string => {
		const value = form.get(key);
		return (typeof value === 'string' ? value : fallback).trim();
	};
	return {
		name: read('name'),
		email: read('email'),
		phone: read('phone'),
		company: read('company'),
		subject: read('subject', 'general') || 'general',
		message: read('message'),
		website: read('website')
	};
}

export function isHoneypot(fields: ContactFields): boolean {
	return fields.website !== '';
}

export function validateContact(fields: ContactFields): ContactValidation {
	const missing = (['name', 'email', 'message'] as const).filter((key) => !fields[key]);
	if (missing.length) {
		return { ok: false, message: CONTACT_MESSAGES.required, invalid: missing };
	}
	if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fields.email)) {
		return { ok: false, message: CONTACT_MESSAGES.email, invalid: ['email'] };
	}
	const tooLong = (Object.keys(CONTACT_LIMITS) as ContactField[]).filter(
		(key) => fields[key].length > CONTACT_LIMITS[key]
	);
	if (tooLong.length) {
		return { ok: false, message: CONTACT_MESSAGES.tooLong, invalid: tooLong };
	}
	return { ok: true };
}

export function routeFor(subject: string): Route {
	return Object.hasOwn(SUBJECT_ROUTES, subject)
		? SUBJECT_ROUTES[subject as keyof typeof SUBJECT_ROUTES]
		: SUBJECT_ROUTES.general;
}

export type ContactEmail = {
	recipients: string[];
	subject: string;
	html: string;
	text: string;
};

export function buildEmail(fields: ContactFields): ContactEmail {
	const { name, email, phone, company, message } = fields;
	const route = routeFor(fields.subject);

	const html = `
    <h2>New inquiry from madfarm-advisors.com</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
    ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ''}
    <p><strong>Subject:</strong> ${escapeHtml(route.label)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `;

	const text =
		`New inquiry from madfarm-advisors.com\n\n` +
		`Name: ${name}\n` +
		`Email: ${email}\n` +
		(phone ? `Phone: ${phone}\n` : '') +
		(company ? `Company: ${company}\n` : '') +
		`Subject: ${route.label}\n\n` +
		`${message}\n`;

	return {
		recipients: route.recipients,
		subject: `[Website] ${route.label} — ${name}`,
		html,
		text
	};
}

/** Sends the inquiry through MailerSend. Throws when MailerSend rejects it. */
async function sendContact(fields: ContactFields, apiKey: string): Promise<void> {
	const mail = buildEmail(fields);
	const params = new EmailParams()
		.setFrom(new Sender(MAIL_FROM, MAIL_FROM_NAME))
		.setTo(mail.recipients.map((address) => new Recipient(address)))
		.setReplyTo(new Sender(fields.email, fields.name))
		.setSubject(mail.subject)
		.setHtml(mail.html)
		.setText(mail.text);

	await new MailerSend({ apiKey }).email.send(params);
}

export type ContactOutcome =
	{ ok: true } | { ok: false; status: 400 | 500 | 502; message: string; invalid: ContactField[] };

/** Runs one submission end to end: honeypot, validation, then the send. */
export async function submitContact(
	fields: ContactFields,
	apiKey: string | undefined
): Promise<ContactOutcome> {
	// Honeypot: real visitors never see this field. Pretend success so bots move on.
	if (isHoneypot(fields)) return { ok: true };

	const validation = validateContact(fields);
	if (!validation.ok) return { ...validation, status: 400 };

	if (!apiKey) {
		console.error('MAILERSEND_API_KEY is not set');
		return { ok: false, status: 500, message: CONTACT_MESSAGES.notConfigured, invalid: [] };
	}

	try {
		await sendContact(fields, apiKey);
	} catch (err) {
		console.error('MailerSend error:', (err as { body?: unknown })?.body ?? err);
		return { ok: false, status: 502, message: CONTACT_MESSAGES.sendFailed, invalid: [] };
	}
	return { ok: true };
}
