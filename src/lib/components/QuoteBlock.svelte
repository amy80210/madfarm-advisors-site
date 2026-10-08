<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import Eyebrow from './Eyebrow.svelte';

	type Props = {
		eyebrow?: string;
		align?: 'center' | 'start';
		size?: 'lg' | 'md';
		/** `soft` is the secondary text color, `strong` the heading color. */
		tone?: 'soft' | 'strong';
		/** The quote. The quotation marks are added in CSS. */
		children: Snippet;
		/** Who said it: a `<b>` for the name, a `<span>` for the role. */
		attribution?: Snippet;
	} & HTMLAttributes<HTMLDivElement>;

	let {
		eyebrow,
		align = 'center',
		size = 'lg',
		tone = 'soft',
		class: className,
		children,
		attribution,
		...rest
	}: Props = $props();
</script>

<div class={['quote-block', align, size, className]} {...rest}>
	{#if eyebrow}
		<Eyebrow {align}>{eyebrow}</Eyebrow>
	{/if}
	<p class={['q', tone, eyebrow && 'after-eyebrow']}>{@render children()}</p>
	{#if attribution}
		<div class="by">
			{@render attribution()}
		</div>
	{/if}
</div>

<style>
	/* Exposed variables:
	   --quote-maxw  measure of the block (default 900px centered, 820px at start) */
	.quote-block {
		max-inline-size: var(--quote-maxw, 900px);
	}
	.center {
		margin-inline: auto;
		text-align: center;
	}
	.start {
		--quote-maxw: 820px;
		text-align: start;
	}
	.q {
		font-family: var(--serif);
		font-size: clamp(1.5rem, 3vw, 2.3rem);
		line-height: 1.4;
		color: var(--text-soft);
		letter-spacing: -0.01em;
	}
	.strong {
		color: var(--heading);
	}
	.md .q {
		font-size: clamp(1.3rem, 2.4vw, 1.9rem);
	}
	.after-eyebrow {
		margin-block-start: 3rem;
	}
	.q::before {
		content: '\201C';
		color: var(--accent);
	}
	.q::after {
		content: '\201D';
		color: var(--accent);
	}
	.by {
		margin-block-start: 2rem;
	}
	.by > :global(b) {
		color: var(--heading);
		font-family: var(--sans);
		font-weight: 600;
		font-size: 1.05rem;
	}
	.by > :global(span) {
		display: block;
		color: var(--text-mute);
		font-size: 0.92rem;
		margin-block-start: 0.2rem;
	}
</style>
