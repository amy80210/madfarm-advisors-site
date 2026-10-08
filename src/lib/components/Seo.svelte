<script lang="ts">
	import { jsonLdScript, resolveSeo } from '#lib/seo.ts';
	import { SITE_NAME, type SitePath } from '#lib/site.ts';

	let { path }: { path: SitePath } = $props();

	const seo = $derived(resolveSeo(path));
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<link rel="canonical" href={seo.url} />

	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:type" content={seo.ogType} />
	<meta property="og:url" content={seo.url} />
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:image" content={seo.image} />
	<meta property="og:image:secure_url" content={seo.image} />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={seo.imageAlt} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={seo.title} />
	<meta name="twitter:description" content={seo.description} />
	<meta name="twitter:image" content={seo.image} />
	<meta name="twitter:image:alt" content={seo.imageAlt} />

	{#each seo.structuredData as schema, index (index)}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- serializeJsonLd escapes "<" -->
		{@html jsonLdScript(schema)}
	{/each}
</svelte:head>
