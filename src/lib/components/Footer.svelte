<script lang="ts">
	import logo from '#lib/assets/logos/madfarm-stack-white.png?enhanced';
	import { CONTACT_EMAIL, footerNav, SCHEDULE_URL } from '#lib/site.ts';
</script>

<footer class="site-footer on-dark">
	<div class="wrap">
		<div class="top">
			<div class="brand">
				<enhanced:img src={logo} alt="Madfarm Advisors" loading="lazy" decoding="async" />
				<p>
					A lower middle market investment bank selling mission-critical businesses. Senior
					representation on every deal.
				</p>
			</div>
			<div class="col">
				<h2>Firm</h2>
				{#each footerNav as link (link.path)}
					<a href={link.path}>{link.label}</a>
				{/each}
			</div>
			<div class="col">
				<h2>Contact</h2>
				<a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a>
				<a href={SCHEDULE_URL} target="_blank" rel="noopener">Schedule a Call</a>
			</div>
		</div>
		<div class="bottom">
			<span>
				&copy; 2026 Madfarm Advisors. All rights reserved. &middot;
				<a href="/privacy-policy">Privacy Policy</a>
			</span>
			<span>Member, Alliance of Mergers &amp; Acquisitions Advisors</span>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		background: var(--steel-2);
		color: var(--text-mute);
		padding-block: clamp(3rem, 6vw, 4.5rem);
	}
	.top {
		display: grid;
		grid-template-columns: 1.4fr 1fr 1fr;
		gap: 2.5rem;
	}
	.brand :global(img) {
		block-size: 34px;
		inline-size: auto;
		margin-block-end: 1.2rem;
	}
	.brand p {
		color: var(--text-mute);
		font-size: 0.92rem;
		max-inline-size: 34ch;
	}
	.col h2 {
		color: var(--heading);
		font-family: var(--sans);
		font-size: 0.78rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		margin-block-end: 1rem;
		font-weight: 600;
		line-height: 1.6;
	}
	.col a {
		display: block;
		padding-block: 0.35rem;
		font-size: 0.93rem;
	}
	a {
		color: var(--text-mute);
		transition: color var(--dur-fast) var(--ease);
	}
	a:active {
		color: var(--heading);
	}
	@media (hover: hover) and (pointer: fine) {
		a:hover {
			color: var(--heading);
		}
	}
	.bottom {
		margin-block-start: 3rem;
		padding-block-start: 1.5rem;
		border-block-start: 1px solid color-mix(in oklch, var(--white) 10%, transparent);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 1rem;
		font-size: 0.82rem;
	}

	@media (max-width: 900px) {
		.top {
			grid-template-columns: 1fr 1fr;
		}
		.brand {
			grid-column: 1 / -1;
		}
	}
</style>
