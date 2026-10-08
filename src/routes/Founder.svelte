<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import Eyebrow from '#lib/components/Eyebrow.svelte';

	type Props = {
		eyebrow: string;
		/** Portrait. Import with `?w=…&enhanced`. */
		image: Picture;
		alt: string;
		sizes: string;
		/** The quote. The quotation marks are added here. */
		children: Snippet;
		/** Who said it: a `<b>` for the name, a `<span>` for the role. */
		attribution: Snippet;
	} & HTMLAttributes<HTMLDivElement>;

	let {
		eyebrow,
		image,
		alt,
		sizes,
		children,
		attribution,
		class: className,
		...rest
	}: Props = $props();
</script>

<!-- Dark card: portrait on one side, a quote and its attribution on the other. -->
<!-- The outer element is the query container: the card lays itself out by the width it is given. -->
<div class="slot">
	<div class={['founder', 'on-dark', className]} {...rest}>
		<div class="photo reveal">
			<enhanced:img src={image} {alt} {sizes} loading="lazy" decoding="async" />
		</div>
		<div class="body reveal">
			<Eyebrow>{eyebrow}</Eyebrow>
			<blockquote>
				<span class="mark">&ldquo;</span>{@render children()}<span class="mark">&rdquo;</span>
			</blockquote>
			<div class="attrib">
				<span class="rule"></span>
				<div class="who">
					{@render attribution()}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.slot {
		container-type: inline-size;
	}
	.founder {
		display: grid;
		grid-template-columns: minmax(280px, 340px) 1fr;
		align-items: stretch;
		max-inline-size: 1080px;
		background: var(--steel);
		border: 1px solid var(--steel);
		border-radius: var(--radius);
		overflow: clip;
		box-shadow: 0 18px 40px -24px color-mix(in oklch, var(--steel-2) 55%, transparent);
	}
	.photo {
		position: relative;
		min-block-size: 300px;
		background: var(--steel-soft);
	}
	/* The photo has little headroom, so it is anchored to the top
	   and any crop comes off the jacket. */
	.photo :global(img) {
		position: absolute;
		inset: 0;
		inline-size: 100%;
		block-size: 100%;
		object-fit: cover;
		object-position: 50% 0;
	}
	.photo::after {
		content: '';
		position: absolute;
		inset-block: 0;
		inset-inline-end: 0;
		inline-size: 3px;
		background: var(--copper);
	}
	.body {
		padding: clamp(1.75rem, 3.4vw, 2.75rem);
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	blockquote {
		font-family: var(--serif);
		font-size: clamp(1.15rem, 1.7vw, 1.45rem);
		line-height: 1.45;
		color: var(--text);
		letter-spacing: -0.005em;
		margin-block-start: 2rem;
	}
	.mark {
		color: var(--accent);
	}
	.attrib {
		margin-block-start: 1.75rem;
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.rule {
		inline-size: 34px;
		block-size: 2px;
		background: var(--accent);
	}
	.who > :global(b) {
		display: block;
		color: var(--heading);
		font-family: var(--sans);
		font-weight: 600;
	}
	.who > :global(span) {
		color: var(--text-mute);
		font-size: 0.92rem;
	}

	/* Medium slot: the portrait is inset beside the quote. */
	@container (width <= 51.75rem) {
		.founder {
			grid-template-columns: 40% 1fr;
		}
		blockquote {
			font-size: 1.05rem;
		}
		/* inset portrait at a fixed 4:5, so a tall quote cannot stretch it */
		.photo {
			min-block-size: 0;
			aspect-ratio: 4 / 5;
			align-self: center;
			margin-block: 1.5rem;
			margin-inline-start: 1.5rem;
			border-radius: var(--radius);
			overflow: clip;
		}
		.photo::after {
			display: none;
		}
	}
	/* Narrow slot: the photo goes on top, as a square. */
	@container (width < 32.25rem) {
		.founder {
			grid-template-columns: 1fr;
		}
		.photo {
			aspect-ratio: 1 / 1;
			max-block-size: 340px;
			margin: 0;
			border-radius: 0;
		}
		.photo::after {
			display: block;
			inset-block: auto 0;
			inset-inline: 0;
			inline-size: auto;
			block-size: 3px;
		}
	}
</style>
