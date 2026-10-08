import { defineConfig } from 'vitest/config';
import adapter from '@sveltejs/adapter-vercel';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';

// The site ships no client JavaScript (`csr = false`), so there is no client entry
// file. With Skew Protection on, adapter-vercel 7.0.0 looks for that file to set a
// cookie on it and the build fails with ENOENT. Skew Protection only guards
// client-side requests, which this site never makes, so the adapter step is skipped.
delete process.env.VERCEL_SKEW_PROTECTION_ENABLED;

export default defineConfig({
	plugins: [
		enhancedImages(), // must come before the SvelteKit plugin
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter()
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'node'
	}
});
