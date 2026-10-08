<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = {
		href: string;
		image: Picture;
		alt: string;
		sizes?: string;
		/** Sector label over the photograph. */
		tag: string;
		/** Transaction type and year. */
		type: string;
		metric: string;
		/** The `<h3>`. */
		children: Snippet;
	} & Omit<HTMLAnchorAttributes, 'href' | 'type'>;

	let {
		href,
		image,
		alt,
		sizes = '(max-width: 600px) 90vw, (max-width: 1100px) 45vw, 538px',
		tag,
		type,
		metric,
		class: className,
		children,
		...rest
	}: Props = $props();
</script>

<a {href} class={['case-card', className]} {...rest}>
	<div class="media on-dark">
		<enhanced:img src={image} {alt} {sizes} loading="lazy" decoding="async" />
		<span class="tag">{tag}</span>
	</div>
	<div class="body">
		<span class="type">{type}</span>
		{@render children()}
		<span class="metric">{metric}</span>
		<span class="link">Read case study <span class="arw">&rarr;</span></span>
	</div>
</a>

<style>
	.case-card {
		display: flex;
		flex-direction: column;
		background: var(--chalk);
		border: 1px solid var(--sand);
		border-radius: var(--radius);
		overflow: clip;
		transition:
			border-color var(--dur) var(--ease),
			box-shadow var(--dur) var(--ease);
	}
	.case-card:active {
		scale: 0.99;
	}
	.media {
		position: relative;
		aspect-ratio: 16/9;
		background: var(--steel);
		overflow: clip;
	}
	.media :global(img) {
		position: absolute;
		inset: 0;
		inline-size: 100%;
		block-size: 100%;
		object-fit: cover;
	}
	.media::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			color-mix(in oklch, var(--steel-2) 10%, transparent),
			color-mix(in oklch, var(--steel-2) 74%, transparent)
		);
	}
	.tag {
		position: absolute;
		z-index: 2;
		inset-inline-start: 1.1rem;
		inset-block-end: 1rem;
		font-size: 0.68rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--accent);
		text-shadow: var(--label-shadow);
		font-weight: 600;
	}
	.body {
		padding: 1.6rem;
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		flex: 1;
		color: var(--ink);
	}
	.type {
		font-size: 0.74rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-mute);
	}
	.body > :global(h3) {
		font-size: 1.4rem;
		line-height: 1.18;
	}
	.metric {
		font-family: var(--serif);
		color: var(--copper);
		font-size: 1.05rem;
	}
	.link {
		margin-block-start: auto;
		font-weight: 600;
		color: var(--copper);
		font-size: 0.9rem;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
	}

	@media (hover: hover) and (pointer: fine) {
		.case-card:hover {
			border-color: var(--copper);
			translate: 0 -3px;
			box-shadow: 0 18px 40px color-mix(in oklch, var(--steel) 8%, transparent);
		}
		.case-card:hover .media :global(img) {
			scale: 1.05;
		}
		.case-card:hover .arw {
			translate: 3px 0;
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		.case-card {
			transition:
				border-color var(--dur) var(--ease),
				box-shadow var(--dur) var(--ease),
				translate var(--dur) var(--ease),
				scale 160ms var(--ease);
		}
		.media :global(img) {
			transition: scale var(--dur-slow) var(--ease);
		}
		.arw {
			transition: translate var(--dur) var(--ease);
		}
	}
</style>
