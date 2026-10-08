<script lang="ts">
	import type { HTMLLiAttributes } from 'svelte/elements';
	import type { Deal, Party } from './deals.ts';

	type Props = {
		deal: Deal;
	} & HTMLLiAttributes;

	let { deal, class: className, ...rest }: Props = $props();
</script>

{#snippet party(p: Party)}
	<div class="logo">
		{#if p.kind === 'logo'}
			<enhanced:img
				src={p.logo}
				alt={p.name}
				sizes="{p.displayWidth}px"
				class={[p.tall && 'tall']}
				decoding="async"
			/>
		{:else if p.kind === 'wordmark'}
			<span class="word">{p.name}</span>
		{:else}
			<span class="conf">Confidential<small>{p.descriptor}</small></span>
		{/if}
	</div>
{/snippet}

<!-- One closed transaction: seller, relation, buyer, role. -->
<li class={['deal', className]} {...rest}>
	{@render party(deal.seller)}
	<span class="rel">{deal.relation}</span>
	{@render party(deal.buyer)}
	<span class="tag">{deal.role}</span>
</li>

<style>
	.deal {
		inline-size: 270px;
		flex: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		background: var(--white);
		border: 1px solid var(--sand);
		/* navy top band, so the cards read apart from the copper eyebrow */
		border-block-start: 3px solid var(--steel-2);
		border-radius: var(--radius);
		padding: 1.75rem 1.5rem 1.4rem;
		box-shadow: 0 1px 2px color-mix(in oklch, var(--steel) 4%, transparent);
	}
	.logo {
		block-size: 72px;
		inline-size: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.logo :global(img) {
		max-inline-size: 190px;
		max-block-size: 44px;
		inline-size: auto;
		block-size: auto;
		object-fit: contain;
	}
	.logo :global(img.tall) {
		max-block-size: 68px;
		max-inline-size: 170px;
	}
	.rel {
		font-family: var(--serif);
		font-style: italic;
		font-size: 0.92rem;
		color: var(--ink-mute);
		margin-block: 0.9rem;
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}
	.rel::before,
	.rel::after {
		content: '';
		inline-size: 18px;
		block-size: 1px;
		background: var(--sand);
	}
	.conf {
		font-family: var(--serif);
		font-weight: 700;
		font-size: 1.3rem;
		color: var(--steel);
		line-height: 1.2;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}
	.conf small {
		font-family: var(--sans);
		font-weight: 500;
		font-size: 0.7rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-mute);
	}
	.word {
		font-family: var(--sans);
		font-weight: 700;
		font-size: 1.45rem;
		letter-spacing: -0.02em;
		color: var(--wordmark);
	}
	.tag {
		margin-block-start: 1.4rem;
		padding-block-start: 1rem;
		border-block-start: 1px solid var(--sand-2);
		inline-size: 100%;
		font-size: 0.64rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		font-weight: 600;
		color: var(--copper);
	}

	@container (max-width: 720px) {
		.deal {
			inline-size: 230px;
			padding: 1.4rem 1.1rem 1.2rem;
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		.deal {
			transition:
				translate 0.3s var(--ease),
				box-shadow 0.3s var(--ease);
		}
	}
	@media (hover: hover) and (pointer: fine) {
		.deal:hover {
			translate: 0 -3px;
			box-shadow: 0 10px 24px color-mix(in oklch, var(--steel) 8%, transparent);
		}
	}
</style>
