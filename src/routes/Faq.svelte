<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLDetailsAttributes } from 'svelte/elements';

	type Props = {
		question: string;
		/** Items with the same name close each other. */
		name?: string;
		/** The answer: one or more paragraphs. */
		children: Snippet;
	} & HTMLDetailsAttributes;

	let { question, name = 'faq', children, class: className, ...rest }: Props = $props();
</script>

<!-- One question. The browser gives the toggle, the keyboard support and find-in-page. -->
<details class={['faq-item', className]} {name} {...rest}>
	<summary>
		<h3>{question}</h3>
		<span class="ico"></span>
	</summary>
	<div class="answer">
		{@render children()}
	</div>
</details>

<style>
	.faq-item {
		border-block-end: 1px solid var(--hairline);
		interpolate-size: allow-keywords;
	}
	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		min-block-size: 44px;
		padding-block: 1.4rem;
		cursor: pointer;
		list-style: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	summary:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 3px;
	}
	summary:active h3 {
		color: var(--accent);
	}
	/* The heading keeps the look of the question text. */
	h3 {
		font-size: 1.15rem;
		font-weight: 400;
		line-height: 1.6;
		letter-spacing: normal;
		color: var(--heading);
	}

	/* plus that turns to a minus */
	.ico {
		flex: none;
		position: relative;
		inline-size: 22px;
		block-size: 22px;
	}
	.ico::before,
	.ico::after {
		content: '';
		position: absolute;
		background: var(--accent);
	}
	.ico::before {
		inset-block-start: 10px;
		inset-inline: 0;
		block-size: 2px;
	}
	.ico::after {
		inset-inline-start: 10px;
		inset-block: 0;
		inline-size: 2px;
	}
	.faq-item[open] .ico::after {
		scale: 1 0;
	}

	.faq-item::details-content {
		block-size: 0;
		overflow: clip;
	}
	.faq-item[open]::details-content {
		block-size: auto;
	}
	/* The space is inside: padding on `::details-content` shows when closed. */
	.answer > :global(p) {
		padding-block-end: 1.4rem;
		font-size: 0.98rem;
	}

	@media (prefers-reduced-motion: no-preference) {
		.ico::after {
			transition: scale 0.3s var(--ease);
		}
		.faq-item::details-content {
			transition:
				block-size 0.35s var(--ease),
				content-visibility 0.35s allow-discrete;
		}
	}
</style>
