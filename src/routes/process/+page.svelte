<script lang="ts">
	import LineIcon from '#lib/components/LineIcon.svelte';
	import guideCover from '#lib/assets/process-guide-cover.jpg?w=720;360&enhanced';
	import hero from '#lib/assets/treated/hero.jpg?w=1600;1280;900;640;360&enhanced';
	import industrials from '#lib/assets/treated/industrials.jpg?w=900;640;360&enhanced';
	import professional from '#lib/assets/treated/professional.jpg?w=900;640;360&enhanced';
	import software from '#lib/assets/treated/software.jpg?w=900;640;360&enhanced';
	import Backdrop from '#lib/components/Backdrop.svelte';
	import Button from '#lib/components/Button.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Eyebrow from '#lib/components/Eyebrow.svelte';
	import FeatureSplit from '#lib/components/FeatureSplit.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import QuoteBlock from '#lib/components/QuoteBlock.svelte';
	import SectionHead from '#lib/components/SectionHead.svelte';
	import { SCHEDULE_PATH } from '#lib/site.ts';
	import Half from './Half.svelte';
	import Journey from './Journey.svelte';
	import JourneyStep from './JourneyStep.svelte';

	const GUIDE_PDF = '/downloads/Madfarm-The-Process.pdf';
</script>

<!-- HERO -->
<PageHero image={industrials} sizes="(max-width: 600px) 185vw, 100vw">
	<Eyebrow>The Process</Eyebrow>
	<h1>Structurally rigorous. Strategically flexible.</h1>
	<p class="lead">
		Five phases and three decision gates, run as one continuous process. Preparation is the same
		discipline on every engagement; the market strategy is built for your business alone. The
		timeline is scoped to the deal in front of us, never a fixed template.
	</p>
</PageHero>

