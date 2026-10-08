<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	/** Spread these on the control, so the label and the error summary reach it. */
	type ControlAttributes = {
		id: string;
		name: string;
		'aria-invalid': 'true' | undefined;
		'aria-describedby': string | undefined;
	};

	type Props = {
		/** The field's `name`. It is also the `id` the label points at. */
		name: string;
		label: string;
		/** Adds "(optional)" after the label. */
		optional?: boolean;
		/** Spans both columns of the form grid. */
		full?: boolean;
		/** The server rejected this field. */
		invalid?: boolean;
		/** Id of the element that holds the error text. */
		errorId?: string;
		/** One `<input>`, `<select>` or `<textarea>` that spreads the attributes it gets. */
		control: Snippet<[ControlAttributes]>;
	} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

	let {
		name,
		label,
		optional = false,
		full = false,
		invalid = false,
		errorId,
		control,
		class: className,
		...rest
	}: Props = $props();

	const attributes = $derived<ControlAttributes>({
		id: name,
		name,
		'aria-invalid': invalid ? 'true' : undefined,
		'aria-describedby': invalid ? errorId : undefined
	});
</script>

<div class={['field', full && 'full', className]} {...rest}>
	<label for={name}>
		{label}
		{#if optional}<span class="opt">(optional)</span>{/if}
	</label>
	{@render control(attributes)}
</div>

<style>
	.field {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		min-inline-size: 0;
	}
	.full {
		grid-column: 1 / -1;
	}
	label {
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--ink);
		letter-spacing: 0.02em;
	}
	.opt {
		color: var(--ink-mute);
		font-weight: 400;
	}

	/* 16px text stops iOS Safari zooming in on focus. */
	.field > :global(:is(input, select, textarea)) {
		font: inherit;
		font-size: 1rem;
		color: var(--ink);
		background: var(--white);
		border: 1px solid var(--sand);
		border-radius: var(--radius);
		padding: 0.8rem 0.9rem;
		inline-size: 100%;
		min-inline-size: 0;
		transition:
			border-color var(--dur-fast) var(--ease),
			box-shadow var(--dur-fast) var(--ease);
	}
	.field > :global(textarea) {
		resize: vertical;
		min-block-size: 140px;
	}

	/* Rejected by the browser after the visitor touched it, or by the server.
	   The thicker border is the second cue next to the color; the text comes
	   from the browser's own message or from the error summary. */
	.field > :global(:is(:user-invalid, [aria-invalid='true'])) {
		border-color: var(--copper);
		box-shadow: inset 0 0 0 1px var(--copper);
	}

	/* The ring is a box-shadow, so the outline stays, transparent, for forced colors. */
	.field > :global(:is(input, select, textarea):focus-visible) {
		outline: 2px solid transparent;
	}
	.field > :global(:is(input, select, textarea):focus) {
		border-color: var(--copper);
		box-shadow: 0 0 0 3px color-mix(in oklch, var(--copper) 12%, transparent);
	}
</style>
