<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Props = {
		variant?: 'primary' | 'copper' | 'outline' | 'ghost';
		size?: 'md' | 'sm';
		/** Arrow after the label. It moves on hover. */
		arrow?: 'right' | 'down';
		/** With `href` the button renders as a link. */
		href?: string;
		/** Opens in a new tab with `rel="noopener"`. */
		external?: boolean;
		children: Snippet;
	} & Omit<HTMLAnchorAttributes & HTMLButtonAttributes, 'children' | 'href'>;

	let {
		variant = 'primary',
		size = 'md',
		arrow,
		href,
		external = false,
		class: className,
		children,
		...rest
	}: Props = $props();

	const classes = $derived(['btn', variant, size, className]);
</script>

{#snippet content()}
	{@render children()}
	{#if arrow}
		<span class="arw" aria-hidden="true">{arrow === 'down' ? '↓' : '→'}</span>
	{/if}
{/snippet}

{#if href}
	<a
		{href}
		class={classes}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener' : undefined}
		{...rest}
	>
		{@render content()}
	</a>
{:else}
	<button type="button" class={classes} {...rest}>
		{@render content()}
	</button>
{/if}

<style>
	/* Exposed variables:
	   --btn-inline-size  width of the button (default: its content)
	   --btn-justify      alignment of the label when the button is wider than it */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: var(--btn-justify, flex-start);
		gap: 0.55rem;
		inline-size: var(--btn-inline-size, auto);
		font-family: var(--sans);
		font-weight: 600;
		font-size: 0.95rem;
		letter-spacing: 0.01em;
		padding: 0.9rem 1.6rem;
		border-radius: var(--radius);
		border: 1px solid transparent;
		cursor: pointer;
		transition:
			background-color var(--dur) var(--ease),
			color var(--dur) var(--ease),
			border-color var(--dur) var(--ease);
	}
	.btn:active {
		scale: 0.98;
	}
	.sm {
		font-size: 0.85rem;
		padding: 0.7rem 1.15rem;
	}

	.primary {
		background: var(--steel);
		color: var(--white);
	}
	.copper {
		background: var(--copper);
		color: var(--white);
	}
	.outline {
		background: transparent;
		color: var(--btn-outline-text);
		border-color: var(--btn-outline-border);
	}
	.ghost {
		padding-inline: 0;
		color: var(--accent);
	}

	@media (hover: hover) and (pointer: fine) {
		.btn:hover .arw {
			translate: 3px 0;
		}
		.primary:hover {
			background: var(--btn-primary-hover-bg);
			color: var(--btn-primary-hover-text);
		}
		.copper:hover {
			background: var(--btn-copper-hover-bg);
			color: var(--btn-copper-hover-text);
		}
		.outline:hover {
			background: var(--btn-outline-hover-bg);
			color: var(--btn-outline-hover-text);
			border-color: var(--btn-outline-hover-bg);
		}
		.ghost:hover {
			color: var(--link-hover);
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.btn {
			transition:
				background-color var(--dur) var(--ease),
				color var(--dur) var(--ease),
				border-color var(--dur) var(--ease),
				scale 160ms var(--ease);
		}
		.arw {
			transition: translate var(--dur) var(--ease);
		}
	}
</style>
