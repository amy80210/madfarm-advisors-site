<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import Backdrop from './Backdrop.svelte';

	type Props = {
		/** Background photograph. Leave it out for a plain steel hero. */
		image?: Picture;
		sizes?: string;
		/** Shorter hero for pages with only a title. */
		compact?: boolean;
		/** Eyebrow, the `<h1>`, a lead paragraph and any actions. */
		children: Snippet;
	} & HTMLAttributes<HTMLElement>;

	let { image, sizes, compact = false, class: className, children, ...rest }: Props = $props();
</script>

<section class={['page-hero', 'on-dark', compact && 'compact', className]} {...rest}>
	<Backdrop {image} {sizes} opacity={0.5} wash="page" priority />
	<div class="wrap inner">
		{@render children()}
	</div>
</section>

<style>
	/* Exposed variables:
	   --hero-title-size  font size of the <h1> (default clamp(2.1rem, 5vw, 3.4rem))
	   --hero-title-space space above the <h1> (default 0) */
	.page-hero {
		position: relative;
		isolation: isolate;
		overflow: clip;
		background: var(--steel);
		padding-block: clamp(4rem, 8vw, 6.5rem);
	}
	.compact {
		padding-block: clamp(3rem, 6vw, 4.5rem);
	}
	.inner > :global(h1) {
		max-inline-size: 18ch;
		font-size: var(--hero-title-size, clamp(2.1rem, 5vw, 3.4rem));
		line-height: 1.05;
		letter-spacing: -0.02em;
		margin-block-start: var(--hero-title-space, 0);
	}
	.inner > :global(p) {
		color: var(--text);
		opacity: 0.88;
		margin-block-start: 1.2rem;
		max-inline-size: 52ch;
	}
</style>
