<script lang="ts">
	import bobOgdon from '#lib/assets/team/advisors/bob-ogdon.jpg?w=320;160&enhanced';
	import danOgdon from '#lib/assets/team/advisors/dan-ogdon.jpg?w=320;160&enhanced';
	import dougRobinson from '#lib/assets/team/advisors/doug-robinson.jpg?w=320;160&enhanced';
	import mikeOgdon from '#lib/assets/team/advisors/mike-ogdon.jpg?w=320;160&enhanced';
	import timDonohue from '#lib/assets/team/advisors/tim-donohue.jpg?w=320;160&enhanced';
	import spencerThumb from '#lib/assets/team/spencer-williams-thumb.jpg?enhanced';
	import spencer from '#lib/assets/team/spencer-williams.jpg?w=560;320&enhanced';
	import willThumb from '#lib/assets/team/will-davis-thumb.jpg?enhanced';
	import will from '#lib/assets/team/will-davis.jpg?w=560;320&enhanced';
	import industrials from '#lib/assets/treated/industrials.jpg?w=900;640;360&enhanced';
	import software from '#lib/assets/treated/software.jpg?w=900;640;360&enhanced';
	import Button from '#lib/components/Button.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Eyebrow from '#lib/components/Eyebrow.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import SectionHead from '#lib/components/SectionHead.svelte';
	import { SCHEDULE_URL } from '#lib/site.ts';
	import Advisor from './Advisor.svelte';
	import ExecCard from './ExecCard.svelte';
	import Leader from './Leader.svelte';
</script>

<!-- PAGE HERO -->
<PageHero image={software} sizes="(max-width: 600px) 185vw, 100vw">
	<Eyebrow>About Madfarm</Eyebrow>
	<h1>A practice built to sell mission-critical businesses.</h1>
	<p class="lead">
		We are not a broker. We are not a generalist boutique. We are a senior-led sell-side practice
		for owners who take their business seriously and expect the same of the people who represent it.
	</p>
	<a class="team-chip" href="#leadership">
		<span class="team-chip__faces">
			<enhanced:img src={spencerThumb} alt="" />
			<enhanced:img src={willThumb} alt="" />
		</span>
		<span class="team-chip__text">
			<b>Meet the team</b>
			<span>Spencer Williams &amp; Will Davis</span>
		</span>
		<span class="arw" aria-hidden="true">&darr;</span>
	</a>
</PageHero>

<!-- THE THESIS -->
<section class="section--tight bg-chalk">
	<div class="wrap">
		<div class="thesis__grid">
			<div class="thesis__main reveal">
				<Eyebrow>The Madfarm Thesis</Eyebrow>
				<h2>Boutique attention. Institutional results.</h2>
				<p class="lead">
					Madfarm is a lower middle market investment bank built to sell mission-critical
					businesses: industrials, commercial services, software, and professional services in the
					$5M&ndash;$50M revenue range.
				</p>
				<div class="principles">
					<div class="principle">
						<Icon>
							<svg
								viewBox="0 0 32 32"
								fill="none"
								stroke="currentColor"
								stroke-width="1.7"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<circle cx="16" cy="11" r="5" />
								<path d="M6.5 27c0-5.2 4.3-9 9.5-9s9.5 3.8 9.5 9" />
							</svg>
						</Icon>
						<div>
							<h3>Principal-led</h3>
							<p>
								Every engagement is led by the principal who pitched it. No handoffs, no learning
								curves on your dime.
							</p>
						</div>
					</div>
					<div class="principle">
						<Icon>
							<svg
								viewBox="0 0 32 32"
								fill="none"
								stroke="currentColor"
								stroke-width="1.7"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<rect x="7" y="6" width="18" height="22" rx="2" />
								<path d="M12 6V4.5h8V6" />
								<path d="m11 13.5 1.8 1.8 3.2-3.3M11 21l1.8 1.8 3.2-3.3M19 14h3M19 21.5h3" />
							</svg>
						</Icon>
						<div>
							<h3>A sharper process</h3>
							<p>
								Modern tools and the rigor of a real M&amp;A process, run the same disciplined way
								on every deal.
							</p>
						</div>
					</div>
					<div class="principle">
						<Icon>
							<svg
								viewBox="0 0 32 32"
								fill="none"
								stroke="currentColor"
								stroke-width="1.7"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<circle cx="12" cy="12" r="3.4" />
								<path d="M5.5 25c0-3.6 2.9-6.3 6.5-6.3s6.5 2.7 6.5 6.3" />
								<circle cx="22.5" cy="13.5" r="2.7" />
								<path d="M20.5 19c3.2.1 5.8 2.6 5.8 6.1" />
							</svg>
						</Icon>
						<div>
							<h3>Judgment beyond the numbers</h3>
							<p>
								The relational fluency to navigate what happens across the table, around it, and
								inside your business.
							</p>
						</div>
					</div>
				</div>
			</div>
			<aside class="glance on-dark reveal" aria-label="Madfarm at a glance">
				<Eyebrow>At a Glance</Eyebrow>
				<div class="glance__stats">
					<div>
						<span class="glance__n">6.7&times;</span>
						<span class="glance__k">Average EBITDA multiple across closed engagements</span>
					</div>
					<div>
						<span class="glance__n">100%</span>
						<span class="glance__k">Close rate on full-process deals</span>
					</div>
				</div>
				<dl>
					<div>
						<dt>Founded</dt>
						<dd>2020</dd>
					</div>
					<div>
						<dt>Mandates</dt>
						<dd>Exclusive sell-side &amp; strategic advisory</dd>
					</div>
					<div>
						<dt>Revenue range</dt>
						<dd>$5M&ndash;$50M</dd>
					</div>
					<div>
						<dt>Sectors</dt>
						<dd>
							Industrials &middot; Commercial Services &middot; Software &middot; Professional
							Services
						</dd>
					</div>
				</dl>
				<p class="glance__foot">Member, Alliance of Mergers &amp; Acquisitions Advisors</p>
			</aside>
		</div>
	</div>
