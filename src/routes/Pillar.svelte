<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		/** The number in the corner, e.g. `01`. */
		num: string;
		/** One `<svg>` with `aria-hidden="true"`. */
		icon: Snippet;
		/** One `<h3>` and one paragraph. */
		children: Snippet;
	} & HTMLAttributes<HTMLDivElement>;

	let { num, icon, children, class: className, ...rest }: Props = $props();
</script>

<div class={['pillar', className]} {...rest}>
	<span class="num">{num}</span>
	<span class="icon">{@render icon()}</span>
	{@render children()}
</div>

<style>
	.pillar {
		position: relative;
		display: flex;
		flex-direction: column;
		background: var(--chalk);
		padding: clamp(1.75rem, 3vw, 2.5rem);
	}
	.num {
		position: absolute;
		inset-block-start: 1.4rem;
		inset-inline-end: 1.5rem;
		font-family: var(--serif);
		font-size: 1rem;
		color: var(--copper);
		font-weight: 700;
		letter-spacing: 0.05em;
	}
	.icon {
		inline-size: 40px;
		block-size: 40px;
		margin-block-end: 1.1rem;
		color: var(--copper);
	}
	.icon > :global(svg) {
		inline-size: 100%;
		block-size: 100%;
		display: block;
	}
	.pillar > :global(h3) {
		margin-block: 0.9rem 0.7rem;
	}
	.pillar > :global(p) {
		font-size: 0.98rem;
	}
</style>
