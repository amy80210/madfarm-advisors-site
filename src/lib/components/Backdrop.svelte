<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';

	type Props = {
		/** Import with `?enhanced`. Add `&w=…` widths when you pass `sizes`. */
		image?: Picture;
		sizes?: string;
		/** Opacity of the photograph over the steel surface. */
		opacity?: number;
		/** Gradient that keeps copy legible over the photograph. */
		wash?: 'none' | 'hero' | 'page' | 'band';
		/** Opacity of the fine grid drawn over the photograph. */
		gridOpacity?: number;
		/** Above-the-fold image: loads eagerly with high priority. */
		priority?: boolean;
		/** Slow zoom and pan. Off under reduced motion. */
		drift?: boolean;
	};

	let {
		image,
		sizes,
		opacity = 0.5,
		wash = 'none',
		gridOpacity = 0.35,
		priority = false,
		drift = false
	}: Props = $props();
</script>

<!--
	Decorative layers behind a dark block: photograph, wash, grid.
	The parent must set `position: relative; isolation: isolate; overflow: clip`,
	so the layers stay behind its content and inside its box.
-->
<div
	class={['backdrop', drift && 'drift']}
	style:--backdrop-opacity={opacity}
	style:--backdrop-grid-opacity={gridOpacity}
	aria-hidden="true"
>
	{#if image}
		<enhanced:img
			src={image}
			alt=""
			{sizes}
			loading={priority ? 'eager' : 'lazy'}
			fetchpriority={priority ? 'high' : undefined}
			decoding="async"
		/>
	{/if}
	{#if wash !== 'none'}
		<div class={['wash', wash]}></div>
	{/if}
	<div class="grid"></div>
</div>

<style>
	.backdrop,
	.backdrop > :global(*),
	.backdrop :global(img) {
		position: absolute;
		inset: 0;
	}
	.backdrop {
		z-index: -1;
		pointer-events: none;
	}
	.backdrop :global(img) {
		inline-size: 100%;
		block-size: 100%;
		object-fit: cover;
		opacity: var(--backdrop-opacity);
	}

	/* steel + copper wash for legibility */
	.hero {
		background:
			linear-gradient(
				90deg,
				color-mix(in oklch, var(--steel-wash) 94%, transparent) 0%,
				color-mix(in oklch, var(--steel-wash) 78%, transparent) 42%,
				color-mix(in oklch, var(--steel-wash) 34%, transparent) 100%
			),
			radial-gradient(
				120% 90% at 88% 4%,
				color-mix(in oklch, var(--copper) 26%, transparent),
				transparent 52%
			),
			linear-gradient(
				180deg,
				transparent 55%,
				color-mix(in oklch, var(--steel-2) 90%, transparent) 100%
			);
	}
	.page {
		background: linear-gradient(
			90deg,
			color-mix(in oklch, var(--steel-wash) 92%, transparent) 0%,
			color-mix(in oklch, var(--steel-wash) 72%, transparent) 48%,
			color-mix(in oklch, var(--steel-wash) 42%, transparent) 100%
		);
	}
	.band {
		background: linear-gradient(
			180deg,
			color-mix(in oklch, var(--steel-wash) 72%, transparent),
			color-mix(in oklch, var(--steel-2) 86%, transparent)
		);
	}

	.grid {
		opacity: var(--backdrop-grid-opacity);
		background-image:
			linear-gradient(color-mix(in oklch, var(--white) 5%, transparent) 1px, transparent 1px),
			linear-gradient(90deg, color-mix(in oklch, var(--white) 5%, transparent) 1px, transparent 1px);
		background-size: 64px 64px;
		mask-image: linear-gradient(
			180deg,
			transparent,
			oklch(0 0 none) 30%,
			oklch(0 0 none) 70%,
			transparent
		);
	}

	@keyframes backdrop-drift {
		from {
			transform: scale(1.04) translate3d(1.5%, 1%, 0);
		}
		to {
			transform: scale(1.2) translate3d(-4%, -2.5%, 0);
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		.drift :global(img) {
			transform-origin: 60% 40%;
			animation: backdrop-drift 16s ease-in-out infinite alternate;
			will-change: transform;
		}
	}
</style>
