<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		/** One `<svg>` with `aria-hidden="true"`. */
		icon?: Snippet;
		/** The `<h3>` and one paragraph. */
		children: Snippet;
	} & HTMLAttributes<HTMLDivElement>;

	let { icon, class: className, children, ...rest }: Props = $props();
</script>

<div class={['cs-item', className]} {...rest}>
	{#if icon}
		<span class="icon">{@render icon()}</span>
	{/if}
	{@render children()}
</div>

<style>
	.cs-item {
		border-block-start: 1px solid var(--hairline);
		padding-block-start: 1.15rem;
	}
	.icon {
		display: block;
		inline-size: 26px;
		block-size: 26px;
		color: var(--accent);
		margin-block-end: 0.85rem;
	}
	.icon > :global(svg) {
		display: block;
		inline-size: 100%;
		block-size: 100%;
	}
	.cs-item > :global(h3) {
		font-size: 1.12rem;
		margin-block-end: 0.45rem;
	}
	.cs-item > :global(p) {
		font-size: 0.95rem;
	}
</style>
