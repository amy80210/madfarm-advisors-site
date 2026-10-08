<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import Eyebrow from '#lib/components/Eyebrow.svelte';
	import Icon from '#lib/components/Icon.svelte';

	type Props = {
		/** `fixed` is the steel card, `built` the chalk card. */
		variant: 'fixed' | 'built';
		eyebrow: string;
		/** One `<svg>` with `aria-hidden="true"`. */
		icon: Snippet;
		/** The `<h3>` and one `<ul>`. */
		children: Snippet;
	} & HTMLAttributes<HTMLDivElement>;

	let { variant, eyebrow, icon, class: className, children, ...rest }: Props = $props();
</script>

<!-- One half of the "two halves" pair. -->
<div class={['half', variant, variant === 'fixed' && 'on-dark', className]} {...rest}>
	<div class="icon">
		<Icon>{@render icon()}</Icon>
	</div>
	<Eyebrow>{eyebrow}</Eyebrow>
	{@render children()}
</div>

<style>
	.half {
		padding: clamp(1.6rem, 3vw, 2.25rem);
		border-radius: var(--radius);
	}
	.fixed {
		background: var(--steel);
	}
	.built {
		background: var(--chalk);
		border: 1px solid var(--sand);
	}
	.icon {
		margin-block-end: 1.1rem;
	}
	.half > :global(h3) {
		margin-block: 0.8rem 1rem;
	}
	.half > :global(ul) {
		display: grid;
		gap: 0.6rem;
	}
	.half > :global(ul > li) {
		position: relative;
		padding-inline-start: 1.1rem;
		font-size: 0.95rem;
		color: var(--text-soft);
	}
	.half > :global(ul > li)::before {
		content: '';
		position: absolute;
		inset-inline-start: 0;
		inset-block-start: 0.62em;
		inline-size: 5px;
		block-size: 5px;
		border-radius: 50%;
		background: var(--accent);
	}
</style>
