<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import Backdrop from '#lib/components/Backdrop.svelte';
	import Eyebrow from '#lib/components/Eyebrow.svelte';

	type Props = {
		eyebrow: string;
		/** Import with `?w=…&enhanced`. */
		image: Picture;
		sizes: string;
		/** The text of the `<h1>`. */
		heading: Snippet;
		/** The serif line under the title. Wrap the stressed word in `<span class="accent">`. */
		tagline: Snippet;
		/** The text of the lead paragraph. */
		children: Snippet;
		/** One button and one text link. */
		actions: Snippet;
	} & HTMLAttributes<HTMLElement>;

	let {
		eyebrow,
		image,
		sizes,
		heading,
		tagline,
		children,
		actions,
		class: className,
		...rest
	}: Props = $props();
</script>

<section class={['hero', 'on-dark', className]} {...rest}>
	<Backdrop {image} {sizes} opacity={0.5} wash="hero" priority drift />
	<div class="wrap inner">
		<div class="eyebrow-row">
			<Eyebrow>{eyebrow}</Eyebrow>
		</div>
		<h1 class="display">{@render heading()}</h1>
		<p class="tagline">{@render tagline()}</p>
		<p class="lead">{@render children()}</p>
		<div class="actions">
			{@render actions()}
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		isolation: isolate;
		overflow: clip;
		background: var(--steel);
		padding-block-start: clamp(4.5rem, 10vw, 8rem);
	}
	.inner {
		padding-block-end: clamp(3rem, 6vw, 5rem);
	}
	.eyebrow-row {
		display: flex;
		align-items: center;
		gap: 0.9rem;
	}
	h1 {
		max-inline-size: 15ch;
		margin-block-start: 1.4rem;
	}
	.tagline {
		font-family: var(--serif);
		font-size: clamp(1.35rem, 2.6vw, 2rem);
		line-height: 1.15;
		color: var(--text);
		margin-block-start: 1rem;
	}
	.tagline > :global(.accent) {
		font-style: italic;
		font-weight: 400;
		color: var(--accent);
	}
	.lead {
		color: var(--text);
		margin-block-start: 1.5rem;
		max-inline-size: 46ch;
		opacity: 0.9;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.6rem;
		margin-block-start: 2.4rem;
	}
</style>
