<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import SectionHead from '#lib/components/SectionHead.svelte';

	type Props = {
		eyebrow: string;
		/** The `<h2>`. */
		heading: Snippet;
		/** The paragraphs. */
		children: Snippet;
	} & HTMLAttributes<HTMLDivElement>;

	let { eyebrow, heading, class: className, children, ...rest }: Props = $props();
</script>

<!-- A narrow column of running text under a small section head. -->
<div class={['wrap', 'narrow', 'cs-prose', className]} {...rest}>
	<SectionHead {eyebrow} class="reveal" --section-head-space="var(--prose-head-space, 1.5rem)">
		{@render heading()}
	</SectionHead>
	<div class="reveal body">
		{@render children()}
	</div>
</div>

<style>
	/* Exposed variables:
	   --prose-title-size  font size of the <h2> (default clamp(1.7rem, 3vw, 2.3rem))
	   --prose-head-space  space between the head and the text (default 1.5rem) */
	.cs-prose :global(h2) {
		font-size: var(--prose-title-size, clamp(1.7rem, 3vw, 2.3rem));
	}
	.body > :global(p) {
		font-size: 1.02rem;
	}
	.body > :global(p + p) {
		margin-block-start: 1.1rem;
	}
</style>
