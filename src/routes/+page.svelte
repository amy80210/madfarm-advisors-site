<script lang="ts">
	import professional from '#lib/assets/treated/professional.jpg?w=900;640;360&enhanced';
	import Button from '#lib/components/Button.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import FeatureSplit from '#lib/components/FeatureSplit.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import QuoteBlock from '#lib/components/QuoteBlock.svelte';
	import SectionHead from '#lib/components/SectionHead.svelte';
	import Eyebrow from '#lib/components/Eyebrow.svelte';
	import { SCHEDULE_URL } from '#lib/site.ts';
</script>

<!-- Scaffold smoke page. The home page replaces it. -->
<PageHero image={professional} sizes="100vw">
	<Eyebrow>Scaffold</Eyebrow>
	<h1>Shared components smoke page.</h1>
	<p class="lead">Replaced by the home page.</p>
</PageHero>

<section class="section">
	<div class="wrap">
		<SectionHead eyebrow="Section head" class="reveal">
			<h2>Heading</h2>
			<p>Paragraph.</p>
		</SectionHead>
		<Icon>
			<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" aria-hidden="true">
				<circle cx="16" cy="16" r="11" />
			</svg>
		</Icon>
		<FeatureSplit eyebrow="Case Study" image={professional}>
			<h2>Split heading.</h2>
			<p>Split paragraph.</p>
			{#snippet actions()}
				<Button href="/case-studies" arrow="right">Explore Case Studies</Button>
			{/snippet}
		</FeatureSplit>
	</div>
</section>

<section class="section bg-steel">
	<div class="wrap">
		<QuoteBlock eyebrow="In Their Words">
			A quote.
			{#snippet attribution()}
				<b>Name</b>
				<span>Role</span>
			{/snippet}
		</QuoteBlock>
	</div>
</section>

<CtaBand eyebrow="Talk to a Senior Banker" image={professional}>
	<h2>Band heading.</h2>
	<p>Band paragraph.</p>
	{#snippet actions()}
		<Button variant="copper" href={SCHEDULE_URL} external arrow="right">Schedule a Call</Button>
		<Button variant="outline" href="/about">Meet the Firm</Button>
	{/snippet}
</CtaBand>
