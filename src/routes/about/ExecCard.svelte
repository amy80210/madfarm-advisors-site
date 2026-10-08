<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		title: string;
		/** One `<svg>` with `aria-hidden="true"`. */
		icon: Snippet;
		/** One paragraph. */
		children: Snippet;
	} & HTMLAttributes<HTMLDivElement>;

	let { title, icon, class: className, children, ...rest }: Props = $props();
</script>

<div class={['exec-card', className]} {...rest}>
	<span class="icon">{@render icon()}</span>
	<h3>{title}</h3>
	{@render children()}
</div>

<style>
	.exec-card {
		padding-block-start: 1.5rem;
		border-block-start: 1px solid var(--hairline);
	}
	.icon {
		display: block;
		inline-size: 32px;
		block-size: 32px;
		color: var(--accent);
		margin-block-end: 1.1rem;
	}
	.icon > :global(svg) {
		inline-size: 100%;
		block-size: 100%;
		display: block;
	}
	h3 {
		font-size: 1.2rem;
		margin-block-end: 0.55rem;
	}
	.exec-card > :global(p) {
		font-size: 0.93rem;
	}
</style>
