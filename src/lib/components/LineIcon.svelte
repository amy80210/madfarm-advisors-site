<script lang="ts">
	import { icons, type IconName } from './icons.ts';

	type Props = {
		name: IconName;
		/** Stroke width in the 32-unit grid. */
		weight?: 1.7 | 1.8;
	};

	let { name, weight = 1.8 }: Props = $props();
</script>

<!-- A decorative line icon. It takes the text color; the parent sets its size. -->
<svg
	viewBox="0 0 32 32"
	fill="none"
	stroke="currentColor"
	stroke-width={weight}
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static markup from icons.ts, no user input -->
	{@html icons[name]}
</svg>
