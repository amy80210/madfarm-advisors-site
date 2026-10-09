<script lang="ts">
	import LineIcon from '#lib/components/LineIcon.svelte';
	import Button from '#lib/components/Button.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Eyebrow from '#lib/components/Eyebrow.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { SCHEDULE_PATH } from '#lib/site.ts';
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
					<LineIcon name="target" />
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
					<LineIcon name="bar-chart-rising" />
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
					<LineIcon name="timeline" />
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
					<LineIcon name="document-checklist" />
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
		<Button variant="copper" href={SCHEDULE_PATH} arrow="right">Schedule a Call</Button>
	{/snippet}
</CtaBand>

<style>
	/* Two columns once each can be 20rem wide, one below that. The 34% floor
	   stops a third column on a wide screen. */
	.res-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, max(20rem, 34%)), 1fr));
		gap: 1.25rem;
	}
</style>
