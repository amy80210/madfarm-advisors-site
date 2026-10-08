<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLLiAttributes } from 'svelte/elements';

	type Props = {
		/** `pre` is the grey dot before the engagement, `end` the copper dot at the close. */
		tone?: 'default' | 'pre' | 'end';
		/** Small label above the phase name. */
		when: string;
		title: string;
		/** The decision gate that ends this phase. */
		gate?: string;
		/** One `<svg>` with `aria-hidden="true"`. */
		icon: Snippet;
		/** The text of the paragraph. */
		children: Snippet;
	} & HTMLLiAttributes;

	let {
		tone = 'default',
		when,
		title,
		gate,
		icon,
		class: className,
		children,
		...rest
	}: Props = $props();
</script>

<!-- One phase of `Journey`. The rule after the dot runs to the next phase. -->
<li class={['jstep', tone, className]} {...rest}>
	<span class="dot">{@render icon()}</span>
	<div class="body">
		<span class="when">{when}</span>
		<h3>{title}</h3>
		<p>{@render children()}</p>
		{#if gate}
			<span class="gate-pin">{gate}</span>
		{/if}
	</div>
</li>

<style>
	.jstep {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
	.jstep::after {
		content: '';
		position: absolute;
		inset-block-start: 32px;
		inset-inline: 80px calc(-1.75rem + 8px);
		block-size: 1px;
		background: color-mix(in oklch, var(--white) 20%, transparent);
	}
	.jstep:last-child::after {
		display: none;
	}
	.dot {
		display: flex;
		align-items: center;
		justify-content: center;
		inline-size: 64px;
		block-size: 64px;
		border-radius: 50%;
		background: var(--steel-soft);
		box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--white) 26%, transparent);
		color: var(--accent);
	}
	.pre .dot {
		background: var(--slate);
		box-shadow: none;
		color: var(--white);
	}
	.end .dot {
		background: var(--copper);
		box-shadow: none;
		color: var(--white);
	}
	.dot > :global(svg) {
		inline-size: 30px;
		block-size: 30px;
	}
	.body {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.when {
		display: block;
		font-size: 0.68rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		font-weight: 600;
		color: var(--accent);
	}
	h3 {
		font-size: 1.3rem;
		margin-block: 0.35rem 0.6rem;
	}
	p {
		font-size: 0.9rem;
		line-height: 1.6;
		margin-block-end: 1.1rem;
	}
	.gate-pin {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-block-start: auto;
		padding: 0.35rem 0.75rem;
		border: 1px solid color-mix(in oklch, var(--copper-on-dark) 45%, transparent);
		border-radius: 999px;
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: var(--text);
	}
	.gate-pin::before {
		content: '';
		flex: none;
		inline-size: 7px;
		block-size: 7px;
		background: var(--accent);
		rotate: 45deg;
	}

	/* The `journey` container is set in `Journey`. Keep this threshold equal to the one there. */
	@container journey (width < 56.375rem) {
		.jstep {
			display: grid;
			grid-template-columns: 64px 1fr;
			padding-block-end: 2rem;
		}
		.jstep::after {
			inset-block: 72px 8px;
			inset-inline: 32px auto;
			inline-size: 1px;
			block-size: auto;
		}
		.jstep:last-child {
			padding-block-end: 0;
		}
		.body {
			display: block;
			padding-block-start: 0.5rem;
		}
		p {
			margin-block-end: 0;
		}
		.gate-pin {
			margin-block-start: 1rem;
		}
	}
</style>
