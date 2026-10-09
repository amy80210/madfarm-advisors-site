<script lang="ts">
	import Eyebrow from '#lib/components/Eyebrow.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { SCHEDULE_URL } from '#lib/site.ts';
</script>

<PageHero compact>
	<Eyebrow>Contact</Eyebrow>
	<h1>Schedule a Call</h1>
</PageHero>

<section class="section--tight">
	<div class="wrap">
		<div class="calendar">
			<!-- `gv=true` is Google's embed view: it drops the Google page chrome. -->
			<iframe src="{SCHEDULE_URL}?gv=true" title="Pick a time for a call with Madfarm Advisors"
			></iframe>
		</div>
		<a class="fallback" href={SCHEDULE_URL} target="_blank" rel="noopener">
			Open the calendar in a new tab
		</a>
	</div>
</section>

<style>
	/* The card is white because the Google page inside it is white: the frame edge disappears.
	   It has no border of its own, because Google draws one around the calendar. */
	.calendar {
		container-type: inline-size;
		border-radius: 1rem;
		overflow: clip;
		background: var(--white);
		box-shadow:
			0 1px 2px color-mix(in oklch, var(--steel) 8%, transparent),
			0 12px 32px -16px color-mix(in oklch, var(--steel) 18%, transparent);
	}
	/* The heights fit Google's content (965px wide layout, 1441px stacked layout, measured
	   2026-10-08) with slack, so the page scrolls and the frame does not. */
	iframe {
		display: block;
		inline-size: 100%;
		block-size: 64rem;
		border: 0;
		color-scheme: light;
	}
	/* Google stacks the month over the time slots below 600px. */
	@container (max-width: 600px) {
		iframe {
			block-size: 94rem;
		}
	}
	.fallback {
		display: inline-block;
		margin-block-start: 1rem;
		padding-block: 0.5rem;
		font-size: 0.9rem;
		color: var(--text-mute);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.fallback:active {
		color: var(--steel);
	}
	@media (hover: hover) and (pointer: fine) {
		.fallback:hover {
			color: var(--steel);
		}
	}
</style>