<!-- TWO HALVES -->
<section class="section">
	<div class="wrap">
		<SectionHead eyebrow="How We Work" class="reveal">
			<h2>Two halves of one process. Neither works in isolation.</h2>
		</SectionHead>
		<div class="halves reveal">
			<Half variant="fixed" eyebrow="Structurally Rigorous">
				{#snippet icon()}
					<LineIcon name="stack" weight={1.7} />
				{/snippet}
				<h3>Preparation is fixed</h3>
				<ul>
					<li>The same discipline, in the same order, on every engagement</li>
					<li>Every obstacle surfaced and mitigated before going to market</li>
					<li>A file a buyer can underwrite the day they receive it</li>
				</ul>
			</Half>
			<Half variant="built" eyebrow="Strategically Flexible">
				{#snippet icon()}
					<LineIcon name="compass-fine" weight={1.7} />
				{/snippet}
				<h3>Market strategy is built</h3>
				<ul>
					<li>Buyer mix, sequencing and process type set to your goals</li>
					<li>Drawn from what preparation reveals, not a playbook</li>
					<li>Designed once, then executed with discipline</li>
				</ul>
			</Half>
		</div>
	</div>
</section>

<!-- THE ARC: five phases, each with what happens, and where the gates fall -->
<section class="section bg-steel" id="arc">
	<div class="wrap">
		<SectionHead eyebrow="The Arc" class="reveal">
			<h2>Five phases, one continuous arc.</h2>
			<p>
				The sequence holds on every deal. The pace does not. Some businesses move quickly and others
				need room, so we scope the timeline to yours rather than a calendar.
			</p>
		</SectionHead>
		<Journey class="reveal">
			<JourneyStep tone="pre" when="Pre-engagement" title="Evaluation">
				{#snippet icon()}
					<LineIcon name="search-bars" weight={1.7} />
				{/snippet}
				A discovery session and a preliminary read on value: what the business could command, what a process
				would look like, and what to address first. No cost, no obligation.
			</JourneyStep>
			<JourneyStep when="Kickoff" title="Foundation">
				{#snippet icon()}
					<LineIcon name="blocks" weight={1.7} />
				{/snippet}
				Goals, data room build, and financial and operational discovery. Short and dense; it sets everything
				downstream in motion.
			</JourneyStep>
			<JourneyStep when="The core" title="Preparation" gate="Gate 1 · Launch approval">
				{#snippet icon()}
					<LineIcon name="checklist" weight={1.7} />
				{/snippet}
				Financial preparation, quality of earnings, market analysis and go-to-market design. The heaviest
				lifting of the engagement, and what a clean process is built on.
			</JourneyStep>
			<JourneyStep when="In market" title="Market" gate="Gate 2 · LOI selection">
				{#snippet icon()}
					<LineIcon name="hub" weight={1.7} />
				{/snippet}
				Tiered buyer outreach, NDAs and CIM, management meetings, then indications of interest and LOI
				selection. We name your buyer list from evidence, not on day one.
			</JourneyStep>
			<JourneyStep tone="end" when="The finish" title="Close" gate="Gate 3 · Close">
				{#snippet icon()}
					<LineIcon name="document-signature" weight={1.7} />
				{/snippet}
				Confirmatory diligence, definitive agreement, working-capital true-up and funds flow. Thorough
				preparation is why diligence confirms what&rsquo;s known instead of uncovering surprises.
			</JourneyStep>
		</Journey>
	</div>
</section>

<!-- THE GUIDE: tease gates + deliverables, the PDF does the heavy lifting -->
<section class="section" id="guide">
	<div class="wrap guide-slot">
		<div class="guide reveal">
			<div class="guide-body">
				<Eyebrow>The Full Process</Eyebrow>
				<h2>Three decision gates. Six deliverables. Every detail in the guide.</h2>
				<p>
					At each gate we stop, and the decision is yours. Along the way we build the materials a
					buyer will underwrite from, and they stay yours after close. The owner&rsquo;s guide walks
					through every phase, gate, and deliverable, plus what we&rsquo;ll need from you.
				</p>
				<ul class="guide-gates">
					<li><span class="gate-tag">Gate 1</span>Launch approval</li>
					<li><span class="gate-tag">Gate 2</span>LOI selection</li>
					<li><span class="gate-tag">Gate 3</span>Close</li>
				</ul>
				<div class="guide-action">
					<Button variant="copper" href={GUIDE_PDF} download arrow="down">
						Download the Process
					</Button>
				</div>
			</div>
			<a
				class="guide-cover"
				href={GUIDE_PDF}
				download
				aria-label="Download The Madfarm Process (PDF)"
			>
				<enhanced:img
					src={guideCover}
					alt="Cover of The Madfarm Process, an owner&rsquo;s guide"
					sizes="(max-width: 600px) 70vw, (max-width: 1100px) 40vw, 356px"
					loading="lazy"
				/>
				<span class="guide-meta">PDF &middot; Owner&rsquo;s Guide</span>
			</a>
		</div>
	</div>
</section>

<!-- STATEMENT BAND -->
<section class="section bg-steel statement">
	<Backdrop image={hero} sizes="(max-width: 600px) 195vw, 100vw" opacity={0.22} />
	<div class="wrap">
		<QuoteBlock class="reveal">
			We set the pace, and buyers react to it. In a sell-side process, tempo is leverage. We
			don&rsquo;t hand it to the other side of the table.
			{#snippet attribution()}
				<span>How a Madfarm process keeps its edge</span>
			{/snippet}
		</QuoteBlock>
	</div>
</section>

<!-- CONFIDENTIALITY -->
<section class="section">
	<div class="wrap">
		<FeatureSplit
			eyebrow="Confidentiality"
			image={software}
			sizes="(max-width: 600px) 115vw, (max-width: 1100px) 95vw, 599px"
			class="reveal"
		>
			<h2>Your business never appears on a marketplace.</h2>
			<p>
				Confidentiality is a design decision, not a disclaimer. Every approach is deliberate: made
				by us, to a named buyer. Nothing that identifies your business goes out until it has to, and
				who gets read in, and when, stays your call.
			</p>
		</FeatureSplit>
	</div>
</section>

<!-- CTA -->
<CtaBand eyebrow="Start With Evaluation" image={professional}>
	<h2>Start with a read on value, not a commitment.</h2>
	<p>
		The complimentary pre-engagement (a discovery session and a preliminary valuation) comes before
		any paid work. No cost, no obligation.
	</p>
	{#snippet actions()}
		<Button variant="copper" href={SCHEDULE_PATH} arrow="right">Schedule a Call</Button>
		<Button variant="outline" href={GUIDE_PDF} download arrow="right">Download the Process</Button>
	{/snippet}
</CtaBand>

<style>
	/* Two halves */
	.halves {
		display: grid;
		/* Two columns while each card gets 27.5rem, one column below that. */
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 27.5rem), 1fr));
		gap: 1.25rem;
	}

	/* Owner's guide teaser. The guide answers to the width of its slot, not the page. */
	.guide-slot {
		container-type: inline-size;
	}
	.guide {
		display: grid;
		grid-template-columns: 1.25fr 0.75fr;
		gap: clamp(2rem, 6vw, 5rem);
		align-items: center;
	}
	.guide-body > h2 {
		font-size: var(--step-3);
		max-inline-size: 20ch;
		margin-block-start: 2rem;
	}
	.guide-body > p {
		max-inline-size: 56ch;
		margin-block-start: 1rem;
	}
	.guide-gates {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-block-start: 1.75rem;
	}
	.guide-gates li {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		padding: 0.9rem 1.1rem;
		min-inline-size: 150px;
		background: var(--chalk-2);
		border: 1px solid var(--sand);
		border-radius: var(--radius);
		font-family: var(--serif);
		font-weight: 700;
		color: var(--steel);
		font-size: 1rem;
	}
	.gate-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		font-size: 0.74rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		font-weight: 700;
		color: var(--copper);
	}
	.gate-tag::before {
		content: '';
		inline-size: 8px;
		block-size: 8px;
		background: var(--copper);
		rotate: 45deg;
	}
	.guide-action {
		margin-block-start: 3rem;
	}
	.guide-cover {
		position: relative;
		display: block;
		justify-self: center;
		inline-size: min(100%, 340px);
		transform: rotate(2deg);
	}
	.guide-cover :global(img) {
		display: block;
		inline-size: 100%;
		block-size: auto;
		border-radius: 3px;
		box-shadow:
			0 30px 50px -24px color-mix(in oklch, var(--steel-2) 60%, transparent),
			0 2px 6px color-mix(in oklch, var(--steel-2) 18%, transparent);
	}
	.guide-cover:active {
		transform: rotate(0) scale(0.98);
	}
	.guide-meta {
		position: absolute;
		inset-inline-start: -14px;
		inset-block-end: 22px;
		background: var(--copper);
		color: var(--white);
		font-size: 0.68rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		font-weight: 600;
		padding: 0.45rem 0.8rem;
		border-radius: 2px;
	}
	@media (hover: hover) and (pointer: fine) {
		.guide-cover:hover {
			transform: rotate(0) translateY(-4px);
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		.guide-cover {
			transition: transform 0.35s var(--ease);
		}
	}
	@container (width < 49.5rem) {
		.guide {
			grid-template-columns: 1fr;
		}
		.guide-cover {
			inline-size: min(70%, 280px);
		}
	}

	/* Statement band */
	.statement {
		position: relative;
		isolation: isolate;
		overflow: clip;
	}
</style>
