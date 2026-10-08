<script lang="ts">
	import spencer from '#lib/assets/team/spencer-williams-home.jpg?w=560;320&enhanced';
	import commercialServices from '#lib/assets/treated/commercial-services.jpg?w=900;640;360&enhanced';
	import craft from '#lib/assets/treated/craft.jpg?w=900;640;360&enhanced';
	import hero from '#lib/assets/treated/hero.jpg?w=1600;1280;900;640;360&enhanced';
	import industrials from '#lib/assets/treated/industrials.jpg?w=900;640;360&enhanced';
	import professional from '#lib/assets/treated/professional.jpg?w=900;640;360&enhanced';
	import software from '#lib/assets/treated/software.jpg?w=900;640;360&enhanced';
	import Button from '#lib/components/Button.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import FeatureSplit from '#lib/components/FeatureSplit.svelte';
	import QuoteBlock from '#lib/components/QuoteBlock.svelte';
	import SectionHead from '#lib/components/SectionHead.svelte';
	import DealsMarquee from '#lib/deals/DealsMarquee.svelte';
	import { SCHEDULE_URL } from '#lib/site.ts';
	import Faq from './Faq.svelte';
	import Founder from './Founder.svelte';
	import Hero from './Hero.svelte';
	import Pillar from './Pillar.svelte';
	import SectorCard from './SectorCard.svelte';
</script>

<!-- ================= HERO ================= -->
<Hero
	eyebrow="Sell-Side M&amp;A"
	image={hero}
	sizes="(max-width: 600px) 300vw, (max-width: 1100px) 120vw, 100vw"
