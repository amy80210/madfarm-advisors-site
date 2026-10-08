<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		items: { figure: string; label: string }[];
		/** One sentence under the tiles. */
		note?: Snippet;
	} & HTMLAttributes<HTMLDivElement>;

	let { items, note, class: className, ...rest }: Props = $props();
</script>

<div class="stat-tiles">
	<div class={['tiles', className]} {...rest}>
		{#each items as item (item.figure)}
			<div class="tile">
				<div class="n">{item.figure}</div>
				<div class="l">{item.label}</div>
			</div>
		{/each}
	</div>
	{#if note}
		<p class="note">{@render note()}</p>
	{/if}
</div>

<style>
	/* Exposed variables:
	   --stat-note-maxw  measure of the note (default 64ch) */
	.stat-tiles {
		container-type: inline-size;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.tiles {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
	}
	.tile {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		border-block-start: 2px solid var(--copper);
		padding-block-start: 1.1rem;
	}
	.n {
		font-family: var(--serif);
		font-weight: 700;
		font-size: clamp(1.9rem, 3.4vw, 2.7rem);
		color: var(--heading);
		line-height: 1;
		letter-spacing: -0.015em;
	}
	.l {
		font-size: 0.9rem;
		color: var(--text-soft);
	}
	.note {
		max-inline-size: var(--stat-note-maxw, 64ch);
	}
	@container (width < 902px) {
		.tiles {
			grid-template-columns: repeat(2, 1fr);
			gap: 1.75rem 1.25rem;
		}
	}
	@container (width <= 400px) {
		.tiles {
			grid-template-columns: 1fr;
		}
	}
</style>
