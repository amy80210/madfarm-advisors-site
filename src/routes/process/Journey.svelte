<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLOlAttributes } from 'svelte/elements';

	type Props = {
		/** One `JourneyStep` per phase, in order. */
		children: Snippet;
	} & HTMLOlAttributes;

	let { class: className, children, ...rest }: Props = $props();
</script>

<!-- The arc: the phases in one row, or one column on narrow screens. For a dark surface. -->
<ol class={['journey', className]} {...rest}>
	{@render children()}
</ol>

<style>
	.journey {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 1.75rem;
		/* The old site never reset the browser's `<ol>` indent. Kept for the faithful port. */
		padding-inline-start: 40px;
	}
	@media (max-width: 980px) {
		.journey {
			grid-template-columns: 1fr;
			gap: 0;
		}
	}
</style>