>
	{#snippet heading()}Lower Middle Market M&amp;A Advisors{/snippet}
	{#snippet tagline()}Selling your business is <span class="accent">our</span> business.{/snippet}
	Senior representation for owners of mission-critical businesses: industrials, commercial services, software,
	and professional services in the $5M–$50M revenue range.
	{#snippet actions()}
		<Button variant="copper" href={SCHEDULE_URL} external arrow="right">Schedule a Call</Button>
		<a href="/case-studies" class="link-underline">Explore Case Studies</a>
	{/snippet}
</Hero>

<!-- ================= CLOSED TRANSACTIONS (tombstone scroll) ================= -->
<DealsMarquee title="Selected Closed Transactions" />

<!-- ================= FOUNDER MOMENT (human presence, early) ================= -->
<section class="section--tight founder-section">
	<div class="wrap">
		<Founder
			eyebrow="Senior Representation"
			image={spencer}
			alt="Spencer Williams, Founding Principal of Madfarm Advisors"
			sizes="(max-width: 600px) 90vw, (max-width: 1100px) 35vw, 340px"
		>
			You don&rsquo;t get handed to a junior banker at Madfarm. The principal who pitches the
			engagement is the one who runs the buyers, sits across from you at the table, and defends your
			terms through close. Every deal is a people deal, and the people work is where it gets won or
			lost.
			{#snippet attribution()}
				<b>Spencer Williams</b>
				<span>Founder &amp; Managing Partner, Madfarm Advisors</span>
			{/snippet}
		</Founder>
	</div>
</section>

<!-- ================= SECTORS (Where we work) ================= -->
<section class="section bg-steel">
	<div class="wrap">
		<SectionHead eyebrow="Where We Work" class="reveal">
			<h2>Sector expertise that shows up in the outcome.</h2>
			<p>
				Not a generalist banker learning your sector mid-engagement. A practice built around four
				kinds of mission-critical business.
			</p>
		</SectionHead>
		<div class="sectors reveal">
			<SectorCard
				href="/contact"
				image={craft}
				alt="Industrial plant and processing infrastructure"
				num="01"
				title="Industrials"
			/>
			<SectorCard
				href="/contact"
				image={commercialServices}
				alt="Commercial building mechanical systems and pipework service"
				num="02"
				title="Commercial Services"
			/>
			<SectorCard
				href="/contact"
				image={software}
				alt="Data center and software infrastructure"
				num="03"
				title="Software"
			/>
			<SectorCard
				href="/contact"
				image={professional}
				alt="Professional services and architecture"
				num="04"
				title="Professional Services"
			/>
		</div>
	</div>
</section>

<!-- ================= WHY MADFARM WINS ================= -->
<section class="section bg-chalk-2" id="why">
	<div class="wrap">
		<SectionHead eyebrow="Why Madfarm" class="reveal">
			<h2>The firm serious owners hire.</h2>
			<p>Four things separate Madfarm for owners who could hire anyone.</p>
		</SectionHead>
		<div class="pillars reveal">
			<Pillar num="01">
				{#snippet icon()}
					<svg
						viewBox="0 0 32 32"
						fill="none"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<circle cx="16" cy="10" r="4.2" />
						<path d="M4 25h24M9 25v-1.5a7 7 0 0 1 14 0V25" />
					</svg>
				{/snippet}
				<h3>Senior representation, every deal.</h3>
				<p>
					The person who pitched the engagement runs the process, manages the buyers, and sits
					across from you at close. Your deal is not someone else&rsquo;s resume.
				</p>
			</Pillar>
			<Pillar num="02">
				{#snippet icon()}
					<svg
						viewBox="0 0 32 32"
						fill="none"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M4 13 16 6l12 7M6 13v11M12 13v11M20 13v11M26 13v11M4 27h24" />
					</svg>
				{/snippet}
				<h3>Boutique attention. Institutional results.</h3>
				<p>
					A deliberate book means every client gets the attention a deal of this size deserves,
					without giving up the rigor, buyer access, and process discipline of a larger shop.
				</p>
			</Pillar>
			<Pillar num="03">
				{#snippet icon()}
					<svg
						viewBox="0 0 32 32"
						fill="none"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<circle cx="7" cy="9" r="3" />
						<circle cx="25" cy="9" r="3" />
						<circle cx="16" cy="24" r="3" />
						<path d="M9.6 10.6 13.8 21.6M22.4 10.6 18.2 21.6M10 9h12" />
					</svg>
				{/snippet}
				<h3>Tech-enabled. Relationally led.</h3>
				<p>
					Modern tools run a sharper process, but the work is relational: partners who no longer
					agree, family on the cap table, buyers who need managing. That&rsquo;s where deals are won
					or lost.
				</p>
			</Pillar>
			<Pillar num="04">
				{#snippet icon()}
					<svg
						viewBox="0 0 32 32"
						fill="none"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M16 5 28 11 16 17 4 11 16 5Z" />
						<path d="M4 16.5 16 22.5 28 16.5M4 21.5 16 27.5 28 21.5" />
					</svg>
				{/snippet}
				<h3>Earned expertise, not borrowed credentials.</h3>
				<p>
					Operating experience inside industrial services, transaction advisory across the lower
					middle market, and legal training in business transactions. Judgment for what actually
					happens when a deal gets hard.
				</p>
			</Pillar>
		</div>
	</div>
</section>

<!-- ================= PROCESS ================= -->
<section class="section" id="process">
	<div class="wrap">
		<SectionHead eyebrow="The Process" class="reveal">
			<h2>Structurally rigorous. Strategically flexible.</h2>
			<p>
				Preparation is fixed: the same discipline on every engagement, in the same order. Market
				strategy is built from what that preparation reveals. Two halves of one process, and they
				are not interchangeable.
			</p>
		</SectionHead>
		<div class="process reveal">
			<div class="step">
				<h3>Foundation</h3>
				<p>
					Goals and process meetings, the data room build, and financial and operations discovery.
					Short, dense, and the single biggest driver of your launch date.
				</p>
			</div>
			<div class="step">
				<h3>Preparation</h3>
				<p>
					Quality of earnings, the financial workbook, market analysis and go-to-market design. We
					build the file a buyer will underwrite from before any buyer sees it.
				</p>
			</div>
			<div class="step">
				<h3>Market</h3>
				<p>
					Tiered buyer outreach, NDAs and CIM release, management meetings, and the IOI round
					through LOI selection. Strategy is an output of preparation, not a template applied to it.
				</p>
			</div>
			<div class="step">
				<h3>Close</h3>
				<p>
					Confirmatory diligence, definitive agreements, net working capital true-up and funds flow.
					Diligence should confirm known facts, not discover new ones.
				</p>
			</div>
		</div>
		<div class="process-more reveal">
			<Button variant="outline" href="/process" arrow="right">See the full process</Button>
		</div>
	</div>
</section>

<!-- ================= CASE STUDY FEATURE ================= -->
<section class="section--tight bg-chalk-2">
	<div class="wrap">
		<FeatureSplit eyebrow="Case Study" image={industrials} class="reveal">
			<h2>The results, and how they were reached.</h2>
			<p>
				What kind of business, what made it hard, what Madfarm did, and the outcome the owner walked
				away with. A real sell-side process, start to close.
			</p>
			{#snippet actions()}
				<Button href="/case-studies" arrow="right">Explore Case Studies</Button>
			{/snippet}
		</FeatureSplit>
	</div>
</section>

<!-- ================= TESTIMONIAL ================= -->
<section class="section bg-steel">
	<div class="wrap">
		<QuoteBlock eyebrow="In Their Words" class="reveal">
			Spencer and his team were focused on understanding the narrative, objective and relationships
			surrounding the asset, and put emphasis on approaching the entire process with integrity and
			long-term value in mind.
			{#snippet attribution()}
				<b>Stayko Staykov</b>
				<span>Managing Partner, Fivestone Corporate Ventures</span>
			{/snippet}
		</QuoteBlock>
	</div>
</section>

<!-- ================= FAQ ================= -->
<section class="section" id="faq">
	<div class="wrap">
		<SectionHead eyebrow="Questions Owners Ask" align="center" class="reveal">
			<h2>Straight answers, before you call.</h2>
		</SectionHead>
		<div class="faq reveal">
			<Faq question="What is the complimentary pre-engagement process?">
				<p>
					Before any paid engagement begins, we run a complimentary pre-engagement process: a
					discovery session and a preliminary valuation. You get a real read on what the business
					could command in today&rsquo;s market, an honest view of what a process would look like,
					and a short list of what to address first. There is no cost and no obligation; it is how
					nearly every engagement starts.
				</p>
			</Faq>
			<Faq question="How much is my business worth?">
				<p>
					It depends on how buyers underwrite it: recurring revenue, customer concentration,
					management depth, and the story around the numbers. We give owners a real read, not an
					inflated one designed to win the engagement. That starts with our complimentary
					pre-engagement process: a discovery session and a preliminary valuation, at no cost and
					before any paid engagement begins.
				</p>
			</Faq>
			<Faq question="How long does selling take?">
				<p>
					Most sell-side processes run several months to a year from preparation to close, depending
					on readiness and market. We don&rsquo;t go to market until the business can withstand
					diligence. That protects both value and timeline.
				</p>
			</Faq>
			<Faq question="What sectors do you work in?">
				<p>
					Mission-critical businesses: industrials, commercial services, software, and professional
					services, generally $5M&ndash;$50M in revenue. Not a generalist banker learning your
					sector mid-engagement.
				</p>
			</Faq>
			<Faq question="What happens if I&rsquo;m not ready to sell yet?">
				<p>
					Many owners aren&rsquo;t. Our complimentary pre-engagement process gives you a real read
					on what the business could command today, plus guidance on what to focus on now to set up
					a stronger sale later. See our <a href="/resources" class="inline-link">resources</a>.
				</p>
			</Faq>
		</div>
	</div>
</section>

<!-- ================= CTA BAND ================= -->
<CtaBand eyebrow="Talk to a Senior Banker" image={professional}>
	<h2>The decision to sell deserves the same rigor you put into the business.</h2>
	<p>
		A serious owner should be able to talk to the principal quickly. No long forms, no junior
		gatekeepers.
	</p>
	{#snippet actions()}
		<Button variant="copper" href={SCHEDULE_URL} external arrow="right">Schedule a Call</Button>
		<Button variant="outline" href="/about">Meet the Firm</Button>
	{/snippet}
</CtaBand>

<style>
	/* Text link next to the hero button. It sits on the dark hero. */
	.link-underline {
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--white);
		padding-block-end: 3px;
		border-block-end: 2px solid var(--copper);
		transition:
			color var(--dur) var(--ease),
			border-color var(--dur) var(--ease);
	}
	.link-underline:active {
		color: var(--copper-on-dark);
		border-color: var(--copper-on-dark);
	}
	@media (hover: hover) and (pointer: fine) {
		.link-underline:hover {
			color: var(--copper-on-dark);
			border-color: var(--copper-on-dark);
		}
	}

	.founder-section {
		background: var(--chalk);
		padding-block: clamp(2.5rem, 5vw, 4rem);
	}

	.sectors {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
	}

	.pillars {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1px;
		background: var(--sand);
		border: 1px solid var(--sand);
	}

	.process {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
		counter-reset: step;
	}
	.step {
		position: relative;
		padding-block-start: 2.5rem;
		border-block-start: 2px solid var(--copper);
	}
	.step::before {
		counter-increment: step;
		content: '0' counter(step);
		position: absolute;
		inset-block-start: -0.5rem;
		inset-inline-start: 0;
		font-family: var(--serif);
		font-size: 1rem;
		font-weight: 700;
		color: var(--copper);
		background: var(--chalk);
		padding-inline-end: 0.6rem;
	}
	.step h3 {
		font-size: 1.2rem;
		margin-block-end: 0.5rem;
	}
	.step p {
		font-size: 0.93rem;
	}
	.process-more {
		margin-block-start: clamp(2rem, 4vw, 3rem);
	}

	.faq {
		max-inline-size: 820px;
		margin-inline: auto;
		border-block-start: 1px solid var(--sand);
	}
	.inline-link {
		color: var(--copper);
	}
	.inline-link:active {
		color: var(--steel);
	}

	@media (max-width: 980px) {
		.sectors {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 900px) {
		.process {
			grid-template-columns: repeat(2, 1fr);
			gap: 2rem 1.5rem;
		}
	}
	@media (max-width: 720px) {
		.pillars,
		.process {
			grid-template-columns: 1fr;
		}
	}
</style>
