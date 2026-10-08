<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import Backdrop from './Backdrop.svelte';
	import Eyebrow from './Eyebrow.svelte';

	type Props = {
		eyebrow: string;
		/** Photograph for the dark panel. */
		image: Picture;
		sizes?: string;
		/** The `<h2>` and one paragraph. */
		children: Snippet;
		/** Optional buttons under the copy. */
		actions?: Snippet;
	} & HTMLAttributes<HTMLDivElement>;

	let {
		eyebrow,
		image,
		sizes = '(max-width: 600px) 115vw, (max-width: 1100px) 95vw, 622px',
		class: className,
		children,
		actions,
		...rest
	}: Props = $props();
</script>

<div class={['slot', className]} {...rest}>
	<div class="feature-split">
		<div class="body">
			<Eyebrow>{eyebrow}</Eyebrow>
			{@render children()}
			{#if actions}
				<div class="actions">
					{@render actions()}
				</div>
			{/if}
		</div>
		<div class="aside on-dark">
			<Backdrop {image} {sizes} opacity={0.6} gridOpacity={0.6} />
		</div>
	</div>
</div>

<style>
	.slot {
		container-type: inline-size;
	}
	.feature-split {
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		align-items: stretch;
		border: 1px solid var(--hairline);
		border-radius: var(--radius);
		overflow: clip;
	}
	.body {
		background: var(--chalk);
		padding: clamp(2.5rem, 5vw, 4.5rem);
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.body > :global(h2) {
		margin-block-start: 2rem;
		font-size: clamp(1.7rem, 3vw, 2.4rem);
	}
	.body > :global(p) {
		margin-block-start: 1rem;
	}
	.actions {
		margin-block-start: 2rem;
	}
	.aside {
		position: relative;
		isolation: isolate;
		overflow: clip;
		background: var(--steel);
		min-block-size: 320px;
	}

	/* One column when the slot is narrower than the old 900px page breakpoint left it. */
	@container (max-width: 828px) {
		.feature-split {
			grid-template-columns: 1fr;
		}
	}
</style>
