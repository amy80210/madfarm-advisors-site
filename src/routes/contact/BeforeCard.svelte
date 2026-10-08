<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import Icon from '#lib/components/Icon.svelte';

	type Props = {
		href: string;
		/** Small label above the title. */
		kicker: string;
		title: string;
		/** One `<svg>` with `aria-hidden="true"`. */
		children: Snippet;
	} & Omit<HTMLAnchorAttributes, 'href' | 'children'>;

	let { href, kicker, title, children, class: className, ...rest }: Props = $props();
</script>

<a {href} class={['before-card', className]} {...rest}>
	<span class="icon">
		<Icon>{@render children()}</Icon>
	</span>
	<span class="kicker">{kicker}</span>
	<span class="title">{title}</span>
	<span class="arw" aria-hidden="true">&rarr;</span>
</a>

<style>
	.before-card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1.5rem 1.4rem 1.6rem;
		background: var(--chalk);
		border: 1px solid var(--sand);
		border-radius: var(--radius);
		transition: border-color var(--dur) var(--ease);
	}
	.before-card:active {
		border-color: var(--copper);
	}
	.icon {
		display: block;
		margin-block-end: 0.6rem;
	}
	.kicker {
		font-size: 0.68rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		font-weight: 600;
		color: var(--copper);
	}
	.title {
		font-family: var(--serif);
		font-weight: 700;
		color: var(--steel);
		font-size: 1.02rem;
		line-height: 1.35;
		padding-inline-end: 1.2rem;
	}
	.arw {
		position: absolute;
		inset-inline-end: 1.25rem;
		inset-block-end: 1.5rem;
		color: var(--copper);
	}

	@media (hover: hover) and (pointer: fine) {
		.before-card:hover {
			border-color: var(--copper);
			translate: 0 -2px;
		}
		.before-card:hover .arw {
			translate: 3px 0;
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		.before-card {
			transition:
				border-color var(--dur) var(--ease),
				translate var(--dur) var(--ease);
		}
		.arw {
			transition: translate var(--dur) var(--ease);
		}
	}
</style>
