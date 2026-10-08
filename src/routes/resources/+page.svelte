<script lang="ts">
	import Button from '#lib/components/Button.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Eyebrow from '#lib/components/Eyebrow.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { SCHEDULE_URL } from '#lib/site.ts';
	import ResCard from './ResCard.svelte';
</script>

<PageHero>
	<Eyebrow>Resources</Eyebrow>
	<h1>Straight answers for owners considering a sale.</h1>
	<p class="lead">
		No lead-magnet fluff. Practical guides on what your business is worth, how a process runs, and
		what to do before you go to market.
	</p>
</PageHero>

<section class="section">
	<div class="wrap">
		<h2 class="visually-hidden">Guides for owners</h2>
		<div class="res-grid reveal">
			<ResCard
				href="/contact"
				kicker="Complimentary Pre-Engagement"
				title="A discovery session and preliminary valuation"
				avail="Request &rarr;"
			>
				{#snippet icon()}
					<svg
						viewBox="0 0 32 32"
						fill="none"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
						><circle cx="16" cy="16" r="11" /><circle cx="16" cy="16" r="3.5" /><path
							d="M16 16l6.5-6.5"
						/></svg
					>
				{/snippet}
				Before any paid engagement begins, at no cost. A real read on value in the current market, not
				an inflated number designed to win an engagement. Move forward, wait, or prepare, with the truth
				in hand.
			</ResCard>
			<ResCard
				kicker="Valuation Guide"
				title="How buyers actually value your business"
				avail="Coming soon"
			>
				{#snippet icon()}
					<svg
						viewBox="0 0 32 32"
						fill="none"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"><path d="M6 26V6M6 26h20M11 26v-6M17 26v-11M23 26v-15" /></svg
					>
				{/snippet}
				Recurring revenue, customer concentration, management depth, and the story around the numbers:
				what buyers underwrite and where preparation moves the number.
			</ResCard>
			<ResCard
				href="/downloads/Madfarm-The-Process.pdf"
				download
				kicker="The Madfarm Process"
				title="Five phases, thirty-three weeks"
				avail="Download PDF &rarr;"
			>
				{#snippet icon()}
					<svg
						viewBox="0 0 32 32"
						fill="none"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
						><path d="M4 16h24" /><circle cx="9" cy="16" r="2.6" /><circle
							cx="16"
							cy="16"
							r="2.6"
						/><circle cx="23" cy="16" r="2.6" /><path d="M9 10V7M16 25v-3M23 10V7" /></svg
					>
				{/snippet}
				Exactly how an engagement runs: the phases, the three decision gates, what you receive, and what
				we need from you. The full process, on paper.
			</ResCard>
			<ResCard
				kicker="Owner Playbook"
				title="Five things to focus on before you sell"
				avail="Coming soon"
			>
				{#snippet icon()}
					<svg
						viewBox="0 0 32 32"
						fill="none"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
						><path d="M8 4h12l5 5v19H8z" /><path d="M20 4v5h5" /><path
							d="M12 15l1.6 1.6L17 13M12 21l1.6 1.6L17 19"
						/></svg
					>
				{/snippet}
				For owners who aren&rsquo;t ready yet but want to be. A short, specific guide to setting up a
				stronger sale later.
			</ResCard>
		</div>
	</div>
</section>

<CtaBand eyebrow="No Obligation">
	<h2>Want a real read on your business?</h2>
	<p>
		Start with the complimentary discovery session and preliminary valuation (no cost, no
		obligation), or just talk through where you are.
	</p>
	{#snippet actions()}
		<Button variant="copper" href={SCHEDULE_URL} external arrow="right">Schedule a Call</Button>
	{/snippet}
</CtaBand>

<style>
	.res-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.25rem;
	}
	@media (max-width: 720px) {
		.res-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
