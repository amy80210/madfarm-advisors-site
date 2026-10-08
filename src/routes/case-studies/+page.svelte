<script lang="ts">
	import industrials from '#lib/assets/treated/industrials.jpg?w=900;640;360&enhanced';
	import professional from '#lib/assets/treated/professional.jpg?w=900;640;360&enhanced';
	import renewables from '#lib/assets/treated/renewables.jpg?w=1600;1280;900;640;360&enhanced';
	import software from '#lib/assets/treated/software.jpg?w=900;640;360&enhanced';
	import Button from '#lib/components/Button.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Eyebrow from '#lib/components/Eyebrow.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { SCHEDULE_URL } from '#lib/site.ts';
	import CaseCard from './CaseCard.svelte';
</script>

<PageHero image={professional} sizes="(max-width: 600px) 120vw, 100vw">
	<Eyebrow>Case Studies</Eyebrow>
	<h1>Closed deals, in detail.</h1>
	<p class="lead">
		How we defended value, managed the human side, and structured outcomes that met owners&rsquo;
		goals, start to close.
	</p>
</PageHero>

<section class="section">
	<div class="wrap">
		<h2 class="visually-hidden">Closed engagements</h2>
		<div class="case-index reveal">
			<!-- Bio-Pharma -->
			<CaseCard
				href="/case-studies/industrial"
				image={professional}
				alt="Bio-pharma engineering facility"
				tag="Bio-Pharma Engineering"
				type="Strategic Bolt-On &amp; Succession Exit · 2024"
				metric="9.0× EBITDA defended · +20–25% EBITDA uncovered"
			>
				<h3>Defending Value in Bio-Pharma Engineering</h3>
			</CaseCard>
			<!-- HVAC -->
			<CaseCard
				href="/case-studies/hvac"
				image={industrials}
				alt="Commercial HVAC and facility systems"
				tag="Commercial HVAC &amp; Facility Services"
				type="Majority Recapitalization · 2025"
				metric="2.0× above 2025 benchmark · all-cash close"
			>
				<h3>Orchestrating a Sophisticated Founder Transition</h3>
			</CaseCard>
			<!-- Vertical SaaS -->
			<CaseCard
				href="/case-studies/saas"
				image={software}
				alt="Vertical SaaS platform with embedded payments"
				tag="Vertical SaaS &amp; Embedded Payments"
				type="Sell-Side Platform Sale"
				metric="3× ARR · 12× EBITDA · all-cash, team retained"
			>
				<h3>Turning a Retention Discount into a Premium Outcome</h3>
			</CaseCard>
			<!-- Carve-Out -->
			<CaseCard
				href="/case-studies/carveout"
				image={renewables}
				alt="Small wind turbine, renewable energy manufacturing"
				tag="Renewable Energy Manufacturing"
				type="Corporate Carve-Out &amp; Cross-Border Sale · 2023"
				metric="Going concern preserved · cross-border strategic buyer"
			>
				<h3>Carving Out a Non-Core Division</h3>
			</CaseCard>
		</div>
	</div>
</section>

<CtaBand
	eyebrow="Your Deal, Next"
	image={industrials}
	sizes="(max-width: 600px) 175vw, 100vw"
	bgOpacity={0.28}
>
	<h2>Every case study started with a conversation.</h2>
	<p>Talk to the principal who would run your process.</p>
	{#snippet actions()}
		<Button variant="copper" href={SCHEDULE_URL} external arrow="right">Schedule a Call</Button>
	{/snippet}
</CtaBand>

<style>
	.case-index {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}
	@media (max-width: 760px) {
		.case-index {
			grid-template-columns: 1fr;
		}
	}
</style>
