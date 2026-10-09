<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';
	import type { Snippet } from 'svelte';
	import Button from '#lib/components/Button.svelte';
	import Eyebrow from '#lib/components/Eyebrow.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { SCHEDULE_PATH } from '#lib/site.ts';

	type Props = {
		image: Picture;
		sizes: string;
		/** Second label of the eyebrow pair: the kind of deal. */
		type: string;
		/** Path of the PDF under `/downloads/`. */
		pdf: string;
		/** The `<h1>` and the lead paragraph. */
		children: Snippet;
	};

	let { image, sizes, type, pdf, children }: Props = $props();
</script>

<PageHero
	{image}
	{sizes}
	--hero-title-size="clamp(2rem, 4.6vw, 3.2rem)"
	--hero-title-space="1.1rem"
>
	<a href="/case-studies" class="back">&larr; All case studies</a>
	<div class="pair">
		<Eyebrow>Case Study</Eyebrow>
		<span class="slash" aria-hidden="true">/</span>
		<Eyebrow tone="mute">{type}</Eyebrow>
	</div>
	{@render children()}
	<div class="actions">
		<Button variant="copper" href={pdf} arrow="down" download>Download PDF</Button>
		<a href={SCHEDULE_PATH} class="underline">Schedule a Call</a>
	</div>
</PageHero>

<style>
	.back {
		color: var(--copper-2);
		font-size: 0.85rem;
		font-weight: 600;
		transition: color var(--dur) var(--ease);
	}
	.back:active {
		opacity: 0.8;
	}
	.pair {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		margin-block-start: 1rem;
	}
	.slash {
		color: var(--text-mute);
		opacity: 0.5;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.6rem;
		margin-block-start: 2.4rem;
	}
	.underline {
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--heading);
		padding-block-end: 3px;
		border-block-end: 2px solid var(--copper);
		transition:
			color var(--dur) var(--ease),
			border-color var(--dur) var(--ease);
	}
	.underline:active {
		opacity: 0.8;
	}
	@media (hover: hover) and (pointer: fine) {
		.back:hover {
			color: var(--link-hover);
		}
		.underline:hover {
			color: var(--accent);
			border-color: var(--accent);
		}
	}
</style>
