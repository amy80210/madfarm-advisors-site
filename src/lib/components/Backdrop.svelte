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
				rgba(20, 24, 28, 0.94) 0%,
				rgba(20, 24, 28, 0.78) 42%,
				rgba(20, 24, 28, 0.34) 100%
			),
			radial-gradient(120% 90% at 88% 4%, rgba(168, 80, 31, 0.26), transparent 52%),
			linear-gradient(180deg, transparent 55%, rgba(14, 20, 32, 0.9) 100%);
	}
	.page {
		background: linear-gradient(
			90deg,
			rgba(20, 24, 28, 0.92) 0%,
			rgba(20, 24, 28, 0.72) 48%,
			rgba(20, 24, 28, 0.42) 100%
		);
	}
	.band {
		background: linear-gradient(180deg, rgba(20, 24, 28, 0.72), rgba(14, 20, 32, 0.86));
	}

	.grid {
		opacity: var(--backdrop-grid-opacity);
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
		background-size: 64px 64px;
		mask-image: linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent);
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
