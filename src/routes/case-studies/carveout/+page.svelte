<script lang="ts">
	import LineIcon from '#lib/components/LineIcon.svelte';
	import renewables from '#lib/assets/treated/renewables.jpg?w=1600;1280;900;640;360&enhanced';
	import Button from '#lib/components/Button.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import QuoteBlock from '#lib/components/QuoteBlock.svelte';
	import SectionHead from '#lib/components/SectionHead.svelte';
	import CaseHero from '../CaseHero.svelte';
	import CsItem from '../CsItem.svelte';
	import CsList from '../CsList.svelte';
	import CsProse from '../CsProse.svelte';
	import Snapshot from '../Snapshot.svelte';
	import StatTiles from '../StatTiles.svelte';

	const pdf = '/downloads/Madfarm-Case-Study-Carve-Out.pdf';

	const snapshot = [
		{ label: 'Sector', value: 'Renewable Energy Manufacturing' },
		{ label: 'Transaction', value: 'Corporate Carve-Out & Cross-Border Sale' },
		{ label: 'Closed', value: '2023' },
		{ label: 'Headline Result', value: 'Going concern preserved' }
	];

	const outcome = [
		{
			figure: 'Preserved',
			label:
				'The product line is still manufactured and sold in the U.S. under its new owner: a going concern, not a wind-down.'
		},
		{
			figure: 'Clean Exit',
			label: 'The sponsor’s mandate, a clean divestiture of a non-core asset, met in full.'
		},
		{
			figure: 'Cross-Border',
			label: 'Placed with an international strategic when the domestic buyer pool was thin.'
		},
		{
			figure: 'Well-Capitalized',
			label: 'A buyer with both a strategic reason and the capital to invest in it and grow it.'
		}
	];
</script>

<!-- HERO -->
<CaseHero
	image={renewables}
	sizes="(max-width: 600px) 300vw, (max-width: 1100px) 130vw, 100vw"
	type="Corporate Carve-Out"
	{pdf}
	scheduleHref="/contact"
>
	<h1>Carving out a non-core division, and finding its natural owner.</h1>
	<p class="lead">
		A sell-side carve-out of a non-core renewable energy manufacturing division for a private equity
		sponsor, executed to preserve the business as a going concern and place it with the one buyer
		strategically positioned to own it.
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
			<h2>A carve-out with a mandate attached.</h2>
		{/snippet}
		<p>
			A private equity sponsor had just acquired a precision aerospace manufacturer, a deal that
			carried a commitment to divest a non-core renewable energy manufacturing division, with
			proceeds flowing to the sponsor. The division, a long-held priority of the former owner, made
			renewable energy equipment.
		</p>
		<p>
			The sponsor&rsquo;s mandate was specific: a clean exit that kept the business and its product
			line running as a U.S. operation: not a wind-down, and not a sale for parts. Madfarm was
			engaged as sell-side advisor.
		</p>
	</CsProse>
</section>

