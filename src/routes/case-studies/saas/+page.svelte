<script lang="ts">
	import LineIcon from '#lib/components/LineIcon.svelte';
	import software from '#lib/assets/treated/software.jpg?w=900;640;360&enhanced';
	import Button from '#lib/components/Button.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import QuoteBlock from '#lib/components/QuoteBlock.svelte';
	import SectionHead from '#lib/components/SectionHead.svelte';
	import { SCHEDULE_PATH } from '#lib/site.ts';
	import CaseHero from '../CaseHero.svelte';
	import CsItem from '../CsItem.svelte';
	import CsList from '../CsList.svelte';
	import CsProse from '../CsProse.svelte';
	import Snapshot from '../Snapshot.svelte';
	import StatTiles from '../StatTiles.svelte';

	const pdf = '/downloads/Madfarm-Case-Study-Vertical-SaaS.pdf';

	const snapshot = [
		{ label: 'Sector', value: 'Vertical SaaS & Embedded Payments' },
		{ label: 'Transaction', value: 'Sell-Side Platform Sale' },
		{ label: 'Headline Result', value: '3× ARR · 12× EBITDA' },
		{ label: 'Buyer', value: 'Operator-led software acquirer (all-cash)' }
	];

	const outcome = [
		{
			figure: '3× ARR',
			label: 'A strong revenue multiple at close, despite a known mid-tier retention weakness.'
		},
		{
			figure: '12× EBITDA',
			label: 'The earnings multiple the embedded-payments story helped unlock.'
		},
		{
			figure: 'All-Cash',
			label: 'No financing contingency: certainty of close, not just a headline number.'
		},
		{
			figure: 'Team Kept',
			label:
				'The operator-led buyer retained the team; the founder continued in a CTO role under the new owner.'
		}
	];
</script>

<!-- HERO -->
<CaseHero
	image={software}
	sizes="(max-width: 600px) 225vw, 100vw"
	type="Vertical SaaS &amp; Embedded Payments"
	{pdf}
>
	<h1>Turning a retention discount into a premium outcome.</h1>
	<p class="lead">
		The sell-side of a founder-led vertical SaaS platform with embedded payments, where a rebuilt
		revenue picture and a positioned payments story turned a known retention weakness into a
		premium, all-cash exit that kept the team intact.
	</p>
</CaseHero>

<!-- SNAPSHOT -->
<section class="section--tight">
	<div class="wrap">
		<Snapshot items={snapshot} class="reveal" />
	</div>
</section>

