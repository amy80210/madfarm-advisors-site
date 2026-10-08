import { defineConfig, devices } from '@playwright/test';

// Many dev servers run on this machine. Claim a port first:
//   PORT=$(~/.claude/scripts/claim-port.sh) npm run test:e2e
const port = Number(process.env.PORT ?? 4173);
const baseURL = `http://localhost:${port}`;

export default defineConfig({
	testDir: './tests/e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	reporter: 'list',
	use: {
		baseURL,
		trace: 'on-first-retry',
		screenshot: 'only-on-failure'
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	webServer: {
		command: `npm run build && npx vite preview --port ${port} --strictPort`,
		url: baseURL,
		reuseExistingServer: !process.env.CI,
		timeout: 180_000
	}
});