</section>

<!-- LEADERSHIP -->
<section class="section bg-chalk-2" id="leadership">
	<div class="wrap">
		<SectionHead eyebrow="Leadership" class="reveal">
			<h2>Senior judgment on every mandate.</h2>
			<p>
				The people who run the deal, supported by a board of advisors with decades of operating and
				transaction experience.
			</p>
		</SectionHead>

		<div class="sub-eyebrow">
			<Eyebrow class="reveal">Senior Leadership</Eyebrow>
		</div>
		<div class="leaders">
			<Leader
				class="reveal"
				image={spencer}
				alt="Spencer Williams, Founder and Managing Partner"
				role="Founder &amp; Managing Partner"
				name="Spencer Williams"
				linkedin="https://www.linkedin.com/in/spencer-williams-4713b638/"
			>
				<p>
					Spencer is the founding principal of Madfarm and brings more than a decade of
					transactional and operating experience to every engagement. He leads sell-side and
					strategic advisory mandates hands-on, from first conversation to close. He is collegial at
					the table, firm and straightforward on terms, and data-driven in how he builds and defends
					a deal.
				</p>
				<p>
					He began his career in private legal practice in Denver after earning his Juris Doctorate
					with a focus on business transactions. Three years later he launched a consulting practice
					advising buyers and asset owners in Colorado&rsquo;s complex water and natural resources
					markets, and led the development of database products used to underwrite numerous
					industrial services transactions across Texas and New Mexico. He then managed and scaled a
					tech-enabled industrial logistics and supply chain business within a larger venture-backed
					startup.
				</p>
				<p>
					In late 2020 he returned to his transactional roots and founded Madfarm to serve lower
					middle market business owners exclusively. He holds his J.D. from the University of
					Tennessee College of Law and is an active member of the Alliance of Mergers &amp;
					Acquisitions Advisors.
				</p>
			</Leader>

			<Leader
				class="reveal"
				image={will}
				alt="Will Davis, Managing Director"
				role="Managing Director"
				name="Will Davis"
				linkedin="https://www.linkedin.com/in/williammarkdavis/"
			>
				<p>
					Will joined Madfarm to give lower middle market business owners a seller-first advocate
					who knows what actually drives enterprise value, not just how to run a process. He brings
					more than a decade of transaction experience to every engagement, fully aligned with the
					outcome the founder is working toward.
				</p>
				<p>
					His edge comes from three perspectives most bankers never combine: sales leadership that
					scaled a startup from $0 to $100M in revenue, hands-on experience as a private equity deal
					sponsor, and direct execution on capital raises and sponsor operating initiatives. It is
					the difference between an advisor who manages a transaction and a partner who understands
					how growth builds value, how buyers underwrite risk, and how to structure a deal that puts
					leverage back in the seller&rsquo;s hands.
				</p>
				<p>
					He holds a B.A. from Texas A&amp;M University and an MBA from the McCombs School of
					Business at the University of Texas at Austin, and still bleeds maroon through and
					through.
				</p>
			</Leader>
		</div>

		<!-- Execution Team -->
		<SectionHead eyebrow="Execution Team" class="reveal">
			<h2 class="sub-title">The bench that runs the process.</h2>
			<p>
				Behind every mandate is a team of analysts and deal support who power the analytical and
				administrative work, so the senior banker stays focused on the deal.
			</p>
		</SectionHead>
		<div class="exec-grid reveal">
			<ExecCard title="Analysts">
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
						<circle cx="14" cy="14" r="8.5" />
						<path d="M20.2 20.2 26.5 26.5" />
						<path d="M11 17v-3.5M14 17v-6.5M17 17v-4.5" />
					</svg>
				{/snippet}
				<p>
					Financial modeling, market research, and the analytical work that underwrites a defensible
					view of value.
				</p>
			</ExecCard>
			<ExecCard title="Deal Support">
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
						<path
							d="M4 9.5A2.5 2.5 0 0 1 6.5 7h5.2l2.6 3h11.2A2.5 2.5 0 0 1 28 12.5v10A2.5 2.5 0 0 1 25.5 25h-19A2.5 2.5 0 0 1 4 22.5z"
						/>
						<path d="M4 15.5h24" />
					</svg>
				{/snippet}
				<p>
					Marketing materials, data room management, and buyer coordination that keep a process
					organized and moving.
				</p>
			</ExecCard>
			<ExecCard title="Diligence &amp; Documentation">
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
						<path d="M16 4l10 3.8v7.6c0 6.1-4.3 10-10 12.6-5.7-2.6-10-6.5-10-12.6V7.8z" />
						<path d="m11.6 16.2 3 3 6-6" />
					</svg>
				{/snippet}
				<p>
					Keeping diligence organized and momentum intact from LOI through closing and final
					documents.
				</p>
			</ExecCard>
		</div>

		<!-- Board of Advisors -->
		<SectionHead eyebrow="Board of Advisors" class="reveal">
			<h2 class="sub-title">Operating and transaction experience behind every deal.</h2>
			<p>
				Madfarm draws on a board of advisors: operators and dealmakers who have built, bought, and
				sold lower middle market businesses.
			</p>
		</SectionHead>
		<div class="advisors reveal">
			<Advisor image={bobOgdon} name="Bob Ogdon" href="https://www.linkedin.com/in/bobogdon" />
			<Advisor
				image={dougRobinson}
				name="Doug Robinson"
				href="https://www.linkedin.com/in/doug-robinson-369ab6/"
			/>
			<Advisor image={danOgdon} name="Dan Ogdon" href="https://www.linkedin.com/in/danogdon/" />
			<Advisor
				image={mikeOgdon}
				name="Mike Ogdon"
				href="https://www.linkedin.com/in/mike-ogdon-0986436/"
			/>
			<Advisor
				image={timDonohue}
				name="Tim Donohue"
				href="https://www.linkedin.com/in/tim-donohue-b307888/"
			/>
		</div>
	</div>
