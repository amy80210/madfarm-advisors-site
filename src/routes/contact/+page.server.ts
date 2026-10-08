import { fail } from '@sveltejs/kit';
import { MAILERSEND_API_KEY } from '$app/env/private';
import {
	CONTACT_LIMITS,
	CONTACT_MESSAGES,
	parseContact,
	submitContact
} from '#lib/server/contact.ts';
import type { Actions, PageServerLoad } from './$types';

// The form action runs on the server, so this one route is not prerendered.
export const prerender = false;

// The page cannot import the server-only module, so it gets what it shows from here.
export const load: PageServerLoad = () => ({
	limits: CONTACT_LIMITS,
	successMessage: CONTACT_MESSAGES.success
});

export const actions: Actions = {
	default: async ({ request }) => {
		const fields = parseContact(await request.formData());
		const outcome = await submitContact(fields, MAILERSEND_API_KEY);
		if (outcome.ok) return { success: true as const };

		// What the visitor typed goes back to the form when a submission fails.
		const { name, email, phone, company, subject, message } = fields;
		return fail(outcome.status, {
			message: outcome.message,
			invalid: outcome.invalid,
			values: { name, email, phone, company, subject, message }
		});
	}
};
