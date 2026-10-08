import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	// Optional, so a build or preview without the key still starts.
	// The contact action reports "not configured" when it is missing.
	MAILERSEND_API_KEY: {
		schema: (value: string | undefined) => value
	}
});
