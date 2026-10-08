<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import Footer from '#lib/components/Footer.svelte';
	import Header from '#lib/components/Header.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { pages, type SitePath } from '#lib/site.ts';

	let { children } = $props();

	// The route id of a page equals its path in the registry. Error pages have none.
	const path = $derived(
		pages.find((entry) => entry.path === page.route.id)?.path as SitePath | undefined
	);
</script>

{#if path}
	<Seo {path} />
{/if}

<a class="skip-link" href="#main">Skip to content</a>
<Header />
<main id="main">
	{@render children()}
</main>
<Footer />

<style>
	/* Hidden until focused with the keyboard */
	.skip-link {
		position: absolute;
		inset-inline-start: 1rem;
		inset-block-start: -100px;
		z-index: 200;
		background: var(--steel);
		color: var(--white);
		padding: 0.75rem 1.1rem;
		border-radius: var(--radius);
		font-weight: 600;
		font-size: 0.9rem;
	}
	.skip-link:focus {
		inset-block-start: 1rem;
	}
</style>
