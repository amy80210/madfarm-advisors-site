<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		/** Leave it out for a guide that is not yet published: the card is then not a link. */
		href?: string;
		/** The link saves the file. */
		download?: boolean;
		/** Small label above the title. */
		kicker: string;
		title: string;
		/** Last line: the action, or "Coming soon". */
		avail: string;
		/** One `<svg>` with `aria-hidden="true"`. */
		icon: Snippet;
		/** The text of the description. */
		children: Snippet;
	};

	let { href, download = false, kicker, title, avail, icon, children }: Props = $props();
</script>

{#snippet body()}
	<span class="icon">{@render icon()}</span>
	<span class="kicker">{kicker}</span>
	<h3>{title}</h3>
	<p>{@render children()}</p>
	<span class="avail">{avail}</span>
{/snippet}

{#if href}
	<a class="res-card link" {href} {download}>
		{@render body()}
	</a>
{:else}
	<div class="res-card">
		{@render body()}
	</div>
{/if}

<style>
	.res-card {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		padding: 1.9rem;
		background: var(--chalk);
		border: 1px solid var(--sand);
		border-radius: var(--radius);
		transition: border-color var(--dur) var(--ease);
	}
	.link:active {
		border-color: var(--copper);
	}
	.icon {
		inline-size: 34px;
		block-size: 34px;
		color: var(--copper);
		margin-block-end: 0.3rem;
	}
	.icon > :global(svg) {
		inline-size: 100%;
		block-size: 100%;
		display: block;
	}
	.kicker {
		font-size: 0.72rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--copper);
		font-weight: 600;
	}
	h3 {
		font-size: 1.3rem;
	}
	p {
		font-size: 0.95rem;
		flex: 1;
	}
	.avail {
		font-size: 0.78rem;
		color: var(--ink-mute);
	}

	@media (hover: hover) and (pointer: fine) {
		.link:hover {
			border-color: var(--copper);
			translate: 0 -2px;
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		.res-card {
			transition:
				border-color var(--dur) var(--ease),
				translate var(--dur) var(--ease);
		}
	}
</style>
