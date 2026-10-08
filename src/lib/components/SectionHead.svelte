<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import Eyebrow from './Eyebrow.svelte';

	type Props = {
		eyebrow?: string;
		align?: 'start' | 'center';
		/** The heading, and an optional paragraph after it. */
		children: Snippet;
	} & HTMLAttributes<HTMLDivElement>;

	let { eyebrow, align = 'start', class: className, children, ...rest }: Props = $props();
</script>

<div class={['section-head', align, className]} {...rest}>
	{#if eyebrow}
		<Eyebrow {align}>{eyebrow}</Eyebrow>
	{/if}
	{@render children()}
</div>

<style>
	/* Exposed variables:
	   --section-head-maxw   measure of the block (default 720px)
	   --section-head-space  space kept below the block, before the section body */
	.section-head {
		max-inline-size: var(--section-head-maxw, 720px);
		padding-block-end: var(--section-head-space, clamp(2.25rem, 4vw, 3.5rem));
	}
	.center {
		margin-inline: auto;
		text-align: center;
	}
	.section-head > :global(:is(h1, h2, h3)) {
		margin-block-start: 0.9rem;
	}
	.section-head > :global(p) {
		margin-block-start: 1rem;
	}
</style>
