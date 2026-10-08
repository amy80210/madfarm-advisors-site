<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = {
		href: string;
		/** Import with `?w=…&enhanced`. */
		image: Picture;
		alt: string;
		sizes?: string;
		/** The small number over the name, e.g. `01`. */
		num: string;
		/** The sector name. It is the `<h3>`. */
		title: string;
	} & Omit<HTMLAnchorAttributes, 'href' | 'title'>;

	let {
		href,
		image,
		alt,
		sizes = '(max-width: 1100px) 80vw, 470px',
		num,
		title,
		class: className,
		...rest
	}: Props = $props();
</script>

<!-- Photograph card that links out, with a numbered label at the bottom. -->
<a class={['sector-card', 'on-dark', className]} {href} {...rest}>
	<enhanced:img src={image} {alt} {sizes} loading="lazy" decoding="async" />
	<div class="label">
		<span class="num">{num}</span>
		<h3>{title}</h3>
	</div>
</a>

<style>
	.sector-card {
		position: relative;
		display: block;
		border-radius: var(--radius);
		overflow: clip;
		aspect-ratio: 3/4;
		background: var(--steel);
	}
	.sector-card :global(img) {
		position: absolute;
		inset: 0;
		inline-size: 100%;
		block-size: 100%;
		object-fit: cover;
	}
	.sector-card::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			color-mix(in oklch, var(--steel-2) 15%, transparent) 30%,
			color-mix(in oklch, var(--steel-2) 90%, transparent) 100%
		);
	}
	.label {
		position: absolute;
		z-index: 2;
		inset-inline: 1.1rem;
		inset-block-end: 1.1rem;
	}
	.num {
		font-size: 0.7rem;
		letter-spacing: 0.14em;
		color: var(--accent);
		text-shadow: var(--label-shadow);
		font-weight: 600;
	}
	h3 {
		font-size: 1.2rem;
		margin-block-start: 0.3rem;
		line-height: 1.15;
	}

	.sector-card:active :global(img) {
		scale: 1.02;
	}
	@media (prefers-reduced-motion: no-preference) {
		.sector-card :global(img) {
			transition: scale var(--dur-slow) var(--ease);
		}
	}
	@media (hover: hover) and (pointer: fine) {
		.sector-card:hover :global(img) {
			scale: 1.05;
		}
	}
</style>
