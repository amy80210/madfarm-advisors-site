<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLOlAttributes } from 'svelte/elements';

	type Props = {
		/** One `JourneyStep` per phase, in order. */
		children: Snippet;
	} & HTMLOlAttributes;

	let { class: className, children, ...rest }: Props = $props();
</script>

<!-- The arc: the phases in one row, or one column in a narrow slot. For a dark surface. -->
<div class="slot">
	<ol class={['journey', className]} {...rest}>
		{@render children()}
	</ol>
</div>

<style>
	/* `JourneyStep` queries this container by name. Keep its threshold equal to the one below. */
	.slot {
		container: journey / inline-size;
	}
	.journey {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 1.75rem;
		/* The old site never reset the browser's `<ol>` indent. Kept for the faithful port. */
		padding-inline-start: 40px;
	}
	@container journey (width < 56.375rem) {
		.journey {
			grid-template-columns: 1fr;
			gap: 0;
		}
	}
</style>
