<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import Eyebrow from '#lib/components/Eyebrow.svelte';
	import { deals } from './deals.ts';
	import Tombstone from './Tombstone.svelte';

	type Props = {
		/** The label of the strip. It names the section. */
		title: string;
		/** Id of the label, for `aria-labelledby`. */
		titleId?: string;
	} & HTMLAttributes<HTMLElement>;

	let { title, titleId = 'deals-title', class: className, ...rest }: Props = $props();
</script>

<!--
	The closed transactions as a strip that moves on its own.
	The list is rendered twice so the loop has no seam; the second half is `aria-hidden`.
	It pauses on hover, on focus inside it, and with the Pause checkbox (WCAG 2.2.2).
	Under reduced motion nothing moves, the strip scrolls sideways and the checkbox is hidden.
-->
<section class={['section--tight', 'deals-strip', className]} aria-labelledby={titleId} {...rest}>
	<div class="wrap">
		<div class="head reveal">
			<Eyebrow id={titleId}>{title}</Eyebrow>
			<label class="pause">
				<input type="checkbox" />
				Pause
			</label>
		</div>
	</div>
	<!-- A scrollable region must be reachable by keyboard. Focus also pauses the motion. -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div class="marquee reveal" role="group" aria-label="Transactions" tabindex="0">
		<ul class="track">
			{#each deals as deal (deal.id)}
				<Tombstone {deal} />
			{/each}
			{#each deals as deal (deal.id)}
				<Tombstone {deal} aria-hidden="true" />
			{/each}
		</ul>
	</div>
</section>

<style>
	.deals-strip {
		background: var(--chalk-2);
		padding-block: clamp(2.5rem, 5vw, 3.75rem);
		overflow: clip;
	}
	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 0.6rem 2rem;
		margin-block-end: clamp(1.25rem, 2.5vw, 1.75rem);
	}

	/* A checkbox that looks like a small quiet button. */
	.pause {
		position: relative;
		display: none;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.72rem;
		font-weight: 600;
		line-height: 1;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-mute);
		padding: 0.15rem 0.55rem;
		border: 1px solid var(--sand);
		border-radius: var(--radius);
		cursor: pointer;
		user-select: none;
	}
	/* The real checkbox covers the label and a 44px target around it. */
	.pause input {
		appearance: none;
		position: absolute;
		inset: -0.75rem -0.5rem;
		margin: 0;
		cursor: pointer;
	}
	/* the box that shows the state */
	.pause::before {
		content: '';
		inline-size: 0.6rem;
		block-size: 0.6rem;
		border: 1px solid currentColor;
		border-radius: 1px;
	}
	.pause:has(:checked)::before {
		background: currentColor;
	}
	.pause:has(:checked) {
		color: var(--steel);
		border-color: var(--steel);
		background: var(--white);
	}
	.pause:active {
		scale: 0.97;
	}
	/* the ring is on the label, not on the 10px box */
	.pause:has(:focus-visible) {
		outline: 2px solid var(--accent);
		outline-offset: 3px;
	}
	.pause input:focus-visible {
		outline-color: transparent;
	}

	.marquee {
		position: relative;
		overflow: clip;
		mask-image: linear-gradient(
			90deg,
			transparent,
			oklch(0 0 none) 5%,
			oklch(0 0 none) 95%,
			transparent
		);
	}
	.track {
		display: flex;
		gap: 1.25rem;
		inline-size: max-content;
		padding-block: 0.25rem 0.5rem;
	}

	@keyframes deals-marquee {
		to {
			translate: -50% 0;
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		.pause {
			display: inline-flex;
		}
		.track {
			animation: deals-marquee 60s linear infinite;
		}
		.marquee:focus-within .track,
		.deals-strip:has(.pause :checked) .track {
			animation-play-state: paused;
		}
		@media (max-width: 720px) {
			.track {
				animation-duration: 45s;
			}
		}
		@media (hover: hover) and (pointer: fine) {
			.marquee:hover .track {
				animation-play-state: paused;
			}
		}
	}
	@media (prefers-reduced-motion: reduce) {
		/* Nothing moves, so the strip scrolls. No logical overflow property has support yet. */
		.marquee {
			overflow-x: auto;
			overflow-y: hidden;
		}
	}
	@media (hover: hover) and (pointer: fine) {
		.pause:hover {
			color: var(--steel);
			border-color: var(--steel);
		}
	}
</style>
