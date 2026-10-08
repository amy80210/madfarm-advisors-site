<script lang="ts">
	import LineIcon from '#lib/components/LineIcon.svelte';
	import professional from '#lib/assets/treated/professional.jpg?w=900;640;360&enhanced';
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

	const pdf = '/downloads/Madfarm-Case-Study-Bio-Pharma-Engineering.pdf';

	const snapshot = [
		{ label: 'Sector', value: 'Bio-Pharma Manufacturing & Engineering Services' },
		{ label: 'Transaction', value: 'Strategic Bolt-On & Succession Exit' },
		{ label: 'Closed', value: 'November 2024' },
		{ label: 'Headline Result', value: '9.0× EBITDA defended' }
	];

	const results = [
		{
			figure: '9.0×',
			label: 'EBITDA multiple defended through the mid-process loss of a major client.'
		},
		{ figure: '+20–25%', label: 'True EBITDA uncovered by correcting the cash-to-accrual gap.' },
		{ figure: '150', label: 'Buyers targeted → 8 IOIs → 2 aggressive finalists.' },
		{
			figure: '10/10',
			label: 'Client-rated experience; a full exit despite partnership instability.'
		}
	];
</script>

<!-- HERO -->
<CaseHero
	image={professional}
	sizes="(max-width: 600px) 215vw, 100vw"
	type="Bio-Pharma Engineering"
	{pdf}
	scheduleHref={SCHEDULE_URL}
>
	<h1>Defending Value in Bio-Pharma Engineering</h1>
	<p class="lead">
		A succession exit for a premier engineering firm serving the high-growth GLP-1 pharmaceutical
		sector. Value defended through a mid-diligence black swan and a difficult internal partnership.
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
			<h2>Engineering a specialized succession.</h2>
		{/snippet}
		<p>
			The owner-operator of a premier engineering firm specializing in bio-pharma manufacturing
			facilities sought a path to retirement. While the company was uniquely positioned within the
			high-growth GLP-1 pharmaceutical production sector, the path to an exit was complicated by a
			challenging internal partnership.
		</p>
		<p>
			The seller required an advisor who could professionally navigate sensitive partner dynamics
			while articulating the firm&rsquo;s complex technical value to a broad buyer pool.
		</p>
	</CsProse>
</section>

<!-- CHALLENGE -->
<section class="section bg-chalk-2">
	<div class="wrap">
		<SectionHead eyebrow="The Challenge" class="reveal">
			<h2>Beyond the surface.</h2>
		</SectionHead>
		<CsList class="reveal">
			<CsItem>
				{#snippet icon()}
					<LineIcon name="bar-chart" />
				{/snippet}
				<h3>Financial Reconstruction</h3>
				<p>
					The firm operated on cash-basis accounting with an atypical compensation structure. To
					make the business &ldquo;transactable&rdquo; for a sophisticated buyer, we recommended
					ancillary accounting support to validate the true financial position.
				</p>
			</CsItem>
			<CsItem>
				{#snippet icon()}
					<LineIcon name="warning" />
				{/snippet}
				<h3>A Mid-Diligence &ldquo;Black Swan&rdquo;</h3>
				<p>
					At the 11th hour, a key offer was temporarily withdrawn. Despite the volatility and the
					loss of a major customer, we re-leveraged the firm&rsquo;s niche bio-pharma expertise to
					defend a premium valuation.
				</p>
			</CsItem>
			<CsItem>
				{#snippet icon()}
					<LineIcon name="shield" />
				{/snippet}
				<h3>Internal Friction</h3>
				<p>
					We acted as a &ldquo;shield&rdquo; between the buyer and an uncooperative, absentee
					stakeholder, keeping the transaction professional and on schedule despite significant
					internal antagonism.
				</p>
			</CsItem>
		</CsList>
	</div>
</section>

<!-- STRATEGY -->
<section class="section">
	<div class="wrap">
		<SectionHead eyebrow="The Boutique Strategy" class="reveal">
			<h2>Competitive tension &amp; technical advocacy.</h2>
			<p>
				Broad market reach paired with high-touch advocacy to protect the seller&rsquo;s legacy and
				valuation.
			</p>
		</SectionHead>
		<CsList class="reveal">
			<CsItem>
				{#snippet icon()}
					<LineIcon name="network" />
				{/snippet}
				<h3>Broad-Auction Execution</h3>
				<p>
					We researched and targeted approximately 150 potential buyers, from PE-backed platforms to
					national strategics, resulting in 8 IOIs and 2 aggressive finalists.
				</p>
			</CsItem>
			<CsItem>
				{#snippet icon()}
					<LineIcon name="search" />
				{/snippet}
				<h3>Technical Value Positioning</h3>
				<p>
					A deep dive into the platform calibrated its exact fit within the pharmaceutical
					marketplace. By framing the firm as a mission-critical link in the GLP-1 supply chain, we
					sustained high demand for the asset.
				</p>
			</CsItem>
			<CsItem>
				{#snippet icon()}
					<LineIcon name="compass" />
				{/snippet}
				<h3>Hands-On Coaching</h3>
				<p>
					We kept the seller in the &ldquo;driver&rsquo;s seat&rdquo; throughout, with constant
					coaching on the nuances of the sale so the owner could run the business without
					interruption.
				</p>
			</CsItem>
		</CsList>
	</div>
</section>

<!-- RESULTS -->
<section class="section bg-steel">
	<div class="wrap">
		<SectionHead eyebrow="The Results" class="reveal">
			<h2>A full exit. Value protected under pressure.</h2>
		</SectionHead>
		<StatTiles items={results} class="reveal" --stat-note-maxw="60ch">
			{#snippet note()}
				The firm closed with a privately-held, employee-owned national strategic, providing a
				seamless cultural transition for its employees.
			{/snippet}
		</StatTiles>
	</div>
</section>

<!-- QUOTE -->
<section class="section">
	<div class="wrap">
		<QuoteBlock eyebrow="Client Perspective" align="start" size="md" tone="strong" class="reveal">
			What I ultimately loved about Madfarm was not just the value provided, but how instinctively
			it was done. I always felt in the &lsquo;driver&rsquo;s seat&rsquo; without tying up my time,
			allowing me to run my business without interruption. Madfarm remains a shining example of what
			good business practice is all about — honesty and integrity every step of the way.
			{#snippet attribution()}
				<b>Seller / Owner-Operator</b>
				<span>Bio-Pharma Engineering Firm</span>
			{/snippet}
		</QuoteBlock>
	</div>
</section>

<!-- CTA -->
<CtaBand
	eyebrow="Facing a Similar Exit?"
	image={professional}
	sizes="(max-width: 600px) 200vw, 100vw"
	bgOpacity={0.26}
>
	<h2>The hard part isn&rsquo;t the spreadsheet. It&rsquo;s everything around it.</h2>
	<p>Talk to the principal who would run your process.</p>
	{#snippet actions()}
		<Button variant="copper" href={SCHEDULE_URL} external arrow="right">Schedule a Call</Button>
		<Button variant="outline" href={pdf} download>Download PDF</Button>
	{/snippet}
</CtaBand>