<!-- CARVE-OUT MECHANICS (lead) -->
<section class="section bg-chalk-2">
	<div class="wrap">
		<SectionHead eyebrow="The Carve-Out" class="reveal">
			<h2>Where the hard problems were operational.</h2>
			<p>
				A carve-out whose most demanding work was practical, not paper, and much of it continued
				after close.
			</p>
		</SectionHead>
		<CsList columns={2} class="reveal">
			<CsItem>
				{#snippet icon()}
					<LineIcon name="table" />
				{/snippet}
				<h3>A Clean Structure</h3>
				<p>
					The division already sat in its own legal entity, so the transaction could be a stock
					purchase, skipping a full asset carve-out and the delay that comes with it.
				</p>
			</CsItem>
			<CsItem>
				{#snippet icon()}
					<LineIcon name="document-check" />
				{/snippet}
				<h3>A TSA That Held Through the Move</h3>
				<p>
					The manufacturing footprint relocated across state lines almost simultaneously with
					closing. A transition services agreement set the guardrails for custody, tracking, and
					handoff of significant work-in-progress and parts inventory, protecting both parties as
					the operation moved.
				</p>
			</CsItem>
			<CsItem>
				{#snippet icon()}
					<LineIcon name="award" />
				{/snippet}
				<h3>Grant &amp; Regulatory Continuity</h3>
				<p>
					Federal research-lab R&amp;D grants and relationships transitioned to the new owner
					without interruption, and the business stayed compliant through both the change of control
					and the relocation.
				</p>
			</CsItem>
			<CsItem>
				{#snippet icon()}
					<LineIcon name="shield-check" />
				{/snippet}
				<h3>Sponsor Governance</h3>
				<p>
					We ran KYC and sanctions screening on a foreign acquirer and flagged cross-border risk for
					the sponsor&rsquo;s LP group. The asset was small; the governance around it couldn&rsquo;t
					be.
				</p>
			</CsItem>
		</CsList>
	</div>
</section>

<!-- BUYER STRATEGY -->
<section class="section">
	<div class="wrap">
		<SectionHead eyebrow="Finding the Natural Owner" class="reveal">
			<h2>A thin domestic pool isn&rsquo;t a dead end.</h2>
			<p>
				The thesis: find the buyer whose strategy and timing made the asset worth more to them than
				to anyone else.
			</p>
		</SectionHead>
		<CsList class="reveal">
			<CsItem>
				{#snippet icon()}
					<LineIcon name="network" />
				{/snippet}
				<h3>Widen the Field</h3>
				<p>
					Domestic buyer interest was weak, so we deliberately widened the search to international
					participants, looking well beyond the obvious pool.
				</p>
			</CsItem>
			<CsItem>
				{#snippet icon()}
					<LineIcon name="target" />
				{/snippet}
				<h3>A Buyer-Specific Thesis</h3>
				<p>
					European renewables had matured and subsidies were fading, pushing European capital toward
					U.S. growth, while Inflation Reduction Act incentives favored domestic clean-energy
					manufacturing. The eventual buyer, an international renewable energy company fresh off a
					raise led by a major European utility, carried a mandate to establish U.S. manufacturing.
					The division&rsquo;s federal research relationships added strategic value.
				</p>
			</CsItem>
			<CsItem>
				{#snippet icon()}
					<LineIcon name="team" />
				{/snippet}
				<h3>Two Audiences to Win</h3>
				<p>
					Closing meant convincing two parties, not one: the buyer&rsquo;s management and its lead
					institutional investor.
				</p>
			</CsItem>
		</CsList>
	</div>
</section>

<!-- FIRST-TIME ACQUIRER -->
<section class="section--tight">
	<CsProse
		eyebrow="After the Handshake"
		--prose-title-size="clamp(1.5rem, 2.6vw, 2rem)"
		--prose-head-space="1.25rem"
	>
		{#snippet heading()}
			<h2>Guiding a first-time U.S. acquirer.</h2>
		{/snippet}
		<p>
			This was the buyer&rsquo;s first U.S. acquisition. A meaningful part of our role was getting
			it comfortable with a U.S. deal process and, after close, helping it build local business
			relationships in its new operating market.
		</p>
	</CsProse>
</section>

<!-- OUTCOME -->
<section class="section bg-steel">
	<div class="wrap">
		<SectionHead eyebrow="The Outcome" class="reveal">
			<h2>A business preserved, not parted out.</h2>
		</SectionHead>
		<StatTiles items={outcome} class="reveal">
			{#snippet note()}
				We built the process around the mandate (continuity and a clean exit over headline price)
				and delivered a buyer strategically positioned to own the business for the long term.
			{/snippet}
		</StatTiles>
	</div>
</section>

<!-- QUOTE -->
<section class="section">
	<div class="wrap">
		<QuoteBlock eyebrow="Advisor Perspective" align="start" size="md" tone="strong" class="reveal">
			A thin domestic buyer pool isn&rsquo;t a dead end. We built the process around the
			sponsor&rsquo;s mandate, a clean exit that kept the business a going concern, and found the
			one buyer strategically positioned to own it: an international strategic for whom timing and
			thesis made the asset worth more than to anyone else.
			{#snippet attribution()}
				<b>Madfarm Advisors</b>
				<span>Sell-side advisor</span>
			{/snippet}
		</QuoteBlock>
	</div>
</section>

<!-- CTA -->
<CtaBand
	eyebrow="Divesting a Non-Core Asset?"
	image={renewables}
	sizes="(max-width: 600px) 280vw, (max-width: 1100px) 115vw, 100vw"
	bgOpacity={0.26}
>
	<h2>The hardest carve-out problems are operational, and they continue after close.</h2>
	<p>Talk to the principal who would run your process.</p>
	{#snippet actions()}
		<Button variant="copper" href="/contact" arrow="right">Schedule a Call</Button>
		<Button variant="outline" href={pdf} download>Download PDF</Button>
	{/snippet}
</CtaBand>
