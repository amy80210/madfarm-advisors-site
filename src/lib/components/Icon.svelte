<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		/** One `<svg>` with `aria-hidden="true"`. It takes the accent color. */
		children: Snippet;
	} & HTMLAttributes<HTMLSpanElement>;

	let { class: className, children, ...rest }: Props = $props();
</script>

<!-- Line icon in a quiet tile. On a dark surface the tokens switch it to the dark tile. -->
<span class={['ico', className]} {...rest}>
	{@render children()}
</span>

<style>
	.ico {
		display: grid;
		place-items: center;
		flex: none;
		inline-size: 46px;
		block-size: 46px;
		border-radius: var(--radius);
		background: var(--surface-raised);
		border: 1px solid var(--hairline);
		color: var(--accent);
	}
	.ico > :global(svg) {
		inline-size: 26px;
		block-size: 26px;
		display: block;
	}
</style>
