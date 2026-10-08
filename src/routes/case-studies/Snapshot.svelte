<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		/** The four facts of the deal. */
		items: { label: string; value: string }[];
	} & HTMLAttributes<HTMLDListElement>;

	let { items, class: className, ...rest }: Props = $props();
</script>

<dl class={['snapshot', className]} {...rest}>
	{#each items as item (item.label)}
		<div class="cell">
			<dt>{item.label}</dt>
			<dd>{item.value}</dd>
		</div>
	{/each}
</dl>

<style>
	.snapshot {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1px;
		background: var(--hairline);
		border: 1px solid var(--hairline);
		border-radius: var(--radius);
		overflow: clip;
	}
	.cell {
		background: var(--surface);
		padding: 1.25rem 1.4rem;
	}
	dt {
		font-size: 0.66rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--accent);
		font-weight: 600;
	}
	dd {
		font-family: var(--serif);
		color: var(--heading);
		font-size: 1.05rem;
		margin-block-start: 0.35rem;
		line-height: 1.2;
	}
	@media (max-width: 980px) {
		.snapshot {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