<!-- SITUATION -->
<section class="section--tight">
	<CsProse eyebrow="The Situation">
		{#snippet heading()}
			<h2>A SaaS story the books didn&rsquo;t tell.</h2>
		{/snippet}
		<p>
			A founder-led vertical SaaS platform, an operating system for its industry, had built embedded
			fintech alongside its core software, processing integrated payments for a base of monthly and
			annual subscribers.
		</p>
		<p>
			But the company kept cash-basis books and reported no SaaS metrics. The performance that
			drives a software valuation (ARR, retention, deferred revenue) simply wasn&rsquo;t visible in
			the financials a buyer would see.
		</p>
	</CsProse>
</section>

<!-- VALUATION (lead) -->
<section class="section bg-chalk-2">
	<div class="wrap">
		<SectionHead eyebrow="Valuation" class="reveal">
			<h2>Why the ARR multiple wasn&rsquo;t the whole story.</h2>
			<p>
				The founders&rsquo; expectations came from rule-of-thumb multiples. The real work was in
				what those multiples were hiding, and what could offset it.
			</p>
		</SectionHead>
		<CsList columns={2} class="reveal">
			<CsItem>
				{#snippet icon()}
					<LineIcon name="target" />
				{/snippet}
				<h3>The Expectation</h3>
				<p>
					The founders&rsquo; value expectations came from rule-of-thumb ARR multiples: the number
					everyone in SaaS starts with.
				</p>
			</CsItem>
			<CsItem>
				{#snippet icon()}
					<LineIcon name="warning" />
				{/snippet}
				<h3>The Hidden Discount</h3>
				<p>
					Mid-tier retention would draw a discount most founders never see coming. We identified it
					early and owned it, framed on the seller&rsquo;s terms, rather than uncovered by buyers in
					diligence.
				</p>
			</CsItem>
			<CsItem>
				{#snippet icon()}
					<LineIcon name="bar-chart" />
				{/snippet}
				<h3>Rebuilding the Revenue Picture</h3>
				<p>
					Working from the customer database of monthly and annual subscribers, we rebuilt ARR,
					retention, and deferred revenue, then bridged them to the cash-basis books. Without that
					rebuild there were no credible SaaS metrics, and no buyer could have underwritten the
					deal. Deferred revenue was surfaced and quantified up front, before it could become a
					purchase-price fight late in the process.
				</p>
			</CsItem>
			<CsItem>
				{#snippet icon()}
					<LineIcon name="card" />
				{/snippet}
				<h3>The Payments Offset</h3>
				<p>
					Payments attach and processing volume were positioned as the counterweight to retention.
					Embedded fintech turned a typical SaaS profile into a more valuable one.
				</p>
			</CsItem>
		</CsList>
	</div>
</section>

<!-- PROCESS & BUYER SELECTION -->
<section class="section">
	<div class="wrap">
		<SectionHead eyebrow="Process &amp; Buyer Selection" class="reveal">
			<h2>The best offer isn&rsquo;t only the highest number.</h2>
			<p>
				A broad, disciplined process, then a deliberate choice about who should own the business.
			</p>
		</SectionHead>
		<CsList class="reveal">
			<CsItem>
				{#snippet icon()}
					<LineIcon name="network" />
				{/snippet}
				<h3>A Broad, Disciplined Process</h3>
				<p>
					We contacted more than 200 buyers, drew multiple IOIs, and brought the process to four
					LOIs.
				</p>
			</CsItem>
			<CsItem>
				{#snippet icon()}
					<LineIcon name="team" />
				{/snippet}
				<h3>The Right Owner, Not Just the Top Bid</h3>
				<p>
					A PE-backed strategic made a credible offer, but it was clear most of the team would not
					be kept after close. We brought an operator-led software acquirer that offered both higher
					value and continuity for the team.
				</p>
			</CsItem>
			<CsItem>
				{#snippet icon()}
					<LineIcon name="shield-check" />
				{/snippet}
				<h3>Certainty of Close</h3>
				<p>
					The winning bid was modestly above the rest and came all-cash, with no financing
					contingency, which mattered as much as the headline price.
				</p>
			</CsItem>
		</CsList>
		<p class="aside reveal">
			The buyer was also moving to a new payments provider; we managed the processing-contract
			considerations through close without disrupting value.
		</p>
	</div>
</section>

<!-- OUTCOME -->
<section class="section bg-steel">
	<div class="wrap">
		<SectionHead eyebrow="The Outcome" class="reveal">
			<h2>A premium exit, and the team intact.</h2>
		</SectionHead>
		<StatTiles items={outcome} class="reveal">
			{#snippet note()}
				The deal closed at a strong valuation despite a known retention weakness and, unlike the
				strategic&rsquo;s offer, the people were kept.
			{/snippet}
		</StatTiles>
	</div>
</section>

<!-- QUOTE -->
<section class="section">
	<div class="wrap">
		<QuoteBlock eyebrow="Advisor Perspective" align="start" size="md" tone="strong" class="reveal">
			Your ARR multiple depends on your retention, and we tell you that before a buyer does. We
			rebuilt this company&rsquo;s SaaS metrics from the customer database, positioned embedded
			payments as the counterweight, and chose the owner who offered both a premium and continuity
			for the team. Certainty of close and what happens to your people count as much as the headline
			number.
			{#snippet attribution()}
				<b>Madfarm Advisors</b>
				<span>Sell-side advisor</span>
			{/snippet}
		</QuoteBlock>
	</div>
</section>

<!-- CTA -->
<CtaBand
	eyebrow="Selling a SaaS Business?"
	image={software}
	sizes="(max-width: 600px) 210vw, 100vw"
	bgOpacity={0.26}
>
	<h2>Your multiple depends on retention, and the story around it.</h2>
	<p>Talk to the principal who would run your process.</p>
	{#snippet actions()}
		<Button variant="copper" href={SCHEDULE_PATH} arrow="right">Schedule a Call</Button>
		<Button variant="outline" href={pdf} download>Download PDF</Button>
	{/snippet}
</CtaBand>

<style>
	.aside {
		margin-block-start: 1.75rem;
		max-inline-size: 70ch;
		color: var(--ink-mute);
		font-size: 0.95rem;
	}
</style>
