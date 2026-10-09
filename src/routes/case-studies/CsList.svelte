<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		/** 3 columns fold to 1 on a narrow screen. 2 columns stay 2. */
		columns?: 2 | 3;
		/** `CsItem` components. */
		children: Snippet;
	} & HTMLAttributes<HTMLDivElement>;

	let { columns = 3, class: className, children, ...rest }: Props = $props();
</script>

<div class="slot">
	<div class={['cs-list', columns === 3 ? 'three' : 'two', className]} {...rest}>
		{@render children()}
	</div>
</div>

<style>
	.slot {
		container-type: inline-size;
	}
	.cs-list {
		display: grid;
		gap: 1.4rem;
	}
	.two {
		grid-template-columns: 1fr 1fr;
	}
	.three {
		grid-template-columns: repeat(3, 1fr);
	}
	@container (width < 700px) {
		.three {
			grid-template-columns: 1fr;
		}
	}
</style>
