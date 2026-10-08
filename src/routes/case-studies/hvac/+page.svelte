<script lang="ts">
	import LineIcon from '#lib/components/LineIcon.svelte';
	import industrials from '#lib/assets/treated/industrials.jpg?w=900;640;360&enhanced';
	import Button from '#lib/components/Button.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import QuoteBlock from '#lib/components/QuoteBlock.svelte';
	import SectionHead from '#lib/components/SectionHead.svelte';
	import { SCHEDULE_URL } from '#lib/site.ts';
	import CaseHero from '../CaseHero.svelte';
	import CsItem from '../CsItem.svelte';
	import CsList from '../CsList.svelte';
	import CsProse from '../CsProse.svelte';
	import Snapshot from '../Snapshot.svelte';
	import StatTiles from '../StatTiles.svelte';

	const pdf = '/downloads/Madfarm-Case-Study-Commercial-HVAC.pdf';

	const snapshot = [
		{ label: 'Sector', value: 'Commercial HVAC & Facility Services' },
		{ label: 'Transaction', value: 'Majority Recapitalization & Structured Buyout' },
		{ label: 'Closed', value: 'November 2025' },
		{ label: 'Headline Result', value: '2.0× above benchmark' }
	];

	const results = [
		{ figure: '2.0×', label: 'Above the 2025 industry benchmark for comparable HVAC assets.' },
		{
			figure: '100%',
			label: 'Goal alignment: a full exit for one partner, a 20% equity carry for the other.'
		},
		{
			figure: 'All-Cash',
			label: 'Close in November 2025, with maximum price certainty through a credit crunch.'
		},
		{
			figure: 'Family Office',
			label: 'A cash-ready buyer surfaced through Madfarm’s private network.'
		}
	];
</script>

<!-- HERO -->
<CaseHero
	image={industrials}
	sizes="(max-width: 600px) 215vw, 100vw"
	type="Commercial HVAC"
	{pdf}
	scheduleHref={SCHEDULE_URL}
>
	<h1>Orchestrating a Sophisticated Founder Transition</h1>
	<p class="lead">
		A majority recapitalization for a commercial HVAC enterprise: a dual-path exit that let one
		founder retire and the other keep building, structured to close all-cash through a 2025 credit
		crunch.
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
			<h2>Designing a dual-path exit.</h2>
		{/snippet}
		<p>
			The owners of a premier commercial HVAC enterprise, a husband-and-wife team, approached the
			market with a shared goal: to secure the company&rsquo;s legacy while pursuing different
			personal timelines. One partner was ready for a full transition into retirement; the other had
			significant energy and conviction to keep leading the company&rsquo;s growth.
		</p>
		<p>
			They sought an exit that would respect both paths, but were initially unaware of the
			structured mechanisms (specifically a majority recapitalization) that could facilitate such a
			tailored outcome.
		</p>
	</CsProse>
</section>

<!-- CHALLENGE -->
<section class="section bg-chalk-2">
	<div class="wrap">
		<SectionHead eyebrow="The Challenge" class="reveal">
			<h2>Navigating a 2025 credit crunch.</h2>
		</SectionHead>
		<CsList columns={2} class="reveal">
			<CsItem>
				{#snippet icon()}
					<LineIcon name="trend" />
				{/snippet}
				<h3>The Market Gap</h3>
				<p>
					By late 2025, credit markets were tightening significantly. Traditional
					&ldquo;roll-up&rdquo; private equity firms reliant on high leverage were struggling to
					meet premium valuation expectations.
				</p>
			</CsItem>
			<CsItem>
				{#snippet icon()}
					<LineIcon name="layers" />
				{/snippet}
				<h3>The Complexity of &ldquo;Staying In&rdquo;</h3>
				<p>
					Structuring a deal where a founder retains 20% equity requires high-level advisory to
					navigate operating agreements, distribution waterfalls, and non-compete terms that protect
					the minority holder.
				</p>
			</CsItem>
		</CsList>
	</div>
</section>

<!-- STRATEGY -->
<section class="section">
	<div class="wrap">
		<SectionHead eyebrow="The Boutique Strategy" class="reveal">
			<h2>Network-driven execution.</h2>
			<p>
				Not a &ldquo;spray and pray&rdquo; auction. A disciplined, three-pronged outreach to local
				strategics, national PE platforms, and family offices.
			</p>
		</SectionHead>
		<CsList class="reveal">
			<CsItem>
				{#snippet icon()}
					<LineIcon name="table" />
				{/snippet}
				<h3>Strategic Architect</h3>
				<p>
					We introduced the &ldquo;equity roll&rdquo; concept early, solving the owners&rsquo;
					personal objectives with immediate liquidity for one partner and a &ldquo;second bite of
					the apple&rdquo; for the other.
				</p>
			</CsItem>
			<CsItem>
				{#snippet icon()}
					<LineIcon name="network" />
				{/snippet}
				<h3>Leveraging the Advisor Network</h3>
				<p>
					The ultimate buyer, a highly sophisticated family office, was surfaced through our
					firm&rsquo;s private network, ensuring a buyer who could close all-cash and bypass the
					volatile debt markets of November 2025.
				</p>
			</CsItem>
			<CsItem>
				{#snippet icon()}
					<LineIcon name="document-check" />
				{/snippet}
				<h3>Professionalism as Currency</h3>
				<p>
					We made the transaction &ldquo;transactable&rdquo; through rigorous preparation and
					hands-on management of the complex governance docs: operating agreements and employment
					terms.
				</p>
			</CsItem>
		</CsList>
	</div>
</section>

<!-- RESULTS -->
<section class="section bg-steel">
	<div class="wrap">
		<SectionHead eyebrow="The Results" class="reveal">
			<h2>A premium outcome, on the founders&rsquo; terms.</h2>
		</SectionHead>
		<StatTiles items={results} class="reveal" --stat-note-maxw="62ch">
			{#snippet note()}
				A boutique firm&rsquo;s specific network and high-touch structuring outperformed the broader
				market. Proof that how a deal is run changes what it returns.
			{/snippet}
		</StatTiles>
	</div>
</section>

<!-- QUOTE -->
<section class="section">
	<div class="wrap">
		<QuoteBlock eyebrow="Advisor Perspective" align="start" size="md" tone="strong" class="reveal">
			Our role was to translate the founders&rsquo; vision into a structure they didn&rsquo;t yet
			know was possible. By leveraging our private network to find a cash-ready family office, we
			didn&rsquo;t just close a deal; we built a partnership that rewarded the sellers&rsquo; hard
			work and protected their future upside.
			{#snippet attribution()}
				<b>Madfarm Advisors</b>
				<span>Sell-side advisor</span>
			{/snippet}
		</QuoteBlock>
	</div>
</section>

<!-- CTA -->
<CtaBand
	eyebrow="Weighing Your Options?"
	image={industrials}
	sizes="(max-width: 600px) 200vw, 100vw"
	bgOpacity={0.26}
>
	<h2>There&rsquo;s often a structure you don&rsquo;t know is possible yet.</h2>
	<p>Talk to the principal who would run your process.</p>
	{#snippet actions()}
		<Button variant="copper" href={SCHEDULE_URL} external arrow="right">Schedule a Call</Button>
		<Button variant="outline" href={pdf} download>Download PDF</Button>
	{/snippet}
</CtaBand>