</section>

<!-- CTA -->
<CtaBand eyebrow="Start a Conversation" image={industrials} sizes="(max-width: 600px) 200vw, 100vw">
	<h2>Talk to the person who would run your deal.</h2>
	<p>Direct access to the principal, not a junior gatekeeper.</p>
	{#snippet actions()}
		<Button variant="copper" href={SCHEDULE_URL} external arrow="right">Schedule a Call</Button>
		<Button variant="outline" href="/process">See How We Work</Button>
	{/snippet}
</CtaBand>

<style>
	/* ---------- Team chip in the hero ---------- */
	.team-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.9rem;
		margin-block-start: 1.9rem;
		padding-block: 0.5rem;
		padding-inline: 0.5rem 1.1rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.06);
		color: var(--heading);
		transition:
			background-color var(--dur) var(--ease),
			border-color var(--dur) var(--ease);
	}
	@media (hover: hover) and (pointer: fine) {
		.team-chip:hover {
			background: rgba(255, 255, 255, 0.08);
			border-color: var(--accent);
		}
	}
	.team-chip:active {
		background: rgba(255, 255, 255, 0.12);
		border-color: var(--accent);
	}
	.team-chip__faces {
		display: flex;
	}
	.team-chip__faces :global(img) {
		inline-size: 42px;
		block-size: 42px;
		border-radius: 50%;
		object-fit: cover;
		object-position: 50% 18%;
		border: 2px solid var(--surface);
	}
	.team-chip__faces :global(picture + picture img) {
		margin-inline-start: -12px;
	}
	.team-chip__text {
		display: flex;
		flex-direction: column;
		line-height: 1.25;
	}
	.team-chip__text b {
		font-size: 0.92rem;
		font-weight: 600;
	}
	.team-chip__text span {
		font-size: 0.8rem;
		color: var(--text-soft);
	}
	.team-chip .arw {
		color: var(--accent);
		font-weight: 600;
	}

	/* ---------- Thesis ---------- */
	.thesis__grid {
		display: grid;
		grid-template-columns: 1.35fr 1fr;
		gap: clamp(2rem, 5vw, 4rem);
		align-items: start;
	}
	.thesis__main h2 {
		margin-block-start: 0.9rem;
	}
	.thesis__main .lead {
		margin-block-start: 1rem;
	}
	.principles {
		display: grid;
		gap: 1.25rem;
		margin-block-start: 2rem;
	}
	.principle {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1rem;
		align-items: start;
	}
	.principle h3 {
		font-size: 1.08rem;
		margin-block-end: 0.25rem;
	}
	.principle p {
		font-size: 0.95rem;
	}

	/* ---------- At a Glance card ---------- */
	.glance {
		background: var(--surface);
		border-radius: var(--radius);
		padding: clamp(1.5rem, 3vw, 2.1rem);
		border-block-start: 3px solid var(--copper);
		box-shadow: 0 18px 40px -24px rgba(14, 20, 32, 0.55);
	}
	.glance__stats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
		margin-block-start: 1.25rem;
		padding-block-end: 1.25rem;
	}
	.glance__stats > div {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}
	.glance__n {
		font-family: var(--serif);
		font-weight: 700;
		font-size: clamp(2rem, 3.4vw, 2.6rem);
		line-height: 1;
		color: var(--accent);
		letter-spacing: -0.01em;
	}
	.glance__k {
		font-size: 0.8rem;
		line-height: 1.4;
		color: var(--text-soft);
	}
	.glance dl {
		margin-block-start: 1.1rem;
	}
	.glance dl div {
		padding-block: 0.8rem;
		border-block-start: 1px solid var(--hairline-soft);
	}
	.glance dt {
		font-size: 0.68rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		font-weight: 600;
		color: var(--text-mute);
	}
	.glance dd {
		font-family: var(--serif);
		color: var(--heading);
		font-size: 1.02rem;
		line-height: 1.4;
		margin-block-start: 0.25rem;
	}
	.glance__foot {
		margin-block-start: 0.6rem;
		padding-block-start: 0.9rem;
		border-block-start: 1px solid var(--hairline-soft);
		font-size: 0.8rem;
	}

	/* ---------- Leadership: bring the people up sooner ---------- */
	#leadership {
		padding-block-start: clamp(3rem, 6vw, 4.5rem);
		--section-head-maxw: 900px;
		--section-head-space: clamp(1.75rem, 3vw, 2.5rem);
	}
	/* The label stays inline, as on the old page: its line box sets the space above it. */
	.sub-eyebrow {
		margin-block-end: 1.5rem;
	}
	.leaders {
		display: grid;
		gap: clamp(2.5rem, 5vw, 4rem);
	}
	/* space before the next sub-section head */
	.leaders,
	.exec-grid {
		margin-block-end: clamp(3rem, 6vw, 4.5rem);
	}
	.sub-title {
		font-size: clamp(1.6rem, 2.8vw, 2.2rem);
	}
	.exec-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: clamp(1.75rem, 4vw, 3rem);
	}
	.advisors {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 1rem;
	}

	/* ---------- Responsive ---------- */
	@media (max-width: 980px) {
		.advisors {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	@media (max-width: 900px) {
		.thesis__grid {
			grid-template-columns: 1fr;
		}
	}
	@media (min-width: 561px) and (max-width: 900px) {
		.glance dl {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			column-gap: 1.5rem;
		}
		.glance dl div:nth-child(n + 4) {
			grid-column: 1 / -1;
		}
	}
	@media (max-width: 720px) {
		.advisors {
			grid-template-columns: 1fr;
		}
		.exec-grid {
			grid-template-columns: 1fr;
			gap: 1.75rem;
		}
	}
</style>
