<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import Backdrop from './Backdrop.svelte';
	import Eyebrow from './Eyebrow.svelte';

	type Props = {
		eyebrow: string;
		/** Background photograph. Leave it out for a plain steel band. */
		image?: Picture;
		sizes?: string;
		/** Opacity of the photograph. */
		bgOpacity?: number;
		/** The `<h2>` and one paragraph. */
		children: Snippet;
		/** The buttons. */
		actions: Snippet;
	} & HTMLAttributes<HTMLElement>;

	let {
		eyebrow,
		image,
		sizes = '(max-width: 600px) 220vw, 100vw',
		bgOpacity = 0.28,
		class: className,
		children,
		actions,
		...rest
	}: Props = $props();
</script>

<section class={['section', 'cta-band', 'on-dark', className]} {...rest}>
	<Backdrop {image} {sizes} opacity={bgOpacity} wash="band" />
	<div class="wrap inner">
		<Eyebrow align="center">{eyebrow}</Eyebrow>
		{@render children()}
		<div class="actions">
			{@render actions()}
		</div>
	</div>
</section>

<style>
	.cta-band {
		position: relative;
		isolation: isolate;
		overflow: clip;
		background: var(--steel);
	}
	.inner {
		text-align: center;
	}
	.inner > :global(h2) {
		max-inline-size: 20ch;
		margin-block-start: 3rem;
		margin-inline: auto;
	}
	.inner > :global(p) {
		margin: 1rem auto 2rem;
		max-inline-size: 52ch;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
	}
</style>
