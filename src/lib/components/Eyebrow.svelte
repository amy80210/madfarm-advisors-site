<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		/** `center` adds the rule on both sides. */
		align?: 'start' | 'center';
		/** `mute` is for the second label in a pair. */
		tone?: 'accent' | 'mute';
		children: Snippet;
	} & HTMLAttributes<HTMLSpanElement>;

	let { align = 'start', tone = 'accent', class: className, children, ...rest }: Props = $props();
</script>

<span class={['eyebrow', align, tone, className]} {...rest}>
	{@render children()}
</span>

<style>
	/* Exposed variables:
	   --eyebrow-display  inline-flex by default; set `flex` to put it on its own line */
	.eyebrow {
		font-family: var(--sans);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--accent);
		text-shadow: var(--label-shadow);
		display: var(--eyebrow-display, inline-flex);
		align-items: center;
		gap: 0.6rem;
	}
	.mute {
		color: var(--text-mute);
	}
	.center {
		justify-content: center;
	}
	.eyebrow::before,
	.center::after {
		content: '';
		inline-size: 26px;
		block-size: 1px;
		background: var(--accent);
		box-shadow: var(--label-shadow);
		display: inline-block;
	}
</style>
